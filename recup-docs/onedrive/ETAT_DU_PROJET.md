# ÉTAT DU PROJET — _SITES_MASTER
### (Fichier d'ancrage = la mémoire du projet. Source unique de vérité.)

> **À FAIRE EN PREMIER, à chaque nouvelle session :** dire à Claude
> « **lis ETAT_DU_PROJET.md** » → tout le contexte est rechargé d'un coup.
> Les conversations sont jetables ; CE fichier ne l'est pas.

- **Dernière mise à jour :** 2026-05-25
- **Statut global :** LOCAL — **rien n'est en ligne.** Aperçu = double-clic sur `index.html` (Chrome).
- **Propriétaire :** Bruno Mark Partouche · bpartouche46@gmail.com

---

## 0. LA RÈGLE ANTI-EMBROUILLE (la plus importante)
1. **UNE seule conversation** pour TOUT le projet « SITES » (navlys + bruno). On ne s'éparpille pas.
2. **Début de session :** « lis ETAT_DU_PROJET.md ».
3. **Fin d'un changement important :** « mets à jour ETAT_DU_PROJET.md ».
4. Si tu ouvres quand même un nouveau chat : pas grave — il suffit de redire « lis ETAT_DU_PROJET.md ».

---

## 1. LES DEUX SITES (cloisonnés — JAMAIS liés entre eux)
- **navlys.com/** = **LA MÉTHODE** (éducation). Aucun nom/photo de Bruno. Aucun lien vers brunopartouche.com.
- **brunopartouche.com/** = **L'HOMME** (la mer, la mémoire, l'art de vivre). Aucune mention NAVLYS, aucune
  méthode/offre/trading. Aucun lien vers navlys.com.
- Logo animé : même moteur partagé (`navlys-coin` côté NAVLYS / `coin-anim` côté BP), infrastructure neutre.

Titres actuels :
- navlys.com : « NAVLYS — Ta méthode, ton argent, ton rythme » (+ page `news.html`)
- brunopartouche.com : « Bruno Mark Partouche — La mer, la mémoire, l'art de vivre »

---

## 2. INVENTAIRE DES FICHIERS
### navlys.com/
- `index.html` (page principale, gate actif) · `news.html` (News & Veille)
- `manifest.webmanifest` · `sw.js` (PWA)
- `assets/` : `gate.js`, `i18n.js`, `space-bg.js`, `ticker.js`, `navlys-coin.js`,
  `navlys_coin_cut.png`, icônes (`icon-192/512.png`, `apple-touch-icon.png`, `favicon-64.png`), `optA.png`
- `HASHTAGS.md`

### brunopartouche.com/
- `index.html` (page principale, gate actif)
- `assets/` : `gate.js`, `i18n.js`, `space-bg.js`, `coin-anim.js`, `ticker.js`, `bp_coin_cut.png`
- `HASHTAGS.md`
- (Pas encore de PWA/manifest/sw ni de page secondaire de ce côté.)

---

## 3. CE QUI EST FAIT
- Consolidation locale des deux sites dans `_SITES_MASTER/` (24/05/2026).
- Fond animé « espace » (`space-bg.js`), pièce/logo animé, ticker, i18n FR/EN sur les deux.
- Gate de lancement sur les deux : compte à rebours vers le **1er juin 2026 00:00 (Asia/Jerusalem)**,
  capture email, bilingue FR/EN ; PWA + service worker côté navlys.
- **[25/05/2026] CODE D'ACCÈS ajouté sur les deux gates** (voir section 4).

---

## 4. GATE + CODE D'ACCÈS  (état au 25/05/2026)
- **CODE = `EQUIPAGE2026`** (insensible à la casse). Défini UNE fois en haut de chaque `assets/gate.js` :
  `var ACCESS_CODE = 'EQUIPAGE2026';` → pour changer le code, modifier cette seule ligne sur les 2 fichiers.
- **Clé de déverrouillage (localStorage) :** `navlys-access = 'ok'` (même clé sur les 2 sites, persistant).
- **Déverrouillage possible :**
  - via le champ « Code d'accès / Entrer » dans le gate ;
  - via l'URL `?code=EQUIPAGE2026` (alias accepté `?acces=EQUIPAGE2026`).
- L'ancien lien public « Aperçu du site → » a été **supprimé** : le public ne peut plus lever le flou sans le code.
- Mauvais code → message d'erreur discret bilingue. Compte à rebours/email/PWA conservés.
- ⚠️ Rappel honnête : gate **côté client** (code lisible dans `gate.js`, contournable via outils dev).
  Parfait pour un « coming soon », mais ce n'est PAS une sécurité serveur.
- Sauvegardes des `gate.js` d'origine : `/tmp/gatework/bak/` (session de travail).

---

## 5. CONFORMITÉ (NE PAS CASSER)
- Aucune mention « CIF / ORIAS / DFENSER ». Aucune promesse de rendement.
- Cadre : **éducation uniquement**, pas de conseil en investissement.
- Les deux sites restent **cloisonnés** (aucun lien croisé, aucune mention de l'un chez l'autre).

---

## 6. PROCHAINES ÉTAPES (dans l'ordre, sur ta validation)
1. [ ] Vérifier les deux sites en aperçu (double-clic `index.html`) avec le code `EQUIPAGE2026`.
2. [ ] Décider du contenu réel des pages (textes définitifs, sections).
3. [ ] Miroir EN complet + pages secondaires.
4. [ ] (Optionnel) Aligner brunopartouche.com sur la PWA (manifest + sw) comme navlys.
5. [ ] Déploiement + DNS (uniquement quand tout est validé).

---

## 7. NOTE TECHNIQUE — écriture sûre sur OneDrive
Le dossier est sur OneDrive : les gros écrits directs peuvent se corrompre (troncature / octets NUL).
**Méthode imposée pour Claude :** écrire dans `/tmp` → vérifier (taille, 0 octet NUL, fin de fichier,
`node --check` pour le JS) → copier vers le dossier → **relire** et comparer (`cmp` / `md5`) avant de confirmer.
