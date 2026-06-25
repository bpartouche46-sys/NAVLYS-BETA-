# Référence canonique — BRUNO COIN

## Statut au 28 mai 2026

**BRUNO COIN V2 — VALIDÉ DÉFINITIVEMENT.** Bruno Mark Partouche a confirmé le 28 mai 2026 que la V2 est sa signature officielle pour toutes ses créations futures : sites, applications, contenus, réseaux sociaux, kit presse.

Citation Bruno (28/05/2026) :
> « Attention sur le logo animé double face Bruno Mark Partouche les deux faces doivent avoir des reflets ou scintillement en tournant et les deux faces doivent avoir la même structure et fait une épaisseur très légèrement supérieure. Sinon c'est parfait vraiment. Met à jour sans me demander sur les sites et applications et réseaux sociaux directement. Il est validé et retenu sur sa prochaine création. »

---

## Trois spécifications V2 (par rapport à V1)

### 1. Scintillement / reflets sur LES DEUX faces
- Bande shimmer diagonale (`linear-gradient 115deg, transparent 30% → or pâle 50% → transparent 70%`) animée en `nv-shimmer 4.5s ease-in-out`
- 4 micro-reflets pulsants (`radial-gradient` dorés positionnés à 28/22, 72/38, 45/78, 82/70) animés en `nv-sparkles 3.2s alternate`
- Sweep doré masqué sur l'image (V1 conservé) maintenant appliqué sur **front ET back** (V1 ne le mettait que sur la front)

### 2. Structure parfaitement harmonisée entre face A et face B
- Mêmes dimensions (cercle parfait, `border-radius:50%`)
- Mêmes box-shadows (extérieur bronze + intérieur ombre + filet or `inset 0 0 0 1.5px rgba(201,169,97,.75)`)
- Mêmes 4 couches superposées (disque base + gradient métal `::before` + image + filet bordure `::after` + shimmer + sparkles + sweep)
- Mêmes z-index et mêmes mix-blend-mode

### 3. Épaisseur 3D légèrement supérieure
- V1 : `translateZ(7px)`, épaisseur tranche 14 px
- **V2 : `translateZ(10px)`, épaisseur tranche 20 px**
- 84 stries (vs 72) pour fluidité de la tranche
- Tranche bombée : `linear-gradient(180deg, #B87333 0%, #C9A961 50%, #B87333 100%)` + `box-shadow inset 0 -2px 4px rgba(0,0,0,0.3)`

---

## Palette officielle (Crépuscule Bronze)

| Couleur | Hex | Usage |
|---|---|---|
| Bronze | `#B87333` | tranche, ombre projetée |
| Or | `#C9A961` | filet bordure, halo |
| Bronze clair | `#D49B5B` | halo secondaire |
| Or pâle | `#F3E4C4` | reflets / shimmer / sparkles |
| Noir nuit | `#02040a` | fond ambient |

**Règle stricte pour brunopartouche.com** : palette Crépuscule Bronze uniquement, **pas d'Ice Blue** sur le coin. L'Ice Blue (#7DD3FC) reste réservé à NAVLYS (via `data-palette="ice"`).

---

## Animations

- Rotation : `coin-spin 10s ease-in-out infinite` (V1 = 16s, asymétrique 40-50-90-100 — abandonné en V2)
- Shimmer : `coin-shimmer 4.5s ease-in-out infinite`
- Sparkle : `coin-sparkle 3.2s ease-in-out infinite alternate`
- Halo : `nv-halo 3.6s ease-in-out infinite`
- Pause au survol : `animation-play-state: paused`
- `prefers-reduced-motion` : animations off, halo doux conservé (opacité 0.6)

---

## Fichiers de référence

```
_SITES_MASTER/
├── _BRUNO_COIN_V2_FICHE_OFFICIELLE.md       ← fiche signature officielle
├── _BRUNO_COIN_3D_v2.html                   ← composant standalone V2
├── _BRUNO_COIN_DEMO.html                    ← page démo V2
├── _BRUNO_COIN_v2_KIT_RESEAUX.md            ← kit réseaux sociaux
├── _KIT_RESEAUX_V2/                         ← visuels exportables
│   ├── coin_v2_square_1080.html            (Insta / LinkedIn carrousel)
│   ├── coin_v2_linkedin_1200x675.html      (LinkedIn paysage)
│   ├── coin_v2_x_1600x900.html             (X / Twitter)
│   ├── coin_v2_story_1080x1920.html        (Story / Reel)
│   └── coin_v2_profile_400x400.svg         (avatar carré statique)
├── bp-mobile-zen.html                       ← prod mobile (V2 inline)
└── brunopartouche.com/
    ├── index.html                           ← prod web (composant data-coin)
    └── assets/coin-anim.js                  ← composant universel V2
```

Tous backups conservés en `.pre-coin-v2.bak` pour rollback éventuel.

---

## Historique

| Date | Événement |
|---|---|
| mars 2026 | Création V1 (2 faces image, rotation 16s asymétrique, épaisseur 14 px, Ice Blue dans halo) |
| 25 mai 2026 | Migration palette Crépuscule Bronze sur brunopartouche.com (.pre-crepuscule.bak) |
| **28 mai 2026** | **Validation V2 par Bruno : reflets 2 faces · structure harmonisée · épaisseur 20 px · palette stricte Crépuscule Bronze · variantes S/M/L · propagée par Cowork en autonomie** |

---

*Cette mémoire est mise à jour à chaque modification du Coin. Toute évolution doit être validée par Bruno avant propagation.*
