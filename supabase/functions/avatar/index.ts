// ============================================================
// NAVLYS CORE — brique « avatar » (fal.ai)
// Porte-parole de marque BM : ta voix (ElevenLabs) + ton visage
// déjà cloné sur fal.ai → vidéo MP4 qui parle et bouge.
//
// Doctrine : on grave le script UNE fois, on ne redemande plus.
// Le rendu ne consomme du crédit payant (Bible §6) QUE sur POST.
//
// Secrets (Supabase → Edge Functions → Secrets) :
//   FAL_KEY               — clé API fal.ai (ton compte, tes crédits)
//   AVATAR_IMAGE_URL      — URL de TA photo clonée/habillée sur fal.ai
//                           (mise une fois → la promo du jour = juste le texte)
//   ELEVENLABS_API_KEY    — voix clonée BM (option : sinon fal fait la voix)
//   ELEVENLABS_VOICE_ID   — (option) défaut = voix BM
//   AVATAR_MODEL          — (option) défaut fal-ai/ai-avatar
// Env natifs : SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (héberge l'audio)
//
// Endpoints :
//   GET  ?diag                 → état des clés (safe, aucun débit)
//   GET  ?status=<url_encodée>  → statut/résultat d'un rendu fal.ai
//   POST {text?, audio_url?, image_url?, model?}
//        → audio (ta voix) + rendu fal.ai, renvoie les URLs de suivi.
// ============================================================

// tolérant aux noms de secret (FAL_KEY canonique, ou NAVLYS_AVATAR / FAL_AI_KEY)
const FAL_KEY = Deno.env.get("FAL_KEY") ?? Deno.env.get("NAVLYS_AVATAR") ?? Deno.env.get("FAL_AI_KEY") ?? "";
const AVATAR_IMAGE_URL = Deno.env.get("AVATAR_IMAGE_URL") ?? "";
// tolérant aux noms de secret pour la voix
const XI_KEY = Deno.env.get("ELEVENLABS_API_KEY") ?? Deno.env.get("ELEVENLAB_KEY") ?? Deno.env.get("ELEVENLABS_KEY") ?? Deno.env.get("ELEVEN_LABS_API_KEY") ?? "";
const VOICE_ID = Deno.env.get("ELEVENLABS_VOICE_ID") ?? "6hUoby5ZAVW4JqvIJeri";
const MODEL = Deno.env.get("AVATAR_MODEL") ?? "fal-ai/ai-avatar";
const SB_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SB_SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BUCKET = "avatar";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const json = (o: unknown, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });

// ── ElevenLabs : texte → mp3 (ta voix) ─────────────────────
async function ttsElevenLabs(text: string): Promise<Uint8Array> {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: { "xi-api-key": XI_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.8 },
    }),
  });
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${await r.text()}`);
  return new Uint8Array(await r.arrayBuffer());
}

// ── Supabase Storage : héberge le mp3, URL publique ────────
async function hostAudio(bytes: Uint8Array): Promise<string> {
  await fetch(`${SB_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: { Authorization: `Bearer ${SB_SERVICE}`, apikey: SB_SERVICE, "Content-Type": "application/json" },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
  }).catch(() => {});
  const path = `voix-${Date.now()}.mp3`;
  const up = await fetch(`${SB_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${SB_SERVICE}`, apikey: SB_SERVICE, "Content-Type": "audio/mpeg", "x-upsert": "true" },
    body: bytes,
  });
  if (!up.ok) throw new Error(`Storage ${up.status}: ${await up.text()}`);
  return `${SB_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

// ── fal.ai : soumet le rendu (file d'attente) ──────────────
async function falSubmit(imageUrl: string, audioUrl: string, model: string) {
  const r = await fetch(`https://queue.fal.run/${model}`, {
    method: "POST",
    headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: imageUrl, audio_url: audioUrl }),
  });
  if (!r.ok) throw new Error(`fal.ai ${r.status}: ${await r.text()}`);
  return await r.json(); // {request_id, status_url, response_url, cancel_url}
}

async function falFetch(u: string) {
  const r = await fetch(u, { headers: { Authorization: `Key ${FAL_KEY}` } });
  return await r.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const url = new URL(req.url);

  if (req.method === "GET" && url.searchParams.has("diag")) {
    return json({
      ok: true,
      brique: "avatar",
      moteur: "fal.ai",
      modele: MODEL,
      has_fal: !!FAL_KEY,
      has_image: !!AVATAR_IMAGE_URL,
      has_elevenlabs: !!XI_KEY,
      voice_id: VOICE_ID,
      storage_ready: !!(SB_URL && SB_SERVICE),
      pret: !!(FAL_KEY && (AVATAR_IMAGE_URL) && (XI_KEY ? (SB_URL && SB_SERVICE) : true)),
      note: "POST {text} suffit une fois AVATAR_IMAGE_URL + FAL_KEY + ELEVENLABS_API_KEY posées.",
    });
  }

  if (req.method === "GET" && url.searchParams.has("status")) {
    if (!FAL_KEY) return json({ ok: false, error: "FAL_KEY manquante" }, 400);
    const u = decodeURIComponent(url.searchParams.get("status")!);
    return json({ ok: true, resultat: await falFetch(u) });
  }

  if (req.method !== "POST") return json({ ok: false, error: "Méthode non supportée" }, 405);

  const missing: string[] = [];
  if (!FAL_KEY) missing.push("FAL_KEY");
  if (missing.length) return json({ ok: false, error: "Clés manquantes", manquant: missing }, 400);

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* vide */ }
  const text = String(body.text ?? "").trim();
  const model = String(body.model ?? MODEL);
  const imageUrl = String(body.image_url ?? AVATAR_IMAGE_URL);
  let audioUrl = body.audio_url ? String(body.audio_url) : "";

  if (!imageUrl) return json({ ok: false, error: "Aucune image : pose AVATAR_IMAGE_URL (ta photo fal.ai) ou passe image_url." }, 400);
  if (!audioUrl && !text) return json({ ok: false, error: "Fournis 'text' (ta voix ElevenLabs) ou 'audio_url'." }, 400);

  try {
    // 1) audio : ta voix (sauf si audio_url fourni)
    if (!audioUrl) {
      if (!XI_KEY) return json({ ok: false, error: "ELEVENLABS_API_KEY manquante (ou passe audio_url)." }, 400);
      if (!SB_URL || !SB_SERVICE) return json({ ok: false, error: "SUPABASE_SERVICE_ROLE_KEY manquante (hébergement audio)." }, 400);
      audioUrl = await hostAudio(await ttsElevenLabs(text));
    }
    // 2) rendu fal.ai
    const sub = await falSubmit(imageUrl, audioUrl, model);
    const respUrl = sub.response_url ?? sub.status_url ?? "";
    return json({
      ok: true,
      moteur: "fal.ai",
      request_id: sub.request_id ?? null,
      audio_url: audioUrl,
      response_url: respUrl,
      poll: respUrl ? `?status=${encodeURIComponent(respUrl)}` : null,
      message: "Rendu lancé sur fal.ai (ta voix + ton visage). Interroge ?status pour l'URL vidéo finale.",
    });
  } catch (e) {
    return json({ ok: false, error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
