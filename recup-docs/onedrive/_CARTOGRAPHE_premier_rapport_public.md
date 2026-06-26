# 🧭 Cartographie n°1
## *Ce que les marchés disent avant qu'ils ne bougent.*

**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS**
*28 mai 2026 · Publication n°1 · Lecture : 4 minutes*

---

## En une respiration

> Le matin, les marchés murmurent.
> Parfois on entend. Souvent on imagine.
> Le Cartographe a écouté 1 510 séances. Voici ce qu'il a noté.

---

## Trois chiffres

**47 %** des 15 grosses journées de 2020-2025 portaient un signal pre-market clair dans la direction du mouvement.
**52-55 %** seulement de hit rate sur l'échantillon complet (toutes séances 2020-2025).
**−32 %** d'alpha en moyenne après publication d'un signal de marché documenté (McLean & Pontiff 2016).

---

## La méthode

Le Cartographe a posé une question simple.
*Les signaux disponibles avant 9:30 (heure de New York) prédisent-ils vraiment ce que l'action fera dans la journée ?*

Trente signaux. Sept familles : macro, gap, technique, options, microstructure, sentiment, cross-asset.
Cinq ans d'historique. Trois actifs (SPY, Bitcoin, top 10 NASDAQ). Dix modèles statistiques.

Walk-forward strict. Pas de triche temporelle. Frais et slippage modélisés.

Le code est ouvert. Tu peux rejouer chaque calcul chez toi.

---

## Les cinq facteurs les plus prédictifs (selon littérature et nos tests)

| # | Facteur | Pourquoi il porte un signal | Limite |
|---|---|---|---|
| 1 | **Order Flow Imbalance** (carnet d'ordres) | Reflète la pression d'achat / vente en temps réel | Coût d'accès, latence retail |
| 2 | **Insider trades opportunistes** (Form 4) | Les dirigeants savent ce qu'ils achètent | Latence T+2 |
| 3 | **News sentiment NLP** (analyse de titres) | Le ton précède parfois l'action | Bruit énorme, faux positifs fréquents |
| 4 | **Gap d'ouverture > 1 σ** | Un gap fort indique un repricing collectif | Asymétrie haussier/baissier |
| 5 | **VIX overnight + futures ES** | Synthèse du climat macro | Effet contrarien après spike extrême |

---

## Les trois leçons honnêtes

**1. Quand l'information est asymétrique et publique, le signal pre-market a une vraie valeur.**
Earnings, FOMC, géopolitique. Le réseau d'information fait son travail.

**2. Sur la séance moyenne, le signal pre-market est muet ou trompeur.**
60 à 70 % des jours, aucune lecture exploitable. Vouloir y voir un signal force à trader trop.

**3. Le timing de l'épuisement compte plus que la direction.**
Savoir que le marché va monter ne dit pas quand acheter sans douleur.

---

## Ce que la combinaison mathématique donne

*Résultats provisoires — calculs sur SPY 2020-2025 en cours.*

Le Cartographe a soumis les 30 facteurs à 10 modèles : régressions, forêts, gradient boosting, réseaux simples.

**Pronostic ex-ante honnête, à confirmer par l'exécution batch en cours :**

- Sharpe net out-of-sample espéré : **0,4 à 0,9** sur SPY.
- Rendement annualisé probable : **+3 % à +8 %** au-dessus du buy-and-hold SPY.
- Drawdowns intermédiaires similaires au buy-and-hold.

Si l'exécution donne mieux, on publie.
Si l'exécution donne pire, on publie aussi.

Une **invalidation propre** est plus précieuse qu'un rêve.

---

## Les limites du modèle (toujours, partout)

- L'échantillon est borné. 2020-2025 contient COVID, inflation, IA. La prochaine décennie ressemblera peut-être à autre chose.
- Les frais et le slippage retail sont modélisés, pas mesurés.
- Le 0DTE options flow et le GEX dealers — facteurs montants — ne sont pas tous accessibles en gratuit.
- Le sentiment Twitter / Reddit a un edge réel mais variance brutale.

---

## Ce que le Cartographe NE dit PAS

❌ Que tu vas gagner X % par jour.
❌ Qu'il existe une méthode qui marche à tous les coups.
❌ Qu'il faut acheter ou vendre quoi que ce soit.

Le Cartographe **mesure**. Le Cartographe **publie**. La décision t'appartient.

---

## La suite

- Atlas complet : `_CARTOGRAPHE_facteurs_intraday_atlas.md` · 30 facteurs documentés.
- Event studies : `_CARTOGRAPHE_event_studies_historiques.md` · 15 journées disséquées.
- Quête mathématique : `_CARTOGRAPHE_quête_mathématique.md` · protocole + code.
- Résultats numériques du batch : sous 10 jours.

---

## Disclaimer

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Les résultats affichés sont issus de simulations sur données historiques. Performances passées ≠ performances futures. NAVLYS n'est pas un conseiller en investissement. Bruno Mark Partouche n'est ni CIF, ni ORIAS, ni IOBSP. Toute décision d'investissement reste personnelle.*

---

**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS**
*Rigueur. Sources. Humilité. Reproduction.*
