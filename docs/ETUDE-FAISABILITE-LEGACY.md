# 🔬 Étude de faisabilité — éléments « legacy » NAVLYS
*Décision Bruno n°6 (2026-06-26) : étudier la faisabilité réelle AVANT d'archiver/revaloriser. Aucun fichier supprimé.*

> Méthode : pour chaque élément legacy signalé par l'ULTRAREVIEW, on évalue **ce que c'est**,
> sa **faisabilité** (juridique / technique / business), le **conflit éventuel** avec la doctrine
> actuelle, puis une **recommandation** (revaloriser / adapter / archiver). Décision finale = Bruno.

---

## 1. Modèle de monétisation « ORIAS / apport d'affaires » (`05_MONETISATION__2.md`)

- **Ce que ça propose** : NAVLYS toucherait des **commissions d'intermédiation** (banques/assurances) sous **cadre ORIAS** (IOBSP/IAS), en « apport d'affaires » — au lieu du modèle publisher/affiliation CPA actuel.
- **Faisabilité juridique** : ⚠️ **possible mais lourd.** Exige l'**inscription ORIAS** (capacité professionnelle, honorabilité, **RC pro**, formation continue) → c'est un **métier réglementé distinct**. Sans inscription, percevoir ces commissions = **intermédiation illégale (pénal FR)**.
- **Conflit** : **frontal** avec (a) la doctrine canonique « NAVLYS = média publisher, **PAS ORIAS** » et (b) la **dépersonnalisation**. Mélanger les deux dans **la même entité** = risque pénal + confusion réglementaire.
- **Business** : commission d'apport potentiellement **plus élevée par conversion** que l'affiliation CPA, **mais** coût de conformité élevé + **responsabilité personnelle** du dirigeant.
- **Reco** : 🟥 **NE PAS mélanger à NAVLYS-média.** Deux options propres :
  1. **Abandonner** (défaut actuel) → le spec `__2` reste **VOID/obsolète** (déjà banni).
  2. **Plus tard, si Bruno le veut** : créer une **entité SÉPARÉE inscrite ORIAS**, **mur étanche** avec NAVLYS média. → **décision stratégique majeure réservée à Bruno + avocat** (pas dans le périmètre BETA).

## 2. `MARTINGALE_SCIENTIFIQUE_PACK` (+ noms « MARTINGALE » résiduels)

- **Ce que c'est** : référentiel martingale + présentation 5 écrans.
- **Faisabilité comme PRODUIT de stratégie** : ❌ **non.** La martingale est **invalidée** (probabilité de ruine → 100 %). La proposer = non-conforme + dangereux.
- **Faisabilité comme CONTENU ÉDUCATIF de débunk** : ✅ **oui — et c'est déjà la voie du Cartographe / Labo NEXT GEN** (« on publie les invalidations »). Forte valeur **SEO + crédibilité** (différenciant honnête).
- **Reco** : 🟩 **Garder uniquement en contenu éducatif de débunk**, intégré au Labo. **Renommer** pour retirer toute ambiguïté « stratégie » (ex. `DOSSIER-MARTINGALE-POURQUOI-CA-ECHOUE`). Archiver les variantes présentées comme « pack stratégie ».

## 3. `FORMULES_v1` → `v6`

- **Ce que c'est (vérifié ULTRAREVIEW)** : des **grilles de PRIX NAVBIO** successives — **pas** des moteurs de calcul financier (la fausse alerte « formule CAGR obsolète » a été levée).
- **Faisabilité** : ✅ **triviale.** Il suffit de **désigner la version canonique** (alignée sur `01_MATRICE_PRICING_OFFICIELLE.md`) et d'archiver les autres.
- **Reco** : 🟩 Canonique = **matrice pricing officielle** ; archiver `FORMULES_v1-v6` dans `_ARCHIVE/` (zéro suppression).

---

## ✅ Synthèse — décisions à prendre (Bruno), par élément

| Legacy | Faisable ? | Recommandation | Décision Bruno |
|---|---|---|---|
| **ORIAS / apport d'affaires** | Oui mais entité séparée + lourd | **Abandonner pour NAVLYS** (ou entité ORIAS distincte plus tard) | ⏳ stratégique (+ avocat) |
| **Martingale** | Oui en débunk éducatif seulement | **Garder en contenu Labo, renommer** ; archiver le « pack stratégie » | ⏳ |
| **FORMULES_v*** | Oui (juste des prix) | **Archiver, garder la matrice pricing** | ⏳ |

> 🔒 Tant que Bruno n'a pas tranché : **rien n'est supprimé**, le spec ORIAS reste **banni/VOID**, et on ne propose **aucun produit martingale-stratégie**. Cette étude répond à la décision 6 (« étudier la faisabilité »).
