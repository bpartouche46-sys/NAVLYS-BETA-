# 🧭 SYNTHÈSE MAÎTRESSE NAVLYS — consolidation de la mémoire récupérée (v1)

> Reconstituée à partir des **162 documents** récupérés de l'ancien PC (`recup-docs/`),
> recoupés avec le code live (`live-source/`) et la mémoire actuelle (`CLAUDE.md`, `docs/`).
> **Ordre de vérité d'origine** : `_MASTER_NAVLYS_NOW.md` → `_NAVLYS_DISPATCH.md` →
> `_NAVLYS_MASTER_INDEX.md` → `_NAVLYS_DEPARTEMENTS/`.
> Date de consolidation : session 2026-06-25. Statut : **v1 à valider par Bruno + gardien.**

---

## 1. IDENTITÉ & POSITIONNEMENT (règles gravées)

- **NAVLYS = marque produit DÉPERSONNALISÉE.** Bruno est **invisible** sur NAVLYS ; il vit sur
  **brunopartouche.com** (sa vie, son CV, le BRUNO COIN). Réputation : **Bruno → NAVLYS, jamais l'inverse.**
- **Média éditeur pédagogique** sur la finance. **PAS IOBSP / PAS CIF / PAS ORIAS.** Modèle
  **publisher CPA** (affiliation éditoriale, comme un YouTubeur finance). **Aucun conseil personnalisé,
  aucun encaissement de fonds clients.**
- **Méthode 90/10** : 90 % « dort » (1-2 ETF World, DCA) + 10 % « joue » (Laboratoire NEXT GEN).
- **Ton** : maritime, imagé, tutoiement, phrases ≤ 20 mots, **disclaimer en pied partout**.
- **Slogan** (à FIGER — variantes vues) : « Ma méthode, ton argent, ton **tempo / rythme / contrôle**. »
- **Lancement** : gate ouvert **31 mai / 1ᵉʳ juin 2026** (minuit `Asia/Jerusalem` = fuseau technique).
  Phase **BETA**. Tarif BETA **verrouillé à vie 39 €/mois** avant le 30 juin.

## 2. PERSONAS / DÉPARTEMENTS (l'organisation)

