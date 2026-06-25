# PROCÉDURE — Relier les sites LIVE Vercel ↔ GitHub (en sécurité)

> **Décision Bruno (2026-06-24)** : relier les sites live Vercel à GitHub, ce qui sert
> aussi l'objectif **Phase 0 « code sous Git »**. Ce document est la procédure **pas-à-pas
> sûre**. Il ne déclenche **aucun** déploiement : toute mise en production reste soumise au
> **feu vert explicite de Bruno** (règle financière + action publique, `docs/GOUVERNANCE.md`).
>
> Rappel **ERR-006** : ce dépôt `NAVLYS-BETA-` = **refonte v2 + mémoire**, **PAS** la prod.
> Les sites live ne sont reliés à aucun dépôt (déploiements directs / CLI).

---

## ⛔ PIÈGE CRITIQUE À LIRE AVANT TOUT — ne PAS écraser le live

> **┌──────────────────────────────────────────────────────────────────────────┐**
> **│  Le dossier `sites/<projet>/` de ce dépôt est la refonte v2 INCOMPLÈTE.     │**
> **│  Le LIVE a BEAUCOUP PLUS : pages (navlys.com a /finance, /next-gen,         │**
> **│  /navlex, /partenaires, /bio…) ET des assets moteur — dont                  │**
> **│  `navlys-alive.js` = la « voix » recherchée, jamais capturée.               │**
> **│                                                                            │**
> **│  Si on relie un projet Vercel à un dossier v2 incomplet PUIS qu'on pousse,   │**
> **│  Vercel REDÉPLOIE depuis ce dossier et ÉCRASE la voix + les pages live.      │**
> **│                                                                            │**
> **│  => ON NE RELIE JAMAIS un projet à Git AVANT d'avoir capturé sa vraie       │**
> **│     source live dans le dépôt. Ordre obligatoire 1→5 ci-dessous.            │**
> **└──────────────────────────────────────────────────────────────────────────┘**

Preuve concrète dans ce dépôt : `sites/navlys-app/` ne contient **qu'**`finance.html`
(1 page), alors que navlys.com live a plusieurs pages ; et ce `finance.html` référence
déjà `navlys-alive` — l'asset voix existe donc côté live mais **pas** ici.

---

## Contexte technique (faits vérifiés via le connecteur Vercel)

- **Équipe Vercel** : `NAVLYS` / `team_nBtY5FOQMPIT4J8Bmf7wvBSC` (compte bpartouche46@gmail.com).
- **`navlys-app`** : framework = `null` (statique « Other »), Node 24.x, **aucun lien Git**,
  déploiements **directs** (pas via GitHub). On suppose le même schéma pour les 5 autres
  (cf. `CLAUDE.md` : « aucun projet relié à GitHub »).
