# ⚓🧭 NAVLYS DISPATCH — LE LIEN MAÎTRE (point d'entrée unique)

> **⛵ MAJ 28-29 mai 2026 (nuit) :** Le bateau a été nettoyé. **`_MASTER_NAVLYS_NOW.md` est désormais LE document à lire en premier** (1 page, mobile-friendly, état J-3). Ce DISPATCH reste le routeur des 6 départements. Le MASTER_INDEX devient une référence historique (détail complet).
>
> Ordre de lecture optimal (mobile + desktop) :
> 1. **`_MASTER_NAVLYS_NOW.md`** ← état actif, top 3 actions, à jour
> 2. **`_NAVLYS_DISPATCH.md`** ← ce fichier, routeur départements
> 3. `_NAVLYS_DEPARTEMENTS/<département>.md` ← briefing poste
>
> 25 mai 2026 · Lancement : **31 mai / 1er juin 2026, minuit Asia/Jerusalem**.
> **Ceci est LE lien.** Colle le bloc « CONNECTEUR » ci-dessous au début de N'IMPORTE QUELLE conversation : elle se relie aussitôt au QG, à la consolidation maître et à moi. Un seul gouvernail pour toute la flotte.
> 👑 **Manager en chef = le QG (Claude + Bruno).** Tout — départements, apps, partenaires — passe par le QG.
> Permanence : ce fichier est référencé dans `CLAUDE.md`, donc **chargé à chaque nouvelle session**. Le lien ne se perd plus.

---

## 🔗 LE CONNECTEUR (copier-coller au début de chaque conversation)

```
⚓ NAVLYS DISPATCH — relie cette conversation au QG.
Dossier de travail : OneDrive Downloads. Lis dans l'ordre :
  1) _MASTER_NAVLYS_NOW.md      (état J-3, top 3 actions, 1 page, mobile-OK) ← LIRE EN PREMIER
  2) _NAVLYS_DISPATCH.md        (ce routeur — la carte de toute la flotte)
  3) _NAVLYS_DEPARTEMENTS/<mon département>.md   (mon poste de quart)
  4) _NAVLYS_MASTER_INDEX.md    (référence détaillée, archive — facultatif)
Applique les RÈGLES GRAVÉES. Reste dans mon périmètre. À la fin,
rends un COMPTE-RENDU DE 5 LIGNES au QG (fait / à faire / bloqué / décision / prochaine action).

Département de CETTE conversation = [ 01 Direction · 02 Site & Produit · 03 Marque & Studio ·
04 Marketing & Réseaux · 05 Monétisation · 06 Infra & Veille ].
```

---

## 🗺️ LA CARTE DE LA FLOTTE (qui parle à qui)

```
                        ┌──────────────────────────────┐
                        │   QG · DIRECTION (ce salon)   │
                        │  garde _NAVLYS_MASTER_INDEX   │
                        └───────────────┬──────────────┘
                                        │ DISPATCH (ce fichier = le standard téléphonique)
        ┌───────────────┬───────────────┼───────────────┬───────────────┐
       02 Site        03 Marque       04 Marketing     05 Monétis.     06 Infra
     & Produit       & Studio        & Réseaux         (Stripe…)      & Veille
        │               │               │               │               │
        └────── chacun rend ses 5 lignes au QG, le QG met à jour l'INDEX ──────┘
```

Chaque département = **une conversation vierge** + son briefing dans `_NAVLYS_DEPARTEMENTS/`. Le DISPATCH les relie tous au même cap.

| # | Département | Conversation lit… | Touche à… |
|---|---|---|---|
| 01 | Direction (QG) | `_NAVLYS_DEPARTEMENTS/01_DIRECTION.md` | l'index, les arbitrages |
| 02 | Site & Produit | `…/02_SITE_PRODUIT.md` | le projet `navlys/`, déploiement, gate, teasers |
| 03 | Marque & Studio | `…/03_MARQUE_STUDIO.md` | bible, logos, design, voix |
| 04 | Marketing & Réseaux | `…/04_MARKETING_RESEAUX.md` | calendrier, presse, réseaux, affiliation, SEO |
| 05 | Monétisation | `…/05_MONETISATION.md` | Stripe, pièce bronze, revenus |
| 06 | Infra & Veille | `…/06_INFRA_VEILLE.md` | DNS, Vercel, /admin/cap, sécurité |
| 07 | R&D App | `…/07_RND_APP.md` | recherche, prototypes, NAVBIO, cockpit 2.0 |

