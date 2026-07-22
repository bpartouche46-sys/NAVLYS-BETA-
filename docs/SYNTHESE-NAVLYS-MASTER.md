# SYNTHÈSE NAVLYS — MASTER (source de vérité unique)

> **Rôle de ce fichier** : réunir en UN seul endroit **toutes les rubriques**, **toutes les
> recommandations** et **toute la stratégie** dispersées dans les ~30 packs versés dans le dépôt.
> C'est la **carte unique de navlys.com** : ce qu'on montre, ce qu'on construit, dans quel ordre.
>
> Périmètre = **NAVLYS public, dépersonnalisé** (Bruno invisible — il vit sur brunopartouche.com).
> Aucune donnée privée ici (ni téléphone, ni entité, ni e-réputation, ni clé). Ces éléments restent
> hors dépôt (Drive privé). Voir le plan de nettoyage : `docs/PLAN-NETTOYAGE-DEPOT.md`.
>
> Statut projet : **BETA active** (gate ouvert). Slogan figé : *Ma méthode — Ton argent — Ton rythme.*
> Méthode **90/10** (90 % Forteresse ETF/DCA + 10 % Capital Plaisir). **ZÉRO ORIAS / ZÉRO CIF** —
> média éducatif uniquement. Charte : noir `#000` + Ice Blue `#7DD3FC` + bronze. Polices : Cinzel,
> Cormorant Garamond, JetBrains Mono.

---

## 1. CARTE UNIQUE DE navlys.com — les 12 rubriques réunies

