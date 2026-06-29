// app/dashboard/page.tsx — Écran 7, dashboard zen
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §8.
// getDailyAction → lib/data/daily.ts (STUB, contenu réel manquant — voir README.md).
import { getActiveProfile } from '@/lib/data/profiles';
import { getDailyAction } from '@/lib/data/daily';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const p = await getActiveProfile();
  if (!p) redirect('/onboarding/dream');
  const a = await getDailyAction(p);

  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] p-4 flex flex-col gap-6 max-w-md mx-auto">
      <header>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
          🧭 Bonjour {p.profil_nom.replace('Le ', '').replace("L'", '')}
        </h1>
        <p className="font-[var(--font-body)] text-sm text-[var(--color-pearl)]/70">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </header>

      <article className="rounded-2xl border border-[var(--color-ice)]/30 p-4 bg-[var(--color-ice)]/5">
        <p className="font-[var(--font-mono)] text-xs uppercase text-[var(--color-ice)]/80">Ton action du jour</p>
        <p className="font-[var(--font-display)] text-xl mt-2">{a.action}</p>
      </article>

      <article className="rounded-2xl border border-[var(--color-bronze)]/40 p-4">
        <p className="font-[var(--font-mono)] text-xs uppercase text-[var(--color-bronze)]">Indicateur</p>
        <p className="font-[var(--font-display)] text-xl mt-2">
          Drift d&apos;allocation : {a.drift_pct} % {a.drift_ok ? '✅' : '⚠️'}
        </p>
      </article>

      <article className="rounded-2xl border border-[var(--color-pearl)]/20 p-4">
        <p className="font-[var(--font-mono)] text-xs uppercase text-[var(--color-pearl)]/60">Carte du jour</p>
        <p className="font-[var(--font-body)] italic mt-2">« {a.carte} »</p>
      </article>
    </main>
  );
}
