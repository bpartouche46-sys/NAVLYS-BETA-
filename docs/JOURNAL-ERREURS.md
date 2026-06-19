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

<!-- Ajouter les prochaines erreurs ci-dessous : ERR-002, ERR-003, … -->
