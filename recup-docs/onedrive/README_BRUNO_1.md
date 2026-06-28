# 🧭 NAVLYS APP — Manuel Bruno (Beta 1.0)

**Verrouillé : 29 mai 2026 · Beta 1ᵉʳ juin 2026 · Maintainer : Bruno Mark Partouche (bruno@navlys.com)**

> ⚓ Tout ce dossier est code source prêt à déployer. Il ne contient AUCUNE clé. Tu provisionnes
> Supabase + Stripe + Alpaca + Resend, tu colles les clés dans Vercel, tu déploies. C'est tout.

---

## 1. Lancer en local (5 commandes)

```bash
# 1) Dans le dossier _APP_NAVLYS_v1/
cd "C:\Users\BP\OneDrive\Documents\Documents\Downloads\_SITES_MASTER\_APP_NAVLYS_v1"

# 2) Installer
npm install

# 3) Copier le template d'env
cp .env.template .env.local       # Windows : copy .env.template .env.local

# 4) Éditer .env.local avec tes clés Supabase + Stripe + Alpaca (voir §3)
notepad .env.local

# 5) Lancer
npm run dev
# → http://localhost:3000
```

Vérif rapide :
```bash
npm run typecheck   # zéro erreur TS attendu
npm run lint
npm test
npm run test:e2e    # nécessite : npm run test:e2e:install une première fois
```

---

## 2. Déployer sur Vercel (équipe NAVLYS)

⚠️ **Rappel CLAUDE.md** : ne jamais enchaîner deux deploy `--prod` rapprochés. Attendre READY.

```bash
# Une fois par session : export du token
export VT=$(read -s -p "Token Vercel : " v && echo $v)

# Déploiement preview (sandbox)
/tmp/vdir/node_modules/.bin/vercel deploy --token=$VT --scope navlys

# Déploiement production (un seul à la fois !)
/tmp/vdir/node_modules/.bin/vercel deploy --prod --yes --token=$VT --scope navlys
```

Le projet doit être lié à `team_nBtY5FOQMPIT4J8Bmf7wvBSC` (slug `navlys`).
**Domaines à brancher** : `app.navlys.com` (alias direct) ou réutiliser `navlys.com` après 31/05.

---

## 3. Provisionner Supabase (Frankfurt eu-central-1)

1. Aller sur https://supabase.com/dashboard → "New Project" → région **Frankfurt**.
2. Récupérer :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (⚠️ jamais public, jamais dans le repo)
3. Appliquer le schéma existant :
   ```bash
   # depuis _SITES_MASTER/
   psql "<connection_string>" -f _APP_CLIENT_SUPABASE_SCHEMA.sql
   ```
4. Vérifier dans Supabase Studio :
   - Tables : `user_profiles`, `trades`, `subscriptions`
   - RLS activé sur les 3 tables (déjà dans le schéma)
5. Activer **Auth → Email → Magic Link**, configurer **Redirect URL** :
   - `https://navlys.com/auth/callback`
   - `http://localhost:3000/auth/callback`

---

## 4. Configurer Stripe (mode TEST par défaut)

1. https://dashboard.stripe.com → en mode **Test** (toggle haut à droite).
2. Créer 4 produits + prix :
   | Produit | Type | Montant | Variable .env |
   |---|---|---|---|
   | Early Bird mensuel | Subscription | 39 €/mois | `STRIPE_PRICE_EARLY_BIRD_MONTHLY` |
   | NEXT GEN mensuel | Subscription | 49 €/mois | `STRIPE_PRICE_STANDARD_MONTHLY` |
   | NEXT GEN annuel | Subscription | 390 €/an | `STRIPE_PRICE_ANNUAL` |
   | Founder Lifetime | One-time | 999 € | `STRIPE_PRICE_LIFETIME` |
3. Récupérer `STRIPE_SECRET_KEY` (sk_test_…) + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_…).
4. Webhook :
   - Endpoint : `https://navlys.com/api/webhooks/stripe`
   - Évènement : `checkout.session.completed`
   - Récupérer le `STRIPE_WEBHOOK_SECRET` (whsec_…).
5. ⚠️ **PASSAGE EN LIVE = décision Bruno explicite seulement.** Ne JAMAIS changer en LIVE sans validation.

---

