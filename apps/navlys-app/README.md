# `apps/navlys-app/` — Squelette app Next.js 14 (App Router) de navlys.com

> Statut : **SQUELETTE RECONSTITUÉ-DEPUIS-DOCS** (branche `claude/navlys-project-briefing-qi2w9j`).
> Ce dossier reconstitue la structure et le code documenté de l'app cliente NAVLYS à partir
> des fichiers `recup-docs/onedrive/_APP_CLIENT_*.md` + `02_SECURITE_HTTP_HEADERS_NAVLYS.md`
> et de `live-source/app-config/`. **Ce n'est PAS le vrai projet de Bruno** : il manque des
> fichiers de données et de contenu réels (listés plus bas). À compléter par l'import du
> dossier `navlys/` de Bruno avant tout déploiement.

## Règles respectées
- **Zéro secret commité** : seul `.env.example` (NOMS de variables, aucune valeur). Règle gravée n°7.
- **Charte verrouillée** : Ice Blue `#7DD3FC` (+ bronze/or/nuit/perle). Polices Cinzel / Cormorant
  Garamond / JetBrains Mono / Manrope.
- **Marque dépersonnalisée** : aucun positionnement « conseiller », Bruno invisible. Règle gravée n°1.
- **Disclaimer G1** : permanent (layout racine + bandeau onboarding). « Éditeur pédagogique,
  pas CIF / pas ORIAS / pas IOBSP ». Règle gravée n°6.
- **Gate** : `NEXT_PUBLIC_LAUNCH_UNLOCKED` reste `false` ; ouverture figée 1ᵉʳ juillet 2026 00:00
  (Europe/Paris). Aucune date « Jérusalem » dans le code (cf. ERR-005). Règle gravée n°3.
- **Paiement** : Stripe désactivé en Beta, aucun débit déclenché par le code (règle financière).

## Arbre des fichiers créés

```
apps/navlys-app/
├── .env.example                # NOMS de vars seulement (zéro valeur)
├── .eslintrc.json
├── .gitignore                  # node_modules, .next, .env*
├── README.md                   # ce fichier
├── next.config.mjs             # 9 headers sécurité (VERBATIM 02_SECURITE_HTTP_HEADERS)
├── package.json                # deps déduites (versions à confirmer) + scripts
├── postcss.config.js
├── tailwind.config.js          # charte (VERBATIM live-source)
├── tsconfig.json               # strict (VERBATIM doc)
├── middleware.ts               # gate + auth + redirect onboarding (VERBATIM)
├── scripts/
│   └── check-no-secrets-in-client.js   # circuit-breaker prebuild (VERBATIM)
├── app/
│   ├── globals.css             # variables charte #7DD3FC (VERBATIM onboarding §0)
│   ├── layout.tsx              # layout racine + fonts + footer G1 (reconstitué)
│   ├── page.tsx                # gate/accueil + slogan + countdown (reconstitué)
│   ├── (onboarding)/
│   │   ├── layout.tsx          # VERBATIM
│   │   ├── _actions.ts         # server actions VERBATIM
│   │   ├── dream/page.tsx      # écran 1 VERBATIM
│   │   ├── questionnaire/[step]/page.tsx  # écran 2 (12 Q) VERBATIM
│   │   ├── profile/page.tsx    # écran 3 VERBATIM
│   │   ├── routine/page.tsx    # écran 4 VERBATIM
│   │   ├── expectations/page.tsx  # écran 5 VERBATIM
│   │   ├── activate/page.tsx   # écran 6 VERBATIM
│   │   └── blocked/page.tsx    # Q12=non (corps reconstitué, redirection documentée)
│   ├── auth/
│   │   ├── sign-in/page.tsx    # VERBATIM
│   │   ├── callback/route.ts   # VERBATIM
│   │   └── sign-out/route.ts   # VERBATIM
│   ├── dashboard/page.tsx      # écran 7 VERBATIM
│   └── api/health/route.ts     # VERBATIM
├── components/onboarding/
│   ├── DisclaimerBanner.tsx    # VERBATIM
│   ├── ProgressTopBar.tsx      # STUB (corps non documenté)
│   ├── QuestionStep.tsx        # VERBATIM (dispatcher inputs = TODO documenté)
│   ├── ProfileReveal.tsx       # VERBATIM
│   ├── AllocationBars.tsx      # VERBATIM
│   └── ExpectationGauge.tsx    # VERBATIM
├── lib/
│   ├── personalization-engine.ts   # moteur M3 VERBATIM
│   ├── profiles-catalog.ts         # 7 profils VERBATIM
│   ├── types/navlys-domain.ts      # types + Zod VERBATIM
│   ├── data/profiles.ts            # getActiveProfile VERBATIM
│   ├── data/daily.ts               # STUB getDailyAction (contenu réel manquant)
│   └── supabase/{server,admin,client}.ts   # clients VERBATIM
├── public/
│   └── navlys-alive.js         # COPIE live-source (countdown 1er juillet 2026)
└── supabase/
    └── schema.sql              # COPIE live-source (schéma DB de référence)
```

