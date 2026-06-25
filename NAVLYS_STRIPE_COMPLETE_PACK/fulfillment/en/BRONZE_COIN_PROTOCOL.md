# NAVLYS — Bronze coin fulfillment protocol

> Internal document. Not to be published.

## Goal

Ensure an annual NAVLYS subscriber receives **by mail** a real NAVLYS bronze coin, hand-struck, in numbered series, within 3 to 5 weeks of payment, with UPS tracking.

## Full cycle (d+0 → d+45)

| Day | Step | Owner | System |
|-----|------|-------|--------|
| d+0  | Annual payment captured | Stripe | webhook `invoice.paid` |
| d+0  | Coin order generated | NAVLYS (auto) | `coinOrderFulfillment.ts` |
| d+0  | "Coin scheduled" email | NAVLYS (auto) | `coinShipped.ts` stage=scheduled |
| d+1  | Bruno validates order in back-office | Bruno | internal dashboard |
| d+2  | Order pushed to mint workshop | NAVLYS | email `fulfillment@navlys.com` |
| d+3 → d+18 | Numbered series struck | Workshop | external |
| d+19 | Reception + QC (visual, weight 12 g ±0.2) | Bruno | external |
| d+20 | Velvet box + signed card | Bruno | external |
| d+21 | UPS drop-off (tracking mandatory, declared value 50 €) | Bruno | UPS |
| d+22 | "Coin shipped" email + tracking | NAVLYS (auto) | `coinShipped.ts` stage=shipped |
| d+25 → d+45 | Delivery | UPS | external |
| d+45 | Delivery check + unboxing photo nudge | NAVLYS (auto) | follow-up |

## Workshop candidates (Bruno arbitrates)

### Option A — French workshop
- **Atelier de la Frappe (Paris)** — small custom runs 50–500 pieces, ~9 € net/piece in CuSn8, 3-week lead time.
- Pro: made-in-France narrative.
- Con: tight timing if > 30 pieces/week.

### Option B — Belgian workshop
- **Royal Belgian Mint Custom** — accepts orders < 1000, ~7.50 € net/piece.
- Pro: excellent value.
- Con: weaker narrative.

### Option C — Italian workshop (Milan)
- ~8.50 € net/piece, laser-engraved serial on reverse.
- Pro: premium finish.
- Con: logistics back to FR.

**NAVLYS recommendation**: start with Option A for the first 100 pieces (brand consistency), shift to Option B above that.

## Packaging

- **Box**: navy velvet 50×50×15 mm, magnetic closure. Supplier Packhelp or Tetra Custom Boxes. ~7-8 € net.
- **Signed card**: 350 g/m² card stock, 80×120 mm, NAVLYS gold foil obverse, hand-calligraphed serial number on the back by Bruno.
- **Shipping box**: reinforced corrugated, 130×130×40 mm, UPS label.

## Target unit cost

| Item | Cost (net) |
|------|-----------|
| Coin strike (Option A) | 9.00 € |
| Velvet box | 7.50 € |
| Card + print | 1.20 € |
| Cardboard shipping | 0.80 € |
| UPS EU tracked | 9.50 € |
| UPS US/CA tracked | 18.00 € |
| **EU average total** | **~28 €** |
| **US average total** | **~37 €** |

On a 490 € annual sub (Stripe net ~483 €), coin cost stays **< 8% of annual revenue**.

## Storage

- **Struck-coin stock**: Bruno's home safe, monthly inventory in `inventaire_pieces_bronze.csv`.
- **Packaging stock**: sealed carton labeled "NAVLYS-BRONZE-PACK".

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Invalid/incomplete address | Address field required in Checkout (`shipping_address_collection`). |
| Lost in UPS transit | Declared value 50 €, UPS compensation, free re-strike. |
| Member refunds within 14 days after receiving coin | Coin not recoverable, accept as acquisition cost. |
| Workshop out of stock | Minimum buffer of 30 blank pieces ahead. |
| Volume spike (> 50 orders/week) | Switch to Option B, warn members "delivery extended to 5 weeks". |

## Workshop contact

```
fulfillment@navlys.com  → dedicated mailbox
Bruno (owner): bpartouche46@gmail.com
```

---

*"The NAVLYS bronze coin is your first anchor. Small, heavy, immovable."*
