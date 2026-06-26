# 🧮 MOTEUR DE CALCUL NAVLYS — Spec Nash (8 facteurs)

> 25 mai 2026 · Spec d'ingénierie issue de la conversation Nash NAVLYS, intégrée au QG.
> Se branche sur le **NAVLYS_MOTOR_ENGINE_PACK** existant (les 4 capteurs : Cerveau humain · IA impartiale · Veille mondiale · Stratégies de jeux).
> Pilotes : **Dépt 07 R&D** (moteur) · **Dépt 02** (UI cockpit admin + app) · **Dépt 06** (clés Alpaca paper).

## ⚖️ Cadre non-négociable (rappel)
NAVLYS = **information pédagogique, paper-trading**. Pas de conseil personnalisé, pas de fonds clients encaissés. Le **cockpit admin** de Bruno peut tester en **réel (Alpaca paper API)** sous son nom uniquement. Le **public** voit la simulation et les paramètres ; il décide tout, il gère tout.

---

## 1️⃣ ENCYCLOPÉDIE des formules & principes
**Quoi.** Une base de connaissances consolidée — formules, indicateurs, principes utilisés par les partenaires (Alpaca, Binance, Bybit, autres) + l'**IA spécialisée investissement** d'Alpaca quand exposée par API.
**Où.** `navlys/docs/encyclopedie/` (nouveau) — un MD par concept : `martingale.md`, `kelly.md`, `stop-loss.md`, `slippage.md`, `volatilite-vix.md`, `corr-crypto-actions.md`, `oracles-fed-bce.md`, `alpaca-api.md`, `alpaca-ai.md`…
**Comment.** Chaque fiche = définition, formule, exemple chiffré, lien partenaire, **disclaimer**. Le Dépt 07 ouvre la première vague (10 fiches), enrichi en continu.

## 2️⃣ CALCUL TEMPS RÉEL DU JOUR (pré-ouverture → bulletin matinal)
**Quoi.** Avant l'ouverture, le moteur lit : (a) flux marché (cours, futures, VIX, DXY, or, pétrole, BTC) ; (b) actualité politique/géopolitique (Capteur 3 « Veille Premium ») ; (c) baromètres (Fear & Greed, breadth, calendrier macro/Fed/BCE).
**Formule directrice (extensible).**
```
RiskBudget_du_jour = StartingCapital × RiskPct_base
  × f_volatilité(VIX)            # VIX↑ → réduit
  × f_geo(score_actualite)        # tensions↑ → réduit
  × f_breadth(NYSE up-down)       # mauvais breadth → réduit
  × f_calendrier(events_du_jour)  # FOMC/CPI → bridé
```
**Sortie.** « Bulletin du jour » par client : plage à risque autorisée + 3 paniers d'actifs candidats (cf. §5).
**Cadence.** Recalcul **chaque matin** + **à la demande** pour chaque nouveau client.

## 3️⃣ SLIPPAGE RÉALISTE (vérité terrain, pas papier)
**Constat.** Un stop programmé à `-0,1 %` peut s'exécuter à `-1/-2/-3 %` selon la liquidité.
**Modèle.** `ExecPrice = TriggerPrice × (1 − slippage)` avec `slippage = base(asset) + α × volatility + β × spread_relatif`.
**Calibrage.** Activer **Alpaca paper API** dès maintenant : on **mesure** le slippage réel sur 10–20 ordres types par actif → on **ajuste** `base/α/β`. Le calibrage tourne en continu.
**Conséquence stratégique.** Les seuils proposés à l'utilisateur intègrent **toujours** le slippage modélisé (jamais le seuil papier brut). Honnêteté = avantage concurrentiel.

## 4️⃣ RÉINVESTISSEMENT DES GAINS (0 / 50 / 100 %)
**Paramètre.** `ReinvestPct ∈ {0, 50, 100}`. **Défaut : 50 %.**
**UI cockpit admin.** Sélecteur 3-cliques + bouton « **Tester ce soir** » qui rejoue la journée avec les autres réglages au paper.
**Logique.** Sur réalisation d'un gain net `G` à la clôture d'une position : `Capital_lendemain = Capital + G × ReinvestPct/100`.

## 5️⃣ RÉPARTITION DU RISQUE + 3 MEILLEURS RÉGLAGES
**Quoi.** Le `RiskBudget_du_jour` est éclaté sur N actifs (actions + cryptos). Tous les soirs, l'optimiseur balaye l'espace des paramètres et garde les **3 meilleurs réglages** (rendement net après slippage, drawdown, hit-rate).
**Algorithme.** Backtest glissant (90 j) + walk-forward + scoring : `score = 0.5·CAGR_net − 0.3·MaxDD − 0.2·Var`.
**Standard utilisateur.** Les **Top 3 réglages** sont proposés en standard dans l'app : « Prudent », « Équilibré », « Énergique ». L'utilisateur choisit.

