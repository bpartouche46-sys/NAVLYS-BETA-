# 🚢 Déploiement express — `brunopartouche.com` Netlify avec GATE

> ⚓ **Mise à jour 26 mai 2026** : la page intègre maintenant un **gate à code** demandé à chaque visite (pas de cookie, pas de mémoire). Fond espace animé, médaille BP, compte à rebours vers le 1ᵉʳ juin 2026 minuit Jérusalem, et 4 cadrans jours/heures/minutes/secondes.
>
> **Codes valides** (saisis insensible à la casse) : `[CLÉ RETIRÉE — voir gestionnaire de secrets]` · `CAPITAINE` · `BRUNO2026`.
>
> **Noindex actif** : Google ne l'indexera pas.

## Comment la mettre en ligne (2 minutes)

### Méthode 1 — drag & drop Netlify (la plus rapide)
1. Va sur https://app.netlify.com/sites/novafinanceclub (ou le site qui sert `brunopartouche.com`).
2. Onglet **Deploys** → fais glisser le fichier `index.html` dans la zone « Drag & drop your site output folder here ».
3. Netlify déploie, la nouvelle page est live en moins d'une minute sur `brunopartouche.com`.

### Méthode 2 — CLI Netlify
```bash
cd brunopartouche_NETLIFY_MINIMALISTE
netlify deploy --prod --site=<site-id> --dir=.
```

### Méthode 3 — git
Si le site Netlify est lié à un repo, push juste ce `index.html` à la racine de la branche `main` → Netlify rebuild auto.

## Ce qui est garanti
- ✅ `<meta robots noindex,nofollow,noarchive,nosnippet>` → Google ne l'indexe pas.
- ✅ Aucun lien sortant sensible. Aucune mention finance/conseil/NAVLYS.
- ✅ Animations CSS-only (zéro JS, zéro lib externe). Charge ~6 Ko.
- ✅ Médaille BP animée + fond espace + 1 phrase + date 1ᵉʳ juin. Rien d'autre à indexer.

## Quand basculer vers la vraie page Vercel
Le 1ᵉʳ juin 2026 :
- DNS Namecheap : A `@`→`216.198.79.1`, CNAME `www`→`cname.vercel-dns.com` (GARDER les MX Google pour `bruno@navlys.com`).
- Netlify : tu peux désactiver le site `novafinanceclub` ou le garder en backup (gratuit).
