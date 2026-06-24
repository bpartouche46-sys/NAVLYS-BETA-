# Rapport de nuit — Design v2 décliné sur les 4 sites

> Travail autonome (consigne Bruno : « avance cette nuit à fond »). Rien en prod, rien d'irréversible.

## Ce qui a été fait
1. **Système de design commun** : `assets/navlys-v2.css` + `assets/navlys-v2.js`
   (cinéma incurvé + rideaux velours, barre d'icônes, playlist, compte à rebours flashy, charte ice blue).
2. **4 maquettes de sites** (design cinéma + contenu conforme) :
   - `sites/navlys.com/index.html` — le hub (jeu · plaisir · bien-être) + `/cgu` + `/privacy`.
   - `sites/brunopartouche.com/index.html` — Bruno + **bouton « Écoutez Bruno »** (audio au clic, autoplay muet).
   - `sites/navbiolife.com/index.html` — NAVBIO + **`/cgu` et `/privacy` créées** (fix des 404) + **« Jérusalem » retiré**.
   - `sites/navlys.io/index.html` — l'écosystème & partenaires affiliés.
3. **Hub d'aperçu** : `index.html` (racine) liste et ouvre les 4 maquettes + le prototype.
4. **Contrôle conformité automatique : VERT**
   - 0 terme interdit · 0 promesse chiffrée · 0 « Israël/Ashkelon/Jérusalem » · disclaimer bandeau+pied de page partout · texte à gauche.

## Limites assumées (à traiter avec Bruno)
- **Contenu = première passe conforme**, pas le texte exact des sites actuels (le vrai code n'est pas dans Git). À affiner.
- **Vidéos** : seule `navlys.com/media/presentation.mp4` est branchée (la vraie). Les autres « présentations » du cinéma sont des emplacements vides → fournir les URLs.
- **Pages légales** = versions provisoires, à valider juridiquement.
- **Liens internes** (`/bio`, `/cgu`…) sont en chemins absolus : justes une fois chaque site sur son domaine ; dans l'aperçu combiné ils pointent vers la racine.
- **Rien n'est déployé.** Pour voir en ligne : importer le repo sur Vercel (cf. `docs/ETAT-DES-LIEUX.md`).

## À décider demain
1. Menu icônes : haut + bas (actuel) ou bas seul.
2. Rideaux : velours bleu/champagne (charte) ou variante rouge.
3. Vidéos des présentations (URLs / Drive / core Hetzner).
4. Ordre de mise en ligne + vraie date de lancement (les compte à rebours visent le 1ᵉʳ juillet 2026).
