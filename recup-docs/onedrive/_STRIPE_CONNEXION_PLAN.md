# STRIPE — Plan de connexion NAVLYS
_28 mai 2026 — relance 30 mai 2026 · Bruno Partouche · Cap 31 mai (J-1)_

## ✅ CHECKLIST ACTION BRUNO (top — à cocher avant J0)
- [ ] **Stripe** : créer compte sur `bruno@navlys.com` (Workspace).
- [ ] **Stripe KYC** : pièce ID + SIRET auto-entreprise (FR) + RIB FR + URL navlys.com (gate accepté) → activité = *"Educational subscription service & digital content publisher in personal finance — no investment advice, no brokerage, no IOBSP/CIF."* (délai 1–5 j ouvrés).
- [ ] **Mizrahi** (banque IL) : faire ajouter le **nom anglais légal "BRUNO MARK PARTOUCHE"** sur le compte (action Bruno auprès de la banque).
- [ ] **Récupérer clés TEST** dashboard Stripe → Developers / API keys : `pk_test_*` + `sk_test_*`.
- [ ] **Coller clés dans Vercel env vars** (projet `navlys-app`, scope `navlys`) : `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `NAVLYS_BASE_URL=https://navlys.com`.
- [ ] **GitHub `bpartouche46-sys`** : activer Passkey + 2FA (panneau du 28/05 = Password "Not configured") avant tout commit du pack Stripe.
- [ ] **Récupérer clés LIVE** après validation KYC → recoller dans Vercel env vars (LIVE séparé du TEST via scope env).
- [ ] **Test paiement** carte `4242 4242 4242 4242` exp `12/30` cvc `123` AVANT bascule LIVE.
- [ ] **Validation explicite Bruno** : OK bascule LIVE (par message daté).

### Actions Claude (autonomes — après clés posées)
- [ ] Exécuter `scripts/seed-stripe-test.mjs` (§5) → créer 8 produits + 9 prix en TEST.
- [ ] Pousser webhook Next.js `app/api/stripe-webhook/route.ts` (§7) sur GitHub → auto-deploy Vercel.
- [ ] Intégrer les liens affiliés réels dans `_BRUNOPARTOUCHE_AVEC_PARTENAIRES.html` + pages `/partenaires/[slug]` au fur et à mesure des inscriptions (voir `_PARTENAIRES_LIENS_AUDIT.md`).
- [ ] Audit auto SSL navlys.com + brunopartouche.com avant J0.

## 📸 MAJ 30/05 — Image jointe = navlys.com/client/001 (re-confirmation)
Capture Chrome du **30 mai 2026** sur **`navlys.com/client/001`** (mockup démo client BETA, déjà LIVE) :
- Header : ⚓ `CLIENT 001` · `Bruno Mark Partouche` · pastille verte `● LIVE`.
- Méthode : `ETF mondial · DCA mensuelle` | `Kelly fractionné · Stops`.
- Légende centrale : ***"Exemple sur capital de 10 000 € — chiffres réels dans ton compte une fois Stripe connecté."*** ← **trigger explicite du mandat de ce jour**.
- Section `Tes actions` : 4 CTA → 🔶 **WhatsApp Bruno** (orange, primaire) · 📘 Méthode détaillée · 🪙 Ta bio NAVBIO · ← Retour navlys.com.
- Footer : `BETA Client 001 · Bruno Mark Partouche · Données Alpaca — compte paper trading`.

➡️ **Conclusion** : la page `/client/001` est l'**ancre business** qui justifie l'urgence Stripe. Tant que Stripe n'est pas branché, la phrase « chiffres réels une fois Stripe connecté » reste un teaser. Une fois clés posées + webhook actif → cette même page passe en mode "compte réel" (lit la souscription via webhook → bascule UI).

➡️ Aucune nouvelle info sur clés/KYC dans l'image (même page que la capture 28/05 référencée §1). Le pack code et le plan ci-dessous restent valides. Action urgente = **créer compte Stripe + KYC**.

---

> **MAJ 28/05 (relance post-529 — GitHub clear)** — Image jointe cette fois = **GitHub Settings → Password and authentication** du compte `NAVLYS (bpartouche46-sys)`. Bruno confirme : **« all is clear for github »**. Conséquences opérationnelles :
> - ✅ GitHub `bpartouche46-sys` opérationnel → on peut **brancher Vercel ↔ GitHub** (auto-deploy `navlys-app` sur push `main`).
> - ✅ On peut pousser le **webhook Stripe** (`/api/stripe-webhook`) dans `navlys/app/api/` puis `git push` → Vercel build → endpoint LIVE prêt à recevoir le `whsec_`.
> - ⚠️ Panneau capture : **Password = "Not configured"**. Activer **Passkey** (recommandé) ou password + 2FA AVANT tout commit du pack Stripe — sinon Vercel CI/CD = trou de sécu.
> - ⚠️ Garder le compte `bpartouche46-sys` **séparé** du compte perso (orga NAVLYS) — c'est déjà le cas, ne pas re-fusionner.
> - 🔧 Une fois 2FA activée : créer **PAT (fine-grained)** scope `repo` + `workflow` pour le bot deploy — **jamais en clair** dans un fichier (Vercel env var uniquement).

