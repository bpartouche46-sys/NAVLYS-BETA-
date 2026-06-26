> ⚠️ Rapport ULTRAREVIEW multi-agents (30 agents) · 2026-06-26.
> Domaine **Applications/produit** non abouti (échec schéma) — à re-auditer séparément.

# 🛰️ ULTRAREVIEW MAÎTRE — NAVLYS (BETA)
*Rapport consolidé MasterNav · 2026-06-26 · 5 domaines audités, risques vérifiés en adversarial sur sources réelles*

---

## 1. Résumé exécutif

NAVLYS est **techniquement prête et stratégiquement saine sur le fond** : positionnement légal robuste (éditeur pédagogique, **pas CIF / pas ORIAS / pas IOBSP**), méthode 90/10 backtestée et — fait rare et précieux — **publication des invalidations** (martingale, AdaptiveStop) plutôt que de fausses promesses. L'infra (Vercel, Supabase, ElevenLabs, Claude) est en place, les garde-fous G1 sont gravés dans les prompts, et l'app live (`live-source/finance.html`) est **déjà conforme** (illustration 3 %/an, disclaimers, aucun rendement promis).

Mais le go-live public est bloqué par **un petit nombre de contradictions documentaires non tranchées**, dont **deux seulement sont réellement critiques** : (1) le **statut juridique / entité Stripe** non figé (auto-entrepreneur FR vs entité IL Mizrahi — cette dernière fait entrer le narratif Israël au niveau structurel, à proscrire) doublé d'un **spec monétisation legacy `05_MONETISATION__2.md` non archivé** qui promeut l'apport d'affaires ORIAS (l'inverse de la doctrine canonique) ; (2) l'**offre early-bird** dont la com publique (« 39 € à vie ») **contredit l'implémentation Stripe déjà spécifiée** (bascule à 49 € au mois 7) = risque chargeback + pratique trompeuse + blocage des live keys.

Le reste relève de l'**hygiène documentaire et éditoriale**, pas du danger actif : date de lancement à 4 variantes, slogan à 2 versions, dépersonnalisation vs « Bruno fondateur » dans certains prompts/scripts, traces e-réputation Israël/Ashkelon hors actifs NAVLYS. Plusieurs risques remontés comme « critiques » ont été **rétrogradés après vérification** (cf. §2). Aucun secret ni chiffre ne doit être figé sans Bruno.

---

## 2. Revue par domaine

### 2.1 Stratégie & positionnement
**État** — Phase BETA active (gate verrouillé 31 mai). Positionnement et architecture produit figés sur le fond, mais exécution publique bloquée par incohérences non tranchées.

**Forces** — Positionnement légal clair (zéro agrément requis) · honnêteté radicale (invalidations publiées) · méthode reproductible (code Python, seed=42) · écosystème multi-produit cohérent · gouvernance documentée (8 règles gravées).

**Gaps** — Date de lancement non figée (4 variantes) · slogan fragmenté · early-bird contradictoire · entité juridique non figée (KYC Stripe bloqué) · mémoire en 2 branches (327 docs OneDrive + `docs/`) · nom produit résiduel « MARTINGALE_SCIENTIFIQUE ».

**Risques CONFIRMÉS**
| Risque | Gravité (vérifiée) | Source |
|---|---|---|
| Statut juridique micro-entreprise vs ORIAS flottant (+ entité IL Mizrahi dans Stripe) | **CRITIQUE** (latent) | `05_MONETISATION.md` vs `05_MONETISATION__2.md` vs `stripe_activite_fr.md:91-92` |
| Responsabilité early-bird « à vie » vs « 6 mois » | **ÉLEVÉ** (blocker monétisation) | `01_MATRICE_PRICING_OFFICIELLE.md:44` vs `_NAV_IA_TEMPLATES_MAIL_15.md` + `03_STRIPE_CATALOGUE_PRODUCTS_PRICES.md:26,32,332` |
| Projection revenue 90/10 vs 80/20 jamais validée | **ÉLEVÉ** | `_MASTER_NAVLYS_NOW.md` |
| Date lancement 4 variantes (SEO/presse) | **MOYEN** | `_MASTER_NAVLYS_NOW.md` vs `00_ORGANIGRAMME.md` vs `ETAT-DES-LIEUX.md` |
| Entité non figée bloque partenaires (volet « ALCAPA demande entity proof ») | **MOYEN** (sur-évalué « critique » → la liaison ALCAPA↔KYC est **fabriquée**) | `_JURIDIQUE_NAVLYS_DECISION_J3.md` + `01_ALPACA.md` |

