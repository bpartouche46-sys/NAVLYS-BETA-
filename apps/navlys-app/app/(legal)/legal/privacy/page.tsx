// app/(legal)/legal/privacy/page.tsx — Politique de confidentialité NAVLYS (app navlys.com).
// Adaptée depuis recup-docs/onedrive/02_POLITIQUE_CONFIDENTIALITE_NAVBIO.md (structure RGPD, droits art.15-22,
// sous-traitants, durées) + 08_CONFORMITE_LEGALE_VOIX_CLONEE.md §6 (données voix) + 09_FAQ_JURIDIQUE_PUBLIC.md.
// Stack NAVLYS réelle (CLAUDE.md) : Supabase EU (DB/Auth), Resend (emails), Sentry (monitoring),
// ElevenLabs + Cloudflare R2 (voix/cache), Anthropic (NAV IA), Vercel (hébergement).
import type { Metadata } from 'next';
import { G1Footer } from '@/components/legal/G1Footer';

export const metadata: Metadata = {
  title: 'Confidentialité — NAVLYS',
  description:
    'Politique de confidentialité NAVLYS : données traitées, sous-traitants (Supabase, Resend, ' +
    'Sentry, ElevenLabs, Anthropic, Vercel), durées, droits RGPD (art. 15-22), contact DPO.',
};

export default function PrivacyPage() {
  return (
    <article className="flex flex-col gap-6 font-[var(--font-body)] text-lg leading-relaxed text-[var(--color-pearl)]/90">
      <header className="flex flex-col gap-2">
        <h1 className="font-[var(--font-display)] text-3xl text-[var(--color-ice)]">
          Politique de confidentialité
        </h1>
        <p className="font-[var(--font-ui)] text-sm text-[var(--color-pearl)]/60">
          Conforme RGPD (UE 2016/679) et Loi Informatique et Libertés. Hébergement EU.
          {' '}
          <span className="text-[var(--color-gold)]">
            Projet — à valider par DPO/avocat avant production.
          </span>
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          1. Responsable de traitement
        </h2>
        <p>
          Le responsable de traitement est <strong>NAVLYS</strong>, média éditeur pédagogique
          financier opérant depuis la France. Pour toute question, demande d&apos;exercice de
          droits ou réclamation : <strong>dpo@navlys.com</strong>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          2. Données traitées
        </h2>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li>
            <strong>Compte & authentification</strong> : email, identifiant. Base légale :
            exécution du contrat (art. 6.1.b). Géré via Supabase EU (magic link / OAuth).
          </li>
          <li>
            <strong>Profil NAVLYS</strong> : réponses au questionnaire « Mon Cap Rêvé », profil
            calculé, préférences. Base légale : exécution du service.
          </li>
          <li>
            <strong>Échanges avec NAV IA</strong> : messages traités pour te répondre et améliorer
            le service. Base légale : exécution du contrat + intérêt légitime.
          </li>
          <li>
            <strong>Préférences voix</strong> (auto-lecture, vitesse, langue) : exécution du
            service. Journal d&apos;usage voix (anonymisé) : intérêt légitime.
          </li>
          <li>
            <strong>Métadonnées techniques</strong> : adresse IP, user-agent, logs de connexion,
            erreurs (Sentry). Base légale : intérêt légitime (sécurité, qualité de service).
          </li>
        </ul>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/70">
          NAVLYS ne vend, ne loue, ne cède aucune donnée à des courtiers ou plateformes
          publicitaires. Le modèle économique est l&apos;abonnement, pas la publicité.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          3. Sous-traitants
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-[var(--font-ui)] text-sm">
            <thead className="text-[var(--color-ice)]/80">
              <tr className="border-b border-[var(--color-bronze)]/20">
                <th className="py-2 pr-3">Sous-traitant</th>
                <th className="py-2 pr-3">Rôle</th>
                <th className="py-2">Garanties</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-pearl)]/80">
              {[
                ['Supabase', 'Base de données & authentification (région EU)', 'RLS, DPA, chiffrement au repos'],
                ['Resend', 'Emails transactionnels & marketing (opt-in)', 'DPA, SCC EU'],
                ['Sentry', 'Monitoring d’erreurs', 'DPA, données techniques minimisées'],
                ['ElevenLabs', 'Synthèse vocale (voix IA)', 'DPA, SCC EU, non-entraînement (PVC)'],
                ['Cloudflare R2', 'Cache audio chiffré (TTL court)', 'DPA, SCC EU, ISO 27001'],
                ['Anthropic', 'NAV IA (API Claude)', 'DPA, traitement éphémère sans entraînement'],
                ['Vercel', 'Hébergement frontend (Edge Frankfurt)', 'DPA, SCC EU'],
              ].map(([nom, role, garantie]) => (
                <tr key={nom} className="border-b border-[var(--color-bronze)]/10">
                  <td className="py-2 pr-3 font-semibold">{nom}</td>
                  <td className="py-2 pr-3">{role}</td>
                  <td className="py-2">{garantie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/70">
          Lorsque des sous-traitants opèrent depuis les USA, NAVLYS s&apos;appuie sur les Clauses
          Contractuelles Types (SCC 2021/914) et, le cas échéant, le cadre EU-US Data Privacy Framework.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          4. Durées de conservation
        </h2>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li>Compte actif : tant que le compte existe.</li>
          <li>Compte supprimé : effacement définitif sous 30 jours après la demande.</li>
          <li>Logs techniques : 12 mois (art. R10-13 CPCE).</li>
          <li>Journal d&apos;usage voix : 365 jours puis anonymisation.</li>
          <li>Cache audio (R2) : TTL court (≈ 30 jours), puis suppression.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          5. Tes droits (RGPD art. 15-22)
        </h2>
        <p>Tu disposes des droits suivants :</p>
        <ul className="ml-5 list-disc font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85 flex flex-col gap-1">
          <li><strong>Accès</strong> (art. 15) — obtenir copie de tes données ;</li>
          <li><strong>Rectification</strong> (art. 16) — corriger une donnée inexacte ;</li>
          <li><strong>Effacement</strong> (art. 17) — droit à l&apos;oubli ;</li>
          <li><strong>Limitation</strong> (art. 18) ;</li>
          <li><strong>Portabilité</strong> (art. 20) — export de tes données ;</li>
          <li><strong>Opposition</strong> (art. 21) ;</li>
          <li><strong>Non-soumission au profilage automatisé</strong> (art. 22).</li>
        </ul>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85">
          Exercice par email à <strong>dpo@navlys.com</strong> avec justificatif d&apos;identité.
          Réponse sous 1 mois maximum (extension de 2 mois si demande complexe). Tu peux aussi
          saisir la <strong>CNIL</strong> (cnil.fr/fr/plaintes).
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-[var(--font-display)] text-xl text-[var(--color-bronze)]">
          6. Cookies & sécurité
        </h2>
        <p className="font-[var(--font-ui)] text-base text-[var(--color-pearl)]/85">
          NAVLYS utilise des cookies techniques de session (exempts de consentement, art. 82 LIL).
          Pas de tracker publicitaire tiers par défaut. Transit en TLS 1.3, hébergement chiffré
          au repos. Mineurs : le service n&apos;est pas conçu pour les moins de 16 ans (art. 8 RGPD).
        </p>
      </section>

      <G1Footer />
    </article>
  );
}
