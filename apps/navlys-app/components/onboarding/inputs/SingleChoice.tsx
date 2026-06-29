// components/onboarding/inputs/SingleChoice.tsx
// Widget « choix unique » (radio accessible). Charte NAVLYS.
'use client';

interface Opt {
  v: string;
  l: string;
}

export function SingleChoice({
  question,
  value,
  onChange,
}: {
  question: { options: Opt[] };
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-3" role="radiogroup" aria-label="Choix unique">
      {question.options.map((o) => (
        <label
          key={o.v}
          className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all min-h-[48px]
            ${
              value === o.v
                ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10 shadow-[var(--shadow-ice)]'
                : 'border-[var(--color-bronze)]/40 hover:border-[var(--color-bronze)]'
            }`}
        >
          <input
            type="radio"
            name="single-choice"
            value={o.v}
            className="sr-only"
            checked={value === o.v}
            onChange={() => onChange(o.v)}
          />
          <span className="font-[var(--font-ui)] text-base">{o.l}</span>
        </label>
      ))}
    </fieldset>
  );
}
