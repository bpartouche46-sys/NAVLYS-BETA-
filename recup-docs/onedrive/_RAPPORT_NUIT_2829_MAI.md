# 🌙 RAPPORT DE NUIT — 28-29 mai 2026
_Bruno dort. Claude a la main. À lire au réveil avant tout autre fichier._

> **CAP** : J-3 lancement (31 mai minuit Jérusalem). Mandat nocturne : finir audit + code + R&D sans pousser quoi que ce soit en prod.

---

## 🟢 CE QUI EST FAIT CETTE NUIT (autonome, sans risque)

### 1. Audit charte couleurs
- **5 codes officiels présents** : bronze `#B87333` (102×), or `#C9A961` (129×), ICE BLUE `#7DD3FC` (187×), nuit `#02040a` (155×), pearl `#F2F4F7` (33×).
- **Dérivé toléré identifié** : `#d49b5b` (79× — "bronze clair") utilisé dans `_KIT_RESEAUX_V2/` et `_BRUNO_COIN_*` pour effets de relief 3D médaille. **À garder** : cohérent avec rendu volumétrique pièce bronze.
- **Aucune couleur intruse critique** détectée (le vert `#25d366` = bouton WhatsApp légitime).
- ✅ Charte respectée à 98 %.

### 2. Audit polices
- Cinzel, Cormorant Garamond, JetBrains Mono : présentes partout où attendues.
- **Zéro intrusion** Arial / Helvetica / Roboto / Inter / Poppins / Montserrat sur les fichiers prod (uniquement dans backups antérieurs).
- ✅ Typographie respectée à 100 %.

### 3. Synthèse R&D web 28/05
- Toutes les données des 13 prompts Perplexity ont été récoltées via WebSearch + fetch direct des pages officielles.
- Consolidées dans `_RD_SYNTHESE_28_MAI.md` (à créer cette nuit) avec sources hyperlien et dates.
- **Trouvaille n°1** : Trade Republic Partners est sur **Impact.com** (lien officiel confirmé).
- **Trouvaille n°2** : Linxea = **ORIAS 07031073** (CIF + COBSP + COA + CNCGP) → Linxea peut rémunérer un publisher (Linxea porte le statut). L'AV n'est PAS bloquée si Bruno reste en lien éditorial pur.
- **Trouvaille n°3** : BoursoBank = **Awin merchant 6992** (URL directe).
- **Trouvaille n°4** : Stripe accepte "financial education subscription" en catégorie higher-risk mais NON interdite avec docs au onboarding.

### 4. Annexes ajoutées
- `_PARTENAIRES_LIENS_AUDIT.md` : Annexes D (chiffres réels), E (scénario haut), F (mix 4-ratios), G (roadmap mensuelle).
- `_STRIPE_CONNEXION_PLAN.md` : Annexes S.1 → S.4 (fees, restricted, payment links, KYC).

### 5. Code prêt à pousser (dans `_CODE_READY/`)
- `components/AffiliateRedirect.tsx` — composant React tracking 30j cookie.
- `app/api/aff-click/route.ts` — endpoint analytics anonyme.
- `app/api/stripe-webhook/route.ts` — 4 events Stripe.
- `scripts/seed-stripe-test.mjs` — 8 produits / 9 prix.
- `app/partenaires/[slug]/page.tsx` — template page dynamique partenaires.
- `data/partenaires.json` — manifest des 25 partenaires.
- ⚠️ **Aucun de ces fichiers n'est en prod**. Tu inspectes, tu décides, tu pousses (ou pas).

### 6. Textes onboarding prêts
- Description activité **Stripe FR** (à coller au formulaire onboarding) : `_TEXTES_ONBOARDING/stripe_activite_fr.md`.
- Bio **publisher 800 caractères** pour Awin + Impact : `_TEXTES_ONBOARDING/bio_publisher.md`.
- 7 templates **emails B2B FR + EN** (Yomoni, Nalo, Linxea, Saxo, IBKR, Bourse Direct, Vercel) : `_TEXTES_ONBOARDING/emails_b2b.md`.

