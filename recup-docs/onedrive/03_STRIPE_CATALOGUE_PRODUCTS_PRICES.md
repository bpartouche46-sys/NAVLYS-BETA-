# 🔌 03 · STRIPE CATALOGUE — Products & Prices

_Configuration cible · 29 mai 2026 · mode TEST uniquement avant 31 mai · v1 cross-sell_

> ⚠️ Bruno crée le compte Stripe sous `bruno@navlys.com`. Claude ne crée AUCUN compte Stripe. Ce document donne le **plan détaillé + script Node.js d'init**. Bruno exécute le script avec sa clé `sk_test_...` en variable d'env. **Jamais de clé en clair persistante.**

---

## 0. Récap chiffres

- **15 produits** Stripe à créer (5 NAVLYS plans, 5 NAVBIO formules, 4 packs crédits, 1 option NEXT GEN APP — détail §1-§4)
- **24 prices** au total (chaque produit a 1 ou plusieurs prices selon variantes)
- **6 add-ons NAVBIO** = 6 produits one-shot supplémentaires (cf. `01_MATRICE` §2.2)
- **2 coupons** : `NAVLYS_40` (-40 % auto pour abonné NAVLYS sur NAVBIO Solo/Couple/Premium) + `LIFETIME_FOUNDER` (limite 100 utilisations)

**Total final : 21 produits + 24 prices + 2 coupons + 1 promotion code lifetime.**

---

## 1. Produits NAVLYS (1 produit, 4 prices)

### 1.1 `prod_navlys_invest` — NAVLYS NEXT GEN INVEST

| Lookup key | Amount (cents) | Currency | Recurring | Metadata |
|---|---|---|---|---|
| `price_navlys_early_bird` | 3900 | eur | month | `{ plan: "early_bird", duration_months: 6 }` |
| `price_navlys_standard` | 4900 | eur | month | `{ plan: "standard" }` |
| `price_navlys_annual` | 39000 | eur | year | `{ plan: "annual" }` |
| `price_navlys_lifetime` | 99900 | eur | (one-shot) | `{ plan: "lifetime", seats_remaining: 100 }` |
| `price_navlys_student` | 2400 | eur | month | `{ plan: "student", requires_proof: true }` |

Note : early bird = même produit, deux prices différents. Le webhook bascule l'utilisateur de `early_bird` à `standard` après 6 mois via `subscription_schedule`.

---

## 2. Produits NAVBIO (5 produits, 5 prices base + 2 prices option NEXT GEN APP)

### 2.1 `prod_navbio_solo`

| Lookup | Amount | Type | Metadata |
|---|---|---|---|
| `price_navbio_solo` | 1900 | one-shot | `{ formula: "solo", memories_quota: 50, nextgen_app: false }` |
| `price_navbio_solo_nextgen` | 2800 | one-shot | `{ formula: "solo", memories_quota: 50, nextgen_app: true }` |

### 2.2 `prod_navbio_couple`

| Lookup | Amount | Type | Metadata |
|---|---|---|---|
| `price_navbio_couple` | 2900 | one-shot | `{ formula: "couple", memories_quota: 100, nextgen_app: false }` |
| `price_navbio_couple_nextgen` | 4300 | one-shot | `{ formula: "couple", memories_quota: 100, nextgen_app: true }` |

### 2.3 `prod_navbio_premium`

| Lookup | Amount | Type | Metadata |
|---|---|---|---|
| `price_navbio_premium` | 3900 | one-shot | `{ formula: "premium", memories_quota: 250, nextgen_app: true }` |

### 2.4 `prod_navbio_cinema`

| Lookup | Amount | Type | Metadata |
|---|---|---|---|
| `price_navbio_cinema` | 14900 | one-shot | `{ formula: "cinema", memories_quota: 1000, nextgen_app: true }` |

### 2.5 `prod_navbio_pro`

| Lookup | Amount | Type | Metadata |
|---|---|---|---|
| `price_navbio_pro` | 19900 | one-shot | `{ formula: "pro", memories_quota: -1, nextgen_app: true }` |

