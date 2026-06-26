# 🧭 NAVLYS — QG · COORDINATION & DÉCISIONS

> 25 mai 2026 · Tenu **ici, dans cette conversation (le QG)**. Mis à jour à chaque CR de département.
> Rôle : t'assurer que tout est coordonné et te dire **quoi faire quand une décision t'attend**.
> Source de vérité : `_NAVLYS_MASTER_INDEX.md` · Routeur : `_NAVLYS_DISPATCH.md`.

---

## ⚓ ÉTAT COORDONNÉ (au 25 mai)

- **navlys.com** ✅ EN LIGNE — redéployé par le Dépt 02 (Vercel READY). Teaser cockpit (4 véhicules), logo animé, fonds enrichis, countdown 1er juin, **gate ACTIF** (verrouillé), disclaimer en pied, zéro lien mort.
- **brunopartouche.com** ⚠️ teaser cockpit **prêt** (`brunopartouche-LIVE/teaser-cockpit.html`) mais **pas encore promu en page d'accueil ni redéployé**.
- **Départements** : 02 (Site) a livré et rendu son CR. 03/04/05/06 : en attente de leur premier CR.
- **Ménage racine** : doublons exacts + fichiers cassés (Coin (1)/(2), bandeau (1)/(2), v5_1/v5_2, v6 cassé, OBJECTIF_v2 vide…) **déjà retirés** de la racine. Rien de canonique perdu.

---

## ✅ DÉJÀ CORRIGÉ (par le QG / les départements)
- CR du Dépt 02 collé en double → dédoublonné.
- Doublons exacts + fichiers cassés → archivés/retirés de la racine.
- Date : même instant partout (« 31 mai minuit » = « 1er juin 00:00 » heure de Jérusalem). Formulation publique retenue : **« 1er juin 2026 · minuit (heure de Jérusalem) »** (déjà sur les 2 teasers).
- Vercel : projet courant cohérent (`prj_YFENrKz8…` / team `team_nBtY…`).

