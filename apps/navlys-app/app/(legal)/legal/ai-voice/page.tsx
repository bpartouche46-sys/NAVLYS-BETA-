// app/(legal)/legal/ai-voice/page.tsx — Politique de voix IA NAVLYS.
// Contenu transcrit depuis recup-docs/onedrive/08_CONFORMITE_LEGALE_VOIX_CLONEE.md §9 (contenu exact de
// la page navlys.com/legal/ai-voice) + §1 (mention IA Act art. 50) + §3 (charte d'usage R1-R7) + §6 (RGPD).
// Le titulaire de la voix est nommé car requis légalement (consentement biométrique RGPD art. 9 + IA Act).
import type { Metadata } from 'next';
import { G1Footer } from '@/components/legal/G1Footer';

export const metadata: Metadata = {
  title: 'Politique de voix IA — NAVLYS',
  description:
    "Politique de voix IA NAVLYS : transparence IA Act (art. 50), consentement explicite et révocable, " +
    'garde-fous anti-deepfake. La voix reste dans l’écosystème NAVLYS.',
};

export default function AiVoicePage() {
  return (
    <article className="flex flex-col gap-6 font-[var(--font-body)] text-lg leading-relaxed text-[var(--color-pearl)]/90">
      <header className="flex flex-col gap-2">
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ice)]">
          Notre politique de voix IA
        </h1>
        <p className="font-[var(--font-ui)] text-sm text-[var(--color-pearl)]/60">
          Transparence IA Act (Règlement européen sur l&apos;IA, art. 50) · RGPD · droit à la voix.
        </p>
      </header>

      <p>
        NAVLYS utilise une voix clonée par IA, modèle officiel de Bruno Mark Partouche, créé avec son
        consentement explicite et révocable (via ElevenLabs), pour rendre les réponses de
        l&apos;assistant NAV IA plus humaines. La mention « Voix générée par IA » apparaît en
        permanence sous chaque lecteur audio.
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Ce que la voix fait
        </h2>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li>elle lit les réponses pédagogiques de NAV IA ;</li>
          <li>elle narre les biographies, articles, FAQ et manifestos officiels NAVLYS.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Ce que la voix NE FAIT JAMAIS
        </h2>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li>elle ne lit pas du texte arbitraire d&apos;un utilisateur ;</li>
          <li>elle ne donne pas de conseil financier personnalisé ;</li>
          <li>elle n&apos;est utilisée dans aucun cadre frauduleux, politique, religieux ;</li>
          <li>elle n&apos;est pas exportée hors écosystème NAVLYS.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Nos garde-fous anti-deepfake
        </h2>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li>la voix ne lit que du texte généré par NAV IA dans son cadre G1, ou pré-rédigé et validé ;</li>
          <li>aucun texte issu d&apos;un input utilisateur ne peut être renvoyé en voix ;</li>
          <li>
            refus systématique de synthétiser : insultes, propos politiques, religieux, sexuels,
            diffamatoires, ou conseils fiscaux/médicaux/juridiques personnalisés ;
          </li>
          <li>l&apos;identifiant technique de la voix (VOICE_ID) ne quitte jamais le serveur ;</li>
          <li>journalisation de toute synthèse pour investigation a posteriori.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Conformité & données
        </h2>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85">
          Cadre : IA Act européen (art. 50, transparence des contenus générés par IA) · RGPD
          (l&apos;échantillon de voix est une donnée biométrique traitée sur la base du consentement
          explicite, art. 9) · droit à la voix (art. 9 Code civil). Le consentement est révocable à
          tout moment, avec préavis de 30 jours, déclenchant la suppression de la voix et
          l&apos;invalidation du modèle dans toutes les apps.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          Signaler un abus
        </h2>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85">
          Si tu penses que cette voix est utilisée hors de ce cadre, contacte-nous :
          {' '}<strong>abuse@navlys.com</strong> — réponse sous 48 h, suppression sous 7 j.
        </p>
      </section>

      <G1Footer />
    </article>
  );
}
