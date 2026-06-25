# JOURNAL DES ERREURS — à ne JAMAIS reproduire

> Chaque erreur rencontrée est enregistrée ici **immédiatement**, avec sa correction.
> Avant toute action, Claude relit ce journal. Une erreur listée ici qui se
> reproduit = échec grave de la routine.

## Comment remplir une entrée

Copier ce modèle pour chaque nouvelle erreur :

```
### ERR-XXX — Titre court de l'erreur
- **Date** : AAAA-MM-JJ
- **Contexte** : ce qu'on essayait de faire
- **Symptôme** : ce qui a mal tourné (message d'erreur, comportement)
- **Cause** : pourquoi c'est arrivé
- **Correction appliquée** : ce qui a réglé le problème
- **Garde-fou** : la règle pour que ça ne se reproduise jamais
  (et où elle est inscrite : CLAUDE.md / checklist / test / hook…)
```

---

## Erreurs enregistrées

### ERR-001 — Travail perdu car non enregistré (saturation mémoire)
- **Date** : 2026-06-19
- **Contexte** : sessions précédentes avec Claude sur les sites NAVLYS.
- **Symptôme** : la mémoire « sature », Claude oublie le contexte et refait les
  mêmes erreurs d'une session à l'autre.
- **Cause** : les informations et décisions restaient dans la conversation au lieu
  d'être écrites dans des fichiers du dépôt. Dépôt resté vide.
- **Correction appliquée** : mise en place de ce kit de garde-fous (CLAUDE.md +
  journal + checklist + routine + agent gardien), tout commité dans le dépôt.
- **Garde-fou** : RÈGLE D'OR du `CLAUDE.md` — tout ce qui compte est écrit dans un
  fichier ; `docs/ETAT-DES-LIEUX.md` mis à jour à chaque fin de session.

### ERR-002 — Sites déployés sans Git : aucune sauvegarde du code
- **Date** : 2026-06-19
- **Contexte** : analyse des 6 projets Vercel de NAVLYS.
- **Symptôme** : aucun projet n'est relié à GitHub ; les déploiements sont `source: cli`
  (envoyés en direct depuis un ordinateur). Le code source n'existe nulle part en sauvegarde.
