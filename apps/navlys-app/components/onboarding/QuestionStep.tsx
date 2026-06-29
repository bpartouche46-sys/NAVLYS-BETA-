// components/onboarding/QuestionStep.tsx
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §3.
// ⚠️ Le dispatcher des inputs (Slider / Single / Multi / Binary) reste un TODO
//    explicite dans la doc source (« Implémentations détaillées dans
//    /components/onboarding/inputs/* » — non fournies). Voir README.md §Manquant.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAnswer, submitQuestionnaireIfComplete } from '@/app/(onboarding)/_actions';

interface Props {
  stepIndex: number;
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any; // typed in real code via discriminated union
}

export function QuestionStep({ stepIndex, total, question }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>(question.kind === 'slider' || question.kind === 'log-slider'
    ? Math.floor((question.min + question.max) / 2) : null);
  const router = useRouter();

  const progressPct = Math.round((stepIndex / total) * 100);

  async function next() {
    if (value === null || (Array.isArray(value) && value.length === 0)) return;
    await saveAnswer(question.id, value);
    if (stepIndex === total) {
      const result = await submitQuestionnaireIfComplete();
      router.push(result.statut === 'blocked' ? '/onboarding/blocked' : '/onboarding/profile');
    } else {
      router.push(`/onboarding/questionnaire/${stepIndex + 1}`);
    }
  }

  return (
    <section className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-2" aria-live="polite">
        <div className="h-2 w-full bg-[var(--color-bronze)]/20 rounded-full overflow-hidden"
             role="progressbar"
             aria-valuemin={0}
             aria-valuemax={total}
             aria-valuenow={stepIndex}
             aria-label={`Question ${stepIndex} sur ${total}`}>
          <div className="h-full bg-[var(--color-ice)] transition-all"
               style={{ width: `${progressPct}%` }} />
        </div>
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-pearl)]/60">
          {stepIndex} / {total}
        </span>
      </div>

      <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        {question.label}
      </h2>

      {/* TODO: dispatcher selon question.kind → SliderInput / SingleChoice / MultiChoice / BinaryChoice */}
      {/* Implémentations détaillées dans /components/onboarding/inputs/* (non fournies par la doc) */}

      <div className="flex gap-3 mt-auto">
        {stepIndex > 1 && (
          <button onClick={() => router.back()}
                  className="px-4 py-3 rounded-xl border border-[var(--color-bronze)]/40
                             font-[var(--font-ui)] text-[var(--color-pearl)]">
            ← retour
          </button>
        )}
        <button onClick={next}
                disabled={value === null || (Array.isArray(value) && value.length === 0)}
                className="flex-1 py-3 rounded-xl bg-[var(--color-bronze)] text-[var(--color-night)]
                           font-[var(--font-ui)] font-semibold disabled:opacity-30">
          {stepIndex === total ? 'Découvrir mon profil →' : 'continuer →'}
        </button>
      </div>
    </section>
  );
}
