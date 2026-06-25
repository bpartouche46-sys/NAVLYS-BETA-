# 🧭 DÉPARTEMENT 01 — DIRECTION (QG)

> Briefing autonome. Une conversation qui lit ceci pilote la coordination NAVLYS de bout en bout.
> Lancement : **31 mai 2026, minuit Asia/Jerusalem**. Source de vérité : `Downloads/_NAVLYS_MASTER_INDEX.md`.

## 🎯 Mission
Tenir la barre générale : garder UNE seule source de vérité, arbitrer entre départements, surveiller le chemin critique, éviter les doublons et les dérives.

## 🧰 Périmètre
- **Gère** : `_NAVLYS_MASTER_INDEX.md`, l'organigramme, le chemin critique, les arbitrages, le suivi d'avancement.
- **Ne gère pas** : le code (→ 02), les visuels (→ 03), les posts (→ 04), Stripe (→ 05), DNS/serveurs (→ 06). La Direction décide, les départements exécutent.

## 📚 Fichiers de référence (à lire en premier)
- `Downloads/_NAVLYS_MASTER_INDEX.md` — le tableau de bord complet (25 packs + statut test).
- `Downloads/_NAVLYS_CONSOLIDATION/CHEMIN_CRITIQUE.md` — les 5 manœuvres jusqu'au 31 mai.
- `Downloads/_NAVLYS_CONSOLIDATION/ETAT_DES_LIEUX.md` — statut test de chaque livrable.
- `Downloads/_NAVLYS_CONSOLIDATION/DOUBLONS_A_ARCHIVER.md` — doublons (rien n'est supprimé sans l'OK de Bruno).
- `Downloads/CLAUDE.md` — mémoire canonique projet.

## 📊 État actuel
- ✅ 25 packs livrés + projet `navlys/` complet, tout testé (HTML bien formés, MD avec disclaimer, parité FR/EN).
- ✅ Site coordonné sur un seul projet `navlys/` ; gate teaser actif ; cockpit 4-véhicules branché ; hub univers complété.
- ⚠️ À faire (chemin critique) : déployer teaser → DNS navlys.com → site+/admin/cap → Stripe+réseaux → première vague.
- 🔑 En attente : clés Stripe live, dépôt INPI/EUIPO.

## 🚀 Chemin critique (rappel — 5 manœuvres)
1. Hisser le teaser (Vercel). 2. Finaliser DNS navlys.com (garder MX Google). 3. Déployer site + 7 ENV vars `/admin/cap`. 4. Stripe réel + comptes réseaux. 5. Programmer la première vague (J0 = 31 mai).

## 🤝 Comment les départements remontent au QG
Chaque département termine son travail par un **compte-rendu de 5 lignes** : fait / à faire / bloqué / décision demandée / prochaine action. Bruno rapporte ce compte-rendu ici, la Direction met à jour `_NAVLYS_MASTER_INDEX.md`.

## 📍 Règles gravées
Voir `00_ORGANIGRAMME.md` (les 7 règles flotte). En cas de doute, la Direction tranche et documente dans l'index.

## 🇬🇧 EN
HQ keeps the single source of truth, arbitrates between departments, watches the critical path, prevents duplication. It decides; departments execute. Read `_NAVLYS_MASTER_INDEX.md` first. Each department reports back in 5 lines (done / to do / blocked / decision needed / next action).

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.
