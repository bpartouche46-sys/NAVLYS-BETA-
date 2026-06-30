// app/(legal)/legal/disclaimer-g1/page.tsx — Disclaimer G1 complet.
// Contenu transcrit/adapté depuis recup-docs/onedrive/08_BIBLE_JURIDIQUE_UNIFIEE_NAVLYS.md (Bloc 2)
// + 05_DECHARGE_LIABILITY_NAVLYS.md (qualification + responsabilité utilisateur) + CLAUDE.md (déperso).
// Marque dépersonnalisée : NAVLYS = éditeur pédagogique, Bruno invisible, NAV IA ≠ personne.
import type { Metadata } from 'next';
import { G1Footer } from '@/components/legal/G1Footer';

export const metadata: Metadata = {
  title: 'Disclaimer G1 — NAVLYS',
  description:
    'NAVLYS est un éditeur de contenu pédagogique financier — pas CIF, pas ORIAS, pas IOBSP. ' +
    'Aucun conseil personnalisé. Information éducative uniquement.',
};

export default function DisclaimerG1Page() {
  return (
    <article className="flex flex-col gap-6 font-[var(--font-body)] text-lg leading-relaxed text-[var(--color-pearl)]/90">
      <header className="flex flex-col gap-2">
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ice)]">
          Disclaimer G1 — éducation, pas conseil
        </h1>
        <p className="font-[var(--font-ui)] text-sm text-[var(--color-pearl)]/60">
          Le cadre permanent de NAVLYS. Présent en pied de chaque page.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          1. Ce qu&apos;est NAVLYS
        </h2>
        <p>
          NAVLYS est un <strong>éditeur de contenu pédagogique financier</strong> (un média,
          comme un blog ou une chaîne finance). NAVLYS publie de l&apos;information et une méthode.
          NAVLYS ne décide jamais à ta place : tu gardes la barre.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          2. Ce que NAVLYS n&apos;est PAS
        </h2>
        <p>NAVLYS n&apos;est pas, et ne se présente jamais comme :</p>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85">
          <li>Conseiller en Investissements Financiers (CIF) ;</li>
          <li>Intermédiaire enregistré ORIAS ;</li>
          <li>Intermédiaire en Opérations de Banque et Services de Paiement (IOBSP) ;</li>
          <li>Intermédiaire en services bancaires.</li>
        </ul>
        <p>
          Les contenus NAVLYS ont une <strong>vocation purement pédagogique</strong>. Ils ne
          constituent <strong>ni un conseil en investissement personnalisé</strong>,
          <strong> ni une recommandation d&apos;achat ou de vente</strong>,
          <strong> ni une garantie de rendement</strong>, ni une réception-transmission d&apos;ordres (RTO),
          ni un apport d&apos;affaires sur produits financiers réglementés.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          3. Risque & performances
        </h2>
        <p>
          Les performances passées <strong>ne préjugent pas</strong> des performances futures.
          Tout investissement comporte un risque, y compris de <strong>perte en capital</strong>.
          NAVLYS ne promet aucun gain. Personne ne peut promettre le futur des marchés.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          4. Ta responsabilité
        </h2>
        <p>
          Toute décision d&apos;investissement relève de <strong>ta seule responsabilité</strong>.
          NAVLYS fournit de l&apos;information éducative pour t&apos;aider à penser ta décision —
          le choix reste le tien. Avant toute décision, consulte un professionnel agréé.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          5. Liens partenaires
        </h2>
        <p>
          NAVLYS peut percevoir des commissions d&apos;affiliation (modèle <em>publisher</em> CPA,
          comme la presse en ligne ou un créateur YouTube) lorsqu&apos;un broker ou une banque
          partenaire est cité. Ces liens sont toujours signalés. Ils ne constituent pas un apport
          d&apos;affaires réglementé. NAVLYS ne place pas ton argent et n&apos;encaisse pas tes fonds.
          NAVLYS conserve son indépendance éditoriale.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          6. NAV IA
        </h2>
        <p>
          NAV IA est l&apos;assistant IA de NAVLYS (basé sur l&apos;API Anthropic Claude).
          Ce n&apos;est pas un humain et pas un conseiller. NAV IA applique le même cadre G1 :
          aucune réponse ne constitue un conseil personnalisé.
        </p>
      </section>

      <G1Footer />
    </article>
  );
}