## 0. Analyse capture GitHub Settings (28/05)
- URL : `github.com/settings/security` (page *Password and authentication*).
- Compte : **NAVLYS · bpartouche46-sys** (avatar médaille/pièce), switch profil dispo vers compte perso.
- État sign-in methods :
  - Email : `1 verified email configured` ✅
  - **Password : `Not configured`** ⚠️ (compte créé via SSO probable)
  - Passkeys : option visible, *Passwordless sign-in with biometrics or security keys* (recommandé : ajouter)
  - Google : connecté (logo G visible)
- Menu latéral : Public profile, Account, Appearance, Accessibility, Notifications, Billing & licensing, Emails, Password & auth (actif), Sessions, SSH & GPG keys.

➡️ **Action immédiate Bruno** : activer Passkey OU password + 2FA → ouvrir SSH/GPG keys → coller la clé pub du poste perso → lier repo `navlys-app` à Vercel via OAuth GitHub.

## 1. Image historique (capture précédente — référence)
Capture Chrome de **`navlys.com/client/001`** :
- Header : ⚓ `CLIENT 001` · `Bruno Mark Partouche` · pastille verte `● LIVE`
- Encart méthode : `ETF mondial · DCA mensuelle` | `Kelly fractionné · Stops`
- Légende : *"Exemple sur capital de 10 000 € — chiffres réels dans ton compte une fois Stripe connecté."*
- Section `Tes actions` : 4 CTA → `WhatsApp Bruno` (orange) · `Méthode détaillée` · `Ta bio NAVBIO` · `← Retour navlys.com`
- Footer entamé : *"BETA Client 001 · ... Données Alpaca — compte paper trading"*

➡️ **Conclusion** : page **démo client** déjà en ligne, mentionne explicitement que Stripe n'est **pas branché**. C'est cette page qui doit déclencher l'upgrade abonnement après gate.

## 2. Clés Stripe — État
Grep `pk_test_|sk_test_|pk_live_|sk_live_|whsec_` sur tout `Downloads/` :
- Aucune clé réelle trouvée.
- Uniquement des **placeholders** : `pk_live_PASTE_HERE`, `sk_live_xxx`, `whsec_xxx` (dans `NAVLYS_STRIPE_COMPLETE_PACK/` + `NAVLYS_PORTAL_APP/config.example.js`).

➡️ **Mode actuel = INEXISTANT.** Compte Stripe pas encore créé OU clés pas encore générées. Pack code 100 % prêt.

## 3. Pack code existant (à exploiter)
`Downloads/NAVLYS_STRIPE_COMPLETE_PACK/` contient :
- `lib/stripe.ts` — SDK wrapper (API `2025-03-31.basil`)
- `setup_stripe_navlys.sh` + `.ps1` — création auto produits + coupons + webhook
- Routes Next.js : `/api/stripe/checkout` · `/api/stripe/portal` · `/api/stripe/webhook` · `/api/coin-order-request`
- Pages bilingues `/rejoindre-equipage` (FR) · `/en/join-the-crew` (EN)

➡️ Le pack n'a que **3 produits** (Mensuel 49 € · Annuel 490 € · Bio Live 39 €). Il manque NAVBIO Solo/Couple/Premium/Cinéma/Pro + NAVLYS.IO Phase 0 A/B.

## 4. Catalogue cible (8 produits · 9 prix)

| Produit Stripe | Prix | Type | Code interne |
|---|---|---|---|
| NAVLYS NEXT GEN INVEST | 49 € | recurring `month` | `navlys_subscription_monthly` |
| NAVLYS NEXT GEN INVEST | 490 € | recurring `year` | `navlys_subscription_yearly` |
| NAVBIO Life Solo | 19 € | one-time | `navbio_solo` |
| NAVBIO Life Couple | 29 € | one-time | `navbio_couple` |
| NAVBIO Life Premium | 39 € | one-time | `navbio_premium` |
| NAVBIO Life Cinéma | 149 € | one-time | `navbio_cinema` |
| NAVBIO Life Pro | 199 € | one-time | `navbio_pro` |
| NAVLYS.IO Phase 0 A | 9 € | one-time | `navlysio_phase0_a` |
| NAVLYS.IO Phase 0 B | 19 € | one-time | `navlysio_phase0_b` |

