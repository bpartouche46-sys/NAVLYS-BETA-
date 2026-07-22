// NAVLYS — Compte membre : enregistrement multiplateforme immédiat + profil + paramétrages.
// POST {action:'inscrire'|'profil'|'maj'|'paye_ok', ...} — CORS *, service_role côté serveur uniquement.
// v19 : parrainage (affiliation). v41 (2026-07-22) : espace membre — à l'inscription on RÉSERVE le slug
//   et on crée la fiche core_membre_site (statut 'decouverte') ; au paiement (paye_ok) l'espace passe
//   'actif' automatiquement (tranche 3). Tout en try/catch : ne peut JAMAIS bloquer l'inscription/paiement.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
function J(d:unknown,s=200){ return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json",...CORS}}); }
const hh = ()=>({ apikey:K, Authorization:"Bearer "+K, "Content-Type":"application/json" });
async function rest(method:string, path:string, body?:unknown){
  const r=await fetch(U+"/rest/v1/"+path,{method,headers:{...hh(),Prefer:"return=representation"},body:body?JSON.stringify(body):undefined});
  const d=await r.json().catch(()=>null); return { ok:r.ok, d };
}
const clean=(x:unknown,n:number)=>String(x==null?"":x).replace(/\s+/g," ").trim().slice(0,n);
const code40=(x:unknown)=>clean(x,40).replace(/[^A-Za-z0-9._+-]/g,"");
const enc=encodeURIComponent;
const pub=(m:any)=>m&&({ token:m.token, prenom:m.prenom, email:m.email, lang:m.lang, formule:m.formule, montant:m.montant, apps:m.apps, mode:m.mode, statut:m.statut, paye:m.paye, params:m.params, slug:m.slug, depuis:m.created_at });
async function journal(type:string,message:string){ await rest("POST","journal",{type,message}); }

// Parrainage : résout le code du parrain -> son e-mail (core_credits.code), enregistre le parrainage
// et le crédite (core_parrainage). Jamais bloquant, jamais d'auto-parrainage.
async function crediterParrain(codeParrain:string, filleul:string){
  try{
    const c=code40(codeParrain); if(!c) return;
    const q=await rest("GET",`core_credits?code=eq.${enc(c)}&select=email`);
    const pe=(q.ok&&Array.isArray(q.d)&&q.d[0]&&q.d[0].email)?String(q.d[0].email).toLowerCase():"";
    if(!pe||pe===filleul) return; // parrain inconnu ou auto-parrainage -> on ignore
    await rest("POST","core_parrainage",{ email:pe, nb_personnes:1, statut:"valide", points_estimes:3, preuve:"inscription "+filleul });
    await journal("parrainage",`Parrainage validé — ${pe} a fait adhérer ${filleul} (code ${c})`);
  }catch(_e){ /* jamais bloquant */ }
}

// Espace membre (navlys.com/membres/<slug>) : garantit le slug + la fiche core_membre_site.
// actif=true bascule l'espace en 'actif' (au paiement). Jamais bloquant.
function slugify(s:string){
  return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40) || "membre";
}
async function assurerEspace(email:string, prenom:string, actif:boolean){
  try{
    const g=await rest("GET",`membres?email=eq.${enc(email)}&select=slug`);
    let slug=(g.ok&&Array.isArray(g.d)&&g.d[0]&&g.d[0].slug)||"";
    if(!slug){
      const base=slugify(prenom||(email.split("@")[0]||"")); slug=base;
      const exs=await rest("GET",`membres?slug=eq.${enc(slug)}&select=email`);
      if(exs.ok&&Array.isArray(exs.d)&&exs.d.length&&exs.d[0].email!==email){
        let h=0; for(const c of email) h=(h*31+c.charCodeAt(0))>>>0; slug=base+"-"+h.toString(36).slice(0,4);
      }
      await rest("PATCH",`membres?email=eq.${enc(email)}`,{ slug });
    }
    const s=await rest("GET",`core_membre_site?slug=eq.${enc(slug)}&select=slug,statut`);
    if(!(s.ok&&Array.isArray(s.d)&&s.d.length)){
      await rest("POST","core_membre_site",{ slug, email, prenom:prenom||"", titre:(prenom?(prenom+" sur NAVLYS"):"Mon espace NAVLYS"), statut: actif?"actif":"decouverte" });
    }else if(actif && s.d[0].statut!=="actif"){
      await rest("PATCH",`core_membre_site?slug=eq.${enc(slug)}`,{ statut:"actif", updated_at:new Date().toISOString() });
    }
    return slug;
  }catch(_e){ return ""; }
}

