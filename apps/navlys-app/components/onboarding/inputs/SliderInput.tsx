// components/onboarding/inputs/SliderInput.tsx
// Widget de saisie « slider » et « log-slider » (capital, montant). Charte NAVLYS.
'use client';

interface SliderQuestion {
  kind: 'slider' | 'log-slider';
  min: number;
  max: number;
  unit?: string;
}

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);
const STEPS = 1000;

export function SliderInput({
  question,
  value,
  onChange,
}: {
  question: SliderQuestion;
  value: number;
  onChange: (v: number) => void;
}) {
  const isLog = question.kind === 'log-slider';

  const toPos = (val: number): number => {
    const v = Math.min(Math.max(val, question.min), question.max);
    if (isLog) {
      const lo = Math.log(question.min);
      const hi = Math.log(question.max);
      return Math.round(((Math.log(v) - lo) / (hi - lo)) * STEPS);
    }
    return Math.round(((v - question.min) / (question.max - question.min)) * STEPS);
  };

  const fromPos = (pos: number): number => {
    const t = pos / STEPS;
    if (isLog) {
      const lo = Math.log(question.min);
      const hi = Math.log(question.max);
      return Math.round(Math.exp(lo + t * (hi - lo)));
    }
    return Math.round(question.min + t * (question.max - question.min));
  };

  return (
    <div className="flex flex-col gap-4">
      <output
        className="font-[var(--font-mono)] text-3xl text-[var(--color-ice)] text-center"
        aria-live="polite"
      >
        {fmt(value)}
        {question.unit ?? ''}
      </output>
      <input
        type="range"
        min={0}
        max={STEPS}
        value={toPos(value)}
        onChange={(e) => onChange(fromPos(parseInt(e.target.value, 10)))}
        aria-label="Curseur de valeur"
        className="w-full h-2 accent-[var(--color-ice)] cursor-pointer"
      />
      <div className="flex justify-between font-[var(--font-mono)] text-xs text-[var(--color-pearl)]/50">
        <span>
          {fmt(question.min)}
          {question.unit ?? ''}
        </span>
        <span>
          {fmt(question.max)}
          {question.unit ?? ''}
        </span>
      </div>
    </div>
  );
}
