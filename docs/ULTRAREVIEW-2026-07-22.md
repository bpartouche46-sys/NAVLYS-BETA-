# 🛰️ ULTRAREVIEW MAÎTRE — NAVLYS (BETA) · 2026-07-22

> Revue 360° multi-agents (4 domaines : conformité sites · cohérence docs/stratégie · sécurité/hygiène dépôt · qualité technique front).
> Findings **vérifiés en adversarial sur les fichiers réels**, et **recoupés sur la branche `main`** (le vrai candidat prod).
> Réf. précédente : `docs/ULTRAREVIEW-NAVLYS.md` (2026-06-26). Depuis, 2 arbitrages majeurs (2026-07-15) : **A — incarnation Bruno assumée AVEC disclaimer « voix générée par IA »** ; **B — ERR-008 : Hetzner = serveur CENTRAL actif** (ne plus écrire « abandonné »).

---

## 0. ⚠️ Périmètre & méthode (à lire avant tout)

Le dépôt a **deux lignes divergentes** (diagnostic déjà posé, session 2026-07-15) :
- **`main`** = vraie ligne de dev, **candidat prod** (81 pages `live-source/`, code app, `supabase/`, edge functions).
- **Branche par défaut / lignée docs** (`claude/memory-saturation-safeguards-kl4ysc` → cette branche `claude/ultrareview-report-3wwve0`) = **snapshot mémoire/docs** (12 pages `live-source/`, pas d'app).

Cet ultrareview tourne depuis la **lignée docs**. Conséquence sur la lecture des findings :
- **Docs / stratégie / sécurité-secrets** → valides tels quels (cette branche EST la source de vérité documentaire).
- **Sites (conformité + technique)** → audités sur le snapshot docs **puis recoupés sur `main`**. Les findings marqués **`[✓ main]`** sont confirmés sur le candidat prod ; ceux marqués **`[snapshot]`** sont à revérifier sur `main` lors de la centralisation.

**Aucun fichier de code n'a été modifié.** Ce document est un rapport ; les corrections sont proposées, pas appliquées (respect règle financière + GATE = Bruno, et pas de déploiement sans feu vert).

---

## 1. Résumé exécutif

Sur le fond, NAVLYS reste **solide et conforme dans l'intention** : positionnement légal intact (éditeur pédagogique, **PAS CIF / PAS ORIAS / PAS IOBSP**, négations systématiques), zéro promesse de rendement dans les pages servies (toutes les occurrences « rendement/performance » sont des disclaimers), charte `#7DD3FC` propre (0 `#5fe0ff` résiduel), et dépôt **sain côté secrets** (note sécurité **B+** : zéro clé privée, zéro token live, zéro clé `service_role`, zéro PII Bruno en clair).

Mais **un seul risque est réglementairement dur et présent sur le candidat prod** : la **voix clonée de Bruno est diffusée sans le disclaimer « voix générée par IA »** — alors que ce disclaimer est la **condition explicite** de l'arbitrage d'incarnation du 2026-07-15 (RGPD art. 9 + IA Act art. 50). Les **docs** portent bien l'exigence ; les **sites** ne l'implémentent pas encore.

Le reste se répartit en trois blocs :
1. **Dette documentaire de gouvernance** (la plus volumineuse) : les 2 arbitrages du 2026-07-15 n'ont été inscrits que dans `CLAUDE.md` + `ETAT-DES-LIEUX.md`. **`GOUVERNANCE.md` — lu à chaque session (RÈGLE D'OR §0) — affirme encore l'inverse** sur les deux points (« Bruno invisible » et « Hetzner abandonné »). C'est exactement le mécanisme de re-contamination que la RÈGLE D'OR cherche à éviter.
2. **Hygiène éditoriale & technique** : slogan à 4 variantes vivantes, comptes à rebours figés sur une date **échue** (1er juillet, on est le 22), CTA/liens morts, assets en chemin absolu à risque de 404, typo hors-charte (Fraunces/Lora vs Cinzel), OG/`og:image` quasi absents, ~99 doublons de fichiers.
3. **Décisions réservées à Bruno, toujours ouvertes** depuis juin : entité juridique + KYC Stripe (C1) et offre early-bird (C2). Elles bloquent la monétisation, pas la publication éditoriale.

