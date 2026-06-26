# ⚓ MASTERNAV — COORDINATION & FINALISATION · 7 juin 2026 (J+7)

> **Connexion de cette session au QG NAVLYS — fichier inséré dans l'écosystème MASTER existant.**
> Lecture optimale : 2 minutes.
> Suit la règle DISPATCH : 5 lignes au QG en bas de document.

---

## 🧭 OÙ ON EN EST DANS LA FLOTTE (rappel)

- **J0 dépassé** : lancement gate 31 mai 2026 ✓
- **Aujourd'hui** : 7 juin 2026 = **J+7 phase BETA active**
- **Prochain cap dur** : 15 juin 2026 minuit = livraison BETA stable + ALCAPA validé
- **Tâche traitée dans cette session** : portail capitaine + accès BETA + protocole ALCAPA + recalibrage calendrier vers 15 juin

---

## 📦 NOUVEAU PACK PRODUIT — `NAVLYS_PORTAL_APP/`

À ajouter dans la liste des packs `_NAVLYS_MASTER_INDEX.md` section **2. Site & app**.

**Contenu** (15 fichiers, 47 Ko zippé) :

### Portail (3 pages HTML installables PWA)
- `index.html` — portail capitaine principal avec 6 sections : KPI · Réseaux sociaux 13+30 · Stockage 15 To · Outils ops · Campagne 44 jours · Sécurité. Bandeau BETA rouge-bronze pulsé. **2 comptes à rebours en parallèle** : ouverture 31 mai (passée) + livraison 15 juin minuit. Section ALCAPA avec 6 lignes de statut. Bilingue FR/EN.
- `alcapa.html` — tableau de validation BETA en simulation locale. Login cosmétique, dashboard avec cap du jour généré, paper trading + sandbox réel avec graphiques SVG, comparaison virtuel↔réel, feu vert/jaune/rouge. Aucun appel serveur, tout en localStorage.
- `install.html` — page d'installation avec procédure iOS / Android / Mac / Windows + section "Avis early-BETA à vos risques" en rouge avec lien charte.

### Configuration PWA
- `manifest.webmanifest` — installable sur écran d'accueil (icône ⚓ bronze sur fond marine)
- `sw.js` — service worker offline-first
- `icons/` (3 SVG : 192px, 512px, apple-touch)
- `config.example.js` — placeholders OAuth Google + MS Graph + Publer + Stripe + Mailerlite

### Documents légaux & opérationnels
- `CHARTE_BETA_EARLY_ACCESS.md` — charte juridique premiers inscrits (engagements capitaine, acceptation utilisateur, clauses PSI/RGPD)
- `ANNONCE_LIVRAISON_BETA.md` — posts LinkedIn 300 mots + thread X 6 messages, FR + EN
- `PLAN_VALIDATION_ALCAPA.md` — protocole virtuel (paper trading 15 j, win rate ≥55%, Sharpe ≥1.0) + protocole réel (sandbox 1% capital, stops auto, frais <0,5%) + audit indépendant 10 juin + comparaison 12 juin + Go/No-go 13 juin + livraison 15 juin

### Procédures
- `DEPLOIEMENT_ULTRA_RAPIDE.md` — 4 clics Vercel pour mettre `navlys-portal` en ligne
- `MENAGE_VERCEL_ET_INSTALL.md` — diagnostic Vercel (1 seul projet `brunopartouche-com` avec 20 historiques, dont 14 ERROR à cause du workflow Deno cassé) + résolution de l'install qui ne se lance pas en `file:///`
- `BASCULE_NAMECHEAP_CLOUDFLARE.md` — bascule DNS avec sauvegarde obligatoire des 5 MX Google Workspace + 3 TXT (SPF, DKIM, DMARC)
- `CHECKLIST_CLOUDFLARE_REDDIT.md` — 10 étapes Cloudflare + 8 achievements Reddit r/navlys avec règles maritimes, automod, premier post
- `MISE_EN_LIGNE_MAINTENANT.md` — séquence 6 vagues 45 min de bout en bout
- `README_DEPLOY.md` — vue d'ensemble + branchement vraies API plus tard

### Pointage vers les autres packs
Lien direct du portail `index.html` (section Campagne) vers `../NAVLYS_MASTER_CALENDAR_PACK/` : calendrier 44 jours, ops quotidiennes, KPI suivi, crisis playbook, matrice plateformes, CSV Publer FR. **Pas de doublon créé.**

