# 🛰️ NAVLYS / BRUNO PARTOUCHE — VEILLE & INVENTAIRE MASTER

> **Photo de tout ce qui existe** (local + en ligne) — base de coordination avant tout nouveau développement.
> Généré le 22 mai 2026. Régénérable à la demande via `veille_navlys.sh` (voir §5).
> ⚖️ Aucune suppression effectuée. Ce document propose ; toi seul valides les suppressions.

---

## 1. 🌐 EN LIGNE — VERCEL (team `navlys`)

| Projet Vercel | Domaine(s) | Rôle réel | Verdict |
|---|---|---|---|
| **navlys-app** | **navlys.com**, www.navlys.com, navlys-app.vercel.app | App Next.js gated (cockpit + contenus, lancement 31 mai) | ✅ **CANONIQUE — garder** |
| navlys-teaser | navlys-teaser.vercel.app (pas de domaine custom) | Ancien teaser, remplacé par le gate de navlys-app | 🗑️ **doublon → supprimer** (par toi) |
| brunopartouche-com | brunopartouche-com-navlys.vercel.app (⚠️ domaine brunopartouche.com PAS attaché) | Tentative de site perso sur Vercel | ⚠️ **à trancher** (voir Décision 1) |

## 2. 🌐 EN LIGNE — NETLIFY

> ❓ **Angle mort.** Je n'ai pas d'accès API Netlify → je ne vois pas tes sites Netlify.
> Tu as un `netlify.toml` dans `brunopartouche-DEPLOY-v13/.../brunopartouche.com/` → au moins un site brunopartouche y est (ou y était) déployé.
> 👉 **Action : liste-moi tes sites Netlify** (ou donne un token read-only) pour fermer l'angle mort. Recommandation : tout consolider sur Vercel (voir Décision 1).

---

## 3. 💻 LOCAL — LES VRAIS SITES / APPS (sources déployables)

| Dossier | Type | Cible | Verdict |
|---|---|---|---|
| `navlys/` | App Next.js (lié Vercel `navlys-app`) | navlys.com | ✅ **CANONIQUE** |
| `brunopartouche-DEPLOY-v13-seo-polish_1/brunopartouche.com/` | Site statique (+ netlify.toml, SEO fait) | brunopartouche.com | ✅ **CANONIQUE** (plateforme à choisir, Décision 1) |
| `navlys-teaser-deploy/` | Site teaser (vercel.json) | — | 🗑️ remplacé par le gate |
| `NAVLYS_PORTAL_APP/` | Portail index.html | — | 🗑️ remplacé par l'app |
| `NAVLYS_TEASER_LAUNCH_PACK/`, `NAVLYS_VOILE_TEASER/` | Teasers | — | 📦 archiver (assets réutilisables) |
| `index.html` + `_redirects` (racine Downloads) | Artefacts de déploiement égarés | — | 🗑️ déplacer hors du dossier |

## 4. 💻 LOCAL — LE MÉNAGE

**A. Dossiers `_files` (artefacts « Enregistrer la page web » = poubelle, ~17 Mo) :**
`Bruno Mark Partouche…_files`, `caducet relief_files` (6,3 Mo), `nav1_files`, `navinsta_files`, `navlys_files`, `navlysa_files` (5,5 Mo), `navtiktok_files` → 🗑️ **archiver/supprimer**.

**B. Zips en double :**
`NAVLYSMKG.zip` + `(1)` + `(2)` (garder 1) · `files.zip` + `(1)`→`(5)` · `brunopartouche-DEPLOY-v13-seo-polish.zip` + `_1.zip` · `navlys.zip` + `(1)` + `navlys-handoff.zip` + `navlys-teaser-deploy.zip` · `NAVLYS_OBJECTIF_PACK.zip` + `_v2.zip` · `NAVLYS_PRESS_KIT_PACK.zip` + `_ZIP.zip`.

**C. Outils/binaires à sortir du dossier projet (lourd, hors-sujet) :**
`VSCode-win32-arm64-1.120.0.zip`, `node-v25.9.0-win-x64.zip`, `claude-code-jetbrains-plugin-*.zip`, `Telegram Binding Initialization.zip`, `attachments.zip`.

**D. Packs NAVLYS_*_PACK (≈30) :** ce sont tes **bibliothèques d'assets sources** (brand, objectif, cheval de troie, backtest, etc.). ✅ **À GARDER**, mais à ranger dans un sous-dossier unique `NAVLYS_PACKS/` pour dégager la racine. Le zip ET le dossier décompressé existent souvent en double → garder le **dossier**, archiver le **zip**.

---

## 5. 🎯 PROPOSITION — 1 PROJET CLAIR PAR SITE

```
SITE 1 — navlys.com        → Vercel: navlys-app      ← source: navlys/                ✅ déjà en place
SITE 2 — brunopartouche.com→ [Vercel OU Netlify ?]   ← source: brunopartouche.com/     ⚠️ Décision 1
ASSETS — NAVLYS_PACKS/     → (pas un site) bibliothèque source rangée
ARCHIVE — _ARCHIVE_2026-05/→ tout le reste (doublons, _files, teasers, binaires)
```

### 🚦 Décisions à prendre ENSEMBLE
1. **brunopartouche.com → Vercel ou Netlify ?** Reco : **Vercel** (une seule plateforme, navlys.com y est déjà, j'y ai accès → je peux attacher le domaine et redéployer proprement, et on supprime le doublon Netlify).
2. **Netlify** : tu me listes tes sites (ou on l'abandonne au profit de Vercel) ?
3. **Feu vert archivage** : OK pour que je déplace (PAS supprimer) tout le §4 vers `_ARCHIVE_2026-05/` ? (réversible).

---

## 6. 🔁 LA VEILLE (avant tout dev)
Script `veille_navlys.sh` (même dossier) régénère cette photo à la demande : scan local + état des projets Vercel. À lancer avant chaque session de dev pour repartir d'une photo à jour. Voir en-tête du script pour l'usage.
