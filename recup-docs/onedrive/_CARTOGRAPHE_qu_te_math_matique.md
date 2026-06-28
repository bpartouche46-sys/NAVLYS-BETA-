# 🧭 LA QUÊTE MATHÉMATIQUE — Cartographie n°3
**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS**
*Méthodologie de recherche systématique · v1.0 · 28 mai 2026*

> *« Quelle combinaison de signaux maximise le rendement intraday espéré, sous contrainte G1 et frais réalistes ? »*
> Cette quête applique cinq familles de modèles (OLS, Ridge, Lasso, Random Forest, XGBoost, LightGBM, MLP simple) aux 30 facteurs de l'Atlas, sur trois univers (SPY, BTC, top 10 NASDAQ), sur la fenêtre 2020-2025, en walk-forward strict.
>
> ⚠️ **Cadre G1 maintenu.** Quelles que soient les performances trouvées, elles seront publiées comme résultats expérimentaux historiques avec disclaimer. Pas de promesse de rendement futur. Aucun "système" commercial.

---

## I. CADRE EXPÉRIMENTAL

### Univers testés
- **SPY** (ETF S&P 500) — actif de référence retail.
- **BTC-USD** — actif 24/7, volatilité élevée, marché jeune.
- **Top 10 NASDAQ** : AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA, AVGO, COST, NFLX.

### Fenêtre
2020-01-01 → 2025-12-31 (≈ 1 510 séances ouvrées NYSE, ≈ 2 192 jours BTC).

### Découpage walk-forward
- Apprentissage glissant 504 jours (≈ 2 ans).
- Test forward 21 jours (≈ 1 mois).
- Pas de look-ahead : tout feature `X_t` doit être disponible **avant** 9:30 ET du jour `t`.

### Cible
Rendement journalier open→close ajusté pour dividendes/splits (Yahoo Finance "Adj Close").

### Features (30 facteurs prioritaires sélectionnés depuis l'Atlas)

| # | Famille | Feature |
|---|---|---|
| 1 | Macro | jour FOMC (binaire) |
| 2 | Macro | jour CPI/NFP (binaire) |
| 3 | Macro | OPEX (3ᵉ vendredi) |
| 4 | Macro | jour-de-semaine (one-hot) |
| 5 | Gap | gap_pct (open / close_prev) |
| 6 | Gap | gap_z (gap normalisé volatilité 20j) |
| 7 | Gap | premarket_volume_z |
| 8 | Gap | premarket_high_low_range_pct |
| 9 | Technique | RSI_5j |
| 10 | Technique | ADX_14j |
| 11 | Technique | distance_VWAP_5j (%) |
| 12 | Technique | distance_SMA_50j (%) |
| 13 | Technique | distance_SMA_200j (%) |
| 14 | Options | put_call_ratio_J-1 (CBOE) |
| 15 | Options | VIX_close_J-1 |
| 16 | Options | VIX_change_J-1 |
| 17 | Options | skew_index_J-1 |
| 18 | Microstructure | volatilité_réalisée_5j |
| 19 | Microstructure | volatilité_réalisée_20j |
| 20 | Microstructure | volume_z_20j |
| 21 | Sentiment | news_count_24h |
| 22 | Sentiment | news_sentiment_NLP (proxy : VADER sur titres Yahoo Finance, gratuit) |
| 23 | Sentiment | insider_buy_sell_ratio_30j |
| 24 | Sentiment | short_interest_pct_J-1 |
| 25 | Cross-asset | DXY_change_J-1 |
| 26 | Cross-asset | US10Y_change_J-1 |
| 27 | Cross-asset | OIL_change_J-1 |
| 28 | Cross-asset | GOLD_change_J-1 |
| 29 | Cross-asset | BTC_change_overnight (pour US stocks) |
| 30 | Cross-asset | Nikkei_change_overnight |

---

## II. MODÈLES TESTÉS