---

## 🔌 COMMENT CE PACK SE BRANCHE À LA MAISON MASTER

- **Cap court terme** : il sert de **cockpit unifié** pour la phase BETA 7-15 juin. Bruno y voit ses 13 réseaux Publer, son Drive 15 To, OneDrive, Stripe, Vercel, le calendrier, l'état ALCAPA.
- **Cap moyen terme** : devient `app.navlys.com` après bascule DNS (subdomain Cloudflare → projet Vercel `navlys-portal` séparé du projet `brunopartouche-com`).
- **Cap long terme** : structure prête pour brancher les vraies API (OAuth Google Drive, Graph OneDrive, Publer token, Stripe restricted key) via `config.js` privé en variables d'environnement Vercel.

**Compatibilité avec règles gravées DISPATCH** ✓
- NAVLYS dépersonnalisée : section "capitaine Bruno" présente mais pour usage interne — le portail est verrouillé par Cloudflare Access sur `bruno@navlys.com` uniquement
- Ni conseil, ni placement, ni encaissement : ALCAPA = lecture, jamais recommandation. Charte early-BETA très explicite.
- Gate actif respecté : portail séparé, ne touche pas `navlys.com` racine
- Aucun secret en clair : tous tokens en `config.example.js` placeholder + recommandation env vars Vercel
- Langage maritime, simple, ≤ 20 mots, disclaimer en pied : respecté
- Pas 2 déploiements enchaînés : recommandation explicite dans DEPLOIEMENT_ULTRA_RAPIDE.md

---

## 📊 ÉTAT VERCEL VÉRIFIÉ EN DIRECT (mes outils MCP authentifiés)

J'ai pu interroger l'API Vercel sur ton compte « Bruno's projects » (team_nBtY5FOQMPIT4J8Bmf7wvBSC, slug `navlys`) :

- **1 projet** : `brunopartouche-com` (prj_5efy1QYHH1fOR099sSjpdEa6yFps)
- **20 historiques de déploiement** : 6 READY · 14 ERROR (cause = workflow GitHub Actions Deno cassé sur le repo `bpartouche46-sys/NOVA-HUB`)
- **Site servi actuellement** : déploiement READY du 11 mai 2026 — pas cassé, mais figé
- **Dernières 2 tentatives** : ERROR datées 12-15 mai

**Reco** : ne PAS supprimer ce projet. Créer un nouveau projet `navlys-portal` séparé pour la BETA, en glissant `NAVLYS_PORTAL_APP.zip` sur `https://vercel.com/new/upload`. **C'est la seule action que je ne peux PAS exécuter à la place de Bruno** (l'API MCP de déploiement renvoie « run vercel CLI yourself » — protection légitime de son compte).

---

## 🎯 PROCHAINES MANŒUVRES (chemin critique mis à jour)

Pas dans l'ordre, choisir selon énergie/santé :

1. **[1 min · Bruno]** Déployer `NAVLYS_PORTAL_APP.zip` sur Vercel (`vercel.com/new/upload`, nom `navlys-portal`, framework Other, Deploy). Envoyer URL temporaire.
2. **[3 min · QG]** Vérifier l'URL Vercel via outils MCP. Confirmer que le portail charge bien.
3. **[5 min · Bruno + QG]** Cloudflare ajoute `navlys.com` comme zone + recopier les 5 MX Google + SPF + DKIM + DMARC AVANT bascule nameservers.
4. **[2 min · Bruno]** Namecheap Domain List → Manage `navlys.com` → onglet Domain → Custom DNS → coller les 2 nameservers Cloudflare → ✓
5. **[5 min · Bruno + QG]** Vercel pointe `app.navlys.com` (sous-domaine pour ne pas casser le teaser racine) sur le projet `navlys-portal`.
6. **[2 min · Bruno]** Cloudflare Access verrou sur `bruno@navlys.com` exclusivement.
7. **[1 min · Bruno]** Test installation sur iPhone → écran d'accueil → icône ⚓ NAVLYS.

**ETA total** : 19 minutes répartis sur la santé du capitaine.

---

## ⚠️ ALERTES À TRANSMETTRE AU QG

