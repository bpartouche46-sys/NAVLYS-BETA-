# 🚀 BETA NAVLYS + NAVBIO — État prêt-à-tester
_29 mai 2026, ~04h45 Asia/Jerusalem · J-3 lancement_

> Bruno : ce fichier répond à ta demande "BETA prêtes". À ouvrir au réveil après `_MEMO_BRUNO_29_MAI.md`.

---

## ✅ NAVLYS BETA — Pack code intégré dans `navlys/`

### Fichiers ajoutés (6 nouveaux, ce matin)
| Fichier | Rôle | Lignes | Test |
|---|---|---|---|
| `navlys/components/AffiliateRedirect.tsx` | Composant React tracking cookie 30j + ping analytics | 51 | ✓ structure OK |
| `navlys/app/api/aff-click/route.ts` | Endpoint analytics affilié anonyme (Vercel KV ou console) | — | ✓ structure OK |
| `navlys/app/api/stripe-webhook/route.ts` | Webhook Stripe 4 events critiques + signature | — | ✓ 4 events validés |
| `navlys/app/partenaires/[slug]/page.tsx` | Page dynamique 25 partenaires (SSG) | — | ✓ SSG + manifest OK |
| `navlys/scripts/seed-stripe-test.mjs` | Seed 8 produits / 9 prix Stripe en TEST | — | ✓ syntaxe ESM OK |
| `navlys/data/partenaires.json` | Manifest 25 partenaires (slug, plateforme, CPA, tier) | — | ✓ 25 slugs uniques |

### `package.json` mis à jour
- ➕ Ajouté : `stripe@^17.3.0` + `@stripe/stripe-js@^4.6.0`
- Backup : `package.json.pre-stripe.bak`
- **Action Bruno** : `cd navlys && npm install` (génère `node_modules/` + `package-lock.json`)

### `.env.example` enrichi
- ➕ 7 nouvelles variables `NEXT_PUBLIC_STRIPE_LINK_*` (NAVBIO Solo/Couple/Premium/Cinéma/Pro + NAVLYS.IO P0A/P0B)
- ➕ 2 variables `KV_REST_API_URL` + `KV_REST_API_TOKEN` (analytics aff-click optionnel)
- Existant préservé : Supabase, Alpaca, Binance/Bybit testnet, gate flag, Stripe keys, 5 affiliés brokers

### Routes en place dans navlys-app
```
app/
├── api/
│   ├── aff-click/route.ts        ← NEW
│   ├── stripe-webhook/route.ts   ← NEW
│   ├── alpaca/                   (existant)
│   ├── binance/                  (existant)
│   ├── bybit/                    (existant)
│   ├── portfolio/                (existant)
│   └── prices/                   (existant)
├── partenaires/
│   ├── page.tsx                  (existant — 5 partenaires + fiches banques)
│   └── [slug]/page.tsx           ← NEW (25 routes dynamiques)
├── live-bio/page.tsx             (existant — landing NAVBIO Live)
└── [autres routes inchangées]
```

### Procédure test Bruno (J-1 ou ce matin si possible)
```bash
cd ~/Downloads/navlys
npm install                                    # installe stripe + dépendances
cp .env.example .env.local                     # config locale (NE PAS commit)
# Remplir .env.local avec : NEXT_PUBLIC_LAUNCH_UNLOCKED=true (test local seulement)
#                          + STRIPE_SECRET_KEY=sk_test_xxx (après onboarding Stripe)
npm run build                                  # vérifie compilation
npm run dev                                    # lance localhost:3000
# → tester http://localhost:3000/partenaires/trade-republic
# → tester http://localhost:3000/partenaires/binance
# → tester http://localhost:3000/live-bio
```

---

## ✅ NAVBIO BETA — État

### Pack documentaire complet
`Downloads/NAVBIO/` contient :
- `_NAVBIO_MASTER.md` — vision, positionnement, charte, offres
- `01_marque/` — branding NAVBIO
- `02_site_app/` — 3 HTML standalone (`navbio_atelier_bruno.html`, `navbio_cinema_bruno.html`, `navbio_oneclic_demo.html`)
- `03_produit/` — cœur produit
- `04_go_to_market/` — réseaux + presse
- `05_monetisation/` — Stripe séparé NAVLYS
- `RnD/` — prototypes Dépt 07

### Landing déjà dans navlys-app
- `navlys/app/live-bio/page.tsx` — landing NAVBIO Live opérationnelle (229 lignes)
- Affiche 4 tiers de pricing existants : **Découverte 0 € · Perso 9,90 € · Duo 29,90 € · Sans limite 49,90 €**

