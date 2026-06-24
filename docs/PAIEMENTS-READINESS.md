# 💳 PAIEMENTS — checklist « prêt à encaisser, sans blocage »

> Objectif de Bruno (2026-06-24) : **être sûr que les systèmes de paiement sont prêts**
> et **sans problème lié au fait d'être israélien** avec certains.
> ⚠️ Règle §3 : aucun paiement déclenché par un agent ; ici on **vérifie la capacité à ENCAISSER**.

## Canaux d'encaissement choisis (Équipage Navlys)
1. **Substack** (Stripe lié) — le Stripe actuellement connecté à Claude : `acct_1TYn17…` (« navlys2026.substack »).
2. **Stripe direct NAVLYS** — compte Stripe distinct, sur le site (onboarding « Chloe » repéré dans les mails).
3. **PayPal** — connecté à Claude, fonctionne (0 transaction récente).

## ⚠️ La règle qui crée 90 % des « problèmes » : entité ↔ banque de versement
- Stripe **verse** (payout) vers un **compte bancaire du même pays/zone** que le compte Stripe.
  - Stripe **France/UE** → exige une **banque SEPA** (Qonto/BNP FR). Une banque **israélienne** n'est
    en général **pas** acceptée pour un Stripe FR.
  - Stripe **Israël** → verse vers une **banque israélienne**, facture en ₪/$.
- Donc avec une **structure mixte FR + IL**, le risque n'est pas l'« israélien » en soi, mais un
  **mauvais appariement** : ex. Stripe FR sans banque FR pour recevoir l'argent. → c'est LE point à caler.

## Statut par fournisseur (à confirmer dans chaque dashboard — je ne le vois pas tout depuis l'API)
| Canal | Israélien OK ? | À vérifier (dashboard) | Statut |
|---|---|---|---|
| **Stripe (Substack)** | ✅ Stripe existe en IL | « Charges enabled » + « Payouts enabled » + **banque de versement** liée + identité vérifiée | ⏳ à vérifier |
| **Stripe direct NAVLYS** | ✅ | Le compte existe-t-il vraiment ? Sous quelle **entité/pays** ? Banque liée ? | ⏳ à clarifier |
| **PayPal** | ✅ PayPal en IL | Compte **Business** (pas perso) + vérifié + devise de retrait | ⏳ à vérifier |
| **Qonto** | ⚠️ UE only | Réservé à une **société UE** → OK seulement si **entité FR** ; sinon KYC bloqué | ⏳ dépend entité |
| **BNP Paribas** | ⚠️ FR | Ouverture non-résident difficile → OK surtout si **société/résidence FR** | ⏳ dossier en cours |

## ❓ Ce que j'attends de Bruno pour finaliser
1. **Explique la structure « mixte »** : as-tu une **société française** ? une **entité israélienne** ?
   les deux (holding + filiale) ? Qui facture les abonnés ?
2. Quel canal est **principal** vs secondaire (pour caler la banque de versement la plus sûre) ?

## Plan de vérification (dès que l'entité est claire)
- [ ] Stripe (chaque compte) : Dashboard → *Settings → Payouts* : pays, banque liée, payouts activés.
- [ ] Stripe : *Settings → Business* : entité, vérification d'identité (KYC) complète.
- [ ] PayPal : type de compte **Business** + vérifié + IBAN/banque de retrait.
- [ ] Décider Qonto/BNP **selon l'entité** (UE ⇒ utile ; sinon ⇒ banque israélienne pour le Stripe IL).
- [ ] Tester un **paiement de 1 €/$ en réel** sur chaque canal (✅ feu vert Bruno requis — règle §3).
