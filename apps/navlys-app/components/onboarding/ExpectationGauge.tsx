// components/onboarding/ExpectationGauge.tsx
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §6.
// ⚠️ Chiffres = espérance HONNÊTE (projection, PAS une promesse de rendement).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExpectationGauge({ perf }: { perf: any }) {
  const rows = [
    { label: 'Rendement annuel attendu', val: `${perf.cagr_pct_min ?? '–'}–${perf.cagr_pct_max ?? '–'} %`, tone: 'ok' },
    { label: 'Volatilité estimée',       val: `± ${perf.volatilite_estimee_pct ?? '–'} %/an`, tone: 'info' },
    { label: 'Probabilité de perte > 20 % sur 1 an', val: `${Math.round((perf.probabilite_perte_20pct_an ?? 0) * 100)} %`, tone: 'warn' },
    { label: 'Horizon recommandé minimum', val: `${perf.horizon_recommande_min_annees ?? '–'} ans`, tone: 'info' },
    { label: 'Pire année plausible',       val: `${perf.pire_annee_plausible_pct ?? '–'} %`, tone: 'warn' },
  ];
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((r) => (
        <li key={r.label}
            className="flex justify-between items-center rounded-xl border p-4
                       border-[var(--color-bronze)]/40 font-[var(--font-ui)] text-sm">
          <span>{r.label}</span>
          <span className={`font-[var(--font-mono)] text-base
            ${r.tone === 'warn'
              ? 'text-[var(--color-bronze)]'
              : 'text-[var(--color-ice)]'}`}>{r.val}</span>
        </li>
      ))}
    </ul>
  );
}
