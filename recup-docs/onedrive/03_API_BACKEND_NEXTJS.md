# 03 — API Backend Next.js 14 (App Router) + helpers ElevenLabs / R2

**Stack** : Next.js 14 (App Router) · TypeScript · ElevenLabs SDK · Cloudflare R2 (S3-compatible) · Supabase (rate-limit + analytics).

---

## 1. Dépendances `package.json` (à ajouter dans chaque app NAVLYS)

```json
{
  "dependencies": {
    "@elevenlabs/elevenlabs-js": "^1.50.0",
    "@aws-sdk/client-s3": "^3.658.0",
    "@aws-sdk/s3-request-presigner": "^3.658.0",
    "@supabase/supabase-js": "^2.45.0",
    "zod": "^3.23.0"
  }
}
```

---

## 2. `lib/voice/elevenlabs.ts` — wrapper SDK

```ts
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

export const VOICE_BRUNO = process.env.ELEVENLABS_VOICE_ID_BRUNO!;
export const MODEL = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_multilingual_v2';

export const VOICE_SETTINGS_BRUNO = {
  stability:        0.55,
  similarity_boost: 0.85,
  style:            0.30,
  use_speaker_boost: true,
};

/** Synthèse blocking (one-shot) — renvoie un Buffer MP3. */
export async function synthesizeBlocking(text: string, lang: string) {
  const audio = await client.textToSpeech.convert(VOICE_BRUNO, {
    text,
    model_id: MODEL,
    language_code: lang,
    voice_settings: VOICE_SETTINGS_BRUNO,
    output_format: 'mp3_44100_128',
  });
  // SDK renvoie un ReadableStream<Uint8Array>
  const chunks: Uint8Array[] = [];
  const reader = (audio as ReadableStream<Uint8Array>).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks.map(c => Buffer.from(c)));
}

/** Streaming WebSocket — exposé via route /api/voice/stream. */
export function streamingWebSocketUrl() {
  return `wss://api.elevenlabs.io/v1/text-to-speech/${VOICE_BRUNO}/stream-input` +
         `?model_id=${MODEL}&output_format=mp3_44100_128`;
}
```

---

## 3. `lib/voice/r2.ts` — client cache

```ts
import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
const BUCKET = process.env.R2_BUCKET!;

export function keyFor(voiceId: string, lang: string, hash: string) {
  return `voice/${voiceId}/${lang}/${hash}.mp3`;
}

export async function r2Exists(key: string) {
  try { await r2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key })); return true; }
  catch { return false; }
}

export async function r2Put(key: string, body: Buffer) {
  await r2.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key, Body: body, ContentType: 'audio/mpeg',
    CacheControl: 'public, max-age=2592000', // 30 j
  }));
}

export async function r2SignedUrl(key: string, expiresIn = 3600) {
  return getSignedUrl(r2, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn });
}
```

---

## 4. `lib/voice/hash.ts` — clé de cache stable

```ts
import { createHash } from 'crypto';
export function sha256(input: string) {
  return createHash('sha256').update(input, 'utf8').digest('hex');
}
export function cacheKey(text: string, lang: string, voiceId: string) {
  // Normalisation : trim + collapse whitespace → cache stable
  const norm = text.replace(/\s+/g, ' ').trim();
  return sha256(`${voiceId}|${lang}|${norm}`);
}
```

---

## 5. `app/api/voice/cached/[hash]/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';
import { keyFor, r2Exists, r2SignedUrl } from '@/lib/voice/r2';
import { VOICE_BRUNO } from '@/lib/voice/elevenlabs';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: { hash: string } }) {
  const lang = _req.nextUrl.searchParams.get('lang') ?? 'fr';
  const key = keyFor(VOICE_BRUNO, lang, params.hash);
  const hit = await r2Exists(key);
  if (!hit) return NextResponse.json({ cache: 'miss' }, { status: 404 });
  const url = await r2SignedUrl(key, 3600);
  return NextResponse.redirect(url, { status: 302 });
}

export async function HEAD(req: NextRequest, ctx: { params: { hash: string } }) {
  const lang = req.nextUrl.searchParams.get('lang') ?? 'fr';
  const key = keyFor(VOICE_BRUNO, lang, ctx.params.hash);
  const ok = await r2Exists(key);
  return new NextResponse(null, { status: ok ? 200 : 404 });
}
```

---

## 6. `app/api/voice/synthesize/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { synthesizeBlocking, VOICE_BRUNO } from '@/lib/voice/elevenlabs';
import { cacheKey } from '@/lib/voice/hash';
import { keyFor, r2Put, r2SignedUrl } from '@/lib/voice/r2';
import { checkRateLimit } from '@/lib/voice/rate-limit';
import { getUserId } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 30;

