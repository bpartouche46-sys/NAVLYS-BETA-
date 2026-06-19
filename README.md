# NAVLYS — BETA

Dépôt de gestion et de modification des sites NAVLYS, **protégé par un kit de
garde-fous** qui empêche de refaire deux fois la même erreur et évite la
saturation de la mémoire de Claude.

## 🛡️ Les garde-fous en un coup d'œil

| Fichier | À quoi ça sert |
|---------|----------------|
| **`CLAUDE.md`** | Mémoire permanente lue à chaque session + règle d'or |
| **`docs/JOURNAL-ERREURS.md`** | Toutes les erreurs passées, à ne jamais reproduire |
| **`docs/CHECKLIST-SECURITE.md`** | Vérifications obligatoires avant/après chaque action |
| **`docs/ROUTINE.md`** | La routine Sécuriser → Contrôler → Corriger → Apprendre |
| **`docs/ETAT-DES-LIEUX.md`** | Où on en est (mis à jour à chaque fin de session) |
| **`.claude/agents/gardien.md`** | L'agent de contrôle qualité/sécurité |
| **`.claude/commands/controle.md`** | La commande `/controle` qui lance tout |

## ▶️ Comment l'utiliser (simple)

1. **Avant** de modifier un site, tapez : `/controle`
2. Travaillez par **petites étapes**, chacune enregistrée (commit).
3. Si une erreur survient, elle est **notée dans le journal** avec sa solution :
   elle ne pourra plus se reproduire.
4. **En fin de session**, l'état des lieux est mis à jour.

## ⚠️ Important

Aucun code de site n'est encore présent ici. Pour que Claude puisse « voir » et
modifier vos sites, il faut soit importer leur code dans ce dépôt, soit renseigner
le tableau des sites dans `CLAUDE.md` (§1). Voir `docs/ETAT-DES-LIEUX.md`.
