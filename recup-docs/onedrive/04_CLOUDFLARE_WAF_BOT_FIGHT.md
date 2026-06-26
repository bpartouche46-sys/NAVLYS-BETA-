# 🛡️ 04 — CLOUDFLARE WAF + BOT FIGHT MODE PRO

**Mission Le Veilleur de Coffre · 29 mai 2026 · Niveau forteresse : OWASP Core Rule Set + Bot Fight Pro + Rate Limiting**

> Cloudflare devant chaque domaine NAVLYS. Blocage **automatique** des bots malveillants, des injections SQL/XSS, des scans de vulnérabilités. **80 $/mois** pour les 4 domaines, ROI immédiat.

---

## 💰 BUDGET MENSUEL

| Service | Coût | Domaines |
|---|---|---|
| Cloudflare Pro plan | **20 $/mois** | navlys.com (le seul payant nécessaire) |
| Cloudflare Free | 0 $ | navbiolife.com, navlys.io, brunopartouche.com |
| Bot Fight Mode Standard | 0 $ inclus | Tous (sur Free) |
| Bot Fight Mode Pro | inclus Pro | navlys.com |
| **TOTAL** | **20 $/mois** | (révision si bot agressif sur autres) |

**Optionnel niveau Bunker++** : passer les 4 domaines en Pro = 80 $/mois total.

---

## 1️⃣ Settings de base Cloudflare (chaque domaine)

### SSL/TLS → onglet Overview

- Mode : **Full (Strict)** ← OBLIGATOIRE. Pas Flexible (Flexible = HTTP backend = faille man-in-the-middle).

### SSL/TLS → Edge Certificates

- **Always Use HTTPS** : ON
- **HTTP Strict Transport Security (HSTS)** : Enable
  - Max Age : 6 months → 12 months → 24 months (escalade progressive)
  - Include subdomains : YES
  - Preload : YES (après stabilité)
- **Minimum TLS Version** : **TLS 1.2** (puis 1.3 quand on supprime le legacy)
- **TLS 1.3** : ON
- **Opportunistic Encryption** : ON
- **Automatic HTTPS Rewrites** : ON
- **Certificate Transparency Monitoring** : ON
- **Authenticated Origin Pulls** : ON (pour les Pro plans)

### Network

- **HTTP/2** : ON
- **HTTP/3 (with QUIC)** : ON
- **0-RTT Connection Resumption** : ON
- **IPv6 Compatibility** : ON
- **WebSockets** : ON (Supabase realtime)
- **Onion Routing** : ON (pour les utilisateurs Tor)

### Security → Settings

- **Security Level** : **High**
- **Challenge Passage** : 30 minutes
- **Browser Integrity Check** : ON
- **Privacy Pass Support** : ON

---

## 2️⃣ Bot Fight Mode

### Free plan : Bot Fight Mode Standard

Security → Bots → **Bot Fight Mode** : ON.
Bloque automatiquement les bots agressifs identifiés par Cloudflare. Gratuit, suffisant pour Beta.

### Pro plan : Super Bot Fight Mode

Pour `navlys.com` (le revenue-critical) :
- Security → Bots → **Super Bot Fight Mode**
- **Definitely automated** : **Block**
- **Likely automated** : **Managed Challenge** (Cloudflare décide)
- **Verified bots** : **Allow** (Googlebot, Bingbot etc.)
- **Static resources** : Allow (CSS, JS, fonts)
- **JavaScript Detections** : ON

---

## 3️⃣ Web Application Firewall (WAF)

### Managed Rules — activer les 3 rulesets

Security → WAF → Managed rules

| Ruleset | Mode | Sensitivity |
|---|---|---|
| **Cloudflare Managed Ruleset** | Block | High |
| **Cloudflare OWASP Core Ruleset** | Block | Paranoia Level 3 |
| **Cloudflare Exposed Credentials Check** | Managed Challenge | Default |

⚠️ Le Paranoia Level 3 OWASP peut faire des faux positifs. Démarrer en **Log only**, monitorer 48h, ajuster, puis passer en **Block**.

### Custom Rules NAVLYS (pour navlys.com)

#### Règle 1 — Bloquer pays interdits (sanctions)

```
(ip.geoip.country in {"KP" "IR" "SY" "CU"})
→ Action: Block
```

#### Règle 2 — Protéger /admin

```
(http.request.uri.path contains "/admin")
and (not ip.src in {"<IP_BRUNO_1>" "<IP_BRUNO_2>"})
→ Action: Block
```

Bruno fournira ses 2 IPs (fixe maison + 4G mobile) → on les insère ici.

#### Règle 3 — Bloquer User-Agents vides ou suspects

```
(http.user_agent eq "")
or (http.user_agent contains "sqlmap")
or (http.user_agent contains "nikto")
or (http.user_agent contains "ZmEu")
or (http.user_agent contains "Nessus")
→ Action: Block
```

#### Règle 4 — Challenge sur /auth/* si signaux suspects

