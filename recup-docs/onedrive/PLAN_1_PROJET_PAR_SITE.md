# NAVLYS — Plan « 1 projet unique par site » + baseline de veille
_22 mai 2026 · à valider ensemble. Rien n'est supprimé tant que tu n'as pas dit oui._

## La cible (2 sites, 1 hôte chacun)

### Site A — NAVLYS → `navlys.com`
- **Canonique : Vercel `navlys-app`** (build READY, gate + cockpit).
- **Source unique : `Downloads/navlys/`** (Next.js).
- À retirer une fois validé : Vercel `navlys-teaser` ; Netlify `ubiquitous-sherbet-7cafd2` (landing NAVLYS égarée sur Netlify).
- Dossiers locaux à archiver : `navlys-teaser-deploy/`, `NAVLYS_VOILE_TEASER/`, `NAVLYS_TEASER_LAUNCH_PACK/`, `NAVLYS_PORTAL_APP/`.

### Site B — Bruno Partouche / NOVA Finance Club → `brunopartouche.com`
- **Domaine cassé** : `brunopartouche.com` pointe vers le parking Namecheap `192.64.119.130`, pas vers le site. Joignable seulement sur `novafinanceclub.netlify.app`.
- **Canonique = à choisir (Q1)** : soit on garde Netlify `novafinanceclub` + on répare le DNS ; soit on migre sur Vercel.
- **Source unique : `Downloads/brunopartouche-DEPLOY-v13-seo-polish_1/`** (v13 « seo polish » = la plus récente).
- Doublons à retirer (8 Netlify + 1 Vercel) : `nova030501`, `subtle-cheesecake-9ca88e`, `elaborate-dragon-db18af`, `bucolic-unicorn-1e39d3`, `brunopartouche-nova`, `phenomenal-raindrop-c6e552`, `peppy-sunshine-51f50e`, + Vercel `brunopartouche-com` (cassé).
- Mort à supprimer : Netlify `silly-gecko-b96a17` (404).

## Inventaire en ligne (référence figée pour la veille)

### Vercel (équipe `navlys`)
| Projet | Domaine | État | Verdict |
|---|---|---|---|
| navlys-app | navlys.com, www.navlys.com | READY | GARDER (canonique NAVLYS) |
| navlys-teaser | navlys-teaser.vercel.app | READY | RETIRER |
| brunopartouche-com | brunopartouche-com-navlys.vercel.app | ERROR/404 | SUPPRIMER |

### Netlify (équipe `bpartouche46`)
| Site | URL | HTTP | Contenu | Verdict |
|---|---|---|---|---|
| novafinanceclub | brunopartouche.com / novafinanceclub.netlify.app | 200* | Site perso (détient le domaine) | CANDIDAT canonique perso |
| nova030501 | nova030501.netlify.app | 200 | NOVA Finance Club | doublon |
| subtle-cheesecake-9ca88e | …netlify.app | 200 | Trading discipliné 90/10 | doublon |
| elaborate-dragon-db18af | …netlify.app | 200 | Trading discipliné 90/10 | doublon |
| bucolic-unicorn-1e39d3 | …netlify.app | 200 | EN · Financial Strategist | doublon (EN) |
| brunopartouche-nova | …netlify.app | 200 | Trading Lab + NOVA | doublon |
| phenomenal-raindrop-c6e552 | …netlify.app | 200 | Stratège méditerranéen | doublon |
| peppy-sunshine-51f50e | …netlify.app | 200 | Stratège méditerranéen | doublon |
| ubiquitous-sherbet-7cafd2 | …netlify.app | 200 | « Navlys — Ma méthode » | doublon NAVLYS égaré |
| silly-gecko-b96a17 | …netlify.app | 404 | — | MORT |

\* 200 sur le sous-domaine .netlify.app ; le domaine `brunopartouche.com` ne pointe pas dessus.

## Questions à trancher
- **Q1** — Hôte du site perso : Netlify (réparer DNS) ou migration Vercel ?
- **Q2** — « NOVA Finance Club » = brunopartouche.com (1 site) ou marque/3ᵉ site séparé ?
- **Q3** — Feu vert pour supprimer les déploiements jetables (liste ci-dessus) une fois le canonique choisi ?
- **Q4** — Local : archiver les 7 dossiers `*_files`, les variantes teaser et les `.zip` de packs dans `_ARCHIVE/` ?

## Règle d'or
Un seul projet en ligne par site. Une seule source locale par site. Tout le reste → `_ARCHIVE/` (jamais supprimé sans ton OK). Aucune variable d'environnement ni token n'est stockée en clair.
