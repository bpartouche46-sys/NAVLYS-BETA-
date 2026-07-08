// NAVLYS — Test Bateaux : dépôt d'un dossier complet (texte + photos) et
// lecture du rapport d'expertise NAVLYS sur page dédiée.
//   POST {prenom,email,telephone,bateau,annee,lieu,description,photos:[dataURL]}
//        -> stocke photos (bucket "bateaux"), crée le dossier + mission NAVTECH,
//           renvoie le lien direct /bateau-rapport?d=jeton (temporaire 30 j).
//   GET  ?d=jeton -> état + rapport publiés (respecte l'expiration).
//   GET  (sans paramètre) -> diagnostic.
// Doctrine : jamais « expert », ne remplace jamais un expert maritime. CORS *.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const H = { apikey:K, Authorization:"Bearer "+K };
async function ins(t:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...H,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok?await r.json():null; }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
function jeton(){ const a=new Uint8Array(16); crypto.getRandomValues(a); return Array.from(a,b=>b.toString(16).padStart(2,"0")).join(""); }

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});

  if(req.method==="GET"){
    const d=new URL(req.url).searchParams.get("d")||"";
    if(!d) return J({ ok:true, service:"navlys-bateau" });
    const r=await fetch(U+"/rest/v1/core_bateau_dossiers?jeton=eq."+encodeURIComponent(d)+"&select=prenom,bateau,annee,lieu,statut,acces,expire_le,rapport,photos,created_at",{headers:H});
    const rows=r.ok?await r.json():[];
    if(!rows.length) return J({ ok:false, error:"Ce lien ne correspond à aucun dossier." },404);
    const x=rows[0];
    if(x.expire_le && new Date(x.expire_le).getTime()<Date.now())
      return J({ ok:false, expire:true, error:"Ce lien temporaire a expiré. Les membres NAVLYS gardent leur rapport en permanence." },410);
    return J({ ok:true, prenom:x.prenom, bateau:x.bateau, annee:x.annee, lieu:x.lieu,
      statut:x.statut, acces:x.acces, expire_le:x.expire_le, rapport:x.rapport||null,
      photos:x.photos||[], depose_le:x.created_at });
  }

  const b:any=await req.json().catch(()=>({}));
  if(b&&b.website) return J({ ok:true }); // pot de miel anti-robots
  const email=clean(b.email,160).toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour qu'on puisse te répondre." },400);
  const description=String(b.description==null?"":b.description).trim().slice(0,12000);
  if(description.length<30) return J({ ok:false, error:"Décris ton bateau et ce que tu veux savoir — quelques phrases suffisent." },400);
  const prenom=clean(b.prenom,80), tel=clean(b.telephone,40), bateau=clean(b.bateau,160),
        annee=clean(b.annee,10), lieu=clean(b.lieu,120);

  // Photos : max 6, ~3 Mo chacune en base64, stockées dans le bucket public "bateaux"
  const jt=jeton();
  const urls:string[]=[];
  const photos=Array.isArray(b.photos)?b.photos.slice(0,6):[];
  for(let i=0;i<photos.length;i++){
    const m=/^data:image\/(jpeg|png|webp);base64,(.+)$/.exec(String(photos[i]||""));
    if(!m || m[2].length>4_200_000) continue;
    let bytes:Uint8Array;
    try{ const bin=atob(m[2]); bytes=new Uint8Array(bin.length); for(let k=0;k<bin.length;k++) bytes[k]=bin.charCodeAt(k); }catch{ continue; }
    const ext=m[1]==="jpeg"?"jpg":m[1];
    const path="dossiers/"+jt+"/photo-"+(i+1)+"."+ext;
    const up=await fetch(U+"/storage/v1/object/bateaux/"+path,{method:"POST",headers:{...H,"Content-Type":"image/"+m[1],"x-upsert":"true"},body:bytes});
    if(up.ok) urls.push(U+"/storage/v1/object/public/bateaux/"+path);
  }

  const rows=await ins("core_bateau_dossiers",{ jeton:jt, prenom, email, telephone:tel, bateau, annee, lieu,
    description, photos:urls, statut:"en_analyse", acces:"temporaire",
    expire_le:new Date(Date.now()+30*24*3600*1000).toISOString() });
  const dossier=Array.isArray(rows)?rows[0]:rows;
  if(!dossier) return J({ ok:false, error:"Réessaie dans un instant." },200);

  const lien="https://navlys.com/bateau-rapport?d="+jt;
  await ins("journal",{ type:"bateau_dossier", message:"Test Bateaux — dossier #"+dossier.id+" reçu de "+(prenom||email)+" ("+(bateau||"bateau ?")+", "+urls.length+" photo(s)) → "+lien });
  const mission=await ins("missions",{ departement:"NAVTECH", priorite:1, statut:"a_faire",
    titre:"Test Bateaux — rapport pour "+(prenom||email)+" ("+(bateau||"bateau ?")+")",
    consigne:"Dossier Test Bateaux #"+dossier.id+" (jeton "+jt+"). Prénom: "+(prenom||"?")+" · email: "+email+" · tél: "+(tel||"?")+" · bateau: "+(bateau||"?")+" · année: "+(annee||"?")+" · lieu: "+(lieu||"?")+". Photos ("+urls.length+"): "+urls.join(" ")+" . Dossier: "+description+" ||| Rédige le RAPPORT D'EXPERTISE NAVLYS (tutoiement + prénom, chaleureux, structuré): 1) Ce que ton dossier nous dit (synthèse) 2) Points forts observés 3) Points de vigilance & pièces à surveiller 4) Questions à poser / vérifications à faire sur place 5) Budget indicatif d'entretien 6) Check-list de visite. OBLIGATOIRE en tête et en pied: « Nous ne sommes pas experts maritimes et ce rapport ne remplace jamais une expertise officielle — c'est un avis éducatif NAVLYS pour t'aider à y voir clair. » Zéro conseil financier personnalisé. Une fois validé par Bruno, publier avec: select navlys_bateau_publier("+dossier.id+", '<rapport>'); (acces 'permanent' si membre abonné)." });
  if(mission && mission[0]) await fetch(U+"/rest/v1/core_bateau_dossiers?id=eq."+dossier.id,{method:"PATCH",headers:{...H,"Content-Type":"application/json"},body:JSON.stringify({mission_id:mission[0].id})});

  return J({ ok:true, jeton:jt, lien,
    merci:(prenom?prenom+", ton":"Ton")+" dossier est bien arrivé chez NAVLYS. Garde ce lien : ton rapport y sera publié. 🌊" });
});
