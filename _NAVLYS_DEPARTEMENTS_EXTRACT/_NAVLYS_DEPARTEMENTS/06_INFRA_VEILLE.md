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
- Tâche planifiée **`veille-infra-navlys`** (lundis 8h) — photo Netlify+Vercel + check SSL + détection doublons/builds cassés. Rapports : `NAVLYS_PILOTAGE/veille/`.

## 🌐 DNS — la manœuvre délicate
- navlys.com : Namecheap → zone Cloudflare → bascule nameservers → pointer Vercel.
  - A `@` → `216.198.79.1` · CNAME `www` → `cname.vercel-dns.com`.
- ⚠️ **GARDER les MX Google** (`bruno@navlys.com` ne doit jamais tomber). Recopier MX + SPF/DKIM/DMARC avant bascule.
- Filet : `NAVLYS_DNS_BASCULE_PACK/fr/08_ROLLBACK_PROCEDURE.md`. La bascule Namecheap = **action de Bruno**.
- Domaines possédés : navlys.fr (OVH, 2029), navlys.eu (OVH, 2027), navlys.com (Namecheap→Vercel), brunopartouche.com (Vercel, live).

## 🔐 /admin/cap
- 7 ENV vars Vercel (voir `NAVLYS_ADMIN_CAP_PACK/fr/GUIDE_INSTALLATION.md`). Secret TOTP en ENV uniquement.
- Test : login 2FA depuis le téléphone + publier un cap test.

## 📊 État & à faire
- ✅ Packs DNS, admin cap, portail, veille livrés et testés. Veille hebdo programmée (observation seule).
- ⚠️ Finaliser DNS navlys.com (garder MX) · ajouter les ENV /admin/cap · tester 2FA.
- 🔑 Accès registrar Namecheap (action Bruno).

## 🚫 Interdits / prudence
- ⛔ Ne pas déverrouiller le gate (`NEXT_PUBLIC_LAUNCH_UNLOCKED` reste `false`) avant le 31 mai.
- ⛔ Pas de token/secret en clair. ⛔ Pas de suppression en ligne sans OK (sauvegarder d'abord).
- ⛔ Ne JAMAIS enchaîner des déploiements rapprochés (404 + builds cassés).

## 📒 Incidents résolus (mémoire)
- 24/05 : navlys.com ERR_CONNECTION_CLOSED = SSL non émis → réémis (Let's Encrypt) ; check SSL ajouté à la veille.
- 24/05 : ménage Netlify 10→1 ; doublon Vercel `brunopartouche-com` supprimé.

## 🤝 Compte-rendu au QG (5 lignes).

## 🇬🇧 EN
Owns the engine room: DNS (Namecheap → Cloudflare → Vercel, **keep Google MX** so `bruno@navlys.com` never drops), Vercel ops/ENV, `/admin/cap` 2FA, weekly infra watch, SSL, security. To do: finalize navlys.com DNS, add admin-cap ENV vars, test 2FA. Never unlock the gate before May 31, never put secrets in plaintext, never chain deploys.

---
> *« Un cap, une main, un jour. »* · ⚠️ Information pédagogique, pas un conseil personnalisé. · Educational information only.
