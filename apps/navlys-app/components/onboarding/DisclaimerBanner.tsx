// components/onboarding/DisclaimerBanner.tsx
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §1 (disclaimer permanent G1).
export function DisclaimerBanner() {
  return (
    <aside
      role="contentinfo"
      aria-label="Disclaimer NAVLYS"
      className="sticky bottom-0 inset-x-0 bg-[var(--color-night)]/95 backdrop-blur
                 border-t border-[var(--color-bronze)]/30 px-4 py-2
                 text-xs font-[var(--font-ui)] text-[var(--color-ice)]/90"
    >
      ⚖️ NAVLYS = éducation à la décision. <strong>Pas de conseil personnalisé.</strong> Tu décides.
    </aside>
  );
}
