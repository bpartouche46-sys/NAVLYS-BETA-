# corrections-pretes/ — fichiers corrigés, PRÊTS à déployer (NON déployés)

> ⚠️ **Rien ici n'est en production.** Ce dossier contient les versions corrigées
> des pages live, à déployer **uniquement après feu vert prod explicite de Bruno**.
> Conforme à `docs/CORRECTIONS-CONFORMITE.md` (corrections C-01→C-04 validées le
> 2026-06-19, **confirmées toujours en ligne le 2026-06-22**).

## Pourquoi ce dossier existe

Le code source complet des sites n'est pas (encore) dans Git : il vit sur Vercel
et l'ancien PC (voir `docs/CARTE-SITES.md`, ERR-002/004). En attendant un rapatriement
complet (Phase 0), on prépare ici les **fichiers exacts à redéployer**, reconstruits
à partir du HTML live récupéré le 2026-06-22 via l'outil de fetch Vercel.

## Contenu

| Fichier | Site / route | Corrections appliquées |
|---------|--------------|------------------------|
| `brunopartouche.com/bio.html` | brunopartouche.com **/bio** | **C-03** (retrait promesse « +8 à 12% ») + **C-04** (ajout disclaimer conformité) |
| `navbiolife.com/cgu.html` | navbiolife.com **/cgu** | Page créée (corrige le **404**) |
| `navbiolife.com/privacy.html` | navbiolife.com **/privacy** | Page créée (corrige le **404**) |
| `navbiolife.com/index.html` | navbiolife.com **/** | **C-01** (meta sans « Jérusalem ») + **C-02** (commentaire JS) + **compte à rebours** recalé sur le **1ᵉʳ juillet 2026, 00:00 (heure de Paris)** = `2026-06-30T22:00:00Z` |
| `PATCH-comptes-a-rebours.md` | navlys-teaser, brunopartouche.com (home) | Patch (avant/après) pour recaler les **comptes à rebours périmés** sur le 1ᵉʳ juillet + aligner l'Ice Blue du teaser |
| `MEMO-DEPLOIEMENT.md` | **tous** | Procédure de déploiement pas-à-pas (ordre, diff, mentions éditeur, contrôle conformité, vérif post-déploiement) — à suivre après feu vert prod |

## ⚠️ Points à trancher / compléter AVANT déploiement

1. **Date d'ouverture** : ✅ confirmée = **1ᵉʳ juillet 2026, 00:00 (heure de Paris)**.
   Définie une seule fois dans `index.html` (`const TARGET = Date.parse('2026-06-30T22:00:00Z')`)
   et reflétée dans les textes (« Ouverture 1ᵉʳ juillet 2026 », offre « après le 1ᵉʳ juillet »).
   ⚠️ Les autres sites/teasers (navlys-teaser, brunopartouche-teaser, navlys.io) ont
   probablement encore des comptes à rebours périmés — à traiter séparément.
2. **Mentions d'éditeur** dans `/cgu` et `/privacy` : placeholders
   `[ÉDITEUR — à compléter]`, `[EMAIL DE CONTACT]`, `[HÉBERGEUR]`. La loi française
   impose d'identifier l'éditeur ; ⚠️ l'entité juridique confidentielle ne doit PAS
   être committée ici (dépôt public) → à renseigner au moment du déploiement, hors Git.
   Faire relire les textes juridiques par un professionnel.
3. **Fidélité** : `bio.html` et `index.html` sont reconstruits depuis le live.
   Avant déploiement, **diff contre la version en prod** pour confirmer qu'aucun bloc
   n'a bougé (seules les corrections listées doivent apparaître).

## Comment déployer (rappel, après feu vert)

Ces sites sont déployés en CLI Vercel (`source: cli`) depuis le dossier source local.
Déposer le fichier corrigé dans le dossier du projet correspondant, puis redéployer
ce projet. Vérifier ensuite en prod (meta, disclaimer, pages /cgu et /privacy, compteur).
