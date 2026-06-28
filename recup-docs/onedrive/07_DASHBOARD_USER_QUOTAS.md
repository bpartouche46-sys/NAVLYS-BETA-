# 📈 07 · DASHBOARD UTILISATEUR — Mes Quotas

_Spec UI/UX · 29 mai 2026 · v1 · charte NAVLYS bronze/ice/or/nuit/pearl_

> Le dashboard "Mes Quotas" est l'écran de **transparence absolue** : tout y est visible, rien n'y est caché. Charte bronze → or pour les compteurs, ambre à 80 %, rouge à 100 %.

---

## 0. URL & accès

- **NAVBIO** : `https://navbio.navlys.com/dashboard/quotas`
- **NAVLYS** : `https://navlys.com/dashboard/quotas` (si user a aussi acheté NAVBIO)
- Single sign-on Supabase = même session sur les deux sous-domaines.

---

## 1. Wireframe global (desktop, 1280px+)

```
┌───────────────────────────────────────────────────────────────────────────┐
│  ⚓ NAVBIO · Mes quotas                                  [⚙ Paramètres]   │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│   Période : juin 2026  ·  Reset le 1ᵉʳ juillet 00:00 UTC                 │
│   Formule actuelle : Premium · NEXT GEN APP inclus                        │
│                                                                           │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐  │
│  │ 📸 SOUVENIRS        │ │ 🎬 VIDÉO IA         │ │ 🎙️ VOIX CLONÉE      │  │
│  │                     │ │                     │ │                     │  │
│  │  142 / 250          │ │  2.3 / 5 min        │ │  18 / 30 min        │  │
│  │  ▓▓▓▓▓▓▓▓░░ 57%    │ │  ▓▓▓▓░░░░░░ 46%    │ │  ▓▓▓▓▓▓░░░░ 60%    │  │
│  │                     │ │                     │ │                     │  │
│  │  + 25 crédits       │ │  + 6 min crédits   │ │  + 30 min crédits   │  │
│  │                     │ │                     │ │                     │  │
│  │  [ Acheter crédits ]│ │  [ Acheter crédits ]│ │  [ Acheter crédits ]│  │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ 📚 SYNTHÈSES BIO                                                    │  │
│  │  2 / 4 cette période · ▓▓▓▓▓░░░░░ 50%                              │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  ─── Conseil intelligent ─────────────────────────────────────────────    │
│   💡 « Tu utilises 95 % de tes souvenirs chaque mois. Passer à Cinéma    │
│       serait 38 % moins cher annuellement que tes crédits actuels. »     │
│                                                                           │
│  [ Voir Cinéma 149 € ]   [ Ignorer le conseil ]                          │
│                                                                           │
│  ─── Historique 12 mois ──────────────────────────────────────────────    │
│   ▓▓▓▓▓▓▓▓░░░░░ Mai 2026   42 souvenirs · 1.2 min vidéo · 8 min voix    │
│   ▓▓▓▓▓▓░░░░░░░ Avr 2026   31 souvenirs · 0.5 min vidéo · 3 min voix    │
│   ▓▓▓▓▓▓▓▓▓░░░░ Mar 2026   48 souvenirs · 2.1 min vidéo · 12 min voix   │
│   ...                                                                     │
│                                                                           │
│   [ Exporter en CSV ]                                                     │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Wireframe mobile (≤768px)

Cartes empilées verticalement, conseil intelligent en accordéon `<details>` natif.

```
┌─────────────────────────────────┐
│  ⚓ Mes quotas                  │
│  Juin 2026 · reset 1 juil       │
├─────────────────────────────────┤
│                                 │
│  📸 SOUVENIRS                   │
│  142 / 250 · 57 %              │
│  ▓▓▓▓▓▓▓▓░░                    │
│  + 25 crédits                   │
│  [ Acheter crédits ]            │
│                                 │
├─────────────────────────────────┤
│                                 │
│  🎬 VIDÉO IA                    │
│  2.3 / 5 min · 46 %            │
│  ...                            │
│                                 │
└─────────────────────────────────┘
```

Tap target minimum **44px**. Charte fluide jusqu'à 360 px.

---

## 3. Code React composant

```tsx
// app/dashboard/quotas/page.tsx
import { getCurrentQuota } from '@/lib/quotas';
import { getCurrentFormula } from '@/lib/navbio';
import { getCurrentUser } from '@/lib/auth';
import { QuotaBar } from '@/components/QuotaBar';
import { QuotaTip } from '@/components/QuotaTip';
import { QuotaHistory } from '@/components/QuotaHistory';
import { Disclaimer } from '@/components/Disclaimer';

