# MÉMO DE DÉPLOIEMENT — corrections prêtes (à faire APRÈS feu vert prod)

> But : déployer en une fois, proprement, tout ce qui a été préparé et validé.
> ⚠️ **Aucun déploiement ne se fait sans le feu vert explicite de Bruno.**
> Les fichiers/patchs sont dans **`corrections-pretes/`**. Date d'ouverture de
> référence : **1ᵉʳ juillet 2026, 00:00 (heure de Paris)**.

---

## 0. Avant de commencer (préparation)

- [ ] Lire `docs/JOURNAL-ERREURS.md` + `docs/CHECKLIST-SECURITE.md` (règle d'or).
- [ ] Être sur l'**ordinateur qui a le code source** des sites (déploiements `source: cli`,
      utilisateur Vercel `claudenavlys` — voir `docs/CARTE-SITES.md`).
- [ ] **Snapshot/sauvegarde** du dossier source de chaque site avant de toucher quoi que ce soit.
- [ ] Compléter les **mentions d'éditeur** dans les pages légales (voir §1.C) — **hors Git**.

---

## 1. navbiolife.com (projet Vercel `navbio`)

### A. Page d'accueil — remplacer `index.html`
- Source : `corrections-pretes/navbiolife.com/index.html`
- Corrige : **C-01** (meta sans « Jérusalem »), **C-02** (commentaire JS), **compte à rebours**
  recalé sur `2026-06-30T22:00:00Z` (= 1ᵉʳ juillet 00:00 Paris), textes « 1ᵉʳ juillet ».
- [ ] **Diff** contre l'`index.html` actuel du projet → vérifier que **seuls** ces points changent.
- [ ] Remplacer le fichier.

### A bis. `launch-offer.js` — retirer « Jérusalem » + réancrer (P-04, ERR-005)
- Source du correctif : `corrections-pretes/PATCH-comptes-a-rebours.md` → **P-04**
- [ ] Retirer toute mention « Jerusalem / Jérusalem » et réancrer l'escalator sur le 1ᵉʳ juillet.
- [ ] (Fichier brut de référence : `sauvegarde-sites/_assets-moteur/launch-offer.js`.)

### B. Pages légales — ajouter `/cgu` et `/privacy` (corrige les 404)
- Sources : `corrections-pretes/navbiolife.com/cgu.html` et `privacy.html`
- [ ] Les déposer aux routes `/cgu` et `/privacy` (même mécanisme que `/bio` ailleurs :
      fichier `cgu.html` / `privacy.html` servi en URL propre, ou dossier selon la config du projet).

### C. ⚠️ À compléter dans cgu.html ET privacy.html (hors Git)
- [ ] `[ÉDITEUR — à compléter]` → identité de l'éditeur **publique** (⚠️ PAS l'entité
      confidentielle ; cf. règle « entité juridique jamais publique »). Décider quelle
      identité publier (ex. nom commercial) — **décision de Bruno**.
- [ ] `[EMAIL DE CONTACT — à compléter]` → e-mail de contact.
- [ ] `[HÉBERGEUR — à compléter]` → mention hébergeur.
- [ ] Idéalement : **relecture juridique** des deux pages.

### D. Déployer + vérifier
- [ ] Déployer le projet `navbio` en production.
- [ ] Vérifier en prod : meta sans « Jérusalem » ; `/cgu` et `/privacy` répondent (plus de 404) ;
      compteur décompte vers le 1ᵉʳ juillet.

---

## 2. brunopartouche.com (projet Vercel `brunopartouche`)

### A. Page bio — remplacer `bio.html`
- Source : `corrections-pretes/brunopartouche.com/bio.html`
- Corrige : **C-03** (retrait « +8 à 12% par an »), **C-04** (ajout du disclaimer conformité),
      date « 1ᵉʳ juillet ».
- [ ] **Diff** contre la `/bio` actuelle → seuls ces points doivent changer.
- [ ] Remplacer le fichier.

### B. Page d'accueil (home) — appliquer le patch
- Source : `corrections-pretes/PATCH-comptes-a-rebours.md` → **P-02**
- [ ] CTA héro « ✨ Lancement 1ᵉʳ juin » → « 1ᵉʳ juillet ».
- [ ] Carte lancement « 1ᵉʳ juin 2026 » → « 1ᵉʳ juillet 2026 ».
- [ ] Compteur (script en bas de page) : cible → `2026-07-01T00:00:00` (ou `2026-06-30T22:00:00Z`).

### C. Déployer + vérifier
- [ ] Déployer le projet `brunopartouche` en production.
- [ ] Vérifier en prod : `/bio` sans « +8 à 12% » + disclaimer présent ; home affiche
      « 1ᵉʳ juillet » et le compteur décompte correctement.

---

## 3. navlys-teaser.vercel.app (projet Vercel `navlys-teaser`)

- Source : `corrections-pretes/PATCH-comptes-a-rebours.md` → **P-01**
- [ ] Compteur : `new Date('2026-06-15T00:00:00')` → `new Date('2026-07-01T00:00:00')`.
- [ ] (Optionnel cohérence charte) Ice Blue `#5fe0ff` → `#7DD3FC` (P-01b).
- [ ] Déployer + vérifier le décompte.

---

## 4. Ne PAS toucher (pour ce lot)
- **navlys.io** : OK (juste « BETA juin S2 » soft, optionnel — P-03).
- **brunopartouche-teaser.vercel.app** : 404 / non-live.
- **navlys.com** (navlys-app) : appli protégée (403), hors de ce lot.

---

## 5. Contrôle conformité global AVANT chaque déploiement (rappel ERR-003 + ERR-005)
Sur chaque fichier modifié — **HTML, JS ET CSS** (pas seulement le HTML — cf. ERR-005) —
vérifier l'**absence** de :
- [ ] « Israël », « Ashkelon », « Jérusalem », « Jerusalem » ;
- [ ] toute **promesse de rendement** (chiffre « % par an », « rendement garanti »…) ;
- [ ] vocabulaire interdit (conseil patrimonial, cabinet, CIF, ORIAS, gestion de patrimoine,
      recommandation d'investissement, clientèle) ;
- [ ] présence du **disclaimer** (bandeau + pied de page selon la page).

## 6. Après déploiement
- [ ] Re-vérifier chaque page en prod (idéalement re-fetch et grep des points ci-dessus).
- [ ] Mettre à jour `docs/ETAT-DES-LIEUX.md` (ce qui est passé en prod + date réelle).
- [ ] Si une erreur survient : la consigner dans `docs/JOURNAL-ERREURS.md` avec son garde-fou.
