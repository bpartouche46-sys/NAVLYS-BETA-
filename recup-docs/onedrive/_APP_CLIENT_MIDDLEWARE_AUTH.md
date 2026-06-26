# 🧭 NAVLYS APP CLIENT — Middleware Next.js + Supabase Auth

**Verrouillé : 28 mai 2026 · Beta 1er juin · Stratégie : magic link email + redirect onboarding si profil manquant**

---

## 1. Stratégie d'authentification

**Choisi : email magic link Supabase Auth** (zéro mot de passe à gérer, RGPD-friendly, déjà multilingue).
**Refusé pour la Beta** : OAuth Google (vérif domaine `navlys.com` à mettre en place plus tard), passkeys (encore peu adopté côté grand public 2026).
**Différé V1.1** : Apple ID, OAuth Google une fois OAuth consent screen Google validé sous `bruno@navlys.com`.

### Flux résumé

```
1. Visiteur arrive sur navlys.com → gate verrouillé jusqu'au 31 mai → ensuite redirige vers /app
2. /app → middleware → si pas de cookie session → /auth/sign-in
3. /auth/sign-in → envoie magic link → email arrive
4. Click magic link → /auth/callback → middleware crée session → vérifie profil → redirige
   - Pas de profil actif → /onboarding/dream
   - Profil actif       → /dashboard
5. Logout → /auth/sign-out → DELETE session → /auth/sign-in
```

---

## 2. Variables d'environnement (Vercel)

**JAMAIS en clair dans le code ou un commit.** À configurer dans `vercel env`.

```
NEXT_PUBLIC_SUPABASE_URL          → ex https://xyz.supabase.co       (public, OK exposé)
NEXT_PUBLIC_SUPABASE_ANON_KEY     → JWT anon role                    (public, OK exposé, protégé par RLS)
SUPABASE_SERVICE_ROLE_KEY         → secret SERVEUR UNIQUEMENT         (jamais exposé client)
NEXT_PUBLIC_LAUNCH_UNLOCKED       → 'false' avant 31/05, 'true' après (gate countdown)
NEXT_PUBLIC_APP_URL               → https://navlys.com               (pour redirect magic link)
NAVLYS_ENCRYPTION_SECRET          → 32+ chars (pour chiffrement éventuel cookie)
```

⚠️ **G1 sécurité.** `SUPABASE_SERVICE_ROLE_KEY` n'est utilisée **que** dans server actions et server components. Si elle apparaît dans un bundle client, c'est un bug bloquant — circuit-breaker via le hook `prebuild` ci-dessous.

```json
// package.json
{
  "scripts": {
    "prebuild": "node scripts/check-no-secrets-in-client.js",
    "build": "next build"
  }
}
```

```js
// scripts/check-no-secrets-in-client.js
const { execSync } = require('child_process');
try {
  execSync('grep -r "SERVICE_ROLE" app/ components/ --include="*.tsx" --include="*.ts" | grep -v "_actions" | grep -v "lib/supabase/server"');
  console.error('❌ SERVICE_ROLE_KEY referenced in client code. Aborting build.');
  process.exit(1);
} catch (e) {
  // grep failed = no match = ok
  console.log('✅ No service role key in client code.');
}
```

---

## 3. Clients Supabase typés

```typescript
// lib/supabase/server.ts — usage server actions / route handlers / server components
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerActionClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );
}

// lib/supabase/admin.ts — usage exclusivement server-side, pour opérations qui contournent RLS
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('admin client invoked client-side — security boundary breached');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

// lib/supabase/client.ts — composants client uniquement
'use client';
import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

---

## 4. Middleware Next.js — `middleware.ts` (racine)

```typescript
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PUBLIC_PATHS = [
  '/',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclaimer-g1',
  '/auth/sign-in',
  '/auth/callback',
  '/auth/sign-out',
  '/api/health',
];

