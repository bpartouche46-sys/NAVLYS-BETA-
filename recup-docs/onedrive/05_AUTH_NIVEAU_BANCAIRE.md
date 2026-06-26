# 🏦 05 — AUTH NIVEAU BANCAIRE (Supabase + WebAuthn + MFA)

**Mission Le Veilleur de Coffre · 29 mai 2026 · Objectif : auth aussi solide que BNP Paribas / Revolut / Apple ID**

> Combiné : magic link email (V1 Beta), OAuth 2.0 PKCE pour 7 providers (V1.1), **Passkeys WebAuthn** (V2 — biométrie Touch ID / Face ID / Windows Hello), TOTP MFA optionnel, Argon2id si mot de passe.

---

## 🎯 ARCHITECTURE EN COUCHES

```
┌──────────────────────────────────────────────────────────┐
│  COUCHE 5 — IP whitelisting /admin                       │  ← Cloudflare Access
├──────────────────────────────────────────────────────────┤
│  COUCHE 4 — MFA TOTP / WebAuthn                          │  ← optional V1.1, default V2
├──────────────────────────────────────────────────────────┤
│  COUCHE 3 — Session : rotation auto, JWT + cookie         │  ← Supabase + middleware Next
├──────────────────────────────────────────────────────────┤
│  COUCHE 2 — Identification : magic link / OAuth PKCE      │  ← Supabase Auth
├──────────────────────────────────────────────────────────┤
│  COUCHE 1 — Anti-bot : Turnstile + rate limiting          │  ← Cloudflare
└──────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Magic Link Email (V1 Beta — déjà décidé)

**État** : implémenté dans `_APP_NAVLYS_v1/middleware.ts` et `_APP_NAVLYS_v1/app/auth/`.

### Configuration Supabase Auth

Dashboard Supabase → Authentication → Configuration :

| Setting | Valeur bunker |
|---|---|
| Site URL | `https://navlys.com` |
| Redirect URLs (allowlist) | `https://navlys.com/auth/callback`, `https://navlys.com/onboarding/*`, `https://navlys.com/dashboard` |
| JWT expiry | 3600 (1h) |
| Refresh token expiry | 604800 (7 jours) |
| Refresh token rotation | **ON** |
| Reuse interval | 10 secondes |
| Inactivity timeout | 86400 (24h sans usage = invalidation) |
| Enable email confirmations | ON |
| Enable email change confirmations | ON (double opt-in) |
| Secure email change | ON |
| Email OTP expiration | 900 (15 min) — pas 24h ! |
| Email OTP length | 6 chiffres |
| Email rate limit | 3 emails / heure / address |

### Email template (anti-phishing)

```html
<p>Bonjour,</p>
<p>Voici ton lien pour entrer dans NAVLYS :</p>
<p><a href="{{ .ConfirmationURL }}">Entrer dans NAVLYS</a></p>
<p>Ce lien expire dans 15 minutes et ne peut servir qu'une fois.</p>
<p>Si tu n'as pas demandé ce lien, ignore ce message ou contacte security@navlys.com.</p>
<hr>
<p style="font-size:11px;color:#666">
NAVLYS ne demande jamais ton mot de passe par email.
Aucun broker ou agent NAVLYS ne te demandera jamais ce lien.
Empreinte cette adresse : security@navlys.com — c'est notre seule adresse de sécurité.
</p>
```

---

## 2️⃣ OAuth 2.0 PKCE — 7 providers (V1.1)

PKCE = Proof Key for Code Exchange = empêche le vol du code OAuth en transit.

### Providers à configurer dans Supabase

| Provider | Console dev | Scope minimal |
|---|---|---|
| **Google** | https://console.cloud.google.com → OAuth consent screen | `openid email profile` |
| **Apple** | https://developer.apple.com → Sign in with Apple | `name email` |
| **Facebook** | https://developers.facebook.com → My Apps | `email public_profile` |
| **X (Twitter)** | https://developer.twitter.com | `users.read tweet.read offline.access` |
| **LinkedIn** | https://www.linkedin.com/developers | `r_emailaddress r_liteprofile openid` |
| **Microsoft** | https://entra.microsoft.com → App registrations | `User.Read openid email profile` |
| **GitHub** | https://github.com/settings/developers | `read:user user:email` |

