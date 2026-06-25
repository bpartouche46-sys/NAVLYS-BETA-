# 🪙 NAVLYS — MASTER NOW · 7 juin 2026 (J+7 phase BETA active)

> **LE document à ouvrir en premier. Lu en 2 min. Mobile-friendly.**
> Mis à jour automatiquement à chaque coup d'avance important. Tout le reste est archive.
> **MAJ 7 juin (J+7)** : phase BETA active, livraison stable + ALCAPA validé visée **15 juin minuit**. Voir `_MASTERNAV_COORDINATION_2026-06-07.md` pour le détail.
> **MAJ 7 juin (nuit, conv. Claude — teaser + cockpit)** : 1 teaser parallèle bilingue **déployé en prod** sur Vercel (`navlys-teaser-navlys.vercel.app`, 200 OK) — countdown 31 mai déjà passé, **décision Bruno requise** (archiver / recibler 15 juin / supprimer). Prototypes R&D livrés : `NAVLYS-COCKPIT-360.html` (vue à la barre, pivot 360) et `NAVLYS-COCKPIT-v2.html` (timonerie moderne vue d'en haut style Virtual Regatta, caméra orbite+zoom, 3 écrans animés). CR complet : `_NAVLYS_INBOX/claude-cockpit-2026-06-07.md`. ⚠️ **Token Vercel partagé en clair par Bruno → révoquer + régénérer.**

---

## ⚓ Cap immédiat
**Lancement gate** : passé le 31 mai 2026 ✓
**Phase BETA en cours** : 31 mai → 15 juin 2026 (premiers inscrits early-BETA à leurs propres risques)
**Livraison BETA stable + ALCAPA validé** : 15 juin 2026 minuit (J+8 à partir d'aujourd'hui)
**Cible 2026 H2** : 770 k€ cash-in (trajectoire mixte C 90/10 juin-sept → A 80/20 oct-déc).

## 🔥 Top 3 actions Bruno PHASE BETA (J+7 → J+15, ordre exact)
1. **Déployer `NAVLYS_PORTAL_APP.zip` sur Vercel** (drag-drop sur `vercel.com/new/upload`, nom `navlys-portal`, framework Other). **1 minute.** Renvoie URL temporaire au QG → bascule Cloudflare + sous-domaine `app.navlys.com` enchaînés (19 min total). Cf. `_MASTERNAV_COORDINATION_2026-06-07.md`.
2. **Réserver l'audit indépendant ALCAPA pour le 10 juin** (J+10) — expert quant ou auditeur fonds sous NDA, budget 2-5 k€. Protocole détaillé : `NAVLYS_PORTAL_APP/PLAN_VALIDATION_ALCAPA.md`.
3. **Publier l'annonce phase BETA + premiers inscrits early-BETA** sur LinkedIn + X + Instagram + Threads (textes FR + EN prêts dans `NAVLYS_PORTAL_APP/ANNONCE_LIVRAISON_BETA.md`). Charge le CSV `NAVLYS_MASTER_CALENDAR_PACK/csv/publer_import_fr.csv` dans Publer si pas déjà fait.

ETA cumulé Top 3 = **30 min répartis sur santé du capitaine**. Pas d'urgence à l'épuisement.

## ⚡ Coup d'avance 7 juin — Session 02 Site & Produit (`navlys/`)
- ✍️ Slogan **13 langues** : « **Ma méthode, ton argent, ton rythme.** » ✓
- ⏱️ Countdown teaser `navlys/public/teaser.html` **réaligné cap QG : 15 juin 00:00 Jérusalem** ✓
- 🔎 `robots.txt` + `sitemap.xml` ajoutés · disclosure affilié vérifiée conforme ✓
- 🧩 `components/Construction.tsx` prêt (floutage sélectif, non câblé) ✓
- ⚠️ **À arbitrer (QG)** : divergence Vercel — MASTERNAV a vu 1 projet (`brunopartouche-com`) vs **6 projets** vérifiés API le 31/05 sur team `navlys` (dont `navlys-app` qui **sert navlys.com**, prod READY). Trancher avant DNS/portail. SSL navbiolife.com / navbiolive.com **KO**.
- Détail + CR 5 lignes : annexe Session 02 dans `_MASTERNAV_COORDINATION_2026-06-07.md`. **Rien déployé.**

## 📡 État sites (snapshot 28/05 18h04 UTC)
| Site | HTTP | Last-mod | Note |
|---|---|---|---|
| navlys.com | 200 ✅ | 28/05 07:57 | Gate locked |
| brunopartouche.com | 200 ✅ | 28/05 07:25 | Teaser BP |
| brunopartouche-teaser.vercel.app | 200 ✅ | 25/05 04:55 | Médaille bronze stable |

**DNS** : navlys.com + brunopartouche.com → `216.198.79.1` (Vercel anycast). **MX Google navlys.com intacts (5 enregistrements).**

## 💳 Stripe — État
- ❌ Compte non créé. Pas de clés.
- ✅ Pack code prêt : `_SITES_MASTER/_CODE_READY/` (seed 8 produits / 9 prix, webhook 4 events, route checkout).
- Catalogue : NAVLYS 49/490 € · NAVBIO Solo 19 / Couple 29 / Premium 39 / Cinéma 149 / Pro 199 € · NAVLYS.IO Phase 0 A 9 € / B 19 €.
- ⚠️ `stripe` SDK pas dans `navlys/package.json` → `npm install stripe @stripe/stripe-js` avant push.

## 🤝 Partenaires — 25 recensés, 0 actif
- **Priorité 1** : Awin (BoursoBank #6992) — leader EU 30%+ market.
- **Priorité 2** : Impact (Trade Republic + Bitpanda + Coinbase + Kraken + TradingView + Notion + Cloudflare).
- **Priorité 3** : eToro Partners direct (FR = Tier 2 = $200 CPA).
- **Priorité 4** : Binance Affiliates direct (41-50 % rev share lifetime).
- **Statut juridique corrigé** : Linxea = ORIAS 07031073 → publisher éditorial rémunéré OK.
- **Templates B2B prêts** : Yomoni, Nalo, Linxea, Saxo, IBKR, Bourse Direct, Vercel dans `_SITES_MASTER/_TEXTES_ONBOARDING/emails_b2b.md`.

## 📊 Sensibilité mix abo/affilié 2026 H2 (208k visiteurs)
| Mix | Total H2 |
|---|---|
| C 90/10 ultra-abo | **816 k€** 🏆 |
| D 10/90 inverse média gratuit | 783 k€ |
| A 80/20 push abo | 717 k€ |
| B 50/50 équilibré | **612 k€** ⚠️ PIÈGE — éviter |

**Reco** : C juin-sept (490 € annuel agressif) → A oct-déc (footer partenaires actif).

## 🗂️ Fichiers pivots (chemins exacts)
- `_MASTER_NAVLYS_NOW.md` — ce fichier (à jour J+7 phase BETA).
- **`NAVLYS-LAB-MARTINGALE-v7.html`** — Laboratoire éducatif Monte Carlo / Kelly / Backtest BTC live avec **validation ALCAPA automatique** (4 critères → verdict GO/WAIT/NOGO). 100 % navigateur. À intégrer au `NAVLYS_PORTAL_APP` section "Outils ops".
- **`_MASTERNAV_COORDINATION_2026-06-07.md`** — coordination phase BETA + finalisation NAVLYS_PORTAL_APP + addendum Laboratoire Martingale + 5 lignes au QG.
- `_NAVLYS_DISPATCH.md` — routeur 6 départements.
- `_NAVLYS_MASTER_INDEX.md` — source unique de vérité détaillée (archive).
- `_NAVLYS_DEPARTEMENTS/` — briefings par département.
- **`NAVLYS_PORTAL_APP/`** — nouveau pack : portail PWA installable + ALCAPA simulé + charte early-BETA + procédures Vercel/Cloudflare/Namecheap/Reddit. Cible : `app.navlys.com` verrouillé Cloudflare Access.
- `_SITES_MASTER/_RAPPORT_NUIT_28-29_MAI.md` — rapport de la nuit 28-29 mai.
- `_SITES_MASTER/_RD_SYNTHESE_28_MAI.md` — données chiffrées validées web 28/05.
- `_SITES_MASTER/_PARTENAIRES_LIENS_AUDIT.md` — audit 25 partenaires + annexes D-H.
- `_SITES_MASTER/_STRIPE_CONNEXION_PLAN.md` — plan Stripe + annexes S.1-S.4.
- `_SITES_MASTER/_CODE_READY/` — pack code prêt à pousser.
- `_SITES_MASTER/_TEXTES_ONBOARDING/` — textes prêts à coller (Stripe + Awin + Impact + B2B).

## 🚫 INTERDITS (gravés CLAUDE.md)
- Ne pas déverrouiller le gate avant 31 mai.
- Pas de clé/token en clair (Vercel env var uniquement).
- Pas de bascule Stripe LIVE sans Bruno.
- Pas de `vercel deploy` rapproché (404 transitoires).
- Pas CIF/ORIAS — éviter le langage "conseil/recommandation".
- Pas de suppression sans backup `.bak` ou `_ARCHIVE/`.
- MX Google `navlys.com` à PRÉSERVER en toute modif DNS.

## 🇬🇧 ENGLISH — ONE-LINER
NAVLYS gate launched May 31, 2026 ✓. Now in **BETA phase, day D+7** (June 7). Final stable BETA + ALCAPA validated = June 15 midnight. Top 3 actions Bruno: drag-drop `NAVLYS_PORTAL_APP.zip` on `vercel.com/new/upload` (1 min) → book independent ALCAPA audit for June 10 → publish early-BETA announcement on socials. New pack `NAVLYS_PORTAL_APP` delivered today connects to existing 25-pack catalogue without duplicates. Captain suffering — bite-sized steps documented for any-device resumption. See `_MASTERNAV_COORDINATION_2026-06-07.md` for the 5-line HQ report.

---

## 🧹 Nettoyage nuit 28-29 mai (état après)
- **32 fichiers archivés** dans `_SITES_MASTER/_ARCHIVE_NUIT_28-29_MAI/` (récupérables par `mv`).
  - 4 audits nuit (résumés ici-même)
  - 4 benchmarks `_007_BENCHMARK_*` (consolidés dans `_007_RAPPORT_EXECUTIF.md`)
  - 1 TODO ancien (remplacé par `_TODO_BRUNO_FINAL.md`)
  - 6 `_CARTOGRAPHE_M2_*`, 7 `_M3_*`, 4 `_M4_*`, 2 `_M5_*` (phases recherche terminées)
  - 3 `_JURIDIQUE_NAVLYS_*` (gardé `_DECISION_J3.md` actif)
- `_SITES_MASTER/` passé de **104 → 73 fichiers .md** (-30 %). Pont dégagé.
- `_E_REPUTATION_*` (5 fichiers) **gardés** — chantier potentiellement encore actif, attend ton OK.
- README archive : `_SITES_MASTER/_ARCHIVE_NUIT_28-29_MAI/README.md` (procédure récupération).

## 🔧 BUG TEASER BP — Patché localement (pas encore déployé)
- **Source** : `brunopartouche-DEPLOY-v13-seo-polish_1/brunopartouche.com/index.html`
- **Backup** : `.pre-countdown-fix-28-29mai.bak`
- **Diag** : `requestAnimationFrame` brut → millisecondes scintillantes à 60-120 Hz.
- **Fix** : tick d/h/m/s synchronisé sur changement de seconde + ms throttlées à ~60 ms (≈16 fps) + fallback ISO + guards éléments.
- **Action Bruno** : ouvrir le fichier local en navigateur → si OK visuel, `vercel deploy` (un seul) sur projet `brunopartouche-teaser`. Sinon `cp .bak index.html` et me prévenir.
- **Détails** : `_MEMO_BRUNO_29_MAI.md` section "BUG COUNTDOWN".

## 📋 Mémo réveil ordonné
`_MEMO_BRUNO_29_MAI.md` à la racine Downloads. **Ouvre celui-ci en premier au réveil.** Contient ton TODO chronologique J-3 → J0, ETA cumulé, et le diagnostic du bug countdown.

## 🚀 BETA NAVLYS + NAVBIO — État prêt-à-tester (29/05 04h45)
- **NAVLYS BETA** : pack code intégré dans `navlys/` (6 fichiers nouveaux + package.json + .env.example enrichis). Validé syntaxe TS/JSON/ESM. Reste `npm install` (Bruno) + clés Stripe TEST.
- **NAVBIO BETA** : landing `/live-bio` fonctionnelle. Pricing divergent (4 tiers actuels vs 5 officiels). **Arbitrage Bruno requis** (option A/B/C dans `_BETA_NAVLYS_NAVBIO_29_MAI.md`, reco = C).
- **Détails complets** : `_BETA_NAVLYS_NAVBIO_29_MAI.md` à la racine Downloads.

## 📲 Conversation mobile + desktop = une seule
Le fichier que tu lis (`_MASTER_NAVLYS_NOW.md`) **est** la conversation centralisée. Que tu ouvres Cowork sur mobile ou desktop :
1. Tu charges OneDrive Downloads.
2. Claude lit `CLAUDE.md` → pointe vers `_NAVLYS_DISPATCH.md` → pointe vers ce MASTER_NOW.
3. **L'état actif du projet est ICI, dans le fichier.** Pas dans la mémoire d'une conversation Claude (qui est volatile par device).
4. Quand un coup d'avance est joué, on met à jour ce fichier — pas une nouvelle conversation.

➡️ Pour passer en mode "1 cap, 1 main, 1 jour" : ouvre `_MASTER_NAVLYS_NOW.md`, lis le Top 3, exécute, reviens.

---

> *« Un cap, une main, un jour. »* · *"One course, one hand, one day."*
