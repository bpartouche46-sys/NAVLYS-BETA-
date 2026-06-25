# NAVLYS — Coin character animation brief

> Goal: bring the NAVLYS bronze coin to life. The archer goddess (Diana / Artemis)
> slowly draws her bow, the stag turns its head, golden light sweeps across the
> metal, the ice-blue halo breathes. Clean 3–5 second loop.
>
> *“One bearing, one hand, one day. NAVLYS guides you to your goal with a single move.”*

---

## What you need

- **Source image**: `../../assets/navlys_coin.png` (the official coin, 500 × 500, starry black background + ICE BLUE halo).
- **An image-to-video AI tool**: Runway Gen-3 / Gen-4, Kling AI, Pika, or Hailuo (MiniMax). Any one will do — use whichever you have access to.
- 10 minutes.

Real relief motion (the bow drawing, the stag's head) can't be done in CSS — it needs an image-to-video AI. The web pack already makes the coin *shine* (rotation, halo, light sweep). This brief adds the fine character motion, optionally, for a premium intro video.

---

## Common settings (all tools)

| Setting | Recommended |
|---|---|
| Mode | Image-to-Video (start from the coin, do not re-generate the image) |
| Duration | 3 to 5 s |
| Loop | enabled (seamless loop) if available |
| Camera motion | near-zero — a slow push-in at most |
| Motion strength | **low** (subtle, cinematic, never cartoon) |
| Format | 1:1 (square) to keep the coin centered; 1080 × 1080 |
| Background | unchanged — keep the starry black and the blue halo |

⚠️ **Avoid**: jerky motion, face distortion, morphing of the word NAVLYS, bronze color shifts, added objects. The coin stays a coin.

---

## The intended motion, by priority

1. **Golden light sweeps across the bronze** left to right (specular shimmer on the relief) — this is what sells the animation.
2. **The ICE BLUE halo breathes** (slow pulse, ~1 beat / second).
3. **The archer very slightly draws her bow** (the string pulls back a few pixels, the arm tenses).
4. **The stag gently turns its head** or blinks / flicks an ear.
5. **Fine gold sparks / dust** drift around the coin.

If the tool can't animate the characters, keep at least 1 + 2 + 5 — still gorgeous.

---

## Step by step

1. Open the tool → **Image to Video**.
2. **Upload** `navlys_coin.png`.
3. Paste the matching **prompt** (see `../prompts_runway_kling_pika.md`).
4. Duration **4 s**, motion **low / subtle**, camera **static or slight push-in**.
5. Generate. Compare 2–3 variants (different seed).
6. Pick the softest one, where the face does not distort.
7. **Export MP4 1080 × 1080**. Name it `navlys_coin_anim.mp4`.
8. (optional perfect loop) run it back through “extend / loop”, or build a ping-pong (back-and-forth) in an editor.

---

## Where to use it next

- **Video intro** for socials (3 s before each video post).
- **Splash** for the app / site (replaces the CSS coin on load).
- **Animated avatar** (X, LinkedIn accept short MP4 / GIF).
- On the teaser: you can swap the `.coin-stage` block in `index.html` for a `<video autoplay muted loop playsinline>` pointing to the MP4.

---

## The calm test

Watch it muted. If it agitates, redo it softer.
If it soothes and just makes the bronze *breathe*, it is NAVLYS.

> *“One bearing, one hand, one day. NAVLYS guides you to your goal with a single move.”*