**Blocage structurel de lancement** (rappel) : l'app gated conforme (**PR #46**, onboarding + gate + auth Supabase + `/legal/*`) n'est **intégrée nulle part**, et 9 PR de vrai travail ciblent `main` sans consolidation.

---

## 2. 🔴 Findings recoupés sur `main` (candidat prod) — priorité maximale

| # | Gravité | Où | Constat | Correction |
|---|---------|----|---------|-----------|
| M-1 | **CRITIQUE** `[✓ main]` | `live-source/navlys-voix.js`, `live-source/navlys-alive.js` (boutons « écouter Bruno » → `/media/voix-accueil.mp3`) ; `live-source/lancement.html` (`/media/navlys-bm-voix.mp3`) ; aussi snapshot : `live-source/api/voice.js` + `sites/brunopartouche.com/index.html:41-47` « Écoutez Bruno » `/media/bruno.mp3` | La **voix clonée de Bruno** (ElevenLabs) est jouée à la demande, présentée comme « Bruno », **sans aucune mention « voix générée par IA »**. C'est la **condition dure** de l'arbitrage 2026-07-15 (RGPD art. 9 + IA Act art. 50). Les docs l'exigent, les sites ne l'appliquent pas. | Ajouter une mention permanente et visible à côté de **chaque** déclencheur voix/avatar : « 🔊 Voix générée par IA (clone vocal) ». Idéalement centralisée dans `navlys-alive.js`. À vérifier aussi sur les edge live `/voix`, `/voix-demo` (Supabase, hors dépôt). |
| M-2 | **ÉLEVÉ** `[✓ main]` | `live-source/bateau-test.html:91`, `live-source/skipper.html:105` | Champ téléphone avec **placeholder `+972…`** = **indicatif d'Israël**. Trace du narratif Israël (interdit) directement sur le candidat prod, dans un formulaire public. | Remplacer par un placeholder neutre/France : `+33 6 …` ou `+…`. Étendre le grep des termes interdits (ERR-004/005) aux **attributs `placeholder`**. |

> Note : sur `main`, **aucune** autre trace géographique interdite (Israël/Jérusalem/Ashkelon) dans les fichiers servis, et **aucun secret** en dur dans `live-source/api/*` (tout en `process.env`). Les 10 locales i18n (`he`, `ar`, `hi`, `ur`, `bn`, `de`, `es`, `it`, `nl`, `pt`) relèvent de l'accessibilité multilingue mondiale — l'hébreu y est **une langue parmi d'autres**, pas un marqueur de narratif Israël.

---

## 3. Revue par domaine

### 3.1 Conformité — sites servis au public
**État** — Conforme sur le fond ; **une** non-conformité réglementaire dure (M-1) + une trace géo (M-2).

