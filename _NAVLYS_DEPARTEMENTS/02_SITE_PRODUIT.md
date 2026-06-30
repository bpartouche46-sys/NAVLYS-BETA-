# 🚢 DÉPARTEMENT 02 — SITE & PRODUIT

> Briefing autonome. Une conversation qui lit ceci tient le code du site NAVLYS et le met en ligne, gate actif.
> Source de vérité projet : `Downloads/navlys/` (Next.js 14). Domaine : navlys.com (Vercel).

## 🎯 Mission
Faire vivre **le seul et unique** site NAVLYS : le projet `navlys/`. Déployer, garder le teaser/gate actif, intégrer les outils (objectif, marge, méthode, cockpit, veille, partenaires, rejoindre).

## 🧰 Périmètre
- **Gère** : tout `Downloads/navlys/` (app, components, lib, public, config), le déploiement Vercel, le gate.
- **Ne gère pas** : les visuels de marque (commande au 03), les prix Stripe (au 05), le DNS (au 06), les posts (au 04). Tu intègres ce qu'ils fournissent.

## 🗂️ Architecture (déjà en place)
- **Gate** : `app/layout.tsx` floute tout le site et affiche `LaunchGate` (iframe plein écran `/public/teaser.html`) tant que `NEXT_PUBLIC_LAUNCH_UNLOCKED !== 'true'`. ⛔ **Ne pas passer à `true` avant le 31 mai.**
- **Home** (`app/page.tsx`) : hero + 3 outils + parcours 7 escales + pricing teaser + partenaires.
- **Routes** : `/objectif` `/marge` `/methode` `/cockpit` `/univers` `/veille` `/partenaires` `/rejoindre-equipage` `/dashboard` `/education` `/login` `/signup` + API `app/api/{alpaca,binance,bybit,portfolio,prices}`.
- **Briques statiques** servies en iframe depuis `public/` : `teaser.html` (gate), `univers.html` (hub), `simulation.html`, `cockpit3.html` (4 véhicules : voilier/avion/vaisseau/voiture), `cockpit-immersif.html`, `resultats.html` (redirige vers /univers).
- **Lib** : `lib/objectif.ts` (calculs simulateur), `lib/margins.ts` (marge révélée), `lib/brokers/*`, `lib/supabase/*`.

## 🔧 Travaux récents (faits, 25 mai)
- ✅ Cockpit 4-véhicules (`cockpit3.html`) **branché** depuis `app/cockpit/page.tsx` (bouton « Choisir mon véhicule ») et depuis le hub `univers.html` (nav + section Outils).
- ✅ Hub `univers.html` complété : section « Les outils » reliant /objectif, /marge, /methode, /cockpit3.html.
- ✅ Tous les liens internes vérifiés (cibles `public/*.html` et routes `app/*` existent).

### 🆕 MAJ 7 juin 2026 (nuit) — teaser parallèle déployé hors `navlys/`
- Un **teaser bilingue indépendant** (pas dans `navlys/`) est **en prod sur Vercel** sous le compte `claudenavlys`, projet `navlys-teaser` :
  - https://navlys-teaser-navlys.vercel.app (200 OK · `ssoProtection` désactivée pour public)
  - Sources : `NAVLYS_TEASER_LAUNCH_PACK/` (complet) + `navlys-teaser-deploy/` (drag-drop) + zips à la racine.
- **Cible countdown = 31 mai 2026 (passée)** → la page affiche « NAVLYS est en ligne ». **Décision Bruno requise** : archiver / recibler 15 juin (ALCAPA) / supprimer le projet Vercel.
- Pas d'impact sur `navlys.com` (toujours gate principal). MX Google intacts. Pas de déploiement enchaîné.
- ⚠️ **Sécurité** : token Vercel partagé en clair dans la conv. → **révoquer + régénérer**.
- 🔬 R&D Dépt 07 a livré 2 prototypes Cockpit 2.0 (`NAVLYS-COCKPIT-360.html`, `NAVLYS-COCKPIT-v2.html`) — pas encore industrialisés ici. Si OK Bruno, intégration possible en `public/cockpit-v2.html` + route `/cockpit/v2`. CR : `_NAVLYS_INBOX/claude-cockpit-2026-06-07.md`.

