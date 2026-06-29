# 📦 Plan d'import de l'app Next.js complète (navlys.com)
*Décision Bruno « C » (2026-06-26) : préparer l'import de la vraie app pour un déploiement propre par push.*

## 🎯 Objectif
Amener le **vrai projet Next.js `navlys/`** (App Router, server actions, Supabase, API) dans le dépôt,
sous **`apps/navlys-app/`**, pour que Vercel déploie depuis là (**Root Directory = `apps/navlys-app`**),
sans casser `navlys.com` (on valide en **preview** avant toute promotion).

## 🧱 Pourquoi pas `live-source/`
`live-source/` = **capture STATIQUE** (pages `.html` + `/api` Edge + `navlys-alive.js`) — utile pour
vérifier la charte, **mais ce n'est PAS l'app Next.js** (pas de `app/`, pas de `package.json`, pas de
server actions). On garde `live-source/` comme **référence** ; la cible de déploiement = `apps/navlys-app/`.

## ✅ Ce qu'on a DÉJÀ (réutilisable)
- `live-source/app-config/` : `next.config.js`, `tailwind.config.js`, `globals.css`, `supabase-schema.sql` (charte `#7DD3FC` ✓).
- `live-source/api/` : `voice.js`, `sav.js`, `navlex.js`, `whatsapp-webhook.js` (Edge functions — VOICE_ID retiré ✓).
- `live-source/navlys-alive.js` (couche vivante + SAV).
- Docs de référence (code) : `recup-docs/onedrive/_APP_CLIENT_DOCUMENTATION_TECHNIQUE.md`,
  `_APP_CLIENT_MIDDLEWARE_AUTH.md`, `_APP_CLIENT_ONBOARDING_7_SCREENS.md`, `_APP_CLIENT_PERSONALIZATION_TS.md`,
  `03_API_BACKEND_NEXTJS.md`, `02_SECURITE_HTTP_HEADERS_NAVLYS.md`.

## 🔴 Ce qu'il MANQUE (à fournir par Bruno — le vrai projet)
Arborescence cible (d'après `_APP_CLIENT_DOCUMENTATION_TECHNIQUE.md`) :
- [ ] **`package.json`** + `package-lock.json` (les dépendances réelles) — **indispensable**
- [ ] **`app/`** (App Router : `(onboarding)/*`, `dashboard/`, `laboratoire/`, `profil/`, `auth/*`, `api/*`, `layout.tsx`, `globals.css`)
- [ ] **`components/`** (`onboarding/*`, `ui/`)
- [ ] **`lib/`** (`personalization-engine.ts`, `profiles-catalog.ts`, `types/`, `data/`, `supabase/`)
- [ ] **`middleware.ts`**, **`tsconfig.json`**, **`next.config.mjs`** (le vrai), **`i18n/{fr,en}.json`**
- [ ] **`public/`** (assets, `teaser.html`, `navlys-alive.js`, `/media/*` — vidéos exclues si trop lourdes)
- [ ] (option) `e2e/`, `playwright.config.ts`, `jest.config.ts`

## 🚫 À NE PAS importer
`node_modules/`, `.next/`, `.vercel/`, **`.env*` / toute clé** (les secrets vont en **variables d'env Vercel**, jamais dans Git).

## 🚚 Comment me le fournir (choisis le plus simple)
1. **Zip propre** : zippe le dossier `navlys/` **sans** `node_modules`/`.next`/`.env` → dépose-le (chat ou Drive). Je dézippe dans `apps/navlys-app/`.
2. **Dossier Drive** : mets le projet `navlys/` dans un dossier Drive → je le crawl et je l'importe.
3. **GitHub web** : tu uploades le dossier dans `apps/navlys-app/` (glisser-déposer).

## 🧭 Étapes APRÈS réception (Claude)
1. Importer sous `apps/navlys-app/`, scanner secrets (quarantaine si besoin).
2. Appliquer la charte `#7DD3FC` + slogan + dates (1ᵉʳ juillet 00:00 Europe/Paris) si résiduels.
3. `package.json` présent → build de vérif local possible.
4. **Tu règles** Vercel : Root Directory = `apps/navlys-app`, Framework = Next.js, **Production Branch = main**, + **variables d'env** (Supabase, Resend, ElevenLabs, Sentry…).
5. **Preview** comparé au live → **ton feu vert** → promotion prod.

> 🔒 Rien de public/payant sans ton feu vert. Secrets en env Vercel uniquement.