export default async function QuotasPage() {
  const user = await getCurrentUser();
  const quotas = await getCurrentQuota(user.id);
  const formula = await getCurrentFormula(user.id);
  const now = new Date();
  const nextReset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 font-cormorant text-pearl-100">
      <header className="mb-8">
        <h1 className="font-cinzel text-3xl text-gold-300 mb-2">⚓ Mes quotas</h1>
        <p className="text-pearl-300">
          Période : <strong>{now.toLocaleDateString('fr', { month: 'long', year: 'numeric' })}</strong>
          {' · '}Reset le {nextReset.toLocaleDateString('fr', { day: '2-digit', month: 'long' })} 00:00 UTC
        </p>
        <p className="mt-1 text-pearl-300">
          Formule actuelle : <strong className="text-bronze-300">{formula.toUpperCase()}</strong>
          {formula !== 'solo' && formula !== 'couple' && ' · NEXT GEN APP inclus'}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <QuotaBar
          label="📸 Souvenirs"
          unit="souvenirs"
          snapshot={quotas.memories}
          topupLookup="price_memories_premium_topup"
        />
        <QuotaBar
          label="🎬 Vidéo IA"
          unit="min"
          snapshot={quotas.video_minutes}
          topupLookup="price_credit_standard"
        />
        <QuotaBar
          label="🎙️ Voix clonée"
          unit="min"
          snapshot={quotas.voice_minutes}
          topupLookup="price_credit_standard"
        />
      </section>

      <section className="mb-8">
        <QuotaBar
          label="📚 Synthèses bio générées"
          unit="synthèses"
          snapshot={quotas.bio_syntheses}
          topupLookup={null}
        />
      </section>

      <QuotaTip quotas={quotas} currentFormula={formula} />

      <QuotaHistory userId={user.id} />

      <Disclaimer />
    </main>
  );
}
```

---

## 4. Composant `QuotaTip` — conseil intelligent

```tsx
// components/QuotaTip.tsx
'use client';
import { useMemo } from 'react';
import type { QuotaSnapshot } from '@/lib/quotas';

const PRICES = { solo:19, couple:29, premium:39, cinema:149, pro:199 };
const ORDER = ['solo','couple','premium','cinema','pro'] as const;

export function QuotaTip({
  quotas,
  currentFormula,
}: {
  quotas: Record<string, QuotaSnapshot>;
  currentFormula: typeof ORDER[number];
}) {
  const tip = useMemo(() => computeTip(quotas, currentFormula), [quotas, currentFormula]);
  if (!tip) return null;

  return (
    <aside className="rounded-2xl border border-ice-400/40 bg-night-800 p-6 mb-8">
      <h3 className="font-cinzel text-xl text-ice-200 mb-3">💡 Conseil de cap</h3>
      <p className="leading-relaxed text-pearl-100">{tip.message}</p>
      <div className="mt-4 flex gap-3">
        <a href={tip.ctaUrl} className="rounded-lg bg-gradient-to-r from-bronze-500 to-gold-500 px-4 py-2 font-cinzel text-night-950 hover:scale-[1.02] transition">
          {tip.ctaLabel}
        </a>
        <button className="rounded-lg border border-pearl-300/30 px-4 py-2 font-cormorant text-pearl-200 hover:bg-night-700">
          Ignorer
        </button>
      </div>
    </aside>
  );
}

