# NAVLYS — Brief d'animation des personnages de la pièce

> Objectif : donner vie à la pièce de bronze NAVLYS. L'archère (Diane / Artémis)
> tend lentement son arc, le cerf tourne la tête, une lumière dorée balaie le
> métal, le halo bleu glacier respire. Boucle propre de 3 à 5 secondes.
>
> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*

---

## Ce dont tu as besoin

- **L'image source** : `../../assets/navlys_coin.png` (la pièce officielle, 500 × 500, fond noir étoilé + halo ICE BLUE).
- **Un outil image-to-video IA** : Runway Gen-3 / Gen-4, Kling AI, Pika, ou Hailuo (MiniMax). Un seul suffit — teste celui auquel tu as accès.
- 10 minutes.

La vraie animation des reliefs (l'arc qui se tend, la tête du cerf) ne se fait pas en CSS : elle demande une IA image-to-video. Le pack web fait déjà « briller » la pièce (rotation, halo, balayage). Ce brief ajoute le mouvement fin des personnages, en option, pour une vidéo d'intro premium.

---

## Réglages communs (tous outils)

| Réglage | Valeur conseillée |
|---|---|
| Mode | Image-to-Video (on part de la pièce, on ne régénère pas l'image) |
| Durée | 3 à 5 s |
| Boucle | activée (seamless loop) si l'outil le propose |
| Mouvement caméra | quasi nul — léger push-in (zoom lent) max |
| Intensité de mouvement | **faible** (subtil, cinématographique, jamais cartoon) |
| Format | 1:1 (carré) pour garder la pièce centrée ; 1080 × 1080 |
| Fond | inchangé — garder le noir étoilé et le halo bleu |

⚠️ **À éviter** : mouvement brusque, déformation du visage, morphing du mot NAVLYS, changement de couleur du bronze, ajout d'objets. La pièce reste une pièce.

---

## Le mouvement voulu, dans l'ordre d'importance

1. **La lumière dorée balaie le bronze** de gauche à droite (effet « specular » sur le relief) — c'est ce qui vend l'animation.
2. **Le halo ICE BLUE respire** (pulse lent, ~1 battement / seconde).
3. **L'archère tend très légèrement son arc** (la corde recule de quelques pixels, le bras se tend).
4. **Le cerf tourne doucement la tête** ou cligne / bouge l'oreille.
5. **De fines étincelles / poussières d'or** flottent autour de la pièce.

Si l'outil ne sait pas animer les personnages, garde au moins 1 + 2 + 5 : ça reste superbe.

---

## Pas à pas

1. Ouvre l'outil → **Image to Video**.
2. **Upload** `navlys_coin.png`.
3. Colle le **prompt** correspondant (voir `../prompts_runway_kling_pika.md`).
4. Durée **4 s**, mouvement **low / subtle**, caméra **fixe ou push-in léger**.
5. Génère. Compare 2–3 variantes (seed différent).
6. Choisis la plus douce, celle où le visage ne se déforme pas.
7. **Export MP4 1080 × 1080**. Nomme-le `navlys_coin_anim.mp4`.
8. (option boucle parfaite) repasse-le dans l'outil en « extend / loop », ou monte un aller-retour (ping-pong) dans un éditeur.

---

## Où l'utiliser ensuite

- **Intro vidéo** des réseaux (3 s avant chaque post vidéo).
- **Splash** de l'app / du site (remplace la pièce CSS au chargement).
- **Avatar animé** (X, LinkedIn acceptent le MP4 / GIF court).
- Sur le teaser : tu peux remplacer le bloc `.coin-stage` de `index.html` par une balise `<video autoplay muted loop playsinline>` pointant vers le MP4.

---

## Le test du calme

Regarde la vidéo sans le son. Si elle agite, recommence plus doux.
Si elle apaise et fait juste « respirer » le bronze, elle est NAVLYS.

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
