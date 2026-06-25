# NAVLYS — Stratégie pricing & marge nette

> Analyse interne — pour Bruno uniquement.

## 1. Tarifs publics

| Offre | Prix | Cadence | Mode Stripe |
|-------|------|---------|-------------|
| NAVLYS Mensuel | 49 € | mensuel récurrent | `subscription` |
| NAVLYS Annuel | 490 € | annuel récurrent (économie 98 € + pièce bronze) | `subscription` |
| NAVLYS Bio Live | 39 € | paiement unique à vie | `payment` |

## 2. Frais Stripe (Europe, carte SEPA & internationale)

| Type de carte | Frais Stripe |
|---------------|--------------|
| Carte EU (SEPA) | 1,5% + 0,25 € |
| Carte hors EU | 2,5% + 0,25 € |
| Wallet (Apple Pay, Google Pay) | identique carte |

## 3. Marge nette par offre — carte EU

### Mensuel 49 € (engagement moyen 7 mois)
- Brut encaissé : 49,00 €
- Frais Stripe : 49 × 1,5% + 0,25 € = **0,99 €**
- Net Stripe : **48,01 €**
- Valeur sur 7 mois moyens (LTV) : **336,07 €**
- Valeur sur 12 mois (rare) : **576,12 €**

### Annuel 490 € (un seul paiement)
- Brut encaissé : 490,00 €
- Frais Stripe : 490 × 1,5% + 0,25 € = **7,60 €**
- Net Stripe : **482,40 €**
- Coût pièce bronze + envoi (EU) : **-28,00 €**
- Net après pièce : **454,40 €**
- Vs 12 × 48,01 € mensuel = 576,12 € → l'annuel est *moins* rentable brut **mais** :
  - Cash up-front immédiat (cashflow x 12).
  - Engagement 12 mois garanti (vs churn moyen 30%).
  - Pièce bronze = effet « ancre psychologique » + objet brand = réduction churn N+1.
  - LTV ajustée NAVLYS (annuel) ≈ **750-800 €** sur 2 ans (renouvellement ~60%).

### Bio Live 39 € (one-shot)
- Brut encaissé : 39,00 €
- Frais Stripe : 39 × 1,5% + 0,25 € = **0,84 €**
- Net Stripe : **38,16 €**
- Coût marginal NAVLYS : ~0 (plateforme déjà hébergée).
- **Marge nette : 97,8%**

## 4. Coupons Vibez — impact marge

| Coupon | Offre cible | Net après remise | Marge vs prix plein |
|--------|-------------|------------------|---------------------|
| VIBEZ80 (S1) | Mensuel | 9,80 € → net 9,40 € | acquisition pure |
| VIBEZ50 (S1) | Annuel | 245 € → net 241,5 € → après pièce 213,5 € | break-even saison 1 |
| VIBEZ70 (S2) | Mensuel | 14,70 € → net 14,22 € | acquisition pure |
| VIBEZ30 (S2) | Annuel | 343 € → net 338 € → après pièce 310 € | marge 63% |
| VIBEZ10 (S3) | Tous plans | -10% | marge proche normale |

Les coupons S1 sont des **investissements d'acquisition** : on accepte 0 € de marge pour générer 200 inscriptions volume + preuve sociale.

## 5. Hypothèses de cible

- **Conversion page pricing → checkout** : 4-6%.
- **Conversion checkout → paiement** : 70-80% (3DSv2 OK).
- **Mix offres cible** : 40% Mensuel · 35% Annuel · 25% Bio Live.
- **Churn mensuel** : 12-15% par mois (premier 3 mois), stabilise à 6%.
- **Churn annuel** : 30-40% au renouvellement N+1.

## 6. Panier moyen pondéré

Avec mix cible :
- 0,40 × 336,07 € (mensuel LTV 7 mois) = 134,43 €
- 0,35 × 454,40 € (annuel net pièce) = 159,04 €
- 0,25 × 38,16 € (bio) = 9,54 €
- **Panier moyen pondéré ≈ 303 €**

Pour atteindre 100 k€ revenu net annuel : **~330 inscrits**.

## 7. Recommandations

1. Pousser fort l'annuel : page pricing met l'annuel en featured + bandeau « pièce de bronze incluse ».
2. Garder Bio Live à 39 € comme produit d'appel zéro friction.
3. Une fois 200 membres atteints, augmenter le mensuel à 59 € (test A/B sur nouveaux entrants).
4. À 500 membres, lancer un **NAVLYS LIFETIME** à 1 990 € avec pièce + œuvre d'art bronze grande série numérotée.

---

*« Le bronze ne rouille pas. La fidélité non plus. »*
