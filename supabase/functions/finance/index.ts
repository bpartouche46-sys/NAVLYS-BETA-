// NAVLYS Finance — lit le compte Alpaca (PAPER/test) via notre API.
// GET -> { ok, compte:{valeur_portefeuille, cash, pouvoir_achat, paper}, positions[] }
// Secrets Edge (tolérant à la casse) : ALPACA_KEY_ID, ALPACA_SECRET, ALPACA_BASE.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const env = (n: string) => Deno.env.get(n) || Deno.env.get(n.toLowerCase()) || Deno.env.get(n.toUpperCase()) || "";
const KEY = env("ALPACA_KEY_ID").trim();
const SEC = env("ALPACA_SECRET").trim();
const BASE = (env("ALPACA_BASE") || "https://paper-api.alpaca.markets").trim().replace(/\/+$/, "");
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,apikey,content-type",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
async function ax(path: string) {
  const r = await fetch(BASE + path, { headers: { "APCA-API-KEY-ID": KEY, "APCA-API-SECRET-KEY": SEC } });
  const t = await r.text(); let d: any; try { d = JSON.parse(t); } catch { d = t; }
  return { ok: r.ok, status: r.status, data: d };
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (!KEY || !SEC) return J({ ok: false, error: "Cles Alpaca manquantes" }, 200);
  const acc = await ax("/v2/account");
  if (!acc.ok) return J({ ok: false, step: "account", status: acc.status, error: acc.data }, 200);
  const pos = await ax("/v2/positions");
  const a: any = acc.data;
  return J({
    ok: true,
    compte: { statut: a.status, devise: a.currency, valeur_portefeuille: a.portfolio_value, cash: a.cash, pouvoir_achat: a.buying_power, paper: BASE.includes("paper") },
    positions: (Array.isArray(pos.data) ? pos.data : []).map((p: any) => ({ symbole: p.symbol, qte: p.qty, valeur: p.market_value, pl: p.unrealized_pl })),
  });
});
