# Brief — Integrating the cockpit as the NAVLYS app home screen (PWA)

> Goal: make the cockpit the **member app home**, a living landing screen the user returns to every morning.

---

## 1. Place in the app

The cockpit becomes the `/` (or `/app`) screen after login. It is the **daily entry point**: you arrive, read your heading of the day, trim your winches, leave. The rest of the app (watch/insights, education, partners, settings) opens from discreet edge entries — the cockpit stays the heart.

Target stack (consistent with the existing `navlys/` repo): **Next.js (App Router) + React + TypeScript strict + Tailwind**, installable PWA (manifest + service worker).

---

## 2. Component breakdown

Reuse the React components provided in `components/`:

| Component | Role |
|---|---|
| `Cockpit.tsx` | container, allocation state, 360 scene orchestration |
| `MastControl.tsx` | a mast + its sails (exposure, inflation) |
| `WinchSlider.tsx` | a winch (allocation, reallocation, sail trim) |
| `MeteoNavlys.tsx` | market weather dial + held heading |
| `CapDuJourInstrument.tsx` | central instrument, heading of the day |

`Cockpit.tsx` owns the state (`CockpitState`) and passes it down as props. Shared types live in `components/types.ts` (provided). **TS strict** everywhere: no `any`, typed props, typed returns.

---

## 3. Data: demo → real (gradual)

The prototype runs on simulated data. For the app:

1. **Phase 1 (launch)**: keep the local simulation for the demo and onboarding (no sensitive data).
2. **Phase 2**: wire a `GET /api/cockpit/today` endpoint returning a **generic, non-personalised** object:
   ```ts
   type CockpitToday = {
     heading: { label: string; entry: number; targetExitPct: number };
     marketWind: number;            // -1..1, general trend (educational)
     date: string;                  // ISO
   };
   ```
3. Allocation, reallocation and sail trim remain **user settings** (stored on the profile), never executed orders.

> ⚠️ NAVLYS positioning: **no advice, no placement, no collection of funds.** The cockpit illustrates a method; it **executes no transaction** and shows **no proprietary algorithm number**.

---

## 4. State & persistence

```ts
type CockpitState = {
  capital: number;        // demo: 1000
  fortShare: number;      // 0.80..0.95 (allocation winch)
  realloc: number;        // 0..1 (reallocation winch)
  voilure: 0 | 1 | 2;     // cautious / balanced / aggressive
  market: number;         // -1..1
  facing: "avant" | "arriere";
  history: number[];
};
```

- Persist `fortShare`, `realloc`, `voilure`, language on the profile (Supabase, already in the repo) or `localStorage` for guests.
- **Never** persist real financial data client-side without encryption and consent.

---

## 5. PWA & performance

- **Manifest**: name "NAVLYS", icon = bronze coin, `theme_color #000000`, `background_color #000000`, `display: standalone`, `portrait` prioritised on mobile.
- **Service worker**: cache the cockpit shell for **instant launch** and offline use (the screen renders even without network, day's data refreshed on connection).
- **Performance**: animations in CSS `transform`/`opacity` (GPU). Honour `prefers-reduced-motion` (disable rotor, streaks, animated come-about). Lazy-load secondary screens.
- **A11y**: keyboard navigation for winches (native `input[type=range]`), `aria-label` on the stage, WCAG AA contrasts already validated by the palette.

---

## 6. Internationalisation

- FR / EN from launch (the prototype already ships the dictionary).
- Use `next-intl` or a simple i18n context; keys identical to the prototype to reuse translations.
- The **disclaimer** and the **signature** are present on the home screen, translated, non-dismissible.

---

## 7. Mandatory footer

- **Permanent disclaimer**, visible without excessive scrolling.
- NAVLYS **signature** as closing line.
- "Demo data" notice as long as the app shows no real, non-personalised data.

---

## 8. Definition of Done

- [ ] The cockpit is the home screen after login, instant (PWA cache).
- [ ] The 5 React components integrated, TS strict, no `any`.
- [ ] Winches persisted to the profile; FR/EN working.
- [ ] `prefers-reduced-motion` honoured.
- [ ] Disclaimer + signature present and translated.
- [ ] No order executed, no algorithm number exposed, no funds collected.
- [ ] 2D fallback = this prototype; palette + metaphor consistency verified.

## Disclaimer & signature

> NAVLYS shares general, educational information. This is not personalised financial advice.
>
> *"One heading, one hand, one day. NAVLYS guides you to your goal in a single move."*
