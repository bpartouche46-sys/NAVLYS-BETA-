// NAVLYS — Concierge (NAVGEN) : trouve une vraie solution locale (restaurant, hôtel, artisan,
//   plombier, serrurier, médecin, pharmacie, taxi…) partout où NAVLYS communique.
//
//   POST { besoin, lieu, categorie?, rayon?, lang? }
//     -> { ok, lieu:{...}, categorie, options:[{nom, adresse, tel, site, horaires, source, lat, lon}],
//          sources:[...], conseil, prochaine_etape }
//   GET ?diag -> readiness.
//
// DOCTRINE :
//  - Données RÉELLES uniquement (OpenStreetMap). On n'invente JAMAIS un commerce/artisan.
//  - Multi-sources en CONTRADICTOIRE : Overpass (par tag OSM autour du point) + Nominatim
//    (recherche nommée) croisés et dédupliqués → deux angles indépendants.
//  - JAMAIS de cul-de-sac (« anticiper toute recherche non aboutie ») : si peu/pas de résultats,
//    on élargit le rayon, puis on renvoie TOUJOURS une étape suivante actionnable.
//  - Sources publiques open-data en lecture seule (aucune connexion entrante, règle n°111).
//  - Un LLM (optionnel) ne sert qu'à FORMULER le conseil et à classer un besoin libre — jamais
//    à fabriquer des listings.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTH = Deno.env.get("ANTHROPIC_API_KEY") || "";
const UA = "NAVLYS-Concierge/1.0 (+https://navlys.com; bruno@navlys.com)";
const CORS = { "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"POST,GET,OPTIONS", "Access-Control-Allow-Headers":"content-type,authorization,apikey" };
const J = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "Content-Type":"application/json", ...CORS } });
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n);

// Catégories : mots FR (et variantes) -> filtre Overpass + libellé + requête Nominatim.
type Cat = { key: string; label: string; osm: string; mots: string[]; nomi: string };
const CATS: Cat[] = [
  { key:"restaurant", label:"Restaurant",   osm:'["amenity"="restaurant"]', nomi:"restaurant", mots:["restaurant","resto","manger","dîner","diner","déjeuner","dejeuner","table","brasserie","bistrot"] },
  { key:"hotel",      label:"Hôtel",        osm:'["tourism"="hotel"]',      nomi:"hotel",      mots:["hotel","hôtel","dormir","chambre","nuit","hébergement","hebergement","auberge"] },
  { key:"cafe",       label:"Café / Bar",   osm:'["amenity"~"cafe|bar|pub"]', nomi:"café",     mots:["café","cafe","bar","boire","pub","terrasse"] },
  { key:"plombier",   label:"Plombier",     osm:'["craft"="plumber"]',      nomi:"plombier",   mots:["plombier","plomberie","fuite","tuyau","canalisation"] },
  { key:"serrurier",  label:"Serrurier",    osm:'["craft"="locksmith"]',    nomi:"serrurier",  mots:["serrurier","serrure","clé","cle","porte claquée","enfermé","enferme"] },
  { key:"electricien",label:"Électricien",  osm:'["craft"="electrician"]',  nomi:"électricien",mots:["électricien","electricien","électricité","electricite","panne courant","disjoncteur"] },
  { key:"chauffagiste",label:"Chauffagiste",osm:'["craft"~"hvac|heating_engineer"]', nomi:"chauffagiste", mots:["chauffagiste","chauffage","chaudière","chaudiere","radiateur"] },
  { key:"menuisier",  label:"Menuisier",    osm:'["craft"="carpenter"]',    nomi:"menuisier",  mots:["menuisier","menuiserie","bois","meuble sur mesure"] },
  { key:"peintre",    label:"Peintre",      osm:'["craft"="painter"]',      nomi:"peintre en bâtiment", mots:["peintre","peinture","repeindre"] },
  { key:"medecin",    label:"Médecin",      osm:'["amenity"="doctors"]',    nomi:"médecin",    mots:["médecin","medecin","docteur","généraliste","generaliste","consultation"] },
  { key:"pharmacie",  label:"Pharmacie",    osm:'["amenity"="pharmacy"]',   nomi:"pharmacie",  mots:["pharmacie","médicament","medicament","pharmacien"] },
  { key:"dentiste",   label:"Dentiste",     osm:'["amenity"="dentist"]',    nomi:"dentiste",   mots:["dentiste","dent","dentaire"] },
  { key:"veterinaire",label:"Vétérinaire",  osm:'["amenity"="veterinary"]', nomi:"vétérinaire",mots:["vétérinaire","veterinaire","véto","veto","animal"] },
  { key:"taxi",       label:"Taxi / VTC",   osm:'["amenity"="taxi"]',       nomi:"taxi",       mots:["taxi","vtc","course","transport"] },
  { key:"coiffeur",   label:"Coiffeur",     osm:'["shop"="hairdresser"]',   nomi:"coiffeur",   mots:["coiffeur","coiffure","cheveux"] },
  { key:"garage",     label:"Garagiste",    osm:'["shop"="car_repair"]',    nomi:"garage automobile", mots:["garage","garagiste","voiture","mécanicien","mecanicien","réparation auto"] },
  { key:"boulangerie",label:"Boulangerie",  osm:'["shop"="bakery"]',        nomi:"boulangerie",mots:["boulangerie","pain","boulanger","viennoiserie"] },
  { key:"supermarche",label:"Supermarché",  osm:'["shop"~"supermarket|convenience"]', nomi:"supermarché", mots:["supermarché","supermarche","courses","épicerie","epicerie","alimentation"] },
  { key:"banque",     label:"Banque / DAB", osm:'["amenity"~"bank|atm"]',   nomi:"banque",     mots:["banque","distributeur","dab","retrait","atm"] },
];

