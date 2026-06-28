# NAVLYS — Prompts image-to-video (prêts à coller)

> Image source pour tous : `../assets/navlys_coin.png`
> Mode : Image-to-Video · Durée 4 s · Mouvement faible/subtil · Boucle activée
> Garder le fond noir étoilé et le halo bleu glacier. Ne jamais déformer le mot NAVLYS.

---

## 1) Runway (Gen-3 / Gen-4 — Image to Video)

**Prompt (EN, à coller) :**
```
Subtle cinematic animation of a bronze coin relief on a dark starry background. The archer goddess slowly draws her bow, the bowstring tensing back just slightly; the stag beside her gently turns its head. Warm golden light slowly sweeps across the bronze surface, catching the relief and the laurel wreath. The surrounding ice-blue halo pulses softly, like a calm breath. Faint gold sparks drift around the coin. Camera almost static, a very slow push-in. Photorealistic metal, shallow motion, seamless loop, no text distortion.
```
**Réglages :** Motion Brush sur l'archère + le cerf si dispo · Camera: slight zoom in · Duration 4s · Seamless/Loop ON.

---

## 2) Kling AI (Image to Video — Professional mode)

**Prompt (EN, à coller) :**
```
A bronze medallion comes subtly to life: the relief of an archer goddess draws her bow a few millimeters, the stag turns its head slowly. A sweep of golden specular light travels across the metal from left to right. The ice-blue halo around the coin gently glows and fades, like breathing. Tiny golden particles float in the dark starry space. Keep the engraved word and laurel wreath perfectly intact. Minimal, elegant, premium, low motion, looping.
```
**Negative prompt :**
```
distortion, warping, melting, text changes, extra limbs, color shift, flicker, fast motion, cartoon, watermark
```
**Réglages :** Mode Professional · Motion strength: low · Duration 5s · Loop ON.

---

## 3) Pika (Image to Video)

**Prompt (à coller) :**
```
Bronze coin relief, archer goddess slowly drawing her bow, stag gently turning its head, golden light sweeping across the bronze, ice-blue halo pulsing softly, floating gold sparks, dark starry background, subtle premium cinematic motion, seamless loop -motion 1 -fps 24
```
**Réglages :** Pika → Motion: 1 (très faible) · Camera: zoom in lent · Negative prompt : `distort, morph, text change, fast, flicker`.

---

## 4) Hailuo / MiniMax (Image to Video)

**Prompt (EN, à coller) :**
```
Cinematic close-up of a bronze NAVLYS coin on a starry black background. Gentle living relief: the archer goddess tenses her bow ever so slightly, the stag turns its head; a warm golden highlight glides across the embossed metal; the ice-blue halo breathes in and out. Delicate gold dust floats around. Ultra-subtle motion, luxury feel, looping animation, preserve all engraving and the laurel wreath.
```
**Réglages :** Motion: subtle/low · Duration 4–5s · garder le cadrage carré.

---

## Astuce boucle parfaite (tous outils)

Si le rendu ne boucle pas proprement :
1. exporte le MP4,
2. duplique-le inversé (ping-pong),
3. colle les deux bout à bout dans n'importe quel éditeur (CapCut, Clipchamp, Premiere).
Résultat : aller-retour fluide, invisible à l'œil.

---

## Après génération

- Exporter en **MP4 1080 × 1080**, nommé `navlys_coin_anim.mp4`.
- Le poser dans `assets/`.
- Sur le teaser, remplacer le bloc `<div class="coin-stage">…</div>` de `index.html` par :
```html
<div class="coin-stage">
  <video src="assets/navlys_coin_anim.mp4" autoplay muted loop playsinline
         style="width:100%;height:100%;object-fit:contain;border-radius:50%"></video>
</div>
```

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> *“One bearing, one hand, one day. NAVLYS guides you to your goal with a single move.”*
