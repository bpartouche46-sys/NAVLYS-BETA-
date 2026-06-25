## 🔔 Changements détectés le 2026-05-25

> Veille automatique (lecture seule). Comparaison avec la photo du 22-24 mai. **Aucune action effectuée.**

### 🌐 DNS — LE GROS CHANGEMENT : les deux domaines sont enfin branchés
| Domaine | Avant (22/05) | Maintenant (25/05) | Lecture |
|---|---|---|---|
| **brunopartouche.com** | 192.64.119.130 (parking Namecheap) 🔴 | **75.2.60.5 (Netlify)** ✅ | Branché sur Netlify = site `novafinanceclub` |
| www.brunopartouche.com | (rien) | 35.157.26.135 / 63.176.8.218 (AWS Francfort) | Service de redirection — à vérifier (pas Vercel/Netlify standard) |
| **navlys.com** | (rien) 🔴 | **216.198.79.1 (Vercel)** ✅ | Branché sur Vercel = `navlys-app` |
| www.navlys.com | (rien) | 76.76.21.123 (Vercel) + 66.33.60.35 (redir registrar) | OK côté Vercel |

➡️ **Résultat : 1 plateforme par site** — brunopartouche.com sur **Netlify**, navlys.com sur **Vercel**. (Note : c'est l'inverse de l'ancienne reco « brunopartouche.com sur Vercel » — la cible a évolué.) Côté mail : brunopartouche.com → privateemail.com (Namecheap) ; navlys.com → **Google Workspace** (nouveau).

### 🟢 Nouveaux projets en ligne
- **Vercel `brunopartouche-teaser`** — créé le 25/05 04:49 UTC, 1 déploiement READY. Rôle à clarifier (teaser BP côté Vercel, alors que brunopartouche.com est servi par Netlify).

### 🔴 Sites / projets disparus depuis le 22/05
- **Netlify : 9 sites sur 10 ont disparu.** Il ne reste que `novafinanceclub`. Disparus : `nova030501`, `brunopartouche-nova`, `ubiquitous-sherbet-7cafd2`, `subtle-cheesecake-9ca88e`, `elaborate-dragon-db18af`, `bucolic-unicorn-1e39d3`, `phenomenal-raindrop-c6e552`, `peppy-sunshine-51f50e`, `silly-gecko-b96a17`.
  - ⚠️ **À vérifier** : l'audit du 24/05 disait que `subtle-cheesecake` (= master brunopartouche.com le plus riche) et `ubiquitous-sherbet` (= vrai NAVLYS) contenaient du contenu réel. S'assurer qu'ils ont bien été **récupérés en local** (dossiers `_SITES_MASTER`, `brunopartouche-LIVE`, `navlys`) **avant** suppression.
- **Vercel : `brunopartouche-com` a disparu** (était marqué GARDER) — remplacé par le nouveau `brunopartouche-teaser`.

### 💾 Local (OneDrive/Downloads)
- Avant : 46 dossiers · 396 fichiers · 59 zips · 100 HTML · 50 MD · 13 .exe.
- Maintenant : **49 dossiers · 416 fichiers · 60 zips · 107 HTML · 54 MD · 14 .exe** (+3 dossiers, +20 fichiers, +7 HTML, +4 MD, +1 zip, +1 .exe).
- Snapshot complet des dossiers écrit dans `dossiers_locaux.txt` (1er snapshot → la liste exacte des « nouveaux dossiers » sera comparable dès la prochaine veille).
- Dossiers cohérents avec les changements en ligne : `NAVLYS_DNS_BASCULE_PACK` (= la bascule DNS qui vient d'avoir lieu), `NAVLYS_LAUNCH_FINALE_PACK`, `NAVLYS_FIRST_WAVE_PACK`, `NAVLYS_GATE_INTEGRATION_PACK`, `brunopartouche-LIVE`, `navlys-teaser-deploy`, `_SITES_MASTER`.

### 🧭 Décisions encore en attente
1. **brunopartouche.com = Netlify, c'est définitif ?** Le DNS pointe maintenant sur Netlify (`novafinanceclub`). Si oui → clarifier/archiver le nouveau Vercel `brunopartouche-teaser` pour éviter un nouveau doublon.
2. **www.brunopartouche.com** pointe vers des IP AWS Francfort (redirection) et non vers Netlify — à aligner sur l'apex (sinon `www` et le domaine nu peuvent diverger).
3. **Confirmer la récupération locale** des masters Netlify supprimés avant de tourner la page.
4. **navlys-teaser** (Vercel) : archiver maintenant que `navlys-app` sert navlys.com.

---

# 📸 PHOTO — ÉTAT DES LIEUX COMPLET (NAVLYS · NAVBIO · brunopartouche.com)

> Établi le 22 mai 2026 par l'assistant · **Développement mis en pause à ta demande.**
> Objectif : voir TOUT ce qui existe (local + en ligne), faire le ménage, puis décider ensemble **1 seul projet clair par site**.
> ⚠️ **Aucune suppression, aucun changement DNS, aucun déploiement n'a été fait.** Ce document est une photo + un plan à valider.

> 🛑 **CORRECTION 22/05 (voir `AUDIT_CONTENU_SITES.md`)** : après audit du contenu réel, les verdicts « supprimer » ci-dessous sur les sites Netlify « noms automatiques » sont **ANNULÉS**. Ce ne sont PAS des brouillons : ce sont des **itérations réelles de tes sites phares**, parfois plus complètes que ce qui est en ligne. Le site `ubiquitous-sherbet` est le **vrai NAVLYS conforme** (navlys.com) ; `subtle-cheesecake` est le **brunopartouche.com le plus riche** ; `brunopartouche-nova` est un **Trading Lab** ; `novafinanceclub` (qui détient le domaine brunopartouche.com) est un **template VIDE**. → **Ne rien supprimer. Récupérer d'abord, voir l'audit.**

---

## 🔴 LES 3 VÉRITÉS IMPORTANTES (à lire en premier)

1. **brunopartouche.com ne pointe nulle part d'utile.** Le DNS renvoie vers `192.64.119.130` = **page parking Namecheap**. Ni Netlify ni Vercel ne servent réellement le site en ce moment, alors que **les DEUX** plateformes ont un projet pour ce domaine. → Le site n'est PAS live tel quel.
2. **navlys.com ne résout pas** (aucun enregistrement DNS A). → Domaine acheté mais pas branché.
3. **Beaucoup de doublons.** 10 sites Netlify (dont 7 noms automatiques = brouillons), 3 projets Vercel, et côté dossiers : 46 dossiers + 59 zips + 100 fichiers HTML, avec énormément de doublons et d'installeurs `.exe` parasites.

---

## 🌐 EN LIGNE

### Netlify — équipe `bpartouche46` — **10 sites**
| Site Netlify | URL | Rôle probable | Verdict |
|---|---|---|---|
| **novafinanceclub** | brunopartouche.com (domaine attaché) | Ancien « NOVA Finance Club » → brunopartouche | ⚠️ à trancher (conflit avec Vercel) |
| nova030501 | nova030501.netlify.app | NOVA (legacy) | 🟠 archiver |
| brunopartouche-nova | brunopartouche-nova.netlify.app | brunopartouche (essai) | 🟠 archiver |
| ubiquitous-sherbet-7cafd2 | …netlify.app | brouillon auto | 🗑️ supprimer |
| subtle-cheesecake-9ca88e | …netlify.app | brouillon auto | 🗑️ supprimer |
| elaborate-dragon-db18af | …netlify.app | brouillon auto | 🗑️ supprimer |
| bucolic-unicorn-1e39d3 | …netlify.app | brouillon auto | 🗑️ supprimer |
| phenomenal-raindrop-c6e552 | …netlify.app | brouillon auto | 🗑️ supprimer |
| peppy-sunshine-51f50e | …netlify.app | brouillon auto | 🗑️ supprimer |
| silly-gecko-b96a17 | …netlify.app (pas de deploy actif) | brouillon vide | 🗑️ supprimer |

### Vercel — équipe `NAVLYS` — **3 projets**
| Projet Vercel | Rôle | Domaine visé | Verdict |
|---|---|---|---|
| **navlys-app** | L'app + cockpit immersif (gate verrouillé, countdown 31 mai) | navlys.com | ✅ **garder = projet NAVLYS** |
| navlys-teaser | Ancien teaser | — | 🟠 archiver (remplacé par navlys-app) |
| **brunopartouche-com** | Site vitrine BP (8 routes + EN) | brunopartouche.com | ✅ **garder = projet BP** (à confirmer vs Netlify) |

### DNS réel (aujourd'hui)
| Domaine | Pointe vers | État |
|---|---|---|
| brunopartouche.com | 192.64.119.130 (Namecheap parking) | 🔴 pas branché à un déploiement |
| www.brunopartouche.com | (rien) | 🔴 |
| navlys.com | (rien) | 🔴 pas configuré |
| www.navlys.com | (rien) | 🔴 |

---

## 💾 LOCAL — `OneDrive/Documents/Documents/Downloads`
**46 dossiers · 396 fichiers en racine · 59 zips.** Répartition : 100 HTML · 50 MD · 59 zip · 35 jpg · 25 png · 25 pdf · **13 .exe (installeurs parasites)** · 12 xlsx.

### A. Packs projet NAVLYS (le vrai travail — à GARDER, à ranger)
~30 dossiers `NAVLYS_*_PACK` (OBJECTIF, BRIDGE, MOTOR_ENGINE, VEILLE_PREMIUM, BRAND_BIBLE, BRAND_KIT, COCKPIT, COCKPIT_IMMERSIF, LOGO_ANIME_PRO, STRIPE, MARKETING_AFFILIATE, etc.) + `CHEVAL_TROIE_PACK`, `MARTINGALE_SCIENTIFIQUE_PACK`, `BP_LOGO_PACK`, `_NAVLYS_DISPATCH_PACK`, `_NAVLYS_CONSOLIDATION`. → **Garder**, ce sont les briques.

### B. Doublons évidents (à dédoublonner)
- `NAVLYSMKG` + `NAVLYSMKG (1)` + `NAVLYSMKG (1).zip` + `NAVLYSMKG (2).zip`
- `files.zip` → `files (1..5).zip` (6 copies)
- `navlys.zip` + `navlys (1).zip` ; `NAVLYS_OBJECTIF_PACK.zip` + `_v2` ; `NAVLYS_PRESS_KIT_PACK.zip` + `_ZIP`
- brunopartouche : `brunopartouche.html`, `brunopartouche (1).html`, `brunopartouche1.html`, `brunopartouche_1.html`, `brunopartouche-com.html`, `brunopartouche-com (1).html`, `brunopartouche_index_MASTER.html` (7 variantes du même site)
- `brunopartouche-DEPLOY-v13-seo-polish.zip` + `_1.zip`

### C. Parasites purs (à sortir — ce ne sont pas tes projets)
- **Installeurs .exe** : `Claude Setup.exe` (x2), `VSCode-…zip`, `node-v25…zip`, `DiscordSetup.exe`, `Spotify…Installer.exe`, `Install-Virtual Regatta…exe`, `claude-code-jetbrains…zip`, `Telegram Binding Initialization.zip`.
- **Dossiers « _files »** (artefacts « enregistrer la page web ») : `navlys_files`, `navlysa_files`, `nav1_files`, `navinsta_files`, `navtiktok_files`, `caducet relief_files`, `Bruno Mark…_files`.

---

## ⚖️ LES CONFLITS À TRANCHER (décisions Bruno)

1. **Quelle plateforme pour brunopartouche.com ?** Vercel (`brunopartouche-com`) **OU** Netlify (`novafinanceclub`). On en garde **une seule**, on supprime l'autre. *Reco : Vercel* (l'app/cockpit NAVLYS y est déjà → un seul fournisseur = plus simple).
2. **NOVA** : l'ancienne marque « NOVA Finance Club » est-elle abandonnée au profit de NAVLYS + brunopartouche ? Si oui → archiver `nova030501`, `brunopartouche-nova`.
3. **Les 7 sites Netlify « noms automatiques »** : confirmes-tu la suppression (ce sont des brouillons) ?

---

## 🎯 CIBLE PROPOSÉE — « 1 site = 1 projet » (à valider ensemble)

| Site | Projet unique | Plateforme | Domaine | Contenu |
|---|---|---|---|---|
| **Le phare** | `brunopartouche-com` | Vercel (reco) | brunopartouche.com | Bruno : bio, parcours, références → pointe vers NAVLYS |
| **La marque** | `navlys-app` | Vercel | navlys.com | App + cockpit immersif + outils (gate jusqu'au 31 mai) |
| **NAVBIO** | route de brunopartouche.com (`/navlys-bio-live`) | — | — | Livre vivant privé (pas un site séparé) |

Tout le reste (Netlify brouillons, teaser, NOVA) → décommissionné après ta validation.

---

## 🧹 PLAN DE MÉNAGE (3 vagues — rien fait sans ton « go »)

- **Vague 1 — sans risque (réversible)** : déplacer les parasites (.exe, dossiers `_files`, doublons `files (1..5).zip`, `NAVLYSMKG (1/2)`) vers `Downloads/_ARCHIVE_2026-05/`. Je peux le faire dès ton accord (déplacement, pas suppression).
- **Vague 2 — online brouillons** : supprimer les 7 sites Netlify auto-nommés (aucun contenu utile). Action sur ton compte → je prépare la liste exacte, tu confirmes.
- **Vague 3 — consolidation** : choisir la plateforme de brunopartouche.com, brancher le DNS proprement (1 seule cible), archiver navlys-teaser + sites NOVA.

---

## 👁️ LA VEILLE (mise en place maintenant)
- Inventaire en ligne (Netlify + Vercel) + DNS + dossiers, **régénéré automatiquement** (tâche planifiée Cowork) → ce fichier est tenu à jour, et tout **nouveau site / dossier / changement DNS** est signalé.
- Script local `_ETAT_DES_LIEUX_NAVLYS/refresh_local.sh` pour rafraîchir la liste des dossiers à la demande.

---

*« On ne navigue bien qu'avec une carte à jour. » — Photo générée par l'assistant. Aucune action destructive effectuée. En attente de tes décisions (conflits 1-2-3 + cible).*
