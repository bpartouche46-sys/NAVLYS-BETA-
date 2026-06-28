# NAVLYS — Palette & Composants UI (Cockpit)

> Bilingue FR / EN. Référence stricte des couleurs, typographies et briques UI du cockpit.

---

## 1. Palette stricte / Strict palette

| Rôle / Role | Nom / Name | Hex | Usage |
|---|---|---|---|
| Accent chaud / Warm accent | **BRONZE** | `#B87333` | pièce, CTA, signature, voiles repères |
| Cuivre clair / Light copper | **CUIVRE** | `#D49B5B` | survols, poignées de winch, lisérés |
| Accent froid / Cold accent | **ICE BLUE** | `#7DD3FC` | titres, halos, cap, hausse, courbe |
| Fond profond / Deep ground | **NOIR** | `#000000` | fond scène, splash |
| Nuit bleue / Blue night | **NUIT** | `#0B1220` | panneaux, fonds secondaires |
| Texte / Body | **GRIS PERLE** | `#E5E7EB` | corps de texte sur fond noir |
| Texte atténué / Dim | **PERLE DIM** | `#9aa6b6` | légendes, sous-titres |
| Bois / Wood | **BOIS** | `#3a2515` → `#1c0f06` | boiseries du cockpit (dégradé) |
| Baisse / Down (rare) | **CORAIL** | `#e07a5f` | uniquement la zone « baisse » du cadran |

**Triade de base :** BRONZE chaud × ICE BLUE froid × NOIR profond.
Le corail n'est **jamais** une couleur de marque : il ne sert qu'à signaler la baisse sur le cadran météo.

### Contrastes (WCAG)
- ICE BLUE sur NOIR → 11.8:1 ✅
- BRONZE sur NOIR → 4.8:1 ✅ (AA grand texte)
- GRIS PERLE sur NOIR → 18:1 ✅

---

## 2. Typographies / Typography

| Famille / Family | Usage | Repli / Fallback (offline) |
|---|---|---|
| **Cormorant Garamond** | mot-marque, titres, instruments | `"Georgia", serif` |
| **Fraunces** | gros titres hero (web) | `"Georgia", serif` |
| **Inter / Manrope** | UI, corps, chiffres | `system-ui, -apple-system, "Segoe UI", Roboto, Arial` |

Le prototype n'embarque **aucune police externe** (fonctionne hors-ligne) : il utilise les familles serif/sans installées, avec repli système. Les chiffres utilisent `font-variant-numeric: tabular-nums`.

Règle intouchable : le mot **NAVLYS** s'écrit toujours en capitales, jamais déformé.

---

## 3. Variables CSS de référence

```css
:root{
  --bronze:#B87333; --cuivre:#D49B5B; --ice:#7DD3FC;
  --noir:#000000;   --nuit:#0B1220;   --perle:#E5E7EB; --dim:#9aa6b6;
  --bois:#3a2515;   --bois2:#1c0f06;  --corail:#e07a5f;
  --rfont:"Cormorant Garamond","Georgia",serif;
  --ufont:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
}
```

---

## 4. Composants UI / UI components

| Composant | Description | États |
|---|---|---|
| **Coin** | pièce bronze ronde, halo ICE, rotation 8 s | statique / animée |
| **Stage 360** | scène 2 faces `rotateY`, perspective | avant / arrière |
| **Mast + sail** | mât bronze + voiles `scaleX` | plein / faseyant |
| **Flettner** | cylindre rayé sous `clipPath`, défilement | tournant (boucle) |
| **Winch slider** | curseur bronze, molette crantée, poignée 26–30 px | repos / focus / drag |
| **Voilure segment** | 3 boutons (prudent/équilibré/agressif) | on / off |
| **Compass card** | carte sombre + médaillon + texte cap du jour | mise à jour live |
| **Météo dial** | arc 3 zones + aiguille bronze oscillante | −1 … +1 |
| **Route compass** | compas rond, aiguille ICE fixe | constante |
| **Coffre card** | bloc capital (Forteresse / Actif), € + % | live |
| **Equity line** | polyline ICE sur le sillage | croît avec l'historique |
| **Lang toggle** | bascule FR/EN pilule | fr / en |
| **Disclaimer bar** | pied permanent, encadré discret | toujours visible |

---

## 5. Espacements & rayons / Spacing & radii

- Rayons : panneaux `16px`, cartes `12–14px`, scène `18px`, pilules `999px`.
- Ombres : `0 18px 50px rgba(0,0,0,.55)` + lueur interne `inset 0 0 90px rgba(0,0,0,.6)`.
- Cibles tactiles : ≥ 44 px. Curseurs ≥ 26 px de poignée.
- Grille cluster : 2 colonnes desktop, 1 colonne mobile.

---

## 6. Mouvement / Motion

| Animation | Durée | Easing |
|---|---|---|
| Rotation pièce / coin | 8 s | linéaire |
| Virement 360° / come about | 1.0–1.2 s | `cubic-bezier(.6,.02,.2,1)` |
| Réglage voiles / sails | 0.8 s | `cubic-bezier(.5,.05,.2,1)` |
| Aiguille météo / needle | 0.8 s | `cubic-bezier(.5,.05,.2,1)` |
| Rotor Flettner | boucle continue | linéaire |
| Stries de vent / wind | 2.5–4.5 s | linéaire |

Principe : **rien ne clignote, rien ne crie.** Mouvement marin, lent, respirant.
