// NAVLYS Cockpit — API JSON servie par Supabase (independant de Vercel).
// Le rendu HTML du cockpit est servi par Netlify/Vercel (navlys.com/cockpit).
// Ici on ne sert que du JSON (CORS *). Le verrou est le mot de passe cockpit_pass.
//
// v2 · 2026-07-11 · action `tableau` (dashboard centralise en 1 appel) + `attente_set`
//   (checklist « En attente de Bruno » persistee dans core_config). Les actions
//   existantes (state/valider/valider_tout/refuser/create/briefing) sont inchangees.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
// Repli anti-coupure (indépendance CORE) : OpenRouter si Anthropic tombe. Clé tolérante.
const OR = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || "";
// callBrain : Anthropic direct d'abord, OpenRouter en repli seul. Renvoie "" si rien n'aboutit.
async function callBrain(system: string, user: string, maxTok: number): Promise<string> {
  if (ANTH) { try {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "x-api-key": ANTH, "anthropic-version": "2023-06-01", "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: maxTok, system, messages: [{ role: "user", content: user }] }) });
    const d: any = await r.json().catch(() => ({}));
    if (r.ok) { const t = ((d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n").trim()); if (t) return t; }
  } catch (_) { /* repli */ } }
  if (OR) { for (const m of ["anthropic/claude-haiku-4.5", "meta-llama/llama-3.3-70b-instruct:free"]) { try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { "Authorization": "Bearer " + OR, "Content-Type": "application/json", "HTTP-Referer": "https://navlys.com", "X-Title": "NAVLYS" }, body: JSON.stringify({ model: m, max_tokens: maxTok, messages: [{ role: "system", content: system }, { role: "user", content: user }] }) });
    const d: any = await r.json().catch(() => ({}));
    if (r.ok) { const t = (d?.choices?.[0]?.message?.content || "").trim(); if (t) return t; }
  } catch (_) { /* modèle suivant */ } } }
  return "";
}
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
// Compte exact via l'en-tete Content-Range (evite de charger toutes les lignes).
async function cnt(t:string,q=""){ const r=await fetch(U+"/rest/v1/"+t+"?select=id"+(q?"&"+q:""),{method:"HEAD",headers:{...h(),Prefer:"count=exact"}}); const cr=r.headers.get("content-range")||"*/0"; return parseInt(cr.split("/")[1]||"0",10)||0; }
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

  // ── Etat simple (retro-compatible : le cockpit v1 s'en sert encore) ──
  if (a === "state") {
    const [agents, missions, journal] = await Promise.all([
      g("agents","select=id,prenom,handle,role,autonomie,actif&order=id.asc"),
      g("missions","select=id,titre,statut,departement,resultat,consigne&order=id.desc&limit=200"),
      g("journal","select=type,message,ts&order=ts.desc&limit=40")
    ]);
    const stats:any = {}; for (const m of missions) stats[m.statut]=(stats[m.statut]||0)+1;
    return J({ agents, missions, journal, stats });
  }

  // ── Tableau de bord centralise : tout ce qu'il faut pour piloter, en 1 appel ──
  if (a === "tableau") {
    const [agents, missions, journal, incidents, bugs, feedback, cfg] = await Promise.all([
      g("agents","select=id,prenom,handle,role,autonomie,actif&order=id.asc"),
      g("missions","select=id,titre,statut,departement,resultat,consigne,priorite&order=id.desc&limit=300"),
      g("journal","select=type,message,ts&order=ts.desc&limit=30"),
      g("core_incidents","select=id,ts,categorie,severite,sujet,statut,agent&statut=neq.resolu&order=ts.desc&limit=40"),
      g("core_bible_bugs","select=id,categorie,bug,departement,cree_le&traite=eq.false&order=cree_le.desc&limit=40"),
      g("core_feedback","select=id,page,type,message,prenom,statut,created_at&statut=neq.repondu&order=created_at.desc&limit=40"),
      g("core_config","select=key,value&key=in.(last_autotest_score,last_autotest_weak,chantiers_attente,recursive_growth_level)")
    ]);
    const [inscriptions, membres, snap] = await Promise.all([
      cnt("inscriptions"), cnt("membres"),
      g("core_croissance_snap","select=jour,source,entrees&order=jour.desc&limit=1")
    ]);
    const stats:any = {}; for (const m of missions) stats[m.statut]=(stats[m.statut]||0)+1;
    const conf:any = {}; for (const c of cfg) conf[c.key]=c.value;
    let attente:any = null;
    try { attente = conf.chantiers_attente ? JSON.parse(conf.chantiers_attente) : null; } catch { attente = null; }
    return J({
      agents, missions, journal, incidents, bugs, feedback, stats,
      autotest: { score: conf.last_autotest_score||null, weak: conf.last_autotest_weak||null, niveau: conf.recursive_growth_level||null },
      kpi: { inscriptions, membres, croissance: (snap && snap[0]) || null },
      attente,
      ts: new Date().toISOString()
    });
  }

  // ── Checklist « En attente de Bruno » : persistee dans core_config (partagee multi-appareils) ──
  if (a === "attente_set") {
    const items = Array.isArray(body.items) ? body.items : [];
    await fetch(U+"/rest/v1/core_config?on_conflict=key",{
      method:"POST",
      headers:{...h(),Prefer:"resolution=merge-duplicates,return=minimal"},
      body:JSON.stringify({ key:"chantiers_attente", value:JSON.stringify(items) })
    });
    return J({ ok:true, n:items.length });
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
    if (!ANTH && !OR) return J({ text:"Etat NAVLYS : "+agents.length+" agents. A valider "+(stats.a_valider||0)+", en file "+(stats.en_file||0)+", en cours "+(stats.en_cours||0)+", fait "+(stats.fait||0)+". "+(av.length?"A valider : "+av.join(" ; "):"Rien n attend ta validation.") });
    const text = (await callBrain("Tu es le Rapporteur de NAVLYS. Point oral court et chaleureux a Bruno (5-7 phrases), tutoiement, statut simple citoyen.","Compteurs: "+JSON.stringify(stats)+". A valider: "+(av.join(" | ")||"aucune")+". Fais le point.",600))||"Tout est calme.";
    return J({ text });
  }
  return J({ error:"action inconnue" }, 400);
});