```
(http.request.uri.path contains "/auth")
and (cf.threat_score gt 14)
→ Action: Managed Challenge
```

#### Règle 5 — Protéger les fichiers sensibles

```
(http.request.uri.path contains ".env")
or (http.request.uri.path contains ".git")
or (http.request.uri.path contains ".sql")
or (http.request.uri.path contains "wp-admin")
or (http.request.uri.path contains "phpmyadmin")
→ Action: Block
```

---

## 4️⃣ Rate Limiting

Security → WAF → Rate limiting rules

### Règle A — API endpoints

```
Match : (http.request.uri.path contains "/api/")
Threshold : 100 requests per 1 minute par IP
Action : Block 10 minutes
```

### Règle B — Auth endpoints (anti brute-force)

```
Match : (http.request.uri.path contains "/auth/sign-in")
Threshold : 10 requests per 5 minutes par IP
Action : Managed Challenge
```

### Règle C — Recherche / search

```
Match : (http.request.uri.path contains "/api/search")
Threshold : 30 requests per 1 minute par IP
Action : Rate limit (HTTP 429)
```

---

## 5️⃣ Page Rules (Free plan : 3 incluses, Pro : 20)

### Règle 1 — Cache statique agressif

```
URL : navlys.com/_next/static/*
Settings : Cache Level: Cache Everything ; Edge Cache TTL: 1 month
```

### Règle 2 — No cache pour /api

```
URL : navlys.com/api/*
Settings : Cache Level: Bypass ; Disable Performance
```

### Règle 3 — Forcer HTTPS sur tout

```
URL : http://*navlys.com/*
Settings : Always Use HTTPS
```

---

## 6️⃣ Cloudflare Turnstile (CAPTCHA)

Remplacement gratuit de reCAPTCHA, plus rapide, RGPD-friendly.

### Setup

1. https://dash.cloudflare.com → Turnstile → Add site
2. Site name : `navlys.com auth`
3. Domain : `navlys.com`
4. Widget mode : **Managed** (Cloudflare décide invisible vs challenge)
5. Copier la **Site Key** et la **Secret Key** (env vars Vercel : `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`)

### Intégration Next.js (formulaire auth)

```tsx
import { Turnstile } from '@marsidev/react-turnstile';

<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
  onSuccess={(token) => setCfToken(token)}
  options={{ theme: 'dark', language: 'fr' }}
/>
```

Vérification serveur (`/app/api/auth/verify/route.ts`) :

```ts
const formData = new FormData();
formData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
formData.append('response', token);
formData.append('remoteip', clientIP);

const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST', body: formData,
});
const data = await r.json();
if (!data.success) return new Response('Forbidden', { status: 403 });
```

---

## 7️⃣ Cloudflare Tunnel (Zero Trust) pour /admin

Au lieu d'exposer `/admin` sur internet public, le mettre derrière un **Cloudflare Tunnel** accessible uniquement par auth Cloudflare Access.

**Bénéfices** :
- Aucun port ouvert côté origine
- Authentification Cloudflare Access (Google, GitHub, email magic link)
- MFA obligatoire (TOTP)
- Audit log de chaque accès

**Coût** : Cloudflare Zero Trust Free = jusqu'à 50 users gratuits.

**Setup** : différé V2 (post-lancement). À planifier avec Le Veilleur + Le Maître d'Œuvre.

---

## ✅ VALIDATION

```bash
# 1. Vérifier SSL Full Strict actif
curl -I https://navlys.com  # cert doit être Cloudflare, pas Vercel direct

# 2. Vérifier headers de sécurité Cloudflare
curl -I https://navlys.com | grep -i cf-

# 3. Tester WAF (volontairement avec une signature SQL injection)
curl "https://navlys.com/?id=1' OR '1'='1"
# Doit retourner HTTP 403 ou un challenge

# 4. Tester rate limiting sur API
for i in {1..120}; do curl -s -o /dev/null -w "%{http_code}\n" https://navlys.com/api/test; done
# Après 100 requêtes en 1 min → 429 Too Many Requests
```

Interface Cloudflare → **Security → Events** : monitorer les 24h après mise en prod. Ajuster les règles selon faux positifs.

---

## 📊 RÉCAP COÛTS & EFFETS

| Action | Coût/mois | Effet sécurité |
|---|---|---|
| Cloudflare Free × 4 | 0 € | DDoS L3/L4, WAF basique, SSL |
| Cloudflare Pro navlys.com | 20 € | WAF avancé, Bot Fight Pro, 20 Page Rules |
| Turnstile CAPTCHA | 0 € | Anti-bot formulaires |
| Cloudflare Access (Zero Trust) | 0 € (50 users) | MFA /admin sans ouvrir port |
| **TOTAL bunker base** | **20 €/mois** | |
| **TOTAL bunker++** (4× Pro) | **80 €/mois** | |

---

> *« Cloudflare est le mur d'enceinte. Le WAF, les archers. Bot Fight, les chiens de garde. On laisse passer les amis, on bloque les autres. »*
> — Le Veilleur de Coffre