### Configuration Supabase pour chaque provider

Dashboard Supabase → Authentication → Providers :
- Activer le provider
- Coller Client ID + Client Secret
- Callback URL : `https://<projet>.supabase.co/auth/v1/callback`
- **PKCE Flow** : ON (par défaut sur SDK v2)

### Code Next.js client (PKCE auto-géré par Supabase JS v2)

```tsx
'use client';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
      scopes: 'openid email profile',
    },
  });
}
```

---

## 3️⃣ Passkeys WebAuthn (V2 — biométrie native)

Touch ID, Face ID, Windows Hello, YubiKey. Aucun mot de passe à mémoriser, résistant au phishing.

### Activation Supabase

Dashboard → Authentication → Multi-Factor → **WebAuthn** : Enable.

### Code Next.js — enregistrer un passkey

```tsx
async function enrollPasskey() {
  // 1. Demander un challenge au serveur
  const { data } = await supabase.auth.mfa.enroll({
    factorType: 'webauthn',
    friendlyName: navigator.userAgent.match(/iPhone|iPad/) ? 'iPhone' :
                  navigator.userAgent.match(/Mac/) ? 'Mac' :
                  navigator.userAgent.match(/Windows/) ? 'PC Windows' : 'Appareil',
  });

  // 2. Demander au navigateur de créer le credential (biométrie native)
  const credential = await navigator.credentials.create({
    publicKey: data!.totp!.challenge as PublicKeyCredentialCreationOptions,
  });

  // 3. Renvoyer la preuve à Supabase
  await supabase.auth.mfa.verify({
    factorId: data!.id,
    challengeId: data!.totp!.id,
    code: btoa(JSON.stringify(credential)),
  });
}
```

### Code — utiliser un passkey à la connexion

```tsx
async function signInWithPasskey() {
  const { data: challenge } = await supabase.auth.mfa.challenge({ factorId: 'webauthn' });
  const credential = await navigator.credentials.get({
    publicKey: challenge!.challenge as PublicKeyCredentialRequestOptions,
  });
  await supabase.auth.mfa.verify({
    factorId: 'webauthn',
    challengeId: challenge!.id,
    code: btoa(JSON.stringify(credential)),
  });
}
```

UX : bouton « Entrer avec Face ID » (auto-détection plateforme).

---

## 4️⃣ TOTP MFA (Google Authenticator, 1Password, Authy)

