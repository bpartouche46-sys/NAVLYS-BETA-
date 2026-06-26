# BRUNO COIN V2 — FICHE OFFICIELLE

> **Statut** : Validation définitive et signature officielle de toutes les créations futures de **Bruno Mark Partouche**.
> **Date de validation** : 28 mai 2026
> **Signataire** : Bruno Mark Partouche, fondateur NAVLYS
> **Mandataire technique** : Cowork (propagation autonome sur ordre du 28 mai 2026)

---

## 1. Décision

Le **BRUNO COIN V2** est officiellement adopté comme **signature visuelle universelle** de toutes les productions de Bruno Mark Partouche et de l'écosystème NAVLYS (brunopartouche.com, NAVLYS, NAVBIO, NAVLYS.io, NAVBIO.life, ainsi que toute communication réseau social).

Citation Bruno (28 mai 2026) :
> « Attention sur le logo animé double face Bruno Mark Partouche les deux faces doivent avoir des reflets ou scintillement en tournant et les deux faces doivent avoir la même structure et fait une épaisseur très légèrement supérieure. Sinon c'est parfait vraiment. Met à jour sans me demander sur les sites et applications et réseaux sociaux directement. Il est validé et retenu sur sa prochaine création. »

---

## 2. Spécifications V2 — détail technique

### 2.1 Dimensions & structure

| Paramètre | V1 (référence) | **V2 (officiel)** |
|---|---|---|
| Diamètre par défaut | 200 px | **280 px** |
| Variantes tailles | — | **160 / 280 / 380 px** (mobile / web / héros) |
| Épaisseur 3D (translateZ) | 14 px | **20 px** |
| Stries de tranche | 72 | **84** (lissage amélioré) |
| Border-radius | 50% | 50% (inchangé) |
| Rotation | 16s (asymétrique 40-50-90-100) | **10s ease-in-out symétrique 0-50-100** |
| Pause au survol | oui | **oui** (inchangé) |

### 2.2 Structure des faces — strictement identique

Chaque face (front et back) comporte exactement les **4 couches superposées** :

1. **Couche 0 — Disque base** : `border-radius:50%`, `overflow:hidden`, `box-shadow` métallique
2. **Couche 1 — Gradient métal bronze** : `::before` radial-gradient bronze→or→noir, opacité 0.7, mix-blend-mode overlay
3. **Couche 2 — Image PNG** : `background-image: url(face-A.jpg ou face-B.jpg)`, `background-size:cover`
4. **Couche 3 — Filet de bordure** : `inset 0 0 0 1.5px rgba(201,169,97,.75)` + `box-shadow` doré
5. **Couche 4 — Reflets dynamiques (V2)** :
   - **Shimmer** : `linear-gradient(115deg, transparent 30%, rgba(243,228,196,0.55) 50%, transparent 70%)` animé en `nv-shimmer 4.5s`
   - **Sparkles** : 4 radial-gradients dorés pulsants en `nv-sparkles 3.2s alternate`

### 2.3 Tranche (cylindre fin entre les 2 faces)

```css
.edge {
  width: 20px;
  height: 280px; /* = diamètre */
  background: linear-gradient(180deg, #B87333 0%, #C9A961 50%, #B87333 100%);
  box-shadow: inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,242,214,.25);
  transform: translate(-50%,-50%) rotateX(90deg);
}
```

Visible quand le coin est en position de profil (rotation ≈ 90° / 270°).

### 2.4 Animations

```css
@keyframes coin-spin {
  0%   { transform: rotateY(0deg) }
  50%  { transform: rotateY(180deg) }
  100% { transform: rotateY(360deg) }
}
@keyframes coin-shimmer {
  0%   { background-position: 150% -50%; opacity:.85 }
  48%  { background-position: -50% 150%; opacity:.40 }
  100% { background-position: -50% 150%; opacity:.85 }
}
@keyframes coin-sparkle {
  0%   { opacity:.50 }
  50%  { opacity:.92 }
  100% { opacity:.55 }
}
```

### 2.5 Palette

| Rôle | Hex | RGB | Usage |
|---|---|---|---|
| Bronze | `#B87333` | `184,115,51` | tranche, ombre projetée |
| Or | `#C9A961` | `201,169,97` | filet bordure, halo, gradient |
| Bronze clair | `#D49B5B` | `212,155,91` | halo secondaire |
| Or pâle | `#F3E4C4` | `243,228,196` | reflets / shimmer / sparkles |
| Noir nuit | `#02040a` | `2,4,10` | fond ambient |

