// NAVLYS — Routeur média multi-prestataires (photo/vidéo/effets).
// Prend TOUJOURS le meilleur GRATUIT légitime dispo, bascule seul, compte les
// quotas du jour, et protège du payant (réservé admin + signalement Bible §6).
// v6 : les clés peuvent aussi vivre dans core_config (clé=nom du secret) —
// plan B quand le tableau de bord des secrets fait des siennes (règle n°4).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function rpc(fn:string, args:unknown){ const r=await fetch(U+"/rest/v1/rpc/"+fn,{method:"POST",headers:h(),body:JSON.stringify(args)}); if(!r.ok) return null; const t=await r.text().catch(()=>""); if(!t) return null; try{ return JSON.parse(t); }catch(_){ return null; } }
async function g(t:string,q:string){ const r=await fetch(U+"/rest/v1/"+t+"?"+q,{headers:h()}); return r.ok? await r.json():[]; }
async function ins(t:string,b:unknown){ await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...h(),Prefer:"return=minimal"},body:JSON.stringify(b)}); }
// Lecture tolérante (règle n°4) : essaie chaque nom tel quel PUIS sans tenir
// compte de la casse (leçon : « Gemini_API_Key » posé à la main par Bruno).
const ENV_ALL = Deno.env.toObject();
function env(names:string[]){
  for(const n of (names||[])){ const v=Deno.env.get(n); if(v&&v.trim()) return v.trim(); }
  for(const n of (names||[])){
    const hit = Object.keys(ENV_ALL).find((k)=>k.toLowerCase()===n.toLowerCase());
    if(hit && ENV_ALL[hit] && ENV_ALL[hit].trim()) return ENV_ALL[hit].trim();
  }
  return "";
}
// Plan B : clé posée dans core_config (service_role uniquement, jamais exposée).
async function cleEnBase(names:string[]):Promise<string>{
  try{
    const rows = await g("core_config", "select=key,value&key=in.("+ (names||[]).map((n)=>'"'+n+'"').join(",") +")");
    for(const n of (names||[])){ const row=(rows||[]).find((r:any)=>r.key===n); if(row&&row.value&&String(row.value).trim()) return String(row.value).trim(); }
  }catch(_){ /* rien */ }
  return "";
}
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
function b64(bytes:Uint8Array){ let s=""; const CH=0x8000; for(let i=0;i<bytes.length;i+=CH){ s+=String.fromCharCode.apply(null, Array.from(bytes.subarray(i,i+CH)) as unknown as number[]); } return btoa(s); }