Toutes les sections de contenu trouvées dans les packs, regroupées en **une seule architecture de site**.
Chaque rubrique = une source (le pack d'origine) + un statut (prêt / R&D / à écrire).

| # | Rubrique navlys.com | Ce que ça montre | Source (pack) | Statut |
|---|---------------------|------------------|---------------|--------|
| 1 | **Accueil / Teaser** | Pré-inscription, countdown, pièce bronze, bilingue FR/EN | TEASER_LAUNCH | 🟢 prêt |
| 2 | **Le Cockpit (90/10)** | Interface maritime 360°, allocation visuelle, winchs interactifs | COCKPIT | 🟢 prêt |
| 3 | **Cockpit immersif** | Versement mensuel, HUD 6 instruments, gyroscope mobile | COCKPIT_IMMERSIF | 🟠 R&D |
| 4 | **La méthode (science 90/10)** | Parcours 5 écrans : Monte Carlo, Kelly, pourquoi 90/10 tient | MÉTHODE_90_10 *(ex-Martingale)* | 🟢 prêt |
| 5 | **Marge Révélée** | Calculette « ce que la banque gagne sur ton épargne » + 30 questions | MARGE_REVELEE *(ex-Cheval-Troie)* | 🟢 prêt |
| 6 | **Le parcours (Bridge)** | 7 escales → tableau de bord unifié → plan envoyé par email | BRIDGE | 🟢 prêt |
| 7 | **La Veille (oracles)** | Calendrier éco, corrélation événement ↔ marché, 6 agences | VEILLE_PREMIUM | 🟢 prêt |
| 8 | **Le brief du jour** | Journal pédagogique discipliné (go/no-go), backtest 5 ans | BACKTEST_5ANS | 🟢 prêt |
| 9 | **Tarifs** | 3 offres, freemium, annuel, transparence frais | STRIPE_COMPLETE | 🟢 en ligne |
| 10 | **Légal** | CGU, Confidentialité (RGPD), Mentions — déjà construites | STRIPE/contenu/legal | 🟢 en ligne |
| 11 | **Presse / À propos** | Communiqués, factsheet, positionnement « média indépendant » | PRESS_KIT | 🟢 prêt |
| 12 | **Réseaux & communauté** | 13 comptes, bios dépersonnalisées, Équipage Navlys | BRAND_KIT | 🟢 prêt |

> Les pages **Tarifs / CGU / Confidentialité / Mentions** + l'**accueil enrichi** existent déjà
> dans `sites/navlys.com/`. Les rubriques 1–8 et 11–12 sont **du matériau prêt à intégrer**.

---

## 2. TOUTES LES RECOMMANDATIONS — réunies par horizon

### 2.1 Maintenant (BETA active)
1. **Sécuriser le dépôt** : le passer en **privé**, sortir les données personnelles, renommer les 2 packs toxiques. *(détail : `docs/PLAN-NETTOYAGE-DEPOT.md`)*
2. **Vérifier la cohérence des dates** publiques (countdown accueil vs dates BETA) — une seule date partout.
3. **Déployer le teaser / l'accueil** à jour sur Vercel (charte `#7DD3FC`, 0 `#5fe0ff` résiduel).
4. **Activer les 13 réseaux** (bios prêtes, ~90 min) une fois l'accueil stable.

### 2.2 Court terme (post-stabilisation)
1. **Intégrer le Cockpit (rubrique 2)** dans navlys.com — cœur de l'expérience.
2. **Publier « Marge Révélée » (`/marge-revelee`)** : lead magnet + SEO longue traîne (« frais banque … »).
3. **Brancher le parcours Bridge (rubrique 6)** : remplacer les formulaires épars par UNE page « mon plan ».
4. **Pousser l'offre annuelle** (page tarifs : annuel mis en avant + argument pièce bronze).
5. **Lancer le calendrier social** (Publer, ~44 jours de contenu organique).

### 2.3 Moyen / long terme
1. **Cockpit immersif (rubrique 3)** : sortir de R&D vers la prod (versement mensuel intégré).
2. **Veille + brief du jour (rubriques 7-8)** : flux régulier qui prouve la rigueur (≠ prophétie).
3. **Mix de revenus** : abonnement en principal, affiliation en soutien.
4. **Localisation** : démarrer EN (déjà bilingue), puis DE / IT / ES / PT.

---

## 3. TOUTE LA STRATÉGIE — le socle en une page

### 3.1 Positionnement (non négociable)
- **Média éditeur pédagogique**, **PAS** CIF / **PAS** ORIAS / **PAS** IOBSP. Jamais de conseil
  personnalisé, jamais de promesse de rendement, jamais d'encaissement de fonds clients.
- **Dépersonnalisation** : NAVLYS ne se présente jamais comme « le projet de Bruno conseiller ».
  Bruno = invisible sur NAVLYS ; visible sur brunopartouche.com. Sens de réputation : Bruno → NAVLYS.
- **Architecture local-first** : l'app s'exécute sur l'appareil du membre ; NAVLYS n'a aucun accès
  aux clés broker ni aux paramètres. C'est l'argument de confiance central.

### 3.2 La méthode (le produit intellectuel)
- **90/10** : 90 % Forteresse (ETF larges, DCA, long terme) + 10 % Capital Plaisir (apprendre en jouant,
  pertes plafonnées). Validée par simulations (Monte Carlo / Kelly) → **rigueur, pas martingale**.
- Promesse honnête : *« 90 % à l'abri, 10 % pour apprendre »*, *« Le pourcentage séduit, l'euro décide. »*

### 3.3 Modèle économique (transparent)
- **Freemium** : on teste à 0 €, on paie seulement si ça apporte.
- Grille **figée** (validée) → `docs/STRATEGIE-NAVLYS.md` §5 :
  - **Finance** : Gratuit / 19,99 / 39,99 / 79,99
  - **NAVBIO (numérique, à vie, sans papier)** : 0 / 29,99 / 49,99 / 99,99 / 199,99
  - **NAVLEX** : 0 (5 questions) / 9,99 / 19,99
- Levier : affiliation **sans surcoût** pour l'utilisateur, toujours signalée.

### 3.4 Stack technique (réelle)
- **Front/Host** : Vercel (Next.js). **DB/Auth** : Supabase EU (RLS). **Emails** : Resend.
- **Monitoring** : Sentry + PostHog. **Voix** : ElevenLabs (disclaimer « voix générée par IA »).
- **IA** : Anthropic Claude. **Paiements** : Stripe. **WAF/DNS** : Cloudflare + Namecheap.
- Sécurité : secrets en variables d'env uniquement, jamais dans le dépôt.

### 3.5 Gouvernance interne
- 6 domaines (Site / Marque / Marketing / Monétisation / Infra / R&D) — voir `_NAVLYS_DEPARTEMENTS/`.
- **Règle financière absolue** : Bruno seul valide tout débit/investissement (sauf abonnements en cours).
- **Règle zéro répétition** : toute erreur va dans `docs/JOURNAL-ERREURS.md` avant de continuer.

---

## 4. CE QUI EST DÉJÀ FAIT vs CE QUI RESTE

**Déjà en place dans `sites/navlys.com/`** : accueil enrichi (FAQ honnête, maximes, signature),
`/tarifs`, `/cgu`, `/privacy`, `/mentions`, charte `#7DD3FC`.

**Matériau prêt à intégrer (dans les packs)** : Cockpit, Méthode 90/10 (5 écrans), Marge Révélée,
Bridge, Veille, Brief du jour, Press Kit, Brand Kit.

**Prochaine décision de Bruno** : dans quel ordre on intègre ces rubriques dans le site public,
et lesquelles deviennent des pages live vs des sections de l'accueil.

---

*Document vivant — mis à jour quand une rubrique passe de « prêt » à « intégré ». Aucune donnée privée.*
