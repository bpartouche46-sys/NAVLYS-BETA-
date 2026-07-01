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
