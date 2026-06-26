# 🧭 NAVLYS APP CLIENT — Documentation technique Beta v1.0

**Verrouillé : 28 mai 2026 · Beta 1er juin 2026 · Maintainer : Bruno Mark Partouche (bruno@navlys.com)**

---

## 1. Architecture vue d'ensemble

```
                ┌────────────────────────────────────────────┐
                │   Utilisateur (mobile-first, FR/EN)        │
                └──────────────────┬─────────────────────────┘
                                   │ HTTPS
                                   ▼
                ┌────────────────────────────────────────────┐
                │   Vercel Edge Network (Frankfurt fra1)     │
                │   • Edge functions middleware              │
                │   • Static cache pages publiques           │
                │   • Image optimisation                     │
                └──────────────────┬─────────────────────────┘
                                   │
                                   ▼
                ┌────────────────────────────────────────────┐
                │   Next.js 14 App Router (Node serverless)  │
                │   • Server actions (questionnaire, auth)   │
                │   • Server components (profil, dashboard)  │
                │   • Personalisation engine (TS port M3)    │
                └────────────┬────────────────────┬──────────┘
                             │                    │
                  ┌──────────▼──┐         ┌───────▼──────────┐
                  │  Supabase   │         │  Resend / Postal │
                  │  Postgres + │         │  (emails magic   │
                  │  Auth + RLS │         │  link, alertes)  │
                  └──────────┬──┘         └──────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │  Sentry  + Logflare │
                  │  (errors + audit)   │
                  └─────────────────────┘
```

### Choix techniques verrouillés

| Couche | Choix | Justification |
|---|---|---|
| Framework | Next.js 14 App Router | Déjà utilisé pour `navlys-app`, App Router en stable, server actions natives |
| Hébergement | Vercel (team `navlys`) | CLI testé, Edge Frankfurt = latence basse UE, plan Pro 20 USD/mois suffit Beta |
| Auth + DB | Supabase EU (Frankfurt) | RGPD-friendly, RLS par défaut, magic link gratuit, généreux free tier |
| Email transactionnel | Resend (Frankfurt) | Compatible domaine custom, 100 mails/jour gratuit, SPF/DKIM faciles |
| Monitoring | Sentry + Vercel Analytics | Free tier Sentry suffit (5 k events/mois), Vercel Analytics gratuit avec plan Pro |
| Paiement | Stripe (Beta : désactivé) | À activer V1.1 pour 49 €/mois et 490 €/an — Beta 100 % démo gratuite 15 j |

---

## 2. Arborescence du dépôt

```
navlys-app/
├── app/
│   ├── (marketing)/                  # Pages publiques marketing (vide Beta)
│   ├── (onboarding)/
│   │   ├── layout.tsx
│   │   ├── dream/page.tsx
│   │   ├── questionnaire/[step]/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── routine/page.tsx
│   │   ├── expectations/page.tsx
│   │   ├── activate/page.tsx
│   │   ├── blocked/page.tsx
│   │   └── _actions.ts               # Server actions
│   ├── dashboard/page.tsx
│   ├── laboratoire/
│   │   ├── cartes/page.tsx
│   │   └── hypotheses/page.tsx
│   ├── profil/page.tsx
│   ├── auth/
│   │   ├── sign-in/page.tsx
│   │   ├── callback/route.ts
│   │   └── sign-out/route.ts
│   ├── api/
│   │   ├── health/route.ts
│   │   └── webhook/stripe/route.ts   # V1.1
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── onboarding/
│   │   ├── DisclaimerBanner.tsx
│   │   ├── ProgressTopBar.tsx
│   │   ├── QuestionStep.tsx
│   │   ├── ProfileReveal.tsx
│   │   ├── AllocationBars.tsx
│   │   └── ExpectationGauge.tsx
│   └── ui/                           # shadcn primitives
├── lib/
│   ├── personalization-engine.ts
│   ├── profiles-catalog.ts
│   ├── types/navlys-domain.ts
│   ├── data/profiles.ts
│   ├── data/daily.ts
│   ├── supabase/
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   └── client.ts
│   └── __tests__/personalization-engine.test.ts
├── e2e/
│   ├── onboarding-marin-prudent.spec.ts
│   ├── onboarding-capitaine.spec.ts
│   ├── onboarding-entrepreneur.spec.ts
│   ├── onboarding-etudiant.spec.ts
│   ├── onboarding-skipper.spec.ts
│   ├── onboarding-pro-actif.spec.ts
│   └── onboarding-navigateur-curieux.spec.ts
├── public/                           # gardé : assets statiques + teaser.html
├── i18n/
│   ├── fr.json
│   └── en.json
├── middleware.ts
├── next.config.mjs
├── package.json
├── playwright.config.ts
├── jest.config.ts
└── tsconfig.json (strict: true)
```

