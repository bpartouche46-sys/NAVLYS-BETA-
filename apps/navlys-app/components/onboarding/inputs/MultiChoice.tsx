// components/onboarding/inputs/MultiChoice.tsx
// Widget « choix multiple » (cases à cocher accessibles). Charte NAVLYS.
'use client';

interface Opt {
  v: string;
  l: string;
}

export function MultiChoice({
  question,
  value,
  onChange,
}: {
  question: { options: Opt[] };
  value: string[] | null;
  onChange: (v: string[]) => void;
}) {
  const sel = value ?? [];
  const toggle = (v: string) =>
    onChange(sel.includes(v) ? sel.filter((x) => x !== v) : [...sel, v]);

  return (
    <fieldset className="flex flex-col gap-3" role="group" aria-label="Choix multiple">
      {question.options.map((o) => {
        const on = sel.includes(o.v);
        return (
          <label
            key={o.v}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all min-h-[48px]
              ${
                on
                  ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10'
                  : 'border-[var(--color-bronze)]/40 hover:border-[var(--color-bronze)]'
              }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={on}
              onChange={() => toggle(o.v)}
            />
            <span
              aria-hidden
              className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold
                ${
                  on
                    ? 'bg-[var(--color-ice)] border-[var(--color-ice)] text-[var(--color-night)]'
                    : 'border-[var(--color-bronze)]/50'
                }`}
            >
              {on ? '✓' : ''}
            </span>
            <span className="font-[var(--font-ui)] text-base">{o.l}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
