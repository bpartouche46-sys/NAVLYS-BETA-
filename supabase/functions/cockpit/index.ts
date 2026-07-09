// NAVLYS Cockpit — API JSON servie par Supabase (independant de Vercel).
// Le rendu HTML du cockpit est servi par Netlify (les Edge Functions Supabase
// sandboxent le HTML : text/plain + CSP). Ici on ne sert que du JSON (CORS *).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
function h(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function g(t:string,q:string){ const r=await fetch(U+"/rest/v1/"+t+"?"+q,{headers:h()}); return r.ok? await r.json():[]; }
async function pa(t:string,f:string,b:unknown){ await fetch(U+"/rest/v1/"+t+"?"+f,{method:"PATCH",headers:{...h(),Prefer:"return=representation"},body:JSON.stringify(b)}); }
async function ins(t:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...h(),Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok? await r.json():[]; }
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const enc=(x:unknown)=>encodeURIComponent(String(x));
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") return J({ ok:true, service:"navlys-cockpit-api", info:"POST {action,token}. Le cockpit visuel est sur navlys.com/cockpit." });
  if (req.method !== "POST") return J({ error:"method" }, 405);
  const body:any = await req.json().catch(()=>({}));
  const passRow = await g("core_config","select=value&key=eq.cockpit_pass&limit=1");
  const pass = passRow[0] && passRow[0].value;
  if (!pass || body.token !== pass) return J({ error:"Mot de passe invalide" }, 401);
  const a = body.action || "state";
  if (a === "state") {
    const [agents, missions, journal] = await Promise.all([
      g("agents","select=id,prenom,handle,role,autonomie,actif&order=id.asc"),
      g("missions","select=id,titre,statut,departement,resultat,consigne&order=id.desc&limit=200"),
      g("journal","select=type,message,ts&order=ts.desc&limit=40")
    ]);
    const stats:any = {}; for (const m of missions) stats[m.statut]=(stats[m.statut]||0)+1;
    return J({ agents, missions, journal, stats });
  }
  if (a === "valider") { await pa("missions","id=eq."+enc(body.id),{statut:"fait"}); await ins("journal",{type:"validation",message:"Bruno a valide #"+body.id+" (cockpit)"}); return J({ok:true}); }
  if (a === "valider_tout") {
    const att = await g("missions","select=id&statut=eq.a_valider&limit=500");
    if (!att.length) return J({ ok:true, valides:0 });
    await pa("missions","statut=eq.a_valider",{statut:"fait"});
    await ins("journal",{type:"validation",message:"Bruno a TOUT valide en un clic : "+att.length+" mission(s) (cockpit)"});
    return J({ ok:true, valides:att.length });
  }
  if (a === "refuser") { await pa("missions","id=eq."+enc(body.id),{statut:"a_faire",erreur:String(body.motif||"").slice(0,500)}); await ins("journal",{type:"refus",message:"Bruno a refuse #"+body.id+" (cockpit)"}); return J({ok:true}); }
  if (a === "create") {
    const txt = String(body.texte||"").trim(); if(!txt) return J({error:"vide"},400);
    const low = txt.toLowerCase(); const KW:any={NAVFI:["bourse","finance","etf","crypto","lecon","marche"],NAVCOM:["post","reseau","news","article","presse"],NAVTECH:["site","infra","vercel","bug","technique"],NAVLEX:["juridique","rgpd","cgv","legal"],NAVPART:["partenaire","affiliation","alpaca"],NAVPTE:["securite","secret","faille"],NAVGEN:["visuel","logo","image","design"],NAVBIO:["souvenir","biographie","vie"],NAVLAB:["recherche","innovation"],NAVLEAD:["influenceur","ambassadeur"],NAVBIEN:["accessibilite","bien-etre"],NAVDEM:["produit","appli","feedback"],NAVME:["memoire","apprentissage"],NAVMKT:["coherence","rapport","synthese"]};
    let dept="NAVMKT"; const mm=low.match(/@([a-z]+)/); if(mm){dept="NAV"+mm[1].slice(3).toUpperCase();} else { for(const k in KW){ if(KW[k].some((w:string)=>low.includes(w))){dept=k;break;} } }
    const consigne = txt.split(/\s+/).filter((w:string)=>w[0]!=="@").join(" ")||txt;
    const row = await ins("missions",{departement:dept,titre:consigne.slice(0,120),consigne,priorite:2,statut:"a_faire"});
    await ins("journal",{type:"ordre",message:"Cockpit -> "+dept+" : "+consigne.slice(0,70)});
    return J({ ok:true, departement:dept, mission:row[0] });
  }
  if (a === "briefing") {
    const [agents, missions] = await Promise.all([g("agents","select=id,prenom"),g("missions","select=id,titre,statut,departement&order=id.desc&limit=200")]);
    const stats:any={}; for(const m of missions) stats[m.statut]=(stats[m.statut]||0)+1;
    const av = missions.filter((m:any)=>m.statut==="a_valider").map((m:any)=>"#"+m.id+" "+m.departement+" "+m.titre).slice(0,10);
    if (!ANTH) return J({ text:"Etat NAVLYS : "+agents.length+" agents. A valider "+(stats.a_valider||0)+", a faire "+(stats.a_faire||0)+", en cours "+(stats.en_cours||0)+", fait "+(stats.fait||0)+". "+(av.length?"A valider : "+av.join(" ; "):"Rien n attend ta validation.") });
    const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":ANTH,"anthropic-version":"2023-06-01","Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:600,system:"Tu es le Rapporteur de NAVLYS. Point oral court et chaleureux a Bruno (5-7 phrases), tutoiement, statut simple citoyen.",messages:[{role:"user",content:"Compteurs: "+JSON.stringify(stats)+". A valider: "+(av.join(" | ")||"aucune")+". Fais le point."}]})});
    const d:any = await r.json().catch(()=>({}));
    const text = ((d.content||[]).filter((c:any)=>c.type==="text").map((c:any)=>c.text).join("\n").trim())||"Tout est calme.";
    return J({ text });
  }
  return J({ error:"action inconnue" }, 400);
});
