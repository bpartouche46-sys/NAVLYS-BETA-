# 🛠️ 04 · CODE D'INTÉGRATION — Quotas & Crédits

_TypeScript + SQL prêt à coller dans `_APP_NAVLYS_v1/` et `_APP_NAVBIO_v1/` · 29 mai 2026 · v1_

> Tout le code ci-dessous suit la charte NAVLYS (TS strict, RSC + Client, RLS Supabase, Stripe API `2025-03-31.basil`). Aucune clé en clair. Variables d'env standardisées : `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`, `NAVLYS_BASE_URL`.

---

## 1. Helpers Supabase — `_APP_NAVBIO_v1/lib/quotas.ts`

```ts
// lib/quotas.ts
import { createServerClient } from '@/lib/supabase/server';
import { Database } from '@/lib/supabase/types';

export type QuotaCategory = 'memories' | 'video_minutes' | 'voice_minutes' | 'bio_syntheses';
export type NavbioFormula = 'solo' | 'couple' | 'premium' | 'cinema' | 'pro';

export interface QuotaSnapshot {
  category: QuotaCategory;
  used: number;
  limit: number;        // -1 = illimité (Pro)
  remaining: number;    // -1 si illimité
  pct: number;          // 0-100 (0 si illimité)
  creditBalance: number;
}

export class QuotaExceededError extends Error {
  constructor(public category: QuotaCategory, public available: number) {
    super(`Quota dépassé: ${category}, disponible: ${available}`);
  }
}

function currentPeriod(): string {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString().slice(0, 10);
}

export async function getCurrentQuota(userId: string): Promise<Record<QuotaCategory, QuotaSnapshot>> {
  const sb = createServerClient();
  const period = currentPeriod();

  const { data: quota } = await sb
    .from('user_quotas')
    .select('*')
    .eq('user_id', userId)
    .eq('period_month', period)
    .maybeSingle();

  const { data: credits } = await sb
    .from('user_credits')
    .select('credit_type, balance')
    .eq('user_id', userId)
    .gt('expires_at', new Date().toISOString());

  const creditMap = new Map<string, number>(
    (credits ?? []).map(c => [c.credit_type, Number(c.balance)])
  );

  const make = (cat: QuotaCategory, used: number, limit: number): QuotaSnapshot => {
    const creditKey = cat === 'memories' ? 'memories'
                    : cat === 'video_minutes' ? 'video_minutes'
                    : cat === 'voice_minutes' ? 'voice_minutes' : 'memories';
    const credit = creditMap.get(creditKey) ?? 0;
    if (limit < 0) return { category: cat, used, limit: -1, remaining: -1, pct: 0, creditBalance: credit };
    return {
      category: cat,
      used,
      limit,
      remaining: Math.max(0, limit - used) + credit,
      pct: limit === 0 ? 0 : Math.min(100, Math.round((used / limit) * 100)),
      creditBalance: credit,
    };
  };

  return {
    memories:       make('memories',       quota?.memories_used ?? 0,       quota?.memories_limit ?? 0),
    video_minutes:  make('video_minutes',  Number(quota?.video_minutes_used ?? 0),  Number(quota?.video_minutes_limit ?? 0)),
    voice_minutes:  make('voice_minutes',  Number(quota?.voice_minutes_used ?? 0),  Number(quota?.voice_minutes_limit ?? 0)),
    bio_syntheses:  make('bio_syntheses',  quota?.bio_syntheses_used ?? 0,  quota?.bio_syntheses_limit ?? 4),
  };
}

export async function consumeQuota(userId: string, category: QuotaCategory, units: number) {
  if (units <= 0) throw new Error('units doit être > 0');
  const sb = createServerClient();
  const period = currentPeriod();
  const snap   = (await getCurrentQuota(userId))[category];

  if (snap.limit !== -1 && units > snap.remaining) {
    throw new QuotaExceededError(category, snap.remaining);
  }

  // Stratégie : consommer d'abord le monthly, ensuite les crédits
  const monthlyRemaining = snap.limit === -1 ? Infinity : Math.max(0, snap.limit - snap.used);
  const fromMonthly = Math.min(units, monthlyRemaining);
  const fromCredits = units - fromMonthly;

  const updates: Record<string, number> = {};
  updates[`${category}_used`] = snap.used + fromMonthly;
  await sb.from('user_quotas')
    .update(updates)
    .eq('user_id', userId)
    .eq('period_month', period);

  if (fromCredits > 0) {
    await sb.from('user_credits')
      .update({ balance: snap.creditBalance - fromCredits })
      .eq('user_id', userId)
      .eq('credit_type', category);
  }

  // Notif 80% / 100%
  await maybeNotifyThresholds(userId, category, snap.used + fromMonthly, snap.limit);
}

export async function purchaseCredits(params: {
  userId: string;
  creditType: QuotaCategory;
  units: number;
  stripeSessionId: string;
  stripePriceId: string;
  amountEur: number;
}) {
  const sb = createServerClient();
  const expiresAt = new Date();
  expiresAt.setUTCFullYear(expiresAt.getUTCFullYear() + 1);

  // Idempotence sur stripe_session_id
  const { data: existing } = await sb
    .from('user_credit_purchases')
    .select('id')
    .eq('stripe_session_id', params.stripeSessionId)
    .maybeSingle();
  if (existing) return; // déjà appliqué

  await sb.from('user_credit_purchases').insert({
    user_id: params.userId,
    stripe_session_id: params.stripeSessionId,
    stripe_price_id: params.stripePriceId,
    credit_type: params.creditType,
    amount_eur: params.amountEur,
    units_purchased: params.units,
    expires_at: expiresAt.toISOString(),
  });

  // Upsert balance
  await sb.rpc('increment_credit_balance', {
    p_user: params.userId,
    p_type: params.creditType,
    p_units: params.units,
    p_expires: expiresAt.toISOString(),
  });
}

async function maybeNotifyThresholds(userId: string, category: QuotaCategory, used: number, limit: number) {
  if (limit <= 0) return; // illimité, rien à faire
  const sb = createServerClient();
  const pct = (used / limit) * 100;
  const period = currentPeriod();

  for (const threshold of [80, 100]) {
    if (pct < threshold) continue;
    const { error } = await sb.from('user_quota_alerts').insert({
      user_id: userId,
      period_month: period,
      category,
      threshold_pct: threshold,
    });
    if (error && error.code !== '23505') { // 23505 = unique_violation = déjà notifié, OK
      console.error('quota alert insert error', error);
    } else if (!error) {
      // Trigger l'envoi email Resend (async, ne bloque pas)
      void fetch(`${process.env.NAVLYS_BASE_URL}/api/notif/quota`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userId, category, threshold }),
      });
    }
  }
}
```

