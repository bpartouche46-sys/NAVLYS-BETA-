// app/page.tsx — page d'accueil / gate (toujours publique ; cf. middleware).
// Reconstitué (non documenté verbatim côté App Router) à partir de la stratégie gate
// (_APP_CLIENT_MIDDLEWARE_AUTH.md §1) + slogan officiel figé + compte à rebours
// 1er juillet 2026 00:00 (Europe/Paris) porté par public/navlys-alive.js.
import Script from 'next/script';
import Link from 'next/link';

export default function HomePage() {
  const unlocked = process.env.NEXT_PUBLIC_LAUNCH_UNLOCKED === 'true';
  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)]
                     flex flex-col items-center justify-center text-center gap-8 p-6">
      <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl tracking-wide text-[var(--color-bronze)]">
        🧭 NAVLYS
      </h1>
      <p className="font-[var(--font-body)] text-2xl italic text-[var(--color-gold)]">
        Ma méthode, ton argent, ton rythme.
      </p>
      <p className="font-[var(--font-ui)] text-base max-w-md text-[var(--color-pearl)]/80">
        Éducation financière, veille stratégique et communauté privée — l&apos;Équipage Navlys.
        Méthode 90/10 : 90 % Forteresse ETF/DCA, 10 % Capital Plaisir.
      </p>

      {unlocked ? (
        <Link href="/auth/sign-in"
              className="py-4 px-8 rounded-2xl bg-[var(--color-bronze)] text-[var(--color-night)]
                         font-[var(--font-ui)] font-semibold">
          Entrer dans l&apos;app →
        </Link>
      ) : (
        <p className="font-[var(--font-mono)] text-sm text-[var(--color-ice)]/90">
          Ouverture le 1ᵉʳ juillet 2026 — accès anticipé gratuit.
        </p>
      )}

      {/* Couche vivante NAVLYS (décor + compte à rebours 1er juillet 2026 00:00 Europe/Paris). */}
      <Script src="/navlys-alive.js" strategy="afterInteractive" />
    </main>
  );
}
