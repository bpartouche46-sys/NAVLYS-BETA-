// NAVLYS — Concierge : passe un appel et prend un RDV au nom de l'abonné (voix NAVLYS ou clonée).
//
//   POST { token, business:{nom,tel}, besoin, date_souhaitee?, voix?, admin? }
//     -> { ok, statut, appel_id, script, provider, manque[], message }
//   GET -> readiness (quelles briques sont prêtes / ce qui manque).
//
// GARDE-FOUS (non négociables) :
//  - AUCUN appel payant tant qu'une clé provider n'est pas posée ET qu'un feu vert admin
//    (token = COCKPIT_TOKEN) n'accompagne pas la demande. Sinon : on prépare (script + fiche
//    'pret'/'a_valider') et on renvoie honnêtement ce qui manque — jamais de faux « appel passé ».
//  - Argent réel (Bible §6) : au 1er appel payant, signalement d'UNE ligne au journal.
//  - Légal : le script fait TOUJOURS se déclarer l'IA comme assistant NAVLYS (transparence FR/UE) ;
//    la voix clonée suppose le consentement de la personne clonée (posé côté abonné).
//  - On n'usurpe JAMAIS le numéro de l'abonné : l'appel part d'un numéro NAVLYS vérifié, à son nom.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const env = (...names: string[]) => { for (const n of names) { const v = Deno.env.get(n); if (v) return v; } return ""; };
// Lecture tolérante des secrets (règle n°4)
const VAPI = env("VAPI_API_KEY", "VAPI_KEY");
const BLAND = env("BLAND_API_KEY", "BLAND_KEY");
const TWILIO_SID = env("TWILIO_ACCOUNT_SID", "TWILIO_SID");
const TWILIO_TOK = env("TWILIO_AUTH_TOKEN", "TWILIO_TOKEN");
const FROM_NUM = env("NAVLYS_CALL_FROM", "VAPI_PHONE_NUMBER_ID", "TWILIO_FROM", "NAVLYS_TEL");
const VOICE_ID = env("NAVLYS_VOICE_ID", "VOICE_ID", "ELEVENLABS_VOICE_ID");
const COCKPIT = env("COCKPIT_TOKEN", "COCKPIT_PASS");

