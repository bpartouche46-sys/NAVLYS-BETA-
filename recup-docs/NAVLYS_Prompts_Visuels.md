# NAVLYS — Pack de descriptions visuelles (à générer chez nos prestataires)
### Objectif : créer NOS visuels → NOS droits. (Fal AI, Runway, Kling, Luma, Flux, Firefly…)

> **Droits :** les images/vidéos générées par ces outils sont **utilisables commercialement et t'appartiennent** (selon les CGU du prestataire — Fal, Runway, etc. accordent l'usage commercial des sorties). C'est exactement la voie NAVLYS : on **crée et on anticipe**, au lieu de louer des banques.
>
> **Garde-fou propreté juridique :** on **ne nomme jamais** une franchise (ex. « Terminator ») ni un artiste vivant dans le prompt. On décrit en termes génériques (« endosquelette cybernétique », « métal chromé »). Le résultat est 100 % à nous.

---

## 1) CERVEAU HÉROS — mi-humain / mi-IA (image + vidéo)
**Usage :** héros de navlys.com (remplace mon SVG par un rendu photoréaliste).
**Format :** carré 1:1 (image) ou 16:9 (vidéo), fond noir, boucle parfaite (seamless loop) pour la vidéo.

**Prompt (EN) :**
> Photorealistic human brain, front view, split exactly down the midline into two halves. Left hemisphere: organic anatomical brain with realistic glistening gyri and sulci, warm champagne-gold and soft coral subsurface glow. Right hemisphere: sleek cybernetic mechanical brain, brushed chrome and dark carbon plates, exposed micro-gears and glowing circuit traces, an incandescent energy core pulsing red-amber. A bright vertical seam of glacier-cyan light divides the two halves. Tiny luminous particles orbit inside and around the brain. Deep black background, volumetric rim light, cinematic, ultra-detailed, 8k, futuristic film aesthetic.

**Negative :** text, watermark, blurry, low-res, extra limbs, cartoon, distorted anatomy.
**Palette à respecter :** glacier #5fe0ff · champagne #e9d3a0 · braise rouge/brique · noir profond.
**Vidéo :** « slow breathing pulse, neural impulses traveling along circuits, gentle particle drift, seamless 6–8s loop ». Modèles : Kling / Runway Gen-3 / Luma (via Fal).

---

## 2) NOYAU D'IA — mode « recherche / digestion »
**Usage :** s'allume quand NAVLYS travaille (création de film, analyse client).
**Format :** carré ou 16:9, boucle parfaite.

**Prompt (EN) :**
> Abstract artificial-intelligence energy core: a brilliant pulsing sphere of glacier-cyan and white light at center, surrounded by rotating rings of energy, fine electric filaments discharging outward, and countless small luminous particles converging inward toward the core (as if absorbing information). Champagne-gold accents. Pure black background, deep volumetric glow, holographic, premium, cinematic, ultra-detailed, seamless loop.

**Negative :** text, logos, faces, clutter, low-res.
**Vidéo :** « particles flowing inward, core breathing, rings slowly rotating, 6s seamless loop ».

---

## 3) FOND VIVANT — Méditerranée / bateau (pleine page)
**Usage :** fond plein écran de tout le site (slot `/media/fond.mp4`).
**Format :** 16:9 horizontal, mouvement lent et doux, boucle.

**Prompt (EN) :**
> Serene Mediterranean seascape at golden dawn, a single elegant sailing boat gliding on calm shimmering water, soft champagne-gold sunlight, gentle glacier-cyan reflections, distant Greek islands silhouette, cinematic, dreamy, slow drifting camera, volumetric light, ultra-detailed, seamless loop.

**Negative :** people faces, text, busy crowds, harsh colors.
**Note :** garde-fou comm — **mer Méditerranée / îles grecques uniquement**, jamais de lieu identifiable précis.

---

## 4) MOTIF LOGO / AMBIANCE (optionnel)
> Minimal luminous emblem: a stylized glowing brain-anchor hybrid, glacier-cyan and champagne-gold light on black, premium, simple, vector-like, soft glow.

---

## Comment on s'en sert (2 chemins)
**A. Tu génères toi-même** (ton compte Fal/Runway) → tu télécharges → tu déposes dans `navlys-central/media/` :
- `media/cerveau.mp4` (cerveau héros)
- `media/core.mp4` (noyau d'IA)
- `media/fond.mp4` (Méditerranée)
→ je les câble automatiquement (héros, noyau « recherche », fond plein écran).

**B. Je génère pour toi** → il faut **brancher un connecteur de génération** (Fal AI ou autre). Dis « branche Fal » et je te propose le connecteur à activer ; ensuite je génère et j'intègre, bout en bout.

> Les `.png`/`.jpg` marchent aussi en attendant la vidéo. Dépose, je m'occupe du reste.
