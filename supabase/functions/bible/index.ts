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
//   GET  ?mode=avis        → PANEL DE CONTRADICTION quotidien : plusieurs IA de
//                            FAMILLES différentes (Claude + panel OpenRouter
//                            Llama/Mistral/Qwen/DeepSeek/Gemma + NVIDIA/Mixtral)
//                            classent et critiquent le contenu RÉEL et LIVE des
//                            pages clés. Chaque conclusion BRUTE est rebasculée à
//                            Bruno (core_avis_ia) ET au CORE (ingerer). « Jamais
//                            toutes les billes dans le même panier. » Cron
//                            quotidien (navlys_bible_avis).
//   GET  ?mode=avis_bruno  → rebascule vers Bruno : les avis bruts pas encore lus
//                            (un canal les tire et les marque vus).
//   GET                    → diag readiness.
// IMPORTANT : verify_jwt=false obligatoire (règle gravée) — appelée par pg_cron
// SANS en-tête Authorization ; un déploiement avec verify_jwt=true casse tous les crons.
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
// une description qu'on invente), on demande un jugement sévère à plusieurs
// modèles indépendants, et on fait passer leur avis par le même pipeline
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
plusieurs pages du site. Tu dois d'abord CLASSER le site, puis le CRITIQUER SÉVÈREMENT, en français.

Réponds EXACTEMENT dans ce format :
NOTE_GLOBALE: X/10
CLASSIFICATION:
- Positionnement clair en 5 s : X/10 — (une phrase)
- Confiance / crédibilité : X/10 — (une phrase)
- Design & mobile : X/10 — (une phrase)
- Conversion (on comprend quoi faire) : X/10 — (une phrase)
- Message "première IA qui orchestre d'autres IA depuis un simple téléphone, sans bureau ni ordinateur" perçu : X/10 — (une phrase)
CRITIQUE:
- (3 à 6 points durs, en citant des phrases précises du site qui posent problème)
PROPOSITIONS:
- (2 à 4 reformulations ou corrections concrètes, applicables tout de suite)