## 📊 État & à faire
- ⚠️ **Build local non rejoué dans le bac à sable** (limite de temps) — `node_modules` présent (130 pkgs). À valider par `npm run build` avant prod.
- ⚠️ Déployer le site sur navlys.com (voir commande ci-dessous).
- 🔑 ENV vars à renseigner sur Vercel : affiliation brokers, liens Stripe (fournis par 05), endpoint capture email teaser.

## 🚀 Déploiement (méthode qui marche — un seul à la fois, attendre READY)
```
cd Downloads/navlys
npm install            # si besoin
npm run build          # valider AVANT prod
# CLI Vercel locale (pas -g) : /tmp/vdir/node_modules/.bin/vercel
vercel deploy --prod --yes --token=$VT --scope navlys
```
- Projet Vercel : `prj_YFENrKz8KPWE4HhiOodbB2sF8TUB` · team `team_nBtY5FOQMPIT4J8Bmf7wvBSC` (slug `navlys`).
- ⛔ **Ne JAMAIS enchaîner deux déploiements rapprochés** (404 transitoires + builds concurrents). Un seul, attendre READY.
- ⛔ Token Vercel en **variable d'env uniquement**, jamais en clair.

## 📍 Règles gravées
Gate actif jusqu'au 31 mai · disclaimer en pied de chaque page (`components/Disclaimer.tsx`) · langage simple maritime · palette `--ice #7DD3FC` / bronze / nuit `#02040a` · aucun secret committé.

## 🤝 Compte-rendu au QG (5 lignes) : fait / à faire / bloqué / décision / prochaine action.

## 🇬🇧 EN
Owns the single `navlys/` Next.js project: deploy, keep the teaser gate active (`NEXT_PUBLIC_LAUNCH_UNLOCKED=false` until May 31), integrate tools. Static bricks served via iframes from `public/`. Recent: wired the 4-vehicle cockpit (`cockpit3.html`) and completed the univers hub. To do: run `npm run build`, then one Vercel prod deploy (never chain deploys; token in env only).

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.

---

## 🧾 CR DE QUART — 25 mai 2026 (Dépt 02 → QG)
- **FAIT** : navlys.com redéployé (Vercel, READY) avec LE vrai teaser cockpit `teaser.html → cockpit3.html` (4 véhicules : voilier/avion/vaisseau/voiture), **logo animé** (`navlys-logo.mp4`) branché, **fonds enrichis** (espace : nébuleuses+planète+warp · mer : soleil+reflet+houle · route : coucher de soleil+voies · ciel : soleil+brume+nuages). Countdown **1er juin 2026, J/H/M/S** (ms retirés). Gate **ACTIF** (aucune ENV → verrouillé). Disclaimer pédagogique en pied. Toutes routes + assets (`/simulation.html`,`/resultats.html`,`/univers.html`,`/cockpit3.html`) = 200, zéro lien mort. Source `navlys/public/` resynchronisée (même base).
- **À FAIRE** : `npm run build` local non rejoué (mais build cloud Vercel ✅) ; brancher ENV affiliation/Stripe/capture-email (fournis par 05) ; intégrer de vraies vidéos MP4 de fond par véhicule si Bruno les fournit.
- **BLOQUÉ** : rien côté 02 (dépend de 05 = Stripe/affiliation, 06 = DNS).
- **DÉCISION** : gate reste verrouillé jusqu'au 1er juin (NEXT_PUBLIC_LAUNCH_UNLOCKED non défini) ; teaser canonique = `navlys/public/teaser.html`.
- **PROCHAINE ACTION** : signaler à 06/Direction des projets Vercel potentiellement doublons réapparus (`navlys-teaser`, `brunopartouche`, `brunopartouche-teaser`) — à arbitrer/supprimer par 06 avec OK Bruno (Règle 8 : listés, pas effacés).

---

