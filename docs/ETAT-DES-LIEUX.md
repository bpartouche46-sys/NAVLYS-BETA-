# ÉTAT DES LIEUX — où on en est

> Mis à jour à la fin de chaque session pour que la suivante reprenne sans tout relire.

## Session 2026-06-24 (k) — 🚨 INCIDENT SÉCURITÉ : Hermès retiré (hack)

- 🚨 **Bruno signale : Hermès supprimé = risque de sécurité majeur (hack).** Hermès (ancien
  opérateur ops : LLM OpenRouter + accès SSH Hetzner + a touché GitHub/Vercel/cockpit/clouds)
  est **sorti du projet** et **tous ses accès doivent être révoqués**.
- 🧹 **Dépôt nettoyé (Claude)** : **toutes** les références à Hermès retirées (GOUVERNANCE,
  ARCHITECTURE, CORE, CHAINE-1-SITES, TESTS, SECRETS, MEMOIRE, SAUVEGARDE, agents directeur/second,
  core/). `docs/INSTRUCTIONS-HERMES.md` **supprimé**. `OPENROUTER_API_KEY` retiré de `core/.env.example`.
  Le rôle « mains serveur » devient **« opérateur serveur à redéfinir »**, **bridé par le moteur**.
- 🔑 **Checklist de révocation pour Bruno** : `docs/INCIDENT-HERMES.md` — révoquer/rotationner
  **TOUS** ses accès, **y compris la clé API Anthropic** qui lui permettait d'appeler Claude
  (+ OpenRouter, SSH Hetzner, GitHub, Vercel, clouds, cockpit). Re-vérifier le serveur
  (portes dérobées : cron/services/clés ajoutées). Journalisé : **ERR-005**.
- 🟡 **À FAIRE par Bruno** : exécuter la checklist `INCIDENT-HERMES.md` (Claude ne peut pas
  agir sur les accès externes). Confirmer ici quand fait : « Révocation Hermès faite le JJ/MM ».

## Session 2026-06-23 (j) — « tout opérationnel & sécurisé » : code core + sécurité

- 🎯 Demande Bruno : **« rends tout opérationnel à 100% et sécurisé »** (+ « je referai les
  mots de passe/clés après »). Cadré honnêtement : 3 leviers restent **humains** (accès
  Hetzner, source des sites dans Git, clés) → Claude rend **100% prêt** tout le reste.
- 🔐 **Sécurité** : scan dépôt = **0 secret committé** ✅. Créé `docs/SECRETS-ET-CLES.md`
  (inventaire S1→S10 sans valeurs, **procédure de rotation**, réflexe fuite) + durci
  `.gitignore` (core/.env, core/.mcp.json, logs, dist).
- 📊 **Tracker** `docs/OPERATIONNEL-100.md` : « route vers 100% » (statut + QUI + blocage)
  = source de vérité de l'avancement.
- 🧠 **CODE DU CORE LIVRÉ** (`core/`) : orchestrateur Agent SDK (TypeScript, headless) +
  **garde-fous CÂBLÉS** (hook PreToolUse = conformité ERR-003 + STOP argent/prod → feu
  vert Bruno ; PostToolUse = audit) + config (refuse `bypassPermissions`) + `.env.example` /
  `.mcp.json.example` (0 secret) + unit **systemd** + README de déploiement.
  ✅ **Logique garde-fous testée réellement : 18/18** (`core/test/`, via Node type-stripping).
  API SDK **vérifiée** par sous-agent sur la doc officielle. Scaffold non testé bout-en-bout
  depuis GitHub (pas d'install réseau) → à valider sur serveur (opérateur à redéfinir).
- ⏭️ Reste pour le « 100% » réel : rotation clés (Bruno), source sites dans Git (Bruno),
  install moteur sur Hetzner (opérateur serveur **à redéfinir** — ex-Hermès retiré).
  Détail = `docs/OPERATIONNEL-100.md`.

## Session 2026-06-23 (i) — core central : blueprint technique + 1ère chaîne choisie

- 🧠 **Blueprint technique du core central** écrit (`docs/CORE-CENTRAL-TECHNIQUE.md`) :
  brique = **Claude Agent SDK** (orchestrateur headless + sous-agents + skills + MCP +
  mémoire Redis + systemd/cron). **Garde-fous câblés dans le moteur** (permissions +
  hook `PreToolUse` = gardien conformité + STOP argent/prod → feu vert Bruno).
  Honnêteté : ❌ pas d'auto-bootstrap total (les agents sont déclarés par nous, pas
  inventés seuls par la machine) ; ❌ pas de boucle auto-programmée (cron/systemd externe).
