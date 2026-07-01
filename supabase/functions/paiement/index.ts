// NAVLYS — Caisse multi-fournisseurs (anti-blocage). Stripe + PayPal derriere un
// seul endpoint. Si un provider bloque -> on bascule via core_config payment_provider
// ou le champ 'provider'. Aucune cle exposee ; tout cote serveur.
// GET  ?diag                 -> providers configures + provider actif
// POST {provider?,montant,devise?,libelle?,success_url,cancel_url} -> {ok,provider,url}
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const env = (n: string) => Deno.env.get(n) || Deno.env.get(n.toLowerCase()) || Deno.env.get(n.toUpperCase()) || "";
const STRIPE = (env("STRIPE_SECRET_TEST") || env("STRIPE_SECRET")).trim();
const PP_ID = env("PAYPAL_CLIENT_ID").trim();
const PP_SEC = env("PAYPAL_SECRET").trim();
const PP_ENV = (env("PAYPAL_ENV") || "sandbox").trim().toLowerCase();
const PP_BASE = PP_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "authorization,apikey,content-type" };
function J(d: unknown, s = 200) { return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } }); }
const providers = () => ({ stripe: !!STRIPE, paypal: !!(PP_ID && PP_SEC) });
function pick(req?: string) { const p = providers(); if (req && (p as any)[req]) return req; if (p.stripe) return "stripe"; if (p.paypal) return "paypal"; return ""; }

async function stripeCheckout(montant: number, devise: string, libelle: string, ok: string, cancel: string) {
  const f = new URLSearchParams();
  f.set("mode", "payment"); f.set("success_url", ok); f.set("cancel_url", cancel);
  f.set("line_items[0][quantity]", "1");
  f.set("line_items[0][price_data][currency]", devise);
  f.set("line_items[0][price_data][product_data][name]", libelle);
  f.set("line_items[0][price_data][unit_amount]", String(Math.round(montant * 100)));
  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: "Bearer " + STRIPE, "Content-Type": "application/x-www-form-urlencoded" }, body: f });
  const d: any = await r.json(); if (!r.ok) throw new Error(d?.error?.message || "stripe"); return d.url as string;
}
async function paypalCheckout(montant: number, devise: string, libelle: string, ok: string, cancel: string) {
  const tk = await fetch(PP_BASE + "/v1/oauth2/token", { method: "POST", headers: { Authorization: "Basic " + btoa(PP_ID + ":" + PP_SEC), "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=client_credentials" });
  const tj: any = await tk.json(); if (!tk.ok) throw new Error(tj?.error_description || "paypal token");
  const or = await fetch(PP_BASE + "/v2/checkout/orders", { method: "POST", headers: { Authorization: "Bearer " + tj.access_token, "Content-Type": "application/json" }, body: JSON.stringify({ intent: "CAPTURE", purchase_units: [{ description: libelle, amount: { currency_code: devise.toUpperCase(), value: montant.toFixed(2) } }], application_context: { brand_name: "NAVLYS", user_action: "PAY_NOW", return_url: ok, cancel_url: cancel } }) });
  const oj: any = await or.json(); if (!or.ok) throw new Error(oj?.message || "paypal order");
  const link = (oj.links || []).find((l: any) => l.rel === "approve"); return link?.href as string;
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const url = new URL(req.url);
  if (req.method === "GET" || url.searchParams.has("diag")) return J({ ok: true, service: "navlys-paiement", providers: providers(), paypal_env: PP_ENV });
  const b: any = await req.json().catch(() => ({}));
  const provider = pick(b.provider);
  if (!provider) return J({ ok: false, error: "Aucun fournisseur de paiement configure (ajoute les cles Stripe et/ou PayPal)." }, 200);
  const montant = Number(b.montant); if (!montant || montant <= 0) return J({ ok: false, error: "montant invalide" }, 400);
  const devise = (b.devise || "eur").toString().toLowerCase();
  const libelle = (b.libelle || "NAVLYS").toString().slice(0, 120);
  const ok = (b.success_url || "https://navlys.com/?paye=ok").toString();
  const cancel = (b.cancel_url || "https://navlys.com/?paye=annule").toString();
  try {
    const link = provider === "paypal" ? await paypalCheckout(montant, devise, libelle, ok, cancel) : await stripeCheckout(montant, devise, libelle, ok, cancel);
    return J({ ok: true, provider, url: link });
  } catch (e) { return J({ ok: false, provider, error: String((e as Error).message || e) }, 200); }
});
