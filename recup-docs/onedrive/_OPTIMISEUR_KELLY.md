# 🧪 OPTIMISEUR KELLY — Module du Laboratoire NEXT GEN de recherche NAVLYS
*Verrouillé le 28 mai 2026. Compagnon de `_CAP_TACTIQUE_strategies.md`.*

> 🧪 **Outil du Laboratoire NEXT GEN.** Le critère de Kelly détermine la **fraction optimale** à risquer par trade à partir d'un edge **mesuré**, pas estimé à la louche. Si l'edge est nul, Kelly dit 0. Si l'edge est négatif, Kelly dit « ne joue pas ». **C'est l'opposé mathématique d'une approche de doublage de mise.**

---

## 1. Pourquoi Kelly N'EST PAS une martingale

C'est la confusion la plus fréquente. Mise au clair :

| Critère | Approche de doublage (martingale) | Critère de Kelly |
|---|---|---|
| Direction de la taille | **Augmente** la mise après une perte | **Diminue** la mise si edge faible/négatif |
| Edge requis | Aucun (suppose capital infini) | **Edge réel et mesuré** (sinon Kelly = 0) |
| Espérance | **Négative** sur capital fini | **Positive** par construction (si edge>0) |
| Risque de ruine asymptotique | **100 %** | < 1 % avec Kelly demi |
| Hypothèse mathématique | Capital infini, mise non bornée | Capital fini, fraction du capital |

**Le Laboratoire NEXT GEN utilise Kelly comme calculateur de taille de position. Pas comme générateur de signal.** Le signal vient des hypothèses #1 à #6 du catalogue Cap Tactique.

---

## 2. Formule de Kelly (gain/perte binaire)

```
f* = (p · b − q) / b

avec :
  p = probabilité de gain  (win rate observé)
  q = 1 − p                (probabilité de perte)
  b = ratio gain/perte     (avg_win / avg_loss)
  f* = fraction OPTIMALE du capital à risquer par trade
```

### Exemples

| p (win rate) | b (R/R) | f* (Kelly plein) | f* / 2 (Kelly demi recommandé) |
|---|---|---|---|
| 50 % | 1,0 | 0 % | 0 % |
| 50 % | 2,0 | 25 % | **12,5 %** |
| 55 % | 1,5 | 25 % | **12,5 %** |
| 38 % | 3,0 | 17,3 % | **8,7 %** |
| 60 % | 1,0 | 20 % | **10 %** |
| 45 % | 1,0 | -10 % → 0 % | **0 % (ne joue pas)** |

**Lecture** : si tes 100 derniers trades ont un win rate de 55 % et un ratio gain/perte moyen de 1,5, Kelly plein recommande de risquer 25 % du capital par trade. **C'est trop**. Le Laboratoire NEXT GEN recommande **Kelly demi (12,5 %)** ou Kelly quart (6,25 %).

---

## 3. Pourquoi Kelly demi (et pas Kelly plein) ?

Trois raisons documentées (Thorp, *The Kelly Capital Growth Investment Criterion*, 2011) :

1. **Variance**. Kelly plein maximise l'espérance log mais la variance du capital est énorme — drawdown médian de 30-50 % sur 200 trades, même avec edge positif.
2. **Mesure imprécise de l'edge**. p et b sont mesurés sur un échantillon fini : 5-10 % d'erreur typique. Une surestimation de p entraîne un sur-pari Kelly catastrophique.
3. **Pertes consécutives**. Avec Kelly plein, une série de pertes inférieure à la moyenne historique (toujours possible) fait plonger le capital de plus de 50 %. Psychologiquement insoutenable.

**Conclusion du Laboratoire** : **Kelly demi** est la norme. Kelly quart pour les débutants ou stratégies dont l'edge n'a pas encore été mesuré sur ≥ 100 trades.

---

## 4. Espérance de croissance log et probabilité de drawdown

À taille fixe `f` par trade et N trades :

```
E[ln(S_N/S_0)] = N · ( p·ln(1+f·b) + q·ln(1−f) )

Probabilité de drawdown > D pendant la séquence :
  formule fermée (Kelly 1956, optimal sizing under uncertainty) :
    P(DD > D) ≈ exp( −2 · E·D / Var )
  où E = log-rendement espéré par trade, Var = variance log par trade.
```

### Outil livré : `kelly_optimizer.py`

Calcule :
- `f*` (Kelly plein) et `f*/2` (Kelly demi)
- Capital projeté médian sur N trades
- Quantiles 5 % / 25 % / 50 % / 75 % / 95 %
- Probabilité de drawdown >10/20/30/50 %
- Verdict : *appliquer Kelly demi est-il sûr avec ton échantillon ?*

---

## 5. Usage typique (Bruno)

```bash
# Avec ton historique de trades existant :
python kelly_optimizer.py --winrate 0.55 --avgwin 850 --avgloss 420 --ntrades 120 --capital 10000
```

Le script affiche :
1. f* (Kelly plein)
2. f*/2 (Kelly demi recommandé)
3. Taille position absolue en euros
4. Espérance log par trade
5. Capital médian projeté sur 100 trades
6. Probabilité de drawdown 20 %, 30 %, 50 %
7. Verdict (échantillon suffisant ? edge significatif ?)

---

## 6. Garde-fous Laboratoire NEXT GEN

- ⚠️ **Ne PAS appliquer Kelly sans 100+ trades historiques mesurés.** En dessous, l'edge est trop bruité.
- ⚠️ **Kelly demi maximum**, jamais Kelly plein.
- ⚠️ **Kelly ne couvre PAS le risque de ruine sur stratégies à payoff non-binaire** (options, paires). Pour ces cas, le Laboratoire recommande de calculer Kelly sur la distribution empirique des P/L, pas sur la moyenne (mode `--mode empirical`).
- ⚠️ **Kelly suppose des trades indépendants.** Si tes trades sont corrélés (ex : 5 longs SPY en même temps), divise f par √N.

---

## 7. Disclaimer G1 officiel

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Les résultats affichés sont issus de simulations sur données historiques. Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement (Bruno Mark Partouche n'est pas CIF/ORIAS). Toute décision d'investissement reste personnelle.*

---

## Références

- Kelly, J.L. (1956). *A New Interpretation of Information Rate.* Bell System Technical Journal.
- Thorp, E.O. (2011). *The Kelly Capital Growth Investment Criterion.*
- MacLean, Thorp & Ziemba (2011). *The Kelly Capital Growth Investment Criterion: Theory and Practice.*
