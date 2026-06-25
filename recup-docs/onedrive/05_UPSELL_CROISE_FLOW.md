# 🔁 05 · UPSELL CROISÉ — Parcours utilisateur

_Spec UX/UI · 29 mai 2026 · v1 · cohérent avec moteur Mission #3 (7 profils)_

> Trois cas canoniques couvrent 95 % des parcours. Tous respectent G1 : aucune pression, aucun dark pattern, sortie facile, prix toujours transparents.

---

## 0. Principes G1 upsell

1. **Pas d'opt-in caché**. Le cross-sell propose, l'utilisateur dispose.
2. **Pas d'urgence artificielle**. Pas de countdown faux. Le countdown 31/05 = countdown réel de lancement, pas un timer de panier.
3. **Sortie facile à 1 clic**. Modal upsell = bouton "Non merci" toujours plus gros qu'il n'est nécessaire.
4. **Prix barré honnête**. Si on affiche "-40 %", c'est vraiment 40 % de la grille publique, pas un prix gonflé puis remis.
5. **Sourcing transparent**. Toujours dire pourquoi le tarif réduit s'applique ("Tu es abonné NAVLYS, voici ton tarif équipage.").

---

## CAS A — Nouvel utilisateur arrive sur navlys.com

### A.1 Parcours

```
1. Landing navlys.com → CTA "Embarque pour 14 jours gratuits"
2. Signup (magic link Supabase) → Onboarding 7 écrans (Mission #3)
3. Choix plan : Early Bird 39 €/mois (par défaut, vagues 1-2)
4. Stripe Checkout → success
5. Webhook customer.subscription.created → user.navlys_active = true
6. Redirection /dashboard
   └─ Banner verte : "Bienvenue à bord, Capitaine."
   └─ Email Resend : "Tu as accès à NAVBIO à prix équipage."
7. Sur le dashboard :
   └─ Card "Capture aussi tes souvenirs" (bronze/ice)
      → "NAVBIO Solo 12 € (au lieu de 19 €) · ton tarif équipage NAVLYS"
      → CTA : "Voir mes options NAVBIO"
8. Clic CTA → Stripe Checkout pré-rempli avec coupon NAVLYS_40 auto
```

### A.2 Wireframe card NAVBIO sur dashboard NAVLYS

```
┌──────────────────────────────────────────────────────────────┐
│  ⚓ La mémoire de tes navigations                            │
│  ───────────────────────────────                             │
│  Tu es équipage NAVLYS → ton tarif NAVBIO :                  │
│                                                              │
│  Solo     12 € (au lieu de 19 €) · -40 %                     │
│  Couple   18 € (au lieu de 29 €)                             │
│  Premium  24 € (au lieu de 39 €) — NEXT GEN APP inclus       │
│                                                              │
│  [ Découvrir NAVBIO →  ]    [ Plus tard ]                    │
└──────────────────────────────────────────────────────────────┘
```

### A.3 Email Resend (FR)

**Objet** : `⚓ Ton tarif équipage NAVBIO est activé`

```
Salut {prenom},

Bienvenue à bord de NAVLYS NEXT GEN INVEST.

Comme tu es équipage maintenant, NAVBIO — l'autre projet de la
maison — t'ouvre son tarif équipage :

  • Solo    12 € (-40 %)
  • Couple  18 € (-40 %)
  • Premium 24 € (-40 %, inclut NEXT GEN APP : ta voix clonée
            et ton avatar IA pour présenter ta bio)

Aucune urgence. Le tarif reste tant que tu es abonné NAVLYS.

→ Voir mes options NAVBIO : {url}

⚓ Bruno
```

### A.4 Code applicatif

```tsx
// app/dashboard/page.tsx — extrait
import { NavbioCrossSell } from '@/components/cross-sell/NavbioCrossSell';
import { getUserSubscriptionStatus } from '@/lib/subscriptions';

export default async function Dashboard() {
  const user = await getCurrentUser();
  const sub = await getUserSubscriptionStatus(user.id);
  const showCrossSell = sub.active && !sub.user.has_navbio_formula;
  return (
    <main>
      {/* ... cartes principales ... */}
      {showCrossSell && <NavbioCrossSell userId={user.id} />}
    </main>
  );
}
```

