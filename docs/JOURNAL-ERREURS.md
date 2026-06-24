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

<!-- Ajouter les prochaines erreurs ci-dessous : ERR-006, … -->

### ERR-005 — Hermès compromis (hack) → retiré du projet + révocation de tous ses accès
- **Date** : 2026-06-24
- **Contexte** : Hermès était l'« opérateur ops » (LLM via OpenRouter + accès SSH Hetzner)
  présenté comme orchestrateur de confiance en surveillance mutuelle avec Claude.
- **Symptôme** : Bruno signale qu'**Hermès a été supprimé** et constitue un **risque de
  sécurité majeur (hack)**. Il ne doit plus avoir **aucun** accès ni **aucune** présence
  dans le projet.
- **Cause** : un acteur tiers (agent externe via OpenRouter, avec accès serveur + potentiellement
  une clé API Anthropic pour appeler Claude) devenu non fiable / compromis. Trop d'accès
  concentrés sur un seul intervenant externe, sans révocation rapide possible.
- **Correction appliquée** :
  1. **Toutes les références à Hermès retirées** du dépôt (rôle d'orchestrateur de confiance
     supprimé partout : GOUVERNANCE, ARCHITECTURE, CORE, CHAINES, TESTS, SECRETS, agents…).
  2. **`docs/INSTRUCTIONS-HERMES.md` supprimé** (ordre de mission qui lui donnait la main).
  3. **`OPENROUTER_API_KEY` retiré** de `core/.env.example` (clé qui servait Hermès).
  4. **Checklist de révocation complète** créée pour Bruno : `docs/INCIDENT-HERMES.md`
     (révoquer/rotationner TOUS ses accès, **y compris la clé API Anthropic** qui lui
     permettait d'appeler Claude).
- **Garde-fou** :
  - 🔴 **Aucun intervenant externe ne cumule « cerveau + accès serveur + clé API Claude ».**
    Le moteur du core applique le **moindre privilège** (liste blanche d'outils, hooks
    PreToolUse, `bypassPermissions` interdit) — un futur opérateur sera **bridé par le code**,
    pas « de confiance par défaut ».
  - 🔑 **Toute clé/accès donné à un tiers doit être révocable en 1 geste** et **rotationné
    immédiatement** au moindre doute (cf. `docs/SECRETS-ET-CLES.md` §4 « fuite »).
  - 📄 Procédure de sortie d'un intervenant : `docs/INCIDENT-HERMES.md` (réutilisable).