## 5. Connecter Alpaca paper (jamais LIVE)

1. https://alpaca.markets → créer un compte → activer **Paper Trading** uniquement.
2. Récupérer la paire `APCA-API-KEY-ID` + `APCA-API-SECRET-KEY`.
3. Coller dans Vercel :
   - `ALPACA_API_KEY_ID`
   - `ALPACA_API_SECRET`
   - `ALPACA_BASE_URL=https://paper-api.alpaca.markets` (par défaut, ne pas modifier)
4. Le code refuse au démarrage toute URL ≠ paper. Pas besoin de garde supplémentaire.

---

## 6. Resend pour mails transactionnels

1. https://resend.com → ajouter le domaine `navlys.com` (vérifier SPF/DKIM).
2. `RESEND_API_KEY` = re_…
3. `RESEND_FROM=NAVLYS <hello@navlys.com>`

---

## 7. Estimation coût mensuel Beta

| Service | Plan | Coût mensuel |
|---|---|---|
| Vercel Pro (équipe) | Pro | ~20 USD |
| Supabase | Free | 0 USD (jusqu'à 500 MB DB + 50k MAU auth) |
| Stripe | Pay-as-you-go | 0 + 1,4 % + 0,25 € par paiement réussi |
| Alpaca paper | Free | 0 USD |
| Resend | Free | 0 (100 mails/jour) |
| Sentry | Free | 0 (5k events) |
| **Total fixe** | | **~20 USD/mois** |

Au-delà de 200 users actifs : Supabase passe à 25 USD, Resend à 20 USD = ~65 USD/mois.

---

## 8. Architecture des modules (vue éclair)

```
app/
├── (auth)/login              ← magic link Supabase
├── (auth)/onboarding         ← 7 étapes Wizard React
├── auth/callback             ← exchangeCodeForSession
├── cap-reve                  ← Monte Carlo + Fan chart
├── dashboard                 ← action du jour + drift + NAV IA stub
├── laboratoire               ← hypothèses validées/invalidées
│   └── tactique              ← Kelly calculator + backtest stub
├── paper-trading             ← Alpaca paper, stop 2/take 4 défaut
├── abonnement                ← 4 offres Stripe Checkout
│   └── success               ← retour Stripe
├── parametres                ← compte, langue, export RGPD
│   └── export                ← export JSON
└── api/webhooks/stripe       ← upsert subscription + email Resend

lib/
├── supabase/{server,client,admin}.ts
├── stripe/server.ts          ← catalog offres
├── alpaca/client.ts          ← garde G1 paper-only
├── personalization/
│   ├── engine.ts             ← port TS de _CARTOGRAPHE_M3 (déterministe)
│   └── monte-carlo.ts        ← simulation 2 000 chemins
├── data/{profiles,daily}.ts  ← catalogue 7 profils + routines
├── i18n/dictionaries.ts      ← FR/EN/RU
├── types/navlys-domain.ts    ← types canoniques
└── utils/cn.ts               ← tailwind merge

components/
├── shared/{NavTop,Footer,DisclaimerG1,BrunoCoin,LanguageSwitcher}.tsx
├── ui/{Card,Button,Input}.tsx
└── charts/FanChart.tsx
```

---

## 9. Limites Beta (assumées, à corriger V1.1)

- NAV IA = stub bouton — branchement Claude API à faire (clé séparée).
- Backtest libre = page placeholder — port TS du `_CARTOGRAPHE_M2_BACKTEST_*.py` prévu V1.1.
- Drift portefeuille = chiffre démo (2,4 %) — calcul réel depuis positions Alpaca en V1.1.
- Export RGPD = JSON inline base64 — V1.1 : fichier signé envoyé par mail.
- Tests E2E onboarding profil-par-profil = squelettes (manque instance Supabase test).

---

## 10. Interdits absolus (rappel G1)

- ❌ Ordres LIVE depuis cette app — refus au boot si URL ≠ paper.
- ❌ Apport d'affaires sur produit financier réglementé.
- ❌ Cible « +2 %/jour ». AdaptiveStop Perplexity. Leverage > 1×.
- ❌ Mode LIVE Stripe sans validation Bruno explicite.
- ❌ Toute clé en clair dans le repo, Notion, Slack, mail.

**Bon vent.** — Le Cartographe + Claude
