// app/laboratoire/page.tsx — Hub Laboratoire NEXT GEN.
// Contenu transcrit/adapté depuis recup-docs/onedrive/J3X.md (« on publie nos invalidations », 5 hypothèses
// invalidées, bilan au 28 mai 2026), J5Threads.md (persona Le Cartographe : « je sers NAVLYS, pas l'inverse »),
// _CARTOGRAPHE_M2_RAPPORT_PUBLIC_GRAND_PUBLIC.md (règle d'or « on teste, on publie », ton maritime).
// AUCUN signal d'achat. Martingale = INVALIDÉE. Ton maritime, tutoiement, phrases courtes.
// (Route protégée par le middleware : accessible aux embarqués connectés.)
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Laboratoire NEXT GEN — NAVLYS',
  description:
    'Le banc d’essai scientifique de NAVLYS. On teste des hypothèses, on publie les verdicts — ' +
    'bons ou mauvais. Éducation seule, pas de conseil personnalisé.',
};

// Bilan honnête au 28 mai 2026 (verbatim J3X.md post 9/10 + _CARTOGRAPHE_M2).
const invalidations = [
  {
    titre: 'Invalidation #1 — « +2 %/jour soutenu »',
    detail:
      'Testée sur 5 ans, 10 actifs volatils, frais et glissement réels. La machine perd à chaque test. Verdict : INVALIDÉE.',
  },
  {
    titre: 'Invalidation #2 — Martingale',
    detail:
      'Preuve mathématique + simulations Monte Carlo. Probabilité de ruine asymptotique. On ne la présente jamais comme une stratégie. Verdict : INVALIDÉE.',
  },
  {
    titre: 'Invalidation #3 — AdaptiveStop non borné',
    detail:
      'Une formule « intelligente » en apparence, une martingale déguisée en réalité. Verdict : INVALIDÉE.',
  },
  {
    titre: 'Invalidation #4 — Moyenne à la baisse sur thèse cassée',
    detail:
      '« Si ça baisse, j’achète plus » : formule mortelle quand la thèse fondamentale est morte. Verdict : INVALIDÉE.',
  },
  {
    titre: 'Invalidation #5 — Grid agressif non borné',
    detail:
      'Variance non stationnaire, explosion du drawdown sur les queues de distribution. Verdict : INVALIDÉE.',
  },
];

