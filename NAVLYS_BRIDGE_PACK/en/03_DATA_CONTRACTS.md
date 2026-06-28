# Data contracts — the common language of the 3 modules

> For the three boats to sail together, they must speak the same language.

---

## Why this document

Each module (Goal, Revealed Margin, Scientific Martingale) has its own internal vocabulary. The unified dashboard needs a common dictionary. This dictionary is defined in strict TypeScript in `lib/navlysBridge.ts`.

---

## The three key objects

### NavlysObjectif

What the visitor wants to reach.

| Field | Type | Meaning as image |
|---|---|---|
| `type` | enum (8 values + custom) | Which lighthouse they aim at |
| `montantCible` | number (€) | Height of the lighthouse |
| `duree` | number (months) | Speed of the ship |
| `rendementPctAnnuel` | number (1-8 %) | Expected wind strength |

### NavlysFraisActuels

The state of the visitor's hull today.

| Field | Type | Meaning as image |
|---|---|---|
| `broker` | string (slug) | Current port of departure |
| `banque` | string (slug) | The dock where they moor |
| `tradesParMois` | number | How many outings to sea |
| `ticketMoyen` | number (€) | Average cargo size |
| `fraisBanqueMensuels` | number (€) | Cost of the dock each month |

### NavlysPlan

The final plan, composed from the two above.

| Field | Type | Meaning as image |
|---|---|---|
| `objectif` | NavlysObjectif | The set heading |
| `fraisActuels` | NavlysFraisActuels | The current hull |
| `economiesAnnuelles` | number (€) | Barnacles removed per year |
| `acceleration` | { moisGagnes, pctPlusVite } | Months saved on the route |
| `partitionForcter90Actif10` | { forteresse, jeuActif } | Fortress + sailboat |
| `margeProtectionMax` | number (€) | Safety net of the sailboat |
| `stratRecommandee` | enum (5 strategies) | Default recommended sail |
| `disclaimer` | string | Educational reminder |

---

## Golden rules

- **No `any`**: everything is typed.
- **Everything is named**: named exports, no default export on types.
- **Everything in €**: no mixed currencies.
- **The plan is immutable once composed**: if the visitor changes a parameter, we call `composerPlan()` again, we don't mutate.

---

## Flow

```
Port 1 + 2  →  NavlysObjectif object
Port 3      →  NavlysFraisActuels object
                       ↓
                composerPlan()
                       ↓
                 NavlysPlan
                       ↓
             Dashboard + Email + WhatsApp
```
