# Scientific Reference — 90/10 NAVLYS System
## brunopartouche.com edition — EN

**Author** : Bruno Mark Partouche — CIF (ORIAS registration pending), [entité — hors dépôt] mentoring.
**Status** : educational reference, scientific foundation of the NAVLYS engine.
**Version** : 1.0 — May 2026.

---

## 0. CIF disclaimer

This document is educational. It does not constitute personalised investment advice under the French Monetary and Financial Code. Anyone willing to apply a capital management strategy must first assess their wealth, horizon and risk tolerance, and may consult an ORIAS-registered Financial Investment Adviser (CIF). Past performance and Monte Carlo simulations shown here do not guarantee future results. Capital invested in the active sleeve (10 %) may be partially or fully lost.

---

## 1. 90/10 system architecture

The NAVLYS system relies on a strict accounting and operational separation of total capital `K` into two sleeves :

- **Fortress sleeve (90 %)** : `K_F = 0.90 × K`
  - Defensive allocation : money market, euro funds, investment-grade aggregate ETFs, or secured cash according to profile.
  - No speculative position. No leverage. No direct correlation with the active sleeve.
  - Role : preserve nominal capital and keep the ability to restart the active sleeve after a total drawdown.

- **Active sleeve (10 %)** : `K_A = 0.10 × K`
  - Tactical allocation driven by the NAVLYS engine through signals + Kelly sizing.
  - Maximum tolerated loss = 100 % of `K_A`, i.e. 10 % of total `K`.
  - Optional refill from the Fortress only on explicit user decision, never automated.

This separation is the cornerstone. It ensures no extreme market scenario can ever compromise 90 % of the wealth.

---

## 2. Quantitative justification of the 90/10 ratio

The 90/10 ratio is not arbitrary. It satisfies three simultaneous constraints :

1. **Preservation constraint** : maximum acceptable drawdown on total wealth set at 10 % (standard psychological and patrimonial threshold for a prudent investor).
2. **Materiality constraint** : the active sleeve must be large enough to produce a noticeable return at the wealth scale. Below 5 %, the operational effort is not justified. Above 15 %, the global drawdown becomes unacceptable.
3. **Fractional Kelly constraint** : the literature (Thorp 1969, MacLean & Ziemba 2010) recommends applying Kelly on a bet-sizing fraction of total capital, not on the whole, to absorb the estimation uncertainty of `p` and `b`.

The 90/10 ratio satisfies all three at once.

---

## 3. Mathematical formalisation of Kelly sizing

The optimal Kelly fraction for a binary bet with variable stake is :

```
f* = (b × p − q) / b
```

Where :
- `p` : signal-estimated probability of winning.
- `q = 1 − p` : probability of losing.
- `b` : payoff ratio (net odds) per unit staked.

**NAVLYS implementation** :
- `f*` computed in real time at every opportunity.
- Prudence factor `λ ∈ [0.25 ; 1.0]` applied per user profile (Half-Kelly, Quarter-Kelly).
- Effective stake = `f* × λ × K_A`.
- Strict cap : no stake > 100 % of `K_A`.

**Intuition** : `f*` maximises `E[log(K_{t+1})]`, which is equivalent to maximising long-term geometric growth. Any stake above `f*` mechanically degrades growth even if arithmetic expectation stays positive.

---

## 4. Monte Carlo simulation results

Three simulation campaigns were conducted (v5, v6, v7), each with 10 000 iterations, 250 trading days horizon, initial capital normalised to 1.00.

### 4.1. v5 — Pure Martingale validation

| Parameter | Value |
|---|---|
| Unit stake | 20 % of `K_A` |
| Signal hit rate | 55 % |
| Profitable days | **70.5 %** |
| Verdict | VIABLE FORMULA |

### 4.2. v6 — Random signal test

| Parameter | Value |
|---|---|
| Strategy | Martingale |
| Signal hit rate | 50 % (random) |
| Mean ROI | **−1.07 %** |
| Verdict | NOT VIABLE without signal |

Empirical demonstration : sizing alone creates no edge. Profitability depends entirely on signal quality.

### 4.3. v7 — Kelly vs Martingale vs Fixed stake comparison

| Strategy | Mean ROI | Zero-floor hit rate |
|---|---|---|
| **Full Kelly** | **+17.02 %** | **0 %** |
| Martingale | +9.71 % | 37.1 % |
| Fixed stake | +3.63 % | 0 % |

**Conclusion** : Kelly dominates on the return/risk pair. Martingale offers higher returns than a fixed stake but exposes to an unacceptable ruin risk (37 % probability of losing 100 % of `K_A` over the tested horizon).

---

## 5. The 14 configuration parameters

The NAVLYS engine exposes 14 parameters : 5 visible in the client UI, 9 advanced and hidden.

### 5.1. Client-visible parameters (5)
1. **Fortress / Active ratio** — default 90/10, allowed range 95/5 to 80/20.
2. **Kelly prudence factor `λ`** — default 0.50 (Half-Kelly), range 0.25 to 1.00.
3. **Signal confidence threshold** — default 0.55, range 0.52 to 0.65.
4. **Maximum trips per day** — default 1, range 0 to 5.
5. **Automatic / manual mode** — default manual (user confirms every trip).

### 5.2. Advanced parameters (9)
6. Intraday drawdown cap on `K_A` — default 30 %.
7. Consecutive loss limit before pause — default 5.
8. Pause duration after limit — default 24 h.
9. Refill mode from `K_F` to `K_A` — default off.
10. Signal smoothing window — default 5 periods.
11. Multi-factor signal weighting — default equal-weighted.
12. Slippage tolerance — default 0.10 %.
13. Single-asset exposure cap — default 25 % of `K_A`.
14. Log / audit mode — default on, full traceability.

---

## 6. 5-screen architecture

The client UI follows a linear 5-screen path :

1. **Welcome** : wealth dashboard (Fortress, Active, cumulative performance).
2. **Today's idea** : algorithmic recommendation (action, size, signal rationale).
3. **My settings** : 5 visible sliders, "Details" button for the 9 advanced ones.
4. **Execute** : trade confirmation, order routed or simulated.
5. **Recap** : daily wrap-up, learning journal, parameter tuning.

---

## 7. Regulatory positioning

The NAVLYS system is marketed under the NAVLYS brand as an **educational financial-literacy tool** and **strategy simulator**. It does not execute real orders without a third-party broker explicitly mandated by the user, and does not perform order reception-transmission (RTO).

Bruno Mark Partouche, as a CIF (ORIAS registration pending), offers a complementary personalised wealth advisory service via brunopartouche.com under a formal CIF agreement. NAVLYS and brunopartouche.com are distinct entities : NAVLYS = public-facing educational product, brunopartouche.com = regulated advisory service.

---

## 8. Scientific roadmap

- **v8** : integration of a multi-factor signal (technical + macro + sentiment) with walk-forward validation.
- **v9** : adaptive Kelly test (`λ` dynamic with realised volatility).
- **v10** : back-test on real 2010-2025 data across asset classes.

---

## 9. Final disclaimer

Educational document. Figures stem from Monte Carlo simulations. Past performance ≠ future. Every investment carries capital-loss risk. Consult an ORIAS-registered professional before any actual allocation decision.

**Author** : Bruno Mark Partouche
**Site** : brunopartouche.com
**CIF status** : ORIAS registration pending, [entité — hors dépôt] mentoring.
