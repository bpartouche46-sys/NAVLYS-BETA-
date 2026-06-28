# 🧭 LE CARTOGRAPHE — Mission #5
## Rapport grand public — Le courant invisible qui pousse les vagues

**Laboratoire NEXT GEN de Recherche NAVLYS**
**28 mai 2026**

---

## ⚓ Ce qu'on a testé, en deux phrases

Dans le grand large, il y a **un courant qu'on ne voit pas** : le flux net des achats et des ventes qui circule sous la surface du prix. C'est ce que les chercheurs appellent **l'Order Flow Imbalance** — la marée des ordres.

Le Cartographe a voulu savoir : **peut-on surfer cette marée invisible pour gagner de l'argent ?** Réponse, en clair : **non. Pas avec les cartes qu'on a aujourd'hui.**

---

## 🌊 Métaphore maritime du verdict

> Imagine que tu pêches en Méditerranée. Tu ne vois pas les bancs de poissons sous l'eau — mais tu peux **deviner** où ils vont en regardant le sillage : si le sillage s'épaissit à bâbord, le banc passe par bâbord.

C'est **exactement** l'idée de l'OFI : on regarde le sillage (les volumes signés, achat vs vente) pour deviner où le prix va aller.

Trois problèmes que le Cartographe a découverts :

| Problème | Métaphore maritime | Conséquence |
|---|---|---|
| 🌫️ **Sillage trop flou** | On n'a pas le sonar des pros (le carnet d'ordres tick), juste le radar météo de surface (les barres horaires). | On voit le courant en gros, pas en détail. |
| 🔄 **Mauvais sens du courant** | On pariait que le courant **revient** vite (mean-reverting), mais il **continue** en fait (directionnel). | On entre au mauvais moment, on sort au pire. |
| 💸 **Frais qui mangent la marge** | Chaque coup de filet coûte 0,07 % aller-retour. | Sur 70 coups de filet en 7 mois, ça mange 5 %. |

**Bilan d'1 année de pêche** sur 14 espèces (SPY, QQQ, Apple, Tesla, BTC, ETH...) : **13 sur 14 bateaux rentrent au port à perte**.

---

## 📈 Le chiffre clé à retenir

| Mesure | Valeur |
|---|---|
| Sharpe ratio out-of-sample | **−0,70** |
| Intervalle de confiance 95 % | **[ −1,18 ; −0,25 ]** — totalement négatif |
| Drawdown maximum | **−88 %** |
| Taux de réussite des trades | **20 %** (1 sur 5) |

**Lecture du Cartographe :** quand l'intervalle de confiance **ne touche jamais zéro**, c'est qu'on a une certitude statistique : la stratégie perd de l'argent. Ce n'est pas un coup de malchance — c'est structurel.

---

## 🗺️ Les trois enseignements (que tu peux raconter à un ami au port)

### 1️⃣ « Le courant invisible existe — mais pas dans nos jumelles à 0 € »

L'OFI réel se mesure **au tick-by-tick** dans le carnet d'ordres des bourses (NYSE, Nasdaq). Les chercheurs ont prouvé que ce signal **est puissant** (Cont, Kukanov & Stoikov 2014, R²≈0,65 sur l'instant).

Mais ce sonar coûte cher : ~100 €/mois chez Polygon.io, ou un compte broker pro chez Interactive Brokers. **Yahoo Finance, gratuit, ne le donne pas.** Le Laboratoire a donc utilisé un **proxy** (la « jumelle de marin » au lieu du « sonar pro »).

→ **Conclusion honnête :** ce qu'on a invalidé, c'est **le proxy** — pas la théorie. Pour trancher définitivement, il faut payer le sonar.

### 2️⃣ « On pensait surfer le retour — c'était la déferlante qui partait »

Le Cartographe avait construit la règle ainsi : *« quand le déséquilibre acheteur est extrême, le prix va revenir à la moyenne dans 1 à 3 heures »*. **C'est faux.**

Le déséquilibre acheteur extrême signifie **« le mouvement continue encore 1 à 5 minutes »** — pas « il se retourne ». On a misé contre la vague au moment où elle prenait sa puissance maximale.

→ **Leçon pédagogique :** un signal microstructure se trade **dans le sens** du signal sur quelques minutes, pas **contre** sur quelques heures. Erreur de calibrage d'horizon temporel.

### 3️⃣ « Le Laboratoire dit non — et c'est ça qui fait gagner du temps »

| Hypothèses publiées par le Laboratoire au 28 mai 2026 | Verdict |
|---|---|
| « +2 %/jour garanti » (M2) | ❌ INVALIDÉE |
| AdaptiveStop Perplexity (M4-B) | ❌❌ INVALIDÉE catastrophique (martingale déguisée) |
| Stop fixe + Take 4 % (M4-A) | ❌ INVALIDÉE |
| Lock/Reinvest 50/50 (M4-D) | ⚠️ VALIDÉE PARTIELLE (protection, pas edge) |
| **OFI proxy Lee-Ready (M5)** | ❌ **INVALIDÉE** |

**On a maintenant 6 invalidations publiques, 1 validation partielle, 0 stratégie tactique pleinement gagnante.**

→ Chaque « non » du Laboratoire est **une économie réelle** pour l'utilisateur qui aurait essayé tout seul.

---

## 🧭 Pourquoi le Cartographe publie un échec ?

Parce que c'est **la raison d'être** du Laboratoire NEXT GEN :

> *« Notre meilleur résultat : avoir publié les hypothèses qui ont échoué. »*

Sur les réseaux, sur YouTube, sur Telegram, **personne ne publie jamais ses stratégies perdantes**. Le Cartographe, lui, **les publie autant que les gagnantes**. C'est ça, la méthode scientifique appliquée à la finance.

Si demain quelqu'un te propose un *« signal OFI miracle à 49 €/mois »* — tu pourras pointer ce rapport et demander : *« montre-moi ton bootstrap IC95 sur 14 actifs hors échantillon ? »*

---

## ⚓ Action côté Bruno

Trois décisions :

1. **Connecter un feed payant** (Polygon.io ~100 €/mois) pour qualifier OFI strict ?
2. **Inscrire M5** dans le catalogue public des invalidations sur navlys.com.
3. **Publier ce rapport** sur LinkedIn / newsletter : *« 6e hypothèse invalidée par le Laboratoire »*.

## ⚓ Action côté Claude

Trois prochaines étapes :

1. **Mission #6** : tester les *Insider Trades opportunistes* (Form 4 SEC) — la 2e hypothèse Perplexity restante.
2. **Note méthodologique** : *« Pourquoi un proxy OHLCV ne remplace pas le carnet d'ordres ».*
3. **Mise à jour navlys.com** : compteur catalogue à `0 / 1 / 6`.

---

## 📌 Disclaimer permanent

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Résultats issus de simulations sur données historiques. Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement (Bruno Mark Partouche n'est pas CIF/ORIAS). Toute décision d'investissement reste personnelle.*

---

🧪 *LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ*
**🧭 Le Cartographe — Directeur de Recherche, Laboratoire NEXT GEN de recherche NAVLYS**
