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
  (portes dérobées : cron/services/clés ajoutées). Journalisé : **ERR-006**.
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
  supprimé depuis — voir session (k), ERR-006).

## Session 2026-06-24 (nuit) — 🌙 corrections autonomes post-ultrareview (Bruno absent)

> Bruno : « passe les opérations sans t'arrêter, les questions restantes = demain matin. »
> Tout fait sur GitHub uniquement, rien en prod, aucune action sensible.

- ✅ **Tous les points de l'ultrareview corrigés** (détail : `docs/RAPPORT-ULTRAREVIEW-2026-06-24.md` §SUITES) :
  F1 charte `finance.html` alignée `#7DD3FC` ; F2 déjà OK ; M1 doublon ERR-002/ERR-004 fusionné ;
  M2 requalifié non-problème (pages légales biographie ≠ contenu financier).
- ✅ **Bilan dépôt : 0 critique / 0 élevé / 0 moyen / 0 faible restant.** Aucun secret, conformité OK.
- 🌅 **POUR DEMAIN MATIN — questions/actions qui exigent Bruno** (rien d'autre n'est bloqué) :
  0. 🚨 **LE PLUS URGENT — révocation Hermès** (incident sécurité, ERR-006) : dérouler
     `docs/INCIDENT-HERMES.md` (révoquer/rotationner TOUS ses accès, **y compris la clé API
     Anthropic**, OpenRouter, SSH Hetzner, GitHub, Vercel, clouds, cockpit ; re-vérifier le serveur).
  1. 🔐 **Serveur** : changer le **mot de passe cockpit** (exposé) + lancer un **backup**
     + passer **SSH en clés**. Pas-à-pas déjà prêt → `docs/RUNBOOK-BRUNO-100.md` ②③.
  2. 👀 **Voir en ligne** : importer `NAVLYS-BETA-` sur Vercel pour une preview (RUNBOOK ①), me coller l'URL.
  3. ❓ **Code des sites non confirmés sur GitHub** : navbiolife.com, navlys.io, et les 2 teasers
     (NOVA-HUB ne contient que navlys / navlys-core / brunopartouche) → où vit leur source ? (probable : ancien PC).
  4. ⚖️ **Mentions légales** : compléter `[ÉDITEUR]/[EMAIL]/[HÉBERGEUR]` (cgu/privacy) — hors Git + relecture juridique.
  5. 🎬 **Vidéos** des présentations (URLs) + **feu vert prod** quand prêt.
- ⚠️ **Audit du code live NOVA-HUB non réalisé** (clone bloqué par le proxy) → à faire en autorisant
  l'accès au dépôt NOVA-HUB dans une session, ou via son propre flux de PR.

## Session 2026-06-24 — 🔍 ULTRAREVIEW du dépôt → voir `docs/RAPPORT-ULTRAREVIEW-2026-06-24.md`

- ✅ Audit complet vérifié : **0 critique, 0 élevé**. Dépôt propre et sûr.
- ✅ **Aucun secret committé**, aucun terme interdit réel, « +8 à 12% » retiré partout,
  disclaimers 14/16, zéro lien interne ou renvoi de doc cassé.
- 🟡 4 points mineurs : M1 doublon journal **ERR-002 ≈ ERR-004** (à fusionner) ;
  M2 disclaimer absent sur `corrections-pretes/navbiolife.com/{cgu,privacy}.html` (versions `sites/` OK) ;
  F1 charte `#5fe0ff`→`#7DD3FC` dans `sites/navlys-app/finance.html` ; F2 mot « Jérusalem » dans `index.html` (hub).
- ⚠️ Note : audit du code **live NOVA-HUB** non fait (proxy a refusé le clone) → à auditer à part.
- 🔧 Tentative initiale en workflow multi-agents : échec technique (schéma StructuredOutput) →
  audit refait en direct (grep/lecture), plus fiable sur un petit dépôt.

## Session 2026-06-24 — TEST chaîne « Claude Design » → Adobe Express (réussi)

- 🎯 **Question de Bruno** : « exploites-tu Claude Design pour faire des prototypes / des
  choses finies ? Il faut le tester. »
- ✅ **Capacité CONFIRMÉE et testée** : Claude crée un visuel fini en HTML autonome puis
  l'envoie comme **document Adobe Express éditable**. Compte Adobe = `auth` (complet).
  Connecteurs aussi dispo : Vercel, Figma, Canva.
- ✅ **Premier livrable** : **`designs/navlys-teaser-card.html`** (carré 1080×1080,
  « Ouverture 1ᵉʳ juillet », slogan officiel, Méthode 90/10, **disclaimer conforme**,
  charte ice blue). Import Express **OK** (1 slide, rendu fidèle).
