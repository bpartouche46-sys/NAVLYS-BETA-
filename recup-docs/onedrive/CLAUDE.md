# CLAUDE.md — Mémoire canonique projet (NAVLYS + Bruno Partouche)
_Dernière mise à jour : 25 mai 2026. À lire en début de session avant toute action sur les sites._

> ⚓🧭 **POINT D'ENTRÉE UNIQUE — DISPATCH.** Avant toute action, lis **`_NAVLYS_DISPATCH.md`** : c'est le lien maître qui relie toutes les conversations/départements entre elles, à la consolidation maître (`_NAVLYS_MASTER_INDEX.md`) et au routeur des 6 départements (`_NAVLYS_DEPARTEMENTS/`). Ce pointeur rend le lien **permanent** (CLAUDE.md est lu à chaque session).

## Qui
- **Bruno Mark Partouche** — bpartouche46@gmail.com (perso/Netlify/Vercel/Google), **email pro `bruno@navlys.com`** (Google Workspace, MX à préserver lors de toute bascule DNS).
- ⚠️ **PAS CIF, PAS ORIAS** (corrigé 26/05 par Bruno). Expérience pro finance / assurance / Microsoft / marketing, salarié Sela Logistics, skipper Méditerranée. Ton : simple, imagé, registre maritime.
- **Conséquence légale** : NAVLYS = **éditeur de contenu pédagogique** uniquement (comme un média finance). Aucun conseil personnalisé, aucune RTO, aucun apport d'affaires sur produits financiers réglementés. Affiliation brokers/banques = lien CPA publisher (légal sans agrément), pas « apporteur d'affaires » au sens IOBSP/CIF.

## Règle d'or : 1 projet par site, 1 page par teaser
| Marque | Domaine | Hôte canonique | Projet | Source locale |
|---|---|---|---|---|
| **NAVLYS** (écosystème d'apps) | navlys.com + www | **Vercel** | `navlys-app` (team NAVLYS `team_nBtY5FOQMPIT4J8Bmf7wvBSC`, slug `navlys`) | `Downloads/navlys/` (Next.js 14) |
| **Bruno Partouche** (perso) | brunopartouche.com + www | **Netlify** `novafinanceclub` (à terme : migrer Vercel) | teaser animé : Vercel `brunopartouche-teaser` → https://brunopartouche-teaser.vercel.app | `Downloads/brunopartouche-DEPLOY-v13-seo-polish_1/` |

## État en ligne (live)
- **navlys.com** = page unique (gate VERROUILLÉ) : logo animé vidéo + compte à rebours 31 mai 2026 (minuit Jérusalem) + fond espace (étoiles/planètes/étoiles filantes) + **cockpit au choix** (voilier/avion/vaisseau/voiture) + cartes « essayer » (Simulation, Résultats, News, Partenaires). FR/EN.
- **brunopartouche-teaser.vercel.app** = page unique : **médaille bronze 3D animée** + countdown + fond espace + « Finance · Méditerranée · Art de vivre ». FR/EN.
- brunopartouche.com (Netlify) affiche encore l'ANCIENNE page « bientôt » tant que le DNS n'est pas basculé.

## Fichiers clés (dans `navlys/public/`)
- `teaser.html` = la page unique NAVLYS (gate). Sauvegardes : `gate_countdown_only.bak.html`, `teaser_GENERIC_0524.bak.html`.
- `cockpit3.html` = cockpit 4 véhicules + étoiles-sites. `univers.html` = hub (/univers). `simulation.html` (ex simulateur.html), `resultats.html` (ex journal.html), `navlys-logo.mp4` + `navlys-logo-poster.png`.

## Logos animés (NE PAS recréer — ils existent)
- NAVLYS : `NAVLYS_LOGO_ANIME_PRO_PACK/logo_anime/` (+ `NAVLYS-logo-profil-1080.mp4`).
- Bruno Partouche : `BP_LOGO_PACK/logo_anime/` → **`bp_piece_3d.html`** (médaille 3D, reco héros), `bp_logo_anime.html` (cinématique), poster `bp_coin_poster.png`.

## Charte unique
Bronze `#B87333` / or `#C9A961` · **ICE BLUE `#7DD3FC`** · nuit `#02040a` · pearl `#F2F4F7`. Polices : **Cinzel** (titres) + **Cormorant Garamond** (corps) + **JetBrains Mono** (chiffres/labels).

## Modèle éco (rappel · corrigé 26/05)
Abonnement **NAVLYS NEXT GEN INVEST** 49 €/mois ou 490 €/an (contenu pédagogique, accès calculateurs) · **NAVBIO Life** one-shot (Solo 19/Couple 29/Premium 39/Cinéma 149/Pro 199 €) + add-ons à la carte · **affiliations brokers/banques en mode publisher** (lien CPA simple, comme un blog/YouTuber, sans agrément requis). **PAS d'apport d'affaires ORIAS/IOBSP** (Bruno non enregistré). **Comptes affiliés à ouvrir sous `bruno@navlys.com`.** Plan financier complet : `NAVLYS_PLAN_FINANCIER_PACK/`.

## Déploiement (méthode qui marche)
- CLI Vercel locale : `/tmp/vdir/node_modules/.bin/vercel` (npm i local, pas -g → perms). Token Vercel en **variable d'env uniquement, JAMAIS en clair persistant**.
- `cd navlys && vercel deploy --prod --yes --token=$VT --scope navlys`. Build serveur ; poller l'API pour READY.
- ⚠️ **Ne JAMAIS enchaîner des déploiements rapprochés** (cause des 404 transitoires + builds ERROR concurrents). Un seul à la fois, attendre READY.

## Veille
Tâche planifiée **`veille-infra-navlys`** (lundis 8h) : photo Netlify+Vercel + **contrôle SSL** des domaines clés + détection doublons/builds cassés. Rapports dans `NAVLYS_PILOTAGE/veille/`. Observation seule.

## Interdits / prudence
- ❌ Ne pas déverrouiller le gate (`NEXT_PUBLIC_LAUNCH_UNLOCKED` reste indéfini) avant le 31 mai.
- ❌ Pas de token/secret en clair dans un fichier.
- ❌ Pas de suppression en ligne sans OK explicite (sauvegarder d'abord).
- ✅ brunopartouche.com : Bruno a autorisé l'intégration des animations (25/05). DNS Namecheap = action de Bruno (A `@`→`216.198.79.1`, CNAME `www`→`cname.vercel-dns.com`, GARDER les MX Google).

## Incidents résolus
- 24/05 : navlys.com ERR_CONNECTION_CLOSED = certificat SSL non émis → réémis (Let's Encrypt). Veille renforcée d'un check SSL.
- 24/05 : ménage Netlify 10→1 sites ; doublon Vercel `brunopartouche-com` supprimé.
