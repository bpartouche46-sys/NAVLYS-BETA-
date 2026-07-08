# 🏛️ INCORPORATION FILE — NAVLYS WEB SERVICE LTD (Israeli company)

> Prepared 2026-07-08 for Bruno Mark Partouche. Purpose: incorporate the Israeli
> company that will collect all revenue and eventually replace the French rail.
> This file is ready to bring to a certified accountant (רואה חשבון) and an
> Israeli lawyer (עו"ד) — signatures and KYC are the ONLY steps Bruno must do
> in person.
> ⚠️ General information to be confirmed with the accountant — this is not
> personalized tax advice (private-citizen status).
> The Articles of Association are in a separate file:
> `ARTICLES_NAVLYS_WEB_SERVICE_EN.md` (English) / `TAKANON_NAVLYS_WEB_SERVICE_HE.md` (Hebrew).

## 1. The two possible paths (to be decided with the accountant)

| | A — Authorized Dealer (עוסק מורשה) | B — Private Limited Company (חברה בע"מ) |
|---|---|---|
| What it is | Bruno in his own name, VAT-registered | A true company: "NAVLYS WEB SERVICE LTD" |
| Timeline | a few days | ~1–2 weeks |
| Setup cost | almost none | ~830 ₪ (Registrar of Companies fee) + professional fees |
| Card acquiring (סליקה) | yes | yes |
| Liability | personal | limited to the company ✅ |
| Partner model (lifetime licenses) | possible but fragile | **recommended** ✅ |
| Moving from A to B later | possible | — |

**NAVLYS recommendation: aim for B (Ltd)** — the Ltd must own the domains, the
partner COREs and sign the lifetime operating licenses. If the accountant
advises starting with A for speed: A first, then B.

## 2. Pre-filled identity sheet (path B — Ltd)

| Field | Prepared value |
|---|---|
| Name (English) | NAVLYS WEB SERVICE LTD |
| Name (Hebrew) | נבליס ווב סרוויס בע"מ (transliteration to be validated) |
| Corporate purpose | Development, operation and management of digital services and applications; hosting and technical management for third parties; grant of operating licenses; online subscription services. |
| Sole shareholder | Bruno Mark Partouche (100 %) |
| Director | Bruno Mark Partouche |
| Registered office | Bruno's address in Israel (to be completed) |
| Share capital | standard minimum (e.g. 1,000,000 authorized ordinary shares of 0.01 ₪; 100 issued — the accountant decides) |
| Bank | Mizrahi-Tefahot, Ashkelon branch (existing accounts) |
| VAT activity code | digital services / software (accountant assigns) |

## 3. Concrete steps (in order)

1. **Choose the accountant (רואה חשבון)** — he drives the whole process; a firm
   used to digital/high-tech clients in Ashkelon or online is enough.
2. **Registration with the Registrar of Companies (רשם החברות)**, online on
   Gov.il: Articles of Association (תקנון), directors' declaration, ~830 ₪ fee —
   Bruno's signature verified by an Israeli lawyer (עו"ד), usually included in
   the firm's incorporation package.
3. **Opening the tax files** (the accountant does everything):
   VAT (מע"מ) · Income Tax (מס הכנסה) · National Insurance (ביטוח לאומי) +
   withholding files (ניכויים) if there are ever salaries.
4. **Company bank account** at Mizrahi Ashkelon (branch appointment, Bruno KYC).
5. **Card-acquiring agreement (סליקה)**: through Mizrahi or directly with
   PayPlus / Grow / Cardcom → the API credentials go into the `paiement`
   module (one-line switch, already prepared in the code).
6. **Soft migration of the payment rails**: Stripe France (the French EURL)
   remains the active rail until the Israeli company starts collecting; then a
   progressive switch to the Israeli rail. Domains and provider accounts
   transferred to the Ltd's name.

## 4. What Bruno brings to the accountant (checklist)

- [ ] Israeli ID (תעודת זהות) + passport
- [ ] Registered-office address (lease or confirmation letter)
- [ ] This file (§2 answers all of the accountant's questions)
- [ ] Existing Mizrahi bank details (for reference)
- [ ] Budget: ~830 ₪ state fee + the firm's fees (ask for an incorporation + first-year package)

## 5. The tax goal — why the Articles are drafted "SaaS / high-tech"

The Articles (separate file) position the company as a **technology / SaaS
enterprise**, the entry ticket to Israel's preferred-tax regimes under the
Encouragement of Capital Investments Law:

| Regime | Corporate tax | Key conditions |
|---|---|---|
| **Preferred Technology Enterprise (PTE, מפעל טכנולוגי מועדף)** | **12 %** (instead of 23 %) · **7.5 %** in Development Zone A | R&D ≥ 7 % of revenue (3-year average) OR > 75 M₪ of R&D; AND one of: ≥ 20 % of staff in R&D, VC investment ≥ 8 M₪, growth ≥ 25 %/year |
| Preferred Enterprise (industrial, incl. software) | 16 % · 7.5 % Zone A | production/software, without the full R&D test |
| Dividends from PTE profits | 20 % withholding | — |
| R&D grants | Israel Innovation Authority (רשות החדשנות) | project file |

**Important truth:** the exemptions do NOT come from the Articles themselves —
the Articles open the door, but eligibility is proven by the real ACTIVITY and
the books: separate R&D cost tracking (target ≥ 7 % of revenue), IP owned by
the Ltd, qualifying SaaS/license revenue invoiced by the Ltd, documented R&D
headcount, and an annual application to the Tax Authority (optionally a
pre-ruling). Ashkelon's possible inclusion in Zone A (7.5 %) is being
legislated — the accountant must confirm on filing day.

**Question to ask the accountant, word for word:** "I am incorporating a
SaaS/R&D company — I want Preferred Technology Enterprise status (12 %, or
7.5 % if Zone A applies to my municipality): please validate the corporate
purpose in my Articles and set up R&D cost tracking at ≥ 7 % of revenue."

## 6. Meanwhile — nothing is blocked

- The current rail remains France (merchant = the French EURL); Stripe France
  is the correct Stripe today.
- PayPal Israel already exists in Bruno's name = possible backup rail.
- Sales can open for real today on the French rail, without waiting for the
  Israeli company.
