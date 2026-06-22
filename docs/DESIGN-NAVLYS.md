# DESIGN NAVLYS — maquette commune v2 (brief validé 2026-06-19)

> Direction donnée par Bruno. Référence visuelle : **partouche.com / app Partouche**.
> Empreinte de marque : **jeu × plaisir × bien-être**.
> ⚠️ On s'inspire de la *mécanique* Partouche, PAS de ses couleurs (rouge/blanc).
> La charte reste **ICE BLUE** (voir CLAUDE.md / consignes).
>
> 🎨 **Valeur de référence Ice Blue = `#7DD3FC`** (= `rgb(125,211,252)`), faisant foi
> depuis 2026-06-22 (briefing Bruno). Le prototype `proto/navlys-v2.html` a été aligné
> sur cette valeur (l'ancienne `#5fe0ff` est abandonnée). Fond noir `#000000`,
> accent champagne `#e9d3a0`. Polices : Cormorant Garamond · Fraunces · Lora ·
> JetBrains Mono (chiffres / données « cockpit »).

## 1. Principe commun à TOUS les sites
- **Encadré « live » qui défile** en haut, occupant ~la moitié haute de l'écran (zone fixe).
- **Moitié basse = zone de scroll** qui révèle l'essentiel : pages consultables + applications à voir / télécharger.
- **Menu déroulant à icônes** en haut ET barre d'icônes fixe en bas (Accueil / Finance / NAVBIO / Bien-être / Radio / Menu).
- **Animation réelle sur TOUS les encadrés** (shimmer, dégradés qui coulent, equalizer, breしath/glow).
- **Compte à rebours « flashy »** conservé, version ice blue (inspiration carte MEGA POT).
- Mosaïque **1 grand + 2 petits**, **gros chiffres-stats**, **cartes à badge**, lien animé « Découvrez → ».

## 2. Patterns Partouche → transposition NAVLYS
| Partouche | NAVLYS (ice blue) |
|---|---|
| Barre d'icônes basse (rouge actif) | Barre d'icônes basse (actif ice blue + filet champagne) |
| Hero image plein cadre + gros titre | Encadré live qui défile + titre Cormorant |
| Carte recherche blanche flottante | Carte foncée ice-blue (jamais de fond clair) |
| Mosaïque 1 grand + 2 petits | Idem, vignettes animées en continu |
| Gros chiffres 43 / 4746 / 67 | Gros chiffres NAVLYS (univers / 0€ / 100%) |
| Carte MEGA POT dorée flashy | Compte à rebours ice blue glow |
| Cartes Casino/Pasino à badge | Cartes univers à badge |

## 3. Empreinte de contenu (jeu · plaisir · bien-être)
- **Jeu** = les marchés joués avec discipline (éducation & veille, jamais de promesse).
- **Plaisir** = vie méditerranéenne (Corinthe–Suez, îles grecques, art de vivre).
- **Bien-être** = réflexologie, reiki, bols, trompette, coaching de vie.

## 4. Garde-fous conformité (rappel, NON négociable)
- Disclaimer **bandeau + pied de page** sur chaque page.
- Vocabulaire interdit : conseil patrimonial, cabinet, CIF, ORIAS, gestion de patrimoine, recommandation d'investissement, clientèle.
- Aucune promesse de rendement / gain / rapidité.
- Jamais « Israël » / « Ashkelon » / « Jérusalem » en public (narratif méditerranéen).
- Esthétique : fond noir, ice blue + champagne #e9d3a0, texte perle **aligné à gauche**, jamais de fond clair.

## 5. Prototype
- `proto/navlys-v2.html` — maquette de référence (NON déployée), tous visuels = placeholders signalés.
- À valider par Bruno, puis décliner sur navlys.com → brunopartouche.com → navbiolife.com → navlys.io.

## 6. Questions ouvertes (à trancher avec Bruno)
1. Menu icônes : **haut OU bas OU les deux** ? (proto = les deux pour comparer).
2. « Moitié d'écran » : zone live **fixe** en haut + scroll en bas (proto) — OK ?
3. ✅ TRANCHÉ : zone live = **vraie vidéo** (élément `<video>` muet/auto/boucle) + **mini-vidéos qui défilent** + **messages qui défilent**. Reste à fournir : quelle(s) vidéo(s) ? (navlys.com a déjà `/media/presentation.mp4`).
4. Ordre de déclinaison des 4 sites + date de lancement réelle (les comptes à rebours actuels sont périmés).
