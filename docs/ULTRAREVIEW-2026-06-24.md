# ULTRAREVIEW — design NAVLYS v2 (2026-06-24)

> Revue exhaustive et adversariale (3 axes, agents parallèles) du design v2 livrable :
> `assets/navlys-v2.css|js`, `index.html`, les `sites/*/*.html`, `proto/navlys-v2.html`.
> Rien en prod. Périmètre = ce qui sera déployé.

## ✅ CORRIGÉ cette passe (dans le système v2)
- **Conformité**
  - Retiré « Jérusalem » d'`index.html` (une note QA réintroduisait le mot interdit).
  - **Disclaimer pied de page ajouté** sur les 4 pages légales (navlys.com + navbio cgu/privacy) → règle « bandeau ET pied de page sur CHAQUE page » respectée.
  - Footer NAVBIO complété avec la phrase exacte « Chacun reste seul responsable de ses décisions financières. ».
- **Accessibilité**
  - `@media (prefers-reduced-motion: reduce)` global (coupe toutes les animations infinies) — gros gain a11y + batterie.
  - `<h1 class="sr-only">` ajouté sur chaque page d'accueil (il n'y avait aucun h1).
  - `aria-label` dynamique sur le bouton son (état muet/actif), `aria-expanded` sur le menu.
  - `:focus-visible` visible (anneau ice blue) ; cibles tactiles bouton son/menu portées à 44px ; bandeau légal en `--perle` (lisibilité) ; `--cine-h` réduit à 24vh sous 700px de haut.
- **Bug**
  - Playlist cinéma : `onerror` n'empile plus de timers (clear + handlers nulled) → plus d'avance accélérée si la vidéo échoue.

## 🟠 À TRAITER (flag, non corrigé ici)
- **`sites/navlys-app/finance.html`** (page d'une autre session, design ancien) : contient un **simulateur de montants** + des **tickers nominatifs** (NVDA, AAPL…) + fond bordeaux + `#5fe0ff` résiduel. C'est la **zone la plus sensible juridiquement** du dépôt → **contrôle conformité dédié + relecture juridique avant toute mise en ligne**. À aligner aussi sur la charte.
- **Durcir `NV_REELS`** (`navlys-v2.js`) si un jour les URLs vidéo viennent d'une source externe : valider `https:` + allow-list d'hôtes avant `video.src`. Risque faible aujourd'hui (URLs en dur).
- **Perf** : ajouter `preconnect` vers `fonts.gstatic.com` ; les `box-shadow`/`background-position` animées sont lourdes (mitigées par reduced-motion).
- **Médias manquants** : `presentation.mp4` (cinéma) et `bruno.mp3` (« Écoutez Bruno ») à fournir.
- **Aperçu vs prod** : les chemins `/assets/...` et liens internes (`/`, `/cgu`) sont **absolus** → corrects une fois chaque site sur **son** domaine ; dans l'aperçu combiné `/sites/...`, la navigation interne ne résout pas (par design).

## Verdict
- **Conformité** : 🟢 GO sur le périmètre v2 après corrections (disclaimer partout, 0 terme interdit, 0 promesse, 0 mention interdite, autoplay muet OK, 0 secret). **finance.html reste à auditer à part.**
- **A11y** : passée de 🔴 (pas de h1, pas de reduced-motion) à 🟢 sur les points bloquants.
- **Confirmé sain** : autoplay muet, son au clic, aucun secret, RLS e-mails OK, empilement CSS cohérent.
