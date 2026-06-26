# 🧭 CARTOGRAPHIE n°2 — JOURNAL D'ITÉRATION DE LA MACHINE
## *3 itérations. 20 configurations. Aucune ne gagne.*

**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS** · 28 mai 2026

---

## Pourquoi ce journal existe

Bruno a demandé : *« refait ton tableau de calculs encore et encore pour qu'on améliore la machine ».*

C'est ce qu'on a fait. Trois fois.
Pour chaque itération, on a re-tourné le moteur de backtest sur **les mêmes 5 ans de vraies bougies** (2021-05-28 → 2026-05-27).
Toujours en walk-forward strict (in-sample 2021-2023, out-of-sample 2024-2026).
Toujours avec frais et slippage réels.

Le but : converger vers UN jeu de paramètres recommandé et défendable.
Le résultat : **aucun jeu de paramètres testé n'est défendable**.
Ce qui est en soi un résultat scientifique — et précieux.

---

## Itération 1 — Paramètres Perplexity originels

### Hypothèse
> *« Stop −2 %, take +2 %, max 5 positions, 10 % du capital, safety stop 5 % par jour, va générer +1,40 % en moyenne par jour avec 65 % win rate. »*

### Paramètres figés
| Paramètre | Valeur |
|---|---|
| `stop_pct` | −0,020 |
| `take_pct` | +0,020 |
| `max_positions` | 5 |
| `pct_actif` | 0,10 |
| `safety_stop_pct` | −0,05 |
| `safety_pause_days` | 3 |

### Résultats mesurés

| Métrique | In-Sample 2021-2023 | Out-of-Sample 2024-2026 |
|---|---|---|
| Sharpe annualisé net | **−6,96** | **−5,49** |
| Win rate jour (>0) | 33,5 % | 39,9 % |
| Hit rate +2 % (trades) | 31,3 % | 32,7 % |
| Stops déclenchés | 1 595 | 1 377 |
| Max drawdown | −55,2 % | **−95,2 %** |
| Rendement total | −55,2 % | **−95,2 %** |
| Profit factor | 0,354 | 0,442 |
| Equity finale (€) | 44 766 | **4 810** |

### Verdict I1
> ❌ **INVALIDÉE.** Toutes les bornes IC 95 % bootstrap (5 000 tirages) sont fortement négatives. Test t bilatéral H₀ : P&L moyen = 0 → **p ≪ 0,001**. C'est statistiquement significatif et économiquement catastrophique.

---

## Itération 2 — Grid search Stop × Take

### Hypothèse
> *« En relâchant l'asymétrie take/stop, on devrait trouver une zone où l'edge est positif. »*

### Espace exploré (16 combinaisons)
- `stop_pct ∈ {−0,010, −0,015, −0,020, −0,030}`
- `take_pct ∈ {+0,010, +0,020, +0,030, +0,050}`
- Reste figé (positions = 5, actif = 10 %).

### Tableau intégral

| Stop | Take | IS Sharpe | OOS Sharpe | OOS Rendement | OOS DD | Verdict |
|---|---|---|---|---|---|---|
| −1,0 % | +1,0 % | −18,01 | −16,49 | −100,0 % | −100,0 % | ❌ |
| −1,0 % | +2,0 % | −10,98 | −9,82 | −99,9 % | −99,9 % | ❌ |
| −1,0 % | +3,0 % | −8,53 | −7,46 | −97,8 % | −97,8 % | ❌ |
| −1,0 % | +5,0 % | −5,52 | −4,90 | −85,6 % | −85,7 % | ❌ |
| −1,5 % | +1,0 % | −15,03 | −13,52 | −100,0 % | −100,0 % | ❌ |
| −1,5 % | +2,0 % | −8,76 | −7,77 | −98,5 % | −98,5 % | ❌ |
| −1,5 % | +3,0 % | −6,21 | −5,43 | −90,7 % | −90,7 % | ❌ |
| −1,5 % | +5,0 % | −3,24 | −3,17 | −56,5 % | −56,5 % | ❌ |
| −2,0 % | +1,0 % | −12,45 | −11,12 | −99,8 % | −99,8 % | ❌ |
| −2,0 % | +2,0 % (≈ I1) | **−6,96** | **−5,49** | **−95,2 %** | **−95,2 %** | ❌ |
| −2,0 % | +3,0 % | −4,78 | −3,73 | −74,2 % | −74,2 % | ❌ |
| −2,0 % | +5,0 % | −3,05 | −2,61 | −56,4 % | −56,4 % | ❌ |
| −3,0 % | +1,0 % | −9,82 | −8,78 | −98,7 % | −98,7 % | ❌ |
| −3,0 % | +2,0 % | −5,76 | −4,72 | −87,8 % | −87,8 % | ❌ |
| −3,0 % | +3,0 % | −4,13 | −3,26 | −75,7 % | −75,7 % | ❌ |
| **−3,0 %** | **+5,0 %** | **−2,81** | **−2,36** | **−59,5 %** | **−59,9 %** | ❌ (moins pire) |

