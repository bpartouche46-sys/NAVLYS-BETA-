// NAVLYS — SKIPPER : place de marché nautique (acheteurs↔vendeurs), adossée à
// Test Bateaux (l'expertise NAVLYS = couche de confiance).
//
// PUBLIC
//   GET                          -> diagnostic
//   GET ?liste[&type=&zone=&max_prix=]  -> annonces PUBLIÉES (champs publics only)
//   GET ?a=<jeton>               -> une annonce publiée + expertise + avis
//   POST {action:'deposer', ...} -> dépose une annonce (statut a_valider = garde-fou
//        Bruno). Renvoie aussi le vendeur_token (accès tableau vendeur).
//   POST {action:'message', annonce:<jeton>, prenom, email, contenu}
//        -> message acheteur -> vendeur (messagerie interne).
//   POST {action:'avis', annonce:<jeton>, prenom, email, note(1-5), commentaire}
//        -> avis sur le vendeur.
//   POST {action:'reserver', annonce:<jeton>, prenom, email, montant}
//        -> RÉSERVATION avec acompte séquestré : crée une transaction en 'a_valider'
//           (Bible §6 : aucun vrai débit sans validation Bruno). AUCUN débit réel ici.
//
// VENDEUR (auth par vendeur_token, reçu au dépôt)
//   POST {action:'vendeur_acces', token}          -> ses annonces + messages + réservations
//   POST {action:'vendeur_statut', token, annonce_id, statut}  -> vendue/archivee/publiee
//   POST {action:'vendeur_repondre', token, annonce_id, contenu} -> répond à l'acheteur
//
// Contact vendeur JAMAIS exposé côté public : uniquement via la messagerie interne. CORS *.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const H = { apikey:K, Authorization:"Bearer "+K };
async function ins(t:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t,{method:"POST",headers:{...H,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok?await r.json():null; }
async function patch(t:string,q:string,b:unknown){ const r=await fetch(U+"/rest/v1/"+t+"?"+q,{method:"PATCH",headers:{...H,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(b)}); return r.ok?await r.json():null; }
async function sel(path:string){ const r=await fetch(U+"/rest/v1/"+path,{headers:H}); return r.ok?await r.json():[]; }
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
const num=(x:unknown)=>{ const v=parseFloat(String(x==null?"":x).replace(",",".")); return isFinite(v)?v:null; };
const intg=(x:unknown)=>{ const v=parseInt(String(x==null?"":x).replace(/\D/g,""),10); return isFinite(v)?v:null; };
const enc=encodeURIComponent;
// Champs publics d'une annonce (JAMAIS l'email/tel/token du vendeur)
const PUB = "jeton,vendeur_prenom,vendeur_type,type_bateau,marque,modele,annee,longueur_m,largeur_m,tirant_eau_m,materiau,motorisation,heures_moteur,carburant,couchages,pavillon,prix_eur,tva_payee,port,zone,description,equipements,photos,bateau_dossier_id,created_at";

async function avisDe(annonceId:number){
  return await sel("skipper_avis?annonce_id=eq."+annonceId+"&select=cible,auteur_prenom,note,commentaire,created_at&order=created_at.desc&limit=30");
}

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});

  if(req.method==="GET"){
    const url=new URL(req.url);
    const a=url.searchParams.get("a")||"";
    if(a){
      const rows=await sel("skipper_annonces?jeton=eq."+enc(a)+"&statut=eq.publiee&select="+PUB);
      if(!rows.length) return J({ ok:false, error:"Cette annonce n'existe pas ou n'est pas encore publiée." },404);
      const x=rows[0];
      let expertise=null;
      if(x.bateau_dossier_id){
        const ed=await sel("core_bateau_dossiers?id=eq."+x.bateau_dossier_id+"&select=jeton,expertise");
        if(ed.length){ expertise=ed[0].expertise||null; x.rapport_jeton=ed[0].jeton||null; }
      }
      const ar=await sel("skipper_annonces?jeton=eq."+enc(a)+"&select=id");
      const avis = ar.length ? await avisDe(ar[0].id) : [];
      return J({ ok:true, annonce:x, expertise, avis });
    }
    if(url.searchParams.has("liste")){
      let q=U+"/rest/v1/skipper_annonces?statut=eq.publiee&select="+PUB+"&order=created_at.desc&limit=60";
      const type=clean(url.searchParams.get("type"),20); if(type) q+="&type_bateau=eq."+enc(type);
      const zone=clean(url.searchParams.get("zone"),60); if(zone) q+="&zone=ilike.*"+enc(zone)+"*";
      const maxp=num(url.searchParams.get("max_prix")); if(maxp!=null) q+="&prix_eur=lte."+maxp;
      const r=await fetch(q,{headers:H});
      const rows=r.ok?await r.json():[];
      return J({ ok:true, annonces:rows, total:rows.length });
    }
    return J({ ok:true, service:"navlys-skipper", version:2 });
  }

  const b:any=await req.json().catch(()=>({}));
  if(b&&b.website) return J({ ok:true }); // pot de miel anti-robots
  const action=clean(b.action,20);

  // ---------- MESSAGE acheteur -> vendeur ----------
  if(action==="message"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour que le vendeur puisse te répondre." },400);
    const contenu=String(b.contenu==null?"":b.contenu).trim().slice(0,4000);
    if(contenu.length<5) return J({ ok:false, error:"Écris ton message au vendeur." },400);
    const arows=await sel("skipper_annonces?jeton=eq."+enc(clean(b.annonce,32))+"&statut=eq.publiee&select=id,marque,modele,vendeur_prenom");
    if(!arows.length) return J({ ok:false, error:"Annonce introuvable." },404);
    const an=arows[0];
    const m=await ins("skipper_messages",{ annonce_id:an.id, expediteur:"acheteur", acheteur_email:email, acheteur_prenom:clean(b.prenom,80), contenu });
    if(!m) return J({ ok:false, error:"Réessaie dans un instant." },200);
    await ins("journal",{ type:"skipper_message", message:"SKIPPER — message acheteur "+(clean(b.prenom,80)||email)+" sur annonce #"+an.id+" ("+(an.marque||"")+" "+(an.modele||"")+")." });
    await ins("missions",{ departement:"NAVDEM", priorite:2, statut:"a_faire",
      titre:"SKIPPER — mise en relation acheteur/vendeur (annonce #"+an.id+")",
      consigne:"Acheteur "+(clean(b.prenom,80)||"?")+" · "+email+" au sujet de l'annonce #"+an.id+" ("+(an.marque||"")+" "+(an.modele||"")+"). Message: "+contenu+". Le vendeur voit ce message dans son tableau /skipper-vendeur." });
    return J({ ok:true, merci:(clean(b.prenom,80)||"")+" ton message est bien parti. Le vendeur te répond via NAVLYS. 🌊" });
  }

  // ---------- AVIS sur le vendeur ----------
  if(action==="avis"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide." },400);
    const note=intg(b.note); if(note==null||note<1||note>5) return J({ ok:false, error:"Mets une note de 1 à 5." },400);
    const arows=await sel("skipper_annonces?jeton=eq."+enc(clean(b.annonce,32))+"&select=id");
    if(!arows.length) return J({ ok:false, error:"Annonce introuvable." },404);
    const av=await ins("skipper_avis",{ annonce_id:arows[0].id, cible:"vendeur", auteur_email:email,
      auteur_prenom:clean(b.prenom,80), note, commentaire:clean(b.commentaire,600) });
    if(!av) return J({ ok:false, error:"Réessaie dans un instant." },200);
    return J({ ok:true, merci:"Merci pour ton avis. 💛" });
  }

  // ---------- RÉSERVER avec acompte séquestré (garde-fou : a_valider) ----------
  if(action==="reserver"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide." },400);
    const arows=await sel("skipper_annonces?jeton=eq."+enc(clean(b.annonce,32))+"&statut=eq.publiee&select=id,marque,modele,prix_eur");
    if(!arows.length) return J({ ok:false, error:"Annonce introuvable ou non publiée." },404);
    const an=arows[0];
    const montant=num(b.montant);
    const tx=await ins("skipper_transactions",{ annonce_id:an.id, acheteur_prenom:clean(b.prenom,80),
      acheteur_email:email, montant_acompte:montant, devise:"EUR", statut:"a_valider",
      note:"Réservation demandée via /skipper. Acompte séquestré proposé : "+(montant!=null?montant+" €":"à convenir")+"." });
    if(!tx) return J({ ok:false, error:"Réessaie dans un instant." },200);
    const txid=Array.isArray(tx)?tx[0].id:tx.id;
    await ins("journal",{ type:"skipper_reservation", message:"SKIPPER — RÉSERVATION #"+txid+" (a_valider) sur annonce #"+an.id+" ("+(an.marque||"")+" "+(an.modele||"")+") par "+(clean(b.prenom,80)||email)+" — acompte "+(montant!=null?montant+"€":"?")+". ⚠️ Vrai argent : validation Bruno requise, aucun débit déclenché." });
    await ins("missions",{ departement:"NAVFI", priorite:1, statut:"a_valider",
      titre:"SKIPPER — valider une réservation/séquestre (tx #"+txid+")",
      consigne:"Réservation SKIPPER #"+txid+" sur annonce #"+an.id+" ("+(an.marque||"")+" "+(an.modele||"")+"). Acheteur: "+(clean(b.prenom,80)||"?")+" · "+email+". Acompte séquestré proposé: "+(montant!=null?montant+" €":"à convenir")+". ⚠️ VRAI ARGENT (Bible §6) : aucun débit n'a été déclenché. Le rail de paiement (Stripe) doit être activé par Bruno. Pour valider et passer en séquestre: update skipper_transactions set statut='en_sequestre' where id="+txid+"; (uniquement une fois le paiement réel encadré)." });
    return J({ ok:true, merci:(clean(b.prenom,80)?clean(b.prenom,80)+", ta":"Ta")+" demande de réservation est enregistrée. NAVLYS sécurise la suite (acompte séquestré) — aucun débit tant que tout n'est pas confirmé et validé. 🌊", statut:"a_valider" });
  }

  // ---------- DÉPÔT d'une annonce (statut a_valider) ----------
  if(action==="deposer"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour qu'on puisse te répondre." },400);
    const marque=clean(b.marque,80), modele=clean(b.modele,160);
    if(!marque && !modele) return J({ ok:false, error:"Dis-nous au moins la marque ou le modèle du bateau." },400);
    const description=String(b.description==null?"":b.description).trim().slice(0,8000);
    const type_bateau=["voilier","catamaran","moteur","semi-rigide","peniche","autre"].includes(b.type_bateau)?b.type_bateau:"autre";
    const vendeur_type=["particulier","pro"].includes(b.vendeur_type)?b.vendeur_type:"particulier";
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
    const vtoken=Array.from(crypto.getRandomValues(new Uint8Array(12)),x=>x.toString(16).padStart(2,"0")).join("");
    const row=await ins("skipper_annonces",{
      vendeur_prenom:clean(b.prenom,80), vendeur_email:email, vendeur_tel:clean(b.telephone,40), vendeur_type,
      vendeur_token:vtoken,
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
      consigne:"Nouvelle annonce SKIPPER #"+an.id+" (jeton "+an.jeton+"). Vendeur: "+(clean(b.prenom,80)||"?")+" · "+email+" · "+vendeur_type+". Bateau: "+marque+" "+modele+" "+clean(b.annee,10)+", prix "+(num(b.prix_eur)||"?")+"€, "+urls.length+" photo(s). Description: "+description.slice(0,400)+" ||| Vérifier, proposer une pré-expertise Test Bateaux, puis publier: update skipper_annonces set statut='publiee' where id="+an.id+"; (garde-fou Bruno règle d'or n°2)." });
    return J({ ok:true, jeton:an.jeton, vendeur_token:vtoken,
      lien_vendeur:"https://navlys.com/skipper-vendeur?t="+vtoken,
      merci:(clean(b.prenom,80)?clean(b.prenom,80)+", ton":"Ton")+" annonce est bien arrivée. NAVLYS la vérifie puis la publie. Garde ton lien vendeur pour suivre tes messages et tes réservations. 🌊" });
  }

  // ---------- VENDEUR : accès tableau de bord (auth par token) ----------
  if(action==="vendeur_acces"){
    const token=clean(b.token,40);
    if(token.length<8) return J({ ok:false, error:"Lien vendeur invalide." },401);
    const found=await sel("skipper_annonces?vendeur_token=eq."+enc(token)+"&select=vendeur_email,vendeur_prenom&limit=1");
    if(!found.length) return J({ ok:false, error:"Lien vendeur inconnu ou expiré." },404);
    const email=String(found[0].vendeur_email||"").toLowerCase();
    const annonces=await sel("skipper_annonces?vendeur_email=eq."+enc(email)+"&select=id,jeton,marque,modele,annee,prix_eur,statut,port,zone,photos,created_at&order=created_at.desc&limit=60");
    const ids=annonces.map((a:any)=>a.id);
    let messages:any[]=[], transactions:any[]=[];
    if(ids.length){
      const inq="("+ids.join(",")+")";
      messages=await sel("skipper_messages?annonce_id=in."+enc(inq)+"&select=id,annonce_id,expediteur,acheteur_prenom,acheteur_email,contenu,lu,created_at&order=created_at.desc&limit=200");
      transactions=await sel("skipper_transactions?annonce_id=in."+enc(inq)+"&select=id,annonce_id,acheteur_prenom,acheteur_email,montant_acompte,devise,statut,created_at&order=created_at.desc&limit=100");
    }
    return J({ ok:true, prenom:found[0].vendeur_prenom||"", email, annonces, messages, transactions });
  }

  // ---------- VENDEUR : changer le statut d'une annonce ----------
  if(action==="vendeur_statut"){
    const token=clean(b.token,40); const annonce_id=intg(b.annonce_id);
    const statut=clean(b.statut,20);
    if(!["vendue","archivee","publiee"].includes(statut)) return J({ ok:false, error:"Statut non autorisé." },400);
    const own=await sel("skipper_annonces?vendeur_token=eq."+enc(token)+"&select=vendeur_email&limit=1");
    if(!own.length) return J({ ok:false, error:"Lien vendeur inconnu." },404);
    const email=String(own[0].vendeur_email||"").toLowerCase();
    // l'annonce visée doit appartenir au même vendeur
    const target=await sel("skipper_annonces?id=eq."+annonce_id+"&vendeur_email=eq."+enc(email)+"&select=id");
    if(!target.length) return J({ ok:false, error:"Cette annonce n'est pas la tienne." },403);
    const upd=await patch("skipper_annonces","id=eq."+annonce_id,{ statut, updated_at:new Date().toISOString() });
    if(!upd) return J({ ok:false, error:"Réessaie dans un instant." },200);
    await ins("journal",{ type:"skipper_vendeur", message:"SKIPPER — vendeur a mis l'annonce #"+annonce_id+" en '"+statut+"'." });
    return J({ ok:true, statut });
  }

  // ---------- VENDEUR : répondre à un acheteur ----------
  if(action==="vendeur_repondre"){
    const token=clean(b.token,40); const annonce_id=intg(b.annonce_id);
    const contenu=String(b.contenu==null?"":b.contenu).trim().slice(0,4000);
    if(contenu.length<2) return J({ ok:false, error:"Écris ta réponse." },400);
    const own=await sel("skipper_annonces?vendeur_token=eq."+enc(token)+"&select=vendeur_email&limit=1");
    if(!own.length) return J({ ok:false, error:"Lien vendeur inconnu." },404);
    const email=String(own[0].vendeur_email||"").toLowerCase();
    const target=await sel("skipper_annonces?id=eq."+annonce_id+"&vendeur_email=eq."+enc(email)+"&select=id");
    if(!target.length) return J({ ok:false, error:"Cette annonce n'est pas la tienne." },403);
    const m=await ins("skipper_messages",{ annonce_id, expediteur:"vendeur", acheteur_email:clean(b.acheteur_email,160).toLowerCase(), contenu });
    if(!m) return J({ ok:false, error:"Réessaie dans un instant." },200);
    await ins("journal",{ type:"skipper_message", message:"SKIPPER — vendeur a répondu sur l'annonce #"+annonce_id+"." });
    return J({ ok:true });
  }

  return J({ ok:false, error:"Action inconnue." },400);
});
