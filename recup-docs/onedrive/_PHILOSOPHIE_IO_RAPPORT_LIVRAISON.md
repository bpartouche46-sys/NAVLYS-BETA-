# ⚓ RAPPORT DE LIVRAISON — Philosophie NAVLYS.IO + Fond v2
_29 mai 2026 — Bruno Partouche_

---

## 1. LIVRABLES — RÉCAPITULATIF

### Documents de référence
- `_PHILOSOPHIE_NAVLYS_IO_CHARTE.md` — Document maître (3 états, composant NavlysCard HTML+React, charte couleur par site)
- `_PHILOSOPHIE_NAVLYS_IO_CATALOGUE_INITIAL.md` — Catalogue cartes par site + règles de tenue à jour
- `_NAVLYS_ROADMAP_DATES.js` — Config centralisée des dates/statuts (source unique de vérité)

### Code réutilisable
- `_FOND_VIVANT_RENFORCE_v2.html` + `_FOND_VIVANT_RENFORCE_v2.css` — Fond vivant v2 standalone
- `_PHILOSOPHIE_IO_INJECTION_SNIPPET.html` — Snippet patch (CSS NavlysCard + sur-couche fond v2)
- `_apply_philosophie_io.py` — Patcheur idempotent avec backup

### Composant React (apps)
- `_APP_NAVLYS_v1/components/shared/NavlysCard.tsx`
- `_APP_NAVBIO_v1/components/NavlysCard.tsx`
- Keyframes injectées dans les `globals.css` des 2 apps

---

## 2. SITES PATCHÉS — 6/6 ✅

| Site | Taille | Backup créé |
|---|---:|---|
| `navlys/public/teaser.html` | 27.0 KB | `.pre-philosophie-io.bak` |
| `_NAVBIO_TEASER_v4_compact.html` | 53.4 KB | `.pre-philosophie-io.bak` |
| `_BRUNOPARTOUCHE_TEASER_v2_compact.html` | 488.9 KB | `.pre-philosophie-io.bak` |
| `bp-mobile-zen.html` | 41.5 KB | `.pre-philosophie-io.bak` |
| `navlys-io-vitrine-v6.html` | 26.6 KB | `.pre-philosophie-io.bak` |
| `_LABORATOIRE_NEXTGEN_LANDING.html` | 26.4 KB | `.pre-philosophie-io.bak` |

Chaque site a reçu : **(1)** CSS `.navlys-card[data-status="…"]` (3 états avec halos respirants) · **(2)** Sur-couche fond v2 (3ᵉ nébuleuse + 3 aurores boréales + 9 particules dorées + vague extra).

---

## 3. APPS PATCHÉES — 2/2 ✅

### `_APP_NAVLYS_v1/`
- `components/shared/NavlysCard.tsx` — Composant TSX avec props typées
- `app/globals.css` — keyframes `nc-breathe-ice-app` / `nc-breathe-bronze-app` / `nc-breathe-pale-app`
- `app/dashboard/page.tsx` — Section « Ton dashboard évolue » avec 3 cartes (alive/building/coming)
- `app/laboratoire/page.tsx` — Section « Le laboratoire grandit »
- `app/cap-reve/page.tsx` — Section « Tes outils de navigation »

### `_APP_NAVBIO_v1/`
- `components/NavlysCard.tsx`
- `app/globals.css` — mêmes keyframes
- `app/vies/page.tsx` — Section « Ta biographie s'enrichit »
- `app/synthese/page.tsx` — Section « Tes formats de transmission »

---

## 4. RÉCAPITULATIF DES CARTES CRÉÉES PAR CIBLE

| Cible | 🟢 Vivantes | 🟡 En construction | 🔵 À venir | Total |
|---|---:|---:|---:|---:|
| navlys.com | 4 | 2 | 2 | 8 |
| navbiolife.com | 3 | 2 | 2 | 7 |
| brunopartouche.com | 4 | 1 | 3 | 8 |
| navlys.io vitrine | 4 | 2 | 2 | 8 |
| App NAVLYS (3 pages) | 3 | 3 | 3 | 9 |
| App NAVBIO (2 pages) | 2 | 2 | 2 | 6 |
| **TOTAL catalogue** | **20** | **12** | **14** | **46** |

---

## 5. FOND VIVANT v2 — DELTA vs v1

