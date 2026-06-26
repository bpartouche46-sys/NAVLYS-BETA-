# 🧭 CARTOGRAPHE — Mission #3 · Catalogue des hypothèses Perplexity
**🧭 Le Cartographe — Directeur de Recherche · Laboratoire NEXT GEN NAVLYS**
*Verrouillé le 28 mai 2026.*

---

## Préambule

Le package Perplexity importé en avril/mai 2026 contenait **un mélange d'hypothèses brutes** — certaines pertinentes scientifiquement, d'autres marketing pur. Mission #2 a déjà **invalidé** la principale ("cible +2 %/jour"). Le rôle de Mission #3 est de **trier le reste** et de **planifier la roadmap** de tests futurs.

> 🧭 *« Quand un pêcheur ramène une caisse de poissons mêlés, il ne jette pas la caisse — il sépare ce qui se mange, ce qui se rejette, et ce qu'il faut goûter avant de juger. »*

---

## Statuts de validation

| Symbole | Statut | Définition |
|---|---|---|
| ❌ | INVALIDÉE | Démontrée perdante par Cartographe Mission #1 ou #2 (preuve Sharpe < 0 OOS + IC95). |
| ⚠️ | EN COURS | Test partiel ; signal directionnel détecté mais pas confirmé walk-forward. |
| ✅ | VALIDÉE | Sharpe OOS > 0,5 + drawdown < benchmark + IC95 robuste (Mission #1). |
| 🔬 | À TESTER | Hypothèse plausible non encore exécutée — priorité roadmap. |
| 🛑 | INTERDITE | Viole G1 (martingale, leverage, perte non plafonnée) — pas même testée. |

---

## Catalogue (29 hypothèses extraites du package Perplexity)

### Bloc A — Stratégies actives directionnelles

#### A1. Cible "+2 %/jour" avec stop fixe / take fixe
- **Description** : sortir gagnant +2 % par jour sur portefeuille, stop −2 %, take +2 %, fenêtre intraday.
- **Statut** : ❌ **INVALIDÉE** (Cartographe Mission #2).
- **Preuves** : Sharpe OOS −5,49 ; DD −95,2 % ; capital 100 000 € → 4 810 €.
- **Pertinent pour** : aucun profil.
- **Coût implémentation** : déjà payé (Mission #2).
- **Priorité roadmap** : 0 (clôturée, ne pas relancer sauf nouvelle famille de paramètres très différente).

#### A2. Momentum Donchian 20/55 (ETF + actions large cap)
- **Description** : entrée breakout haut 20j, sortie cassure bas 20j, taille fixe.
- **Statut** : ✅ **VALIDÉE** (Cartographe Mission #1).
- **Pertinent pour** : Profils 2, 3, 5, 6.
- **Coût implémentation** : faible (déjà code Python + signal NAVLYS).
- **Priorité roadmap** : ⭐ déjà en production pédagogique.

#### A3. Stat-arb paires sectorielles (z-score 2σ)
- **Description** : long-short de paires d'actions du même secteur avec écart > 2σ historique.
- **Statut** : ✅ **VALIDÉE** (Cartographe Mission #1).
- **Pertinent pour** : Profils 3, 6.
- **Coût implémentation** : moyen (besoin de data daily multi-tickers).
- **Priorité roadmap** : ⭐ déjà en production pédagogique.

#### A4. Mean reversion intraday RSI<30 / RSI>70
- **Description** : achat si RSI<30 + retournement chandelier, sortie RSI>50.
- **Statut** : ⚠️ **EN COURS** (signal directionnel positif sur SPY, fragile sur BTC).
- **Pertinent pour** : Profil 6 (à confirmer Mission #4).
- **Coût implémentation** : faible.
- **Priorité roadmap** : #3.

#### A5. ATR-ranked momentum (top 5 % momentum / ATR)
- **Description** : ranking quotidien momentum / ATR, long top 5 %, équipondéré.
- **Statut** : ⚠️ **EN COURS** (premiers tests Mission #1, Sharpe rolling instable).
- **Pertinent pour** : Profil 6.
- **Coût implémentation** : moyen.
- **Priorité roadmap** : #5.

#### A6. Pairs trading crypto BTC/ETH ratio
- **Description** : exploitation du ratio ETH/BTC quand il s'éloigne de sa moyenne 90j.
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : Profils 3, 6 (poche crypto).
- **Coût implémentation** : moyen (data CCXT).
- **Priorité roadmap** : #7.

---

### Bloc B — Stratégies basées sur le sentiment / news

#### B1. News sentiment NLP (FinBERT)
- **Description** : score sentiment quotidien sur les news des tickers détenus, entrée si > +0,5σ.
- **Statut** : ⚠️ **EN COURS** (Cartographe Cartographie n°1 indique : sentiment précède parfois mais bruit énorme).
- **Pertinent pour** : Profil 6.
- **Coût implémentation** : élevé (API + FinBERT modèle).
- **Priorité roadmap** : #4.

#### B2. Insider trades (Form 4) opportunistic buying
- **Description** : achat sur signal SEC Form 4 d'achats d'initiés opportunistes (≠ exercice options).
- **Statut** : ⚠️ **EN COURS** (Cartographie n°1 cité comme top 5 prédictif littérature).
- **Pertinent pour** : Profil 6.
- **Coût implémentation** : faible (API SEC EDGAR).
- **Priorité roadmap** : ⭐ #1 (priorité #1 Mission #4).

#### B3. Options flow unusual activity
- **Description** : détection volumes anormaux options call/put, achat sous-jacent.
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : Profil 6.
- **Coût implémentation** : élevé (data options niveau pro).
- **Priorité roadmap** : #8.

#### B4. Twitter/X social sentiment
- **Description** : score volumique tweets cashtags.
- **Statut** : 🔬 **À TESTER** mais Cartographe noté : **risque manipulation forte** (memecoins, pumps).
- **Pertinent pour** : aucun pour l'instant (trop bruité retail).
- **Priorité roadmap** : #15 (basse).

---

### Bloc C — Stratégies macro / cross-asset

#### C1. VIX overnight + ES futures
- **Description** : entrée long SPY si VIX overnight chute > −10 % + futures positifs.
- **Statut** : ⚠️ **EN COURS** (Cartographie n°1 cite VIX dans top 5).
- **Pertinent pour** : Profil 6.
- **Coût implémentation** : faible (data publique).
- **Priorité roadmap** : #6.

#### C2. Gap d'ouverture > 1σ
- **Description** : trade dans le sens du gap si > 1σ historique 60j.
- **Statut** : ⚠️ **EN COURS** (Cartographie n°1 top 5 prédictif).
- **Pertinent pour** : Profil 6.
- **Coût implémentation** : faible.
- **Priorité roadmap** : #2 (Cartographie n°3 prévue 15 juillet 2026).

#### C3. Order Flow Imbalance (OFI) carnet d'ordres
- **Description** : pression bid/ask, signal pre-market.
- **Statut** : ⚠️ **EN COURS** (Cartographie n°1 top 5).
- **Pertinent pour** : aucun retail (coût latence rédhibitoire).
- **Priorité roadmap** : #20 (pour mémoire pédagogique).

#### C4. Yield curve slope (10y-2y) signal récession
- **Description** : entrée defensive si courbe inversée > 6 mois.
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : tous profils (rotation defensive).
- **Coût implémentation** : faible (FRED).
- **Priorité roadmap** : #9.

#### C5. Dollar Index (DXY) → émergents
- **Description** : long émergents si DXY baisse > 5 % sur 60j.
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : Profils 3, 5, 6.
- **Priorité roadmap** : #11.

---

### Bloc D — Stratégies allocation / multi-asset

#### D1. Risk parity 60/40 dynamique
- **Description** : ajustement quotidien 60/40 selon vol réalisée.
- **Statut** : ✅ **VALIDÉE** (référence Bridgewater / FRED long terme).
- **Pertinent pour** : Profils 1, 2, 5.
- **Coût implémentation** : faible.
- **Priorité roadmap** : ⭐ déjà intégré dans les allocations cibles M3.

#### D2. Permanent Portfolio (25/25/25/25 actions/or/cash/oblig)
- **Description** : Harry Browne.
- **Statut** : ⚠️ **EN COURS** (à benchmarker contre 60/40).
- **Pertinent pour** : Profils 1, 5.
- **Priorité roadmap** : #12.

#### D3. All-Weather Bridgewater simplifié
- **Description** : 30/40/15/7,5/7,5 (actions/oblig long/oblig moyen/or/commodities).
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : Profils 1, 6.
- **Priorité roadmap** : #13.

#### D4. Golden Butterfly (5 buckets égaux)
- **Description** : Tyler / Portfolio Charts.
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : Profils 1, 2, 5.
- **Priorité roadmap** : #14.

---

### Bloc E — Stratégies systématiquement INTERDITES (G1)

#### E1. Martingale (doublage de mise après perte)
- **Statut** : 🛑 **INTERDITE** (G1).
- **Preuve** : Monte Carlo 10 000 simulations, probabilité de ruine asymptotique = 100 %.

#### E2. Moyenne baisse sur thèse cassée
- **Statut** : 🛑 **INTERDITE** (G1).
- **Preuve** : étude 2008, 2022 crypto winter.

#### E3. Anti-martingale (grossir mise pour rattraper retard)
- **Statut** : 🛑 **INTERDITE** (G1).

#### E4. Grid trading agressif non-borné
- **Statut** : 🛑 **INTERDITE** (variante de moyennes répétées sans plafond).

#### E5. Leverage > 1× ou produits dérivés à perte non plafonnée
- **Statut** : 🛑 **INTERDITE** pour tous profils retail.

---

### Bloc F — Hypothèses pédagogiques

#### F1. Reproduction du backtest Perplexity "+2%/jour"
- **Description** : reproduire pour MONTRER l'invalidation au grand public.
- **Statut** : ✅ **VALIDÉE COMME OUTIL PÉDAGOGIQUE** (déjà disponible workbook Excel Mission #2).
- **Pertinent pour** : Profil 7 (apprentissage).
- **Priorité** : déjà en ligne.

#### F2. Reproduction historique 2008 stress test
- **Description** : appliquer chaque allocation profil à la crise 2008.
- **Statut** : 🔬 **À TESTER** Mission #3 livrable 6.
- **Pertinent pour** : tous profils (transparence pédagogique).
- **Priorité** : #10.

#### F3. Reproduction historique 2020 COVID stress
- **Description** : appliquer chaque allocation profil au crash mars 2020.
- **Statut** : 🔬 **À TESTER** Mission #3 livrable 6.
- **Pertinent pour** : tous profils.
- **Priorité** : #16.

#### F4. Reproduction historique 2022 inflation + rate hike
- **Description** : appliquer chaque allocation à 2022 (60/40 perdant).
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : tous profils.
- **Priorité** : #17.

#### F5. Test "frais" — l'impact des frais de courtage 0,5 %/an vs 0,1 %/an
- **Description** : démonstration pédagogique compounding frais.
- **Statut** : 🔬 **À TESTER**.
- **Pertinent pour** : tous profils.
- **Priorité** : #18.

---

## Synthèse roadmap Cartographe Mission #4+

### TOP 3 hypothèses prioritaires (à tester en Mission #4)
1. **B2 — Insider trades opportunistic buying** : data publique SEC, signal top 5 littérature, coût faible.
2. **C2 — Gap d'ouverture > 1σ** : déjà programmé Cartographie n°3 (15 juillet 2026).
3. **A4 — Mean reversion RSI** : confirmation walk-forward sur SPY.

### TOP 3 hypothèses **secondaires** (Mission #5 ou #6)
4. **B1 — News sentiment FinBERT**
5. **A5 — ATR-ranked momentum**
6. **C1 — VIX overnight + ES**

### TOP 3 stratégies allocation à tester en backtest historique
7. **D2 — Permanent Portfolio**
8. **D3 — All-Weather Bridgewater**
9. **D4 — Golden Butterfly**

---

## Carte synthèse — Pour quelle famille de profils chaque hypothèse compte

| Hypothèse | P1 | P2 | P3 | P4 | P5 | P6 | P7 |
|---|---|---|---|---|---|---|---|
| A1 +2%/jour ❌ | — | — | — | — | — | — | éducatif |
| A2 Donchian ✅ | ❌ | ✓ | ✓ | — | ✓ | ✓ | ✓ |
| A3 Stat-arb ✅ | ❌ | — | ✓ | — | — | ✓ | ✓ |
| A4 RSI ⚠️ | ❌ | — | — | — | — | ? | ✓ |
| A5 ATR-ranked ⚠️ | ❌ | — | — | — | — | ? | ✓ |
| B2 Insider 🔬 | ❌ | — | ? | — | — | ? | ✓ |
| C2 Gap ⚠️ | ❌ | — | — | — | — | ? | ✓ |
| D1 Risk parity ✅ | ✓ | ✓ | — | — | ✓ | — | ✓ |

---

## Sortie pour app NAVLYS

Cette table est exposée dans l'app NAVLYS section **Laboratoire NEXT GEN > Bibliothèque d'hypothèses**, avec filtres :
- Statut (validée / en cours / invalidée / à tester / interdite)
- Profil concerné
- Coût d'implémentation
- Date du dernier test

Toutes les invalidations sont publiques. C'est la marque de fabrique du Laboratoire.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
