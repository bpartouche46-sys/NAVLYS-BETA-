# 🗺️ CARTE DES SITES NAVLYS (source : Vercel, relevé du 2026-06-19)

> Données réelles tirées du compte Vercel, équipe **NAVLYS**.
> ⚠️ Constat important : **aucun de ces projets n'apparaît relié à un dépôt GitHub.**
> Les déploiements sont faits **en direct** (CLI/outil Vercel, utilisateur `claudenavlys`).
> Le code source n'est donc PAS versionné dans GitHub → fragilité à corriger.

- **Équipe Vercel** : `NAVLYS` (slug `navlys`, id `team_nBtY5FOQMPIT4J8Bmf7wvBSC`)
- **Compte** : bpartouche46@gmail.com — utilisateur de déploiement : `claudenavlys`
- **Runtime** : Node.js 24.x — **Framework déclaré : aucun** (à clarifier projet par projet)

## Les 6 projets

| Projet | Domaine(s) principal(aux) | Statut | Dépôt GitHub | Dernier déploiement |
|--------|---------------------------|--------|--------------|---------------------|
| **navlys-app** | **navlys.com** / www, navlys.app, navlys.net, navlys.org | 🟢 Actif (production prête) | ❌ non relié | ~2026-06-17 (récent, très actif) |
| **brunopartouche** | **brunopartouche.com** / www | 🟢 Actif | ❌ non relié | ~2026 |
| **navbio** | **navbiolife.com**, **navbiolive.com** / www | 🟢 Actif | ❌ non relié | ~2026 |
| **navlys-io** | **navlys.io** / www | 🟠 marqué « non-live » (à vérifier) | ❌ non relié | ~2026 |
| **navlys-teaser** | navlys-teaser.vercel.app (pas de domaine perso) | 🟢 Actif | ❌ non relié | ~2026 |
| **brunopartouche-teaser** | brunopartouche-teaser.vercel.app | 🟠 marqué « non-live » (à vérifier) | ❌ non relié | ~2026 |

## Identifiants techniques (pour retrouver vite — ce ne sont PAS des secrets)

| Projet | Project ID |
|--------|-----------|
| navlys-app | `prj_YFENrKz8KPWE4HhiOodbB2sF8TUB` |
| navlys-teaser | `prj_L2lA7R2OWweqSBVMj9Y5PbJ48nL1` |
| brunopartouche-teaser | `prj_7GXTNAu1caUMbzROa79Ny3lynZAh` |
| navlys-io | `prj_WB5CZy1Wo741YvuE5ATYjDrhpTs4` |
| brunopartouche | `prj_8CZN1KRrcFvHVNZ9TSX1bs04BhTo` |
| navbio | `prj_pZHKnir4mbq0hiFYo4kogzArQFoq` |

## ❗ Ce que ça implique pour la stratégie
1. **Le « core central » Hetzner et les sites Vercel sont deux mondes séparés.** À clarifier :
   qu'est-ce qui tourne vraiment où ? (Les sites publics semblent sur **Vercel**, pas Hetzner.)
2. **Risque n°1 : pas de sauvegarde du code dans Git.** Si un projet Vercel est supprimé ou
   écrasé, le code peut être perdu. → Priorité : **rapatrier le code de chaque projet dans GitHub**.
3. Objectif utilisateur « tout reconnecter en API » : il faudra décider l'architecture cible
   (qui appelle qui : navlys-app ↔ core Hetzner ↔ les autres sites).

## À vérifier / compléter (prochaine session)
- [ ] Confirmer le statut « non-live » de `navlys-io` et `brunopartouche-teaser`.
- [ ] Pour chaque projet : quel est le code source ? (le télécharger depuis Vercel et le mettre dans Git)
- [ ] Cartographier les variables d'environnement (clés API) de chaque projet — SANS les committer.
- [ ] Clarifier le rôle réel du serveur Hetzner par rapport à ces sites.
