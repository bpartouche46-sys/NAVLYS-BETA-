# PLAN DE NETTOYAGE DU DÉPÔT — à valider par Bruno avant exécution

> **Contexte** : une session parallèle a versé ~30 dossiers de contenu (packs Drive/OneDrive) à la
> racine du dépôt, qui est **PUBLIC**. L'audit a révélé : données personnelles exposées, 2 noms de
> packs toxiques, doublons, mélange public/privé. Ce plan liste **précisément** quoi faire.
> **Rien n'est exécuté tant que Bruno n'a pas validé.** Actions sensibles/destructives = feu vert requis.

## 🔴 PRÉ-REQUIS ABSOLU (Bruno, manuel)
**Passer le dépôt en privé** : GitHub → `NAVLYS-BETA-` → Settings → Danger Zone → Change visibility → Private.
*(Seul geste qui stoppe l'exposition immédiate. Claude ne peut pas le faire — pas d'outil visibilité.)*

---

## A. DONNÉES PRIVÉES À RETIRER (urgent — règle d'or : aucun secret/PII dans le dépôt)

| Élément | Où | Action |
|---------|-----|--------|
| **Téléphones perso** (`+972 …`, `+33 7 …`, `0704…`) | `recup-docs/`, `historique/SLOGANS-ET-REFERENCES.md`, `_ARCHIVE_20260525/`, `_ETAT_DES_LIEUX_NAVLYS/`, `docs/ETAT-DES-LIEUX.md` | **Supprimer les lignes** (anonymiser) |
| **Nom d'entité `[entité — hors dépôt]`** | ~10 fichiers `recup-docs/onedrive/`, `MARTINGALE_…/_INDEX.md`, `…/POSITIONNEMENT_TRANSPARENT.md` | Remplacer par `[entité — hors dépôt]` |
| **Réfs Israël / Ashkelon / Tel-Aviv / Jérusalem** | `_NAVLYS_DEPARTEMENTS/`, `recup-docs/onedrive/_E_REPUTATION_*` | **Sortir vers Drive** (fichiers e-réputation entiers) |
| **Audit e-réputation Bruno** (5 fichiers) | `recup-docs/onedrive/_E_REPUTATION_*.md` | **Sortir vers Drive** privé |
| **Procédure clés API** | `recup-docs/onedrive/_SECURITE_PROCEDURE_OFFICIELLE_KEYS.md` | **Sortir vers Drive** privé |
| **Dossier identité Bruno** | `Bruno Mark Partouche — …Méditerranée_files/` | **Sortir vers Drive** privé |
| **Email perso** `bpartouche46@gmail.com` | `NAVLYS_PRESS_KIT_PACK/*` | Remplacer par `bruno@navlys.com` |
| **JWT Supabase anon** (réel) | `sites/navfin/index.html:204` | Vérifier (clé anon = publique par design ; OK si RLS actif) |

> ⚠️ **Important** : retirer un fichier d'un commit **ne l'efface pas de l'historique**. Pour une purge
> réelle des vieux commits → `git filter-repo` (réécriture d'historique). À décider avec Bruno (étape D).

---

## B. RENOMMER (noms toxiques pour un média finance)

| Nom actuel | → Nouveau nom | Pourquoi |
|------------|---------------|----------|
| `CHEVAL_TROIE_PACK/` | `NAVLYS_MARGE_REVELEE_PACK/` | « Cheval de Troie » = malware → image désastreuse |
| `MARTINGALE_SCIENTIFIQUE_PACK/` | `NAVLYS_METHODE_90_10_PACK/` | « Martingale » = système de casino → contredit « rigueur, pas pari » |

*(Contenu sain dans les deux — seul le nom pose problème.)*

---

## C. RANGER (le contenu utile reste, mais ordonné)

**GARDER (sain + utile)** : `NAVLYS_TEASER_LAUNCH_PACK`, `NAVLYS_COCKPIT_PACK`,
`NAVLYS_COCKPIT_IMMERSIF_PACK`, `NAVLYS_BRAND_KIT`, `NAVLYS_BRIDGE_PACK`,
`NAVLYS_STRIPE_COMPLETE_PACK`, `NAVLYS_PRESS_KIT_PACK`, `NAVLYS_VEILLE_PREMIUM_PACK`,
`NAVLYS_BACKTEST_5ANS_PACK`, `_NAVLYS_DEPARTEMENTS`, `_NAVLYS_DISPATCH_PACK`,
`contenu/`, `designs/`, `scripts/`, `assets/`, `corrections-pretes/`, `historique/`.

**SUPPRIMER (doublons purs)** : `NAVLYS_Teaser_Preview/`, `NAVLYS_VOILE_TEASER/`,
`_NAVLYS_DEPARTEMENTS_EXTRACT/`, `Audit approfondi d'e-réputation — …/` (dossier quasi vide).

**ARCHIVER (déplacer sous `_ARCHIVE/…`, garder la trace)** : `_ARCHIVE_20260525/`,
`_ETAT_DES_LIEUX_NAVLYS/`, `_NAVLYS_CONSOLIDATION/`, `_NAVLYS_BACKUPS_transpo_2026-05-25/`,
`_NAVLYS_INBOX/`, `NAVLYS_CENTRAL_20260614/`, `brunopartouche_DEPLOY/`,
`brunopartouche_NETLIFY_MINIMALISTE/`, `sauvegarde-sites/`, `proto/`, `sites/` (snapshots).

**À VÉRIFIER avant de trancher** : `core/`, `live-source/`, `agent/`, `nav1_files/`.

---

## D. PURGE D'HISTORIQUE (optionnel mais recommandé)
Pour effacer les téléphones / `[entité — hors dépôt]` des **anciens commits** (sinon accessibles même après suppression) :
`git filter-repo` ciblé sur les chaînes sensibles, puis force-push. **Réécrit l'historique** → à faire
en connaissance de cause (casse les anciens liens de commit). Recommandé **après** être passé en privé.

---

## ORDRE D'EXÉCUTION PROPOSÉ
1. ✅ **Bruno** : dépôt → privé *(coupe-circuit)*.
2. Sortir vers Drive les fichiers privés (section A) + supprimer les lignes PII restantes.
3. Renommer les 2 packs toxiques (section B).
4. Supprimer doublons + archiver (section C).
5. Mettre à jour `.gitignore` (exclure `recup-docs/onedrive/_E_REPUTATION_*`, données perso).
6. Commit + push.
7. *(Optionnel)* Purge d'historique (section D).

> **Choix demandés à Bruno** : (a) je lance les sections A→C maintenant ? (b) purge d'historique D : oui/non ?
> (c) les 4 dossiers « à vérifier » : je les ouvre et te propose un classement ?
