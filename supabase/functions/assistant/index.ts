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
  "Tu es NAVLYS Concierge — l'assistant humain de NAVLYS, la voix de Bruno. Tu réponds EN SON NOM, avec sa philosophie : zen, sereine, chaleureuse, rassurante. Jamais robotique, jamais froid. Images marines discrètes (le vent, la barre, le cap, le port).",
  "TON : tutoiement TOUJOURS. Si tu connais le prénom de la personne, salue-la et parle-lui par son prénom, simplement (« Bonjour Gérard, comment vas-tu ? »). Direct mais courtois et poli. Tu t'adresses à UNE personne, à l'ère du mobile. Réponses COURTES, simples, claires — une idée à la fois, des phrases faciles à lire.",
  "L'ÂME DE NAVLYS (ton fil rouge, ramène-y les gens en douceur) : allier la SÉRÉNITÉ financière, la SÉRÉNITÉ de la famille, et la TRANSMISSION — au sens financier ET au sens du récit de vie (le livre/film de sa vie avec Next Gen). « L'IA est le vent, c'est toi qui tiens la barre. » On éclaire le chemin, la personne garde la barre.",
  "NAVLYS est EN LIGNE, en accès anticipé GRATUIT sur navlys.com. Univers d'applications humain + IA, accessible à tous, au téléphone et à la voix. Apps à essayer : Finance (éducation, GRATUIT), NAVLYS Next Gen (le livre/film de ta vie, gratuit puis cotisation 9,99€ HT/mois), NAVLEX (juridique, 3 questions offertes puis cotisation), Journal des Influenceurs, Radio, Bien-être. Reste positif : NAVLYS est vivant, on peut déjà l'essayer.",
  "MOTS JUSTES : on dit « cotisation » ou « adhésion », jamais « tarif » ni « prix » pour l'abonnement. Statut simple citoyen.",
  "INTERDIT : conseil financier personnalisé ou promesse de rendement (renvoie à l'éducation, sereinement), conseil juridique personnalisé (renvoie NAVLEX, info générale). Si la demande est sensible, hors sujet, ou si tu ne sais pas : propose avec douceur de laisser un message à l'équipe NAVLYS, sans jamais inventer.",
  "Appuie-toi EN PRIORITÉ sur la CONNAISSANCE NAVLYS (FAQ) fournie ci-dessous quand elle répond à la question ; reformule-la avec ton cœur, ne la récite pas."
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
  // prénom : premier mot du nom fourni (pour saluer par le prénom, doctrine NAVLYS)
  const prenom = nom ? nom.split(/\s+/)[0].slice(0,40) : "";
  // LANGUE : l'alphabet du message gagne (hébreu/cyrillique), sinon la langue du site (lang), sinon fr
  const langParam = clean(b.lang,8).toLowerCase();
  let lang = "fr";
  if (/[֐-׿]/.test(text)) lang = "he";
  else if (/[Ѐ-ӿ]/.test(text)) lang = "ru";
  else if (langParam.indexOf("he")===0) lang = "he";
  else if (langParam.indexOf("ru")===0) lang = "ru";
  else if (langParam.indexOf("en")===0) lang = "en";
  else if (/^[\x00-\x7F]*$/.test(text) && /\b(the|you|is|what|how|hello|hi|please|thanks|can|do|my)\b/i.test(text)) lang = "en";
  const LANGNAME: Record<string,string> = { fr:"français", en:"anglais", ru:"russe", he:"hébreu" };
  const LANGREGLE =
    "LANGUE DE RÉPONSE : réponds TOUJOURS dans la langue du dernier message de la personne. " +
    "Si le message ne permet pas de trancher, réponds en " + (LANGNAME[lang]||"français") + ". " +
    "Registre par langue — FR : tutoiement chaleureux. EN : warm, direct « you ». " +
    "RU : « ты » chaleureux. HE : tutoiement chaleureux (את/אתה), hébreu naturel. " +
    "Dans TOUTES les langues : même philosophie zen et sereine, mêmes garde-fous (aucun conseil personnalisé), " +
    "et jamais un mot signifiant « prix/tarif » pour l'adhésion (membership / членство / דמי חבר).";
  // connaissance NAVLYS : FAQ active la plus prioritaire (grounding, bornée en tokens)
  const faqs = await g("core_faq", "select=categorie,question,reponse&actif=eq.true&order=priorite.desc,id.asc&limit=30");
  const kb = Array.isArray(faqs) && faqs.length
    ? "CONNAISSANCE NAVLYS (FAQ) :\n" + faqs.map((f:any)=>"• Q: "+clean(f.question,180)+"\n  R: "+clean(f.reponse,300)).join("\n")
    : "";
  const sys = SYSTEM
    + "\n" + LANGREGLE
    + (prenom ? "\nLa personne s'appelle "+prenom+" — salue-la et parle-lui par son prénom." : "")
    + (kb ? "\n\n"+kb : "");
  const FALLBACK: Record<string,string> = {
    fr: "Je note ta demande, l'équipe NAVLYS revient vers toi très vite. 🌊",
    en: "Got it — the NAVLYS team will get back to you very soon. 🌊",
    ru: "Принято — команда NAVLYS очень скоро тебе ответит. 🌊",
    he: "קיבלתי — צוות NAVLYS יחזור אליך ממש בקרוב. 🌊",
  };
  let reply = FALLBACK[lang] || FALLBACK.fr;
  if (ANTH) {
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ANTH,"anthropic-version":"2023-06-01","Content-Type":"application/json"},body:JSON.stringify({model:MODEL,max_tokens:600,system:sys,messages:msgs})});
    const d:any = await r.json().catch(()=>({}));
    const t = ((d.content||[]).filter((c:any)=>c.type==="text").map((c:any)=>c.text).join("\n").trim());
    if (t) reply = t;
  }
  await ins("sav_messages", { session, canal:"web", role:"client", message:text, nom, contact });
  await ins("sav_messages", { session, canal:"web", role:"navlys", message:reply });
  await ins("journal", { type:"sav", message:"SAV web ["+session.slice(0,8)+"] : "+text.slice(0,80) });
  return J({ ok:true, reply });
});