---

## 2. RPC Supabase — `increment_credit_balance`

```sql
-- supabase/migrations/2026XXXX_increment_credit_balance.sql
CREATE OR REPLACE FUNCTION public.increment_credit_balance(
  p_user uuid,
  p_type text,
  p_units numeric,
  p_expires timestamptz
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credit_type, balance, total_purchased, last_purchase_at, expires_at)
  VALUES (p_user, p_type, p_units, p_units, now(), p_expires)
  ON CONFLICT (user_id, credit_type) DO UPDATE
  SET balance = public.user_credits.balance + EXCLUDED.balance,
      total_purchased = public.user_credits.total_purchased + EXCLUDED.total_purchased,
      last_purchase_at = EXCLUDED.last_purchase_at,
      -- expiration la PLUS LOINTAINE (le dernier achat fait foi pour les unités nouvelles)
      expires_at = GREATEST(public.user_credits.expires_at, EXCLUDED.expires_at),
      updated_at = now();
END;
$$;
```

---

## 3. API routes Next.js

### 3.1 `app/api/quotas/route.ts` — GET (snapshot temps réel)

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentQuota } from '@/lib/quotas';
import { getUser } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const quotas = await getCurrentQuota(user.id);
  return NextResponse.json({ quotas, period: new Date().toISOString().slice(0,7) });
}
```

### 3.2 `app/api/stripe/webhook/route.ts` — extraits ciblés cross-sell

```ts
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createServiceRoleClient } from '@/lib/supabase/admin';
import { purchaseCredits } from '@/lib/quotas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return new Response('no signature', { status: 400 });
  const buf = Buffer.from(await req.arrayBuffer());
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (e: any) {
    return new Response(`bad sig: ${e.message}`, { status: 400 });
  }

  const sb = createServiceRoleClient();

  switch (event.type) {

    // ── 1. NAVBIO one-shot ou crédits ────────────────────────────
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      // Lookup price
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ['data.price.product'] });
      for (const li of lineItems.data) {
        const price = li.price;
        const product = price?.product as Stripe.Product;
        const code = product?.metadata?.code;
        const meta = price?.metadata ?? {};

        // 1a. NAVBIO formula → init quotas
        if (code?.startsWith('navbio_') && meta.formula) {
          await sb.from('user_navbio_formula').upsert({
            user_id: userId,
            formula: meta.formula,
            nextgen_app: meta.nextgen_app === 'true',
            purchased_at: new Date().toISOString(),
            stripe_session_id: session.id,
          });
          // Init quota du mois courant
          await sb.rpc('init_quota_for_user', { p_user: userId, p_formula: meta.formula });
        }

        // 1b. Pack crédits NEXT GEN APP
        if (code?.startsWith('credit_')) {
          const videoMin = Number(meta.video_min ?? 0);
          const voiceMin = Number(meta.voice_min ?? 0);
          if (videoMin > 0) {
            await purchaseCredits({
              userId, creditType: 'video_minutes', units: videoMin,
              stripeSessionId: session.id, stripePriceId: price!.id,
              amountEur: (price!.unit_amount ?? 0) / 100,
            });
          }
          if (voiceMin > 0) {
            await purchaseCredits({
              userId, creditType: 'voice_minutes', units: voiceMin,
              stripeSessionId: session.id + '-voice', stripePriceId: price!.id,
              amountEur: 0,
            });
          }
        }

        // 1c. Crédits souvenirs NAVBIO
        if (code?.startsWith('memories_topup_') && meta.units) {
          await purchaseCredits({
            userId, creditType: 'memories', units: Number(meta.units),
            stripeSessionId: session.id, stripePriceId: price!.id,
            amountEur: (price!.unit_amount ?? 0) / 100,
          });
        }
      }
      break;
    }

    // ── 2. NAVLYS abonnement activé ──────────────────────────────
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.user_id;
      if (!userId) break;
      const active = ['active', 'trialing'].includes(sub.status);
      await sb.from('user_navlys_subscription').upsert({
        user_id: userId,
        stripe_subscription_id: sub.id,
        status: sub.status,
        active,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      });
      break;
    }

    // ── 3. NAVLYS abonnement résilié ─────────────────────────────
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await sb.from('user_navlys_subscription')
        .update({ active: false, status: 'canceled' })
        .eq('stripe_subscription_id', sub.id);
      break;
    }

    case 'invoice.payment_failed': {
      // Notif Bruno via Resend
      const invoice = event.data.object as Stripe.Invoice;
      void fetch(`${process.env.NAVLYS_BASE_URL}/api/notif/payment-failed`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ invoiceId: invoice.id, amount: invoice.amount_due, customer: invoice.customer }),
      });
      break;
    }
  }

  return Response.json({ received: true });
}
```

---

## 4. Composants UI

### 4.1 `components/QuotaBar.tsx`

```tsx
'use client';
import { QuotaSnapshot } from '@/lib/quotas';

