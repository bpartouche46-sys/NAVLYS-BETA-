// app/faq/page.tsx — FAQ publique NAVLYS (3 sections).
// Contenu transcrit depuis docs/FAQ-NAVLYS.md (FAQ unifiée Produit / Conformité / Voix-IA).
// Aucun prix figé (→ « voir la page Tarifs »), aucun chiffre de rendement. Disclaimer G1 en pied.
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — NAVLYS',
  description:
    'Foire aux questions NAVLYS : produit & écosystème, conformité, voix & IA. ' +
    'Média éditeur pédagogique — pas de conseil personnalisé.',
};

type QA = { q: string; a: React.ReactNode };

// Section A — PRODUIT & ÉCOSYSTÈME (verbatim docs/FAQ-NAVLYS.md §A).
const produit: QA[] = [
  {
    q: "C'est quoi NAVLYS ?",
    a: (
      <>
        NAVLYS, c&apos;est un média d&apos;éducation financière. On t&apos;apprend à penser ta décision.
        On ne décide jamais à ta place. Tu gardes la barre.
      </>
    ),
  },
  {
    q: "C'est quoi la méthode 90/10 ?",
    a: (
      <>
        90 % de ton capital dort : allocation prudente, ETF monde diversifié, rebalancé une fois par an.
        10 % maximum joue : tactique active, surveillée, jamais plus que ton profil ne l&apos;autorise.
        0 % de levier, d&apos;options, de produits complexes. Ce n&apos;est pas un dogme. C&apos;est un cadre.
      </>
    ),
  },
  {
    q: "Pourquoi 90/10 et pas 80/20 ?",
    a: (
      <>
        Parce que la plupart des gens surestiment leur tolérance à la perte.
        À 90/10, tu dors la nuit. C&apos;est une méthode qui te protège de toi-même.
      </>
    ),
  },
  {
    q: "C'est quoi « Mon Cap Rêvé » ?",
    a: (
      <>
        Un questionnaire de vie, pas un simulateur de finance pure.
        Tu décris ton rêve. NAVLYS estime le coût, l&apos;effort mensuel, l&apos;horizon probable.
        Il te montre le chemin probable. Jamais une garantie.
      </>
    ),
  },
  {
    q: "C'est quoi le Laboratoire NEXT GEN ?",
    a: (
      <>
        Notre banc d&apos;essai scientifique. On teste des stratégies en public.
        Code ouvert, données sourcées, paramètres figés avant le test.
        On publie les verdicts : VALIDÉE ou INVALIDÉE. On publie nos échecs autant que nos réussites.
        {' '}
        <Link href="/laboratoire" className="text-[var(--color-ice)] underline underline-offset-2">
          Voir le Laboratoire
        </Link>.
      </>
    ),
  },
  {
    q: "Et NAVBIO Life ?",
    a: (
      <>
        Ta biographie vivante : photos, voix, textes, livre ou film de ta vie.
        Tes contenus sont chiffrés. Transmission programmée possible. Offre one-shot + options.
      </>
    ),
  },
  {
    q: "Et NAVLYS.IO ?",
    a: (
      <>
        Notre studio : tu parles, ton site naît. Un site clé en main pour artisan, indépendant, PME.
      </>
    ),
  },
  {
    q: "Et NAVLEX ?",
    a: (
      <>
        Notre coin questions-réponses juridiques pédagogiques. Pour comprendre, pas pour remplacer un avocat.
      </>
    ),
  },
  {
    q: "C'est quoi la phase BETA ?",
    a: (
      <>
        NAVLYS est en BETA : on construit avec les premiers embarqués.
        Les premières fonctions tournent, d&apos;autres arrivent. L&apos;ouverture publique est figée
        au 1ᵉʳ juillet 2026 à 00:00 (Europe/Paris).
      </>
    ),
  },
  {
    q: "Combien ça coûte ?",
    a: (
      <>
        Voir la <strong>page Tarifs</strong>. Les prix y sont à jour.
        On n&apos;affiche pas de chiffre figé dans cette FAQ pour éviter toute info périmée.
      </>
    ),
  },
  {
    q: "Comment je résilie ?",
    a: (
      <>
        Compte → « Abonnement » → « Résilier ». Pas de friction, pas d&apos;engagement.
        La résiliation prend effet à la fin du mois déjà payé.
      </>
    ),
  },
];

