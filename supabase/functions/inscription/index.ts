// NAVLYS — Pré-inscription (NAVLYS Next Gen / lancement). API JSON (CORS *).
// POST {email,prenom,interet,source} -> insère dans la table inscriptions.
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
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null,{status:204,headers:CORS});
  if (req.method === "GET") return J({ ok:true, service:"navlys-inscription" });
  if (req.method !== "POST") return J({ error:"method" }, 405);
  const b:any = await req.json().catch(()=>({}));
  if (b && b.website) return J({ ok:true });                  // honeypot
  const email = clean(b.email,160), prenom = clean(b.prenom,80), interet = clean(b.interet,120);
  const source = clean(b.source,80) || "next-gen";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ error:"Email invalide." }, 400);
  await ins("inscriptions",{ email, prenom, interet, source });
  await ins("journal",{ type:"inscription", message:"Pré-inscription "+(interet||source)+" : "+email });
  return J({ ok:true, message:"Inscription enregistrée." });
});
