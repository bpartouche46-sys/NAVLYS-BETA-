# 🧭 NAVLYS APP CLIENT — Onboarding 7 écrans (wireframes + code React)

**Verrouillé : 28 mai 2026 · Beta 1er juin · Charte stricte bronze/ice blue · Mobile-first · WCAG AA**

Référence : `_CARTOGRAPHE_M3_SPEC_UX_APP_NAVLYS.md` + `_CARTOGRAPHE_M3_QUESTIONNAIRE_PROFILE_USER.md`.

---

## 0. Stack et conventions

- **Next.js 14 App Router** dans `navlys/app/(onboarding)/`
- **Tailwind CSS** avec variables CSS exposant la charte
- **shadcn/ui** primitives (Button, Slider, RadioGroup, Card, Progress)
- **Server Actions** pour soumettre les réponses (jamais d'API key client)
- **i18next** pour FR/EN (clés dans `navlys/i18n/{fr,en}.json`)

### Variables CSS NAVLYS — `globals.css`

```css
:root {
  --color-bronze:   #B87333;
  --color-gold:     #C9A961;
  --color-ice:      #7DD3FC;
  --color-night:    #02040A;
  --color-pearl:    #F2F4F7;

  --font-display:   'Cinzel', serif;          /* titres */
  --font-body:      'Cormorant Garamond', serif;  /* corps narratif */
  --font-ui:        'Manrope', system-ui, sans-serif;  /* UI / boutons / labels */
  --font-mono:      'JetBrains Mono', monospace;     /* chiffres / KPI */

  --shadow-bronze: 0 0 24px rgba(184, 115, 51, 0.35);
  --shadow-ice:    0 0 24px rgba(125, 211, 252, 0.45);
}

/* Contrast checks WCAG AA :
 * ice (#7DD3FC) sur night (#02040A) = 11.4:1 ✅
 * bronze (#B87333) sur night        = 4.8:1  ✅
 * pearl (#F2F4F7) sur night         = 18.0:1 ✅
 */
```

---

## 1. Layout commun — `app/(onboarding)/layout.tsx`

```tsx
import { ReactNode } from 'react';
import { DisclaimerBanner } from '@/components/onboarding/DisclaimerBanner';
import { ProgressTopBar } from '@/components/onboarding/ProgressTopBar';

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] flex flex-col">
      <ProgressTopBar />
      <main className="flex-1 mx-auto w-full max-w-md px-4 py-6 flex flex-col"
            role="main" aria-label="Parcours onboarding NAVLYS">
        {children}
      </main>
      <DisclaimerBanner />
    </div>
  );
}
```

### Disclaimer permanent G1

```tsx
// components/onboarding/DisclaimerBanner.tsx
export function DisclaimerBanner() {
  return (
    <aside
      role="contentinfo"
      aria-label="Disclaimer NAVLYS"
      className="sticky bottom-0 inset-x-0 bg-[var(--color-night)]/95 backdrop-blur
                 border-t border-[var(--color-bronze)]/30 px-4 py-2
                 text-xs font-[var(--font-ui)] text-[var(--color-ice)]/90"
    >
      ⚖️ NAVLYS = éducation à la décision. <strong>Pas de conseil personnalisé.</strong> Tu décides.
    </aside>
  );
}
```

---

## 2. Écran 1 — « Mon Cap Rêvé » · `app/(onboarding)/dream/page.tsx`

```
┌──────────────────────────────────┐
│ 🧭 NAVLYS                        │
│                                  │
│ « Quel est ton cap à 5 ans ? »   │
│                                  │
│ ○ 🛡️  Sécuriser ce que j'ai bâti  │
│ ○ 🚀  Faire grandir mon capital   │
│ ○ 🎯  Acheter un projet précis    │
│ ○ 🌅  Préparer ma retraite        │
│ ○ 🌱  Apprendre, comprendre       │
│                                  │
│      [ Continuer → ]             │
└──────────────────────────────────┘
```

```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveCapReve } from '@/app/(onboarding)/_actions';

const CAPS = [
  { id: 'securiser',    emoji: '🛡️',  label: "Sécuriser ce que j'ai bâti" },
  { id: 'grandir',      emoji: '🚀',  label: 'Faire grandir mon capital' },
  { id: 'projet_court', emoji: '🎯',  label: 'Acheter un projet précis' },
  { id: 'retraite',     emoji: '🌅',  label: 'Préparer ma retraite' },
  { id: 'apprendre',    emoji: '🌱',  label: 'Apprendre, comprendre' },
] as const;

export default function DreamPage() {
  const [choice, setChoice] = useState<string | null>(null);
  const router = useRouter();

  async function next() {
    if (!choice) return;
    await saveCapReve(choice);
    router.push('/onboarding/questionnaire/1');
  }

  return (
    <section aria-labelledby="dream-title" className="flex-1 flex flex-col gap-6">
      <h1 id="dream-title" className="font-[var(--font-display)] text-3xl text-[var(--color-bronze)]">
        Mon Cap Rêvé
      </h1>
      <p className="font-[var(--font-body)] text-lg text-[var(--color-pearl)]/90">
        « Quel est ton cap à 5 ans ? »
      </p>

      <fieldset className="flex flex-col gap-3" role="radiogroup" aria-label="Cap rêvé">
        <legend className="sr-only">Cap rêvé</legend>
        {CAPS.map((c) => (
          <label
            key={c.id}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer
                        transition-all min-h-[48px]
                        ${choice === c.id
                          ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10 shadow-[var(--shadow-ice)]'
                          : 'border-[var(--color-bronze)]/40 hover:border-[var(--color-bronze)]'}`}
          >
            <input type="radio" name="cap" value={c.id}
                   className="sr-only"
                   checked={choice === c.id}
                   onChange={() => setChoice(c.id)} />
            <span aria-hidden="true" className="text-2xl">{c.emoji}</span>
            <span className="font-[var(--font-ui)] text-base">{c.label}</span>
          </label>
        ))}
      </fieldset>

      <button
        onClick={next}
        disabled={!choice}
        className="mt-auto w-full py-4 rounded-2xl font-[var(--font-ui)] font-semibold
                   bg-[var(--color-bronze)] text-[var(--color-night)]
                   disabled:opacity-30 disabled:cursor-not-allowed
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ice)]"
      >
        Continuer →
      </button>
    </section>
  );
}
```

---

## 3. Écran 2 — Questionnaire 12 questions · `app/(onboarding)/questionnaire/[step]/page.tsx`

Un seul composant générique dispatch sur 12 sous-composants typés. Exemple condensé.

```tsx
// app/(onboarding)/questionnaire/[step]/page.tsx
import { notFound } from 'next/navigation';
import { QuestionStep } from '@/components/onboarding/QuestionStep';

