# CHECKLIST DE SÉCURITÉ — obligatoire avant/pendant/après chaque action

> But : sécuriser, contrôler, corriger. Aucune case sautée.

## ✅ AVANT de commencer (préparation)
- [ ] J'ai lu `docs/JOURNAL-ERREURS.md` — aucune action prévue n'y figure comme erreur.
- [ ] J'ai lu `docs/ETAT-DES-LIEUX.md` — je sais où on en est.
- [ ] La tâche est **découpée** en petites étapes claires.
- [ ] Je travaille sur une **branche dédiée**, pas sur la principale.
- [ ] J'ai une sauvegarde / un point de retour (`git status` propre, commit récent).

## 🛠️ PENDANT (réalisation)
- [ ] Une étape à la fois ; je commite après chaque étape qui marche.
- [ ] Message de commit clair : **quoi** + **pourquoi**.
- [ ] Je ne supprime/écrase rien sans avoir regardé ce que c'est d'abord.
- [ ] À la moindre erreur : je l'écris dans `JOURNAL-ERREURS.md` AVANT de continuer.
- [ ] Aucune clé, mot de passe ou secret écrit en clair dans le code.

## 🔍 APRÈS (contrôle)
- [ ] Ça a été **testé** (ou j'indique honnêtement que ça n'a pas pu l'être).
- [ ] `git status` vérifié : je sais exactement ce qui change.
- [ ] Le code poussé sur la branche dédiée.
- [ ] Une **Pull Request** existe (en brouillon) pour relire avant de fusionner.
- [ ] `docs/ETAT-DES-LIEUX.md` mis à jour.
- [ ] Si une erreur est survenue : elle est dans le journal avec son garde-fou.

## 🚫 Interdits (sources d'erreurs répétées)
- ❌ Pousser directement sur la branche principale sans relecture.
- ❌ Faire une énorme modification d'un seul coup.
- ❌ Garder des infos importantes uniquement dans la conversation.
- ❌ Inventer une réponse en cas de doute au lieu de demander.
- ❌ Mettre des secrets (mots de passe, clés API) dans le dépôt.