- 📄 **Recette capitalisée** : **`docs/CLAUDE-DESIGN-PIPELINE.md`** (étapes + polices Adobe
  validées AGaramondPro/FiraSans + pièges : params en chaînes, PostScript names, conformité).
- ⚠️ **Limite honnête** : Claude **ne peut pas ouvrir un lien `claude.ai/design/p/…`**
  (page protégée). Pour exploiter un design fait dans l'app : menu « Send to Adobe Express ».
- ℹ️ **Sites web responsives** (les 4 maquettes `sites/*`) → ne passent PAS par Express ;
  Express = visuels marketing. Sites = HTML déployé (Vercel).
- 💾 **Serveur** : working tree propre, tout poussé sur GitHub → Bruno peut changer d'ordi sans rien perdre.

## Session 2026-06-23 (nuit) — sécurité vérifiée + design v2 finalisé (Claude autonome)

- ✅ **E-mails d'inscription protégés** : RLS de `public.inscriptions` vérifié (Supabase MCP) =
  **INSERT-only pour `anon`, AUCUN SELECT** → e-mails non lisibles publiquement. Clé anon = sans danger.
  Détail : `docs/AUDIT-SECURITE-NUIT-2026-06-23.md`. → question RLS **CLOSE**.
- ✅ **Audit live brunopartouche.com (home)** complété (fetch entier) : **propre** (0 terme interdit,
  0 « Jérusalem », « Pas de promesse. Une discipline. »). Seul écart : compte à rebours « 1ᵉʳ juin » périmé (déjà patché).
- ✅ **Design v2 finalisé** : cinéma incurvé + **menu HAUT fixe** + rideaux bleu/champagne + charte
  `#7DD3FC` sur les 4 sites + hub d'aperçu ; conformité **verte**. (PRs #15, #16 fusionnées.)
- 📋 **`docs/RUNBOOK-BRUNO-100.md`** : les **5 actions restantes (toi seul)** pour atteindre 100 %
  (import Vercel, sécuriser serveur, rotation secrets, vidéos, déploiement réel).
- ⚠️ Rien en prod. Tout fusionné dans la branche principale.

## Session 2026-06-23 — ✅ VÉRIF : le code des sites est DÉJÀ dans GitHub (NOVA-HUB)