export default function LaboratoirePage() {
  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] px-4 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <header className="flex flex-col gap-3 text-center">
          <h1 className="font-[var(--font-display)] text-4xl text-[var(--color-ice)]">
            🧪 Laboratoire NEXT GEN
          </h1>
          <p className="font-[var(--font-body)] text-xl italic text-[var(--color-gold)]">
            Mesurer. Publier. Recommencer.
          </p>
        </header>

        {/* Le principe — règle d'or du Labo (verbatim _CARTOGRAPHE_M2). */}
        <section aria-labelledby="principe" className="flex flex-col gap-3">
          <h2 id="principe" className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
            Le principe
          </h2>
          <blockquote className="card p-5 font-[var(--font-body)] text-lg italic text-[var(--color-pearl)]/90">
            « On teste. On publie. Bons résultats ou mauvais : on les met sur la table. »
          </blockquote>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-pearl)]/85 leading-relaxed">
            Aucune fenêtre cherry-pickée. Aucun paramètre tuné après coup. Code ouvert, données
            sourcées, paramètres figés avant le test. On publie le verdict : VALIDÉE ou INVALIDÉE.
            On publie nos échecs avec autant de fierté que nos réussites.
          </p>
        </section>

        {/* Le persona — Le Cartographe (verbatim J5Threads.md). */}
        <section aria-labelledby="cartographe" className="flex flex-col gap-3">
          <h2 id="cartographe" className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
            🧭 Le Cartographe
          </h2>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-pearl)]/85 leading-relaxed">
            Le Cartographe est la main scientifique du Laboratoire. Son rôle : prendre les
            hypothèses qu&apos;on entend partout (« +2 %/jour », « la martingale est imparable »,
            « ce trader a trouvé LA méthode ») et les tester. Vraiment. Sur de vraies données, de
            vraies fenêtres, avec frais et glissement réels.
          </p>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-pearl)]/85 leading-relaxed">
            Puis il publie. Sans nuance marketing. Sans tuning post-hoc. Sans cherry-picking. Il
            signe « Le Cartographe » parce que le travail compte plus que la personne : la science
            n&apos;a pas d&apos;ego, les chiffres parlent. <strong>Le Cartographe sert NAVLYS — pas
            l&apos;inverse.</strong>
          </p>
        </section>

        {/* Le bilan honnête (verbatim J3X.md post 9/10). */}
        <section aria-labelledby="bilan" className="flex flex-col gap-4">
          <h2 id="bilan" className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
            Le bilan honnête
          </h2>
          <div className="card p-5 font-[var(--font-ui)] text-[var(--color-pearl)]/90 flex flex-col gap-2">
            <p>
              <span className="font-[var(--font-mono)] text-[var(--color-ice)]">5</span>{' '}
              hypothèses INVALIDÉES, publiées.
            </p>
            <p>
              <span className="font-[var(--font-mono)] text-[var(--color-ice)]">1</span>{' '}
              mécanisme VALIDÉ partiel (Lock/Reinvest 50/50 — protection, pas un avantage).
            </p>
            <p>
              <span className="font-[var(--font-mono)] text-[var(--color-ice)]">0</span>{' '}
              stratégie active ne bat un ETF World passif sur la période testée.
            </p>
            <p className="text-[var(--color-pearl)]/60 text-sm">
              État au 28 mai 2026. C&apos;est l&apos;état honnête. On publie l&apos;état honnête.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {invalidations.map((inv) => (
              <li key={inv.titre} className="card p-5">
                <p className="font-[var(--font-ui)] font-semibold text-[var(--color-ice)]">
                  {inv.titre}
                </p>
                <p className="mt-1 font-[var(--font-body)] text-lg text-[var(--color-pearl)]/85 leading-relaxed">
                  {inv.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Ce que le Labo n'est PAS (garde-fous conformité). */}
        <section aria-labelledby="pas" className="flex flex-col gap-3">
          <h2 id="pas" className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
            Ce que le Labo n&apos;est PAS
          </h2>
          <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
            <li>Pas un signal d&apos;achat ou de vente. On ne te dit jamais quoi acheter.</li>
            <li>Pas une promesse de rendement. Le futur n&apos;est pas backtestable.</li>
            <li>Pas une stratégie clé en main. C&apos;est un banc d&apos;essai pour comprendre.</li>
          </ul>
        </section>

        <p className="text-center font-[var(--font-body)] text-lg italic text-[var(--color-gold)]">
          Ma méthode, ton argent, ton rythme.
        </p>

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-[var(--font-ui)] text-[var(--color-ice)]/80">
          <Link href="/dashboard" className="underline underline-offset-2">
            Tableau de bord
          </Link>
          <Link href="/faq" className="underline underline-offset-2">
            FAQ
          </Link>
          <Link href="/legal/disclaimer-g1" className="underline underline-offset-2">
            Disclaimer G1
          </Link>
        </nav>

        {/* Disclaimer G1 — pied de page (règle gravée n°6). */}
        <p className="border-t border-[var(--color-bronze)]/25 pt-6 text-center text-xs font-[var(--font-ui)] text-[var(--color-ice)]/80 leading-relaxed">
          🧪 Laboratoire NEXT GEN · éducation seule · pas de conseil personnalisé. Les calculs
          s&apos;appuient sur de vraies données de marché ; ce sont des leçons, pas des
          recommandations. NAVLYS est un média éditeur pédagogique financier, pas CIF, pas ORIAS,
          pas IOBSP. Performances passées ≠ performances futures. Toute décision reste la tienne.
        </p>
      </div>
    </main>
  );
}
