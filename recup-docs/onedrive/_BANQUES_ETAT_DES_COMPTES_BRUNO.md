# ⚓💰 NAVLYS — État des Comptes de Bruno
_Département Banques & Finances NAVLYS · Mission #1 · 28 mai 2026 (J-3)_

> Document maître de cartographie des comptes financiers de Bruno Mark Partouche.
> Source : scan exhaustif du dossier `Downloads/` au 28 mai 2026.
> ⚠️ **AUCUN IBAN/BIC/SWIFT COMPLET** dans ce document — masquage `XXXX-XXXX-XXXX-1234` (4 derniers chiffres max). Aucune clé API en clair.

---

## 🚨 CHECKLIST ACTION BRUNO — Priorité J-3 → J0

- [ ] **J-3 (29 mai)** — créer compte client **IBKR** (formulaire en ligne ~30 min)
- [ ] **J-3 (29 mai)** — créer **testnet Binance** + générer clés API (5 min, sans KYC)
- [ ] **J-2 (30 mai)** — compléter KYC IBKR (pièces ID + RIB Mizrahi)
- [ ] **J-2 (30 mai)** — créer compte **Lemon Markets Paper Trading** (15 min)
- [ ] **J-2 (30 mai)** — finaliser **Stripe KYC commercial** (1-5 jours ouvrés)
- [ ] **J-1 (31 mai)** — **Mizrahi** : ajouter nom anglais "BRUNO MARK PARTOUCHE" (blocage Stripe payout)
- [ ] **J0 (1ᵉʳ juin)** — ouvrir compte affilié **Trade Republic Partners**
- [ ] **J0 (1ᵉʳ juin)** — ouvrir compte affilié **eToro Partners**
- [ ] **J+7** — virement test 100 € SEPA vers IBKR depuis Mizrahi (mesurer délai réel)
- [ ] **J+14** — 1ʳᵉ commission affiliée à constater (Trade Republic / eToro)

---

## 1. Vue d'ensemble — combien de comptes, quel statut ?

**Bilan rapide au 28 mai 2026** :
- **3 comptes bancaires opérationnels potentiels** (Mizrahi IL, banque IL perso, [entité — hors dépôt] FR) — banque [entité — hors dépôt] non renseignée
- **0 broker live ouvert** — Alpaca à activer en dev, IBKR à ouvrir
- **0 wallet paiement opérationnel** — Stripe en KYC, Wise/PayPal/Payoneer à ouvrir
- **0 programme d'affiliation actif** — 25 partenaires en file d'attente (cf. `_PARTENAIRES_LIENS_AUDIT.md`)
- **1 GitHub/Vercel actif** — team `team_nBtY5FOQMPIT4J8Bmf7wvBSC`, projet `prj_5efy1QYHH1fOR099sSjpdEa6yFps`

⚠️ **Constat brut** : à J-3 du lancement BETA NAVLYS (31 mai), **aucun flux d'encaissement réel n'est techniquement opérationnel**. Tout repose sur l'urgence des KYC Stripe + Mizrahi + IBKR.

---

## 2. Tableau exhaustif des comptes recensés