Deno.serve(async (req)=>{
  if(req.method==="OPTIONS") return new Response(null,{status:204,headers:CORS});
  if(req.method==="GET") return J({ ok:true, service:"navlys-compte" });
  const b:any=await req.json().catch(()=>({}));
  if(b&&b.website) return J({ ok:true }); // pot de miel anti-bot
  const action=String(b.action||"");

  if(action==="inscrire"){
    const email=clean(b.email,160).toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ ok:false, error:"Écris un e-mail valide pour te retrouver." },400);
    const prenom=clean(b.prenom,80);
    const lang=clean(b.lang,8)||"fr";
    const formule=clean(b.formule,40)||"essai";
    const montant=Math.max(0,Number(b.montant)||0);
    const apps=Array.isArray(b.apps)?b.apps.slice(0,20).map((a:unknown)=>clean(a,60)):[];
    const mode=["commande","precommande","essai"].includes(b.mode)?b.mode:(montant>0?"commande":"essai");
    const statut = mode==="precommande" ? "precommande" : (montant>0 ? "en_attente_paiement" : "essai");
    const parrain=code40(b.parrain);
    // upsert par email (on garde le token existant)
    const ex=await rest("GET",`membres?email=eq.${enc(email)}&select=*`);
    let m:any=null; let estNouveau=false;
    if(ex.ok&&Array.isArray(ex.d)&&ex.d.length){
      const patch:any={ prenom:prenom||ex.d[0].prenom, lang, formule, montant, apps, mode, statut, updated_at:new Date().toISOString() };
      if(parrain&&!ex.d[0].parrain) patch.parrain=parrain; // n'écrase jamais un parrain déjà attribué
      const r=await rest("PATCH",`membres?email=eq.${enc(email)}`,patch);
      m=r.ok&&r.d&&r.d[0]?r.d[0]:ex.d[0];
    }else{
      const r=await rest("POST","membres",{ prenom, email, lang, formule, montant, apps, mode, statut, parrain: parrain||null });
      if(!r.ok||!r.d||!r.d[0]) return J({ ok:false, error:"Enregistrement impossible, réessaie dans un instant." },200);
      m=r.d[0]; estNouveau=true;
    }
    await rest("POST","inscriptions",{ email, prenom, interet:formule, source:"adhesion" });
    await journal("adhesion",`Adhésion ${mode} — ${prenom||email} · ${formule} (${montant} € HT/mois) · apps: ${apps.join(", ")||"standard"}`+(parrain?` · parrain ${parrain}`:""));
    if(parrain&&estNouveau) await crediterParrain(parrain,email); // crédite UNE fois, à la création
    const slug = await assurerEspace(email, prenom||m.prenom||"", false); // réserve l'espace membre (découverte)
    if(slug && !m.slug) m.slug = slug;
    // validation du choix d'options par le CORE (doctrine OUI) : mission NAVDEM
    await rest("POST","missions",{ departement:"NAVDEM", priorite:2, statut:"a_faire",
      titre:`Valider le choix d'options — ${email}`,
      consigne:`Nouveau membre ${prenom||email}. Formule ${formule} (${montant} € HT/mois), mode ${mode}, applications choisies : ${apps.join(", ")||"standard (essai)"}. Vérifie la cohérence de l'offre (formule/nb d'applications), confirme la validation (doctrine OUI par défaut), signale toute anomalie.` });
    return J({ ok:true, membre:pub(m) });
  }

  const token=clean(b.token,60);
  if(!token) return J({ ok:false, error:"token manquant" },400);
  const g=await rest("GET",`membres?token=eq.${enc(token)}&select=*`);
  if(!g.ok||!Array.isArray(g.d)||!g.d.length) return J({ ok:false, error:"Profil introuvable — inscris-toi d'abord." },200);
  const m:any=g.d[0];

  if(action==="profil") return J({ ok:true, membre:pub(m) });

  if(action==="maj"){
    const patch:any={ updated_at:new Date().toISOString() };
    if(b.prenom!=null) patch.prenom=clean(b.prenom,80);
    if(b.lang!=null) patch.lang=clean(b.lang,8);
    if(Array.isArray(b.apps)) patch.apps=b.apps.slice(0,20).map((a:unknown)=>clean(a,60));
    if(b.params&&typeof b.params==="object") patch.params={ ...(m.params||{}), ...b.params };
    if(b.formule!=null){ patch.formule=clean(b.formule,40); patch.montant=Math.max(0,Number(b.montant)||0); patch.mode=["commande","precommande","essai"].includes(b.mode)?b.mode:m.mode; }
    const r=await rest("PATCH",`membres?token=eq.${enc(token)}`,patch);
    await journal("adhesion",`Profil mis à jour — ${m.email}`);
    return J({ ok:true, membre:pub(r.ok&&r.d&&r.d[0]?r.d[0]:m) });
  }

  if(action==="paye_ok"){
    const r=await rest("PATCH",`membres?token=eq.${enc(token)}`,{ paye:true, statut:"actif", updated_at:new Date().toISOString() });
    await assurerEspace(m.email, m.prenom||"", true); // tranche 3 : l'espace membre passe 'actif'
    await journal("adhesion",`Cotisation confirmée — ${m.email} · ${m.formule} · espace membre actif`);
    return J({ ok:true, membre:pub(r.ok&&r.d&&r.d[0]?r.d[0]:m) });
  }

  return J({ ok:false, error:"action inconnue" },400);
});
