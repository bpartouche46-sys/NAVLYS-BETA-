# 🔧 DÉPARTEMENT 06 — INFRA & VEILLE

> Briefing autonome. Une conversation qui lit ceci tient la salle des machines : DNS, Vercel, /admin/cap, veille hebdo, SSL, sécurité.

## 🎯 Mission
Garder le navire à flot et sûr : DNS propre (sans couper l'email pro), déploiements stables, mini-app admin du cap quotidien, surveillance SSL/infra, zéro fuite de secret.

## 🧰 Périmètre
- **Gère** : DNS, Vercel (réglages, ENV, domaines), `/admin/cap`, veille infra, SSL, sécurité.
- **Ne gère pas** : contenu (04), prix (05), visuels (03). Le code applicatif relève de 02 ; toi tu gères l'exploitation.

## 📚 Packs de référence
- `NAVLYS_DNS_BASCULE_PACK/` — plan complet Namecheap → Cloudflare → Vercel (01→08) + inventaire DNS + records Google Workspace + rollback + quick reference.
- `NAVLYS_ADMIN_CAP_PACK/` — mini-app `/admin/cap` 2FA TOTP + diffusion 9h Web Push + guides install/usage.
- `NAVLYS_PORTAL_APP/` — portail BETA + PWA + guides déploiement (`MISE_EN_LIGNE_MAINTENANT.md`, `BASCULE_NAMECHEAP_CLOUDFLARE.md`).
- `NAVLYS_VEILLE_PREMIUM_PACK/` — radar des oracles (données Capteur 3).
- **Veille UNIQUE** : tâche planifiée **`veille-infra-navlys`** (lundis 8h) — photo Netlify+Vercel + check SSL/DNS + détection doublons de marque/builds cassés. Rapports : `NAVLYS_PILOTAGE/veille/`. ⚓ *Les tâches `veille-sites-navlys` et `veille-etat-des-lieux-navlys` ont été MISES EN PAUSE le 25/05 (doublons) — 1 seule veille, réversible.*

## 🌐 DNS — la manœuvre délicate
- navlys.com : Namecheap → zone Cloudflare → bascule nameservers → pointer Vercel.
  - A `@` → `216.198.79.1` · CNAME `www` → `cname.vercel-dns.com`.
- ⚠️ **GARDER les MX Google** (`bruno@navlys.com` ne doit jamais tomber). Recopier MX + SPF/DKIM/DMARC avant bascule.
- Filet : `NAVLYS_DNS_BASCULE_PACK/fr/08_ROLLBACK_PROCEDURE.md`. La bascule Namecheap = **action de Bruno**.
- Domaines possédés : navlys.fr (OVH, 2029), navlys.eu (OVH, 2027), navlys.com (Namecheap→Vercel), brunopartouche.com (**Netlify `novafinanceclub`, live, SSL OK** — A → 75.2.60.5 ; vérifié le 25/05).
- ⚠️ **brunopartouche.com vit sur Netlify, PAS sur Vercel.** Ne JAMAIS pointer ce domaine vers un projet Vercel tant qu'il est sur Netlify (sinon on rejoue la panne SSL du 24/05).

## 🔐 /admin/cap
- 7 ENV vars Vercel (voir `NAVLYS_ADMIN_CAP_PACK/fr/GUIDE_INSTALLATION.md`). Secret TOTP en ENV uniquement.
- Test : login 2FA depuis le téléphone + publier un cap test.

## 📊 État live (vérifié 25/05/2026, lecture seule)
- ✅ **Netlify = 1 seul site** (`novafinanceclub` → brunopartouche.com, ready). Ménage 10→1 confirmé.
- ✅ **navlys.com** → Vercel `navlys-app` (READY, gate verrouillé). SSL OK (exp. 22/08, ~89 j). Pas d'AAAA fantôme.
- ✅ **brunopartouche.com** → Netlify, HTTP 200, SSL OK. DNS réparé (ne pointe plus sur le parking Namecheap).
- ⚠️ **Doublon de marque qui ré-émerge sur Vercel** : 3 quais pour le site perso → Netlify `novafinanceclub` (LIVE) + Vercel `brunopartouche` + Vercel `brunopartouche-teaser` (READY, sans domaine custom). À arbitrer (garder 1).
- ⚠️ `navlys-teaser` (Vercel) toujours séparé de `navlys-app` → garder ou fondre dans le gate ?
- 📷 Photo détaillée (22/05, désormais **superseded**) : `_NAVLYS_CONSOLIDATION/PHOTO_ONLINE_2026-05-22.html` + `PLAN_1_PROJET_PAR_SITE.md`. Source de vérité vivante = `NAVLYS_PILOTAGE/veille/`.

## 📊 À faire
- ⚠️ Finaliser DNS navlys.com (garder MX) · ajouter les ENV /admin/cap · tester 2FA.
- ⚠️ Trancher les doublons Vercel `brunopartouche` / `brunopartouche-teaser` et `navlys-teaser` (décision Bruno, puis suppression sur OK).
- 🔑 Accès registrar Namecheap (action Bruno).

## 🚫 Interdits / prudence
- ⛔ Ne pas déverrouiller le gate (`NEXT_PUBLIC_LAUNCH_UNLOCKED` reste `false`) avant le 31 mai.
- ⛔ Pas de token/secret en clair. ⛔ Pas de suppression en ligne sans OK (sauvegarder d'abord).
- ⛔ Ne JAMAIS enchaîner des déploiements rapprochés (404 + builds cassés).

## 📒 Incidents résolus (mémoire)
- 24/05 : navlys.com ERR_CONNECTION_CLOSED = SSL non émis → réémis (Let's Encrypt) ; check SSL ajouté à la veille.
- 24/05 : ménage Netlify 10→1 ; doublon Vercel `brunopartouche-com` supprimé.
- 25/05 : vérifié — ménage Netlify tenu (1 site), SSL des 3 domaines sain. **Nouveau à surveiller** : 2 projets Vercel `brunopartouche` + `brunopartouche-teaser` réapparus (sans domaine custom) ; veille `veille-infra-navlys` durcie pour détecter ce doublon de marque ; 2 veilles redondantes mises en pause.

## 🤝 Compte-rendu au QG (5 lignes).

## 🇬🇧 EN
Owns the engine room: DNS (Namecheap → Cloudflare → Vercel, **keep Google MX** so `bruno@navlys.com` never drops), Vercel ops/ENV, `/admin/cap` 2FA, weekly infra watch, SSL, security. To do: finalize navlys.com DNS, add admin-cap ENV vars, test 2FA. Never unlock the gate before May 31, never put secrets in plaintext, never chain deploys.

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.

---
## 📥 ORDRE QG @ALL — 25 mai 2026 · 22:00 (Nash NAVLYS — bloquant)
- **Activer Alpaca Paper API** : créer compte paper dédié NAVLYS, générer clés, mettre en ENV Vercel : `ALPACA_PAPER_KEY`, `ALPACA_PAPER_SECRET`, `ALPACA_PAPER_BASE=https://paper-api.alpaca.markets`, `ALPACA_DATA_URL=https://data.alpaca.markets`. Vérifier latence + endpoints.
- Étendre le **radar Veille** (`NAVLYS_VEILLE_PREMIUM_PACK/data/sources.json`) avec les verticales Nash : IA générale & majors, IA militaire/sécurité (style Palantir), mémoires & processeurs IA, IA médicale, grands groupes IA-enabled.
- Reste sur tes ordres en cours : D1 ménage Vercel, D7 DNS navlys.com (garder MX Google), D4 alias contact@navlys.com.
