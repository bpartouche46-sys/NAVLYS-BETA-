# CLAUDE.md — Mémoire permanente du projet NAVLYS

> Ce fichier est lu par Claude **au début de chaque session**.
> Il remplace la « mémoire » de la conversation : tout ce qui compte doit être
> écrit ici ou dans les fichiers de `docs/`, jamais gardé seulement « dans la tête ».
> **Objectif n°1 : ne jamais refaire deux fois la même erreur.**

---

## 0. RÈGLE D'OR (à appliquer à CHAQUE session)

Avant toute action, Claude DOIT :

1. **Lire** `docs/JOURNAL-ERREURS.md` (la liste des erreurs déjà commises).
2. **Lire** `docs/CHECKLIST-SECURITE.md` (les vérifications obligatoires).
3. **Vérifier** qu'aucune action prévue ne reproduit une erreur déjà listée.
4. À la **moindre erreur nouvelle**, l'ajouter immédiatement au journal AVANT de continuer.

Si une de ces étapes est sautée, le travail est considéré comme **non valide**.

---

## 1. À quoi sert ce projet

NAVLYS — gestion et modification de sites web.
*(À compléter : décrire ici précisément chaque site, son URL, sa techno, son hébergeur.)*

| Site | URL | Techno | Hébergeur | Statut |
|------|-----|--------|-----------|--------|
| _(à remplir)_ | | | | |

> ⚠️ Tant que ce tableau est vide, Claude ne peut PAS « voir vos sites » :
> il faut soit mettre le code des sites dans ce dépôt, soit indiquer ici où il se trouve.

---

## 2. Comment on travaille (règles de fond)

- **Une chose à la fois.** Pas de grosse tâche en un seul bloc → on découpe.
- **Tout est commité.** Aucun travail ne reste seulement dans la conversation.
- **Petits commits fréquents** avec un message clair (quoi + pourquoi).
- **On teste avant de pousser.** Si on ne peut pas tester, on le dit clairement.
- **Jamais sur la branche principale directement** sans accord explicite.
- **En cas de doute → on demande**, on n'invente pas.

---

## 3. Anti-saturation mémoire

- Les informations importantes vont dans des **fichiers**, pas dans la discussion.
- On préfère **plusieurs sessions courtes** à une seule session géante.
- Avant de finir une session : mettre à jour `docs/ETAT-DES-LIEUX.md`
  (« où on en est ») pour que la session suivante reprenne sans tout relire.

---

## 4. Le Gardien (agent de contrôle)

Un agent dédié, **« gardien »** (`.claude/agents/gardien.md`), peut être lancé à tout
moment pour : **sécuriser → contrôler → corriger → enregistrer la leçon**.
Commande rapide : `/controle` (voir `.claude/commands/controle.md`).

---

## 5. Fichiers de référence

| Fichier | Rôle |
|---------|------|
| `docs/JOURNAL-ERREURS.md` | Liste des erreurs passées — à ne JAMAIS reproduire |
| `docs/CHECKLIST-SECURITE.md` | Vérifications obligatoires avant/après chaque action |
| `docs/ROUTINE.md` | La routine pas-à-pas sécuriser/contrôler/corriger |
| `docs/ETAT-DES-LIEUX.md` | Où on en est (mis à jour à chaque fin de session) |
| `.claude/agents/gardien.md` | L'agent de contrôle |
| `.claude/commands/controle.md` | La commande `/controle` |