export interface QuotaBarProps {
  label: string;
  unit: string;
  snapshot: QuotaSnapshot;
  variant?: 'memories' | 'video' | 'voice' | 'bio';
}

const colorFor = (pct: number, limit: number) => {
  if (limit < 0) return 'bg-gradient-to-r from-bronze-500 to-gold-500';
  if (pct < 80) return 'bg-gradient-to-r from-bronze-500 to-gold-400';
  if (pct < 100) return 'bg-gradient-to-r from-amber-400 to-amber-600';
  return 'bg-gradient-to-r from-red-500 to-red-700';
};

export function QuotaBar({ label, unit, snapshot }: QuotaBarProps) {
  const { used, limit, pct, creditBalance } = snapshot;
  const isUnlimited = limit < 0;
  return (
    <div className="rounded-2xl border border-pearl-200/30 bg-night-900/60 p-5 shadow-lg">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-cinzel text-gold-400 text-lg tracking-wide">{label}</h3>
        <span className="font-jetbrains text-pearl-100 text-sm">
          {isUnlimited
            ? `${used} ${unit} · illimité`
            : `${used} / ${limit} ${unit}`}
          {creditBalance > 0 && (
            <span className="ml-2 text-ice-300">+ {creditBalance} crédits</span>
          )}
        </span>
      </div>
      {!isUnlimited && (
        <div className="h-3 w-full rounded-full bg-night-700 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ${colorFor(pct, limit)}`}
            style={{ width: `${Math.min(100, pct)}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label}: ${pct}%`}
          />
        </div>
      )}
      {pct >= 80 && !isUnlimited && (
        <p className="mt-3 text-sm font-cormorant text-amber-300 italic">
          {pct >= 100
            ? '⚠️ Cap atteint pour ce mois. Achète des crédits ou attends le 1ᵉʳ.'
            : `⚓ Tu approches la limite (${pct} %).`}
        </p>
      )}
    </div>
  );
}
```

### 4.2 `components/UpgradeOrCredit.tsx`

```tsx
'use client';
import { useState } from 'react';
import { QuotaCategory } from '@/lib/quotas';

interface Props {
  open: boolean;
  category: QuotaCategory;
  currentFormula: 'solo'|'couple'|'premium'|'cinema'|'pro';
  onClose: () => void;
}

const UPGRADE_TARGETS: Record<string, { next: string; price: number; lookup: string } | null> = {
  solo:    { next: 'Couple',  price: 29, lookup: 'price_navbio_couple' },
  couple:  { next: 'Premium', price: 39, lookup: 'price_navbio_premium' },
  premium: { next: 'Cinéma',  price: 149, lookup: 'price_navbio_cinema' },
  cinema:  { next: 'Pro',     price: 199, lookup: 'price_navbio_pro' },
  pro:     null,
};

const TOPUP_LOOKUP: Record<QuotaCategory, string> = {
  memories: 'price_memories_premium_topup',
  video_minutes: 'price_credit_standard',
  voice_minutes: 'price_credit_standard',
  bio_syntheses: 'price_navbio_premium', // pas de top-up dédié → upgrade
};

export function UpgradeOrCredit({ open, category, currentFormula, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  if (!open) return null;
  const upgrade = UPGRADE_TARGETS[currentFormula];

  const buy = async (lookup: string, mode: 'payment'|'subscription' = 'payment') => {
    setLoading(true);
    const r = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lookup, mode }),
    });
    const { url } = await r.json();
    window.location.href = url;
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/80 backdrop-blur">
      <div className="max-w-lg w-full mx-4 rounded-3xl border border-gold-500/40 bg-night-900 p-8 shadow-2xl">
        <h2 className="font-cinzel text-2xl text-gold-400 mb-4">Cap atteint pour ce mois</h2>
        <p className="font-cormorant text-pearl-100 mb-6 leading-relaxed">
          Trois routes possibles. Aucune meilleure que les autres — tu choisis selon ta navigation.
        </p>
        <div className="space-y-3">
          <button
            disabled={loading}
            onClick={() => buy(TOPUP_LOOKUP[category])}
            className="w-full text-left rounded-xl border border-ice-400/30 bg-night-800 hover:bg-night-700 p-4 transition"
          >
            <div className="font-cinzel text-ice-200">🛒 Acheter des crédits supplémentaires</div>
            <div className="font-cormorant text-pearl-300 text-sm">Crédits utilisables 12 mois.</div>
          </button>
          {upgrade && (
            <button
              disabled={loading}
              onClick={() => buy(upgrade.lookup)}
              className="w-full text-left rounded-xl border border-bronze-400/30 bg-night-800 hover:bg-night-700 p-4 transition"
            >
              <div className="font-cinzel text-bronze-300">⬆️ Upgrader vers {upgrade.next} — {upgrade.price} €</div>
              <div className="font-cormorant text-pearl-300 text-sm">Différence calculée auto. Le NEXT GEN APP devient inclus si Premium+.</div>
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full text-left rounded-xl border border-pearl-200/20 bg-night-800/50 hover:bg-night-700 p-4 transition"
          >
            <div className="font-cinzel text-pearl-200">⏳ Attendre le 1ᵉʳ du mois</div>
            <div className="font-cormorant text-pearl-300 text-sm">Quota remis à zéro automatiquement.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 4.3 Hook React `useQuotas`

```tsx
'use client';
import useSWR from 'swr';

const fetcher = (u: string) => fetch(u).then(r => r.json());

export function useQuotas() {
  const { data, error, mutate } = useSWR('/api/quotas', fetcher, {
    refreshInterval: 30_000, // refresh toutes les 30s
  });
  return { quotas: data?.quotas, error, refresh: mutate };
}
```

---

## 5. Email notifications (template Resend)

```ts
// app/api/notif/quota/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { userId, category, threshold } = await req.json();
  // ... fetch user.email + lang
  const lang = 'fr';
  const subject = lang === 'fr'
    ? `⚓ NAVBIO · ${threshold}% atteint sur ${category}`
    : `⚓ NAVBIO · ${threshold}% reached on ${category}`;
  const html = lang === 'fr'
    ? `<p>Cap ${threshold}% atteint ce mois. Trois choix t'attendent dans ton dashboard : <a href="${process.env.NAVLYS_BASE_URL}/dashboard/quotas">Mes quotas</a>.</p>`
    : `<p>${threshold}% cap reached this month. Three choices await you: <a href="${process.env.NAVLYS_BASE_URL}/dashboard/quotas">My quotas</a>.</p>`;
  await resend.emails.send({
    from: 'NAVBIO <bruno@navlys.com>',
    to: ['user@example.com'], // fetch
    subject, html,
  });
  return NextResponse.json({ ok: true });
}
```

---

## 6. Tests unitaires (Jest)

```ts
// __tests__/quotas.test.ts
import { consumeQuota, QuotaExceededError } from '@/lib/quotas';

jest.mock('@/lib/supabase/server');

describe('consumeQuota', () => {
  it('consomme le mensuel en priorité', async () => {
    // setup mocks user_quotas memories_used=10, limit=50, credits=20
    await expect(consumeQuota('user-1', 'memories', 30)).resolves.toBeUndefined();
    // memories_used doit passer à 40 (10+30 du mensuel), crédits inchangés
  });
  it('bascule sur crédits quand mensuel épuisé', async () => {
    // memories_used=50, limit=50, credits=10
    await consumeQuota('user-1', 'memories', 5);
    // credits doit passer à 5
  });
  it('lève QuotaExceededError quand tout est épuisé', async () => {
    await expect(consumeQuota('user-1', 'memories', 1000)).rejects.toThrow(QuotaExceededError);
  });
});
```

---

## 7. Variables d'environnement (récap `.env.template` à ajouter)

```bash
# NAVLYS × NAVBIO Pricing v1
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NAVLYS_BASE_URL=https://navlys.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend
RESEND_API_KEY=re_...

# APIs IA (NEXT GEN APP)
HEYGEN_API_KEY=...
ELEVENLABS_API_KEY=...
```

---

## 8. Migration SQL complète à exécuter (récapitulatif)

```sql
-- 1. user_quotas (cf. 02_SYSTEME_QUOTAS §1.1)
-- 2. user_credits (cf. 02 §1.2)
-- 3. user_credit_purchases (cf. 02 §1.3)
-- 4. user_quota_alerts (cf. 02 §1.4)

-- 5. user_navbio_formula (lie un user à sa formule active)
CREATE TABLE IF NOT EXISTS public.user_navbio_formula (
  user_id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  formula           text NOT NULL CHECK (formula IN ('solo','couple','premium','cinema','pro')),
  nextgen_app       boolean NOT NULL DEFAULT false,
  purchased_at      timestamptz NOT NULL DEFAULT now(),
  stripe_session_id text NOT NULL
);

-- 6. user_navlys_subscription (statut abonnement NAVLYS)
CREATE TABLE IF NOT EXISTS public.user_navlys_subscription (
  user_id                uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE NOT NULL,
  status                 text NOT NULL,
  active                 boolean NOT NULL DEFAULT false,
  current_period_end     timestamptz NOT NULL
);

-- 7. user_addons (hébergement, notarial, etc.)
CREATE TABLE IF NOT EXISTS public.user_addons (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  addon             text NOT NULL,
  stripe_session_id text NOT NULL,
  purchased_at      timestamptz NOT NULL DEFAULT now()
);

-- 8. RPC init_quota_for_user
CREATE OR REPLACE FUNCTION public.init_quota_for_user(p_user uuid, p_formula text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_quotas (
    user_id, navbio_formula, period_month,
    memories_limit, video_minutes_limit, voice_minutes_limit
  ) VALUES (
    p_user, p_formula, date_trunc('month', now())::date,
    CASE p_formula WHEN 'solo' THEN 50 WHEN 'couple' THEN 100 WHEN 'premium' THEN 250
                   WHEN 'cinema' THEN 1000 WHEN 'pro' THEN 2147483647 END,
    CASE WHEN p_formula IN ('premium','cinema','pro') THEN 5 ELSE 0 END,
    CASE WHEN p_formula IN ('premium','cinema','pro') THEN 30 ELSE 0 END
  )
  ON CONFLICT (user_id, period_month) DO NOTHING;
END;
$$;

-- 9. Cron reset mensuel (cf. 02 §3)
SELECT cron.schedule('reset-quotas-monthly', '0 0 1 * *',
  $$ SELECT public.reset_user_quotas(); $$);
```

---

> ⚓ Le code n'est qu'une suite de gestes simples : compte, additionne, affiche, prévient. Mais chaque ligne porte une promesse G1 : pas de piège, pas de chiffre caché, pas de notification de dernière minute.
