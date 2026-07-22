# ÉTAT DES LIEUX — où on en est

> Mis à jour à la fin de chaque session pour que la suivante reprenne sans tout relire.

## Session 2026-07-15 — 🔁 MODE BOUCLE ACTIVE + correction Hetzner (ERR-008)

- 🔍 **État LIVE vérifié** (fetch Vercel de navlys.com, dernière modif 12/07) : le site est **bien
  plus avancé** que la mémoire ne le disait. **Plus de countdown** (mode produit lancé), **démo voix
  LIVE** (avatar + clone vocal via edge functions Supabase `hhrlgyvtqluxpywjiwkd` : `/voix`,
  `/voix-demo`), apps en home (Next Gen, Finance, Test Bateaux, NAVLEX, Journal, Radio, Partenaires),
  charte `#7DD3FC` OK, disclaimer OK. Nouveaux projets Vercel apparus : `navlys-site`, `navlys-core`,
  `api`, `123`. → **La mémoire était périmée d'~2 semaines.**
- 🚩 **2 dérives possibles vs règles gravées à surveiller** : (1) **dépersonnalisation** — la home
  affiche Bruno (avatar vidéo + « moi c'est Bruno » + voix) alors que la règle n°1 = Bruno invisible
  sur NAVLYS ; (2) **slogan/positionnement** — devenu « Ton IA · Ta vie · Ton rythme » +
  « la 1ʳᵉ IA qui orchestre tes IA » (≠ slogan figé « Ma méthode, ton argent, ton rythme »). À
  arbitrer par Bruno (peut être un choix assumé).
- 🔴→✅ **ERR-008 corrigée** : la mémoire déclarait « **Hetzner abandonné** » → **FAUX**. Bruno a
  rétabli : **Hetzner = serveur CENTRAL** (Nuremberg) avec **core NAVLYS + IA locales**. Cap : **tout
  en cron local indépendant sur Hetzner**, ouvert au web ; **Vercel + Supabase = simples outils**.
  Corrigé dans `CLAUDE.md`, `AUTONOMIE-CLAUDE.md`, `JOURNAL-ERREURS.md`. Core = `/root/navlys/`.
- ⚙️ **Décision Bruno 2026-07-15 — BOUCLE ACTIVE jusqu'au « site 100% en ligne »** : Claude ne
  s'arrête plus, crée autant d'agents de contrôle + marketing que nécessaire. Autonomie =
  **« Publier auto, argent = toi »** → agents **déploient/publient le contenu public seuls** après
  gardien conformité ; **toute dépense** + **GATE de lancement final** = **Bruno**.
- 🎯 **Objectif tokens** : routeur multi-IA sur les **quotas gratuits quotidiens** de toutes les IA
  dispo (1 compte/IA, free tier légitime — pas de création de comptes en boucle).
- 📋 **Programme (tasks)** : (1) corriger mémoire ✅ · (2) audit multi-agents → punch-list 100% ✅ ·
  (3) corriger+déployer les écarts · (4) plan+scripts core-cron Hetzner multi-IA · (5) marketing ·
  (6) réconciliation PR → PR centralisation · (7) teaser 1er août.
- ✅ **ARBITRAGE dépersonnalisation (Bruno 2026-07-15)** : **garder Bruno visible/audible** sur
  NAVLYS **AVEC disclaimer « voix générée par IA » partout** (RGPD art. 9 + IA Act art. 50). Règle
  gravée n°1 assouplie en conséquence (cf. `CLAUDE.md` §0). Rien retiré.
- 🚨 **DIAGNOSTIC RÉSOLU — DEUX BRANCHES DIVERGENTES (la cause des « oublis »)** : le dépôt a deux
  lignes qui ne se parlent pas. **`main`** = la **vraie ligne de dev** : elle porte le **code
  applicatif** (`supabase/`, `api/cron-tick.js`, `skills-lock.json`), le **`live-source/` COMPLET**,
  et les pages net-new (`skipper`, `voile`, `cours`, `profil`, `sw.js`). **La branche par défaut**
  (`claude/memory-saturation-safeguards-kl4ysc`, sur laquelle je travaillais) = un **snapshot
  mémoire/docs** qui n'a **rien de tout ça** → d'où l'illusion « tout est oublié » : le contenu est
  sur `main`, pas sur le défaut. **9 PR de vrai travail** ciblent `main` sans être consolidés (202,
  201, 198, 196, 181, 62, **46**, 44, 39) ; 2 à fermer (53, 42). ⚠️ **Le PLUS bloquant = PR #46** :
  l'**app NAVLYS Next.js déployable** (onboarding, **gate de lancement**, auth Supabase, pages
  légales `/legal/*`) — **intégrée NULLE PART**. Sans elle, pas de produit gated conforme = **blocage
  absolu du lancement**.