1. **OLS** — régression linéaire baseline.
2. **Ridge (α tuned via CV)** — pour gérer la colinéarité.
3. **Lasso (α tuned)** — pour la sélection de features.
4. **Elastic Net** — compromis Ridge/Lasso.
5. **Random Forest** (n=200, max_depth=8) — non-linéarités, interactions.
6. **XGBoost** (early stopping CV).
7. **LightGBM** (équivalent).
8. **MLP simple** : [30 → 16 → 8 → 1], ReLU, dropout 0,3, early stop. Pas de LSTM/Transformer : trop de paramètres pour le bruit du dataset.

### Bayesian / autres
9. **Modèle Bayésien naïf** — baseline interprétable.
10. **Régression isotonique** + bracket des features ordinales — pour benchmark non-paramétrique.

---

## III. MÉTRIQUES OPTIMISÉES

| Métrique | Définition | Objectif Cartographe |
|---|---|---|
| Sharpe ratio | (μ_quotidien × √252) / σ_quotidien | > 1,0 pour valider |
| Rendement annualisé | (1 + Σr)^(252/N) − 1 | Comparé au buy-and-hold |
| Max drawdown | min(equity_curve / cummax(equity_curve)) − 1 | < −20 % pour valider |
| Calmar | rendement_annualisé / |max_DD| | > 0,5 pour valider |
| % jours rentables | n_jours_positifs / N | > 53 % pour valider |
| Profit factor | Σ gains / |Σ pertes| | > 1,4 |
| Turnover | Σ |Δposition| / N | Pour estimer frais |
| Information Coefficient | corr_rang(prédiction, réalisation) | > 0,03 robuste |

### Frais & slippage modélisés
- Commission : 0 (Interactive Brokers tiered ou Robinhood pour SPY).
- Spread/slippage : 0,02 % par trade aller-retour pour SPY, 0,05 % pour BTC, 0,03 % pour mega-caps NASDAQ.
- Taxes : non modélisées (dépend juridiction utilisateur).

---

## IV. RÉSULTATS ATTENDUS — Frontière théorique

### Ce que la littérature laisse anticiper

Selon la méta-analyse McLean & Pontiff (2016) et la pratique des fonds quantitatifs publiquement documentés (AQR, Two Sigma, Renaissance Medallion via Zuckerman 2019) :

