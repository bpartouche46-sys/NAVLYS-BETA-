# ⚓📣 AUDIT FAQ + ENCYCLOPÉDIE — Département Marketing & Communications
_28 mai 2026 · J-3 du lancement BETA · Audit à l'instant T_

> Mandat Bruno : « où en sommes-nous des FAQ et réponses prêtes dans les encyclopédies de NAVLYS ? est-ce effectif et fonctionnel à 100 % si je poste sur le site un mail ou un WhatsApp ? »
>
> **Réponse exécutive en une ligne** : **NON, ce n'est PAS fonctionnel à 100 %.** Il existe une seule FAQ honnête (bp.com) mais elle contient des **erreurs juridiques critiques** (CIF/ORIAS mentionnés à tort). Les 3 autres sites n'ont AUCUNE FAQ. L'encyclopédie NAVLYS est annoncée mais inexistante. Aucun système de réponse multi-canal n'est branché. **Plan de remise à plat ci-dessous, livrable J0.**

---

## 1. Cartographie de l'existant — 4 sites passés au crible

### 1.1 brunopartouche.com (Netlify legacy + Vercel teaser)

| Élément | Fichier | Statut | Note |
|---------|---------|--------|------|
| FAQ 10 questions | `Downloads/faq.html` | ⚠️ **EXISTE mais ERRONÉE** | Mentionne « statut CIF », « ORIAS en cours de renouvellement », « SIREN 482 511 292 ». **TOUT FAUX selon CLAUDE.md** (Bruno PAS CIF, PAS ORIAS). À réécrire intégralement. |
| Schema.org FAQPage | `faq.html` JSON-LD | ⚠️ Présent mais à corriger | Bon SEO mais véhicule l'erreur juridique. |
| FR/EN | — | 🔴 **FR uniquement** | Aucune version EN. |
| Mail de contact affiché | `bpartouche46@gmail.com` | ⚠️ Mauvais choix | Devrait être `bruno@navlys.com` (image de marque). |
| WhatsApp | — | 🔴 Aucun affiché | Pas de numéro. |
| Chat web | — | 🔴 Absent | Aucun widget chat. |
| Formulaire contact | — | 🔴 Absent | Pas de page contact dédiée. |

### 1.2 navlys.com (Vercel, gate verrouillé)

| Élément | Fichier | Statut |
|---------|---------|--------|
| FAQ | — | 🔴 **INEXISTANTE** |
| Encyclopédie NAVLYS | mentionnée dans pyramide | 🔴 **INEXISTANTE** (slot prévu, contenu zéro) |
| Glossaire | `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` | ✅ EXISTE (27 Ko) mais pas indexé publiquement |
| Contact | — | 🔴 Aucune page |
| Mail affiché | — | 🔴 Aucun |
| WhatsApp | — | 🔴 Aucun |

### 1.3 navlys.io (vitrine v6)

| Élément | Statut |
|---------|--------|
| FAQ | 🔴 Inexistante |
| Encyclopédie | 🔴 Inexistante |
| Contact | 🔴 Aucun |

### 1.4 navbiolife.com (teaser v4 compact)

| Élément | Statut |
|---------|--------|
| FAQ | 🔴 Inexistante |
| Encyclopédie biographie | 🔴 Inexistante |
| Contact | 🔴 Aucun |

---

## 2. Inventaire des sources de vérité éditoriale déjà produites (réutilisables)

Ces documents existent en interne — c'est la matière première pour générer FAQ + encyclopédie à J-3 → J0.