const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"POST,GET,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
const J = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "Content-Type":"application/json", ...CORS } });
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n);
const hh = () => ({ apikey: K, Authorization: "Bearer " + K, "Content-Type": "application/json" });
async function rest(method: string, path: string, body?: unknown) {
  const r = await fetch(U + "/rest/v1/" + path, { method, headers: { ...hh(), Prefer: "return=representation" }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => null); return { ok: r.ok, d };
}
async function journal(type: string, message: string) { await rest("POST", "journal", { type, message }); }

function providerPret() {
  if (VAPI && FROM_NUM) return "vapi";
  if (BLAND) return "bland";
  if (TWILIO_SID && TWILIO_TOK && FROM_NUM) return "twilio";
  return "";
}
function manqueListe() {
  const m: string[] = [];
  if (!VAPI && !BLAND && !(TWILIO_SID && TWILIO_TOK)) m.push("clé plateforme d'appel (VAPI_API_KEY, ou BLAND_API_KEY, ou TWILIO_ACCOUNT_SID+TWILIO_AUTH_TOKEN)");
  if (!FROM_NUM && !BLAND) m.push("numéro NAVLYS d'émission vérifié (NAVLYS_CALL_FROM / VAPI_PHONE_NUMBER_ID / TWILIO_FROM)");
  if (!COCKPIT) m.push("COCKPIT_TOKEN (feu vert admin pour déclencher un appel payant)");
  return m;
}

async function ecrireScript(prenom: string, business: string, besoin: string, date: string, voix: string) {
  const decl = "Bonjour, je suis l'assistant NAVLYS qui appelle de la part de " + (prenom || "un client") + ".";
  if (!ANTH) return decl + " Je souhaite prendre un rendez-vous : " + besoin + (date ? (" — créneau souhaité : " + date + ".") : ".") + " Merci de me dire vos disponibilités.";
  try {
    const sys = "Tu écris le SCRIPT d'un appel téléphonique court et poli, en français, où l'assistant NAVLYS appelle un commerce/artisan pour prendre un rendez-vous AU NOM d'un client. Contraintes STRICTES : (1) la 1re phrase déclare clairement que c'est un assistant NAVLYS qui appelle pour le client (transparence, jamais se faire passer pour un humain nommé) ; (2) expose le besoin, propose le créneau souhaité, demande les disponibilités ; (3) reste bref, chaleureux, tutoiement interdit avec un pro (vouvoiement de politesse ici) ; (4) n'invente aucune info non fournie. Réponds UNIQUEMENT par le script parlé.";
    const usr = `Client : ${prenom || "(prénom non fourni)"}\nCommerce appelé : ${business}\nBesoin/RDV : ${besoin}\nCréneau souhaité : ${date || "(à convenir)"}\nVoix utilisée : ${voix}`;
    const r = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{ "x-api-key":ANTH, "anthropic-version":"2023-06-01", "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-haiku-4-5-20251001", max_tokens:400, system:sys, messages:[{ role:"user", content:usr }] }) });
    const d: any = await r.json().catch(() => ({}));
    const out = ((d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n").trim());
    return out || decl;
  } catch { return decl; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method === "GET") return J({ ok:true, service:"navlys-concierge-appel", provider_pret: providerPret() || null, voix_clonee_prete: !!VOICE_ID, manque: manqueListe() });

  const b: any = await req.json().catch(() => ({}));
  if (b && b.website) return J({ ok:true }); // pot de miel
  const token = clean(b.token, 60);
  const business = b.business || {};
  const nom = clean(business.nom, 120);
  const tel = clean(business.tel, 40);
  const besoin = clean(b.besoin, 500);
  const date = clean(b.date_souhaitee, 120);
  const voix = b.voix === "clone" ? "clone" : "navlys";
  const estAdmin = !!COCKPIT && clean(b.admin, 80) === COCKPIT;

  if (!token) return J({ ok:false, error:"Connecte-toi d'abord (token membre requis)." }, 200);
  if (!besoin) return J({ ok:false, error:"Dis-moi quel rendez-vous prendre (ex. « table pour 2 ce soir 20h »)." }, 200);

  // Validation du membre
  const g = await rest("GET", `membres?token=eq.${encodeURIComponent(token)}&select=email,prenom`);
  if (!g.ok || !Array.isArray(g.d) || !g.d.length) return J({ ok:false, error:"Profil introuvable — inscris-toi d'abord." }, 200);
  const membre = g.d[0];

  const script = await ecrireScript(membre.prenom || "", nom || "le commerce", besoin, date, voix);
  const prov = providerPret();
  const manque = manqueListe();
  const peutAppeler = !!prov && estAdmin && !!tel;

  // Fiche d'appel (toujours tracée)
  const statut = peutAppeler ? "en_cours" : (manque.length ? "pret" : "a_valider");
  const rec = await rest("POST", "concierge_appels", { membre_email: membre.email, membre_token: token, business_nom: nom, business_tel: tel, besoin, date_souhaitee: date, voix, statut, provider: prov || null, script });
  const appel_id = rec.ok && rec.d && rec.d[0] ? rec.d[0].id : null;

  if (!peutAppeler) {
    // On NE passe PAS d'appel : soit il manque une brique (provider/numéro), soit le feu vert admin.
    const pourquoi = !prov ? "plateforme d'appel non configurée" : (!tel ? "numéro du commerce manquant" : "feu vert admin requis (appel payant, Bible §6)");
    return J({ ok:true, statut, appel_id, provider: prov || null, script,
      manque, message: `Appel préparé mais NON lancé — ${pourquoi}. Le script du RDV est prêt ; rien n'a été dépensé.` });
  }

  // Feu vert : signalement d'UNE ligne (Bible §6) puis on remet l'exécution réelle à l'adaptateur provider.
  await journal("concierge_appel", `📞 Appel concierge (${prov}) au nom de ${membre.email} → ${nom || tel} : ${besoin}${date ? " ("+date+")" : ""}`);
  // NB : l'adaptateur d'appel réel (Vapi/Bland/Twilio) se branche ici une fois la clé posée.
  // Tant que l'intégration provider n'est pas finalisée, on reste transparent :
  return J({ ok:true, statut:"a_valider", appel_id, provider: prov, script,
    manque: [], message: `Feu vert reçu et fiche prête (voix ${voix}). L'exécution réelle de l'appel via ${prov} s'active dès l'adaptateur branché — aucun faux « appel passé » n'est renvoyé.` });
});
