# NAVLYS Unified Dashboard — Specifications

> One nautical chart, three modules combined, one clear plan.

---

## The role of the dashboard

The unified dashboard is the completion of the journey. It takes the three modules and makes them speak together:

1. **Goal simulator** → provides the heading (target amount + timeline).
2. **Revealed Margin** → provides the fee savings (€/year recovered).
3. **Scientific Martingale** → provides the 90/10 split and the protection margin.

The dashboard invents nothing. It composes, aligns, and makes readable.

---

## Visible sections

### Top banner — Your heading

- A lighthouse icon and the goal name ("Travel", "Car", etc.).
- The target amount in large numbers.
- The sentence: "Heading set to X € in Y months".

### Center card — Your accelerated route

Two horizontal bars stacked:

- Grey bar: initial route without optimization (original duration).
- Ice Blue bar: accelerated route thanks to fee savings + 90/10 strategy.
- Label: "You arrive Z months earlier, P % faster".

### Left card — Fortress 90 %

- Icon: fortress on island.
- Amount: 90 % of starting capital or monthly contributions.
- Subtitle: "Capital sleeping safely, long-term ETF".

### Right card — Sailboat 10 % (Active Play)

- Icon: small sailboat.
- Amount: 10 % of capital.
- Subtitle: "Exploration capital, half-Kelly strategy recommended".
- Protection margin indicator (€ you accept to lose on the sailboat).

### Bottom card — Recommended strategy

- Strategy name (default: `half-kelly`).
- One sentence: "Best trade-off between potential and safety margin".
- Discreet link to adjust (fixed bet, quarter-Kelly, full Kelly).

### Footer — Permanent disclaimer

> Educational information. You remain the sole decision-maker. Test in simulation before any real commitment.

---

## Behaviors

- **Reactivity**: if the visitor changes an upstream parameter, the dashboard recomposes in real time.
- **Responsive**: on mobile, cards stack. On desktop, 2×2 mosaic.
- **Colors**: `--ice #7DD3FC` for active elements, `--bg #000` for background, off-white for text.
- **No input** on this view: it is a summary page. All inputs already happened at ports 1-3.

---

## Data consumed

The dashboard consumes a single `NavlysPlan` object (typed in `lib/navlysBridge.ts`). If the object is `null`, the page displays a simple message: "Go back to port 1 to set your heading."
