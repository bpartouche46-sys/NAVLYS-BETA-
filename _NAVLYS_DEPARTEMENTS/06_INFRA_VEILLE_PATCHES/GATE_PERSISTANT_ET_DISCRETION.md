# 🔒 Gate persistant pour Bruno + discrétion publique renforcée

> Dépt 06 Infra & Veille (+ Dépt 02 Site/Produit) · ordre QG du 26 mai 2026
> Bruno : *« re-taper le code à chaque visite me gêne, et je n'aime pas voir les deux sites visibles sur internet. »*

Deux problèmes, deux remèdes nets — on garde le gate jusqu'au 31 mai, mais on lui apprend à **te reconnaître** et à **se faire oublier des moteurs**.

---

## 1. Le diagnostic en clair

| Constat | Cause | Remède |
|---|---|---|
| Bruno doit retaper `CAP2027` à chaque visite | Le gate ne pose pas de cookie de persistance | **Cookie 30 jours** au premier déverrouillage |
| Bruno veut **voir évoluer** le site post-lancement sans déverrouiller le gate au public | Pas de mode preview privé | **Lien preview UUID** dédié à Bruno (clé séparée du code public) |
| Les deux sites sont indexables, donc visibles publiquement | Pas de directive `noindex` ni `robots.txt` adapté | **Noindex global** pendant la phase teaser + `robots.txt` strict |
| Bruno veut **réduire la surface exposée** au public | Le teaser actuel montre beaucoup (logo animé, cockpit, cartes essayer) | **Mode « rideau »** : teaser ultra-minimal pour les moteurs/curieux, mode « gate » complet uniquement après code |

---

## 2. Patch n°1 — Le gate retient Bruno (cookie + lien rapide)

### 2.1 Comportement attendu