- Cloudflare encore sur écran `welcome/use-case` → zone navlys.com pas encore ajoutée
- Reddit r/navlys : checklist d'achievements pas encore cochée (8 étapes pré-rédigées en maritime dans CHECKLIST_CLOUDFLARE_REDDIT.md)
- Premier inscrit early-BETA = aucun à ce jour (à lancer via posts ANNONCE_LIVRAISON_BETA.md sur Publer)
- Audit indépendant ALCAPA J+10 = 10 juin = **dans 3 jours** → réserver expert quant ou auditeur fonds sous NDA, budget 2-5 k€
- Workflow GitHub Actions Deno cassé sur `bpartouche46-sys/NOVA-HUB` → cause des 14 ERROR Vercel, à patcher ou désactiver

---

## 🧪 ADDENDUM — Module Laboratoire Martingale v7 (7 juin soir)

Nouveau module éducatif autonome déposé à la racine Downloads pour servir le protocole ALCAPA :

- **Fichier** : `NAVLYS-LAB-MARTINGALE-v7.html` (HTML autonome, 100 % navigateur, ~37 Ko)
- **Ancien nom** : `NOVA_Martingale_Lab_v7.html` → désormais redirection vers le nouveau
- **Identité** : palette nuit pourpre-fuchsia · Cormorant + Fraunces + Lora + JetBrains Mono · disclaimer obligatoire en pied · vocabulaire éducatif strict (aucune mention conseil/recommandation)
- **5 onglets** : Configuration · Monte Carlo Martingale · Critère de Kelly · Backtest BTC/EUR live (Binance 1 000 bougies 1h) · **Validation ALCAPA**
- **ALCAPA intégré** : feux vert/jaune/rouge sur les 4 critères du `PLAN_VALIDATION_ALCAPA.md` (win rate ≥ 55 % · Sharpe ≥ 1.0 · drawdown ≤ 20 % · prob. ruine ≤ 5 %) → verdict GO / WAIT / NOGO automatique
- **Cible d'intégration** : à ajouter dans `NAVLYS_PORTAL_APP/` section "Outils ops" comme module Lab interne (cockpit BETA Bruno), lien à insérer dans `index.html` du portail
- **Source données live** : Binance public API (BTCEUR puis BTCUSDT en fallback), GBM simulé en dernier recours, étiquetage explicite de la source dans la bannière
- **Aucun appel serveur, aucun secret** : conforme règle DISPATCH "pas de token en clair", localStorage uniquement si étendu plus tard

**Usage prévu phase BETA J+7 → J+15** : Bruno (et les early-BETA sous charte) utilisent le Lab pour mesurer le couple win rate / Sharpe / drawdown / ruine de toute règle martingale envisagée, et obtenir un verdict ALCAPA automatique AVANT l'audit indépendant du 10 juin (J+10). Le Lab ne remplace PAS l'audit, il prépare la matière.

**Tâche restante** : référencer le Lab dans la prochaine itération `NAVLYS_PORTAL_APP/index.html` (section "Outils ops"), prévoir bouton "⚓ Ouvrir le Laboratoire" → href relatif vers `../NAVLYS-LAB-MARTINGALE-v7.html` (ou route Vercel dédiée `app.navlys.com/lab` une fois déployé).

---

## 📝 COMPTE-RENDU 5 LIGNES AU QG (règle DISPATCH)

