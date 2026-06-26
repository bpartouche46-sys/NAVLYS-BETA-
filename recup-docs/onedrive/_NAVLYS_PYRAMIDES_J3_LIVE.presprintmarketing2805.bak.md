# 🏛 PYRAMIDES PAR PRODUIT — État J-3 (28 mai → 1ᵉʳ juin 2026)
*Pour Bruno · Tableau de bord live · Objectif : tout au VERT dans 3 jours*

> 🟢 = Fait · 🟡 = En cours · 🔴 = À faire bloquant · ⚓ = Test Client 001 BM

---

## ⚓⚓⚓ SPRINT AUTONOME 28/05 — RÉSUMÉ ULTIME (8 chantiers enchaînés)

| # | Chantier | Statut | Sources prêtes |
|---|---|---|---|
| P1 | Prix "À partir de 49 €" harmonisé (Cinzel or sur le 49) | ✅ | `_NAVLYS_IO_landing_v1.html` |
| P2 | Bandeau NAV IA · CHAT UNIVERSEL · arrive 2 JUIN | ✅ | `_NAV_IA_BADGE_universal.html` + 4 sites |
| P3 | Témoignages amis réels injectés | ✅ | navlys.com + navbiolife.com |
| P4 | NAVWEBIA → NAVLYIO partout, 0 mention Nova | ✅ | sources + audit live |
| T  | **TYPO refresh** : Fraunces · Lora · Manrope · Cinzel (badges) | ✅ | 5 sites (`.pre-typo.bak`) |
| T2 | **TYPO v2 condense** : sizes mobile 64/56/44/22, max 400, étirée | ✅ | 6 sites (`.pre-condense.bak`) |
| BG | **FOND VIVANT** Canvas étoiles + nébuleuses + filantes + particules dorées + vague | ✅ | `_BG_LIVING_universal.html` + 5 sites |
| GB | **GLOW BREATH** classes utilitaires (ice/gold/strong/bronze) respiration humaine 5 s | ✅ | `_GLOW_BREATH_utility.css` |
| TG | **TAGLINE BM officielle** : *Ma méthode, Votre argent, Votre tempo !* — BM (italic Fraunces or) | ✅ | bp-mobile-zen + navlys-io-vitrine + doc `_TAGLINE_BM_COMMUNICATIONS.md` |
| MCR | **MON CAP RÊVÉ** repositionnement rêve/voyage (interdit registre finance) | 🟡 doc verrouillée, à appliquer sur simulation.html | `_MON_CAP_REVE_repositionnement.md` |
| ED | **Charte éditoriale condensée** : 7 règles, 30 paires avant/après, templates | ✅ | `_CHARTE_EDITORIALE_CONDENSEE.md` |
| NT | **NAV TOP universel** : barre fine glassmorph + scroll + toggles langue/ambiance/musique + localStorage | ✅ | `_NAV_TOP_universal.html` (à injecter sur les 5 sites) |

---

## ⚓ SPRINT AUTONOME · 28/05 · 4 priorités groupées Bruno

### ✅ P1 — Police "À partir de 49 €" harmonisée (navlys.io)
- Fichier source : `_SITES_MASTER/_NAVLYS_IO_landing_v1.html`
- Avant : `.offre .price` en JetBrains Mono bronze-clair (cassait la charte)
- Après : Cinzel 600 / 54 px **or `#C9A961`** sur le « 49 » · Cormorant italic 22 px perle-doux sur « À partir de » · Cinzel 30 px or sur « € »
- « Gratuit » de l'Offre A aussi passé en Cinzel (cohérence)
- Audit transverse : navlys.com prix F1/F2/F3 derrière gate (non visible) — à revisiter post-lancement

### ✅ P2 — Bandeau « NAV IA · CHAT UNIVERSEL · arrive 2 JUIN »
- Snippet universel : `_SITES_MASTER/_NAV_IA_BADGE_universal.html`
- **Injecté sur les 4 sites** : navlys.com + navbiolife.com + navlys.io + brunopartouche.com (sources locales, prêt deploy)
- Visuel : pilule fixe bas-centre, point pulsant Ice Blue `#7DD3FC`, titre Cinzel or « NAV IA », message Cormorant italic, chip Cinzel « ARRIVE 2 JUIN »
- 3 animations : breathing 4,2 s · vague horizontale traversante 6 s (la « vague en mouvement permanent ») · halo respirant
- Bilingue auto (data-fr/data-en) · fermeture × session · auto-cache 24 h après le 2 juin

