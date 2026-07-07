// NAVLYS — Voix (TTS ElevenLabs, AVEC ÉMOTION) · v5 AUTO-DÉCOUVERTE DES CLÉS.
// Le CORE fouille SON PROPRE environnement : toute valeur en sk_… ou tout nom
// contenant ELEVEN/XI/VOICE est candidate ; chaque candidate est validée contre
// ElevenLabs (/v1/user) ; la première valide est adoptée (cache en mémoire).
// GET  -> diagnostic (noms candidats + laquelle est valide — JAMAIS les valeurs)
// POST {text, voice?} -> { ok, audio: base64 mp3 }
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const DEFAULT_VOICE = Deno.env.get("NAVLYS_VOICE_ID") || "6hUoby5ZAVW4JqvIJeri"; // clone Bruno
const MODEL = Deno.env.get("NAVLYS_VOICE_MODEL") || "eleven_multilingual_v2";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,apikey",
  "Access-Control-Max-Age": "86400",
};
function J(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS } });
}
const clean = (x: unknown, n: number) => String(x == null ? "" : x).replace(/\s+/g, " ").trim().slice(0, n);
function b64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf); let bin = ""; const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as unknown as number[]);
  return btoa(bin);
}

// ---- auto-découverte : candidats dans l'environnement du CORE ----
function candidats(): { nom: string; val: string }[] {
  const env = Deno.env.toObject();
  const out: { nom: string; val: string }[] = [];
  const vus = new Set<string>();
  for (const nom of Object.keys(env)) {
    const val = (env[nom] || "").trim();
    if (!val || val.length < 20 || vus.has(val)) continue;
    const nomU = nom.toUpperCase();
    const nomMatch = /ELEVEN|^XI_|_XI$|VOICE|VOIX/.test(nomU) && !/VOICE_ID|VOICE_MODEL/.test(nomU);
    const valMatch = /^sk_[a-f0-9]{20,}$/i.test(val);
    if (nomMatch || valMatch) { out.push({ nom, val }); vus.add(val); }
  }
  return out;
}
let CACHE: { nom: string; val: string } | null = null;
async function cleValide(): Promise<{ nom: string; val: string } | null> {
  if (CACHE) return CACHE;
  for (const c of candidats()) {
    try {
      const r = await fetch("https://api.elevenlabs.io/v1/user", { headers: { "xi-api-key": c.val } });
      if (r.ok) { CACHE = c; return c; }
    } catch (_e) { /* candidate suivante */ }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method === "GET") {
    const cands = candidats().map((c) => c.nom);
    const ok = await cleValide();
    return J({ ok: true, service: "navlys-voix", candidats: cands, cle_valide: ok ? ok.nom : null, voice: DEFAULT_VOICE });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);
  const b: any = await req.json().catch(() => ({}));
  const text = clean(b.text, 1200);
  const voice = clean(b.voice, 60) || DEFAULT_VOICE;
  if (!text) return J({ error: "vide" }, 400);
  const cle = await cleValide();
  if (!cle) return J({ ok: false, error: "aucune_cle_valide", candidats: candidats().map((c) => c.nom) }, 200);
  const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
    method: "POST",
    headers: { "xi-api-key": cle.val, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({ text, model_id: MODEL,
      voice_settings: { stability: 0.30, similarity_boost: 0.75, style: 0.65, use_speaker_boost: true } }),
  });
  if (!r.ok) { CACHE = null; return J({ ok: false, error: "eleven_" + r.status, detail: (await r.text().catch(() => "")).slice(0, 200) }, 200); }
  const audio = await r.arrayBuffer();
  return J({ ok: true, voice, model: MODEL, cle: cle.nom, audio: "data:audio/mpeg;base64," + b64(audio) });
});
