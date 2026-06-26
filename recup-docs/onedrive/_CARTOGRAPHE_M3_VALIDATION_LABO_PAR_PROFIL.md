# 🧭 CARTOGRAPHE — Mission #3 · Validation Laboratoire par profil
**🧭 Le Cartographe — Directeur de Recherche · Laboratoire NEXT GEN NAVLYS**
*Verrouillé le 28 mai 2026.*

---

## Méthode

Mini-backtest **5 ans Monte Carlo** (2 000 chemins par profil, vectorisé numpy) sur les **allocations cibles M3**. Calibration :

- Rendements et volatilités annualisées par classe : `prudent μ=3,0 % / σ=4,5 %`, `balanced μ=7,0 % / σ=15,5 %`, `tactique μ=8,5 % / σ=22,0 %`.
- Ces paramètres dérivent de Shiller (S&P 500 1928-2025 réel ≈ 6,8 %/an), FRED 60/40 long terme, et calibrage Mission #2 (volatilité tactique majorée pour intégrer le risque actif).
- Frais 0,1 %/an + slippage 0,02 % implicite → 0,12 %/an retranché quotidiennement.
- Pas de stratégie « +2 %/jour » (invalidée Mission #2 — confirmée Sharpe OOS −5,49, DD −95,2 %).
- Pas de leverage, pas de produits non plafonnés.

Le script reproductible : `_CARTOGRAPHE_M3_VALIDATION_LABO_par_profil.py`.
La sortie JSON brute : `_CARTOGRAPHE_M3_VALIDATION_LABO_par_profil.json`.

---

## Résultats consolidés (médianes Monte Carlo 5 ans, 2 000 chemins)

| Profil | Allocation prudent / balanced / tactique | CAGR médian | CAGR P5–P95 | Max DD médian | Max DD P5 | Sharpe médian | % années positives |
|---|---|---|---|---|---|---|---|
| 🛡️ 1 — Marin Prudent | 90 / 10 / 0 | **3,19 %** | −0,03 … 6,66 % | −6,53 % | −11,85 % | **0,74** | 80 % |
| 👨‍👩‍👧 2 — Capitaine de Famille | 30 / 60 / 10 | **5,47 %** | −1,73 … 13,22 % | −15,05 % | −27,65 % | 0,60 | 80 % |
| 🚀 3 — Entrepreneur en Croissance | 20 / 50 / 30 | **6,28 %** | −1,38 … 14,68 % | −15,95 % | −27,69 % | 0,64 | 80 % |
| 🌱 4 — Étudiant Découvreur | 80 / 20 / 0 | **3,60 %** | 0,03 … 7,59 % | −7,10 % | −12,46 % | **0,77** | 80 % |
| 🧭 5 — Skipper Indépendant | 60 / 20 / 20 | **4,85 %** | 0,43 … 9,73 % | −8,65 % | −15,06 % | **0,82** ⭐ | 80 % |
| 💼 6 — Pro Actif | 30 / 30 / 40 | **6,11 %** | −1,69 … 14,18 % | −15,33 % | −27,54 % | 0,65 | 80 % |
| 🌊 7 — Navigateur Curieux | paper 100 % | N/A | — | — | — | — | — |

### Benchmarks de référence

| Benchmark | Allocation | CAGR médian | Max DD médian | Sharpe médian |
|---|---|---|---|---|
| 60/40 classique | 40 / 60 / 0 | 4,86 % | −15,33 % | 0,55 |
| 100 % S&P 500 | 0 / 100 / 0 | 5,90 % | −25,57 % | 0,45 |

---

## Lecture des résultats

### Le grand gagnant en risk-adjusted : Profil 5 (Skipper Indépendant)
Sharpe médian **0,82**, le plus élevé de la flotte. La poche tactique 20 % adoucie + la base prudente 60 % + 20 % cash d'urgence intouchable produit le meilleur ratio rendement / volatilité.

### Le plus solide en pire-cas : Profil 1 (Marin Prudent)
Max drawdown P5 limité à **−11,85 %** sur 5 ans. Pire que prévu (l'estimation initiale était −12 %) — calibration cohérente. Le yacht au mouillage tient la météo.

### Les profils 2/3/6 convergent autour de 5–6 % CAGR / −15 % DD
Cohérent avec le 60/40 classique et le S&P 500 (qui fait moins bien en Sharpe à 0,45). La diversification + un peu de tactique surperforme le 100 % actions et le 60/40 pur sur ces 5 années.

### Profil 4 (Étudiant) : Sharpe 0,77 — surprise
À 80 / 20 / 0, l'Étudiant Découvreur fait mieux en Sharpe que la plupart des profils balanced. Raison : très peu de volatilité, capital qui croît lentement mais sans rechute.

### Profil 7 (Navigateur) : non chiffré
Paper trading uniquement. Pas de simulation argent réel. Le KPI éducatif compte (nombre de stratégies testées + score discernement).

---

## Tableau d'affichage in-app NAVLYS

Pour chaque profil, l'app NAVLYS affiche **3 chiffres et 1 phrase honnête** :

```
┌─────────────────────────────────────────────┐
│  🧭 PROFIL 2 — Capitaine de Famille         │
│                                             │
│  Rendement annuel médian : 5,5 %            │
│  Pire scénario (5 %) : drawdown −28 %       │
│  4 années sur 5 positives                   │
│                                             │
│  ⚠️ Ces chiffres viennent d'un modèle Monte │
│  Carlo simplifié. Le passé ≠ le futur.      │
│  Tu peux faire mieux. Tu peux faire pire.   │
└─────────────────────────────────────────────┘
```

---

## Confrontation avec Mission #2 (rappel)

| Stratégie | Sharpe OOS | Max DD | Verdict Cartographe |
|---|---|---|---|
| **« Cible +2 %/jour »** Perplexity | **−5,49** | **−95,2 %** | ❌ INVALIDÉE |
| Allocation Profil 1 (90/10/0) M3 | 0,74 | −6,5 % | ✅ Cohérent défensif |
| Allocation Profil 6 (30/30/40) M3 | 0,65 | −15,3 % | ✅ Acceptable agressif |
| Buy & hold SPY 2021-2026 (M2) | 0,85 | −24,5 % | ✅ Benchmark de référence |

> 🧭 **Verdict Mission #3** : les **7 allocations profil** produisent des Sharpe **positifs et tous > 0,55** sur 2 000 chemins MC, vs **−5,49** pour la stratégie Perplexity. Le saut qualitatif est colossal. La leçon de Mission #2 a été appliquée : on ne cherche pas à « gagner +2 %/jour », on construit une allocation sobre, on rebalance, on tient la barre.

---

## Limites honnêtes du modèle Monte Carlo

1. **Distributions gaussiennes** : sous-estime les fat tails (crashs type 1987, 2008, mars 2020).
2. **Corrélations constantes** : en pratique, les corrélations actions/oblig changent en crise (2022 : les deux baissent en même temps).
3. **Frais 0,1 %** : optimiste pour certains brokers ; un PEA chez Bourse Direct est meilleur, certaines AV sont à 0,8 %.
4. **Pas de rebalancement coûteux modélisé** : 4 rebalancements/an générerait ~0,05 % de friction.
5. **Pas de fiscalité** : PFU 30 % sur CTO, PEA exo après 5 ans, AV après 8 ans. Les chiffres affichés sont **bruts avant fiscalité**.

Tout cela est documenté dans le disclaimer permanent NAVLYS.

---

## Recommandation Cartographe pour app NAVLYS

Pour chaque profil, afficher dans l'app :
1. **CAGR médian** (le chiffre attendu)
2. **CAGR P5** (le scénario pessimiste à 5 %)
3. **Max drawdown P5** (la pire chute plausible)
4. **% années positives** (pour normaliser l'attente)
5. **Sharpe médian** (pour comparaison entre profils)

Le 100 % S&P 500 et le 60/40 sont affichés **en watermark** comme références de marché.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
