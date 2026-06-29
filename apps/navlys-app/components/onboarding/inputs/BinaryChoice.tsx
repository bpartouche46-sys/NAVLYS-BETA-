// components/onboarding/inputs/BinaryChoice.tsx
// Widget « binaire » (oui/non — ex. Q12 acceptation éducation seule). Charte NAVLYS.
'use client';

interface Opt {
  v: boolean;
  l: string;
}

export function BinaryChoice({
  question,
  value,
  onChange,
}: {
  question: { options: Opt[] };
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Oui / Non">
      {question.options.map((o) => (
        <button
          key={String(o.v)}
          type="button"
          onClick={() => onChange(o.v)}
          aria-pressed={value === o.v}
          className={`text-left p-4 rounded-2xl border-2 transition-all min-h-[48px] font-[var(--font-ui)] text-base
            ${
              value === o.v
                ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10'
                : 'border-[var(--color-bronze)]/40 hover:border-[var(--color-bronze)]'
            }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}
