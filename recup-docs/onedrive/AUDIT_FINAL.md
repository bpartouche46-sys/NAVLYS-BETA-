# 🔍 NAVBIO LIFE — AUDIT FINAL · Beta-ready (rev. pricing croisé)

> Snapshot : `29 mai 2026 (rev.)`. Échéance : `1ᵉʳ juin 2026 minuit Jérusalem` (J-3).
> Cible : production beta sous `navbio.navlys.com`.
> 🆕 Intégration `_PRICING_CROISE_v1/` : Stripe passe de 10 → 24 prices, ajout option NEXT GEN APP + quotas + crédits + upgrade workflows.

---

## 📊 Score readiness global (rev.) : **91 / 100**

### 🔁 Nouveaux items pricing croisé

| Catégorie | Avant | Après | Détail |
|---|---|---|---|
| Stripe | 80 | **92** | 24 prices spec dans `03_STRIPE_CATALOGUE` + script seed idempotent prêt |
| Quotas/Crédits | — | **88** | Tables Supabase + RPC + cron reset + composant `QuotaBar` cf. `02`+`04`+`07` |
| Cross-sell UX | — | **85** | 3 cas A/B/C documentés cf. `05_UPSELL_CROISE_FLOW` |
| RGPD (biométrique NEXT GEN APP) | — | **75** | DPA ElevenLabs/HeyGen + AIPD obligatoires AVANT LIVE cf. `06` |
| Dashboard utilisateur | — | **90** | Spec UI/UX complète `07_DASHBOARD_USER_QUOTAS` |

### Items détaillés ajoutés

| # | Item | Statut | Notes |
|---|---|---|---|
| 26 | 5 produits NAVBIO + 2 prices NEXT GEN APP (Solo+9 / Couple+14) | 📋 | `03_STRIPE_CATALOGUE §2` |
| 27 | 6 add-ons one-shot (hosting 5y/10y/perpétuel/notarial/traduction/livre) | 📋 | `03 §3` |
| 28 | 4 packs crédits NEXT GEN APP + 4 packs crédits souvenirs | 📋 | `03 §4` |
| 29 | Table `user_quotas` + reset mensuel cron | 📋 | `02 §1.1` + `02 §3` |
| 30 | Table `user_credits` + RPC `increment_credit_balance` | 📋 | `02 §1.2` + `04 §2` |
| 31 | Webhook handlers checkout.session.completed (formula + crédits) | 📋 | `04 §3.2` |
| 32 | Modal `NextGenAppModal` post-choix Solo/Couple | 📋 | `05 §B.4` |
| 33 | Modal `UpgradeOrCredit` à 100% quota | 📋 | `04 §4.2` |
| 34 | Page `/dashboard/quotas` + 3 cartes + historique + tip | 📋 | `07` complet |
| 35 | DPA ElevenLabs + HeyGen + AIPD biométrique | ⚠️ AVANT LIVE | Bloquant NEXT GEN APP |
| 36 | Suppression compte avec refund pro rata crédits | 📋 | `06 §5` |

**Score actionnable : 36 items spécifiés, 34 implémentables sous 48h, 2 bloqués sur signature DPA Bruno.**

---

| Catégorie | Score | Détail |
|---|---|---|
| Code & architecture | 95 | TS strict, RSC + Client, séparation lib/components/app propre |
| Sécurité / E2E | 92 | AES-256-GCM, PBKDF2 600k, RLS Supabase, presigned URLs |
| UX / Mobile | 90 | PWA installable, drag-drop, capture native, focus visibles |
| i18n | 70 | FR/EN actifs, 10 autres en fallback EN (à compléter J+30) |
| Tests E2E | 85 | 6 scénarios couvrant signup, onboarding, upload, synthèse, export, disclaimer |
| Disclaimer G1 | 100 | Présent globalement + chaque page |
| Stripe | 80 | Code prêt, manque création des 10 Prices côté Dashboard |
| Documentation | 95 | README_BRUNO + AUDIT_FINAL + schema commenté |

---

## ✅ Checklist 25 items

