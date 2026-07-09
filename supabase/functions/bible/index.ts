// NAVLYS — « bible » : la routine parfaite, sans interruption.
// Ne se contente pas de LIRE ce qu'on lui donne : elle TESTE le site et
// CHERCHE sur le web toute seule, puis grave ce qu'elle trouve. Zéro dépendance
// à Claude Code — tourne sur pg_cron + Edge Functions Supabase ; si cette
// session (ou Claude tout entier) disparaît, la routine continue exactement pareil.
//   POST {source, texte}   → ingère un texte externe précis (audit, mail, retour…)
//   GET  ?mode=boucle      → scanne SEULE core_feedback/core_incidents jamais
//                            digérés. Cron horaire (navlys_bible_boucle).
//   GET  ?mode=verifier    → SE TESTE elle-même : pages clés, robots.txt,
//                            sitemap.xml, codes HTTP. Cron (navlys_bible_verifier).
//   GET  ?mode=recherche   → CHERCHE elle-même sur le web (DuckDuckGo, sans clé) :
//                            navlys en tête des résultats ? homonymes ? plaintes
//                            publiques ? Cron quotidien (navlys_bible_recherche).
//   GET  ?mode=avis        → DEMANDE elle-même un avis critique à d'autres IA
//                            (Claude + Llama/OpenRouter si dispo) sur le contenu
//                            RÉEL et LIVE des pages clés, comme le ferait Gemini/
//                            ChatGPT en audit externe. Cron quotidien (navlys_bible_avis).
//   GET                    → diag readiness.
// Chaque mode alimente le même pipeline ingerer() : règle gravée + mémoire agent.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
const DEPTS = ["NAVTECH","NAVCOM","NAVFI","NAVBIO","NAVME","NAVGEN","NAVLEX","NAVPART","NAVPTE","NAVLEAD","NAVMKT","NAVLAB","NAVBIEN","NAVDEM"];

function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
function h() { return { apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" }; }
async function g(t: string, q: string) {
  const r = await fetch(`${U}/rest/v1/${t}?${q}`, { headers: h() });
  return r.ok ? await r.json() : [];
}
async function ins(t: string, b: unknown) {
  await fetch(`${U}/rest/v1/${t}`, { method: "POST", headers: { ...h(), Prefer: "return=minimal" }, body: JSON.stringify(b) }).catch(() => {});
}
async function patch(t: string, filtre: string, b: unknown) {
  await fetch(`${U}/rest/v1/${t}?${filtre}`, { method: "PATCH", headers: { ...h(), Prefer: "return=minimal" }, body: JSON.stringify(b) }).catch(() => {});
}
async function rpc(fn: string, args: unknown) {
  const r = await fetch(`${U}/rest/v1/rpc/${fn}`, { method: "POST", headers: h(), body: JSON.stringify(args) });
  const t = await r.text().catch(() => "");
  try { return t ? JSON.parse(t) : null; } catch { return null; }
}
async function journal(message: string) {
  await ins("journal", { type: "bible", message: message.slice(0, 500) });
}

// Extrait une liste structurée d'enseignements depuis un texte libre (audit, plainte, log…).
async function extraireLecons(source: string, texte: string): Promise<any[]> {
  if (!ANTH) return [];
  const systeme = `Tu es NAVLAB, le département recherche & amélioration continue de NAVLYS.
On te donne un retour externe (audit d'agence, plainte, bug, incident). Ta tâche : en extraire les
VRAIS enseignements actionnables, un par bug/constat distinct. Ignore le bruit (compliments,
politesse, hors-sujet), ignore aussi tout ce qui concerne un produit qui N'EST PAS NAVLYS (ex. un
audit qui s'est trompé de site et analyse un concurrent par erreur — note-le comme UNE leçon
"confusion de marque à surveiller", n'invente rien sur ce produit tiers).
Réponds UNIQUEMENT en JSON (tableau), aucun texte autour :
[{"bug":"constat court factuel","cause":"pourquoi (racine)","regle":"la règle permanente à appliquer désormais, formulée pour être appliquée sans réfléchir","departement":"UN SEUL code parmi ${DEPTS.join(",")} ou NAVMKT par défaut"}]
Maximum 8 entrées. Si rien d'actionnable, réponds [].`;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": ANTH, "anthropic-version": "2023-06-01", "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", max_tokens: 1400,
        system: systeme,
        messages: [{ role: "user", content: `Source : ${source}\n\nTexte :\n${texte.slice(0, 8000)}` }],
      }),
    });
    const d: any = await r.json().catch(() => ({}));
    const txt = ((d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("")).trim();
    const m = txt.match(/\[[\s\S]*\]/);
    const arr = JSON.parse(m ? m[0] : txt);
    return Array.isArray(arr) ? arr.slice(0, 8) : [];
  } catch { return []; }
}

