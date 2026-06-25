# ⚓💸 NAVLYS — Flux d'Encaissement : Par Qui Bruno Encaisse
_Département Banques & Finances NAVLYS · Mission #1 · 28 mai 2026 (J-3)_

> Cartographie de TOUTES les sources de revenus entrantes et des canaux d'encaissement pour Bruno + le groupe NAVLYS.
> ⚠️ Aucun IBAN/BIC complet ici. Masquage 4 derniers chiffres uniquement.

---

## 🚨 CHECKLIST ACTION BRUNO — Priorité J-3 → J0

- [ ] **J-2** finaliser KYC Stripe sous `bruno@navlys.com` (sinon zéro encaissement abos au lancement)
- [ ] **J-1** Mizrahi — ajouter nom anglais "BRUNO MARK PARTOUCHE" sur le compte (sinon Stripe bloque le payout)
- [ ] **J-1** ouvrir compte Wise Business EUR + USD (IBAN EU pour réception SEPA, account US pour réception ACH)
- [ ] **J0** activer Stripe Test → Live + brancher webhook `whsec_*` sur navlys.com
- [ ] **J0** créer comptes affiliés Trade Republic Partners + eToro Partners
- [ ] **J+7** premier virement test 100 € pour mesurer la latence réelle Mizrahi → Wise → IBKR

---

## 1. Vue d'ensemble — la pyramide des entrées

```
┌──────────────────────────────────────────────────────────────┐
│                  REVENUS BRUNO + NAVLYS                      │
├──────────────────────────────────────────────────────────────┤
│  PILIER 1 : SALAIRE Sela Logistics (ILS, mensuel, actif)     │
│  PILIER 2 : ABOS NAVLYS NEXT GEN INVEST (€49/m, €490/an)     │
│  PILIER 3 : NAVBIO LIFE one-shot (€19/29/39/149/199)         │
│  PILIER 4 : AFFILIATIONS publisher CPA (banques + brokers)   │
│  PILIER 5 : AFFILIATIONS CRYPTO (Binance, Kraken, etc.)      │
│  PILIER 6 : ÉDITORIAL futur (sponsorship, ebooks, formations)│
└──────────────────────────────────────────────────────────────┘
                          ↓
             Convergence vers Wise Business EUR
                          ↓
                    Mizrahi (ILS) — perso
```

---

## 2. Tableau récap — chaque source, son chemin

| # | Source | Type flux | Canal collecteur | Compte destinataire | Délai | Frais | Limite |
|---|--------|-----------|------------------|---------------------|-------|-------|--------|
| 1 | **Salaire Sela Logistics** | Virement salaire IL | Direct | Banque IL perso (***1234) | Mensuel J+1 | 0 | N/A |
| 2 | **Abos NAVLYS NEXT GEN INVEST 49€/mois** | CB + SEPA récurrent | **Stripe** | Wise Business EUR (à ouvrir) puis Mizrahi | T+2 ouvrés (Stripe payout standard) | 1.5 % + 0.25 € (SEPA) / 2.9 % + 0.30 € (CB EU) | Stripe initial 100 k€/mois |
| 3 | **Abos NAVLYS NEXT GEN INVEST 490€/an** | CB one-shot | Stripe | Wise Business EUR | T+2 ouvrés | 2.9 % + 0.30 € | idem |
| 4 | **NAVBIO Life Solo 19 € / Couple 29 € / Premium 39 € / Cinéma 149 € / Pro 199 €** | CB one-shot | Stripe | Wise Business EUR | T+2 ouvrés | 2.9 % + 0.30 € | idem |
| 5 | **Add-ons NAVBIO à la carte** | CB micro-paiements | Stripe | Wise Business EUR | T+2 ouvrés | min 0.30 € → marge nulle sous 3 € | N/A |
| 6 | **Affiliations brokers (FR/EU)** Trade Republic / Bourse Direct / Saxo | Virement SEPA mensuel | Plateforme (Effiliation/Awin/Tradedoubler) | Wise Business EUR | M+1 (paliers 25-50 €) | 0 SEPA EU | Plafond plateforme |
| 7 | **Affiliations brokers (US/UK)** Webull / IBKR Refer / Alpaca | Virement SWIFT mensuel | Refersion / Impact / programme direct | Wise USD | M+1, ou Payoneer | 15-30 $ SWIFT | Plafond plateforme |
| 8 | **Affiliations crypto** Binance / Kraken / Bitpanda / Coinbase | Rev share, crypto ou SEPA | Programme direct | Wise EUR ou wallet crypto | Hebdo (Binance) à mensuel | 0-1 % réseau crypto | N/A |
| 9 | **Affiliations Wise / Revolut / N26** | Virement SEPA | Programme direct | Wise EUR | M+1 | 0 SEPA | Plafond programme |
| 10 | **TradingView Refer (50 % recurring)** | PayPal ou virement | Programme direct | PayPal Business IL | M+1 (palier 100 $) | 1 % PayPal | N/A |
| 11 | **Coinbase Advanced Affiliate** | USDC ou USD | Programme Impact | Wise USD ou wallet | M+1 | 0 USDC / 15 $ wire | N/A |