---

## CAS B — Nouvel utilisateur arrive sur navbio.navlys.com

### B.1 Parcours

```
1. Landing navbio.navlys.com → CTA "Capture ta vie en 19 €"
2. Choix formule (Solo / Couple / Premium / Cinéma / Pro)
3. Si Solo ou Couple sélectionnés → Modal upsell NEXT GEN APP
   ┌────────────────────────────────────────────────────────┐
   │  🎤 Ajoute NEXT GEN APP                                │
   │  ─────────────────────                                 │
   │  Pour +9 € (Solo) / +14 € (Couple), tu reçois :        │
   │   • Le clonage de ta voix (ElevenLabs)                 │
   │   • Un avatar IA présentant ta biographie (HeyGen)     │
   │   • 5 min vidéo + 30 min voix par mois                 │
   │                                                        │
   │  Aussi disponible plus tard depuis Mes Paramètres.    │
   │                                                        │
   │  [ ✓ Oui, ajouter — 28 € total ]                       │
   │  [   Non merci — 19 € seul    ]                        │
   └────────────────────────────────────────────────────────┘
4. Stripe Checkout (price_navbio_solo OU price_navbio_solo_nextgen)
5. success → webhook init quotas → /vies (NAVBIO dashboard)
6. Si abo NAVLYS pas actif → bannière "Et la finance ?
   NAVLYS NEXT GEN INVEST 14 jours gratuit · Early Bird 39 €/mois"
```

### B.2 Wireframe modal NEXT GEN APP

```
┌─────────────────────────────────────────────────────────────┐
│  🎙️ TA VOIX. TON AVATAR. TON HÉRITAGE.                       │
│                                                             │
│  NEXT GEN APP transforme ta bio NAVBIO en présentation      │
│  vidéo où c'est TOI qui parles — voix et avatar.            │
│                                                             │
│  ┌─ Aperçu animé avatar Bruno parlant (10 s) ─┐             │
│  │ [vidéo MP4 muet auto-play]                │              │
│  └────────────────────────────────────────────┘             │
│                                                             │
│  +9 €  →  Solo 28 € total                                   │
│         🎤 5 min vidéo IA / mois                            │
│         🗣️ 30 min voix clonée / mois                        │
│         🔄 Crédits suppl. disponibles                       │
│                                                             │
│  ☑ Consentement biométrique explicite RGPD                  │
│  ─────────────────────────────────────────                  │
│                                                             │
│  [ ✓ Ajouter pour 28 € ]    [ Non merci pour 19 € ]         │
│                                                             │
│  Décision réversible : ajout possible plus tard.            │
└─────────────────────────────────────────────────────────────┘
```

### B.3 Bannière inverse NAVBIO → NAVLYS (post-paiement Solo/Couple)

```
┌──────────────────────────────────────────────────────────────┐
│  ⚓ Et ta navigation financière ?                            │
│                                                              │
│  NAVLYS NEXT GEN INVEST t'aide à mettre tes finances         │
│  sur une route éducative claire — sans conseil personnalisé. │
│                                                              │
│  Essai 14 jours gratuit · puis Early Bird 39 €/mois          │
│                                                              │
│  Bonus équipage : ton NAVBIO repasse à 12 € (Solo) /         │
│  18 € (Couple) / 24 € (Premium) à vie tant que tu es abonné. │
│                                                              │
│  [ Découvrir NAVLYS → ]    [ Plus tard ]                     │
└──────────────────────────────────────────────────────────────┘
```

⚠️ Cette bannière apparaît **après** la confirmation NAVBIO, jamais avant — on ne pollue pas l'acte d'achat principal.

### B.4 Code applicatif (modal NEXT GEN APP)