1. **FAIT** : pack `NAVLYS_PORTAL_APP` complet livré (15 fichiers, portail PWA installable + tableau ALCAPA simulé + charte early-BETA + 4 procédures), recalibrage calendrier vers 15 juin minuit, vérification API Vercel (1 projet, 14 déploiements ERROR identifiés cause Deno workflow).
2. **À FAIRE** : Bruno glisse le ZIP sur `vercel.com/new/upload` (1 min), envoie URL temporaire, on enchaîne Cloudflare zone + bascule Namecheap + verrou Access.
3. **BLOQUÉ** : aucun déploiement automatique possible depuis ma session (l'API MCP Vercel ne pousse pas de fichiers — protection compte). Seule action manuelle restante = drag-drop Bruno.
4. **DÉCISION** : nouveau projet Vercel séparé `navlys-portal` (pas écrasement de `brunopartouche-com`). Subdomain cible = `app.navlys.com` pour ne pas casser le teaser racine.
5. **PROCHAINE ACTION** : attente URL Vercel temporaire de Bruno → puis 5 vagues de 19 min cumulées pour `app.navlys.com` HTTPS verrouillé + installé sur son iPhone.

---

## 🇬🇧 ENGLISH SHORT

This file connects today's session (PORTAL_APP delivery for early-BETA before June 15 final delivery) to the existing NAVLYS MASTER house. New pack `NAVLYS_PORTAL_APP` adds to the catalogue (section 2 Site & App) without overlap with existing packs — it links to `NAVLYS_MASTER_CALENDAR_PACK` via relative paths. Vercel inspected via authenticated MCP: 1 project `brunopartouche-com` with 14 ERROR deployments due to broken Deno workflow on GitHub repo `NOVA-HUB`. Recommendation: keep that project, spawn a new `navlys-portal` project for BETA via 1-minute drag-drop on `vercel.com/new/upload`. Captain Bruno suffering today — task documented end-to-end so it can be resumed anytime from any device. Five-line HQ report at the bottom: DONE / TODO / BLOCKED / DECIDED / NEXT.

---

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> *"One course, one hand, one day."*

⚠️ NAVLYS partage des informations pédagogiques, pas un conseil personnalisé. · Educational information only, not personalized advice.

---

# 🧵 ANNEXE — COORDINATION SESSION 02 SITE & PRODUIT · 7 juin 2026

> Session distincte de celle ci-dessus. Travail réalisé dans `navlys/` (source liée au
> projet Vercel `navlys-app` via `.vercel/project.json`). **Rien déployé** — tout est local.

## ⚠️ DIVERGENCE VERCEL À ARBITRER PAR LE QG
La session MASTERNAV ci-dessus a vu **1 projet** (`brunopartouche-com`, 14 ERROR Deno).
Mon contrôle API direct (31/05, MCP Vercel authentifié, team `navlys` =
`team_nBtY5FOQMPIT4J8Bmf7wvBSC`) montre **6 projets** : `navlys-app` (sert navlys.com,
prod READY), `navbio` (READY, mais navbiolife.com / navbiolive.com en **erreur SSL**),
`brunopartouche` (READY), `navlys-io`, `navlys-teaser`, `brunopartouche-teaser`.
→ Les deux sessions ont probablement interrogé **deux comptes/scopes Vercel différents**
(`brunopartouche-com` avait été noté « doublon supprimé » le 24/05 dans CLAUDE.md).
**À trancher avant toute manœuvre DNS / déploiement portail.**

## ✅ FAIT (session 02 — nuit 31/05 + finalisation 7/06)
- Slogan corrigé **13 langues** → FR : « **Ma méthode, ton argent, ton rythme.** » (`messages/*`, JSON validés)
- Compte à rebours teaser **réaligné sur le cap QG : 15 juin 00:00 Jérusalem** (`public/teaser.html` + commentaires `LaunchGate.tsx` / `.env.example`)
- `public/robots.txt` + `public/sitemap.xml` créés (12 pages publiques ; login/signup/dashboard/api exclus)
- Disclosure affilié + mention pédagogique **vérifiées conformes** (`/partenaires` en `rel="sponsored nofollow"`, footer permanent)
- `components/Construction.tsx` créé : floutage sélectif esthétique NAVLYS, **non câblé** (zéro impact build)
- Audit multi-départements du 31/05 : navlys.com ✅ teaser live · navbiolife/navbiolive **SSL KO** · brunopartouche.com ✅ mais sans encarts ref/disclosure
- Note de reprise : `navlys/_REPRISE_DEMAIN_NAVLYS.md`

## 📝 COMPTE-RENDU 5 LIGNES AU QG (règle DISPATCH)
1. **FAIT** : slogan 13 langues + countdown réaligné 15/06 + SEO (robots/sitemap) + composant floutage prêt — le tout dans `navlys/`, local, rien déployé.
2. **À FAIRE** : preview Vercel de `navlys/` pour validation à 1000 %, puis promotion prod par Bruno ; câbler `Construction` sur la liste de pages validée.
3. **BLOQUÉ** : divergence Vercel 1 vs 6 projets à arbitrer ; clés Supabase/Stripe/brokers à poser sur Vercel (Bruno) ; SSL navbiolife/navbiolive à réémettre.
4. **DÉCISION (Bruno)** : mode bêta — teaser-gate maintenu vs site ouvert + floutage sélectif (proposition pages à flouter : login, signup, dashboard, rejoindre-equipage, univers).
5. **PROCHAINE ACTION** : au choix du capitaine — preview `navlys/` OU portail MASTERNAV d'abord ; **jamais les deux déploiements enchaînés** (règle gravée n°7).
