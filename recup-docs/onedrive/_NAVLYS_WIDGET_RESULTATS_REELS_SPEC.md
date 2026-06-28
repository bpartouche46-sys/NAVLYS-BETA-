# 📈 NAVLYS — Widget "Résultats du Jour en Réel" (Alpaca live)
*Conception 27 mai 2026 · Pour Bruno · Lancement BETA 1ᵉʳ juin · Compte Alpaca prêt à recevoir des fonds*

---

## 🎯 OBJECTIF

Un **encadré simple, clair, transparent**, qui affiche **les résultats réels du jour** des trades NAVLYS sur le compte Alpaca de Bruno. Embarquable sur :
- 🌊 navlys.com (hero homepage + page partenaires)
- ⚓ brunopartouche.com (section partenariat)
- 🤝 Pages partenaires (Alpaca/eToro/...)
- 📰 Tous supports pub (LinkedIn, X, etc.) → image dynamique générée à la volée

---

## 🛡️ COMPLIANCE G1 — règles non-négociables

**À AFFICHER en PERMANENCE** dans le widget :
- ✅ La période exacte des résultats (date / heure de mise à jour)
- ✅ Le P&L réel **avec son signe** (+ ou −)
- ✅ Un disclaimer : *"Performances passées. Ne préjugent pas de résultats futurs. Tout investissement comporte un risque de perte en capital."*

**À NE JAMAIS AFFICHER** :
- ❌ « +X %/jour » comme promesse ou objectif
- ❌ Cumul fictif optimiste
- ❌ Cherry-pick (sélectionner uniquement les jours gagnants)
- ❌ Vocabulaire interdit (cf. communication policy : "conseil patrimonial", "rendement garanti", etc.)

**Transparence radicale** : si la journée est en perte, on l'affiche. C'est ce qui crée la crédibilité long terme.

---

## 🎨 DESIGN ENCADRÉ (3 variantes)

### Variante A — Carré 320×220 (réseaux sociaux)
```
┌─────────────────────────────────┐
│  ⚓ NAVLYS · Résultats du jour    │
│  ─────────────────────────────  │
│                                  │
│      +1.27 %                     │  ← bronze si +, rouge sombre si −
│      ↑ +127 USD                  │  ← P&L absolu
│                                  │
│      3 trades · 12:48 (UTC)      │  ← détail
│  ─────────────────────────────  │
│  Cumul 7j : +3.82 % | YTD: +14.6%│
│  Performances passées · risque   │  ← disclaimer
└─────────────────────────────────┘
```

### Variante B — Bandeau horizontal 728×120 (header sites)
```
┌────────────────────────────────────────────────────────────────────┐
│  ⚓ NAVLYS LIVE  │  Aujourd'hui +1.27% (3 trades) │ 7j +3.82% │ Voir → │
└────────────────────────────────────────────────────────────────────┘
```

### Variante C — Compact 240×60 (sidebar / pub embeddable)
```
┌────────────────────────────────┐
│ NAVLYS · +1.27% jour · 7j +3.82%│
└────────────────────────────────┘
```

---

## 🎨 CHARTE VISUELLE

- **Couleurs P&L** :
  - Positif : `#B87333` (bronze NAVLYS) — pas vert, pour rester sobre
  - Négatif : `#8B2C2C` (rouge sombre) — pas rouge vif, pour ne pas paniquer
  - Neutre / 0% : `#7DD3FC` (ice blue)
- **Fond** : `#02040a` (nuit NAVLYS) avec voile glacier subtil
- **Typo** : Cinzel pour titres, JetBrains Mono pour chiffres, Cormorant Garamond pour disclaimer
- **Animation** : pulse léger toutes les 30s pour signaler "live"

---

## 🔌 ARCHITECTURE TECHNIQUE

### 1. Endpoint backend : `GET /api/results/today`

Source des données : **API Alpaca** (Bruno = compte Bruno Mark, account ID privé).

**Données pull :**
```
GET https://api.alpaca.markets/v2/account     → equity actuel
GET https://api.alpaca.markets/v2/account/portfolio/history?period=1D&timeframe=1Min   → P&L jour
GET https://api.alpaca.markets/v2/orders?status=filled&after=TODAY_00:00   → trades du jour
```

