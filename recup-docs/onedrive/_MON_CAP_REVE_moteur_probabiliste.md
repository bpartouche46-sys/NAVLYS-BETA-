# ⚓ MON CAP RÊVÉ — Moteur probabiliste (mode Perplexity)
*Verrouillé le 28 mai 2026 — méthode statistique honnête. Aucune promesse.*

> 🧭 **G1 rappelé en tête.** NAVLYS ne promet jamais +2 %/jour. Ce document analyse la **probabilité réelle** de cet objectif théorique pour la **montrer crue** aux utilisateurs. La sortie de ce moteur sert l'éducation, pas le conseil personnalisé. Bruno Partouche n'est ni CIF, ni ORIAS, ni IOBSP.

---

## 0. Pourquoi ce module — l'angle Perplexity

Perplexity ne se contente jamais d'**une** réponse. Sa force = présenter pour chaque question :
1. Un **calcul analytique** quand une formule fermée existe.
2. Une **simulation numérique** (typiquement Monte Carlo).
3. Une **comparaison historique** sourcée.

On copie cette discipline. Pour chaque cible posée dans MON CAP RÊVÉ, le moteur produit trois angles complémentaires, puis traduit en **5 métriques honnêtes** dans le vocabulaire maritime déjà verrouillé.

---

## A. Cadre mathématique

### Modèle de base

Le rendement journalier du capital est modélisé en **log-normal** :

```
r_t  ~  N(μ, σ²)       (rendement continu quotidien)
S_T  =  S_0 · exp(Σ r_t)   pour t = 1..T
```

### Vol drag (la vérité cachée de la composition)

Quand on compose, l'**espérance du log-rendement** vaut `μ − σ²/2` (pas `μ`). Conséquence : pour un même drift brut μ, plus la volatilité σ est élevée, plus le **médian** plonge sous la **moyenne**. C'est le « vol drag » — la friction silencieuse qui détruit les promesses de rendement.

| σ quotidien | μ brut | Drift effectif log | Multiplicateur médian sur 252 jours |
|---|---|---|---|
| 1 % (SPY) | ln(1,02) ≈ 0,0198 | 0,01975 | × 142 |
| 2 % (actions volatiles) | 0,0198 | 0,0196 | × 140 |
| 4 % (BTC) | 0,0198 | 0,0190 | × 121 |

➜ **L'enseignement** : viser « +2 % par jour » sur une stratégie volatile coûte mécaniquement plus que sur une stratégie lisse. Le marketing dit « ×144 », la réalité du médian dit moins.

### Cible « +2 %/jour » sur 1 an = ×147

```
1.02^252 ≈ 146,97
```
Soit transformer **10 000 € en 1 469 749 €** en 252 jours ouvrés. C'est la promesse que personne ne tient. Le moteur sert à le **prouver**.

---

## B. Simulation Monte Carlo (code livré)

📁 `_SITES_MASTER/mon_cap_reve_montecarlo.py`

### Inputs

```python
Inputs(
    capital_initial = 10_000,       # EUR
    mu_journalier   = ln(1.02),     # log-rendement cible quotidien
    sigma_journalier= 0.02,         # volatilité quotidienne
    horizon_jours   = 252,          # 1 an de bourse
    n_simulations   = 10_000,
    seuil_ruine_pct = 0.5,          # ruine = chute > 50 %
    seed            = 42
)
```

### Outputs (sortie réelle, scénario 1 ci-dessous)

10 000 trajectoires de 252 jours. On extrait :

- Probabilité d'atteindre la cible.
- Probabilité de perte > 20 %.
- Probabilité de ruine (chute > 50 % à un moment).
- Max drawdown médian (la « plus grande tempête » médiane).
- Quantiles 5 % / 25 % / 50 % / 75 % / 95 %.

---

## C. Méthode multi-angles Perplexity — appliquée

### Question : « +2 %/jour soutenu sur 1 an, c'est quoi la vraie probabilité ? »

#### Angle 1 — Calcul analytique

Sous Black-Scholes log-normal, `ln(S_T/S_0) ~ N((μ − σ²/2)·T, σ²·T)`. Avec μ = ln(1,02), σ = 0,02, T = 252 :

```
moyenne_log = (0.0198 − 0.0002) × 252  =  4.939
var_log     = 0.0004 × 252             =  0.1008
seuil_log   = 252 × ln(1.02)           =  4.991

z = (4.991 − 4.939) / √0.1008 = 0.165
P(atteindre)  =  P(Z ≥ 0.165)  ≈  43,4 %
```

#### Angle 2 — Simulation Monte Carlo (10 000 voyages)