```tsx
// components/checkout/NextGenAppModal.tsx
'use client';
import { useState } from 'react';

export function NextGenAppModal({
  formula,
  basePrice,
  optionPrice,
  onChoose,
}: {
  formula: 'solo'|'couple';
  basePrice: number;
  optionPrice: number;
  onChoose: (withOption: boolean) => void;
}) {
  const total = basePrice + optionPrice;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-night-950/85 flex items-center justify-center backdrop-blur">
      <div className="max-w-md w-full mx-4 rounded-3xl border border-gold-500/40 bg-night-900 p-8 shadow-2xl">
        <h2 className="font-cinzel text-2xl text-gold-300 mb-3">🎙️ Ta voix. Ton avatar. Ton héritage.</h2>
        <p className="font-cormorant text-pearl-100 leading-relaxed mb-5">
          NEXT GEN APP transforme ta bio en présentation vidéo où c'est <em>toi</em> qui parles.
        </p>
        <ul className="font-jetbrains text-sm text-ice-200 space-y-1 mb-6">
          <li>🎤 5 min vidéo IA / mois</li>
          <li>🗣️ 30 min voix clonée / mois</li>
          <li>🔄 Crédits supplémentaires disponibles</li>
        </ul>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onChoose(true)}
            className="rounded-xl bg-gradient-to-r from-bronze-500 to-gold-500 px-5 py-3 font-cinzel text-night-950 hover:scale-[1.02] transition"
          >
            ✓ Ajouter pour {total} €
          </button>
          <button
            onClick={() => onChoose(false)}
            className="rounded-xl border border-pearl-300/30 px-5 py-3 font-cormorant text-pearl-100 hover:bg-night-800"
          >
            Non merci — {basePrice} € seul
          </button>
        </div>
        <p className="mt-4 text-xs font-cormorant italic text-pearl-300 text-center">
          Décision réversible. Ajout possible plus tard depuis Mes Paramètres.
        </p>
      </div>
    </div>
  );
}
```

---

## CAS C — Upgrade entre formules NAVBIO

### C.1 Parcours

```
1. User NAVBIO Solo (a payé 19 €)
2. Va dans /parametres/abonnement
3. Voit "Tu utilises 95 % de tes 50 souvenirs depuis 3 mois"
4. Voit panneau "Évoluer" :
   ┌────────────────────────────────────────────────────────┐
   │  Solo → Couple    +10 € (1 fois)   100 souvenirs/mois  │
   │  Solo → Premium   +20 € (1 fois)   250 souvenirs/mois  │
   │                                    + NEXT GEN APP      │
   │  Solo → Cinéma    +130 € (1 fois)  1000 souvenirs/mois │
   │  Solo → Pro       +180 € (1 fois)  illimité            │
   └────────────────────────────────────────────────────────┘
5. Clic "Solo → Premium" → Stripe Checkout 20 € (delta)
6. Webhook checkout.session.completed :
   - Update user_navbio_formula (solo → premium)
   - Update user_quotas.memories_limit (50 → 250)
   - Active NEXT GEN APP (video_minutes_limit 0 → 5)
7. Email confirmation : "Tu navigues maintenant en Premium."
```

### C.2 Tarification du delta (logique métier)

Le prix payé pour le **passage** = `prix_formule_cible - prix_formule_origine` (peu importe que l'option NEXT GEN APP était présente ou non sur la formule d'origine — Bruno simplifie).

| De → Vers | Delta full | Delta avec discount NAVLYS_40 |
|---|---|---|
| Solo → Couple | 10 € | 6 € |
| Solo → Premium | 20 € | 12 € |
| Solo → Cinéma | 130 € | 130 € (Cinéma = full price) |
| Solo → Pro | 180 € | 180 € |
| Couple → Premium | 10 € | 6 € |
| Couple → Cinéma | 120 € | 120 € |
| Couple → Pro | 170 € | 170 € |
| Premium → Cinéma | 110 € | 110 € |
| Premium → Pro | 160 € | 160 € |
| Cinéma → Pro | 50 € | 50 € |

> Discount NAVLYS_40 s'applique uniquement aux passages **vers Solo/Couple/Premium** (cohérent §3 du fichier `01_MATRICE`).

### C.3 Code applicatif