(`memories_quota: -1` = illimité côté code applicatif)

---

## 3. Add-ons NAVBIO (6 produits one-shot)

| Lookup | Product name | Amount | Metadata |
|---|---|---|---|
| `price_navbio_hosting_5y` | NAVBIO Hébergement 5 ans | 4900 | `{ addon: "hosting_5y" }` |
| `price_navbio_hosting_10y` | NAVBIO Hébergement 10 ans | 9900 | `{ addon: "hosting_10y" }` |
| `price_navbio_hosting_perpetual` | NAVBIO Hébergement perpétuel | 19900 | `{ addon: "hosting_perpetual" }` |
| `price_navbio_notarial` | NAVBIO Service notarial transmission | 9900 | `{ addon: "notarial" }` |
| `price_navbio_translation` | NAVBIO Traduction bio (1 langue) | 2900 | `{ addon: "translation", per_language: true }` |
| `price_navbio_book_print` | NAVBIO Livre papier 50 ex | 19900 | `{ addon: "book_print" }` |

---

## 4. Crédits NEXT GEN APP (4 produits one-shot)

| Lookup | Product name | Amount | Metadata |
|---|---|---|---|
| `price_credit_mini` | NEXT GEN Crédit Mini | 500 | `{ credit_pack: "mini", video_min: 2, voice_min: 10 }` |
| `price_credit_standard` | NEXT GEN Crédit Standard | 1200 | `{ credit_pack: "standard", video_min: 6, voice_min: 30 }` |
| `price_credit_pack` | NEXT GEN Crédit Pack | 2500 | `{ credit_pack: "pack", video_min: 15, voice_min: 90 }` |
| `price_credit_grand_pack` | NEXT GEN Crédit Grand Pack | 4900 | `{ credit_pack: "grand_pack", video_min: 35, voice_min: 240 }` |

Crédits **souvenirs NAVBIO** (séparés des minutes IA) :

| Lookup | Product name | Amount | Metadata |
|---|---|---|---|
| `price_memories_solo_topup` | NAVBIO Crédits 25 souvenirs | 500 | `{ credit_type: "memories", units: 25 }` |
| `price_memories_couple_topup` | NAVBIO Crédits 50 souvenirs | 800 | `{ credit_type: "memories", units: 50 }` |
| `price_memories_premium_topup` | NAVBIO Crédits 100 souvenirs | 1200 | `{ credit_type: "memories", units: 100 }` |
| `price_memories_cinema_topup` | NAVBIO Crédits 500 souvenirs | 2500 | `{ credit_type: "memories", units: 500 }` |

---

## 5. Coupons & promotion codes

### 5.1 Coupon `NAVLYS_40` (-40 % abonné)

- `percent_off`: 40
- `duration`: forever
- `applies_to.products`: `prod_navbio_solo`, `prod_navbio_couple`, `prod_navbio_premium`
- Application **automatique** par le webhook `customer.subscription.created` quand l'utilisateur a un abonnement NAVLYS actif (cf. `04_CODE_INTEGRATION` §3).
- Non cumulable avec d'autres coupons.

### 5.2 Promotion code `LIFETIME_FOUNDER`

- Pré-applique le prix `price_navlys_lifetime` (999 €)
- `max_redemptions`: 100
- Date d'expiration : 30 juin 2026 (J+30 vs lancement)
- Affichage modal hero : "100 places à vie. Embarque maintenant."

---

## 6. Script Node.js d'init (à placer dans `_APP_NAVLYS_v1/scripts/seed-stripe-test.mjs`)

