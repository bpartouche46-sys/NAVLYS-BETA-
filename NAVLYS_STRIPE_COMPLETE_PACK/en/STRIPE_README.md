# NAVLYS — Stripe README (EN)

> Step-by-step guide for Bruno. No unnecessary jargon, plain maritime language.

## 1. Open your Stripe France account

1. Go to `https://dashboard.stripe.com/register`.
2. Create the account with the NAVLYS email (separate from your personal mail).
3. Activate **Live mode** once documents are provided (KBIS, IBAN, ID).
4. Configure French VAT: Settings → Tax → enable **France 20%**.

## 2. Grab your keys (Test mode first)

Dashboard → Developers → API keys:
- **Publishable key**: `pk_test_...`
- **Secret key**: `sk_test_...`

Put these in Vercel (never in client-side code).

## 3. Vercel environment variables

Add these 4 vars in Vercel → Settings → Environment Variables:

```
STRIPE_SECRET_KEY        = sk_test_...      (or sk_live_... in production)
STRIPE_PUBLISHABLE_KEY   = pk_test_...      (or pk_live_... in production)
STRIPE_WEBHOOK_SECRET    = whsec_...        (given after webhook creation)
NAVLYS_BASE_URL          = https://navlys.com
NAVLYS_ADMIN_TOKEN       = (random 32-char secret you generate)
NAVLYS_WORKSHOP_EMAIL    = fulfillment@navlys.com
```

## 4. Provision Stripe products

### macOS / Linux
```bash
chmod +x setup/setup_stripe_navlys.sh
./setup/setup_stripe_navlys.sh
```

### Windows PowerShell
```powershell
.\setup\setup_stripe_navlys.ps1
```

The script creates:
- 3 products (Monthly 49 € / Annual 490 € / Bio Live 39 €)
- 5 Vibez coupons (promo ladder)
- 1 webhook endpoint pointing to `NAVLYS_BASE_URL/api/stripe/webhook`

## 5. Retrieve webhook secret

At the end of the script, copy the `whsec_...` returned by Stripe and paste into Vercel as `STRIPE_WEBHOOK_SECRET`.

## 6. End-to-end test

```bash
./setup/seed_test_customers.sh
stripe trigger checkout.session.completed
stripe trigger invoice.paid
```

Verify:
- Welcome email sent (server console in dev).
- If annual plan: bronze coin order logged.

## 7. Connected public pages

- FR: `https://navlys.com/rejoindre-equipage`
- EN: `https://navlys.com/en/join-the-crew`
- Confirmation FR: `/succes`
- Confirmation EN: `/en/success`
- Customer Portal: POST `/api/stripe/portal` with `{ email }`

## 8. Bronze coin — operational protocol

See `fulfillment/en/BRONZE_COIN_PROTOCOL.md`. In short:
1. Stripe confirms annual payment → webhook → auto coin order.
2. Bruno validates in back-office.
3. Workshop strikes the numbered coin.
4. Bruno receives, QCs, packs, ships via UPS.
5. Member receives coin in 3-5 weeks.

## 9. Critical security

- **NEVER** put a Stripe secret key in client code.
- Webhook **always** signature-verified (already handled in `webhook/route.ts`).
- Rate limit `/api/stripe/*` handled by Vercel middleware (see VERCEL_FIX_PACK).
- No PII in server logs.

## 10. Going to production

1. Switch to `sk_live_...` and `pk_live_...` in Vercel (Production env).
2. Re-run `setup_stripe_navlys.sh` in Live mode (coupons/products are per mode).
3. Update `NAVLYS_BASE_URL` with the final domain.
4. Enable 3D Secure 2 (active by default in Stripe Europe).
5. Test a real 49 € transaction, verify IBAN payout at D+7.

---

*"You don't sail against the wind. You trim the sails."*
— NAVLYS NEXT GEN INVEST
