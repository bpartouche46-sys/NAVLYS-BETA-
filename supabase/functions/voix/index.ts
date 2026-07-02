// NAVLYS — Voix (Text-to-Speech ElevenLabs, AVEC ÉMOTION).
// POST {text, voice?} -> { ok, audio: "data:audio/mpeg;base64,...", voice }
// Lecture TOLÉRANTE de la clé (plusieurs noms possibles) — réflexe NAVLYS.
// Réglages expressifs : stability basse + style haut = voix vivante, émotive.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const XI =
  Deno.env.get("ELEVENLABS_API_KEY") ||
  Deno.env.get("ELEVENLAB_KEY") ||
  Deno.env.get("ELEVEN_KEY") ||
  Deno.env.get("XI_KEY") ||
  Deno.env.get("XI_API_KEY") || "";

// Voix par défaut : configurable (NAVLYS_VOICE_ID) sinon une voix chaleureuse.
// « Antoni » (ErXwobaYiN019PkySvjV) = voix masculine chaude et expressive.
const DEFAULT_VOICE = Deno.env.get("NAVLYS_VOICE_ID") || "ErXwobaYiN019PkySvjV";
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

// base64 sûr pour gros buffers (pas de spread qui explose la pile)
function b64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as unknown as number[]);
  }
  return btoa(bin);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method === "GET") return J({ ok: true, service: "navlys-voix", key: XI ? "présente" : "absente", voice: DEFAULT_VOICE });
  if (req.method !== "POST") return J({ error: "method" }, 405);

  const b: any = await req.json().catch(() => ({}));
  const text = clean(b.text, 1200);
  const voice = clean(b.voice, 60) || DEFAULT_VOICE;
  if (!text) return J({ error: "vide" }, 400);
  if (!XI) return J({ ok: false, error: "cle_absente", hint: "Poser ELEVENLABS_API_KEY (ou ELEVENLAB_KEY) dans les secrets Supabase." }, 200);

  const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
    method: "POST",
    headers: { "xi-api-key": XI, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: { stability: 0.30, similarity_boost: 0.75, style: 0.65, use_speaker_boost: true },
    }),
  });

  if (!r.ok) {
    const msg = await r.text().catch(() => "");
    return J({ ok: false, error: "eleven_" + r.status, detail: msg.slice(0, 300) }, 200);
  }
  const audio = await r.arrayBuffer();
  return J({ ok: true, voice, model: MODEL, audio: "data:audio/mpeg;base64," + b64(audio) });
});