- 🎯 **Question tranchée** (avant de copier le code depuis l'ancien PC) : **le code est déjà
  sauvegardé sur GitHub**, inutile de tout recopier à la main.
- 📦 **Dépôt `bpartouche46-sys/NOVA-HUB`** (public, **actif — maj 2026-06-23**) contient le
  code source HTML organisé : `sites/navlys`, `sites/navlys-core` (= navlys.com),
  `sites/brunopartouche`, `sites/_shared`, avec les `vercel.json`. PRs fusionnées le jour même.
- 📦 **Dépôt privé `bpartouche46-sys-navlys-com`** existe aussi (navlys.com, maj 2026-05-20).
- ✅ **Conséquence** : la Phase 0 « sauvegarde du code » est **déjà couverte** pour
  navlys / navlys-core / brunopartouche. Le guide `docs/SAUVEGARDE-CODE-VERCEL.md`
  (copie depuis l'ancien PC) **n'est PLUS la priorité** pour ces sites.
- ❓ **À vérifier encore (couverture GitHub incomplète)** : **navbiolife.com**, **navlys.io**,
  **navlys-teaser**, **brunopartouche-teaser** ne sont pas clairement dans NOVA-HUB →
  confirmer où vit leur code. + Éléments **server-local non sauvegardés** : cockpit
  (`/var/www/cockpit/`), 18 skills, médias sous `/root/navlys/`.
- 🔗 Lien Vercel↔GitHub : les sites tournent encore en `source: cli` → **relier les projets
  Vercel à NOVA-HUB** (Phase 3) pour que les déploiements partent de Git, plus du CLI.

## Session 2026-06-23 — passation Hermès archivée (avant retrait)

- 📥 **Passation complète reçue d'Hermès** (via Bruno) → consolidée dans
  **`docs/PASSATION-HERMES.md`** (secrets & IP masqués, règle d'or).
- 🟢 **Bonne nouvelle pour le retrait** : Hermès a **ZÉRO cron / zéro automatisation** → le
  retirer **ne casse rien d'automatique**. Source de vérité = **GitHub** (repos + cette mémoire).
- 🔴 **3 risques à traiter (Bruno, guidé par Claude)** :
  1. **AUCUN backup serveur** → cockpit + fichiers locaux non sauvegardés (les repos, eux, sont sur GitHub).
  2. **Cockpit en HTTP** sur IP publique + **mot de passe `bruno/…` exposé en clair** → changer mdp + SSL/fermer.
  3. **Surveillance orpheline** (disque, SSL, maj sécu, fail2ban, factures Hetzner/Vercel) → reprise par Bruno.
- 🟡 **À rapatrier dans GitHub** (server-local, non sauvegardé) : **cockpit** (`/var/www/cockpit/`),
  **18 skills**, et **vérifier les médias** sous `/root/navlys/`.
- 🧠 Mémoire Hermès = dans l'app Hermès (rien sur serveur) → disparaîtra avec lui **sauf** cet
  archivage (fait ✅). Mémoire Claude = ce dépôt (sûr).
- ⏳ **Prochaines actions guidées** (ce soir/devant l'écran) : `crontab -l`, puis **backups** +
  **SSL cockpit** + **changement mdp cockpit**.

## Session 2026-06-22 — décision : Claude agent unique, Hermès retiré

- 🧭 **Décision Bruno** : « **je ne veux plus de Hermès, c'est Claude qui a la main et
  personne d'autre** ». → Hermès **retiré** ; Claude = **agent IA unique** du projet.
- ⚖️ **Cadre honnête posé** : Claude = cerveau (plan/code/mémoire/conformité/guidage) mais
  **GitHub seul, zéro accès système** → **Bruno exécute** (2FA). Garde-fou maintenu : **gardien**
  (conformité) + Bruno (argent/public) contrôlent Claude. Pas d'agent incontrôlé.
- ⚠️ **Avant de débrancher Hermès à 100 %** : récupérer ce qu'il a construit/fait tourner
  (mémoire serveur → consolider dans ce dépôt ; cron/sauvegardes ; cockpit) pour ne rien casser.
- 📄 Maj `docs/SECURITE-AGENTS-ET-SECRETS.md` (§1 et §2). À ajuster ensuite : `GOUVERNANCE.md`
  principe 2 (« surveillance mutuelle Claude+Hermès » → devient **Claude ↔ gardien + Bruno**).
- 🗺️ **Carte sources & mémoire** (demandée par Bruno) : code = GitHub **NOVA-HUB** (actif 22/06)
  + dépôt privé navlys.com + `/root/navlys/` (serveur) + Vercel (live). Mémoire = **ce dépôt
  `NAVLYS-BETA-`**. Ancien PC = backup froid (médias/.env/clé SSH probables). Nouvel PC = poste
  de Bruno (exécution). Claude n'est sur **aucun** des deux (cloud isolé, GitHub only).

## Session 2026-06-22 — sécurité : agents SANS accès (décision Bruno)

- 🔐 **Décision Bruno** : **Hermès déconnecté du SSH Hetzner**. Les agents IA (Hermès, Claude)
  aident en **CONSEIL UNIQUEMENT, zéro accès** (serveur, comptes, clés, paiements).
  **Bruno = seul exécuteur**, quasi tout déjà en **2FA app mobile**.
- 🧭 Implication « agent directeur » : orchestration **par le conseil** (les agents proposent,
  Bruno exécute). Aucun agent ne détient de credentials.
- ✅ **Vérif dépôt** : scan secrets effectué → **aucun mot de passe/clé/JWT/IP** committé (règle
  d'or tenue).
- 📄 **Capturé** dans **`docs/SECURITE-AGENTS-ET-SECRETS.md`** : modèle d'accès + **inventaire
  des clés à roder AVANT lancement** (root SSH→clés, mdp cockpit, anciens mdp, clé Supabase anon
  à vérifier RLS, tokens API à révoquer, secrets en dur à sortir du code).
- ⏳ **À faire avant lancement** : rotation/suppression des secrets à risque + SSH en clés.

## Session 2026-06-22 — diagnostic serveur Hetzner (NAVLYS CORE)

- ✅ **Diagnostic serveur réalisé** (Bruno tape dans la console web Hetzner, Claude guide ;
  pas d'accès réseau direct). Détail : **`docs/DIAGNOSTIC-SERVEUR-2026-06-22.md`**.
- 🟢 Serveur **sain/stable/protégé** : charge nulle, 7 Go RAM libres, disque à 2 %,
  fail2ban actif (**13 IP bannies / 255**), nginx + Docker + fail2ban actifs.
- 🟠 Mais **quasi vide en exécution** : **0 conteneur Docker**, **pas de HTTPS (443)**.
- 🟢🔑 `/root/navlys/` **contient du code** (~9 dossiers, maj 22/06) → à relier au travail
  **Hermès / NOVA-HUB** (ETAT session f) → **à sauvegarder en priorité**.
- 🔐 Mot de passe root **réinitialisé** (l'ancien avait été collé en clair) ; reste à passer
  SSH en **clés** + désactiver login par mot de passe (+ mdp cockpit).
- ⏳ **Reste (ce soir, mobile)** : `crontab -l`. Piège : la console Hetzner **supprime le `>`**
  au collage → taper les redirections à la main.

## Session 2026-06-22 (d) — compliance pages live + audit navlys.com

- 🔎 **Audit complet navlys.com** (home, /finance, /next-gen, /navlex, /radio) via fetch
  Vercel authentifié. **0 terme interdit** (CIF/ORIAS/Ashkelon/Israël/Jérusalem/DFENSER),
  0 « NOVA » résiduel, disclaimers présents. Écarts relevés : accent réel `#5fe0ff` (≠
  charte `#7DD3FC`), pourpre `#7a1f2b` présent, pas d'OG/schema.org, **/finance sans accents**.
- ✅ **`/finance` corrigé** → `sites/navlys-app/finance.html` (début de rapatriement Git du
  code live). Passe : tous les accents restaurés (corps **+ meta description**), apostrophes
  typographiques dans le JS, `0 €`. Disclaimer footer vérifié présent. 0 terme interdit.
  Aucun NOVA/CIF/DFENSER à retirer (déjà absents). **À redéployer côté Vercel par Bruno.**
- 🔐 **Alerte sécurité** : un mot de passe root + IP serveur ont été collés en clair dans le
  chat → **à changer immédiatement** (compromis), passer SSH en clés uniquement. Jamais écrit
  dans le dépôt.
- 🧭 **Décisions Bruno (session)** : (1) corriger les **pages live** ; (2) retrait Israël/
  Ashkelon/DFENSER **du contenu public uniquement** (backend paiements réel non touché) ;
  (3) **finir Sécurité+Compliance d'abord** → marketing (newsletter, profils) et config
  paiements **en attente**.

## Session 2026-06-22 (c) — proto : vraie date du compte à rebours

- ✅ **Compte à rebours** : date confirmée **depuis la home live navlys.com**
  (« l'ouverture en avant-première **le 1ᵉʳ juillet** ») → `LAUNCH_DATE` passé de
  `2026-07-06` (placeholder) à **`2026-07-01T00:00:00+02:00`**. Plus de date inventée.
- 🔎 **Vidéo de présentation** : l'URL du proto `navlys.com/media/presentation.mp4`
  est **confirmée réelle** (présente sur la home live). Rien à changer.
- ⏳ **Reste** : pas de vraies vidéos pour la bande de mini-vidéos (décoratives sur le
  proto, inexistantes sur le live) ; **pas de pages CGU/Confidentialité** sur le live
  (le pied de page renvoie vers /finance et /next-gen, disclaimer en clair) → ne PAS
  inventer de pages légales (cf. ERR-003, /cgu & /privacy en 404).

## Session NUIT — Design v2 décliné sur les 4 sites (autonome)
- ✅ Système de design commun `assets/navlys-v2.css` + `.js` (cinéma incurvé + rideaux, charte ice blue).
- ✅ 4 maquettes : `sites/navlys.com`, `brunopartouche.com`, `navbiolife.com`, `navlys.io` + hub `index.html`.
- ✅ Corrections conformité **intégrées** : « Jérusalem » retiré, pages /cgu /privacy navbio créées (fix 404),
  bouton « Écoutez Bruno » (audio au clic), disclaimer bandeau+footer partout, zéro terme interdit/promesse.
- ✅ Contrôle conformité automatique : **VERT**. Détail → `docs/RAPPORT-NUIT-DESIGN-V2.md`.
- ⏳ À décider demain : menu haut/bas, rideaux bleu/rouge, vidéos des présentations, date de lancement.
- ⚠️ Rien en prod. Pour voir en ligne : importer le repo `NAVLYS-BETA-` sur Vercel (Option 1).
- Branche : `claude/pre-launch-qa-lcd1pf`.

## Session 2026-06-22 (h) — gouvernance + délégation + contrôle conformité Vague 1

- ⚖️ **Gouvernance gravée** (`docs/GOUVERNANCE.md`, reliée à CLAUDE.md règle d'or) :
  1) **zéro répétition** (tout capitaliser en knowledge/skill/routine, relié au core),
  2) ~~Claude + Hermès orchestrateurs en surveillance mutuelle~~ → **révisé** : Hermès retiré
     (ERR-006) ; plus d'orchestrateur tiers de confiance, opérateur futur **bridé par le moteur**,
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
  À confirmer : numéro WhatsApp `+33 7 56 83 34 69` (navbio) bien destiné à être public.

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
- ✅ **Snapshot Hetzner FAIT** (filet de sécurité serveur en place). 🎉
- ✅ Utilisateur confirmé **sur l'ANCIEN PC** (celui qui contient le code source).
- 🔧 Étape en cours : retrouver le dossier `navlys-app` sur l'ancien PC (recherche Explorateur).
- 📄 Guide fourni : `docs/SAUVEGARDE-CODE-VERCEL.md` (rapatrier le code dans GitHub via GitHub Desktop).
- ⚠️ Le code source n'existe QUE sur l'ancien PC → priorité absolue à le sauvegarder.
- Prochain point d'attente : trouver le dossier du site, puis le publier dans GitHub.

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
