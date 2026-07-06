// NAVLYS — Caisse. Stripe + PayPal + PADDLE. v26 (2026-07-06).
// PADDLE : classification par FORME (règle n°4 poussée à fond) — on scanne tous les
// secrets candidats et on reconnaît : apikey_ = clé API, pri_ = prix, live_/test_ = token client.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const env = (n:string)=> (Deno.env.get(n) || "").trim();
const STRIPE_NAMES = ["STRIPE_SECRET_LIVE","STRIPE_SECRET","STRIPE_LIVE_KEY","STRIPE_LIVE","STRIPE_KEY","STRIPE_SECRET_KEY","STRIPE_API_KEY","STRIPE_SK","STRIPE","STRIPE_SECRET_TEST","STRIPE_RESTRICTED_KEY","STRIPE_RK"];
const isStripeKey = (v:string)=> v.startsWith("sk_") || v.startsWith("rk_");
const CANDIDATES = STRIPE_NAMES.map(env).filter((v,i,a)=> v && isStripeKey(v) && a.indexOf(v)===i);
const LIVE = CANDIDATES.find((v)=> v.startsWith("sk_live")) || CANDIDATES.find((v)=> v.startsWith("rk_live")) || "";
const STRIPE = LIVE || CANDIDATES[0] || "";
const STRIPE_MODE = STRIPE ? (STRIPE.includes("_live") ? "live" : "test") : "absent";
const PP_ID = env("PAYPAL_CLIENT_ID"); const PP_SEC = env("PAYPAL_SECRET");
const PP_ENV = (env("PAYPAL_ENV") || "sandbox").toLowerCase();
const PP_BASE = PP_ENV==="live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
// ---- PADDLE : on scanne large (toutes orthographes) et on classe par forme ----
const PADDLE_SCAN = ["PADDLE_API_KEY","API_PADLE_KEY","API_PADDLE_KEY","PADLE_API_KEY","PADDLE_APIKEY","PADLE_KEY","PADLE","NAVLYS_PADLE","PADDLE_KEY","PADDLE_SECRET","PADDLE_API","PADDLE_TOKEN","NAVLYS_PADDLE","PADDLE","PADDLE_LIVE","PADDLE_SANDBOX","NAVLYS_PACK_PRICE","NAVLYS_UNIVERSE","NAVLYS_UNIVERS","NAVLYS_PRICE","NAVLYS_AVIE","NAVLYS_AVIE_PRICE","PADDLE_PRICE_UNIVERS","PADDLE_PRICE_MOIS","PADDLE_PRICE_AVIE","PADDLE_PRICE","PADDLE_CLIENT_TOKEN","PADDLE_CLIENT_SIDE_TOKEN","CLIENT_SIDE_TOKEN","NAVLYS_PADDLE_TOKEN"];
const PVALS = PADDLE_SCAN.map(env).filter((v,i,a)=> v && a.indexOf(v)===i);
const PADDLE = PVALS.find((v)=> v.startsWith("apikey_")) || "";
const PADDLE_TOKEN_CLIENT = PVALS.find((v)=> v.startsWith("live_")||v.startsWith("test_")) || "";
const PRICES = PVALS.filter((v)=> v.startsWith("pri_"));
// le prix mensuel = le 1er pri_ trouvé ; à-vie = un 2e s'il existe (surchargeable par la requête)
const PADDLE_PRICE_MOIS = env("PADDLE_PRICE_UNIVERS")||env("NAVLYS_PACK_PRICE")||env("NAVLYS_UNIVERSE")||PRICES[0]||"";
const PADDLE_PRICE_AVIE = env("PADDLE_PRICE_AVIE")||env("NAVLYS_AVIE_PRICE")||(PRICES.find((p)=>p!==PADDLE_PRICE_MOIS)||"");
const PADDLE_ENV = (env("PADDLE_ENV") || (PADDLE_TOKEN_CLIENT.startsWith("test_")?"sandbox":"live")).toLowerCase();
const PADDLE_BASE = PADDLE_ENV==="live" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com";
const PREF = env("PAYMENT_PROVIDER").toLowerCase();
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"authorization,apikey,content-type" };
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const providers = ()=>({ stripe: !!STRIPE, paypal: !!(PP_ID && PP_SEC), paddle: !!PADDLE });
function pick(req?:string){ const p:any=providers(); if(req && p[req]) return req; if(PREF && p[PREF]) return PREF; if(p.stripe) return "stripe"; if(p.paypal) return "paypal"; if(p.paddle) return "paddle"; return ""; }
async function stripeCheckout(m:number,dev:string,lib:string,ok:string,cancel:string,rec?:string){ const f=new URLSearchParams(); const it=rec==="an"?"year":(rec==="mois"?"month":""); f.set("mode",it?"subscription":"payment"); f.set("success_url",ok); f.set("cancel_url",cancel); f.set("line_items[0][quantity]","1"); f.set("line_items[0][price_data][currency]",dev); f.set("line_items[0][price_data][product_data][name]",lib); f.set("line_items[0][price_data][unit_amount]",String(Math.round(m*100))); if(it) f.set("line_items[0][price_data][recurring][interval]",it); const r=await fetch("https://api.stripe.com/v1/checkout/sessions",{method:"POST",headers:{Authorization:"Bearer "+STRIPE,"Content-Type":"application/x-www-form-urlencoded"},body:f}); const d:any=await r.json(); if(!r.ok) throw new Error(d?.error?.message||"stripe"); return d.url as string; }
async function paypalCheckout(m:number,dev:string,lib:string,ok:string,cancel:string){ const tk=await fetch(PP_BASE+"/v1/oauth2/token",{method:"POST",headers:{Authorization:"Basic "+btoa(PP_ID+":"+PP_SEC),"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"}); const tj:any=await tk.json(); if(!tk.ok) throw new Error(tj?.error_description||"paypal token"); const or=await fetch(PP_BASE+"/v2/checkout/orders",{method:"POST",headers:{Authorization:"Bearer "+tj.access_token,"Content-Type":"application/json"},body:JSON.stringify({intent:"CAPTURE",purchase_units:[{description:lib,amount:{currency_code:dev.toUpperCase(),value:m.toFixed(2)}}],application_context:{brand_name:"NAVLYS",user_action:"PAY_NOW",return_url:ok,cancel_url:cancel}})}); const oj:any=await or.json(); if(!or.ok) throw new Error(oj?.message||"paypal order"); return (oj.links||[]).find((l:any)=>l.rel==="approve")?.href as string; }
async function paddleCheckout(rec:string, priceOverride:string, ok:string){ const price = priceOverride || (rec ? PADDLE_PRICE_MOIS : (PADDLE_PRICE_AVIE||PADDLE_PRICE_MOIS)); if(!PADDLE) throw new Error("paddle: cle API absente (secret commencant par apikey_)"); if(!price) throw new Error("paddle: price_id manquant (pri_...)"); const r=await fetch(PADDLE_BASE+"/transactions",{method:"POST",headers:{Authorization:"Bearer "+PADDLE,"Content-Type":"application/json"},body:JSON.stringify({items:[{price_id:price,quantity:1}], custom_data:{retour:ok}})}); const d:any=await r.json(); if(!r.ok) throw new Error((d?.error?.detail||d?.error?.code||JSON.stringify(d?.error||d))+" ["+PADDLE_ENV+"]"); const u=d?.data?.checkout?.url; if(!u) throw new Error("paddle: checkout.url absent — regle le 'default payment link' (Checkout settings)"); return u as string; }
Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});
  const url=new URL(req.url);
  // Config PUBLIQUE pour Paddle.js (le token client live_/test_ n'est PAS un secret) :
  if(url.searchParams.has("config")) return J({ ok:true, provider:"paddle", paddle:{ token:PADDLE_TOKEN_CLIENT, env:PADDLE_ENV, price_mois:PADDLE_PRICE_MOIS, price_avie:PADDLE_PRICE_AVIE }, has_token:!!PADDLE_TOKEN_CLIENT, has_prices:PRICES.length>0 });
  if(req.method==="GET" || url.searchParams.has("diag")) return J({ ok:true, service:"navlys-paiement", version:26, providers:providers(), preferred:PREF||null, stripe_mode:STRIPE_MODE, paypal_env:PP_ENV, paddle: PADDLE?{env:PADDLE_ENV, cle_api:true, token_client:!!PADDLE_TOKEN_CLIENT, prix_trouves:PRICES.length, prix_mois:!!PADDLE_PRICE_MOIS, prix_avie:!!PADDLE_PRICE_AVIE}:{cle_api:false, token_client:!!PADDLE_TOKEN_CLIENT, prix_trouves:PRICES.length, note:"pose la CLE API Paddle (valeur commencant par apikey_) — le token client (live_/test_) ne suffit pas pour l'API"} });
  const b:any=await req.json().catch(()=>({}));
  const provider=pick(b.provider);
  if(!provider) return J({ ok:false, error:"Aucun fournisseur configure." },200);
  const montant=Number(b.montant); const devise=(b.devise||"eur").toString().toLowerCase();
  const libelle=(b.libelle||"NAVLYS").toString().slice(0,120); const recurrence=(b.recurrence||"").toString().toLowerCase();
  const ok=(b.success_url||"https://navlys.com/?paye=ok").toString(); const cancel=(b.cancel_url||"https://navlys.com/?paye=annule").toString();
  if(provider!=="paddle" && (!montant||montant<=0)) return J({ ok:false, error:"montant invalide" },400);
  try{ let link:string; if(provider==="paddle") link=await paddleCheckout(recurrence,(b.paddle_price||"").toString(),ok); else if(provider==="paypal") link=await paypalCheckout(montant,devise,libelle,ok,cancel); else link=await stripeCheckout(montant,devise,libelle,ok,cancel,recurrence); return J({ ok:true, provider, url:link }); }
  catch(e){ return J({ ok:false, provider, error:String((e as Error).message||e) },200); }
});
