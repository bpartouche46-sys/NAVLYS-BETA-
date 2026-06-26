# 💎 NAVLYS PAPER TRADING — Spec App + Intégration Site
*Conception 26 mai 2026 · Département Produit/Technique · Pour intégration navlys.com avant 1ᵉʳ juin*

---

## 🎯 OBJECTIF (vision Bruno)

Une **app intégrée navlys.com** permettant d'utiliser NAVLYS **sans avoir besoin d'API broker**. L'utilisateur reçoit **10 000 € virtuels**, choisit ses actions du jour, et reçoit **des signaux temps réel** (achat / vente / hold) basés sur les **vraies cotations Bourse**.

L'utilisateur garde le choix final. Il prend la responsabilité.

**Pourquoi c'est game-changer :**
- ✅ Pas besoin d'attendre KYC broker pour tester NAVLYS
- ✅ Marche avec **tous les brokers du monde** (pas juste ceux avec API)
- ✅ Démontre la valeur AVANT inscription chez partenaire
- ✅ Onboarding éducatif puissant
- ✅ Lead nurturing parfait (30 jours pour convertir au compte réel)

---

## 🔧 ARCHITECTURE TECHNIQUE

### Frontend (navlys.com/paper-trading)
- HTML/CSS/JS pur (cohérent avec stack actuelle)
- localStorage pour persister portefeuille virtuel
- Refresh prix temps réel via WebSocket ou polling 30s

### Backend (à créer)
- API `/api/quote/[ticker]` → relais vers fournisseur de cotations
- API `/api/signal/[ticker]` → calcul du signal NAVLYS du jour
- API `/api/portfolio` → CRUD portefeuille utilisateur (auth required)

### Fournisseur de cotations Bourse (3 options)
| Fournisseur | Gratuit ? | Délai | Couverture | Recommandé |
|---|---|---|---|---|
| **Yahoo Finance** (via lib `yfinance`) | ✅ gratuit | délai 15 min | Global | ✅ Démarrage |
| **Alpha Vantage** | 25 req/jour gratuit | temps réel limité | US + Forex | OK pour MVP |
| **Polygon.io** | 100 req/min gratuit | temps réel | US complet | Bon |
| **Financial Modeling Prep (FMP)** | 250 req/jour gratuit | temps réel | Global | ✅ **Recommandé** (déjà connecté à ton Claude !) |

**Décision** : on commence avec **FMP** (déjà connecté MCP, 250 req/jour gratuit, temps réel) + fallback Yahoo Finance pour les actions non couvertes.

---

## 📐 SPEC FONCTIONNELLE — Parcours utilisateur

### Étape 1 : Inscription paper trading (sans broker)
```
Prospect arrive sur navlys.com
↓
Clique "Essaie le paper trading gratuit"
↓
Inscription minimale : email + WhatsApp + CGU + source (Google/FB/...)
↓
Création portefeuille virtuel 10 000 €
↓
Bienvenue email avec lien dashboard
```

### Étape 2 : Sélection actions du jour
```
Dashboard /paper-trading
↓
NAVLYS suggère 5 actions du jour (curation Bruno)
  - 3 actions "Forteresse" (ETF, blue chips)
  - 2 actions "Cap Plaisir" (small caps, croissance)
↓
User choisit jusqu'à 5 actions à suivre
↓
Watchlist mise à jour
```

### Étape 3 : Signal temps réel
```
Pour chaque action de la watchlist :
  - Prix temps réel (refresh 30s)
  - Signal NAVLYS (ACHETER / VENDRE / HOLD)
  - Pourquoi (1 ligne contexte)
  - Quantité suggérée (selon Kelly fractionné × capital virtuel)
↓
User clique "Acheter" ou "Vendre" → simulé sur portefeuille virtuel
↓
P&L mis à jour en temps réel
```

### Étape 4 : Suivi & conversion
```
Quotidien : email récap performance + 1 cap du jour
↓
Après 7 jours : "Tu as gagné/perdu X € virtuels. Et si c'était réel ?"
↓
CTA : "Ouvre ton compte chez Alpaca/eToro/... (notre partenaire)"
  → tracking via ?ref=BP001
↓
Conversion vers broker réel = commission affiliation
```

