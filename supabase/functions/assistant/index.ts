// NAVLYS — Guichet SAV (web, puis WhatsApp/Twilio). 100% sur la base NAVLYS.
// POST {session,text,nom,contact} -> reponse SAV (Anthropic) + journal des
// echanges dans sav_messages + entree journal (visible au cockpit).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const MODEL = "claude-haiku-4-5-20251001";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
const SYSTEM = [
  "Tu es l'Assistant & SAV NAVLYS — chaleureux, simple, humain, images marines discrètes, jamais robotique. Réponses COURTES et claires.",
  "NAVLYS est EN LIGNE, en accès anticipé GRATUIT sur navlys.com (ouverture le 1er juillet 2026). NAVLYS = univers d'applications humain + IA, accessible à tous, au téléphone et à la voix. Apps testables dès maintenant : Finance (éducation, GRATUIT), NAVLYS Next Gen (livre/film de ta vie, gratuit puis 9,99€ HT/mois), NAVLEX (juridique, 3 questions offertes puis 9,99€ HT/mois), Journal des Influenceurs, Radio, Bien-être. Reste positif : NAVLYS est vivant, on peut déjà l'essayer.",
  "INTERDIT : conseil financier personnalisé ou promesse de rendement (renvoie à l'éducation), conseil juridique personnalisé (renvoie NAVLEX, info générale). Si la demande est sensible, hors sujet, ou si tu ne sais pas : propose gentiment de laisser un message à l'équipe NAVLYS, sans inventer."
].join(" ");
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function g(t:string,q:string){ const r=await fetch(U+"/rest/v1/"+t+"?"+q,{headers:h()}); return r.ok? await r.json().catch(()=>[]):[]; }
async function ins(t:string,b:unknown){ await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...h(),Prefer:"return=minimal"},body:JSON.stringify(b)}); }
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") return J({ ok:true, service:"navlys-assistant" });
  if (req.method !== "POST") return J({ error:"method" }, 405);
  const b:any = await req.json().catch(()=>({}));
  const session = clean(b.session,80) || "web";
  const text = clean(b.text,2000);
  const nom = clean(b.nom,120), contact = clean(b.contact,160);
  if (!text) return J({ error:"vide" }, 400);
  const hist = await g("sav_messages", "select=role,message&session=eq."+encodeURIComponent(session)+"&order=id.asc&limit=12");
  const msgs = hist.filter((m:any)=>m.message).map((m:any)=>({ role: m.role==="navlys"?"assistant":"user", content: m.message }));
  msgs.push({ role:"user", content:text });
  let reply = "Je note ta demande, l'équipe NAVLYS revient vers toi très vite. 🌊";
  if (ANTH) {
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ANTH,"anthropic-version":"2023-06-01","Content-Type":"application/json"},body:JSON.stringify({model:MODEL,max_tokens:600,system:SYSTEM,messages:msgs})});
    const d:any = await r.json().catch(()=>({}));
    const t = ((d.content||[]).filter((c:any)=>c.type==="text").map((c:any)=>c.text).join("\n").trim());
    if (t) reply = t;
  }
  await ins("sav_messages", { session, canal:"web", role:"client", message:text, nom, contact });
  await ins("sav_messages", { session, canal:"web", role:"navlys", message:reply });
  await ins("journal", { type:"sav", message:"SAV web ["+session.slice(0,8)+"] : "+text.slice(0,80) });
  return J({ ok:true, reply });
});