```tsx
// app/parametres/abonnement/page.tsx — extrait
import { computeUpgradeOptions } from '@/lib/upgrades';

export default async function AbonnementPage() {
  const user = await getCurrentUser();
  const currentFormula = await getCurrentFormula(user.id);
  const isNavlysActive = await getNavlysActive(user.id);
  const options = computeUpgradeOptions(currentFormula, isNavlysActive);
  return (
    <main>
      <h1 className="font-cinzel text-3xl text-gold-300">Évoluer</h1>
      <p className="font-cormorant text-pearl-200">
        Tu es actuellement en <strong>{currentFormula}</strong>. Voici les caps possibles.
      </p>
      <ul>
        {options.map(opt => (
          <li key={opt.targetFormula} className="rounded-xl border border-bronze-500/30 p-4 my-3">
            <div className="flex justify-between">
              <span>{currentFormula} → {opt.targetFormula}</span>
              <span className="font-jetbrains text-gold-300">+{opt.deltaEur} €</span>
            </div>
            <button onClick={() => startCheckout(opt.lookupKey)}>Évoluer</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

```ts
// lib/upgrades.ts
export function computeUpgradeOptions(current: string, navlysActive: boolean) {
  const order = ['solo','couple','premium','cinema','pro'];
  const prices = { solo:19, couple:29, premium:39, cinema:149, pro:199 };
  const idx = order.indexOf(current);
  return order.slice(idx + 1).map(target => {
    let delta = prices[target] - prices[current];
    if (navlysActive && ['couple','premium'].includes(target)) {
      // Le target sera facturé avec discount NAVLYS_40,
      // donc le delta réel à payer = prixCible*0.6 - prixOrigine*déjà payé
      delta = Math.round(prices[target] * 0.6 - prices[current]);
      if (delta < 0) delta = 0;
    }
    return {
      targetFormula: target,
      deltaEur: delta,
      lookupKey: `price_navbio_${target}`,
    };
  });
}
```

---

## CAS D (bonus) — Acheter des crédits suppl. depuis dashboard

```
1. User NAVBIO Solo, 80 % souvenirs utilisés
2. Bannière orange dashboard "Tu approches la limite"
3. Clic "Acheter crédits" → modale CreditPicker
4. Choix : 25 souvenirs (5 €) / 50 (8 €) / 100 (12 €)
5. Stripe Checkout one-shot
6. Webhook → user_credit_purchases insert + balance += units
7. Dashboard refresh → barre se rallonge avec crédits visibles
```

---

## 6. Tracking analytique (RGPD-friendly)

Tous les événements upsell sont loggés dans Supabase `events` (zéro tracker tiers tant que Bruno n'a pas validé les CNIL forms) :

```sql
CREATE TABLE IF NOT EXISTS public.events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type    text NOT NULL,
  metadata      jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);
```

Events à logger :
- `cross_sell_card_viewed` (NAVLYS → NAVBIO)
- `cross_sell_card_clicked`
- `nextgen_modal_shown`
- `nextgen_modal_accepted` / `nextgen_modal_declined`
- `upgrade_initiated` (formule_from, formule_to)
- `upgrade_completed`
- `topup_credits_initiated`
- `topup_credits_completed`

Ces métriques permettent de mesurer le taux de conversion réel **par segment Cartographe Mission #3**.

---

## 7. Tests E2E Playwright (squelettes)

```ts
// tests/e2e/cross-sell.spec.ts
import { test, expect } from '@playwright/test';

test('CAS A: abonné NAVLYS voit la card NAVBIO discount', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByText('Tu es équipage NAVLYS').waitFor();
  await expect(page.getByText('12 € (au lieu de 19 €)')).toBeVisible();
});

test('CAS B: choix NAVBIO Solo affiche modal NEXT GEN APP', async ({ page }) => {
  await page.goto('/navbio/checkout?formula=solo');
  await expect(page.getByRole('dialog', { name: /next gen app/i })).toBeVisible();
  await page.getByText('Non merci').click();
  await expect(page.getByText('Stripe')).toBeVisible(); // redirige sans option
});

test('CAS C: upgrade Solo → Premium calcule delta correct', async ({ page }) => {
  await page.goto('/parametres/abonnement');
  await expect(page.getByText('+20 €')).toBeVisible(); // sans NAVLYS
});
```

---

> ⚓ Trois cas, trois respirations. L'utilisateur arrive, choisit, change d'avis. À chaque point, on lui dit clairement où il est et où il peut aller. Rien d'autre.