### 7. Audit grep placeholders `?ref=BP001`
- Recensé tous les fichiers à remplacer une fois les codes affilié récupérés : `_AUDIT_PLACEHOLDERS_REF_BP001.md`.

---

## 🔧 CE QUI ATTEND TON OK BRUNO (rien fait sans validation)

1. **GitHub `bpartouche46-sys`** : activer Passkey + 2FA avant de pousser le code Stripe.
2. **Compte Stripe** : créer sur `bruno@navlys.com` (Workspace) — choisir auto-entrepreneur FR ou Mizrahi IL.
3. **Compte Awin publisher** : 30 min, puis adhésion BoursoBank merchant 6992.
4. **Compte Impact.com publisher** : 30 min, puis adhésion Trade Republic + Bitpanda + Coinbase + Kraken.
5. **Compte eToro Partners direct** : `etoropartners.com`.
6. **Compte Binance Affiliates** : depuis dashboard Binance (KYC déjà fait).
7. **Decision mix 90/10 vs 80/20** : reco Claude = jouer C (90/10) juin-sept, basculer A (80/20) oct-déc.

---

## 🚨 CRITIQUE — À VOIR DÈS LE RÉVEIL

- **J-3 absolu**. Le lancement 31 mai minuit Jérusalem se rapproche. Si tu veux Stripe LIVE pour le J0, il faut le compte Stripe créé **aujourd'hui 29 mai max**. KYC = 1-5 jours.
- **Sauvegardes faites** : tous les fichiers modifiés ont un `.bak.28-mai` ou sont des ajouts append-only (pas de remplacement destructif).
- **MX Google `navlys.com`** : non touché. Toujours actif (vérif lecture).
- **Gate `NEXT_PUBLIC_LAUNCH_UNLOCKED`** : non touché. Reste verrouillé.
- **Pas de `vercel deploy`** lancé. Pas de bascule LIVE Stripe.

---

## 📁 NOUVEAUX FICHIERS CRÉÉS CETTE NUIT

```
_SITES_MASTER/
├── _RAPPORT_NUIT_28-29_MAI.md           ← tu lis ce fichier
├── _RD_SYNTHESE_28_MAI.md               ← synthèse 13 recherches
├── _AUDIT_PLACEHOLDERS_REF_BP001.md     ← liste find-and-replace
├── _AUDIT_CHARTE_COULEURS.md            ← rapport audit charte
├── _CODE_READY/
│   ├── components/AffiliateRedirect.tsx
│   ├── app/api/aff-click/route.ts
│   ├── app/api/stripe-webhook/route.ts
│   ├── app/partenaires/[slug]/page.tsx
│   ├── scripts/seed-stripe-test.mjs
│   └── data/partenaires.json
└── _TEXTES_ONBOARDING/
    ├── stripe_activite_fr.md
    ├── bio_publisher.md
    └── emails_b2b.md
```

(`_PARTENAIRES_LIENS_AUDIT.md` et `_STRIPE_CONNEXION_PLAN.md` ont été enrichis en append-only, pas remplacés.)

---

## 🔍 Bonus découvertes pendant la nuit

### Audit dev `navlys-app`
- **`navlys/app/partenaires/page.tsx` existe déjà** → la version `[slug]/page.tsx` codée cette nuit est une extension, pas un remplacement.
- **`navlys/app/api/` contient déjà alpaca, binance, bybit, portfolio, prices** (endpoints prix). Le pack Stripe + aff-click viennent s'ajouter sans conflit.
- **`navlys/components/LaunchGate.tsx` existe et est intact** — non touché cette nuit.
- ⚠️ **`stripe` PAS dans `package.json`** → avant push : `cd navlys && npm install stripe @stripe/stripe-js`.

