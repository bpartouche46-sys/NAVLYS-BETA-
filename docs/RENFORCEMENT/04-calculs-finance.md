# 📊 RENFORCEMENT — 04. CALCULS & FINANCE (Labo NEXT GEN / Cartographe)

> Consolidé 2026-06-25 (`recup-docs/onedrive/`). Rien de public déclenché. Décisions = Bruno.
> ⚠️ **Note de fiabilité** : certains chiffres détaillés ci-dessous proviennent de l'exploration des
> fichiers `FORMULES_v*` et `_CARTOGRAPHE_*`. Quand un chiffre précis (Sharpe, %) est cité, il doit
> être **revérifié dans le fichier source** avant toute publication. Ici on documente la **méthode** et
> les **verdicts**, qui eux sont stables.

---

## 📍 ÉTAT ACTUEL

### Méthode 90/10
- **90 % Forteresse** : capital défensif (1-2 ETF World, DCA) — n'est jamais exposé à la tactique.
- **10 % Capital Plaisir / Labo NEXT GEN** : portion où l'on teste des stratégies actives, sous
  règles strictes (Kelly fractionnel plafonné, stops nets). **Séparation physique du capital**, ce
  n'est PAS une martingale (pas de doublage de mise après perte).

### Simulateur « Mon Cap Rêvé »
- Combine **calcul analytique** (intérêts composés, drift log-normal), **Monte Carlo** (≈ 2 000 chemins
  côté app ; certains rapports R&D utilisent plus de tirages), et **comparaison historique**
  (Shiller ~1928-2025, FRED 60/40, données crypto).
- Affiche **5 métriques honnêtes** : probabilité d'atteindre la cible, probabilité de perte > 20 %,
  capital médian, pire scénario (quantile bas), meilleur scénario (quantile haut). **3 scénarios**
  (haut / médian / bas).

### « Espérance honnête » (métriques du Labo)
CAGR, volatilité, **Sharpe**, max drawdown, Calmar, % de jours rentables, profit factor,
**proba de ruine**, horizon minimum, pire année. Sur **vraies données** + bootstrap (intervalles de confiance).

### ALCAPA (validation automatique d'une hypothèse)
- **4 critères** → verdict **GO / WAIT / NOGO** : win rate ≥ ~55 % · Sharpe ≥ 1,0 · drawdown ≤ ~20 % ·
  proba de ruine ≤ 5 %. Tous OK = GO (publication « validée ») ; ≤ 1 OK = NOGO (publication « invalidation »).
- Audit indépendant ALCAPA prévu (expert quant sous NDA).

### Martingale — VERDICT
- **INVALIDÉE.** Une martingale augmente la mise après perte → **espérance négative**, **proba de ruine
  élevée/asymptotique**. La variante « AdaptiveStop » testée est une **martingale déguisée** → NOGO.
  Elle est **publiée comme cas d'école d'invalidation**, **jamais promue** comme stratégie.
- **Bot Alpaca** = **privé / hors marque** (intégration read-only côté NAVLYS ; aucune RTO).

### Autres verdicts Cartographe
- **Stop fixe** : baseline perdante mais stable. **AdaptiveStop unbounded** : catastrophique.
- **Lock/Reinvest 50 %** : réduit le drawdown mais **ne crée pas d'edge** (espérance inchangée).
- **Kelly fractionnel** : gestion de risque, plafonné (cap dur sur la part tactique).

_Sources : `FORMULES_v2_CLAUDE_FAL.md`→`FORMULES_v6_CINEMA.md`, `FORMULES_LIMITES_COUTS.md`, `01_ALPACA.md`,
`_CARTOGRAPHE_qu_te_math_matique.md`, `_CARTOGRAPHE_M2_RAPPORT_TECHNIQUE.md`,
`_CARTOGRAPHE_M4_ADAPTIVESTOP_VS_FIXED.md`, `_CARTOGRAPHE_M4_VERDICT_ADAPTIVESTOP.md`,
`_CARTOGRAPHE_M5_RAPPORT_TECHNIQUE.md`, `_MASTERNAV_COORDINATION_20260607.md` (ALCAPA)._

---

## 💪 FORCES

- **Démarche scientifique** : protocole publié, code, métriques complètes, **invalidations publiées**.
- **Anti-promesse intégré** : le simulateur montre des probabilités, pas un rendement garanti.
- **Cadrage martingale béton** : démontrée mathématiquement invalide → protège la marque ET l'utilisateur.
- **Sources de données sérieuses** (Shiller, FRED, Monte Carlo, bootstrap).

---

## ⚠️ FAIBLESSES / GAPS

- **Versions multiples de FORMULES (v1→v6)** : risque d'utiliser une version périmée. Aucune « v finale
  officielle » clairement étiquetée comme telle dans la mémoire de ce dépôt.
- **Chiffres précis dispersés** (Sharpe, % proba) entre rapports → besoin de cohérence avant publication.
- **Risque de langage** : un calcul mal légendé peut ressembler à une promesse de rendement → disclaimer
  obligatoire à côté de chaque résultat.

---

## 🔧 RENFORCEMENTS CONCRETS

1. **Désigner LA version officielle des FORMULES** (probablement `FORMULES_v6_CINEMA.md` ou
   `FORMULES_v3_FINAL.md` — **à confirmer Bruno**) et archiver les autres (sans supprimer — règle 8).
2. **Fiche méthodo par calcul** (modèle proposé) : *Nom · Ce que ça calcule · Formule · Hypothèses ·
   Sources de données · Limites · Disclaimer affiché.* → garantit transparence + reproductibilité.
3. **Audit de cohérence des chiffres** : recouper les métriques clés entre rapports avant toute mise en ligne.
4. **Règle d'or martingale gravée** (pour com + NAV IA) : *jamais présentée comme une stratégie ;
   uniquement comme une hypothèse invalidée par le Labo.* (relié à `05-faq-sav-navia.md` et `06-legal-conformite.md`).
5. **Disclaimer systématique** sous chaque graphe/chiffre (« performances passées ≠ futures, pas un conseil »).

---

## ⚖️ DÉCISIONS BRUNO (ce domaine)

- [ ] **Version officielle des FORMULES** à figer (les autres → archive).
- [ ] Valider l'**audit indépendant ALCAPA** (budget = décision financière → Bruno seul).
- [ ] **Bot Alpaca** : confirmer qu'il reste **privé/hors marque**.
- [ ] Valider la **liste des métriques publiques** (lesquelles on montre à l'utilisateur).