## 6️⃣ CAPITAL DE DÉPART MODULABLE
**Paramètre.** `StartingCapital` — slider **500 € → 100 000 €**, **défaut 2 000 €**.
**Où.** Présent dans **la projection du site** (page d'accueil simulateur) ET dans **l'app** (premier écran après login).
**Garde-fous.** En dessous de 500 € : message pédagogique sur l'effet des frais fixes ; au-dessus de 10 000 € : rappel disclaimer + recommandation de tester en paper d'abord.

## 7️⃣ RENSEIGNEMENT — radar « 007 + journalistes »
**Quoi.** Routine quotidienne pour identifier les **vrais réseaux** porteurs d'info utile à la décision d'achat.
**Verticales surveillées** (Capteur 3 étendu) :
- IA générale & majors (OpenAI, Anthropic, Google DeepMind, xAI, Meta AI, Mistral…).
- **IA militaire & sécurité** (Palantir, Anduril, L3Harris, Lockheed AI, RTX, BAE, Thales, dérivés porteurs).
- **Mémoires & processeurs** pour IA (NVIDIA, AMD, Broadcom, Micron, SK Hynix, Samsung, TSMC, ASML, ARM…).
- **IA médicale** (Recursion, Tempus, Veeva, Schrödinger, Insitro, Isomorphic, gros pharmas AI-enabled).
- **Grands groupes IA-enabled** (cloud hyperscalers, fonds thématiques).
**Sources.** Communiqués officiels (SEC, EDGAR, AMF), feeds Fed/BCE, calendrier macro, comptes presse réputés, podcasts ciblés, transcripts earnings.
**Sortie.** Score d'« attention informée » par actif → priorité dans les paniers du §5.
**Anti-bot, anti-buzz.** On **n'amplifie pas** un signal sans source primaire. Règle 5 : zéro bot.

## 8️⃣ OBJECTIF JOURNALIER VERROUILLÉ
**Quoi.** Une cible **nette** par démarrage d'opération du jour (ex. **+1 %** du capital exposé). On **reste** sur l'objectif jusqu'à l'atteindre.
**Mécanique.**
- À l'ouverture : `DailyTarget = Capital × p%`.
- Les positions sont ouvertes sur plusieurs actifs (§5).
- À mesure que des positions montent, **pyramidage du poids cible** sur les gagnantes ; les perdantes coupées au seuil §3.
- **Stop global** : quand `Σ gains_nets ≥ DailyTarget` → on ferme tout, journée gagnée. Pas d'« encore un peu » émotionnel.
- Si la cible n'est pas atteinte avant T-30 min de la clôture → mode « **retour au port** » (sortie ordonnée, on ne force pas).

---

## 🛠️ INTÉGRATION DANS L'APP NAVLYS

**Côté admin (cockpit perso fondateur)** — `app/admin/cap/` étendu :
- 8 sliders/sélecteurs (un par facteur), chacun mémorisé.
- Bouton **« Bulletin du jour »** (génère le bulletin matinal).
- Bouton **« Tester ce soir »** (rejoue la journée au paper avec d'autres réglages).
- Journal de session (chaque trial → CR).

**Côté public (app NAVLYS)** :
- Page Objectif : `StartingCapital` (slider) + 3 profils standards (Prudent/Équilibré/Énergique = Top 3 §5).
- Page Cockpit : visualisation du `RiskBudget_du_jour`, panier, `DailyTarget`, % atteint.
- Toujours **données de démonstration** côté public (paper). Mention claire.

---

## 📍 ORDRES PAR PAVILLON
- **`@07`** : ouvrir `navlys/docs/encyclopedie/` avec 10 fiches de base (§1) ; coder l'optimiseur §5 + le modèle de slippage §3 ; intégrer les verticales §7 à `NAVLYS_VEILLE_PREMIUM_PACK/data/sources.json`.
- **`@06`** : activer un compte **Alpaca paper API** dédié NAVLYS, ENV vars `ALPACA_PAPER_KEY/SECRET` ; vérifier latence + endpoints data.
- **`@02`** : étendre `/admin/cap` avec les 8 modulateurs ; brancher le slider `StartingCapital` (500 €→100 000 €, défaut 2 000 €) sur `/objectif` ET dans l'app ; afficher Bulletin & DailyTarget.
- **`@QG`** : suivre la conformité (paper-trading public, real réservé à l'admin perso, disclaimers présents).

---

## 🇬🇧 EN — One-line per factor
1. Encyclopedia of formulas & partner principles (Alpaca API + AI). 2. Daily real-time calc absorbing pre-open politics + market barometers → per-client morning bulletin. 3. Realistic slippage modelled and calibrated via Alpaca paper API. 4. Choose 0/50/100 % gains reinvestment. 5. Spread risk across stocks + cryptos; keep top-3 settings as standard user profiles. 6. Starting capital slider 500€ → 100k€, default 2000€, on site & app. 7. "007 + journalists" daily radar across AI verticals (general, military/security à la Palantir, memory & processors, medical AI, AI-enabled majors). 8. Locked daily target: keep going, spread, pyramid winners, exit when hit (or orderly close near market close).

---
> *« Un cap, une main, un jour. »*
> ⚠️ NAVLYS partage une information pédagogique. Ce n'est pas un conseil financier personnalisé. Le trading comporte des risques de perte en capital ; tu décides, tu gères, tu testes en paper avant tout engagement réel. · Educational information only — not personalized financial advice; trading carries risk of loss.
