# ⚓ DOSSIER JURIDIQUE NAVBIO LIFE — INDEX
_Le Notaire de Bord NAVLYS · 29 mai 2026 · J-3 BETA 1ᵉʳ juin 2026_

## 📚 Documents livrés (10)

| # | Fichier | Objet | Public cible |
|---|---|---|---|
| 01 | `01_CGU_NAVBIO_v1.md` | Conditions Générales d'Utilisation FR/EN | Utilisateur + avocat |
| 02 | `02_POLITIQUE_CONFIDENTIALITE_NAVBIO.md` | Politique RGPD FR/EN | Utilisateur + DPO + CNIL |
| 03 | `03_CONTRAT_BONNE_CONDUITE_NAVBIO.md` | Engagement signé au signup | Utilisateur |
| 04 | `04_KIT_FLOUTAGE_AUTOMATIQUE.md` | Spec technique IA détection visages | Équipe dev |
| 05 | `05_DECHARGE_LIABILITY_NAVLYS.md` | Clauses non-responsabilité | Avocat + Utilisateur |
| 06 | `06_AVERTISSEMENTS_UI_NAVBIO.md` | Bibliothèque modaux & banners | Équipe UX + dev |
| 07 | `07_GUIDE_PHOTOS_PERSONNES_CONNUES.md` | Arbre de décision utilisateur | Utilisateur |
| 08 | `08_BIBLE_JURIDIQUE_UNIFIEE_NAVLYS.md` | Footer commun 4 sites + 2 apps | Tous |
| 09 | `09_FAQ_JURIDIQUE_PUBLIC.md` | 20 Q/R rassurantes | Utilisateur |
| 10 | `10_INTEGRATION_APP_NAVBIO_SPEC.md` | Spec intégration dans `_APP_NAVBIO_v1/` | Équipe dev |

## 🎯 État de readiness juridique NAVBIO

| Bloc | Statut | Notes |
|---|---|---|
| Architecture E2E zero-knowledge | ✅ déjà implémentée v1 | Atout majeur défensif |
| Statut hébergeur LCEN/DSA/CDA | ✅ documenté art. 6 CGU | Cohérent E2E |
| Floutage automatique IA | 🟡 spec prête, code à écrire | MediaPipe + OpenCV.js |
| Signature contrats au signup | 🟡 spec prête, code à écrire | SHA-256 ledger |
| Footer bible 4 sites + 2 apps | 🟡 spec prête, déploiement à faire | Cohérence cross-surface |
| RGPD complet (DPO, droits) | ✅ politique rédigée | DPO email à créer |
| AIPD (registre droit à l'oubli) | 🔴 à faire | Avant prod v1.5 |
| Validation avocat NTIC | 🔴 à faire | Plasseraud / Dreyfus / Bouchara |
| Tests E2E juridiques | 🟡 spec écrite | Playwright |
| Bilingue FR/EN | ✅ | Vague 2 multi-langue à faire |

**Readiness global juridique NAVBIO : ~75 %** (rédactionnel 95% / intégration code 50% / validation avocat 0%)

## 🛟 3 actions Bruno (priorité urgence J-3)

1. **Faire valider** le dossier par un avocat NTIC (recommandation : **Cabinet Bouchara** pour PI + droit à l'image, ou **Cabinet Dreyfus** pour pragmatisme tech + blog référence). Budget cible : 1.500-3.000 € pour relecture + redlines.
2. **Créer** les boîtes mail `legal@navlys.com` et `dpo@navlys.com` dans Google Workspace + activer transfert vers `bpartouche46@gmail.com`.
3. **Décider** de l'avocat-référent (un seul cabinet pour tout l'écosystème NAVLYS) et signer une convention d'honoraires pour interventions à la demande.

## 🚧 3 chantiers Claude (prochaines sessions)

1. **Intégration code dans `_APP_NAVBIO_v1/`** : écrire les composants `<LegalBible />`, `<ConsentModal />`, `<RuleReminder />`, `<FaceBlurPreview />`, créer les 11 routes `/legal/*`, brancher la table `legal_signatures`, livrer les tests Playwright (doc 10).
2. **Vague 2 multilingue juridique** : extension RU + ES + DE + IT des 10 documents en respectant le `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` (notamment formulations G1 et termes IOBSP par juridiction).
3. **Audit DSA Digital Services Act 2024** dédié : checklist de conformité art. 14 (CGU lisibles), art. 16 (notice-and-action), art. 27 (transparence pub), art. 28 (mineurs), art. 35 (AIPD), pour vérifier que NAVBIO est compatible même si sous le seuil VLOP.

## ⚓ Lien avec les autres documents NAVLYS

- Charte département : `_SITES_MASTER/_DEPARTEMENT_JURIDIQUE_charte.md`
- Audit marque : `_SITES_MASTER/_JURIDIQUE_NAVLYS_AUDIT_ANTERIORITE.md`
- Décision J3 marque : `_SITES_MASTER/_JURIDIQUE_NAVLYS_DECISION_J3.md`
- Glossaire multilingue : `_SITES_MASTER/_GLOSSAIRE_MULTILINGUE_NAVLYS.md`
- App cible : `_SITES_MASTER/_APP_NAVBIO_v1/`

---

*Index — Le Notaire de Bord NAVLYS · 29 mai 2026.*
