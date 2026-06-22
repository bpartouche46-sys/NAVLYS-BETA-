# ÉTAT DES LIEUX — où on en est

> Mis à jour à la fin de chaque session pour que la suivante reprenne sans tout relire.

## Session 2026-06-22 (c) — corrections conformité préparées (NON déployées)

- 🔎 **Re-vérif live (lecture seule, fetch Vercel)** : C-01→C-04 + 404 /cgu /privacy
  **toujours présents** sur navbiolife.com et brunopartouche.com/bio. Compte à rebours
  périmé (cible 1ᵉʳ juin dépassée) → compteur mort en prod.
- 📅 **Date d'ouverture confirmée par Bruno** : **1ᵉʳ juillet 2026, 00:00 (Paris)** =
  `2026-06-30T22:00:00Z`.
- 📦 **Fichiers corrigés prêts à déployer** dans `corrections-pretes/` (rien déployé) :
  - `brunopartouche.com/bio.html` — C-03 (retrait « +8 à 12% ») + C-04 (disclaimer) + date.
  - `navbiolife.com/index.html` — C-01 (meta) + C-02 (commentaire) + compte à rebours recalé.
  - `navbiolife.com/cgu.html` + `privacy.html` — pages créées (corrigent les 404).
- ⚠️ **À compléter avant déploiement** : mentions d'éditeur dans /cgu et /privacy
  (placeholders `[ÉDITEUR]` ; ne PAS committer l'entité juridique dans ce dépôt public) ;
  faire relire le juridique ; diff contre la prod avant de pousser.
- ⏭️ **En attente** : feu vert prod explicite de Bruno + méthode de déploiement
  (dépôt source pas encore dans Git → déploiement via ancien PC / CLI Vercel).
- ℹ️ Bonus : les sites live utilisent déjà `#7DD3FC` + JetBrains Mono (charte cohérente).

## Session 2026-06-22 (b) — briefing stratégique → mémoire

- 📌 **Constat** : le « briefing à coller » de Bruno contenait des faits stratégiques
  **absents** du dépôt (méthode 90/10, slogan, produits App Trading, communauté).
  → Capturés dans **`docs/STRATEGIE-NAVLYS.md`** (nouveau) et reliés depuis `CLAUDE.md`
  (§1 + §5). Évite de recoller le briefing à chaque session.
- 🎨 **Ice Blue tranché = `#7DD3FC`** (rgb 125,211,252), remplace l'ancien `#5fe0ff`.
  → `proto/navlys-v2.html` aligné (14 occurrences) + note dans `docs/DESIGN-NAVLYS.md`.
- 🔐 **Sécurité** : rien de confidentiel ajouté au dépôt public (entité juridique /
  SIREN / IP serveur / accès Cockpit restent hors Git). Aucune nouvelle erreur (journal inchangé).
- ⚠️ **Note de process** : une branche orpheline avait été créée par erreur (dépôt vu
  « vide » localement) ; rebasée sur la fondation existante pour ne RIEN écraser.

## Session 2026-06-22 (a) — prototype `proto/navlys-v2.html` (petits TODO)

- ✅ **Compte à rebours** « ACCÈS ANTICIPÉ » : remplacé le placeholder relatif
  (`Date.now() + 14 j`, qui se réinitialisait à chaque rechargement) par une
  constante fixe `LAUNCH_DATE` + gestion de l'échéance (« C'est ouvert ! »).
  → PR #2 **fusionnée**. ⚠️ Date par défaut `2026-07-06`, à confirmer (vraie date d'ouverture).
- ✅ **Menu déroulant (☰)** : il s'ouvrait mais ne se refermait jamais. Ajout de la
  fermeture au clic extérieur / touche Échap / choix d'une entrée, + `aria-expanded`
  (accessibilité). Aucun changement de contenu (conformité ERR-003 inchangée).

## Session 2026-06-19 — QA pré-lancement + brief design