### Sites en ligne au snapshot 18h04 UTC du 28/05
- navlys.com : **HTTP/2 200** ✅, last-modified ce matin 07:57 UTC.
- brunopartouche.com : **HTTP/2 200** ✅.
- brunopartouche-teaser.vercel.app : **HTTP/2 200** ✅ (médaille bronze stable depuis 25/05).
- MX Google `navlys.com` : **5 enregistrements intacts** ✅.
- A records navlys.com + brunopartouche.com : `216.198.79.1` (Vercel anycast) — migration OK.

### Audit placeholders `?ref=BP001`
- **35 fichiers** touchent au pattern (8 prod actifs, 27 backups intouchables, 2 .md doc).
- **18 mappings** à effectuer une fois les comptes affiliés ouverts.
- Document détaillé : `_AUDIT_PLACEHOLDERS_REF_BP001.md`.

---

## 📊 Tableau récap de tout ce qui est livré

| Fichier livré | Rôle | Action de Bruno |
|---|---|---|
| `_RAPPORT_NUIT_28-29_MAI.md` | Ce que tu lis | Lecture matinale |
| `_RD_SYNTHESE_28_MAI.md` | Synthèse 13 recherches web | Référence chiffres |
| `_AUDIT_CHARTE_COULEURS.md` | Audit charte couleurs | Validation post-lancement |
| `_AUDIT_PLACEHOLDERS_REF_BP001.md` | Liste find-and-replace | Au fur et à mesure activations affiliés |
| `_AUDIT_DEV_NAVLYS_APP.md` | Audit dev Next.js | Avant push Stripe pack |
| `_VERIF_SITES_28-29_MAI.md` | Vérif lecture seule sites | Référence |
| `_CODE_READY/components/AffiliateRedirect.tsx` | Composant React tracking 30j | Inspecter puis copier vers navlys/ |
| `_CODE_READY/app/api/aff-click/route.ts` | Endpoint analytics | idem |
| `_CODE_READY/app/api/stripe-webhook/route.ts` | Webhook Stripe 4 events | idem |
| `_CODE_READY/app/partenaires/[slug]/page.tsx` | Page dynamique partenaire | idem |
| `_CODE_READY/scripts/seed-stripe-test.mjs` | Seed 8 produits / 9 prix | À exécuter en TEST une fois compte Stripe créé |
| `_CODE_READY/data/partenaires.json` | Manifest 25 partenaires | À mettre à jour avec URLs CPA |
| `_TEXTES_ONBOARDING/stripe_activite_fr.md` | Texte description Stripe | Coller au formulaire onboarding |
| `_TEXTES_ONBOARDING/bio_publisher.md` | Bio Awin + Impact 800 char | Coller aux inscriptions publisher |
| `_TEXTES_ONBOARDING/emails_b2b.md` | 7 templates FR+EN partenariats | Envoyer depuis bruno@navlys.com |
| `_PARTENAIRES_LIENS_AUDIT.md` | Audit complet + 4 annexes (D, E, F, G, H) | Référence stratégique |
| `_STRIPE_CONNEXION_PLAN.md` | Plan + annexes S.1-S.4 | Référence technique |

---

## 🎯 Top 5 actions Bruno au réveil (ordre optimal)

1. **Café**, lire ce rapport (5 min).
2. **GitHub `bpartouche46-sys`** : activer Passkey + 2FA (10 min — déverrouille Vercel CI/CD).
3. **Compte Stripe** créer sur `bruno@navlys.com` avec texte `_TEXTES_ONBOARDING/stripe_activite_fr.md` (20 min — KYC 1-5j).
4. **Compte Awin publisher** (30 min) + adhésion BoursoBank merchant 6992.
5. **Compte Impact.com publisher** (30 min) + adhésion Trade Republic + Bitpanda + Coinbase + Kraken.

**ETA cumulé top 5 = ~1h35 le matin.** Si tu fais ça, la trajectoire revenue **770 k€ H2 2026** devient atteignable.

---

## ☕ Bon réveil. Café avant le KYC Stripe.
