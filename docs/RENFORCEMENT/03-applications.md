# 📱 RENFORCEMENT — 03. APPLICATIONS & ÉCOSYSTÈME

> Consolidé 2026-06-25 (`recup-docs/onedrive/`). Rien de public/payant déclenché. Décisions = Bruno.

---

## 📍 ÉTAT ACTUEL — les apps

| App | URL | Rôle | État (d'après docs) |
|---|---|---|---|
| **navlys.com** | navlys.com | App principale : onboarding, simulateur « Mon Cap Rêvé », NAV IA chat + voix, Labo NEXT GEN, paper-trading Alpaca, Carte du Jour | **BETA** (gate) |
| **NAVBIO Life** | navbiolife.com / navbiolive.com (domaine à confirmer) | Biographie vivante (livre/film de vie), dépôt photos/voix/textes chiffrés, transmission programmée | **R&D avancée → prod** |
| **NAVLYS.IO** | navlys.io | Studio / builder IA (« Tu parles, ton site naît »), micro-produits | **R&D / prototype** |
| **NAVLEX** | api/navlex | Q&A juridique (Claude) | intégré |
| **brunopartouche.com** | brunopartouche.com | Site perso de Bruno (vie, CV, BRUNO COIN 3D) — **lieu de la réputation source** | **en construction** (Next.js 15.5) |
| **Laboratoire NEXT GEN** | /laboratoire | Rapports du Cartographe (Monte Carlo, Kelly, backtests), ALCAPA | **live (BETA)** |
| **LÉGENDE** | — | Concept R&D biographies IA luxe | **parking R&D (à arbitrer)** |

### Parcours navlys.com (onboarding ~7 écrans)
1. **Mon Cap Rêvé** (choix d'objectif) → 2-7. **questionnaire 12 questions** (1 par écran, barre de
   progression) → **profil révélé** (métaphore maritime) → **routine personnalisée** → **activation** →
   accès app (NAV IA chat + Carte du Jour). Simulateur = Monte Carlo + 5 métriques honnêtes.

### Stack technique RÉELLE (confirmée)
- **Next.js 14** (navlys, navbio, navlys.io) / **Next.js 15.5** (brunopartouche) sur **Vercel**.
- **Supabase** (Postgres, Auth, RLS) · **Resend** (emails) · **Stripe** (paiements, compte à créer).
- **Claude** (NAV IA / SAV / NAVLEX) · **ElevenLabs** (voix, cache **Cloudflare R2**) · **HeyGen** (avatar).
- **Sentry + PostHog** (monitoring/analytics). **Alpaca** (paper-trading, read-only OAuth).
- **WhatsApp 360dialog** mentionné. ⚠️ **Aucune trace de « core Hetzner »** dans ces docs.

### Système quotas/crédits (NAVBIO)
- Quota mensuel par catégorie (souvenirs / vidéo IA / voix IA / synthèses bio) reset le 1er du mois,
  + crédits achetés (validité 12 mois). À 80 % → bannière + email ; à 100 % → modal (acheter/upgrade/attendre).

_Sources : `02_SITE_PRODUIT.md`, `04_INTEGRATION_4_APPS.md`, `07_RND_APP.md`, `03_API_BACKEND_NEXTJS.md`,
`01_ARCHITECTURE_VOIX_BRUNO.md`, `02_SYSTEME_QUOTAS_CREDITS.md`, `_NAVBIO_MASTER.md`,
`_CARTOGRAPHE_M3_SPEC_UX_APP_NAVLYS.md`, `_PHILOSOPHIE_NAVLYS_IO_CHARTE.md`._

---

## 💪 FORCES

- **Écosystème large et complémentaire** déjà spécifié en détail (UX, routes API, quotas).
- **Architecture voix soignée** : cache R2 (coût maîtrisé), streaming, `VOICE_ID` côté serveur.
- **Onboarding pédagogique** centré objectif (pas « vends-moi un produit »).
- **Paper-trading Alpaca read-only** = pas d'exécution d'ordre par NAVLYS (cohérent « pas de RTO »).

---

## ⚠️ FAIBLESSES / GAPS

- **Voix Bruno = « en attente »** (clonage / `VOICE_ID` à finaliser) — bloque NAV IA voix + NAVBIO narration.
- **Code des fonctionnalités live PAS dans ce dépôt** (`NAVLYS-BETA-` = refonte v2 statique + mémoire ;
  prod sur Vercel non versionnée — cf. ERR-006). → On peut **spécifier/auditer**, pas exécuter ici.
- **Stripe non créé** → aucun encaissement réel possible aujourd'hui (cohérent avec règle « pas Stripe LIVE sans Bruno »).
- **Domaine NAVBIO** et **NAVBIO perso vs deperso** non tranchés.
- **Cockpit 2.0** : 2 prototypes livrés, intégration prod non décidée.

---

## 🔧 RENFORCEMENTS CONCRETS

1. **Documenter chaque app dans une fiche figée** (URL, état, fonctionnalités, routes API, quotas) →
   ce fichier sert de base ; à compléter quand la prod est versionnée sous Git.
2. **Plan de finalisation voix** (sans secret en clair) : enregistrer l'échantillon Bruno → créer la
   voix ElevenLabs → poser `VOICE_ID` en env Vercel → A/B test → brancher NAV IA + NAVBIO.
3. **Brancher Stripe en mode TEST d'abord** (jamais LIVE sans Bruno) : seed produits/prix depuis le
   pack code prêt, webhook 4 events. **Aucun débit réel.**
4. **Versionner la prod sous Git** (procédure prête `docs/PROCEDURE-VERCEL-GITHUB.md`) — pré-requis
   pour pouvoir vraiment renforcer le code (et non juste la doc).
5. **Audit RGPD/quotas** : vérifier transparence quotas (cf. `06_RGPD_QUOTAS_TRANSPARENCE.md`).

---

## ⚖️ DÉCISIONS BRUNO (ce domaine)

- [ ] **Finaliser la voix** (clonage + `VOICE_ID`) — action Bruno (enregistrement + clés).
- [ ] **Domaine NAVBIO** (navbiolife.com / navbiolive.com / navbio.com ?).
- [ ] **NAVBIO** : marque autonome dépersonnalisée ou portée par Bruno ?
- [ ] **Cockpit 2.0** : intégrer en prod ou rester teaser ?
- [ ] **Créer le compte Stripe** + valider passage en mode TEST (puis LIVE = feu vert).
- [ ] **WhatsApp 360dialog** : activer les flux entrants ou rester potentiel ?
