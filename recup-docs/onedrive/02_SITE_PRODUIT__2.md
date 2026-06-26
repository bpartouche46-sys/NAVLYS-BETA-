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
