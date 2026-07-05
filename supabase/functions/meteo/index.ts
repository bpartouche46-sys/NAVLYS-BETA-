// NAVLYS — Météo de la bourse (pour l'environnement de jeu /navjeu).
// GET -> { ok, meteo: "soleil"|"nuages"|"orage", pct_moyen, indices:[{sym,pct}], source }
// Source réelle : Alpaca Market Data (snapshots SPY/QQQ) avec les mêmes clés que
// la brique finance. Si indisponible -> repli "demo" honnête (graine = date).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const env = (n: string) => Deno.env.get(n) || Deno.env.get(n.toLowerCase()) || "";
const KEY = env("ALPACA_KEY_ID").trim();
const SEC = env("ALPACA_SECRET").trim();
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,apikey,content-type",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
function classer(p: number) { return p > 0.3 ? "soleil" : (p < -0.3 ? "orage" : "nuages"); }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const syms = ["SPY", "QQQ"];
  const indices: { sym: string; pct: number }[] = [];
  if (KEY && SEC) {
    for (const sym of syms) {
      try {
        const r = await fetch("https://data.alpaca.markets/v2/stocks/" + sym + "/snapshot",
          { headers: { "APCA-API-KEY-ID": KEY, "APCA-API-SECRET-KEY": SEC } });
        if (!r.ok) continue;
        const d: any = await r.json();
        const day = d && d.dailyBar, prev = d && d.prevDailyBar;
        if (day && prev && prev.c) {
          const pct = 100 * (day.c - prev.c) / prev.c;
          indices.push({ sym, pct: Math.round(pct * 100) / 100 });
        }
      } catch (_e) { /* on continue */ }
    }
  }
  if (indices.length) {
    const moy = indices.reduce((s, x) => s + x.pct, 0) / indices.length;
    return J({ ok: true, meteo: classer(moy), pct_moyen: Math.round(moy * 100) / 100, indices, source: "alpaca" });
  }
  // Repli démo (honnête, affiché comme tel) : graine = date du jour
  const d = new Date(); const seed = d.getUTCFullYear() * 372 + (d.getUTCMonth() + 1) * 31 + d.getUTCDate();
  const r01 = (Math.sin(seed) * 10000) % 1; const pct = Math.round(((r01 + 1) % 1 * 3 - 1.5) * 100) / 100;
  return J({ ok: true, meteo: classer(pct), pct_moyen: pct, indices: [{ sym: "DEMO", pct }], source: "demo" });
});
