# Brief — Taking the cockpit to true 3D (Three.js)

> Goal: turn the 2.5D `cockpit.html` prototype into an **immersive 3D cockpit** explorable in 360°, the "I'm sitting at the helm" feeling.

---

## 1. Vision

The user is **seated in the cockpit** of a ketch. They rotate the camera (mouse, finger, or gyroscope on mobile): ahead the heading and horizon, behind the wake. The sails actually move in the wind. The bronze coin floats at the centre like a holographic instrument. It all stays **calm, night, premium** — never a loud video game.

3D does not add noise: it adds **presence**. You must *feel* you are holding a tiller.

---

## 2. Recommended stack

- **Three.js** (r160+) as ES modules, or React-three-fiber (`@react-three/fiber` + `@react-three/drei`) for React integration.
- **drei**: `OrbitControls` (limited), `Environment`, `Sky`, `useGLTF`, `Float`, `Sparkles`.
- **Post-processing** (`@react-three/postprocessing`): soft Bloom on ICE BLUE sources, vignette, slight chromatic aberration.
- **Models**: a `ketch.glb` (hull + 2 masts + boom) modelled in Blender, sober, stylised low-poly. Sails as deformable planes.
- **Perf**: target 60 fps on mobile. Draco compression on the .glb, textures ≤ 1k, instancing for the stars.

> ⚠️ On the cdnjs CDN, `THREE.OrbitControls` is not bundled in `three.min.js`. Use a module build (npm) or import the addons explicitly. Do not use `CapsuleGeometry` (added late): prefer Cylinder/Sphere.

---

## 3. Scene — 3D elements

| 3D object | Detail | Animation |
|---|---|---|
| **Cockpit / deck** | bronze wood hull, coaming, wheel | static, camera at seated eye height |
| **Main mast + large sails** | 90% · The Fortress | sails = wind-shader mesh (inflation by `marketWind`) |
| **Mizzen + small sails** | 10% · The Active Play | same, reduced amplitude |
| **Flettner rotor** | bronze/night striped cylinder | continuous Y rotation |
| **Goal-star** | ICE BLUE sprite + bloom, forward | slow pulse |
| **Sea** | plane + Gerstner-wave shader, night reflections | slow swell |
| **Wake** | trail/particles behind the stern | stretches with speed |
| **NAVLYS coin** | floating bronze medallion (3D HUD) | 8 s rotation, `Float` |
| **Weather dial** | emissive half-ring, needle | swings with `marketState` |
| **Heading compass** | bronze ring, fixed north needle | constant (contrast) |
| **Physical winches** | bronze drums on the coaming | click/drag → spins drum + trims sail |

---

## 4. Camera & navigation

- **Seated camera**: position ~ `(0, 1.3, 0)` at cockpit centre, FOV 60.
- **360° rotation**: `OrbitControls` in *look-around* mode (rotation only, no dolly), `enableZoom:false`, `enablePan:false`, damping on.
- **Forward** = azimuth 0 (heading, star, weather). **Aft** = azimuth 180 (wake, curve).
- **Mobile**: optional gyroscope (`DeviceOrientationControls`) to look around by moving the phone.
- **Soft snap**: a "Come about" button that tweens the camera 180° for users who don't want to swipe.

---

## 5. Wind as the master variable

A single value `marketWind ∈ [-1, 1]` (the simulated NAVLYS weather) drives:
- the **angle/inflation** of the sails (shader uniform),
- a slight **heel** of the boat,
- the **wake speed** and the swell,
- the **weather needle**.

While `routeHeading` (your heading) **stays fixed**: that is the central contrast, exactly as in 2D.

The winches (allocation, reallocation, sail trim) drive the **same states** as the prototype — reuse the prototype's JS simulation engine as-is (capital, Fortress/Active, projection).

---

## 6. Atmosphere & rendering

- **Light**: night. A cold moon (weak directional), a warm bronze grazing light on the woodwork, ICE BLUE emission for halos.
- **Soft bloom** only on the star, the coin, the curve, the edge lines.
- **Fog** (`fog`) in blue night to fade the horizon.
- **Optional sound**: very discreet wind bed + lapping water (off by default).
- Never colours outside the palette. Never abrupt motion.

---

## 7. Production steps

1. **Greybox**: build the scene, seated camera, limited OrbitControls, sea shader. Validate the "seated at the helm" feeling.
2. **ketch.glb model**: hull + 2 masts + sails, Draco import. 90/10 sail scale.
3. **Wire the prototype's simulation engine** (reuse the `state` + `newDay` + winch logic).
4. **Wind → shaders**: connect `marketWind` to sails, heel, wake, needle.
5. **3D HUD**: floating coin, weather dial, heading compass, heading-of-the-day (text via `Troika-three-text` or canvas plane).
6. **Post-processing** + fog + mobile perf tuning.
7. **Controls**: come-about button, FR/EN toggle, mobile gyroscope.
8. **QA**: 60 fps mobile, accessibility (2D fallback = the current prototype).

---

## 8. Fallback & consistency

The `cockpit.html` prototype remains the **2D reference and fallback** (low-end devices, accessibility, quick sharing). The 3D must respect to the letter its palette, its metaphor (symbolic mapping table) and its bilingual texts.

## Disclaimer & signature

> NAVLYS shares general, educational information. This is not personalised financial advice.
>
> *"One heading, one hand, one day. NAVLYS guides you to your goal in a single move."*
