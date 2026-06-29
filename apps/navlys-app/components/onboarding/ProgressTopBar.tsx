// components/onboarding/ProgressTopBar.tsx
// ⚠️ STUB minimal — le corps de ce composant n'est PAS documenté dans les sources
// (seul son import est référencé dans le layout onboarding §1). La barre de progression
// par question est, elle, gérée dans QuestionStep. Ici : en-tête de marque simple.
// TODO(Bruno) : remplacer par la vraie ProgressTopBar du projet si elle diffère.
export function ProgressTopBar() {
  return (
    <header
      className="w-full px-4 py-3 border-b border-[var(--color-bronze)]/25
                 flex items-center justify-center"
      aria-label="NAVLYS — onboarding"
    >
      <span className="font-[var(--font-display)] text-lg tracking-wide text-[var(--color-bronze)]">
        🧭 NAVLYS
      </span>
    </header>
  );
}
