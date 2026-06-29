// components/onboarding/AllocationBars.tsx
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §5.
export function AllocationBars({ allocation }: { allocation: Record<string, number> }) {
  const entries = Object.entries(allocation).filter(([, v]) => v > 0);
  const colors: Record<string, string> = {
    prudent:        'var(--color-ice)',
    balanced:       'var(--color-pearl)',
    tactique:       'var(--color-bronze)',
    recherche_perso:'var(--color-gold)',
    paper_trading:  '#7DD3FC',
  };
  return (
    <div className="flex flex-col gap-3" role="img" aria-label="Allocation cible en pourcentage">
      {entries.map(([k, pct]) => (
        <div key={k} className="flex flex-col gap-1">
          <div className="flex justify-between text-sm font-[var(--font-ui)]">
            <span className="capitalize">{k.replace('_', ' ')}</span>
            <span className="font-[var(--font-mono)]">{pct} %</span>
          </div>
          <div className="h-3 rounded-full bg-[var(--color-night)] border border-[var(--color-bronze)]/30 overflow-hidden">
            <div className="h-full rounded-full transition-all"
                 style={{ width: `${pct}%`, background: colors[k] ?? 'var(--color-bronze)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
