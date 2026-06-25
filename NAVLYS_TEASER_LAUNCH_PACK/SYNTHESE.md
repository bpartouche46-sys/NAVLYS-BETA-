# NAVLYS — TEASER LAUNCH PACK · Synthèse / Synthesis

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> *“One bearing, one hand, one day. NAVLYS guides you to your goal with a single move.”*

---

# 🇫🇷 FRANÇAIS

## Ce que contient le pack

Un **teaser prêt à mettre en ligne demain matin**. On devine le vrai site NAVLYS
derrière un brouillard, une pièce de bronze tourne et brille au centre, et une
horloge aux aiguilles inversées décompte vers le **31 mai 2026** (00:00, Jérusalem).

## La carte du pack

| Fichier | Rôle |
|---|---|
| `index.html` | **La page teaser bilingue** (FR/EN avec bascule) — c'est elle qu'on met en ligne |
| `fr/index.html` · `en/index.html` | Versions pures, une seule langue (pour liens directs) |
| `assets/navlys_coin.png` | Le logo officiel (pièce bronze, archère + cerf, halo glacier) |
| `assets/navlys_coin_animated.html` | Le logo animé seul (rotation + halo + balayage) |
| `components/ChronosBanner.tsx` | Bannière Chronos + horloge inversée + compteur (React TS) |
| `components/TeaserHero.tsx` | Pièce bronze animée + tagline (React TS) |
| `components/BlurReveal.tsx` | Le site flouté en arrière-plan (React TS) |
| `components/EmailCapture.tsx` | Capture email de préinscription (React TS) |
| `logo_animation/` | Briefs FR/EN + prompts IA pour animer l'archère et le cerf |
| `fr/DEPLOY_DEMAIN.md` · `en/DEPLOY_TOMORROW.md` | Guide de mise en ligne Vercel (≤ 10 min) |

## La page teaser, en clair

1. **Fond** : la homepage NAVLYS recomposée (hero ketch au lever du jour, la sève, les tarifs 29,99 / 39,99 / 49,99 €), puis **floutée** — on devine le port dans la brume.
2. **Pièce bronze au centre** : rotation 3D lente, **halo bleu glacier qui respire** (60 BPM), **balayage de lumière dorée** qui fait briller l'archère et le cerf, étincelles de bronze.
3. **Bannière Chronos** : la silhouette du dieu du temps, une **horloge dont les aiguilles tournent à l'envers**, et le **vrai compteur** jours / heures / minutes / secondes vers le 31 mai.
4. **Tagline** : *« Un cap, une main, un jour. »*
5. **Capture email** : « Être prévenu » → mémoire locale + envoi serveur (placeholder) + repli mailto.
6. **Bascule FR / EN** en haut à droite.
7. **Pied** : signature officielle + avertissement (pas de conseil personnalisé) + © NAVLYS 2026.

## Demain matin (résumé)

1. `vercel.com/new/upload` → glisse le ZIP (ou le dossier).
2. Framework **Other** → **Deploy**.
3. Ouvre l'URL, vérifie le compteur et la bascule.
4. (plus tard) branche `navlys.com` via le DNS pack.
5. Le **31 mai** : remplace le teaser par le vrai site (ou passe le flou à `0`).

> Détail complet : `fr/DEPLOY_DEMAIN.md`.

## Garde-fous de marque respectés

Palette stricte (bronze · cuivre · ICE BLUE · noir · nuit bleue) · langage simple
et maritime · **aucun algorithme exposé** · signature en pied · avertissement permanent.

---

# 🇬🇧 ENGLISH

## What's in the pack

A **teaser ready to go live tomorrow morning**. The real NAVLYS site is glimpsed
behind a fog, a bronze coin turns and shines at the center, and a clock with
backward-running hands counts down to **May 31, 2026** (00:00, Jerusalem).

## Pack map

| File | Role |
|---|---|
| `index.html` | **The bilingual teaser page** (FR/EN with a toggle) — the one you publish |
| `fr/index.html` · `en/index.html` | Pure single-language versions (for direct links) |
| `assets/navlys_coin.png` | The official logo (bronze coin, archer + stag, ice halo) |
| `assets/navlys_coin_animated.html` | The animated logo on its own (spin + halo + sweep) |
| `components/ChronosBanner.tsx` | Chronos banner + reverse clock + countdown (React TS) |
| `components/TeaserHero.tsx` | Animated bronze coin + tagline (React TS) |
| `components/BlurReveal.tsx` | The blurred site behind (React TS) |
| `components/EmailCapture.tsx` | Pre-registration email capture (React TS) |
| `logo_animation/` | FR/EN briefs + AI prompts to animate the archer and the stag |
| `fr/DEPLOY_DEMAIN.md` · `en/DEPLOY_TOMORROW.md` | Vercel deploy guide (≤ 10 min) |

## The teaser page, plainly

1. **Background**: the NAVLYS homepage recomposed (ketch hero at dawn, the sap, pricing 29.99 / 39.99 / 49.99 €), then **blurred** — the harbor seen through mist.
2. **Bronze coin at the center**: slow 3D turn, **ice-blue halo breathing** (60 BPM), **golden light sweep** that makes the archer and the stag shine, bronze sparks.
3. **Chronos banner**: the silhouette of the god of time, a **clock whose hands run backward**, and the **real countdown** days / hours / minutes / seconds to May 31.
4. **Tagline**: *“One bearing, one hand, one day.”*
5. **Email capture**: “Notify me” → local memory + server POST (placeholder) + mailto fallback.
6. **FR / EN toggle** top right.
7. **Footer**: official signature + disclaimer (no personalised advice) + © NAVLYS 2026.

## Tomorrow morning (summary)

1. `vercel.com/new/upload` → drag the ZIP (or the folder).
2. Framework **Other** → **Deploy**.
3. Open the URL, check the counter and the toggle.
4. (later) wire `navlys.com` via the DNS pack.
5. On **May 31**: replace the teaser with the real site (or set blur to `0`).

> Full detail: `en/DEPLOY_TOMORROW.md`.

## Brand guardrails respected

Strict palette (bronze · copper · ICE BLUE · black · night blue) · simple maritime
language · **no algorithm exposed** · signature in the footer · permanent disclaimer.