### Découverte majeure : où vivent les sites
- Les sites NAVLYS sont déployés sur **Vercel** (équipe « NAVLYS »), **PAS** sur GitHub.
- 6 projets : **navlys-app (navlys.com)**, navlys-teaser, brunopartouche-teaser,
  **navlys-io (navlys.io)**, **brunopartouche (brunopartouche.com)**, **navbio (navbiolife.com / navbiolive.com)**.
- Tous déployés via **Vercel CLI** (user `claudenavlys`) → la source vit dans un **dossier local**
  (probablement l'ancien PC), rien n'est versionné. « Reconnecter » = récupérer ce dossier sous Git.
- Base **Supabase « navlys-core »** (région eu-west-3 / Paris), RLS activé sur toutes les tables.
  La home navlys.com poste les inscriptions dans la table `inscriptions` via la **clé anon publique** (OK par design).

### QA pré-lancement = NO-GO (rapport complet fait)
Bloquants relevés : « Jérusalem » dans la meta navbiolife.com ; « +8 à 12% par an » sur brunopartouche.com/bio ;
/cgu et /privacy en 404 sur navbiolife.com ; comptes à rebours périmés (1ᵉʳ juin) ; bouton « Écoutez Bruno » inexistant ;
texte centré (charte = aligné à gauche). Sécurité globalement saine.

### Décidé / en cours
- ✅ 4 corrections conformité **validées** par Bruno → voir `docs/CORRECTIONS-CONFORMITE.md` (à appliquer, pas encore déployées).
- ✅ Brief design **validé** (inspiration partouche.com, empreinte jeu·plaisir·bien-être) → `docs/DESIGN-NAVLYS.md`.
- ✅ Prototype maquette commune v2 → `proto/navlys-v2.html` (NON déployé, à valider demain).
- Branche de travail : `claude/pre-launch-qa-lcd1pf` (PR brouillon ouverte).

### Prochaine étape (demain)
1. Bruno ouvre `proto/navlys-v2.html` et valide / ajuste (questions ouvertes dans DESIGN-NAVLYS.md §6).
2. Décliner la maquette validée sur les 4 sites + appliquer les corrections conformité.
3. Récupérer le dossier source local sous Git (accès serveur/ancien PC).
4. **Aucun déploiement prod sans feu vert explicite de Bruno.**

---

## Mise à jour précédente : 2026-06-19

### Ce qui est fait
- Dépôt NAVLYS-BETA- initialisé (il était entièrement vide).
- Mise en place du **kit de garde-fous anti-erreurs / anti-saturation mémoire** :
  - `CLAUDE.md` (mémoire permanente + règle d'or)
  - `docs/JOURNAL-ERREURS.md`
  - `docs/CHECKLIST-SECURITE.md`
  - `docs/ROUTINE.md`
  - `docs/ETAT-DES-LIEUX.md` (ce fichier)
  - Agent `.claude/agents/gardien.md` + commande `.claude/commands/controle.md`

### Infrastructure (nouvellement connue)
- ☁️ Un **cloud Hetzner (Allemagne)** héberge le **« core central »** de NAVLYS.
- À préciser : type de serveur, mode d'accès (SSH / panneau), OS, contenu exact du core.
- ⚠️ Depuis l'environnement isolé de Claude, l'accès réseau direct au serveur Hetzner
  n'est PAS garanti (politique réseau). Méthode sûre privilégiée : faire transiter le
  code/la config par ce dépôt Git plutôt que de se connecter en direct à la production.

### Ce qui n'est PAS encore fait / à décider
- ❓ **Aucun code de site n'est présent dans ce dépôt.**
- ❓ Comment relier le « core central » Hetzner à ce dépôt (export du code ? accès ?).

### Décisions prises (2026-06-19)
- Le « core central » Hetzner contient **tout** : base de données, API/back-end, sites, back-office.
- Accès au serveur : **SSH**.
- **Objectif n°1 : SAUVEGARDER l'existant avant toute modification.**

### Plan de sauvegarde fourni → voir `docs/SAUVEGARDE.md`
- 🥇 Niveau 1 : **Snapshot Hetzner** (à faire en premier, depuis console.hetzner.cloud).
- 🥈 Niveau 2 : **`scripts/backup.sh`** (dumps BDD + archive fichiers, non destructif).
- 🥉 Niveau 3 : mettre le **code sous Git** (sans secrets) pour pouvoir modifier proprement.

### 🔌 Blocage en cours : accès au serveur depuis le NOUVEL ordinateur
- L'utilisateur a un **nouvel ordinateur** ; il n'arrive plus à se connecter au serveur
  central (le « cowork » = le serveur central lui-même). « Il ne répond plus ».
- ✅ L'**ancien ordinateur** fonctionne encore et peut (pouvait) se connecter → porte d'entrée sûre.
- Cause probable : la **clé SSH** est sur l'ancien PC, pas sur le neuf.
- 📄 Procédure de résolution complète : **`docs/ACCES-SERVEUR.md`**.
- ⚠️ À NE PAS oublier : je (Claude) **ne connais PAS** les sites de l'utilisateur. Le dépôt
  est vide ; ils doivent être documentés/importés (tableau `CLAUDE.md` §1). Ne rien inventer.

### ▶️ PHASE 0 EN COURS (2026-06-19) — Sécuriser
- ✅ Découverte : déploiements `source: cli` (pas de Git). navlys-app = app Node.js, protégée (403).
- 🔧 Action utilisateur en cours : snapshot Hetzner + retrouver le code des sites sur l'ANCIEN PC.
- 📄 Guide fourni : `docs/SAUVEGARDE-CODE-VERCEL.md` (rapatrier le code dans GitHub via GitHub Desktop).
- ⚠️ Le code source n'existe QUE sur l'ancien PC → priorité absolue à le sauvegarder.
- Prochain point d'attente : confirmation que navlys-app est publié dans GitHub.

### 🧭 Plan d'ensemble établi (2026-06-19) → voir `docs/PLAN-DENSEMBLE.md`
- Architecture cible : core Hetzner (API + données) ← appelé en API par les sites Vercel ;
  GitHub garde une copie sûre du code.
- Feuille de route en 5 phases : 0) Sécuriser, 1) Comprendre, 2) Accès, 3) Reconnecter API, 4) Modifier.
- En attente : validation du plan par l'utilisateur, puis démarrage Phase 0
  (snapshot Hetzner + sauvegarde du code de navlys-app dans GitHub).

