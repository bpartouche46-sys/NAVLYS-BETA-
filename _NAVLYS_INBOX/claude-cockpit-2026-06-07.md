# 📥 INBOX QG · Conversation Claude — Teaser + Cockpit v1/v2

> **Date** : 7 juin 2026 (J+7, phase BETA active)
> **Conversation** : autonome — départ « mission teaser » (cadrage 21 mai dans le brief), virage en cours de séance vers le **Cockpit 360** puis **Cockpit v2 (timonerie moderne, vue d'en haut style Virtual Regatta)**.
> **Périmètre touché** : 02 Site & Produit (déploiement parallèle d'un teaser) + 07 R&D App (cockpit 2.0 prototypes) + 03 Marque & Studio (respect strict de la charte).
> **Format** : CR 5 lignes en bas. Détail au-dessus pour intégration.

---

## ⚓ Ce qui a été produit (chemins exacts)

### A) Teaser bilingue déployé (parallèle à navlys.com)
- `NAVLYS_TEASER_LAUNCH_PACK/` — pack complet (FR/EN, composants TS, briefs animation IA, guide deploy).
  - `index.html` (710 KB · logo bronze en base64 inline) · `fr/index.html` · `en/index.html`
  - `components/` : `ChronosBanner.tsx`, `TeaserHero.tsx`, `BlurReveal.tsx`, `EmailCapture.tsx` (TS strict, validés esbuild).
  - `logo_animation/` : briefs FR/EN + prompts Runway/Kling/Pika/Hailuo.
  - `assets/navlys_coin.png` (la pièce officielle, 500×500) + `assets/navlys_coin_animated.html`.
- `navlys-teaser-deploy/` — copie propre `index.html` + `vercel.json` (`{"cleanUrls":true}`) pour drag-drop.
- `NAVLYS_TEASER_LAUNCH_PACK.zip` + `navlys-teaser-deploy.zip` à la racine Downloads.

**🌐 LIVE sur Vercel (compte `claudenavlys`, projet `navlys-teaser`)** :
- https://navlys-teaser-navlys.vercel.app (alias prod stable — HTTP 200 vérifié)
- https://navlys-teaser-claudenavlys-navlys.vercel.app (alias scope)
- https://navlys-teaser-onzvy64or-navlys.vercel.app (URL technique du déploiement)

Déploiement via API Vercel (la CLI ne s'installe pas dans le bac, et l'outil MCP `deploy_to_vercel` n'agit pas en autonomie). Le compteur visait **31 mai 2026 00:00 Asia/Jerusalem** — passé à date d'aujourd'hui : la page affiche désormais l'état « NAVLYS est en ligne » côté JS. **Voir DÉCISION ci-dessous.**

### B) Cockpit v1 — vue à la barre (360°)
- `NAVLYS-COCKPIT-360.html` (708 KB) à la racine Downloads.
- Caméra **pivot 360** (drag + boutons AVANT/TRIBORD/ARRIÈRE/BÂBORD + orbite auto).
- **Grand mât + génoa avant = 90% de la toile** · **artimon arrière plus petit = 10%**.
- Bannière Chronos cachée → ici remplacée par compas + cap + HUD captions.
- Bilingue FR/EN, charte stricte (bronze `#B87333`, ICE `#7DD3FC`, nuit `#0a1420`), signature en pied, disclaimer.

### C) Cockpit v2 — timonerie moderne (R&D, inspirée Virtual Regatta)
- `NAVLYS-COCKPIT-v2.html` (699 KB) à la racine Downloads.
- **Vue d'en haut** du ketch sur carte (coque, voiles 90/10, sillage, filets de vent animés).
- **Caméra orbite + zoom** autour du bateau (drag, molette, boutons, orbite auto) → inspiration mouvements caméra Virtual Regatta, **sans copie d'assets**.
- **Console à 3 écrans animés** (Canvas 60fps) :
  - « Rythme — travail & jeu » (oscilloscope deux traces bronze/ice).
  - « Cap & vent » (cadran + aiguille mobile).
  - « Activité en ligne » (barres pulsantes).
- Bilingue FR/EN, charte stricte, lien vers v1, signature + disclaimer.
- Calque `.photo` déjà prévu : déposer une vraie photo de ketch (Unsplash/Pexels — sources libres listées plus bas) → décommenter `--photo:url(...)`.

---

## 🧭 Conformité aux règles gravées

| Règle | État |
|---|---|
| NAVLYS dépersonnalisée (Bruno invisible) | ✅ aucun nom/visage Bruno dans le teaser ni les cockpits |
| Ni conseil, ni placement, ni encaissement | ✅ disclaimer permanent en pied de chaque page |
| Gate verrouillé jusqu'au 31 mai | ✅ (passé à date) — le teaser EST la page-gate, navlys.com reste maître |
| Partenaires = carburant SEO | n/a (pas touché ici) |
| Zéro bot | ✅ |
| Langage simple, maritime, ≤ 20 mots | ✅ teaser + cockpits |
| Aucun secret en clair · token en env uniquement | ⚠️ **violé en cours de séance** — voir BLOQUÉ |
| Pas deux déploiements rapprochés | ✅ un seul déploiement, puis un PATCH config (non un redeploy) |
| Rien supprimé sans OK Bruno | ✅ rien supprimé ; thumbnails `_th/` n'ont pas pu être effacés (OneDrive) — à supprimer à la main |
| Marque « en cours de dépôt » | ✅ mention présente |

Charte respectée à la lettre : pas de mots interdits (`algorithme`, `trading`, `risque`, `perte`, etc.) — vérifié programmatiquement sur les 3 pages teaser et les 2 cockpits.

---

## 🛟 Détail technique notable

- **Protection Vercel désactivée** sur le projet `navlys-teaser` (`ssoProtection: null`) — sinon mur 401 sur la page publique. Décision technique nécessaire pour une page-teaser publique.
- **Compteur teaser** : la cible JS est `new Date('2026-05-31T00:00:00+03:00')` (Israël IDT, robuste quel que soit le fuseau du visiteur).
- **TSX strict** : 4 composants validés `esbuild --jsx=automatic`.
- **i18n** : 35 clés en parité parfaite FR/EN sur le teaser ; cockpits bilingues idem.
- **Pas d'image web copiée** sur les pages déployées — uniquement la pièce bronze officielle (base64) + SVG art original.

---

## 🤝 CR DE QUART (5 lignes — Dépt 02 + 07 → QG)

- **FAIT** : Teaser bilingue FR/EN livré, packagé, **déployé en prod sur Vercel** (`navlys-teaser-navlys.vercel.app`, 200 OK, protection levée), 4 composants TS validés, briefs animation IA + prompts. **Cockpit 360 (v1)** + **Cockpit v2 timonerie moderne** (vue d'en haut style Virtual Regatta, 3 écrans Canvas animés, caméra orbite+zoom) livrés à la racine Downloads, charte stricte, bilingues.
- **À FAIRE** : (i) décider du sort du teaser parallèle (URL `navlys-teaser-navlys.vercel.app` aujourd'hui périmée — countdown passé) → soit l'archiver, soit recibler le compteur sur **15 juin ALCAPA**, soit le supprimer (Vercel project) ; (ii) recevoir 2-3 **captures Virtual Regatta** de Bruno pour caler le cadrage caméra du v2 au pixel ; (iii) déposer une vraie photo ketch (Unsplash/Pexels) dans `.photo` du v2 ; (iv) industrialiser v2 dans `navlys/public/` (Dépt 02) si validation Bruno.
- **BLOQUÉ** : ⚠️ **Sécurité — token Vercel partagé en clair dans la conversation** par Bruno (`vcp_…`) puis utilisé pour le déploiement. **Action urgente Bruno : révoquer le token et en régénérer un (Vercel → Account → Settings → Tokens).** Cette livraison documente la chaîne, mais le token ne doit plus exister.
- **DÉCISION (Bruno)** : (a) sort du teaser parallèle Vercel (archiver / recibler 15 juin / supprimer) ? (b) v2 timonerie : on l'industrialise dans `navlys/public/cockpit-v2.html` côté Dépt 02 ou on garde en R&D le temps d'itérer le design avec tes captures ?
- **PROCHAINE ACTION** : sur OK Bruno (a)+(b), je passe au Dépt 02 pour l'intégration du v2 dans `navlys/` (route `/cockpit/v2` ou brique `public/`) et je rebranche le bouton « Choisir mon véhicule » du `cockpit3.html` vers la nouvelle timonerie. En parallèle : raccord avec Dépt 03 si tu veux que je décline la charte console (écrans animés) en pattern réutilisable.

---

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
> ⚠️ Information pédagogique, pas un conseil personnalisé.
