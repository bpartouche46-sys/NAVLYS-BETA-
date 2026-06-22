# PHASE 0 — TABLEAU DE SUIVI (sécuriser avant de modifier)

> Objectif Phase 0 : **mettre l'existant en sécurité** (snapshot + sauvegardes + code sous Git)
> AVANT toute modification. Le *comment* est détaillé dans :
> `docs/SAUVEGARDE.md` (core Hetzner) et `docs/SAUVEGARDE-CODE-VERCEL.md` (code des sites).
> Ce fichier ne contient **que le SUIVI** (où on en est). À cocher au fur et à mesure.
>
> Légende : ⬜ à faire · 🟡 en cours · ✅ fait · ⛔ bloqué · — sans objet

---

## A. Cœur central (Hetzner) — actions sur l'ancien PC / console / SSH

| Tâche | Statut | Note |
|-------|:------:|------|
| Snapshot Hetzner (point de retour complet) | ⬜ | Console Hetzner → Snapshots → « Take snapshot » |
| Activer Backups auto Hetzner | ⬜ | Quotidien, quelques €/mois |
| Lancer `scripts/backup.sh` (dumps BDD + fichiers) | ⬜ | Puis télécharger l'archive sur ton PC |
| Archive vérifiée + stockée hors serveur | ⬜ | Vérifier `INFOS.txt` / `erreurs.log` |

## B. Code des sites Vercel → GitHub (depuis l'ancien PC)

> Repos GitHub privés à utiliser. ⚠️ La **pré-création automatique a échoué** côté
> assistant (intégration GitHub limitée au seul dépôt `NAVLYS-BETA-`, erreur 403).
> → Les repos se créent **en 1 clic via GitHub Desktop** (« Publish repository », garder
> *privé*) en suivant `docs/SAUVEGARDE-CODE-VERCEL.md`.
> ⚠️ Ne JAMAIS committer `.env`, clés, mots de passe (`.gitignore` fourni).

| Projet Vercel | Domaine | Source trouvée (ancien PC) | Poussé sur GitHub | Vercel relié à Git (Phase 3) |
|---------------|---------|:--------------------------:|:-----------------:|:----------------------------:|
| **navlys-app** | navlys.com | ⬜ | ⬜ | ⬜ |
| **brunopartouche** | brunopartouche.com | ⬜ | ⬜ | ⬜ |
| **navbio** | navbiolife.com | ⬜ | ⬜ | ⬜ |
| **navlys-io** | navlys.io | ⬜ | ⬜ | ⬜ |
| **navlys-teaser** | navlys-teaser.vercel.app | ⬜ | ⬜ | ⬜ |
| **brunopartouche-teaser** | (404 / non-live) | ⬜ | ⬜ | — |

> Project IDs Vercel : voir `docs/CARTE-SITES.md`.

## C. Filet de sécurité intermédiaire (déjà fait par Claude depuis le cloud)

| Élément | Statut | Note |
|---------|:------:|------|
| Sauvegarde des **assets moteur** JS/CSS | ✅ | `sauvegarde-sites/_assets-moteur/` (fetch live 2026-06-22) |
| HTML corrigé des pages principales | ✅ | `corrections-pretes/` |
| ⚠️ navlys-app (protégé), images/vidéos, bruno home (tronqué) | ⛔ | Non récupérables par fetch → **uniquement via l'ancien PC** |

---

## Ordre conseillé
1. **A** : snapshot Hetzner (immédiat) → backup.sh → archive téléchargée.
2. **B** : retrouver la source de **navlys-app** en priorité, la pousser sur GitHub (privé).
3. Puis les autres sites, un par un.
4. **Phase 3** (plus tard) : relier chaque projet Vercel à son dépôt GitHub.

## Définition de « Phase 0 terminée »
Tout le code et les données existent en **copie sûre hors production** (snapshot + archive +
au moins navlys-app sous Git). On ne commence à **modifier/déployer** qu'après.
