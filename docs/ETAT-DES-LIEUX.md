# ÉTAT DES LIEUX — où on en est

> Mis à jour à la fin de chaque session pour que la suivante reprenne sans tout relire.

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
2. **Entité juridique** : FR auto-entrepreneur vs société IL (Mizrahi) / DFENSER LTD → impacte
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
  2) **Claude + Hermès orchestrateurs en surveillance mutuelle** (gardien arbitre),
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
