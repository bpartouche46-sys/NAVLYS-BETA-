# 🛡️ 02 — HEADERS HTTP DE PROTECTION (Vercel · Next.js 14)

**Mission Le Veilleur de Coffre · 29 mai 2026 · Cible Mozilla Observatory A+ / SecurityHeaders.com A+**

> Chaque réponse HTTP envoyée par les 4 sites NAVLYS doit porter 9 en-têtes de blindage. Sans ces couches, les tests externes plafonnent à **B**. Avec, on tape **A+** sur tous les scanners.

---

## 🎯 SCORE CIBLE

| Outil | Score visé | URL |
|---|---|---|
| Mozilla Observatory | **A+ (130/100)** | https://observatory.mozilla.org |
| SecurityHeaders.com | **A+** | https://securityheaders.com |
| Hardenize | **95+/100** | https://www.hardenize.com |
| SSL Labs (combiné) | **A+** | https://www.ssllabs.com/ssltest/ |

---

## 1️⃣ Les 9 en-têtes obligatoires

| # | Header | Effet | Niveau |
|---|---|---|---|
| 1 | `Strict-Transport-Security` | Force HTTPS 2 ans + preload | Bloquant |
| 2 | `Content-Security-Policy` | Bloque XSS / injection scripts | Critique |
| 3 | `X-Frame-Options` | Empêche embed iframe (clickjacking) | Bloquant |
| 4 | `X-Content-Type-Options` | Bloque MIME sniffing | Standard |
| 5 | `Referrer-Policy` | Filtre fuite URL referrer | Standard |
| 6 | `Permissions-Policy` | Coupe APIs (camera, mic, géoloc…) | Standard |
| 7 | `Cross-Origin-Opener-Policy` | Isole le contexte fenêtre | Standard |
| 8 | `Cross-Origin-Embedder-Policy` | Bloque ressources non opt-in | Standard |
| 9 | `Cross-Origin-Resource-Policy` | Empêche resource leak vers tiers | Standard |

---

## 2️⃣ Configuration `next.config.mjs` — NAVLYS app

À placer dans `_APP_NAVLYS_v1/next.config.mjs`. Adaptable pour navbiolife, navlys.io, brunopartouche.

```js
/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com https://plausible.io https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://*.supabase.co https://navlys.com https://*.vercel.app",
      "media-src 'self' https://navlys.com https://*.vercel.app",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com https://api.resend.com https://plausible.io wss://*.supabase.co",
      "frame-src 'self' https://js.stripe.com https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "form-action 'self' https://checkout.stripe.com",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
      "report-uri https://navlys.report-uri.com/r/d/csp/enforce",
    ].join('; '),
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=(self)',
      'camera=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=(self "https://checkout.stripe.com")',
      'picture-in-picture=(self)',
      'publickey-credentials-get=(self)',
      'screen-wake-lock=()',
      'sync-xhr=()',
      'usb=()',
      'web-share=(self)',
      'xr-spatial-tracking=()',
    ].join(', '),
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // retire X-Powered-By: Next.js (footprint)
  compress: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Headers très stricts pour /api/*
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        // Headers pour .well-known/* (BIMI, MTA-STS, security.txt)
        source: '/.well-known/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 3️⃣ Configuration `vercel.json` (alternative ou cumulative)

À placer à la racine de chaque projet Vercel :

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Resource-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```

**Règle** : si `next.config.mjs` ET `vercel.json` sont présents → **Next.js l'emporte** sur les routes Next, **Vercel l'emporte** sur les routes statiques. Garder les deux pour ceinture + bretelles.

---

## 4️⃣ HSTS Preload — l'arme nucléaire

Soumettre les 4 domaines au registre Chrome HSTS (présent dans tous les navigateurs majeurs) :

**Prérequis** :
1. Header HSTS posé avec `max-age ≥ 31536000` (1 an), `includeSubDomains`, `preload`
2. Tous les sous-domaines accessibles uniquement en HTTPS
3. Aucun fallback HTTP sur aucun sous-domaine

**Soumission** : https://hstspreload.org → entrer le domaine → vérification automatique → ajout au registre Chrome (puis Firefox, Safari, Edge, Brave).

⚠️ **Irréversible en pratique** (suppression manuelle = plusieurs mois). À ne lancer **qu'après** validation complète de la prod stable.

---

## 5️⃣ Variantes par site

### NAVLYS app (navlys.com)
Configuration ci-dessus complète. Stripe + Supabase whitelistés.

### NAVBIO Life (navbiolife.com)
Mêmes headers MAIS `connect-src` ajoute `https://api.openai.com` (génération biographie IA) et `frame-src` ajoute `https://youtube-nocookie.com` (témoignages vidéo).

### NAVLYS IO (navlys.io)
Site builder IA. CSP plus permissif sur `script-src` interne pour aperçu temps réel. À documenter au cas par cas.

### Bruno Partouche (brunopartouche.com)
Site perso, pas d'API. CSP minimaliste, `default-src 'self'` + fonts Google. Pas de Stripe, pas de Supabase.

---

## 6️⃣ Fichiers compagnons à créer

### `/public/.well-known/security.txt`

```
Contact: mailto:security@navlys.com
Expires: 2027-05-29T23:59:59.000Z
Encryption: https://navlys.com/.well-known/pgp-key.txt
Acknowledgments: https://navlys.com/security/hall-of-fame
Preferred-Languages: fr, en
Canonical: https://navlys.com/.well-known/security.txt
Policy: https://navlys.com/security/policy
Hiring: https://navlys.com/careers
```

### `/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /onboarding/

# Bloque les bots IA non autorisés
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Disallow: /
User-agent: CCBot
Disallow: /

Sitemap: https://navlys.com/sitemap.xml
```

---

## ✅ VALIDATION

```bash
# Test headers depuis ligne de commande
curl -I https://navlys.com

# Doit montrer les 9 headers en haut. Si manquants → bug config.

# Tests externes
open "https://securityheaders.com/?q=navlys.com&followRedirects=on"
open "https://observatory.mozilla.org/analyze/navlys.com"
open "https://internet.nl/site/navlys.com/"
```

**Note CSP** : prévoir 1-2 itérations. Ouvrir DevTools console → erreurs CSP → ajuster `script-src` / `connect-src` / `img-src` au cas par cas. Toujours préférer un domaine spécifique à un wildcard.

---

> *« Les en-têtes sont les remparts du château. Sans eux, la porte est belle mais le mur tombe. »*
> — Le Veilleur de Coffre
