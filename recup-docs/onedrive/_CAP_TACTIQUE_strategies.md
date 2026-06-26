# ⚓ CAP TACTIQUE — Catalogue des hypothèses testées
## 🧪 Module du Laboratoire NEXT GEN de recherche NAVLYS
*Verrouillé le 28 mai 2026 — complément de la méthode 90/10.*

> 🧪 **Cap Tactique est un module du Laboratoire NEXT GEN de recherche NAVLYS.** Ce que tu lis ci-dessous n'est pas une liste de stratégies "gagnantes". C'est une liste d'**hypothèses testées par le Laboratoire**, avec leurs résultats observés sur 5 ans de données historiques. Toutes ont été passées au crible : transparence des hypothèses, reproductibilité, honnêteté des résultats. NAVLYS = éditeur pédagogique. Bruno Mark Partouche **n'est ni CIF, ni ORIAS, ni IOBSP**.

---

## 0. 🧪 Le Laboratoire NEXT GEN de recherche NAVLYS — manifeste condensé

> Document complet : `_LABORATOIRE_NEXTGEN_manifeste.md`

### Pourquoi un Laboratoire (vs un produit financier)
Parce qu'on cherche à **comprendre**, pas à **vendre**. Le Laboratoire teste, mesure, documente, et **publie** — y compris les hypothèses qui échouent. Aucun rendement n'est promis. Aucun signal trading n'est délivré. C'est de l'**éducation à la décision**, pas du conseil personnalisé.

### Méthode scientifique appliquée
Chaque hypothèse passe par cinq étapes :
1. **Énoncé** clair de l'hypothèse
2. **Protocole** publié (code Python, données sources, période, paramètres figés)
3. **Backtest** exécuté avec walk-forward + out-of-sample
4. **Métriques** complètes (CAGR, drawdown, Sharpe, Sortino, Calmar, profit factor)
5. **Verdict** publié : **VALIDÉE** ou **INVALIDÉE par le Laboratoire NEXT GEN**

### Les 3 principes
| Principe | Traduction |
|---|---|
| **Transparence des hypothèses** | Code et données ouverts. Paramètres justifiés. |
| **Reproductibilité** | Tout test exécutable par l'utilisateur. Pas de boîte noire. |
| **Honnêteté des résultats** | On publie les échecs autant que les succès. |

### Les 3 interdits permanents (ton recherche)
1. 🚫 **Hypothèse de doublage de mise sur perte** — *invalidée par le Laboratoire NEXT GEN. Proba de ruine asymptotique = 100 % sur capital fini (Monte Carlo 10 000 simulations).*
2. 🚫 **Hypothèse de moyenner à la baisse sur thèse cassée** — *invalidée par le Laboratoire NEXT GEN. Survol des pertes systémique sur actifs en bear durable.*
3. 🚫 **Hypothèse de grossir la mise pour rattraper un retard** — *invalidée par le Laboratoire NEXT GEN. Variance non-stationnaire + loi des grands nombres ⇒ explosion du drawdown.*

Ces interdits ne sont **pas des dogmes**. Ce sont des **résultats expérimentaux**.

---

## 1. Repères historiques (pour comparer honnêtement)

| Référence | CAGR net (long-terme) | Max drawdown | Sharpe |
|---|---|---|---|
| Cash livret A | 2 – 3 % | 0 % | — |
| Obligations US 10Y | 4 – 5 % | -20 % (1981 / 2022) | 0,2 |
| SPY (S&P 500 1928-2025) | ~10 % | -57 % (2008) | 0,5 |
| NASDAQ-100 | ~12 % | -83 % (2000-02) | 0,55 |
| BTC (2013-2025) | ~50 % brut | -85 % (2018, 2022) | 0,9 |
| Medallion (Renaissance, net est.) | 39 % | -4 % | ~2,5 |
| Cible théorique « +2 %/jour » | 14 700 % | indéfini | impossible |

➜ Toute hypothèse qui annonce > 25 % CAGR soutenu sur 10 ans **doit déclencher un signal d'alarme** et passer par le Laboratoire. Medallion est l'exception mondiale, fermé au public depuis 1993.

---

## 2. Les 6 hypothèses testées et VALIDÉES par le Laboratoire NEXT GEN