### ✅ P3 — Témoignages live injectés
- `_SITES_MASTER/testimonials-navlys.html` → injecté avant `<footer>` de `navlys.com/index.html` (#temoignages)
- `_SITES_MASTER/testimonials-navbio.html` → injecté avant `<footer>` de `_NAVBIO_TEASER_v4_compact.html`
- 9 cartes amis réels chacun (Rivka · Serjio · Rany B · Lera A · Valeria D · Benjamin · Victoria · Esther · BM fondateur). Charte respectée.

### ✅ P4 — Audit navwebia / Nova / NOVA
- Avant : 11 mentions « NAVWEBIA » dans `_NAVLYS_IO_landing_v1.html`
- Après `replace_all` NAVWEBIA → **NAVLYIO** : **0 mention restante** sur les 4 sources + projet `navlys/` Next.js
- Live (fetch HTTP 28/05) : aucune mention navwebia/Nova sur les 4 sites publics ✅
- Backups : `*.pre-navia.bak` · `*.pre-testi.bak` (rien supprimé sans OK)

### 🚢 Reste à pousser (deploy Vercel Bruno · ordre conseillé)
1. navbiolife.com 2. navlys.com 3. brunopartouche.com 4. navlys.io
Un seul deploy à la fois · attendre READY · token en `$VT` env-only.

### ❓ Décision attendue
La page pricing « NAVLYIO À partir de 49 € » (`_NAVLYS_IO_landing_v1.html`) n'est pas servie actuellement par navlys.io (la prod sert la « Vitrine live · Phare officiel »). **À pousser sous quelle route ?** (suggestion : `/offres` ou `/navlyio` ou en remplacement de la vitrine post-BETA)

---

## 🌊 PYRAMIDE NAVLYS.COM (méthode + éducation)

| # | Étage | Statut |
|---|---|---|
| 1 | Domaine + DNS + SSL | 🟢 |
| 2 | Charte + Logos famille | 🟢 |
| 3 | Cockpits 5 univers (v6 ciel) | 🟢 |
| 4 | Méthode 90/10 publiée FR + EN | 🟢 |
| 5 | Encyclopédie (histoire Bourse) | 🟢 |
| 6 | ⚓ TEST CLIENT 001 BM | 🟢 |
| 7 | Stripe Checkout abonnements | 🟡 |
| 8 | Lancement BETA 1ᵉʳ juin | 🔴 bloquant |

**Progression : 6/8 (75 %)** · Reste à vert : Stripe live + ouverture gate

---

## 🧬 PYRAMIDE NAVBIOLIFE.COM (biographie vivante)

| # | Étage | Statut |
|---|---|---|
| 1 | Domaine + DNS + SSL (life + live) | 🟢 |
| 2 | Charte famille NAVLYS appliquée | 🟢 |
| 3 | Cockpits v6 | 🟢 |
| 4 | Teaser BETA avec countdown ms | 🟢 |
| 5 | Manifeste BM signé | 🟢 |
| 6 | 5 chemins teasés (cadenas) | 🟢 |
| 7 | App téléchargeable dépôt souvenirs | 🔴 bloquant |
| 8 | Lancement BETA 1ᵉʳ juin | 🔴 bloquant |

**Progression : 6/8 (75 %)** · Reste à vert : App PWA dépôt + ouverture gate

---

## 🌐 PYRAMIDE NAVLYS.IO (vitrine + site builder IA)

| # | Étage | Statut |
|---|---|---|
| 1 | Domaine + DNS + SSL | 🟢 |
| 2 | Landing complète | 🟢 |
| 3 | Famille NAVLYS bar | 🟢 |
| 4 | Offres A/B affichées | 🟢 |
| 5 | Pricing Phase 0 défini (9-19 €) | 🟢 |
| 6 | Section Profils famille | 🟢 (live confirmé 28/05) |
| 7 | Section Créations live | 🟢 (live confirmé 28/05) |
| 8 | Section Partenariats live | 🟢 (live confirmé 28/05 · 19 partenaires) |
| 8b | Page pricing NAVLYIO (« À partir de 49 € ») | 🟡 source prête (`_NAVLYS_IO_landing_v1.html`), route à décider |
| 8c | Bandeau NAV IA · 2 JUIN injecté | 🟡 source prête, à déployer |
| 9 | App upload brief client | 🔴 bloquant |
| 10 | Pipeline IA synthèse Claude | 🔴 bloquant |
| 11 | Template Next.js paramétrable | 🔴 bloquant |
| 12 | Backoffice clés en main | 🔴 bloquant |
| 13 | Lancement BETA 1ᵉʳ juin | 🔴 bloquant |

**Progression : 5/13 (38 %)** · Le plus en retard — focus prioritaire

---

## ⚓ PYRAMIDE BRUNOPARTOUCHE.COM (vitrine pivot)

| # | Étage | Statut |
|---|---|---|
| 1 | Domaine + DNS + SSL | 🟢 |
| 2 | Hub pivot intouchable | 🟢 |
| 3 | BRUNO COIN 3D animée | 🟢 |
| 4 | 19 partenaires affichés | 🟢 |
| 5 | FAQ honnête (10 questions) | 🟢 |
| 6 | Section Journal vivante | 🟢 |
| 7 | Tagline officiel "Ma méthode · Votre argent · Votre tempo" | 🟢 |
| 8 | Mobile compact (espaces réduits) | 🟢 |
| 9 | Première vraie histoire publiée (par Bruno) | 🟡 |
| 10 | Bio complète remplie (/bio) | 🟢 squelette · 🟡 contenu réel |

**Progression : 8/10 (80 %)** · Le plus avancé — manque juste contenu réel à publier

---

## 📱 PYRAMIDE APP CLIENT NAVLYS (paper trading + signals)

| # | Étage | Statut |
|---|---|---|
| 1 | Backend Alpaca API connecté | 🟢 (paper trading live) |
| 2 | Widget Résultats temps réel | 🟢 (démo dans OneDrive) |
| 3 | Page /test-client-001 (preview dashboard) | 🟢 |
| 4 | Auth Supabase Google | 🟡 (Client ID + Secret OK, Save Supabase OK) |
| 5 | Compte utilisateur multi-tenant | 🔴 |
| 6 | Connexion options manuel/auto par partenaire | 🔴 |
| 7 | 2FA mobile pour opérations sensibles | 🔴 |
| 8 | Stripe Connect facturation | 🔴 |
| 9 | Lancement BETA 1ᵉʳ juin | 🔴 bloquant |

**Progression : 3/9 (33 %)** · Critique — manque backend multi-user

---

## 🧠 PYRAMIDE APP NAVBIO (dépôt souvenirs)

| # | Étage | Statut |
|---|---|---|
| 1 | Conception UX (5 chemins) | 🟢 documenté |
| 2 | Storage Cloudflare R2 | 🟡 (token créé, R2 à activer chez CF) |
| 3 | Upload photos/vidéos/voix | 🔴 |
| 4 | Synthèse IA brief → bio | 🔴 |
| 5 | Backoffice utilisateur | 🔴 |
| 6 | Stripe paliers (Solo/Couple/Premium/Cinéma/Pro) | 🔴 |
| 7 | PWA téléchargeable | 🔴 |
| 8 | Lancement BETA 1ᵉʳ juin | 🔴 bloquant |

**Progression : 1/8 (13 %)** · Plus tardive — peut décaler de 1-2 semaines après BETA navlys

---

## 🚀 APP NAVLYS.IO (site builder IA)

| # | Étage | Statut |
|---|---|---|
| 1 | Concept produit défini | 🟢 spec complète |
| 2 | Domaine vitrine en ligne | 🟢 |
| 3 | DB Supabase clients/projets | 🔴 |
| 4 | API Claude pour synthèse brief | 🔴 (Claude API à signer) |
| 5 | Template Next.js paramétrable | 🔴 |
| 6 | Pipeline génération auto site | 🔴 |
| 7 | Backoffice client livraison | 🔴 |
| 8 | Lancement BETA 1ᵉʳ juin | 🔴 bloquant |

**Progression : 2/8 (25 %)** · Idem NAVBIO — peut décaler

---

## 💎 PYRAMIDE DÉPARTEMENT BANQUES & FINANCES NAVLYS (créé 28/05 — Mission #1 Le Trésorier)

| # | Étage | Statut |
|---|---|---|
| 1 | Comptes opérationnels (banques + wallets + KYC) cartographiés | 🟢 doc `_BANQUES_ETAT_DES_COMPTES_BRUNO.md` |
| 2 | Affiliations publisher (10 prioritaires + 15 long tail) listées | 🟢 doc `_BANQUES_LIENS_PARTENAIRES_CPA.md` |
| 3 | Comptes brokers (API tests, paper/live, latence funding) comparés | 🟢 doc `_BROKERS_ALTERNATIVES_ALPACA_API.md` (11 brokers + scripts Python) |
| 4 | Flux d'encaissement (Stripe + Wise + Mizrahi + SWIFT vs SEPA) | 🟢 doc `_BANQUES_FLUX_ENCAISSEMENT.md` |
| 5 | Reporting & dashboard (chiffres mensuels, KPI affiliations) | 🟡 cadence proposée, premier rapport hebdo S+1 |
| 6 | Conformité & rappel statuts (Publisher CPA, PAS IOBSP/CIF/ORIAS) | 🟢 charte + disclaimers rédigés |
| 7 | Stratégie globale finances NAVLYS (groupe + perso Bruno) | 🟡 dépendance ouvertures comptes Bruno J-3 → J0 |

**Progression : 5/7 (71 %)** · Bloquant : Bruno doit exécuter sa checklist (IBKR, Binance Testnet, Lemon Markets, Mizrahi nom EN, Stripe KYC) J-3 → J0

---

# 🎯 SYNTHÈSE OBJECTIVES J-3

| Produit | Progression | Critique pour 1ᵉʳ juin ? |
|---|---|---|
| 🌊 navlys.com | **75 %** | ✅ OUI — quasi prêt |
| 🧬 navbiolife.com | **75 %** | ✅ OUI — quasi prêt (sauf app dépôt) |
| 🌐 navlys.io vitrine | **38 %** | ⚠️ À enrichir — sections profils/créations/partenariats manquantes |
| ⚓ brunopartouche.com | **80 %** | ✅ OUI — quasi prêt (contenu Bruno à pousser) |
| 📱 App Client NAVLYS | **33 %** | ⚠️ Backend multi-user critique |
| 🧠 App NAVBIO dépôt | **13 %** | ❌ Décaler à juin S2 |
| 🚀 App navlys.io builder | **25 %** | ❌ Décaler à juin S2 |
| 💎 Dépt Banques & Finances | **71 %** | ✅ OUI — flux Stripe + funding broker = condition même de l'encaissement |

---

## 🛠 ACTIONS PRIORITAIRES J-3 → J0 (Claude autonome)

### J-3 (28 mai)
- ✅ Pyramides séparées par produit (ce document)
- ✅ **P1 prix « À partir de 49 € » harmonisé (Cinzel or)**
- ✅ **P2 bandeau NAV IA · 2 JUIN posé sur les 4 sites (sources)**
- ✅ **P3 témoignages injectés navlys.com + navbiolife.com**
- ✅ **P4 navwebia / Nova = 0 mention sur sources + live**
- ✅ Section "Profils famille" sur navlys.io (déjà live · vérifié fetch HTTP)
- ✅ Section "Créations live" sur navlys.io (déjà live · vérifié fetch HTTP)
- ✅ Section "Partenariats live" sur navlys.io (déjà live · vérifié fetch HTTP)
- ⏳ Bouton "Première histoire" sur bp.com pour que Bruno publie le contenu
- ⏳ **Bruno : redeploy Vercel 4 projets (sources prêtes, backups en place)**

### J-2 (29 mai)
- ⏳ Backend Supabase multi-tenant pour app client
- ⏳ Stripe Checkout pour les 5 paliers NAVBIO + 2 paliers NAVLYS
- ⏳ Test flow complet inscription nouveau client

### J-1 (30 mai)
- ⏳ Audit final tous liens fonctionnent
- ⏳ Test mobile sur 3 navigateurs (Safari iOS, Chrome Android, Samsung Internet)
- ⏳ Préparation message gate ouvert minuit Jérusalem
- ⏳ Programmation 10 jours de posts dans Publer

### J0 (1ᵉʳ juin minuit Jérusalem)
- ⏳ Ouverture gates sur les 4 sites
- ⏳ Push premier message lancement réseaux
- ⏳ Monitoring 1ʳᵉs inscriptions
- ⏳ Veille technique 24h

---

## 🎬 ACTIONS BRUNO (pour passage au vert)

### Quand tu peux (5 min cumulés)
- 📝 1ʳᵉ histoire bp journal → tu m'envoies titre + 4 lignes texte + photo
- 📞 Appeler Mizrahi pour ajouter nom anglais "BRUNO MARK PARTOUCHE" sur compte (bloque Stripe payout)
- 💳 Compléter KYC Stripe (1-5 j ouvrés)
- 🏦 Activer Cloudflare R2 (besoin CB pour vérification)

### Quand tu peux (15 min cumulés)
- 🔐 Confirmer le Client Secret Google OAuth bien collé dans Supabase
- 📧 Récupérer Supabase ANON key (Settings → API → "anon public")
- 🤖 Signer Anthropic Claude API officiellement
- 📱 Tester sur ton mobile les 4 sites

---

*Document mis à jour à chaque deploy. Reviens régulièrement pour suivre l'avancement.*
