# 📐 MÉTHODE RETENUE + DÉTAIL DES CALCULS (sans complaisance)
> 22 mai 2026 · Cadre : **éducation financière uniquement, PAS de conseil en investissement.** Chacun reste seul responsable de ses décisions. Les chiffres ci-dessous sont des **illustrations de calcul**, pas des promesses.

---

## 1) LA MÉTHODE QUE JE RECOMMANDE DE GARDER

**Le « 90/10 discipliné + filtre de volatilité (ATR) »**, avec sortie **asymétrique +3 % / −2 %**.
- **90 % = le coffre** : capital intouchable sur ETF monétaires/obligataires courts (SGOV, BIL, ICSH type) → ~4-5 %/an, stable.
- **10 % = la poche active (Capital Plaisir)** : un trade discipliné par jour **uniquement les jours volatils** (filtre ATR), take-profit +3 %, stop-loss −2 %, 10 % des gains reversés au coffre.

**Pourquoi celle-là (et pas une autre) :** c'est la seule qui est à la fois **prouvée et défendable** :
- 🥇 **Simulation rigoureuse** (`Configuration de Combat v2`) : **Sharpe 3,44**, croissance +15-20 %/an annoncée, perte max ~6,4 %/an — et elle dit elle-même « ce n'est PAS du +2 %/jour ».
- 🥈 **Réel vérifiable** : allocation coffre **+11,88 % sur 24 mois** (≈ +5,8 %/an), données Yahoo Finance traçables.
- 🥈 **Reproductible** : le **Trading Lab** (argent virtuel, vraies cotations, backtest auto + Auto-Optimize) permet à chacun de la rejouer **sans risque** → c'est ça, la preuve « virtuelle » honnête.

---

## 2) LE DÉTAIL DE CALCUL POUR ATTEINDRE LES OBJECTIFS (formules + chiffres)

### a) Le seuil de survie : le **win-rate d'équilibre**
Formule : `w* = (SL+frais) / ((TP−frais) + (SL+frais))`

| Sortie | Frais aller-retour | Win-rate nécessaire juste pour ne pas perdre |
|---|---|---|
| +2 % / −2 % | 0 % | **50 %** |
| +2 % / −2 % | 0,2 % | **55 %** |
| **+3 % / −2 %** | 0,2 % | **44 %** ← plus atteignable |

➡️ **Leçon clé** : en +2/−2 avec frais réels, il faut **gagner 55 % du temps** rien que pour l'équilibre. C'est pour ça qu'on passe en **+3/−2** (équilibre à 44 %) et qu'on **ne trade que les bons jours** (filtre ATR).

### b) Rendement annualisé de la poche active (1 trade/jour, +3/−2 net de frais)
Formule : `M = (1+TP−f)^(w·N) · (1−SL−f)^((1−w)·N)`

| Win-rate | 252 jours/an (tous les jours) | **100 jours/an (filtre ATR)** |
|---|---|---|
| 50 % | +97 % | **+31 %** |
| 52 % | +153 % | **+45 %** |
| 55 % | +269 % | **+68 %** |

➡️ Trader **tous les jours** fait exploser les chiffres (effet des intérêts composés quotidiens) — c'est **séduisant mais fragile**. Le **filtre ATR** (moins de trades, mieux choisis) donne des chiffres **tenables**.

### c) Portefeuille total **90/10** (coffre 90 % @ 4,5 %/an)
Formule : `R = 0,90·(1+4,5%) + 0,10·(1+M) − 1`

| Scénario | Poche active | **Portefeuille total/an** |
|---|---|---|
| Prudent (win 52 %, 100 j) | +45 % | **+8,5 %** |
| Réaliste (win 55 %, 100 j) | +68 % | **+10,8 %** |
| Agressif (win 55 %, 252 j) | +269 % | +30,9 % ⚠️ *fragile, non garanti* |

➡️ **Cible crédible retenue : +8 à +12 %/an** sur le portefeuille total. Soit **2 à 4× le Livret A**, sans promettre la lune.

### d) Projection composée — **10 000 € + 100 €/mois**
Formule : `FV = C0·(1+m)^n + PMT·[((1+m)^n − 1)/m]`, avec `m = r/12`, `n = mois`

| Rendement | 1 an | 3 ans | 5 ans | 10 ans |
|---|---|---|---|---|
| 5 %/an | 11 740 € | 15 490 € | 19 634 € | 31 998 € |
| **8 %/an** | 12 075 € | 16 756 € | 22 246 € | **40 491 €** |
| 12 %/an | 12 537 € | 18 615 € | 26 334 € | 56 008 € |

