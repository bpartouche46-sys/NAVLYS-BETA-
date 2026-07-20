// NAVLYS — PANEL des 5 lentilles (méthode STORM, doctrine Bruno 2026-07-06).
// Pour toute recherche/analyse importante : 5 agents se CONTREDISENT, puis on
// extrait la solution commune malgré les contradictions + AUTO-NOTATION solide/fragile.
// POST {sujet, contexte?} -> { lentilles[5], contradictions, solution_commune, autonotation:{solide,fragile} }
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL") || "";
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
// Repli anti-coupure (indépendance CORE) : OpenRouter si Anthropic tombe. Clé tolérante.
const OR = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || Deno.env.get("OPEN_API_ROUTER") || Deno.env.get("OPEN_API_ROUTER_KEY") || "";
const MODEL = Deno.env.get("NAVLYS_PANEL_MODEL") || "claude-haiku-4-5-20251001";
const OR_MODELS = ["anthropic/claude-haiku-4.5", "meta-llama/llama-3.3-70b-instruct:free"];
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"POST,GET,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey", "Access-Control-Max-Age":"86400" };
const J = (d:unknown,s=200)=> new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}});
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);

const LENSES = [
  { nom:"Praticien",  icone:"🔧", sys:"Tu es LE PRATICIEN. Terrain, faisabilité, mise en œuvre concrète : ce qui marche VRAIMENT, les contraintes réelles, les étapes. Direct et opérationnel." },
  { nom:"Sceptique",  icone:"❓", sys:"Tu es LE SCEPTIQUE. Ton rôle est de RÉFUTER : failles, hypothèses fragiles, risques, ce qui peut mal tourner. Doute par défaut, sois incisif." },
  { nom:"Économiste", icone:"€",  sys:"Tu es L'ÉCONOMISTE. Coûts, ROI, incitations, effets de bord économiques, soutenabilité financière. Chiffre dès que possible." },
  { nom:"Historien",  icone:"⏳", sys:"Tu es L'HISTORIEN. Précédents, ce qui a déjà été tenté, leçons du passé, cycles. Compare à des cas connus." },
  { nom:"Académique", icone:"📖", sys:"Tu es L'ACADÉMIQUE. Rigueur, théorie, méthode, sources, définitions précises. Structure et nuance." },
];