**Données calculées :**
- `pnl_today_pct` (delta equity / equity début jour)
- `pnl_today_usd` (delta absolu)
- `trades_count` (nb d'ordres filled)
- `pnl_7d_pct`, `pnl_ytd_pct` (history period=7D et period=YTD)
- `last_update_utc` (timestamp ISO)

**Réponse JSON :**
```json
{
  "today": { "pct": 1.27, "usd": 127.42, "trades": 3 },
  "week": { "pct": 3.82 },
  "ytd": { "pct": 14.6 },
  "updated_at": "2026-05-27T12:48:00Z",
  "market_status": "open"
}
```

**Caching** : 60 secondes côté serveur (évite de hammer Alpaca + reste "live" enough).

### 2. Frontend widget `/widget/results.js`

Script JS pur, à embarquer via :
```html
<script src="https://navlys.com/widget/results.js" data-variant="bandeau" async></script>
<div id="navlys-results"></div>
```

**Comportement :**
- Au chargement, fetch `/api/results/today`
- Refresh toutes les 60 secondes
- Si marché fermé, affiche P&L "à la clôture" + heure de clôture
- Si erreur API, affiche "Résultats indisponibles" (jamais de fake)

### 3. Image dynamique `/api/results/image.png`

Pour les supports qui ne peuvent pas exécuter JS (LinkedIn preview, Twitter card, emails) :
- Endpoint qui génère un PNG 1200×630 (Open Graph format) avec les chiffres du jour
- Cache 60 sec côté CDN
- Utilise une lib comme `node-canvas` ou `puppeteer` côté backend

### 4. Page `/results` complète

URL publique : `https://navlys.com/results`
- Le widget en grand
- Historique J par J (30 derniers jours en tableau)
- Cumul mois en cours / année
- Graphique simple courbe equity
- Disclaimer renforcé en pied
- **Lien partenariat** : "Ouvre ton compte chez Alpaca et applique la même méthode → ?ref=BP001"

---

## 🔐 CLÉS API ALPACA REQUISES (Bruno me les envoie)

Pour brancher le widget :
1. Va sur https://app.alpaca.markets
2. Compte → **Paper Trading API Keys** (pour TEST) puis **Live Trading API Keys** (pour LIVE)
3. Génère un **API Key ID** + **Secret Key**
4. ⚠️ **Crée des clés SEULEMENT en lecture** (`data-only` ou `read-only`) — surtout PAS de clés trading. Le widget ne doit JAMAIS pouvoir passer des ordres.
5. M'envoie le **Key ID** uniquement (commence par `PK...` pour paper ou `AK...` pour live)
6. Garde le **Secret** pour toi → tu le mettras dans une **variable d'env Vercel** (je te guide pour ça)

---

## 🚦 PLAN DE DÉPLOIEMENT

### Phase 1 — Mode paper trading (avant 1ᵉʳ juin)
- Widget connecté à compte paper Alpaca (argent virtuel)
- Affichage "MODE TEST — DONNÉES SIMULÉES" en bandeau jaune
- Permet de valider visuellement + d'apprendre le rythme

### Phase 2 — Mode live (dès dépôt + 1ᵉʳ trade réel)
- Bascule sur clés live
- Le bandeau "TEST" disparaît
- Widget devient ta vraie vitrine

### Phase 3 — Embed partout (J+1, J+2…)
- Bandeau horizontal sur navlys.com header
- Carré sur brunopartouche.com partenariat
- Compact sur pages partenaires
- Image dynamique sur posts réseaux (kit marketing 10 jours)

---

## 🎁 BONUS — Variante "Trade en cours"

Quand un trade est ouvert :
```
┌──────────────────────────────┐
│  ⚓ NAVLYS · Trade actif       │
│  AAPL Long · +0.43 % | qty 5  │
│  Entry: 175.42 · Now: 176.18  │
│  Stop: 171.00 · TP: 180.00    │
│  ────────────────────────     │
│  Risque maxi: -2.5 % · Kelly 0.4│
└──────────────────────────────┘
```

Bonus pour montrer la méthode 90/10 + Kelly + stop discipliné EN ACTION.

---

## ✅ CHECKLIST AVANT GO LIVE

- [ ] Bruno me transmet le Key ID Alpaca (read-only)
- [ ] Bruno ajoute le Secret en variable d'env Vercel
- [ ] Backend `/api/results/today` codé + testé
- [ ] Widget `/widget/results.js` codé + 3 variantes
- [ ] Page `/results` publique
- [ ] Image dynamique `/api/results/image.png` (Open Graph)
- [ ] Embed sur navlys.com + brunopartouche.com
- [ ] Disclaimer compliance G1 visible partout
- [ ] Test : journée en perte affichée honnêtement
- [ ] Test : marché fermé affiché correctement
- [ ] Test : trade en cours affiché en temps réel

---

## 🎯 IMPACT BUSINESS

| Avant widget | Après widget |
|---|---|
| Les visiteurs lisent des claims, doutent | **Voient la preuve LIVE, croient** |
| Conversion paper → live ~5% | **~25%** (preuve sociale forte) |
| Différenciation vs concurrents (eToro etc.) | **MAXIMALE** — personne d'autre n'ose afficher ses pertes |
| SEO | Page `/results` fraîche chaque jour → Google adore |
| Confiance partenaires brokers | Alpaca/etc. voient le sérieux → meilleurs deals affiliation |

---

*Document de spec prêt. Phase 1 (paper) déployable en 2h dès que Bruno envoie le Key ID Alpaca.*
