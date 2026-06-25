# 🧪 TEST RÉEL EN ARGENT VIRTUEL — multi-brokers (avant argent frais)

> Objectif : faire tourner la stratégie NAVLYS 90/10 en **paper trading** (argent virtuel, vrais cours) sur **plusieurs brokers en parallèle**, mesurer les résultats jour/semaine/mois, et ne passer en **argent frais que si les chiffres réels tiennent**.
> 🟢 = à toi (compte + clés). 🔵 = Claude le fait dès que tu m'envoies les exports.
> ⚠️ Claude ne saisit jamais tes clés API / mots de passe — tu les colles toi-même.

---

## 🎯 Méthode (la même partout, pour comparer proprement)

1. Mêmes paramètres sur tous les brokers : panier NVDA / MU / AMD / TSLA / AAPL / MSFT, poche active = 10 % du capital, TP +2,5 %, SL −2 %, plafond martingale, mise à l'abri mensuelle.
2. **Durée mini : 3 mois** de paper continu (idéalement traverser un mois baissier).
3. Chaque soir : exporter le relevé (CSV). 🔵 Je te sors le rapport **jour / semaine / mois / an** + ROI poche active + drawdown + taux de réussite réel.
4. **Critère de passage en argent frais** (à fixer AVANT, pas après) :
   - taux de réussite réel ≥ 52 % (sinon aucun avantage),
   - drawdown max supportable,
   - ≥ 2 brokers cohérents entre eux.

---

## 🏦 Les brokers à tester (paper / démo)

| Broker | Actif testable | Argent virtuel | API auto ? | Idéal pour |
|---|---|---|---|---|
| **Alpaca** | Actions/ETF US | ✅ Paper gratuit | ✅ (clé API) | Automatiser via `nova_bot.py` |
| **Interactive Brokers** | Actions US + monde | ✅ Compte paper | ✅ (TWS/Gateway) | Réalisme pro, exécution sérieuse |
| **eToro** | Actions + crypto | ✅ Portefeuille virtuel 100 000 $ | ❌ (manuel) | Test manuel + dimension sociale/affiliation |
| **Trading 212** | Actions/ETF | ✅ Mode Practice | ❌ | Test manuel simple, mobile |
| **Webull** | Actions US | ✅ Paper trading | partiel | Mobile, carnet d'ordres |
| **TradingView** | Tous (data) | ✅ Paper intégré | via webhooks | Tester les **signaux** visuellement |
| **Binance (testnet/spot)** | Crypto (BTC…) | ✅ Testnet | ✅ | Volet crypto (tu avais déjà du réel BTC) |

> Recommandation : commence par **Alpaca (auto) + eToro (manuel) + IBKR (réalisme)**. Trois angles différents = comparaison solide.

---

## 🟢 ÉTAPE A — Alpaca (le pilier automatisable) — 5 min

1. Crée un compte sur **alpaca.markets** → section **Paper Trading**
2. Génère une **API Key + Secret** (mode Paper)
3. Colle-les dans l'app NAVLYS (`app.html` → « Connecte Alpaca ») OU dans `nova_bot.py` (variables `APCA_API_KEY_ID` / `APCA_API_SECRET_KEY`, base URL `https://paper-api.alpaca.markets`)
4. Lance une session → vérifie qu'un ordre paper passe

> 🔵 Si tu veux, je prépare `nova_bot.py` pour qu'il lise tes clés depuis un fichier `.env` local (jamais en clair, jamais transmis), tourne en paper, et logue tout dans un CSV exploitable.

---

## 🟢 ÉTAPE B — eToro + IBKR (manuel / réalisme) — 15 min

- **eToro** : crée le compte → bascule sur **Portefeuille virtuel** → reproduis les trades du cap du jour.
- **IBKR** : ouvre un **compte Paper Trading** → installe TWS ou IBKR mobile → exécute les mêmes ordres.

---

## 🔵 CE QUE JE FAIS DÈS QUE TU M'ENVOIES UN EXPORT

1. **Rapport honnête jour / semaine / mois / an** : ROI de la poche active, drawdown max, taux de réussite réel, P&L net après frais.
2. **Comparatif inter-brokers** : Alpaca vs eToro vs IBKR (écarts d'exécution, slippage, frais).
3. **Verdict objectif** : « les chiffres réels justifient-ils le passage en argent frais, oui/non, et à quelle taille ? »

---

## 🛟 GARDE-FOUS AVANT L'ARGENT FRAIS

- Ne passe en réel que sur la **poche 10 %** ; les 90 % restent au coffre (bons du Trésor).
- Commence l'argent frais à **taille réduite** (ex. 25 % de la poche) même si le paper est bon.
- Le paper n'a **ni slippage ni émotion** : la réalité est toujours un cran en dessous. Garde une marge.
- Performances passées (même en paper) ≠ performances futures. Ce test sert à **invalider** la stratégie si elle ne marche pas — pas à la « prouver ».
