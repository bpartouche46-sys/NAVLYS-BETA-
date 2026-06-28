# 🌙 NAVLYS — Note de reprise (travail de nuit du 31 mai → reprise 1ᵉʳ juin)

Bruno, voici exactement où on en est. Tout est **dans le code, rien n'a été déployé.**
On reprend demain : tu finis les décisions, je termine.

---

## ✅ Fait cette nuit (sûr, local, réversible)

1. **Slogan corrigé dans les 13 langues** → FR canonique : **« Ma méthode, ton argent, ton rythme. »**
   (tutoiement + « rythme » ; cohérent avec toute l'app qui te tutoie déjà).
   Fichiers : `messages/*/common.json` + `messages/{fr,en,ru}/navlys.json`. JSON tous validés.

2. **Compte à rebours réaligné sur le cap QG (MAJ 7 juin)** → **15 juin 2026, minuit Jérusalem**
   (= livraison BETA stable + ALCAPA validé, cf. `_MASTER_NAVLYS_NOW.md`).
   - Fonctionnel : `public/teaser.html` → `2026-06-15T00:00:00+03:00`
   - Commentaires alignés : `components/LaunchGate.tsx`, `.env.example`

3. **SEO ajouté** : `public/robots.txt` + `public/sitemap.xml` (12 pages publiques ;
   login/signup/dashboard/api exclus).

4. **Disclosure affilié vérifiée** : présente sur `/partenaires` + mention pédagogique
   permanente dans le footer (`components/Disclaimer.tsx`). Conforme.

5. **Composant `components/Construction.tsx` créé** (floutage sélectif, esthétique NAVLYS).
   PRÊT mais NON câblé — n'affecte rien tant qu'on ne l'importe pas.

---

## 🟦 Décisions qui t'attendent (demain)

### Décision 1 — mode de lancement
- **(a)** garder le **teaser + compte à rebours** (site « bientôt »), ou
- **(b)** ouvrir la **bêta complète** (`NEXT_PUBLIC_LAUNCH_UNLOCKED=true`) et flouter les
  sections en construction avec `<Construction>`.
  Liste proposée à flouter : `login`, `signup`, `dashboard`, `rejoindre-equipage`, `univers`.

### Décision 2 — les clés (sinon boutons « Bientôt »)
À fournir directement sur **Vercel** (jamais en clair dans un fichier) :
Supabase (3 valeurs) · Stripe (clés + payment links) · Alpaca/Binance/Bybit testnet ·
liens d'affiliation broker (`NEXT_PUBLIC_AFFILIATE_*`).

---

## 🚀 Mise en ligne (ton clic, pas le mien)
Plan : **PREVIEW Vercel** (URL de test, ne touche pas navlys.com) → on valide tout
ensemble à 1000 % → **toi** tu promeus en production.

---

## ℹ️ Bon à savoir
- Cette version next-gen (Next.js 14, 13 langues, Stripe/Supabase) **n'est pas** le site
  simple actuellement en ligne. La déployer = vrai lancement du nouveau NAVLYS.
- L'affiliation ici = **liens CPA brokers** (`rel="sponsored nofollow"`), **pas** de code
  perso `BP001` → le tracking BP001 du vieux site est sans objet ici (réglé par design).
- Source liée à Vercel : `prj_YFENrKz8…` = projet **navlys-app** (`.vercel/project.json`).

_On est LIBRE. Bonne nuit — on reprend demain._
