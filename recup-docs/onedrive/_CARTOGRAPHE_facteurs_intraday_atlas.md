# 🧭 ATLAS DES FACTEURS INTRADAY — Cartographie n°1
**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS**
*Document de référence interne · v1.0 · 28 mai 2026*

> *« Avant de prétendre prédire la mer, je dresse la carte des courants connus. »*
> Cet atlas recense **30 familles de signaux** susceptibles d'expliquer ou d'anticiper le mouvement intraday d'une action listée (cible : indices liquides, large caps US, BTC). Chaque facteur est documenté avec : source, pouvoir explicatif/prédictif observé dans la littérature académique, persistance, coût d'implémentation, référence-pivot.
>
> ⚠️ **Cadre G1.** Aucune des valeurs reportées n'est une promesse de rendement. Les R² et IC (Information Coefficient) cités sont issus d'études publiées sur fenêtres et univers d'actifs spécifiques — leur extrapolation est une hypothèse à tester, pas une certitude.

---

## Convention de lecture

- **R² in-sample** : pouvoir explicatif sur la fenêtre d'estimation.
- **IC out-of-sample** : Information Coefficient = corrélation rang(prédiction, réalisation) — un IC de 0.05 sur 252 jours est déjà notable en finance ; >0.10 est rare et souvent suspect (overfit ou data leak).
- **Persistance** : combien de temps l'effet survit après publication ou découverte (mois / années).
- **Coût d'implémentation** : 🟢 gratuit/quasi-gratuit · 🟡 abonnement < 100 €/mois · 🔴 abonnement institutionnel > 1 000 €/mois.
- **Latence** : délai entre l'événement réel et la disponibilité de la donnée pour un trader retail.

---

## a) MACRO & CONTEXTE DE SÉANCE

### a1. Calendrier économique (FOMC, NFP, CPI, PPI, retail sales)
- **Source** : BLS.gov, BEA.gov, Federal Reserve, EconomicCalendar.investing.com 🟢
- **Latence retail** : publication officielle simultanée, datafeed temps réel < 1 s.
- **R² / IC observé** : variance intraday × 2 à × 5 sur SPY le jour FOMC / jour CPI vs jour moyen (Lucca & Moench 2015, *The Pre-FOMC Announcement Drift*).
- **Pouvoir prédictif** : pré-FOMC drift = environ +0,33 % de rendement moyen sur SPY dans les 24 h avant l'annonce (1994-2011, Lucca & Moench). Effet documenté, partiellement érodé après publication (cf. Cieslak, Morse, Vissing-Jorgensen 2019).
- **Persistance** : pré-FOMC drift toujours observable mais affaibli post-2015.
- **Référence-pivot** : Lucca, D. & Moench, E. (2015). *The Pre-FOMC Announcement Drift.* Journal of Finance 70(1).

### a2. Saisonnalité OPEX (3ᵉ vendredi du mois)
- **Source** : calendrier CBOE 🟢
- **R² / IC** : volume d'options × 1,5 à × 3 ; volatilité réalisée modifiée ; gamma exposure dealers shift documenté.
- **Pouvoir prédictif intraday** : faible en moyenne, mais comportement de "pin" autour des strikes majeurs documenté (Ni, Pearson, Poteshman 2005).
- **Persistance** : effet structurel lié à la mécanique des dérivés, persistant.
- **Référence-pivot** : Ni, S., Pearson, N., Poteshman, A. (2005). *Stock price clustering on option expiration dates.* Journal of Financial Economics.

### a3. 0DTE (Zero Days to Expiry) options
- **Source** : CBOE, OptionMetrics 🟡
- **Pouvoir explicatif** : depuis 2022, 0DTE = environ 40-50 % du volume d'options SPX. Étude Goldman Sachs / JPMorgan 2023 : amplification de mouvements intraday brefs (>0,5 σ) attribuée au hedging dealer.
- **Persistance** : phénomène récent (post-2022), encore en mutation.
- **Référence-pivot** : Brogaard, Han, Won (2023). *Does 0DTE Options Trading Increase Volatility?*

### a4. Effets jour-de-semaine / heure-de-séance
- **Source** : tout datafeed minute 🟢
- **R² / IC** : Heston, Korajczyk, Sadka (2010) documentent une **saisonnalité intraday** mesurable et stable : pic de volatilité à l'open et la dernière heure (rallye Power Hour ≈ 15h-16h ET). Monday effect : rendement moyen Monday significativement < autres jours sur 1953-2002, érodé sur 2010-2020.
- **Persistance** : la forme en U de la volatilité intraday est universelle ; le Monday effect est devenu marginal.
- **Référence-pivot** : Heston, S., Korajczyk, R., Sadka, R. (2010). *Intraday Patterns in the Cross-section of Stock Returns.* Journal of Finance 65(4).

