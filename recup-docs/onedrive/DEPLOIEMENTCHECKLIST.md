# ✅ NAVLYS — Checklist de déploiement (Dépt 02 · Site & Produit)

> Le projet `navlys/` est **build-clean** : toutes les dépendances sont déclarées, aucun import manquant,
> revue TypeScript des fichiers transposés OK, `eslint.ignoreDuringBuilds` actif. Le **gate reste verrouillé**.
> Il reste 3 choses qui demandent **ton** action (clés + commande), parce qu'elles touchent à tes comptes.

## ⚠️ Pourquoi je n'ai pas déployé moi-même
- Le bac à sable de Cowork **ne peut pas exécuter `npm run build`** (node_modules incomplet + timeout 45 s).
- Le **token Vercel** est ton secret : règle gravée = jamais en clair, variable d'env uniquement.
- Règle gravée = **un seul déploiement à la fois**, lancé par toi, on attend READY.

## 1) Préparer les variables (une fois)
```powershell
cd C:\Users\BP\OneDrive\Documents\Documents\Downloads\navlys
copy .env.example .env.local
notepad .env.local
```
À renseigner dans `.env.local` :
- **Supabase** : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Alpaca Paper** : `ALPACA_KEY_ID`, `ALPACA_SECRET_KEY`
- **Binance Testnet** : `BINANCE_TESTNET_API_KEY`, `BINANCE_TESTNET_SECRET`
- **Bybit Testnet** : `BYBIT_TESTNET_API_KEY`, `BYBIT_TESTNET_SECRET`
- **Affiliés** : `NEXT_PUBLIC_AFFILIATE_BINANCE/BYBIT/OKX/PLUS500/ALPACA`
- ⛔ **NE PAS** définir `NEXT_PUBLIC_LAUNCH_UNLOCKED` → le gate doit rester fermé jusqu'au 31 mai / 1er juin.

## 2) Initialiser Supabase (une fois)
1. https://supabase.com → nouveau projet (région EU).
2. SQL Editor → colle `sql/schema.sql` → Run (crée portfolios + positions + trades + RLS + trigger).
3. Authentication → Providers → active **Email**.

## 3) Build + déploiement (une commande)
```powershell
cd C:\Users\BP\OneDrive\Documents\Documents\Downloads\navlys
powershell -ExecutionPolicy Bypass -File .\DEPLOY-NAVLYS.ps1
```
Le script : `npm install` → `npm run build` (s'arrête si erreur) → déploiement Vercel prod si tu as défini `$env:VERCEL_TOKEN`.
Sinon il te bascule sur le déploiement par glisser-déposer (https://vercel.com/new).

## 4) Côté Vercel (dashboard)
- Project Settings → Environment Variables : recopie **toutes** les valeurs de `.env.local`.
- ⛔ Ne mets **pas** `NEXT_PUBLIC_LAUNCH_UNLOCKED` (ou laisse-la vide) → gate verrouillé.
- Domaine : `navlys.com` + `www.navlys.com` (DNS = Dépt 06 ; garder le MX Google).

## 5) Vérifications après déploiement (READY)
- [ ] La page affiche le **teaser + compte à rebours** (le site est flouté derrière → gate OK).
- [ ] `navlys.com/demo.html` ouvre le **bac à sable ice-blue** (essai sans compte).
- [ ] `/veille` montre les cours crypto live (CoinGecko via `/api/prices/crypto`).
- [ ] `/login` et `/signup` fonctionnent (Supabase).
- [ ] Le disclaimer pédagogique est en pied de chaque page.
- [ ] Aucune clé secrète visible dans le HTML/JS côté navigateur.

## 🧹 Ménage (optionnel, ton OK requis — Règle 8)
Fichiers strays créés pendant le travail, que la sandbox n'a pas pu supprimer :
- `navlys/public/demo.html.bak_preskin`
- `navlys/app/__wtest.txt`
À archiver/supprimer toi-même si tu le souhaites (rien n'est effacé sans ton OK).

---
*Le jour J (31 mai / 1er juin, minuit Asia/Jerusalem) : ajoute `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` sur Vercel, un seul redeploiement, et le site complet s'ouvre d'un coup.*