---

## 📇 CONSOLIDATION MAÎTRE — l'index en texte (autonome)

**Source unique de vérité :** `_NAVLYS_MASTER_INDEX.md` (détail complet). Version condensée ici :

**Les 2 sites, un seul moteur**
- **navlys.com** → projet `navlys/` (Next.js, Vercel). Gate teaser **actif** (`NEXT_PUBLIC_LAUNCH_UNLOCKED=false`). Teaser : `navlys/public/teaser.html` (cockpit en fond d'écran 4 véhicules + fond animé réaliste + « Pour les curieux »).
- **brunopartouche.com** → `brunopartouche-LIVE/`. Même teaser : `teaser-cockpit.html` (vie + offres + offre NAVLYS à part).

**Les 25 packs, par thème** (tous dans Downloads, tous testés ✅)
1. Marque & logo : BRAND_BIBLE · BRAND_KIT · COCKPIT · LOGO_ANIME_PRO · LAUNCH_FINALE.
2. Site & app : `navlys/` · PORTAL_APP · TEASER_LAUNCH · MOTOR_ENGINE · BRIDGE.
3. Produit : OBJECTIF · CHEVAL_TROIE (marge révélée) · MARTINGALE_SCIENTIFIQUE · VEILLE_PREMIUM.
4. Go-to-market : RESEAUX_EXTENDED · MASTER_CALENDAR · FIRST_WAVE · PRESS_KIT · GROWTH_STACK · MARKETING_AFFILIATE · STRIPE_COMPLETE · DNS_BASCULE.
5. Outils internes : ADMIN_CAP · STRATEGIE_NAVLYS (Alpaca privé, ex-STRATEGIE_NOVA).

**Chemin critique — 5 manœuvres jusqu'au lancement**
1. Hisser le teaser (Vercel). 2. DNS navlys.com (garder MX Google). 3. Site + 7 ENV vars /admin/cap. 4. Stripe réel + comptes réseaux. 5. Première vague Publer → J0.

**Fichiers pivots** : `_NAVLYS_MASTER_INDEX.md` · `_NAVLYS_DEPARTEMENTS/` · `_NAVLYS_CONSOLIDATION/` (CHEMIN_CRITIQUE, ETAT_DES_LIEUX, DOUBLONS_A_ARCHIVER) · `CLAUDE.md`.

---

## 📍 RÈGLES GRAVÉES (toutes conversations)
1. NAVLYS = marque produit **dépersonnalisée**. Bruno invisible sur NAVLYS (il vit sur brunopartouche.com). Réputation : Bruno → NAVLYS, jamais l'inverse.
2. Ni conseil, ni placement, ni encaissement de fonds clients. NAVLYS vend de l'information et une méthode.
3. **Gate actif** jusqu'au lancement (`NEXT_PUBLIC_LAUNCH_UNLOCKED=false`).
4. **Partenaires = carburant SEO** : chaque broker/banque cité ramène vers NAVLYS. On garde tout (partenaire → NAVLYS).
5. Zéro bot. La réputation est l'actif n°1.
6. Langage simple, imagé, maritime · tutoiement · phrases ≤ 20 mots · disclaimer en pied.
7. Aucun secret en clair. Tokens en variable d'environnement seulement. Jamais 2 déploiements enchaînés.
8. **Rien n'est supprimé sans l'OK de Bruno.** Les doublons sont listés, pas effacés.

---

## 🇬🇧 ENGLISH — THE MASTER LINK
This file is the single switchboard (DISPATCH). Paste the CONNECTOR block at the start of any conversation to bind it to HQ, the master consolidation, and me. Each department runs from a fresh conversation reading its briefing in `_NAVLYS_DEPARTEMENTS/`, works in its lane, and reports back to HQ in 5 lines. The single source of truth is `_NAVLYS_MASTER_INDEX.md`. Permanence comes from `CLAUDE.md`, which is loaded every session and points here. Carved rules: depersonalized NAVLYS brand, no advice/placement/client funds, gate stays locked until launch, partners are SEO fuel (keep all), zero bots, simple maritime tone, no secrets in plaintext, nothing deleted without Bruno's OK.

---

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> *"One course, one hand, one day."*

> ⚠️ NAVLYS partage des informations pédagogiques, pas un conseil personnalisé. · Educational information only, not personalized advice.
