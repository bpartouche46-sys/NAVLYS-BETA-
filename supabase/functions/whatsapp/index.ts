// NAVLYS — Webhook WhatsApp (360dialog) servi par Supabase.
// Indépendant de Vercel : utilise les MÊMES secrets que le cockpit
// (SUPABASE_SERVICE_ROLE_KEY qui traverse RLS) -> la liste d'agents n'est
// plus jamais vide. SAV public + mode PILOTE pour Bruno.
//
// Secrets Supabase (Edge Functions → Secrets) :
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY  (déjà là)
//   D360_API_KEY        = clé API du canal 360dialog (pour ENVOYER)
//   BRUNO_WHATSAPP      = ton numéro en chiffres (mode pilote)
//   WHATSAPP_VERIFY_TOKEN = mot au choix (vérif webhook, optionnel)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const MODEL = "claude-haiku-4-5-20251001", MAX_TOKENS = 600;
const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const D360 = Deno.env.get("D360_API_KEY") || "";
const VERIFY = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "";
const onlyDigits = (s:unknown)=>String(s||"").replace(/\D/g,"");
const BRUNO = onlyDigits(Deno.env.get("BRUNO_WHATSAPP"));

const SYSTEM_SAV = [
  "Tu es l'Aide & SAV NAVLYS sur WhatsApp — chaleureux, simple, humain, images marines, jamais robotique. Réponses COURTES (WhatsApp).",
  "NAVLYS = univers d'applications humain + IA, accessible à tous. Apps : Finance (éducation, GRATUIT 0EUR), Next Gen (livre/film de vie, gratuit puis 9,99EUR HT/mois), NAVLEX (juridique, 3 questions offertes puis 9,99EUR HT/mois), Journal Influenceurs, Journal de l'IA, Radio.",
  "Tous les prix sont HT. INTERDIT : conseil financier personnalisé / promesse de rendement (renvoie à l'éducation), conseil juridique personnalisé (renvoie NAVLEX, info générale). Si sensible/inconnu : propose de laisser un message à l'équipe."
].join(" ");

async function anthropic(system:string, content:string){
  const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ANTH,"anthropic-version":"2023-06-01","Content-Type":"application/json"},body:JSON.stringify({model:MODEL,max_tokens:MAX_TOKENS,system,messages:[{role:"user",content}]})});
  const d:any = await r.json().catch(()=>({}));
  return ((d.content||[]).filter((c:any)=>c.type==="text").map((c:any)=>c.text).join("\n").trim());
}
async function sendWA(to:string, body:string){
  if(body.length>3900) body=body.slice(0,3900)+"\n…(suite tronquée)";
  await fetch("https://waba-v2.360dialog.io/messages",{method:"POST",headers:{"D360-API-KEY":D360,"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",to,type:"text",text:{body}})});
}
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function sbGet(table:string,select:string,order?:string,limit?:number){
  const url=(ord?:string|null)=>`${U}/rest/v1/${table}?select=${encodeURIComponent(select)}${ord?`&order=${encodeURIComponent(ord)}`:""}${limit?`&limit=${limit}`:""}`;
  let r=await fetch(url(order),{headers:h()}); if(!r.ok&&order) r=await fetch(url(null),{headers:h()});
  return r.ok? await r.json().catch(()=>[]):[];
}
async function sbFilter(table:string,select:string,filter:string,limit?:number){
  const r=await fetch(`${U}/rest/v1/${table}?select=${encodeURIComponent(select)}&${filter}${limit?`&limit=${limit}`:""}`,{headers:h()});
  return r.ok? await r.json().catch(()=>[]):[];
}
async function sbPatch(table:string,filter:string,patch:unknown){ await fetch(`${U}/rest/v1/${table}?${filter}`,{method:"PATCH",headers:{...h(),Prefer:"return=representation"},body:JSON.stringify(patch)}); }
async function sbInsert(table:string,row:unknown){ const r=await fetch(`${U}/rest/v1/${table}`,{method:"POST",headers:{...h(),Prefer:"return=representation"},body:JSON.stringify(row)}); return r.ok? await r.json().catch(()=>[]):[]; }