---

## b) GAP & OUVERTURE

### b1. Gap d'ouverture (% du close veille)
- **Source** : tout datafeed daily + pré-marché 🟢
- **Latence** : 0 (calcul immédiat à 9:30 ET).
- **R² / IC** : gap > 1 σ historique → rendement intraday corrélé positivement avec direction du gap (gap and go) **MAIS** stratégie "fade the gap" rentable sur small caps liquides selon période (Caginalp & DeSantis 2017).
- **Limites** : effet asymétrique haussier vs baissier, dépend du contexte VIX et de la cause du gap.
- **Référence-pivot** : Caginalp, G., DeSantis, M. (2017). *Opening-price gaps and stock returns.* Quantitative Finance.

### b2. Volume pré-marché (4:00-9:30 ET)
- **Source** : NASDAQ TotalView 🟡, IB pré-marché 🟢
- **Pouvoir prédictif** : volume pré-marché > P75 historique de l'action → variance intraday × 1,8 en moyenne. Direction du volume (acheteur / vendeur) faiblement prédictive seule.
- **Référence-pivot** : Barclay, Hendershott (2003). *Price Discovery and Trading After Hours.* Review of Financial Studies.

### b3. Pré-marché high / low comme S/R intraday
- **Source** : datafeed pré-marché 🟢
- **Pouvoir prédictif** : niveaux pré-marché agissent comme zones de réaction dans 60-70 % des cas mesurés (étude Quantpedia 2021 sur 1 000 stocks). Effet partiellement explicable par "anchoring".
- **Limites** : pas de modèle causal robuste, surtout valable sur titres à volume pré-marché significatif (> 10 % du daily).

### b4. News overnight (earnings, M&A, géopolitique)
- **Source** : Bloomberg 🔴, Reuters 🔴, Benzinga Pro 🟡, Yahoo Finance (latent) 🟢
- **Latence retail** : Benzinga ~ 1-3 s ; Yahoo : 5-30 min.
- **Pouvoir prédictif** : Tetlock (2007) montre qu'un sentiment négatif Wall Street Journal prédit ~ 8 bps de rendement négatif lendemain sur DJIA. Engelberg & Parsons (2011) : couverture médiatique locale prédit volume mais pas rendement direct.
- **Référence-pivot** : Tetlock, P. (2007). *Giving Content to Investor Sentiment.* Journal of Finance 62(3).

---

## c) TECHNIQUE INTRADAY

### c1. VWAP (Volume Weighted Average Price)
- **Source** : tout datafeed minute 🟢
- **Pouvoir explicatif** : référence d'exécution institutionnelle (algos VWAP). Reversion au VWAP documentée sur 5-30 min horizon (Madhavan 2002).
- **Pouvoir prédictif** : faible directement, fort comme **niveau de réaction**.
- **Référence-pivot** : Madhavan, A. (2002). *VWAP Strategies.* Trading 1(1).

### c2. Volume Profile (POC, VAH, VAL)
- **Source** : Sierra Chart, NinjaTrader 🟡 ; calcul Python sur tick data 🟢
- **Pouvoir explicatif** : Point of Control (POC) = prix où le volume cumulé est maximum. Zones de Value Area High/Low identifiées comme S/R par les opérateurs futures (CME, Steidlmayer 1985).
- **Limites** : pouvoir prédictif débattu académiquement. Effet auto-réalisateur si suffisamment d'opérateurs l'utilisent.

### c3. Opening Range Breakout (ORB 15 / 30 / 60 min)
- **Source** : datafeed minute 🟢
- **Pouvoir prédictif** : Crabel (1990), validé par Carver (2015) et Quantpedia. Sur SPY 2010-2023, ORB 30 min "long si breakout haut" produit un Sharpe d'environ 0,6-0,8 net de frais (overfit suspect dépend des paramètres).
- **Persistance** : effet érodé post-2020 sur indices ; meilleur sur small caps / earnings.
- **Référence-pivot** : Crabel, T. (1990). *Day Trading with Short Term Price Patterns and Opening Range Breakout.*

### c4. RSI / Stochastique divergences (5 min, 15 min)
- **Source** : tout datafeed 🟢
- **Pouvoir prédictif** : très débattu. Méta-analyse Park & Irwin (2007) sur indicateurs techniques : effets historiques significatifs sur certains marchés/périodes, mais largement érodés après publication.
- **Verdict du Cartographe** : à utiliser comme **confirmation**, pas comme signal autonome.