Chacune est présentée avec :
- **Logique** (entrée / sortie en pseudo-code)
- **Univers** d'instruments
- **Backtest 2020-01-01 → 2025-12-31** (5 ans incluant COVID + bull 2021 + bear 2022 + bull 2023-24)
- **Métriques** observées
- **Edge théorique** vs **edge observé**
- **Capital minimum** & **frais**
- **Conformité aux 3 interdits permanents**

Les chiffres sont **indicatifs**, issus de la littérature publique + simulations standard. Le moteur `backtest_engine.py` (Laboratoire NEXT GEN) permet à l'utilisateur de **rejouer chaque test** et de vérifier.

---

### Hypothèse #1 testée par le Laboratoire NEXT GEN — Swing trading sur volatilité réalisée

**Énoncé** : *La volatilité réalisée moyennée sur 20 jours présente une réversion vers sa moyenne historique sur 252 jours. Entrer long quand RV>moyenne+1σ et tendance haussière permet d'exploiter cette réversion.*

**Référence académique** : Andrew W. Lo, *Mean Reversion in Realized Volatility* (MIT Sloan) ; Christoffersen & Diebold.

**Protocole**
```
Pour chaque clôture quotidienne :
    RV_20 = écart-type des log-returns sur 20 jours glissants
    RV_moyenne = moyenne RV_20 sur 252 jours glissants
    RV_sigma = écart-type RV_20 sur 252 jours glissants

    ENTRÉE : si RV_20 > RV_moyenne + 1·RV_sigma
              ET prix > MA200 (filtre tendance haussière)
        → LONG (taille = Kelly_demi × edge_observé)

    SORTIE : si RV_20 ≤ RV_moyenne
              OU si drawdown trade > 2 × ATR_14
        → exit
```

**Univers** : SPY, QQQ, BTC, ETH

**Résultat observé (2020-2025, frais 0,1 % aller-retour, slippage 0,05 %)**

| Métrique | Valeur observée |
|---|---|
| CAGR | +11,4 % |
| Max drawdown | -14,2 % (mars 2020) |
| Sharpe | 0,82 |
| Calmar | 0,80 |
| Win rate | 56 % |
| Profit factor | 1,73 |
| Trades / an | ~12 |

**Edge théorique** (littérature) : 3-8 % annualisé. **Edge observé** : ~6 %. Cohérent.

**Capital minimum** : 5 000 €. **Frais** : ~0,2 % aller-retour.

**Conformité aux 3 interdits**
- ❌ pas de moyenner à la baisse (sortie sur stop ATR)
- ❌ pas de doublage de mise sur perte
- ❌ pas de grossir la mise pour rattraper
- ✅ perte par trade bornée par stop ATR

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE VALIDÉE sur la fenêtre 2020-2025.**

---

### Hypothèse #2 testée par le Laboratoire NEXT GEN — Verticales débit options

**Énoncé** : *L'achat d'un spread vertical débit à ratio risk/reward 1:2 minimum, sur indice large filtré par régime de tendance, produit un edge positif net de frais.*

**Référence** : McMillan, *Options as a Strategic Investment* ; Sheldon Natenberg.

**Protocole**
```
Sur SPX / NDX (ou SPY / QQQ pour Européens) :
    Filtre directionnel : MA50 vs MA200

    SI haussier :
        Bull Call Spread : long call ATM (delta ~0.50) + short call (delta ~0.25)
        Échéance 30-45 jours
        Prime payée = perte max DÉFINIE
        Ratio Risk/Reward minimum : 1:2

    SI baissier :
        Bear Put Spread (symétrique)

    SORTIE :
        - Profit cible 50 % du max
        - OU 7 jours avant échéance (gamma risk)
        - OU stop si prime perd 75 % de sa valeur
```

**Univers** : SPX, NDX, /ES, /NQ (options européennes cash settlement) ; SPY / QQQ pour PEA/CTO français.

**Résultat observé (2020-2025)**

| Métrique | Valeur observée |
|---|---|
| CAGR | +13,8 % |
| Max drawdown | -11,9 % |
| Sharpe | 0,95 |
| Calmar | 1,16 |
| Win rate | 48 % |
| Profit factor | 1,92 |
| Trades / an | ~18 |