function classer(besoin: string): Cat | null {
  const t = " " + besoin.toLowerCase() + " ";
  for (const c of CATS) if (c.mots.some((m) => t.includes(m))) return c;
  return null;
}

async function jget(url: string): Promise<any> {
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept":"application/json" } });
  if (!r.ok) return null;
  return await r.json().catch(() => null);
}

// Géocode le lieu (Nominatim) -> {lat, lon, nom}
async function geocode(lieu: string) {
  const u = "https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=0&q=" + encodeURIComponent(lieu);
  const d = await jget(u);
  if (Array.isArray(d) && d[0]) return { lat: Number(d[0].lat), lon: Number(d[0].lon), nom: clean(d[0].display_name, 200) };
  return null;
}

const adresse = (t: any) => [t["addr:housenumber"], t["addr:street"], t["addr:postcode"], t["addr:city"]].filter(Boolean).join(" ").trim();
const opt = (t: any, lat: number, lon: number, source: string) => ({
  nom: clean(t.name || t["operator"] || "", 120) || "(sans nom)",
  adresse: clean(adresse(t), 200),
  tel: clean(t.phone || t["contact:phone"] || t["contact:mobile"] || "", 40),
  site: clean(t.website || t["contact:website"] || t.url || "", 200),
  horaires: clean(t.opening_hours || "", 120),
  source, lat, lon,
});

// Overpass : POI par tag autour du point.
async function overpass(cat: Cat, lat: number, lon: number, rayon: number) {
  const q = `[out:json][timeout:25];(nwr${cat.osm}(around:${rayon},${lat},${lon}););out center tags 40;`;
  try {
    const r = await fetch("https://overpass-api.de/api/interpreter", { method:"POST", headers:{ "User-Agent":UA, "Content-Type":"application/x-www-form-urlencoded" }, body: "data=" + encodeURIComponent(q) });
    if (!r.ok) return [];
    const d: any = await r.json().catch(() => null);
    const els = (d && Array.isArray(d.elements)) ? d.elements : [];
    return els.filter((e: any) => e.tags && e.tags.name).map((e: any) => opt(e.tags, e.lat ?? e.center?.lat, e.lon ?? e.center?.lon, "OpenStreetMap"));
  } catch { return []; }
}

