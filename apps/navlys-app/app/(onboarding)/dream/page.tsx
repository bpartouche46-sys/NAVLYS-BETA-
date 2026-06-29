// app/(onboarding)/dream/page.tsx — Écran 1 « Mon Cap Rêvé »
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §2.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveCapReve } from '@/app/(onboarding)/_actions';

const CAPS = [
  { id: 'securiser',    emoji: '🛡️',  label: "Sécuriser ce que j'ai bâti" },
  { id: 'grandir',      emoji: '🚀',  label: 'Faire grandir mon capital' },
  { id: 'projet_court', emoji: '🎯',  label: 'Acheter un projet précis' },
  { id: 'retraite',     emoji: '🌅',  label: 'Préparer ma retraite' },
  { id: 'apprendre',    emoji: '🌱',  label: 'Apprendre, comprendre' },
] as const;

export default function DreamPage() {
  const [choice, setChoice] = useState<string | null>(null);
  const router = useRouter();

  async function next() {
    if (!choice) return;
    await saveCapReve(choice);
    router.push('/onboarding/questionnaire/1');
  }

  return (
    <section aria-labelledby="dream-title" className="flex-1 flex flex-col gap-6">
      <h1 id="dream-title" className="font-[var(--font-display)] text-3xl text-[var(--color-bronze)]">
        Mon Cap Rêvé
      </h1>
      <p className="font-[var(--font-body)] text-lg text-[var(--color-pearl)]/90">
        « Quel est ton cap à 5 ans ? »
      </p>

      <fieldset className="flex flex-col gap-3" role="radiogroup" aria-label="Cap rêvé">
        <legend className="sr-only">Cap rêvé</legend>
        {CAPS.map((c) => (
          <label
            key={c.id}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer
                        transition-all min-h-[48px]
                        ${choice === c.id
                          ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10 shadow-[var(--shadow-ice)]'
                          : 'border-[var(--color-bronze)]/40 hover:border-[var(--color-bronze)]'}`}
          >
            <input type="radio" name="cap" value={c.id}
                   className="sr-only"
                   checked={choice === c.id}
                   onChange={() => setChoice(c.id)} />
            <span aria-hidden="true" className="text-2xl">{c.emoji}</span>
            <span className="font-[var(--font-ui)] text-base">{c.label}</span>
          </label>
        ))}
      </fieldset>

      <button
        onClick={next}
        disabled={!choice}
        className="mt-auto w-full py-4 rounded-2xl font-[var(--font-ui)] font-semibold
                   bg-[var(--color-bronze)] text-[var(--color-night)]
                   disabled:opacity-30 disabled:cursor-not-allowed
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ice)]"
      >
        Continuer →
      </button>
    </section>
  );
}
