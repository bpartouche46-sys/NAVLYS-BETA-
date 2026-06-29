# 🚀 MÉMO DÉPLOIEMENT — CLIC PAR CLIC (pour Bruno)

> But : finaliser **de ton côté** ce que Claude ne peut pas faire (egress bloqué + sources live
> non versionnées + tes identifiants). Tout est **déjà préparé** ; il ne reste qu'à exécuter.
> Date de référence figée : **1ᵉʳ juillet 2026, 00:00 (heure de Paris)** = `2026-06-30T22:00:00Z`.
> ⏱️ Temps estimé total : ~20-30 min.

---

## ✅ AVANT DE COMMENCER (2 min)

- [ ] Être sur **l'ordinateur qui a le code source des sites** (l'ancien PC / dossier source Vercel,
      utilisateur Vercel `claudenavlys` — cf. `docs/CARTE-SITES.md`).
- [ ] Avoir **Vercel CLI** connecté (`vercel login` si besoin, équipe **NAVLYS**).
- [ ] Faire une **copie de sauvegarde** du dossier de chaque site avant de toucher un fichier
      (copier-coller le dossier, suffixe `_backup_2026-06-29`).

---

## 🟥 POINT 1 — Déployer les corrections de CONFORMITÉ (le plus urgent)

Les fichiers corrigés sont prêts dans **`corrections-pretes/`**. On remplace, on diff, on déploie, on vérifie.

### 1.A — navbiolife.com (projet Vercel `navbio`)
1. [ ] Ouvrir le dossier source du projet `navbio`.
2. [ ] **Remplacer `index.html`** par `corrections-pretes/navbiolife.com/index.html`
       → corrige la meta **« Jérusalem »**, le commentaire JS, et recale le **compte à rebours** sur le 1ᵉʳ juillet.
3. [ ] **Ajouter** `cgu.html` et `privacy.html` (depuis `corrections-pretes/navbiolife.com/`) aux routes `/cgu` et `/privacy` (corrige les 404).
       ⚠️ Compléter à la main (hors Git) : `[ÉDITEUR]`, `[EMAIL DE CONTACT]`, `[HÉBERGEUR]` — **identité publique uniquement, jamais l'entité confidentielle**.
4. [ ] **Diff** rapide avant/après : seuls ces points doivent changer.
5. [ ] Déployer : `vercel --prod` (depuis le dossier du projet).
6. [ ] **Vérifier en prod** : plus de « Jérusalem » dans la meta ; `/cgu` et `/privacy` répondent (plus de 404) ; le compteur décompte vers le 1ᵉʳ juillet.

### 1.B — brunopartouche.com (projet Vercel `brunopartouche`)
1. [ ] **Remplacer `bio.html`** par `corrections-pretes/brunopartouche.com/bio.html`
       → retire **« +8 à 12 % »** et ajoute le **disclaimer conformité**.
2. [ ] Page d'accueil (home) : appliquer **P-02** de `corrections-pretes/PATCH-comptes-a-rebours.md`
       (CTA « 1ᵉʳ juin » → « 1ᵉʳ juillet », carte lancement, compteur cible `2026-06-30T22:00:00Z`).
3. [ ] Déployer : `vercel --prod`.
4. [ ] **Vérifier en prod** : `/bio` sans « +8 à 12 % » + disclaimer présent ; home affiche « 1ᵉʳ juillet ».

### 1.C — navlys-teaser (projet Vercel `navlys-teaser`) — optionnel mais recommandé
1. [ ] Appliquer **P-01** de `corrections-pretes/PATCH-comptes-a-rebours.md` (compteur → `2026-07-01T00:00:00`).
2. [ ] (Cohérence charte) remplacer `#5fe0ff` par `#7DD3FC` (P-01b).
3. [ ] Déployer + vérifier le décompte.

### 1.D — Contrôle conformité AVANT chaque `vercel --prod` (rappel ERR-003/005)
Sur chaque fichier modifié (**HTML, JS ET CSS**), vérifier l'**absence** de :
- [ ] « Israël », « Jérusalem », « Jerusalem », « Ashkelon » ;
- [ ] toute promesse de rendement (« % par an », « rendement garanti »…) ;
- [ ] vocabulaire interdit (conseil patrimonial, cabinet, CIF, ORIAS, gestion de patrimoine, recommandation d'investissement, clientèle) ;
- [ ] présence du **disclaimer** (éducation/veille, risque de perte en capital, 18+).

---

## 🟥 POINT 2 — SÉCURITÉ (tes identifiants — 10 min)

### 2.A — Révoquer le token Vercel exposé
1. [ ] Aller sur **vercel.com → Account Settings → Tokens** (https://vercel.com/account/tokens).
2. [ ] **Supprimer** le token qui a fuité (cf. `_MASTER_NAVLYS_NOW.md`).
3. [ ] Si un token est nécessaire ailleurs : en **créer un nouveau**, le stocker **hors Git** (gestionnaire de secrets / `.env` local non versionné).

### 2.B — Finir la révocation « Hermès » (cf. `docs/PASSATION-HERMES.md`)
- [ ] **GitHub** : révoquer le Personal Access Token utilisé par Hermès (github.com → Settings → Developer settings → Tokens).
- [ ] **SSH** : retirer la clé publique Hermès des serveurs (`~/.ssh/authorized_keys`).
- [ ] **OAuth** : révoquer les autorisations OAuth Hermès.
- [ ] **Supabase** : régénérer la clé `service_role` si Hermès y avait accès (Supabase → Project Settings → API).

### 2.C — Hetzner (décision)
- [ ] Décider : **garder ou arrêter** le serveur Hetzner (legacy, 0 conteneur actif).
- [ ] Si gardé : changer le mot de passe du cockpit, passer en **HTTPS**, faire un **snapshot**.
- [ ] Si arrêté : snapshot final + sauvegarde `/root/navlys/` avant extinction.

---

## 🟧 DÉCISIONS À VERROUILLER (à trancher quand tu peux)

| Sujet | Options | Note |
|-------|---------|------|
| **Prix** | 8,99/14,99/24,99 · 29,99/39,99/49,99 · 49 €/490 €/39 € | 3 grilles coexistent → **arbitrage argent = toi** |
| **Entité juridique** | FR / société IL / les deux | Verrou pour Stripe, factures, CGU |
| **Date** | ✅ déjà figée : **1ᵉʳ juillet 2026** | rien à trancher |
| **Slogan** | ✅ officiel : « Ma méthode — Ton argent — Ton rythme » | rien à trancher |
| **Charte** | ✅ Ice Blue **#7DD3FC** | corriger les `#5fe0ff` résiduels |

---

## 🏁 APRÈS DÉPLOIEMENT (3 min)
- [ ] Re-vérifier chaque page corrigée **en prod** (re-fetch + relire les points conformité).
- [ ] Mettre à jour `docs/ETAT-DES-LIEUX.md` (ce qui est passé en prod + date réelle).
- [ ] Toute erreur rencontrée → la consigner dans `docs/JOURNAL-ERREURS.md` avec son garde-fou.

---

*Mémo généré le 2026-06-29. Sources : `corrections-pretes/MEMO-DEPLOIEMENT.md`, `corrections-pretes/README.md`,
`corrections-pretes/PATCH-comptes-a-rebours.md`, `docs/POINT-COMPLET-2026-06-29.md`, `docs/PASSATION-HERMES.md`.
Aucune action sensible déclenchée par Claude : ce document est une checklist pour Bruno.*
