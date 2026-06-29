// app/layout.tsx — layout racine NAVLYS.
// Reconstitué (non documenté verbatim) à partir de la charte (_APP_CLIENT_ONBOARDING_7_SCREENS.md §0),
// du slogan officiel figé et du disclaimer G1 permanent (_APP_CLIENT_DOCUMENTATION_TECHNIQUE.md §14).
// Polices : Cinzel (titres) + Cormorant Garamond (corps) + JetBrains Mono (chiffres) + Manrope (UI).
import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant', display: 'swap',
});
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  title: 'NAVLYS — Ma méthode, ton argent, ton rythme.',
  description:
    "NAVLYS — éducation financière, veille stratégique et communauté privée. " +
    "Média éditeur pédagogique : information et méthode, pas de conseil personnalisé.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#02040A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${cormorant.variable} ${jetbrains.variable} ${manrope.variable}`}
    >
      <body className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] antialiased">
        {children}
        {/* Disclaimer G1 — pied de page PARTOUT (règle gravée n°6 + doc §14). */}
        <footer
          role="contentinfo"
          className="border-t border-[var(--color-bronze)]/25 px-4 py-3 text-center
                     text-xs font-[var(--font-ui)] text-[var(--color-ice)]/85"
        >
          ⚖️ NAVLYS est un éditeur de contenu pédagogique financier (média).
          NAVLYS n&apos;est pas CIF, pas ORIAS, pas IOBSP. Information éducative,
          pas un conseil personnalisé — tu restes seul décisionnaire.
        </footer>
      </body>
    </html>
  );
}
