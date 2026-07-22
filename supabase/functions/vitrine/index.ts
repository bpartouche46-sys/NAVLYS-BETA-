// NAVLYS — « vitrine » : flux public en direct pour le bandeau de la homepage.
// Demande de Bruno (2026-07-09) : « montre-moi le changement online sur le
// site en temps réel — c'est ça qu'il faut valoriser en première page. »
// GET (public, sans mot de passe, sans clé) → les dernières actions réelles
// du CORE (chantiers ouverts/fermés, leçons gravées par la bible), format
// court et grand public — jamais de détail interne sensible.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Max-Age": "86400",
  "Cache-Control": "public, max-age=15",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
async function g(t: string, q: string) {
  const r = await fetch(`${U}/rest/v1/${t}?${q}`, { headers: { apikey: K, Authorization: "Bearer " + K } });
  return r.ok ? await r.json() : [];
}

// Traduit une ligne de journal interne en phrase grand public, courte et vivante.
function grandPublic(m: string): string {
  let n = /(\d+)\s+le[çc]on\(s\)\s+grav[ée]e\(s\)/i.exec(m);
  if (n && Number(n[1]) > 0) return `🧠 Le CORE vient d'apprendre ${n[1]} nouvelle chose${Number(n[1]) > 1 ? "s" : ""} et l'a mémorisée pour tous ses agents.`;
  if (/^▶/.test(m)) return `🚀 Un nouveau chantier vient de démarrer : ${m.replace(/^▶\s*/, "")}`;
  if (/^✔/.test(m)) return `✅ Un chantier vient d'être livré : ${m.replace(/^✔\s*/, "")}`;
  return "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const lignes = await g("journal", "select=type,message,ts&type=in.(bible,chantier)&order=ts.desc&limit=20");
  const feed: string[] = [];
  for (const l of (lignes || [])) {
    const m = grandPublic(String(l.message || "").trim());
    if (m) feed.push(m);
    if (feed.length >= 6) break;
  }
  return J({ ok: true, feed });
});
