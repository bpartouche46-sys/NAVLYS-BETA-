---
name: veille-etat-des-lieux-navlys
description: [EN PAUSE — doublon de veille-infra-navlys] Régénérait la PHOTO (redondant). Consolidé dans veille-infra-navlys (NAVLYS_PILOTAGE/veille/).
---

VEILLE NAVLYS — état des lieux (tâche autonome, lecture seule, NE RIEN SUPPRIMER NI DÉPLOYER).

But : tenir à jour la "photo" de tout ce qui existe pour Bruno Partouche (sites en ligne + dossiers locaux), et signaler tout changement depuis la dernière fois.

Étapes :
1. NETLIFY — via l'outil MCP Netlify (netlify-team-services-reader get-teams puis netlify-project-services-reader get-projects, teamSlug "bpartouche46") : liste tous les sites (nom, URL, domaine, état du dernier deploy).
2. VERCEL — via l'outil MCP Vercel (list_teams puis list_projects, team "navlys" / team_nBtY5FOQMPIT4J8Bmf7wvBSC) : liste tous les projets.
3. DNS — via bash : `getent hosts brunopartouche.com www.brunopartouche.com navlys.com www.navlys.com` (et `host`). Note vers quoi pointe chaque domaine (Vercel 216.198.79.1/76.76.21.21 · Netlify 75.2.60.5 · Namecheap parking 192.64.119.x).
4. LOCAL — via bash sur /sessions/.../mnt/Downloads (= OneDrive Downloads) : `find . -maxdepth 1 -type d` et compteurs (dirs, files, zips). Repère nouveaux dossiers et doublons.
5. Compare au fichier précédent `_ETAT_DES_LIEUX_NAVLYS/PHOTO_ETAT_DES_LIEUX.md` et au CSV `_ETAT_DES_LIEUX_NAVLYS/inventaire_en_ligne.csv`. 
6. Réécris `_ETAT_DES_LIEUX_NAVLYS/inventaire_en_ligne.csv` (snapshot du jour) et ajoute en haut de `PHOTO_ETAT_DES_LIEUX.md` une section datée "## 🔔 Changements détectés le AAAA-MM-JJ" listant : nouveaux sites/projets, sites disparus, changements DNS (surtout si brunopartouche.com ou navlys.com se branchent enfin sur Vercel/Netlify), nouveaux dossiers locaux.
7. Donne à Bruno un message court (5-8 lignes, français, ton maritime simple) : ce qui a changé, et les décisions encore en attente (plateforme unique pour brunopartouche.com, suppression des 7 sites Netlify brouillons, branchement DNS navlys.com).

Contraintes : lecture seule. Ne supprime aucun site, ne change aucun DNS, ne déploie rien. Tu prépares la décision, Bruno exécute.