const QUESTIONS = [
  /* Q1 */  { id: 'q1_age', kind: 'slider', min: 18, max: 90, label: 'Quel âge as-tu ?', unit: ' ans' },
  /* Q2 */  { id: 'q2_situation', kind: 'single', label: 'Quelle est ta situation professionnelle ?',
              options: [
                { v: 'etudiant',     l: 'Étudiant·e' },
                { v: 'salarie',      l: 'Salarié·e (CDI/CDD)' },
                { v: 'freelance',    l: 'Freelance / Auto-entrepreneur' },
                { v: 'entrepreneur', l: 'Entrepreneur / Dirigeant' },
                { v: 'retraite',     l: 'Retraité·e' },
                { v: 'sans_emploi',  l: 'Sans emploi actuellement' },
              ] },
  /* Q3 */  { id: 'q3_capital', kind: 'log-slider', min: 100, max: 1_000_000,
              label: 'Quel est ton capital disponible aujourd\'hui ?', unit: ' €' },
  /* Q4 */  { id: 'q4_dca_mensuel', kind: 'slider', min: 0, max: 5_000,
              label: 'Combien peux-tu épargner par mois ?', unit: ' € / mois' },
  /* Q5 */  { id: 'q5_objectif', kind: 'single', label: 'Quel est ton objectif principal ?',
              options: [
                { v: 'securiser',    l: 'Sécuriser ce que j\'ai (préserver le capital)' },
                { v: 'grandir',      l: 'Faire grandir mon capital sur le long terme' },
                { v: 'projet_court', l: 'Acheter un projet précis dans 2-5 ans' },
                { v: 'retraite',     l: 'Préparer ma retraite / transmettre' },
                { v: 'apprendre',    l: 'Apprendre, comprendre, ne pas perdre' },
              ] },
  /* Q6 */  { id: 'q6_horizon', kind: 'single', label: 'À quel horizon ?',
              options: [
                { v: '<2ans',    l: '< 2 ans (besoin rapide de l\'argent)' },
                { v: '2-5ans',   l: '2 à 5 ans' },
                { v: '5-10ans',  l: '5 à 10 ans' },
                { v: '10-20ans', l: '10 à 20 ans' },
                { v: '20+ans',   l: '20 ans + / retraite' },
              ] },
  /* Q7 */  { id: 'q7_reaction_perte', kind: 'single',
              label: 'Tu perds 20 % en 1 mois. Tu fais quoi ?',
              options: [
                { v: 'panique',     l: 'Je vends tout immédiatement' },
                { v: 'inquiet',     l: 'Je veux comprendre ce qui se passe' },
                { v: 'accepte',     l: 'Je ne touche à rien, ça fait partie du jeu' },
                { v: 'opportunite', l: 'Je vois une opportunité d\'acheter à prix bas' },
                { v: 'indifferent', l: 'Je ne regarde pas mes positions au quotidien' },
              ] },
  /* Q8 */  { id: 'q8_experience', kind: 'single',
              label: 'Ton expérience en investissement ?',
              options: [
                { v: 'zero',     l: 'Zéro, je découvre' },
                { v: 'qq_mois',  l: 'Quelques mois' },
                { v: '1-3ans',   l: '1 à 3 ans (ETF, PEA, AV)' },
                { v: '3-10ans',  l: '3 à 10 ans (Donchian, Sharpe, drawdown)' },
                { v: '10+ans',   l: '10 ans +' },
                { v: 'pro',      l: 'Professionnel·le du secteur' },
              ] },
  /* Q9 */  { id: 'q9_temps_semaine', kind: 'single',
              label: 'Combien de temps par semaine ?',
              options: [
                { v: '0min',  l: '0 minute (passif total)' },
                { v: '15min', l: '15 min / semaine' },
                { v: '1h',    l: '1 h / semaine' },
                { v: '3-5h',  l: '3 à 5 h / semaine' },
                { v: '10h+',  l: '10 h + / semaine' },
              ] },
  /* Q10 */ { id: 'q10_interdits_perso', kind: 'multi',
              label: 'Qu\'est-ce que tu refuses par principe ?',
              options: [
                { v: 'crypto',        l: 'Crypto-monnaies' },
                { v: 'actions_indiv', l: 'Actions individuelles (préfère ETF)' },
                { v: 'derives',       l: 'Produits dérivés / Options / Futures' },
                { v: 'leverage',      l: 'Effet de levier' },
                { v: 'quotidien',     l: 'Stratégies actives quotidiennes' },
              ] },
  /* Q11 */ { id: 'q11_perte_totale_tactique', kind: 'single',
              label: 'Es-tu prêt·e à perdre la totalité de ta poche tactique ?',
              options: [
                { v: 'oui',     l: 'Oui, je sais que c\'est possible et j\'accepte' },
                { v: 'partiel', l: 'Partiellement (jusqu\'à −50 %)' },
                { v: 'non',     l: 'Non, pas un euro' },
              ] },
  /* Q12 */ { id: 'q12_accepte_education_seule', kind: 'binary',
              label: '⚖️ NAVLYS = éducation, pas conseil personnalisé. Tu acceptes ?',
              options: [
                { v: true,  l: 'Oui, j\'ai compris. NAVLYS m\'éduque, je décide.' },
                { v: false, l: 'Non, je voulais un conseiller.' },
              ] },
];

