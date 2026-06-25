# 🧭 CARTOGRAPHE — Mission #3 · Les 7 Profils utilisateurs NAVLYS
**🧭 Le Cartographe — Directeur de Recherche · Laboratoire NEXT GEN NAVLYS**
*Verrouillé le 28 mai 2026 — document maître. Toute personnalisation de routine NAVLYS dérive de ce fichier.*

---

## Préambule — Pourquoi 7 profils, pas 700

NAVLYS n'est **ni un conseiller financier, ni un robo-advisor**. NAVLYS est un **éducateur à la décision** qui propose un **template de routine** adapté au **point de départ** d'un utilisateur — point. L'utilisateur reste seul maître de sa main sur la barre.

> ⚖️ **G1 — Rappel permanent.** Aucun profil ci-dessous n'a accès :
> 1. à la stratégie « cible +2 %/jour » (invalidée Mission #2, Sharpe OOS −5,49, drawdown −95,2 %),
> 2. à la martingale, à l'anti-martingale, à la moyenne baisse sur thèse cassée,
> 3. au grid agressif non-borné, au leverage > 1×, aux produits dérivés à perte non plafonnée,
> 4. **à la formule AdaptiveStop Perplexity = MAX(0,001 ; (Cible−ΣPnL)/N_restants)** — invalidée Mission #4, Sharpe OOS −10,06, IC95 [−13,3 ; −7,5], martingale déguisée + collapse vers plancher. Réf. `_CARTOGRAPHE_M4_VERDICT_ADAPTIVESTOP.md`.
> Ce qui n'est pas listé dans la colonne « Stratégies actives autorisées » est **interdit**, point.

> ✅ **Mission #4 — Mécanisme de discipline VALIDÉ partiellement.** **Variante D = Stop fixe 2 % + Lock 50 % / Reinvest 50 %** validé comme **protecteur** (DD réduit −42 % vs baseline A, pas d'edge créé). Proposé **par défaut** dans les profils ayant une poche tactique active : **Pro Actif (6), Entrepreneur en Croissance (3), Skipper Indépendant (5)**. Réf. `_CARTOGRAPHE_M4_LOCK_REINVEST_ANALYSE.md`.

Sept profils suffisent à couvrir 95 % des utilisateurs NAVLYS BETA. Le degré de personnalisation interne (defensive / balanced / aggressive) ajoute une finition sans multiplier les cases.

---

## Tableau maître — 7 profils en un coup d'œil

| # | Profil | Métaphore maritime | Capital typique | Cadence | Stratégie active ? |
|---|---|---|---|---|---|
| 1 | 🛡️ Le Marin Prudent | Yacht au mouillage en baie abritée | 50 000 – 500 000 € | Trimestrielle | ❌ Non |
| 2 | 👨‍👩‍👧 Le Capitaine de Famille | Voilier familial, cap long | 10 000 – 100 000 € | Mensuelle | ⚠️ 1 (Donchian doux) |
| 3 | 🚀 L'Entrepreneur en Croissance | Catamaran rapide | 20 000 – 200 000 € | Hebdomadaire | ✅ 2 (Donchian + Stat-arb light) |
| 4 | 🌱 L'Étudiant Découvreur | Optimist d'apprentissage | 100 – 5 000 € | Mensuelle (DCA auto) | ❌ Non (apprentissage seul) |
| 5 | 🧭 Le Skipper Indépendant | Voilier de croisière côtière | 5 000 – 50 000 € | Mensuelle | ⚠️ 1 (Donchian doux) |
| 6 | 💼 Le Pro Actif | Goélette de course | 100 000 € + | Quotidienne (light) | ✅ 2 validées (Donchian + Stat-arb) |
| 7 | 🌊 Le Navigateur Curieux | Simulateur de bord | 0 € réel (1 000–10 000 € papier) | Quotidienne (paper) | 🔬 Toutes (paper trading) |

---

## PROFIL 1 — 🛡️ Le Marin Prudent

**Métaphore.** Yacht solide ancré dans une baie abritée. Le but n'est pas d'aller plus vite, c'est de **ne pas couler**.

### Persona type
- **Âge** : 55 – 90 ans.
- **Situation** : retraité, pré-retraité, héritier conservateur, professionnel libéral fin de carrière.
- **Capital de départ** : 50 000 € à 500 000 €.
- **Objectif de vie** : préserver le pouvoir d'achat, financer la retraite/voyages/petits-enfants, transmettre.
- **Tolérance au risque** : très faible. Une perte > 10 % sur l'année déclenche du stress réel.

### Allocation cible
- **Prudent : 90 %** (obligations courtes EUR/USD investment-grade + ETF monde dividendes faible volatilité)
- **Balanced : 10 %** (ETF MSCI World tout pondéré)
- **Tactique : 0 %**

### Cadence d'intervention
**Trimestrielle** (15 min tous les 3 mois). Hebdo/quotidien : interdit (sur-réaction garantie).

### Univers d'actifs recommandé
- Obligations souveraines courtes (EUR + USD)
- ETF Vanguard Global Aggregate Bond
- ETF iShares MSCI World Quality Dividend
- Livret A / Livret Bleu / fonds €
- **Interdit** : crypto, actions individuelles, leverage, options, futures.

### Stratégie active autorisée
❌ **AUCUNE**. Le Marin Prudent vit en **buy & hold rebalancé une fois par trimestre**.

### Performance honnête attendue (modèle 60/40 long terme + ajustement allocation 90/10)
- **CAGR raisonnable** : 2,5 – 4 %/an net inflation
- **Volatilité estimée** : 4 – 6 %/an
- **Probabilité de perte > 20 % sur 1 an** : ≈ 1,5 % (Monte Carlo)
- **Horizon recommandé minimum** : 3 ans
- **Pire scénario plausible** : −12 % sur année type 2022

### Alertes G1 spécifiques
- ❌ Pas un seul euro en stratégie active.
- ❌ Pas de crypto (volatilité incompatible).
- ❌ Pas d'actions individuelles (concentration interdite).
- ❌ Pas de stratégie « +2 %/jour » — invalidée Mission #2.

---

## PROFIL 2 — 👨‍👩‍👧 Le Capitaine de Famille

**Métaphore.** Voilier familial qui trace un cap long et stable, le foyer à bord.

### Persona type
- **Âge** : 30 – 55 ans.
- **Situation** : salarié(e) avec enfants, double revenu, propriétaire ou primo-accédant.
- **Capital de départ** : 10 000 € à 100 000 €.
- **Objectif de vie** : épargner pour études enfants, résidence principale, retraite, vacances.
- **Tolérance au risque** : modérée. Accepte −15 % une année difficile.

### Allocation cible
- **Prudent : 30 %** (fonds €, Livret A, obligations courtes)
- **Balanced : 60 %** (ETF MSCI World + PEA actions value EU)
- **Tactique : 10 %** (Momentum Donchian doux, supervisé)

### Cadence d'intervention
**Mensuelle** (30 min/mois : verser DCA + lire bilan + décider rééquilibrage si écart > 5 %).

### Univers d'actifs recommandé
- ETF MSCI World (Amundi MWRD, iShares IWDA)
- ETF S&P 500 hedged EUR
- PEA actions value Europe (Air Liquide, Total, Sanofi… pas de stock-picking exotique)
- Fonds € assurance-vie
- **Interdit** : crypto > 5 % du capital, leverage, options.

### Stratégie active autorisée
✅ **1 stratégie validée Mission #1** : **Momentum Donchian 20/55 doux** sur l'ETF World uniquement, sur la poche 10 % tactique, **sans levier, position size ≤ 30 %** de la poche tactique = 3 % du capital total.

### Performance honnête attendue
- **CAGR raisonnable** : 5 – 7 %/an net
- **Volatilité estimée** : 10 – 13 %/an
- **Probabilité de perte > 20 % sur 1 an** : ≈ 8 % (Monte Carlo)
- **Horizon recommandé minimum** : 5 ans
- **Pire scénario plausible** : −25 % type 2008/2020/2022

### Alertes G1 spécifiques
- ❌ Pas de moyenne baisse sur thèse cassée (ne pas « renforcer » un titre qui chute par espoir).
- ❌ Pas plus de 5 % du capital en crypto.
- ❌ Stratégie active limitée à 10 % du capital, point.
- ✅ Toujours garder 6 mois de dépenses en cash.

---

## PROFIL 3 — 🚀 L'Entrepreneur en Croissance

**Métaphore.** Catamaran rapide, à l'aise dans le vent, capable d'encaisser un grain.

### Persona type
- **Âge** : 28 – 50 ans.
- **Situation** : dirigeant de PME, start-up, cadre supérieur tech/finance, profession à revenus élevés mais variables.
- **Capital de départ** : 20 000 € à 200 000 €.
- **Objectif de vie** : faire fructifier rapidement, diversifier au-delà de l'entreprise détenue, préparer un cash-out d'exit.
- **Tolérance au risque** : élevée. Accepte −30 % une année si convaincu de la stratégie.

### Allocation cible
- **Prudent : 20 %** (obligations + fonds €)
- **Balanced : 50 %** (ETF World + S&P 500 + Nasdaq 100)
- **Tactique : 30 %** (Growth tech NVDA/MSFT/AMZN + crypto BTC/ETH + 1-2 stratégies actives)

### Cadence d'intervention
**Hebdomadaire** (1h/semaine : lecture rapports, vérification stops, lecture Carte du Cartographe).

### Univers d'actifs recommandé
- ETF MSCI World, S&P 500, Nasdaq 100
- 3-5 actions individuelles **liquides large cap tech** (NVDA, MSFT, GOOGL, AMZN, META)
- BTC + ETH spot uniquement (pas de altcoins exotiques sans recherche, pas de futures perpétuels)
- Fonds € pour la poche prudente
- **Interdit** : memecoins, NFT spéculatifs, options nues, futures, leverage > 1×.

### Stratégie active autorisée
✅ **2 stratégies validées Mission #1** :
1. **Momentum Donchian 20/55** sur ETF + actions tech (poche tactique 20 %)
2. **Stat-arb paires sectorielles** (poche tactique 10 %, max 5 paires simultanées)

### ⚓ Mécanisme de discipline — Variante D par défaut (validée Mission #4)
- **Stop fixe 2 %** par trade (jamais adaptatif post-perte — G1)
- **Lock 50 % / Reinvest 50 %** sur tous les gains journaliers : 50 % verrouillés dans bucket sécurisé visible, 50 % réinjectés. Discipline protectrice — DD réduit −42 % en backtest OOS 2024-2026.
- **Safety stop journalier −2 %** sur portefeuille → coupe la session si touché.
- ❌ **Interdit explicite** : formule AdaptiveStop Perplexity (Mission #4, Sharpe −10,06).

### Performance honnête attendue
- **CAGR raisonnable** : 7 – 11 %/an net
- **Volatilité estimée** : 15 – 20 %/an
- **Probabilité de perte > 20 % sur 1 an** : ≈ 18 % (Monte Carlo)
- **Horizon recommandé minimum** : 7 ans
- **Pire scénario plausible** : −40 % type 2008/2022

### Alertes G1 spécifiques
- ❌ Pas de doublage de mise après perte (martingale interdite).
- ❌ Pas d'altcoin < top 10 cap.
- ❌ Pas de stratégie active > 30 % capital total.
- ❌ Pas de stop adaptatif post-perte (Mission #4 invalidée).
- ✅ Stop-loss systématique sur tactique (−15 % position individuelle).
- ✅ Lock/Reinvest 50/50 actif par défaut (discipline Mission #4 validée).

---

## PROFIL 4 — 🌱 L'Étudiant Découvreur

**Métaphore.** Optimist sur lac calme : on apprend à border et à virer, pas à traverser l'Atlantique.

### Persona type
- **Âge** : 18 – 25 ans.
- **Situation** : étudiant, stagiaire, premier emploi, alternance.
- **Capital de départ** : 100 € à 5 000 €.
- **Objectif de vie** : apprendre le vocabulaire de la finance, prendre l'habitude d'épargner, ne pas se brûler les ailes.
- **Tolérance au risque** : faible en absolu (capital petit = chaque euro compte) mais le temps joue pour lui.

### Allocation cible
- **Prudent : 80 %** (Livret A, Livret Jeune, ETF World DCA mensuel petit montant)
- **Balanced : 20 %** (poche formation Laboratoire NEXT GEN — apprentissage, pas trading)
- **Tactique : 0 %**

### Cadence d'intervention
**Mensuelle** (10 min/mois : virement DCA + lecture 1 publication Cartographe).

### Univers d'actifs recommandé
- Livret A, Livret Jeune (4 – 6 %/an réglementé)
- ETF MSCI World en DCA petit montant (PEA dès que possible)
- **Interdit** : crypto, actions individuelles, leverage, futures, options.

### Stratégie active autorisée
❌ **AUCUNE**. L'Étudiant Découvreur **apprend en lisant le Laboratoire**, en regardant les backtests, en suivant la veille — il **n'agit pas activement**. Le seul acte autorisé : DCA mensuel sur ETF World.

### Performance honnête attendue
- **CAGR raisonnable** : 5 – 6 %/an (DCA ETF World long terme)
- **Volatilité estimée** : 12 – 14 %/an (ressentie faible car petit capital)
- **Probabilité de perte > 20 % sur 1 an** : ≈ 8 % (Monte Carlo)
- **Horizon recommandé minimum** : 10 ans (le temps est son meilleur allié)
- **Pire scénario plausible** : −25 % une année — mais récupéré en 2-3 ans par DCA continu.

### Alertes G1 spécifiques
- ❌ Pas un centime en crypto (trop volatil pour un capital de découverte).
- ❌ Pas de stratégie active — formation d'abord.
- ❌ Pas de « tip » pris sur TikTok / Reddit / Discord.
- ✅ Toujours garder 3 mois de dépenses en Livret A avant d'investir.

---

## PROFIL 5 — 🧭 Le Skipper Indépendant

**Métaphore.** Voilier de croisière côtière : autonome, capable de naviguer seul, prudent sur les passages.

### Persona type
- **Âge** : 30 – 55 ans.
- **Situation** : freelance, auto-entrepreneur, expat, profession libérale jeune, intermittent du spectacle.
- **Capital de départ** : 5 000 € à 50 000 €.
- **Objectif de vie** : sécuriser une trésorerie de 6 mois, lisser revenus variables, préparer une retraite sans employeur.
- **Tolérance au risque** : faible à modérée. Le revenu étant déjà volatil, le capital doit être stable.

### Allocation cible
- **Prudent : 60 %** (fonds €, Livret A, obligations courtes EUR + USD)
- **Balanced : 20 %** (ETF MSCI World + ETF émergents)
- **Tactique : 20 %** (cash d'urgence — 6 mois de dépenses, **JAMAIS investi**)

### Cadence d'intervention
**Mensuelle** (20 min/mois : check trésorerie + DCA + lecture Cartographe).

### Univers d'actifs recommandé
- Fonds € assurance-vie (multi-supports souples)
- Livret A
- ETF MSCI World + ETF MSCI Emerging Markets
- **Interdit** : crypto, leverage, options, futures.

### Stratégie active autorisée
⚠️ **1 stratégie doux** : **Momentum Donchian 20/55** sur ETF World uniquement, sur la poche balanced 20 %, **sans levier, position size ≤ 5 %** du capital total.

### ⚓ Mécanisme de discipline — Variante D par défaut (validée Mission #4)
- **Stop fixe 2 %** par trade (jamais adaptatif post-perte — G1).
- **Lock 50 % / Reinvest 50 %** sur les gains de la stratégie active : 50 % verrouillés dans bucket sécurisé visible (renforce le cash d'urgence !), 50 % réinjectés.
- ❌ **Interdit explicite** : formule AdaptiveStop Perplexity (Mission #4 invalidée).

### Performance honnête attendue
- **CAGR raisonnable** : 3,5 – 5,5 %/an net
- **Volatilité estimée** : 7 – 10 %/an
- **Probabilité de perte > 20 % sur 1 an** : ≈ 3 % (Monte Carlo)
- **Horizon recommandé minimum** : 5 ans
- **Pire scénario plausible** : −18 % type 2022

### Alertes G1 spécifiques
- ❌ Ne JAMAIS investir le cash d'urgence (6 mois de dépenses sacro-saintes).
- ❌ Pas de crypto (volatilité incompatible avec revenu déjà variable).
- ❌ Pas de stratégie « +2 %/jour » — invalidée Mission #2.
- ❌ Pas d'AdaptiveStop Perplexity — invalidée Mission #4.
- ✅ Avant tout investissement, vérifier que la trésorerie 6 mois est intacte.
- ✅ Lock/Reinvest 50/50 par défaut sur poche active (renforce cash d'urgence).

---

## PROFIL 6 — 💼 Le Pro Actif

**Métaphore.** Goélette de course — sait lire la météo, ajuste les voiles à la rafale, respecte les règles d'or.

### Persona type
- **Âge** : 35 – 65 ans.
- **Situation** : ancien banquier, gérant de patrimoine, ingénieur financier, trader indépendant éclairé, family officer.
- **Capital de départ** : 100 000 € et plus.
- **Objectif de vie** : maximiser le rendement risk-adjusted, exploiter les stratégies actives validées scientifiquement, transmettre savoir et capital.
- **Tolérance au risque** : élevée et informée. Accepte −30 % une année **si la stratégie a été backtestée et bornée**.

### Allocation cible
- **Prudent : 30 %** (obligations + fonds € + cash)
- **Balanced : 30 %** (portfolio cœur ETF diversifié World + Émergents + Small Caps)
- **Tactique : 30 %** (Stratégies actives Mission #1 : Momentum Donchian + Stat-arb)
- **Recherche personnelle : 10 %** (hypothèses propres testées au Laboratoire)

### Cadence d'intervention
**Quotidienne légère** (15 min/jour max : check indicateurs, lecture Cartographe, ajustement stops).

### Univers d'actifs recommandé
- ETF mondiaux multi-zones, multi-styles
- Actions individuelles large cap liquides
- BTC + ETH spot (≤ 10 % capital)
- Obligations souveraines + corporate IG
- **Autorisé en marge** : options couvertes (covered calls, cash-secured puts) — JAMAIS nues.
- **Interdit** : leverage > 1×, futures perpétuels, altcoins exotiques.

### Stratégie active autorisée
✅ **2 stratégies validées Mission #1** + recherche perso encadrée :
1. **Momentum Donchian 20/55** sur univers diversifié (poche 15 %)
2. **Stat-arb paires sectorielles** (poche 15 %, max 10 paires)
3. **Recherche propre** dans le Laboratoire NEXT GEN — uniquement en paper trading tant que pas validée scientifiquement (poche 10 %).

### ⚓ Mécanisme de discipline — Variante D par défaut (validée Mission #4)
- **Stop fixe 2 %** par trade — **jamais adaptatif post-perte** (G1, Mission #4).
- **Lock 50 % / Reinvest 50 %** sur tous les gains des stratégies actives. Backtest OOS 2024-2026 : drawdown réduit de −42 % vs baseline A (de −10,06 % à −5,83 %), 4 166 € sécurisés sur 100k€ capital de départ. Pas d'edge créé — uniquement de la discipline.
- **Safety stop journalier −2 %** sur portefeuille → coupe la session si touché.
- **Bucket sécurisé visible** dans le dashboard NAVLYS — pédagogie « on encaisse les gains, on ne court pas après les pertes ».
- ❌ **Interdit explicite** : formule AdaptiveStop Perplexity (Mission #4, Sharpe OOS −10,06 — martingale déguisée + collapse vers plancher).

### Performance honnête attendue
- **CAGR raisonnable** : 8 – 12 %/an net
- **Volatilité estimée** : 12 – 18 %/an
- **Probabilité de perte > 20 % sur 1 an** : ≈ 12 % (Monte Carlo)
- **Horizon recommandé minimum** : 5 ans
- **Pire scénario plausible** : −30 % type 2008

### Alertes G1 spécifiques
- ❌ Pas de stratégie non backtestée en argent réel (paper trading obligatoire).
- ❌ Pas de doublage après perte (martingale interdite).
- ❌ Pas de stratégie « +2 %/jour » — invalidée Mission #2.
- ❌ Pas de stop adaptatif post-perte (AdaptiveStop Perplexity invalidée Mission #4).
- ✅ Walk-forward + Monte Carlo obligatoire avant déploiement réel d'une stratégie perso.
- ✅ Lock/Reinvest 50/50 actif par défaut sur toutes stratégies actives (Mission #4).

---

## PROFIL 7 — 🌊 Le Navigateur Curieux

**Métaphore.** Simulateur de bord à terre : on s'entraîne par tous les temps, sans risque de chavirer.

### Persona type
- **Âge** : 18 – 99 ans (transversal).
- **Situation** : toute personne qui veut **apprendre la finance par la pratique sans risquer un euro réel**.
- **Capital de départ** : 0 € réel. **Paper trading 1 000 € à 10 000 €** simulés.
- **Objectif de vie** : comprendre, tester, échouer sans douleur, gagner en discernement.
- **Tolérance au risque** : N/A (pas d'argent réel).

### Allocation cible (paper)
- **Prudent : 0 %** (apprend les autres allocations en simulant chacune)
- **Balanced : 0 %**
- **Tactique : 100 % paper** (peut tester toutes les stratégies — y compris invalidées à des fins éducatives)

### Cadence d'intervention
**Quotidienne** (libre, paper trading sans contrainte).

### Univers d'actifs recommandé (paper)
- **TOUS** les actifs disponibles dans le Laboratoire NEXT GEN — y compris les invalidés à fin pédagogique (rejouer la stratégie « +2 %/jour » pour **voir** le drawdown −95 %).

### Stratégie active autorisée
🔬 **TOUTES** (paper trading uniquement). Y compris les invalidées pour pédagogie.

### Performance honnête attendue
- **N/A** : aucun argent réel.
- **KPI pédagogique** : nombre de stratégies testées + lecture des rapports Cartographe + score de discernement (NAVLYS-EDU quiz).

### Alertes G1 spécifiques
- ❌ **JAMAIS** convertir le mode paper en argent réel sans avoir changé de profil (1-6) via questionnaire.
- ❌ Pas de "ça marche en paper, donc je passe en réel" → on rebackteste, on valide statistiquement, on change de profil.
- ✅ Profil 7 = **terrain d'apprentissage**. Pas un produit financier.

---

## Récapitulatif performance par profil (référentiel honnête)

| Profil | CAGR cible | Vol | P(perte >20% / 1 an) | Horizon min | Pire année plausible |
|---|---|---|---|---|---|
| 🛡️ 1 — Marin Prudent | 2,5–4 % | 4–6 % | ≈ 1,5 % | 3 ans | −12 % |
| 👨‍👩‍👧 2 — Capitaine de Famille | 5–7 % | 10–13 % | ≈ 8 % | 5 ans | −25 % |
| 🚀 3 — Entrepreneur en Croissance | 7–11 % | 15–20 % | ≈ 18 % | 7 ans | −40 % |
| 🌱 4 — Étudiant Découvreur | 5–6 % | 12–14 % | ≈ 8 % | 10 ans | −25 % |
| 🧭 5 — Skipper Indépendant | 3,5–5,5 % | 7–10 % | ≈ 3 % | 5 ans | −18 % |
| 💼 6 — Pro Actif | 8–12 % | 12–18 % | ≈ 12 % | 5 ans | −30 % |
| 🌊 7 — Navigateur Curieux | N/A (paper) | N/A | N/A | N/A | N/A |

Ces chiffres dérivent de :
- Backtests Mission #1 + Mission #2 (univers SPY, BTC, top 10 NASDAQ, 2020–2026).
- Référence Shiller (S&P 500 1928–2025) : rendement réel ≈ 6,8 %/an, drawdown séculaire ≈ −56 % (1929-32).
- FRED 60/40 long terme : ≈ 7 %/an nominal, drawdown 2022 ≈ −18 %.
- Buy & hold SPY 2021–2026 : CAGR 13,94 %, Sharpe 0,85, DD −24,5 % (référence Mission #2).

> 🧭 **Honnêteté du Cartographe** : ces fourchettes sont des **espérances raisonnables**, pas des promesses. Le marché a déjà fait pire (1929, 1973, 2000, 2008, 2020, 2022) et peut le refaire. Tout chiffre affiché dans l'app NAVLYS est suivi d'un disclaimer.

---

## Degré de personnalisation interne (defensive / balanced / aggressive)

Pour les profils 2, 3, 5, 6, on module ±10 pts l'allocation cible selon les réponses Q6 (horizon) + Q7 (réaction perte) + Q9 (temps disponible). Le moteur Python (`_CARTOGRAPHE_M3_MOTEUR_PERSONNALISATION_PYTHON.py`) gère la finition.

---

## Carte d'identité d'un profil dans l'app NAVLYS

Chaque profil est livré à l'utilisateur sous forme de **carte visuelle** :
- Pictogramme + métaphore + nom
- Allocation cible en camembert
- Cadence en mini-calendrier
- 3 lignes d'espérance honnête
- 3 alertes G1
- Bouton « Activer ma routine »

Spec UI complète dans `_CARTOGRAPHE_M3_SPEC_UX_APP_NAVLYS.md`.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
