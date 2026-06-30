// app/(legal)/legal/terms/page.tsx — CGU NAVLYS « publisher éditorial ».
// Transcrit/adapté depuis recup-docs/onedrive/08_BIBLE_JURIDIQUE_UNIFIEE_NAVLYS.md (statut éditeur,
// affiliations, propriété intellectuelle, contact autorités) + 05_DECHARGE_LIABILITY_NAVLYS.md
// (qualification, responsabilité utilisateur, limitation, IA « en l'état », force majeure).
// NAVLYS app = média éducatif (publisher). Marque dépersonnalisée.
import type { Metadata } from 'next';
import { G1Footer } from '@/components/legal/G1Footer';

export const metadata: Metadata = {
  title: 'CGU — NAVLYS',
  description:
    "Conditions Générales d'Utilisation de NAVLYS, média éditeur pédagogique financier. " +
    'Statut éditeur, responsabilité utilisateur, affiliations, propriété intellectuelle.',
};

export default function TermsPage() {
  return (
    <article className="flex flex-col gap-6 font-[var(--font-body)] text-lg leading-relaxed text-[var(--color-pearl)]/90">
      <header className="flex flex-col gap-2">
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ice)]">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="font-[var(--font-ui)] text-sm text-[var(--color-pearl)]/60">
          NAVLYS — média éditeur pédagogique financier.
          {' '}
          <span className="text-[var(--color-gold)]">
            Projet — à valider par avocat NTIC avant production.
          </span>
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 1 — Objet
        </h2>
        <p>
          Les présentes CGU régissent l&apos;accès et l&apos;usage de l&apos;application NAVLYS
          (navlys.com). NAVLYS est un <strong>média éditeur de contenu pédagogique financier</strong> :
          il publie de l&apos;information, une méthode (90/10) et des outils éducatifs. NAVLYS
          n&apos;est ni CIF, ni ORIAS, ni IOBSP. L&apos;acceptation des CGU s&apos;opère à la
          création du compte.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 2 — Nature éditoriale du service
        </h2>
        <p>
          Les contenus publiés par NAVLYS (articles, vidéos, audio, calculateurs, rapports du
          Laboratoire, réponses de NAV IA) ont une <strong>vocation purement pédagogique</strong>.
          Ils ne constituent ni un conseil en investissement personnalisé, ni une recommandation
          d&apos;achat ou de vente, ni une garantie de rendement. Toute décision d&apos;investissement
          relève de la seule responsabilité de l&apos;Utilisateur.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 3 — Engagements de l&apos;Utilisateur
        </h2>
        <p>L&apos;Utilisateur s&apos;engage à :</p>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li>fournir des informations exactes lors de son inscription ;</li>
          <li>utiliser le service à des fins personnelles et licites ;</li>
          <li>ne pas tenter de contourner les mesures de sécurité ou de rétro-ingénierer le service ;</li>
          <li>
            comprendre que NAVLYS l&apos;éduque mais ne décide pas à sa place — il reste seul
            décisionnaire de ses choix d&apos;investissement.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 4 — Affiliations partenaires
        </h2>
        <p>
          NAVLYS peut percevoir des commissions d&apos;affiliation (modèle <em>publisher</em> CPA,
          équivalent presse en ligne ou créateur YouTube) lorsqu&apos;un Utilisateur ouvre un compte
          via des liens dédiés vers des plateformes financières partenaires (brokers, banques).
          Ces commissions <strong>ne constituent pas un apport d&apos;affaires réglementé</strong>
          {' '}(NAVLYS n&apos;est pas IOBSP/CIF) et sont signalées par la mention « Lien partenaire ».
          NAVLYS conserve son indépendance éditoriale.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 5 — Abonnement & résiliation
        </h2>
        <p>
          Les modalités et tarifs sont présentés sur la page Tarifs. L&apos;Utilisateur peut
          résilier à tout moment depuis son compte (« Abonnement » → « Résilier »), sans
          engagement ; la résiliation prend effet à la fin de la période déjà payée. En phase
          BETA, aucun débit n&apos;est déclenché sans validation explicite.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 6 — Technologies utilisées (NAV IA & voix IA)
        </h2>
        <p>
          NAVLYS utilise un assistant IA (NAV IA) basé sur l&apos;API Anthropic Claude. Les réponses
          de NAV IA peuvent être restituées vocalement via un modèle de clone vocal
          « Professional Voice Cloning » ElevenLabs, créé avec un consentement explicite et révocable.
          La voix est identifiée comme générée par IA, conformément à l&apos;article 50 du Règlement
          européen sur l&apos;IA. Aucune voix n&apos;est utilisée pour des contenus non validés par le
          cadre G1. Détail : page <strong>Voix IA</strong> (/legal/ai-voice).
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 7 — Fonctionnalités IA « en l&apos;état »
        </h2>
        <p>
          Les fonctionnalités d&apos;IA (réponses NAV IA, estimations « Mon Cap Rêvé », rapports du
          Laboratoire) sont fournies <strong>« en l&apos;état »</strong>, sans garantie de précision
          absolue. Ce sont des outils pédagogiques, pas des prédictions. L&apos;Utilisateur garde son
          esprit critique et valide ses propres décisions.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 8 — Propriété intellectuelle
        </h2>
        <p>
          Les marques NAVLYS, NAVBIO, NAVBIO LIFE, NAVLYS.IO, ainsi que les logos, designs, codes
          sources, calculateurs et contenus pédagogiques sont la propriété exclusive de NAVLYS.
          Toute reproduction non autorisée constitue une contrefaçon (art. L335-3 CPI).
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 9 — Responsabilité & force majeure
        </h2>
        <p>
          Dans toute la mesure permise par la loi, NAVLYS n&apos;est pas responsable des décisions
          d&apos;investissement de l&apos;Utilisateur ni des dommages indirects (perte de chance, de
          chiffre d&apos;affaires, de notoriété). Aucune partie n&apos;est responsable d&apos;un
          manquement résultant d&apos;un cas de force majeure (art. 1218 Code civil FR). Sont exclus
          de toute limitation, conformément à l&apos;ordre public français, les dommages corporels et
          la faute lourde ou intentionnelle.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Article 10 — Contact & autorités
        </h2>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85">
          Support : <strong>support@navlys.com</strong>. Pôle juridique : <strong>legal@navlys.com</strong>.
          Protection des données : <strong>dpo@navlys.com</strong>. Réquisitions judiciaires et
          autorités de contrôle (CNIL, AMF, DGCCRF) : legal@navlys.com.
        </p>
      </section>

      <G1Footer />
    </article>
  );
}
