// NAVLYS — Domaine perso du membre (nom-prenom.com, +0,99 € HT/mois groupé).
//   GET  ?prenom=&nom=  -> vérifie EN TEMPS RÉEL (RDAP Verisign, sans clé) :
//        nom-prenom.com, puis l'astuce du tiret : -nav, puis -navlys.
//        Renvoie la liste avec disponibilité + le premier disponible.
//   POST {email, prenom, nom, domaine, accord:true}
//        -> re-vérifie la dispo, enregistre l'ACCORD DU CLIENT (core_domaines),
//           journal + mission NAVTECH (achat réel dès que le registrar est branché).
//   GET  (sans paramètre) -> diagnostic.
// Doctrine : l'achat se fait sur l'accord du CLIENT (autorisation permanente
// Bruno 2026-07-11), jamais de validation au cas par cas. CORS *.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const H = { apikey:K, Authorization:"Bearer "+K };
async function ins(t:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...H,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok?await r.json():null; }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);

// « Jean-Marc Décosté » -> « jean-marc-decoste » (accents et espaces normalisés)
function slug(s:string){
  return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"")
    .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40);
}
// RDAP Verisign (.com) : 404 = LIBRE, 200 = pris. Officiel, gratuit, sans clé.
async function domaineLibre(d:string):Promise<boolean|null>{
  try{
    const r=await fetch("https://rdap.verisign.com/com/v1/domain/"+encodeURIComponent(d));
    if(r.status===404) return true;
    if(r.ok) return false;
    return null; // statut inattendu -> inconnu
  }catch{ return null; }
}
function candidats(prenom:string,nom:string):string[]{
  const p=slug(prenom), n=slug(nom);
  const base=(n&&p)?(n+"-"+p):(n||p);
  if(!base) return [];
  // l'astuce du tiret, dans l'ordre : le pur, puis -nav, -navlys, puis navlys- devant
  return [base+".com", base+"-nav.com", base+"-navlys.com", "navlys-"+base+".com"];
}

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});

  if(req.method==="GET"){
    const url=new URL(req.url);
    const prenom=clean(url.searchParams.get("prenom"),60), nom=clean(url.searchParams.get("nom"),60);
    if(!prenom && !nom) return J({ ok:true, service:"navlys-domaine" });
    const liste=candidats(prenom,nom);
    if(!liste.length) return J({ ok:false, error:"Écris ton nom et ton prénom." },400);
    const resultats:{domaine:string;libre:boolean|null}[]=[];
    let premier:string|null=null;
    for(const d of liste){
      const libre=await domaineLibre(d);
      resultats.push({ domaine:d, libre });
      if(libre===true && !premier){ premier=d; break; } // on s'arrête au premier libre
    }
    return J({ ok:true, propositions:resultats, disponible:premier,
      prix:"0,99 € HT/mois, groupé avec ta cotisation" });
  }

  const b:any=await req.json().catch(()=>({}));
  if(b&&b.website) return J({ ok:true }); // pot de miel
  const email=clean(b.email,160).toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide." },400);
  const prenom=clean(b.prenom,60), nom=clean(b.nom,60), domaine=clean(b.domaine,80).toLowerCase();
  if(b.accord!==true) return J({ ok:false, error:"Coche ton accord pour l'achat de ton domaine." },400);
  // le domaine demandé doit être un de nos candidats légitimes (anti-abus)
  if(!candidats(prenom,nom).includes(domaine)) return J({ ok:false, error:"Ce domaine ne correspond pas à ton nom-prénom." },400);
  const libre=await domaineLibre(domaine);
  if(libre===false) return J({ ok:false, error:"Ce domaine vient d'être pris — relance la vérification, l'astuce du tiret te proposera le suivant." },409);

  const rows=await ins("core_domaines",{ email, prenom, nom, domaine, statut:"accord_client", accord_client:true,
    notes:"Accord donné à l'écran le "+new Date().toISOString()+" — achat réel dès registrar branché." });
  if(!rows) return J({ ok:false, error:"Déjà réservé ou indisponible — réessaie dans un instant." },409);
  await ins("journal",{ type:"domaine", message:"🌐 Domaine réservé avec accord client : "+domaine+" pour "+(prenom||email)+" (+0,99 € HT/mois groupé). Achat réel dès registrar branché." });
  await ins("missions",{ departement:"NAVTECH", priorite:1, statut:"a_faire",
    titre:"Acheter le domaine "+domaine+" (accord client enregistré)",
    consigne:"Domaine "+domaine+" réservé par "+(prenom||"?")+" "+(nom||"?")+" ("+email+") avec accord explicite à l'écran (+0,99 € HT/mois groupé à sa cotisation, core_domaines). Dès que le compte registrar NAVLYS est branché (Cloudflare Registrar/Namecheap + clé API, action Bruno) : acheter le domaine, pointer sur l'hébergement du membre, passer core_domaines.statut='achete'. Doctrine : l'accord du client vaut ordre d'achat (autorisation permanente Bruno 2026-07-11)." });
  return J({ ok:true, domaine, merci:(prenom?prenom+", ton":"Ton")+" domaine "+domaine+" est réservé ✔ Il sera activé avec ton abonnement (+0,99 € HT/mois, payé groupé avec ta cotisation)." });
});
