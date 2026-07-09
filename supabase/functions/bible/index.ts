// NAVLYS — « bible » : la routine parfaite, sans interruption.
// Ingère TOUT retour externe (audit d'agence, plainte, bug, incident, 💡 Améliorer),
// en extrait les vrais enseignements via Claude, les grave en règles permanentes
// (navlys_regle), et gonfle la mémoire du bon agent (agent_note) — pour que
// NAVLYS n'ait plus jamais à réapprendre la même leçon deux fois.
//   POST {source, texte}      → ingère un texte externe précis (audit, mail, retour…)
//   GET  ?mode=boucle         → scanne SEUL les nouvelles sources internes non
//                                digérées (core_feedback, core_incidents résolus)
//                                et les ingère automatiquement. Cron toutes les heures.
//   GET                       → diag readiness.
// Tourne sur Supabase (indépendant de toute session Claude Code) : 24/7, sans Bruno.
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
    if (u.searchParams.get("mode") === "boucle") return J({ ok: true, ...(await boucle()) });
    const recentes = await g("core_bible_bugs", "select=bug,regle,departement,cree_le&order=cree_le.desc&limit=10");
    return J({ ok: true, service: "navlys-bible-routine", aide: "POST {source,texte} = ingérer un retour externe · GET ?mode=boucle = auto-scan", dernieres_lecons: recentes });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const source = String(b.source || "externe").slice(0, 80);
  const texte = String(b.texte || "").trim();
  if (!texte) return J({ ok: false, erreur: "texte vide" }, 400);
  const n = await ingerer(source, texte);
  return J({ ok: true, source, lecons_gravees: n });
});