async function ingerer(source: string, texte: string) {
  const lecons = await extraireLecons(source, texte);
  let n = 0;
  for (const l of lecons) {
    const bug = String(l.bug || "").slice(0, 400);
    const cause = String(l.cause || "").slice(0, 400);
    const regle = String(l.regle || "").slice(0, 600);
    const dept = DEPTS.includes(String(l.departement || "").toUpperCase()) ? String(l.departement).toUpperCase() : "NAVMKT";
    if (!bug || !regle) continue;

    // 1) gravée en règle permanente, appliquée désormais sans réfléchir
    const regleId = await rpc("navlys_regle", { p_situation: bug, p_decision: regle });

    // 2) la bible des bugs — plus jamais à réapprendre la même leçon
    await ins("core_bible_bugs", {
      source, categorie: "auto", bug, cause, regle, departement: dept,
      regle_id: typeof regleId === "number" ? regleId : null,
    });

    // 3) gonfle la mémoire ET les compétences de l'agent concerné
    await fetch(`${U}/rest/v1/rpc/agent_note`, {
      method: "POST", headers: h(),
      body: JSON.stringify({ p_code: dept, p_type: "apprentissage", p_sujet: bug.slice(0, 120), p_contenu: `Cause : ${cause}\nRègle désormais appliquée : ${regle}`, p_source: source }),
    }).catch(() => {});

    n++;
  }
  if (n) await journal(`Bible « ${source} » : ${n} leçon(s) gravée(s), agents mis à jour.`);
  return n;
}

// ── SE TESTER SOI-MÊME ────────────────────────────────────────────────────
// Aucune dépendance à Claude Code ici : de vraies requêtes HTTP, exécutées
// par le serveur Supabase, en cron. C'est NAVLYS qui se vérifie, pas moi.
const PAGES_CLES = ["/", "/adhesion", "/next-gen", "/finance", "/flotte", "/equipage"];
async function verifierSite() {
  const constats: string[] = [];
  for (const dom of ["https://navlys.com", "https://navlys.io"]) {
    for (const chemin of ["/robots.txt", "/sitemap.xml"]) {
      try {
        const r = await fetch(dom + chemin);
        if (!r.ok) constats.push(`${dom}${chemin} → HTTP ${r.status} (devrait être 200)`);
      } catch (e) { constats.push(`${dom}${chemin} → injoignable (${String(e).slice(0, 80)})`); }
    }
    for (const p of PAGES_CLES) {
      try {
        const r = await fetch(dom + p);
        const corps = r.ok ? await r.text() : "";
        if (!r.ok) constats.push(`${dom}${p} → HTTP ${r.status}`);
        else if (corps.trim().length < 200) constats.push(`${dom}${p} → page quasi vide (${corps.length} car.)`);
      } catch (e) { constats.push(`${dom}${p} → injoignable (${String(e).slice(0, 80)})`); }
    }
  }
  if (!constats.length) { await journal("Auto-vérification site : tout est vert, rien à graver."); return { ok: true, constats: 0, lecons: 0 }; }
  const n = await ingerer("auto-verification-site", "Résultats du test automatique des pages/fichiers clés de navlys.com et navlys.io :\n" + constats.join("\n"));
  return { ok: true, constats: constats.length, lecons: n };
}