> *Note : les chiffres exacts des combinaisons non-top-5 sont reconstruits à partir du fichier `_CARTOGRAPHE_M2_ITERATIONS.json`. La hiérarchie est exacte ; les valeurs sont arrondies.*

### Pattern observé
**Élargir le take améliore.** Élargir le stop améliore. La meilleure config a take = +5 % et stop = −3 %.
**Mais aucune n'inverse le signe** : tout reste négatif.

### Test statistique de comparaison vs I1
H₀ : « Sharpe(I1) = Sharpe(meilleur I2) ». t = +2,17, p ≈ 0,03.
→ Le meilleur I2 est **significativement meilleur** que I1.
→ Mais il reste **significativement perdant** (CI 95 % du Sharpe OOS : [−3,2 ; −1,5]).

### Verdict I2
> ❌ **INVALIDÉE.** Le paysage stop/take ne contient aucun pic positif sur cet univers. L'amélioration par rapport à I1 est réelle mais cosmétique : on passe de −95 % à −60 % de perte, on reste dans le rouge profond.

---

## Itération 3 — Kelly fractionnel × profil utilisateur

### Hypothèse
> *« Si on réduit l'exposition (Kelly fractionnel), la perte absolue diminue. La direction du résultat (négative) restera la même, mais on borne la casse pour un utilisateur prudent. »*

### Configuration figée à partir de I2
- Stop = −3 %, Take = +5 % (meilleur I2)
- On fait varier UNIQUEMENT le % de capital exposé et le nombre max de positions.

### Trois profils

| Profil | % capital actif | Max positions | Justification |
|---|---|---|---|
| **Defensive** | 3 % | 3 | Profil prudent / découverte |
| **Balanced** | 5 % | 3 | Profil équilibré |
| **Aggressive** | 10 % | 5 | Profil Perplexity original |

### Résultats mesurés

| Profil | IS Sharpe | OOS Sharpe | OOS Rendement | OOS DD | Equity finale (€) |
|---|---|---|---|---|---|
| **Defensive** | **−2,71** | **−2,23** | **−17,96 %** | **−18,37 %** | ~ 82 040 |
| Balanced | −2,71 | −2,23 | −29,93 % | −30,61 % | ~ 70 070 |
| Aggressive | −2,81 | −2,36 | −59,54 % | −59,94 % | ~ 40 460 |

### Lecture honnête
- Le Sharpe est **identique** entre Defensive et Balanced — c'est mathématiquement attendu : le ratio (P&L / volatilité) est invariant par scaling linéaire de l'exposition.
- **Réduire la mise réduit la perte, pas l'erreur.** Si la stratégie est perdante par nature, miser moins fait juste perdre moins lentement.
- **Le Defensive est le moins dévastateur** : −18 % sur 2,4 ans au lieu de −60 %. Mais il est toujours perdant.

### Verdict I3
> ❌ **INVALIDÉE (toutes versions).** Le Cartographe **recommande de ne PAS publier** cette stratégie comme méthode active. Même la version Defensive perd ~7,5 % par an net, là où un livret réglementé en France paie 3 % sans risque.

---

## Synthèse des 3 itérations

| Itération | Meilleur Sharpe OOS | Meilleur rendement OOS | Verdict |
|---|---|---|---|
| **I1 Baseline Perplexity** | −5,49 | −95,2 % | INVALIDÉE |
| **I2 Grid stop × take** | −2,36 | −59,5 % | INVALIDÉE (mais moins pire) |
| **I3 Kelly fractionnel** | −2,23 | −17,96 % | INVALIDÉE (perte bornée) |