---

## 3. Détail par pilier

### Pilier 1 — Salaire Sela Logistics
- **Devise** : ILS
- **Compte récepteur** : banque IL perso (à confirmer Bank Hapoalim/Leumi/Mizrahi perso)
- **Fréquence** : mensuelle
- **Usage** : couverture vie + investissement personnel + financement initial NAVLYS
- **Risque flux** : aucun (rapport employeur stable)

### Pilier 2 — Abos NAVLYS NEXT GEN INVEST
- **Tarifs** : 49 €/mois ou 490 €/an (économie 17 % en annuel)
- **Volume cible J+30** : 100 abonnés mensuels = 4 900 €/mois
- **Volume cible J+90** : 500 abonnés = 24 500 €/mois
- **Canal d'encaissement** : Stripe Subscriptions
- **Délai payout Stripe → Wise** : T+2 jours ouvrés (standard ; possibilité Instant Payout à 1 % de frais)
- **Frais effectifs nets** : ≈ 96 % du brut (après Stripe + spread Wise FX si conversion)
- **Risque** : KYC Stripe non terminé = ZÉRO encaissement possible au lancement

### Pilier 3 — NAVBIO Life one-shot
- **Tarifs** : Solo 19 / Couple 29 / Premium 39 / Cinéma 149 / Pro 199 €
- **Add-ons** : à la carte (1-15 €)
- **Volume cible J+30** : 50 ventes Premium = 1 950 €
- **Marges** : élevées (90 %+ après frais Stripe)
- **Limite micro-paiements** : sous 3 €, frais Stripe rendent la marge nulle — exclure micro-add-ons

### Pilier 4 — Affiliations brokers (publisher CPA)
- **Statut juridique Bruno** : PAS IOBSP/CIF/ORIAS → mode **publisher** UNIQUEMENT (légal sans agrément, comme un YouTubeur finance)
- **Plateformes mutualisatrices** : Effiliation (FR), Awin (UK/FR), Tradedoubler (DE/EU), Impact (US/global), Refersion (US)
- **Programmes directs** : Trade Republic Partners, eToro Partners, IBKR Refer-A-Friend, XTB Affiliates
- **Délai paiement standard** : M+1 (mois suivant la commission validée)
- **Palier minimum** : 25-100 € selon programme
- **Risque** : aucun compte affilié actif au 28/05/2026 → 0 € de revenu avant J+30 minimum

### Pilier 5 — Affiliations crypto
- **Programmes** : Binance Affiliates (20-50 % rev share), Kraken Affiliates, Bitpanda Pro, Coinbase via Impact
- **Mode de paiement** : crypto (BTC/USDT) ou fiat SEPA
- **Versement** : hebdomadaire (Binance) à mensuel
- **Risque conformité** : promotion crypto en France soumise à PSAN AMF — RESTREINDRE la promo crypto au public hors France métropolitaine OU passer en simple éditorial neutre sans incitation

### Pilier 6 — Éditorial futur
- Ebooks, formations, sponsorings : à activer post J+90
- Hors scope mission #1

---

## 4. Le chemin d'argent — schéma simplifié