### 🗺️ Carte des sites établie (2026-06-19) → voir `docs/CARTE-SITES.md`
- Les sites sont sur **Vercel**, équipe NAVLYS, **6 projets** : navlys-app (navlys.com),
  brunopartouche (brunopartouche.com), navbio (navbiolife/navbiolive.com), navlys-io (navlys.io),
  navlys-teaser, brunopartouche-teaser.
- ⚠️ **Aucun projet relié à GitHub** → le code n'est versionné nulle part = risque majeur.
- Hetzner (core central) et Vercel (sites) sont deux mondes séparés → à clarifier.

### Objectif global confirmé par l'utilisateur
- Tout recentraliser sur le **serveur central** et **tout reconnecter en API**.
- → Cela se fera APRÈS : (1) récupérer l'accès depuis le nouveau PC, (2) sauvegarder l'existant.

### En attente côté utilisateur
- [ ] Faire le **snapshot Hetzner** (filet de sécurité immédiat).
- [ ] Lancer `scripts/backup.sh` sur le serveur et télécharger l'archive.
- [ ] M'indiquer la stack précise (PostgreSQL/MySQL ? Docker ? Nginx ? chemins des sites).

### Prochaine étape recommandée
1. Snapshot Hetzner (Niveau 1).
2. Exécuter `scripts/backup.sh` (Niveau 2) et vérifier l'archive.
3. Rapatrier le code sous Git (Niveau 3).
4. Lancer `/controle` avant chaque modification.