- 🎯 **Décision finale Bruno** : 1ʳᵉ chaîne **opérationnelle** = **Veille web**
  (`docs/VEILLE/`) — choisie car **zéro risque / zéro dépendance**, démarrable tout de suite.
  ✅ **Déjà testée en réel** : 1ʳᵉ édition `docs/VEILLE/2026-06-23.md` (4 axes sourcés ;
  fait marquant : cadre AMF/ESMA 2026 **conforte** la ligne NAVLYS éducation-only).
- ⏭️ **Chaîne Sites / déploiement = la suivante** (`docs/CHAINE-1-SITES.md` reste valable),
  **en attente** du pré-requis bloquant : rapatrier la **source des sites dans GitHub** via
  **Claude Code sur le PC du bureau (Windows)** — install en cours côté Bruno. Premier
  passage prévu = la **Vague 1 déjà validée** (bio.html + index.html).
- 📦 PR : **#20** — CORE-CENTRAL-TECHNIQUE, CHAINE-1-SITES, VEILLE (note : INSTRUCTIONS-HERMES
  supprimé depuis — voir session (k), ERR-005).

## Session 2026-06-22 (h) — gouvernance + délégation + contrôle conformité Vague 1

- ⚖️ **Gouvernance gravée** (`docs/GOUVERNANCE.md`, reliée à CLAUDE.md règle d'or) :
  1) **zéro répétition** (tout capitaliser en knowledge/skill/routine, relié au core),
  2) ~~Claude + Hermès orchestrateurs en surveillance mutuelle~~ → **révisé** : Hermès retiré
     (ERR-005) ; plus d'orchestrateur tiers de confiance, opérateur futur **bridé par le moteur**,
  3) **règle financière** : Bruno **seul** valide tout investissement/débit sur tous les
     comptes (y compris partenaires), **sauf abonnements classiques déjà en cours**.
- 🎚️ **Délégation décidée par Bruno** : Claude **a la main** (conçoit + modifie + valide)
  sur **tous les sites** (aucun encore lancé en communication). Garde-fous maintenus :
  **gardien conformité** avant toute URL publique + **argent = Bruno**. Sites communiqués
  plus tard → Claude propose, Bruno valide.
- ✅ **Contrôle conformité (gardien) de `corrections-pretes/`** : **bio.html** et
  **navbiolife/index.html** = **CONFORMES, prêts à déployer** (C-01→C-04 OK, dates juillet,
  zéro ligne rouge). **cgu/privacy** = conformes sur les lignes rouges mais **bloquées** par
  les placeholders légaux ([ÉDITEUR]/[EMAIL]/[HÉBERGEUR]) + relecture juridique.
- 🛑 **Reste humain** : mentions légales, **feu vert prod**, **accès à la source** (NOVA-HUB).
  À confirmer : numéro WhatsApp `[téléphone — hors dépôt]` (navbio) bien destiné à être public.

## Session 2026-06-22 (g) — plan de test des 4 fonctionnalités

- 🎯 **Objectif de Bruno** : « tout est en cours, il faut maintenant TESTER chaque point. »
  4 fonctionnalités citées : 🎙️ Voix/clone vocal · ⚖️ NavLex (base juridique MAJ quotidienne)
  · ❓ FAQ (réponses prêtes pour le site) · 🤝 Partenaires (enregistrer un abonnement).
- 🔎 **Constat dépôt** : recherche faite (Grep/Glob) — le dépôt ne contient **que de la doc
  + `proto/navlys-v2.html`**. **Aucun code applicatif** de ces 4 fonctionnalités ici. Elles
  vivent ailleurs (core Hetzner via Hermès, et/ou apps Vercel) → c'est là qu'il faut tester.
- ✅ **Livrable créé** : **`docs/TESTS-FONCTIONNELS.md`** = plan de test complet (1 section
  par fonctionnalité, tableaux Quoi/Comment/Attendu/QUI/Statut + points conformité ERR-003),
  une liste « ❓ infos manquantes » par point, et une synthèse « qui teste quoi ». Tous les
  statuts laissés à ⬜ **à tester** (aucun résultat inventé).
- ⚠️ **Limite honnête** : Claude n'a **aucun accès** Hetzner ni aux apps live → ne peut PAS
  tester voix/NavLex/FAQ live/paiement lui-même. Testeur principal = **Bruno**, appui serveur
  = **Hermès**, conformité = **gardien**.
- 🔴 **En attente Bruno** : URL démo voix, outil de clone vocal, où tourne NavLex + son cron,
  où vit la FAQ, plateforme d'abonnement/paiement (mode test ?). Voir « infos manquantes »
  dans `docs/TESTS-FONCTIONNELS.md`. Test de paiement partenaire = action sensible (feu vert).

