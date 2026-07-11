// NAVLYS — SKIPPER : place de marché nautique (acheteurs↔vendeurs), adossée à
// Test Bateaux (l'expertise NAVLYS = couche de confiance).
//   GET                      -> diagnostic
//   GET ?liste[&type=&zone=&max_prix=]  -> annonces PUBLIÉES (champs publics only)
//   GET ?a=<jeton>           -> une annonce publiée + expertise Test Bateaux liée
//   POST {action:'deposer', ...}  -> dépose une annonce (statut a_valider = garde-fou
//        Bruno, règle d'or n°2). Photos -> bucket public "skipper". Mission NAVDEM.
//   POST {action:'message', annonce:<jeton>, prenom, email, contenu}
//        -> message acheteur -> vendeur (messagerie interne traçable, jamais d'email en clair).
// Doctrine : membre jamais client, cotisation jamais prix, aucun débit sans Bruno.
// Contact vendeur JAMAIS exposé : uniquement via la messagerie interne. CORS *.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const H = { apikey:K, Authorization:"Bearer "+K };
async function ins(t:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...H,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok?await r.json():null; }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
const num=(x:unknown)=>{ const v=parseFloat(String(x==null?"":x).replace(",",".")); return isFinite(v)?v:null; };
const intg=(x:unknown)=>{ const v=parseInt(String(x==null?"":x).replace(/\D/g,""),10); return isFinite(v)?v:null; };
// Champs publics d'une annonce (JAMAIS l'email/tel du vendeur)
const PUB = "jeton,vendeur_prenom,vendeur_type,type_bateau,marque,modele,annee,longueur_m,largeur_m,tirant_eau_m,materiau,motorisation,heures_moteur,carburant,couchages,pavillon,prix_eur,tva_payee,port,zone,description,equipements,photos,bateau_dossier_id,created_at";

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});

  if(req.method==="GET"){
    const url=new URL(req.url);
    const a=url.searchParams.get("a")||"";
    if(a){
      const r=await fetch(U+"/rest/v1/skipper_annonces?jeton=eq."+encodeURIComponent(a)+"&statut=eq.publiee&select="+PUB,{headers:H});
      const rows=r.ok?await r.json():[];
      if(!rows.length) return J({ ok:false, error:"Cette annonce n'existe pas ou n'est pas encore publiée." },404);
      const x=rows[0];
      // Expertise Test Bateaux liée (osmose + défauts modèle) si dossier attaché
      let expertise=null;
      if(x.bateau_dossier_id){
        const er=await fetch(U+"/rest/v1/core_bateau_dossiers?id=eq."+x.bateau_dossier_id+"&select=jeton,expertise",{headers:H});
        const ed=er.ok?await er.json():[];
        if(ed.length){ expertise=ed[0].expertise||null; x.rapport_jeton=ed[0].jeton||null; }
      }
      return J({ ok:true, annonce:x, expertise });
    }
    if(url.searchParams.has("liste")){
      let q=U+"/rest/v1/skipper_annonces?statut=eq.publiee&select="+PUB+"&order=created_at.desc&limit=60";
      const type=clean(url.searchParams.get("type"),20); if(type) q+="&type_bateau=eq."+encodeURIComponent(type);
      const zone=clean(url.searchParams.get("zone"),60); if(zone) q+="&zone=ilike.*"+encodeURIComponent(zone)+"*";
      const maxp=num(url.searchParams.get("max_prix")); if(maxp!=null) q+="&prix_eur=lte."+maxp;
      const r=await fetch(q,{headers:H});
      const rows=r.ok?await r.json():[];
      return J({ ok:true, annonces:rows, total:rows.length });
    }
    return J({ ok:true, service:"navlys-skipper" });
  }

  const b:any=await req.json().catch(()=>({}));
  if(b&&b.website) return J({ ok:true }); // pot de miel anti-robots
  const action=clean(b.action,20);

  // ---- Message acheteur -> vendeur (messagerie interne) ----
  if(action==="message"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour que le vendeur puisse te répondre." },400);
    const contenu=String(b.contenu==null?"":b.contenu).trim().slice(0,4000);
    if(contenu.length<5) return J({ ok:false, error:"Écris ton message au vendeur." },400);
    const ar=await fetch(U+"/rest/v1/skipper_annonces?jeton=eq."+encodeURIComponent(clean(b.annonce,32))+"&statut=eq.publiee&select=id,marque,modele,vendeur_prenom",{headers:H});
    const arows=ar.ok?await ar.json():[];
    if(!arows.length) return J({ ok:false, error:"Annonce introuvable." },404);
    const an=arows[0];
    const m=await ins("skipper_messages",{ annonce_id:an.id, expediteur:"acheteur", acheteur_email:email, acheteur_prenom:clean(b.prenom,80), contenu });
    if(!m) return J({ ok:false, error:"Réessaie dans un instant." },200);
    await ins("journal",{ type:"skipper_message", message:"SKIPPER — message acheteur "+(clean(b.prenom,80)||email)+" sur annonce #"+an.id+" ("+(an.marque||"")+" "+(an.modele||"")+")." });
    await ins("missions",{ departement:"NAVDEM", priorite:2, statut:"a_faire",
      titre:"SKIPPER — mettre en relation acheteur/vendeur (annonce #"+an.id+")",
      consigne:"Un acheteur ("+(clean(b.prenom,80)||"?")+" · "+email+") a écrit au sujet de l'annonce #"+an.id+" ("+(an.marque||"")+" "+(an.modele||"")+"). Message: "+contenu+" ||| Transmettre au vendeur ("+(an.vendeur_prenom||"?")+") et faciliter la mise en relation, dans le respect de la doctrine (jamais d'email en clair côté public)." });
    return J({ ok:true, merci:(clean(b.prenom,80)||"")+" ton message est bien parti. NAVLYS te met en relation avec le vendeur. 🌊" });
  }

  // ---- Dépôt d'une annonce (statut a_valider = garde-fou Bruno) ----
  if(action==="deposer"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour qu'on puisse te répondre." },400);
    const marque=clean(b.marque,80), modele=clean(b.modele,160);
    if(!marque && !modele) return J({ ok:false, error:"Dis-nous au moins la marque ou le modèle du bateau." },400);
    const description=String(b.description==null?"":b.description).trim().slice(0,8000);
    const type_bateau=["voilier","catamaran","moteur","semi-rigide","peniche","autre"].includes(b.type_bateau)?b.type_bateau:"autre";
    const vendeur_type=["particulier","pro"].includes(b.vendeur_type)?b.vendeur_type:"particulier";
    // Photos : max 8, ~3 Mo, bucket public "skipper"
    const photos=Array.isArray(b.photos)?b.photos.slice(0,8):[];
    const urls:string[]=[];
    const pref="annonces/"+Date.now()+"-"+Math.floor(Math.random()*1e6)+"/";
    for(let i=0;i<photos.length;i++){
      const m=/^data:image\/(jpeg|png|webp);base64,(.+)$/.exec(String(photos[i]||""));
      if(!m || m[2].length>4_200_000) continue;
      let bytes:Uint8Array;
      try{ const bin=atob(m[2]); bytes=new Uint8Array(bin.length); for(let k=0;k<bin.length;k++) bytes[k]=bin.charCodeAt(k); }catch{ continue; }
      const ext=m[1]==="jpeg"?"jpg":m[1];
      const path=pref+"photo-"+(i+1)+"."+ext;
      const up=await fetch(U+"/storage/v1/object/skipper/"+path,{method:"POST",headers:{...H,"Content-Type":"image/"+m[1],"x-upsert":"true"},body:bytes});
      if(up.ok) urls.push(U+"/storage/v1/object/public/skipper/"+path);
    }
    const equipements=Array.isArray(b.equipements)?b.equipements.slice(0,30).map((x:unknown)=>clean(x,120)).filter(Boolean):[];
    const row=await ins("skipper_annonces",{
      vendeur_prenom:clean(b.prenom,80), vendeur_email:email, vendeur_tel:clean(b.telephone,40), vendeur_type,
      type_bateau, marque, modele, annee:clean(b.annee,10),
      longueur_m:num(b.longueur_m), largeur_m:num(b.largeur_m), tirant_eau_m:num(b.tirant_eau_m),
      materiau:clean(b.materiau,60), motorisation:clean(b.motorisation,160), heures_moteur:intg(b.heures_moteur),
      carburant:clean(b.carburant,40), couchages:intg(b.couchages), pavillon:clean(b.pavillon,60), hin:clean(b.hin,60),
      prix_eur:num(b.prix_eur), tva_payee:(b.tva_payee===true||b.tva_payee==="oui"?true:(b.tva_payee===false||b.tva_payee==="non"?false:null)),
      port:clean(b.port,120), zone:clean(b.zone,120), description, equipements, photos:urls,
      bateau_dossier_id:intg(b.bateau_dossier_id), statut:"a_valider"
    });
    const an=Array.isArray(row)?row[0]:row;
    if(!an) return J({ ok:false, error:"Réessaie dans un instant." },200);
    await ins("journal",{ type:"skipper_annonce", message:"SKIPPER — annonce #"+an.id+" déposée par "+(clean(b.prenom,80)||email)+" ("+marque+" "+modele+", "+urls.length+" photo(s)) → à valider." });
    await ins("missions",{ departement:"NAVDEM", priorite:1, statut:"a_valider",
      titre:"SKIPPER — valider l'annonce #"+an.id+" ("+marque+" "+modele+")",
      consigne:"Nouvelle annonce SKIPPER #"+an.id+" (jeton "+an.jeton+"). Vendeur: "+(clean(b.prenom,80)||"?")+" · "+email+" · "+vendeur_type+". Bateau: "+marque+" "+modele+" "+clean(b.annee,10)+", prix "+(num(b.prix_eur)||"?")+"€, "+urls.length+" photo(s). Description: "+description.slice(0,400)+" ||| Vérifier (cohérence, propriété/HIN, pas de gage), proposer une pré-expertise Test Bateaux, puis publier: update skipper_annonces set statut='publiee' where id="+an.id+"; (garde-fou Bruno règle d'or n°2)." });
    return J({ ok:true, jeton:an.jeton, merci:(clean(b.prenom,80)?clean(b.prenom,80)+", ton":"Ton")+" annonce est bien arrivée. NAVLYS la vérifie puis la publie sur SKIPPER — et on peut y attacher une pré-expertise Test Bateaux pour rassurer les acheteurs. 🌊" });
  }

  return J({ ok:false, error:"Action inconnue." },400);
});
