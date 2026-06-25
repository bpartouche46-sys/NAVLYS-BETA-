# Kit logo animé — intégration (1 minute)

## Mise en place
1. Copier `navlys-coin.js` + le PNG détouré (`assets/navlys_coin_cut.png` ou `bp_coin_cut.png`) sur le site.
2. Ajouter la balise + le script :

```html
<div data-navlys-coin data-src="assets/navlys_coin_cut.png" data-ratio="1.065"></div>
<script src="navlys-coin.js" defer></script>
```

C'est tout. Le composant injecte son propre CSS, construit la pièce 3D (faces + tranche cannelée), le halo et les reflets.

## Options (attributs `data-`)
| Attribut | Défaut | Rôle |
|---|---|---|
| `data-src` | — | PNG détouré de la pièce (requis) |
| `data-mode` | `bank` | `bank` (cinématique) ou `spin` (360°) |
| `data-size` | `220` | largeur en px |
| `data-ratio` | `1` | hauteur/largeur (**NAVLYS = 1.065**, BP = 1) |
| `data-thickness` | `14` | épaisseur de la tranche |
| `data-reeds` | `72` | nombre de stries |
| `data-halo` | `true` | halo ICE BLUE |
| `data-sweep` | `true` | balayage doré + reflet |
| `data-speed` | bank 9 / spin 12 | secondes par cycle |

## Exemples
```html
<!-- NAVLYS header, cinématique -->
<div data-navlys-coin data-src="navlys_coin_cut.png" data-ratio="1.065" data-size="180"></div>

<!-- NAVLYS teaser, tour 360° -->
<div data-navlys-coin data-src="navlys_coin_cut.png" data-ratio="1.065" data-mode="spin" data-size="320"></div>

<!-- Bruno Partouche, médaille -->
<div data-navlys-coin data-src="bp_coin_cut.png" data-mode="bank" data-size="200"></div>
```

Voir `demo.html` pour les trois côte à côte. Compatible Chrome/Edge/Safari/Firefox récents. Respecte `prefers-reduced-motion`.

---
*Généré par l'assistant — à relire avant diffusion.*