- **Contrainte d'intégration** : l'intégration GitHub de cette session est **restreinte au
  seul dépôt `NAVLYS-BETA-`** (pré-créer d'autres repos a échoué en 403, cf. PR #12).
  → **Approche MONOREPO** : **un seul dépôt**, chaque projet Vercel pointant vers un
  **sous-dossier** via le paramètre **« Root Directory »**.

### Table des 6 projets / domaines

| Projet Vercel | Project ID (réf. `CARTE-SITES.md`) | Domaine(s) | Root Directory monorepo proposé |
|---|---|---|---|
| **navlys-app** | `prj_YFENrKz8KPWE4HhiOodbB2sF8TUB` | navlys.com (+ alias navlys.app / .net / .org) | `live-source/navlys-app/` |
| **brunopartouche** | (voir CARTE-SITES.md) | brunopartouche.com | `live-source/brunopartouche/` |
| **navbio** | (voir CARTE-SITES.md) | navbiolife.com (/ navbiolive.com) | `live-source/navbio/` |
| **navlys-io** | (voir CARTE-SITES.md) | navlys.io | `live-source/navlys-io/` |
| **navlys-teaser** | (voir CARTE-SITES.md) | navlys-teaser.vercel.app | `live-source/navlys-teaser/` |
| **brunopartouche-teaser** | (voir CARTE-SITES.md) | (404 / non-live) | `live-source/brunopartouche-teaser/` |

> Les Project IDs précis et les alias complets sont dans `docs/CARTE-SITES.md` (source unique
> pour éviter une divergence). Ne pas committer de token Vercel ni de secret ici.

---

## ORDRE OBLIGATOIRE (1 → 5)

### 1️⃣ CAPTURER d'abord la vraie source LIVE de CHAQUE projet  ⭐ étape qui protège tout
Avant tout lien Git, on récupère la source réelle de production et on la versionne.

- **Méthode A (recommandée) — `vercel pull` / téléchargement du dernier déploiement** :
  depuis le poste où Bruno déploie (l'ancien PC), pour chaque projet :
  - `vercel link` (sélectionner l'équipe `NAVLYS` + le projet),
  - récupérer les fichiers de production (dossier source local d'origine, ou contenu du
    dernier déploiement). Vérifier que **toutes les pages** ET les **assets moteur** sont là
    (en particulier **`navlys-alive.js`** et les autres `*.js`/`*.css`/`/media/*`).
- **Méthode B (filet partiel déjà en place)** : `sauvegarde-sites/_assets-moteur/` contient
  des assets capturés en lecture seule le 2026-06-22 (incomplet : navlys-app était en 403).
  À **compléter** par la méthode A — ne pas s'en contenter.
- **Versionner** la source réelle dans le dépôt sous **`live-source/<projet>/`** (arbre dédié,
  distinct de `sites/` qui reste la v2). ⚠️ Ne JAMAIS committer `.env`, clés, tokens (`.gitignore`).

✅ **Résultat de l'étape 1** : `navlys-alive.js` (voix) + toutes les pages live sont **sous Git**.
C'est ce qui rend le lien Vercel↔Git **non destructif**.

### 2️⃣ DÉCIDER, par projet : garder la source live OU basculer sur la v2 (Piste B)
- Décision **de Bruno**, **jamais automatique**. Pour chaque projet :
  - **Garder live** → le Root Directory pointe vers `live-source/<projet>/`.
  - **Basculer v2** (Piste B) → seulement si la v2 est **complète** (toutes les pages + la voix
    reportée) ; sinon on garde live pour ne rien perdre.
- Tracer la décision par projet dans `docs/PHASE-0-SUIVI.md`.

### 3️⃣ RELIER dans Vercel (dashboard) — sans pousser en prod
Pour chaque projet, dans **Vercel → projet → Settings → Git** :
- **Connect Git Repository** → choisir **`bpartouche46-sys/NAVLYS-BETA-`**.
- **Root Directory** = le sous-dossier du projet (table ci-dessus, p.ex. `live-source/navlys-app/`).
- **Framework Preset** = **Other** (sites statiques ; `navlys-app` est `framework=null`).
- **Production Branch** = `main` (ou la branche que **Bruno** choisit). ⚠️ Tant que ce point
  n'est pas fait, **aucun** push ne touche la prod.

### 4️⃣ VÉRIFIER une PREVIEW avant toute promotion
- Laisser Vercel construire un **déploiement Preview** (URL `*.vercel.app`, **non publique/promue**).
- **Comparer la preview au live** : pages présentes, **voix `navlys-alive.js` fonctionnelle**,
  assets/medias, conformité (grep des termes interdits sur HTML **+ JS + CSS**, cf. ERR-005).
- **Ne promouvoir en production que sur feu vert explicite de Bruno.** Si la preview manque la
  voix ou des pages → **STOP**, on n'a pas tout capturé (retour étape 1).

### 5️⃣ DÉPLOYER les correctifs par simple push (après lien validé)
Une fois un projet relié et la preview validée, les correctifs deviennent un simple `git push` :
- `docs/CORRECTIONS-LIVE-2026-06-24.md` : « Jérusalem » (navbio), dates **1ᵉʳ juin → 1ᵉʳ juillet**,
  couleur **`#5fe0ff` → `#7DD3FC`** (navlys.com / finance).
- **ERR-005 / P-04** : `launch-offer.js` (retrait « Jérusalem » + réancrage 1ᵉʳ juillet).
- Chaque push → Preview → comparaison → **feu vert Bruno** → promotion prod.

---

## Garde-fous (rappels non négociables)
- 🔴 **Aucun déploiement / promotion prod sans feu vert explicite de Bruno** (action publique).
- 💰 Aucune dépense / changement de plan Vercel sans Bruno (`docs/GOUVERNANCE.md` §3).
- 🔐 **Zéro secret dans le dépôt** : pas de token Vercel, clé, `.env`, IP, mot de passe.
- 🚦 **Conformité avant toute URL promue** : gardien valide les lignes rouges (ERR-003/005).
- ⛔ **Capturer avant de relier** (étape 1) — sinon risque d'écraser la voix + les pages live.

## Définition de « projet relié proprement »
Source live capturée sous `live-source/<projet>/` (voix + pages incluses) → décision Bruno
garder/v2 → projet connecté à `NAVLYS-BETA-` avec le bon Root Directory → **Preview comparée
au live OK** → (et seulement alors) promotion prod **sur feu vert de Bruno**.