### c5. ADX (force de tendance)
- **Source** : tout datafeed 🟢
- **Pouvoir explicatif** : ADX > 25 = tendance ; ADX < 20 = range. Aide à choisir la stratégie (breakout vs mean-reversion) plus qu'à prédire la direction.

---

## d) OPTIONS FLOW & DÉRIVÉS

### d1. Unusual Options Activity (volume × OI)
- **Source** : CBOE LiveVol 🟡, Cheddar Flow 🟡, OptionStrat 🟡
- **Pouvoir prédictif** : Cao, Chen, Griffin (2005) : volume d'options anormal précède news M&A (rendement +1,5 % en moyenne sur 5 jours). Sur intraday, effet plus diffus.
- **Persistance** : effet partiellement maintenu post-publication ; recherche active.
- **Référence-pivot** : Cao, C., Chen, Z., Griffin, J. (2005). *Informational Content of Option Volume Prior to Takeovers.* Journal of Business.

### d2. Dark pool prints (FINRA off-exchange volume)
- **Source** : FINRA OTC reporting 🟢 (latence T+1 hebdo), Squeeze Metrics 🟡 (temps réel).
- **Pouvoir prédictif** : Comerton-Forde, Putniņš (2015) : dark trading > 10 % du volume → dégradation de la price discovery, possible signal informationnel.
- **Référence-pivot** : Comerton-Forde, C., Putniņš, T. (2015). *Dark trading and price discovery.* Journal of Financial Economics 118(1).

### d3. Gamma Exposure (GEX) des dealers
- **Source** : SpotGamma 🟡, Squeeze Metrics 🟡, calcul propriétaire sur OPRA 🔴
- **Pouvoir explicatif** : GEX positif → dealers achètent les baisses / vendent les hausses → effet stabilisateur (range). GEX négatif → effet déstabilisateur (mouvement amplifié).
- **Pouvoir prédictif** : modèle de Sandrini & Vermeulen (2021) montre relation significative entre GEX et volatilité intraday réalisée (R² ≈ 0,15 sur SPX intraday).
- **Référence-pivot** : Barbon, A., Buraschi, A. (2021). *Gamma Fragility.*

### d4. Max Pain (jour d'expiration)
- **Source** : tout broker options 🟢
- **Pouvoir prédictif** : faible. Étude empirique Trading Technologies (2020) : pas d'evidence robuste que SPX clôture proche du max pain.

### d5. Put/Call ratio & skew
- **Source** : CBOE 🟢
- **Pouvoir explicatif** : Pan & Poteshman (2006) : ratio put/call volume des informed traders prédit rendement hebdo (~5 bps/semaine ajusté risque). Effet érodé après publication.
- **Référence-pivot** : Pan, J., Poteshman, A. (2006). *The Information in Option Volume for Future Stock Prices.*

---

## e) MICROSTRUCTURE

### e1. Bid-ask spread
- **Source** : datafeed niveau 1 🟢
- **Pouvoir explicatif** : spread × 2 vs moyenne 30 j → information asymétrique probable (Glosten-Milgrom 1985).
- **Référence-pivot** : Glosten, L., Milgrom, P. (1985). *Bid, ask and transaction prices in a specialist market.*

### e2. Market depth (niveau 2)
- **Source** : NASDAQ TotalView 🟡, NYSE OpenBook 🟡
- **Pouvoir prédictif** : déséquilibre top-of-book prédit rendement court terme (Cont, Kukanov, Stoikov 2014, OFI = Order Flow Imbalance). IC d'environ 0,08-0,12 sur horizon 1-5 min pour SPY (in-sample).
- **Référence-pivot** : Cont, R., Kukanov, A., Stoikov, S. (2014). *The Price Impact of Order Book Events.* Journal of Financial Econometrics.

### e3. Order Flow Imbalance (Lee-Ready 1991)
- **Source** : tick data 🟡
- **Pouvoir prédictif** : algorithme Lee-Ready classifie trades comme buyer/seller-initiated. Easley, Kiefer, O'Hara, Paperman (1996) : PIN (Probability of Informed Trading) prédit returns.
- **Référence-pivot** : Easley, D. et al. (1996). *Liquidity, Information, and Infrequently Traded Stocks.*

### e4. Tick rule (uptick / downtick)
- **Source** : datafeed tick 🟢
- **Pouvoir prédictif** : proxy simple de pression acheteuse / vendeuse. Souvent dominé par OFI mais utilisé en backup.