## Session 2026-06-22 (f) — vision « agent directeur » + mémoire centrale + intervenants

- 🎛️ **Nouvelle vision capturée** : Bruno veut un **agent directeur** (orchestrateur)
  qui pioche dans le core Hetzner + le web, gère sous-agents/services, et orchestre
  SAV + back-office via API. → Mis noir sur blanc dans **`docs/ARCHITECTURE-AGENT-DIRECTEUR.md`**
  (archi cible, garde-fous conformité, feuille de route brique par brique).
- 🤝 **Intervenants clarifiés (anti-frayeur « qui a changé quoi ? »)** :
  - **Hermès** = LLM via **OpenRouter** + **accès Hetzner** ; a équipé le serveur
    (Docker, Nginx, fail2ban, certbot, PM2), récupéré 4 sites, cloné GitHub **NOVA-HUB**,
    monté un cockpit web. C'est la **graine** de l'agent directeur (1 agent, pas encore orchestrateur).
  - **Claude (moi)** = code + conformité **via GitHub uniquement**, **aucun accès serveur**.
  - **Bruno** = chef / valide les actions sensibles.
- 🔐 **Sécurité** : la « frayeur » sur les changements d'accès = **Bruno lui-même** qui a
  réinitialisé le mot de passe (confirmé). Aucune intrusion. ⚠️ **À FAIRE** : changer le
  mot de passe du **cockpit** (`bruno / …`) car exposé en clair dans un chat.
- 💾 **Sauvegarde en cours** : volume Hetzner **10 Go** (id `106103603`) à monter sur
  `/mnt/navlys-backup`. Stratégie « web » retenue : OneDrive → Hetzner (rclone) pour
  l'important, + une partie hors OneDrive à traiter à part. ⚠️ Tout doit tenir dans 10 Go.
- 🧭 **Cap** : ne **rien rajouter** (ex. Google Antigravity) tant que la base n'est pas
  stable ; avancer **brique par brique** avec point de contrôle humain à chaque étape sensible.

## Session 2026-06-22 (e) — mémo de déploiement

- 📋 Livré : **`corrections-pretes/MEMO-DEPLOIEMENT.md`** — procédure pas-à-pas pour
  mettre en ligne TOUT le préparé (navbio index + /cgu + /privacy, bruno/bio, bruno/home,
  navlys-teaser), avec : diff contre prod, complétion des mentions éditeur (hors Git),
  contrôle conformité ERR-003, vérification post-déploiement.
- ⏳ **Tout reste en attente du feu vert prod de Bruno** + déploiement depuis l'ancien PC.
- 🟢 PR de la session : #5 (briefing) ✅, #7 (conformité) ✅, #10 (comptes à rebours) ✅ — toutes fusionnées.

## Session 2026-06-22 (d) — audit comptes à rebours des autres sites

- 🔎 **Audit live (lecture seule)** des sites/teasers restants :
  - **navlys-teaser**.vercel.app : compteur **périmé** (`2026-06-15`) + Ice Blue **ancien `#5fe0ff`**.
  - **brunopartouche.com** (home) : « **1ᵉʳ juin 2026** » (×2) + compteur périmé. Ice Blue OK, conformité OK.
  - **navlys.io** : OK (Ice Blue `#7DD3FC`, disclaimer conforme) ; juste « BETA juin S2 » soft.
  - **brunopartouche-teaser**.vercel.app : **404** (non-live) → rien.
- 📦 Livré : **`corrections-pretes/PATCH-comptes-a-rebours.md`** (patch avant/après, recale sur
  1ᵉʳ juillet 2026 + alignement Ice Blue teaser). Format patch car (a) changements d'une ligne,
  (b) le `<script>` final de brunopartouche.com dépasse la taille récupérable par le fetch.
- ⏭️ **En attente** : feu vert prod + application à la source (ancien PC) puis redéploiement.

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
- ✅ **Barre d'onglets basse** : l'état « actif » était figé sur Accueil et ne suivait
  pas les clics. L'onglet touché devient désormais actif (+ `aria-current`) ; l'onglet
  « Menu » ouvre le menu déroulant. Comportemental uniquement (ERR-003 inchangée).
- ⏳ **Reste (non faisable sans assets / décisions)** : remplacer les placeholders
  média (vidéos) par de vrais fichiers ; brancher les liens légaux (CGU/Confidentialité)
  une fois les pages créées ; confirmer la date du compte à rebours (`2026-07-06`).

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