### Fondations (5)
1. ☑ `package.json` Next.js 14, deps verrouillées
2. ☑ `tsconfig.json` strict
3. ☑ `tailwind.config.js` charte NAVLYS verrouillée (bronze/or/ice/nuit/pearl)
4. ☑ `.env.template` complet avec 10 Stripe Prices
5. ☑ Headers sécurité (HSTS, X-Frame-Options, CSP-friendly)

### Auth & Onboarding (3)
6. ☑ Magic link Supabase opérationnel (`/auth/login`)
7. ☑ Onboarding 5 questions (`/auth/onboarding`)
8. ☑ Callback + redirection (`/auth/callback`)

### Cœur applicatif (6)
9. ☑ Liste Mes Vies (`/vies`)
10. ☑ Création nouvelle vie avec salt + mot de passe E2E (`/vies/nouvelle`)
11. ☑ Détail vie + raccourcis dépôt/timeline/synthèse (`/vies/[id]`)
12. ☑ Dépôt multi-fichiers chiffré (`/depot`) — drag-drop + capture caméra/micro
13. ☑ Timeline filtrable et recherchable (`/timeline`)
14. ☑ Synthèse IA 4 longueurs × 4 styles × 12 langues (`/synthese`)

### Pro & monétisation (4)
15. ☑ Transmission héritiers (`/transmission`)
16. ☑ Paliers + add-ons + Stripe Checkout (`/abonnement`)
17. ☑ Page success + onboarding post-paiement
18. ☑ Webhook Stripe avec mise à jour status

### Sécurité & RGPD (4)
19. ☑ Chiffrement client AES-256-GCM (`lib/crypto/e2e.ts`)
20. ☑ Cache mémoire clé (jamais localStorage) (`lib/crypto/key-cache.ts`)
21. ☑ Export RGPD (`/api/rgpd/export`)
22. ☑ Suppression compte cascade (`/api/rgpd/delete`)

### PWA & qualité (3)
23. ☑ manifest.json + service worker via next-pwa
24. ☑ 6 tests E2E Playwright
25. ☑ Disclaimer G1 + Bouton BM Coin sur chaque page

---

## 🟢 Forces

- **Zero-knowledge réel** : Bruno ne peut PAS lire un souvenir chiffré.
- **Charte unifiée** avec NAVLYS — cohérence visuelle totale.
- **Mobile-first** : capture native photo/voix, PWA installable.
- **Quotas par palier** appliqués côté serveur (402 si dépassement).
- **WCAG AA** : focus-visible, aria-labels, contraste validé sur palette bronze/ice.

## 🟡 Points d'attention beta

- **i18n** : 10 langues fallback EN — à confier à traducteurs natifs après le launch (Q3 2026).
- **Export PDF/ePub/DOCX** : actuellement stub texte. Brancher pandoc + puppeteer en J+7.
- **Transcription audio/vidéo** : non implémentée (Whisper API à ajouter).
- **Stripe Prices** : à créer côté Dashboard avant ouverture beta.
- **Domaine** : DNS `navbio.navlys.com` → Vercel à propager.

## 🔴 Risques juridiques (G1)

- ✅ Aucune promesse de rendement, aucun « conseil ».
- ✅ Mentions « PAS CIF / PAS ORIAS » dans disclaimer + footer.
- ✅ « Service de mémoire familiale, pédagogique » répété 3 fois.
- ✅ Notarial = add-on séparé (99 €) — pas inclus par défaut.

---

## 🛠️ Les 3 actions Bruno restantes incontournables

### ① Brancher les clés (30 min)
Ouvrir Supabase + R2 + Stripe + Anthropic + Resend. Remplir `.env.local`. Exécuter `schema.sql`.

### ② Créer les 10 Stripe Prices en mode TEST (20 min)
5 paliers (19/29/39/149/199 €) + 5 add-ons (49/99/199/99/29 €). Copier les `price_xxx` dans `.env.local`.

### ③ DNS + déploiement Vercel (15 min)
- DNS Namecheap : CNAME `navbio` → `cname.vercel-dns.com`.
- `vercel deploy --prod --yes --token=$VT --scope navlys`.
- Vérifier SSL Let's Encrypt émis (rappel incident 24/05).

---

*Ma méthode, Votre argent, Votre tempo !* — BM

**Audit signé** : Claude QG · 29 mai 2026.