async function askAnthropic(sys:string, user:string, maxTok:number):Promise<string>{
  const r = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST",
    headers:{ "x-api-key":ANTH, "anthropic-version":"2023-06-01", "Content-Type":"application/json" },
    body:JSON.stringify({ model:MODEL, max_tokens:maxTok, system:sys, messages:[{role:"user",content:user}] }) });
  const d:any = await r.json().catch(()=>({}));
  if(!r.ok) throw new Error("anthropic_"+r.status+" "+clean(JSON.stringify(d?.error||d),160));
  const t=(d?.content?.[0]?.text || "").trim();
  if(!t) throw new Error("anthropic_empty");
  return t;
}
async function askOpenRouter(sys:string, user:string, maxTok:number):Promise<string>{
  for(const m of OR_MODELS){
    try{
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions",{ method:"POST",
        headers:{ "Authorization":"Bearer "+OR, "Content-Type":"application/json", "HTTP-Referer":"https://navlys.com", "X-Title":"NAVLYS" },
        body:JSON.stringify({ model:m, max_tokens:maxTok, messages:[{role:"system",content:sys},{role:"user",content:user}] }) });
      const d:any = await r.json().catch(()=>({}));
      if(r.ok){ const t=(d?.choices?.[0]?.message?.content || "").trim(); if(t) return t; }
    }catch(_){ /* modèle suivant */ }
  }
  throw new Error("openrouter_failed");
}
// callBrain : Anthropic direct d'abord, OpenRouter en repli seul (indépendance CORE)
async function ask(sys:string, user:string, maxTok=380):Promise<string>{
  if(ANTH){ try{ return await askAnthropic(sys,user,maxTok); }catch(_){ /* repli */ } }
  if(OR) return await askOpenRouter(sys,user,maxTok);
  throw new Error("no_llm");
}
function firstJson(s:string):any{ const m=s.match(/\{[\s\S]*\}/); if(!m) return null; try{ return JSON.parse(m[0]); }catch{ return null; } }

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});
  if(req.method==="GET") return J({ ok:true, service:"navlys-panel", lentilles:LENSES.map(l=>l.nom), cle:!!ANTH, repli:!!OR });
  if(req.method!=="POST") return J({ error:"method" },405);
  if(!ANTH && !OR) return J({ ok:false, error:"cle_absente", hint:"Poser ANTHROPIC_API_KEY (ou OPENROUTER_API_KEY) dans les secrets Supabase." },200);
  const b:any = await req.json().catch(()=>({}));
  const sujet = clean(b.sujet||b.question, 800);
  const contexte = clean(b.contexte, 1200);
  if(!sujet) return J({ error:"sujet requis" },400);

  const consigne = "Sujet : "+sujet+(contexte?("\nContexte : "+contexte):"")+
    "\n\nEn 5 lignes MAX, tranchant, tu peux CONTREDIRE les autres lentilles. Donne : POSITION | MEILLEURE SOLUTION (selon ta lentille) | PRINCIPALE FAILLE que tu vois.";
  try{
    // 1) Les 5 lentilles en parallèle (elles se contredisent)
    const av = await Promise.all(LENSES.map(async (l)=>{
      try{ const t = await ask(l.sys, consigne); return { nom:l.nom, icone:l.icone, avis:t }; }
      catch(e){ return { nom:l.nom, icone:l.icone, avis:"(indisponible : "+clean((e as Error).message,80)+")" }; }
    }));
    // 2) Synthèse des contradictions + solution commune + auto-notation
    const bloc = av.map(a=>"["+a.nom+"] "+a.avis).join("\n\n");
    const synthSys = "Tu es l'ARBITRE NAVLYS. On te donne 5 analyses volontairement contradictoires (Praticien, Sceptique, Économiste, Historien, Académique). Ton travail : faire ressortir la MEILLEURE solution malgré les contradictions, et noter honnêtement sa solidité.";
    const synthUser = "Sujet : "+sujet+"\n\nLes 5 avis :\n"+bloc+
      "\n\nRéponds STRICTEMENT en JSON (rien d'autre) : {\"contradictions\":\"les désaccords majeurs en 2-3 phrases\",\"solution_commune\":\"la meilleure solution retenue malgré les contradictions, actionnable\",\"points_forts\":\"ce qui fait consensus\",\"solide\":<0-100 : à quel point la conclusion est SOLIDE>,\"fragile\":<0-100 : ce qui reste FRAGILE/incertain>}";
    const raw = await ask(synthSys, synthUser, 700);
    const syn = firstJson(raw) || { contradictions:"", solution_commune:raw.slice(0,600), points_forts:"", solide:0, fragile:0 };
    const solide = Math.max(0,Math.min(100, Number(syn.solide)||0));
    const fragile = Math.max(0,Math.min(100, Number(syn.fragile)||0));

    // journal (traçabilité)
    if(U && K){ fetch(U+"/rest/v1/journal",{method:"POST",headers:{apikey:K,Authorization:"Bearer "+K,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({ type:"panel", message:"Panel 5 lentilles — "+sujet.slice(0,80)+" | solide "+solide+"% / fragile "+fragile+"%" })}).catch(()=>{}); }

    return J({ ok:true, sujet, lentilles:av,
      contradictions:syn.contradictions||"", points_forts:syn.points_forts||"",
      solution_commune:syn.solution_commune||"", autonotation:{ solide, fragile } });
  }catch(e){ return J({ ok:false, error:clean((e as Error).message,200) },200); }
});
