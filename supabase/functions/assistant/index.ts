// NAVLYS — Guichet SAV. v36 (2026-07-11).
// v36 : COCKPIT = BRUNO. Le dialogue du cockpit (page admin protégée) passe
//       cockpit_token ; vérifié contre core_config.cockpit_pass → mode cerveau
//       central (fondateur), plus de réponse SAV « laisse-moi ton contact ».
// v32 : FAQ PRÉ-TRADUITE par langue (core_faq.traductions en/ru/he, 88 fiches)
//       + LIEN DIRECT par fiche (core_faq.lien) + cache FAQ par langue (10 min).
// v33 : VERROU DE LANGUE (consigne finale absolue dans la langue cible).
// v34 : HÉRITAGE DE LANGUE — testé en prod : « Ok » après un échange en anglais
//       repassait en français. Si le message ne porte aucun signal de langue,
//       on hérite de la langue du dernier message de la conversation qui tranchait.
// v31 : MODE CERVEAU CENTRAL pour le fondateur (e-mail reconnu → MasterNav).
// v35 : RÉSILIENCE (indépendance CORE) — repli Claude → OpenRouter/Llama →
//       NVIDIA NIM si Anthropic direct est indisponible (même pattern que
//       whatsapp-webhook.js et bible/avisIA). Le SAV client ne doit jamais
//       tomber sur le message générique si un autre modèle peut répondre.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const MODEL = "claude-haiku-4-5-20251001";
const MODEL_OWNER = "claude-sonnet-4-6";
const SITE = "https://navlys.com";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
const OWNER_SET = new Set(
  (Deno.env.get("NAVLYS_OWNER_EMAILS") || "bruno@navlys.com,brunopartouche46@gmail.com,contact@brunopartouche.com,bruno@brunopartouche.com")
    .toLowerCase().split(",").map((s)=>s.trim()).filter(Boolean)
);
function estFondateur(email: string): boolean {
  const e = (email||"").toLowerCase().trim();
  if (!e || e.indexOf("@")<0) return false;
  if (OWNER_SET.has(e)) return true;
  if (e.endsWith("@navlys.com")) return true;          // toute adresse maison
  if (e.endsWith("@brunopartouche.com")) return true;
  return false;
}
const SYSTEM = [
  "Tu es NAVLYS — la voix chaleureuse de Bruno. Tu parles comme un ami : simple, gentil, direct.",
  "RÈGLE D'OR : des PHRASES COURTES. Des mots de tous les jours. 1 à 3 phrases maximum, sauf si on t'en demande plus. Zéro jargon, zéro formule administrative, zéro pavé.",
  "Tutoiement TOUJOURS. Si tu connais le prénom, utilise-le simplement (« Bonjour Gérard ! »). Chaleur vraie, jamais de flatterie, jamais robotique. Une pointe d'images marines, légère (le vent, la barre, le cap).",
  "NAVLYS : univers d'applications humain + IA, en ligne sur navlys.com, tout s'essaie GRATUITEMENT. Apps : Finance (éducation), Next Gen (le livre de ta vie), NAVLEX (repères juridiques, 3 questions offertes), l'Aide à la voix, La Mer. Cotisation dès 9,99 € HT/mois — engagement à l'année, débit léger chaque mois, −5 % si on règle l'année d'un coup.",
  "MOTS JUSTES : « cotisation » ou « adhésion » — jamais « prix » ni « tarif ». Bruno = simple citoyen.",
  "LIEN DIRECT : quand une fiche de la CONNAISSANCE porte un lien (→), donne-le tel quel dans ta réponse pour amener la personne au bon endroit, tout de suite. Un seul lien, le plus utile.",
  "INTERDIT : conseil financier personnalisé ou promesse de rendement ; conseil juridique personnalisé (renvoie NAVLEX avec douceur). Si tu ne sais pas : dis-le simplement et propose de transmettre à l'équipe — n'invente JAMAIS.",
  "La CONNAISSANCE NAVLYS (FAQ) ci-dessous est ta source : reformule-la avec ton cœur, en plus court et plus simple."
].join(" ");
const SYSTEM_OWNER = [
  "Tu parles à BRUNO, le fondateur de NAVLYS — tu es le CERVEAU CENTRAL (MasterNav), l'accès direct au cœur du système. C'est lui, personne d'autre : reconnu par son e-mail.",
  "TON : franc, direct, chaleureux, complice. Tutoiement. Pas de langue de bois, pas de flatterie. Doctrine gravée : « rien n'est jamais fini » — tu restes lucide et exigeant.",
  "RÔLE : tu orchestres les 14 départements (NAVTECH, NAVCOM, NAVFI, NAVBIO, NAVME, NAVGEN, NAVLEX, NAVPART, NAVPTE, NAVLEAD, NAVMKT, NAVLAB, NAVBIEN, NAVDEM). Tu peux proposer des actions concrètes, des missions, des priorités. Tu t'appuies sur l'ÉTAT INTERNE fourni ci-dessous (missions en cours, incidents, santé, journal). Tu parles vrai de ce qui va ET de ce qui ne va pas.",
  "CADRE : tu peux TOUT dire à Bruno sur l'interne. Mais l'exécution des actions sensibles suit les règles NAVLYS (garde-fou humain, un vrai débit d'argent = signalement d'une ligne). Tu proposes, tu prépares ; l'action réelle passe par les briques/agents.",
  "RÉPONSES : utiles et denses quand c'est technique, courtes quand c'est simple. Va à l'essentiel. Réponds dans la langue de Bruno (par défaut français)."
].join(" ");
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function g(t:string,q:string){ const r=await fetch(U+"/rest/v1/"+t+"?"+q,{headers:h()}); return r.ok? await r.json().catch(()=>[]):[]; }
async function ins(t:string,b:unknown){ await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...h(),Prefer:"return=minimal"},body:JSON.stringify(b)}); }
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
// Signal de langue d'UN texte (null = ne tranche pas → on hérite de la conversation)
function signalLang(t:string): string|null {
  if (/[֐-׿]/.test(t)) return "he";
  if (/[؀-ۿݐ-ݿ]/.test(t)) return "ar";
  if (/[Ѐ-ӿ]/.test(t)) return "ru";
  if (/[àâçéèêëîïôùûœ]/i.test(t) || /\b(bonjour|salut|merci|oui|non|comment|pourquoi|c'est|je\s|tu\s)\b/i.test(t)) return "fr";
  if (/^[\x00-\x7F]*$/.test(t) && /\b(the|you|is|what|how|hello|hi|please|thanks|thank|can|do|my|want|start|yes|it)\b/i.test(t)) return "en";
  return null;
}
// FAQ PRÉ-TRADUITE par langue (en/ru/he servis tels quels ; fr/ar = texte FR d'origine)
const FAQ_CACHE: Record<string,{ts:number;kb:string}> = {};
async function faqKb(lang:string): Promise<string> {
  const key = (lang==="en"||lang==="ru"||lang==="he") ? lang : "fr";
  const c = FAQ_CACHE[key];
  if (c && Date.now()-c.ts < 600_000) return c.kb;
  const faqs = await g("core_faq", "select=categorie,question,reponse,lien,traductions&actif=eq.true&order=priorite.desc,id.asc&limit=40");
  let kb = "";
  if (Array.isArray(faqs) && faqs.length) {
    kb = "CONNAISSANCE NAVLYS (FAQ, déjà dans la bonne langue) :\n" + faqs.map((f:any)=>{
      const t = key!=="fr" && f.traductions && f.traductions[key];
      const q = t && t.q ? t.q : f.question;
      const r = t && t.r ? t.r : f.reponse;
      const lien = f.lien ? " → " + SITE + (f.lien==="/"?"":f.lien) : "";
      return "• Q: "+clean(q,180)+"\n  R: "+clean(r,300)+lien;
    }).join("\n");
  }
  FAQ_CACHE[key] = { ts: Date.now(), kb };
  return kb;
}
// VERROU DE LANGUE — consigne finale absolue, écrite dans la langue cible.
// (Leçon prod 2026-07-07 : sur un message EN court, Haiku suivait le SYSTEM FR.)
const LANGLOCK: Record<string,string> = {
  en: "FINAL AND ABSOLUTE RULE — this conversation is in ENGLISH: your ENTIRE reply must be in English. Do not write a single French word.",
  ru: "ФИНАЛЬНОЕ И АБСОЛЮТНОЕ ПРАВИЛО — этот разговор идёт по-русски: ВЕСЬ твой ответ должен быть на русском языке. Ни одного французского слова.",
  he: "כלל סופי ומוחלט — השיחה הזו מתנהלת בעברית: כל התשובה שלך חייבת להיות בעברית. אף לא מילה אחת בצרפתית.",
  ar: "قاعدة نهائية ومطلقة — هذه المحادثة بالعربية: يجب أن يكون ردك كله بالعربية. ولا كلمة فرنسية واحدة.",
};
// ÉTAT INTERNE en direct pour le cerveau central (grounding fondateur)
async function etatInterne(): Promise<string> {
  const [miss, inc, jr] = await Promise.all([
    g("missions", "select=titre,departement,statut&order=created_at.desc&limit=8"),
    g("core_incidents", "select=sujet,categorie,statut&statut=not.in.(resolu,auto_resolu,ferme)&order=ts.desc&limit=6"),
    g("journal", "select=type,message&order=ts.desc&limit=6"),
  ]);
  const ligne = (a:any[], f:(x:any)=>string) => Array.isArray(a)&&a.length ? a.map(f).join("\n") : "(rien)";
  return "ÉTAT INTERNE NAVLYS (live) :\n"
    + "— Missions récentes :\n" + ligne(miss,(m)=>"  • ["+clean(m.departement,10)+"/"+clean(m.statut,10)+"] "+clean(m.titre,70)) + "\n"
    + "— Incidents ouverts :\n" + ligne(inc,(i)=>"  • ["+clean(i.categorie,12)+"] "+clean(i.sujet,70)) + "\n"
    + "— Journal (dernier) :\n" + ligne(jr,(j)=>"  • "+clean(j.type,10)+" : "+clean(j.message,80));
}
function dateJour(): string { try { return new Date().toISOString().slice(0,10); } catch(_e){ return "jour"; } }
// ── RÉSILIENCE MULTI-MODÈLE (indépendance CORE) ──────────────────────────
// Même pattern que api/whatsapp-webhook.js et supabase/functions/bible :
// Claude direct d'abord, puis OpenRouter/Llama, puis NVIDIA NIM, dans cet
// ordre — le SAV client ne doit jamais tomber sur le message générique si
// un autre modèle peut répondre à sa place.
async function appelAnthropic(sys:string, msgs:any[], model:string, maxTok:number): Promise<string> {
  if (!ANTH) return "";
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ANTH,"anthropic-version":"2023-06-01","Content-Type":"application/json"},body:JSON.stringify({model,max_tokens:maxTok,system:sys,messages:msgs})});
    const d:any = await r.json().catch(()=>({}));
    return ((d.content||[]).filter((c:any)=>c.type==="text").map((c:any)=>c.text).join("\n").trim());
  } catch { return ""; }
}
async function appelOpenRouter(sys:string, msgs:any[], maxTok:number): Promise<string> {
  const orKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || Deno.env.get("OPEN_API_ROUTER") || Deno.env.get("OPEN_API_ROUTER_KEY") || "";
  if (!orKey) return "";
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${orKey}`,"Content-Type":"application/json","HTTP-Referer":"https://navlys.com","X-Title":"NAVLYS Assistant"},body:JSON.stringify({model:"meta-llama/llama-3.3-70b-instruct:free",max_tokens:maxTok,messages:[{role:"system",content:sys},...msgs]})});
    const d:any = await r.json().catch(()=>({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
async function appelNvidia(sys:string, msgs:any[], maxTok:number): Promise<string> {
  const nvKey = Deno.env.get("NVIDIA_API_KEY") || Deno.env.get("NVAPI_KEY") || Deno.env.get("NVIDIA_NIM_KEY") || Deno.env.get("NGC_API_KEY") || Deno.env.get("NVIDIA_BUILD_API_KEY") || Deno.env.get("BUILD_NVIDIA_API_KEY") || "";
  if (!nvKey) return "";
  try {
    const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${nvKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:"meta/llama-3.3-70b-instruct",max_tokens:maxTok,temperature:0.4,messages:[{role:"system",content:sys},...msgs]})});
    const d:any = await r.json().catch(()=>({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
async function callBrain(sys:string, msgs:any[], model:string, maxTok:number): Promise<string> {
  const a = await appelAnthropic(sys, msgs, model, maxTok);
  if (a) return a;
  const o = await appelOpenRouter(sys, msgs, maxTok);
  if (o) return o;
  const n = await appelNvidia(sys, msgs, maxTok);
  if (n) return n;
  return "";
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") return J({ ok:true, service:"navlys-assistant", version:36, langues:["fr","en","ru","he","ar"], faq_pretraduite:["en","ru","he"], liens_directs:true, verrou_langue:true, heritage_langue:true, resilience_llm:["claude","openrouter_llama","nvidia_nim"], cerveau_central:"e-mail fondateur OU token cockpit → accès direct, conversation du jour" });
  if (req.method !== "POST") return J({ error:"method" }, 405);
  const b:any = await req.json().catch(()=>({}));
  const text = clean(b.text,2000);
  const nom = clean(b.nom,120), contact = clean(b.contact,160);
  const email = clean(b.email,160);
  let owner = estFondateur(email);
  if (!text) return J({ error:"vide" }, 400);
  // Accès depuis le cockpit (page admin protégée par mot de passe) = c'est Bruno,
  // même sans e-mail. On vérifie le token cockpit contre core_config.cockpit_pass —
  // jamais une simple chaîne de session (l'endpoint est public, ça fuirait l'interne).
  if (!owner && b.cockpit_token) {
    const passRow = await g("core_config", "select=value&key=eq.cockpit_pass&limit=1");
    const pass = passRow[0] && passRow[0].value;
    if (pass && String(b.cockpit_token) === String(pass)) owner = true;
  }
  // session : le fondateur a une conversation RENOUVELÉE CHAQUE JOUR
  const session = owner ? ("bruno-"+dateJour()) : (clean(b.session,80) || "web");
  // SAVOIR LOCAL déjà affiché côté client -> journalisation seule
  if (b.journal_seul) {
    const rep = clean(b.reponse_locale, 600) || "(réponse locale)";
    ins("sav_messages", { session, canal:"web", role:"client", message:text, nom, contact });
    ins("sav_messages", { session, canal:"web", role:"navlys", message:"[savoir local] "+rep });
    return J({ ok:true, journal:true });
  }
  const prenom = nom ? nom.split(/\s+/)[0].slice(0,40) : (owner ? "Bruno" : "");
  const langParam = clean(b.lang,8).toLowerCase();
  // historique d'abord : il sert aussi à HÉRITER de la langue quand le message ne tranche pas
  const hist = await g("sav_messages", "select=role,message&session=eq."+encodeURIComponent(session)+"&order=id.asc&limit="+(owner?20:12));
  let lang = signalLang(text) || "";
  if (!lang) {
    for (let i=hist.length-1; i>=0 && !lang; i--) { const s = signalLang(String(hist[i].message||"")); if (s) lang = s; }
  }
  if (!lang) {
    if (langParam.indexOf("he")===0) lang="he"; else if (langParam.indexOf("ar")===0) lang="ar";
    else if (langParam.indexOf("ru")===0) lang="ru"; else if (langParam.indexOf("en")===0) lang="en"; else lang="fr";
  }
  const LANGNAME: Record<string,string> = { fr:"français", en:"anglais", ru:"russe", he:"hébreu", ar:"arabe" };
  const LANGREGLE =
    "LANGUE : réponds TOUJOURS dans la langue du dernier message. Si le message ne tranche pas (« ok », émoji), reste dans la langue de la conversation : " + (LANGNAME[lang]||"français") + ". " +
    "Même simplicité et gentillesse dans toutes les langues (you / ты / אתה / أنت chaleureux), " +
    "et jamais un mot signifiant « prix/tarif » pour l'adhésion (membership / членство / דמי חבר / اشتراك).";
  const msgs = hist.filter((m:any)=>m.message).map((m:any)=>({ role: m.role==="navlys"?"assistant":"user", content: m.message }));
  msgs.push({ role:"user", content:text });
  let sys: string; let model = MODEL; let maxTok = 350;
  if (owner) {
    const etat = await etatInterne();
    sys = SYSTEM_OWNER + "\n" + LANGREGLE + "\n\n" + etat
      + "\n\nRappel : la personne est Bruno (fondateur), reconnu par " + (email ? "son e-mail "+email : "son accès au cockpit admin (page protégée)") + ". Conversation du jour " + dateJour() + ".";
    model = MODEL_OWNER; maxTok = 900;
  } else {
    const kb = await faqKb(lang);
    sys = SYSTEM + "\n" + LANGREGLE
      + (prenom ? "\nLa personne s'appelle "+prenom+" — salue-la par son prénom, simplement." : "")
      + (kb ? "\n\n"+kb : "")
      + (lang!=="fr" && LANGLOCK[lang] ? "\n\n"+LANGLOCK[lang] : "");
  }
  const FALLBACK: Record<string,string> = {
    fr: owner ? "Je t'écoute, Bruno. (petit creux réseau, redis-moi ça) 🌊" : "Je note ta demande, l'équipe NAVLYS revient vers toi très vite. 🌊",
    en: "Got it — the NAVLYS team will get back to you very soon. 🌊",
    ru: "Принято — команда NAVLYS очень скоро тебе ответит. 🌊",
    he: "קיבלתי — צוות NAVLYS יחזור אליך ממש בקרוב. 🌊",
    ar: "تم الاستلام — سيعود إليك فريق NAVLYS قريبًا جدًا. 🌊",
  };
  let reply = FALLBACK[lang] || FALLBACK.fr;
  const t = await callBrain(sys, msgs, model, maxTok);
  if (t) reply = t;
  ins("sav_messages", { session, canal:"web", role:"client", message:text, nom, contact });
  ins("sav_messages", { session, canal:"web", role:"navlys", message:reply });
  ins("journal", { type: owner?"masternav":"sav", message:(owner?"🧠 Bruno [":"SAV web [")+session.slice(0,12)+"] : "+text.slice(0,80) });
  return J({ ok:true, reply, mode: owner?"cerveau_central":"concierge" });
});