| Persona / Dép. | Rôle |
|---|---|
| **MasterNav** (01 Direction/QG) | Orchestrateur, garde la source de vérité |
| **Le Cartographe** (07 R&D / Labo NEXT GEN) | Teste et **PUBLIE les invalidations** (martingale, +2 %/j… → 0 stratégie active ne bat l'ETF World). Persona public, presse via `presse@navlys.com` |
| **Le Veilleur de Coffre** (06 Infra) | Sécurité (headers, clés, anti-deepfake) |
| 02 Site & Produit · 03 Marque & Studio · 04 Marketing & Réseaux · 05 Monétisation | Conversations vierges pilotées par briefing `_NAVLYS_DEPARTEMENTS/` |

## 3. APPLICATIONS (l'écosystème)

- **navlys.com** — app **Next.js 14** : simulateur « Mon Cap Rêvé », onboarding 7 écrans (12 questions →
  profil → routine → allocation → espérance honnête → activation → dashboard), **NAV IA** chat (Claude)
  + **voix** (ElevenLabs). Gate de lancement.
- **NAVBIO Life** (navbiolife.com / navbiolive.com) — biographie vivante (livre + film de sa vie),
  dépôt photos/voix/textes, transmission programmée. Tarifs **19 / 29 / 39 / 149 / 199 €**.
- **NAVLYS.IO** (navlys.io) — Studio / outils de simulation, micro-produits **9-19 €**.
- **NAVLEX** — Q&A juridique (`api/navlex.js`, Claude).
- **brunopartouche.com** — site perso (vie, CV, BRUNO COIN 3D).
- **Laboratoire NEXT GEN** — page `/laboratoire`, rapports Cartographe (Monte Carlo, Kelly, backtests),
  **ALCAPA** (`NAVLYS-LAB-MARTINGALE-v7.html`, verdict GO/WAIT/NOGO).

## 4. STACK TECHNIQUE (le « core » réel)

- **Host/front** : **Vercel** (team NAVLYS), Next.js 14 App Router, Edge **Frankfurt**.
- **DB/Auth** : **Supabase EU** (Frankfurt), RLS, **magic link** (Resend pour les emails).
- **Monitoring** : **Sentry** + Vercel Analytics.
- **Voix** : **ElevenLabs** PVC (`api/voice.js`, Edge ; VOICE_ID en env — retiré du code ✓).
- **IA** : **Anthropic Claude** (Haiku majoritaire) pour SAV / NAVLEX / NAV IA.
  *(NAVBIO mentionne aussi OpenAI → à clarifier.)*
- **WhatsApp** : 360dialog (D360) webhook.
- ⚠️ **Le « core central Hetzner » de `CLAUDE.md` n'apparaît PAS dans les docs récents** → semble
  **périmé / legacy**. **À clarifier avec Bruno.**

## 5. CALCULS / FINANCE

- **90/10** (Forteresse ETF/DCA + Capital Plaisir).
- **Simulateur objectif** : intérêts composés, mensualité, durée (`lib/objectif.ts`), **3 scénarios honnêtes**
  (haut / médian / bas) sur **vraies données**.
- **Espérance honnête** : CAGR min-max, volatilité, proba perte > 20 %/an, horizon mini, pire année.
  Sources : **Shiller 1928-2025, FRED 60/40, Monte Carlo 2 000 chemins**.
- **Laboratoire** : Monte Carlo, Kelly, backtests ; **ALCAPA = 4 critères → verdict**.
- **Martingale** : traitée comme **hypothèse INVALIDÉE** (proba de ruine 100 %). **Bot Alpaca = privé, hors marque.**
- 🔧 *Renforcement* : documenter formellement chaque calcul (méthode, hypothèses, limites) ; vérifier la
  **cohérence des chiffres** entre docs ; disclaimer systématique.

## 6. COMMUNICATION / RÉSEAUX

- **Go-to-market 100 % influenceurs** (organique d'abord, offre gratuite « Membre d'Honneur », NAVBIO
  gratuit à vie, affiliation 50 %). Outils HypeAuditor / Modash. Garde-fous : **18+, opt-in, #partenaire, zéro bot**.
- **Calendrier social J0 → J+30** (posts prêts J0-J10 : TikTok, YT Shorts, Insta, LinkedIn, X threads, Threads, FB).
  Thèmes : gate ouvert · 90/10 · BRUNO COIN · Cartographe · NAVBIO · « on publie nos échecs ».
- **13 réseaux** (BRAND_KIT) + **30+** (RESEAUX_EXTENDED), via **Publer**. Presse : PRESS_KIT, embargo.
- **VIP** : prospection **JCVD** (ambassadeur — garde-fous avocat/management) + influenceurs.
- **Vidéo manifeste** : 12 langues × formats (ElevenLabs voix + HeyGen avatar + Descript + Epidemic Sound).
- 🔧 *Renforcement* : **figer le slogan** ; vérifier la **dépersonnalisation** dans chaque post
  (les scripts influenceurs disent « ici Bruno, fondateur de NAVLYS » → **arbitrer** la limite public/privé) ;
  **harmoniser dates/prix** ; **retirer « Jérusalem »** des textes publics (garder le fuseau en interne).

## 7. FAQ / SAV / NAV IA

- **SAV vocal** : `navlys-alive.js` → `/api/sav` (chat Claude) + `/api/voice` (audio ElevenLabs).
- **FAQ** : pas trouvée comme page dédiée dans le dépôt → **à localiser/construire**. NAVLEX = Q&A juridique.
  `09_FAQ_JURIDIQUE_PUBLIC.md` existe.
- 🔧 *Renforcement* : construire une **FAQ unifiée** (produit + conformité + voix) qui **alimente le SAV** ;
  durcir le **system prompt G1** (refus conseil perso / promesse de rendement) ; cohérence avec les disclaimers.

## 8. LÉGAL / CONFORMITÉ

- **Bible juridique unifiée**, CGU + Politique de confidentialité NAVBIO, décharge liability, contrat de
  bonne conduite, **kit floutage** (personnes connues), FAQ juridique, plan d'action 48h, audit antériorité.
- **Voix** : cadre **IA Act art. 50** (transparence), **RGPD art. 9** (biométrie), **consentement** signé,
  **anti-deepfake R1-R7**, CGU ElevenLabs.
- **Entité** : ambiguïté **FR auto-entrepreneur** vs **société IL (banque Mizrahi)** / **[entité — hors dépôt] LTD**
  (contrat JCVD) → **DÉCISION Bruno + avocat**.
- **Disclaimer G1** présent partout (5 emplacements dans l'app).

## 9. SÉCURITÉ / INFRA

- **9 headers HTTP** (cible A+), HSTS preload, CSP, `.well-known/security.txt`.
- **DNSSEC/CAA**, **Cloudflare WAF**, auth niveau bancaire, tests auto, monitoring incidents, bunker plan.
- **Veille infra** (MasterNav) : SSL, DNS, **MX Google `navlys.com` à PRÉSERVER** sur toute modif DNS.
- Règles : **aucun secret en clair** (env only) · **jamais 2 déploiements enchaînés** (404 transitoires) ·
  **rien supprimé sans backup**.
- 🔴 **Token Vercel exposé → à régénérer** (Bruno). ✓ VOICE_ID retiré du code. ✓ Fichiers à secret en quarantaine hors Git.

## 10. ⚖️ DÉCISIONS EN ATTENTE (pour Bruno)

1. 🔴 **Régénérer le token Vercel** (exposé en clair).
2. **Entité juridique** (FR auto-entrepreneur / société IL) → Stripe + contrats.
3. **Clarifier le « core Hetzner »** (legacy/abandonné ?) vs stack Vercel+Supabase.
4. **Figer le slogan** + le **prix BETA** (39 € à vie vs 49 €/490 €).
5. **Date de lancement effective** (countdown live = 1ᵉʳ juillet ; docs = 31 mai/1ᵉʳ juin) → quel cap ?
6. **Dépersonnalisation** vs scripts où « Bruno, fondateur de NAVLYS » apparaît → arbitrer public/privé.
7. **Charte couleur** : **#7DD3FC confirmée** → corriger le `#5fe0ff` résiduel partout.
8. **Valider** prospection JCVD / influenceurs (avocat).
9. **Relier Vercel ↔ GitHub** (procédure prête) pour déployer par simple push.

## 11. DOUBLONS / NETTOYAGE (rien supprimé sans OK Bruno)

L'index signale des doublons (Coin standalone, bandeau-anime, 24 zips de packs déjà dézippés,
Martingale Lab v5_1/v5_2) et 2 fichiers cassés. **Liste seulement — décision Bruno, fichier par fichier.**

---

> *« Un cap, une main, un jour. »* — Cette synthèse est le **gouvernail consolidé** : on part de là pour renforcer.