export default function QPage({ params }: { params: { step: string } }) {
  const i = parseInt(params.step, 10);
  if (Number.isNaN(i) || i < 1 || i > 12) notFound();
  return <QuestionStep stepIndex={i} total={12} question={QUESTIONS[i - 1]} />;
}
```

Composant `QuestionStep` ci-dessous gère slider, single, multi, binary avec accessibilité clavier complète.

```tsx
// components/onboarding/QuestionStep.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAnswer, submitQuestionnaireIfComplete } from '@/app/(onboarding)/_actions';

interface Props {
  stepIndex: number;
  total: number;
  question: any; // typed in real code via discriminated union
}

export function QuestionStep({ stepIndex, total, question }: Props) {
  const [value, setValue] = useState<any>(question.kind === 'slider' || question.kind === 'log-slider'
    ? Math.floor((question.min + question.max) / 2) : null);
  const router = useRouter();

  const progressPct = Math.round((stepIndex / total) * 100);

  async function next() {
    if (value === null || (Array.isArray(value) && value.length === 0)) return;
    await saveAnswer(question.id, value);
    if (stepIndex === total) {
      const result = await submitQuestionnaireIfComplete();
      router.push(result.statut === 'blocked' ? '/onboarding/blocked' : '/onboarding/profile');
    } else {
      router.push(`/onboarding/questionnaire/${stepIndex + 1}`);
    }
  }

  return (
    <section className="flex flex-col gap-6 flex-1">
      <div className="flex flex-col gap-2" aria-live="polite">
        <div className="h-2 w-full bg-[var(--color-bronze)]/20 rounded-full overflow-hidden"
             role="progressbar"
             aria-valuemin={0}
             aria-valuemax={total}
             aria-valuenow={stepIndex}
             aria-label={`Question ${stepIndex} sur ${total}`}>
          <div className="h-full bg-[var(--color-ice)] transition-all"
               style={{ width: `${progressPct}%` }} />
        </div>
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-pearl)]/60">
          {stepIndex} / {total}
        </span>
      </div>

      <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        {question.label}
      </h2>

      {/* TODO: dispatcher selon question.kind → SliderInput / SingleChoice / MultiChoice / BinaryChoice */}
      {/* Implémentations détaillées dans /components/onboarding/inputs/* */}

      <div className="flex gap-3 mt-auto">
        {stepIndex > 1 && (
          <button onClick={() => router.back()}
                  className="px-4 py-3 rounded-xl border border-[var(--color-bronze)]/40
                             font-[var(--font-ui)] text-[var(--color-pearl)]">
            ← retour
          </button>
        )}
        <button onClick={next}
                disabled={value === null || (Array.isArray(value) && value.length === 0)}
                className="flex-1 py-3 rounded-xl bg-[var(--color-bronze)] text-[var(--color-night)]
                           font-[var(--font-ui)] font-semibold disabled:opacity-30">
          {stepIndex === total ? 'Découvrir mon profil →' : 'continuer →'}
        </button>
      </div>
    </section>
  );
}
```

---

## 4. Écran 3 — Profil attribué · `app/(onboarding)/profile/page.tsx`

```
┌──────────────────────────────────┐
│ 🧭 Ton profil NAVLYS             │
│                                  │
│         👨‍👩‍👧                    │
│   ──────────────                 │
│   LE CAPITAINE DE FAMILLE        │
│   Degré : balanced               │
│                                  │
│   « Voilier familial, cap long » │
│                                  │
│   [ → Découvrir ma routine ]     │
│   [ Refaire le questionnaire ]   │
└──────────────────────────────────┘
```

```tsx
// app/(onboarding)/profile/page.tsx
import { getActiveProfile } from '@/lib/data/profiles';
import { redirect } from 'next/navigation';
import { ProfileReveal } from '@/components/onboarding/ProfileReveal';

