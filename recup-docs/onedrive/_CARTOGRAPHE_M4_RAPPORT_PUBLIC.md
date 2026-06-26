# 🧭 LE CARTOGRAPHE — Mission #4
## Rapport grand public — Comprendre ce qu'on a testé

**Laboratoire NEXT GEN de Recherche NAVLYS**
**28 mai 2026**

---

## ⚓ Ce qu'on a fait, en deux phrases

Un internaute (Perplexity, l'IA) a proposé à Bruno une recette de trading avec un **stop-loss qui s'élargit après chaque perte** et un mécanisme de **mise en sécurité progressive des gains**.

Le Cartographe a **testé cette recette sur 5 ans de marché réel**, sur 10 valeurs (TSLA, NVDA, BTC, ETH, etc.), en cinq versions différentes — pour voir laquelle tenait la mer.

---

## 🌊 Métaphore maritime du verdict

> Imagine cinq bateaux de pêche, tous équipés du même filet, partis chercher du thon pendant 5 ans.

| Bateau | Stratégie de filet | Stratégie de cale | Bilan final |
|---|---|---|---|
| 🟦 **A** | Filet rigide 2 m de profondeur | Cale ouverte | Perd 10 000 € sur 100 000 € |
| 🟥 **B** | Filet **élastique** qui s'élargit quand on rate | Cale ouverte | Perd 10 000 € — **et s'épuise** |
| 🟧 **C** | Filet élastique mais borné | Cale ouverte | Perd 10 000 € — moins épuisé que B |
| 🟨 **D** | Filet rigide 2 m | **Bocal à monnaie sécurisé** | Perd seulement 5 800 € + 4 166 € à l'abri |
| 🟪 **E** | Filet élastique borné | Bocal sécurisé | Perd 6 300 € + 3 666 € à l'abri |

**Verdict du Cartographe :** aucun bateau n'a fait fortune. Mais **le bateau D** est revenu au port avec **le moins de pertes** et **une réserve d'or sur le pont**.

---

## 📈 Les chiffres clés (1 par variante, OOS 2024-2026)

| Variante | LE chiffre à retenir |
|---|---|
| **🟦 A** Stop fixe 2% / Take 4% | Perd 9,99 % sur 2,4 ans |
| **🟥 B** AdaptiveStop Perplexity | Sharpe −10 (CATASTROPHE) |
| **🟧 C** AdaptiveStop borné 1-3 % | Sharpe −3,96 |
| **🟨 D** Fixe + Lock/Reinvest 50/50 | **Drawdown réduit de 42 %** |
| **🟪 E** Borné + Lock/Reinvest | Sharpe −3,35 |

---

## 🗺️ Les trois enseignements (que tu peux raconter à un ami)

### 1️⃣ « Élargir le stop après une perte, c'est jouer à la roulette en croyant gagner »
La formule Perplexity (variante B) est ce qu'on appelle un **martingale déguisé**.
Au casino, doubler la mise après chaque perte semble logique — **jusqu'à la ruine**.
En trading, élargir le stop après chaque perte = même mécanisme = même fin.

→ **À l'enterrement, on a inscrit cette formule au catalogue public des invalidations NAVLYS.**

### 2️⃣ « Le bocal à monnaie sur le bateau, ça marche »
Mettre 50 % des gains du jour de côté ne change pas combien on pêche.
Mais ça change ce qu'on **garde** quand la tempête arrive.
Le bateau D a sauvé **4 166 €** que les autres ont perdus.

→ **NAVLYS conserve le Lock 50 % / Reinvest 50 % comme outil de discipline.**

### 3️⃣ « Aucune des recettes ne devient gagnante »
Honnêteté du Cartographe : **les 5 bateaux ont perdu de l'argent** sur 2,4 ans en out-of-sample.
Le moins mauvais (D) a quand même perdu 5,83 %.
Pendant ce temps, **SPY (l'indice américain)** est monté de +91 % et **BTC** de +112 % sur la même période.

→ **La meilleure stratégie tactique testée à ce jour est moins bonne que ne rien faire.**

---

## 📊 Les trois graphiques

### Courbe d'équité — 5 ans

`_CARTOGRAPHE_M4_EQUITY_CURVES.png`

Lecture : aucune courbe ne monte. La courbe D (or) descend le moins.

### Drawdown maximum par variante

`_CARTOGRAPHE_M4_DRAWDOWN_BARS.png`

Lecture : D et E (avec Lock/Reinvest) ont les plus petits drawdowns. Tout autour de −10 % sans Lock.

### Sharpe out-of-sample par variante

`_CARTOGRAPHE_M4_SHARPE_BARS.png`

Lecture : tous négatifs. B catastrophique (−10). D le moins mauvais (−1,46).

---

## ⚓ Recommandation finale (lecture en 30 secondes)

> Si tu suis NAVLYS pour apprendre à investir :
> 1. **Tu peux faire du tactique** sur 5 à 10 % de ton capital — mais avec un **stop fixe à 2 %**, pas une formule "qui s'élargit après les pertes"
> 2. **Tu sécurises la moitié de tes gains** dans un bocal à part (vraiment, dans un compte différent — ça marche)
> 3. **Tu acceptes** qu'aucune méthode testée par NAVLYS n'a battu un ETF Monde passif sur les 5 dernières années
> 4. **Tu ne crois personne** qui te promet "+2 %/jour garanti" — y compris une IA bien intentionnée

---

## 🔬 Pour les curieux : voir la science complète

Trois documents techniques sont publiés à côté de celui-ci :

1. **`_CARTOGRAPHE_M4_ADAPTIVESTOP_VS_FIXED.md`** — Le détail des 5 variantes, tableaux de métriques, bootstrap, stress tests
2. **`_CARTOGRAPHE_M4_LOCK_REINVEST_ANALYSE.md`** — La démonstration mathématique du Lock/Reinvest et son effet asymétrique
3. **`_CARTOGRAPHE_M4_VERDICT_ADAPTIVESTOP.md`** — La preuve scientifique que la formule Perplexity est martingale déguisée

Tous reproductibles avec le script `_CARTOGRAPHE_M4_BACKTEST_5VARIANTES.py` + sa signature SHA-256.

---

## 🧭 Mot de fin du Cartographe

> Sur ce bateau, on dit la vérité. La vérité, c'est qu'**aucune des recettes testées ce mois-ci n'a battu le marché passif**.
> Mais on a sauvé une **technique de discipline** (Lock/Reinvest) et **invalidé publiquement** une formule séduisante qui aurait coulé le navire en silence.
>
> NAVLYS n'est pas un courtier. NAVLYS n'est pas un gourou. NAVLYS est un **laboratoire qui mesure**, qui **publie ce qu'il trouve**, et qui **conserve ce qui résiste** au test des 5 dernières années.
>
> La carte est meilleure aujourd'hui qu'hier. C'est l'essentiel.

---

⚖️ **Disclaimer obligatoire** :
NAVLYS = plateforme d'éducation financière. Bruno Mark Partouche n'est pas inscrit CIF/ORIAS et ne fournit aucun conseil personnalisé. Les calculs sont basés sur des données historiques 2021-2026 via yfinance. Performances passées ne préjugent pas du futur. Toute décision d'investissement reste personnelle.

🧭 **Le Cartographe, Directeur de Recherche, Laboratoire NEXT GEN NAVLYS**
