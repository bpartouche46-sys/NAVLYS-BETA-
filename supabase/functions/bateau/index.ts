// NAVLYS — Test Bateaux : dépôt d'un dossier complet (texte + photos) et
// lecture du rapport d'expertise NAVLYS sur page dédiée.
//   POST {prenom,email,telephone,bateau,annee,lieu,description,photos:[dataURL]}
//        -> stocke photos (bucket "bateaux"), crée le dossier + mission NAVTECH,
//           renvoie le lien direct /bateau-rapport?d=jeton (temporaire 30 j).
//   GET  ?d=jeton -> état + rapport publiés (respecte l'expiration).
//   GET  (sans paramètre) -> diagnostic.
// GRATUIT MEMBRES (gravé 2026-07-09) : e-mail trouvé dans `membres` au dépôt
// -> acces 'permanent', rapport complet gratuit. Non-membre -> aperçu-preuve :
// les APERCU_LIGNES premières lignes du rapport seulement (verrouille:true).
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
const APERCU_LIGNES=18;
async function estMembre(email:string){ // lecture tolérante : inscrit = membre (règle n°4)
  const r=await fetch(U+"/rest/v1/membres?email=eq."+encodeURIComponent(email)+"&select=id&limit=1",{headers:H});
  const rows=r.ok?await r.json():[];
  return rows.length>0;
}
// Moteur d'expertise PRO : risque osmose (âge × vie à flot × zone × eau) +
// défauts connus du modèle (core_bateau_savoir) + catastrophes de zone
async function expertiser(annee:string,vie:string,zone:string,eau:string,marqueModele:string){
  const r=await fetch(U+"/rest/v1/rpc/navlys_bateau_expertiser",{method:"POST",headers:{...H,"Content-Type":"application/json"},
    body:JSON.stringify({p_annee:annee,p_vie_eau:vie,p_zone:zone,p_eau:eau,p_marque_modele:marqueModele})});
  return r.ok?await r.json():null;
}

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});

  if(req.method==="GET"){
    const url=new URL(req.url);
    const d=url.searchParams.get("d")||"";
    // ---- mode=absorber (cron horaire) : ingère les BLOC_ABSORPTION_JSON des
    // veilles NAVLAB « fait » dans core_bateau_savoir. Boucle 100 % autonome. ----
    if(url.searchParams.get("mode")==="absorber"){
      const mr=await fetch(U+"/rest/v1/missions?titre=like.Veille%20Test%20Bateaux*&statut=eq.fait&resultat=like.*BLOC_ABSORPTION_JSON*&select=id,resultat&limit=10",{headers:H});
      const ms=mr.ok?await mr.json():[];
      let inseres=0, deja=0, erreurs=0;
      for(const m of ms){
        if(String(m.resultat||"").includes("[ABSORBE-OK]")) continue;
        const match=/BLOC_ABSORPTION_JSON:\s*(\[.*?\])\s*$/ms.exec(String(m.resultat||""));
        let items:any[]=[];
        try{ items=match?JSON.parse(match[1]):[]; }catch{ erreurs++; }
        for(const it of (Array.isArray(items)?items.slice(0,10):[])){
          const marque=clean(it.marque,80), modele=clean(it.modele,160);
          if(!marque||!modele) continue;
          const type=["voilier","catamaran","derive","moteur","pneumatique","autre"].includes(it.type)?it.type:"autre";
          const ex=await fetch(U+"/rest/v1/core_bateau_savoir?select=id&limit=1&marque=ilike."+encodeURIComponent(marque)+"&modele=ilike."+encodeURIComponent(modele),{headers:H});
          const exr=ex.ok?await ex.json():[];
          if(exr.length){ deja++; continue; }
          const ok=await ins("core_bateau_savoir",{ marque, modele, type, annees:clean(it.annees,40),
            defauts:Array.isArray(it.defauts)?it.defauts.slice(0,8).map((x:unknown)=>clean(x,300)):[],
            controles:Array.isArray(it.controles)?it.controles.slice(0,8).map((x:unknown)=>clean(x,300)):[],
            source:"veille NAVLAB (mission #"+m.id+", absorption auto)" });
          if(ok) inseres++;
        }
        await fetch(U+"/rest/v1/missions?id=eq."+m.id,{method:"PATCH",headers:{...H,"Content-Type":"application/json"},body:JSON.stringify({resultat:String(m.resultat||"")+"\n[ABSORBE-OK]"})});
      }
      if(inseres||erreurs) await ins("journal",{ type:"bateau_savoir", message:"Absorption auto Test Bateaux : +"+inseres+" modèle(s) dans core_bateau_savoir ("+deja+" déjà connus, "+erreurs+" bloc(s) illisible(s))." });
      return J({ ok:true, mode:"absorber", inseres, deja, erreurs, missions:ms.length });
    }
    if(!d) return J({ ok:true, service:"navlys-bateau" });
    const r=await fetch(U+"/rest/v1/core_bateau_dossiers?jeton=eq."+encodeURIComponent(d)+"&select=id,email,prenom,bateau,annee,lieu,statut,acces,expire_le,rapport,photos,created_at,expertise",{headers:H});
    const rows=r.ok?await r.json():[];
    if(!rows.length) return J({ ok:false, error:"Ce lien ne correspond à aucun dossier." },404);
    const x=rows[0];
    // Déblocage auto : devenu membre depuis le dépôt -> lien permanent, rapport complet
    if(x.acces!=="permanent" && x.email && await estMembre(x.email)){
      x.acces="permanent"; x.expire_le=null;
      await fetch(U+"/rest/v1/core_bateau_dossiers?id=eq."+x.id,{method:"PATCH",headers:{...H,"Content-Type":"application/json"},body:JSON.stringify({acces:"permanent",expire_le:null})});
    }
    if(x.expire_le && new Date(x.expire_le).getTime()<Date.now())
      return J({ ok:false, expire:true, error:"Ce lien temporaire a expiré. Les membres NAVLYS gardent leur rapport en permanence." },410);
    // Aperçu-preuve pour les non-membres : les premières lignes seulement
    let rapport:string|null=x.rapport||null, verrouille=false, lignesTotal=0;
    if(rapport && x.acces!=="permanent"){
      const lignes=rapport.split(/\r?\n/);
      lignesTotal=lignes.length;
      if(lignesTotal>APERCU_LIGNES){ rapport=lignes.slice(0,APERCU_LIGNES).join("\n"); verrouille=true; }
    }
    return J({ ok:true, prenom:x.prenom, bateau:x.bateau, annee:x.annee, lieu:x.lieu,
      statut:x.statut, acces:x.acces, expire_le:x.expire_le, rapport,
      verrouille, lignes_total:lignesTotal, expertise:x.expertise||null,
      photos:x.photos||[], depose_le:x.created_at });
  }

  const b:any=await req.json().catch(()=>({}));
  if(b&&b.website) return J({ ok:true }); // pot de miel anti-robots
  const email=clean(b.email,160).toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour qu'on puisse te répondre." },400);
  const description=String(b.description==null?"":b.description).trim().slice(0,12000);
  if(description.length<30) return J({ ok:false, error:"Décris ton bateau et ce que tu veux savoir — quelques phrases suffisent." },400);
  const prenom=clean(b.prenom,80), tel=clean(b.telephone,40), bateau=clean(b.bateau,160),
        annee=clean(b.annee,10), lieu=clean(b.lieu,120),
        vieEau=["flot","mixte","terre"].includes(b.vie_eau)?b.vie_eau:"mixte",
        eau=["salee","douce","mixte"].includes(b.eau)?b.eau:"salee",
        zone=clean(b.zone,120)||lieu;

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

  const membre=await estMembre(email); // membre = rapport complet GRATUIT, lien permanent
  const expertise=await expertiser(annee,vieEau,zone,eau,bateau); // moteur PRO immédiat
  const rows=await ins("core_bateau_dossiers",{ jeton:jt, prenom, email, telephone:tel, bateau, annee, lieu,
    description, photos:urls, statut:"en_analyse", acces:membre?"permanent":"temporaire",
    expertise,
    expire_le:membre?null:new Date(Date.now()+30*24*3600*1000).toISOString() });
  const dossier=Array.isArray(rows)?rows[0]:rows;
  if(!dossier) return J({ ok:false, error:"Réessaie dans un instant." },200);

  const lien="https://navlys.com/bateau-rapport?d="+jt;
  await ins("journal",{ type:"bateau_dossier", message:"Test Bateaux — dossier #"+dossier.id+" reçu de "+(prenom||email)+" ("+(bateau||"bateau ?")+", "+urls.length+" photo(s)) → "+lien });
  const mission=await ins("missions",{ departement:"NAVTECH", priorite:1, statut:"a_faire",
    titre:"Test Bateaux — rapport pour "+(prenom||email)+" ("+(bateau||"bateau ?")+")",
    consigne:"Dossier Test Bateaux #"+dossier.id+" (jeton "+jt+"). Prénom: "+(prenom||"?")+" · email: "+email+" · tél: "+(tel||"?")+" · bateau: "+(bateau||"?")+" · année: "+(annee||"?")+" · lieu: "+(lieu||"?")+" · vie: "+vieEau+" · eau: "+eau+" · zone: "+zone+". Photos ("+urls.length+"): "+urls.join(" ")+" . Dossier: "+description+" ||| ANALYSE PRO DÉJÀ CALCULÉE (moteur NAVLYS — à intégrer et développer dans le rapport): "+JSON.stringify(expertise||{})+" ||| Rédige le RAPPORT D'EXPERTISE NAVLYS (tutoiement + prénom, chaleureux, structuré): 1) Ce que ton dossier nous dit (synthèse) 2) RISQUE D'OSMOSE : reprends le score/niveau/facteurs de l'analyse pro ci-dessus, explique-les simplement 3) DÉFAUTS CONNUS DU MODÈLE : développe chaque défaut et contrôle du savoir_modele ci-dessus 4) HISTOIRE DE LA ZONE : si evenements_zone non vide, explique quoi vérifier (traces de submersion, réparations d'assurance) 5) Points forts observés 6) Questions à poser / vérifications sur place 7) Budget indicatif d'entretien 8) Check-list de visite. OBLIGATOIRE en tête et en pied: « Nous ne sommes pas experts maritimes et ce rapport ne remplace jamais une expertise officielle — c'est un avis éducatif NAVLYS pour t'aider à y voir clair. » Zéro conseil financier personnalisé. Une fois validé par Bruno, publier avec: select navlys_bateau_publier("+dossier.id+", '<rapport>'); (acces déjà réglé automatiquement : "+(membre?"MEMBRE → rapport complet permanent":"non-membre → aperçu "+APERCU_LIGNES+" lignes, complet s'il adhère")+")." });
  if(mission && mission[0]) await fetch(U+"/rest/v1/core_bateau_dossiers?id=eq."+dossier.id,{method:"PATCH",headers:{...H,"Content-Type":"application/json"},body:JSON.stringify({mission_id:mission[0].id})});

  return J({ ok:true, jeton:jt, lien, membre,
    merci:(prenom?prenom+", ton":"Ton")+" dossier est bien arrivé chez NAVLYS. Garde ce lien : ton rapport y sera publié"+(membre?" en entier — merci d'être membre 💛":" — aperçu découverte, complet pour les membres")+". 🌊" });
});