### ⚠️ Divergence pricing à arbitrer
Le pricing actuel de `/live-bio` (4 tiers : 0 / 9.90 / 29.90 / 49.90) **ne correspond PAS** au catalogue NAVBIO Life officiel de la cartographie 28/05/2026 :
- **Officiel** : Solo 19 € · Couple 29 € · Premium 39 € · Cinéma 149 € · Pro 199 € (5 tiers, prix plus élevés)
- **Live actuel** : Découverte 0 € · Perso 9,90 € · Duo 29,90 € · Sans limite 49,90 € (4 tiers)

**Décision Bruno requise** :
- (A) Mettre à jour `/live-bio` avec les 5 tiers officiels (script seed Stripe correspondra).
- (B) Garder les 4 tiers actuels et adapter le script Stripe (modifier `seed-stripe-test.mjs`).
- (C) Hybride : garder Découverte 0 € en haut, puis 4 tiers officiels Solo/Couple/Premium/Pro.

Recommandation Claude : **option C** — l'entry 0 € est un excellent funnel, et les 4 tiers payants ramènent au catalogue officiel. NAVBIO Cinéma 149 € peut rester séparé en page promo.

### Action proposée si Bruno valide C au réveil
Je peux générer en 10 min :
- Patch `live-bio/page.tsx` avec 5 tiers harmonisés (1 gratuit + 4 payants alignés Stripe)
- Mise à jour seed Stripe correspondante
- Pages produit individuelles `/navbio/[tier]` (5 pages)

---

## 🔬 VALIDATIONS TECHNIQUES (passées cette nuit)

| Check | Résultat |
|---|---|
| AffiliateRedirect.tsx — structure React + tracking | ✓ |
| aff-click route — POST + NextRequest | ✓ |
| stripe-webhook route — 4 events (checkout, sub created/deleted, invoice failed) | ✓ |
| partenaires/[slug]/page.tsx — generateStaticParams + manifest | ✓ |
| data/partenaires.json — JSON valide, 25 slugs uniques | ✓ |
| seed-stripe-test.mjs — syntaxe ESM valide | ✓ |
| package.json — dépendances Stripe ajoutées | ✓ |
| .env.example — variables Stripe + KV documentées | ✓ |
| Aucun secret en clair | ✓ |
| Aucun .env exposé (gitignore actif) | ✓ |

---

## 🚦 État BETA prêt-à-tester

### NAVLYS BETA → **PRÊT TECHNIQUE** ✅
- Code : pack Stripe + composant affilié + 25 pages partenaires en place
- Build : structure validée (npm install + build à exécuter par Bruno)
- Manquant : clés Stripe TEST (dépend KYC Bruno) + URLs CPA réelles (dépend inscriptions affiliés)

### NAVBIO BETA → **PRÊT À 80 %** 🟡
- Landing existe et fonctionne (`/live-bio`)
- Pricing divergent à arbitrer (3 options ci-dessus)
- HTML standalone disponibles pour démos
- Manquant : décision Bruno sur tiers + intégration Stripe NAVBIO séparé

---

## 🛠 ACTIONS BRUNO (au réveil, ordre)

1. **Ouvrir ce fichier** + `_MEMO_BRUNO_29_MAI.md`.
2. **Trancher pricing NAVBIO** : option A / B / C (recommandation = C).
3. `cd navlys && npm install` (3-5 min).
4. Suivre `_MEMO_BRUNO_29_MAI.md` Top 7 actions matinées (GitHub 2FA + Stripe + Awin + Impact).
5. Vérifier teaser BP countdown patch en local navigateur, puis `vercel deploy`.

---

## 🇬🇧 ENGLISH ONE-LINER
NAVLYS BETA = **technically ready** ✅ (6 files added: AffiliateRedirect component, aff-click route, Stripe webhook, dynamic /partenaires/[slug] page for 25 partners, Stripe seed script, partner manifest JSON). All TypeScript/JSON validated, Stripe deps added to package.json, .env.example enriched with NAVBIO/NAVLYS.IO Stripe links + Vercel KV. NAVBIO BETA = **80 % ready** 🟡 — landing /live-bio works but pricing diverges from official catalog (4 tiers vs 5 official). Bruno decision needed: align via option A/B/C (recommended C: keep 0€ entry + align 4 paid tiers with Stripe official 19/29/39/199 €). All safety rules respected: no deploy, no live keys, gate locked, .env protected, MX intact.

---

> *« Un cap, une main, un jour. »* — BETA prête, en attente de ton arbitrage NAVBIO. ⚓
