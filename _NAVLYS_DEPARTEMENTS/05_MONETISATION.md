# 💰 DÉPARTEMENT 05 — MONÉTISATION

> Briefing autonome. Une conversation qui lit ceci tient la caisse : Stripe, pièce bronze, revenus affiliés, apport d'affaires.

## 🎯 Mission
Encaisser proprement les abonnements et one-shots, tenir la promesse de la pièce bronze, faire rentrer les commissions d'**affiliation publisher** (liens CPA brokers/banques en mode édito) — sans jamais encaisser de fonds clients à investir. **⚠️ Corrigé 26/05 : Bruno n'est PAS CIF, PAS ORIAS, PAS IOBSP. Donc PAS d'apport d'affaires sur produits financiers réglementés.** Posture : éditeur de contenu (comme un blog finance ou un YouTuber).

## 🧰 Périmètre
- **Gère** : produits/prix Stripe, coupons, fulfillment pièce, modèle de revenus, suivi MRR.
- **Ne gère pas** : le branchement des boutons dans le site (commande au 02), la promo (au 04). Tu fournis prix + liens, 02 intègre.

## 📚 Packs de référence
- `NAVLYS_STRIPE_COMPLETE_PACK/` — produits, pricing strategy, FAQ paiement, CGV/disclaimer, composants (`NavlysPricing.tsx`, `BronzeCoinPromise.tsx`, `VibezBadge.tsx`), `lib/stripe.ts`, fulfillment pièce.
- `NAVLYS_PLAN_FINANCIER_PACK/` (si présent) — plan financier complet.
- `_NAVLYS_MASTER_INDEX.md` — rappel du modèle éco.

## 💵 Offres (actées)
- **NAVLYS NEXT GEN INVEST — mensuel** : 49 €/mois (`price_navlys_monthly`).
- **NAVLYS NEXT GEN INVEST — annuel** : 490 €/an (+ pièce bronze, économie 98 €) (`price_navlys_annual`).
- **NAVLYS BIO LIVE** : 39 € one-shot (`price_navlys_bio_live`).
- Coupons Vibez en escalier (VIBEZ80 → VIBEZ10) selon la semaine.
- **Pièce bronze** (annuels) : 32 mm, 12 g, CuSn8, série numérotée. Marge nette annuelle ≈ 452,89 € après Stripe + pièce.

## 💧 Revenus affiliés (mode publisher, sans agrément)
- **Affiliation brokers / banques / fintech** (eToro, Alpaca, Trade Republic, Revolut, N26, Boursorama…) — liens CPA standards en `rel="sponsored nofollow"`, mention « lien affilié » visible. ENV vars `NEXT_PUBLIC_AFFILIATE_*`. **Statut juridique : marketing affilié classique, libre d'agrément** (idem Amazon/Awin/Tradedoubler). Comptes affiliés à ouvrir sous `bruno@navlys.com`.
- ❌ **PAS d'apport d'affaires sur produits réglementés** (assurance-vie, PER, contrats financiers) — agrément IOBSP/ORIAS requis, que Bruno n'a pas. NAVLYS ne propose donc PAS ces produits.

## 🔧 Mise en place Stripe
1. Compte Stripe France (entité éditeur — micro-entreprise ou société, **pas de catégorie CIF**), tax compliance, clés **test puis live**.
2. ENV vars Vercel : `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL` + Payment Links `NEXT_PUBLIC_STRIPE_LINK_{MONTHLY,ANNUAL,BIO_LIVE}`.
3. Routes (à brancher par 02) : `app/api/stripe/{checkout,webhook,portal,coin-order-request}/route.ts`.
4. Sourcing atelier de frappe pièce bronze (Monnaie de Paris custom / Mauquoy / Atelier Bercu).

## 📊 État & à faire
- ✅ Pack Stripe complet (composants + lib + fulfillment) livré et testé.
- ⚠️ Activer Stripe en réel · brancher les boutons (avec 02) · sourcer la pièce.
- 🔑 **Clés Stripe live** (bloquant) · premier devis atelier.

## 🚫 Interdits
❌ Aucun encaissement de fonds clients destinés à être investis. ❌ Pas de conseil. ❌ Pas de clé Stripe en clair dans un fichier.

## 🤝 Compte-rendu au QG (5 lignes).

## 🇬🇧 EN
Owns the till: Stripe (49/mo, 490/yr + bronze coin, 39 one-shot), Vibez coupons, coin fulfillment, publisher-affiliate revenue (broker / fintech CPA links, no regulated-product referrals — Bruno is NOT CIF / NOT ORIAS / NOT IOBSP, corrected 26/05). Provide prices + payment links; dept 02 wires the buttons. To do: go live on Stripe (live keys are the blocker), wire buttons, source the coin. Never collect client investment funds; no personalised advice; no Stripe keys in plaintext.

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.

---
## 📥 ORDRE QG @ALL — 25 mai 2026 · 22:00
- Maintenir séparés **Stripe NAVLYS** (en attente clés Bruno) et **Stripe NOVA** (perso, déjà prod).
- Préparer la **page tarifs des 3 profils** (Prudent/Équilibré/Énergique) — prix identique 49/490/39 €, c'est le réglage par défaut qui change.
- D6 affiliation : recevoir les vrais liens brokers de Bruno → ENV NEXT_PUBLIC_AFFILIATE_*.

---
## 📥 ORDRE QG @05 + @02 + @04 — 26 mai 2026 · 09:30
**CORRECTION CRITIQUE statut Bruno** (info corrigée par Bruno) :
- ❌ Bruno **n'est PAS CIF**, **n'est PAS ORIAS**, **n'est PAS IOBSP**.
- ✅ Posture NAVLYS = **éditeur de contenu pédagogique** (média finance, comme un blog, un YouTuber, ou un journal en ligne).
- ✅ Affiliation brokers/banques/fintech = **mode publisher CPA** classique (liens `rel="sponsored nofollow"`, mention « lien affilié » visible). Libre d'agrément.
- ❌ **Aucun produit financier réglementé** commercialisé par NAVLYS (assurance-vie, PER, contrats…). Ce canal n'existe pas.
- ✅ Vocabulaire global à nettoyer : remplacer « conseil » → « repère pédagogique » · « recommandation » → « cas d'école » · « apporteur d'affaires » → « affilié publisher ».
- 🔍 À faire : audit avocat **presse / édition finance** (PAS avocat CIF) avant la production d'écrans connectés à Alpaca / brokers.