```js
/**
 * SEED STRIPE TEST — NAVLYS × NAVBIO cross-sell v1
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/seed-stripe-test.mjs
 *
 * Idempotent: cherche par lookup_key avant de créer. Réutilise si trouvé.
 */
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) {
  console.error("⚠️ Refus: clé non-TEST. Aborte.");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
});

const products = [
  // ─── NAVLYS NEXT GEN INVEST ─────────────────────────────────
  {
    productCode: "navlys_invest",
    name: "NAVLYS NEXT GEN INVEST",
    description: "Abonnement éducatif finance — Cap rêvé · Labo · Paper trading · NAV IA",
    prices: [
      { lookup: "price_navlys_early_bird",  amount: 3900,  recurring: { interval: "month" }, metadata: { plan: "early_bird", duration_months: "6" } },
      { lookup: "price_navlys_standard",    amount: 4900,  recurring: { interval: "month" }, metadata: { plan: "standard" } },
      { lookup: "price_navlys_annual",      amount: 39000, recurring: { interval: "year"  }, metadata: { plan: "annual" } },
      { lookup: "price_navlys_lifetime",    amount: 99900, metadata: { plan: "lifetime", seats: "100" } },
      { lookup: "price_navlys_student",     amount: 2400,  recurring: { interval: "month" }, metadata: { plan: "student" } },
    ],
  },
  // ─── NAVBIO LIFE — 5 formules ────────────────────────────────
  {
    productCode: "navbio_solo",
    name: "NAVBIO LIFE — Solo",
    description: "Mémoire personnelle one-shot · 50 souvenirs/mois · hébergement 5 ans inclus",
    prices: [
      { lookup: "price_navbio_solo",         amount: 1900, metadata: { formula: "solo",   memories_quota: "50",  nextgen_app: "false" } },
      { lookup: "price_navbio_solo_nextgen", amount: 2800, metadata: { formula: "solo",   memories_quota: "50",  nextgen_app: "true"  } },
    ],
  },
  {
    productCode: "navbio_couple",
    name: "NAVBIO LIFE — Couple",
    prices: [
      { lookup: "price_navbio_couple",         amount: 2900, metadata: { formula: "couple",  memories_quota: "100", nextgen_app: "false" } },
      { lookup: "price_navbio_couple_nextgen", amount: 4300, metadata: { formula: "couple",  memories_quota: "100", nextgen_app: "true"  } },
    ],
  },
  {
    productCode: "navbio_premium",
    name: "NAVBIO LIFE — Premium",
    description: "Mémoire multimédia · 250 souvenirs/mois · NEXT GEN APP inclus · hébergement 10 ans",
    prices: [
      { lookup: "price_navbio_premium", amount: 3900, metadata: { formula: "premium", memories_quota: "250", nextgen_app: "true" } },
    ],
  },
  {
    productCode: "navbio_cinema",
    name: "NAVBIO LIFE — Cinéma",
    description: "Film biographique 3-5 min · Premium inclus · 1000 souvenirs/mois",
    prices: [
      { lookup: "price_navbio_cinema", amount: 14900, metadata: { formula: "cinema", memories_quota: "1000", nextgen_app: "true" } },
    ],
  },
  {
    productCode: "navbio_pro",
    name: "NAVBIO LIFE — Pro",
    description: "3 personnes · transmission organisée · hébergement 30 ans · souvenirs illimités",
    prices: [
      { lookup: "price_navbio_pro", amount: 19900, metadata: { formula: "pro", memories_quota: "-1", nextgen_app: "true" } },
    ],
  },
  // ─── Add-ons NAVBIO ──────────────────────────────────────────
  { productCode: "navbio_hosting_5y",         name: "NAVBIO Hébergement 5 ans",          prices: [{ lookup: "price_navbio_hosting_5y",        amount: 4900,  metadata: { addon: "hosting_5y" } }] },
  { productCode: "navbio_hosting_10y",        name: "NAVBIO Hébergement 10 ans",         prices: [{ lookup: "price_navbio_hosting_10y",       amount: 9900,  metadata: { addon: "hosting_10y" } }] },
  { productCode: "navbio_hosting_perpetual",  name: "NAVBIO Hébergement perpétuel",      prices: [{ lookup: "price_navbio_hosting_perpetual", amount: 19900, metadata: { addon: "hosting_perpetual" } }] },
  { productCode: "navbio_notarial",           name: "NAVBIO Service notarial transmission", prices: [{ lookup: "price_navbio_notarial",       amount: 9900,  metadata: { addon: "notarial" } }] },
  { productCode: "navbio_translation",        name: "NAVBIO Traduction bio (par langue)", prices: [{ lookup: "price_navbio_translation",      amount: 2900,  metadata: { addon: "translation" } }] },
  { productCode: "navbio_book_print",         name: "NAVBIO Livre papier 50 exemplaires", prices: [{ lookup: "price_navbio_book_print",       amount: 19900, metadata: { addon: "book_print" } }] },
  // ─── Crédits NEXT GEN APP ────────────────────────────────────
  { productCode: "credit_mini",       name: "NEXT GEN Crédit Mini",       prices: [{ lookup: "price_credit_mini",       amount: 500,  metadata: { credit_pack: "mini",       video_min: "2",  voice_min: "10"  } }] },
  { productCode: "credit_standard",   name: "NEXT GEN Crédit Standard",   prices: [{ lookup: "price_credit_standard",   amount: 1200, metadata: { credit_pack: "standard",   video_min: "6",  voice_min: "30"  } }] },
  { productCode: "credit_pack",       name: "NEXT GEN Crédit Pack",       prices: [{ lookup: "price_credit_pack",       amount: 2500, metadata: { credit_pack: "pack",       video_min: "15", voice_min: "90"  } }] },
  { productCode: "credit_grand_pack", name: "NEXT GEN Crédit Grand Pack", prices: [{ lookup: "price_credit_grand_pack", amount: 4900, metadata: { credit_pack: "grand_pack", video_min: "35", voice_min: "240" } }] },
  // ─── Crédits souvenirs NAVBIO ────────────────────────────────
  { productCode: "memories_topup_25",  name: "NAVBIO Crédits 25 souvenirs",   prices: [{ lookup: "price_memories_solo_topup",    amount: 500,  metadata: { credit_type: "memories", units: "25"  } }] },
  { productCode: "memories_topup_50",  name: "NAVBIO Crédits 50 souvenirs",   prices: [{ lookup: "price_memories_couple_topup",  amount: 800,  metadata: { credit_type: "memories", units: "50"  } }] },
  { productCode: "memories_topup_100", name: "NAVBIO Crédits 100 souvenirs",  prices: [{ lookup: "price_memories_premium_topup", amount: 1200, metadata: { credit_type: "memories", units: "100" } }] },
  { productCode: "memories_topup_500", name: "NAVBIO Crédits 500 souvenirs",  prices: [{ lookup: "price_memories_cinema_topup",  amount: 2500, metadata: { credit_type: "memories", units: "500" } }] },
];

async function ensureProduct(item) {
  // Cherche par metadata.code (idempotent)
  const existing = await stripe.products.search({
    query: `metadata['code']:'${item.productCode}' AND active:'true'`,
    limit: 1,
  });
  let product = existing.data[0];
  if (!product) {
    product = await stripe.products.create({
      name: item.name,
      description: item.description ?? undefined,
      metadata: { code: item.productCode },
    });
    console.log(`✓ Produit créé: ${item.name} (${product.id})`);
  } else {
    console.log(`= Produit existant: ${item.name} (${product.id})`);
  }
  for (const p of item.prices) {
    const exPrice = await stripe.prices.search({
      query: `lookup_key:'${p.lookup}' AND active:'true'`,
      limit: 1,
    });
    if (exPrice.data[0]) {
      console.log(`  = Prix existant: ${p.lookup}`);
      continue;
    }
    await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount,
      currency: "eur",
      lookup_key: p.lookup,
      ...(p.recurring ? { recurring: p.recurring } : {}),
      metadata: p.metadata ?? {},
    });
    console.log(`  ✓ Prix créé: ${p.lookup} = ${p.amount / 100} €`);
  }
}

async function ensureCoupons() {
  const couponsToCreate = [
    {
      id: "NAVLYS_40",
      params: {
        percent_off: 40,
        duration: "forever",
        applies_to: { products: [] }, // rempli ci-dessous
        name: "NAVLYS Subscriber -40%",
      },
      appliesToCodes: ["navbio_solo", "navbio_couple", "navbio_premium"],
    },
  ];
  for (const c of couponsToCreate) {
    try {
      const existing = await stripe.coupons.retrieve(c.id);
      console.log(`= Coupon existant: ${c.id}`);
      continue;
    } catch {}
    const products = await Promise.all(
      c.appliesToCodes.map(code =>
        stripe.products.search({ query: `metadata['code']:'${code}'`, limit: 1 }).then(r => r.data[0]?.id)
      )
    );
    await stripe.coupons.create({ id: c.id, ...c.params, applies_to: { products: products.filter(Boolean) } });
    console.log(`✓ Coupon créé: ${c.id}`);
  }
}

async function ensurePromoCodeLifetime() {
  try {
    const list = await stripe.promotionCodes.list({ code: "LIFETIME_FOUNDER", limit: 1 });
    if (list.data[0]) {
      console.log("= Promo code existant: LIFETIME_FOUNDER");
      return;
    }
  } catch {}
  // Coupon associé à un montant fixe ?  Plus simple: créer coupon 0 % puis promo code lié au price lifetime.
  // Le price est directement vendu via Payment Link/Checkout en pointant sur `price_navlys_lifetime`.
  console.log("ℹ️ LIFETIME_FOUNDER: pas de coupon nécessaire — Payment Link pointant directement sur price_navlys_lifetime suffit. Set max_redemptions=100 dans Stripe Dashboard sur le Payment Link.");
}

(async () => {
  console.log("🚀 SEED STRIPE TEST — NAVLYS × NAVBIO");
  for (const item of products) {
    await ensureProduct(item);
  }
  await ensureCoupons();
  await ensurePromoCodeLifetime();
  console.log("\n✅ Terminé. Vérifier dans dashboard Stripe → Produits.");
})().catch(err => {
  console.error("❌", err.message);
  process.exit(1);
});
```