// ---- adapters : renvoient {url?} ou {image?(dataURL)} ; lèvent en cas d'échec ----
async function a_pollinations(prompt:string){
  const u="https://image.pollinations.ai/prompt/"+encodeURIComponent(prompt)+"?nologo=true&width=1024&height=1024";
  return { url:u };
}
async function a_huggingface(prompt:string,key:string){
  const model="stabilityai/stable-diffusion-xl-base-1.0";
  const r=await fetch("https://api-inference.huggingface.co/models/"+model,{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({inputs:prompt})});
  if(!r.ok) throw new Error("hf "+r.status);
  const buf=new Uint8Array(await r.arrayBuffer());
  return { image:"data:image/png;base64,"+b64(buf) };
}
async function a_cloudflare(prompt:string){
  const tok=env(["CLOUDFLARE_AI_TOKEN","CF_AI_TOKEN"]) || await cleEnBase(["CLOUDFLARE_AI_TOKEN","CF_AI_TOKEN"]);
  const acct=env(["CLOUDFLARE_ACCOUNT_ID","CF_ACCOUNT_ID"]) || await cleEnBase(["CLOUDFLARE_ACCOUNT_ID","CF_ACCOUNT_ID"]);
  if(!tok||!acct) throw new Error("cf token/account absent");
  const r=await fetch("https://api.cloudflare.com/client/v4/accounts/"+acct+"/ai/run/@cf/black-forest-labs/flux-1-schnell",{method:"POST",headers:{Authorization:"Bearer "+tok,"Content-Type":"application/json"},body:JSON.stringify({prompt})});
  if(!r.ok) throw new Error("cf "+r.status);
  const d=await r.json(); const img=d && d.result && d.result.image; if(!img) throw new Error("cf sans image");
  return { image:"data:image/jpeg;base64,"+img };
}
async function a_gemini(prompt:string,key:string){
  // Image via AI Studio (offre gratuite officielle) — modèle image natif.
  const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key="+encodeURIComponent(key),{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ contents:[{ parts:[{ text:prompt }] }], generationConfig:{ responseModalities:["IMAGE"] } }),
  });
  if(!r.ok) throw new Error("gemini "+r.status);
  const d=await r.json();
  const parts=(d.candidates&&d.candidates[0]&&d.candidates[0].content&&d.candidates[0].content.parts)||[];
  const img=parts.find((p:any)=>p.inlineData&&p.inlineData.data);
  if(!img) throw new Error("gemini sans image");
  return { image:"data:"+(img.inlineData.mimeType||"image/png")+";base64,"+img.inlineData.data };
}
async function a_openai(prompt:string,key:string,size:string){
  const r=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-image-1",prompt,size:size||"1024x1024",n:1})});
  if(!r.ok) throw new Error("openai "+r.status);
  const d=await r.json(); const it=d && d.data && d.data[0];
  if(it && it.url) return { url:it.url }; if(it && it.b64_json) return { image:"data:image/png;base64,"+it.b64_json };
  throw new Error("openai sans image");
}
const ADAPTERS:Record<string,(p:string,k:string,s:string)=>Promise<{url?:string;image?:string}>> = {
  pollinations:(p)=>a_pollinations(p),
  huggingface:(p,k)=>a_huggingface(p,k),
  cloudflare:(p)=>a_cloudflare(p),
  gemini:(p,k)=>a_gemini(p,k),
  openai:(p,k,s)=>a_openai(p,k,s),
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") {
    const provs = await g("core_media_providers","select=code,nom,types,needs_key,secret_names,free_daily,paid,priority,enabled&order=priority.asc");
    const ready = [];
    for (const p of (provs||[])) {
      const cle = p.needs_key ? (!!env(p.secret_names) || !!(await cleEnBase(p.secret_names))) : true;
      ready.push({ code:p.code, nom:p.nom, gratuit:!p.paid, adapteur:!!ADAPTERS[p.code], clef_presente:cle, types:p.types, free_daily:p.free_daily });
    }
    return J({ ok:true, service:"navlys-media-router", info:"POST {type:'image', prompt, size?, token?, provider?}", providers:ready });
  }
  if (req.method !== "POST") return J({ error:"method" }, 405);
  const body:any = await req.json().catch(()=>({}));
  const type = String(body.type||"image");
  const prompt = String(body.prompt||"").trim();
  const size = String(body.size||"1024x1024");
  const cible = String(body.provider||"").trim();   // optionnel : forcer un prestataire (tests)
  if(!prompt) return J({ ok:false, error:"prompt vide" }, 400);
  const passRow = await g("core_config","select=value&key=eq.cockpit_pass&limit=1");
  const pass = passRow[0] && passRow[0].value;
  const admin = !!(body.token && pass && body.token===pass);
  const cands = await rpc("navlys_media_candidats",{ p_type:type });
  const tried:string[]=[];
  for(const c of (cands||[])){
    if(cible && c.code!==cible){ continue; }
    const adap=ADAPTERS[c.code]; if(!adap){ tried.push(c.code+":pas_d_adapteur"); continue; }
    const key = c.needs_key ? (env(c.secret_names) || await cleEnBase(c.secret_names)) : "ok";
    if(c.needs_key && !key){ tried.push(c.code+":clef_absente"); continue; }
    if(c.restant<=0){ tried.push(c.code+":quota_epuise"); continue; }
    if(c.paid && !admin){ tried.push(c.code+":payant_admin_requis"); continue; }
    if(c.paid){ await ins("journal",{type:"paiement",message:"💳 signalement: appel payant "+c.code+" ("+type+")"}); }
    try{
      const out = await adap(prompt, key, size);
      await rpc("navlys_media_utilise",{ p_code:c.code });
      await ins("journal",{type:"media",message:"🎨 "+type+" via "+c.code+(c.paid?" (payant)":" (gratuit)")});
      // NAVLYS — envoi AUTO de la création au dépôt central (navlys.com/depot).
      // Additif et NON bloquant : un échec de dépôt ne casse jamais la création.
      // type hors liste Genesis (design/video/logo) => rangé dans le dépôt, pas en Genesis.
      const depotType = /vid[eé]o/i.test(type) ? "video" : (String(body.depot_type||"").trim() || "design");
      const depotTitre = (String(body.titre||"").trim() || prompt).slice(0,140);
      try{ await ins("navlys_depot",{ source:"media", type:depotType, titre:depotTitre, contenu:(out.image?"[création générée — image base64 dans la réponse média]":""), url:out.url||null, route:"depot" }); }catch(_){ /* le dépôt ne bloque jamais la création */ }
      return J({ ok:true, provider:c.code, paid:!!c.paid, ...out, tried, depose:true });
    }catch(e){ tried.push(c.code+":echec("+String((e as Error).message||e).slice(0,40)+")"); }
  }
  return J({ ok:false, message:"Aucun prestataire dispo pour '"+type+"'. Ajoute une cle gratuite (HF_TOKEN, CLOUDFLARE_AI_TOKEN+CLOUDFLARE_ACCOUNT_ID, GEMINI_API_KEY) ou appelle en admin (token) pour le payant.", tried }, 200);
});
