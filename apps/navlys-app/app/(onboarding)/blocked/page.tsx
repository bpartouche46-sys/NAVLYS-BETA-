// app/(onboarding)/blocked/page.tsx — écran « bloqué » (Q12 = non)
// ⚠️ Corps NON documenté verbatim (seule la redirection l'est : QuestionStep §3 +
//    middleware tests §9). Reconstitution cohérente avec le disclaimer G1.
// TODO(Bruno) : remplacer par le contenu réel si différent.
import Link from 'next/link';

export default function BlockedPage() {
  return (
    <section className="flex flex-col gap-6 flex-1 items-center text-center py-8">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        NAVLYS = éducation, pas conseil
      </h1>
      <p className="font-[var(--font-body)] text-lg text-[var(--color-pearl)]/85 max-w-sm">
        Tu cherches un <strong>conseiller personnalisé</strong> ? Ce n&apos;est pas ce
        qu&apos;est NAVLYS. NAVLYS est un média éducatif : il t&apos;explique et te
        rend autonome, mais ne décide jamais à ta place et ne gère pas ton argent.
      </p>
      <p className="font-[var(--font-ui)] text-sm text-[var(--color-ice)]/90 max-w-sm">
        Si tu changes d&apos;avis et que tu acceptes ce cadre, tu peux reprendre le
        questionnaire.
      </p>
      <Link href="/onboarding/dream"
            className="mt-2 block w-full max-w-xs py-4 rounded-2xl text-center
                       bg-[var(--color-bronze)] text-[var(--color-night)]
                       font-[var(--font-ui)] font-semibold">
        ← Reprendre depuis le début
      </Link>
    </section>
  );
}
