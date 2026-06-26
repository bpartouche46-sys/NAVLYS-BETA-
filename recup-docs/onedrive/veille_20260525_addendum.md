# Veille infra — addendum manuel 2026-05-25 (Dépt 06)

*Complément au run automatique de 05:17 UTC, après re-vérification live en fin de journée. Lecture seule.*

## Delta depuis le run de 05:17
- 🟡 **Nouveau projet Vercel `brunopartouche` (READY)** apparu APRÈS le run du matin (le run n'avait vu que `brunopartouche-teaser`). Vercel compte donc maintenant **4 projets** : `navlys-app`, `navlys-teaser`, `brunopartouche`, `brunopartouche-teaser`.
- ⚓ **Doublon de marque (site perso) = 3 quais** : Netlify `novafinanceclub` (LIVE, détient brunopartouche.com) + Vercel `brunopartouche` + Vercel `brunopartouche-teaser`. Aucun n'a de domaine custom côté Vercel → pas de conflit immédiat, mais à arbitrer.

## État confirmé (sain)
- Netlify : **1 site** (`novafinanceclub` → brunopartouche.com, ready).
- brunopartouche.com : A → 75.2.60.5 (Netlify), HTTP 200, SSL OK. Plus de parking Namecheap.
- navlys.com : Vercel `navlys-app`, READY, gate verrouillé, SSL OK.

## Actions prises (Dépt 06, réversibles)
- ✅ Veille consolidée en **1 seule tâche** : `veille-infra-navlys` (durcie pour détecter le doublon de marque brunopartouche + le DNS qui changerait de quai).
- ✅ Mis en **PAUSE** (pas supprimé) : `veille-sites-navlys` et `veille-etat-des-lieux-navlys` (doublons).
- ✅ Dépt 06 (`_NAVLYS_DEPARTEMENTS/06_INFRA_VEILLE.md`) mis à jour à la réalité.

## Décisions en attente (Bruno)
1. Site perso : garder Netlify `novafinanceclub` (recommandé, c'est le LIVE) et **larguer** les 2 projets Vercel `brunopartouche*` ? (sur ton OK je supprime)
2. `navlys-teaser` : garder séparé ou fondre dans le gate de `navlys-app` ?
3. Confirmer la suppression définitive des 2 veilles en pause (ou les laisser en pause).
