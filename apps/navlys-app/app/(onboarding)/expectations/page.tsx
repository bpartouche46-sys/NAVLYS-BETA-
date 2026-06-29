// app/(onboarding)/expectations/page.tsx — Écran 5, espérance honnête
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §6.
import { getActiveProfile } from '@/lib/data/profiles';
import { ExpectationGauge } from '@/components/onboarding/ExpectationGauge';
import Link from 'next/link';

export default async function ExpPage() {
  const p = await getActiveProfile();
  if (!p) return null;
  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        Ce que dit le Laboratoire
      </h1>
      <p className="font-[var(--font-body)] text-base text-[var(--color-pearl)]/85">
        Source : Backtest Mission #1 & #2, Shiller (1928–2025), FRED 60/40, Monte Carlo 2 000 chemins.
      </p>
      <ExpectationGauge perf={p.perf_honnete} />
      <aside className="rounded-xl border border-[var(--color-ice)]/40 p-3 text-xs
                        font-[var(--font-ui)] text-[var(--color-ice)]/90">
        ⚠️ Le passé n&apos;est pas le futur. Tu peux faire mieux. Tu peux faire pire.
      </aside>
      <Link href="/onboarding/activate"
            className="block w-full py-4 rounded-2xl text-center
                       bg-[var(--color-bronze)] text-[var(--color-night)]
                       font-[var(--font-ui)] font-semibold">
        → Activer ma routine
      </Link>
    </section>
  );
}