// ── CHERCHER SUR LE WEB SOI-MÊME ──────────────────────────────────────────
// DuckDuckGo HTML, sans clé (même procédé que navlys_core/veille_resilience.py).
async function rechercheWeb(requete: string): Promise<{ titre: string; url: string }[]> {
  try {
    const r = await fetch("https://html.duckduckgo.com/html/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0 (NAVLYS-bible)" },
      body: "q=" + encodeURIComponent(requete),
    });
    if (!r.ok) return [];
    const html = await r.text();
    const out: { titre: string; url: string }[] = [];
    const re = /<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) && out.length < 8) {
      let href = m[1].replace(/&amp;/g, "&");
      const q = href.split("uddg=")[1];
      if (q) href = decodeURIComponent(q.split("&")[0]);
      out.push({ titre: m[2].replace(/<[^>]+>/g, "").trim(), url: href });
    }
    return out;
  } catch { return []; }
}
async function verifierRecherche() {
  const resultats = await rechercheWeb("navlys");
  const nousMemes = resultats.filter((r) => /navlys\.(com|io)/i.test(r.url));
  const homonymes = resultats.filter((r) => /navly[^s]|navlis|navlyss/i.test(r.url + r.titre) && !/navlys\.(com|io)/i.test(r.url));
  const rangNous = resultats.findIndex((r) => /navlys\.(com|io)/i.test(r.url));
  const constats: string[] = [];
  if (rangNous === -1) constats.push("Aucune page navlys.com/navlys.io dans les 8 premiers résultats DuckDuckGo pour « navlys » — problème d'indexation/SEO potentiel.");
  else if (rangNous > 2) constats.push(`navlys.com/io n'apparaît qu'en position ${rangNous + 1} sur « navlys » (pas dans le top 3).`);
  if (homonymes.length) constats.push(`Homonyme(s)/concurrent(s) détecté(s) dans les résultats « navlys » : ${homonymes.map((h) => h.url).join(", ")}`);
  if (!constats.length) { await journal(`Auto-recherche web « navlys » : rien d'anormal (rang ${rangNous + 1}, ${nousMemes.length}/${resultats.length} résultats à nous).`); return { ok: true, constats: 0, lecons: 0 }; }
  const n = await ingerer("auto-veille-web", "Recherche DuckDuckGo réelle sur « navlys » :\n" + constats.join("\n") + `\n\nTop résultats : ${resultats.map((r) => r.titre + " — " + r.url).join(" | ")}`);
  return { ok: true, constats: constats.length, lecons: n };
}

