// NAVLYS — Webhook WhatsApp (360dialog). v36 (2026-07-10).
// v34 : BIBLE FAQ PRÉ-TRADUITE (core_faq.traductions en/ru/he) + LIEN DIRECT par fiche.
// v35 : HÉRITAGE DE LANGUE (« Ok » après un échange anglais reste en anglais —
//        si le message ne tranche pas, on hérite du dernier message qui tranchait)
//        + VERROU DE LANGUE (consigne finale absolue dans la langue cible).
// v36 : RÉSILIENCE (indépendance CORE) — repli Claude → OpenRouter/Llama →
//        NVIDIA NIM. C'est LE canal indépendant de Claude Code (doctrine
//        2026-07-09) : il ne doit jamais rester silencieux si Anthropic
//        direct tombe. Même pattern que api/whatsapp-webhook.js (Vercel).
// Diag : vérifie ET répare le webhook 360dialog ; ?silencieux=1 = pas d'envoi test.
// Bruno CONVERSE avec le cerveau central (pas de mission auto). Espace fichiers.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const MODEL = "claude-haiku-4-5-20251001", MODEL_OWNER="claude-sonnet-4-6", MAX_TOKENS = 700;
const SITE = "https://navlys.com";
const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const D360 = Deno.env.get("D360_API_KEY") || "";
const VERIFY = Deno.env.get("WHATSAPP_VERIFY_TOKEN") || "";
const SELF_URL = U + "/functions/v1/whatsapp";
const onlyDigits = (s)=>String(s||"").replace(/\D/g,"");
const OWNERS = (Deno.env.get("BRUNO_WHATSAPP")||"").split(/[,;\s]+/).map(onlyDigits).filter(Boolean);
const BUCKET = "espace";
function dateJour(){ try{ return new Date().toISOString().slice(0,10); }catch(_e){ return "jour"; } }
// Signal de langue d'UN texte (null = ne tranche pas → on hérite de la conversation)
function signalLang(t){
  if(/[֐-׿]/.test(t)) return "he";
  if(/[؀-ۿݐ-ݿ]/.test(t)) return "ar";
  if(/[Ѐ-ӿ]/.test(t)) return "ru";
  if(/[àâçéèêëîïôùûœ]/i.test(t) || /\b(bonjour|salut|merci|oui|non|comment|pourquoi|c'est|je\s|tu\s)\b/i.test(t)) return "fr";
  if(/^[\x00-\x7F]*$/.test(t) && /\b(the|you|is|what|how|hello|hi|please|thanks|thank|can|do|my|want|start|yes|it|english)\b/i.test(t)) return "en";
  return null;
}
const detLang = (t)=> signalLang(t) || "fr";
const LANGNAME={fr:"français",en:"anglais",ru:"русский",he:"hébreu",ar:"arabe"};
const LANGLOCK={
  en:"FINAL AND ABSOLUTE RULE — this conversation is in ENGLISH: your ENTIRE reply must be in English. Do not write a single French word.",
  ru:"ФИНАЛЬНОЕ И АБСОЛЮТНОЕ ПРАВИЛО — этот разговор идёт по-русски: ВЕСЬ твой ответ должен быть на русском языке.",
  he:"כלל סופי ומוחלט — השיחה הזו מתנהלת בעברית: כל התשובה שלך חייבת להיות בעברית.",
  ar:"قاعدة نهائية ومطلقة — هذه المحادثة بالعربية: يجب أن يكون ردك كله بالعربية.",
};
const SYSTEM_SAV = [
  "Tu es NAVLYS sur WhatsApp — la voix chaleureuse de Bruno : simple, gentil, direct, humain. Phrases COURTES (WhatsApp), tutoiement, une pointe d'images marines.",
  "Tu RÉPONDS TOUJOURS, à CHAQUE message, même court ('ok', 'oui'). Tu ne laisses jamais quelqu'un sans réponse. Si on te dit 'ok' tu enchaînes en proposant la suite concrète.",
  "NAVLYS = univers d'applications humain + IA, TOUT au téléphone et à la voix. Tout s'essaie GRATUITEMENT. Cotisation dès 19,99€ HT/mois (jamais dire 'prix'/'tarif'). Apps : Finance, Next Gen (le livre de ta vie), NAVLEX, l'Aide à la voix, La Mer.",
  "À CHAQUE fois que c'est utile, DONNE le lien direct (celui de la fiche FAQ, ou la liste de liens) pour que la personne accède tout de suite à ce qu'elle demande.",
  "INTERDIT : conseil financier personnalisé / promesse de rendement, conseil juridique personnalisé (renvoie NAVLEX). Si sensible/inconnu : propose de laisser un message à l'équipe. N'invente jamais — appuie-toi sur la FAQ fournie."
].join(" ");
const SYSTEM_OWNER = [
  "Tu parles à BRUNO, le fondateur de NAVLYS, sur WhatsApp — tu es le CERVEAU CENTRAL (MasterNav). C'est une VRAIE CONVERSATION, comme entre complices. Tu RÉPONDS, tu échanges, tu proposes. Tu ne crées PAS de mission tout seul.",
  "TON : franc, direct, chaleureux, tutoiement. Phrases courtes (WhatsApp). Pas de langue de bois. Doctrine : 'rien n'est jamais fini'.",
  "DÉLÉGATION : si Bruno veut confier une tâche à un agent, rappelle-lui qu'il écrit @navfi, @navtech, @navcom, @navlex, @navlab, @navdem… (ça crée la mission). Sinon, tu discutes simplement et tu l'aides à décider.",
  "Tu peux t'appuyer sur l'ÉTAT INTERNE fourni. Réponds dans la langue de Bruno (français par défaut)."
].join(" ");
// ── RÉSILIENCE MULTI-MODÈLE (indépendance CORE) ──────────────────────────
// C'est LE canal WhatsApp indépendant de Claude Code : Claude direct d'abord,
// puis OpenRouter/Llama, puis NVIDIA NIM — jamais de silence si Anthropic tombe.
async function appelAnthropic(system, msgs, model){
  if(!ANTH) return "";
  try{
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ANTH,"anthropic-version":"2023-06-01","Content-Type":"application/json"},body:JSON.stringify({model:model||MODEL,max_tokens:MAX_TOKENS,system,messages:msgs})});
    const d = await r.json().catch(()=>({}));
    return ((d.content||[]).filter((c)=>c.type==="text").map((c)=>c.text).join("\n").trim());
  }catch{ return ""; }
}
async function appelOpenRouter(system, msgs){
  const orKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || Deno.env.get("OPEN_API_ROUTER") || Deno.env.get("OPEN_API_ROUTER_KEY") || "";
  if(!orKey) return "";
  try{
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${orKey}`,"Content-Type":"application/json","HTTP-Referer":"https://navlys.com","X-Title":"NAVLYS WhatsApp"},body:JSON.stringify({model:"meta-llama/llama-3.3-70b-instruct:free",max_tokens:MAX_TOKENS,messages:[{role:"system",content:system},...msgs]})});
    const d = await r.json().catch(()=>({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  }catch{ return ""; }
}
async function appelNvidia(system, msgs){
  const nvKey = Deno.env.get("NVIDIA_API_KEY") || Deno.env.get("NVAPI_KEY") || Deno.env.get("NVIDIA_NIM_KEY") || Deno.env.get("NGC_API_KEY") || Deno.env.get("NVIDIA_BUILD_API_KEY") || Deno.env.get("BUILD_NVIDIA_API_KEY") || "";
  if(!nvKey) return "";
  try{
    const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${nvKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:"meta/llama-3.3-70b-instruct",max_tokens:MAX_TOKENS,temperature:0.4,messages:[{role:"system",content:system},...msgs]})});
    const d = await r.json().catch(()=>({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  }catch{ return ""; }
}
async function callBrain(system, msgs, model){
  const a = await appelAnthropic(system, msgs, model);
  if(a) return a;
  const o = await appelOpenRouter(system, msgs);
  if(o) return o;
  const n = await appelNvidia(system, msgs);
  if(n) return n;
  return "";
}
async function sendWA(to, body){ if(body.length>3900) body=body.slice(0,3900)+"\n…"; const r = await fetch("https://waba-v2.360dialog.io/messages",{method:"POST",headers:{"D360-API-KEY":D360,"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",to,type:"text",text:{body}})}); console.log("WA_SEND", r.status, (await r.text().catch(()=>"")).slice(0,200)); }
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function sbGet(table,select,order,limit){ const url=(o)=>`${U}/rest/v1/${table}?select=${encodeURIComponent(select)}${o?`&order=${encodeURIComponent(o)}`:""}${limit?`&limit=${limit}`:""}`; let r=await fetch(url(order),{headers:h()}); if(!r.ok&&order) r=await fetch(url(null),{headers:h()}); return r.ok? await r.json().catch(()=>[]):[]; }
async function sbFilter(table,select,filter,limit,order){ const r=await fetch(`${U}/rest/v1/${table}?select=${encodeURIComponent(select)}&${filter}${order?`&order=${encodeURIComponent(order)}`:""}${limit?`&limit=${limit}`:""}`,{headers:h()}); return r.ok? await r.json().catch(()=>[]):[]; }
async function sbPatch(table,filter,patch){ await fetch(`${U}/rest/v1/${table}?${filter}`,{method:"PATCH",headers:{...h(),Prefer:"return=representation"},body:JSON.stringify(patch)}); }
async function sbInsert(table,row){ const r=await fetch(`${U}/rest/v1/${table}`,{method:"POST",headers:{...h(),Prefer:"return=representation"},body:JSON.stringify(row)}); return r.ok? await r.json().catch(()=>[]):[]; }

// ---- BIBLE FAQ (core_faq) : PRÉ-TRADUITE par langue + lien direct par fiche ----
const LIENS = `LIENS À DONNER (propose le lien direct utile) : Accueil ${SITE} · Adhésion ${SITE}/adhesion · Next Gen ${SITE}/next-gen · Finance ${SITE}/finance · NAVLEX ${SITE}/navlex · Aide à la voix ${SITE}/assistance · Ambassadeur ${SITE}/ambassadeur`;
const FAQ_CACHE = {};
async function faqBloc(lang){
  const key = (lang==="en"||lang==="ru"||lang==="he") ? lang : "fr";
  const c = FAQ_CACHE[key];
  if(c && Date.now()-c.ts < 600000) return c.kb;
  const rows = await sbFilter("core_faq","question,reponse,categorie,lien,traductions","or=(actif.is.true,actif.is.null)",40,"priorite.desc.nullslast,id.asc");
  let kb = "";
  if(rows.length){
    const lignes = rows.map((r)=>{
      const t = key!=="fr" && r.traductions && r.traductions[key];
      const q = t && t.q ? t.q : r.question;
      const rep = t && t.r ? t.r : r.reponse;
      const lien = r.lien ? " → "+SITE+(r.lien==="/"?"":r.lien) : "";
      return `• ${q} → ${String(rep||"").replace(/\s+/g," ").slice(0,170)}${lien}`;
    });
    kb = "BIBLE FAQ NAVLYS (déjà dans la bonne langue — appuie-toi dessus, donne le lien direct de la fiche quand il aide, n'invente rien au-delà) :\n"+lignes.join("\n");
  }
  FAQ_CACHE[key] = { ts: Date.now(), kb };
  return kb;
}

// ---- ESPACE FICHIERS ----
async function ensureBucket(){ await fetch(`${U}/storage/v1/bucket`,{method:"POST",headers:{Authorization:`Bearer ${K}`,apikey:K,"Content-Type":"application/json"},body:JSON.stringify({id:BUCKET,name:BUCKET,public:false})}).catch(()=>{}); }
async function d360Media(id){ const r=await fetch(`https://waba-v2.360dialog.io/${id}`,{headers:{"D360-API-KEY":D360}}); const d=await r.json().catch(()=>({})); const url=d&&d.url?String(d.url):""; if(!url) return null; const rr=await fetch(url,{headers:{"D360-API-KEY":D360}}); if(!rr.ok) return null; return { bytes:new Uint8Array(await rr.arrayBuffer()), mime:d.mime_type||"application/octet-stream" }; }
async function saveToSpace(from, media, kind, ts){ await ensureBucket(); const ext=(media.mime.split("/")[1]||"bin").split(";")[0]; const path=`${onlyDigits(from)}/${kind}-${ts}.${ext}`; const up=await fetch(`${U}/storage/v1/object/${BUCKET}/${path}`,{method:"POST",headers:{Authorization:`Bearer ${K}`,apikey:K,"Content-Type":media.mime,"x-upsert":"true"},body:media.bytes}); if(!up.ok) throw new Error("storage "+up.status); return path; }
const RECU={fr:(k)=>`📁 J'ai bien reçu ton ${k} et rangé dans ton espace NAVLYS. Privé, à toi.`,en:(k)=>`📁 Got your ${k} — saved to your NAVLYS space. Private, yours.`,ru:(k)=>`📁 Получил твой ${k} — сохранил в твоём пространстве NAVLYS. Приватно.`,he:(k)=>`📁 קיבלתי את ה-${k} — שמרתי במרחב NAVLYS שלך. פרטי, שלך.`,ar:(k)=>`📁 وصلني ${k} — حفظته في مساحة NAVLYS الخاصة بك. خاص ولك.`};
const KINDNAME={fr:{image:"photo",document:"document",audio:"vocal"},en:{image:"photo",document:"document",audio:"voice note"},ru:{image:"фото",document:"документ",audio:"голосовое"},he:{image:"תמונה",document:"מסמך",audio:"הקלטה"},ar:{image:"صورة",document:"مستند",audio:"رسالة صوتية"}};

// ---- SAV PROSPECT : mémoire + FAQ pré-traduite + lien direct + héritage de langue ----
const LIENFALLBACK={fr:`Je reviens vers toi tout de suite 🌊 En attendant, tout est ici : ${SITE}`,en:`I'm right with you 🌊 Meanwhile, everything is here: ${SITE}`,ru:`Я сейчас вернусь 🌊 А пока всё здесь: ${SITE}`,he:`אני כבר חוזר אליך 🌊 בינתיים הכול כאן: ${SITE}`,ar:`سأعود إليك حالاً 🌊 وفي هذه الأثناء كل شيء هنا: ${SITE}`};
async function savChat(from, text){
  const sess="sav-"+onlyDigits(from)+"-"+dateJour();
  const hist=await sbFilter("sav_messages","role,message",`session=eq.${encodeURIComponent(sess)}`,16,"id.asc");
  // langue : signal du message, sinon héritage du dernier message qui tranchait
  let lang = signalLang(text) || "";
  if(!lang){ for(let i=hist.length-1;i>=0&&!lang;i--){ const s=signalLang(String(hist[i].message||"")); if(s) lang=s; } }
  if(!lang) lang="fr";
  const msgs=hist.filter((m)=>m.message).map((m)=>({role:m.role==="navlys"?"assistant":"user",content:m.message}));
  msgs.push({role:"user",content:text});
  const faq=await faqBloc(lang);
  const sys=SYSTEM_SAV+"\n\n"+faq+"\n\n"+LIENS
    +"\n\nLANGUE : réponds en "+(LANGNAME[lang]||"français")+" ; si la personne change de langue, suis-la immédiatement."
    +(lang!=="fr"&&LANGLOCK[lang]?"\n\n"+LANGLOCK[lang]:"");
  let reply=LIENFALLBACK[lang]||LIENFALLBACK.fr;
  const t=await callBrain(sys,msgs,MODEL); if(t) reply=t;
  await sbInsert("sav_messages",{session:sess,canal:"whatsapp",role:"client",message:text});
  await sbInsert("sav_messages",{session:sess,canal:"whatsapp",role:"navlys",message:reply});
  return reply;
}

// ---- Cockpit slash + délégation @handle ----
const stripHandle=(t)=>(t||"").split(/\s+/).filter((w)=>!w.startsWith("@")).join(" ").trim();
const AIDE=["🧭 NAVLYS — parle-moi normalement, je te réponds ici (cerveau central).","• Pour confier à un agent : écris @navfi … (ou @navtech, @navcom, @navlex, @navlab, @navdem)","• /recap · /voir <id> · /valider <id> · /refuser <id> motif · /rapport"].join("\n");
const DEPTS=["NAVFI","NAVTECH","NAVCOM","NAVLEX","NAVLAB","NAVDEM","NAVMKT","NAVPART","NAVPTE","NAVGEN","NAVBIO","NAVLEAD","NAVBIEN","NAVME"];
async function etatInterne(){
  const ms=await sbGet("missions","id,titre,statut,departement","id.desc",12);
  const stats={}; ms.forEach((m)=>{stats[m.statut]=(stats[m.statut]||0)+1;});
  const av=ms.filter((m)=>m.statut==="a_valider").map((m)=>`#${m.id} [${m.departement}] ${m.titre}`).slice(0,6);
  return `ÉTAT INTERNE (live) — compteurs ${JSON.stringify(stats)} · à valider: ${av.join(" | ")||"aucune"}`;
}
async function ownerChat(from, text){
  const sess="bruno-wa-"+dateJour();
  const hist=await sbFilter("sav_messages","role,message",`session=eq.${encodeURIComponent(sess)}`,20,"id.asc");
  const msgs=hist.filter((m)=>m.message).map((m)=>({role:m.role==="navlys"?"assistant":"user",content:m.message}));
  msgs.push({role:"user",content:text});
  const sys=SYSTEM_OWNER+"\n\n"+(await etatInterne());
  let reply="Je t'écoute, Bruno. 🌊";
  const t=await callBrain(sys,msgs,MODEL_OWNER); if(t) reply=t;
  await sbInsert("sav_messages",{session:sess,canal:"whatsapp",role:"client",message:text});
  await sbInsert("sav_messages",{session:sess,canal:"whatsapp",role:"navlys",message:reply});
  return reply;
}
async function pilote(from, text){
  const low=text.toLowerCase().trim();
  if(low==="/aide"||low==="/start"||low==="/help") return AIDE;
  if(low.startsWith("/recap")){ const ms=await sbGet("missions","id,titre,statut,departement","id.desc",100); if(!ms.length) return "📊 Aucune mission."; const by={}; ms.forEach((m)=>{(by[m.statut]=by[m.statut]||[]).push(m);}); const out=["📊 RÉCAP"]; for(const s of ["a_valider","a_faire","en_cours","fait","erreur"]){ const it=by[s]||[]; if(!it.length) continue; out.push(`\n— ${s} (${it.length}) —`); it.slice(0,12).forEach((m)=>out.push(`#${m.id} [${m.departement}] ${m.titre}`)); } return out.join("\n"); }
  if(low.startsWith("/voir")){ const id=text.split(/\s+/)[1]; if(!id) return "Usage : /voir <id>"; const rows=await sbFilter("missions","id,titre,statut,resultat",`id=eq.${encodeURIComponent(id)}`,1); if(!rows.length) return `#${id} introuvable.`; const m=rows[0]; return `#${m.id} ${m.titre} [${m.statut}]\n\n${m.resultat||"(pas encore de livrable)"}`; }
  if(low.startsWith("/valider")){ const id=text.split(/\s+/)[1]; if(!id) return "Usage : /valider <id>"; await sbPatch("missions",`id=eq.${encodeURIComponent(id)}`,{statut:"fait"}); await sbInsert("journal",{type:"validation",message:`Bruno a validé #${id} (WhatsApp).`}); return `✅ #${id} validée.`; }
  if(low.startsWith("/refuser")){ const parts=text.split(/\s+/); const id=parts[1]; if(!id) return "Usage : /refuser <id> motif"; const motif=parts.slice(2).join(" ")||"non précisé"; await sbPatch("missions",`id=eq.${encodeURIComponent(id)}`,{statut:"a_faire",erreur:motif.slice(0,500)}); await sbInsert("journal",{type:"refus",message:`Bruno a refusé #${id} : ${motif.slice(0,120)}`}); return `↩️ #${id} renvoyée. Motif noté.`; }
  if(low.startsWith("/rapport")){ return "📋 "+((await ownerChat(from,"Fais-moi le point du jour, court."))||"Tout est calme. 🌊"); }
  const m=low.match(/@(nav[a-z]+)/);
  if(m){
    const dept=m[1].toUpperCase();
    if(DEPTS.includes(dept)){
      const consigne=stripHandle(text)||text;
      const row=await sbInsert("missions",{departement:dept,titre:consigne.slice(0,120),consigne,priorite:2,statut:"a_faire"});
      const created=Array.isArray(row)?row[0]:row; const mid=created&&created.id!=null?created.id:"?";
      await sbInsert("journal",{type:"ordre",message:`Bruno -> ${dept} (WhatsApp) mission #${mid}`});
      return `📥 C'est parti — mission #${mid} confiée à ${dept}. (/recap pour suivre)`;
    }
  }
  return await ownerChat(from, text);
}

Deno.serve(async (req) => {
  const u = new URL(req.url);
  if (req.method === "GET") {
    if (u.searchParams.get("diag")) {
      // 1) webhook 360dialog : lire, et RÉPARER s'il ne pointe pas vers nous
      let webhook=null, webhook_fix=null;
      if(D360){
        try{
          const wr=await fetch("https://waba-v2.360dialog.io/v1/configs/webhook",{headers:{"D360-API-KEY":D360}});
          const wd=await wr.json().catch(()=>({}));
          webhook={status:wr.status,url:wd&&wd.url?String(wd.url):null};
          if(webhook.url!==SELF_URL){
            const fr=await fetch("https://waba-v2.360dialog.io/v1/configs/webhook",{method:"POST",headers:{"D360-API-KEY":D360,"Content-Type":"application/json"},body:JSON.stringify({url:SELF_URL})});
            webhook_fix={status:fr.status,body:(await fr.text().catch(()=>"")).slice(0,200)};
          }
        }catch(e){ webhook={error:String(e).slice(0,120)}; }
      }
      // 2) test d'envoi réel (sauf ?silencieux=1)
      let send=null;
      if(D360&&OWNERS[0]&&!u.searchParams.get("silencieux")){ const rr=await fetch("https://waba-v2.360dialog.io/messages",{method:"POST",headers:{"D360-API-KEY":D360,"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",to:OWNERS[0],type:"text",text:{body:"NAVLYS diag ✅ v36 — résilience Claude→OpenRouter→NVIDIA"}})}); send={status:rr.status,body:(await rr.text().catch(()=>"")).slice(0,300)}; }
      let faqN=0; try{ faqN=(await sbFilter("core_faq","id,traductions","or=(actif.is.true,actif.is.null)",1000)).filter((r)=>r.traductions&&r.traductions.he).length; }catch(_e){}
      return new Response(JSON.stringify({version:36,d360:!!D360,owners:OWNERS,anth:!!ANTH,resilience_llm:["claude","openrouter_llama","nvidia_nim"],storage:!!(U&&K),faq_traduites:faqN,self:SELF_URL,webhook,webhook_fix,send}),{status:200,headers:{"Content-Type":"application/json"}});
    }
    const mode=u.searchParams.get("hub.mode"), token=u.searchParams.get("hub.verify_token"), challenge=u.searchParams.get("hub.challenge");
    if (mode==="subscribe" && token && token===VERIFY) return new Response(challenge||"",{status:200});
    return new Response("ok",{status:200});
  }
  if (req.method !== "POST") return new Response("POST only",{status:405});
  let body; try{ body=await req.json(); }catch{ return new Response("ok",{status:200}); }
  try{
    const value=body?.entry?.[0]?.changes?.[0]?.value;
    const msg=value?.messages?.[0];
    if(msg && D360){
      const from=msg.from;
      const isOwner = OWNERS.includes(onlyDigits(from));
      const ts = msg.timestamp || "0";
      const mediaKind = msg.type==="image"?"image":msg.type==="document"?"document":(msg.type==="audio"||msg.type==="voice")?"audio":"";
      if(mediaKind && U && K){
        const mid = msg[msg.type]?.id; const cap = msg[msg.type]?.caption || ""; const lang = detLang(cap||"");
        try{
          const media = mid ? await d360Media(mid) : null;
          if(media){ const path = await saveToSpace(from, media, mediaKind, ts); await sbInsert("journal",{type:"espace",message:`📁 ${mediaKind} WhatsApp [${onlyDigits(from).slice(-4)}] -> ${path}`}); const kname=(KINDNAME[lang]||KINDNAME.fr)[mediaKind]||mediaKind; await sendWA(from,(RECU[lang]||RECU.fr)(kname)); }
          else await sendWA(from, "Je n'ai pas pu récupérer le fichier, réessaie 🌊");
        }catch(_e){ await sendWA(from, "Petit souci pour ranger ton fichier, réessaie 🌊"); }
        return new Response(JSON.stringify({received:true,media:mediaKind}),{status:200,headers:{"Content-Type":"application/json"}});
      }
      if(msg.type==="text"){
        const txt=msg.text?.body||"";
        let reply;
        if(isOwner && U && K) reply=await pilote(from, txt);
        else reply=await savChat(from, txt);
        if(reply) await sendWA(from,reply);
      }
    }
  }catch(_e){ }
  return new Response(JSON.stringify({received:true}),{status:200,headers:{"Content-Type":"application/json"}});
});