**Recommandations**
- **P0** — Figer entité juridique + KYC Stripe (Bruno + notaire) ; **retirer l'option « IL Mizrahi »** de `stripe_activite_fr.md` (conflit déperso + narratif Israël). Dépôt INPI 7 classes (en retard de ~26 j).
- **P0** — Trancher date de lancement publique unique, la cascader (MASTER_NOW + DISPATCH + CLAUDE.md + teaser), marquer les posts J0 « ARCHIVÉ ».
- **P0** — Arbitrer early-bird avant live keys Stripe (cf. §2.5).
- **P1** — Archiver durement le legacy (`05_MONETISATION__2.md`, `FORMULES_v*`, noms « MARTINGALE_SCIENTIFIQUE ») dans `_ARCHIVE/` avec bannière « NE PAS UTILISER ».
- **P1** — Consolider la mémoire : `docs/` = source d'exécution courante, OneDrive = archive de contexte.

---

### 2.2 Communication & réseaux
**État** — Charte très aboutie (visuel #7DD3FC à 98 %, kits réseaux/vidéo/voix prêts) mais déploiement bloqué par contradictions slogan / déperso, calendrier figé sur date passée, e-réputation non nettoyée.

**Forces** — Identité visuelle cohérente · charte éditoriale opérationnelle · kit J0→J+10 complet · scripts vidéo avec disclaimer G1 déjà intégré · press kit prêt.

**Gaps** — Slogan non figé · tension déperso vs voix Bruno narrateur · police tagline divergente (Fraunces vs Cinzel) · e-réputation (@amarock52, Ashkelon, +972) · calendrier inactionnable (#1erJuin2026 obsolète) · checklist post-réseau non implémentée.

**Risques CONFIRMÉS**
| Risque | Gravité (vérifiée) | Source |
|---|---|---|
| Deux slogans officiels incompatibles | **MOYEN** (rétrogradé de « critique » : la version récente CLAUDE.md tranche déjà, reste à entériner) | `_TAGLINE_BM_COMMUNICATIONS.md` vs `_MASTER_NAVLYS_NOW.md` |
| Déperso vs voix Bruno narratrice | **MOYEN** (rétrogradé : le saut « régulateur → CIF/ORIAS » est exagéré ; source mal pointée) | `00_ORGANIGRAMME.md` vs `NAVLYS_Prospection_Influenceurs.md:19`, `_NAV_IA_SYSTEM_PROMPT_CLAUDE.md:226`, `06_VOIX_BRUNO_CLONAGE_GUIDE.md:41` |
| 3 traces Israël/Ashkelon indexées Google | **MOYEN-ÉLEVÉ (latent)** (rétrogradé : hors actifs NAVLYS publics, `live-source/` propre ; devient élevé si KG se déclenche) | `_E_REPUTATION_AUDIT_GOOGLE_BRUNO.md` |
| Calendrier J0→J+10 sur date passée | **MOYEN** | `_CALENDRIER_PUBLICATIONS_J0_J10.md` |

**Recommandations**
- **P0** — Entériner le slogan unique « Ma méthode, ton argent, ton rythme. » (sans « — BM »), neutraliser la source A par bannière « SUPERSEDÉ », passer tous les livrables prêts-à-poster.
- **P0** — Ajouter la mention **« Voix générée par IA » (AI Act art. 50)** dans chaque script HeyGen/ElevenLabs ; corriger `NAVLYS_Prospection_Influenceurs.md:19` (« ici Bruno, fondateur de NAVLYS » → basculer côté brunopartouche.com).
- **P0** — Nettoyage e-réputation (Bruno seul a les accès) : @amarock52, LinkedIn IL (retirer Ashkelon/+972 → « Méditerranée »), copainsdavant (RGPD). Textes prêts dans `_E_REPUTATION_TEXTES_REMPLACEMENT.md`.
- **P1** — Checklist post-réseau réutilisable (disclaimer ✓ · affilié ✓ · promesse ✓ · géo ✓ · déperso ✓ · date ✓ · voix IA ✓), intégrée Publer/CMS.
- **P1** — Réaligner le calendrier (#NavlysOfficial), harmoniser les polices.

---

### 2.3 Calculs & Finance (Laboratoire NEXT GEN)
**État** — Architecture théorique solide + protocole de validation rigoureux (walk-forward IS/OOS, stress tests, bootstrap, SHA-256). App live conforme. Faiblesses = **dispersion des chiffres** et **nommage de versions**, pas des bugs de calcul.

**Forces** — Démarche scientifique irréprochable · publication des invalidations · conformité G1 gravée · preuves reproductibles · `live-source/finance.html` conforme (3 %/an pédagogique + disclaimers).

**Gaps** — Version officielle des « FORMULES » non désignée (ambiguïté de nommage) · chiffres dispersés sans matrice de cohérence · réconciliation Perplexity↔Cartographe à figer · ALCAPA (validation interne) à exécuter · encyclopédie incomplète.

**Risques — après vérification, la plupart RÉTROGRADÉS**
| Risque | Gravité (vérifiée) | Note |
|---|---|---|
| Publication d'une version obsolète de FORMULES | **FAIBLE** (FAUX dans la prémisse : `FORMULES_v1→v6` = **grilles de prix NAVBIO**, pas des moteurs CAGR) | Requalifié : hygiène documentaire |
| Chiffres Cartographe non audités externe avant BETA | **FAIBLE** (FAUX : confusion entre « Sharpe 3,44 » R&D interne et « -3,44 » d'invalidation ; ALCAPA = validation interne auto, pas certif réglementaire) | Découpler BETA ≠ audit quant externe |
| Données Perplexity non authentifiées vs Cartographe | **FAIBLE** (rétrogradé de « critique » : les chiffres faux n'apparaissent **jamais seuls**, toujours en colonne « INVALIDÉ ») | Graver règle « jamais hors tableau de réconciliation » |
| AdaptiveStop (martingale déguisée) en code legacy | **MOYEN** | grep `live-source/` à confirmer |

**Recommandations**
- **P0** — Désigner LA source unique de la méthode/chiffres financiers (`METHODE_RETENUE_ET_CALCULS.md` + Config Combat v2) ; **corriger `docs/RENFORCEMENT/04-calculs-finance.md`** (retirer les `FORMULES_v*` de la liste des sources « méthode financière » — ce sont des tarifs).
- **P0** — Graver la règle : chiffres Perplexity (70 %/+1,40 %/-5 %) **uniquement** en colonne « estimé non vérifié » à côté du réel (32 %/-0,55 %/-95,19 %) + verdict INVALIDÉ.
- **P0** — Relire docs publics : remplacer toute estimation Perplexity par les chiffres Cartographe mesurés.
- **P1** — grep `AdaptiveStop` dans `live-source/`, confirmer retrait, documenter · matrice de cohérence des chiffres · dater/sourcer le coffre +11,88 % · récupérer/valider `NOVA_Configuration_Combat_v2.html`.
- **Déperso** — Retirer la signature nominative « Bruno Mark Partouche » des rapports Cartographe **publics** → « Laboratoire NEXT GEN / Le Cartographe ».

---

### 2.4 FAQ / SAV / NAV IA / Voix
**État** — Structurellement solide, garde-fous G1 robustes. Trois incohérences transverses (dates, prix, déperso prompt mai vs juin). Infra validée, compliance IA Act documentée. Manquent : FAQ produit unifiée publique + tests réels du G1 en live.

**Forces** — Refus systématique des 5 interdits G1 + escalade Sonnet · disclaimer IA au 1er message · KB riche (120 Q/R bilingues) · transparence voix (R1-R7, anti-deepfake regex) · SAV multicanal · martingale marquée invalidée.

**Gaps** — Pas de page FAQ publique unique · prix/dates non arbitrés · 2 versions du system prompt (déperso) · pas de test G1 live · consentement voix Bruno (PDF introuvable) · nommage NOVA résiduel.

**Risques CONFIRMÉS**
| Risque | Gravité (vérifiée) | Source |
|---|---|---|
| Promesse de rendement contournante (KB A18 « 4-7 % CAGR » sans disclaimer) | **ÉLEVÉE** (rétrogradé de « critique » ; source corrigée : `_NAV_IA_KNOWLEDGE_BASE_INITIALE.md` A18:80, **pas** l'encyclopédie art.1) | KB A18 |
| Consentement voix Bruno biométrique manquant | **MOYENNE** (rétrogradé de « critique » : clone **pas opérationnel**, aucun traitement art.9 en cours ; mais `_VOIX_BRUNO_OFFICIEL.md:67` affirme faussement « Document signé ») | `08_CONFORMITE_LEGALE_VOIX_CLONEE.md` §2 |
| Test G1 / prompt-leak non exécuté | **MOYEN** (rétrogradé de « élevé » : la batterie V6 **existe** mais sans volet adversarial prompt-leak ni exécution live) | `docs/TESTS-FONCTIONNELS.md` §V6 |

**Recommandations**
- **P0** — Corriger KB A18 : détacher le chiffre de la méthode-produit, ajouter triple disclaimer (pas promesse / pas garantie / peut être négatif) + « ni CIF ni ORIAS » ; auditer toute la KB (grep `%/an`, `CAGR`).
- **P0** — Choisir UN system prompt (déperso juin recommandé), cascader KB + réponses-types ; documenter le choix dans GOUVERNANCE.md.
- **P0** — Créer FAQ produit unifiée publique `navlys.com/faq` (Produit / Conformité / Voix-IA), source unique versionnée après arbitrage prix/dates.
- **P0** — Faire signer le consentement voix (Yousign/DocuSign horodaté) **avant** activation `ELEVENLABS_VOICE_ID` ; corriger la fausse mention « Document signé » dans `_VOIX_BRUNO_OFFICIEL.md:67`.
- **P1** — Ajouter catégorie « I — prompt-leak/injection/jailbreak » à TESTS-FONCTIONNELS §V6 ; exécuter en live quand Bruno fournit l'URL · clarifier NOVA vs NAVLYS · unifier les emails d'escalade.

---

### 2.5 Légal & Conformité
**État** — Maturation rédactionnelle avancée (corpus complet : CGU, Confidentialité, Bible, Décharge, Voix IA, RGPD) mais **AUCUNE validation avocat externe**. Entité juridique non finalisée (bloque contrats partenaires + factures). Traces Israël/Jérusalem/+972 résiduelles à purger. DPA fournisseurs à finaliser.

**Forces** — Doctrine canonique alignée (PAS CIF/ORIAS/IOBSP) répétée dans tout le corpus · disclaimers G1 systématisés · conformité IA Act documentée · CGU NAVBIO cohérente (art. 11).

**Gaps** — Pas de validation avocat · entité non figée · spec legacy contradictoire non archivé · références Israël dans du code/docs · DPA à signer.

**Risque transverse le plus grave (croisé Stratégie + Légal + Monétisation)**
> **Spec legacy `05_MONETISATION__2.md` vivant et non archivé** promeut explicitement « apport d'affaires banques/assurances **cadre ORIAS** » + « Stripe compatible CIF » — **l'inverse exact** de la doctrine canonique (`05_MONETISATION.md`, corrigé 26/05). Titre H1 identique, fichier 2 min plus récent, indiscernable par nom → **risque de réactivation par erreur = intermédiation illégale (pénal FR)**. Gravité **CRITIQUE (latente)**.

**Recommandations**
- **P0** — Archiver durement `05_MONETISATION__2.md` (`_ARCHIVE/__DEPRECATED-DO-NOT-USE`, bannière vers le canonique) ; ajouter en tête de `05_MONETISATION.md` la mention « fichier canonique, `__2` nul/void ».
- **P0** — Figer l'entité juridique → débloque KYC Stripe, contrats partenaires, factures.
- **P0** — Purger les références Israël/Jérusalem/+972 du code public ; étendre le grep des termes interdits (ERR-004/005 du JOURNAL) aux profils sociaux.
- **P1** — Validation avocat externe du corpus (CGU/Confid/Décharge/Voix) avant exposition publique large ; finaliser les DPA fournisseurs.
- **Capitalisation** — Ajouter à CHECKLIST-SECURITE : « pas de doublon de spec à titre H1 identique non archivé ».

---

## 3. 🔴 Contradictions transverses à trancher

| # | Contradiction | Sources clés | Statut |
|---|---|---|---|
| C1 | **Statut juridique / entité** : canonique « PAS ORIAS » vs legacy `05_MONETISATION__2` « cadre ORIAS » ; et **auto-entrepreneur FR vs entité IL Mizrahi** | `05_MONETISATION.md` / `__2.md` / `stripe_activite_fr.md:91-92` | **CRITIQUE — Bruno** |
| C2 | **Early-bird** : « 39 € à vie » (mails/social/NAV IA) vs « 39 € 6 mois puis 49 € » (matrice + Stripe `subscription_schedule`) vs « coupons forever -20→-50 % » (campagne) = **3 modèles incompatibles** | `01_MATRICE_PRICING_OFFICIELLE.md` / `_NAV_IA_TEMPLATES_MAIL_15.md` / `03_STRIPE_CATALOGUE_PRODUCTS_PRICES.md` / `CAMPAGNE_LANCEMENT_JUIN2026.md` | **ÉLEVÉ — Bruno** |
| C3 | **Date de lancement public** : 31 mai (gate) / 1er juin (BETA) / 15 juin (stable) / 1er juillet (countdown live) | `_MASTER_NAVLYS_NOW.md` / `00_ORGANIGRAMME.md` / `ETAT-DES-LIEUX.md` | **MOYEN — Bruno** |
| C4 | **Slogan** : « ton argent, ton rythme » (tu) vs « votre argent, votre tempo » (vous) + EN/FR · signature « — BM » oui/non | `_MASTER_NAVLYS_NOW.md` / `_TAGLINE_BM_COMMUNICATIONS.md` / J0 socials | **MOYEN — Bruno** (CLAUDE.md tranche déjà → entériner) |
| C5 | **Déperso vs « Bruno »** : règle gravée n°1 (invisible) vs « fondateur/narrateur de NAVLYS » dans prompts/scripts/DM ; + voix Bruno narrateur sans mention IA | `00_ORGANIGRAMME.md` vs `_NAV_IA_SYSTEM_PROMPT_CLAUDE.md:226`, `NAVLYS_Prospection_Influenceurs.md:19`, `06_VOIX_BRUNO_CLONAGE_GUIDE.md:41` | **MOYEN — Claude (édition) + Bruno (cadre)** |
| C6 | **Hetzner core** : présent dans CLAUDE.md (legacy) mais absent des docs récents | CLAUDE.md vs `recup-docs/onedrive/` | **MOYEN — Bruno** (confirmer abandon/DR) |
| C7 | **Mémoire en 2 branches** : 327 docs OneDrive (snapshot 25/05) vs `docs/` (courant 26/06), legacy non flaggé « archived » | `MEMOIRE-CENTRALE.md` | **MOYEN — Claude** |
| C8 | **Nommage produit** : « MARTINGALE_SCIENTIFIQUE_PACK » résiduel vs martingale INVALIDÉE | corpus | **FAIBLE — Claude** |

---

## 4. 🎯 TOP 10 actions priorisées

1. **Figer l'entité juridique + débloquer KYC Stripe** (Bruno) — débloque contrats partenaires, factures, INPI, et conditionne tout le reste du go-live monétisation.
2. **Archiver durement `05_MONETISATION__2.md` + retirer l'option « IL Mizrahi »** de `stripe_activite_fr.md` (Claude → Bruno valide suppression) — neutralise le risque pénal latent (intermédiation illégale ORIAS) et un narratif Israël structurel.
3. **Trancher l'offre early-bird (1 seule vérité) puis aligner com / matrice / Stripe** (Bruno décide, Claude édite) — sans ça : chargebacks au mois 7, pratique trompeuse, live keys Stripe bloquées.
4. **Corriger la KB A18 (« 4-7 % » → disclaimer G1 complet) + audit grep de toute la KB** (Claude) — supprime la seule promesse de rendement contournante avant indexation publique.
5. **Trancher + cascader la date de lancement publique unique** (Bruno décide, Claude propage MASTER_NOW/DISPATCH/CLAUDE/teaser) — évite 4 dates contradictoires en SEO/presse.
6. **Entériner le slogan unique + nettoyer tous les livrables prêts-à-poster** (Bruno confirme, Claude édite) — cohérence marque avant publication réseaux.
7. **Choisir UN system prompt NAV IA (déperso) + cascader KB/réponses-types** (Bruno décide, Claude applique) — lève le conflit « Bruno fondateur » vs marque dépersonnalisée.
8. **Nettoyer l'e-réputation (@amarock52, Ashkelon, +972, copainsdavant)** (Bruno seul — accès comptes ; Claude fournit les textes) — purge le narratif Israël avant montée du volume de recherche au lancement.
9. **Faire signer le consentement voix + corriger la fausse mention « Document signé »** (Bruno signe ; Claude corrige `_VOIX_BRUNO_OFFICIEL.md:67`) — prérequis RGPD art.9 / AI Act art.50 avant activation du clone.
10. **Désigner la source unique de la méthode/chiffres + graver la règle « Perplexity jamais hors tableau de réconciliation »** (Claude → Bruno valide) — fige la cohérence éditoriale finance avant toute publication.

---

## 5. ⚖️ Décisions en attente de Bruno

1. **Entité juridique** : auto-entrepreneur FR vs EIRL vs SARL ? (impact KYC Stripe, contrats, factures, INPI). **Écarter l'entité IL Mizrahi** (conflit déperso + narratif Israël).
2. **Early-bird** : « 39 € à vie » (honorer la com déjà diffusée, marge -10 €) **ou** « 39 € 6 mois puis 49 € » (corriger toute la com) **ou** mécanisme coupon forever ? → puis aligner les 3 couches (com / matrice / Stripe).
3. **Date de lancement public définitive** (1 seule) parmi 31 mai / 1er juin / 15 juin / 1er juillet.
4. **Slogan** : confirmer « Ma méthode, ton argent, ton rythme. » (tu, sans « — BM ») + police (Cinzel/Cormorant vs Fraunces).
5. **System prompt NAV IA** : version juin dépersonnalisée (recommandé) vs version mai « Bruno fondateur ».
6. **Archivage legacy** : valider le déplacement de `05_MONETISATION__2.md`, `FORMULES_v*`, noms « MARTINGALE » vers `_ARCHIVE/` (zéro suppression sans accord).
7. **Consentement voix Bruno** : signer le PDF (qui/quand) avant activation du clone.
8. **Hetzner** : confirmer abandon ou rôle DR/sauvegardes.
9. **Audit quant externe (ALCAPA indépendant) + dépôt INPI** : budgets (audit ~2-5 k€, INPI ~430 €) — décision financière réservée à Bruno. À découpler de la BETA (BETA = publication éditoriale honnête).
10. **Mix monétisation cible** (C 90/10 vs A 80/20) : figer ou attendre data Q3 — et **ne jamais publier** les projections comme promesse.

## 🎯 TOP actions
- **Figer l'entité juridique et débloquer le KYC Stripe** — Conditionne contrats partenaires, factures, INPI et tout le go-live monétisation ; KYC Stripe actuellement bloqué sur entité indécise _(→ Bruno)_
- **Archiver durement 05_MONETISATION__2.md et retirer l'option entité IL Mizrahi de stripe_activite_fr.md** — Spec legacy vivant et indiscernable par nom promeut l'apport d'affaires ORIAS = risque pénal latent (intermédiation illégale) + narratif Israël structurel _(→ Claude (édition) puis Bruno valide la suppression)_
- **Trancher l'offre early-bird en une seule vérité puis aligner com / matrice / Stripe** — « 39 € à vie » contredit la bascule Stripe à 49 € au mois 7 = chargebacks, pratique trompeuse, live keys bloquées _(→ Bruno décide, Claude édite)_
- **Corriger la KB A18 (4-7 % CAGR) avec disclaimer G1 complet et auditer toute la KB** — Seule promesse de rendement contournante restante, sans disclaimer, avant exposition publique _(→ Claude)_
- **Trancher et cascader la date de lancement publique unique** — 4 dates contradictoires (31 mai / 1 juin / 15 juin / 1 juillet) = confusion SEO, presse, FAQ _(→ Bruno décide, Claude propage)_
- **Entériner le slogan unique et nettoyer tous les livrables prêts-à-poster** — 2 versions (tu/vous, rythme/tempo, +/- BM) diluent la marque avant publication réseaux _(→ Bruno confirme, Claude édite)_
- **Choisir un seul system prompt NAV IA (dépersonnalisé) et cascader KB et réponses-types** — Conflit entre version mai (Bruno fondateur) et juin (marque dépersonnalisée) viole la règle gravée n°1 _(→ Bruno décide, Claude applique)_
- **Nettoyer l'e-réputation (@amarock52, Ashkelon, +972, copainsdavant)** — Traces Israël indexées Google violent la règle narratif Israël interdit en public ; risque accru au lancement _(→ Bruno (accès comptes), Claude fournit les textes)_
- **Faire signer le consentement voix et corriger la fausse mention Document signé** — Prérequis RGPD art.9 et AI Act art.50 avant toute activation du clone vocal ; un doc affirme à tort être signé _(→ Bruno signe, Claude corrige _VOIX_BRUNO_OFFICIEL.md:67)_
- **Désigner la source unique méthode/chiffres et graver la règle Perplexity jamais hors tableau de réconciliation** — Fige la cohérence éditoriale finance et empêche qu'un chiffre invalidé soit sorti de son contexte _(→ Claude propose, Bruno valide)_


## ⚖️ Décisions Bruno
- Entité juridique : auto-entrepreneur FR vs EIRL vs SARL (écarter l'entité IL Mizrahi — conflit déperso + narratif Israël)
- Early-bird : 39 € à vie vs 39 € 6 mois puis 49 € vs coupon forever — puis aligner com / matrice / Stripe
- Date de lancement public définitive unique (31 mai / 1 juin / 15 juin / 1 juillet)
- Slogan : confirmer « Ma méthode, ton argent, ton rythme. » (tu, sans — BM) + police (Cinzel/Cormorant vs Fraunces)
- System prompt NAV IA : version juin dépersonnalisée vs version mai Bruno fondateur
- Archivage legacy : valider le déplacement de 05_MONETISATION__2.md, FORMULES_v*, noms MARTINGALE vers _ARCHIVE/
- Consentement voix Bruno : qui signe et quand, avant activation du clone
- Hetzner : confirmer abandon ou rôle DR/sauvegardes
- Audit quant externe (ALCAPA indépendant ~2-5 k€) + dépôt INPI (~430 €) : budgets et calendrier, à découpler de la BETA
- Mix monétisation cible (C 90/10 vs A 80/20) : figer ou attendre data Q3 ; ne jamais publier les projections comme promesse
