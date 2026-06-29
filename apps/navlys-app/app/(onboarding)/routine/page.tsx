// app/(onboarding)/routine/page.tsx — Écran 4, allocation cible + univers
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §5.
import { getActiveProfile } from '@/lib/data/profiles';
import { AllocationBars } from '@/components/onboarding/AllocationBars';
import Link from 'next/link';

export default async function RoutinePage() {
  const p = await getActiveProfile();
  if (!p) return null;
  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        Ta routine NAVLYS
      </h1>

      <article className="rounded-2xl border border-[var(--color-ice)]/30 p-4
                          font-[var(--font-body)] text-base bg-[var(--color-ice)]/5">
        {p.routine_resume}
      </article>

      <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ice)]">Allocation cible</h2>
      <AllocationBars allocation={p.allocation_pct} />

      <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ice)]">Univers autorisé</h2>
      <ul className="font-[var(--font-body)] text-base list-disc list-inside marker:text-[var(--color-bronze)] space-y-1">
        {p.univers_actifs.map((u: string) => <li key={u}>{u}</li>)}
      </ul>

      <Link href="/onboarding/expectations"
            className="mt-4 block w-full py-4 rounded-2xl text-center
                       bg-[var(--color-bronze)] text-[var(--color-night)]
                       font-[var(--font-ui)] font-semibold">
        → Voir mes chiffres honnêtes
      </Link>
    </section>
  );
}