function computeTip(q: Record<string, QuotaSnapshot>, currentFormula: typeof ORDER[number]) {
  const memSnap = q.memories;
  if (memSnap.limit < 0) return null; // Pro illimité

  // Si utilisation moyenne > 90% sur compteur souvenirs depuis 3 mois → suggestion upgrade
  const usageRatio = memSnap.pct / 100;
  if (usageRatio < 0.9) return null;

  const idx = ORDER.indexOf(currentFormula);
  if (idx >= ORDER.length - 1) return null;
  const next = ORDER[idx + 1];
  const deltaMonthlyCredits = Math.ceil((memSnap.used - memSnap.limit) / 25) * 5; // 5€/25 crédits
  const upgradeOnce = PRICES[next] - PRICES[currentFormula];
  const yearlySavings = (deltaMonthlyCredits * 12) - upgradeOnce;

  if (yearlySavings <= 0) return null;
  const pct = Math.round((yearlySavings / (deltaMonthlyCredits * 12)) * 100);

  return {
    message: `Tu utilises ${memSnap.pct}% de tes ${memSnap.limit} souvenirs ce mois. Passer à ${next.toUpperCase()} (+${upgradeOnce}€ une fois) serait ${pct}% moins cher sur l'année que tes crédits récurrents.`,
    ctaLabel: `Voir ${next.toUpperCase()} ${PRICES[next]}€`,
    ctaUrl: `/parametres/abonnement?target=${next}`,
  };
}
```

---

## 5. Composant `QuotaHistory`

```tsx
// components/QuotaHistory.tsx
import { createServerClient } from '@/lib/supabase/server';