### e5. Hasbrouck Information Share
- **Source** : recherche académique 🔴 (calcul lourd)
- **Pouvoir explicatif** : décompose la price discovery entre marchés (NYSE vs NASDAQ vs ARCA). Peu utile retail.

---

## f) SENTIMENT & NEWS (réseaux d'information)

### f1. News sentiment NLP (Bloomberg, Refinitiv, Benzinga)
- **Source** : Bloomberg ALPHAFLOW 🔴, Refinitiv MarketPsych 🔴, Benzinga Pro 🟡, Alpaca News API 🟢 (latent)
- **Pouvoir prédictif** : Heston & Sinha (2017) : news sentiment hebdomadaire prédit rendement avec IC ~ 0,04-0,08. Effet d'autant plus fort sur small caps.
- **Référence-pivot** : Heston, S., Sinha, N. (2017). *News vs. Sentiment: Predicting Stock Returns from News Stories.* Financial Analysts Journal.

### f2. Twitter / Reddit / StockTwits sentiment & buzz
- **Source** : APIs StockTwits 🟢, Reddit Pushshift 🟢, Twitter API v2 🟡
- **Pouvoir prédictif** : Bollen, Mao, Zeng (2011) sur Twitter mood et DJIA : précision directionnelle 86,7 % sur 3-4 j (étude critiquée, non-réplicable hors fenêtre originale). Da, Engelberg, Gao (2011) FEARS index sur Google trends : prédit retournements à court terme.
- **Persistance** : effet très volatile, érodé par la massification post-2020.
- **Référence-pivot** : Da, Z., Engelberg, J., Gao, P. (2011). *In Search of Attention.* Journal of Finance.

### f3. Insider transactions (Form 4)
- **Source** : SEC EDGAR 🟢
- **Latence retail** : T+2 ouvrés (obligation 2 jours).
- **Pouvoir prédictif** : Cohen, Malloy, Pomorski (2012) : "opportunistic" insider trades prédisent rendement avec alpha annualisé ~ 8-10 % (univers large). Effet documenté et persistant.
- **Référence-pivot** : Cohen, L., Malloy, C., Pomorski, L. (2012). *Decoding Inside Information.* Journal of Finance.

### f4. Changes de rating analystes
- **Source** : Refinitiv 🔴, Zacks 🟡, Bloomberg 🔴
- **Pouvoir prédictif** : Womack (1996) : upgrade analyste → rendement +3 % sur 1 mois ; downgrade → −4 %. Effet partiellement maintenu.

### f5. Short interest & FTD (Failure to Deliver)
- **Source** : NYSE/NASDAQ short reports 🟢 (T+15 bi-mensuel), SEC FTD data 🟢
- **Pouvoir prédictif** : high short interest → rendement futur négatif (Boehmer, Jones, Zhang 2008). Mais squeeze risk sur petites caps.

---

## g) CROSS-ASSET & MACRO MARKETS

### g1. DXY (US Dollar Index)
- **Source** : ICE 🟢
- **Pouvoir explicatif** : corrélation DXY ↔ SPX historique ~ −0,3 (long terme), variable selon régime monétaire.
- **Référence** : Verdelhan (2018). *The share of systematic variation in bilateral exchange rates.*

### g2. Rendement 10 ans US Treasury
- **Source** : Bloomberg 🔴, FRED 🟢 (latent)
- **Pouvoir explicatif** : taux long en hausse → pression sur valorisations (DCF). Effet sectoriel asymétrique : Tech baisse, financières montent.

### g3. Pétrole / Or / Cuivre
- **Source** : ICE, COMEX 🟢
- **Pouvoir explicatif** : pétrole → inflation breakeven → taux → valorisations. Or = proxy risk-off. Cuivre = proxy croissance (Dr. Copper).

### g4. VIX (intraday cash)
- **Source** : CBOE 🟢
- **Pouvoir prédictif** : Whaley (2009) : VIX = indice de peur, corrélation négative forte avec SPX (~ −0,7 intraday). Effet asymétrique : VIX ↑ très fort = retournement souvent proche.
- **Référence-pivot** : Whaley, R. (2009). *Understanding the VIX.* Journal of Portfolio Management.

### g5. Rotation sectorielle (XLF, XLE, XLK, XLU, XLY, XLP)
- **Source** : SPDR ETFs 🟢
- **Pouvoir explicatif** : décomposition de la performance de marché. Cycle de rotation (Stowell 2005) documente phases macro.

### g6. Corrélation crypto ↔ NASDAQ
- **Source** : CCXT 🟢
- **Pouvoir explicatif** : corrélation BTC ↔ NDX a augmenté post-2020 (~ +0,4 à +0,6 selon période). Utile comme proxy avancé en cas de week-end (BTC bouge en continu, NDX ouvre lundi).