## CR DE QUART — chantier brunopartouche.com (Dept 02 -> QG)
- **FAIT** : brunopartouche-com reconstruit (Next.js 15.5, Vercel READY), deploye public via API Vercel (token 1 jour scope navlys, jamais committe). Theme LED blue ice (noir + cyan #7DD3FC + sapphire). Selecteur FR/EN global. Pages FR+EN : accueil scroll unique, biographie enrichie (Bill Gates, Kompudeal, Isidore Partouche, Foir'Fouille 1Md, AXA 33152000, Sela Logistics), parcours 14 etapes, galerie animee, journal+revue presse RSS, NOVA Finance Club (Stripe live prod_UOvIxDD1TsJWHk, prix 49/490 EUR), NOVA Live Bio (39/149/299 EUR). SEO : schema.org Person+Service+FAQPage, sitemap, robots, 47 mots-cles, FAQ 10 Q&R FR + 10 EN. Domaine brunopartouche.com + www ajoutes au projet Vercel.
- **A FAIRE** : redeployer enrichissements prets (FAQSection, /methode, /routine, sitemap, schema, 2 entrees journal) ; convertir NOVA_Martingale.csv -> xlsx ; brancher STRIPE_SECRET_KEY live.
- **BLOQUE** : sandbox Linux intermittent ; cle Stripe live = Bruno ; DNS Namecheap = Dept 06.
- **DECISION A ARBITRER (Direction)** : (1) NOMMAGE — site perso en marque "NOVA" (demande directe Bruno) vs MASTER INDEX qui fixe "NAVLYS". Aligner ou garder NOVA sur le perso ? (2) GATE — brunopartouche.com est PUBLIC (demande Bruno) vs DISPATCH qui prevoit un teaser/gate jusqu'au 31 mai.
- **PROCHAINE ACTION** : attendre arbitrage Direction (NOVA/NAVLYS + gate), puis 1 seul redeploiement aligne ; convertir le CSV martingale en XLSX des sandbox dispo.

---

## 🧾 CR DE QUART — 25 mai 2026 (Dépt 02 → QG) · Transposition paper-trading derrière le gate
- **FAIT** : enrichissements paper-trading transposés DANS le projet `navlys/` (réconciliés avec la synchro OneDrive, zéro doublon créé). Routes `/veille` (cours crypto live CoinGecko), `/education` (bibliothèque), `/dashboard` (cockpit perso + portefeuille virtuel Supabase), `/login` `/signup`, API `app/api/{prices,portfolio,alpaca,binance,bybit}` — toutes héritent de la charte **ICE BLUE** via les variables aliasées de `globals.css`. `public/demo.html` (bac à sable sans compte) **re-skiné ice-blue/bronze** + **réparé** (la synchro OneDrive l'avait tronqué de 11 lignes ; restauré à 716 lignes, JS valide, disclaimer présent). **Homepage enrichie** : nouvelle section « Le bac à sable NAVLYS » surfaçant /demo.html, /veille, /education + lien cockpit perso. Nav déjà câblée (fait au quart précédent). `package.json` contient déjà `@supabase/ssr`+`supabase-js`. **Gate resté ACTIF** (NEXT_PUBLIC_LAUNCH_UNLOCKED non défini → layout floute + LaunchGate plein écran). `sql/schema.sql` prêt (portfolios+positions+trades, RLS, trigger auto-portefeuille).
- **À FAIRE** : `npm run build` local non rejoué (timeout sandbox) — à valider avant prod ; renseigner ENV sur Vercel (`NEXT_PUBLIC_AFFILIATE_*`, Supabase URL/anon/service_role, clés Alpaca/Binance/Bybit paper-testnet) ; 1 seul déploiement prod quand prêt.
- **BLOQUÉ** : rm bloqué en sandbox → 2 fichiers strays à archiver par Bruno (Règle 8) : `navlys/public/demo.html.bak_preskin` et `navlys/app/__wtest.txt` ; mount Linux en retard sur OneDrive (les writes via outils fichiers font foi).
- **DÉCISION** : palette **ICE BLUE conservée pour NAVLYS** (mes anciennes variables violet re-pointées, aucune réécriture de page) ; `demo.html` = bac à sable « essayer sans compte » canonique ; gate verrouillé jusqu'au 31 mai/1er juin.
- **PROCHAINE ACTION** : sur OK Bruno → `npm install && npm run build`, corriger toute erreur TS éventuelle, puis 1 seul `vercel deploy --prod` (token en env, attendre READY) ; renseigner les ENV ; signaler à 06 les éventuels projets Vercel doublons.

### Addendum build-readiness (même quart)
- ✅ Revue TS des fichiers transposés OK ; tous les imports externes résolus (`@supabase/ssr`, `@supabase/supabase-js`, `crypto` builtin, `next`, `react`) — zéro dépendance manquante.
- ✅ `require()` retiré de `lib/supabase/server.ts` → ESM propre (import top-level). `eslint.ignoreDuringBuilds` actif (lint ne bloque pas le build, TS reste vérifié). `next-env.d.ts` ajouté.
- ✅ Livrables déploiement créés : `navlys/DEPLOY-NAVLYS.ps1` (install→build→deploy, token en env, gate jamais déverrouillé) + `navlys/DEPLOIEMENT-CHECKLIST.md`.
- ⚠️ `npm run build` impossible en sandbox (node_modules incomplet : `typescript/lib/tsc.js` absent, `.bin` sans symlinks ; + timeout 45 s). Build à exécuter par Bruno localement (devrait passer).

### ✅ BUILD VERT confirmé — 25 mai 2026 (même quart)
- Reconstruit l'environnement de build dans le FS local du bac à sable (`/tmp/nb`), `npm install` réussi (117 pkgs, sans eslint car `ignoreDuringBuilds`), puis **`next build` EXIT=0**.
- **26 pages générées**, build optimisé OK : `/` (avec section bac à sable), `/dashboard` (154 kB), `/veille`, `/education`, `/login`, `/signup`, `/objectif`, `/marge`, `/methode`, `/cockpit`, `/univers`, `/jouer`, `/live-bio`, `/partenaires`, `/rejoindre-equipage` + **9 routes API** (alpaca/binance/bybit/portfolio/prices).
- Détail technique : le **mount Linux servait des copies tronquées** de `app/page.tsx` (255/331) et `lib/supabase/server.ts` (28/31) ; les versions **OneDrive (source réelle, lue via l'outil fichier) sont complètes et correctes** → j'ai reconstruit ces 2 fichiers dans le bac à sable pour builder à l'identique de la source. **Le déploiement Vercel depuis OneDrive produira le même build vert.**
- Conséquence : aucune erreur TypeScript réelle. Projet **déployable en l'état** (manque seulement les vraies ENV à renseigner sur Vercel).

---

## 📥 ORDRE QG — 25 mai : aperçu privé par CLÉ D'ACCÈS (les 2 sites)
- Livré par le QG : `navlys/public/acces.html` + `brunopartouche-LIVE/acces.html` = teaser cockpit **page unique** (4 véhicules, fond animé réaliste, logo/countdown/curieux frontal) **derrière une clé d'accès** (`ACCESS_KEY="[CLÉ RETIRÉE — voir gestionnaire de secrets]"`, modifiable en 1 ligne) + **responsive Android (≤560px) & Windows (≥1100px)** ajouté.
- **À FAIRE (Dépt 02)** : déployer ces 2 pages comme **entrée privée** (route `/acces` ou page d'accueil temporaire) sur chaque projet Vercel — **1 seul déploiement, attendre READY**. Garder le gate NAVLYS verrouillé. Ne pas committer de token.
- **Option plus sûre (recommandée)** : activer **Vercel Password Protection** (Project → Settings → Deployment Protection) = mot de passe serveur, plus robuste que la clé client. La clé client `[CLÉ RETIRÉE — voir gestionnaire de secrets]` reste le filet immédiat.
- **Quand Bruno dit « public »** : retirer la clé (NAVLYS garde son countdown jusqu'au 1er juin ; Bruno passe public).

---
## 📥 ORDRE QG @ALL — 25 mai 2026 · 22:00 (Nash NAVLYS)
- Lis : `navlys/docs/MOTEUR_CALCUL_NASH.md` (spec 8 facteurs).
- Étends `app/admin/cap/` avec **8 modulateurs** (RiskPct base, Reinvest %, Slippage params, Top-3 profils, Capital, Verticales, DailyTarget %, on/off).
- Branche le **slider StartingCapital 500 → 100 000 €, défaut 2 000 €** sur `/objectif` ET dans l'app (premier écran).
- Affiche **Bulletin du jour** + **DailyTarget %** dans /cockpit. Côté public = paper-trading uniquement.
- Quand Dépt 06 fournit les ENV Alpaca paper → branche les appels (côté serveur, jamais en clair).
