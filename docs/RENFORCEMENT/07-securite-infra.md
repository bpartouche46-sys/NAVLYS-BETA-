# 🔐 RENFORCEMENT — 07. SÉCURITÉ & INFRA

> Consolidé 2026-06-25 (`recup-docs/onedrive/`). Rien de public déclenché. Décisions = Bruno.
> 🔐 Aucun secret/IP/clé recopié ici (règle gravée 7).

---

## 📍 ÉTAT ACTUEL

### Stack & hébergement (réel)
- **Vercel** (front Next.js), **Supabase EU** (DB/Auth), **Cloudflare** (WAF, Bot Fight, R2 cache voix),
  **Resend** (emails), **Sentry/PostHog** (monitoring). DNS **Namecheap**. **MX Google à PRÉSERVER**.
- ⚠️ **« Core Hetzner » absent des docs récents** → semble legacy. Diagnostic 2026-06-22 : serveur sain
  mais **0 conteneur Docker actif**, pas de HTTPS (443). **À confirmer Bruno** (cf. CLAUDE.md §1).

### Headers HTTP (cible A+)
9 headers prévus : HSTS (preload), CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff,
Referrer-Policy, Permissions-Policy, COOP, COEP, CORP. + `/.well-known/security.txt`.

### DNS / certificats
DNSSEC, **CAA** (Let's Encrypt / pki.goog / digicert ; wildcard interdit), DMARC `p=reject`, rotation DKIM.
Certificate Transparency monitoring.

### Cloudflare WAF
Bot Fight, règles managées + OWASP CRS, custom rules (blocage pays sanctionnés, protection `/admin`,
blocage fichiers sensibles `.env`/`.git`), rate limiting, Turnstile CAPTCHA.

### Auth niveau bancaire
Magic link + OAuth PKCE (+ Passkeys/WebAuthn en V2), JWT 1h rotatif, refresh 7j, MFA TOTP, lockout
brute-force, cookies HttpOnly/Secure/SameSite, Argon2id si mot de passe.

### Tests & vérifs
Audit sécurité hebdo (SSL Labs, Mozilla Observatory, Hardenize, HIBP, expiry certs) + vérifications des
grandes plateformes (Google/Microsoft/Facebook/Apple/LinkedIn…).

### Secrets
Tout en **variable d'environnement** (Vercel) : `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID_BRUNO`,
clés Supabase, Stripe, R2, etc. **Aucun secret réel trouvé en clair** dans les docs (placeholders seulement).
🔴 **EXCEPTION CRITIQUE** : un **token Vercel a été partagé en clair** (cf. `_MASTER_NAVLYS_NOW.md`) →
**à révoquer + régénérer**.

_Sources : `02_SECURITE_HTTP_HEADERS_NAVLYS.md`, `03_DNSSEC_CAA_RECORDS.md`, `04_CLOUDFLARE_WAF_BOT_FIGHT.md`,
`05_AUTH_NIVEAU_BANCAIRE.md`, `06_VERIFICATIONS_GRANDES_PLATEFORMES.md`, `07_TESTS_AUTOMATISES_SECURITE.md`,
`06_INFRA_VEILLE.md`, `10_LE_VEILLEUR_DE_COFFRE_charte.md`, `_MASTER_NAVLYS_NOW.md`._

---

## 💪 FORCES

- **Posture sécurité « niveau bancaire »** déjà spécifiée (headers, WAF, auth, DNSSEC).
- **Hygiène secrets** correcte dans les docs (env only, pas de clé réelle en clair).
- **Monitoring/veille** prévus (hebdo + plateformes).
- **MX Google préservé** = règle gravée → pas de coupure email pro.

---

## ⚠️ FAIBLESSES / GAPS

- 🔴 **Token Vercel exposé** non encore régénéré (action Bruno).
- **Ambiguïté Hetzner** : un serveur quasi-vide mais facturé ? snapshot/backup à clarifier.
- **AUCUN backup serveur** noté précédemment (cf. passation Hermès) → si Hetzner garde des médias, risque.
- **Spécifié ≠ déployé** : headers/WAF/auth sont des specs ; vérifier qu'ils sont **actifs en prod**.
- **Cockpit/cron orphelins** historiques (cf. ETAT-DES-LIEUX) → vérifier qu'aucune surveillance n'est cassée.

---

## 🔧 RENFORCEMENTS CONCRETS

1. **Régénérer le token Vercel** (Bruno) — priorité n°1 sécurité.
2. **Vérifier que les 9 headers + WAF sont ACTIFS** sur les domaines live (test SecurityHeaders/Observatory).
3. **Clarifier Hetzner** : snapshot + décision garder/abandonner ; si abandon → cesser la facturation
   (décision financière = Bruno seul).
4. **Confirmer les backups** : Supabase (DB) + assets ; et tout média encore sur serveur.
5. **Checklist DNS sûre** (réutilisable) : sur toute modif, **ne jamais toucher les MX Google**.
6. **Inventaire des clés à roder avant lancement public** (déjà esquissé `docs/SECURITE-AGENTS-ET-SECRETS.md`).

---

## ⚖️ DÉCISIONS BRUNO (ce domaine)

- [ ] 🔴 **Régénérer le token Vercel** (exposé).
- [ ] **Hetzner** : garder ou abandonner (et arrêter la facturation si abandon).
- [ ] Valider le **plan de backup** (Supabase + assets).
- [ ] Confirmer que les **headers/WAF/auth** sont bien actifs en prod (sinon, plan d'activation).