const KEYWORDS:any={NAVFI:["bourse","finance","etf","crypto","épargne","leçon","marché"],NAVCOM:["post","réseau","communication","news","article","presse","faq"],NAVTECH:["site","infra","vercel","déploiement","bug","technique","migration"],NAVLEX:["juridique","rgpd","cgv","mentions","conformité","légal"],NAVPART:["partenaire","affiliation","binance","alpaca","etoro","bybit"],NAVPTE:["sécurité","secret","faille","protection","audit sécu"],NAVGEN:["visuel","logo","image","génome","design"],NAVBIO:["souvenir","biographie","livre de vie","next gen","héritage"],NAVLAB:["recherche","prototype","innovation","r&d"],NAVLEAD:["influenceur","ambassadeur","créateur"],NAVBIEN:["bien-être","reiki","réflexo","accessibilité"],NAVDEM:["produit","appli","feedback","retour membre","évolution"],NAVME:["mémoire","souvenir interne","apprentissage"],NAVMKT:["cohérence","uniformise","rapport","synthèse"]};
function routeDept(text:string, valid:string[]){
  const low=(text||"").toLowerCase(); const m=low.match(/@([a-z]+)/);
  if(m){const d="NAV"+m[1].slice(3).toUpperCase(); if(valid.includes(d)) return d;}
  for(const dept of Object.keys(KEYWORDS)) if(valid.includes(dept)&&KEYWORDS[dept].some((w:string)=>low.includes(w))) return dept;
  return valid.includes("NAVMKT")?"NAVMKT":(valid[0]||"NAVMKT");
}
const stripHandle=(t:string)=>(t||"").split(/\s+/).filter((w)=>!w.startsWith("@")).join(" ").trim();
const AIDE=["🧭 NAVLYS — tu pilotes le corps central.","• Écris en clair (ou @navfi …) → je crée la mission au bon agent.","• /recap — état des missions","• /agents — les 14 agents","• /voir <id> — lire un livrable","• /valider <id> — valider","• /refuser <id> motif — renvoyer à l'agent","• /rapport — le point du jour"].join("\n");