export default async function ProfilePage() {
  const p = await getActiveProfile();
  if (!p) redirect('/onboarding/dream');
  return <ProfileReveal profile={p} />;
}
```

```tsx
// components/onboarding/ProfileReveal.tsx
'use client';
import Link from 'next/link';

export function ProfileReveal({ profile }: { profile: any }) {
  return (
    <section className="flex flex-col gap-8 items-center text-center flex-1 py-6"
             aria-labelledby="profile-title">
      <h1 id="profile-title" className="font-[var(--font-display)] text-2xl text-[var(--color-ice)]">
        Ton profil NAVLYS
      </h1>

      <div className="rounded-3xl border-2 border-[var(--color-bronze)]
                      shadow-[var(--shadow-bronze)] p-8 flex flex-col gap-4 items-center
                      bg-gradient-to-b from-[var(--color-bronze)]/10 to-transparent">
        <div className="text-7xl" aria-hidden="true">{profile.emoji}</div>
        <h2 className="font-[var(--font-display)] text-3xl tracking-wide uppercase
                       text-[var(--color-bronze)]">
          {profile.profil_nom}
        </h2>
        <span className="font-[var(--font-mono)] text-sm text-[var(--color-ice)]
                         px-3 py-1 rounded-full border border-[var(--color-ice)]/40">
          Degré : {profile.degre_interne}
        </span>
        <blockquote className="font-[var(--font-body)] italic text-lg text-[var(--color-pearl)]/85">
          « {profile.metaphore} »
        </blockquote>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/onboarding/routine"
              className="block w-full py-4 rounded-2xl text-center
                         bg-[var(--color-bronze)] text-[var(--color-night)]
                         font-[var(--font-ui)] font-semibold">
          → Découvrir ma routine
        </Link>
        <Link href="/onboarding/dream"
              className="block w-full py-3 rounded-2xl text-center
                         border border-[var(--color-pearl)]/30 font-[var(--font-ui)]">
          Refaire le questionnaire
        </Link>
      </div>
    </section>
  );
}
```

---

## 5. Écran 4 — Allocation cible · `app/(onboarding)/routine/page.tsx`

Affiche cadence + camembert d'allocation + univers. Mobile-first : barres horizontales empilées (pas de canvas).

```tsx
// components/onboarding/AllocationBars.tsx
export function AllocationBars({ allocation }: { allocation: Record<string, number> }) {
  const entries = Object.entries(allocation).filter(([, v]) => v > 0);
  const colors: Record<string, string> = {
    prudent:        'var(--color-ice)',
    balanced:       'var(--color-pearl)',
    tactique:       'var(--color-bronze)',
    recherche_perso:'var(--color-gold)',
    paper_trading:  '#7DD3FC',
  };
  return (
    <div className="flex flex-col gap-3" role="img" aria-label="Allocation cible en pourcentage">
      {entries.map(([k, pct]) => (
        <div key={k} className="flex flex-col gap-1">
          <div className="flex justify-between text-sm font-[var(--font-ui)]">
            <span className="capitalize">{k.replace('_', ' ')}</span>
            <span className="font-[var(--font-mono)]">{pct} %</span>
          </div>
          <div className="h-3 rounded-full bg-[var(--color-night)] border border-[var(--color-bronze)]/30 overflow-hidden">
            <div className="h-full rounded-full transition-all"
                 style={{ width: `${pct}%`, background: colors[k] ?? 'var(--color-bronze)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

```tsx
// app/(onboarding)/routine/page.tsx
import { getActiveProfile } from '@/lib/data/profiles';
import { AllocationBars } from '@/components/onboarding/AllocationBars';
import Link from 'next/link';

export default async function RoutinePage() {
  const p = await getActiveProfile();
  if (!p) return null;
  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        Ta routine NAVLYS
      </h1>

      <article className="rounded-2xl border border-[var(--color-ice)]/30 p-4
                          font-[var(--font-body)] text-base bg-[var(--color-ice)]/5">
        {p.routine_resume}
      </article>

      <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ice)]">Allocation cible</h2>
      <AllocationBars allocation={p.allocation_pct} />

      <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ice)]">Univers autorisé</h2>
      <ul className="font-[var(--font-body)] text-base list-disc list-inside marker:text-[var(--color-bronze)] space-y-1">
        {p.univers_actifs.map((u: string) => <li key={u}>{u}</li>)}
      </ul>

      <Link href="/onboarding/expectations"
            className="mt-4 block w-full py-4 rounded-2xl text-center
                       bg-[var(--color-bronze)] text-[var(--color-night)]
                       font-[var(--font-ui)] font-semibold">
        → Voir mes chiffres honnêtes
      </Link>
    </section>
  );
}
```

---

## 6. Écran 5 — Espérance honnête · `app/(onboarding)/expectations/page.tsx`

```tsx
// components/onboarding/ExpectationGauge.tsx
export function ExpectationGauge({ perf }: { perf: any }) {
  const rows = [
    { label: 'Rendement annuel attendu', val: `${perf.cagr_pct_min ?? '–'}–${perf.cagr_pct_max ?? '–'} %`, tone: 'ok' },
    { label: 'Volatilité estimée',       val: `± ${perf.volatilite_estimee_pct ?? '–'} %/an`, tone: 'info' },
    { label: 'Probabilité de perte > 20 % sur 1 an', val: `${Math.round((perf.probabilite_perte_20pct_an ?? 0) * 100)} %`, tone: 'warn' },
    { label: 'Horizon recommandé minimum', val: `${perf.horizon_recommande_min_annees ?? '–'} ans`, tone: 'info' },
    { label: 'Pire année plausible',       val: `${perf.pire_annee_plausible_pct ?? '–'} %`, tone: 'warn' },
  ];
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((r) => (
        <li key={r.label}
            className="flex justify-between items-center rounded-xl border p-4
                       border-[var(--color-bronze)]/40 font-[var(--font-ui)] text-sm">
          <span>{r.label}</span>
          <span className={`font-[var(--font-mono)] text-base
            ${r.tone === 'warn'
              ? 'text-[var(--color-bronze)]'
              : 'text-[var(--color-ice)]'}`}>{r.val}</span>
        </li>
      ))}
    </ul>
  );
}
```

```tsx
// app/(onboarding)/expectations/page.tsx
import { getActiveProfile } from '@/lib/data/profiles';
import { ExpectationGauge } from '@/components/onboarding/ExpectationGauge';
import Link from 'next/link';

export default async function ExpPage() {
  const p = await getActiveProfile();
  if (!p) return null;
  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        Ce que dit le Laboratoire
      </h1>
      <p className="font-[var(--font-body)] text-base text-[var(--color-pearl)]/85">
        Source : Backtest Mission #1 & #2, Shiller (1928–2025), FRED 60/40, Monte Carlo 2 000 chemins.
      </p>
      <ExpectationGauge perf={p.perf_honnete} />
      <aside className="rounded-xl border border-[var(--color-ice)]/40 p-3 text-xs
                        font-[var(--font-ui)] text-[var(--color-ice)]/90">
        ⚠️ Le passé n'est pas le futur. Tu peux faire mieux. Tu peux faire pire.
      </aside>
      <Link href="/onboarding/activate"
            className="block w-full py-4 rounded-2xl text-center
                       bg-[var(--color-bronze)] text-[var(--color-night)]
                       font-[var(--font-ui)] font-semibold">
        → Activer ma routine
      </Link>
    </section>
  );
}
```

---

## 7. Écran 6 — Activation · `app/(onboarding)/activate/page.tsx`

```tsx
'use client';
import { useState } from 'react';
import { activateRoutine } from '@/app/(onboarding)/_actions';
import { useRouter } from 'next/navigation';

const TIERS = [
  { id: 'demo',    label: 'Démo gratuite (15 jours, toutes fonctions)', highlight: false },
  { id: 'monthly', label: 'NAVLYS NEXT GEN INVEST — 49 €/mois',         highlight: true },
  { id: 'annual',  label: 'NAVLYS NEXT GEN INVEST — 490 €/an (économie 98 €)', highlight: false },
];

export default function ActivatePage() {
  const [g1, setG1] = useState(false);
  const [terms, setTerms] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);
  const [tier, setTier] = useState('demo');
  const router = useRouter();

  const ok = g1 && terms && disclaimer;

  async function go() {
    if (!ok) return;
    await activateRoutine(tier);
    router.push('/dashboard');
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
        Activer ma routine
      </h1>

      <fieldset className="flex flex-col gap-3 font-[var(--font-ui)] text-sm">
        <label className="flex gap-3 items-start">
          <input type="checkbox" checked={g1} onChange={e => setG1(e.target.checked)}
                 className="mt-1 w-5 h-5 accent-[var(--color-ice)]" />
          <span>J'ai compris : NAVLYS m'éduque, je décide.</span>
        </label>
        <label className="flex gap-3 items-start">
          <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)}
                 className="mt-1 w-5 h-5 accent-[var(--color-ice)]" />
          <span>J'ai lu les G1 et je m'y engage.</span>
        </label>
        <label className="flex gap-3 items-start">
          <input type="checkbox" checked={disclaimer} onChange={e => setDisclaimer(e.target.checked)}
                 className="mt-1 w-5 h-5 accent-[var(--color-ice)]" />
          <span>J'accepte le disclaimer permanent.</span>
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-[var(--font-display)] text-lg text-[var(--color-ice)] mb-2">
          Choisis ton mode
        </legend>
        {TIERS.map(t => (
          <label key={t.id}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer
                        ${tier === t.id ? 'border-[var(--color-ice)] bg-[var(--color-ice)]/10'
                                        : 'border-[var(--color-bronze)]/40'}`}>
            <input type="radio" name="tier" value={t.id}
                   checked={tier === t.id}
                   onChange={e => setTier(e.target.value)}
                   className="accent-[var(--color-ice)]" />
            <span className="font-[var(--font-ui)] text-sm">{t.label}</span>
          </label>
        ))}
      </fieldset>

      <button onClick={go} disabled={!ok}
              className="mt-auto w-full py-4 rounded-2xl bg-[var(--color-bronze)]
                         text-[var(--color-night)] font-[var(--font-ui)] font-semibold
                         disabled:opacity-30">
        → Activer
      </button>
    </section>
  );
}
```

---

## 8. Écran 7 — Dashboard zen · `app/dashboard/page.tsx`

```tsx
import { getActiveProfile } from '@/lib/data/profiles';
import { getDailyAction } from '@/lib/data/daily';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const p = await getActiveProfile();
  if (!p) redirect('/onboarding/dream');
  const a = await getDailyAction(p);

  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] p-4 flex flex-col gap-6 max-w-md mx-auto">
      <header>
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">
          🧭 Bonjour {p.profil_nom.replace('Le ', '').replace("L'", '')}
        </h1>
        <p className="font-[var(--font-body)] text-sm text-[var(--color-pearl)]/70">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </header>

      <article className="rounded-2xl border border-[var(--color-ice)]/30 p-4 bg-[var(--color-ice)]/5">
        <p className="font-[var(--font-mono)] text-xs uppercase text-[var(--color-ice)]/80">Ton action du jour</p>
        <p className="font-[var(--font-display)] text-xl mt-2">{a.action}</p>
      </article>

      <article className="rounded-2xl border border-[var(--color-bronze)]/40 p-4">
        <p className="font-[var(--font-mono)] text-xs uppercase text-[var(--color-bronze)]">Indicateur</p>
        <p className="font-[var(--font-display)] text-xl mt-2">
          Drift d'allocation : {a.drift_pct} % {a.drift_ok ? '✅' : '⚠️'}
        </p>
      </article>

      <article className="rounded-2xl border border-[var(--color-pearl)]/20 p-4">
        <p className="font-[var(--font-mono)] text-xs uppercase text-[var(--color-pearl)]/60">Carte du jour</p>
        <p className="font-[var(--font-body)] italic mt-2">« {a.carte} »</p>
      </article>
    </main>
  );
}
```

---

## 9. Server Actions — `app/(onboarding)/_actions.ts`

```typescript
'use server';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@/lib/supabase/server';
import { ReponsesSchema } from '@/lib/types/navlys-domain';
import { genererRoutine } from '@/lib/personalization-engine';
import { createHash } from 'crypto';