---

## 7. Webhooks Stripe à configurer

URL endpoint (à coller dans Dashboard Stripe → Developers → Webhooks) :

```
https://navlys.com/api/stripe/webhook
```

Events à abonner (cocher dans Stripe Dashboard) :

| Event | Effet côté NAVLYS/NAVBIO |
|---|---|
| `checkout.session.completed` | Active accès NAVLYS / délivre NAVBIO + crédite quotas |
| `customer.subscription.created` | Marque user `navlys_active=true` → permet coupon NAVLYS_40 |
| `customer.subscription.updated` | Sync plan changes (early_bird → standard à mois 6) |
| `customer.subscription.deleted` | Désactive coupon NAVLYS_40 pour achats futurs |
| `invoice.payment_failed` | Notifie Bruno + tag user en relance |
| `charge.refunded` | Décrédite quotas / révoque accès si applicable |

Le secret `whsec_...` est généré par Stripe au moment de la création du webhook, à recoller dans Vercel env var `STRIPE_WEBHOOK_SECRET`.

---

## 8. Actions Bruno (ordonnées)

1. Compte Stripe sous `bruno@navlys.com` → KYC FR auto-entrepreneur (cf. `_STRIPE_CONNEXION_PLAN.md` §S.4).
2. Activer mode TEST → récupérer `pk_test_*` et `sk_test_*`.
3. Coller dans Vercel env vars (projet `navlys-app`, scope `navlys`) :
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   NAVLYS_BASE_URL=https://navlys.com
   ```
4. **Exécuter le script seed** :
   ```bash
   cd _APP_NAVLYS_v1
   STRIPE_SECRET_KEY=sk_test_xxx node scripts/seed-stripe-test.mjs
   ```
5. Configurer webhook dashboard Stripe → endpoint `https://navlys.com/api/stripe/webhook` → copier `whsec_` → recoller dans Vercel env var `STRIPE_WEBHOOK_SECRET`.
6. Test paiement carte `4242 4242 4242 4242` exp `12/30` cvc `123` sur les 24 prices.
7. ❌ **NE PAS BASCULER LIVE** avant validation Bruno + audit Cas A/B/C de `05_UPSELL_CROISE_FLOW.md`.

---

> ⚓ 21 produits, 24 prices, 1 script, 1 webhook. Trois commandes pour tout faire tenir. Le reste est de la patience de marin.
