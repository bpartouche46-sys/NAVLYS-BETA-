# 🔑 ACTIVATION NAVLYS — les gestes « une seule fois » (puis plus jamais de blocage)

> Le cerveau NAVLYS est **autonome dans Supabase** (fonction `core-tick` + cron toutes
> les 5 min, indépendant de Vercel). Les points ci-dessous ne sont PAS des bugs :
> ce sont des actions liées à TES secrets/argent/comptes, que moi je ne peux pas faire
> à ta place (par sécurité). Faites **une fois**, NAVLYS tourne seul.

## 1. 🧠 Allumer le cerveau (LE geste essentiel)
- **Supabase** → projet `navlys-core` → **Edge Functions → Secrets** → `Add new secret`
  - `ANTHROPIC_API_KEY` = une clé créée dans la Console Anthropic (avec une **spend limit**).
- Effet : dans les 5 min, les agents traitent les missions tout seuls, 24/7.
- (Bonus recherche web : ajouter aussi `TAVILY_API_KEY`.)

## 2. 🔒 Plafonds de dépense (le « 45 $/jour » ne peut plus arriver)
- **Anthropic Console → Limites** → plafond mensuel.
- **OpenRouter** → plafond sur la clé.
- Effet : aucune surprise possible, jamais.

## 3. 🖥️ Affichage web (cockpit + pages) — au choix
- **Option A** : Vercel → `navlys-app` → **Settings → Git** → reconnecter le dépôt → les
  déploiements repartent (le bug actuel est un blocage temporaire de l'auto-déploiement).
- **Option B** : on bascule l'affichage sur **Netlify** (que je peux piloter) → indépendant de Vercel.

## 4. 🎬 Plus tard (selon besoins)
- **Autoriser HeyGen** (réglages connecteurs claude.ai) → vidéos cinéma.
- **Compte Apple Developer** (99 $/an) → référencement App Store (Play Store via wrapper).

---

## Règle simple pour ne plus jamais bloquer
- **Cerveau / agents / routines / mémoire** = autonome (Supabase). ✅ Plus jamais bloqué.
- **Secrets / argent / comptes** = 4 gestes ci-dessus, **une fois**. Après : NAVLYS vit seul.
- Tout le reste (code, contenu, missions, plan, calculs) = **je le fais**, en direct.