➡️ **2 abos + 7 one-shot = 9 prix sur 8 produits** (NAVLYS = 1 produit, 2 prix).

## 5. Script Node.js — Création TEST (à exécuter par Bruno)
Fichier à placer dans `navlys/scripts/seed-stripe-test.mjs` :

```js
// SEED STRIPE TEST — NAVLYS
// Usage: STRIPE_SECRET_KEY=sk_test_xxx node seed-stripe-test.mjs
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-03-31.basil" });

const items = [
  { name: "NAVLYS NEXT GEN INVEST", code: "navlys", prices: [
      { amount: 4900, currency: "eur", recurring: { interval: "month" }, lookup: "navlys_monthly" },
      { amount: 49000, currency: "eur", recurring: { interval: "year" }, lookup: "navlys_yearly" }
  ]},
  { name: "NAVBIO Life Solo",     code: "navbio_solo",    prices: [{ amount: 1900,  currency: "eur", lookup: "navbio_solo" }] },
  { name: "NAVBIO Life Couple",   code: "navbio_couple",  prices: [{ amount: 2900,  currency: "eur", lookup: "navbio_couple" }] },
  { name: "NAVBIO Life Premium",  code: "navbio_premium", prices: [{ amount: 3900,  currency: "eur", lookup: "navbio_premium" }] },
  { name: "NAVBIO Life Cinéma",   code: "navbio_cinema",  prices: [{ amount: 14900, currency: "eur", lookup: "navbio_cinema" }] },
  { name: "NAVBIO Life Pro",      code: "navbio_pro",     prices: [{ amount: 19900, currency: "eur", lookup: "navbio_pro" }] },
  { name: "NAVLYS.IO Phase 0 A",  code: "navlysio_p0a",   prices: [{ amount: 900,   currency: "eur", lookup: "navlysio_p0a" }] },
  { name: "NAVLYS.IO Phase 0 B",  code: "navlysio_p0b",   prices: [{ amount: 1900,  currency: "eur", lookup: "navlysio_p0b" }] },
];

for (const it of items) {
  const product = await stripe.products.create({ name: it.name, metadata: { code: it.code } });
  for (const p of it.prices) {
    await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount,
      currency: p.currency,
      ...(p.recurring ? { recurring: p.recurring } : {}),
      lookup_key: p.lookup
    });
    console.log("OK", it.name, p.lookup, p.amount/100, "€");
  }
}
```

➡️ Clé `sk_test_...` **passée en variable d'env, jamais en clair**.

## 6. Pattern Checkout (côté front)
Deux options possibles. Option A recommandée pour MVP :

**A. Stripe Checkout Hosted** (no-code, créer 9 Payment Links dans dashboard) :
```
https://buy.stripe.com/test_xxxxxxx   ← coller URL dans href du CTA
```

**B. Server-side `redirectToCheckout`** (déjà dans le pack) :
```ts
// app/api/stripe/checkout/route.ts (extrait)
const session = await stripe.checkout.sessions.create({
  mode: price.recurring ? "subscription" : "payment",
  line_items: [{ price: priceId, quantity: 1 }],
  success_url: `${BASE}/merci?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url:  `${BASE}/rejoindre-equipage`,
  customer_email: email,
  metadata: { product_code, lang }
});
return Response.json({ url: session.url });
```

## 7. Webhook
- **URL** : `https://navlys.com/api/stripe-webhook` (ou `/api/stripe/webhook` selon le pack)
- **Events à abonner** :
  - `checkout.session.completed` → enregistrer commande, déclencher accès
  - `customer.subscription.created` → activer abo
  - `customer.subscription.deleted` → désactiver accès
  - `invoice.payment_failed` → notifier Bruno + tag client en relance

**Template Next.js (App Router)** :
```ts
// app/api/stripe-webhook/route.ts
import { NextRequest } from "next/server";
import { stripe, assertWebhookSecret } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("no signature", { status: 400 });
  const buf = Buffer.from(await req.arrayBuffer());
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, assertWebhookSecret());
  } catch (e) {
    return new Response(`bad sig: ${e.message}`, { status: 400 });
  }
  switch (event.type) {
    case "checkout.session.completed": { /* TODO grant access */ break; }
    case "customer.subscription.created": { /* TODO activate */ break; }
    case "customer.subscription.deleted": { /* TODO revoke */ break; }
    case "invoice.payment_failed": { /* TODO notify */ break; }
  }
  return Response.json({ received: true });
}
```