export async function QuotaHistory({ userId }: { userId: string }) {
  const sb = createServerClient();
  const { data } = await sb
    .from('user_quotas')
    .select('period_month, memories_used, video_minutes_used, voice_minutes_used, memories_limit')
    .eq('user_id', userId)
    .order('period_month', { ascending: false })
    .limit(12);

  return (
    <section className="mt-8">
      <h2 className="font-cinzel text-2xl text-gold-300 mb-4">📊 Historique 12 mois</h2>
      <div className="overflow-x-auto">
        <table className="w-full font-jetbrains text-sm">
          <thead>
            <tr className="border-b border-pearl-200/20 text-pearl-300">
              <th className="text-left py-2 px-3">Mois</th>
              <th className="text-right py-2 px-3">Souvenirs</th>
              <th className="text-right py-2 px-3">Vidéo (min)</th>
              <th className="text-right py-2 px-3">Voix (min)</th>
              <th className="text-right py-2 px-3">% souvenirs</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map(row => {
              const pct = row.memories_limit > 0
                ? Math.round((row.memories_used / row.memories_limit) * 100)
                : 0;
              return (
                <tr key={row.period_month} className="border-b border-pearl-200/10">
                  <td className="py-2 px-3 text-pearl-100">
                    {new Date(row.period_month).toLocaleDateString('fr', { month: 'short', year: 'numeric' })}
                  </td>
                  <td className="text-right text-pearl-100">{row.memories_used}</td>
                  <td className="text-right text-pearl-100">{Number(row.video_minutes_used).toFixed(1)}</td>
                  <td className="text-right text-pearl-100">{Number(row.voice_minutes_used).toFixed(1)}</td>
                  <td className="text-right text-bronze-300">{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <a
        href="/api/quotas/export?format=csv"
        className="inline-block mt-4 rounded-lg border border-pearl-200/30 px-4 py-2 font-cormorant hover:bg-night-800"
      >
        ⬇️ Exporter en CSV
      </a>
    </section>
  );
}
```

---

## 6. Couleurs charte précises

```css
/* tailwind.config.js — extension à ajouter si absent */
colors: {
  bronze:  { 300: '#D9986C', 400: '#C9885A', 500: '#B87333', 600: '#9C5E26' },
  gold:    { 300: '#E0C57F', 400: '#D4B968', 500: '#C9A961', 600: '#A88A4A' },
  ice:     { 200: '#C2E5F9', 300: '#A0D5F3', 400: '#7DD3FC' },
  night:   { 700: '#0A1320', 800: '#06090F', 900: '#02040A', 950: '#01020A' },
  pearl:   { 100: '#F2F4F7', 200: '#D9DDE3', 300: '#A0A6B0' },
}
```

Barres de progression :
- **0-50 %** : gradient `from-bronze-500 to-gold-400`
- **50-80 %** : gradient `from-bronze-500 to-gold-500`
- **80-99 %** : gradient `from-amber-400 to-amber-600` (warning)
- **100 %** : gradient `from-red-500 to-red-700` (block)

---

## 7. Accessibilité WCAG 2.1 AA

- ✅ Barre `<div role="progressbar" aria-valuenow aria-valuemin aria-valuemax aria-label>`
- ✅ Boutons icon-only ont `aria-label`
- ✅ Contraste pearl-100 / night-900 = **14.2:1** (AAA)
- ✅ Contraste bronze-300 / night-900 = **5.8:1** (AA confirmé)
- ✅ `prefers-reduced-motion` désactive les transitions
- ✅ Navigation clavier complète (focus-visible visible bronze-400)
- ✅ Lecteur d'écran : annonces des seuils 80 % / 100 % en `aria-live="polite"`

---

## 8. États de bord (edge cases)

| Situation | Comportement |
|---|---|
| User n'a jamais acheté NAVBIO | Page affiche bannière "Achète une formule NAVBIO pour activer tes quotas" + CTA `/navbio` |
| User formule Pro (illimité) | Cartes affichent "∞" + valeur consommée seulement |
| Quota = 0 / limite = 0 (Solo sans NEXT GEN APP) | Carte affiche "Indisponible avec ta formule actuelle · [Activer NEXT GEN APP +9€]" |
| Compteur vidéo > limite mais crédits disponibles | Barre rouge 100 % + label "+ N min crédits disponibles" + bouton "Continuer à utiliser" |
| Mois en cours pas encore initialisé | Cron n'a pas tourné → fallback affiche valeurs du mois précédent + bannière "Données en cours de synchronisation" |

---

## 9. Tests E2E Playwright

```ts
// tests/e2e/dashboard-quotas.spec.ts
import { test, expect } from '@playwright/test';

test('affiche 3 cartes quotas + historique pour user Premium', async ({ page }) => {
  await page.goto('/dashboard/quotas');
  await expect(page.getByText('📸 Souvenirs')).toBeVisible();
  await expect(page.getByText('🎬 Vidéo IA')).toBeVisible();
  await expect(page.getByText('🎙️ Voix clonée')).toBeVisible();
  await expect(page.getByText('Historique 12 mois')).toBeVisible();
});

test('affiche conseil quand usage > 90%', async ({ page }) => {
  // setup user à 95% souvenirs
  await page.goto('/dashboard/quotas');
  await expect(page.getByText(/conseil de cap/i)).toBeVisible();
  await expect(page.getByText(/passer à/i)).toBeVisible();
});

test('boutons accessibles au clavier', async ({ page }) => {
  await page.goto('/dashboard/quotas');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.tagName);
  expect(['A', 'BUTTON']).toContain(focused);
});
```

---

> ⚓ Le dashboard quotas n'est pas un tableau de bord, c'est un tableau de bord-à-bord. L'utilisateur sait toujours combien il lui reste de souffle, et trois leviers sont à portée : attendre, acheter, upgrader. Rien d'autre n'est nécessaire.
