# À VALIDER avec Bruno — points tranchés en autonomie (nuit 24/06)

> Bruno : « plus de questions cette nuit, avance en autonomie, passe les points à valider ».
> Voici les décisions que j'ai prises seul + ce qu'il reste à confirmer pour la **version commune finale de chaque site**. Rien en prod.

## Décisions prises (à confirmer)
1. **Fond vidéo « bateau » plein écran** — INTÉGRÉ au système commun (option B).
   - La vidéo couvre toute la page, **derrière** le cinéma + le menu + le contenu.
   - Réglé **subtil** : opacité 20 %, léger flou, teinte sombre par-dessus → charte ice blue préservée, texte lisible.
   - Source **provisoire** : `https://navlys-teaser.vercel.app/media/fond.mp4` (ta vidéo déjà en ligne, chargée en CORS). En prod, chaque site servira son propre `/media/fond.mp4` (surcharge via `window.NV_FONDVID`).
   - Coupé automatiquement si l'utilisateur a « mouvement réduit » (a11y).
   - ❓ **À valider** : le fond subtil te va, ou tu le veux plus visible ? Garde-t-on **le cinéma EN PLUS** du fond, ou le fond **remplace** le cinéma ?
2. **« Le cœur qui respire »** — rendu = **orbe ice‑blue qui respire** (déjà dans la barre du haut `.led`, animation `pulse`/`breathe`).
   - ❓ **À valider** : un vrai **cœur ❤ rouge** casserait la charte (jamais de rouge). Tu veux garder l'orbe ice‑blue, ou une **forme de cœur en ice‑blue** ?
3. **Teaser `navlys-teaser`** (celui que tu décrivais) :
   - Il est sur l'**ANCIENNE charte** (violet/fuchsia + ice blue `#5fe0ff`) et sa date est **périmée (15 juin)**.
   - ❓ **À valider** : on le **rafraîchit** (charte `#7DD3FC` + 1ᵉʳ juillet) et on le garde comme teaser, **ou** on le remplace par la maquette v2 ?

## À confirmer pour finaliser
4. **`media/fond.mp4`** : confirmer que c'est bien **ta vidéo de bateau**, et qu'elle sera déposée sur **chaque** domaine (`/media/fond.mp4`).
5. **`finance.html`** : simulateur + tickers nominatifs → **relecture juridique** avant mise en ligne (déjà flaggé, point dur).
6. **Contenus par site** : le **look commun** est appliqué partout ; restent à valider les **textes/apps/liens réels** de chaque site (1ʳᵉ passe rédigée, à affiner).

## État du « commun »
- Système partagé `assets/navlys-v2.css|js` : cinéma incurvé + **menu haut fixe** + rideaux bleu/champagne + **fond vidéo bateau plein écran** + compte à rebours flashy + charte `#7DD3FC` + conformité verte + a11y (reduced-motion, h1, aria, focus).
- Appliqué à : navlys.com, brunopartouche (+bio), navbiolife (+cgu/privacy), navlys.io, hub. **Une seule source de design.**