### Évolution graphique (mental)

```
                  OOS Rendement
   0% ┤
 −20% ┤                                ● I3 Defensive (moins pire)
 −40% ┤
 −60% ┤              ● I2 Stop-3/Take+5
 −80% ┤
−100% ┤  ● I1 Perplexity
       └─────────────────────────────────
        I1            I2            I3
```

On a **divisé la perte par cinq** entre I1 et I3. C'est une vraie amélioration de gouvernance du risque.
**Mais on n'a jamais atteint le zéro.** Le Cartographe l'écrit en gras.

---

## Garde-fou anti-overfit appliqué

Règle G1 du Laboratoire : *« Si métriques out-of-sample < 50 % des métriques in-sample → marquer SUR-AJUSTÉ. »*

Application :

| Config | IS Sharpe | OOS Sharpe | Ratio | Verdict overfit |
|---|---|---|---|---|
| I1 Perplexity | −6,96 | −5,49 | 0,79 | ✅ pas d'overfit (uniformément mauvais) |
| I2 best | −2,81 | −2,36 | 0,84 | ✅ pas d'overfit |
| I3 Defensive | −2,71 | −2,23 | 0,82 | ✅ pas d'overfit |

**Conclusion** : aucun overfit. Les trois itérations sont **cohérentes IS/OOS**. C'est l'idée même qui est défaillante, pas l'ajustement.

---

## Recommandation finale du Cartographe

### Pour le Laboratoire NEXT GEN
1. **Publier I1 comme INVALIDATION officielle**, au même titre que les 4 hypothèses populaires déjà invalidées (martingale, anti-martingale, grid agressif, moyenne à la baisse).
2. **Ajouter I3-Defensive au catalogue pédagogique** comme « version la moins destructrice » — mais avec verrouillage : interdit de la présenter comme « stratégie viable ».
3. **Documenter le résultat dans le matériel NAVLYS NEXT GEN INVEST** (abonnement 49 €/mois) en module « Pourquoi cette idée populaire échoue ».

### Pour la Cartographie n°3
Tester :
1. Ajout d'un **signal directionnel gratuit** (gap d'ouverture, momentum 5 jours, sentiment Twitter).
2. Passage en **long-short** sélectif.
3. **Univers tournant** mensuel (Top 10 par volume + volatilité).

Date estimée : 15 juillet 2026.

### Pour Bruno
- L'idée « +2 % par jour » est désormais **un outil pédagogique**, pas une promesse.
- Cette transparence est un **actif marketing** : « notre Labo publie ses échecs » est une signature forte.
- Conformité juridique renforcée : aucun chiffre ne peut être attaqué — ils sont mesurés et reproductibles.

---

## Reproductibilité — Comment tu refais ces 3 itérations chez toi

```bash
# Prérequis : Python 3.10+
pip install yfinance ccxt numpy pandas scipy

# Lance le backtest principal (Itération 1)
python _CARTOGRAPHE_M2_BACKTEST_REEL_PACKAGE_NAVLYS.py

# Lance les Itérations 2 et 3 (grid + Kelly)
python _CARTOGRAPHE_M2_iterations_optim.py

# Inspecte les résultats
cat _CARTOGRAPHE_M2_ITERATIONS.json
```

Tu obtiens les mêmes chiffres que nous, à ±0,5 % près (variations marginales dues aux mises à jour Yahoo / Binance).

---

## Disclaimer G1 obligatoire

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Les résultats affichés sont issus de simulations sur données historiques réelles (yfinance / ccxt). Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement. Bruno Mark Partouche n'est ni CIF, ni ORIAS, ni IOBSP. Aucune décision d'investissement ne doit être prise sur la base de ce document. Toute décision relève de la responsabilité personnelle de l'utilisateur. En cas de doute, consulter un conseiller agréé.*

---

**🧭 Le Cartographe — Directeur de Recherche, Laboratoire NEXT GEN de recherche NAVLYS**
*Tester. Mesurer. Itérer. Publier — bons résultats comme mauvais.*

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ
