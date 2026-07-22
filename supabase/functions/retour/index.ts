// NAVLYS — Retour (bouton 💡 bas-gauche de toutes les applications).
// POST {page,type,portee,message,prenom,contact,lang,session}
//   -> enregistre dans core_feedback + journal ;
//   -> une CRITIQUE part aussi dans navlys_incident (routage auto vers le bon agent).
// Réponse de remerciement chaleureuse dans la langue de la personne (statique, zéro token).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function ins(t:string,b:unknown){ await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...h(),Prefer:"return=minimal"},body:JSON.stringify(b)}); }
async function rpc(fn:string,b:unknown){ try{ await fetch(U+"/rest/v1/rpc/"+fn,{method:"POST",headers:h(),body:JSON.stringify(b)}); }catch(_e){} }
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);

const MERCI: Record<string,string> = {
  fr: "Merci, c'est précieux 🙏 Ton retour est arrivé chez nous — on le lit, on l'applique si possible, et on te répond.",
  en: "Thank you — this is precious 🙏 Your feedback has reached us; we read it, apply it where we can, and get back to you.",
  ru: "Спасибо, это очень ценно 🙏 Твой отзыв у нас — мы читаем, применяем что можно и отвечаем тебе.",
  he: "תודה, זה יקר לנו 🙏 המשוב שלך הגיע אלינו — אנחנו קוראים, מיישמים כשאפשר, וחוזרים אליך.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") return J({ ok:true, service:"navlys-retour" });
  if (req.method !== "POST") return J({ error:"method" }, 405);
  const b:any = await req.json().catch(()=>({}));
  const message = clean(b.message, 3000);
  if (!message) return J({ error:"vide" }, 400);
  const type = ["critique","remarque","suggestion"].indexOf(clean(b.type,20))>-1 ? clean(b.type,20) : "suggestion";
  const portee = clean(b.portee,20)==="communaute" ? "communaute" : "perso";
  const page = clean(b.page,200) || "/";
  const prenom = clean(b.prenom,60);
  const contact = clean(b.contact,160);
  const session = clean(b.session,80);
  const langRaw = clean(b.lang,8).toLowerCase();
  let lang = "fr";
  if (/[֐-׿]/.test(message)) lang="he";
  else if (/[Ѐ-ӿ]/.test(message)) lang="ru";
  else if (langRaw.indexOf("he")===0) lang="he";
  else if (langRaw.indexOf("ru")===0) lang="ru";
  else if (langRaw.indexOf("en")===0) lang="en";

  await ins("core_feedback", { page, type, portee, message, prenom, contact, lang, session });
  await ins("journal", { type:"feedback", message:"💡 "+type+" ("+portee+") sur "+page+" : "+message.slice(0,120) });
  if (type === "critique") {
    // routage auto-cicatrisation : la critique part vers le bon agent (NAVDEM/NAVTECH…)
    await rpc("navlys_incident", { p_source:"feedback_app", p_sujet:"Critique sur "+page, p_contenu:message, p_categorie:"plainte", p_severite:2 });
  }
  return J({ ok:true, merci: MERCI[lang]||MERCI.fr });
});