| Document | Statut | Utilisable pour |
|----------|--------|-----------------|
| `_CHARTE_EDITORIALE_CONDENSEE.md` | ✅ Prêt prod | Ton + tournures FAQ + encyclopédie |
| `_BP_TON_EDITORIAL.md` | ✅ Prêt prod | Voix Bruno |
| `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` | ✅ Prêt prod (27 Ko) | Encyclopédie : 40+ termes définis FR/EN |
| `_LABORATOIRE_NEXTGEN_manifeste.md` | ✅ Prêt prod | Article encyclopédie « Le Laboratoire » |
| `_MON_CAP_REVE_repositionnement.md` + moteur | ✅ Prêt prod | Article encyclopédie « MON CAP RÊVÉ » |
| `_CARTOGRAPHE_*` (4 docs) | ✅ Prêt prod | Article encyclopédie « Le Cartographe » |
| `_CAP_TACTIQUE_strategies.md` + UI spec | ✅ Prêt prod | Article encyclopédie « Le Cap Tactique » |
| `_BANQUES_LIENS_PARTENAIRES_CPA.md` | ✅ Prêt prod | Section FAQ « partenaires/affiliés » |
| `_E_REPUTATION_TEXTES_REMPLACEMENT.md` | ✅ Prêt prod | Textes de remplacement (bio, méthode) à reverser en FAQ |
| `_BANQUES_FLUX_ENCAISSEMENT.md` | ✅ Prêt prod | Réponse FAQ « comment je paie/résilie ? » |

**Conclusion** : matière première abondante (≈ 200 Ko de docs sérieux), il « suffit » de la mettre en forme FAQ + encyclopédie publique.

---

## 3. Couverture des sujets critiques (audit par thème)

| Thème | FR | EN | Cohérence G1 (PAS CIF/ORIAS) | Niveau |
|-------|----|----|------------------------------|--------|
| Méthode 90/10 | ⚠️ Mentionnée bp.com | 🔴 | ⚠️ tournures « conseil » à reformuler | Ébauche |
| Mon Cap Rêvé | 🔴 | 🔴 | ✅ docs internes OK | Inexistant public |
| Le Cartographe | 🔴 | 🔴 | ✅ docs internes OK | Inexistant public |
| Le Laboratoire NEXT GEN | 🔴 | 🔴 | ✅ manifeste OK | Inexistant public |
| Sécurité / RGPD | ⚠️ bp.com FAQ | 🔴 | ✅ | Ébauche |
| Conformité (PAS CIF / PAS ORIAS / publisher CPA) | 🔴 erreur active sur bp.com | 🔴 | 🔴 **CRITIQUE** | À corriger en urgence |
| Tarifs (49 €/mois, 490 €/an, NAVBIO one-shot) | 🔴 | 🔴 | ✅ | Inexistant public |
| Partenaires affiliés (mode publisher) | 🔴 | 🔴 | ✅ docs OK | Inexistant public |
| Contact (mail/WhatsApp) | 🔴 mauvais mail bp.com | 🔴 | — | Inexistant correct |
| BETA / 1er juin 2026 | 🔴 | 🔴 | ✅ | Inexistant public |
| NAV IA Chat (annoncé 2 juin) | 🔴 | 🔴 | ✅ | Inexistant — annonce sans support |

**Verdict** : 11 sujets critiques · 0 sur les 4 sites est ✅ prêt prod cohérent G1.

---

## 4. Templates de réponse / réponses préparées multi-canal

| Canal | Existant ? | Délai actuel théorique |
|-------|------------|------------------------|
| Mail entrant (`bpartouche46@gmail.com`) | ✅ existe, mais boîte perso non triée | Variable, manuel, **pas SLA** |
| Mail entrant `bruno@navlys.com` | ✅ MX Google actif | 🔴 aucun template, aucun auto-reply |
| WhatsApp | 🔴 aucun numéro affiché | — |
| Chat web | 🔴 aucun widget | — |
| Formulaire contact | 🔴 aucune page | — |
| Templates types (15 cas) | 🔴 inexistants | — |
| Auto-reply « accusé de réception 24 h » | 🔴 inexistant | — |
| Macros / canned responses | 🔴 inexistantes | — |

**Verdict** : à J-3 du lancement BETA, **aucun système de réponse multi-canal n'est branché**. Si un visiteur écrit ce soir : il tombe sur le mail perso de Bruno, sans accusé de réception automatique, sans template, sans escalade. Délai de réponse réel : **dépendant de la disponibilité personnelle de Bruno** (pas de SLA, pas de prestataire de back-up).

