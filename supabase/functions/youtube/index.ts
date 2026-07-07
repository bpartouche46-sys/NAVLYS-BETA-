// ============================================================
// NAVLYS CORE — « youtube » : veille influenceurs YouTube.
// Bruno suit des créateurs ; cette brique lit leurs vidéos (titre,
// description, transcription si dispo) et bancarise TOUS les liens partagés.
//   POST {url:"https://youtube.com/shorts/…"} → analyse la vidéo,
//        enregistre la chaîne comme « influenceur suivi » + ses liens.
//   POST {action:"scan"} ou GET ?mode=scan → passe toutes les chaînes
//        suivies (flux RSS publics, description incluse), range les liens.
//   POST {action:"liste"} → chaînes suivies + derniers liens trouvés.
//   GET → diag readiness (compteurs).
// 100 % gratuit : flux RSS + pages publiques YouTube. Aucune clé,
// aucun connecteur externe (doctrine indépendance).
// Leçons gravées : le proxy du poste bloque YouTube (règle n°32) → tout
// passe ici, côté serveur. L'API player (youtubei) est verrouillée
// anti-robot pour les IP datacenter → on lit la page HTML (description
// via attributedDescription) et le RSS (media:description), jamais gated.
// ============================================================
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
const YTH = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  "Accept-Language": "fr,en;q=0.8",
  "Cookie": "CONSENT=YES+cb.20240101-00-p0.fr+FX+000",
};
const VID_RE = /(?:shorts\/|watch\?v=|youtu\.be\/|embed\/|live\/)([A-Za-z0-9_-]{11})/;