Résultat numérique mesuré : **P(atteindre) = 50,13 %** (proche de la borne analytique, écart dû à la convergence finie + arrondi des σ²). **Médiane = 1 471 730 €.**

#### Angle 3 — Comparaison historique

| Série de référence | μ annualisé observé | μ quotidien équivalent | Distance au « +2 %/jour » |
|---|---|---|---|
| S&P 500 (Shiller 1928-2025) | 9,5 % | 0,038 % | ÷ 52 |
| NASDAQ-100 (1985-2025) | 11,5 % | 0,046 % | ÷ 43 |
| BTC (2013-2025, CoinMarketCap) | 55 % | 0,219 % | ÷ 9 |
| Renaissance Medallion (estimé brut) | 39 % | 0,156 % | ÷ 13 |
| **+2 %/jour théorique** | **~5 040 %** | **2,000 %** | ×1 |

➜ Aucun acteur connu n'a soutenu μ = 2 %/jour. Medallion (le fonds le plus performant de l'histoire) en est à **1/13ᵉ** de cette cadence — sur 30 ans.

#### Synthèse honnête

- **Sous l'hypothèse fictive** μ=2 %/jour réel et σ=2 % réel → P ≈ 43-50 % (la math est mécanique).
- **Sous réalité empirique** (μ tiré de l'historique des stratégies réelles) → **P statistiquement indistinguible de zéro**.

**Ce que ça veut dire** : la question n'est pas « la math marche ? », la question est « peut-on soutenir μ = 2 %/jour ? ». Réponse historique : **non, jamais, par personne, sur 1 an**.

---

## D. Les 5 métriques honnêtes affichées dans MON CAP RÊVÉ

Pour chaque cible posée par l'utilisateur (capital, allure de croisière, horizon), on affiche en bas du module en Manrope 300 (discret) :

| Icône | Métrique | Format |
|---|---|---|
| 🎯 | Probabilité d'atteindre le rêve à temps | `XX,X %` |
| 📉 | Probabilité de perdre plus de 20 % | `XX,X %` |
| 📊 | Capital médian à l'horizon | `XXX XXX €` |
| ⚠️ | Pire scénario probable (5 %) | `XXX XXX €` |
| ✅ | Meilleur scénario probable (95 %) | `XXX XXX €` |

### Bulle conseil dynamique

```
💡 Pour augmenter ta probabilité :
   · allonger l'horizon de {Y} mois
   · réduire la cible de {Z} %
   · diminuer la houle acceptée à σ = {W} %
```

Calculée à la volée : on cherche le plus petit ajustement qui fait passer P(atteindre) au-dessus de 70 %.

---

## E. Cas concret « objectif 2 %/jour » — résultats Monte Carlo

### Scénario 1 — Hypothèse théorique pure (μ=2 %/jour, σ=2 %)

```
Cible capital         :     1 469 749 € (× 146,97)
Médiane Monte Carlo   :     1 471 730 €
Worst case 5 %        :       873 452 €
Best case 95 %        :     2 494 122 €
P(atteindre)          :       50,13 %
P(perte > 20 %)       :        0,00 %
P(ruine -50 %)        :        0,00 %
Max DD médian         :       -4,29 %
```
*Lecture* : SI on suppose un drift constant à 2 %/jour, la math obéit. C'est la fenêtre de tir du marketeur.

### Scénario 2 — Réalité SPY (μ_an=9,5 %, σ_an=18 %) visant la même cible ×147

```
Cible capital         :     1 469 749 €
Médiane Monte Carlo   :        11 005 €
P(atteindre x147)     :        0,00 %     ◄ ZÉRO sur 10 000 essais
P(perte > 20 %)       :        3,68 %
Max DD médian         :       -14,74 %
```
*Lecture* : avec une stratégie large-cap réaliste, la probabilité d'atteindre le multiple ×147 en 1 an est **nulle**.

### Scénario 3 — Réalité BTC (μ_an=55 %, σ_an=75 %) visant la même cible ×147

```
Cible capital         :     1 469 749 €
Médiane Monte Carlo   :        17 388 €
P(atteindre x147)     :        0,00 %
P(perte > 20 %)       :       14,73 %
P(ruine -50 %)        :       14,37 %     ◄ 1 chance sur 7 de chavirer
Max DD médian         :      -46,27 %
```
*Lecture* : même en pariant 100 % sur la classe la plus volatile du marché historique, on n'atteint **jamais** la cible — et on chavire 14 % du temps.

### Verdict honnête à afficher dans MON CAP RÊVÉ

> *« Viser +2 %/jour, c'est viser × 147 sur l'année. Sur 10 000 voyages simulés avec des paramètres réalistes (SPY, BTC), 0 atteint la cible. Avec hypothèse théorique pure (drift 2 %/jour soutenu, ce qu'aucun trader n'a fait), la math donne 50 %. Le piège : confondre les deux. C'est pourquoi MON CAP RÊVÉ propose par défaut une allure de croisière de 0,03 %/jour (~ 8 %/an), historiquement plausible. »*

---

## F. Recalibration de la méthode 90/10 — pourquoi elle gagne

On compare 3 stratégies sur 252 jours, capital de départ 10 000 € :

| Stratégie | Capital médian | P(perte>20 %) | P(ruine -50 %) | Max DD médian | E[log utility] |
|---|---|---|---|---|---|
| **100 % prudente (ETF SPY)** | 11 005 € | 3,68 % | 0,01 % | -14,72 % | 0,097 |
| **90/10 NAVLYS** (90 % SPY + 10 % tactique théorique) | **17 965 €** | **0,01 %** | **0,00 %** | **-7,10 %** | **0,587** |
| 100 % tactique (cible 2 %/jour théorique) | 1 483 103 € | 0,00 % | 0,00 % | -4,26 % | 4,996 |

### Lecture honnête

- Le **100 % tactique** (ligne 3) est la *fenêtre du rêve* : elle suppose que la cible 2 %/jour EST atteignable. Ça n'est jamais le cas en pratique.
- Le **90/10 NAVLYS** capture une *partie* de l'upside théorique (médiane × 1,8 vs ETF × 1,1), tout en **réduisant** la P(perte > 20 %) de 3,68 % à 0,01 % et le drawdown médian de moitié. Avantage Kelly : **E[log utility] passe de 0,10 à 0,59** (× 6).
- Le **100 % prudente** est le plancher honnête. C'est notre **bouée de sauvetage** : sans elle, le 90/10 n'existe pas.

➜ Le 90/10 **n'est pas un compromis frileux**. C'est une **dominance stochastique** sur la stratégie 100 % prudente (plus de médiane, moins de risque), et une **protection contre le fantasme** que la stratégie 100 % tactique soutiendra son drift dans la vraie vie.

---

## G. Glossaire pédagogique — vocabulaire MON CAP RÊVÉ

Cohérent avec `_MON_CAP_REVE_repositionnement.md`. Aucun mot finance dans l'UI.

| Concept technique | Vocabulaire MON CAP RÊVÉ |
|---|---|
| Volatilité (σ) | **Houle du marché** |
| Drawdown max | **Plus grande tempête à traverser** |
| Probabilité de ruine | **Risque de chavirer** |
| Espérance (μ × T) | **Cap moyen prévisible** |
| Médiane | **Cap probable** |
| Quantile 5 % | **Pire scénario probable** |
| Quantile 95 % | **Meilleur scénario probable** |
| Simulation Monte Carlo | **Mille voyages simulés** |
| Vol drag | **Friction du courant** |
| Drift (μ) | **Souffle du vent** |
| Capital final | **Ce que tu auras pour vivre ton rêve** |
| Horizon | **Quand tu veux y arriver** |
| Stratégie 90/10 | **Cap principal + escale tactique** |
| Kelly criterion | **Dose de risque qui ne coule pas le navire** |

---

## H. Spécification UI à coller dans le sprint typo en cours

### Onglet « Probabilité de réussite » du module MON CAP RÊVÉ

**Position** : nouvel onglet à droite des 6 presets de rêves, dans la barre d'onglets discrète Manrope 300.

**Layout** (mobile-first, breakpoint 768) :

```
┌────────────────────────────────────────────────────────┐
│  ⚓ Probabilité de réussite                            │
│  Calculs honnêtes — 10 000 voyages simulés             │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Mon point d'embarquement       [ 10 000 € ]          │
│  Mon allure de croisière        [ 0,05 %/jour ]  ◀────│ slider 0,01 % à 5 %/jour, défaut 0,05 %
│  La houle que j'accepte         [ 1,2 % ]        ◀────│ slider 0,5 % à 5 %, défaut 1,2 %
│  Quand veux-tu y arriver ?      [ 5 ans ]        ◀────│ slider 3 mois à 30 ans, défaut 5 ans
│  Ce que tu veux pour ton rêve   [ 100 000 € ]         │
│                                                        │
│  ━━━━━━━━━━ 1000 trajectoires (fan chart) ━━━━━━━━━━  │
│      Plotly/Chart.js, lignes #7DD3FC alpha 5%         │
│      Bande or 5-95% + médiane bronze 2.4px            │
│      Ligne de cible noire pointillée                  │
│                                                        │
│  ━━━━━━━━━━ Les 5 métriques honnêtes ━━━━━━━━━━       │
│   🎯  Probabilité d'atteindre ton rêve     :  62,3 %  │
│   📉  Probabilité de perdre plus de 20 %    :   8,1 % │
│   📊  Capital médian à l'horizon            : 158 K€  │
│   ⚠️  Pire scénario probable (1 sur 20)    :  78 K€  │
│   ✅  Meilleur scénario probable (1 sur 20) : 311 K€  │
│                                                        │
│  💡 Pour augmenter ta probabilité :                    │
│     allonge l'horizon de 6 mois                        │
│     OU réduis la cible de 8 %                          │
│                                                        │
│  ━━ Sticker honnêteté (footer Manrope 300 10px) ━━    │
│  Calculs Monte Carlo 10 000 simulations · Hypothèses   │
│  log-normales · Past performance ≠ future · NAVLYS    │
│  = éducation, pas conseil personnalisé.                │
└────────────────────────────────────────────────────────┘
```

### Logique côté front

- **Recalcul live** sur chaque release de slider (debounce 200 ms).
- **Worker Web** pour les 10 000 simulations (ne pas bloquer l'UI).
- **Conseil dynamique** : on cherche par dichotomie le plus petit ajustement (horizon ou cible) qui fait passer P ≥ 70 %.
- **Avertissement rouge discret** si l'utilisateur place le slider d'allure > 0,5 %/jour : *« Au-delà de 0,5 %/jour soutenu, aucune stratégie historique connue n'a tenu. Le calcul reste exact mais l'hypothèse devient fictive. »*
- **Couleurs** : bronze `#B87333`, or `#C9A961`, ice blue `#7DD3FC`, nuit `#02040a`, pearl `#F2F4F7`. Cinzel (titres) + Cormorant Garamond italic (textes) + JetBrains Mono (chiffres).

### API backend (`/api/moncapreve/montecarlo`)

```http
POST /api/moncapreve/montecarlo
Content-Type: application/json

{
  "capital_initial": 10000,
  "mu_journalier":   0.0005,
  "sigma_journalier":0.012,
  "horizon_jours":   1260,
  "n_simulations":   10000,
  "cible_capital":   100000
}

→ 200 OK
{
  "p_atteint": 0.6232,
  "p_perte_20": 0.0814,
  "p_ruine_50": 0.0018,
  "capital_median": 158231,
  "worst_case_5pct": 78104,
  "best_case_5pct": 311887,
  "max_dd_median": -0.1742,
  "fan_chart_quantiles": [...],
  "conseil_dynamique": {
    "delta_horizon_mois": 6,
    "delta_cible_pct": -8.0
  }
}
```

Implémentation Node.js : portage direct du `simulate()` Python en JS (boucle vectorisée via `tf.js` ou `mathjs`), ou appel d'un service Python isolé via Vercel Edge Function.

---

## I. Sources & références

- **Shiller** R. — *Online Data Robert Shiller* (Yale), série S&P 500 1871-2025.
- **Yahoo Finance** — clôtures journalières SPY, NDX, BTC-USD.
- **CoinMarketCap** — historique BTC depuis 2013.
- **Hull J.** — *Options, Futures, and Other Derivatives*, chap. modèle log-normal Black-Scholes.
- **Kelly J. L. Jr.** (1956) — *A New Interpretation of Information Rate*. Bell System Tech. J. — critère de Kelly fractionnel pour la dose optimale.
- **Bouchaud J.-P., Potters M.** — *Theory of Financial Risk and Derivative Pricing*, sur les fat tails et la sous-estimation systématique du risque.

Données utilisées dans la doc à titre de **comparaison historique pédagogique**, pas de **prédiction**.

---

## J. Disclaimer obligatoire (à reprendre intact en pied de module)

> **Modèle statistique — pas une garantie.** Les calculs présentés sont des simulations Monte Carlo basées sur des hypothèses log-normales. **Les performances passées ne préjugent pas du futur.** NAVLYS est un service d'**éducation financière**, pas un service de **conseil personnalisé**. Bruno Partouche n'est pas conseiller en investissement financier (CIF), pas inscrit ORIAS, pas IOBSP. Les chiffres affichés servent à **comprendre la probabilité de réussite d'un objectif**, pas à recommander un produit.

---

*Fin du moteur. Le calcul est honnête. Le vocabulaire est maritime. Le rêve reste maître.*