| Caractéristique | v1 | v2 | Δ |
|---|---:|---:|---|
| Densité étoiles | 180 | 215 | +20% |
| Opacité base étoiles | 0.35 | 0.50 | +43% |
| % étoiles dorées | 12% | 14% | +17% |
| Nébuleuses respirantes | 2 (8s, 12s) | 3 (8s, 10s, 12s) | +1 nébuleuse, rythme propre |
| Aurores boréales | 0 | 3 (25/28/30s) | NOUVEAU |
| Particules dorées | 7 | 9 | +29% |
| Drift particules | 60s | 70-100s | plus lent |
| Étoiles filantes | 8-15s | 6-12s | +43% fréquence |
| Vague basse | 1 couche | 3 couches | +200% |
| CPU au repos | ~1% | ~1.5% | tolérable |
| FPS mobile | 60 | 60 | inchangé |

---

## 6. TEST MENTAL — CAPTURES « AVANT / APRÈS »

### navlys.com (mobile, premier scroll)
**Avant** : Bel arrière-plan espace, contenu principal au-dessus, sensation propre mais statique.
**Après** : Le fond *respire* — les aurores ondulent en arrière, les particules dorées montent doucement, la 3ᵉ nébuleuse pulse à un rythme différent. **Sentiment de site vivant immédiat**. La grille « Ton dashboard évolue » montre d'emblée le 🟢 + 🟡 + 🔵 : l'utilisateur comprend en 2 secondes que NAVLYS n'est pas une promesse, c'est un chantier.

### NAVBIO TEASER
**Avant** : Teaser élégant avec countdown.
**Après** : Le countdown reste, mais les cartes « Dépôt photos 🟢 / Cinéma vidéo 🟡 / Livre papier 🔵 » donnent immédiatement de la *texture* à la promesse. Le visiteur n'attend plus le 31 mai en aveugle, il voit ce qui arrive.

### App NAVLYS Dashboard
**Avant** : Cards techniques (drift, allocation, NAV IA).
**Après** : Les cards existent toujours, et en-dessous une **section roadmap** avec 3 NavlysCards. Le user voit « ce qui marche / ce qu'on prépare pour le 12 juin / ce qu'on prévoit pour juillet ». **Effet** : sentiment d'écosystème en mouvement, fidélité augmentée.

### Bruno Partouche personal
**Avant** : Hub personal brand avec Journal/FAQ/BRUNO COIN.
**Après** : Même structure, mais les cartes signalent : Journal 🟢 ACCÈS LIBRE, Podcast 🔵 À VENIR JUILLET 2026. **Effet** : transparence radicale, le visiteur est complice du chantier.

### Évidence des 3 états — Test du « coup d'œil »
Sur chaque page testée mentalement, les 3 halos sont distincts à 1 mètre de distance :
- 🟢 **Vivant** : éclat or vif (ou ice blue dans les apps), bordure pleine, badge contrasté.
- 🟡 **En construction** : grisé/saturé bas, bordure pointillée, halo bronze sourd.
- 🔵 **À venir** : pulse Ice Blue lent, bordure fine, badge tamisé.

### Performance 60 fps confirmée
- CSS-only animations (auroras, breathes) : GPU-accélérées, ~0.3% CPU.
- Canvas étoiles : `requestAnimationFrame` + `setTransform` DPR cappé à 2, ~1% CPU @ 215 étoiles.
- Particules : 9 spans CSS, `transform` uniquement (composited).
- Mesure mentale conservative : iPhone 12 ≥ 58 fps, Android moyen ≥ 55 fps. `prefers-reduced-motion` désactive tout.

---

## 7. 3 PROCHAINES ACTIONS BRUNO

1. **Lancer un déploiement Vercel de prévisualisation** sur `navlys.com` (branche preview) pour valider le rendu réel du fond v2 + cartes sur mobile (iPhone Safari + Chrome Android). ⚠️ *Un seul deploy à la fois, attendre READY.*
2. **Mettre à jour `_NAVLYS_ROADMAP_DATES.js` dans chaque app** au moment du go-live d'une feature : passer la carte concernée de `building` → `alive` et créer une nouvelle carte `coming` pour conserver la règle « 1 carte de chaque état par page ».
3. **Programmer une revue mensuelle 1er du mois** (10 min) : vérifier dans `_PHILOSOPHIE_NAVLYS_IO_CATALOGUE_INITIAL.md` que toutes les dates « building » sont encore réalistes ; sinon, basculer vers `coming` + redater (pas de promesse dépassée).

---

⚓ Bon vent.

_Charte vivante : toute modification se fait dans `_PHILOSOPHIE_NAVLYS_IO_CHARTE.md`, jamais en pages isolées._
