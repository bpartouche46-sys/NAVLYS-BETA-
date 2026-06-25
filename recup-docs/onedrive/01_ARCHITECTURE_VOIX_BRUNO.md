# 01 — Architecture technique voix Bruno (ElevenLabs Multilingual v2)

**Verrouillé le 29 mai 2026 · Bruno Mark Partouche · Laboratoire NEXT GEN NAVLYS**

---

## 1. Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────────┐
│                          UTILISATEUR (browser)                       │
│   NAV IA répond → <VoiceBrunoPlayer text="..." lang="fr" />          │
│                       🔊 "Écouter avec la voix de Bruno"             │
└──────────────────────────────┬───────────────────────────────────────┘
                               │ (1) clic
                               ▼
              ┌────────────────────────────────────┐
              │  hash = sha256(text + lang + vid)  │
              └─────────────────┬──────────────────┘
                                │
            (2a) GET /api/voice/cached/[hash]   (2b) si 404
                                │                        │
                                ▼                        ▼
                   ┌─────────────────────┐   ┌──────────────────────────┐
                   │ Cloudflare R2 cache │   │ POST /api/voice/synthesize│
                   │   (audio/mpeg)      │   │   stream ElevenLabs WS    │
                   └─────────────────────┘   └─────────┬────────────────┘
                                                       │ (3) PUT R2 (TTL 30j)
                                                       ▼
                                            ┌──────────────────────┐
                                            │  ElevenLabs API      │
                                            │  Multilingual v2     │
                                            │  voice_id = Bruno    │
                                            └──────────────────────┘
                                                       │
                               ┌───────────────────────┘
                               ▼
              ┌────────────────────────────────────┐
              │  Analytics (Supabase + PostHog)    │
              │  app · lang · user · cache_hit     │
              │  latency_ms · cost_credits         │
              └────────────────────────────────────┘
```

---

## 2. Frontend — composant React

- **Nom** : `<VoiceBrunoPlayer text="..." lang="fr" trackingApp="navlys" />`
- **Emplacement partagé** : `/components/voice/VoiceBrunoPlayer.tsx` (copié dans chaque app via monorepo ou symlink).
- **États internes** : `idle | loading | playing | paused | error`.
- **UI** :
  - Bouton 🔊 *Écouter avec la voix de Bruno* — fond nuit `#02040a`, label or `#C9A961`, breathing 4 s (désactivé si `prefers-reduced-motion`).
  - Lecture : mini-player avec play/pause, vitesse 0.75x / 1x / 1.25x, bouton ↓ télécharger MP3.
  - Onde sonore animée (canvas) pendant lecture — `prefers-reduced-motion` → barre statique.
  - Drapeau langue active (FR/EN/ES/AR/HE/…).
- **Cache-aware** : calcule `hash` côté client, tente d'abord `GET /api/voice/cached/[hash]` ; sinon ouvre WebSocket vers `/api/voice/stream`.

---

## 3. Backend — API routes Next.js 14 (App Router)

| Route | Méthode | Rôle |
|-------|---------|------|
| `/api/voice/cached/[hash]` | GET | Renvoie 302 vers URL R2 signée (1 h) si cache hit, sinon 404 |
| `/api/voice/synthesize` | POST | Génère audio (one-shot, blocking) puis PUT R2 + retour MP3 |
| `/api/voice/stream` | WS | Streaming chunks (PCM 16k → MP3) pour latence < 400 ms |
| `/api/voice/analytics` | POST | Beacon usage (user, app, lang, latency, cache_hit) |
| `/api/voice/preferences` | GET/PUT | Préférence audio (auto-play, vitesse, langue par défaut) — Supabase |

**Helpers** :
- `lib/voice/elevenlabs.ts` — wrapper SDK officiel `@elevenlabs/elevenlabs-js`.
- `lib/voice/hash.ts` — SHA-256 isomorphe (Web Crypto côté navigateur, `crypto` côté Node).
- `lib/voice/r2.ts` — client S3-compatible (`@aws-sdk/client-s3`) configuré sur endpoint R2.

---

## 4. Cache Cloudflare R2

- **Bucket** : `navlys-voice-cache` (région auto, classe `STANDARD`).
- **Clé** : `voice/{voiceId}/{lang}/{hashSha256}.mp3`.
- **TTL** : 30 jours (purge lifecycle rule). Override via header `Cache-Control` 7 j sur le CDN.
- **Sécurité** : URLs signées 1 h pour la lecture côté client (pas d'accès anonyme bucket).
- **Coût** : R2 ne facture pas l'egress → idéal pour audio répétitif.

---

## 5. Streaming ElevenLabs

- **Endpoint** : `wss://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream-input`
- **Modèle** : `eleven_multilingual_v2` (28 langues, qualité 24 kHz).
- **Settings voix Bruno** (serein/calme/posé) :
  - `stability: 0.55`
  - `similarity_boost: 0.85`
  - `style: 0.3`
  - `use_speaker_boost: true`
- **Chunk size** : 1 phrase max → premier byte audio ~ 250 ms après envoi du texte.

---

## 6. Analytics & monitoring

Stockage Supabase table `voice_usage` :

```sql
create table voice_usage (
  id           bigserial primary key,
  created_at   timestamptz default now(),
  user_id      uuid references auth.users(id),
  app          text not null check (app in ('navlys','navbio','navlys_io','brunopartouche')),
  lang         text not null,
  text_hash    text not null,
  cache_hit    boolean not null,
  latency_ms   int,
  cost_credits int  -- ElevenLabs credits = caractères facturés
);
create index on voice_usage (created_at desc);
create index on voice_usage (user_id);
```

KPIs Grafana / PostHog :
- **cache_hit_rate** (cible > 70 % @ J+7) ;
- **cost_per_active_user €/mois** (cible < 0,05 €) ;
- **latency_p95 ms** (cible < 400 ms) ;
- **voice_activation_rate %** (cible > 35 % users) ;
- **avg_listen_duration s** (cible > 25 s).

---

## 7. Variables d'environnement (Vercel, scope NAVLYS)

```env
ELEVENLABS_API_KEY=sk_live_xxxxxxxxxxxx
ELEVENLABS_VOICE_ID_BRUNO=xxxxxxxxxxxxxxxxxxxx
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxx
R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxx
R2_BUCKET=navlys-voice-cache
R2_PUBLIC_HOST=https://voice.navlys.com  # via worker R2 + custom domain
```

> ⚠️ Aucune clé en clair côté client. Tout passe par les routes serveur. La voice_id elle-même est sensible (deepfake) → jamais exposée au navigateur.