Le site paraît-il trop centré sur la finance ou trop flou/générique ? Ne sois JAMAIS complaisant,
comme un vrai audit externe qui juge pour de vrai. Sois précis, factuel, chiffré.`;
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
function clefOpenRouter(): string {
  return Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || Deno.env.get("OPEN_API_ROUTER") || Deno.env.get("OPEN_API_ROUTER_KEY") || "";
}
// « Jamais toutes les billes dans le même panier » (règle Bruno, 2026-07-11) :
// on interroge des FAMILLES de modèles réellement différentes, pas le même modèle
// deux fois. Chaque appel échoue proprement en "" si le modèle/la clé manque —
// il suffit que 2-3 répondent pour avoir une vraie contradiction. Ajouter/retirer
// un modèle = une ligne, sans toucher au reste.
const PANEL_OPENROUTER = [
  { modele: "meta-llama/llama-3.3-70b-instruct:free", famille: "meta-llama" },
  { modele: "mistralai/mistral-small-3.2-24b-instruct:free", famille: "mistral" },
  { modele: "qwen/qwen-2.5-72b-instruct:free", famille: "qwen" },
  { modele: "deepseek/deepseek-chat-v3-0324:free", famille: "deepseek" },
  { modele: "google/gemma-3-27b-it:free", famille: "google" },
];
async function avisOpenRouterModele(contexte: string, modele: string): Promise<string> {
  const orKey = clefOpenRouter();
  if (!orKey) return "";
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${orKey}`, "Content-Type": "application/json", "HTTP-Referer": "https://navlys.com", "X-Title": "NAVLYS Bible" },
      body: JSON.stringify({ model: modele, max_tokens: 900, messages: [{ role: "system", content: SYSTEME_AVIS }, { role: "user", content: contexte }] }),
    });
    const d: any = await r.json().catch(() => ({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
// NVIDIA NIM (build.nvidia.com, API compatible OpenAI) — 3ᵉ avis indépendant,
// lecture tolérante du nom de clé (règle n°4 : jamais faire redemander Bruno).
function clefNvidia(): string {
  return Deno.env.get("NVIDIA_API_KEY") || Deno.env.get("NVAPI_KEY") || Deno.env.get("NVIDIA_NIM_KEY") || Deno.env.get("NGC_API_KEY") || Deno.env.get("NVIDIA_BUILD_API_KEY") || Deno.env.get("BUILD_NVIDIA_API_KEY") || "";
}
// NVIDIA NIM sert un modèle d'une AUTRE famille (Mixtral) que le panel OpenRouter
// et que Claude — pour que la contradiction soit réelle, pas trois fois le même avis.
async function avisNvidia(contexte: string): Promise<string> {
  const nvKey = clefNvidia();
  if (!nvKey) return "";
  try {
    const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${nvKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "mistralai/mixtral-8x22b-instruct-v0.1", max_tokens: 900, temperature: 0.4, messages: [{ role: "system", content: SYSTEME_AVIS }, { role: "user", content: contexte }] }),
    });
    const d: any = await r.json().catch(() => ({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
// Diagnostic sûr : ne révèle JAMAIS la clé, seulement présence + résultat réel de l'appel.
async function diagNvidia() {
  const nvKey = clefNvidia();
  if (!nvKey) return { cle_trouvee: false, aide: "Aucune variable NVIDIA_API_KEY/NVAPI_KEY/NVIDIA_NIM_KEY/NGC_API_KEY/NVIDIA_BUILD_API_KEY/BUILD_NVIDIA_API_KEY trouvée dans les secrets Supabase de ce projet." };
  try {
    const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${nvKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "meta/llama-3.3-70b-instruct", max_tokens: 30, messages: [{ role: "user", content: "Réponds juste : ok" }] }),
    });
    const txt = await r.text();
    return { cle_trouvee: true, status_http: r.status, reponse: txt.slice(0, 500) };
  } catch (e) { return { cle_trouvee: true, erreur: String(e).slice(0, 300) }; }
}
// Extrait la NOTE_GLOBALE (/10) que chaque IA doit poser en tête de son avis.
function extraireNote(avis: string): number | null {
  const m = avis.match(/NOTE_GLOBALE\s*:?\s*(\d{1,2}(?:[.,]\d)?)\s*\/\s*10/i);
  if (!m) return null;
  const v = parseFloat(m[1].replace(",", "."));
  return isFinite(v) && v >= 0 && v <= 10 ? v : null;
}
// Panel de contradiction quotidien (doctrine Bruno 2026-07-11) : plusieurs IA de
// familles DIFFÉRENTES jugent le site en même temps. Chaque conclusion BRUTE est
// (1) rebasculée telle quelle vers Bruno via core_avis_ia (durable, relisable),
// (2) rebasculée au CORE via ingerer() (règle + mémoire agent, mise en pratique),
// (3) résumée dans le journal. Aucune bille dans le même panier : Claude, un panel
// OpenRouter multi-familles (Llama, Mistral, Qwen, DeepSeek, Gemma) et NVIDIA/Mixtral.
async function avisIA() {
  const contenus: string[] = [];
  for (const p of ["/", "/next-gen", "/finance", "/adhesion"]) {
    const t = await contenuPage(p);
    if (t) contenus.push(`— PAGE ${p} —\n${t}`);
  }
  if (!contenus.length) { await journal("Avis IA quotidien : pages injoignables, rien testé."); return { ok: false, lecons: 0 }; }
  const contexte = contenus.join("\n\n").slice(0, 9000);

  // Un thunk par IA du panel — familles distinctes, exécutés en parallèle.
  const membres: { fournisseur: string; modele: string; famille: string; run: () => Promise<string> }[] = [
    { fournisseur: "anthropic", modele: "claude-haiku-4.5", famille: "anthropic", run: () => avisClaude(contexte) },
    ...PANEL_OPENROUTER.map((m) => ({ fournisseur: "openrouter", modele: m.modele, famille: m.famille, run: () => avisOpenRouterModele(contexte, m.modele) })),
    { fournisseur: "nvidia", modele: "mistralai/mixtral-8x22b-instruct-v0.1", famille: "mistral", run: () => avisNvidia(contexte) },
  ];
  const avis = await Promise.all(membres.map((m) => m.run()));

  const rendus: { fournisseur: string; modele: string; famille: string; note: number | null }[] = [];
  let lecons = 0;
  for (let i = 0; i < membres.length; i++) {
    const texte = (avis[i] || "").trim();
    if (!texte) continue;
    const m = membres[i];
    const note = extraireNote(texte);
    // (1) BRUT → Bruno : la conclusion intégrale, horodatée, jamais résumée.
    await ins("core_avis_ia", { fournisseur: m.fournisseur, modele: m.modele, famille: m.famille, note, avis: texte.slice(0, 8000) });
    // (2) → CORE : mise en pratique via le pipeline habituel (règle + mémoire agent).
    lecons += await ingerer(`avis_ia_quotidien_${m.famille}`, texte);
    rendus.push({ fournisseur: m.fournisseur, modele: m.modele, famille: m.famille, note });
  }
  if (!rendus.length) { await journal("Avis IA quotidien : aucun modèle disponible (clé manquante)."); return { ok: false, lecons: 0 }; }

  // (3) → journal : digest chiffré, mis en contradiction (notes côte à côte).
  const notes = rendus.map((r) => r.note).filter((n): n is number => n != null);
  const moyenne = notes.length ? Math.round((notes.reduce((a, b) => a + b, 0) / notes.length) * 10) / 10 : null;
  const detail = rendus.map((r) => `${r.famille}=${r.note != null ? r.note + "/10" : "?"}`).join(" · ");
  await journal(`Avis IA panel : ${rendus.length} IA · notes ${detail}${moyenne != null ? ` · moyenne ${moyenne}/10` : ""} · ${lecons} leçon(s) gravée(s).`);
  return { ok: true, ia_repondues: rendus.length, moyenne, notes: rendus, lecons };
}

// « Rebascule vers moi-même » : renvoie à Bruno les avis bruts pas encore lus
// (un canal — cockpit/WhatsApp — les tire, les affiche, puis ils sont marqués vus).
async function avisBrunoNonVus() {
  const lignes = await g("core_avis_ia", "select=id,cree_le,fournisseur,modele,famille,note,avis&vu_par_bruno=eq.false&order=cree_le.desc&limit=20");
  const ids = (lignes || []).map((l: any) => l.id);
  if (ids.length) await patch("core_avis_ia", `id=in.(${ids.join(",")})`, { vu_par_bruno: true });
  return { ok: true, nouveaux: lignes?.length || 0, avis: lignes || [] };
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
    if (mode === "avis_bruno") return J(await avisBrunoNonVus());
    if (mode === "diag_nvidia") return J(await diagNvidia());
    const recentes = await g("core_bible_bugs", "select=bug,regle,departement,cree_le&order=cree_le.desc&limit=10");
    return J({ ok: true, service: "navlys-bible-routine", aide: "POST {source,texte} = ingérer un retour externe · GET ?mode=boucle|verifier|recherche|avis|avis_bruno = auto-scan", dernieres_lecons: recentes });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const source = String(b.source || "externe").slice(0, 80);
  const texte = String(b.texte || "").trim();
  if (!texte) return J({ ok: false, erreur: "texte vide" }, 400);
  const n = await ingerer(source, texte);
  return J({ ok: true, source, lecons_gravees: n });
});
