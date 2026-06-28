# Plan capture — port 7

> A sealed bottle, containing the visitor's personal plan.

---

## The moment of capture

At the end of the journey, the visitor holds their plan. To carry it home, we offer two exit ports:

1. **Email** — to receive the full plan as an attachment and keep a trace.
2. **WhatsApp** — to share the plan instantly with a loved one.

---

## What we ask

- **Email**: required field, simple regex validation.
- **GDPR consent**: clear checkbox, in plain language.
  > "I agree to receive my plan by email. I can unsubscribe at any time."
- **No phone, no full name**: we stay light to not scare the visitor.

---

## What we send

Auto-email, simple maritime tone:

> Hello,
>
> Your NAVLYS plan is ready. Here is your heading, your accelerated timeline, and your 90/10 split.
>
> [Plan summary in plain text]
>
> Keep this bottle safely.
>
> Disclaimer: Educational information. You remain the sole decision-maker. Test in simulation before any real commitment.

No image, no big logo, no aggressive commercial pitch. Just the plan.

---

## The WhatsApp button

Client-side generated URL:

```
https://wa.me/?text=<URL-encoded-plan>
```

The message contains:
- The heading (goal + amount)
- The accelerated timeline
- The 90/10 split
- The disclaimer

No aggressive outbound link, no hidden tracking.

---

## Server side

API route: `app/api/plan-save/route.ts`

- Receives `{ plan: NavlysPlan, email: string, consent: boolean }`
- Validates consent (refusal → 400)
- Saves the plan in a persistence layer (placeholder, to plug on Supabase or similar)
- Sends email via Resend (API key in env var)
- Returns `{ ok: true }` or `{ ok: false, reason: string }`

No banking or identifying data is stored beyond the email and the plan.

---

## Modal footer

> Educational information. You remain the sole decision-maker. Test in simulation before any real commitment.
