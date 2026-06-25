# NAVLYS — Pricing strategy & net margin

> Internal analysis — Bruno only.

## 1. Public tariffs

| Offer | Price | Cadence | Stripe mode |
|-------|-------|---------|-------------|
| NAVLYS Monthly | 49 € | monthly recurring | `subscription` |
| NAVLYS Annual | 490 € | annual recurring (save 98 € + bronze coin) | `subscription` |
| NAVLYS Bio Live | 39 € | one-time lifetime | `payment` |

## 2. Stripe fees (Europe, SEPA + international cards)

| Card type | Stripe fee |
|-----------|-----------|
| EU card (SEPA) | 1.5% + 0.25 € |
| Non-EU card | 2.5% + 0.25 € |
| Wallet (Apple/Google Pay) | same as card |

## 3. Net margin per offer — EU card

### Monthly 49 € (avg commitment 7 months)
- Gross collected: 49.00 €
- Stripe fee: 49 × 1.5% + 0.25 € = **0.99 €**
- Net Stripe: **48.01 €**
- 7-month LTV: **336.07 €**
- 12-month LTV (rare): **576.12 €**

### Annual 490 € (single charge)
- Gross collected: 490.00 €
- Stripe fee: 490 × 1.5% + 0.25 € = **7.60 €**
- Net Stripe: **482.40 €**
- Bronze coin + shipping (EU): **-28.00 €**
- Net after coin: **454.40 €**
- vs 12 × 48.01 € monthly = 576.12 € → annual is *less* gross-margin BUT:
  - Cashflow upfront × 12.
  - Guaranteed 12-month commitment (vs avg 30% churn).
  - Bronze coin = psychological anchor + brand object = reduces year+1 churn.
  - NAVLYS-adjusted annual LTV ≈ **750-800 €** over 2 years (~60% renewal).

### Bio Live 39 € (one-shot)
- Gross collected: 39.00 €
- Stripe fee: 39 × 1.5% + 0.25 € = **0.84 €**
- Net Stripe: **38.16 €**
- Marginal NAVLYS cost: ~0 (platform already hosted).
- **Net margin: 97.8%**

## 4. Vibez coupons — margin impact

| Coupon | Target | Net after discount | Margin vs full price |
|--------|--------|--------------------|----------------------|
| VIBEZ80 (W1) | Monthly | 9.80 € → net 9.40 € | pure acquisition |
| VIBEZ50 (W1) | Annual | 245 € → net 241.5 € → after coin 213.5 € | season 1 break-even |
| VIBEZ70 (W2) | Monthly | 14.70 € → net 14.22 € | pure acquisition |
| VIBEZ30 (W2) | Annual | 343 € → net 338 € → after coin 310 € | margin 63% |
| VIBEZ10 (W3) | All plans | -10% | near-normal margin |

W1 coupons are **acquisition investments**: 0 € margin accepted in exchange for 200 signups + social proof.

## 5. Target hypotheses

- **Pricing page → checkout conversion**: 4-6%.
- **Checkout → payment**: 70-80% (3DSv2 OK).
- **Target mix**: 40% Monthly · 35% Annual · 25% Bio Live.
- **Monthly churn**: 12-15% (first 3 months), stabilizes at 6%.
- **Annual churn at renewal**: 30-40%.

## 6. Weighted average cart

With target mix:
- 0.40 × 336.07 € (monthly LTV 7mo) = 134.43 €
- 0.35 × 454.40 € (annual net coin) = 159.04 €
- 0.25 × 38.16 € (bio) = 9.54 €
- **Weighted average cart ≈ 303 €**

To reach 100 k€ net annual revenue: **~330 signups**.

## 7. Recommendations

1. Push annual hard: pricing page features annual + "bronze coin included" banner.
2. Keep Bio Live at 39 € as zero-friction front-end product.
3. After 200 members, raise monthly to 59 € (A/B test on new signups).
4. At 500 members, launch a **NAVLYS LIFETIME** at 1,990 € with coin + large numbered bronze art piece.

---

*"Bronze doesn't rust. Neither does loyalty."*
