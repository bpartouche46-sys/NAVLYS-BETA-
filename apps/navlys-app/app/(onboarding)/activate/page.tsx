// app/(onboarding)/activate/page.tsx — Écran 6, activation
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §7.
// Note conformité : Stripe/paiement DÉSACTIVÉ en Beta (démo gratuite 15 j). Aucun
// débit déclenché ici (règle financière : Bruno seul décide).
'use client';
import { useState } from 'react';
import { activateRoutine } from '@/app/(onboarding)/_actions';
import { useRouter } from 'next/navigation';

const TIERS = [
  { id: 'demo',    label: 'Démo gratuite (15 jours, toutes fonctions)', highlight: false },
  { id: 'monthly', label: 'NAVLYS NEXT GEN INVEST — 49 €/mois',         highlight: true },
  { id: 'annual',  label: 'NAVLYS NEXT GEN INVEST — 490 €/an (économie 98 €)', highlight: false },
];

export default function ActivatePage() {
  const [g1, setG1] = useState(false);
  const [terms, setTerms] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);
  const [tier, setTier] = useState('demo');
  const router = useRouter();

  const ok = g1 && terms && disclaimer;

  async function go() {
    if (!ok) return;
    await activateRoutine(tier);
    router.push('/dashboard');
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        Activer ma routine
      </h1>

      <fieldset className="flex flex-col gap-3 font-[var(--font-ui)] text-sm">
        <label className="flex gap-3 items-start">
          <input type="checkbox" checked={g1} onChange={e => setG1(e.target.checked)}
                 className="mt-1 w-5 h-5 accent-[var(--color-ice)]" />
          <span>J&apos;ai compris : NAVLYS m&apos;éduque, je décide.</span>
        </label>
        <label className="flex gap-3 items-start">
          <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)}
                 className="mt-1 w-5 h-5 accent-[var(--color-ice)]" />
          <span>J&apos;ai lu les G1 et je m&apos;y engage.</span>
        </label>
        <label className="flex gap-3 items-start">
          <input type="checkbox" checked={disclaimer} onChange={e => setDisclaimer(e.target.checked)}
                 className="mt-1 w-5 h-5 accent-[var(--color-ice)]" />
          <span>J&apos;accepte le disclaimer permanent.</span>
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-[var(--font-display)] text-lg text-[var(--color-ice)] mb-2">
          Choisis ton mode
        </legend>
        {TIERS.map(t => (
          <label key={t.id}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer
                        ${tier === t.id ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10'
                                        : 'border-[var(--color-bronze)]/40'}`}>
            <input type="radio" name="tier" value={t.id}
                   checked={tier === t.id}
                   onChange={e => setTier(e.target.value)}
                   className="accent-[var(--color-ice)]" />
            <span className="font-[var(--font-ui)] text-sm">{t.label}</span>
          </label>
        ))}
      </fieldset>

      <button onClick={go} disabled={!ok}
              className="mt-auto w-full py-4 rounded-2xl bg-[var(--color-bronze)]
                         text-[var(--color-night)] font-[var(--font-ui)] font-semibold
                         disabled:opacity-30">
        → Activer
      </button>
    </section>
  );
}
