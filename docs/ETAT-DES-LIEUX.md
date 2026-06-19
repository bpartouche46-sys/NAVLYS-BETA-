# ÉTAT DES LIEUX — où on en est

> Mis à jour à la fin de chaque session pour que la suivante reprenne sans tout relire.

## Dernière mise à jour : 2026-06-19

### Ce qui est fait
- Dépôt NAVLYS-BETA- initialisé (il était entièrement vide).
- Mise en place du **kit de garde-fous anti-erreurs / anti-saturation mémoire** :
  - `CLAUDE.md` (mémoire permanente + règle d'or)
  - `docs/JOURNAL-ERREURS.md`
  - `docs/CHECKLIST-SECURITE.md`
  - `docs/ROUTINE.md`
  - `docs/ETAT-DES-LIEUX.md` (ce fichier)
  - Agent `.claude/agents/gardien.md` + commande `.claude/commands/controle.md`

### Ce qui n'est PAS encore fait / à décider
- ❓ **Aucun code de site n'est présent dans ce dépôt.** Il faut décider :
  - soit importer ici le code des sites NAVLYS,
  - soit indiquer dans `CLAUDE.md` (tableau §1) où se trouve chaque site
    (URL, techno, hébergeur) pour pouvoir les modifier.

### Prochaine étape recommandée
1. Remplir le tableau des sites dans `CLAUDE.md` (§1).
2. Importer / brancher le code du premier site à modifier.
3. Lancer `/controle` avant chaque modification.