// Section B — CONFORMITÉ (verbatim docs/FAQ-NAVLYS.md §B).
const conformite: QA[] = [
  {
    q: "NAVLYS me donne-t-il des conseils ?",
    a: (
      <>
        Non. NAVLYS explique, illustre, éduque. Jamais de conseil personnalisé.
        On te montre comment penser une décision. Le choix reste le tien.
      </>
    ),
  },
  {
    q: "NAVLYS est-il un conseiller financier agréé ?",
    a: (
      <>
        Non. NAVLYS n&apos;est ni CIF, ni ORIAS, ni IOBSP.
        NAVLYS est un média pédagogique, comme un blog ou une chaîne YouTube finance.
      </>
    ),
  },
  {
    q: "Pourquoi cette limite ?",
    a: (
      <>
        Parce que c&apos;est notre choix de cap. Éditeur, pas conseiller.
        Ça nous interdit de te dire quoi acheter — et ça te protège.
      </>
    ),
  },
  {
    q: "Et les liens vers des banques ou brokers ?",
    a: (
      <>
        Ce sont des liens partenaires (mode publisher CPA), comme un média.
        On te le signale toujours. On ne place pas ton argent, on n&apos;encaisse pas tes fonds.
      </>
    ),
  },
  {
    q: "Vous garantissez quel rendement ?",
    a: (
      <>
        Aucun. Personne ne peut promettre le futur des marchés.
        Le Labo publie ce qu&apos;il a testé, avec les pertes affichées. Le futur n&apos;est pas backtestable.
      </>
    ),
  },
  {
    q: "La martingale, ça marche ?",
    a: (
      <>
        Non. Le Laboratoire l&apos;a testée : verdict INVALIDÉE.
        Probabilité de ruine asymptotique. On ne la présente jamais comme une stratégie.
      </>
    ),
  },
  {
    q: "Que faites-vous de mes données ?",
    a: (
      <>
        Hébergement EU, RGPD natif. Aucune revente. Aucun usage tiers.
        Tu peux demander l&apos;effacement de ton compte à tout moment (voir{' '}
        <Link href="/legal/privacy" className="text-[var(--color-ice)] underline underline-offset-2">
          page Confidentialité
        </Link>).
      </>
    ),
  },
  {
    q: "Qui est responsable de mes décisions d'investissement ?",
    a: (
      <>
        Toi. NAVLYS fournit de l&apos;information éducative.
        Toute décision relève de ta responsabilité (voir les{' '}
        <Link href="/legal/terms" className="text-[var(--color-ice)] underline underline-offset-2">
          CGU
        </Link>).
      </>
    ),
  },
];

