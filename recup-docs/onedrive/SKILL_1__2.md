---
name: veille-infra-navlys
description: VEILLE INFRA UNIQUE (hebdo, lundi) : Netlify + Vercel + SSL/DNS + doublons de marque. Seule veille active (les 2 autres en pause).
---

⚡ ÉTAPE 0 — TEST DE CONNEXION INTERNET (obligatoire, AVANT toute autre action) : teste l'accès réseau (bash : `curl -s -m 8 -o /dev/null -w "%{http_code}" https://www.google.com`). Si le test échoue (pas d'internet) : ARRÊTE-TOI immédiatement et proprement. Rends UNE seule ligne : « ⚠️ Pas de connexion internet — run sauté proprement, rien à signaler. — MasterNav » et RIEN d'autre : pas de rapport incomplet, pas de message d'erreur, pas de tentatives en boucle. Ce n'est PAS une erreur, c'est un saut volontaire.

VEILLE INFRASTRUCTURE NAVLYS — exécution autonome, LECTURE SEULE, NE RIEN SUPPRIMER, NE RIEN DÉPLOYER. C'est LA seule veille infra active (veille-sites-navlys et veille-etat-des-lieux-navlys sont en pause car redondantes).

Objectif : tenir à jour la "photo" de tout ce qui est en ligne pour Bruno (bpartouche46@gmail.com) et signaler toute dérive : nouveau site/projet, doublon (surtout de marque entre plateformes), déploiement en erreur, site sans déploiement, conflit de domaine, ET certificat SSL manquant/expirant.

CIBLE « 1 projet unique par site » (règle gravée) :
- Site A = NAVLYS -> navlys.com -> CANONIQUE = Vercel "navlys-app" (gate verrouillé NEXT_PUBLIC_LAUNCH_UNLOCKED=false).
- Site B = Bruno Partouche (perso) -> brunopartouche.com -> LIVE sur Netlify "novafinanceclub" (A -> 75.2.60.5). Tout autre déploiement du même nom est un doublon à arbitrer.
- Référence : C:\Users\BP\OneDrive\Documents\Documents\Downloads\_NAVLYS_CONSOLIDATION\PLAN_1_PROJET_PAR_SITE.md et _NAVLYS_MASTER_INDEX.md.

OUTILS (charger via ToolSearch si besoin) :
- Connecteur Netlify (tools "netlify-*") : get-projects avec teamSlug "bpartouche46".
- Connecteur Vercel (tools "list_projects"/"list_teams") : team NAVLYS (team_nBtY5FOQMPIT4J8Bmf7wvBSC).
- bash : contrôle SSL/DNS. Write/Read pour les fichiers.

ÉTAPES :
1. Lire la baseline : C:\Users\BP\OneDrive\Documents\Documents\Downloads\NAVLYS_PILOTAGE\veille\derniere_photo.json
2. Récupérer la photo du jour (Netlify + Vercel).
3. CONTRÔLE SSL (cause de l'incident 24/05) : pour navlys.com, www.navlys.com, brunopartouche.com, faire un handshake TLS avec timeout court (`echo | timeout 12 openssl s_client -connect DOMAINE:443 -servername DOMAINE 2>/dev/null | openssl x509 -noout -subject -dates`) et vérifier certificat servi + non expiré (< 15 j = ALERTE). Vérifier l'absence d'AAAA fantôme (`dig +short AAAA navlys.com @8.8.8.8`). Résoudre l'A de brunopartouche.com et ALERTER s'il quitte Netlify (75.2.60.x) ou retombe sur un parking Namecheap (192.64.119.x).
4. Comparer à la baseline : projets AJOUTÉS / SUPPRIMÉS, déploiements en ERROR, sites sans deploy, conflits de domaine.
5. DOUBLON DE MARQUE (vigilance n°1 actuelle) : compter les déploiements dont le nom contient "brunopartouche" sur Netlify ET Vercel. Au 25/05 : Netlify "novafinanceclub" (LIVE, détient le domaine) + Vercel "brunopartouche" + Vercel "brunopartouche-teaser" = 3 quais pour un seul site perso. SIGNALER ce doublon et rappeler : ne JAMAIS accrocher brunopartouche.com à un projet Vercel tant qu'il vit sur Netlify (sinon on rejoue la panne SSL du 24/05). Signaler aussi si navlys-teaser reste séparé de navlys-app.
6. Écrire un rapport court FR horodaté : C:\Users\BP\OneDrive\Documents\Documents\Downloads\NAVLYS_PILOTAGE\veille\veille_AAAA-MM-JJ.md. Structure : (a) ALERTES en tête ; (b) Santé SSL ; (c) Changements depuis la dernière photo ; (d) Récap Netlify ; (e) Récap Vercel ; (f) Doublons de marque + décisions de consolidation en attente.
7. Mettre à jour derniere_photo.json (conserver les champs "garder"/"role" déjà décidés).
8. Langage simple, registre maritime, tutoiement. Ne jamais exposer de token/secret. Observer seulement.
9. Terminer par une notification de 2-3 lignes : nb de sites/projets en ligne, nb d'alertes, action n°1 recommandée.

RAPPEL INCIDENT 24/05/2026 : navlys.com est tombé en ERR_CONNECTION_CLOSED car Vercel n'avait pas émis le certificat SSL (apex + www) après un remue-ménage de domaines. Réparé en réémettant le certificat. La veille doit détecter ce type de panne tôt. Si un connecteur est indisponible au run (mais internet OK), le noter et faire la veille sur ce qui est accessible.