## ✅ RECONSTITUÉ-DEPUIS-DOCS (transcrit verbatim quand le code était fourni)
- [x] `middleware.ts`, `lib/supabase/{server,admin,client}.ts` — `_APP_CLIENT_MIDDLEWARE_AUTH.md`
- [x] `app/auth/{sign-in,callback,sign-out}` — idem
- [x] Onboarding 7 écrans + composants + `_actions.ts` — `_APP_CLIENT_ONBOARDING_7_SCREENS.md`
- [x] `lib/personalization-engine.ts` + `profiles-catalog.ts` + `types/navlys-domain.ts` — `_APP_CLIENT_PERSONALIZATION_TS.md`
- [x] `next.config.mjs` (9 headers) — `02_SECURITE_HTTP_HEADERS_NAVLYS.md`
- [x] `tsconfig.json`, `.env.example` (noms), `scripts/check-no-secrets-in-client.js` — `_APP_CLIENT_DOCUMENTATION_TECHNIQUE.md`
- [x] `tailwind.config.js`, `app/globals.css` — `live-source/app-config/` + onboarding §0
- [x] `public/navlys-alive.js`, `supabase/schema.sql` — copies `live-source/`
- [x] `app/api/health/route.ts` — `_APP_CLIENT_DOCUMENTATION_TECHNIQUE.md` §10
- [x] `app/dashboard/page.tsx` — onboarding §8

## ❌ MANQUE — requiert le vrai projet de Bruno (`navlys/`)
À fournir / importer avant un build complet et un déploiement :

- [ ] **`lib/data/daily.ts`** — actuellement un **STUB**. Logique réelle de l'« action du jour »,
      calcul du drift d'allocation, banque de « cartes du jour ». (Référencé par le dashboard.)
- [ ] **`components/onboarding/inputs/*`** — composants `SliderInput / SingleChoice / MultiChoice /
      BinaryChoice` (la doc met un **TODO** dans `QuestionStep`). Sans eux, le questionnaire ne
      capture pas encore les réponses côté UI.
- [ ] **`components/onboarding/ProgressTopBar.tsx`** — STUB minimal (corps non documenté).
- [ ] **`app/(onboarding)/blocked/page.tsx`** — corps reconstitué (seule la redirection était documentée) ; vérifier le contenu réel.
- [ ] **`i18n/{fr,en}.json`** + setup `next-intl` (`i18n.ts`) — 12 locales. Contenus réels manquants
      (cf. `live-source/app-config/next.config.js` qui charge `next-intl/plugin`). Le `next.config.mjs`
      ici **n'inclut pas** encore le plugin i18n (TODO commenté dedans).
- [ ] **`lib/profiles-catalog.ts` / `lib/data/profiles.ts`** : présents et conformes à la doc, mais
      les **contenus éditoriaux finaux** (textes profils, univers) doivent être recoupés avec
      `_CARTOGRAPHE_M3_*` côté Bruno.
- [ ] **Routes/pages non livrées dans ce pack** : `app/(marketing)/*`, `app/laboratoire/{cartes,hypotheses}`,
      `app/profil/page.tsx`, `app/legal/{privacy,terms,disclaimer-g1}`, `app/api/webhook/stripe`
      (V1.1). Listées dans l'arbre `_APP_CLIENT_DOCUMENTATION_TECHNIQUE.md` §2 mais **sans code source**.
- [ ] **Tests** : `e2e/*.spec.ts` (Playwright), `lib/__tests__/personalization-engine.test.ts` (Jest),
      `playwright.config.ts`, `jest.config.ts` — la doc Jest fournit le test moteur (transcriptible si voulu).
- [ ] **Versions exactes des dépendances** — `package.json` ici utilise des versions **provisoires**
      déduites. Remplacer par le vrai `package-lock.json` de Bruno.
- [ ] **`supabase/schema.sql`** — copie de **référence** (extraction connecteur, peut différer à
      l'octet). **Re-vérifier l'original** avant exécution dans Supabase (région Frankfurt).
- [ ] **Assets statiques** : logo `navlys-logo.mp4`/poster, `/media/fond.mp4`, `/media/ambiance.mp3`,
      `teaser.html`, favicon — non inclus (gérés directement côté GitHub/Vercel au lien).
- [ ] **`/api/voice`, `/api/sav`, `/api/navlex`, `/api/whatsapp-webhook`** — implémentations dans
      `live-source/api/*` (couche « vivante »), pas portées en App Router ici. À intégrer si besoin.
- [ ] **Secrets** : toutes les valeurs `.env` → **Vercel env uniquement** (Bruno). Jamais dans Git.

## Déploiement (rappel)
Root Directory Vercel = `apps/navlys-app`, Framework = Next.js, équipe `NAVLYS`.
Un seul `vercel deploy --prod` à la fois, attendre READY (règle gravée n°7 ; ERR/incident 24/05).