| # | Compte | Type | Pays | Devise(s) | Statut | Accès (web/app/API) | Usage actuel | KYC complet ? | Source |
|---|--------|------|------|-----------|--------|---------------------|--------------|---------------|--------|
| 1 | **Mizrahi** | Banque | IL | ILS | À finaliser (nom EN à ajouter) | Web + app | KYC entité IL pour Stripe + funding broker SWIFT | ⚠️ Blocage nom anglais | `_STRIPE_CONNEXION_PLAN.md` |
| 2 | **Banque IL (perso)** | Banque | IL | ILS | Statut inconnu | Web | Compte courant perso | ❓ | `COMPTES_BANCAIRES_SOCIETES_PRIVE.md` |
| 3 | **[entité — hors dépôt] (banque FR)** | Banque pro EI | FR | EUR | Banque non renseignée | À confirmer | Compte pro EI (SIREN 482 511 292) | ❓ | `COMPTES_BANCAIRES_SOCIETES_PRIVE.md` |
| 4 | **Wise Business EUR** | Wallet multi-devises | UK/EU | EUR | À ouvrir | Web + app + API | Encaissement abonnements NAVLYS + IBAN EU | ❌ | `NOVA_BRIEFING_TRANSFERT.md` |
| 5 | **Wise Business USD** | Wallet | UK/EU | USD | À ouvrir | Web + app + API | Réception commissions affiliations $ | ❌ | `NOVA_BRIEFING_TRANSFERT.md` |
| 6 | **Stripe** | PSP commerçant | IE/IL | EUR/USD | KYC en cours sous `bruno@navlys.com` | Web + API | Encaissement abos NAVLYS NEXT GEN INVEST + NAVBIO Life | ❌ | `_STRIPE_CONNEXION_PLAN.md` |
| 7 | **PayPal Business IL** | Wallet | IL | multi | Mentionné, statut non confirmé | Web + app + API | Backup CB + Apple/Google Pay | ❓ | `NOVA_BRIEFING_TRANSFERT.md` |
| 8 | **Payoneer** | Wallet | global | USD/EUR | À ouvrir | Web + app | Réception commissions US (Refersion, Impact) | ❌ | `NOVA_BRIEFING_TRANSFERT.md` |
| 9 | **Alpaca** | Broker actions/ETF/Crypto US | US | USD | Paper actif probable, Live à confirmer | API REST + WebSocket | Pilier intégration NAVLYS Phase 1 | À renseigner par Bruno | `07_RND_APP_INTEGRATIONS/01_ALPACA.md` |
| 10 | **Interactive Brokers (IBKR)** | Broker mondial | US/EU | multi | À ouvrir | Web + TWS + IB Gateway + API | Test paper trading + affiliation Refer-A-Friend | ❌ | `TEST_REEL_MULTI_BROKERS_paper.md` |
| 11 | **eToro** | Broker social | CY | multi | À ouvrir | Web + app + API limitée | Test paper + Partners ($100-250 FTD) + Popular Investor | ❌ | `NOVA_Top5_Partenaires_Affiliation.md` |
| 12 | **Trade Republic** | Broker EU | DE | EUR | Compte client perso probable (code parrainage évoqué) | App + lecture seule | Affiliation 10-30 €/filleul | À confirmer | `_PARTENAIRES_LIENS_AUDIT.md` |
| 13 | **Trading 212** | Broker EU | CY | EUR/USD | À ouvrir | App + API | Test paper + parrainage actions gratuites | ❌ | `TEST_REEL_MULTI_BROKERS_paper.md` |
| 14 | **Saxo Banque** | Broker premium | DK | multi | À ouvrir via Tradedoubler | Web + API SaxoOpenAPI | Affiliation 150-500 €/compte funded | ❌ | `_PARTENAIRES_LIENS_AUDIT.md` |
| 15 | **Bourse Direct** | Courtier FR | FR | EUR | Évoqué | Web + app | Affiliation via Effiliation/Awin | ❌ | `_PARTENAIRES_LIENS_AUDIT.md` |
| 16 | **XTB** | Broker CFD | PL | multi | À candidater sur xtbaffiliates.com | Web + xStation + API | Affiliation $600 CPA | ❌ | `NOVA_BRIEFING_TRANSFERT.md` |
| 17 | **Webull** | Broker US | US | USD | Évoqué | App + API | Test paper US | ❌ | `_PARTENAIRES_LIENS_AUDIT.md` |
| 18 | **Binance** (spot) | Exchange crypto | global | crypto + fiat | Compte client perso probable (BTC réel mentionné) | Web + app + API | Test crypto + affiliation 20-50 % rev share | À confirmer | `TEST_REEL_MULTI_BROKERS_paper.md` |
| 19 | **Binance Testnet** | Sandbox API | global | testnet | À créer (5 min, sans KYC) | API | Tests autonomes Claude | N/A | À créer J-3 |
| 20 | **Kraken** | Exchange crypto | US | crypto + fiat | À ouvrir | Web + API | Affiliation 20 % spread + Futures démo | ❌ | `_PARTENAIRES_LIENS_AUDIT.md` |
| 21 | **Bitpanda Pro** | Exchange crypto + actions | AT | crypto + EUR | À ouvrir | Web + API REST | Affiliation 25 % rev share + funding SEPA Instant | ❌ | `_PARTENAIRES_LIENS_AUDIT.md` |
| 22 | **Lemon Markets** | Broker EU API-first | DE | EUR | À ouvrir Paper Trading | API REST + WebSocket | Alternative Alpaca EU | ❌ | À créer J-2 |
| 23 | **Bitvavo, Coinbase, Bybit, OKX, Plus500** | Exchanges/CFD | divers | divers | Évoqués affiliations | divers | Programmes affiliés futurs | ❌ | `_PARTENAIRES_LIENS_AUDIT.md` |
| 24 | **Sela Logistics — salaire** | Source revenu salaire | IL | ILS | Actif (employeur) | Bulletin de paie | Revenu salarié principal | N/A | `CLAUDE.md` |

> **Légende statut** : ❌ = pas ouvert · ❓ = ouvert mais détails inconnus · ⚠️ = ouvert avec blocage · ✅ = ouvert et opérationnel

---

## 3. Comptes par catégorie — synthèse comptable