## 8. Checklist Action Bruno
0. **GitHub `bpartouche46-sys`** : activer Passkey + 2FA (panneau capture 28/05 = Password "Not configured") → ajouter clé SSH publique du poste → autoriser OAuth Vercel sur orga NAVLYS.
1. **KYC Mizrahi** (banque IL) : version anglaise du nom légal (`Bruno Mark Partouche`) pour le compte business.
2. **Créer compte Stripe** sur `bruno@navlys.com` (Workspace) — pays selon entité (FR si auto-entrepreneur, IL si Mizrahi).
3. **KYC Stripe** : pièce ID + KBIS/équivalent + IBAN (Mizrahi ou autre).
4. **Récupérer clés TEST** dashboard → onglet *Developers / API keys* : `pk_test_*` + `sk_test_*`.
5. **Coller dans Vercel env vars** (projet `navlys-app`, scope `navlys`) :
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...   (après création endpoint)
   NAVLYS_BASE_URL=https://navlys.com
   ```
6. **Exécuter script seed** (§5) en TEST.
7. **Créer endpoint webhook** dashboard Stripe → URL `https://navlys.com/api/stripe-webhook` → copier `whsec_` → recoller dans Vercel.
8. **Test paiement** carte `4242 4242 4242 4242` exp `12/30` cvc `123`.
9. ❌ **NE PAS BASCULER LIVE** sans validation Bruno + audit page `/client/001`.

## 9. Interdits
- ❌ Aucune clé `sk_live_*` ou `whsec_*` ne doit transiter en clair (chat, fichier non chiffré, commit).
- ❌ Pas de bascule TEST → LIVE sans Bruno présent ET sans test 4242 réussi.
- ❌ Pas de webhook LIVE pointant vers Vercel preview (uniquement domaine `navlys.com`).

---

# ANNEXE STRIPE — Données réelles WEB 28/05/2026

## S.1 Fees Stripe FR 2026 ✅ web 28/05
- Cartes EU domestic : **1,5 % + 0,25 €**
- Cartes internationales hors EU : **+3,25 %**
- Conversion devise : **+2 %**
- Auto-entrepreneur : compte accepté sans capital
- E-invoicing obligatoire : **1er septembre 2026** pour auto-entreprises

**Impact NAVLYS** : sur 100 ventes 490 € en CB FR/EU domestic = 49 000 € brut → frais 760 € → **net 48 240 € (98,4 %)**.

**Source** : [Stripe Pricing FR](https://stripe.com/en-fr/pricing) · [Affonso France calc](https://affonso.io/resources/stripe-fee-calculator/france)

## S.2 Stripe restricted business — Cas NAVLYS ✅ web 28/05
- "Investment and brokerage services" = **restricted** (pas notre cas, NAVLYS ne broke pas).
- **"Financial education subscription" + "digital content"** = catégories acceptées avec docs sup au onboarding.
- ✅ NAVLYS rentre dans la case "digital newsletter / educational content" — comparable à Capital+ / Investir.fr / Café de la Bourse.

**Action onboarding** : fournir à Stripe (a) URL navlys.com, (b) échantillon contenu pédagogique (mockup `/client/001` ne montre PAS de conseil perso), (c) mentions légales explicites "pas IOBSP/CIF, contenu éducatif uniquement".

**Source** : [Stripe Restricted FAQ](https://support.stripe.com/questions/prohibited-and-restricted-businesses-list-faqs)

## S.3 Payment Links vs Checkout — Reco NAVLYS ✅ web 28/05
**MVP J0 (31 mai) = Payment Links** :
- No-code, créer 9 liens dans dashboard Stripe en 30 min.
- Multi-devise Adaptive Pricing auto (EUR + USD si besoin).
- Apple Pay natif.
- Abonnements + coupons supportés.
- URLs `https://buy.stripe.com/[id]` à coller directement dans les CTA du teaser et de `/rejoindre-equipage`.

**Phase 2 (J+30) = Checkout Sessions** :
- Server-side, 100+ moyens de paiement (SEPA Debit, Bancontact, Klarna).
- Routing FR/EN automatique selon lang utilisateur.
- Metadata client (UTM source, programme affilié référent) pour analytics.
- Reprendre script `seed-stripe-test.mjs` du §5.

**Source** : [Stripe Checkout vs Payment Intents](https://docs.stripe.com/payments/checkout-sessions-and-payment-intents-comparison)

## S.4 Checklist KYC Stripe France — Nouvel ordre optimal
1. Compte créé via `bruno@navlys.com` (déjà OK Workspace).
2. Forme juridique : **auto-entrepreneur** (rapide) — entité IL Mizrahi en phase 2.
3. Pièces : carte ID FR + RIB FR + numéro SIRET (auto-entreprise) + URL navlys.com en ligne (gate accepté).
4. Description activité Stripe form : **"Educational subscription service & digital content publisher in personal finance — no investment advice, no brokerage, no IOBSP/CIF activity."**
5. Soumettre → délai validation 1-5 jours ouvrés (rapport Stripe FR 2026).
6. Mode TEST utilisable immédiatement avec clés `sk_test_*`.

