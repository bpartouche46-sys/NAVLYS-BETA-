# NAVLYS — COCKPIT PACK · Synthèse / Synthesis

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> *"One heading, one hand, one day. NAVLYS guides you to your goal in a single move."*

> ⚓ **MASTERNAV — coordination 7 juin 2026 (J+7, phase BETA)** · département **07 R&D App / cockpit 2.0**. Ce pack alimente le brief d'intégration PWA (`briefs/.../BRIEF_DEV_INTEGRATION.md`) et reste compatible avec les règles gravées DISPATCH (NAVLYS dépersonnalisé, ni conseil ni placement, gate respecté, données démo, disclaimer en pied). Il NE remplace PAS `NAVLYS_PORTAL_APP/` (portail capitaine BETA) — il prépare la **home membre** post-15 juin.


---

## 🇫🇷 En une minute

Ce pack contient le **prototype interactif** du cockpit NAVLYS : le poste de barre virtuel d'un **ketch deux mâts**, vu à 360°. C'est la traduction visuelle de la méthode NAVLYS — *le vent du marché change, ton cap ne bouge pas.*

**La pièce maîtresse** : `prototype/cockpit.html`. Tu l'ouvres en double-clic, sans rien installer.

- **Devant** (vue AVANT) = ton **cap** : l'étoile-objectif, le grand mât et ses grandes voiles (**90 % — La Forteresse**, ~5 %/an, stable), le rotor Flettner qui veille, la météo du grand vent.
- **Derrière** (vue ARRIÈRE) = ton **sillage** : la trace d'écume et ta courbe de résultats, l'artimon et ses petites voiles (**10 % — Le Jeu Actif**).
- **Tu pivotes à 360°** d'un bouton (« Virer de bord ») ou d'un glissement de doigt.
- **Trois winchs à portée de main** : Allocation (90/10), Réaffectation des plus-values (50 %), Voilure du jour (prudent / équilibré / agressif). Tout est **vivant** : un winch bouge, les chiffres se recalculent.

Le tout en **bronze / ice blue / noir**, langage marin simple, **disclaimer** permanent, **données de démonstration** uniquement (aucun marché réel, aucun chiffre d'algorithme).

---

## 🇬🇧 In one minute

This pack holds the **interactive prototype** of the NAVLYS cockpit: the virtual helm of a **two-masted ketch**, seen in 360°. It is the visual translation of the NAVLYS method — *the market wind changes, your heading does not.*

**The centrepiece**: `prototype/cockpit.html`. Open it with a double-click, nothing to install.

- **Ahead** (FORWARD view) = your **heading**: the goal-star, the main mast with its large sails (**90% — The Fortress**, ~5%/yr, stable), the watching Flettner rotor, the great-wind weather.
- **Behind** (AFT view) = your **wake**: the foam trail and your results curve, the mizzen with its small sails (**10% — The Active Play**).
- **Spin a full 360°** with a button ("Come about") or a finger swipe.
- **Three winches within reach**: Allocation (90/10), Profit reallocation (50%), Sail trim of the day (cautious / balanced / aggressive). Everything is **live**: move a winch, the numbers recompute.

All in **bronze / ice blue / black**, plain nautical language, permanent **disclaimer**, **demo data** only (no real market, no algorithm number).

---

## 📁 Contenu du pack / Pack contents

```
NAVLYS_COCKPIT_PACK/
  prototype/
    cockpit.html              ← PROTOTYPE PRINCIPAL (desktop + mobile)
    cockpit_mobile.html       ← version portrait téléphone
    README_PROTOTYPE.md       ← comment ouvrir / tester (FR + EN)
  design_system/
    fr/SPEC_COCKPIT.md · en/SPEC_COCKPIT.md
    fr/CORRESPONDANCES_SYMBOLIQUES.md · en/SYMBOLIC_MAPPING.md
    palette_et_composants.md
  assets_svg/
    ketch_profil.svg · cockpit_360_avant.svg · cockpit_360_arriere.svg
    winch_control.svg · flettner_rotor.svg · meteo_navlys.svg · boussole_compas.svg
  briefs/
    fr/BRIEF_3D_THREEJS.md · en/BRIEF_3D_THREEJS.md
    fr/BRIEF_DEV_INTEGRATION.md · en/BRIEF_DEV_INTEGRATION.md
  components/
    types.ts · Cockpit.tsx · MastControl.tsx · WinchSlider.tsx
    MeteoNavlys.tsx · CapDuJourInstrument.tsx
  SYNTHESE.md
```

---

## ✅ Qualité / Quality

- Prototype **100 % autonome**, vérifié : balises HTML équilibrées, JS sans erreur de syntaxe, SVG bien formés.
- Composants React en **TypeScript strict** : `tsc --noEmit` passe sans erreur (strict, noUnusedLocals, noUnusedParameters, noImplicitReturns).
- **Miroirs FR ↔ EN** pour specs et briefs.
- **Palette stricte** : BRONZE `#B87333` · ICE BLUE `#7DD3FC` · NOIR `#000` · cuivre `#D49B5B`.

## ▶️ Prochaines étapes / Next steps

1. Ouvre `prototype/cockpit.html`, joue avec les winchs et le virement 360°.
2. Version **3D immersive** (Three.js) → `briefs/.../BRIEF_3D_THREEJS.md`.
3. **Écran d'accueil** de l'app membre (PWA) → `briefs/.../BRIEF_DEV_INTEGRATION.md`.

## ⚠️ Disclaimer

NAVLYS partage des informations générales et pédagogiques. Ce n'est pas un conseil financier personnalisé. Tu décides tout, tu gères tout. Pour une décision importante, parle à un professionnel certifié.

*NAVLYS shares general, educational information. This is not personalised financial advice. You decide everything, you manage everything. For any important decision, talk to a certified professional.*

---

## 🆕 v2

Logo final **pièce bronze + étoile polaire 8 branches + horizon + halo ICE BLUE + NAVLYS gravé** (Brand Bible v2, aligné avec la médaille bronze stable en production sur `brunopartouche-teaser.vercel.app`) intégré comme marque haut et instrument central, avec rotation 3D `rotateY` 9 s sur la petite pièce · scène **plus vivante** (gîte du bateau, étoile-cap qui pulse, mer qui scintille, vent renforcé) · **textes agrandis** partout · **tous les winchs jouent 0→100 %** (Allocation, Réaffectation, Voilure) · **versement mensuel** (nouveau winch, défaut 100 €/mois, réparti selon ton allocation, cumulé dans « dont versé à bord », intégré à la projection 1 an) · pas de temps **mensuel** (« Mois suivant ⚓ »).

*v2: final logo **bronze coin + 8-point polar star + horizon + ICE BLUE halo + engraved NAVLYS** (Brand Bible v2, aligned with the production bronze medal on `brunopartouche-teaser.vercel.app`) integrated as topbar mark + central instrument · livelier scene (boat heel, pulsing star, shimmering sea) · larger text · 0–100% winches (allocation, reallocation, sail trim) · monthly deposit (default €100/mo, split by allocation, in the 1-year projection) · monthly time step.*
