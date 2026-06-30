// NAVLYS.IO — Passerelle entrepreneurs. API JSON (CORS *).
// POST {nom,email,domaine,idee,apport,contact} -> enregistre une candidature
// + cree une mission NAVPART (Paul) pour evaluer le potentiel, + journalise.
// Aucune dependance Vercel. Garde-fou : rien n'est publie ni debite ; la
// candidature part en file interne (a_valider) -> Bruno tranche.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
function hh(){ return { apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" }; }
async function ins(t:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...hh(),Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok? await r.json():[]; }
async function pa(t:string,f:string,b:unknown){ await fetch(U+"/rest/v1/"+t+"?"+f,{method:"PATCH",headers:hh(),body:JSON.stringify(b)}); }
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
const enc=(x:unknown)=>encodeURIComponent(String(x));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") return J({ ok:true, service:"navlys-io-passerelle", info:"POST {nom,email,domaine,idee,apport,contact}" });
  if (req.method !== "POST") return J({ error:"method" }, 405);

  const b:any = await req.json().catch(()=>({}));
  if (b && b.website) return J({ ok:true, ref:0 });        // honeypot anti-bot : on ignore en silence
  const nom = clean(b.nom,120), email = clean(b.email,160), idee = clean(b.idee,4000);
  const domaine = clean(b.domaine,120), apport = clean(b.apport,2000), contact = clean(b.contact,200);
  if (!nom || !idee) return J({ error:"Indique au moins ton nom et ton idée." }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ error:"Email invalide." }, 400);

  const row = await ins("io_candidatures",{ nom, email, domaine, idee, apport, contact });
  const candId = row[0] && row[0].id;

  const titre = "NAVLYS.IO — candidature : " + (domaine ? domaine + " — " : "") + nom;
  const consigne =
    "Évalue cette candidature à la passerelle NAVLYS.IO (modèle venture-builder interne : "+
    "on co-construit l'entreprise avec nos 14 agents + infra, rémunération = intéressement à la réussite "+
    "+ facturation des frais de gestion et de développement ; cadre simple citoyen, jamais de conseil en investissement).\n\n"+
    "Candidat : "+nom+(domaine?(" | Domaine : "+domaine):"")+(contact?(" | Contact : "+contact):"")+"\n"+
    "Idée : "+idee+"\n"+(apport?("Ce qu'il apporte : "+apport+"\n"):"")+
    "\nRends : (1) potentiel /10 (marché, faisabilité avec nos agents, vitesse de mise en or), "+
    "(2) go / à creuser / non, (3) 3 prochaines étapes concrètes, "+
    "(4) proposition de cadre de partenariat (intéressement indicatif + frais de gestion/dev), à faire valider par Bruno.";
  const mission = await ins("missions",{ departement:"NAVPART", titre:titre.slice(0,160), consigne, priorite:2, statut:"a_faire" });
  const missionId = mission[0] && mission[0].id;
  if (candId && missionId) await pa("io_candidatures","id=eq."+enc(candId),{ mission_id:missionId, statut:"en_evaluation" });
  await ins("journal",{ type:"passerelle", message:"NAVLYS.IO — nouvelle candidature de "+nom+(domaine?(" ("+domaine+")"):"")+" -> NAVPART #"+(missionId||"?") });

  return J({ ok:true, ref:candId, message:"Candidature reçue. Paul (Partenariats) l'étudie ; on revient vers toi." });
});