---

## 🤖 ALGORITHME SIGNAL NAVLYS (simplifié, transparent)

**Pour chaque action de la watchlist, calcul chaque heure :**

### Indicateurs combinés
1. **Tendance** : prix vs moyenne mobile 20 jours
   - Au-dessus → bias ACHAT
   - En-dessous → bias VENTE
2. **Volatilité** : ATR 14 jours
   - Si > seuil → réduire taille position
3. **RSI 14** : surachat / survente
   - RSI > 70 → ne pas acheter
   - RSI < 30 → opportunité achat
4. **Volume** : confirmation
   - Volume > moyenne 20 jours → signal renforcé

### Signal final
- **ACHETER** : tendance + RSI < 60 + volume confirmé
- **VENDRE** : tendance baissière OU RSI > 70 OU stop atteint (-7% du prix d'achat)
- **HOLD** : aucune des conditions

### Garde-fous (G1 — obligatoire)
- ❌ Jamais "+2%/jour" ou autre promesse de rendement
- ❌ Jamais signal qui pousse à doubler après perte (anti-martingale)
- ✅ Toujours afficher : "Ceci est une suggestion. Tu restes responsable de ta décision."
- ✅ Toujours afficher : "Résultats backtest ≠ rendement futur"

---

## 🎨 UI/UX — Dashboard wireframe

```
┌─────────────────────────────────────────┐
│ ⚓ NAVLYS Paper Trading  |  💰 10 247 € │
│                                          │
│ 🎯 Suggestions du jour (5 actions)      │
│ ┌─────────────┬─────────────┬─────────┐ │
│ │ AAPL        │ MSFT        │ LVMH    │ │
│ │ 175.42 USD  │ 412.18 USD  │ 612 EUR │ │
│ │ 🟢 ACHETER  │ 🟡 HOLD     │ 🔴 VENDRE│ │
│ │ Qty: 5      │ —           │ —        │ │
│ └─────────────┴─────────────┴─────────┘ │
│                                          │
│ 📊 Ton portefeuille                      │
│ AAPL × 10  | +127 € (+1.2%)             │
│ ETF MSCI World × 50 | +89 € (+0.3%)     │
│                                          │
│ 📈 Perf totale 30 jours: +247 € (+2.5%) │
│                                          │
│ 🛒 Acheter        🔄 Vendre        ⚙ Param│
└─────────────────────────────────────────┘
```

---

## 🌐 PAGES PARTENAIRES (1 par broker)

**Structure** : navlys.com/partenaires/[broker] pour chaque broker.

### Template par page partenaire
```
- Hero : logo broker + tagline + score NAVLYS (4/5 étoiles)
- Pourquoi on les recommande (3 points)
- Comparatif vs concurrents (tableau)
- FAQ extraite de leur site officiel (5-10 questions)
  → Avec réponse NAVLYS adaptée (mots-clés, défauts mentionnés)
- Disclaimer affiliation
- CTA : "Ouvre ton compte chez [BROKER] avec NAVLYS" → ?ref=BP001
```

### Liste des pages à créer (V1)
1. /partenaires/alpaca
2. /partenaires/etoro
3. /partenaires/bybit
4. /partenaires/okx
5. /partenaires/binance
6. /partenaires/plus500
7. /partenaires/nas-io
8. /partenaires/revolut

**Impact SEO** : chaque page = +1 entrée Google indexée avec keywords du broker. 8 pages = +8 chances de capter du trafic concurrent qui cherche "[BROKER] avis", "[BROKER] frais", etc.

---

## 🤝 INTÉGRATION FAQ + KEYWORDS PARTENAIRES (SEO)

### Stratégie : "FAQ universelle NAVLYS"
Page `/faq` qui agrège **les vraies questions des utilisateurs des concurrents** + nos réponses.

### Méthode (cf. project_navlys_faq_seo_intel.md)
1. Pour chaque partenaire, **scraper la FAQ officielle** (40-100 questions typiques par site)
2. Sélectionner les **30 plus pertinentes** pour notre cible
3. Réécrire la réponse à la voix NAVLYS, en :
   - Reprenant leurs **mots-clés SEO** (densité longue-traîne)
   - Mentionnant **leurs défauts** factuellement (frais cachés, pas d'API, etc.)
   - Mettant en avant **notre avantage** (méthode 90/10, communauté)
   - Mentionnant qu'ils sont **partenaire** ("Nous travaillons avec [BROKER]")
4. **Schéma JSON-LD `FAQPage`** sur chaque section pour Google Rich Snippets

### Exemple FAQ NAVLYS (extrait)
**Q : Comment ouvrir un compte chez eToro ?**
> R : eToro est notre partenaire. Pour ouvrir un compte, va sur navlys.com/partenaires/etoro et clique sur "Ouvrir un compte eToro". Tu passeras un KYC (~10 min) avant de pouvoir trader.
>
> **Notre avis NAVLYS** : eToro est solide pour le copy trading, mais leurs frais sur les actions individuelles sont supérieurs à Alpaca. Pour les actions US uniquement, on préfère Alpaca. Pour le multi-actifs débutant, eToro est OK.
>
> 👉 Tu peux aussi tester gratuitement avec notre paper trading avant d'ouvrir un vrai compte : navlys.com/paper-trading

---

## 🎁 ONBOARDING AUTOMATIQUE — Gonflage quotidien des réseaux

### Mécanique "1 ami par jour via partenaire"
1. Quand un user finit sa journée de paper trading, on lui propose :
   - "Tu connais quelqu'un qui aimerait NAVLYS ? Invite-le, il a 10 000 € virtuels + tu gagnes un bonus."
2. Lien d'invitation tracké : `navlys.com/?ref=USER_CODE`
3. Quand l'ami s'inscrit → +500 € virtuels au filleul + badge "Capitaine NAVLYS"
4. Affichage automatique sur ses réseaux sociaux (avec autorisation) : "J'ai invité X amis sur NAVLYS"

### Effet réseau attendu
- Si 100 users invitent 1 ami/jour pendant 30 jours = 3 000 nouveaux users organiques
- Coût d'acquisition = 0 € (vs 5-20 € en pub Facebook)

---

## 🚀 PLAN DE DÉPLOIEMENT — PRÉ-1ᵉʳ JUIN

### Cette nuit (autonome, sans Bruno)
- ✅ Spec validée (ce document)
- ⏳ Backend API `/api/quote` (Node.js + FMP relais)
- ⏳ Backend API `/api/signal` (algorithme NAVLYS)
- ⏳ Page `/paper-trading` (frontend HTML/JS)
- ⏳ 8 pages partenaires templates
- ⏳ Page `/faq` avec 30 Q/R intégrant les keywords partenaires

### Demain matin (Bruno valide)
- Bruno teste le paper trading comme un vrai prospect
- Ajustements visuels selon ses retours
- Connexion à Stripe (dès que compte créé) pour upgrade compte payant

### J-1 (31 mai)
- Activation paper trading publique
- Premier post de teasing (cf. kit marketing)

### J0 (1ᵉʳ juin minuit Jérusalem)
- Gate ouverte
- 10 jours de posts auto-programmés dans Publer

---

## 📈 IMPACT BUSINESS

| Métrique | Sans paper trading | Avec paper trading |
|---|---|---|
| Conversion visiteur → inscrit | 2-3% | **8-12%** (pas de friction broker) |
| Conversion inscrit → compte broker | 5% (direct) | **25%** (après 30j de simu réussie) |
| Time-to-revenue moyen | 7 jours | 30 jours mais **3× plus de conversions** |
| SEO pages partenaires | 1 page | **8 pages** indexées |
| Trafic organique potentiel | basique | **+300 mots-clés longue-traîne** |

---

*Prochaine étape : Bruno valide le concept (ce document) et je commence le code backend + frontend cette nuit.*