- 🧭 **PLAN DE CENTRALISATION** : créer `claude/centralisation-lancement` **depuis `main`** (pas le
  défaut) → intégrer d'abord les fichiers net-new (zéro conflit), puis le gros bloc app #46 (revue
  Bruno, import propre sans l'historique dirty), puis les modifs mono-fichier, puis consolider à la
  main les fichiers partagés (`index.html`, `CLAUDE.md`, service worker : choisir UNE version),
  **passe conformité obligatoire** (disclaimer `navlys-alive.js` sur chaque page net-new + caviardage
  CAP2027), puis fermer les PR sources. **⚠️ Le travail mémoire/docs (ERR-008, Hetzner, arbitrages)
  reste sur la branche défaut (PR #203) ; le travail CODE se fait depuis `main`.**
- ✅ **Fait cette session** : ancres cassées `/#univers → /adhesion` (finance + next-gen). ⚠️ à
  ré-appliquer sur `main` (source de vérité) lors de la centralisation.
- ✅ **Fait cette session** : ancres cassées `/#univers → /adhesion` (finance + next-gen, source
  vérifiée conforme à la prod). Escadron **réconciliation PR** en cours (11 PR).

## Session 2026-06-30 — /controle (routine gardien exécutée)

- ✅ **Routine exécutée** : lecture `JOURNAL-ERREURS`, `CHECKLIST-SECURITE`, `ETAT-DES-LIEUX`, `ROUTINE`, puis audit par l’agent **gardien**.
- ✅ **État Git local validé** : branche `copilot/review-session-history-tips`, `git status` propre, `git diff` vide.
- ✅ **Contrôle récidives** : aucune reproduction détectée des erreurs **ERR-001 → ERR-007** dans l’état actuel du dépôt local.
- ⚠️ **Correction appliquée** : aucune (pas nécessaire).
- 🛑 **À décider (hors périmètre local)** : audit prod complémentaire Vercel/Hetzner si contrôle live demandé.
- 📓 **Leçon** : aucune nouvelle erreur détectée, donc aucune nouvelle entrée `ERR-XXX`.

## Session 2026-06-28 — finalisation lancement 1ᵉʳ juillet + sécurité dépôt

- 🔴 **INCIDENT découvert** : le dépôt GitHub est **PUBLIC** et une session parallèle y avait déversé
  ~30 packs Drive/OneDrive (PII, e-réputation, 2 noms toxiques). Audit complet réalisé.
- ✅ **Sécurité exécutée** : PII rédigées repo-wide (téléphones, entité → `[entité — hors dépôt]`) ;
  **fichiers privés retirés** (e-réputation ×6, procédure clés, dossier identité, prospection JCVD) ;
  doublons imbriqués `sessions/busy-awesome-sagan` supprimés ; `.gitignore` durci.
- ✅ **Renommage packs toxiques** : `CHEVAL_TROIE_PACK` → `NAVLYS_MARGE_REVELEE_PACK` ;
  `MARTINGALE_SCIENTIFIQUE_PACK` → `NAVLYS_METHODE_90_10_PACK`.
- ✅ **Synthèse unique** : `docs/SYNTHESE-NAVLYS-MASTER.md` réunit les 12 rubriques + toutes les
  recommandations + toute la stratégie de navlys.com (dépersonnalisé). Plan : `docs/PLAN-NETTOYAGE-DEPOT.md`.
- ✅ **navlys.com prêt à déployer** : countdown = **1ᵉʳ juillet** ✅, 5 pages (index/tarifs/cgu/privacy/mentions),
  CIF/ORIAS uniquement en négation, 0 `#5fe0ff`, « méditerranéen » retiré du H1 (dépersonnalisation).
- 🔴 **RESTE À BRUNO** : (1) **passer le dépôt en PRIVÉ** (Settings→Danger Zone) ; (2) **déployer sur Vercel** ;
  (3) décider la **purge d'historique** (oui/non) ; (4) valider le légal.

## Session 2026-06-25 — build pages navlys.com (« tout faire »)

- ✅ **Grille tarifaire FIGÉE** (validée Bruno) → `STRATEGIE-NAVLYS.md` §5 (Finance Gratuit/19,99/39,99/79,99 ;
  NAVBIO numérique à vie 0/29,99/49,99/99,99/199,99 ; NAVLEX 0(5q)/9,99/19,99). Étude concurrentielle sourcée :
  `docs/STRATEGIE-PRICING-2026-06.md`.
- ✅ **Pages construites (brouillon, charte #7DD3FC, à déployer par Bruno)** :
  - `sites/navlys.com/tarifs.html` (grille officielle, 3 produits, freemium, CTAs).
  - `sites/navlys.com/cgu.html` + `privacy.html` (stubs remplacés par versions complètes) + `mentions.html` (nouveau)
    → **rebouchent les 404 légaux**. Entité masquée → à compléter + valider juridiquement au déploiement.
  - `sites/navlys.com/index.html` enrichi : **FAQ « questions honnêtes »** (voix NAVLYS 3ᵉ pers.), **maximes**,
    **punchline signature** (« vent + barre · sois aware »), liens /tarifs + /mentions.
- 🔎 Conformité revérifiée sur toutes les pages : 0 donnée privée, 0 géo interdite, 0 promesse, 0 `#5fe0ff`, voix neutre.
- ⏳ **Reste (enrichissements + déploiement)** : page `/partenaires` (les 19), module « pouls du marché » live,
  accessibilité (texte XL/contraste), bloc manifeste mémoire ; **déploiement Vercel = Bruno** ; **valider le légal**.
- 🔴 Sécurité (Bruno) inchangée : régénérer clés API GitHub+Alpaca · WHOIS OVH · cockpit mdp+SSL.

## Session 2026-06-23 (nuit) — ultra-review + correctifs

- 🔬 **Revue adversariale multi-agents** (4 dimensions → re-vérification → synthèse).
  Verdict : **privé/secrets = PROPRE** (0 fuite) ; **conformité doctrinale = à nettoyer** (0 critique, 8 majeurs, 6 mineurs).
- ✅ **Correctifs appliqués** :
  - 🌍 **Géo interdite purgée des pages NAVLYS** : `sites/navlys.com/index.html` (titre, ticker, carte plaisir, Radio) + `proto/navlys-v2.html` (meta, Radio). *(La revue avait raison : mes grep ratant les accents avaient masqué ces occurrences.)* bp.com **conserve** Méditerranée (autorisée).
  - 🎨 `sites/navlys-app/finance.html` : `#5fe0ff` → **#7DD3FC**.
  - 📐 `DESIGN-NAVLYS.md` : narratif méditerranéen recadré (bp.com only) + mojibake corrigé.
  - 💶 `STRATEGIE-NAVLYS.md` + `TESTS-FONCTIONNELS.md` : caveat **F4 PRO 99,99** + « grille à figer ».
  - 🔗 `INVENTAIRE` : renvoi cassé corrigé, « Votre tempo » marqué variante non officielle.
- 🟠 **Restent décisions Bruno** (non inventées) : figer **1 grille tarifaire** (F1–F4 vs échelle live) ;
  figer la **valeur de l'accent doré** (bronze #d4a155 vs champagne #e9d3a0).

## Session 2026-06-23 (nuit) — finalisation autonome (G1)

- ✅ **Modèles légaux rapatriés** (`contenu/legal/`) : **mentions** (A1) · **CGU** (A5) ·
  **Confidentialité RGPD** (A6 v1.1) — **entité/SIREN/adresse masqués**, à valider juridiquement,
  rebouchent les 404 `/cgu` `/privacy` au déploiement.
- ✅ **Plan d'enrichissement du site central** (`docs/PLAN-ENRICHISSEMENT-SITE-CENTRAL.md`) :
  13 blocs priorisés + corrections conformité + méthode.
- ✅ **Résumé de session** (`docs/RESUME-SESSION-2026-06-23.md`, format Hermès).
- ⏭️ **Pour Bruno (demain)** : sécurité (clés API, WHOIS, cockpit/SSL) ; aligner sites live #7DD3FC ;
  figer 1 grille tarifaire + 1 date ; faire valider le légal ; lancer l'enrichissement (prio 1→6).
- 🔒 Tout le travail de nuit = **GitHub seul, zéro déploiement, zéro donnée privée** (vérifié).

## Session 2026-06-23 — 💎 mine d'or Drive assimilée (analyse étendue)

- ✅ **Accès Google Drive confirmé** (bpartouche46@gmail.com) → ~110 fichiers NAVLYS lus.
  **`NAVLYS-MASTER.md` (21 juin) = carte maîtresse** (supplante les cartes antérieures).
- 📄 **Assimilation PUBLIQUE** → `docs/ASSIMILATION-DRIVE-2026-06-23.md` : slogan officiel,
  doctrine 2 univers (Méditerranée + Israël = **interdits sur NAVLYS**), charte **#7DD3FC zéro pourpre**,
  méthode 90/10, tarifs F1–F4 + NAVBIO, paiements (Stripe exclu), **slogans obsolètes à bannir**.
- 🎯 **Chasse « 1+1 / Van Damme » = INTROUVABLE** (ni sites, ni Drive) → à créer avec Bruno s'il y tient.
  **Personnes connues = liste Y1** (Hasheur, Yomi Denzel, Coin Bureau…) = **prospects privés**, jamais publics.
- 🔴 **PRIVÉ gardé hors dépôt** (entité, n°, IDs infra, clés, liste influenceurs, généalogie, banque).
- 🔴 **Urgences sécurité (MASTER G3)** : régénérer **clés API GitHub + Alpaca** (commitées) ; **privacy WHOIS OVH**.
- ✅ **Décisions Bruno en attente** : (1) confirmer charte #7DD3FC + aligner sites live (encore #5fe0ff) ;
  (2) créer ou non le « 1+1 / Van Damme ».
- 🟢 **À rapatrier sur demande** : pack éditorial E1 (bios 13 réseaux, 9 posts IG, 3 reels, calendrier 90j),
  modèles légaux (CGV/CGU/RGPD), templates emails Resend.

## Session 2026-06-23 — ✅ 1er backup serveur + sources récupérées (en cours)

- ✅ **SNAPSHOT HETZNER CRÉÉ** par Bruno : **`navlys-core-1782194314`** (2026-06-23) →
  **premier point de restauration complet** du serveur. Risque « zéro backup » levé.
- 📥 **Sources récupérées de l'ancien PC** (envoyées par Bruno) : code source **navlys.io**
  (`index.html`) + **vidéo de marque navlys.io** (ElevenLabs) + outils Windows (DiskInfo, etc.).
- 🔎 **Audit `index.html` navlys.io** : 🔴 palette **violet/fuchsia/rose** (`#4b1a80/#c026d3/#e81889`)
  = contraire à la charte « zéro pourpre » ; 🟠 Ice Blue ancien `#5fe0ff` (≠ `#7DD3FC`) ;
  🔴 compte à rebours périmé (cible `2026-06-15`) ; 🟢 OG + schema.org présents, disclaimer OK.
  → à clarifier : est-ce la version **live** de navlys.io ou un brouillon local ? (audit antérieur
  disait navlys.io conforme `#7DD3FC`).
- ⏳ **Reste** : `crontab -l` ; **mot de passe cockpit (exposé) + SSL** ; stocker la vidéo
  proprement ; décider correction navlys.io (palette → charte, date → 1ᵉʳ juillet).
- ℹ️ Note : Claude **ne peut pas** écouter les notes vocales (pas de transcription) ni lancer de `.exe`.
## Session 2026-06-28 (d) — REFONTE navlys.com PRÊTE (aperçu) + apps backend déployé

- ✅ **Refonte navlys.com construite & vérifiée en aperçu** (design navlys.io : fond animé +
  logo doré, charte `#7DD3FC`, slogan figé) réunissant applis + partenaires + communauté.
  Aperçu live : `navlys-app-git-claude-migrate-old-computer-data-q7im6j-navlys.vercel.app`.
- ✅ **Apps backend opérationnel** : `/api/navlex`, `/api/sav`, `/api/voice` **déployées**
  (fonctions edge à la racine `/api/`, `vercel.json` → `outputDirectory: live-source`).
  NAVLEX répond (405 sur GET = OK). Clés env posées par Bruno (ANTHROPIC_API_KEY,
  ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID). ⚠️ Les apps n'acceptent QUE les vrais domaines
  (CORS) → test réel possible uniquement sur navlys.com une fois en prod.
- 🔌 **Vercel navlys-app** : relié à **NAVLYS-BETA-**. ⚠️ **Découverte clé** : la PRODUCTION
  n'est PAS pilotée par la branche par défaut — **les push Git créent des APERÇUS** (`target:null`).
  La prod (navlys.com) = déploiements CLI/`claudenavlys` historiques, mis à jour par **promotion**.
- 🪧 **ÉTAPE FINALE pour mettre la refonte sur navlys.com** (Bruno, sur DESKTOP — pas mobile) :
  - Soit **Promote to Production** sur le dernier déploiement (Vercel → navlys-app → Deployments
    → dernier (refonte) → ⋯ → Promote to Production).
  - Soit **Settings → Git → Production Branch** = la branche poussée → alors les push deviennent
    prod automatiquement (= autonomie permanente recherchée).
  - Claude ne peut PAS promouvoir via API (aucun outil MCP) ni pousser en prod sans ce réglage.
- 🛟 Rollback dispo (anciens déploiements `isRollbackCandidate`). Rien détruit.

## Session 2026-06-28 (c) — CONSOLIDATION navlys.com (en cours) + bascule sur nouveau PC

- 🎯 **Demande Bruno** : un seul site **propre** = navlys.com qui réunit tout (les sites « en
  vrac »), réorganisé proprement. + finir aujourd'hui + sites beta actifs à tester.
- ✅ **Fait** :
  - **Audit complet** des 14 URLs live → `docs/AUDIT-SITES-2026-06-28.md`.
  - **Plan unique** → `docs/PLAN-SITE-GLOBAL-NAVLYS.md`.
  - **Version propre de navlys.com construite** dans `live-source/` : `partenaires.html`
    (19 partenaires rapatriés de navlys.io) + accueil nettoyé (menu Partenaires + pied
    « Famille NAVLYS »). Conformité VERT. **PR #35 MERGÉE** dans la branche par défaut.
  - **Décisions Bruno** : lancement public unique = **1ᵉʳ juillet 2026** ; **navlys.io →
    fusionner dans navlys.com puis rediriger**.
- 🔌 **État Vercel (navlys-app) au moment de la bascule** :
  - **NOVA-HUB = DÉCONNECTÉ** (fait par Bruno) ; **NAVLYS-BETA- = PAS ENCORE reconnecté**.
  - ⚠️ Le site **reste EN LIGNE** (le dernier déploiement prod continue de servir). Rien cassé.
  - Bruno a eu du mal avec l'UI Vercel/GitHub (onglets) → **il finit le branchement sur le
    NOUVEAU PC**.
- 🪧 **SEULE étape restante pour déployer la version propre** :
  1. navlys-app → Settings → **Git → Connect → `bpartouche46-sys/NAVLYS-BETA-`** (autoriser
     l'app Vercel sur ce dépôt : « All repositories » ou cocher NAVLYS-BETA-).
  2. Settings → **General → Root Directory = `live-source`**.
  3. Laisser « Production Branch » par défaut → **premier déploiement = APERÇU** ; Claude
     vérifie puis promeut en prod (filet : rollback dispo).
- 🛠️ **Reste à construire APRÈS le 1er déploiement v1** : `/journal` (fusion `/tech`+
  `/influenceurs`), **pages légales** (`/mentions` `/cgu` `/confidentialite`), `/communaute`,
  **redirections** navlys.io + navlys-teaser → navlys.com, **corrections conformité** sur sites
  séparés (🔴 « Jérusalem » navbio meta, 🔴 « +8 à 12 % » brunopartouche.com/bio).
- 🔑 **Accès Claude** : Vercel + Supabase OK (MCP, écriture) ; **GitHub limité à `navlys-beta-`**
  (ne peut PAS éditer NOVA-HUB) → c'est pourquoi navlys-app doit pointer sur NAVLYS-BETA-.

## Session 2026-06-28 (b) — DÉCISION MAJEURE : autonomie Claude sur Vercel+Supabase

- 🎯 **Demande Bruno** : *« prends la main et transfère tout sur Hetzner, puis on récupère la
  main sur le neuf ; dis-moi ce qui te manque pour être autonome et mettre à jour le site
  avec/sans moi, en direct / nouveau PC / mobile. »*
- 🔎 **Vérification live (2026-06-28)** : Claude a un **accès direct réel** à —
  - **Vercel équipe NAVLYS** (`team_nBtY5FOQMPIT4J8Bmf7wvBSC`) : 6 projets (`navlys-app`,
    `navbio`, `brunopartouche`, `navlys-io`, `navlys-teaser`, `brunopartouche-teaser`),
    déploiements visibles, dernier `navlys-app` = **production READY** (déployé en CLI par
    `claudenavlys`), **rollback candidate** dispo.
  - **Supabase `navlys-core`** (eu-west-3, ACTIVE_HEALTHY) : base vivante — `journal`(37),
    `dossiers`(27), `core_knowledge`(15), `missions`(14), `agents`(14), `navlys_memoire`(10),
    `inscriptions`(1)… RLS actif partout.
- ❌ **Hetzner par SSH = impossible pour Claude** (cloud isolé + interdit aux agents) ET
  **legacy** (0 conteneur). → **Détour Hetzner abandonné** : on travaille **nativement
  Vercel + Supabase**, déjà accessibles.
- ⚖️ **3 arbitrages Bruno (AskUserQuestion)** :
  1. **Architecture = Vercel + Supabase** (drop Hetzner).
  2. **Autonomie prod = « Prod autonome sauf argent/légal »** → Claude **déploie en production
     seul** après contrôle conformité. ⚠️ **Modifie la règle gravée « public = Bruno »** —
     choix explicite de Bruno. Argent + juridique restent Bruno.
  3. **Code source = push GitHub** (Bruno publie les sites dans `navlys-beta-`).
- 📄 **Gravé** : nouveau doc **`docs/AUTONOMIE-CLAUDE.md`** (source de vérité du « qui fait
  quoi »). Amendé **`GOUVERNANCE.md`** §2 (accès Vercel/Supabase révocables) + §4 (délégation
  élargie). Ajouté à la table de réf. de `CLAUDE.md`.
- ⏳ **Bloquant restant pour l'autonomie complète** : le **vrai code source des sites** n'est
  pas encore dans le dépôt (déploiements en CLI, non Git) → **Bruno doit pousser** chaque site
  dans `navlys-beta-` (monorepo) via GitHub Desktop, sinon risque ERR-006 (écraser la voix/pages
  live avec la v2). Optionnel ensuite : relier Vercel↔GitHub par projet (auto-deploy au push).
- 🔴 **Aucune action sensible déclenchée** : zéro déploiement, zéro écriture base, zéro dépense.
  Tout en lecture seule + docs. Premier déploiement prod attendra le code source + contrôle gardien.

## Session 2026-06-28 — MIGRATION ancien PC → nouveau PC + auto-sync core

- 🎯 **Demande Bruno** (sur l'ancien PC) : *« récupère tout pour ne plus avoir à utiliser
  l'ancien ordinateur ; je veux tout sur le nouveau »* puis précision : *« ne plus rien mettre
  à jour depuis l'ancien, tout depuis le neuf, et aussi en automatique sur le core NAVLYS Hetzner. »*
- 📄 **Livrable principal — `docs/MIGRATION-ANCIEN-PC.md`** (guide unique, 7 étapes, n'en
  duplique aucune autre : il enchaîne `SAUVEGARDE-CODE-VERCEL.md`, `ACCES-SERVEUR.md`,
  `SECRETS-ET-CLES.md`, `PROCEDURE-VERCEL-GITHUB.md`). Inventaire ancien PC → code vers GitHub →
  médias vers cloud → secrets vers coffre → mise en route neuf → **automatisation** →
  vérification finale avant abandon.
- ⚙️ **Automatisation (le cœur de la demande)** : GitHub = source unique. Le **neuf pousse**,
  les **sites Vercel** se redéploient au push, et le **core Hetzner tire tout seul** via cron.
  - 🆕 **`scripts/sync-core.sh`** : pull auto GitHub→core, **non destructif** (s'arrête si modifs
    locales sur le core au lieu d'écraser ; `FORCE=1` pour forcer, `POST_HOOK` pour redémarrer un
    service). Installation cron documentée (`*/5 * * * *`). Syntaxe vérifiée (`bash -n`) OK.
- ⚠️ **Honnêteté technique** : Claude (cloud isolé) **n'a aucun accès** au disque de l'ancien PC
  ni au serveur Hetzner → ce sont des **procédures que Bruno exécute** (guidé). Rien de sensible
  déclenché : zéro accès, zéro déploiement, zéro secret écrit dans Git.
- 🔴 **Point ouvert rappelé** : le « core Hetzner » est **possiblement legacy** → vérifier qu'il
  doit rester actif **avant** de brancher le cron (sinon seule l'auto-deploy Vercel suffit).
- 🌿 Branche : `claude/migrate-old-computer-data-q7im6j`. PR brouillon à ouvrir.

## Session 2026-06-25 — ARBITRAGES BRUNO + exécution

### ✅ Décisions tranchées par Bruno (2026-06-25)
- 🎯 **Slogan figé** : **« Ma méthode, ton argent, ton rythme. »** (tutoiement). → appliqué `CLAUDE.md` §1.
- 💶 **Prix** : **reporté** (ne rien figer ; on en reparle).
- 🖥️ **Hetzner** : **à VÉRIFIER d'abord** (que contient-il encore ? facturé ?) avant de garder/arrêter.
  ⚠️ Indice : la mémoire indique des clés `ELEVENLABS_KEY` + backend voix possibles sur Hetzner
  (`/root/navlys/config/.env`) → ne PAS arrêter avant vérification.
- ⚙️ **« Tout dans ton ordre »** : Claude exécute les chantiers dans l'ordre qu'il juge, sans
  action publique/payante sans feu vert.

### 🛠️ Exécution en cours (Claude)
- ✅ **Charte appliquée** : **106 couleurs `#5fe0ff → #7DD3FC`** corrigées sur **12 fichiers**
  de `live-source/` (source déployable). 0 « Jérusalem » dans cette source (à traiter dans
  `launch-offer.js`/navbio quand cette source sera là).
- ⏭️ Suite : FAQ unifiée + G1 · rappel procédure Vercel↔GitHub · checklist vérif Hetzner.

### 🔴 Actions qui restent à Bruno
- Régénérer le **token Vercel** (exposé). · Trancher l'**entité** (FR/IL/[entité — hors dépôt] LTD). · **Vérifier Hetzner**.
- Légal avant LIVE : avocat NTIC, DPA ElevenLabs/HeyGen, AIPD (budgets = Bruno).

---

## Session 2026-06-25 — RENFORCEMENT global d'après le « cerveau » récupéré (recup-docs)

### 🟢 ÉTAT RÉEL du projet (corrigé d'après ~270 docs récupérés + `docs/SYNTHESE-NAVLYS.md`)
- **NAVLYS est LANCÉ, en phase BETA.** Le gate a été ouvert (docs : **31 mai / 1ᵉʳ juin 2026**).
  Source : `recup-docs/onedrive/_MASTER_NAVLYS_NOW.md` (« gate passé le 31 mai ✓, phase BETA en cours »).
- **Stack RÉELLE = Vercel + Supabase + Resend + Sentry + ElevenLabs + Cloudflare R2 + Claude (+ Stripe à venir).**
  Le **« core central Hetzner » semble PÉRIMÉ** (absent des docs récents) → à confirmer Bruno. (cf. CLAUDE.md §1.)
- **Charte couleur confirmée `#7DD3FC`** (`recup-docs/onedrive/_AUDIT_CHARTE_COULEURS.md`).
- **8 règles gravées** intégrées dans `docs/GOUVERNANCE.md` §0.
- **Renforcement par domaine** livré dans `docs/RENFORCEMENT/` (01→07).

### ⚖️ LES 9 DÉCISIONS EN ATTENTE (section 10 de la synthèse — à trancher par Bruno)
1. 🔴 **Régénérer le token Vercel** (partagé en clair → exposé). Action sensible = Bruno.
2. **Entité juridique** : FR auto-entrepreneur vs société IL (Mizrahi) / [entité — hors dépôt] LTD → impacte
   Stripe, factures, contrats. (Avocat NTIC recommandé.)
3. **Clarifier le « core Hetzner »** : legacy/abandonné ? vs stack Vercel+Supabase.
4. **Figer le SLOGAN** (« Ma méthode, Votre/Ton argent, Votre/Ton tempo/rythme/contrôle ») +
   le **prix BETA** : 39 € early-bird verrouillé vs 49 €/mois vs 490 €/an (vs 39 € « à vie » côté mémoire).
5. **Date de lancement effective** : countdown live = 1ᵉʳ juillet ; docs = 31 mai / 1ᵉʳ juin ;
   cible interne « 15 juin BETA stable » → **quel cap public unique ?**
6. **Dépersonnalisation vs scripts** où Bruno apparaît en narrateur (« voix de Bruno ») → arbitrer
   la frontière public (NAVLYS deperso) / persona narratif toléré-avec-disclaimer.
7. **Charte couleur** : `#7DD3FC` confirmé → corriger tout `#5fe0ff` résiduel.
8. **Valider** prospection influenceurs / VIP (aucun JCVD trouvé dans les docs récupérés ; à confirmer).
9. **Relier Vercel ↔ GitHub** (procédure prête `docs/PROCEDURE-VERCEL-GITHUB.md`) pour déployer par push.

> ➕ Décisions complémentaires remontées par l'exploration (voir `docs/RENFORCEMENT/`) :
> domaine NAVBIO (navbio.com ?), statut produit « LÉGENDE » (R&D), DPA ElevenLabs/HeyGen avant LIVE,
> AIPD biométrie avant droit-à-l'oubli, doublons Vercel à arbitrer, nommage « NOVA » résiduel vs NAVLYS.

- 🔴 **Aucune action sensible déclenchée** : zéro déploiement, zéro publication, zéro dépense.
  Travail 100 % en branche `claude/navlys-project-briefing-qi2w9j`. Validation gardien faite (voir RENFORCEMENT).

## Session 2026-06-24 — DÉCISION : relier les sites LIVE Vercel ↔ GitHub (Phase 0 « code sous Git »)

- 🎯 **Décision Bruno** : on relie les sites live Vercel à GitHub (sert aussi l'objectif
  Phase 0 « code sous Git »). Contrainte technique : l'intégration GitHub est limitée au seul
  dépôt `NAVLYS-BETA-` (création d'autres repos = 403, PR #12) → **approche MONOREPO** (un
  sous-dossier par projet via « Root Directory »).
- 📄 **Livrable** : **`docs/PROCEDURE-VERCEL-GITHUB.md`** (procédure sûre pas-à-pas, ordre
  obligatoire 1→5, table des 6 projets/domaines, encadré « piège critique »).
- ⛔ **Piège central gravé** : `sites/<projet>/` = refonte v2 **incomplète** (souvent 1 page) ;
  le LIVE a plus de pages + des assets moteur dont **`navlys-alive.js` = la voix** (jamais
  capturée). Relier un projet à un dossier v2 puis pousser ferait **écraser la voix + les
  pages live**. → **Étape n°1 obligatoire : capturer la vraie source live** de chaque projet
  dans `live-source/<projet>/` AVANT tout lien Git.
- 🧩 **Prochaine étape concrète** : capturer la source live (méthode A : `vercel pull` /
  dernier déploiement, depuis l'ancien PC) → versionner sous `live-source/` → décision Bruno
  garder-live/v2 par projet → relier dans Vercel → **Preview comparée au live** → promotion
  prod **seulement sur feu vert de Bruno**.
- 📓 Maj `docs/PHASE-0-SUIVI.md` (colonne « Source LIVE capturée », rappel monorepo + piège).
- 🔴 **Aucune action sensible déclenchée** : zéro déploiement, zéro promotion, zéro dépense.
  Le lien Vercel↔Git lui-même se fait côté **Bruno** (dashboard Vercel) ; Claude n'a pas accès.

## Session 2026-06-24 — recherche de la DÉMO VOIX (clone vocal) : localisation

- 🎯 **Objectif Bruno** : retrouver la démo « voix / clone vocal » (ElevenLabs + fal.ai +
  HeyGen) qu'il dit avoir déjà construite « dans un des sites ».
- 🔎 **Constat (recherche exhaustive du dépôt par l'orchestrateur)** : **RIEN dans
  `NAVLYS-BETA-`** — pas d'ElevenLabs/fal.ai/HeyGen, pas de capture micro
  (`getUserMedia`/`MediaRecorder`), pas de TTS, pas d'appel API ni de clé. Seule trace audio =
  un **MP3 statique pré-enregistré** (`<audio src="/media/bruno.mp3">` dans
  `sites/brunopartouche.com/index.html`) → ce **n'est pas** la démo voix.
- 🧠 **Pourquoi c'est normal → ERR-006** : ce dépôt = refonte **v2 statique** + mémoire ; les
  sites **LIVE** sont sur **Vercel non reliés à GitHub**. Le code des fonctionnalités live
  (voix…) n'est **pas** ici. Clés `ELEVENLABS_KEY`… sur Hetzner (`/root/navlys/config/.env`,
  Bruno). NB : `docs/PASSATION-HERMES.md` §9 (l.58) note la connexion ElevenLabs **« non faite »**.
- 🧭 **Plan de localisation — 3 hypothèses (à vérifier dans l'ordre, par Bruno)** :
  1. **🟢 Vercel LIVE (le + probable)** — la démo est dans un déploiement Vercel.
     *Comment* : Bruno ouvre chaque site live (navlys.com, brunopartouche.com, navbiolife.com,
     navlys.io + teasers) → cherche le bouton/page « voix / parler / clone ». Si trouvé :
     DevTools → **Network** (repérer un appel `elevenlabs`/`fal.run`/`heygen`) + **Sources**
     (chercher `getUserMedia`, `MediaRecorder`, `xi-api-key`). Côté code source : Vercel →
     projet → onglet Source / `vercel pull` du dossier depuis l'ancien PC. ⚠️ V7 (cf. ci-dessous) :
     toute clé `sk-`/`xi-api-key`/`Bearer` visible en front = **clé exposée à révoquer**.
  2. **🟠 Core Hetzner** — la démo (ou son backend d'appel API) tourne sur le serveur.
     *Comment* : Bruno regarde `/root/navlys/` (≈9 dossiers, cf. diagnostic 2026-06-22) + le
     `.env` (présence/usage réel de `ELEVENLABS_KEY`). Diagnostic note **0 conteneur Docker
     actif** → si backend voix, il n'est probablement **pas en cours d'exécution**. C'est
     l'**action serveur = Bruno** (Claude n'a aucun accès Hetzner).
  3. **🔵 Autre dépôt GitHub** — code dans **NOVA-HUB**, **Ai-Suite-PRO**, **gdp-dashboard**
     (repos cités dans `docs/PASSATION-HERMES.md`) plutôt que dans les sites.
     *Comment* : Bruno donne accès / Claude grep `eleven|fal\.run|heygen|getUserMedia` dans ces
     repos. À faire dès qu'un accès est fourni.
- 🔴 **En attente Bruno** : (a) l'**URL** de la page démo voix si elle est live ; (b) lequel
  des 3 fronts ouvrir en premier (recommandé : **Vercel live**) ; (c) accès aux autres repos.
- 📓 **Mémoire** : leçon gravée **ERR-006** (ne pas confondre `NAVLYS-BETA-` v2 avec les sites
  LIVE Vercel non versionnés). Aucune action sensible — zéro débit, zéro déploiement, zéro
  contenu public (règle financière + feux verts respectés).

## Session 2026-06-24 — revue conformité VOIX (V6) + auto-check sécurité (V7)

- 🎙️ **Test Voix repris** (« ultrareview ») : je ne peux pas lancer le check live faute de
  l'**URL** de la démo (non fournie) → je n'invente pas. Enrichi `docs/TESTS-FONCTIONNELS.md` §1 :
  - 🔬 **V6 — batterie de conformité** : 8 questions pièges (rendement, reco nominative, conseil
    perso, fiscal, vocab interdit, narratif Israël/Jérusalem, public 18+, FOMO) avec, pour chacune,
    la **ligne rouge interdite** vs la **réponse conforme attendue**. + règle disclaimer audio/écran.
  - 🔐 **V7 — auto-check sécurité** que **Bruno fait seul** (DevTools → Network/Sources, recherche
    de `sk-`, `xi-api-key`, `Bearer`…) : clé exposée = révoquer + passer l'appel côté serveur.
  - ✏️ Correction : V7 réattribué à **Bruno** (Hermès retiré).
- ⏳ **En attente Bruno** : **l'URL de la démo voix** + outil de clone (ElevenLabs ?) + moteur de
  transcription. Dès réception → je lance le V7 (fetch du source + grep des clés) à sa place.

## Session 2026-06-23 — décision Piste B + audit sites v2 + tests

- 🎨 **Décision Bruno : conformité = Piste B (refonte Design v2)**. Les sites `sites/` (v2)
  remplacent l'existant ; les patchs `corrections-pretes/` (Piste A : C-01→C-05, P-01→P-05,
  ERR-005) deviennent une **référence archivée** (plus la voie de déploiement).
- ✅ **Audit Claude des sites v2** (`sites/`) : 0 terme interdit, 0 promesse, disclaimer sur
  les 10 pages, date 1ᵉʳ juillet cohérente, **aucun lien 404** (cgu/privacy centralisés sur
  navlys.com ; pas de bug /partenaires en v2).
- 🟠 **2 points v2 à traiter** : `navlys-app/finance.html` ✅ **Ice Blue aligné `#7DD3FC`**
  (2026-06-23) — reste à décider le **rouge/vin** (`#ff2a1f`/`#7a1f2b`, gardé car possiblement
  fonctionnel = scénarios de perte) ; **mentions d'éditeur** des pages légales v2 à compléter (legal).
- 🧪 **Tests fonctionnels (choix Bruno)** : FAQ **absente du dépôt** → non testable ici ;
  Voix / NavLex / Partenaires = **accès live requis (Bruno)**, Hermès retiré → appui serveur = Bruno.
  Plan + résultats partiels dans `docs/TESTS-FONCTIONNELS.md`.
- ⏳ **En attente Bruno** : où vit la FAQ + infos d'accès pour tester Voix/NavLex/Partenaires.

## Session 2026-06-23 — QA complémentaire : lien cassé brunopartouche

- 🔗 **Trouvaille** : `brunopartouche.com/partenaires` renvoie **404**, alors que la home
  a un bouton « Voir les 19 partenaires → » qui pointe dessus (lien cassé).
  → Correctif **P-05** ajouté (recommandé : rediriger vers `navlys.io/#partenariats`,
  où les 19 partenaires existent déjà ; alternative : créer la page). Décision Bruno.
- ⏳ Reste : décider l'option P-05, puis intégrer au déploiement (`MEMO-DEPLOIEMENT.md`).

## Session 2026-06-22 (f) — Phase 0 : suivi + sauvegarde assets + repos

- 📋 **`docs/PHASE-0-SUIVI.md`** (nouveau) : tableau de suivi Phase 0 (snapshot Hetzner,
  backup.sh, code de chaque site sous GitHub, liaison Vercel↔Git). Le « comment » reste
  dans `SAUVEGARDE.md` / `SAUVEGARDE-CODE-VERCEL.md` ; ce fichier = le « où on en est ».
- 💾 **`sauvegarde-sites/_assets-moteur/`** (nouveau) : sauvegarde des assets moteur JS/CSS
  (cockpit.js, cockpit-mini.js, launch-offer.js, hero-bg-slideshow.js, navlys-family-theme-v2.css)
  — capturés en lecture seule (fetch live 2026-06-22). Filet **partiel** : navlys-app (403),
  images/vidéos et home brunopartouche (tronquée) NON capturés → à faire depuis l'ancien PC.
- 🔴 **Nouvelle non-conformité trouvée → ERR-005** : `launch-offer.js` contient encore
  « heure de Jérusalem » + escalator ancré au 1ᵉʳ juin. Correctif **P-04** ajouté au patch.
  Garde-fou : grep des termes interdits sur **HTML + JS + CSS** (pas que le HTML).
- 🐙 **Repos GitHub privés** : (voir statut dans le tableau / la conversation).
- ⏳ Le cœur de Phase 0 (snapshot, backup.sh, export source) reste à faire sur l'ancien PC.

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
  Vercel authentifié. **0 terme interdit** (CIF/ORIAS/Ashkelon/Israël/Jérusalem/[entité — hors dépôt]),
  0 « NOVA » résiduel, disclaimers présents. Écarts relevés : accent réel `#5fe0ff` (≠
  charte `#7DD3FC`), pourpre `#7a1f2b` présent, pas d'OG/schema.org, **/finance sans accents**.
- ✅ **`/finance` corrigé** → `sites/navlys-app/finance.html` (début de rapatriement Git du
  code live). Passe : tous les accents restaurés (corps **+ meta description**), apostrophes
  typographiques dans le JS, `0 €`. Disclaimer footer vérifié présent. 0 terme interdit.
  Aucun NOVA/CIF/[entité — hors dépôt] à retirer (déjà absents). **À redéployer côté Vercel par Bruno.**
- 🔐 **Alerte sécurité** : un mot de passe root + IP serveur ont été collés en clair dans le
  chat → **à changer immédiatement** (compromis), passer SSH en clés uniquement. Jamais écrit
  dans le dépôt.
- 🧭 **Décisions Bruno (session)** : (1) corriger les **pages live** ; (2) retrait Israël/
  Ashkelon/[entité — hors dépôt] **du contenu public uniquement** (backend paiements réel non touché) ;
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
