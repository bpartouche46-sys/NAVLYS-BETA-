# Integration into the NAVLYS-HUB repo on Vercel

> How to dock this pack onto the main ship.

---

## Steps as image

1. **Clone the bridge onto the ship**: copy the `NAVLYS_BRIDGE_PACK/` folder into the NAVLYS-HUB repo, at the root of `apps/web/` (or equivalent Next.js App Router).
2. **Align the routes**: the files `app/mon-plan/page.tsx` and `app/en/my-plan/page.tsx` complete the existing Next.js tree.
3. **Plug the API**: `app/api/plan-save/route.ts` plugs itself in, it is a Next 14 compliant route.
4. **Import shared types**: `lib/navlysBridge.ts` is importable from any component in the repo.

---

## Environment variables

To add in Vercel → Project Settings → Environment Variables:

| Key | Example value | Meaning |
|---|---|---|
| `RESEND_API_KEY` | `re_xxx` | Resend API key to send the email |
| `RESEND_FROM_EMAIL` | `plan@navlys.app` | Sender address |
| `NAVLYS_DASHBOARD_BASE_URL` | `https://navlys.app` | Canonical URL for email links |

All optional: if undefined, the API returns a simulated placeholder.

---

## Quick tests after deployment

1. Go to `/mon-plan` → the journey must start at port 1.
2. Complete the 7 ports → the dashboard must display.
3. Submit the email → a toast confirms reception.
4. Verify the EN version on `/en/my-plan`.

---

## FR / EN switch

The `NavlysParcours` component receives a `locale: 'fr' | 'en'` prop. Translation is done by an internal dictionary (no i18next dependency to stay light).

---

## Compatibility

- Next.js 14+ (App Router)
- React 18+
- TypeScript strict
- Tailwind CSS (classes are compatible, otherwise adapt)
- No additional heavy dependency

---

## Permanent disclaimer in the global footer

The NAVLYS-HUB site footer must permanently display:

> Educational information. You remain the sole decision-maker. Test in simulation before any real commitment.