## 🧹 À ARCHIVER / SUPPRIMER (ton OK requis — Règle 8 : on liste, on n'efface pas seul)
- **Projets Vercel en double** signalés par Dépt 02 : `navlys-teaser`, `brunopartouche`, `brunopartouche-teaser`. → voir **Décision D1**.
- Fichiers épars racine : `bruno_archive_update_2.md`, `bruno_archive_update_3.md` (résidus d'autres sessions) — à confirmer.
- Le dossier `_ARCHIVE_20260525/` est ton **filet de récupération** : tu peux le vider quand tu es sûr.

## 🔁 À INTÉGRER / TRANSPOSER aux 2 sites
- **brunopartouche.com** : promouvoir `teaser-cockpit.html` en page d'accueil + déployer → **Décision D2**.
- **Fonds enrichis** du teaser NAVLYS (nébuleuses/mer/route/ciel par Dépt 02) → transposer au teaser Bruno pour parité visuelle (Dépt 02/03).
- **Liens** : Stripe (D5) + affiliation (D6) → branchés dans le site par Dépt 02 une fois fournis.

---

## 🟦 TABLEAU DES DÉCISIONS — CE QUI T'ATTEND, BRUNO

| # | Décision | Ma reco | Si tu ne tranches pas (défaut) | Qui exécute |
|---|---|---|---|---|
| **D1** | Projets Vercel en double (navlys-teaser, brunopartouche, brunopartouche-teaser) | **Garder** `navlys` (navlys.com) + **1 seul** projet Bruno ; **supprimer** les teasers orphelins | Ils restent → risque de 404 et de confusion de domaine | Dépt 06 + ton OK |
| **D2** | brunopartouche.com : teaser cockpit en page d'accueil ? | **Oui** : sauvegarder l'index actuel, renommer `teaser-cockpit.html` → `index.html`, déployer | Le teaser reste une page isolée, invisible des visiteurs | Dépt 02 |
| **D3** | Véhicule par défaut | NAVLYS = **voilier** (cohérent « la marée monte ») · Bruno = **voilier** (skipper) | voilier / voilier (déjà en place) | Dépt 02 (1 mot) |
| **D4** | Email public NAVLYS = `contact@navlys.com` | **Créer l'alias** dans Google Workspace ; sinon basculer sur `bruno@navlys.com` | Si l'alias n'existe pas, les « être prévenu » rebondissent | Toi + Dépt 06 |
| **D5** | Stripe (49 / 490 / 39 €) | Créer le compte, fournir **clés live + Payment Links** au Dépt 02 | Boutons « bientôt » → **aucune vente possible** | Toi + Dépt 05 |
| **D6** | Liens d'affiliation brokers (eToro CPA…) | Fournir les vrais liens → ENV `NEXT_PUBLIC_AFFILIATE_*` | Cartes partenaires inertes (mais SEO conservé) | Toi + Dépt 05 |
| **D7** | DNS navlys.com (Namecheap→Cloudflare→Vercel) | Finaliser **en gardant les MX Google** (`bruno@navlys.com`) | navlys.com peut rester instable / email à risque | Toi (registrar) + Dépt 06 |
| **D8** | Cockpits photo-réels | Déposer des **images libres de droit** (1 par véhicule) → je les branche en fond | On garde l'art original (déjà beau, 0 risque de droits) | Toi → Dépt 02/03 |

> **Priorité avant le 1er juin** : D2 (site Bruno) → D7 (DNS) → D5 (Stripe) → D1 (ménage Vercel). Le reste peut suivre.

---

## 🇬🇧 EN — HQ COORDINATION & DECISIONS
Held here in the HQ conversation. navlys.com is live (cockpit teaser, gate locked); brunopartouche.com teaser is ready but not yet promoted/deployed. Root duplicates/broken files already cleaned. Decisions awaiting Bruno: D1 delete duplicate Vercel projects, D2 make Bruno teaser the homepage + deploy, D3 default vehicle, D4 confirm contact@navlys.com alias, D5 Stripe live keys (sales blocker), D6 affiliate links, D7 finalize navlys.com DNS (keep Google MX), D8 optional royalty-free cockpit photos. Each row gives my recommendation and the default if you don't decide. Nothing is deleted without your OK (Rule 8).

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.

---

## ✅ VALIDATION BRUNO — 25 mai 2026 : « OUI À TOUT »

Toutes les décisions D1→D8 sont **approuvées**. Ordres transmis aux départements :

| # | Décision | Statut | Exécutant |
|---|---|---|---|
| D1 | Supprimer les projets Vercel en double (garder `navlys` + 1 projet Bruno) | ✅ APPROUVÉ → exécuter | Dépt 06 |
| D2 | brunopartouche.com : teaser cockpit en page d'accueil | ✅ APPROUVÉ (voir résolution GATE ci-dessous) | Dépt 02 |
| D3 | Véhicule par défaut : NAVLYS = voilier · Bruno = voilier | ✅ APPROUVÉ | Dépt 02 |
| D4 | Créer l'alias `contact@navlys.com` (Workspace) | ✅ APPROUVÉ | Bruno + Dépt 06 |
| D5 | Stripe NAVLYS live (49/490/39) | ✅ APPROUVÉ → Bruno fournit les clés | Bruno + Dépt 05 |
| D6 | Liens d'affiliation brokers réels | ✅ APPROUVÉ → Bruno fournit | Bruno + Dépt 05 |
| D7 | Finaliser DNS navlys.com (GARDER MX Google) | ✅ APPROUVÉ | Bruno + Dépt 06 |
| D8 | Cockpits photo-réels (images libres de droit) | ✅ APPROUVÉ → en attente des images | Bruno → Dépt 02/03 |

## ⚖️ ARBITRAGES remontés par le Dépt 02 (brunopartouche.com) — TRANCHÉS

**A. GATE — brunopartouche.com = PUBLIC (pas de gate dur).**
Bruno a demandé un site perso public. Résolution cohérente : le **teaser cockpit sert de page d'accueil/hero**, mais **rien n'est flouté** — tout le site (vie, parcours, offres) est explorable tout de suite (« le pont est déjà ouvert aux curieux »). 
➡️ Le **gate dur reste réservé à navlys.com** (verrouillé jusqu'au 1er juin). Les deux sites gardent le même *style* cockpit, mais seul NAVLYS est verrouillé.

**B. NOMMAGE — NAVLYS = marque produit ; NOVA = offre perso de Bruno.**
- **navlys.com** = marque produit dépersonnalisée **NAVLYS** (inchangé, règle maître).
- **brunopartouche.com** = univers de Bruno + ses offres perso **« NOVA Finance Club »** / **« NOVA Live Bio »** (son choix direct), + une carte « offre exceptionnelle » qui pointe vers **NAVLYS, à part**.
- Les deux coexistent sans se mélanger : NAVLYS jamais lié à Bruno ; NOVA reste côté perso. Séparation perso/marque intacte.

## 💳 Note monétisation (à coordonner Dépt 05)
Deux tiroirs Stripe distincts : **NAVLYS** (produit, D5 — clés à fournir) et **NOVA** (perso Bruno, déjà en prod côté brunopartouche.com : `prod_UOvIxDD1TsJWHk`, 49/490 € + NOVA Live Bio 39/149/299 €). À garder séparés et bien étiquetés.

## 📋 PROCHAINS ORDRES PAR DÉPARTEMENT
- **Dépt 02** : appliquer D2 (teaser = accueil Bruno, **public, sans flou**) + D3 ; redéployer brunopartouche.com en 1 passe alignée ; transposer les fonds enrichis NAVLYS au teaser Bruno.
- **Dépt 05** : séparer Stripe NAVLYS (attend clés) vs NOVA perso ; brancher D6 quand liens fournis.
- **Dépt 06** : exécuter D1 (ménage Vercel) + D7 (DNS, garder MX) + D4 (alias email).
- **Dépt 03/04** : parité visuelle + calendrier inchangés.

---

## 🚀 DÉPLOIEMENT — 25 mai (GO Bruno)
- **Fait par le QG** : pages d'accès finalisées (clé **CAP2027**, responsive Android/Windows) + **script turnkey** `_DEPLOYER_LES_2_SITES.ps1` (déploie NAVLYS + Bruno, token en env, jamais en clair).
- **Réalité QG** : pas de token ni de CLI Vercel ni d'accès API ici (403) → le QG **ne peut pas pousser lui-même**. Le seul élément manquant = le **token Vercel de Bruno** (en variable d'env), que la sécurité interdit de coller en clair.
- **2 voies pour être en ligne, privé, tout de suite** :
  1. `$env:VT="<token>"` puis `powershell -ExecutionPolicy Bypass -File ._DEPLOYER_LES_2_SITES.ps1` → déploie les 2 sites. Aperçu : `navlys.com/acces` + `brunopartouche.com/acces.html` (clé CAP2027).
  2. **Vercel → Settings → Deployment Protection → Password = CAP2027** sur les 2 projets → sites entiers privés en 1 clic, public quand tu veux.
- **Sinon** : le Dépt 02 (qui a déjà le flux token 1 jour) exécute le déploiement aligné.