```
[CLIENTS NAVLYS]
       │
       │ (CB EU/US, SEPA, Apple/Google Pay)
       ▼
   ┌─────────┐
   │ STRIPE  │ (frais 1.5-2.9 % + 0.25-0.30 €)
   └────┬────┘
        │ T+2 jours ouvrés
        ▼
   ┌──────────────────┐
   │ WISE BUSINESS EUR│ ← IBAN EU pour réception SEPA aussi
   └────┬─────────────┘
        │
        ├─→ [BROKERS via SEPA] IBKR, Lemon Markets, Trade Republic
        │
        ├─→ [WISE → USD] (conversion mid-market 0.4-0.6 %) → IBKR US, Alpaca
        │
        └─→ [MIZRAHI ILS] (SWIFT 30-80 ILS + spread)
                  │
                  ▼
              [BRUNO PERSO]
```

---

## 5. Délais réels comparés (synthèse opérationnelle)

| Trajet | Délai | Frais cumulés | Verdict |
|--------|-------|---------------|---------|
| Stripe → Wise EUR (SEPA EU) | 2 j ouvrés | 1.5-2.9 % Stripe + 0 SEPA | ✅ standard |
| Stripe → Wise EUR (Instant Payout) | 30 min | + 1 % Stripe Instant | ⚠️ utiliser ponctuellement |
| Wise EUR → IBKR EU | SEPA Instant si activé : 10 sec, sinon 1 j ouvré | 0-2 € | ✅ optimal |
| Wise USD → Alpaca/IBKR US | ACH 3-5 j OU wire 1 j | 15-30 $ wire | ✅ remplace SWIFT Mizrahi |
| Mizrahi → Alpaca SWIFT (actuel) | **2-5 j ouvrés** | **30-80 ILS + 1-3 % spread FX** | ❌ trop long, à remplacer |
| Wise EUR → Mizrahi ILS | SWIFT 1-2 j | spread Wise + frais Mizrahi entrant | ⚠️ correct mais coûteux |
| Binance commission → Wise EUR (SEPA) | M+1 puis T+1 j | 0-0.1 % | ✅ |
| TradingView commission → PayPal | M+1 | 1 % PayPal | ✅ |

---

## 6. Limites et alertes

- **Stripe Israel** : disponibilité contestée dans la doc (cf. `NOVA_BRIEFING_TRANSFERT.md`). **À TRANCHER** : entité Stripe = DFENSER FR (déjà existant) ou IL (nouveau). **Recommandation** : utiliser DFENSER FR (SIREN 482 511 292) car compte EI déjà ouvert + Stripe France disponible immédiatement → contournement du blocage IL.
- **Limite Stripe initial** : 100 k€/mois par défaut ; à augmenter sur demande après 3 mois d'historique
- **Limite Wise Business** : 1 M€/mois par défaut, suffisant
- **Limite SEPA Instant** : 100 k€ par transaction (largement suffisant)
- **Pré-financement** : prévoir 500-1000 € de cash dormant chez Alpaca/IBKR Paper pour les tests, à compter dans la trésorerie initiale

---

## 7. Recommandations Le Trésorier

### Recommandation #1 — Architecture cible (proposée pour validation Bruno)
```
STRIPE (DFENSER FR) → WISE BUSINESS EUR (pivot) → splits vers :
  ├─ IBKR EU (SEPA Instant)        — trading actions/ETF
  ├─ Lemon Markets (SEPA Instant)  — alternative pure EU
  ├─ Bitpanda Pro (SEPA Instant)   — crypto + bridge
  └─ Mizrahi ILS (SWIFT)           — extraction Bruno perso
```

### Recommandation #2 — Bypass du SWIFT Mizrahi → Alpaca
**À court terme (avant 31 mai)** : continuer avec SWIFT actuel mais pré-charger 500 $ chez Alpaca pour ne pas dépendre des délais.
**À moyen terme (juin)** : basculer le flux Alpaca vers IBKR US (SEPA → Wise USD → ACH/wire local IBKR) → délai 1-2 j au lieu de 2-5 j.

### Recommandation #3 — Diversification PSP
Garder Stripe en principal, MAIS conserver PayPal Business IL en backup actif. Si Stripe gèle un payout (cas connu sur abos finance neufs), PayPal permet de continuer à encaisser.

---

⚓ _Compilé par Le Trésorier · Département Banques & Finances NAVLYS · 28 mai 2026._
