// app/(legal)/layout.tsx — cadre commun des pages légales NAVLYS.
// Mise en page sobre, charte verrouillée, navigation inter-pages légales.
// Le disclaimer G1 du <footer> racine (app/layout.tsx) reste présent SOUS ce contenu ;
// chaque page légale porte en plus son propre bloc G1 en pied (règle gravée n°6).
import Link from 'next/link';

const LIENS = [
  { href: '/legal/disclaimer-g1', label: 'Disclaimer G1' },
  { href: '/legal/privacy', label: 'Confidentialité' },
  { href: '/legal/terms', label: 'CGU' },
  { href: '/legal/ai-voice', label: 'Voix IA' },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] px-4 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <nav
          aria-label="Pages légales"
          className="flex flex-wrap justify-center gap-3 text-xs font-[var(--font-ui)] text-[var(--color-ice)]/80"
        >
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className="underline underline-offset-2">
              {l.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </main>
  );
}