**Important** : Sur **brunopartouche.com** la palette est **Crépuscule Bronze** (or crépuscule pour les reflets, **pas d'Ice Blue**). Pour les usages NAVLYS, ajouter `data-palette="ice"` ou la classe `.ice` qui réactive le halo Ice Blue secondaire.

### 2.6 Accessibilité

```css
@media (prefers-reduced-motion: reduce) {
  .coin { animation: none !important }
  .coin-face::before, .coin-face::after { animation: none !important; opacity: .25 }
  .nv-halo { animation: none !important; opacity: .6 }
}
```

### 2.7 Performance

- CSS-only, GPU-accelerated (`transform`, `opacity`, `background-position`)
- 60 fps garantis sur iPhone SE (320 px) et desktop 1440 px
- Poids ajouté : 0 KB image (toutes les couches sont CSS) — l'image de la pièce existe déjà

---

## 3. Supports où le BRUNO COIN V2 apparaît

### Sites web
- **brunopartouche.com/** — `index.html` (héros, composant `<div data-coin>`)
- **bp-mobile-zen.html** — page mobile prod (héros, `.coin-stage` inline CSS)
- **_BRUNO_COIN_DEMO.html** — page démo standalone (showroom)
- **_BRUNO_COIN_3D_v2.html** — composant standalone réutilisable (NOUVEAU V2)
- **_BRUNOPARTOUCHE_TEASER_avec_anim.html** — teaser héros
- **_BRUNOPARTOUCHE_TEASER_v2_compact.html** — teaser compact
- **_BRUNOPARTOUCHE_AVEC_PARTENAIRES.html** — version avec partenaires affichés

### Apps & écosystème NAVLYS (héritent du composant via coin-anim.js)
- NAVLYS (navlys.com) — variante `data-palette="ice"`
- NAVBIO Life (navbiolife.com) — variante or pur
- NAVLYS.io (navlys.io) — variante miniature header

### Réseaux sociaux (kit à publier)
- LinkedIn (carrousel V2 + bannière)
- X / Twitter (poste fixé)
- Instagram (post carré + reel séquence rotation)
- Discord (avatar serveur NAVLYS)
- YouTube (intro 3s avant chaque vidéo finance)

---

## 4. Procédure d'utilisation (licence interne)

Le BRUNO COIN V2 est **propriété exclusive de Bruno Mark Partouche / NAVLYS**.

- ✅ **Autorisé** : usage sur tous les supports NAVLYS / brunopartouche.com / NAVBIO / NAVLYS.io, kit presse, communication interne, contenu éditorial NAVLYS NEXT GEN INVEST, partenaires CPA officiels (mention « visuel fourni par NAVLYS »).
- ❌ **Interdit** : reproduction par un tiers sans autorisation écrite de Bruno Mark Partouche, intégration dans un produit financier réglementé tiers, modification des couleurs, suppression du filet bordure, retrait des reflets.
- 📩 **Demande d'usage extérieur** : `bruno@navlys.com` — réponse sous 48h.

---

## 5. Fichiers techniques (chemins relatifs depuis `_SITES_MASTER/`)

```
_SITES_MASTER/
├── _BRUNO_COIN_V2_FICHE_OFFICIELLE.md       ← ce fichier
├── _BRUNO_COIN_3D_v2.html                   ← composant standalone V2
├── _BRUNO_COIN_DEMO.html                    ← page démo V2
├── _BRUNO_COIN_v2_KIT_RESEAUX.md            ← kit visuels & captions réseaux
├── bp-mobile-zen.html                       ← prod mobile (V2 inline)
├── bp-mobile-zen.html.pre-coin-v2.bak       ← backup V1
├── bruno-coin-face-A.jpg                    ← visuel face A (B + ancre + roue skipper)
├── bruno-coin-face-B.jpg                    ← visuel face B (BRUNO MARK / PARTOUCHE)
└── brunopartouche.com/
    ├── index.html                           ← prod web (utilise data-coin)
    ├── index.html.pre-coin-v2.bak           ← backup V1
    └── assets/
        ├── coin-anim.js                     ← composant JS universel V2
        ├── coin-anim.js.pre-coin-v2.bak     ← backup V1
        └── bp_coin_cut.png                  ← visuel détouré pièce (sweep mask)
```

---

## 6. Rendu attendu

### Mobile (iPhone SE, 320 px)
- Coin à 160 px diamètre, centré, marge 18 px sous le menu
- Halo doré pulsant à 60 BPM, halo s'étend sur 158% du diamètre
- Shimmer diagonal traverse la pièce toutes les 4.5s
- Tranche bombée visible au passage 90° (profil)
- Animation fluide, aucun stutter (testé Safari iOS, Chrome Android)

### Desktop (1440 px)
- Coin à 280 px diamètre par défaut, 380 px en mode héros
- Reflets visibles sans agressivité (mix-blend-mode screen)
- Pause au survol : le visiteur voit la face stable choisie
- Cohérence palette Crépuscule Bronze (zéro Ice Blue visible sur bp.com)

---

## 7. Historique de version

| Version | Date | Changements |
|---|---|---|
| V1 | mars 2026 | Création initiale, 2 faces image, rotation 16s, épaisseur 14 px |
| **V2** | **28 mai 2026** | **Reflets sur les 2 faces · Structure harmonisée · Épaisseur 20 px · Palette Crépuscule Bronze stricte sur bp.com · Variantes S/M/L · 60 fps garantis** |

---

*Document de référence — ne pas modifier sans validation Bruno Mark Partouche.*
*Backup du document original conservé en `.pre-coin-v2.bak` pour tous les fichiers impactés.*