const Body = z.object({
  text: z.string().min(1).max(2000),
  lang: z.string().min(2).max(5).default('fr'),
});

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);

  // 1) rate-limit
  const rl = await checkRateLimit(userId);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retry_after: rl.retryAfter },
      { status: 429 },
    );
  }

  // 2) validation
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const { text, lang } = parsed.data;

  // 3) cache check (au cas où entretemps)
  const hash = cacheKey(text, lang, VOICE_BRUNO);
  const key = keyFor(VOICE_BRUNO, lang, hash);

  // 4) synth + cache
  try {
    const audio = await synthesizeBlocking(text, lang);
    await r2Put(key, audio);
    const url = await r2SignedUrl(key, 3600);

    return new NextResponse(audio, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audio.byteLength),
        'x-audio-url': url,
        'x-cache': 'MISS',
        'x-voice-hash': hash,
      },
    });
  } catch (e: any) {
    console.error('[voice/synthesize] error', e);
    return NextResponse.json({ error: 'voice_unavailable' }, { status: 502 });
  }
}
```

---

## 7. `lib/voice/rate-limit.ts` — quota / utilisateur

```ts
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

const FREE_DAILY = 100;          // 100 requêtes/jour gratuites
const PAID_DAILY = 100_000;      // illimité de fait pour les abonnés payants

export async function checkRateLimit(userId: string | null) {
  if (!userId) return { allowed: true, retryAfter: 0 }; // visiteur anonyme = pas de cache cost

  const today = new Date().toISOString().slice(0, 10);
  const { data: u } = await sb.from('users').select('subscription_tier').eq('id', userId).single();
  const limit = u?.subscription_tier && u.subscription_tier !== 'free' ? PAID_DAILY : FREE_DAILY;

  const { count } = await sb.from('voice_usage')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', `${today}T00:00:00Z`);

  return {
    allowed: (count ?? 0) < limit,
    retryAfter: 86400, // sec
  };
}
```

---

## 8. `app/api/voice/analytics/route.ts` (beacon)

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUserId } from '@/lib/auth';

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });
  await sb.from('voice_usage').insert({
    user_id: userId,
    app: body.app, lang: body.lang, text_hash: body.text_hash,
    cache_hit: !!body.cache_hit, latency_ms: body.latency_ms ?? null,
    cost_credits: body.cost_credits ?? null,
  });
  return NextResponse.json({ ok: true });
}
```

---

## 9. `app/api/voice/preferences/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUserId } from '@/lib/auth';

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

export async function GET(req: NextRequest) {
  const uid = await getUserId(req);
  const { data } = await sb.from('voice_preferences').select('*').eq('user_id', uid).maybeSingle();
  return NextResponse.json(data ?? { auto_play: false, rate: 1.0, lang: 'fr' });
}

export async function PUT(req: NextRequest) {
  const uid = await getUserId(req);
  const body = await req.json();
  await sb.from('voice_preferences').upsert({
    user_id: uid,
    auto_play: !!body.auto_play,
    rate: Number(body.rate ?? 1.0),
    lang: String(body.lang ?? 'fr'),
    updated_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
```

---

## 10. Stratégie cache & TTL

| Niveau | Stockage | TTL | Invalidation |
|--------|----------|-----|--------------|
| L1 (navigateur) | `Audio()` URL signée | 1 h (signature) | rechargement |
| L2 (CDN front R2) | Cloudflare cache | 7 jours | purge auto |
| L3 (R2 bucket) | objet `audio/mpeg` | 30 jours | lifecycle rule |
| L4 (re-synth) | ElevenLabs API | n/a | toujours possible (coût) |

---

## 11. Fallback & gestion d'erreur

- **ElevenLabs down (5xx)** → l'API renvoie 502 ; le composant affiche le texte + message "voix momentanément indisponible".
- **Quota dépassé (429)** → composant affiche CTA "Passer NEXT GEN INVEST pour la voix illimitée".
- **Lang non supportée** → fallback `en` + tag dans analytics pour suivi.

---

## 12. `.env.example` (à committer, valeurs vides)

```env
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID_BRUNO=
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=navlys-voice-cache
R2_PUBLIC_HOST=https://voice.navlys.com
SUPABASE_URL=
SUPABASE_SERVICE_ROLE=
```
