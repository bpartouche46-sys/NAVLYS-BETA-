# Plan d'enrichissement du site central (navlys.com)

> Synthèse actionnable pour demain. Basée sur l'inventaire (`docs/INVENTAIRE-ARGUMENTS-SITES.md`)
> + l'assimilation Drive (`docs/ASSIMILATION-DRIVE-2026-06-23.md`). **Rien n'est déployé** — ce
> sont des propositions ; Bruno valide et déploie.

## Règles à respecter (issues du MASTER)
- navlys.com = **Bruno invisible** (3ᵉ personne). **« Méditerranée » + « Israël/Ashkelon » interdits.**
- Charte **#000 + #7DD3FC + bronze**, zéro pourpre. Slogan **« Ma méthode · Ton argent · Ton contrôle. »**
- **Zéro promesse de rendement** ; chiffres de risque OK.

## Les 13 enrichissements (du plus utile au moins urgent)
| Prio | Bloc à ajouter | Source | Emplacement proposé |
|---|---|---|---|
| 1 | **FAQ « Questions honnêtes »** (« je donne une méthode, pas une promesse » ; « le crash est ton ami ») | brunopartouche | Section FAQ sur l'accueil |
| 2 | **Pages légales** CGU / Confidentialité / Mentions | `contenu/legal/` | `/cgu` `/privacy` `/mentions` (rebouche les 404) |
| 3 | **Manifeste mémoire/transmission** (« le rire qu'on raconte 30 ans après… ») | navbio | Bloc Next Gen de l'accueil |
| 4 | **Module « Pouls du marché » live** (BTC/ETH + EUR/USD, gratuit) | finance-journal | Accueil ou /finance |
| 5 | **Maximes** « Le pourcentage séduit. L'euro décide. » | finance-journal | Pull-quotes accueil/finance |
| 6 | **Punchline signature** « L'IA, c'est le vent. Toi, t'es la barre… Sois aware. » | créée 23/06 | Hero / footer |
| 7 | **Page `/methode`** : 90/10 détaillée + principes de prudence | MASTER §6 | Nouvelle page |
| 8 | **Page `/partenaires`** : les 19 partenaires catégorisés | navlys.io | Nouvelle page (404 actuelle) |
| 9 | **Kit social E1** (bios, calendrier, posts) | `contenu/E1-...` | Hors-site (réseaux) |
| 10 | **WhatsApp direct** « pas de chatbot » | brunopartouche | Contact accueil |
| 11 | **Accessibilité** (texte XL / contraste / zoom) | brunopartouche | Composant global |
| 12 | **Adages cosmiques** (« L'humain au centre. Toujours. ») | teaser | Bandeau citations |
| 13 | **Page `/bruno`** (récit fondateur) | bio | ⚠️ bp.com plutôt que navlys.com (doctrine 2 univers) |

## Corrections conformité à intégrer en même temps
- 🔴 Retirer « **NAVFIN** » de l'accueil → « NAVLYS Finance ».
- 🔴 Aligner la charte des sites live **#5fe0ff → #7DD3FC**.
- 🔴 Neutraliser « **+8 à 12 %/an** » (bio) et « **Jérusalem** » (navbiolife) — déjà documenté.
- 🟠 Figer **une seule grille tarifaire** (F1–F3 vs F1–F4) et **une seule date** de lancement (1ᵉʳ juillet).

## Méthode suggérée (demain)
1. Partir du source archivé `historique/sources/navlys.com/index.html`.
2. Ajouter prio 1 → 6 (faible risque, fort impact) dans un **brouillon** `sites/navlys.com/index.html`.
3. Contrôle conformité (grep termes interdits + zéro promesse) avant tout.
4. Bruno relit → déploie.