- Quand Bruno (ou n'importe qui ayant le code) tape `CAP2027`, on pose un cookie `gate_unlock=<hash>` valide **30 jours**, `httpOnly`, `secure`, `sameSite=Lax`.
- Aux visites suivantes depuis le même navigateur → le serveur lit le cookie et **saute** le gate. Bruno ne voit plus jamais le sablier.
- Bonus : URL raccourci `navlys.com/?k=CAP2027` → si le param est valide, on pose le cookie et on redirige `/` sans la query. Bruno peut bookmarker cette URL.

### 2.2 Code à poser

**Fichier** : `navlys/app/(public)/page.tsx` (ou middleware Next.js).
Crée d'abord `navlys/middleware.ts` :

```ts
// navlys/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';

const VALID_CODES = (process.env.GATE_CODES || 'CAP2027').split(',');
const COOKIE = 'navlys_gate';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 jours
const SECRET = process.env.GATE_SECRET || 'navlys-default-please-change';

function hashCode(code: string){
  return createHash('sha256').update(code + ':' + SECRET).digest('hex');
}
function safeEq(a: string, b: string){
  const A = Buffer.from(a); const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

export function middleware(req: NextRequest){
  const url = req.nextUrl;

  // Si gate déverrouillé globalement (jour J), ne rien faire
  if(process.env.NEXT_PUBLIC_LAUNCH_UNLOCKED === 'true') return NextResponse.next();

  // 1) Bypass par lien rapide ?k=CODE → pose cookie + clean URL
  const k = url.searchParams.get('k');
  if(k && VALID_CODES.includes(k.trim().toUpperCase())){
    const clean = new URL(url);
    clean.searchParams.delete('k');
    const res = NextResponse.redirect(clean);
    res.cookies.set(COOKIE, hashCode(k.trim().toUpperCase()), {
      httpOnly: true, secure: true, sameSite: 'lax',
      maxAge: MAX_AGE_SECONDS, path: '/'
    });
    return res;
  }

  // 2) Cookie déjà présent et valide → laisser passer
  const cookie = req.cookies.get(COOKIE)?.value;
  if(cookie){
    for(const c of VALID_CODES){
      if(safeEq(cookie, hashCode(c))) return NextResponse.next();
    }
  }

  // 3) Sinon on laisse le gate React faire son boulot (pas de redirect serveur)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:mp4|webp|png|jpg|svg|woff2)).*)'],
};
```

### 2.3 Côté formulaire du gate (React)
Quand Bruno tape le code et clique « Embarquer » :
```ts
async function unlock(code: string){
  // On laisse passer le serveur poser le cookie via ?k=
  window.location.href = `/?k=${encodeURIComponent(code)}`;
}
```
Effet : redirection → middleware pose le cookie → URL nettoyée → Bruno arrive sur le site dégagé.

### 2.4 ENV à poser sur Vercel (navlys-app + brunopartouche-teaser)
```
GATE_CODES=CAP2027,CAP-PREVIEW-7K3M2A      # autant que tu veux, séparés par virgules
GATE_SECRET=<générer un random hex 32+ chars, jamais en clair dans un fichier>
NEXT_PUBLIC_LAUNCH_UNLOCKED=false           # bascule à true le 1ᵉʳ juin
```

**⚠️ Garde-fou** : ne pas committer `GATE_SECRET`. Génère-le directement dans le dashboard Vercel (CLI : `vercel env add GATE_SECRET production`).

---

## 3. Patch n°2 — Lien preview privé (« voir l'évolution »)

Un **second code séparé** te permet de voir le site **comme s'il était lancé** (gate désactivé visuellement), sans toucher la valeur `NEXT_PUBLIC_LAUNCH_UNLOCKED` qui reste `false` pour tout le monde.

### 3.1 Mécanique
- Tu ajoutes un second code à `GATE_CODES` : `CAP-PREVIEW-7K3M2A` (ou autre UUID à toi).
- Le middleware reconnaît ce cookie comme **mode preview**.
- Dans la page, on lit le cookie ; si valeur = preview, on bypass le composant `<Gate>` ET on affiche directement la version post-lancement (univers, cockpit déverrouillé, etc.).

### 3.2 Détail code (extension du middleware)
```ts
// Dans le middleware, après safeEq(cookie, hashCode(c)) :
for(const c of VALID_CODES){
  if(safeEq(cookie, hashCode(c))){
    const res = NextResponse.next();
    if(c.startsWith('CAP-PREVIEW-')){
      res.headers.set('x-navlys-mode', 'preview');
    }
    return res;
  }
}
```

### 3.3 Côté page
```tsx
// navlys/app/page.tsx
import { headers } from 'next/headers';

export default function Home(){
  const mode = headers().get('x-navlys-mode');
  if(mode === 'preview') return <PostLaunchSite />;
  return <TeaserGate />;
}
```

### 3.4 Ton lien-bookmark personnel
```
https://navlys.com/?k=CAP-PREVIEW-7K3M2A
```
Tu cliques une fois → cookie posé 30 jours → ensuite `navlys.com` t'affiche directement la version « post-lancement » à chaque visite, **sans jamais montrer le sablier**.

Le public, lui, continue à voir le gate jusqu'au 31 mai.

---

## 4. Patch n°3 — Discrétion publique (noindex + robots.txt)

Si tu n'aimes pas voir les sites « visibles sur internet », on fait deux choses :

### 4.1 Empêcher Google et autres moteurs d'indexer pendant le teaser
Ajoute dans le `<head>` des pages teaser (NAVLYS + brunopartouche-teaser) :
```html
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
```

Fichier `navlys/public/robots.txt` :
```
User-agent: *
Disallow: /

Sitemap: https://navlys.com/sitemap.xml
```

Quand tu bascules `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` le 1ᵉʳ juin, le composant `<head>` doit retirer `noindex` automatiquement. Code :
```tsx
{process.env.NEXT_PUBLIC_LAUNCH_UNLOCKED !== 'true' && (
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
)}
```

Et `robots.txt` dynamique (Next.js 14+) :
```ts
// navlys/app/robots.ts
import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const launched = process.env.NEXT_PUBLIC_LAUNCH_UNLOCKED === 'true';
  return {
    rules: launched
      ? [{ userAgent: '*', allow: '/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: launched ? 'https://navlys.com/sitemap.xml' : undefined,
  };
}
```

### 4.2 Mode « rideau » (option recommandée)
Si tu veux **encore moins exposer** que le teaser actuel, on peut basculer le gate vers un mode minimaliste :
- Disparition du cockpit, des cartes « essayer », du logo animé.
- Reste uniquement : fond espace + compte à rebours + un seul champ « code d'accès ».
- Tout le reste devient invisible aux yeux du public — tu gardes le « wow » pour le 1ᵉʳ juin.

Pour activer ce mode :
```
NEXT_PUBLIC_GATE_MODE=curtain    # vs "teaser" (actuel)
```

Et un nouveau composant `<GateCurtain>` minimal (50 lignes, fond + sablier + input). Si tu valides, je te le pose dans la prochaine itération.

### 4.3 Désindexer rapidement ce qui est déjà indexé
Si Google a déjà indexé `navlys.com` ou `brunopartouche-teaser.vercel.app` :
1. Connecte les deux domaines à **Google Search Console** (`bruno@navlys.com`).
2. Outil **« Retirer les URL »** → demande la suppression temporaire (6 mois) → effet en 24-48 h.
3. Une fois `noindex` posé, Google retire définitivement à la prochaine crawl.

---

## 5. Patch n°4 — Cas spécial `brunopartouche.com` (Netlify ancien)

Tu disais que `brunopartouche.com` (Netlify) affiche encore l'ancienne page « bientôt » tant que le DNS n'est pas basculé. Tant qu'il n'est pas migré sur Vercel, je propose :
- **Soit** tu acceptes que cette ancienne page reste 5 jours (jusqu'au 31 mai) et le 1ᵉʳ juin tu bascules le DNS chez Vercel (A `@` → `216.198.79.1`, CNAME `www` → `cname.vercel-dns.com`, **MX Google préservés**).
- **Soit** je te livre une page Netlify minimaliste « page en construction » à uploader manuellement, qui retire complètement l'ancienne (action 2 minutes côté Netlify panel).

Dis-moi laquelle, et je t'envoie le HTML prêt à uploader.

---

## 6. Récap des actions concrètes

| Action | Resp | Quand |
|---|---|---|
| Générer `GATE_SECRET` random et le poser dans Vercel ENV (navlys-app + brunopartouche-teaser) | Bruno (1 commande CLI) | aujourd'hui |
| Ajouter `CAP-PREVIEW-7K3M2A` à `GATE_CODES` | Bruno | aujourd'hui |
| Coder `middleware.ts` sur navlys-app | Dépt 02 / 06 | demain |
| Coder bypass `?k=` côté composant React | Dépt 02 | demain |
| Pose `robots.txt` dynamique + meta `noindex` conditionnel | Dépt 02 | demain |
| Désindexer via Search Console si déjà crawlé | Bruno | cette semaine |
| Activer **mode « rideau »** si tu valides (optionnel) | Dépt 02 sur ton OK | sous 48 h |
| Bookmark ton lien preview privé | Bruno | une fois posé |

---

## 7. Tes 4 questions pour décider (réponds en 1 ligne)

1. **Mode « rideau »** : je le pose, ou tu préfères garder le teaser actuel jusqu'au 31 mai ?
2. **Ton code preview** : `CAP-PREVIEW-7K3M2A` te va, ou tu veux un autre nom ?
3. **`brunopartouche.com` Netlify** : on attend la bascule DNS du 1ᵉʳ juin, ou je te livre une page Netlify minimaliste à mettre tout de suite ?
4. **Search Console** : tu fais la désindexation manuelle des URL déjà crawlées, ou tu me passes l'accès `bruno@navlys.com` pour que Dépt 06 le fasse ?

---

> *« Le gate apprend à reconnaître son capitaine. Le public, lui, n'a rien à indexer pour le moment. »*
> ⚠️ Aucun secret en clair dans un fichier. Tokens en ENV uniquement. Cookie `httpOnly` + `secure` obligatoires.