- **Cause** : déploiements faits à la main depuis l'ancien PC sans versionnage Git.
- **Correction appliquée** : Phase 0 du plan = rapatrier le code de chaque site (depuis
  l'ancien PC) dans GitHub. Procédure : `docs/SAUVEGARDE-CODE-VERCEL.md`.
- **Garde-fou** : à l'avenir, **chaque site doit être relié à un dépôt GitHub** et déployé
  depuis Git (pas en CLI manuelle). Inscrit dans `docs/PLAN-DENSEMBLE.md` (Phases 0 et 3).

### ERR-003 — Mentions interdites / promesses en clair sur les sites publics
- **Date** : 2026-06-19
- **Contexte** : QA pré-lancement des sites NAVLYS en production (Vercel).
- **Symptôme** : « Jérusalem » dans la meta-description publique de navbiolife.com ;
  « +8 à 12% par an » (promesse de rendement) sur brunopartouche.com/bio ;
  pages /cgu et /privacy en 404 alors qu'elles sont liées.
- **Cause** : contenu publié sans repasser la checklist conformité (vocabulaire interdit,
  zéro promesse, narratif méditerranéen sans Israël/Jérusalem, disclaimer partout).
- **Correction appliquée** : corrections C-01→C-04 consignées et validées dans
  `docs/CORRECTIONS-CONFORMITE.md` (à appliquer puis redéployer après feu vert).
- **Garde-fou** : avant TOUT déploiement, grep des termes interdits + « Israël/Ashkelon/Jérusalem »
  + vérifier disclaimer bandeau+pied de page et absence de chiffre de rendement.

### ERR-004 — Source des sites absente de Git (déploiement Vercel CLI)
- **Date** : 2026-06-19
- **Contexte** : recherche du code des sites pour les auditer/modifier.
- **Symptôme** : aucun dépôt GitHub relié ; dépôt `NAVLYS-BETA-` ne contient que de la doc.
- **Cause** : les 6 sites ont été déployés via `vercel` CLI depuis un dossier local non versionné.
- **Correction appliquée** : cartographie Vercel complète + récupération du HTML live via l'outil de fetch Vercel.
- **Garde-fou** : rapatrier le dossier source sous Git (branche dédiée) AVANT toute nouvelle modif ;
  ne jamais re-déployer depuis un dossier local non commité.

### ERR-005 — « Jérusalem » résiduel + date périmée dans `launch-offer.js`
- **Date** : 2026-06-22
- **Contexte** : Phase 0, capture de sauvegarde des assets moteur (fetch lecture seule).
- **Symptôme** : `launch-offer.js` (navbiolife) contient encore « minuit Asia/Jerusalem » /
  « heure de Jérusalem » (texte servi au public en état *before*) et un escalator d'offre
  **ancré au 1ᵉʳ juin 2026** (périmé). Non détecté par la QA initiale (qui n'avait vu que
  le commentaire de l'`index.html`, corrigé en C-02).
- **Cause** : la QA conformité (ERR-003) n'avait pas inspecté les **fichiers JS séparés**
  chargés par les pages — seulement le HTML.
- **Correction appliquée** : correctif **P-04** ajouté à `corrections-pretes/PATCH-comptes-a-rebours.md`
  (retrait « Jérusalem » + réancrage 1ᵉʳ juillet). Fichier brut sauvegardé dans `sauvegarde-sites/`.
  NON déployé (attente feu vert prod).
- **Garde-fou** : avant tout déploiement, **grepper les termes interdits dans TOUS les
  fichiers servis** (HTML **+ JS + CSS**), pas seulement le HTML. Inscrit dans
  `corrections-pretes/MEMO-DEPLOIEMENT.md` §5.

### ERR-006 — Confondre le dépôt GitHub `NAVLYS-BETA-` (refonte v2) avec les sites LIVE Vercel (non versionnés)
- **Date** : 2026-06-24
- **Contexte** : Bruno demande de retrouver une démo « voix / clone vocal »
  (ElevenLabs + fal.ai + HeyGen) qu'il dit avoir déjà construite « dans un des sites ».
- **Symptôme** : recherche exhaustive du dépôt `NAVLYS-BETA-` → **AUCUN** code voix/IA
  (ni ElevenLabs, fal.ai, HeyGen, ni capture micro `getUserMedia`/`MediaRecorder`, ni TTS,
  ni appel API, ni clé). Seule trace audio = un lecteur **MP3 statique pré-enregistré**
  (`<audio src="/media/bruno.mp3">` dans `sites/brunopartouche.com/index.html`). Risque :
  conclure « la démo n'existe pas » alors qu'elle vit simplement **ailleurs**.
- **Cause** : ce dépôt est la **refonte v2 statique** (maquettes/docs). Les **sites LIVE**
  sont déployés sur **Vercel sans être reliés à GitHub** (cf. ERR-002 / ERR-004,
  `CLAUDE.md` : « Aucun projet n'est relié à GitHub »). Le code des **fonctionnalités live**
  (voix, NavLex, etc.) n'est **pas** dans `NAVLYS-BETA-`. Les clés (`ELEVENLABS_KEY`…) sont
  sur le serveur Hetzner dans `/root/navlys/config/.env` (Bruno, hors dépôt — cf.
  `docs/PASSATION-HERMES.md` §8), et la connexion ElevenLabs y est notée « non faite » (§9 l.58).
- **Correction appliquée** : ne plus assimiler « absent du dépôt » à « inexistant ». Toute
  recherche de fonctionnalité live se mène sur **3 fronts** : (1) **déploiement Vercel** live,
  (2) **core Hetzner** (`/root/navlys/`), (3) **autres dépôts** (NOVA-HUB, Ai-Suite-PRO,
  gdp-dashboard… cf. `docs/PASSATION-HERMES.md`). Plan de localisation consigné dans
  `docs/ETAT-DES-LIEUX.md` (session 2026-06-24). Aucune action sensible déclenchée.
- **Garde-fou** : avant d'affirmer qu'un code « n'existe pas », vérifier les **3 sources hors
  GitHub** (Vercel live / Hetzner / autres repos). Rappel permanent : `NAVLYS-BETA-` = mémoire +
  refonte v2 statique, **pas** la prod. Inscrit ici (ERR-006) et relié à ERR-002/ERR-004.

### ERR-007 — Chiffre business/financier cité sans source exacte ni mention « non-promesse »
- **Date** : 2026-06-25
- **Contexte** : renforcement (`docs/RENFORCEMENT/`) à partir du « cerveau » récupéré.
  Un cash-in « ~770 k€ » avait été écrit sans correspondance en source, et des projections
  (816 k€ / 717 k€) attribuées au mauvais fichier.
- **Symptôme** : risque double — (a) chiffre inventé/mal sourcé, (b) un chiffre de rendement/CA
  présenté sans garde-fou peut ressembler à une **promesse** (interdit conformité : zéro promesse).
- **Cause** : reprise d'un chiffre « de tête » sans revérifier le fichier source exact.
- **Correction appliquée** : chiffres remplacés par les valeurs sourcées (`_PARTENAIRES_LIENS_AUDIT.md`),
  attribution corrigée, mention « projection NON garantie, à ne jamais publier comme promesse » ajoutée.
- **Garde-fou** : **tout chiffre business/financier** (CA, rendement, Sharpe, %, projection) doit
  (1) **citer le fichier source exact** et (2) porter la mention **« projection / donnée — pas une
  promesse »** s'il touche au public. Vérifier en source avant publication. Inscrit ici + rappelé en
  tête de `docs/RENFORCEMENT/04-calculs-finance.md`.

<!-- Ajouter les prochaines erreurs ci-dessous : ERR-008, … -->
