# 🧪 BACKTEST LIBRE — Moteur du Laboratoire NEXT GEN de recherche NAVLYS
*Verrouillé le 28 mai 2026. Compagnon de `_CAP_TACTIQUE_strategies.md`.*

> 🧪 **Outil du Laboratoire NEXT GEN.** Le moteur de backtest libre est l'**instrument central** du Laboratoire. Il permet à l'utilisateur de **rejouer** les hypothèses validées (et invalidées) sur les données historiques, et de **tester ses propres hypothèses** dans un cadre scientifique transparent.

---

## 1. Philosophie du moteur

**Trois exigences non négociables** :

1. **Anti-look-ahead.** Aucune information future n'est jamais utilisée pour décider d'une entrée/sortie au temps t. Le moteur shifte les signaux d'une bougie.
2. **Walk-forward.** Les paramètres optimisés sur 2020-2022 sont validés sur 2023-2025 (out-of-sample obligatoire). Pas de cherry-picking de fenêtre.
3. **Frais réalistes.** Slippage + commissions inclus par défaut. Pas de version « brute sans frais ».

---

## 2. Données

- **Actions / ETF** : `yfinance` (Yahoo Finance, gratuit, ~30 ans d'historique)
- **Crypto** : `ccxt` (Binance / Kraken, 5+ ans d'historique gratuit, OHLCV jour ou heure)
- **VIX et term structure** : `yfinance` (^VIX) + CBOE data publique
- **Fenêtre standard** : 2020-01-01 → 2025-12-31 (5 ans incluant COVID, bull 2021, bear 2022, bull 2023-24)

---

## 3. Métriques publiées dans chaque rapport

| Métrique | Définition |
|---|---|
| **CAGR** | (Capital_final / Capital_initial)^(1/années) − 1 |
| **Max drawdown** | min sur la trajectoire de (capital − plus_haut_glissant) / plus_haut_glissant |
| **Sharpe** | (rendement_annualisé − rf) / volatilité_annualisée |
| **Sortino** | (rendement_annualisé − rf) / volatilité_downside_annualisée |
| **Calmar** | CAGR / |Max drawdown| |
| **Win rate** | % trades fermés en gain |
| **Profit factor** | somme des gains / |somme des pertes| |
| **Expectancy** | (winrate × avg_win) − (1−winrate) × avg_loss |
| **Ulcer index** | √(moyenne des drawdowns²) |
| **vs Buy & Hold** | comparaison avec rendement passif buy & hold du benchmark |

---

## 4. Walk-forward analysis

Le moteur applique systématiquement :
- **Période in-sample** : 2020-01 → 2022-12 (3 ans, optimisation paramètres)
- **Période out-of-sample** : 2023-01 → 2025-12 (3 ans, validation)
- **Rejet automatique** : si métriques out-of-sample < 50 % des métriques in-sample, l'hypothèse est marquée *« sur-ajustée »* et publiée comme telle.

---

## 5. Stress tests obligatoires

Chaque hypothèse validée passe par trois stress tests :

1. **2008 GFC** : -57 % SPY peak-to-trough. La stratégie survit-elle ?
2. **2020 COVID crash** : -34 % en 33 jours. Comportement en crash éclair ?
3. **2022 crypto winter** : -76 % BTC. Robustesse sur classe d'actifs volatile ?

Verdict publié pour chaque stress test, sans nuance.

---

## 6. Les 4 hypothèses invalidées — Monte Carlo

Le Laboratoire publie systématiquement les résultats Monte Carlo (10 000 simulations) pour les 4 hypothèses populaires invalidées :

| # | Hypothèse | Cap. médian | Proba ruine >80 % | Plus longue série perdante |
|---|---|---|---|---|
| A | Doublage de mise (martingale) | -78 % | 91 % | 19 |
| B | Anti-martingale parabolique ×3 | -94 % | 96 % | n/a |
| C | Grid agressif sans stop | -71 % | 78 % | n/a |
| D | Moyenne à la baisse -10 % | -42 % | 64 % | n/a |

Chacune est exécutable par l'utilisateur via :
```bash
python backtest_engine.py --hypothesis martingale --seed 42 --nsim 10000
python backtest_engine.py --hypothesis anti_martingale --seed 42 --nsim 10000
python backtest_engine.py --hypothesis grid_aggressive --seed 42 --nsim 10000
python backtest_engine.py --hypothesis avg_down --seed 42 --nsim 10000
```

---

## 7. Disclaimer G1 systématique

Chaque rapport généré par `backtest_engine.py` inclut **automatiquement** en pied de sortie :

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Les résultats affichés sont issus de simulations sur données historiques. Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement (Bruno Mark Partouche n'est pas CIF/ORIAS). Toute décision d'investissement reste personnelle.*

**Friction réelle peut réduire la performance affichée** : slippage variable, commissions broker, fiscalité, biais comportemental (panique en drawdown).

---

## 8. Tester ta propre hypothèse dans le Laboratoire

Trois modes d'usage :

### Mode A — Hypothèse validée du catalogue
```bash
python backtest_engine.py --hypothesis swing_rv --ticker SPY --start 2020-01-01 --end 2025-12-31
```

### Mode B — Hypothèse invalidée (pédagogique)
```bash
python backtest_engine.py --hypothesis martingale --base SPY --nsim 10000
```

### Mode C — Hypothèse personnalisée
```bash
python backtest_engine.py --custom mon_hypothese.py
```
Le fichier `mon_hypothese.py` doit exposer une fonction :
```python
def signal(data: pd.DataFrame, t: int) -> int:
    """Retourne 1 (long), -1 (short), 0 (cash). Pas d'information future !"""
    ...
```

---

## 9. Limites honnêtes du moteur

Ce que le moteur **ne fait PAS** :
- ❌ Optimisation génétique aveugle (génère du sur-ajustement)
- ❌ Frais variables par jour (modèle simple, ~0,1-0,2 % aller-retour)
- ❌ Modélisation d'illiquidité sur tickers exotiques
- ❌ Modélisation comportementale (panique du trader)
- ❌ Promesse de réplication exacte du futur

Ce qu'il fait :
- ✅ Mesure honnête du passé
- ✅ Comparaison reproductible
- ✅ Stress tests systématiques
- ✅ Publication des échecs autant que des succès

---

## Références méthodo

- Bailey, Borwein, Lopez de Prado (2014). *Pseudo-Mathematics and Financial Charlatanism: The Effects of Backtest Overfitting on Out-of-Sample Performance.*
- Lopez de Prado, *Advances in Financial Machine Learning* (2018), chap. 11-13 backtest.
- Aronson, *Evidence-Based Technical Analysis* (2007).
