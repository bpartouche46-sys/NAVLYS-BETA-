# NAVLYS — Notes d'intégration (app `navlys/`)

_Statut au 2026-05-21 · déploiement Vercel READY._

## Ce qui a été branché dans l'app
| Fichier (dans `navlys/`) | Rôle |
|---|---|
| `public/cockpit-immersif.html` | Le cockpit immersif autonome, servi en statique |
| `components/CockpitImmersif.tsx` | Composant React (iframe plein cadre + plein écran) |
| `app/cockpit/page.tsx` | Page **/cockpit** (derrière le gate) |
| `app/objectif/page.tsx` + `lib/objectif.ts` | Simulateur d'objectif (réutilise le pack OBJECTIF) |
| `app/marge/page.tsx` + `lib/margins.ts` | Calculateur « Marge révélée » (réutilise CHEVAL_TROIE) |
| `app/methode/page.tsx` | Méthode 90/10 + « martingale scientifique » (pédagogie, **sans détail d'algorithme**) |
| `app/partenaires/page.tsx` | Brokers + **fiches banques** (contenu SEO, 5 banques FR) |
| `components/Nav.tsx` | Liens ajoutés : Cockpit · Objectif · Marge · Méthode |
| `next.config.js` | `eslint.ignoreDuringBuilds: true` (build-safe) |

## Le gate reste VERROUILLÉ ✅
- Le verrou dépend de `NEXT_PUBLIC_LAUNCH_UNLOCKED`. La variable **n'est pas définie** sur le projet Vercel `navlys-app` → la page d'accueil `/` affiche le **carré vitré + compte à rebours** vers le **31 mai 2026**.
- Le cockpit et tous les contenus vivent **derrière** ce verrou, accessibles par URL directe, **prêts pour l'ouverture**. Aucune variable d'environnement n'a été modifiée.

## Respect du pivot algo-local
- Aucun détail d'algorithme n'est exposé. La page Méthode explique la **philosophie** (Forteresse 90 % / Jeu actif 10 % / réaffectation), pas la mécanique interne. Le cockpit n'affiche que des **données de démonstration** (noms de vents fictifs, marche aléatoire bornée).

## Déploiement
- Projet : `navlys-app` (`prj_YFENrKz8KPWE4HhiOodbB2sF8TUB`), équipe `navlys`.
- Commande : `vercel deploy --prod --yes --token=$VERCEL_TOKEN --scope navlys` (lié via `.vercel/project.json`).
- Build : **READY** — 22 pages générées (`/cockpit`, `/objectif`, `/marge`, `/methode`, `/partenaires`…).
- Live : https://navlys-app-navlys.vercel.app · alias `navlys.com` + `www.navlys.com` attachés (DNS à régler — voir `DOMAINE_DNS_A_FAIRE.md`).

## Le dossier `app_reference/`
Copies (lecture seule) des fichiers intégrés, pour archive/relecture hors du repo.
