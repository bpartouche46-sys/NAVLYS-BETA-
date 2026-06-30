// app/profil/page.tsx — vue du profil de l'utilisateur connecté.
// Réutilise getActiveProfile() (lib/data/profiles.ts) + ProfileReveal (composant onboarding §4).
// Si pas de profil actif → redirige vers /onboarding/dream (même garde que dashboard/profile onboarding).
// Route protégée par le middleware. Disclaimer G1 en pied (règle gravée n°6).
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getActiveProfile } from '@/lib/data/profiles';
import { ProfileReveal } from '@/components/onboarding/ProfileReveal';

export const metadata: Metadata = {
  title: 'Mon profil — NAVLYS',
  description: 'Ton profil NAVLYS : ton degré, ta métaphore, ta routine. Tu gardes la barre.',
};

export default async function ProfilPage() {
  const p = await getActiveProfile();
  if (!p) redirect('/onboarding/dream');

  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] px-4 py-10">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <ProfileReveal profile={p} />

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-[var(--font-ui)] text-[var(--color-ice)]/80">
          <Link href="/dashboard" className="underline underline-offset-2">
            Tableau de bord
          </Link>
          <Link href="/laboratoire" className="underline underline-offset-2">
            Laboratoire
          </Link>
          <Link href="/faq" className="underline underline-offset-2">
            FAQ
          </Link>
        </nav>

        {/* Disclaimer G1 — pied de page (règle gravée n°6). */}
        <p className="border-t border-[var(--color-bronze)]/25 pt-6 text-center text-xs font-[var(--font-ui)] text-[var(--color-ice)]/80 leading-relaxed">
          ⚖️ Ton profil est un repère pédagogique, pas un conseil personnalisé. NAVLYS est un média
          éditeur pédagogique financier, pas CIF, pas ORIAS, pas IOBSP. Performances passées ≠
          performances futures. Tu restes seul décisionnaire.
        </p>
      </div>
    </main>
  );
}
