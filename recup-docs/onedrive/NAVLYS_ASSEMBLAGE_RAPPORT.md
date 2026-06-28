# NAVLYS — Rapport d'assemblage & mise en cohérence
> Date : 24 mai 2026 · App canonique : `Downloads/navlys/` (Next.js 14.2.15)
> Mission : RELIER + METTRE EN FORME l'existant (pas de nouveau contenu). Pas de déploiement.

## ✅ Statut du build
`npm run build` (= `next build`) **PASSE** — build PROPRE.
- `✓ Compiled successfully` · `✓ Generating static pages (24/24)` · TypeScript `tsc --noEmit` : 0 erreur.
- 13 pages + 9 routes API compilées. Seul avertissement (bénin) : *edge runtime on a page disables static generation* (route `/api/prices/crypto`).
- Vérifié dans un environnement Linux propre (`npm install` reconstruit + `next build`). Sur ta machine Windows : `npm install` puis `npm run build`.

## 📊 Complétude route par route (avant → après)
| Route | Avant | Après |
|---|---|---|
| `/` (accueil) | Palette pourpre obsolète, hero « paper trading / 10 000 USDT » | Hero maritime « Vise ton cap, atteins-le » + 3 outils + **7 escales** (Bridge) + teaser pricing 49/490/39 + partenaires · Ice Blue |
| gate (verrou) | Chrono J:H:M:S:**ms**, cible Jérusalem minuit, lock home seulement | Chrono **J/H/M/S uniquement**, cible **2026-05-31T21:00:00Z**, tick 1 s, **verrouille tout le site** (flou 14px) |
| `/objectif` | OK (3 modes, 8 objectifs) — accents pourpres | Idem + accents Ice Blue |
| `/methode` | OK (90/10, martingale sci.) — palette pourpre | Idem + encart « objectif honnête +8 à 12 %/an **sans garantie** » · Ice Blue |
| `/marge` | OK (5 banques, calculateur) — palette pourpre | Idem · Ice Blue (héritée) |
| `/veille` | Cours crypto live seulement | + **Radar des oracles** (3 cercles + quorum 4/6) · Ice Blue |
| `/cockpit` | OK (iframe immersif) déjà bronze/ice | Inchangé (déjà conforme) |
| `/partenaires` | 5 brokers (URLs réelles en repli) + 5 fiches banques | URLs → **placeholders `#`** + `rel="sponsored nofollow noopener"` · Ice Blue |
| `/rejoindre-equipage` | **ABSENTE** | **CRÉÉE** : 49/490/39 €, pièce bronze, paliers affiliation (Bouée/Voile/Phare/Capitaine) |
| `/dashboard` | OK (portefeuille papier) | Idem + bouton « Vendre » rouge lisible · Ice Blue |
| `/education` | OK (6 fiches) | Inchangé fonctionnellement · Ice Blue (héritée) |
| `/login` `/signup` | OK (Supabase) | Inchangé · Ice Blue (héritée) |
| `/univers` (iframe `univers.html`) | Embarquait le **journal perso de Bruno**, mention **« CIF/ORIAS de Bruno »**, ref `BRUNO46` | Section « résultats » retirée, mention CIF/Bruno supprimée, ref → `TONCODE` |
| `/api/*` (9 routes) | OK | Inchangé |

## 🔗 Ce que j'ai relié (depuis les packs, sans rien inventer)
- **globals.css** repeint en **Ice Blue #7DD3FC sur fond noir** (+ accent bronze #C9A961), noms de variables conservés → toutes les pages héritent.
- **Logo Nav** : la pastille « N » rose → **pièce bronze** + anneau ice ; sous-titre = tagline « vise ton cap, atteins-le ».
- **Disclaimer** (pied de CHAQUE page) : version canonique « tu », bilingue FR/EN + **signature** « Un cap, une main, un jour… ».
- **Accueil** : 7 escales (`NAVLYS_BRIDGE_PACK`), teaser tarifs (`NAVLYS_STRIPE_COMPLETE_PACK`).
- **/rejoindre-equipage** : tarifs 49/490/39 + pièce bronze + paliers affiliation (`NAVLYS_MARKETING_AFFILIATE_PACK`).
- **/veille** : radar des oracles (`NAVLYS_VEILLE_PREMIUM_PACK`).
- **/methode** : cadre « objectif honnête +8 à 12 %/an sans garantie » (`_NAVLYS_POSITIONING` + martingale).
- **Gate** (`public/teaser.html`) : chrono nettoyé (J/H/M/S, cible 2026-05-31T21:00:00Z), verrou au niveau layout.
- **.env.example** : ajout `NEXT_PUBLIC_LAUNCH_UNLOCKED`, `NEXT_PUBLIC_NOTIFY_ENDPOINT`, clés/Payment Links Stripe, liens d'affiliation vides.

## 🛡️ Règles dures vérifiées (toutes OK)
Aucun nom/photo de Bruno · aucun « NOVA » · aucun « CIF/ORIAS actif » · aucun détail d'algorithme · aucune promesse de rendement au-delà de « +8 à 12 %/an sans garantie » · Ice Blue #7DD3FC sur noir · pièce bronze · sève + taglines · disclaimer permanent · voix « tu » · bilingue FR/EN.

## 🔑 Ce que SEUL toi (Bruno) peux fournir
1. **Vraies URLs d'affiliation broker** → variables Vercel : `NEXT_PUBLIC_AFFILIATE_BINANCE/BYBIT/OKX/PLUS500/ALPACA` (sinon les cartes pointent sur `#`).
2. **Stripe** → `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` + Payment Links `NEXT_PUBLIC_STRIPE_LINK_MONTHLY/ANNUAL/BIO_LIVE` (sinon boutons « Bientôt disponible »).
3. **Supabase** (login/dashboard) : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
4. **Déverrouillage** le jour J : poser `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` sur Vercel (sinon le site reste flouté derrière le gate).
5. (Optionnel) Endpoint de capture email du gate : `NEXT_PUBLIC_NOTIFY_ENDPOINT`.

## ⚠️ Point d'attention
- `public/resultats.html` était le **journal personnel de Bruno** (interdit sur NAVLYS). Je l'ai **déréférencé** (retiré de `/univers`) et **neutralisé** (stub redirigeant vers `/univers`). Comme la suppression est bloquée et que le dossier est synchronisé OneDrive, **supprime définitivement ce fichier côté OneDrive/cloud** par sécurité.

## 🚫 Non fait (volontairement)
Aucun déploiement. Aucun `npm install` poussé sur ta machine (les binaires Linux du bac à sable ≠ Windows — relance `npm install` chez toi).