---

## 5. Cohérence FR/EN

- `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` ✅ bilingue 40+ termes
- `_LANGUE_MODULE_LIVRAISON.md` ✅ documenté
- `_I18N_INFRA_NEXTJS_SPEC.md` ✅ infra Next.js i18n prête
- FAQ bp.com 🔴 FR uniquement
- Aucune FAQ EN sur aucun site
- Aucune encyclopédie EN

**Verdict** : infra bilingue prête, contenu public bilingue inexistant. Bruno parle à un public FR + EN/IL → trou critique.

---

## 6. Cohérence avec la charte éditoriale condensée

Test rapide sur la FAQ bp.com :
- ✅ Tutoiement absent (bp.com vouvoie) → **incohérent avec charte** (« tu » obligatoire)
- ⚠️ Phrases trop longues (> 20 mots) → réponses « académiques », trop verbales
- ⚠️ Mots interdits présents : « N'hésitez pas », « Découvrez », « Notre » → à éliminer
- ⚠️ Pas de **1 idée + 1 action** par réponse

**Verdict** : la FAQ existante n'est PAS aux standards charte 28/05/2026.

---

## 7. Synthèse — état réel à J-3

| Critère | Score |
|---------|-------|
| FAQ prête prod (4 sites × cohérence G1 × FR/EN) | **3 % (10 Q/360 cibles)** |
| Encyclopédie NAVLYS publique | **0 %** |
| Réponses préparées multi-canal | **0 %** |
| Templates mail | **0 %** |
| Templates WhatsApp | **0 %** |
| Chat web branché | **0 %** |
| Glossaire (interne) | **100 %** ✅ |
| Matière première éditoriale interne | **80 %** ✅ |

**Note globale FAQ + Encyclopédie + Multi-canal : 12 / 100.**

À J-3, si Bruno reçoit un mail ou un WhatsApp sur les sites, il y répond **lui-même, depuis sa boîte perso, sans template, sans accusé de réception, sans escalade**. Cela tient pour 0 à 20 messages/jour. Au-delà, **engorgement immédiat dès le 2 juin** (annonce NAV IA Chat universel attire le clic).

---

## 8. Actions correctives priorisées

**Voir le plan détaillé dans `_MARKETING_FAQ_ENCYCLOPEDIE_PLAN_J3.md`.**

3 vagues :
- **Vague 1 (J-3 → J-1)** — actions Claude autonomes : générer 30 Q/R × 4 sites + 15 articles encyclopédie + 15 templates mail + 10 templates WhatsApp, bilingues, charte 28/05 respectée, G1 conforme.
- **Vague 2 (J-1 → J+7)** — actions Bruno : ouvrir Crisp Pro, brancher WhatsApp via 360dialog, coller widget sur les 4 sites, valider contenus.
- **Vague 3 (J+7 → J+30)** — déploiement NAV IA Chat via Claude API (Haiku 4.5 + Sonnet 4.6 hybride).

---

## 9. Risque juridique immédiat à corriger AVANT J0

**`brunopartouche.com/faq.html` mentionne 4 fois CIF et 2 fois ORIAS de façon affirmative.**
**C'EST FAUX et c'est public en clear web depuis Netlify.**

→ Action Bruno **avant le 31 mai** : retirer ou réécrire `faq.html` (texte de remplacement déjà préparé dans `_E_REPUTATION_TEXTES_REMPLACEMENT.md`).
→ Risque : signalement AMF / ORIAS / DGCCRF par un concurrent ou troll.
→ Estimation gravité : **élevée**. Estimation likelihood d'ici 30 jours : **moyenne** (probable si quelqu'un cherche).

---

⚓ *« On annonce un Chat Universel le 2 juin. À J-3, on n'a même pas de boîte aux lettres. Réparons. »*
_Audit compilé par Le Porte-Parole · Département Marketing & Communications NAVLYS · 28 mai 2026._
