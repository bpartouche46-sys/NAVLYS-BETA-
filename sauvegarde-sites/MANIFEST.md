# SAUVEGARDE SITES — manifeste

> Filet de sécurité **partiel** capturé en **lecture seule** le **2026-06-22** via
> l'outil de fetch Vercel. ⚠️ **Ce n'est PAS la sauvegarde définitive** : la vraie
> source complète (avec assets binaires, navlys-app, etc.) doit être rapatriée depuis
> l'ancien PC — voir `docs/SAUVEGARDE-CODE-VERCEL.md` et `docs/PHASE-0-SUIVI.md`.

## Ce qui est capturé ici

### `_assets-moteur/` — moteur JS/CSS partagé NAVLYS (le plus précieux)
Ces fichiers n'étaient sauvegardés **nulle part ailleurs** ; ce sont les briques
réutilisables de l'écosystème :

| Fichier | Origine | Rôle |
|---------|---------|------|
| `cockpit.js` | navbiolife.com | Moteur d'animations plein écran (4 cockpits : voiture/spaceship/avion/bateau) |
| `cockpit-mini.js` | navbiolife.com | Version réduite (scène fixe dans un canvas) |
| `launch-offer.js` | navbiolife.com | Escalator d'offre de lancement (−50→−20 %) |
| `hero-bg-slideshow.js` | navbiolife.com | Diaporama d'arrière-plan (KenBurns) |
| `navlys-family-theme-v2.css` | brunopartouche.com | Thème « famille NAVLYS » (Ice Blue partout) |

## Ce qui N'EST PAS ici (à récupérer depuis l'ancien PC)

- **navlys-app (navlys.com)** : application Node.js **protégée (403)** → non récupérable par fetch.
- **brunopartouche.com (home)** : le `<script>` final dépasse la taille récupérable → non capturé en entier.
- **Le HTML des pages** : les versions **corrigées** sont dans `corrections-pretes/` ;
  les versions brutes peuvent être re-fetchées si besoin.
- **Assets binaires** : images (`bg-1/2/3.jpg`, `favicon.jpg`, `bruno-coin-face-*.jpg`),
  vidéos (`media/fond.mp4`, `media/presentation.mp4`) → non récupérables en texte.
- Les **données** (Supabase, base du core Hetzner) → voir `docs/SAUVEGARDE.md`.

## 🔴 Découverte pendant la capture (à corriger)

`launch-offer.js` contient encore une **non-conformité** (cf. ERR-003 / ERR-005) :
- Commentaires + texte servi « **1er juin … minuit Asia/Jerusalem** » / « **heure de Jérusalem** »
  (le texte « heure de Jérusalem » s'affiche quand l'offre est en état *before*).
- Escalator **ancré au 1ᵉʳ juin** (périmé) → à réancrer sur le **1ᵉʳ juillet 2026**.
- Correctif détaillé : voir `corrections-pretes/PATCH-comptes-a-rebours.md` (P-04).

> Le fichier est conservé ici **tel quel** (fidélité de sauvegarde). Ne pas le
> redéployer sans appliquer le correctif.
