# 🛠 Audit dev `navlys-app` — 28/05/2026 (nuit)
_Lecture seule, pas de modification du code source._

## Stack confirmée
- **Next.js 14.2.15** (App Router)
- **React 18.3.1**
- **next-intl 3.20.0** (i18n FR/EN — `messages/`)
- **TailwindCSS 3.4.13**
- **Supabase SSR + JS** (`@supabase/ssr` 0.5.2, `@supabase/supabase-js` 2.45.4)
- **TypeScript 5.6.2**

## ⚠️ STRIPE NON INSTALLÉ
La dépendance `stripe` est **absente** du `package.json`. Avant de pousser le pack `_CODE_READY/`, exécuter :
```bash
cd navlys && npm install stripe @stripe/stripe-js
```

## Arborescence `app/` existante
```
app/
├── [locale]/         ← routing i18n existant
├── api/
│   ├── alpaca/       ← endpoint paper trading (existant)
│   ├── binance/      ← endpoint prix crypto (existant)
│   ├── bybit/        ← endpoint prix crypto (existant)
│   ├── portfolio/    ← endpoint portefeuille (existant)
│   └── prices/       ← endpoint prix temps réel (existant)
├── cockpit/          ← page cockpit
├── dashboard/        ← page dashboard
├── education/        ← contenu pédagogique
├── jouer/            ← page démo
├── live-bio/         ← page bio live
├── login/            ← auth
├── marge/            ← page marge ?
├── methode/          ← méthode
├── objectif/         ← objectif
├── partenaires/      ← page liste partenaires (à étendre en [slug])
├── rejoindre-equipage/ ← CTA abonnement principal
├── signup/           ← inscription
├── univers/          ← hub
├── veille/           ← veille marché
├── globals.css
├── layout.tsx
└── page.tsx          ← landing
```

## ➕ Ce qu'il faut AJOUTER (depuis `_CODE_READY/`)

| Fichier source `_CODE_READY/` | Destination `navlys/` |
|---|---|
| `components/AffiliateRedirect.tsx` | `navlys/components/AffiliateRedirect.tsx` |
| `app/api/aff-click/route.ts` | `navlys/app/api/aff-click/route.ts` |
| `app/api/stripe-webhook/route.ts` | `navlys/app/api/stripe-webhook/route.ts` |
| `app/partenaires/[slug]/page.tsx` | `navlys/app/partenaires/[slug]/page.tsx` (nouveau sous-dossier) |
| `scripts/seed-stripe-test.mjs` | `navlys/scripts/seed-stripe-test.mjs` (créer dossier) |
| `data/partenaires.json` | `navlys/data/partenaires.json` (créer dossier) |

## Composants déjà présents
- `Disclaimer.tsx` ← peut être ré-utilisé pour le disclaimer affilié, ou refactor avec un mode "affiliate" en prop.
- `LaunchGate.tsx` ← **le gate verrouillé**. NE PAS TOUCHER tant que `NEXT_PUBLIC_LAUNCH_UNLOCKED` n'est pas défini en env.
- `CockpitImmersif.tsx`, `Nav.tsx`, `LanguageSwitcher.tsx` ← UI existante.

## Public/ (statiques)
- `teaser.html` = la page gate principale (cf. CLAUDE.md).
- Backups `.bak.html` à laisser intacts.
- Assets logo + vidéo (`navlys-logo.mp4`, `navlys-logo-poster.png`).

## Procédure suggérée pour Bruno (au réveil)
1. **Inspecter** les 6 fichiers de `_SITES_MASTER/_CODE_READY/`.
2. **Si OK** : copier vers `navlys/` (manuel ou `cp -r`).
3. `cd navlys && npm install stripe @stripe/stripe-js`.
4. `npm run build` localement → vérifier 0 erreur.
5. `git add . && git commit -m "feat: stripe + affiliate stack ready"` (NE PAS pousser tant que GitHub 2FA pas activée).
6. Une fois 2FA OK + Stripe TEST keys en env : `git push` → Vercel build auto.
7. **Tester webhook en TEST** avec carte `4242 4242 4242 4242`.
8. **Bascule LIVE** = ton OK exclusivement.

## ⚠️ Conformité respectée cette nuit
- Aucun fichier `navlys/` modifié.
- Aucun `npm install`.
- Aucun `git` exécuté.
- Aucun `vercel deploy`.
- Aucune clé en clair.
- Gate `LaunchGate.tsx` non touché.
