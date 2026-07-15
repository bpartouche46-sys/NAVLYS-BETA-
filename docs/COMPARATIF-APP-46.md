# ⚖️ Comparatif — PR #46 (app Next.js) vs site live actuel

> Demande Bruno : « comparatif avant de trancher » sur PR #46 (app NAVLYS Next.js).
> Verdict court : **le site live gagne largement. #46 = à archiver, en récupérant 1-2 idées.**

## Ce qu'est réellement PR #46
D'après son propre README : **« SQUELETTE RECONSTITUÉ-DEPUIS-DOCS… Ce n'est PAS le vrai projet de
Bruno »**, à compléter par l'import du dossier `navlys/` avant tout déploiement. C'est une app
Next.js 14 (App Router) centrée sur un **funnel d'onboarding de profilage financier** :
`dream → questionnaire (12 Q) → profile → routine → expectations → activate`, + auth Supabase +
middleware gate + 4 pages légales + moteur de personnalisation.

## Face à face

| Critère | PR #46 (Next.js) | Site live (`live-source`, `main`) |
|---|---|---|
| Statut | Squelette incomplet (données manquantes) | **Réel, en ligne, 63 pages** |
| Positionnement | **Ancien** (profilage finance/allocation) | **Actuel** (IA qui orchestre tes IA, mobile) |
| Gate | figé **1ᵉʳ juillet 2026** (périmé) | countdown recalé **1ᵉʳ août** |
| Périmètre | onboarding + dashboard + légal | Finance, NAVLEX, Bateaux, Next Gen, Voix, **Ambassadeur+simulateur**, **Dashboard bulles**, Radio, Journal, Skipper… |
| i18n | non (FR seul) | **13 langues** |
| Backend | schema.sql + auth Supabase | **supabase/functions/** (23 briques live) + edge |
| Auth membre | Supabase sign-in (propre) | OAuth `/adhesion` (google/apple/azure/fb/discord) + OTP |
| Légal | terms / privacy / ai-voice / disclaimer-g1 | `/conditions` + `/confidentialite` présents |

## Ce que #46 a d'unique (à éventuellement récupérer)
1. **`legal/ai-voice`** : une page légale dédiée au **consentement voix clonée / « voix générée par
   IA »** — pertinente vu l'arbitrage dépersonnalisation 2026-07-15 (Bruno visible + disclaimer IA).
   → **candidate à récupérer** si `/conditions`/`/confidentialite` ne couvrent pas ce point.
2. **`middleware.ts` (gate + auth)** + **`check-no-secrets-in-client.js`** (garde-fou prebuild) :
   patterns propres, mais le live gère déjà gate/OAuth autrement → valeur faible.
3. **Le questionnaire 12 Q + moteur de personnalisation** : concept réutilisable, MAIS orienté
   profilage financier = **superseded** par le positionnement actuel (Next Gen + /tableau-de-bord).

## 🎯 Recommandation
**ARCHIVER PR #46** (fermer sans merger). Le fusionner **régresserait** le produit (positionnement
périmé, incomplet, FR-only, gate périmé). Avant de fermer : **récupérer uniquement le contenu de
`legal/ai-voice`** si le point « voix générée par IA » n'est pas déjà traité dans les pages légales
live — sinon rien à sauver côté code.

**Décision qui te revient (Bruno)** :
- [ ] Archiver #46 (recommandé) — je le ferme après avoir vérifié le point « voix IA » légal.
- [ ] OU tu veux qu'on récupère un élément précis avant fermeture (dis lequel).