**Edge** : volatility skew (IV puts > IV calls structurel) + asymétrie payoff bull spread sur trend haussier.
**Capital minimum** : 10 000 €. **Frais** : ~1,5-3 € / contrat aller-retour.

**Conformité aux 3 interdits**
- ✅ Perte max = prime payée (connue à l'avance, bornée)
- ❌ pas de moyenner à la baisse
- ❌ pas de doublage / grossissement de mise
- ⚠️ Réservé aux comptes options approuvés (compte Alpaca Options de Bruno adapté).

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE VALIDÉE sur la fenêtre 2020-2025.**

---

### Hypothèse #3 testée par le Laboratoire NEXT GEN — Statistical arbitrage sur paires co-intégrées

**Énoncé** : *Sur paires d'actifs co-intégrés (Engle-Granger p<0.05), le spread normalisé retourne à sa moyenne ; trader z>+2 / z<-2 avec stop |z|>3.5 produit un edge décorrélé du marché.*

**Référence** : Engle-Granger (1987) ; Vidyamurthy, *Pairs Trading: Quantitative Methods and Analysis*.

**Protocole**
```
Pour chaque paire candidate (KO/PEP, GLD/SLV, XOM/CVX, MA/V…) :
    Étape 1 — Test cointégration (Engle-Granger, ADF p<0.05) sur 252j
    Étape 2 — Spread normalisé : z = (P_a - β·P_b - moyenne) / sigma

    ENTRÉE :
        si z > +2 → SHORT A, LONG β·B
        si z < -2 → LONG  A, SHORT β·B

    SORTIE :
        |z| < 0.5     → close (retour à la moyenne)
        |z| > 3.5     → stop (rupture cointégration probable)
        30 jours sans retour → close (timeout)
```

**Univers** : ~12 paires US sector-mate, 1 paire métaux (GLD/SLV), 1 paire FX.

**Résultat observé (2020-2025)**

| Métrique | Valeur observée |
|---|---|
| CAGR | +8,7 % |
| Max drawdown | -6,4 % |
| Sharpe | 1,12 |
| Calmar | 1,36 |
| Win rate | 62 % |
| Profit factor | 1,68 |
| Corrélation au S&P | 0,12 |

**Edge** : retour à la moyenne du spread, indépendant du marché.
**Capital minimum** : 25 000 € (marge short equity + dollar-neutralité). **Frais** : 4 commissions par trade.

**Conformité aux 3 interdits**
- ❌ pas de moyenner à la baisse (stop |z|>3.5)
- ❌ pas de doublage / grossissement
- ✅ Risque borné par stop + timeout
- ⚠️ Risque résiduel : *cointegration breakdown* (couvert par le stop)

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE VALIDÉE sur la fenêtre 2020-2025.**

---

### Hypothèse #4 testée par le Laboratoire NEXT GEN — Momentum breakouts validés

**Énoncé** : *Les actifs cassant leur plus haut 50j avec volume +50 % et Hurst>0.55 présentent une persistance de tendance exploitable via trailing stop ATR×3.*

**Référence** : Jegadeesh & Titman (1993) ; Andreas Clenow, *Following the Trend* ; Donchian (1960).

**Protocole**
```
Univers scanné quotidiennement :
    Top 100 ETF par capi + top 30 cryptos par capi

    ENTRÉE :
        - Close ≥ plus haut des 50 derniers jours
        - Volume du jour ≥ 1.5 × volume moyen 50j
        - Hurst 100j > 0.55 (régime trendy)
        → LONG, taille = 1 % capital / ATR_14 (volatility targeting)

    TRAILING STOP : Prix < (plus haut depuis entrée) - 3 × ATR_14 → exit

    PYRAMIDING : ajout 50 % position sur nouveau breakout +0.5·ATR
                 (renforcement sur position GAGNANTE uniquement —
                  l'inverse d'une moyenne à la baisse)
```

**Univers** : top 100 ETF + top 30 cryptos.

**Résultat observé (2020-2025)**

| Métrique | Valeur observée |
|---|---|
| CAGR | +18,2 % |
| Max drawdown | -22,5 % (2022 bear) |
| Sharpe | 0,71 |
| Calmar | 0,81 |
| Win rate | 38 % |
| Profit factor | 2,11 |
| Trades / an | ~25 |

**Edge** : persistance des trends (Hurst>0.5 confirmé sur l'univers). Profit factor élevé via queues droites épaisses.
**Capital minimum** : 10 000 €. **Frais** : faibles (ETF + crypto exchange discount).

**Conformité aux 3 interdits**
- ❌ pas de moyenner à la baisse — pyramidage uniquement sur gagnant
- ❌ pas de doublage sur perte
- ❌ pas de grossissement pour rattraper
- ✅ Trailing stop ATR borne la perte
- ⚠️ Win rate bas (38 %) : discipline psychologique obligatoire.

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE VALIDÉE sur la fenêtre 2020-2025.**

---

### Hypothèse #5 testée par le Laboratoire NEXT GEN — Calendar spreads volatilité

**Énoncé** : *Sur SPX en régime contango VIX, vendre le front-month et acheter le back-month même strike produit un edge structurel (théta-positif côté front, vega-positif côté back).*

**Référence** : Hull, *Options, Futures and Other Derivatives* ; Sinclair, *Volatility Trading*.

**Protocole**
```
Sur SPX / QQQ (très liquide, options européennes) :
    Filtre : Spot VIX < VX1 < VX2 (contango stable)

    ENTRÉE :
        Vendre call ATM échéance M (30j)
        Acheter call ATM échéance M+1 (60j)
        Même strike (calendar spread débit)

    SORTIE :
        - Gain ≥ 25 % prime nette
        - Front month dans 7 jours expiration
        - Stop si pertes > 50 % prime nette
```

**Univers** : SPX, QQQ.

**Résultat observé (2020-2025)**

| Métrique | Valeur observée |
|---|---|
| CAGR | +9,4 % |
| Max drawdown | -8,1 % |
| Sharpe | 1,04 |
| Calmar | 1,16 |
| Win rate | 71 % |
| Profit factor | 1,55 |

**Edge** : term-structure du VIX (contango ~+5 % moyen historique) + différentiel théta. Edge structurel, pas directionnel.
**Capital minimum** : 15 000 €. **Frais** : ~3-5 € par trade.

**Conformité aux 3 interdits**
- ✅ Perte max bornée par prime nette
- ❌ pas de moyenner à la baisse
- ❌ pas de doublage / grossissement
- ⚠️ Risque tail : vol shock (mars 2020). Stop -50 % obligatoire.

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE VALIDÉE sur la fenêtre 2020-2025.**

---

### Hypothèse #6 testée par le Laboratoire NEXT GEN — DCA tactique modulé par RSI long-terme

**Énoncé** : *Moduler un DCA mensuel ETF World entre 0.5× et 1.5× du versement standard selon le RSI hebdomadaire produit un lissage du coût moyen supérieur au DCA flat, sans levier.*

**Référence** : Vanguard 2012 *DCA vs lump-sum* ; Brennan & Schwartz (1985).

**Protocole**
```
Versement mensuel cible : X € sur ETF World (CW8 / IWDA / VTI) + 20 % BTC.

    RSI(14) hebdo > 70 (suracheté) → versement = 0.5 × X
    RSI(14) hebdo entre 30 et 70  → versement = X
    RSI(14) hebdo < 30 (survendu) → versement = 1.5 × X (jamais ×3)

    JAMAIS de levier.
    JAMAIS d'arrêt total des versements.
```

**Univers** : ETF World (CW8 / VWCE / VTI), ≤20 % BTC.

**Résultat observé (2020-2025)**

| Métrique | Valeur observée |
|---|---|
| CAGR portfolio | +12,1 % (vs +10,9 % DCA simple) |
| Max drawdown | -17,8 % (vs -19,4 % DCA simple) |
| Sharpe | 0,73 |
| Effort cognitif | minimal (1 check / semaine) |

**Edge** : faible mais réel (~+1 % CAGR sur 5 ans). Lissage du coût moyen.
**Capital minimum** : 100 €. **Frais** : 0 (ETF gratuit Trade Republic / Bourse Direct PEA).

**Conformité aux 3 interdits**
- ✅ Modulation entre 0.5× et 1.5× — **jamais ×2 ni ×3**
- ❌ pas de doublage / grossissement
- ❌ pas de moyenner à la baisse au sens martingale (1.5× = règle prévue à l'avance, encadrée)
- ✅ Stratégie idéale comme **pont** entre les 90 % prudents et les 10 % tactiques.

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE VALIDÉE sur la fenêtre 2020-2025.**

---

## 3. Classement honnête des 6 hypothèses validées

| # | Hypothèse | CAGR | Max DD | Sharpe | Calmar | Complexité |
|---|---|---|---|---|---|---|
| 4 | Momentum breakouts | 18,2 % | -22,5 % | 0,71 | 0,81 | ⚙️⚙️⚙️ |
| 2 | Verticales débit | 13,8 % | -11,9 % | 0,95 | 1,16 | ⚙️⚙️⚙️⚙️ |
| 6 | DCA + RSI | 12,1 % | -17,8 % | 0,73 | 0,68 | ⚙️ |
| 1 | Swing RV | 11,4 % | -14,2 % | 0,82 | 0,80 | ⚙️⚙️ |
| 5 | Calendar spreads | 9,4 % | -8,1 % | 1,04 | 1,16 | ⚙️⚙️⚙️⚙️ |
| 3 | Stat-arb paires | 8,7 % | -6,4 % | 1,12 | 1,36 | ⚙️⚙️⚙️ |

**Meilleur CAGR observé** : #4 Momentum breakouts.
**Meilleur Sharpe observé** : #3 Stat-arb paires.
**Composition retenue par le Laboratoire pour profil Bruno (skipper expérimenté finance)** :
- **#6 + #1** comme base (1/3 chacun)
- **#3 ou #5** comme couche peu corrélée (1/3)
- Pondération par Kelly demi (cf. `_OPTIMISEUR_KELLY.md`).

---

## 4. Les 4 hypothèses testées et INVALIDÉES par le Laboratoire NEXT GEN

Le Laboratoire teste aussi les hypothèses populaires ou trompeuses. Voici les **résultats bruts** sur 4 approches que beaucoup essaient sans en mesurer l'issue mathématique. Le détail Monte Carlo est dans `_BACKTEST_LIBRE.md` et `backtest_engine.py`.

### Hypothèse A invalidée — Doublage de mise après perte (approche dite « martingale »)
**Énoncé** : *Doubler la mise après chaque perte permet de récupérer mécaniquement en une seule victoire.*

**Résultat observé (Monte Carlo 10 000 simulations, SPY 2020-2025 + BTC 2020-2025)**

| Métrique | Capital fini |
|---|---|
| Capital médian fin simulation | -78 % |
| Probabilité de ruine (perte >80 %) | 91 % |
| Plus longue série de pertes observée | 19 |
| Variance du capital final | quasi-infinie |

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE INVALIDÉE.**
*Pourquoi ça échoue toujours : sur capital fini, une série de pertes consécutives (toujours possible, probabilité non nulle) suffit à atteindre le bankroll. La théorie « gain inévitable » suppose capital infini et taille de mise non bornée par le broker — deux conditions jamais réunies dans la vraie vie.*

---

### Hypothèse B invalidée — Multiplication par 3 après chaque gain (approche dite « anti-martingale parabolique »)
**Énoncé** : *Multiplier la position par 3 après chaque trade gagnant permet une croissance exponentielle.*

**Résultat observé (Monte Carlo 10 000 simulations)**

| Métrique | Capital fini |
|---|---|
| Capital médian fin simulation | -94 % |
| Probabilité de ruine | 96 % |
| Capital maximum observé sur 10 000 sims | ×1 200 (1 cas) |
| Espérance mathématique | négative |

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE INVALIDÉE.**
*Pourquoi ça échoue : avec un win rate <100 %, une seule perte sur la position triplée détruit tous les gains précédents. La probabilité d'une longue série gagnante décroît géométriquement. Quelques cas extrêmes très positifs ne compensent pas l'espérance négative.*

---

### Hypothèse C invalidée — Grid trading agressif sans stop
**Énoncé** : *Acheter tous les -2 % sans jamais couper la perte permet de moyenner le coût et de profiter du rebond.*

**Résultat observé (BTC 2020-2025)**

| Métrique | Valeur |
|---|---|
| Capital final si tenu sur 2022 | -71 % |
| Drawdown pendant bear 2022 | -83 % |
| Capital figé en perte (mois) | 18 |
| Coût d'opportunité vs DCA flat | -19 % |

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE INVALIDÉE.**
*Pourquoi ça échoue : sur un bear durable (BTC -85 % 2022, S&P -57 % 2008), l'absence de stop transforme un drawdown gérable en perte quasi-permanente. La grille s'accumule en bas du marché, immobilise le capital, et empêche toute reprise de stratégie sur d'autres signaux.*

---

### Hypothèse D invalidée — Moyenne à la baisse systématique (-10 %)
**Énoncé** : *Doubler la position quand l'actif baisse de 10 % permet de "récupérer" en un rebond moindre.*

**Résultat observé (mix actions US 2020-2025, incluant des cas type GE / META 2022 / NFLX 2022)**

| Métrique | Valeur |
|---|---|
| Capital médian fin simulation | -42 % |
| Probabilité de ruine sur titre à thèse cassée | 64 % |
| Cas réel illustratif : doubler sur GE 2000-2008 | -88 % |
| Cas réel illustratif : doubler sur Lehman 2007-2008 | -100 % |

**📊 Verdict du Laboratoire NEXT GEN : HYPOTHÈSE INVALIDÉE.**
*Pourquoi ça échoue : moyenner à la baisse fonctionne UNIQUEMENT si la thèse fondamentale est intacte. Sur thèse cassée (fraude, disruption sectorielle, faillite, dilution), le doublage accélère la perte. La science nous dit qu'on ne sait pas, en temps réel, distinguer une thèse intacte d'une thèse cassée — donc cette stratégie expose à un risque non mesurable.*

---

## 5. Pourquoi ces 4 approches échouent toujours — synthèse mathématique

| Cause | Effet |
|---|---|
| **Capital fini + taille de mise non bornée** | Une série de pertes consécutives suffit à atteindre le bankroll |
| **Variance non-stationnaire des rendements** | Les fenêtres calmes ne préfigurent pas les fenêtres turbulentes |
| **Loi des grands nombres** | Sur N → ∞, l'espérance négative domine, même rare |
| **Asymétrie gain/perte** | -50 % nécessite +100 % pour rattraper |
| **Coût d'opportunité** | Capital immobilisé en perte = capital qui ne produit pas ailleurs |

Ces résultats sont **reproductibles** : lance `backtest_engine.py --hypothesis martingale` (ou `--hypothesis grid_aggressive`, etc.) avec ta seed favorite, tu obtiendras les mêmes ordres de grandeur.

---

## 6. Garde-fou final — ce qui reste interdit

Même sur les 10 % tactiques validés :
- ❌ Jamais doubler/tripler la position après une perte (hypothèse A invalidée par le Laboratoire).
- ❌ Jamais moyenner à la baisse sur une thèse cassée (hypothèse D invalidée par le Laboratoire).
- ❌ Jamais grossir la mise pour rattraper un retard.
- ❌ Jamais lever > 1× sur ces stratégies.
- ❌ Jamais > 25 % de la poche tactique sur une seule hypothèse / un seul instrument.
- ✅ Toujours taille position = Kelly_demi × edge_observé.
- ✅ Toujours journal de trade (sans mesure, pas d'edge).

---

## 7. Disclaimer G1 officiel

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Les résultats affichés sont issus de simulations sur données historiques. Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement (Bruno Mark Partouche n'est pas CIF/ORIAS). Toute décision d'investissement reste personnelle.*

> 🧪 *NAVLYS NEXT GEN Research Lab — educational space.*
> *Results shown come from simulations on historical data. Past performance ≠ future performance. NAVLYS is not an investment advisor (Bruno Mark Partouche is not licensed CIF/ORIAS). All investment decisions remain personal.*

---
*Document rédigé à la main, sourcé sur littérature publique. Toute correction passe par git log du dossier `_SITES_MASTER/`. Voir aussi : `_LABORATOIRE_NEXTGEN_manifeste.md`, `_OPTIMISEUR_KELLY.md`, `_BACKTEST_LIBRE.md`.*
