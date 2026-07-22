// NAVLYS — « labo-audio » : génère une voix (brique voix existante) et la dépose
// directement dans le Storage public, pour l'itération quotidienne demandée par
// Bruno (2026-07-09) : « teste un changement chaque jour, un réglage, je te dirai
// ce que j'en pense en live sur le site spécifique au test ».
// POST {texte, profil, nom} → génère l'audio (ElevenLabs via /voix), l'enregistre
// dans Storage (bucket avatar/labo/{nom}.mp3), renvoie l'URL publique.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const U = Deno.env.get("SUPABASE_URL")!;
const K = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Max-Age": "86400",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}

function base64VersOctets(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const texte = String(b.texte || "").trim().slice(0, 2000);
  const profil = String(b.profil || "bm");
  const nom = String(b.nom || "").replace(/[^a-z0-9-]/gi, "").slice(0, 60) || `essai-${Date.now()}`;
  if (!texte) return J({ ok: false, erreur: "texte vide" }, 400);

  const rVoix = await fetch(`${U}/functions/v1/voix`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: texte, profil }),
  });
  const dVoix: any = await rVoix.json().catch(() => ({}));
  if (!dVoix.ok || !dVoix.audio) return J({ ok: false, erreur: "voix indisponible", detail: dVoix.erreur || null }, 502);

  const m = /^data:audio\/mpeg;base64,(.+)$/.exec(dVoix.audio);
  if (!m) return J({ ok: false, erreur: "format audio inattendu" }, 502);
  const octets = base64VersOctets(m[1]);

  const chemin = `labo/${nom}.mp3`;
  const rUp = await fetch(`${U}/storage/v1/object/avatar/${chemin}`, {
    method: "POST",
    headers: { apikey: K, Authorization: `Bearer ${K}`, "Content-Type": "audio/mpeg", "x-upsert": "true" },
    body: octets,
  });
  if (!rUp.ok) return J({ ok: false, erreur: "upload storage échoué", detail: await rUp.text() }, 502);

  const url = `${U}/storage/v1/object/public/avatar/${chemin}`;
  return J({ ok: true, url, profil, nom, octets: octets.length });
});
