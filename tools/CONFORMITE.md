# Filet automatique de conformité NAVLYS

Objectif : **quasi-zéro erreur** en production, non par vigilance mais par un
garde-fou *automatique* qui relit chaque changement avant qu'il parte (doctrine
« on teste avant de pousser »).

## Ce qui tourne à chaque PR vers `main` (`.github/workflows/ci.yml`)

1. `node --check` sur tout le JS de `live-source/` + `tools/*.mjs` (syntaxe).
2. Auto-test du moteur i18n (15 langues) — `tools/i18n-selftest.mjs`.
3. Cohérence des dictionnaires i18n (régénération sans dérive).
4. **Conformité doctrinale** — `tools/conformite-check.mjs` (nouveau).

Tant que la CI n'est pas verte, `auto-merge` ne fusionne pas → rien ne part en prod.

## Contrôle de conformité — `tools/conformite-check.mjs`

Balaie tout `live-source/` et applique les **règles gravées** :

| Règle | Ce qu'elle bloque |
|-------|-------------------|
| `charte-cyan` | `#5fe0ff` (utiliser l'ice blue `#7DD3FC`) |
| `charte-violet` | couleurs violet/fuchsia interdites |
| `geo-jerusalem` / `geo-israel` / `geo-ashkelon` | références géo interdites en public (dépersonnalisation) |
| `banque-mizrahi` | banque nommée en public (PII/entité) |
| `nova-residuel` | nommage résiduel « NOVA » |
| `date-lancement` | date de lancement ≠ **1er août 2026 / 2026-08-01** |

### Baseline ratchet

La dette déjà présente est figée dans `tools/conformite-baseline.json`. La CI
passe au **vert** sur cette dette connue mais **bloque toute NOUVELLE violation**.
On ne régresse jamais ; on résorbe la dette au fil de l'eau (chaque correction
= une ligne de moins dans la baseline).

```bash
node tools/conformite-check.mjs                    # contrôle (exit 1 si nouvelle violation)
node tools/conformite-check.mjs --list             # toutes les violations (dette incluse)
node tools/conformite-check.mjs --update-baseline  # fige l'état courant comme dette acceptée
```

> ⚠️ `--update-baseline` ne s'utilise que pour une violation **légitime** (rare) ;
> le réflexe par défaut est de **corriger**, pas d'élargir la baseline.

## Dette connue à résorber (au 2026-07-16)

45 violations réelles enregistrées. Priorités **critiques** (exposition publique) :

- 🔴 `mer.html` : timezone `Asia/Jerusalem` en dur.
- 🔴 Dictionnaires i18n (`navlys-i18n*.js`, plusieurs langues) : texte public
  « Société israélienne … banque Mizrahi à Ashkelon », bio « basé en Israël »,
  « Césarée, Israël ». → **caviardage prioritaire** (source : `tools/i18n-src/`).
- 🟠 `catamaran.html`, `rapport-amel-maramu-1989.html` : « Israël » en clair.
- 🟠 `next-gen-beta.html` : `#5fe0ff` (×3).
- 🟠 Dates de lancement « 1er juillet » → à passer en **1er août 2026** (tâche countdown).
