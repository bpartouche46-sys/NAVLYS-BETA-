// NAVLYS — « voix-demo » : la preuve en direct que la voix change le site.
// Demande de Bruno (2026-07-09) : « je veux pouvoir utiliser tout avec ma
// voix... montre-moi le changement online en temps réel. » Un visiteur (ou
// Bruno) parle ou tape un ordre sur la homepage → ça devient une VRAIE
// mission en base, routée vers le bon département, ET une ligne apparaît
// dans le bandeau EN DIRECT (brique vitrine) en moins de 30 secondes.
// Pas une simulation : une vraie ligne, dans une vraie table.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Max-Age": "86400",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
function h() { return { apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" }; }
async function ins(t: string, b: unknown) {
  const r = await fetch(`${U}/rest/v1/${t}`, { method: "POST", headers: { ...h(), Prefer: "return=representation" }, body: JSON.stringify(b) });
  return r.ok ? await r.json() : [];
}

const DEPTS: Record<string, string[]> = {
  NAVFI: ["finance", "argent", "investi", "épargne", "pea", "budget"],
  NAVLEX: ["juridique", "loi", "contrat", "droit"],
  NAVBIO: ["mémoire", "biographie", "souvenir", "vie", "journal"],
  NAVTECH: ["bug", "site", "page", "erreur", "lien", "technique"],
  NAVMKT: ["marketing", "communication", "pub", "réseau"],
  NAVBIEN: ["bien-être", "santé", "sommeil", "stress"],
};
function routerDept(texte: string): string {
  const low = texte.toLowerCase();
  for (const dept in DEPTS) if (DEPTS[dept].some((mot) => low.includes(mot))) return dept;
  return "NAVDEM";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const texte = String(b.texte || "").trim().slice(0, 300);
  if (!texte) return J({ ok: false, erreur: "texte vide" }, 400);
  if (texte.length < 3) return J({ ok: false, erreur: "trop court" }, 400);

  const dept = routerDept(texte);
  const mission = await ins("missions", {
    departement: dept, titre: texte.slice(0, 120), consigne: texte, priorite: 3, statut: "a_faire",
  });
  await ins("journal", {
    type: "chantier",
    message: `▶ Un visiteur a proposé, à la voix/au clavier : « ${texte.slice(0, 100)} » → routé vers ${dept}`,
  });
  return J({ ok: true, departement: dept, mission: mission[0] || null });
});