### 3.1 Banques (3 recensés)
- **Mizrahi (IL)** : compte pro destiné à recevoir les payouts Stripe et fonder Alpaca/IBKR via SWIFT. **Blocage actuel** : nom anglais "BRUNO MARK PARTOUCHE" à ajouter au compte pour matcher KYC Stripe.
- **Banque IL personnelle** : statut inconnu (tableau dans `COMPTES_BANCAIRES_SOCIETES_PRIVE.md` non rempli).
- **[entité — hors dépôt] (FR)** : EI SIREN 482 511 292, APE 6622Z, 20 rue du Rhin 59200 Tourcoing — banque NON renseignée dans les docs.

### 3.2 Wallets / paiements (5 prévus)
- **Stripe** (PSP commerçant) — KYC en cours, **bloque tout encaissement abos**
- **Wise Business EUR + USD** — pivot multi-devises, IBAN EU
- **PayPal Business IL** — backup CB + Apple/Google Pay
- **Payoneer** — réception affiliations US
- **Skrill / Binance Pay** — stack alternatifs

### 3.3 Brokers actions/ETF (8 recensés)
- US : Alpaca, IBKR, Webull
- EU : Trade Republic, Trading 212, Lemon Markets, Saxo, Bourse Direct
- Social : eToro
- CFD : XTB, Plus500

### 3.4 Exchanges crypto (6 recensés)
- Binance, Kraken, Bitpanda Pro, Coinbase, Bybit, Bitvavo, OKX

---

## 4. Notes sur les flux SWIFT actuels (point chaud Bruno)

> Bruno : « pour l'instant je suis par swift international avec alpaca, c'est long pour transferer une ouverture de compte »

**Diagnostic** :
- Source : Mizrahi (IL) en ILS
- Conversion forcée ILS → USD chez Mizrahi (spread bancaire estimé 1-3 %)
- Virement SWIFT vers Alpaca (US) via correspondant
- **Délai réel constaté typique : 2-5 jours ouvrés**
- **Frais Mizrahi** : 30-80 ILS par virement SWIFT sortant + spread FX
- **Frais Alpaca côté receveur** : 0 $ (Alpaca accepte les wires sans frais d'entrée, mais 30 $ sortie)

**Conséquence opérationnelle** : impossibilité de réagir en moins de 48 h à une opportunité marché ; obligation de garder du cash dormant chez Alpaca.

**Solutions à tester (cf. doc `_BROKERS_ALTERNATIVES_ALPACA_API.md`)** :
1. **Wise Business EUR + USD** comme couche intermédiaire (SEPA Instant entrant + virement local sortant vers IBKR US)
2. **IBKR** avec funding SEPA EU (depuis Wise) ou virement local US (depuis Wise USD account number)
3. **Lemon Markets** pour le pur EU avec SEPA Instant
4. **Bitpanda Pro** pour funding SEPA Instant + bridge crypto

---

## 5. Contradictions / points d'éclaircissement à demander à Bruno

1. **Statut Alpaca actuel** : compte Live ouvert ou seulement Paper ? Montant déposé ? Latence réelle du dernier SWIFT ?
2. **[entité — hors dépôt]** : quelle banque tient le compte EI ? Toujours active ?
3. **Banque IL perso** : Bank Hapoalim ? Leumi ? Mizrahi perso différent du pro ?
4. **Trade Republic** : compte client déjà ouvert (allusion au code parrainage) ? Combien de filleuls activables ?
5. **Binance** : compte perso confirmé ? KYC niveau 2 fait ?
6. **Stripe** : entité juridique choisie pour le compte (EI [entité — hors dépôt] FR ou nouvelle entité IL via Mizrahi) ?

---

## 6. Sources documentaires (mémoire canonique)

Top 5 fichiers à conserver comme référence :
1. `Downloads/COMPTES_BANCAIRES_SOCIETES_PRIVE.md` — tableau de Bruno à compléter
2. `Downloads/_SITES_MASTER/_STRIPE_CONNEXION_PLAN.md` — plan opérationnel Stripe
3. `Downloads/_SITES_MASTER/_PARTENAIRES_LIENS_AUDIT.md` — audit 25 partenaires affiliés
4. `Downloads/NOVA_BRIEFING_TRANSFERT.md` — stack paiements complète
5. `Downloads/_NAVLYS_DEPARTEMENTS/07_RND_APP_INTEGRATIONS/01_ALPACA.md` — OAuth Alpaca

Voir aussi : `_BANQUES_FLUX_ENCAISSEMENT.md`, `_BANQUES_LIENS_PARTENAIRES_CPA.md`, `_BROKERS_ALTERNATIVES_ALPACA_API.md`, `_DEPARTEMENT_BANQUES_FINANCES_charte.md`.

---

⚓ _Compilé par Le Trésorier · Département Banques & Finances NAVLYS · 28 mai 2026._