---

## 3. tsconfig — TypeScript strict obligatoire

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "incremental": true,
    "paths": { "@/*": ["./*"] },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 4. Variables d'environnement complètes

| Nom | Scope | Description | Source |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | URL projet Supabase | Bruno → Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | JWT anon (protégé RLS) | Bruno → Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server** | JWT service_role (bypass RLS) | Bruno → Supabase Dashboard |
| `NEXT_PUBLIC_LAUNCH_UNLOCKED` | Public | 'false' avant 31/05, 'true' après | Bruno bascule manuellement |
| `NEXT_PUBLIC_APP_URL` | Public | https://navlys.com | constant |
| `NAVLYS_ENCRYPTION_SECRET` | Server | 32+ chars rotateable | Bruno → genérer `openssl rand -hex 32` |
| `RESEND_API_KEY` | Server | clé Resend | Bruno → Resend Dashboard |
| `SENTRY_DSN` | Server | DSN Sentry | Bruno → Sentry Dashboard |
| `NEXT_PUBLIC_SENTRY_DSN` | Public | DSN client (rate-limited) | idem |
| `VT` | Local CLI | Token Vercel deploy (jamais commit) | Bruno → Vercel Personal Settings |

Configuration via `vercel env add <NAME>` ou Dashboard Vercel → Settings → Environment Variables. **Aucune valeur ne doit apparaître en clair dans `.env`, `Notion`, `Slack`, ou un PDF.**

---

## 5. Commandes développement

```bash
# Install
cd Downloads/navlys-app
npm install

# Dev (port 3000)
npm run dev

# Tests unitaires (Jest + ts-jest)
npm test

# Tests E2E (Playwright)
npx playwright install --with-deps
npm run test:e2e

# Lint + typecheck strict
npm run lint
npm run typecheck

# Build local
npm run build && npm start

# Deploy preview Vercel
/tmp/vdir/node_modules/.bin/vercel deploy --token=$VT --scope navlys

# Deploy production Vercel (UNE FOIS À LA FOIS, attendre READY)
/tmp/vdir/node_modules/.bin/vercel deploy --prod --yes --token=$VT --scope navlys
```

⚠️ **G1 déploiement.** Ne jamais enchaîner deux deploys `--prod` rapprochés. Attendre READY (poll API Vercel) avant le suivant — sinon 404 transitoires et builds ERROR concurrents (incident 24/05).

---

## 6. Migration Supabase

```bash
# Une seule fois : créer le projet via Dashboard Supabase (région eu-central-1 Frankfurt)
# Puis appliquer le schéma :
psql "<connection_string>" -f _APP_CLIENT_SUPABASE_SCHEMA.sql

# Ou via CLI Supabase si tu veux les migrations versionnées :
npx supabase migration new initial_schema
# coller le contenu du SQL dans le fichier généré
npx supabase db push
```

---

## 7. CI/CD

### GitHub Actions `.github/workflows/ci.yml`

```yaml
name: CI
on: { push: { branches: [main] }, pull_request: {} }

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL:      ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON }}
```

Deploy auto Vercel via intégration GitHub native (preview par PR + prod sur `main`).

---

## 8. Estimation des coûts mensuels (Beta → 500 users)

| Service | Plan | Coût mensuel | Justification |
|---|---|---:|---|
| Vercel | Pro (1 seat) | **20 USD ≈ 19 €** | Edge functions, analytics, bandwidth 1 TB |
| Supabase | Pro | **25 USD ≈ 24 €** | 8 GB DB, 100 GB egress, daily backups, auth illimitée |
| Resend | Plan Pro | **20 USD ≈ 19 €** | 50 000 mails/mois, domaine custom, analytics |
| Sentry | Team | **26 USD ≈ 25 €** | 50 k erreurs/mois, retention 30 j |
| Domaines (navlys.com, brunopartouche.com, etc.) | Namecheap | **≈ 3 €/mois lissés** | Renewal ~36 €/an chacun |
| OpenAI / Anthropic API (NAV IA chat) | usage-based | **≈ 5 €** estimé Beta 500 users | Claude Haiku majoritaire, escalade Sonnet rare |
| Bunny CDN (vidéos teaser optionnel) | usage-based | **≈ 0 €** | si bandwidth < 100 GB/mois |
| **TOTAL Beta** | | **≈ 95 €/mois** | hors temps Bruno |