| Scénario | Sharpe net réaliste | Probabilité d'atteinte (jugement Cartographe) |
|---|---|---|
| Modèle linéaire simple, retail data | 0,2 - 0,6 | Forte |
| Modèle non-linéaire + bonnes features, retail | 0,4 - 1,0 | Modérée |
| Modèle non-linéaire + premium data (Bloomberg, OptionMetrics) | 0,8 - 1,5 | Modérée |
| Modèle institutionnel haut de gamme | 1,5 - 3,0 | Faible (Medallion est l'exception ≈ 7) |

**Avertissement Cartographe** : un Sharpe > 2,0 net out-of-sample sur SPY 2020-2025 avec des features publiques retail serait **un signal d'overfit massif**, pas une découverte. Le Cartographe rejettera tout résultat tel quel sans audit walk-forward et test de robustesse Monte Carlo.

### Hypothèse de travail honnête

Mon pronostic ex-ante (à confirmer par exécution réelle) :
- **SPY 2020-2025** : Sharpe net out-of-sample probable **0,4 à 0,9**. Rendement annualisé probable **+3 à +8 %** au-dessus du SPY buy-and-hold, **MAIS** avec drawdowns intermédiaires similaires.
- **BTC 2020-2025** : Sharpe brut potentiel plus élevé (volatilité plus haute), mais frais et slippage 24/7 mangent une partie. Sharpe net probable **0,3 à 0,8**.
- **Top 10 NASDAQ ensemble** : Sharpe panier proche du SPY, +30 % de variance.

Si ces fourchettes se confirment : **le Cartographe publie ces résultats comme cadre honnête**. Ce n'est ni Medallion (Sharpe 7), ni une martingale magique, mais c'est non-trivial et reproductible. Si les résultats sont inférieurs au buy-and-hold (probable sur frais réalistes) : **publication intégrale comme invalidation utile**.

---

## V. PROTOCOLE D'EXÉCUTION

### Phase 1 — Construction du dataset
1. Téléchargement Yahoo Finance via `yfinance` (OHLCV + Adj Close).
2. Téléchargement FRED via `pandas_datareader` (DXY, US10Y, OIL_WTI, GOLD).
3. Téléchargement CBOE (VIX, P/C ratio, skew) via fichiers CSV publics.
4. Construction features (30) en respectant la règle "ne jamais utiliser une info ≥ 9:30 ET du jour J pour prédire J".
5. Stockage parquet pour reproductibilité.

### Phase 2 — Backtests modulaires
1. Pour chaque modèle (10), chaque actif (12 = SPY + BTC + 10 NASDAQ), chaque fenêtre walk-forward :
   - Fit sur 504 j, prédire 21 j, glisser, recommencer.
2. Conserver `y_pred` aligné `y_true` sur tout l'échantillon test.
3. Construire la signal : `position_t = sign(y_pred_t) × |y_pred_t| / scaling` (cap à ± 1).
4. Calculer P/L net de frais.

### Phase 3 — Audit anti-overfit
1. Bootstrap des séquences temporelles (Politis-Romano stationary bootstrap, b=20).
2. Test White Reality Check (1 000 simulations) sur Sharpe — p-value < 0,05 requise.
3. Test Hansen SPA pour multi-modèles.
4. Feature shuffling : si Sharpe ne tombe pas significativement avec features randomisées → l'avantage est du bruit.

### Phase 4 — Sélection finale
Modèle retenu = celui qui :
- A le meilleur Sharpe out-of-sample SUR L'ENSEMBLE DES UNIVERS (pas seulement SPY).
- Survit aux 4 tests anti-overfit avec p < 0,05.
- A < 8 features sélectionnées (Lasso) pour parcimonie.
- A un turnover < 100 trades/an pour des frais maîtrisés.

### Phase 5 — Publication honnête
- Publication intégrale des notebooks Jupyter.
- Publication des équity curves brutes et nettes.
- Publication des fenêtres où le modèle a perdu (drawdowns).
- Disclaimer G1 omniprésent.

---

## VI. CODE D'IMPLÉMENTATION

Le script `cartographe_combinaisons.py` (ci-dessous, fourni séparément) implémente :
- Téléchargement des données (yfinance, pandas_datareader).
- Construction des 30 features.
- Walk-forward avec 10 modèles.
- Calcul des métriques.
- Export résultats CSV + plots PNG.

⚠️ **Important** : le script est exécutable en local mais nécessite ~ 30-90 min selon machine. Le Cartographe livre le code aujourd'hui, exécute le batch complet dans une phase suivante (Bruno aura les résultats numériques au plus tard sous 5 jours). Les chiffres publiés dans le rapport public (`_CARTOGRAPHE_premier_rapport_public.md`) sont des **estimations ex-ante** clairement étiquetées comme telles tant que l'exécution réelle n'est pas faite.

---

## VII. CALENDRIER D'EXÉCUTION

| Étape | Délai | Sortie |
|---|---|---|
| Spec & code (ce document) | J0 (28 mai 2026) | `_CARTOGRAPHE_quête_mathématique.md` + `cartographe_combinaisons.py` |
| Exécution dataset SPY | J+2 | `cartographe_results_SPY.csv` |
| Exécution dataset BTC | J+3 | `cartographe_results_BTC.csv` |
| Exécution dataset NASDAQ-10 | J+5 | `cartographe_results_NASDAQ.csv` |
| Audit anti-overfit | J+7 | `cartographe_audit_report.md` |
| Publication grand public | J+10 | Mise à jour de `_CARTOGRAPHE_premier_rapport_public.md` avec chiffres réels |

---

## VIII. DISCLAIMER FINAL

> 🧪 *Cette quête mathématique est un protocole de recherche scientifique appliqué à la prédiction de mouvements de marché historiques. Toute performance affichée correspond à des simulations sur données passées, frais et slippage modélisés. **Aucun rendement futur n'est garanti.** Performances passées ≠ performances futures. NAVLYS et Bruno Mark Partouche ne sont pas conseillers en investissement. Toute décision d'investissement reste personnelle.*

---

🧪 *LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ*
**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS**
