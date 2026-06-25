# Brief — Passer le cockpit en vraie 3D (Three.js)

> Objectif : transformer le prototype 2.5D `cockpit.html` en **cockpit 3D immersif** explorable à 360°, façon « je suis assis à la barre ».

---

## 1. Vision

L'utilisateur est **assis dans le cockpit** d'un ketch. Il fait pivoter la caméra (souris, doigt, ou gyroscope sur mobile) : devant lui le cap et l'horizon, derrière lui le sillage. Les voiles bougent vraiment dans le vent. La pièce bronze flotte au centre comme un instrument holographique. Le tout reste **calme, nuit, premium** — jamais un jeu vidéo criard.

La 3D n'ajoute pas du bruit : elle ajoute de la **présence**. On doit *ressentir* qu'on tient une barre.

---

## 2. Stack technique recommandée

- **Three.js** (r160+) en module ES, ou React-three-fiber (`@react-three/fiber` + `@react-three/drei`) si intégration React.
- **drei** : `OrbitControls` (limités), `Environment`, `Sky`, `useGLTF`, `Float`, `Sparkles`.
- **Post-processing** (`@react-three/postprocessing`) : Bloom doux sur les sources ICE BLUE, vignette, légère aberration.
- **Modèles** : un `ketch.glb` (coque + 2 mâts + bôme) modélisé sous Blender, sobre, low-poly stylisé. Voiles en plans déformables.
- **Perf** : viser 60 fps mobile. Draco compression sur le .glb, textures ≤ 1k, instancing pour les étoiles.

> ⚠️ Sur CDN cdnjs, `THREE.OrbitControls` n'est pas inclus dans le bundle `three.min.js`. Utiliser un build module (npm) ou importer les addons explicitement. Ne pas utiliser `CapsuleGeometry` (introduit tardivement) : préférer Cylinder/Sphere.

---

## 3. Scène — éléments 3D

| Objet 3D | Détail | Animation |
|---|---|---|
| **Cockpit / pont** | coque bois bronze, coaming, barre à roue | statique, caméra à hauteur d'œil assise |
| **Grand mât + grandes voiles** | 90 % · La Forteresse | voiles = mesh à shader de vent (gonflement selon `marketWind`) |
| **Artimon + petites voiles** | 10 % · Le Jeu Actif | idem, amplitude réduite |
| **Rotor Flettner** | cylindre rayé bronze/nuit | rotation continue sur Y |
| **Étoile-objectif** | sprite ICE BLUE + bloom, à l'avant | pulsation lente |
| **Mer** | plan + shader gerstner waves, reflets nuit | houle lente |
| **Sillage** | trail/particules derrière la poupe | s'étire selon la vitesse |
| **Pièce NAVLYS** | médaillon bronze flottant (HUD 3D) | rotation 8 s, `Float` |
| **Cadran météo** | demi-anneau émissif, aiguille | swing selon `marketState` |
| **Compas route** | anneau bronze, aiguille fixe nord | constante (contraste) |
| **Winchs physiques** | drums bronze sur le coaming | clic/drag → tourne le drum + tire la voile |

---

## 4. Caméra & navigation

- **Caméra assise** : position ~ `(0, 1.3, 0)` au centre du cockpit, FOV 60.
- **Rotation 360°** : `OrbitControls` en mode *look-around* (rotation seule, pas de dolly), `enableZoom:false`, `enablePan:false`, amortissement activé.
- **Avant** = azimut 0 (cap, étoile, météo). **Arrière** = azimut 180 (sillage, courbe).
- **Mobile** : option gyroscope (`DeviceOrientationControls`) pour regarder autour en bougeant le téléphone.
- **Snap doux** : bouton « Virer de bord » qui anime la caméra de 180° (tween) pour les utilisateurs qui ne veulent pas glisser.

---

## 5. Le vent comme variable maîtresse

Une seule valeur `marketWind ∈ [-1, 1]` (la météo NAVLYS simulée) pilote :
- l'**angle/gonflement** des voiles (uniform de shader),
- l'**inclinaison (heel)** légère du bateau,
- la **vitesse du sillage** et la houle,
- l'**aiguille météo**.

Tandis que `routeHeading` (ta route) **reste fixe** : c'est le contraste central, exactement comme en 2D.

Les winchs (allocation, réaffectation, voilure) pilotent les **mêmes états** que le prototype — réutiliser tel quel le moteur de simulation JS du prototype (capital, Forteresse/Actif, projection).

---

## 6. Ambiance & rendu

- **Lumière** : nuit. Une lune froide (directional faible), une lumière chaude bronze rasante sur les boiseries, émission ICE BLUE pour halos.
- **Bloom** doux uniquement sur l'étoile, la pièce, la courbe, les liserés.
- **Brouillard** (`fog`) bleu nuit pour fondre l'horizon.
- **Son optionnel** : nappe de vent + clapot très discrets (désactivés par défaut).
- Jamais de couleurs hors palette. Jamais de mouvement brusque.

---

## 7. Étapes de production

1. **Bloc gris** : monter la scène, caméra assise, OrbitControls limités, mer shader. Valider la sensation « assis à la barre ».
2. **Modèle ketch.glb** : coque + 2 mâts + voiles, import Draco. Échelle 90/10 des voiles.
3. **Brancher le moteur de simulation** du prototype (réutiliser la logique `state` + `newDay` + winchs).
4. **Vent → shaders** : connecter `marketWind` aux voiles, au heel, au sillage, à l'aiguille.
5. **HUD 3D** : pièce flottante, cadran météo, compas route, cap du jour (texte en `Troika-three-text` ou plan canvas).
6. **Post-processing** + brouillard + réglages perf mobile.
7. **Contrôles** : bouton virer de bord, toggle FR/EN, gyroscope mobile.
8. **QA** : 60 fps mobile, accessibilité (alternative 2D = le prototype actuel en repli).

---

## 8. Repli & cohérence

Le prototype `cockpit.html` reste la **version 2D de référence et de repli** (appareils faibles, accessibilité, partage rapide). La 3D doit en respecter à la lettre la palette, la métaphore (tableau des correspondances symboliques) et les textes bilingues.

## Disclaimer & signature

> NAVLYS partage des informations générales et pédagogiques. Ce n'est pas un conseil financier personnalisé.
>
> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