async function pilote(text:string){
  const low=text.toLowerCase().trim();
  if(low==="/aide"||low==="/start"||low==="/help") return AIDE;
  if(low.startsWith("/agents")){
    const ags=await sbGet("agents","id,prenom,handle","id.asc",50);
    if(!ags.length) return "Aucun agent chargé.";
    return "👥 LES AGENTS\n"+ags.map((a:any)=>`${a.prenom||"?"} ${a.handle||""} — ${a.id}`).join("\n");
  }
  if(low.startsWith("/recap")){
    const ms=await sbGet("missions","id,titre,statut,departement","id.desc",100);
    if(!ms.length) return "📊 Aucune mission pour l'instant.";
    const by:any={}; ms.forEach((m:any)=>{(by[m.statut]=by[m.statut]||[]).push(m);});
    const out=["📊 RÉCAP MISSIONS"];
    for(const s of ["a_valider","a_faire","en_cours","fait","erreur"]){ const it=by[s]||[]; if(!it.length) continue; out.push(`\n— ${s} (${it.length}) —`); it.slice(0,15).forEach((m:any)=>out.push(`#${m.id} [${m.departement}] ${m.titre}`)); }
    return out.join("\n");
  }
  if(low.startsWith("/voir")){
    const id=text.split(/\s+/)[1]; if(!id) return "Usage : /voir <id>";
    const rows=await sbFilter("missions","id,titre,statut,resultat",`id=eq.${encodeURIComponent(id)}`,1);
    if(!rows.length) return `Mission #${id} introuvable.`; const m=rows[0];
    return `#${m.id} ${m.titre} [${m.statut}]\n\n${m.resultat||"(pas encore de livrable)"}`;
  }
  if(low.startsWith("/valider")){
    const id=text.split(/\s+/)[1]; if(!id) return "Usage : /valider <id>";
    await sbPatch("missions",`id=eq.${encodeURIComponent(id)}`,{statut:"fait"});
    await sbInsert("journal",{type:"validation",message:`Bruno a validé #${id} (WhatsApp).`});
    return `✅ Mission #${id} validée.`;
  }
  if(low.startsWith("/refuser")){
    const parts=text.split(/\s+/); const id=parts[1]; if(!id) return "Usage : /refuser <id> motif";
    const motif=parts.slice(2).join(" ")||"non précisé";
    await sbPatch("missions",`id=eq.${encodeURIComponent(id)}`,{statut:"a_faire",erreur:motif.slice(0,500)});
    await sbInsert("journal",{type:"refus",message:`Bruno a refusé #${id} (WhatsApp) : ${motif.slice(0,120)}`});
    return `↩️ Mission #${id} renvoyée à l'agent. Motif noté.`;
  }
  if(low.startsWith("/rapport")){
    const [ags,ms]=await Promise.all([sbGet("agents","id,prenom,autonomie","id.asc",50),sbGet("missions","id,titre,statut,departement","id.desc",100)]);
    const stats:any={}; ms.forEach((m:any)=>{stats[m.statut]=(stats[m.statut]||0)+1;});
    const aValider=ms.filter((m:any)=>m.statut==="a_valider").map((m:any)=>`#${m.id} [${m.departement}] ${m.titre}`).slice(0,12);
    if(!ANTH) return [`📋 RAPPORT NAVLYS`,`${ags.length} agents.`,`À valider ${stats.a_valider||0} · à faire ${stats.a_faire||0} · en cours ${stats.en_cours||0} · fait ${stats.fait||0} · erreur ${stats.erreur||0}.`,aValider.length?`Priorité validation :\n${aValider.join("\n")}`:`Rien n'attend ta validation. 🌊`].join("\n");
    const SYS="Tu es le Rapporteur de NAVLYS qui parle à Bruno sur WhatsApp. Point COURT (4-6 phrases), chaleureux, parlé, tutoiement. Statut simple citoyen : aucune promesse financière. Termine par UNE action concrète proposée.";
    const usr=`AGENTS: ${ags.map((a:any)=>`${a.prenom||a.id}/${a.autonomie||"?"}`).join(", ")}\nCOMPTEURS: ${JSON.stringify(stats)}\nÀ VALIDER: ${aValider.join(" | ")||"aucune"}\nFais le point.`;
    return "📋 "+((await anthropic(SYS,usr))||"Tout est calme pour le moment. 🌊");
  }
  // Message libre -> création de mission routée
  const ags=await sbGet("agents","id","id.asc",50); const valid=ags.map((a:any)=>a.id);
  if(!valid.length) return "Le corps central n'a pas encore d'agents chargés en base.";
  const dept=routeDept(text,valid); const consigne=stripHandle(text)||text;
  const row=await sbInsert("missions",{departement:dept,titre:consigne.slice(0,120),consigne,priorite:2,statut:"a_faire"});
  const created=Array.isArray(row)?row[0]:row; const mid=created&&created.id!=null?created.id:"?";
  await sbInsert("journal",{type:"ordre",message:`Bruno -> ${dept} (WhatsApp) mission #${mid}`});
  return `📥 Mission #${mid} confiée à ${dept}.\nIl prépare ; tu recevras « à valider ». (/recap pour suivre)`;
}

Deno.serve(async (req) => {
  const u = new URL(req.url);
  if (req.method === "GET") {
    const mode=u.searchParams.get("hub.mode"), token=u.searchParams.get("hub.verify_token"), challenge=u.searchParams.get("hub.challenge");
    if (mode==="subscribe" && token && token===VERIFY) return new Response(challenge||"",{status:200});
    return new Response("ok",{status:200});
  }
  if (req.method !== "POST") return new Response("POST only",{status:405});
  let body:any; try{ body=await req.json(); }catch{ return new Response("ok",{status:200}); }
  try{
    const value=body?.entry?.[0]?.changes?.[0]?.value;
    const msg=value?.messages?.[0];
    if(msg && msg.type==="text" && D360){
      const from=msg.from; const txt=msg.text?.body||"";
      const isBruno=BRUNO && onlyDigits(from)===BRUNO;
      let reply:string|undefined;
      if(isBruno && U && K) reply=await pilote(txt);
      else if(isBruno) reply="Cockpit non configuré : ajoute SUPABASE_SERVICE_ROLE_KEY dans les secrets Supabase.";
      else if(ANTH) reply=(await anthropic(SYSTEM_SAV,txt))||"Je reviens vers toi très vite 🌊";
      if(reply) await sendWA(from,reply);
    }
  }catch(_e){ /* on accuse réception */ }
  return new Response(JSON.stringify({received:true}),{status:200,headers:{"Content-Type":"application/json"}});
});
