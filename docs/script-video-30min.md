# Script vidéo 30 min — « une phrase, NAVLYS règle ça » (structure par profil)

> Décidé le 2026-07-09 : pas un seul angle — toucher **chaque profil** (jeune,
> professionnel, âge médian/famille, senior) dans la même vidéo, en actes.
> Doctrine appliquée (règle n°113, Manus) : montrer un geste réel, pas une
> liste de fonctionnalités. Rythme rafale de vignettes (10-15 au total),
> assemblées par profil. Voix masculine = voix clonée de Bruno (profil `bm`).

## Structure (≈30 min)

**Ouverture (30-45 s)** — Bruno face caméra, une phrase d'ancrage :
« L'IA est le vent, c'est toi qui tiens la barre. » → titre.

**Acte 1 — Jeune / étudiant (≈6 min, 3-4 vignettes)**
- Friction : partager les frais entre colocataires (dépense mentale connue,
  source d'accrochages).
  Phrase réelle : « Partage le loyer et les courses entre nous trois, et
  préviens-moi si quelqu'un n'a pas payé. »
- Friction : réviser sans plan (charge mentale des études).
  Phrase réelle : « Fais-moi un planning de révisions pour mon examen dans
  10 jours, avec un rappel chaque soir. »
- Friction : petit job/side-hustle sans outil de suivi.
  Phrase réelle : « Note chaque heure que je fais en babysitting et
  calcule combien on me doit ce mois-ci. »

**Acte 2 — Professionnel actif (≈6 min, 3-4 vignettes)**
- Friction : notes de réunion perdues / jamais résumées (39 % citent les
  malentendus comme frustration quotidienne, Talker Research 2025).
  Phrase réelle : « Résume ma réunion de ce matin et envoie les points
  d'action à toute l'équipe. »
- Friction : notes de frais professionnelles.
  Phrase réelle : « Note cette dépense de déplacement et prépare mon
  rapport de frais du mois. »
- Friction : présence en ligne / petite page pro à créer vite.
  Phrase réelle : « Crée-moi une page simple pour présenter mes services de
  coaching, avec un formulaire de contact. »

**Acte 3 — Milieu de vie / famille (âge médian) (≈6 min, 3-4 vignettes)**
- Friction : « qu'est-ce qu'on mange ce soir » (charge mentale quotidienne
  connue, non chiffrée précisément mais largement documentée).
  Phrase réelle : « Propose-moi un repas pour ce soir avec ce qu'il y a dans
  mon frigo, pour 4 personnes. »
- Friction : budget familial / dépenses qui s'accumulent (47 % s'inquiètent
  du coût de la vie, Talker Research 2025).
  Phrase réelle : « Suis mes dépenses du mois et dis-moi où je peux
  économiser. »
- Friction : planning des enfants (devoirs, activités, rendez-vous).
  Phrase réelle : « Rappelle-moi les activités de mes enfants cette semaine
  et préviens-moi une heure avant chaque rendez-vous. »

**Acte 4 — Senior (≈6 min, 3-4 vignettes)**
- Friction : transmettre sa vie, ses souvenirs (cœur de Next Gen).
  Phrase réelle : « Écris avec moi l'histoire de ma vie, un chapitre à la
  fois, à la voix. » (renvoie à l'exemple réel déjà en ligne :
  `/next-gen-exemple-bm`)
- Friction : rappels de santé/médicaments (simplicité vocale essentielle).
  Phrase réelle : « Rappelle-moi de prendre mon traitement matin et soir. »
- Friction : rester en lien avec la famille sans complexité technique.
  Phrase réelle : « Envoie une photo de mes petits-enfants à ma sœur chaque
  dimanche. »
- Note d'accessibilité (à respecter dans le montage) : sous-titres larges,
  mode karaoké déjà en doctrine (règle n°105), voix lente et posée profil
  « bm » à stability plus haute pour ce segment.

**Clôture (30-45 s)** — Bruno face caméra, un seul CTA :
« Teste gratuitement — 0 € » → `/adhesion`. Pas de deuxième CTA.

## Statut de production (2026-07-09)

- ✅ Vignette « clés oubliées » (Acte 1, adaptée) générée et testée en
  direct : `/labo-spots`, fichier `avatar/labo/vignette-1-cles.mp3`.
- ⏳ Reste à générer : 1 vignette par jour (cadence demandée par Bruno),
  chacune évaluée en direct sur `/labo-spots` avant de passer à la suivante.
- ⏳ Montage vidéo final (visuels + voix + captions) : nécessite le pipeline
  HyperFrames/HeyGen une fois les 10-15 scripts voix validés un par un —
  pas un chantier d'un seul coup, séquencé volontairement pour respecter le
  rythme d'itération demandé.

## Sources des frictions citées

- Talker Research 2025 (via `docs/reverse-engineering-pubs-meta.md` et
  recherche du 2026-07-09) : clés/portefeuille/téléphone (34 %), coût de la
  vie (47 %), retard/trafic (40 %), malentendus (39 %).
- Frictions "repas du soir", "planning enfants", "notes de frais" : logique
  produit directe (pas de sondage chiffré cité), à valider par le retour réel
  des premiers testeurs plutôt qu'affirmé comme statistique.
