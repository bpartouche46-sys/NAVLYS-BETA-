# LIENS & AFFILIATIONS À VALIDER
**Mise à jour :** 24 mai 2026 (v2 — ajout page Investir & Partenaires)
**Sites :** NAVLYS (navlys.com / Vercel) · brunopartouche.com (Netlify)

---

## 1. RÉSUMÉ
- **NAVLYS** : 11 routes + teaser → **HTTP 200**. Aucun lien interne mort.
- **brunopartouche.com** : 7 pages (Accueil, Biographie, Parcours, Crédibilité, **Investir**, NAVBIO, Journal) → **HTTP 200** (versions `.html` et URL propres). Anciennes pages investissement → **404 propre**.
- **Liens morts : 0.**
- **Nouvelle page `partenaires.html` (Investir)** : invitation à rejoindre **NAVLYS** (lien `https://navlys.com`) + grille de **partenaires affiliés** + cadre « objectifs de vie ».
- **Garde-fous présents** : liens marqués affiliés, mention « Bruno n'exerce pas de conseil régulé », risque de perte en capital, méthode renvoyée à NAVLYS (plateforme éducative indépendante).

---

## 2. PARTENAIRES AFFILIÉS — brunopartouche.com (page « Investir »)
La grille est pilotée par le tableau **`window.BP_PARTNERS`** dans `partenaires.html`.
**Pour activer un partenaire : me donner son lien d'affiliation → je renseigne `url` → la carte devient cliquable.**
`url: null` → la carte affiche « Bientôt ».

| Partenaire | Lien actuel (placeholder) | Lien d'affiliation à fournir | Statut |
|-----------|---------------------------|------------------------------|--------|
| **Alpaca** (ton courtier propre) | `https://alpaca.markets` | lien referral Alpaca | ⚠️ à remplacer par ton lien affilié |
| **Binance** | `https://www.binance.com` | `?ref=…` | ⚠️ |
| **Bybit** | `https://www.bybit.com` | `?affiliate_id=…` | ⚠️ |
| **OKX** | `https://www.okx.com` | `/join/…` | ⚠️ |
| **Plus500** | `https://www.plus500.com` | lien CPA | ⚠️ |
| **eToro** | *(désactivé — « Bientôt »)* | lien CPA eToro | ⏳ à fournir pour activer |
| **+ tout nouveau partenaire** | — | dès que tu m'envoies l'URL | ➕ ajout automatique d'une carte |

> Procédure : tu m'envoies « Partenaire X = https://lien-affilié », j'ajoute une ligne à `BP_PARTNERS` et je redéploie.

---

## 3. AFFILIATIONS — NAVLYS (Vercel, variables d'env)
NAVLYS pilote ses liens via `NEXT_PUBLIC_AFFILIATE_*` (actuellement **non définies** → URL génériques sans commission). À brancher dans Vercel → `navlys-app` → Environment Variables :
```
NEXT_PUBLIC_AFFILIATE_BINANCE = https://accounts.binance.com/register?ref=TON_REF
NEXT_PUBLIC_AFFILIATE_BYBIT   = https://www.bybit.com/register?affiliate_id=TON_ID
NEXT_PUBLIC_AFFILIATE_OKX     = https://www.okx.com/join/TON_CODE
NEXT_PUBLIC_AFFILIATE_PLUS500 = (lien tracking)
NEXT_PUBLIC_AFFILIATE_ALPACA  = (lien referral)
```
> Les exemples `.env.example` contiennent le placeholder `NAVLYS` — **pas de vrais codes**.

## 4. CLÉS API BROKER (trading réel — plus tard, à 499 clients)
`ALPACA_KEY_ID` / `ALPACA_SECRET_KEY`, `BINANCE_TESTNET_*`, `BYBIT_TESTNET_*` — placeholders, à fournir uniquement à la réactivation exécution.

---

## 5. LIENS INTERNES — ÉTAT (testés HTTP)
- **NAVLYS** : `/`, `/cockpit`, `/objectif`, `/marge`, `/methode`, `/partenaires`, `/veille`, `/education`, `/dashboard`, `/login`, `/signup`, `/teaser.html`, `/demo.html` → **200 ✅**
- **brunopartouche.com** : `/`, `/a-propos`, `/cv`, `/credibilite`, `/partenaires` (Investir), `/app` (NAVBIO), `/journal`, `/sitemap.xml`, `/manifest.json`, `/robots.txt` → **200 ✅** (Netlify « Pretty URLs » : versions sans `.html` actives).
- Anciennes pages investissement (`nova`, `coffre`, `offres`, `membre`, `simulateur`, `dashboard`, `time-machine`, `ia-robotique`) → **404 propre ✅**
- **Lien sortant** brunopartouche.com → NAVLYS : `https://navlys.com` (invitation, voulu).

---

## 6. À VALIDER PAR BRUNO
1. **DNS (séparé)** : `navlys.com` → Vercel (alias OK) ; `brunopartouche.com` → Netlify (vérifier propagation : `https://brunopartouche.com`).
2. **Liens d'affiliation** : m'envoyer les vrais liens (Alpaca + brokers) → activation auto des cartes « Investir » + variables NAVLYS.
3. **eToro** : fournir le lien CPA pour passer la carte de « Bientôt » à active.
4. **Photo médaillon** : remplacer le placeholder par la vraie photo.
5. **Statut** : NAVLYS = éducatif uniquement ; brunopartouche.com = parcours **au passé**, statut ORIAS/CIF **non actif**, page Investir = liens **affiliés** (pas de conseil) — à reconfirmer avant toute promotion.
6. **Capture e-mail teaser NAVLYS** : endpoint `/api/preinscription` à brancher le jour J (fallback localStorage actif).

---
*Fin.*
