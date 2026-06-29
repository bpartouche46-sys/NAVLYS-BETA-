// components/onboarding/ProfileReveal.tsx
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §4.
'use client';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProfileReveal({ profile }: { profile: any }) {
  return (
    <section className="flex flex-col gap-8 items-center text-center flex-1 py-6"
             aria-labelledby="profile-title">
      <h1 id="profile-title" className="font-[var(--font-display)] text-2xl text-[var(--color-ice)]">
        Ton profil NAVLYS
      </h1>

      <div className="rounded-3xl border-2 border-[var(--color-bronze)]
                      shadow-[var(--shadow-bronze)] p-8 flex flex-col gap-4 items-center
                      bg-gradient-to-b from-[var(--color-bronze)]/10 to-transparent">
        <div className="text-7xl" aria-hidden="true">{profile.emoji}</div>
        <h2 className="font-[var(--font-display)] text-3xl tracking-wide uppercase
                       text-[var(--color-bronze)]">
          {profile.profil_nom}
        </h2>
        <span className="font-[var(--font-mono)] text-sm text-[var(--color-ice)]
                         px-3 py-1 rounded-full border border-[var(--color-ice)]/40">
          Degré : {profile.degre_interne}
        </span>
        <blockquote className="font-[var(--font-body)] italic text-lg text-[var(--color-pearl)]/85">
          « {profile.metaphore} »
        </blockquote>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/onboarding/routine"
              className="block w-full py-4 rounded-2xl text-center
                         bg-[var(--color-bronze)] text-[var(--color-night)]
                         font-[var(--font-ui)] font-semibold">
          → Découvrir ma routine
        </Link>
        <Link href="/onboarding/dream"
              className="block w-full py-3 rounded-2xl text-center
                         border border-[var(--color-pearl)]/30 font-[var(--font-ui)]">
          Refaire le questionnaire
        </Link>
      </div>
    </section>
  );
}
