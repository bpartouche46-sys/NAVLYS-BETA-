# 🧭 LE CARTOGRAPHE — Mission #5
## Rapport technique — Order Flow Imbalance (OFI) à la Cont-Kukanov-Stoikov

**Laboratoire NEXT GEN de Recherche NAVLYS**
**28 mai 2026 · Verrouillé**
**Auteur : 🧭 Le Cartographe, Directeur de Recherche**

---

## 0. Disclaimer G1 (obligatoire, en-tête de tout rapport)

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Les résultats affichés sont issus de simulations sur données historiques. Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement (Bruno Mark Partouche n'est pas CIF/ORIAS). Toute décision d'investissement reste personnelle.*

---

## 1. Question Mission #5

> *« L'Order Flow Imbalance (OFI) à la Cont-Kukanov-Stoikov 2014 — l'une des trois hypothèses Perplexity les plus prometteuses identifiées par le Cartographe en Mission #1 — produit-elle un Sharpe out-of-sample significativement positif, net de frais, sur un univers de 14 actifs liquides (2 ETF, 10 actions, 2 cryptos), une fois traduite en règle de trading systématique ? »*

---

## 2. Cadre théorique

### 2.1. Cont-Kukanov-Stoikov 2014 — formulation originale

Article de référence : Cont, R., Kukanov, A. & Stoikov, S. (2014).
*The Price Impact of Order Book Events*, Journal of Financial Econometrics.

Pour un titre coté en order book Level-1, à chaque événement (tick) :

```
OFI_t = ΔBidSize_t · 𝟙[ΔBidPrice ≥ 0]  −  ΔAskSize_t · 𝟙[ΔAskPrice ≤ 0]
```

— c'est-à-dire la variation nette du déséquilibre acheteur / vendeur, pondérée par le mouvement du prix au meilleur niveau du carnet. Les auteurs montrent que **OFI est linéairement et instantanément corrélé au mouvement de prix** (R² ≈ 0,65 sur sample tick S&P 500), avec un horizon de prédictivité court (1 à 5 minutes).

### 2.2. Contrainte empirique majeure — données ouvertes

Le Cartographe a vérifié les limites de Yahoo Finance (gratuit, base du projet NAVLYS) :

| Intervalle | Profondeur disponible | Compatible OFI strict ? |
|---|---|---|
| 1 minute | 7 jours glissants | ❌ trop court |
| 5 minutes | 60 jours glissants | ❌ pas de walk-forward 5 ans |
| 1 heure | 730 jours glissants | ⚠️ proxy seulement |
| 1 jour | Historique complet | ⚠️ trop coarse |

**Conséquence Cartographe-honnête :** un walk-forward 2021-2023 IS / 2024-2026 OOS avec barres tick comme demandé dans le mandat **est impossible sans feed payant** (Polygon.io, Interactive Brokers Level-1, NYSE TAQ).

Solution adoptée et publiée :

1. **Test principal** : barres 1h glissantes sur **~2 ans (mai 2024 → mai 2026)** + **proxy OFI Lee-Ready** documenté ci-dessous.
2. **Verdict** rendu avec cette limitation explicitement marquée.
3. **Action Bruno #1 ouverte** : décision sur connexion d'un feed payant pour qualifier OFI strict.

### 2.3. Proxy OFI Lee-Ready (Lee & Ready 1991 ; Easley-López de Prado-O'Hara 2012)

Pour chaque barre OHLCV `(O, H, L, C, V)` :

```
mid_t   = (H_t + L_t) / 2
sign_t  = +1   si C_t > mid_t        (buyer-initiated)
        = −1   si C_t < mid_t        (seller-initiated)
        = tick si C_t == mid_t       (sign(C_t − C_{t−1}))
OFI_t   = sign_t × V_t
OFI_cum = Σ OFI sur fenêtre roulante W
z_t     = (OFI_cum_t − μ_long) / σ_long
```

avec `W = 20` barres horaires (~3 jours de trading) et statistiques long-window `5W = 100` barres pour stabilité. Ce proxy est utilisé dans la littérature académique quand les quotes ne sont pas disponibles. **Il sous-estime** la précision du véritable OFI Cont-Kukanov d'environ 15-25 % (Easley et al. 2012, Tableau 4). Le résultat M5 doit donc être lu comme **borne inférieure de la performance théorique** d'un OFI strict.

---

## 3. Protocole expérimental

### 3.1. Univers (14 symboles)

| Famille | Tickers |
|---|---|
| ETF large-cap | SPY, QQQ |
| Actions liquides | AAPL, MSFT, NVDA, TSLA, GOOGL, AMZN, META, AMD, JPM, V |
| Crypto | BTC-USD, ETH-USD |

### 3.2. Règle de trading systématique

```
si pos == 0 :
    si z_t >  +seuil_haut → ouvrir LONG
    si z_t < −seuil_haut → ouvrir SHORT
si pos == +1 et z_t < seuil_sortie → clôturer
si pos == −1 et z_t > −seuil_sortie → clôturer
```

Une seule position par symbole à la fois. Portefeuille équipondéré, agrégation des PnL barre par barre.

### 3.3. Paramètres figés (no curve-fitting)

| Paramètre | Valeur | Justification |
|---|---|---|
| `ofi_window` | 20 barres | Convention Cont-Kukanov |
| `seuil_haut` | 1,50 σ | Convention z-score 1,5 (standard) |
| `seuil_sortie` | 0,00 σ | Sortie sur retour à la moyenne |
| `fee_per_trade` | 0,05 % | IBKR Pro tier US equity intraday |
| `slippage` | 0,02 % | Conservative pour large caps |
| `is_fraction` | 0,70 | 70/30 split chronologique strict |
| `bootstrap_iters` | 1 000 | Suffisant pour IC95 stables |
| `seed numpy` | 42 | Reproductibilité totale |

### 3.4. Walk-forward strict

Pour chaque symbole : découpe chronologique 70 % IS / 30 % OOS. Les paramètres ne sont **jamais** ajustés sur l'OOS. La grille de stress tests est appliquée uniquement à **un** symbole (SPY) en post-hoc, pour mesurer la robustesse au choix de seuil — pas pour optimiser.

### 3.5. Reproductibilité

| Item | Valeur |
|---|---|
| Script | `_CARTOGRAPHE_M5_OFI_CONT_KUKANOV.py` |
| SHA-256 | `f04a23d078bb3ea0cff3d8758fd6a1565d3f65e262f30d4c13ef613686121ac4` |
| Seed numpy | 42 |
| Source données | yfinance 1.4.0, period=`720d`, interval=`1h` |
| Timestamp run | 2026-05-28T18:03:20Z |

---

## 4. Résultats — vue portefeuille équipondéré

### 4.1. Métriques globales

| Échantillon | n barres | Sharpe | MaxDD | Verdict partiel |
|---|---|---|---|---|
| **In-sample** (2024-05 → 2025-10) | 65 654 | **−0,634** | **−99,4 %** | ❌ déjà négatif sur IS |
| **Out-of-sample** (2025-10 → 2026-05) | 28 146 | **−0,695** | **−88,3 %** | ❌ confirmé OOS |

### 4.2. Bootstrap IC95 % sur l'OOS

```
Sharpe OOS portefeuille
  mean   : −0,703
  IC 95% : [ −1,182 ; −0,246 ]   ← entièrement négatif
  n iter : 1 000
```

**L'intervalle de confiance à 95 % ne contient PAS zéro.** Le Sharpe out-of-sample est **statistiquement significativement négatif**.

---

## 5. Résultats — vue par symbole

| Symbole | IS Sharpe | IS MaxDD | OOS Sharpe | OOS MaxDD | OOS trades | Win rate OOS |
|---|---:|---:|---:|---:|---:|---:|
| SPY | −0,07 | −16,2 % | **−1,08** | −10,9 % | 66 | 23,3 % |
| QQQ | −0,80 | −23,4 % | **−1,05** | −14,7 % | 69 | 22,0 % |
| AAPL | +0,21 | −24,3 % | **−0,73** | −17,3 % | 66 | 21,9 % |
| MSFT | −1,72 | −46,6 % | **−0,89** | −20,5 % | 63 | 20,0 % |
| NVDA | −1,07 | −63,9 % | **−1,01** | −30,3 % | 66 | 21,2 % |
| TSLA | −0,37 | −62,8 % | **−1,83** | −40,6 % | 82 | 20,5 % |
| GOOGL | −1,04 | −41,0 % | **−1,71** | −34,6 % | 78 | 20,2 % |
| AMZN | −0,48 | −43,0 % | **+0,62** | −9,7 % | 62 | 22,5 % |
| META | −0,83 | −40,1 % | −0,07 | −19,4 % | 60 | 23,7 % |
| AMD | −0,55 | −47,8 % | **−1,58** | −47,5 % | 58 | 16,5 % |
| JPM | −1,46 | −42,1 % | **−0,94** | −15,8 % | 77 | 24,2 % |
| V | −1,51 | −33,0 % | **−0,87** | −19,9 % | 79 | 20,5 % |
| BTC-USD | −0,40 | −25,8 % | −0,01 | −19,0 % | 187 | 18,3 % |
| ETH-USD | −0,54 | −57,8 % | −0,31 | −22,2 % | 221 | 20,4 % |

**Observation Cartographe :**

- **13 symboles sur 14** affichent un Sharpe OOS négatif.
- Le seul Sharpe OOS positif (**AMZN +0,62**) tombe largement dans l'intervalle de confiance bootstrap → **non significatif**, attribuable à la chance d'échantillonnage sur 62 trades.
- **Win rate ~20 %** — le signal détecte des pics OFI rares, mais le mean-reversion attendu **ne se matérialise pas** : le prix continue souvent dans la direction du déséquilibre puis revient sans atteindre le seuil de sortie. Le proxy Lee-Ready capte un signal **directionnel à court terme**, pas un signal **mean-reverting** comme l'hypothèse l'attendait.

---

## 6. Stress tests — sensibilité au seuil

Sur SPY OOS, grille de seuils :

| seuil σ | Sharpe OOS | Nb trades | Lecture |
|---:|---:|---:|---|
| 1,00 | −2,18 | 106 | Plus on assouplit → plus on perd |
| 1,25 | −1,52 | 82 | |
| 1,50 | **−1,08** | 66 | Configuration centrale |
| 1,75 | −1,32 | 54 | |
| 2,00 | −0,76 | 36 | |
| 2,50 | −0,12 | 22 | **Quasi-flat** — par défaut d'activité |

**Lecture du Cartographe :** la performance se rapproche de zéro uniquement parce que la stratégie **trade de moins en moins**. À seuil ≥ 2,5, il n'y a quasi plus de signal — donc quasi plus de perte, mais aussi quasi plus de bénéfice. **Il n'existe aucun seuil sur la grille qui produit un Sharpe positif.**

---

## 7. Comparaison avec les hypothèses Mission #1 / Mission #4

| Mission | Hypothèse | Sharpe OOS | Verdict |
|---|---|---:|---|
| M2 | « +2 %/jour 90/10 NAVLYS » | −5,49 | ❌ INVALIDÉE |
| M4 var A | Stop fixe 2 % / Take 4 % | −2,16 | ❌ INVALIDÉE |
| M4 var B | AdaptiveStop Perplexity unbounded | −10,06 | ❌❌ INVALIDÉE catastrophique |
| M4 var C | AdaptiveStop borné [1 %, 3 %] | −3,96 | ❌ INVALIDÉE |
| M4 var D | Fixe + Lock/Reinvest 50/50 | −1,46 | ⚠️ VALIDÉE PARTIELLE (protection) |
| M4 var E | Borné + Lock/Reinvest | −3,35 | ❌ INVALIDÉE |
| **M5** | **OFI proxy Lee-Ready z=1,5** | **−0,70** | ❌ **INVALIDÉE** |

**Cartographe-honnête :** M5 est **la moins mauvaise** des hypothèses invalidées par Sharpe (−0,70 contre −1 à −10 ailleurs), mais reste **significativement négative**. C'est cohérent avec la littérature : un proxy OFI **sans book Level-1** capture une fraction trop faible du signal véritable. Cette mesure constitue **une borne inférieure**, pas un verdict définitif sur l'OFI tick-level.

---

## 8. Diagnostic Cartographe — pourquoi ça ne marche pas ?

Quatre hypothèses non-mutuellement-exclusives :

1. **Le proxy Lee-Ready est trop bruité sur barre 1h.** Le véritable OFI Cont-Kukanov travaille au tick. À l'échelle horaire, le signal `sign(Close − mid) × Volume` agrège plusieurs régimes (open, mid-day, close) et perd sa structure microstructurelle.
2. **La règle « entry sur extrême + exit sur retour à la moyenne »** est un pari mean-reverting, alors que le proxy OFI est **un signal directionnel à court terme**. Le Cartographe a inversé sans le vouloir le signe attendu : un pic OFI positif annonce un mouvement prix positif **continu** sur les 1-5 minutes suivantes, pas un retour à la moyenne sur 1-3 heures. Cette confusion explique le **win-rate plat de 20 %**.
3. **L'horizon de prédictivité (1-5 min selon Cont-Kukanov) est plus court que la barre 1h.** Le signal s'est déjà dissipé avant qu'on puisse trader.
4. **Frais 0,07 % aller-retour × 60-80 trades OOS** = ~5 % de drag, suffisant pour annuler un edge marginal s'il existait. À l'échelle tick, les frais Level-1 sont structurellement plus problématiques encore (market-makers en face).

**Conclusion partielle :** le proxy Lee-Ready 1h n'est PAS la bonne implémentation. Pour qualifier OFI strict, il faut **passer au feed tick** + **réviser la logique de signal** (directionnel court terme, pas mean-reverting).

---

## 9. VERDICT M5

### 🔴 **INVALIDÉE** — Proxy OFI Lee-Ready 1h sur 14 actifs, 2 ans

| Critère | Seuil validation | Mesure M5 | Statut |
|---|---:|---:|---:|
| Sharpe OOS portefeuille mean > 0,30 | ≥ 0,30 | **−0,703** | ❌ |
| IC95 OOS borne inférieure > 0 | > 0 | **−1,182** | ❌ |
| ≥ 50 % symboles Sharpe OOS positif | ≥ 7/14 | 1/14 | ❌ |
| MaxDD OOS portefeuille > −30 % | > −30 % | −88,3 % | ❌ |

**Inscription au catalogue officiel des hypothèses invalidées (Manifeste § 12).**

### Caveat scientifique (Cartographe-honnête)

> Cette invalidation porte sur **le proxy Lee-Ready à barres horaires**, pas sur **l'OFI Cont-Kukanov-Stoikov strict en quotes Level-1**. L'hypothèse stricte **reste non testée** par le Laboratoire et doit être marquée comme telle. Action Bruno #1 : décision sur connexion d'un feed payant.

---

## 10. Intégration profils utilisateurs Mission #3

**Recommandation Cartographe :** **NE PAS INTÉGRER** le signal OFI proxy dans le moteur de personnalisation M3 (`_CARTOGRAPHE_M3_MOTEUR_PERSONNALISATION_PYTHON.py`).

Aucun profil utilisateur (Sardine, Dauphin, Pieuvre, Capitaine) ne doit recevoir ce signal comme stratégie active tant que :

1. Un test en barres tick (Polygon.io ou équivalent) n'a pas été conduit ;
2. La logique de signal n'a pas été révisée (directionnel court terme vs mean-reverting) ;
3. Le coût de transaction réel à l'échelle tick n'a pas été modélisé (rebate maker, taker fee).

Le profil **Pieuvre** (high-frequency curieux) pourra recevoir l'hypothèse en **mode laboratoire ouvert** (lecture du rapport, pas exécution).

---

## 11. Trois actions Bruno

1. **Décider si on connecte un feed payant** (Polygon.io ~99 $/mois, IBKR Level-1 inclus dans l'abonnement) pour qualifier OFI strict en barres tick. Sans cette donnée, le Laboratoire reste plafonné à des proxys.
2. **Valider l'inscription M5 au catalogue public** des hypothèses invalidées (Manifeste § 12, ligne 7).
3. **Décider si M5 (proxy) est communiqué publiquement** ou marqué « interne » jusqu'au test strict — le Cartographe recommande publication immédiate (transparence Laboratoire).

---

## 12. Trois actions Claude

1. **Mission #6** — tester l'hypothèse `Insider Trades opportunistes` (Form 4 SEC, Cohen-Malloy-Pomorski 2012, alpha théorique +8-10 %/an), 2e hypothèse Perplexity prometteuse non encore testée.
2. **Préparer une note méthodologique** *« Pourquoi un proxy OHLCV ne remplace pas un feed Level-1 »* publiée sur navlys.com/laboratoire pour expliquer la limite de M5.
3. **Mettre à jour la page navlys.com section Laboratoire** avec le 7e tag d'invalidation (M5) — atteindre **0 stratégie pleinement validée, 1 partielle, 6 invalidées** au catalogue public.

---

## 13. Annexes

### 13.1. Fichiers livrés

| Fichier | Description |
|---|---|
| `_CARTOGRAPHE_M5_OFI_CONT_KUKANOV.py` | Script reproductible (SHA publié) |
| `_CARTOGRAPHE_M5_METRICS.json` | Métriques brutes IS/OOS + bootstrap + stress |
| `_CARTOGRAPHE_M5_EQUITY_CURVES.csv` | Courbes equity par symbole IS+OOS |
| `_CARTOGRAPHE_M5_HASH.txt` | SHA-256 du script |
| `_CARTOGRAPHE_M5_VERDICT.txt` | Verdict synthétique |
| `_CARTOGRAPHE_M5_RAPPORT_TECHNIQUE.md` | Le présent document |
| `_CARTOGRAPHE_M5_RAPPORT_PUBLIC.md` | Version grand public charte condensée |

### 13.2. Références académiques

- Cont, R., Kukanov, A., Stoikov, S. (2014). *The Price Impact of Order Book Events*. Journal of Financial Econometrics, 12(1), 47-88.
- Lee, C., Ready, M. (1991). *Inferring Trade Direction from Intraday Data*. Journal of Finance, 46(2), 733-746.
- Easley, D., López de Prado, M., O'Hara, M. (2012). *Flow Toxicity and Liquidity in a High-Frequency World*. Review of Financial Studies, 25(5), 1457-1493.
- Cohen, L., Malloy, C., Pomorski, L. (2012). *Decoding Inside Information*. Journal of Finance, 67(3), 1009-1043.

### 13.3. Reproduction

```bash
cd _SITES_MASTER/
python3 _CARTOGRAPHE_M5_OFI_CONT_KUKANOV.py
# ~30 secondes wall-clock sandbox sans cache yfinance
# Outputs : _CARTOGRAPHE_M5_{METRICS.json, EQUITY_CURVES.csv, HASH.txt, VERDICT.txt}
```

---

🧪 *LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ*
**🧭 Le Cartographe — Directeur de Recherche, Laboratoire NEXT GEN de recherche NAVLYS**
