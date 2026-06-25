# ⚓⚙️ NAVLYS — Alternatives Alpaca : Brokers API à tester
_Département Banques & Finances NAVLYS · Mission #1 · 28 mai 2026 (J-3)_

> Bruno : « pour l'instant je suis par swift international avec alpaca, c'est long pour transferer une ouverture de compte par exemple, quels sont les autres equivalents alpaca avec qui je dois me connecter et te mettre en test api de suite »
>
> **Objectif** : trouver et lister les alternatives à Alpaca avec API REST + WebSocket + Paper Trading + funding RAPIDE (SEPA Instant, virement local, crypto).
>
> ⚠️ Aucune clé API en clair — placeholders `[À COLLER DEPUIS .env]` partout.

---

## 🚨 CHECKLIST ACTION BRUNO — Priorité J-3 → J+7

- [ ] **J-3 (29 mai)** — **IBKR** : ouvrir compte client (formulaire en ligne ~30 min) — [ibkr.com/registration](https://www.interactivebrokers.com/en/index.php?f=registration)
- [ ] **J-3 (29 mai)** — **Binance Testnet** : créer compte sandbox + clés API (5 min sans KYC) — [testnet.binance.vision](https://testnet.binance.vision/)
- [ ] **J-3 (29 mai)** — **Kraken Futures Demo** : activer compte démo (5 min) — [demo-futures.kraken.com](https://demo-futures.kraken.com/)
- [ ] **J-2 (30 mai)** — **Lemon Markets** : créer compte Paper Trading (15 min) — [lemon.markets](https://lemon.markets/)
- [ ] **J-2 (30 mai)** — Alpaca : générer nouvelle paire clés Paper Trading + Live (5 min, déjà compte existant) — [app.alpaca.markets](https://app.alpaca.markets/)
- [ ] **J-1 (31 mai)** — finaliser KYC IBKR + activer Paper Trading account (auto après KYC validé)
- [ ] **J0 (1ᵉʳ juin)** — fournir à Claude les clés Paper/Sandbox des 5 brokers (via outil sécurisé, pas en clair commit)

---

## 1. Cadre du choix

Critères impératifs pour le cas NAVLYS :
- ✅ **API REST + WebSocket** (pas seulement scraping)
- ✅ **SDK Python officiel ou maintenu**
- ✅ **Paper trading / sandbox** sans funding réel
- ✅ **Funding rapide** (SEPA Instant, virement local, crypto, carte) — pour réduire la latence Mizrahi → broker
- ✅ **Disponible Europe ou Israël** (résidence Bruno)
- ✅ **Cohérent avec mission NAVLYS éditoriale** (pas obligatoire trading pro)

---

## 2. Tableau comparatif — Top 11 brokers/exchanges

| Broker | Pays | Marchés | API Python | Paper trading | Funding rapide | Min deposit | Frais commission | Dispo Israel | Statut |
|--------|------|---------|------------|---------------|----------------|-------------|------------------|--------------|--------|
| **Alpaca** | US | US actions/ETF/Options/Crypto | ✅ `alpaca-py` officiel | ✅ | ❌ SWIFT 2-5 j | $0 | $0 actions, $0.65/contrat options | ✅ via SWIFT | **ACTIF** |
| **Interactive Brokers (IBKR)** | US/EU | Mondial 150+ marchés | ✅ `ib-insync`, IB API officielle | ✅ Paper Trading account | ✅ SEPA + ACH local | $0 (avant min activité) | Variable, tiered | ✅ | **À OUVRIR (#1)** |
| **Trade Republic** | DE | US/EU actions/ETF/Crypto | ⚠️ API non officielle (`tr-pandas`) | ❌ | ✅ SEPA Instant | 0 € | 1 €/ordre | ⚠️ EU only | À ouvrir (compte client) |
| **Tradier** | US | US actions/ETF/Options | ✅ `tradier-py` | ✅ Sandbox | ❌ ACH US only | $0 | $0.35/contrat options | ⚠️ US only | À évaluer si Bruno fait LLC US |
| **TradeStation** | US | US actions/ETF/Futures | ✅ `webapi-tradestation` | ✅ | ❌ ACH | $0 | $0/action | ⚠️ US only | À évaluer |
| **DriveWealth** | US | US actions fractionnées | ✅ B2B API | ✅ | ✅ via partenaires | $0 | varies | ⚠️ via partenaires B2B | Non pertinent (B2B) |
| **Lemon Markets** | DE | DE/EU actions/ETF | ✅ `python-lemon-markets` | ✅ Paper | ✅ SEPA | 0 € | 0 €/ordre (modèle partenaire) | ⚠️ EU only | **À OUVRIR (#2)** |
| **Tinkoff Invest API** | RU | Mondial | ✅ `tinkoff-invest-python` | ✅ Sandbox | ⚠️ sanctions | varies | varies | ❌ | **Bloqué** |
| **Kraken Futures API** | US | Crypto perpetuals/futures | ✅ `krakenex`, `kraken-wsclient-py` | ✅ Demo | ✅ crypto + SEPA | $0 | 0.02-0.05 % | ✅ | **À OUVRIR (#3)** |
| **Binance Spot API** | Global | Crypto | ✅ `python-binance` | ✅ Testnet (sans KYC) | ✅ SEPA, carte, crypto | $0 | 0.1 % spot | ✅ | **À OUVRIR (#4)** |
| **Bitpanda Pro API** | AT | Crypto + actions tokenisées | ✅ `bitpanda-aio` | ❌ (pas de sandbox public) | ✅ SEPA Instant | 25 € | 0.15 % maker | ✅ EU | À ouvrir (#5) |

---

## 3. Détail par broker (top 5 à activer maintenant)

### 🥇 #1 — Interactive Brokers (IBKR)
- **URL inscription** : [ibkr.com/en/index.php?f=registration](https://www.interactivebrokers.com/en/index.php?f=registration)
- **Doc API officielle** :
  - [interactivebrokers.com/api](https://www.interactivebrokers.com/en/index.php?f=5041) (TWS API)
  - [Client Portal API REST](https://www.interactivebrokers.com/en/trading/ib-api.php)
  - `ib-insync` Python wrapper : [github.com/erdewit/ib_insync](https://github.com/erdewit/ib_insync)
- **Mode Paper Trading** : compte Paper auto-créé après KYC, accessible depuis dashboard, fonds virtuels 1M$
- **Funding** : SEPA EU (Wise → IBKR EU), ACH/wire US, virement local
- **Onboarding** : 2-7 j ouvrés (KYC strict, ID + RIB + adresse + question test)
- **Avantages** : standard mondial, multi-marchés, API la plus mature, frais bas, fiable
- **Inconvénients** : interface lourde (TWS), API complexe au démarrage, exige IB Gateway en local
- **Cas Bruno** : ✅ idéal, résident IL accepté, et Paper Trading utilisable dès J+3

**Code Python "hello world" (à exécuter par Claude une fois clés fournies)** :
```python
# connect_ibkr_paper.py — squelette
from ib_insync import IB, Stock
import json, os, datetime

ib = IB()
# Paper trading port = 7497, Live = 7496
ib.connect('127.0.0.1', 7497, clientId=1)

contract = Stock('SPY', 'SMART', 'USD')
ib.qualifyContracts(contract)
ticker = ib.reqMktData(contract, '', False, False)
ib.sleep(2)

result = {
    "broker": "IBKR",
    "mode": "paper",
    "timestamp": datetime.datetime.utcnow().isoformat(),
    "symbol": "SPY",
    "last_price": ticker.last,
    "account_summary": [str(v) for v in ib.accountSummary()[:5]],
}
os.makedirs("_API_TESTS_LOGS", exist_ok=True)
with open(f"_API_TESTS_LOGS/ibkr_{datetime.date.today()}.json", "w") as f:
    json.dump(result, f, indent=2)
ib.disconnect()
print(json.dumps(result, indent=2))
```

---

### 🥈 #2 — Lemon Markets (alternative Alpaca pure EU)
- **URL inscription** : [lemon.markets](https://lemon.markets/)
- **Doc API officielle** : [docs.lemon.markets](https://docs.lemon.markets/)
- **SDK Python** : `pip install lemon` ([github.com/lemon-markets/sdk-python-public](https://github.com/lemon-markets/sdk-python-public))
- **Mode Paper Trading** : ✅ par défaut, gratuit
- **Funding Live** : SEPA EU (Instant si activé)
- **Onboarding** : 15 min Paper, 1-3 j Live (KYC EU)
- **Avantages** : API très propre (REST + WebSocket), pensée API-first, gratuite en Paper
- **Inconvénients** : EU only (pas dispo Israel pour Live, mais Paper OK)
- **Cas Bruno** : ✅ idéal pour test rapide, basculer Live via entité [entité — hors dépôt] FR

**Code Python "hello world"** :
```python
# connect_lemon_paper.py — squelette
from lemon import api
import json, os, datetime

client = api.create(
    market_data_api_token="[À COLLER DEPUIS .env]",
    trading_api_token="[À COLLER DEPUIS .env]",
    env="paper",
)

# Récupérer solde
account = client.trading.account.get()

# Récupérer prix d'un ETF (CSPX = S&P 500 UCITS)
quote = client.market_data.quotes.get_latest(isin=["IE00B5BMR087"])

result = {
    "broker": "Lemon Markets",
    "mode": "paper",
    "timestamp": datetime.datetime.utcnow().isoformat(),
    "account_balance": account.results.balance,
    "cspx_bid": quote.results[0].b,
    "cspx_ask": quote.results[0].a,
}
os.makedirs("_API_TESTS_LOGS", exist_ok=True)
with open(f"_API_TESTS_LOGS/lemon_{datetime.date.today()}.json", "w") as f:
    json.dump(result, f, indent=2, default=str)
print(json.dumps(result, indent=2, default=str))
```

---

### 🥉 #3 — Kraken Futures Demo (crypto perpetuals)
- **URL inscription** : [demo-futures.kraken.com](https://demo-futures.kraken.com/) — pas de KYC pour le demo
- **Doc API officielle** : [docs.kraken.com/futures](https://docs.kraken.com/futures/)
- **SDK Python** : `pip install krakenex` ou [`cryptofeed`](https://github.com/bmoscon/cryptofeed)
- **Mode Demo** : ✅, fonds virtuels
- **Funding Live** : SEPA + crypto
- **Onboarding** : 5 min Demo, 1-3 j Live
- **Avantages** : crypto perpetuals avec API REST + WebSocket pro
- **Inconvénients** : crypto only, complexité futures
- **Cas Bruno** : ✅ pour couche crypto NAVLYS

**Code Python "hello world"** :
```python
# connect_kraken_futures_demo.py — squelette
import requests, json, os, datetime

API_KEY = "[À COLLER DEPUIS .env]"
BASE_URL = "https://demo-futures.kraken.com/derivatives/api/v3"

# Endpoint public — ticker BTC perpetual
r = requests.get(f"{BASE_URL}/tickers")
data = r.json()

btc_ticker = next((t for t in data.get("tickers", []) if t.get("symbol") == "PI_XBTUSD"), {})

result = {
    "broker": "Kraken Futures",
    "mode": "demo",
    "timestamp": datetime.datetime.utcnow().isoformat(),
    "btc_last": btc_ticker.get("last"),
    "btc_bid": btc_ticker.get("bid"),
    "btc_ask": btc_ticker.get("ask"),
}
os.makedirs("_API_TESTS_LOGS", exist_ok=True)
with open(f"_API_TESTS_LOGS/kraken_futures_{datetime.date.today()}.json", "w") as f:
    json.dump(result, f, indent=2)
print(json.dumps(result, indent=2))
```

---

### #4 — Binance Spot API (testnet sans KYC)
- **URL testnet** : [testnet.binance.vision](https://testnet.binance.vision/) — login GitHub, génération clés instantanée
- **Doc API officielle** : [binance-docs.github.io/apidocs/spot](https://binance-docs.github.io/apidocs/spot/en/)
- **SDK Python** : `pip install python-binance` ([github.com/sammchardy/python-binance](https://github.com/sammchardy/python-binance))
- **Mode Testnet** : ✅, fonds virtuels (limite 1000 BTC fictifs)
- **Funding Live** : SEPA, carte, crypto, P2P
- **Onboarding** : 5 min testnet, KYC complet pour Live
- **Avantages** : profondeur de marché énorme, API mature, testnet ouvert
- **Inconvénients** : conformité PSAN AMF si promo en France
- **Cas Bruno** : ✅ test API immédiat, Live à exploiter via Israel ou autre juridiction

**Code Python "hello world"** :
```python
# connect_binance_testnet.py — squelette
from binance.client import Client
import json, os, datetime

API_KEY = "[À COLLER DEPUIS .env]"
API_SECRET = "[À COLLER DEPUIS .env]"

client = Client(API_KEY, API_SECRET, testnet=True)

# Récupération solde
account = client.get_account()
balances = [b for b in account["balances"] if float(b["free"]) > 0][:5]

# Prix BTC/USDT
ticker = client.get_symbol_ticker(symbol="BTCUSDT")

# Place un ordre fictif (testnet, sera rempli si prix proche)
# order = client.create_test_order(
#     symbol="BTCUSDT",
#     side="BUY",
#     type="MARKET",
#     quantity=0.001,
# )

result = {
    "broker": "Binance Spot",
    "mode": "testnet",
    "timestamp": datetime.datetime.utcnow().isoformat(),
    "btc_usdt": ticker["price"],
    "balances": balances,
}
os.makedirs("_API_TESTS_LOGS", exist_ok=True)
with open(f"_API_TESTS_LOGS/binance_testnet_{datetime.date.today()}.json", "w") as f:
    json.dump(result, f, indent=2)
print(json.dumps(result, indent=2))
```

---

### #5 — Alpaca (conserver, optimiser funding)
- **URL** : [app.alpaca.markets](https://app.alpaca.markets/) (compte probable déjà existant)
- **Doc API** : [docs.alpaca.markets](https://docs.alpaca.markets/)
- **SDK Python officiel** : `pip install alpaca-py`
- **Mode Paper** : ✅, 100k$ virtuels, illimité
- **Funding Live** : SWIFT (actuel, 2-5 j), ACH si compte US bank
- **Onboarding** : déjà fait
- **Avantages** : API la plus simple, Python natif, gratuit
- **Inconvénients** : funding SWIFT lent depuis IL, US-centric
- **Cas Bruno** : ✅ garder pour le paper, optimiser funding via Wise USD account

**Code Python "hello world"** :
```python
# connect_alpaca_paper.py — squelette
from alpaca.trading.client import TradingClient
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest
import json, os, datetime

API_KEY = "[À COLLER DEPUIS .env]"
API_SECRET = "[À COLLER DEPUIS .env]"

trading_client = TradingClient(API_KEY, API_SECRET, paper=True)
data_client = StockHistoricalDataClient(API_KEY, API_SECRET)

account = trading_client.get_account()
quote_req = StockLatestQuoteRequest(symbol_or_symbols=["SPY"])
quotes = data_client.get_stock_latest_quote(quote_req)

result = {
    "broker": "Alpaca",
    "mode": "paper",
    "timestamp": datetime.datetime.utcnow().isoformat(),
    "account_cash": str(account.cash),
    "account_equity": str(account.equity),
    "spy_bid": str(quotes["SPY"].bid_price),
    "spy_ask": str(quotes["SPY"].ask_price),
}
os.makedirs("_API_TESTS_LOGS", exist_ok=True)
with open(f"_API_TESTS_LOGS/alpaca_paper_{datetime.date.today()}.json", "w") as f:
    json.dump(result, f, indent=2)
print(json.dumps(result, indent=2))
```

---

## 4. Top 3 recommandés EN PRIORITÉ pour test API immédiat

### 🏆 PODIUM
1. **IBKR** — le standard mondial, multi-marchés, SEPA disponible. → Bruno ouvre compte client + active Paper Trading + lance IB Gateway local.
2. **Binance Testnet + Kraken Futures Demo** — pour la couche crypto. Testnet Binance immédiat (5 min, pas de KYC).
3. **Lemon Markets** — alternative Alpaca pure EU, SEPA Instant, API très propre, paper trading immédiat.

### Pourquoi PAS les autres :
- **Tradier, TradeStation, DriveWealth** : US only, peu pertinents sans LLC US
- **Tinkoff** : sanctions, bloqué
- **Bitpanda Pro** : pas de sandbox public, ouvrir Live directement avec 25 €
- **Trade Republic** : API non officielle, risqué pour intégration prod

---

## 5. Comparatif latence funding (vs SWIFT actuel)

| Broker | Source pivot | Délai cible | Frais cumulés |
|--------|--------------|-------------|---------------|
| **Alpaca (actuel)** | Mizrahi ILS → SWIFT USD | 2-5 j ouvrés | 30-80 ILS + 1-3 % spread |
| **IBKR (cible)** | Wise EUR → SEPA Instant ou USD ACH | 10 sec à 1 j | 0-2 € |
| **Lemon Markets** | Wise EUR → SEPA Instant | 10 sec | 0 € |
| **Kraken Futures** | Wise EUR → SEPA Instant ou Binance Pay USDT | 10 sec - 1 j | 0 € |
| **Binance Spot** | Wise EUR → SEPA Instant ou carte | 10 sec à 1 j | 0-1.8 % carte |
| **Bitpanda Pro** | Wise EUR → SEPA Instant | 10 sec | 0 € |

**Verdict** : tous les alternatifs choisis offrent une latence < 24 h contre 2-5 j pour Alpaca actuel. **Gain opérationnel : ×5 à ×100**.

---

## 6. Plan d'action Claude (autonome, dès clés fournies)

Une fois Bruno fournit les clés via outil sécurisé (jamais en clair commit) :
1. Créer dossier `_API_TESTS_LOGS/` dans `Downloads/`
2. Exécuter les 5 scripts ci-dessus en mode Paper/Testnet
3. Comparer latence aller-retour API
4. Documenter chaque réponse JSON
5. Produire `_API_TESTS_RAPPORT.md` avec :
   - Latences mesurées
   - Ergonomie SDK
   - Couverture instruments
   - Recommandation finale d'architecture de trading
6. Mettre à jour `_NAVLYS_PYRAMIDES_J-3_LIVE.md` avec les résultats

---

## 7. Sécurité — règles clés API

- ❌ **JAMAIS** de clé API en clair dans un fichier `.md` ou `.py` commit
- ✅ Toutes les clés dans `.env` local (gitignore) + Vercel Environment Variables pour prod
- ✅ Toujours générer clés en mode **read-only** d'abord, puis trading après validation
- ✅ Whitelister IP serveur Vercel (range Vercel public) chez chaque broker
- ✅ Activer 2FA sur chaque compte broker
- ✅ Rotation clés tous les 90 jours minimum

---

⚓ _Compilé par Le Trésorier · Département Banques & Finances NAVLYS · 28 mai 2026._