À 5 000 users payants V1.1 (49 €/mois) → revenu brut ~245 k€/an, infra ~200 €/mois. Marge brute très confortable.

---

## 9. Plan de déploiement Beta — calendrier 28→31 mai 2026

| Jour | Étape | Owner |
|---|---|---|
| 28/05 nuit | Documents tech livrés (ce pack 6 fichiers) | Claude |
| 29/05 matin | Bruno crée projet Supabase + applique SQL | **Bruno** |
| 29/05 après-midi | Bruno configure Resend + DNS SPF/DKIM | **Bruno** |
| 29/05 soir | Claude génère le code dans `navlys/` (PR scaffold) | Claude |
| 30/05 | Tests E2E Playwright passent en CI | Claude + Bruno |
| 31/05 minuit Jérusalem | `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` | **Bruno** |
| 1/06 06:00 UTC+3 | Annonce Beta sur LinkedIn + WhatsApp + mail privé | **Bruno** |
| 1/06 → 15/06 | Suivi Sentry + analytics, fix bugs P0/P1 | Claude + Bruno |
| 16/06 | Bilan Beta-15j, décision V1.1 | **Bruno** |

---

## 10. Observabilité et alertes

- **Sentry** : projet `navlys-app`. Alerte Slack/email si `> 10 erreurs / 5 min` sur prod.
- **Vercel Analytics** : suivi LCP, CLS, INP, FID. Objectif LCP < 2,5 s.
- **Supabase Logs** : surveiller les requêtes RLS rejetées (= tentative cross-user, alerte sécurité).
- **Tâche planifiée existante `veille-infra-navlys`** : ajouter check `/api/health` (200 OK + signature Supabase) tous les lundis 8h.

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServerActionClient();
  const { error } = await supabase.from('cartographe_publications').select('id').limit(1);
  return NextResponse.json({
    status: error ? 'degraded' : 'ok',
    ts: new Date().toISOString(),
    error: error?.message ?? null,
  }, { status: error ? 503 : 200 });
}
```

---

## 11. Backup & restauration

- Supabase Pro = **daily backups automatiques** sur 7 jours + PITR 7 jours (option payante +25 USD/mois activable V1.1).
- Export manuel hebdomadaire `pg_dump` → stocké chiffré dans Box Bruno (`/NAVLYS/_BACKUPS/supabase/YYYY-MM-DD.dump.gpg`).
- Restauration testée 1× par trimestre (procédure dans `_RUNBOOK_RESTORE_SUPABASE.md` à créer V1.1).

---

## 12. Accessibilité (WCAG 2.1 AA)

- Audit Lighthouse cible **≥ 95 sur accessibility**.
- Contrastes vérifiés (ice/night 11.4:1, bronze/night 4.8:1, pearl/night 18:1).
- Navigation 100 % clavier (Tab, Enter, Espace, flèches sur sliders).
- `aria-live="polite"` sur la barre de progression questionnaire.
- Toutes les illustrations emoji ont `aria-hidden="true"` + label textuel à côté.
- Pas d'auto-play vidéo sans contrôle (logo NAVLYS muet, lecture user-initiée si non préchargé).

---

## 13. RGPD et conformité

- Données stockées dans l'UE (Supabase Frankfurt, Vercel Frankfurt).
- Page `/legal/privacy` (FR + EN) avec : finalités, base légale, durée, droits Article 15-22 RGPD, contact DPO Bruno.
- Cookie de session = httpOnly secure + SameSite=Strict.
- Aucun tracker tiers Beta (pas de GA, pas de Meta Pixel).
- Suppression de compte = soft-delete (`users.deleted_at`) puis hard-delete sous 30 jours via job cron Vercel.

---

## 14. Disclaimer G1 — rappel permanent

> ⚖️ NAVLYS est un **éditeur de contenu pédagogique financier** (média, comme un blog ou une chaîne YouTube spécialisée). NAVLYS n'est **pas** un CIF, n'est **pas** ORIAS, n'est **pas** IOBSP. Bruno Mark Partouche n'est pas enregistré comme conseiller financier. Les liens partenaires éventuels sont en **mode publisher CPA**, légaux sans agrément.
>
> NAVLYS ne fournit **aucun conseil personnalisé** au sens réglementaire. L'utilisateur reste seul décisionnaire de ses placements.

Ce disclaimer apparaît : 1) bannière permanente onboarding/dashboard, 2) dans chaque carte profil, 3) en pied de page de l'app, 4) dans la sortie JSON du moteur (`disclaimer` field), 5) dans `/legal/disclaimer-g1`.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
