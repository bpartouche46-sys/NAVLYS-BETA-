# ❓ RENFORCEMENT — 05. FAQ · SAV · NAV IA (assistant)

> Consolidé 2026-06-25 (`recup-docs/onedrive/`). Rien de public déclenché. Décisions = Bruno.

---

## 📍 ÉTAT ACTUEL

### NAV IA (system prompt G1)
- Assistant **Claude** (Haiku par défaut, escalade Sonnet sur mots sensibles : « rendement »,
  « doubler », « martingale », « ORIAS », « CIF »…).
- **Refus systématiques (garde-fous G1)** :
  - **Promesse de rendement** → refus (« personne ne peut promettre un rendement futur »).
  - **Bruno présenté comme CIF/ORIAS/conseiller** → refus (« média pédagogique, pas conseiller »).
  - **Recommandation nominative** (« achète X / vends Y ») → refus (« je ne peux pas te dire quoi acheter »).
  - **Stratégies invalidées** (martingale, +2 %/jour…) → renvoie au verdict d'invalidation du Labo.
  - **Conseil médical / juridique / fiscal personnalisé** → renvoie vers un professionnel agréé.
- **Disclaimer en 1er message** : « Je suis une IA (Claude d'Anthropic). Pas un humain. Pas un
  conseiller financier. Je ne te dirai jamais quoi acheter ou vendre. »

### Knowledge base & FAQ
- **KB NAV IA** : ~120 Q/R bilingues couvrant les 4 sites (méthode 90/10, tarifs, sécurité RGPD,
  partenaires, NAVBIO, NAVLYS.IO, parcours Bruno) + une encyclopédie d'articles fondateurs.
- **FAQ juridique NAVBIO** : ~20 Q/R (droits image, mineurs, célébrités, chiffrement, succession,
  RGPD, signalements DSA) — fichier `09_FAQ_JURIDIQUE_PUBLIC.md`.
- ⚠️ Pas (encore) de **page FAQ produit unifiée** identifiée comme telle dans le dépôt → à construire/localiser.

### SAV
- Multicanal : **chat NAV IA** (24/7) + emails (bonjour@/support@/legal@/dpo@/presse@navlys.com) +
  WhatsApp (opt-in, 3 msg/sem max) + escalade humaine vers Bruno (conseil insistant, plainte, presse).
- Templates prêts : 15 emails + 10 WhatsApp (bilingues), avec un template « refus de conseil personnalisé ».
- Architecture live : `navlys-alive.js` → `/api/sav` (chat) + `/api/voice` (audio ElevenLabs).

### Voix dans le SAV / NAV IA
- Disclaimer **« Voix générée par IA »** sous chaque lecteur. Sur « c'est vraiment ta voix Bruno ? »
  → réponse transparente « Non, je suis NAV IA, clone IA officiel avec consentement » (règle R7).

_Sources : `_NAV_IA_SYSTEM_PROMPT_CLAUDE.md`, `_NAV_IA_KNOWLEDGE_BASE_INITIALE.md`,
`09_FAQ_JURIDIQUE_PUBLIC.md`, `06_AVERTISSEMENTS_UI_NAVBIO.md`, `01_ARCHITECTURE_VOIX_BRUNO.md`,
`08_CONFORMITE_LEGALE_VOIX_CLONEE.md`._

---

## 💪 FORCES

- **G1 robuste** : les 5 refus couvrent les principaux risques réglementaires.
- **Disclaimer dès le 1er message** + sous chaque audio = transparence IA forte (IA Act).
- **Escalade humaine** bien pensée (le doute remonte à Bruno).
- **Base de connaissance riche** déjà rédigée (120 Q/R + FAQ juridique).

---

## ⚠️ FAIBLESSES / GAPS

- **Pas de FAQ produit unifiée** unique qui alimente à la fois le site public ET le SAV.
- **Cohérence chiffres** (prix, dates) entre KB, FAQ et site à vérifier après arbitrage Bruno.
- **Tension deperso** : la « voix de Bruno » dans un produit « sans Bruno » → traitée par disclaimer,
  mais à arbitrer (cf. `02-communication.md`).
- **Cadrage martingale dans la FAQ/SAV** : doit être explicite (« invalidée, jamais promue »).

---

## 🔧 RENFORCEMENTS CONCRETS

1. **Construire une FAQ unifiée** (1 source) qui alimente le site + le SAV + NAV IA, structurée en
   3 blocs : **Produit** (90/10, prix, accès, BETA) · **Conformité** (pas de conseil, pas CIF/ORIAS,
   martingale invalidée, disclaimer) · **Voix/IA** (c'est une IA, voix générée par IA, données).
   → après arbitrage prix/date par Bruno.
2. **Durcir le system prompt G1** (drafts de garde-fous, sûrs car non publics) :
   - Refuser toute reformulation contournante de promesse de rendement.
   - Sur la martingale : répondre uniquement « hypothèse testée et **invalidée** par le Labo », jamais
     « comment la faire ».
   - Ne jamais simuler un conseil personnalisé même « pour exemple ».
3. **Aligner FAQ ↔ disclaimers ↔ KB** sur les chiffres figés (prix, date) une fois tranchés.
4. **Tester le SAV** (batterie de questions pièges déjà esquissée dans `docs/TESTS-FONCTIONNELS.md` V6)
   dès qu'une URL live est fournie par Bruno.

### ✍️ DRAFT — squelette FAQ unifiée (à valider, non publié)
- **Produit** : C'est quoi NAVLYS ? · La méthode 90/10 ? · Combien ça coûte ? · C'est quoi la BETA ?
- **Conformité** : NAVLYS donne-t-il des conseils ? (Non) · Bruno est-il conseiller agréé ? (Non, éditeur)
  · Promettez-vous des gains ? (Non) · La martingale, ça marche ? (Non — invalidée par le Labo).
- **Voix/IA** : Qui me répond ? (une IA) · Est-ce vraiment la voix de Bruno ? (voix générée par IA,
  avec consentement) · Que faites-vous de mes données ? (RGPD).

---

## ⚖️ DÉCISIONS BRUNO (ce domaine)

- [ ] Valider la **création d'une FAQ produit unifiée** (et où elle vit : page publique navlys.com).
- [ ] **URL live** du SAV/NAV IA pour tester les garde-fous G1 en conditions réelles.
- [ ] Valider le **durcissement du G1** proposé.
- [ ] Confirmer la **liste des emails publics** (bonjour@/support@/legal@/dpo@/presse@).