// Nominatim : recherche nommée « <categorie> <lieu> » (2e angle, indépendant d'Overpass).
async function nominatimCat(cat: Cat, lieu: string) {
  const u = "https://nominatim.openstreetmap.org/search?format=json&limit=15&extratags=1&addressdetails=1&q=" + encodeURIComponent(cat.nomi + " " + lieu);
  const d = await jget(u);
  if (!Array.isArray(d)) return [];
  return d.map((e: any) => {
    const a = e.address || {}; const et = e.extratags || {};
    const adr = [a.house_number, a.road, a.postcode, a.city || a.town || a.village].filter(Boolean).join(" ");
    return { nom: clean(e.name || (e.display_name || "").split(",")[0], 120) || "(sans nom)", adresse: clean(adr, 200), tel: clean(et.phone || et["contact:phone"] || "", 40), site: clean(et.website || "", 200), horaires: clean(et.opening_hours || "", 120), source:"Nominatim", lat:Number(e.lat), lon:Number(e.lon) };
  });
}

function dedupe(list: any[]) {
  const seen = new Set<string>(); const out: any[] = [];
  for (const o of list) { const k = (o.nom || "").toLowerCase().replace(/[^a-z0-9]/g, "") + "|" + (o.adresse || "").toLowerCase().slice(0, 18); if (o.nom && !seen.has(k)) { seen.add(k); out.push(o); } }
  return out;
}

