# NAVLYS — Cockpit Specification (UI / UX)

> Visual and functional source of truth for the NAVLYS cockpit.
> Version 1.0 · prototype `cockpit.html` / `cockpit_mobile.html`.

---

## 1. The intent

The NAVLYS cockpit is not one more financial dashboard. It is **the helm of a two-masted ketch**, seen first-person, in 360°. The user does not "look at data" — **they hold a tiller**. Ahead, their heading. Behind, their wake. Within reach, the winches. Above, the wind.

It all flows from one conviction: *the market wind keeps changing; your heading does not move.*

Three design laws:

1. **Metaphor first.** No abstract notion appears without its nautical equivalent. We don't say "volatility" — we show sails luffing.
2. **A single move.** At any moment the user can act with one finger: turn, come about, trim a winch. Never more than three controls visible at once.
3. **Calm before number.** The ground is night, motion is slow, light is scarce. The number arrives after the image, never before.

---

## 2. The 360° stage

The centrepiece is a **rotating two-faced stage**, joined by a 180° turn (`rotateY`), giving the feeling of turning around in the cockpit.

### FORWARD view — *the heading*
Looking toward the bow: the future, the goal.

- **The goal-star**: a pulsed ICE BLUE halo at top centre, with an 8-point pole star. The target.
- **The main mast** (forward) carries **mainsail + genoa** = **90% — The Fortress**. Wide, calm, full sails.
- **The Flettner rotor**, to windward, spins continuously: the curation, the watching eye.
- **The great global wind weather** reads forward (dial).
- **Bronze woodwork** of the cockpit in the foreground, with winch bases.

### AFT view — *the wake*
Looking toward the stern: the past, the results.

- **The wake**: a V-shaped foam trail widening toward the user.
- **The results curve** (equity curve) drawn over the wake, fed by history.
- **The mizzen** (aft mast) carries **small sails** = **10% — The Active Play**.

### Transition rules
- Duration 1.0–1.2 s, easing `cubic-bezier(.6,.02,.2,1)`.
- `backface-visibility: hidden` on each face.
- Triggers: **“Come about ↻”** button + **horizontal swipe** (mobile, ~55 px threshold).
- The view label (FORWARD / AFT) updates on every tack.

---

## 3. The two masts and their sails

| Element | Metaphor | Driving data |
|---|---|---|
| Main mast · large sails | The Fortress · 90% secured | Fortress share, secured capital |
| Mizzen · small sails | The Active Play · 10% reactive | Active share, day's performance |

**Sail inflation**: each sail is an SVG group with `transform-box: fill-box` and a `transform-origin` at the tack (mast side). JS applies `scaleX(k)`, where `k` depends on the **simulated wind** (market state) and the chosen **sail trim**. Full sail → `k ≈ 1.05`. Luffing sail → `k ≈ 0.6`, with a `luff` animation (slight brightness shift).

---

## 4. The winches (controls)

Three winches, never more, shown as **bronze sliders** with a small notched drum. "Within reach."

1. **Allocation winch** — Fortress / Active split.
   - Default **90 / 10**. Range **95/5 → 80/20**.
   - Immediate effect: rebalances current capital to the new ratio.
2. **Profit reallocation winch** — share of the day's gains poured back into the Fortress.
   - Default **50%**. Range 0 → 100%.
   - Effect: on each "new day", the chosen share of positive gains migrates from the Active Play into the Fortress (vault compounding).
3. **Sail trim winch** — exposure.
   - Three notches: **Cautious · Balanced · Aggressive**.
   - Effect: amplitude (volatility) and directional bias of the Active Play.

**Reactivity**: any winch move instantly recomputes Fortress €, Active Play €, total €, 1-year projection.

---

## 5. The weather dial + your heading

Two instruments side by side, to make **the contrast visible**:

- **NAVLYS weather**: an arc dial (red down → grey neutral → ICE BLUE up). The bronze needle swings with the simulated world-market state.
- **Your heading**: a round compass whose needle stays **fixed, due north**. It does not move, whatever the wind.

Below both, a key line: *"The market wind keeps turning. Your heading does not move."*

---

## 6. The central instrument — the heading of the day

At the bottom centre of the stage, a dark card topped by the **bronze-medallion compass** (the spinning NAVLYS coin, 8 s / turn). It shows:

> **Heading of the day: [ticker] · Entry [price] · Target exit +X%**

The ticker is **fictional** (wind names: MISTRAL-7, ZÉPHYR-3, TRAMONTANE-9…). No real market symbol, no algorithm number. It is a demonstration of form, not a signal.

---

## 7. The Flettner rotor

Vertical cylinder with bronze/night stripes, in continuous rotation (illusion via vertical scroll under a `clipPath` mask). It symbolises **the curation**: the sharp eye that reads the world's wind and produces **one** clear signal each morning. No noise, just the heading.

---

## 8. Motion & atmosphere

- **Bronze coin**: `rotateY` 8 s linear.
- **Flettner rotor**: seamless looped scroll (period = 2 stripes).
- **Wind streaks**: thin ICE BLUE lines that drift intermittently across the forward view (the great global wind), contrasting with the held heading.
- **Sails**: gentle `scaleX` transition (0.8 s) on each data change + permanent light `luff`.
- Golden rule: **nothing blinks, nothing shouts.** Motion is nautical, slow, breathing.

---

## 9. Responsiveness & platforms

- **Desktop / tablet**: `cockpit.html`. Wide stage, 2×2 instrument cluster grid.
- **Mobile portrait**: `cockpit_mobile.html`. Stage on top, compact capital, winches stacked at the bottom **within thumb reach**, swipe gesture to come about.
- Touch targets ≥ 44 px. Slider thumbs 26–30 px.
- **FR / EN** switch top-right, no reload.

---

## 10. Data (demo)

- Starting capital: **€1,000**.
- Fortress: smoothed growth ~5%/yr.
- Active Play: simulated daily return, **bounded** (−6% / +8%), modulated by trim × market.
- World market: bounded random walk (−1 … +1).
- 1-year projection: deterministic, illustrative only.
- **No real connection. No advice. Generic data.**

---

## 11. Permanent disclaimer (mandatory, footer)

> NAVLYS shares general, educational information. This is not personalised financial advice. You decide everything, you manage everything. For any important decision, talk to a certified professional.

## 12. Signature (always closes the screen)

> *"One heading, one hand, one day. NAVLYS guides you to your goal in a single move."*