// Section C — VOIX & IA (verbatim docs/FAQ-NAVLYS.md §C).
const voixIa: QA[] = [
  {
    q: "Qui me répond dans le chat ?",
    a: (
      <>
        NAV IA. Une intelligence artificielle (basée sur Claude d&apos;Anthropic).
        Pas un humain. Pas un conseiller. Elle te le dit dès le premier message.
      </>
    ),
  },
  {
    q: "NAV IA, c'est une personne ?",
    a: (
      <>
        Non. NAV IA est l&apos;assistant de NAVLYS, pas une personne.
        Si une question dépasse sa compétence, elle t&apos;oriente vers un humain.
      </>
    ),
  },
  {
    q: "La voix que j'entends, c'est quoi ?",
    a: (
      <>
        C&apos;est un clone IA officiel d&apos;une voix, créé avec le consentement explicite de son
        titulaire (via ElevenLabs).
        La mention « Voix générée par IA » apparaît sous chaque lecteur audio.
      </>
    ),
  },
  {
    q: "Pourquoi une voix IA et pas un enregistrement ?",
    a: (
      <>
        Pour parler ta langue et lire des contenus longs, à jour, sans re-enregistrer.
        Transparence d&apos;abord : tu sais toujours que c&apos;est une voix synthétique.
      </>
    ),
  },
  {
    q: "Cette voix peut-elle dire n'importe quoi ?",
    a: (
      <>
        Non. Elle ne lit que des textes validés par NAV IA (cadre G1) ou pré-rédigés.
        Aucun texte libre d&apos;un utilisateur. Garde-fous anti-deepfake côté serveur.
        {' '}
        <Link href="/legal/ai-voice" className="text-[var(--color-ice)] underline underline-offset-2">
          Voir la politique voix IA
        </Link>.
      </>
    ),
  },
  {
    q: "C'est conforme à la loi ?",
    a: (
      <>
        Oui : transparence IA Act (art. 50), RGPD (consentement, donnée biométrique),
        consentement signé et révocable. La voix reste dans l&apos;écosystème NAVLYS.
      </>
    ),
  },
  {
    q: "Mes échanges avec NAV IA sont-ils privés ?",
    a: (
      <>
        Ils sont traités pour te répondre et améliorer le service, dans le cadre RGPD.
        Voir la{' '}
        <Link href="/legal/privacy" className="text-[var(--color-ice)] underline underline-offset-2">
          page Confidentialité
        </Link>{' '}
        pour le détail (durées, droits, contact).
      </>
    ),
  },
];

function Section({ id, titre, items }: { id: string; titre: string; items: QA[] }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2
        id={id}
        className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)] tracking-wide"
      >
        {titre}
      </h2>
      <dl className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.q} className="card p-5">
            <dt className="font-[var(--font-ui)] font-semibold text-[var(--color-ice)]">
              {item.q}
            </dt>
            <dd className="mt-2 font-[var(--font-body)] text-lg text-[var(--color-pearl)]/85 leading-relaxed">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] px-4 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <header className="flex flex-col gap-3 text-center">
          <h1 className="font-[var(--font-display)] text-4xl text-[var(--color-ice)]">
            🧭 Foire aux questions
          </h1>
          <p className="font-[var(--font-body)] text-xl italic text-[var(--color-gold)]">
            Ma méthode, ton argent, ton rythme.
          </p>
          <p className="font-[var(--font-ui)] text-sm text-[var(--color-pearl)]/70">
            Tout ce qu&apos;il faut savoir avant d&apos;embarquer. Réponses courtes, claires, honnêtes.
          </p>
        </header>

        <Section id="faq-produit" titre="A. Produit & écosystème" items={produit} />
        <Section id="faq-conformite" titre="B. Conformité" items={conformite} />
        <Section id="faq-voix-ia" titre="C. Voix & IA" items={voixIa} />

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-[var(--font-ui)] text-[var(--color-ice)]/80">
          <Link href="/legal/disclaimer-g1" className="underline underline-offset-2">
            Disclaimer G1
          </Link>
          <Link href="/legal/privacy" className="underline underline-offset-2">
            Confidentialité
          </Link>
          <Link href="/legal/terms" className="underline underline-offset-2">
            CGU
          </Link>
          <Link href="/legal/ai-voice" className="underline underline-offset-2">
            Voix IA
          </Link>
        </nav>

        {/* Disclaimer G1 — pied de page (règle gravée n°6). */}
        <p className="border-t border-[var(--color-bronze)]/25 pt-6 text-center text-xs font-[var(--font-ui)] text-[var(--color-ice)]/80 leading-relaxed">
          ⚖️ Information éducative, pas un conseil personnalisé. NAVLYS est un média
          éditeur pédagogique financier, pas CIF, pas ORIAS, pas IOBSP. Aucune communication
          NAVLYS ne constitue un conseil en investissement. Performances passées ≠ performances
          futures. Avant toute décision, consulte un professionnel agréé. Tu gardes la barre.
        </p>
      </div>
    </main>
  );
}