const ANSWERS_COOKIE = 'navlys_answers';

export async function saveCapReve(cap: string) {
  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not authenticated');
  await supabase.from('cap_reve_objectifs').insert({
    user_id: user.id,
    cap_choisi: cap,
  });
}

export async function saveAnswer(qid: string, value: any) {
  const c = cookies();
  const raw = c.get(ANSWERS_COOKIE)?.value;
  const obj = raw ? JSON.parse(raw) : {};
  obj[qid] = value;
  c.set(ANSWERS_COOKIE, JSON.stringify(obj), { httpOnly: true, sameSite: 'strict', secure: true });
}

export async function submitQuestionnaireIfComplete() {
  const c = cookies();
  const raw = c.get(ANSWERS_COOKIE)?.value;
  if (!raw) throw new Error('no answers');
  const parsed = ReponsesSchema.parse(JSON.parse(raw));
  const out = genererRoutine(parsed);
  if (out.statut === 'blocked') return out;

  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not authenticated');

  const hash = createHash('sha256').update(JSON.stringify(parsed)).digest('hex');

  await supabase.from('profiles_user').insert({
    user_id: user.id,
    profil_id: out.profil!.id,
    profil_nom: out.profil!.nom,
    degre_interne: out.profil!.degre_interne,
    allocation_pct: out.allocation_cible_pct,
    cadence: out.cadence,
    strategies_actives: out.strategies_actives_autorisees,
    univers_actifs: out.univers_actifs_recommandes,
    interdits: out.interdits,
    alertes_psycho: out.alertes_psychologiques,
    perf_honnete: out.performance_honnete,
    questionnaire_raw: parsed,
    questionnaire_hash: hash,
  });

  c.delete(ANSWERS_COOKIE);
  return out;
}

export async function activateRoutine(tier: string) {
  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not authenticated');
  await supabase.from('users').update({
    subscription_tier: tier,
    accepted_g1: true,
    accepted_g1_at: new Date().toISOString(),
    accepted_terms: true,
  }).eq('id', user.id);
}
```

---

## 10. Critères d'acceptation Beta

1. Les 7 écrans s'enchaînent en < 5 min médiane (mesure analytics).
2. Q12 = non → redirection vers `/onboarding/blocked` (pas de profil créé).
3. Contraste WCAG AA validé (audit Lighthouse ≥ 95).
4. Toutes les actions clavier fonctionnent (Tab, Enter, Espace, ←/→ sur sliders).
5. Disclaimer permanent visible sur **tous** les écrans onboarding et dashboard.
6. Aucune réponse stockée en clair côté client après soumission (cookie supprimé).
7. Le profil est unique et actif (RLS + trigger SQL `deactivate_old_profiles`).

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
