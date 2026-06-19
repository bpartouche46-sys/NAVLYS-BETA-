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

### ERR-002 — Mentions interdites / promesses en clair sur les sites publics
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

### ERR-003 — Source des sites absente de Git (déploiement Vercel CLI)
- **Date** : 2026-06-19
- **Contexte** : recherche du code des sites pour les auditer/modifier.
- **Symptôme** : aucun dépôt GitHub relié ; dépôt `NAVLYS-BETA-` ne contient que de la doc.
- **Cause** : les 6 sites ont été déployés via `vercel` CLI depuis un dossier local non versionné.
- **Correction appliquée** : cartographie Vercel complète + récupération du HTML live via l'outil de fetch Vercel.
- **Garde-fou** : rapatrier le dossier source sous Git (branche dédiée) AVANT toute nouvelle modif ;
  ne jamais re-déployer depuis un dossier local non commité.

<!-- Ajouter les prochaines erreurs ci-dessous : ERR-004, ERR-005, … -->
