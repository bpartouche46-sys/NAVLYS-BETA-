# ⚓ NAVLYS — ORGANIGRAMME DES DÉPARTEMENTS

> 25 mai 2026 · Lancement : **31 mai 2026, minuit Asia/Jerusalem**.
> **Cette conversation-ci = le QG (Direction).** Tout est consolidé ici.
> Chaque autre département se pilote depuis **une conversation vierge** : tu y colles le briefing du département, et ce salon-là prend son service en main, seul.

---

## 🇫🇷 COMMENT ÇA MARCHE

Le navire NAVLYS est trop grand pour une seule barre. On le découpe en **6 postes de quart**. Chaque poste a son briefing autonome : un marin (une conversation Claude vierge) l'ouvre à froid et sait immédiatement quoi faire.

**Pour armer un département :**
1. Ouvre une **nouvelle conversation** Claude (vierge).
2. Colle (ou fais lire) le fichier du département depuis `Downloads/_NAVLYS_DEPARTEMENTS/`.
3. Le département travaille dans son périmètre, et **remonte ses décisions au QG** (ce salon) via un court compte-rendu que tu rapportes ici.

**Règle d'or de la flotte :** la Direction (ce salon) garde la source unique de vérité (`_NAVLYS_MASTER_INDEX.md`). Les départements exécutent ; ils ne réécrivent pas la stratégie sans valider au QG.

---

## 🧭 LES 6 DÉPARTEMENTS

| # | Département | Mission en une ligne | Fichier briefing |
|---|---|---|---|
| 01 | **DIRECTION (QG)** | Orchestration, source de vérité, arbitrages, chemin critique | `01_DIRECTION.md` |
| 02 | **SITE & PRODUIT** | Le projet `navlys/` (Next.js) : déploiement, gate, routes, simulateurs, cockpit | `02_SITE_PRODUIT.md` |
| 03 | **MARQUE & STUDIO** | Bible de marque, logos animés, design system cockpit, voix, visuels | `03_MARQUE_STUDIO.md` |
| 04 | **MARKETING & RÉSEAUX** | Calendrier 44 j, première vague, presse, 30+ réseaux, growth, affiliation, SEO | `04_MARKETING_RESEAUX.md` |
| 05 | **MONÉTISATION** | Stripe 49/490/39 €, pièce bronze, revenus affiliés, apport banques/assurances | `05_MONETISATION.md` |
| 06 | **INFRA & VEILLE** | DNS (garder MX Google), Vercel, /admin/cap, veille hebdo, SSL, sécurité | `06_INFRA_VEILLE.md` |

---

## 🗺️ QUI TOUCHE À QUOI (frontières nettes)

- **SITE & PRODUIT** est le seul à modifier le code de `navlys/`. Les autres lui passent commande.
- **MARQUE & STUDIO** fournit les assets (logos, couleurs, voix) ; SITE les intègre.
- **MARKETING** produit les posts/calendriers ; il ne déploie pas le site.
- **MONÉTISATION** définit prix et flux Stripe ; SITE branche les boutons.
- **INFRA & VEILLE** gère DNS/Vercel/sécurité ; il ne touche pas au contenu.
- **DIRECTION** tranche les conflits et tient `_NAVLYS_MASTER_INDEX.md` à jour.

---

## 📍 RÈGLES GRAVÉES — VALABLES POUR TOUS LES DÉPARTEMENTS

1. **NAVLYS = marque produit dépersonnalisée.** Bruno invisible sur NAVLYS (il vit sur brunopartouche.com). Réputation : Bruno → NAVLYS, jamais l'inverse.
2. **Ni conseil, ni placement, ni encaissement de fonds clients.** NAVLYS vend de l'information et une méthode.
3. **Gate actif jusqu'au 31 mai.** `NEXT_PUBLIC_LAUNCH_UNLOCKED` reste `false` (teaser plein écran). Ne pas déverrouiller avant.
4. **Partenaires = carburant SEO.** Chaque nom de broker/banque cité ramène vers NAVLYS. On les garde tous (sens partenaire → NAVLYS).
5. **Zéro bot** auto-like/follow/DM. La réputation est l'actif n°1.
6. **Langage simple, imagé, maritime**, tutoiement, phrases ≤ 20 mots. Disclaimer en pied partout.
7. **Aucun secret en clair** dans un fichier. Tokens en variable d'environnement uniquement.

---

## 🇬🇧 QUICK EN SUMMARY
This conversation is HQ (Direction) and holds the single source of truth (`_NAVLYS_MASTER_INDEX.md`). NAVLYS is split into **6 departments**; each is run from a **fresh conversation** by pasting its briefing from `Downloads/_NAVLYS_DEPARTEMENTS/`. Departments execute within their lane and report decisions back to HQ. Shared rules: NAVLYS is a depersonalized product brand (Bruno invisible), no advice/no placement/no client funds, gate stays locked until May 31, partners are SEO fuel (keep all), zero bots, simple maritime tone, no secrets in plaintext.

---

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> *"One course, one hand, one day. NAVLYS guides you to your goal in a single move."*

> ⚠️ NAVLYS partage des informations pédagogiques, pas un conseil personnalisé. · Educational information only, not personalized advice.