function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
function h() { return { apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" }; }
async function g(t: string, q: string) {
  const r = await fetch(`${U}/rest/v1/${t}?${q}`, { headers: h() });
  return r.ok ? await r.json() : [];
}
async function upsert(t: string, conflit: string, corps: unknown, ignorer = false) {
  await fetch(`${U}/rest/v1/${t}?on_conflict=${conflit}`, {
    method: "POST",
    headers: { ...h(), Prefer: `resolution=${ignorer ? "ignore" : "merge"}-duplicates,return=minimal` },
    body: JSON.stringify(corps),
  }).catch(() => {});
}
async function journal(message: string) {
  await fetch(`${U}/rest/v1/journal`, {
    method: "POST", headers: { ...h(), Prefer: "return=minimal" },
    body: JSON.stringify({ type: "youtube", message: message.slice(0, 500) }),
  }).catch(() => {});
}
async function compte(t: string): Promise<number> {
  const r = await fetch(`${U}/rest/v1/${t}?select=*&limit=0`, {
    headers: { ...h(), Prefer: "count=exact" },
  });
  return parseInt((r.headers.get("content-range") || "").split("/")[1] || "0") || 0;
}
function desechapper(x: string): string {
  return x.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

// Extrait un objet JSON équilibré depuis le HTML (marqueur = début de clé).
function extraireJson(html: string, marqueur: string): any {
  const i = html.indexOf(marqueur);
  if (i < 0) return null;
  const debut = html.indexOf("{", i);
  if (debut < 0) return null;
  let prof = 0, chaine = false, echap = false;
  for (let j = debut; j < html.length; j++) {
    const c = html[j];
    if (echap) { echap = false; continue; }
    if (c === "\\") { echap = true; continue; }
    if (c === '"') chaine = !chaine;
    else if (!chaine) {
      if (c === "{") prof++;
      else if (c === "}" && --prof === 0) {
        try { return JSON.parse(html.slice(debut, j + 1)); } catch { return null; }
      }
    }
  }
  return null;
}

// Tous les liens d'un texte (description ou transcription), avec leur contexte.
function extraireLiens(texte: string, source: string) {
  const out: { url: string; source: string; contexte: string }[] = [];
  const vus = new Set<string>();
  const re = /(https?:\/\/[^\s"'<>()\[\]]+|www\.[a-z0-9-]+\.[a-z]{2,}[^\s"'<>()\[\]]*)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(texte))) {
    let url = m[0].replace(/[.,;:!?…»)\]]+$/, "");
    if (!/^https?:/i.test(url)) url = "https://" + url;
    const cle = url.toLowerCase();
    if (vus.has(cle)) continue;
    vus.add(cle);
    const deb = Math.max(0, m.index - 60);
    const contexte = texte.slice(deb, m.index + m[0].length + 60).replace(/\s+/g, " ").trim();
    out.push({ url: url.slice(0, 500), source, contexte: contexte.slice(0, 240) });
  }
  return out;
}

// Transcription (sous-titres publics) : fr d'abord, puis en, sinon la première.
// Souvent indisponible depuis un datacenter (player anti-robot) → best-effort.
async function transcription(pr: any): Promise<string> {
  try {
    const pistes = pr?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    if (!pistes.length) return "";
    const piste = pistes.find((t: any) => (t.languageCode || "").startsWith("fr"))
      || pistes.find((t: any) => (t.languageCode || "").startsWith("en")) || pistes[0];
    const r = await fetch(piste.baseUrl + "&fmt=json3", { headers: YTH });
    if (!r.ok) return "";
    const d = await r.json();
    return (d.events || [])
      .flatMap((e: any) => (e.segs || []).map((s: any) => s.utf8 || ""))
      .join("").replace(/\s+/g, " ").trim();
  } catch { return ""; }
}

async function analyserVideo(videoId: string, suivreChaine: boolean) {
  const r = await fetch(`https://www.youtube.com/watch?v=${videoId}&hl=fr`, { headers: YTH }).catch(() => null);
  if (!r || !r.ok) return { ok: false, video_id: videoId, erreur: "page vidéo injoignable — réessaie dans un instant" };
  const html = await r.text();
  const pr = extraireJson(html, "ytInitialPlayerResponse");
  const vd = pr?.videoDetails;

  // Titre + nom de chaîne : oEmbed (public, jamais verrouillé) en priorité.
  let oe: any = null;
  try {
    const ro = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent("https://www.youtube.com/watch?v=" + videoId)}&format=json`);
    if (ro.ok) oe = await ro.json();
  } catch { /* rien */ }
  const titre = vd?.title || oe?.title
    || desechapper(html.match(/<meta name="title" content="([^"]*)"/)?.[1] || "")
    || desechapper(html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] || "");
  const auteur = vd?.author || oe?.author_name
    || desechapper(html.match(/<link itemprop="name" content="([^"]*)">/)?.[1] || "");
  const channelId = vd?.channelId
    || html.match(/"externalChannelId":"(UC[^"]+)"/)?.[1]
    || html.match(/"channelId":"(UC[^"]+)"/)?.[1] || null;
  const handle = html.match(/"canonicalBaseUrl":"\/@([^"]+)"/)?.[1]
    || (oe?.author_url || "").split("/@")[1] || null;
  let publie = html.match(/itemprop="datePublished" content="([^"]+)"/)?.[1] || null;
  if (!titre && !channelId) return { ok: false, video_id: videoId, erreur: "page vidéo illisible — réessaie dans un instant" };

  // Description, du plus fiable au moins fiable :
  // 1. videoDetails (si player non verrouillé) ; 2. flux RSS de la chaîne
  // (description COMPLÈTE des ~15 dernières vidéos) ; 3. attributedDescription
  // dans la page ; 4. meta og:description (tronquée, dernier recours).
  let description = vd?.shortDescription || "";
  if (!description && channelId) {
    try {
      const rf = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, { headers: YTH });
      if (rf.ok) {
        const bloc = (await rf.text()).split("<entry>").find((b) => b.includes(`<yt:videoId>${videoId}<`)) || "";
        description = desechapper(bloc.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || "");
        publie = publie || bloc.match(/<published>([^<]+)<\/published>/)?.[1] || null;
      }
    } catch { /* rien */ }
  }
  if (!description) description = extraireJson(html, '"attributedDescription"')?.content || "";
  if (!description) description = desechapper(html.match(/<meta property="og:description" content="([^"]*)"/)?.[1] || "");
  const parle = pr?.captions ? await transcription(pr) : "";

  // Fusion description + transcription, la description prime en cas de doublon.
  const parUrl = new Map<string, { url: string; source: string; contexte: string }>();
  for (const l of [...extraireLiens(description, "description"), ...extraireLiens(parle, "transcription")]) {
    if (!parUrl.has(l.url.toLowerCase())) parUrl.set(l.url.toLowerCase(), l);
  }
  const liens = [...parUrl.values()];

  if (suivreChaine && channelId) {
    await upsert("core_youtube_chaines", "channel_id", { channel_id: channelId, nom: auteur, handle, actif: true });
  }
  if (channelId) {
    await upsert("core_youtube_videos", "video_id", {
      video_id: videoId, channel_id: channelId, titre: titre.slice(0, 300), publie_le: publie,
    });
  }
  if (liens.length) {
    await upsert("core_youtube_liens", "video_id,url",
      liens.map((l) => ({ ...l, video_id: videoId, channel_id: channelId })), true);
  }
  await journal(`YouTube « ${auteur} » — ${titre.slice(0, 60)} : ${liens.length} lien(s) bancarisé(s).`);
  return {
    ok: true, video_id: videoId, titre, chaine: { channel_id: channelId, nom: auteur, handle },
    nb_liens: liens.length, liens, description_car: description.length,
    transcription_mots: parle ? parle.split(" ").length : 0,
  };
}

// Scan des chaînes suivies via leur flux RSS public : les 15 dernières vidéos,
// AVEC titre + description complète (media:description) → liens directs.
async function scanner() {
  const chaines = await g("core_youtube_chaines", "select=channel_id,nom&actif=eq.true");
  let nv = 0, nl = 0;
  for (const c of chaines) {
    try {
      const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${c.channel_id}`, { headers: YTH });
      if (!r.ok) continue;
      const xml = await r.text();
      const entrees = xml.split("<entry>").slice(1).map((bloc) => ({
        id: bloc.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] || "",
        titre: desechapper(bloc.match(/<title>([^<]*)<\/title>/)?.[1] || ""),
        publie: bloc.match(/<published>([^<]+)<\/published>/)?.[1] || null,
        desc: desechapper(bloc.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || ""),
      })).filter((e) => e.id).slice(0, 15);
      if (!entrees.length) continue;
      const connues = await g("core_youtube_videos", `select=video_id&video_id=in.(${entrees.map((e) => `"${e.id}"`).join(",")})`);
      const dejaVu = new Set(connues.map((v: any) => v.video_id));
      for (const e of entrees.filter((x) => !dejaVu.has(x.id))) {
        await upsert("core_youtube_videos", "video_id", {
          video_id: e.id, channel_id: c.channel_id, titre: e.titre.slice(0, 300), publie_le: e.publie,
        });
        const liens = extraireLiens(e.desc, "description");
        if (liens.length) {
          await upsert("core_youtube_liens", "video_id,url",
            liens.map((l) => ({ ...l, video_id: e.id, channel_id: c.channel_id })), true);
        }
        nv++; nl += liens.length;
      }
    } catch { /* chaîne suivante, jamais bloqué */ }
  }
  if (nv) await journal(`Veille YouTube : ${nv} nouvelle(s) vidéo(s) lue(s), ${nl} lien(s) bancarisé(s).`);
  return { ok: true, chaines: chaines.length, nouvelles_videos: nv, liens_bancarises: nl };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const u = new URL(req.url);
  if (req.method === "GET") {
    if (u.searchParams.get("mode") === "scan") return J(await scanner());
    const [ch, vi, li] = await Promise.all([
      compte("core_youtube_chaines"), compte("core_youtube_videos"), compte("core_youtube_liens"),
    ]);
    return J({
      ok: true, service: "navlys-youtube-veille",
      chaines_suivies: ch, videos_lues: vi, liens_bancarises: li,
      aide: "POST {url} = analyser une vidéo + suivre sa chaîne · POST {action:'scan'} · POST {action:'liste'}",
    });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const action = b.action || (b.url ? "video" : "liste");
  if (action === "scan") return J(await scanner());
  if (action === "liste") {
    const [chaines, liens] = await Promise.all([
      g("core_youtube_chaines", "select=channel_id,nom,handle,actif&order=ajoute_le.desc"),
      g("core_youtube_liens", "select=url,source,contexte,video_id,trouve_le&order=trouve_le.desc&limit=50"),
    ]);
    return J({ ok: true, chaines, derniers_liens: liens });
  }
  if (action === "video") {
    const m = String(b.url || "").match(VID_RE);
    if (!m) return J({ ok: false, erreur: "URL YouTube non reconnue (watch, shorts, youtu.be)." }, 400);
    return J(await analyserVideo(m[1], true));
  }
  return J({ error: "action inconnue" }, 400);
});
