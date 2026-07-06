// NAVLYS — Voix (Text-to-Speech ElevenLabs). v15 — VOIX VIVANTE & ÉMOTIVE.
// Ordre de Bruno (2026-07-06) : beaucoup plus de vie, de fluctuation haut/bas
// suivant la ponctuation, de l'émotion, JAMAIS monocorde — voix chantante et
// changeante suivant le contexte. => stability BASSE + style HAUT + speaker_boost.
// (Supersede la doctrine « tamisée » du 2026-07-05.)
// Réglable par secrets (NAVLYS_VOICE_STABILITY / _STYLE / _SIMILARITY / _BOOST)
// sans redéploiement. La ponctuation (… ! ? — ,) porte l'intonation : on la garde.
// POST {text, voice?, stocke?} -> { ok, audio (data URI), url? si stocke }
// GET ?voices -> liste des voix par clé (diagnostic)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const KEYS = [
  "Stealthy_Malayan_Tiger", "STEALTHY_MALAYAN_TIGER",
  "ELEVENLABS_API_KEY", "ELEVEN_LAB_API_KEY", "ELEVEN_LABS_API_KEY", "ELEVENLABS_KEY",
  "ELEVENLAB_KEY", "ELEVEN_KEY", "XI_KEY", "XI_API_KEY",
].map((n) => Deno.env.get(n) || "").filter((v, i, a) => v && a.indexOf(v) === i);

const DEFAULT_VOICE = Deno.env.get("NAVLYS_VOICE_ID") || "6hUoby5ZAVW4JqvIJeri";
const MODEL = Deno.env.get("NAVLYS_VOICE_MODEL") || "eleven_multilingual_v2";
const num = (n: string, d: number) => { const v = parseFloat(Deno.env.get(n) || ""); return isNaN(v) ? d : v; };
// Défauts EXPRESSIFS : stability basse = plus de variation/émotion ; style haut = chantant.
const SETTINGS = {
  stability: num("NAVLYS_VOICE_STABILITY", 0.28),
  similarity_boost: num("NAVLYS_VOICE_SIMILARITY", 0.75),
  style: num("NAVLYS_VOICE_STYLE", 0.70),
  use_speaker_boost: (Deno.env.get("NAVLYS_VOICE_BOOST") || "oui").toLowerCase() === "oui",
};
const SB_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SB_SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

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
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as unknown as number[]);
  }
  return btoa(bin);
}

async function listVoices(key: string): Promise<any[]> {
  const r = await fetch("https://api.elevenlabs.io/v1/voices", { headers: { "xi-api-key": key } });
  if (!r.ok) return [];
  const d: any = await r.json().catch(() => ({}));
  return Array.isArray(d?.voices) ? d.voices : [];
}
function pickClone(voices: any[]): string {
  const cl = voices.find((v: any) => ["cloned", "professional", "generated"].includes(String(v.category || "")));
  return cl?.voice_id || voices[0]?.voice_id || "";
}
async function tts(key: string, voice: string, text: string) {
  return await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: SETTINGS }),
  });
}
async function hostAudio(buf: ArrayBuffer): Promise<string> {
  await fetch(`${SB_URL}/storage/v1/bucket`, { method: "POST", headers: { Authorization: `Bearer ${SB_SERVICE}`, apikey: SB_SERVICE, "Content-Type": "application/json" }, body: JSON.stringify({ id: "avatar", name: "avatar", public: true }) }).catch(() => {});
  const path = `voix-${Date.now()}.mp3`;
  const up = await fetch(`${SB_URL}/storage/v1/object/avatar/${path}`, { method: "POST", headers: { Authorization: `Bearer ${SB_SERVICE}`, apikey: SB_SERVICE, "Content-Type": "audio/mpeg", "x-upsert": "true" }, body: new Uint8Array(buf) });
  if (!up.ok) throw new Error(`Storage ${up.status}`);
  return `${SB_URL}/storage/v1/object/public/avatar/${path}`;
}
async function ok(r: Response, voice: string, stocke: boolean) {
  const audio = await r.arrayBuffer();
  let url = "";
  if (stocke && SB_URL && SB_SERVICE) { try { url = await hostAudio(audio); } catch (_e) { url = ""; } }
  return J({ ok: true, voice, model: MODEL, reglages: SETTINGS, url: url || null, audio: "data:audio/mpeg;base64," + b64(audio) });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const url = new URL(req.url);
  if (req.method === "GET") {
    if (url.searchParams.has("voices") && KEYS.length) {
      const par: any[] = [];
      for (let i = 0; i < KEYS.length; i++) {
        const vs = await listVoices(KEYS[i]);
        par.push({ cle: i + 1, voix: vs.map((v: any) => ({ id: v.voice_id, nom: v.name, categorie: v.category })) });
      }
      return J({ ok: true, comptes: par });
    }
    return J({ ok: true, service: "navlys-voix", version: 15, keys: KEYS.length, voice: DEFAULT_VOICE, reglages: SETTINGS });
  }
  if (req.method !== "POST") return J({ error: "method" }, 405);

  const b: any = await req.json().catch(() => ({}));
  const text = clean(b.text, 1200);
  const voice = clean(b.voice, 60) || DEFAULT_VOICE;
  const stocke = !!b.stocke;
  if (!text) return J({ error: "vide" }, 400);
  if (!KEYS.length) return J({ ok: false, error: "cle_absente", hint: "Poser ELEVENLABS_API_KEY dans les secrets Supabase." }, 200);

  let lastErr = "";
  for (const key of KEYS) {
    const r = await tts(key, voice, text);
    if (r.ok) return await ok(r, voice, stocke);
    lastErr = "eleven_" + r.status + " " + (await r.text().catch(() => "")).slice(0, 160);
  }
  for (const key of KEYS) {
    const alt = pickClone(await listVoices(key));
    if (!alt || alt === voice) continue;
    const r = await tts(key, alt, text);
    if (r.ok) return await ok(r, alt, stocke);
    lastErr = "eleven_" + r.status + " " + (await r.text().catch(() => "")).slice(0, 160);
  }
  return J({ ok: false, error: "toutes_cles_refusees", detail: lastErr }, 200);
});