**Confirmé CONFORME** : 0 promesse de rendement (le simulateur `finance.html` 3 %/an est couvert par « Illustration pédagogique hypothétique — ni prévision ni rendement promis ») · positionnement en négation partout (`mentions.html` liste tout ce que NAVLYS « N'EST PAS ») · disclaimers bandeau+footer présents sur les pages principales · pages légales existantes, liens légaux non cassés · prompts back-end (`api/sav.js`, `navlex.js`, `whatsapp-webhook.js`) interdisent conseil perso + promesse.

**Gaps** — M-1 (disclaimer voix IA), M-2 (`+972`), + **[snapshot]** pas de lien pied de page vers CGU/Mentions/Privacy sur les pages `live-source/` (index, finance, tech, navlex, next-gen, radio…) ; `bientot.html` sans bandeau/disclaimer.

### 3.2 Cohérence documentaire & stratégie
**État** — **Dette de gouvernance majeure** : les 2 arbitrages 2026-07-15 ne sont pas cascadés hors `CLAUDE.md`/`ETAT`.

| Réf | Fichier | Problème | Qui |
|-----|---------|----------|-----|
| I-1 | `docs/GOUVERNANCE.md:14-15` | Règle gravée n°1 « **Bruno invisible** » en absolu, sans la clause d'assouplissement 2026-07-15. **Doc lu à chaque session.** | Claude édite |
| I-2 | `docs/GOUVERNANCE.md:69` | « **Hetzner abandonné/legacy** » → viole ERR-008. **Doc lu à chaque session.** | Claude édite |
| I-3→I-8 | `ASSIMILATION-DRIVE-2026-06-23.md:17`, `STRATEGIE-NAVLYS.md:97`, `AUTONOMIE-CLAUDE.md:86-87` (critère de déploiement !), `RENFORCEMENT/00·01·02`, `SYNTHESE-NAVLYS(-MASTER)`, `PLAN-ENRICHISSEMENT` | Réaffirment « Bruno invisible » sans l'arbitrage. **`AUTONOMIE:86-87` est le plus dangereux** : une page conforme au nouvel arbitrage (avatar Bruno) serait **bloquée** par le check de conformité pré-déploiement. | Claude cascade |
| I-10 | `GOUVERNANCE:69`, `SYNTHESE-NAVLYS:114`, `RENFORCEMENT/07-securite-infra:13,71,82`, `RENFORCEMENT/01:62,85`, `ETAT:218,254,296`, `MIGRATION-ANCIEN-PC:221` | ~10 traces « Hetzner legacy/abandonné » (une recommande même « cesser la facturation ») → violent ERR-008. | Claude purge |
| I-9/I-14 | Slogan | **4 variantes vivantes** : ✅ « Ma méthode — Ton argent — **Ton rythme** » (figée) vs ❌ « …Ton contrôle » (7 docs, dont 2 la figent à tort : `INVENTAIRE:94`, `AUDIT-SITES-2026-06-28:74`) vs ❌ « Votre argent, Votre tempo — BM » (sites live) vs ❌ « Ton IA · Ta vie · Ton rythme » (navlys.io). | Claude cascade |

**Point positif confirmé** — le disclaimer « voix générée par IA » **est bien présent dans les docs/guides voix** (`RENFORCEMENT/06:19`, `05:35,67,82`, `NAV-IA-G1:99-100`, `FAQ-NAVLYS:112`…). La condition de l'arbitrage A est **satisfaite côté docs** ; il reste à l'**appliquer sur les sites** (= M-1).

### 3.3 Sécurité & hygiène dépôt — **verdict B+ (sain)**
Aucune fuite critique (0 clé privée / token live / `service_role` / PII Bruno). `.gitignore` solide et **réellement respecté** (secrets + e-réputation).

| # | Gravité | Constat | Correction |
|---|---------|---------|-----------|
| S-1 | ÉLEVÉ (confiné) | `NAVLYS_CENTRAL_20260614/**/api/voice.js:9` : **VOICE_ID en dur** `6hUoby5ZAVW4JqvIJeri` (×2, **snapshot legacy uniquement** — le live est déjà en env only). | Purger/neutraliser + archiver le snapshot. |
| S-2 | MOYEN | `recup-docs/onedrive/_VOIX_BRUNO_OFFICIEL.md` **suivi par Git** alors que 6 docs disent « hors Git ». Champ VOICE_ID **vide aujourd'hui** → pas de fuite, mais **bombe à retardement** dès remplissage. | Ajouter `**/_VOIX_BRUNO_OFFICIEL*` au `.gitignore` + `git rm --cached`. |
| S-3 | FAIBLE | `sites/navfin/index.html:204` : clé Supabase **`anon`** en clair (publique par design, protégée par RLS). | Rien à révoquer ; **vérifier que RLS est actif** sur toutes les tables. |
| S-4/S-5 | FAIBLE | IPs DNS publiques (non sensibles) ; 4 verrous Office `~$*.xls` versionnés (junk). | Nettoyage doc + `~$*` au `.gitignore`. |

**Hygiène** : ~**99 doublons md5-identiques** (~12 % des fichiers suivis), 3 packs auto-imbriqués `X/X/` (Stripe, Veille, Brand Kit), snapshots morts (`NAVLYS_CENTRAL_20260614/`, `_ARCHIVE_20260525/` dupliqué). → **Plan d'archivage SANS suppression** (`git mv` vers `_LEGACY_ARCHIVE/` + bannière), tout `git rm` reste soumis à l'accord de Bruno.

### 3.4 Qualité technique front
| # | Gravité | Où | Défaut |
|---|---------|----|--------|
| T-1 | CRITIQUE | 6 pages `sites/*` `[snapshot]` | Countdown figé `2026-07-01` (**date passée**) → compteurs à `0`, teaser annonce encore « arrive le 1er juillet ». `navfin` gère déjà le repli « C'est ouvert » → à généraliser. *(À revérifier sur `main` : la home y aurait déjà retiré le countdown.)* |
| T-2/T-3 | ÉLEVÉ | `sites/navbiolife.com/index.html:60` (« Réserver ma place » `href="#"`), `live-source/navlex.html:81` (« M'abonner » `href="#"` **sans handler**) | CTA morts. |
| T-4 | ÉLEVÉ | `sites/navfin/assets/navlys-v2.css` | Copie divergente/périmée du CSS partagé → **régression a11y** (`.sr-only`, `:focus-visible`, `prefers-reduced-motion` manquants). |
| T-5/T-6 | ÉLEVÉ | assets absolus `/assets/navlys-v2.js`, `/navlys-alive.js` absents des dossiers `sites/<domaine>/` ; canonical/liens vers `navlys.com/navlex` & `/finance` (pages absentes) | **Risque 404** selon mapping Vercel. *(Dépend du mapping projet→dossier, non visible au dépôt — à confirmer côté Vercel.)* |
| T-7 | MOYEN | têtes `sites/*` | Typo **hors-charte** : Fraunces + Lora (pas de Cinzel) ; `live-source/` respecte Cinzel+Cormorant+JetBrains → incohérence entre déploiements. |
| T-8 | MOYEN | `cockpit.html` sans meta description ; **aucune `og:image`** nulle part, OG sur 3/17 pages | Partages sociaux cassés. |
| T-11 | FAIBLE | `live-source/influenceurs.html:85` | Placeholder **visible** en prod (« À remplacer par un vrai cas… »). |

**Points sains** : `#7DD3FC` propre (0 `#5fe0ff`), `lang="fr"` + `<title>` uniques partout, a11y de base OK (`aria-label`/`aria-expanded`, `SpeechRecognition` gardé), JS propre (0 `console.log`, `fetch` avec try/catch), en-têtes de sécurité définis.

---

## 4. État TRANCHÉ / OUVERT des contradictions C1–C8 (vs ultrareview 2026-06-26)

| C | Sujet | Statut 2026-07-22 |
|---|-------|-------------------|
| C1 | Entité juridique / ORIAS (+ `05_MONETISATION__2.md` non archivé) | 🔴 **OUVERT — Bruno.** Aucune décision retrouvée ; risque pénal latent toujours présent. |
| C2 | Early-bird (39 € à vie vs 6 mois vs coupon) | 🔴 **OUVERT — Bruno.** Bloque toujours les live keys Stripe. |
| C3 | Date de lancement | 🟡 **Décidée (1er juillet) puis RE-OUVERTE** : date **échue**, pas de statut post-launch, non cascadée, contredite par `roadmap-08` et re-listée « ouverte » dans `ETAT:299`. |
| C4 | Slogan | 🟡 **FIGÉ mais NON APPLIQUÉ** (4 variantes, cf. I-9/I-14). Exécution = Claude. |
| C5 | Déperso vs Bruno | 🟢 **TRANCHÉ 2026-07-15 — sens INVERSÉ** (incarnation assumée). Docs **non** mis à jour = la plus grosse masse d'incohérences (I-1, I-3→I-8). |
| C6 | Hetzner core | 🟢 **TRANCHÉ 2026-07-15 (central actif, ERR-008)**. Résidus « legacy » dans ~10 docs (I-2, I-10). |
| C7 | Mémoire 2 branches (OneDrive vs docs/) | 🔴 **OUVERT — Claude.** Legacy non flaggé « archived ». |
| C8 | Nommage « MARTINGALE_SCIENTIFIQUE » | 🔴 **OUVERT — Claude (faible).** |

---

## 5. 🎯 TOP 10 actions priorisées

1. **[P0 · Claude édite] Implémenter le disclaimer « voix générée par IA »** partout où la voix/l'avatar clonés jouent (M-1) — centraliser dans `navlys-alive.js`, vérifier `sites/brunopartouche.com` + edge `/voix`/`/voix-demo`. *Seule non-conformité réglementaire dure.*
2. **[P0 · Claude édite] Corriger `GOUVERNANCE.md`** (I-1 déperso + I-2 Hetzner) — c'est le doc lu à chaque session qui diffuse activement les 2 consignes périmées.
3. **[P0 · Claude édite] Retirer le placeholder `+972`** (M-2) et étendre le grep termes interdits aux attributs `placeholder`.
4. **[P0 · Claude cascade] Propager l'arbitrage incarnation** dans STRATEGIE / SYNTHESE×2 / ASSIMILATION / RENFORCEMENT 00·01·02 / AUTONOMIE (critère de déploiement I-6, sinon il bloque à tort les pages conformes).
5. **[P0 · Claude cascade] Purger les ~10 traces « Hetzner legacy/abandonné »** (I-10).
6. **[P1 · Bruno décide → Claude cascade] Statut post-1er-juillet + date unique** : recaler les 6 comptes à rebours échus (T-1) et harmoniser dates/slogan.
7. **[P1 · Claude cascade] Appliquer le slogan figé** « Ton rythme » et corriger les 2 docs qui figent « Ton contrôle » (I-9/I-14).
8. **[P1 · Claude édite] Réparer les CTA/liens morts** (T-2/T-3) et **confirmer le mapping assets Vercel** (T-5/T-6, risque 404).
9. **[P1 · Bruno valide la suppression] Sécuriser & assainir le dépôt** : `.gitignore` (`_VOIX_BRUNO_OFFICIEL*`, `~$*`), `git rm --cached` du doc voix, neutraliser le VOICE_ID legacy (S-1/S-2), plan d'archivage `_LEGACY_ARCHIVE/` sans suppression.
10. **[P0 · Bruno] Débloquer le go-live structurel** : trancher C1 (entité/KYC Stripe) + C2 (early-bird), et **consolider PR #46** (app gated) + les 9 PR ciblant `main`.

---

## 6. ⚖️ Décisions en attente de Bruno

1. **Entité juridique + KYC Stripe** (C1) — écarter l'entité IL Mizrahi (déperso + Israël) ; archiver durement `05_MONETISATION__2.md`.
2. **Early-bird** (C2) — 1 seule vérité, puis aligner com / matrice / Stripe.
3. **Statut post-1er-juillet** (date échue) : « c'est ouvert » vs nouveau jalon ? puis on cascade.
4. **Consolidation PR** : valider l'intégration de **PR #46** (app gated) et l'ordre de fusion des 9 PR vers `main`.
5. **Archivage legacy** : accord pour `git mv` vers `_LEGACY_ARCHIVE/` (zéro `git rm` sans feu vert).
6. **Vérif RLS** Supabase (projet `hhrlgyvtqluxpywjiwkd`) — confirmer que toutes les tables ont RLS actif (garde-fou de la clé anon publique).

---

## 7. Ce que Claude peut faire seul, tout de suite (édition docs/sites, sans argent ni GATE)

Conformément au mode « publier auto, argent = Bruno » (AUTONOMIE-CLAUDE, boucle active 2026-07-15) et **après passage gardien** : actions 1→5 et 7→8 ci-dessus sont **de l'édition** (docs + code front, aucune dépense, aucun déploiement prod déclenché ici). Elles seront livrées en petits commits sur branche dédiée + PR brouillon, pour relecture avant toute mise en ligne.

*Rapport généré en revue multi-agents adversariale. Aucun fichier de code modifié par cette passe. Prochaine étape recommandée : ouvrir une branche de correction depuis `main` pour M-1/M-2 (conformité prod) et une passe docs pour I-1/I-2 (gouvernance).*
