# Point Mer — NAVLYS

Mini-app « le point mer du jour » : état de la mer à **Césarée** (côte israélienne),
hauteur des vagues, vent, rafales et direction, sur les prochaines heures / 3 jours.

## Ce que c'est
Une page unique, autoportante (`index.html`), sans dépendance externe ni CDN,
dans la charte NAVLYS (ice blue + or, fond sombre). Elle affiche :
- un **état de mer** lisible en un coup d'œil (calme → très forte) avec pastille couleur ;
- les 4 mesures clés du moment (vagues en m, vent km/h, rafales km/h, direction en rose) ;
- une bande horizontale des **12 prochaines heures**.

## D'où viennent les données (règle n°20 respectée)
La page n'appelle **que le CORE NAVLYS**, jamais un tiers en direct côté client :
- endpoint : `…/functions/v1/mer` (edge function Supabase déjà en prod) ;
- l'edge `mer` relaie **Open-Meteo** (marine + forecast) et sert lui-même de plan B
  si l'appel direct navigateur est bloqué (réseau d'entreprise). Contrat :
  `GET → { ok, heures:[{ t, vague, vent, raf, dir }], source }`.
- Coordonnées fixes : LAT 32.5 / LON 34.88, fuseau `Asia/Jerusalem`.

## Garde-fous (statut simple citoyen)
- Contenu **éducatif** pour comprendre la mer — **jamais** une consigne de navigation
  ni un feu vert de sécurité. Encart explicite : « réfère-toi au bulletin officiel de
  sécurité maritime et à ton propre jugement ».
- Aucune donnée personnelle, aucun appel d'argent, aucun secret côté client.
- Repli honnête si la mer ne répond pas (message doux, pas d'erreur brute).

## Mise en ligne
Page live isolée façon NAVLYS : déposer `index.html` en `live-source/point-mer.html`
(ou `/point-mer/index.html`), l'ajouter au `sitemap.xml`, brancher une carte dans la
grille « univers » de l'accueil. i18n à ajouter avant publication (5 langues, script +
banc `tools/check-i18n.mjs`, jamais à la main — règles n°33/34). Bumper `sw.js`.

## Étendre (idées)
- Rendre le lieu paramétrable (`?lat=&lon=`) via une évolution de l'edge `mer`.
- Marées et température de l'eau (Open-Meteo marine les expose).
- Karaoké accessibilité (règle n°105) sur l'état de mer lu à voix haute.

---
Créé par @claude (session Claude Code) le 2026-07-22, branché sur l'edge `mer`
existant. Déposé via le canal CORE `navlys.com/depot` pour commit + PR par Bruno.
