# 💻 DÉPARTEMENT WEB & TECH — BRIEF

## Mission
Intégrer la politique d'animation aux 3 sites, finir les pages manquantes, et trancher la question des applications mobiles.

## ✅ Contexte (existant)
- **brunopartouche.com** : en ligne sur Vercel, DNS basculé, HTTPS OK. 8 routes + miroir EN live.
- **NAVLYS** : `navlys.fr`/`navlys.eu` OK ; `navlys.com` DNS à finaliser (pack `NAVLYS_DNS_BASCULE_PACK`). ~30 packs prêts.
- **NAVBIO** : page offre `/navlys-bio-live` (39 €) live ; app privée à finaliser.

## 🔧 Instructions
1. **Intégrer le kit** `DESIGN_BRAND/kit/navlys-coin.js` dans : header brunopartouche.com, splash NAVLYS-HUB, splash app NAVBIO. (1 balise + 1 script, voir `kit/INTEGRATION.md`).
2. **3 pages BP manquantes** à créer : `/cv`, `/credibilite`, `/navlys-live-news` (drop-in HTML/Next). → l'assistant peut les écrire ici.
3. **Favicons** : générer `.ico` depuis les pièces (NAVLYS + BP).
4. **NAVBIO app privée** : saisie 1 clic, mood tracker, « photo du jour » (flou doux), localStorage, miroir FR/EN. → l'assistant peut produire la maquette + composants.

## 📱 QUESTION MOBILE — réponse factuelle (à valider par Bruno)
**Oui, on peut avoir une présence mobile iOS + Android tout de suite. Deux voies :**

| Voie | Délai | Coût immédiat | Conséquences |
|---|---|---|---|
| **A. PWA** (Progressive Web App) | **immédiat** | **0 €** | « Ajouter à l'écran d'accueil » sur iOS & Android, icône, plein écran, hors-ligne léger. Pas dans les stores. Idéal pour démarrer au 31 mai. Packs déjà prêts : `NAVLYS_PORTAL_APP` (PWA). |
| **B. Apps natives stores** (via Capacitor, on emballe le site web existant) | ~1–2 semaines | **~124 $ + build** | Apple Developer **99 $/an** + Google Play **25 $ une fois**. Capacitor réutilise le code web → peu de dev. Mises à jour soumises à validation Apple/Google. |
| **C. Apps 100 % natives** (Swift + Kotlin, from scratch) | 2–4 mois | **élevé** (dev) | Inutile à ce stade — aucun gain vs B pour notre contenu. |

**Recommandation technique** : **A maintenant** (gratuit, au lancement), puis **B** (Capacitor) pour être dans l'App Store / Play Store sous 2 semaines si tu veux la vitrine « vraie app ». Éviter C.
*Décision Bruno : A seul, ou A puis B ?*

## ❓ Questions à trancher (Bruno)
- Apps mobiles : voie **A** (PWA gratuite) seule, ou enchaîner **B** (stores, ~124 $/an) ? Ouvrir les comptes Apple/Google dès maintenant ?
- Les 3 pages BP : je les rédige ici dès ton feu vert.

## 🤖 Ce que l'assistant peut produire ici
Pages `/cv` `/credibilite` `/navlys-live-news` · wrappers **Capacitor** (configs iOS/Android prêtes) · manifest PWA + service worker · favicons `.ico` · app NAVBIO (maquette).

---
*Généré par l'assistant — non-conseil ; coûts indicatifs à confirmer auprès d'Apple/Google.*
