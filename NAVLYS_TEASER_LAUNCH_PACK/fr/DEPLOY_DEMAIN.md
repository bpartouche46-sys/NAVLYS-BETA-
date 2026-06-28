# NAVLYS — Mettre le teaser EN LIGNE demain matin (≤ 10 min)

> Demain : on hisse la voile. Le teaser flouté passe en ligne, le compteur tourne
> vers le 31 mai. Voici la manœuvre, pas à pas. Tu n'as besoin de rien installer.

---

## Avant de commencer (30 s)

- La page à mettre en ligne, c'est **`index.html`** à la racine du pack (version bilingue FR/EN avec bascule).
- Elle est **autonome** : le logo est intégré dedans (base64), aucune dépendance externe sauf les polices Google.
- Tu peux déployer **le dossier entier** `NAVLYS_TEASER_LAUNCH_PACK/` ou juste le ZIP.

---

## Voie A — Glisser-déposer sur Vercel (la plus simple, ~5 min)

1. Va sur **`vercel.com/new`** (connecte-toi, compte gratuit suffisant).
2. Cherche l'option **« Deploy » → « Upload »** (ou rends-toi sur **`vercel.com/new/upload`**).
3. **Glisse** le fichier **`NAVLYS_TEASER_LAUNCH_PACK.zip`** (ou le dossier décompressé) dans la zone.
4. **Project Name** : `navlys-teaser` (ou `navlys-portal`).
5. **Framework Preset** : **Other** (c'est du HTML statique, rien à compiler).
6. **Root Directory** : laisse la racine (là où se trouve `index.html`).
7. Clique **Deploy**. Attends ~30 s.
8. Vercel te donne une URL du type **`navlys-teaser.vercel.app`** → **ouvre-la**, vérifie :
   - la pièce bronze tourne et brille,
   - l'horloge tourne **à l'envers**,
   - le compteur descend vers le 31 mai,
   - la bascule **FR / EN** fonctionne,
   - le champ email affiche bien « Tu es à bord » après envoi.

✅ C'est en ligne.

---

## Voie B — Tu as déjà le projet `navlys-portal` sur Vercel

1. Ouvre le projet sur **`vercel.com/dashboard`**.
2. Onglet **Deployments** → bouton **« … » → Redeploy**, ou
3. Plus propre : remplace simplement le **`index.html`** du projet par celui de ce pack
   (via Git si le projet est lié à un dépôt, ou re-upload du dossier).
4. **Deploy**. Vérifie l'URL.

---

## Voie C — En ligne de commande (si tu aimes le terminal)

```bash
npm i -g vercel        # une seule fois
cd NAVLYS_TEASER_LAUNCH_PACK
vercel                 # suis les questions → preview
vercel --prod          # met en production
```

---

## Brancher le nom de domaine `navlys.com` (optionnel, à faire posément)

1. Sur Vercel : projet → **Settings → Domains → Add** → tape `navlys.com`.
2. Vercel affiche les enregistrements DNS à poser (un `A` ou un `CNAME`).
3. Reporte-les chez ton registrar (le **DNS pack** déjà livré contient les valeurs).
4. Patiente la propagation (de quelques minutes à quelques heures).

Pas pressé : l'URL `*.vercel.app` suffit pour annoncer le teaser dès demain.

---

## Le jour J — le 31 mai : lever le brouillard

Quand le vrai site sera prêt, deux options :
- **Le plus simple** : remplace `index.html` par la vraie homepage et redeploie.
- **Sur mesure** : dans `index.html`, le flou est réglé par une seule ligne CSS :
  `filter: blur(14px) ...` dans la classe **`.blur-bg`**. Passe `blur(0px)` et retire
  l'assombrissement (`brightness(.72)`) pour révéler la maquette.

---

## Si ça coince

- **Page blanche** : vérifie que `index.html` est bien à la racine déployée.
- **Logo absent** : c'est qu'on a déployé une version sans le base64 — reprends le `index.html` de CE pack.
- **Polices génériques** : c'est juste Google Fonts qui charge ; recharge la page.
- **Compteur figé** : vide le cache (Ctrl/Cmd + Maj + R).

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