### e) À l'envers : atteindre **100 000 €** (départ 10 k + 100 €/mois)
- à 5 %/an → **26 ans** · à 8 %/an → **19 ans** · à 12 %/an → **14 ans**.
➡️ Pour aller plus vite : augmenter l'apport mensuel (le levier le plus sûr), pas le risque.

---

## 3) ⚠️ CE QUI EST TROP MIROBOLANT (tu m'as demandé d'être franc)

| Annonce trouvée sur les sites | Verdict | Pourquoi |
|---|---|---|
| **+3 123 % sur 10 ans** | 🔴 irréaliste | = **41,5 %/an** composé (niveau Renaissance Medallion, le meilleur hedge fund de l'histoire). Inatteignable en retail. À garder en **R&D interne**, jamais public. |
| **Win-rate 99,86 %** | 🔴 surajusté | Net de frais il faut >55 % ; afficher 99,86 % = backtest « collé » aux données passées, non reproductible en réel. |
| **+25,5 %/an (offre Boost)** affiché comme acquis | 🟠 fragile | ×9,7 sur 10 ans : possible certaines années, **pas garanti**. À présenter comme « potentiel », jamais « moyen acquis ». |
| **« +2 %/jour »** | 🔴 absurde | = **14 597 %/an**. Mathématiquement impossible à tenir. À bannir totalement. |
| Prix liés à un rendement (« +6,3 / 11,1 / 25,5 %/an moyen ») | 🔴 interdit | = **promesse de rendement** → incompatible avec « éducation, pas de conseil ». |

### 🔬 Provenance du « +3 123 % » (vérifié dans le fichier source)
Le chiffre vient de `bruno_backtest_10ans.html`. **Inspection du fichier** : tous les nombres sont **codés en dur** dans le HTML (capital par année, +3 123 %, 99,86 %, et la courbe = tableau `[500,2338,…,402903]` saisi à la main). **Aucun algorithme ne s'exécute, aucune donnée n'est attachée, aucun moteur de calcul.** Le pied de page *affirme* « Données réelles Yahoo Finance · Généré par Manus » sans aucune preuve dans le fichier.
- ❌ Ce n'est **pas** la sortie d'un algorithme testé → c'est une **page de présentation/annonce**, pas un test virtuel ni réel.
- 🔴 Incohérences internes prouvant l'irréalisme : **99,86 % de réussite, max 1 perte en 10 ans, et 0 trade perdant** pendant COVID (59/0), Ukraine (53/0), crash crypto (145/0), boom IA (433/0).
- 🧭 **Contredit par le travail sérieux de Bruno lui-même** : `Configuration de Combat v2` écrit « sur 366 jours testés, exactement zéro journée n'a produit +2 % du capital total » et « +2 %/jour garanti = marketing trompeur ».
- **Décision : abandonner ce chiffre** (ni public, ni « preuve » interne). S'appuyer uniquement sur les tests réels/virtuels (Trading Lab, coffre +11,88 % / 2 ans, Config Combat v2).

---

## 4) LES VÉRITÉS À DIRE (sécurité d'abord — ça renforce ta crédibilité)
- **Frais & slippage** (~0,2 %/trade) mangent une grosse part du rendement → toujours les compter.
- **Fiscalité** : les plus-values sont imposées (à intégrer dans le « net »).
- **Le danger de la martingale** (doubler après une perte) : risque de **ruine**. La version retenue = **mise de base faible (1-2 %), plafonnée**, jamais le doublement illimité.
- **La majorité des particuliers qui tradent perdent de l'argent** (études AMF/SEC). On l'affiche.
- **Le passé ne préjuge pas du futur.** On apprend d'abord en **argent virtuel** (Trading Lab), on passe au réel seulement quand on est prêt, **sur son propre compte**.

---

## 5) POSITIONNEMENT (ce que tu m'as dit)
> « Je ne suis en aucun cas conseil en investissement. Je montre et j'apprends à qui veut comment bien gérer son argent et en tirer le maximum, en pleine sécurité. »

C'est exactement le cadre NAVLYS : **méthode + pédagogie + outils**, chacun décide et agit pour lui-même. Aucune recommandation personnalisée, aucun maniement de fonds.

---
*Disclaimer : information éducative générale. Je ne suis pas conseiller financier. Ceci ne constitue pas un conseil en investissement ni une recommandation. Calculs illustratifs vérifiables (formules ci-dessus). Généré par l'assistant.*