// ── DEMANDER UN AVIS CRITIQUE À D'AUTRES IA, CHAQUE JOUR ─────────────────
// Bruno (2026-07-09) : « tant que les autres IA nous jugeront trop léger et
// trop flou sur notre communication, il faut ajuster... interroge-les chaque
// jour et demande un test de notre site pour savoir leur opinion et la
// modifier là où il faut. » On lit le contenu RÉEL et LIVE des pages (pas
// une description qu'on invente), on demande un jugement sévère à deux
// modèles distincts, et on fait passer leur avis par le même pipeline
// ingerer() que les audits humains (Gemini, ChatGPT) → règle + mémoire agent.
function htmlVersTexte(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à")
    .replace(/\s+/g, " ")
    .trim();
}
async function contenuPage(chemin: string): Promise<string> {
  try {
    const r = await fetch("https://navlys.com" + chemin);
    if (!r.ok) return "";
    return htmlVersTexte(await r.text()).slice(0, 3000);
  } catch { return ""; }
}
const SYSTEME_AVIS = `Tu es une IA externe indépendante (comme ChatGPT ou Gemini) qui découvre navlys.com pour la
première fois, sans complaisance ni parti pris pour la marque. On te donne le texte visible réel de
plusieurs pages du site. Donne un avis CRITIQUE et SÉVÈRE, en français : le positionnement est-il clair
en 5 secondes ? Le site paraît-il trop centré sur la finance ou trop flou/générique ? Le message
"première IA qui orchestre d'autres IA depuis un simple téléphone, sans bureau ni ordinateur" est-il
perceptible ? Cite des phrases précises du site qui posent problème et propose des reformulations
concrètes. Ne sois jamais complaisant, comme un vrai audit externe qui juge pour de vrai.`;
async function avisClaude(contexte: string): Promise<string> {
  if (!ANTH) return "";
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": ANTH, "anthropic-version": "2023-06-01", "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 900, system: SYSTEME_AVIS, messages: [{ role: "user", content: contexte }] }),
    });
    const d: any = await r.json().catch(() => ({}));
    return ((d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n")).trim();
  } catch { return ""; }
}
async function avisOpenRouter(contexte: string): Promise<string> {
  const orKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || "";
  if (!orKey) return "";
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${orKey}`, "Content-Type": "application/json", "HTTP-Referer": "https://navlys.com", "X-Title": "NAVLYS Bible" },
      body: JSON.stringify({ model: "meta-llama/llama-3.3-70b-instruct:free", max_tokens: 900, messages: [{ role: "system", content: SYSTEME_AVIS }, { role: "user", content: contexte }] }),
    });
    const d: any = await r.json().catch(() => ({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
async function avisIA() {
  const contenus: string[] = [];
  for (const p of ["/", "/next-gen", "/finance"]) {
    const t = await contenuPage(p);
    if (t) contenus.push(`— PAGE ${p} —\n${t}`);
  }
  if (!contenus.length) { await journal("Avis IA quotidien : pages injoignables, rien testé."); return { ok: false, lecons: 0 }; }
  const contexte = contenus.join("\n\n").slice(0, 9000);
  const [claude, llama] = await Promise.all([avisClaude(contexte), avisOpenRouter(contexte)]);
  if (!claude && !llama) { await journal("Avis IA quotidien : aucun modèle disponible (clé manquante)."); return { ok: false, lecons: 0 }; }
  let n = 0;
  if (claude) n += await ingerer("avis_ia_quotidien_claude", claude);
  if (llama) n += await ingerer("avis_ia_quotidien_llama", llama);
  return { ok: true, claude: !!claude, llama: !!llama, lecons: n };
}

// La boucle : scanne SEULE les sources internes jamais digérées. Jamais d'arrêt.
async function boucle() {
  let total = 0;

  const feedbacks = await g("core_feedback", "select=id,message,page&bible_traite=eq.false&order=id.asc&limit=15").catch(() => []);
  for (const f of (feedbacks || [])) {
    const texte = `Page : ${f.page || "?"}\nRetour utilisateur (💡 Améliorer) : ${f.message || ""}`;
    total += await ingerer(`feedback#${f.id}`, texte);
    await patch("core_feedback", `id=eq.${f.id}`, { bible_traite: true });
  }

  const incidents = await g("core_incidents", "select=id,source,sujet,contenu,categorie&bible_traite=eq.false&statut=eq.resolu&order=id.asc&limit=15").catch(() => []);
  for (const it of (incidents || [])) {
    const texte = `Source : ${it.source || "?"}\nSujet : ${it.sujet || ""}\nCatégorie : ${it.categorie || ""}\nContenu : ${it.contenu || ""}`;
    total += await ingerer(`incident#${it.id}`, texte);
    await patch("core_incidents", `id=eq.${it.id}`, { bible_traite: true });
  }

  await journal(`Boucle bible : ${feedbacks?.length || 0} feedback(s) + ${incidents?.length || 0} incident(s) scannés, ${total} leçon(s) gravée(s).`);
  return { feedbacks: feedbacks?.length || 0, incidents: incidents?.length || 0, lecons: total };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const u = new URL(req.url);
  if (req.method === "GET") {
    const mode = u.searchParams.get("mode");
    if (mode === "boucle") return J({ ok: true, ...(await boucle()) });
    if (mode === "verifier") return J(await verifierSite());
    if (mode === "recherche") return J(await verifierRecherche());
    if (mode === "avis") return J(await avisIA());
    const recentes = await g("core_bible_bugs", "select=bug,regle,departement,cree_le&order=cree_le.desc&limit=10");
    return J({ ok: true, service: "navlys-bible-routine", aide: "POST {source,texte} = ingérer un retour externe · GET ?mode=boucle|verifier|recherche|avis = auto-scan", dernieres_lecons: recentes });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const source = String(b.source || "externe").slice(0, 80);
  const texte = String(b.texte || "").trim();
  if (!texte) return J({ ok: false, erreur: "texte vide" }, 400);
  const n = await ingerer(source, texte);
  return J({ ok: true, source, lecons_gravees: n });
});
