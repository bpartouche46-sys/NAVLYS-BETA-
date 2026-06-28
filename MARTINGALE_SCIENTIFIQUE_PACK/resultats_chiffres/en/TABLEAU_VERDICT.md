# Verdict table — Monte Carlo NAVLYS results
## EN — numerical synthesis

> Educational content. Past performance ≠ future. Monte Carlo simulations, 10 000 iterations, 250-day horizon.

---

## 1. The picture in one glance

| Strategy | Mean gain | Wreck risk | Maritime image |
|---|---|---|---|
| **Full Kelly** | **+17.02 %** | **0 %** | Perfectly trimmed sail. You catch the wind without capsizing. |
| Martingale | +9.71 % | 37.1 % | Faster when it works. 1 trip out of 3 ends with the sailor wrecked at port. |
| Fixed stake | +3.63 % | 0 % | Slow, safe sailing. Flat. |
| Random signal | −1.07 % | high | Without a heading, the boat drifts. |

**Verdict : Kelly wins.** More gain, zero wreck. It is the engine chosen for NAVLYS.

---

## 2. Three campaigns in detail

### Campaign v5 — Pure Martingale validation

- Unit stake : 20 % of active sleeve
- Signal hit rate : 55 %
- **Profitable days : 70.5 %**
- Initial verdict : VIABLE FORMULA

Image read : 7 tides out of 10 are favourable. A majority of good days.

### Campaign v6 — The signal alone makes the difference

- Strategy : Martingale
- Signal hit rate : 50 % (pure random)
- **Mean ROI : −1.07 %**
- Verdict : NOT VIABLE without signal

Image read : without a heading, the boat drifts. The staking method creates no wealth. The heading does.

### Campaign v7 — Three-engine comparison

| Engine | Mean ROI | Zero-floor hit rate |
|---|---|---|
| Full Kelly | **+17.02 %** | **0 %** |
| Martingale | +9.71 % | 37.1 % |
| Fixed stake | +3.63 % | 0 % |

Image read :
- Kelly : sail trimmed perfectly to the wind. You go fast, you never capsize.
- Martingale : you double after each failure. You can win big, but 1 time out of 3 you empty the boat.
- Fixed stake : you always raise the same sail. You move slowly, without danger.

---

## 3. Kelly formula in plain words

`f* = (b × p − q) / b`

- `f*` : how much sail to raise (between 0 % and 100 % of the boat)
- `p` : your estimated probability of success
- `q = 1 − p` : your probability of failure
- `b` : gain / loss ratio

Image read : the surer your heading (p high), the more sail you can raise. The harsher the sea (p low), the less sail you carry.

Kelly tells you the exact sail to raise, every trip, without emotion.

---

## 4. Why 90/10 and not 100/0 or 50/50 ?

- **100/0** : everything sheltered. You sleep well. But your money does not grow.
- **50/50** : half at play. If the sea rages, you lose half.
- **90/10** : just enough at play to make a difference. Global risk capped at 10 %.

90/10 is the ratio that maximises return per unit of risk for a prudent investor.

---

## 5. Disclaimer

Educational document. The figures come from Monte Carlo simulations. Real markets may behave differently. Past performance ≠ future. Always test in simulation before going live.
