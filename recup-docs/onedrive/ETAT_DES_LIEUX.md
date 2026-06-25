# NAVLYS — État des lieux & plan de consolidation
### La photo complète de ce qui existe en ligne · 22 mai 2026

> *On rentre au port, on aligne tous les bateaux à quai, et on regarde lesquels naviguent encore, lesquels prennent l'eau, et lesquels ne sont que des épaves à démolir. Aucune décision de casse n'est prise sans toi : ce document propose, tu valides.*

---

## 1. Le constat en une phrase

Il y a **deux marques** (NAVLYS et brunopartouche.com), réparties sur **deux plateformes** (Netlify + Vercel), avec **13 entités en ligne** au total dont **~10 sont des doublons ou des tests** à nettoyer. Un seul vrai problème : **brunopartouche.com existe en double** (vivant sur Netlify, cassé sur Vercel).

---

## 2. La photo — Netlify (10 sites)

Compte : **bpartouche46@gmail.com** · équipe `bpartouche46` · plan **Pro**.

| Site Netlify | URL | État | Ce que c'est | Proposition |
|---|---|---|---|---|
| **novafinanceclub** | **brunopartouche.com** | 🟢 en ligne | **Le site perso de Bruno (LIVE)** | ⚓ **À GARDER** (ou migrer — voir §5) |
| nova030501 | nova030501.netlify.app | 🟢 | Ancienne marque NOVA | 🗑️ Supprimer |
| brunopartouche-nova | brunopartouche-nova.netlify.app | 🟢 | Ancien perso/NOVA | 🗑️ Supprimer |
| subtle-cheesecake-9ca88e | …netlify.app | 🟢 | Nom auto = test | 🗑️ Supprimer |
| elaborate-dragon-db18af | …netlify.app | 🟢 | Nom auto = test | 🗑️ Supprimer |
| bucolic-unicorn-1e39d3 | …netlify.app | 🟢 | Nom auto = test | 🗑️ Supprimer |
| phenomenal-raindrop-c6e552 | …netlify.app | 🟢 | Nom auto = test | 🗑️ Supprimer |
| silly-gecko-b96a17 | …netlify.app | ⚪ sans deploy clair | Nom auto = test | 🗑️ Supprimer |
| peppy-sunshine-51f50e | …netlify.app | 🟢 | Nom auto = test | 🗑️ Supprimer |
| ubiquitous-sherbet-7cafd2 | …netlify.app | 🟢 | Nom auto = test | 🗑️ Supprimer |

➡️ **9 sites sur 10 sont des épaves** (noms auto-générés ou ancienne marque NOVA). Seul **novafinanceclub** compte, car il porte le domaine **brunopartouche.com**.

---

## 3. La photo — Vercel (3 projets)

Équipe : **NAVLYS** (`navlys`).