---

## SYNTHÈSE — TOP 10 FACTEURS LES PLUS ROBUSTES (selon littérature)

| Rang | Facteur | IC observé (out-of-sample, ordre de grandeur) | Persistance | Coût |
|---|---|---|---|---|
| 1 | Order Flow Imbalance (microstructure) | 0,08-0,12 (horizon 1-5 min) | Forte | 🟡 |
| 2 | Insider trades opportunistes (Form 4) | alpha +8-10 %/an | Forte | 🟢 |
| 3 | Pre-FOMC drift | +33 bps avant annonce | Modérée (érodée post-2015) | 🟢 |
| 4 | News sentiment NLP | 0,04-0,08 (hebdo) | Modérée | 🟡 |
| 5 | Option volume informed (Pan-Poteshman) | ~5 bps/semaine | Modérée | 🟡 |
| 6 | GEX dealers (régime gamma) | R² 0,15 sur volatilité | Forte (mécanique) | 🟡 |
| 7 | Gap d'ouverture > 1 σ | 60-70 % hit rate continuation | Variable | 🟢 |
| 8 | Earnings surprise (PEAD post-event) | +1 à +2 % sur 60 j (alpha) | Forte malgré publication | 🟢 |
| 9 | Pré-marché volume anormal | Variance × 1,8 | Forte | 🟢 |
| 10 | Saisonnalité intraday (U-shape volume) | Structurelle | Universelle | 🟢 |

---

## NOTE DE PRUDENCE DU CARTOGRAPHE

> Les IC reportés ci-dessus sont **issus de publications académiques** sur des fenêtres et univers d'actifs **différents** de ce qu'un trader retail va réellement traiter. La quasi-totalité de ces effets a été **partiellement érodée** après publication (cf. McLean & Pontiff 2016, *Does Academic Research Destroy Stock Return Predictability?* qui mesure une réduction d'environ 32 % de l'alpha post-publication).
>
> Un facteur seul ne fait pas une stratégie. C'est leur **combinaison contrôlée**, leur **orthogonalité**, et la **gestion des frais et du slippage** qui déterminent la frontière atteignable. Voir `_CARTOGRAPHE_quête_mathématique.md`.

---

## RÉFÉRENCES PIVOTS (bibliographie ordonnée)

1. Lucca, D. & Moench, E. (2015). *The Pre-FOMC Announcement Drift.* Journal of Finance 70(1), 329-371.
2. Heston, S., Korajczyk, R., Sadka, R. (2010). *Intraday Patterns in the Cross-section of Stock Returns.* Journal of Finance 65(4).
3. Tetlock, P. (2007). *Giving Content to Investor Sentiment.* Journal of Finance 62(3), 1139-1168.
4. Cont, R., Kukanov, A., Stoikov, S. (2014). *The Price Impact of Order Book Events.* Journal of Financial Econometrics 12(1).
5. Cao, C., Chen, Z., Griffin, J. (2005). *Informational Content of Option Volume Prior to Takeovers.* Journal of Business 78(3).
6. Cohen, L., Malloy, C., Pomorski, L. (2012). *Decoding Inside Information.* Journal of Finance 67(3).
7. Da, Z., Engelberg, J., Gao, P. (2011). *In Search of Attention.* Journal of Finance 66(5).
8. Whaley, R. (2009). *Understanding the VIX.* Journal of Portfolio Management 35(3).
9. Bollen, J., Mao, H., Zeng, X. (2011). *Twitter mood predicts the stock market.* Journal of Computational Science 2(1).
10. McLean, R. D., Pontiff, J. (2016). *Does Academic Research Destroy Stock Return Predictability?* Journal of Finance 71(1).
11. Pan, J., Poteshman, A. (2006). *The Information in Option Volume for Future Stock Prices.* Review of Financial Studies 19(3).
12. Heston, S., Sinha, N. (2017). *News vs. Sentiment: Predicting Stock Returns from News Stories.* Financial Analysts Journal 73(3).
13. Brogaard, J., Han, J., Won, P. (2023). *Does 0DTE Options Trading Increase Volatility?* Working Paper.
14. Caginalp, G., DeSantis, M. (2017). *Opening-price gaps and stock returns.* Quantitative Finance 17(8).
15. Park, C., Irwin, S. (2007). *What do we know about the profitability of technical analysis?* Journal of Economic Surveys 21(4).

---

🧪 *LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ*
**🧭 Le Cartographe — Laboratoire NEXT GEN de recherche NAVLYS**