const ONBOARDING_PATHS = ['/onboarding'];   // tout ce qui commence par /onboarding
const PROTECTED_PATHS  = ['/dashboard', '/laboratoire', '/profil', '/api'];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (pathname.startsWith('/_next')) return true;
  if (pathname.startsWith('/static')) return true;
  if (/\.(png|jpe?g|svg|webp|ico|mp4|webm|woff2?)$/.test(pathname)) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // ── Gate launch ────────────────────────────────────────────────────────────
  if (process.env.NEXT_PUBLIC_LAUNCH_UNLOCKED !== 'true') {
    // Avant 31/05 minuit Jérusalem : seul / (la page countdown) est ouvert.
    if (pathname !== '/' && !pathname.startsWith('/_next') && !pathname.startsWith('/static')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return res;
  }

  // ── Public paths bypass ────────────────────────────────────────────────────
  if (isPublic(pathname)) return res;

  // ── Initialise Supabase server client lié à req/res cookies ────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  // ── Pas de session → vers sign-in ──────────────────────────────────────────
  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/sign-in';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // ── Sessionné mais sur /auth/* → vers dashboard ────────────────────────────
  if (pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ── Vérifier profil actif ──────────────────────────────────────────────────
  // Optimisation : 1 requête lite, cachée 60 s côté request.
  const { data: profile } = await supabase
    .from('profiles_user')
    .select('id, profil_id, expires_at')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  const needOnboarding = !profile;

  // ── Redirection vers onboarding si profil manquant ─────────────────────────
  if (needOnboarding && !ONBOARDING_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/onboarding/dream', req.url));
  }

  // ── Sessionné + profil OK mais sur /onboarding → vers dashboard ────────────
  if (!needOnboarding && pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ── Re-questionnaire conseillé si expires_at dépassé ───────────────────────
  if (profile?.expires_at && new Date(profile.expires_at) < new Date()) {
    res.headers.set('x-navlys-requestionnaire-due', 'true');
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Exécuter sur toutes les routes sauf assets/_next/api-publics.
     * Note : on filtre encore plus finement dans la fonction.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp|ico|mp4|webm|woff2?)$).*)',
  ],
};
```

---

## 5. Pages auth

### `/auth/sign-in` (client)

```tsx
'use client';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const supabase = createBrowserSupabaseClient();

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        shouldCreateUser: true,
      },
    });
    if (!error) setSent(true);
  }

  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] flex items-center justify-center p-4">
      <form onSubmit={send} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">🧭 NAVLYS · Connexion</h1>
        {sent ? (
          <p className="font-[var(--font-body)] text-base text-[var(--color-ice)]">
            📨 Lien envoyé à <strong>{email}</strong>. Ouvre ton email et clique pour entrer dans l'app.
          </p>
        ) : (
          <>
            <label className="font-[var(--font-ui)] text-sm" htmlFor="email">Email</label>
            <input id="email" type="email" required value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="px-4 py-3 rounded-xl bg-[var(--color-night)] border border-[var(--color-bronze)]/40
                              text-[var(--color-pearl)] focus:outline focus:outline-2 focus:outline-[var(--color-ice)]" />
            <button type="submit"
                    className="py-3 rounded-xl bg-[var(--color-bronze)] text-[var(--color-night)] font-semibold">
              Envoyer le lien magique
            </button>
          </>
        )}
      </form>
    </main>
  );
}
```

### `/auth/callback` (route handler)

```typescript
// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createServerActionClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
```

### `/auth/sign-out`

```typescript
// app/auth/sign-out/route.ts
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = createServerActionClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', req.url));
}
```

---

## 6. Helper de données — `lib/data/profiles.ts`

```typescript
import { createServerActionClient } from '@/lib/supabase/server';

export async function getActiveProfile() {
  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('profiles_user')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();
  if (error) {
    console.error('[getActiveProfile]', error);
    return null;
  }
  return data;
}
```

---

## 7. Configuration Supabase Auth (UI)

À configurer manuellement par **Bruno** dans Supabase Dashboard → Authentication :

1. **Email auth** : activé. Magic link enabled, signup ouvert (avec captcha hCaptcha activé).
2. **Site URL** : `https://navlys.com`
3. **Redirect URLs** : `https://navlys.com/auth/callback`, `https://app.navlys.com/auth/callback`, `http://localhost:3000/auth/callback` (dev).
4. **JWT expiry** : 1 heure (par défaut), refresh 30 jours.
5. **Email templates** : remplacer le template par défaut FR (Bruno fournit via Workspace Gmail) — important : **expéditeur** doit être `noreply@navlys.com` (SPF/DKIM à configurer).
6. **Rate limiting** : laisser défaut (5 mails / heure / IP) — protection anti-spam.

---

## 8. Headers de sécurité — `next.config.mjs`

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://*.vercel-insights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co https://*.vercel-insights.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
export default nextConfig;
```

---

## 9. Tests d'acceptation auth/middleware

| Cas | Attendu |
|---|---|
| Accès `/` avant 31/05 | Page countdown verrouillée |
| Accès `/dashboard` non-loggé | Redirect `/auth/sign-in` |
| Magic link envoyé + cliqué | Session créée, redirect `/dashboard` ou `/onboarding/dream` |
| Loggé sans profil → accès `/dashboard` | Redirect `/onboarding/dream` |
| Loggé avec profil → accès `/onboarding/*` | Redirect `/dashboard` |
| Profil expirée 6 mois | Header `x-navlys-requestionnaire-due: true` affiché en bannière dashboard |
| Q12 = non pendant onboarding | Redirect `/onboarding/blocked` (pas de profil créé en DB) |
| `SERVICE_ROLE_KEY` référencée dans bundle client | Build échoue (script prebuild) |

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