| Projet Vercel | Domaines | Dernier build prod | Ce que c'est | Proposition |
|---|---|---|---|---|
| **navlys-app** | **navlys.com**, www.navlys.com, navlys-app.vercel.app | 🟢 READY | **L'app NAVLYS canonique** (cockpit + gate verrouillé) | ⚓ **À GARDER — c'est le navire amiral** |
| navlys-teaser | navlys-teaser.vercel.app | 🟢 READY | Ancien teaser, remplacé par le gate de navlys-app | 🗑️ Supprimer (archiver d'abord) |
| brunopartouche-com | brunopartouche-com.vercel.app | 🔴 **ERROR** | **Doublon cassé** de brunopartouche.com | ⚠️ À trancher (voir §5) |

---

## 4. La photo — dossiers locaux (OneDrive\Downloads)

| Dossier local | Lié à | Statut | Proposition |
|---|---|---|---|
| **navlys/** | ✅ Vercel `navlys-app` (`.vercel` présent) | **Source canonique vivante** | ⚓ Garder = dossier de travail unique NAVLYS |
| brunopartouche-DEPLOY-v13-seo-polish_1/ | Netlify `novafinanceclub` (netlify.toml) | Source du site perso | Garder 1 seule version, archiver les autres |
| NAVLYS_PORTAL_APP/ | — (prototype portail) | Ancien prototype | 📦 Archiver |
| NAVLYS_VOILE_TEASER/ | Vercel teaser (ancien) | Ancien teaser | 📦 Archiver |
| navlys-teaser-deploy/ | Vercel teaser (ancien) | Ancien teaser | 📦 Archiver |
| ~60 fichiers `.zip` (packs livrés) | — | Archives de livraison | 📦 Ranger dans un dossier `_ARCHIVES/` |

> Tu avais déjà semé des indices de ménage : `navlys/CLEANUP-DOUBLONS.ps1`, `navlys/PROJET-CENTRALISE.md`, `NAVLYS_PORTAL_APP/MENAGE_VERCEL_ET_INSTALL.md`. On formalise ça ici.

---

## 5. Les 2 décisions à prendre ENSEMBLE ⚓

Rien n'est supprimé tant que tu n'as pas tranché. Voici les deux seuls vrais choix.

### Décision A — Sur quelle plateforme vit **brunopartouche.com** ?
- **Option 1 (recommandée) :** tout regrouper sur **Vercel** (équipe NAVLYS). On migre brunopartouche.com → projet Vercel `brunopartouche-com` (qu'on répare), puis on **ferme complètement Netlify**. → Une seule plateforme, une seule facture, zéro confusion.
- **Option 2 :** garder brunopartouche.com sur **Netlify** (il marche déjà) et seulement supprimer le projet Vercel cassé + les 9 tests Netlify. → Deux plateformes, mais moins de mouvement.

### Décision B — La cible « un projet clair par site »
Proposition (à valider) :

| Site / Marque | Plateforme cible | Projet unique | Domaine | Dossier source unique |
|---|---|---|---|---|
| **NAVLYS** (écosystème d'apps) | Vercel | `navlys-app` | navlys.com | `Downloads/navlys/` |
| **brunopartouche.com** (perso) | *选 Vercel ou Netlify (déc. A)* | 1 seul projet | brunopartouche.com | 1 seul dossier `brunopartouche/` |

Tout le reste → **supprimé en ligne** (après archivage local) et **rangé** dans `Downloads/_ARCHIVES/`.

---

## 6. Ce que je propose comme suite (sur ton feu vert)

1. Tu réponds aux décisions A et B.
2. J'**archive** localement tout ce qui part (zip dans `_ARCHIVES/`) — réversible.
3. Je **supprime** les épaves en ligne **une par une**, en te listant chaque suppression avant de la faire (jamais en masse).
4. On garde **2 projets propres** : `navlys-app` + le site perso, chacun avec un seul dossier source.
5. La **veille tourne déjà** (voir §7) : elle t'alertera si un nouveau doublon réapparaît.

---

## 7. La veille est en place ✅

Tâche planifiée **`veille-infra-navlys`** — **chaque lundi 8h00** (heure locale).
À chaque passage, elle : refait la photo Netlify + Vercel, la compare à la précédente, et écrit un rapport dans `NAVLYS_PILOTAGE/veille/veille_AAAA-MM-JJ.md`. Elle **signale** tout nouveau site, doublon, build cassé ou domaine en double, et met en **ALERTE** si navlys.com ou brunopartouche.com tombent. Elle **observe seulement** — elle ne supprime ni ne déploie rien.

> Astuce : clique « Run now » une fois sur la tâche pour pré-autoriser les connecteurs Netlify/Vercel, sinon le 1ᵉʳ passage automatique pourrait se mettre en pause sur une demande d'accès.

---

## 8. Garde-fous

- ⛔ **Aucune suppression** en ligne n'a été faite. Cet état des lieux ne fait que *photographier* et *proposer*.
- 🔒 Le gate NAVLYS reste **verrouillé** (`NEXT_PUBLIC_LAUNCH_UNLOCKED` non défini). Rien n'a été déverrouillé.
- 🔑 Aucun secret/token n'est écrit en clair dans ces fichiers ni dans la veille.

---

*Document de pilotage — `NAVLYS_PILOTAGE/ETAT_DES_LIEUX.md`. Baseline machine : `NAVLYS_PILOTAGE/veille/derniere_photo.json`.*