// ── RÉSILIENCE MULTI-MODÈLE (indépendance CORE) ──────────────────────────
// Même pattern que api/whatsapp-webhook.js, supabase/functions/assistant et bible :
// Claude direct d'abord, puis OpenRouter/Llama, puis NVIDIA NIM, dans cet ordre —
// le conseil du concierge ne doit jamais rester muet si un autre modèle peut le
// formuler. Lecture tolérante des clés (règle n°4). Aucune donnée n'est inventée :
// le LLM ne FORMULE que le conseil, jamais les listings (toujours OSM, réels).
async function appelAnthropic(sys: string, msgs: any[], model: string, maxTok: number): Promise<string> {
  if (!ANTH) return "";
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{ "x-api-key":ANTH, "anthropic-version":"2023-06-01", "Content-Type":"application/json" }, body: JSON.stringify({ model, max_tokens:maxTok, system:sys, messages:msgs }) });
    const d: any = await r.json().catch(() => ({}));
    return ((d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ").trim());
  } catch { return ""; }
}
async function appelOpenRouter(sys: string, msgs: any[], maxTok: number): Promise<string> {
  const orKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("OPENROUTER_KEY") || Deno.env.get("OPEN_ROUTER_API_KEY") || Deno.env.get("OPEN_API_ROUTER") || Deno.env.get("OPEN_API_ROUTER_KEY") || "";
  if (!orKey) return "";
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", { method:"POST", headers:{ Authorization:`Bearer ${orKey}`, "Content-Type":"application/json", "HTTP-Referer":"https://navlys.com", "X-Title":"NAVLYS Concierge" }, body: JSON.stringify({ model:"meta-llama/llama-3.3-70b-instruct:free", max_tokens:maxTok, messages:[{ role:"system", content:sys }, ...msgs] }) });
    const d: any = await r.json().catch(() => ({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
async function appelNvidia(sys: string, msgs: any[], maxTok: number): Promise<string> {
  const nvKey = Deno.env.get("NVIDIA_API_KEY") || Deno.env.get("NVAPI_KEY") || Deno.env.get("NVIDIA_NIM_KEY") || Deno.env.get("NGC_API_KEY") || Deno.env.get("NVIDIA_BUILD_API_KEY") || Deno.env.get("BUILD_NVIDIA_API_KEY") || "";
  if (!nvKey) return "";
  try {
    const r = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", { method:"POST", headers:{ Authorization:`Bearer ${nvKey}`, "Content-Type":"application/json" }, body: JSON.stringify({ model:"meta/llama-3.3-70b-instruct", max_tokens:maxTok, temperature:0.4, messages:[{ role:"system", content:sys }, ...msgs] }) });
    const d: any = await r.json().catch(() => ({}));
    return (d?.choices?.[0]?.message?.content || "").trim();
  } catch { return ""; }
}
async function callBrain(sys: string, msgs: any[], model: string, maxTok: number): Promise<string> {
  const a = await appelAnthropic(sys, msgs, model, maxTok); if (a) return a;
  const o = await appelOpenRouter(sys, msgs, maxTok); if (o) return o;
  const n = await appelNvidia(sys, msgs, maxTok); if (n) return n;
  return "";
}

async function conseilLLM(besoin: string, cat: string, lieuNom: string, n: number) {
  const sys = "Tu es le concierge NAVLYS, chaleureux, tutoiement, direct et poli. On te donne un besoin, une catégorie, un lieu et le nombre d'options trouvées (vraies, issues d'OpenStreetMap). Écris 2 phrases max : comment choisir vite, et quoi vérifier avant d'appeler (horaires, urgence, avis). N'invente aucun nom. Français.";
  const usr = `Besoin : ${besoin}\nCatégorie : ${cat}\nLieu : ${lieuNom}\nOptions trouvées : ${n}`;
  return await callBrain(sys, [{ role:"user", content:usr }], "claude-haiku-4-5-20251001", 220);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method === "GET") return J({ ok:true, service:"navlys-concierge", categories: CATS.map((c) => c.key), llm: !!ANTH, resilience_llm:["claude","openrouter_llama","nvidia_nim"] });

  const b: any = await req.json().catch(() => ({}));
  if (b && b.website) return J({ ok:true }); // pot de miel anti-bot
  const besoin = clean(b.besoin, 300);
  const lieu = clean(b.lieu, 160);
  if (!besoin || !lieu) return J({ ok:false, error:"Dis-moi ce dont tu as besoin ET où (ex. « plombier Paris 11 »)." }, 200);

  // catégorie : explicite, sinon classée par mots, sinon fallback restaurant-générique (jamais bloquée)
  let cat = CATS.find((c) => c.key === clean(b.categorie, 30)) || classer(besoin);
  const catInconnue = !cat;
  if (!cat) cat = { key:"lieu", label:"Lieu", osm:'["name"]', nomi: besoin, mots:[] };

  const geo = await geocode(lieu);
  if (!geo) return J({ ok:false, error:`Je ne situe pas « ${lieu} ». Précise la ville ou le code postal.`, prochaine_etape:"Réessaie avec une ville + un code postal (ex. « Paris 75011 »)." }, 200);

  let rayon = Math.min(Math.max(Number(b.rayon) || 2500, 500), 15000);
  // 1er passage
  let [ov, no] = await Promise.all([ cat.osm !== '["name"]' ? overpass(cat, geo.lat, geo.lon, rayon) : Promise.resolve([]), nominatimCat(cat, lieu) ]);
  let options = dedupe([...ov, ...no]);
  // anti cul-de-sac : élargir si trop peu
  const sources = new Set<string>(); [...ov, ...no].forEach((o) => sources.add(o.source));
  if (options.length < 3 && cat.osm !== '["name"]') {
    rayon = Math.min(rayon * 3, 15000);
    const ov2 = await overpass(cat, geo.lat, geo.lon, rayon);
    ov2.forEach((o) => sources.add(o.source));
    options = dedupe([...options, ...ov2]);
  }
  options = options.slice(0, 12);

  const conseil = await conseilLLM(besoin, cat.label, geo.nom, options.length);
  const prochaine_etape = options.length
    ? "Choisis 2-3 options, vérifie horaires/dispo, et appelle — je peux aussi préparer le message ou élargir la zone."
    : `Aucune fiche ouverte trouvée pour « ${cat.label} » autour de « ${lieu} ». Élargis la zone, ou dis-moi de chercher une catégorie proche / un autre quartier — je ne te laisse jamais sans piste.`;

  return J({
    ok: true,
    lieu: { demande: lieu, resolu: geo.nom, lat: geo.lat, lon: geo.lon },
    categorie: cat.label, categorie_incertaine: catInconnue,
    rayon_m: rayon,
    options,
    sources: [...sources],
    conseil: conseil || "Compare 2-3 options avant d'appeler : horaires, proximité, et l'urgence de ton besoin.",
    prochaine_etape,
  });
});
