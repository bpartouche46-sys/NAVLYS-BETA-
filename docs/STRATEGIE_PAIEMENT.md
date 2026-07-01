# 💳 NAVLYS — Stratégie de paiement (anti-blocage)

> Gravé le 2026-07-01 à partir de la vision de Bruno. Doctrine aussi en base
> (`navlys_memoire` type `doctrine`, `core_config` clés `payment_*`).

## Principe

**Encaissement via la société israélienne de Bruno** (fiscalité en Israël,
banque **Mizrahi, Ashkelon**). **Plusieurs prestataires** pour deux raisons :

1. **Anti-blocage** : si un prestataire suspend/bloque le compte, on bascule sur
   un autre **en changeant une seule ligne** (`core_config.payment_provider`),
   sans coupure de service.
2. **Couverture géographique** : encaisser partout — **France, Europe,
   Royaume-Uni, Suisse** — en plusieurs devises.

## La caisse unique

- Edge Function **`paiement`** (Supabase) = une seule porte d'entrée.
- `GET ?diag` → fournisseurs configurés + fournisseur actif.
- `POST {provider?, montant, devise?, libelle?, success_url, cancel_url}` →
  crée la session de paiement et renvoie l'URL de règlement.
- Bascule : `core_config.payment_provider` (`stripe` | `paypal` | …) ou champ
  `provider` de la requête. Aucune clé exposée (tout côté serveur).

## Fournisseurs (mix recommandé)

| Fournisseur | Rôle | Note pour une société israélienne |
|---|---|---|
| **Stripe** | Cartes FR/EU/UK/CH, multi-devises | Marchand Israël supporté ; reverse vers banque IL |
| **PayPal** | Secours mondial, confiance client | Israël supporté ; large couverture |
| **Merchant of Record** (Paddle / Lemon Squeezy) | **Gère la TVA EU/UK à ta place** | Idéal solo : ils sont le vendeur de registre, collectent/reversent la TVA, te paient |

> ⚠️ **TVA / fiscalité** : la vente d'abonnements numériques à des particuliers
> de l'UE déclenche la TVA dès le 1er euro (guichet OSS). Un **Merchant of
> Record** retire cette charge. À **confirmer avec le comptable** — NAVLYS ne
> donne pas de conseil fiscal personnalisé.

## Reversement

Vers les comptes **Mizrahi (Ashkelon)** ; cartes virtuelles ou réelles liées
aux comptes d'encaissement pour les dépenses opérationnelles.

## Ce qu'il reste (clés à fournir — dans Supabase → Edge Functions → Secrets)

- **Stripe test** : `STRIPE_SECRET_TEST` (`sk_test_…`).
- **PayPal sandbox** : `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_ENV=sandbox`.
- (Plus tard) Merchant of Record : compte + clés.

Dès que les clés test sont là, la caisse crée de vrais liens de paiement de test.
Le passage en réel = remplacer par les clés live + `payment_provider` voulu.

## 🇮🇱 Encaisser EN DIRECT sur le compte Mizrahi (rail israélien) — gravé 2026-07-01

> Vision de Bruno : **« un paiement direct par carte sur mon compte, sans passer
> par tous les intermédiaires. »** Voici la vérité technique, sans enrobage.

**La règle incontournable des cartes.** On ne peut PAS encaisser une carte avec
« zéro intermédiaire » : les réseaux (Visa/Mastercard) imposent un **acquéreur**
(סליקה). En Israël, les acquéreurs sont **Isracard, CAL, Max**. C'est eux qui
créditent **directement ton compte Mizrahi** (moins une commission ~1–2,5 %).

**Mais** on peut supprimer les intermédiaires **étrangers** (Stripe/PayPal/Lemon
Squeezy) : un **gateway israélien** local + un **accord de סליקה** = l'argent
tombe **directement sur Mizrahi**, tu gardes la marge, tu es le marchand.

**Les gateways israéliens (branchables sur la caisse `paiement`)**

| Gateway | Pourquoi | API |
|---|---|---|
| **PayPlus** | Le plus moderne, Apple Pay / Google Pay / Bit intégrés | REST propre — **recommandé** pour brancher |
| **Cardcom** | API REST documentée + webhooks + abonnements natifs | REST solide |
| **Meshulam / Grow** | Page de paiement hébergée, **PCI le plus léger** | Redirection simple |
| **Tranzila** | Iframe, tokenisation, 3-D Secure, Bit | Historique, fiable |

**Le compromis à connaître (honnête).** En devenant ton propre marchand, **c'est
toi qui gères la TVA** sur les ventes UE/UK (guichet OSS) — ce que le Merchant of
Record faisait à ta place. → **Stratégie hybride recommandée** : rail israélien
(PayPlus) pour encaisser en direct sur Mizrahi + garder un MoR en secours pour la
TVA UE quand utile. À valider avec le comptable (pas de conseil fiscal personnalisé).

**La seule action que Claude ne peut PAS faire à ta place** : ouvrir l'accord de
**סליקה** (KYC + ta signature), soit via Mizrahi (demander leur solution סליקה),
soit en t'inscrivant chez **PayPlus / Grow / Cardcom** (ils négocient l'acquéreur).
Dès que tu as les identifiants API du gateway → je l'ajoute comme provider dans la
caisse `paiement` (à côté de Stripe/PayPal), bascule en une ligne, testé.

**Clés à fournir plus tard** (Supabase → Edge Functions → Secrets), ex. PayPlus :
`PAYPLUS_API_KEY`, `PAYPLUS_SECRET_KEY`, `PAYPLUS_PAYMENT_PAGE_UID`.