Pour utilisateurs qui ne veulent pas de passkey (ou n'ont pas de biométrie).

### Activation côté user

```tsx
async function enrollTOTP() {
  const { data } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'Authenticator',
  });
  // data.totp.qr_code → afficher dans UI (image base64 SVG)
  // data.totp.secret  → permettre copy-paste si l'utilisateur préfère
}

async function verifyTOTP(factorId: string, code: string) {
  const { data: challenge } = await supabase.auth.mfa.challenge({ factorId });
  await supabase.auth.mfa.verify({ factorId, challengeId: challenge!.id, code });
}
```

### Politique MFA

- **Beta** : MFA recommandé, pas obligatoire (UX friendly)
- **V1.1** : MFA obligatoire pour comptes Pro (NAVLYS NEXT GEN INVEST 49 €/mois)
- **V2** : MFA obligatoire pour tous les comptes

---

## 5️⃣ CSRF Protection (HMAC tokens)

Pour les routes API non-GET (POST/PUT/DELETE).

### Génération token

```ts
// app/lib/csrf.ts
import { createHmac, randomBytes } from 'crypto';

const SECRET = process.env.CSRF_SECRET!; // 32+ chars random

export function generateCsrfToken(sessionId: string): string {
  const nonce = randomBytes(16).toString('hex');
  const data = `${sessionId}.${nonce}.${Date.now()}`;
  const sig = createHmac('sha256', SECRET).update(data).digest('hex');
  return `${data}.${sig}`;
}

export function verifyCsrfToken(token: string, sessionId: string): boolean {
  const [sid, nonce, ts, sig] = token.split('.');
  if (sid !== sessionId) return false;
  if (Date.now() - parseInt(ts) > 3600_000) return false; // 1h expiry
  const expectedSig = createHmac('sha256', SECRET).update(`${sid}.${nonce}.${ts}`).digest('hex');
  return sig === expectedSig;
}
```

### Usage dans Server Actions

```ts
'use server';
import { verifyCsrfToken } from '@/lib/csrf';
import { cookies } from 'next/headers';

export async function updateProfile(formData: FormData) {
  const token = formData.get('_csrf') as string;
  const sessionId = cookies().get('sb-session')?.value;
  if (!verifyCsrfToken(token, sessionId!)) throw new Error('CSRF mismatch');
  // ... suite
}
```

---

## 6️⃣ Argon2id pour hashs mots de passe (si jamais)

Si on autorise le mot de passe (V2), utiliser **Argon2id** (pas bcrypt, pas scrypt, pas PBKDF2).

```ts
import { hash, verify } from '@node-rs/argon2';

const hashed = await hash(password, {
  memoryCost: 19456, // 19 MiB (OWASP 2026 recommendation)
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
});

const ok = await verify(hashed, password);
```

Supabase Auth utilise bcrypt par défaut → demander à Supabase support l'upgrade Argon2id (roadmap 2026).

---

## 7️⃣ Lockout brute-force

Politique :
- **5 échecs successifs** → lockout 30 min
- **10 échecs sur 24h** → lockout 24h
- **20 échecs sur 7 jours** → lockout permanent + alerte security@navlys.com

### Implémentation Supabase + Redis (Upstash gratuit)

```ts
// app/api/auth/sign-in/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '30 m'),
  analytics: true,
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await limiter.limit(`auth:${ip}`);
  if (!success) return new Response('Too many attempts', { status: 429 });
  // ... suite auth
}
```

---

## 8️⃣ IP whitelisting /admin

Routes `/admin/*` accessibles uniquement depuis IPs Bruno.

### Middleware Next.js

```ts
// middleware.ts (extrait)
const ADMIN_IPS = (process.env.ADMIN_IP_WHITELIST ?? '').split(',');

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for') ?? '';
    if (!ADMIN_IPS.some(allowed => ip.startsWith(allowed))) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  // ... suite middleware Supabase
}
```

ENV Vercel : `ADMIN_IP_WHITELIST=185.x.x.x,212.x.x.x` (Bruno fournit ses IPs).

**Doublon Cloudflare Access (fichier 04)** = ceinture + bretelles + parachute.

---

## 9️⃣ Session rotation automatique

Supabase fait la rotation toutes les 1h (JWT) avec refresh token 7 jours **rotatif**. Si un refresh token est utilisé 2 fois → **toute la session est invalidée** (détection de vol).

### Vérification dans middleware

```ts
// Le SDK Supabase SSR le fait automatiquement
const { data: { session } } = await supabase.auth.getSession();
if (!session) return NextResponse.redirect(new URL('/auth/sign-in', request.url));
```

---

## 🔟 Cookie sécurité

Cookies Supabase doivent porter ces flags (le SDK SSR le fait par défaut, vérifier en prod) :

```
HttpOnly      ← pas accessible en JS (anti-XSS)
Secure        ← HTTPS uniquement
SameSite=Lax  ← anti-CSRF (Strict casse les magic links)
Path=/
Domain=.navlys.com (pour sous-domaines app, dashboard)
```

---

## ✅ VALIDATION

```bash
# Test session
curl -i https://navlys.com/api/auth/me
# → 401 sans cookie, 200 avec

# Test rate limit auth
for i in {1..10}; do
  curl -X POST -d '{"email":"test@test.com"}' https://navlys.com/api/auth/sign-in
done
# → 429 après 5

# Test admin IP whitelist
curl -i https://navlys.com/admin/cap  # depuis IP non whitelistée
# → 403 Forbidden
```

---

## 📊 ROADMAP IMPLEMENTATION

| Version | Date | Couches actives |
|---|---|---|
| V1 Beta | 2026-06-01 | Magic link + middleware + Turnstile + CSRF + lockout |
| V1.1 | 2026-07-15 | + OAuth 7 providers + TOTP MFA optionnel |
| V2 | 2026-09-01 | + Passkeys WebAuthn + MFA obligatoire Pro |
| V2.1 | 2026-12-01 | + Cloudflare Access /admin + IP whitelist V2 |

---

> *« On ne demande pas le mot de passe au client. On lui demande qui il est, vraiment. Visage, empreinte, ou bateau familier. »*
> — Le Veilleur de Coffre
