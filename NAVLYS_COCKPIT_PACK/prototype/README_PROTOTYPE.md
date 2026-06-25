# NAVLYS — Cockpit · Prototype interactif

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*

Deux fichiers, aucune installation. Tu double-cliques, ça s'ouvre dans ton navigateur. Pas de serveur, pas de connexion : tout est embarqué dans le fichier.

---

## 🇫🇷 Comment ouvrir (français)

| Fichier | Pour quoi | Comment |
|---|---|---|
| **`cockpit.html`** | Le grand cockpit, bureau + tablette + mobile | Double-clic → s'ouvre dans Chrome / Edge / Safari |
| **`cockpit_mobile.html`** | Version portrait, pensée pour le pouce | Ouvre-le sur ton téléphone (ou fenêtre étroite) |

### Ce que tu vois en montant à bord
1. **Le cockpit central**, fond nuit (noir → bleu profond), boiseries bronze. Tu es au poste de barre.
2. **Vue AVANT = ton cap.** Devant toi : l'étoile-objectif qui brille, le grand mât avec ses grandes voiles (**90 % — La Forteresse**), le rotor Flettner qui tourne (l'œil qui veille), la météo du grand vent global.
3. **Vue ARRIÈRE = ton sillage.** Derrière toi : la trace d'écume et ta courbe de résultats (le passé, ce que tu as parcouru). L'artimon et ses petites voiles (**10 % — Le Jeu Actif**).

### Comment manœuvrer
- **« Virer de bord ↻ »** ou **glisse** l'écran (sur mobile) : tu pivotes à 360° entre l'avant et l'arrière.
- **« Mois suivant ⚓ »** : on avance d'un **mois** (ton versement mensuel s'ajoute au capital, réparti selon ton allocation). Le vent du marché tourne, les voiles se gonflent ou faseyent, ta courbe s'allonge, un nouveau cap du jour s'affiche.
- **Les quatre winchs** (curseurs bronze, à portée de main, **tous de 0 à 100 %** pour les pourcentages) :
  - **Allocation** — règle le partage Forteresse / Actif (défaut **90/10**, plage **0 → 100 %**).
  - **Réaffectation des plus-values** — quelle part des gains du jour tu reverses dans la Forteresse (défaut 50 %).
  - **Voilure du jour** — slider **0 → 100 %** (prudent → équilibré → agressif).
  - **Versement mensuel** — combien tu verses chaque mois (défaut **100 €**, plage 0 → 1 000 €), réparti selon ton allocation.
- **Tout est vivant** : dès que tu bouges un winch, les chiffres se recalculent en direct (Forteresse, Jeu Actif, total, projection 1 an).
- **FR / EN** en haut à droite : bascule la langue.

### Le contraste à retenir
La **météo NAVLYS** (à gauche) montre le grand vent du marché qui tourne sans cesse. **Ta route** (à droite) reste tenue, plein nord. C'est toute l'idée : *le vent change, ton cap non.*

---

## 🇬🇧 How to open (English)

| File | What for | How |
|---|---|---|
| **`cockpit.html`** | The full cockpit, desktop + tablet + mobile | Double-click → opens in Chrome / Edge / Safari |
| **`cockpit_mobile.html`** | Portrait version, thumb-first | Open it on your phone (or a narrow window) |

### What you see when you come aboard
1. **The central cockpit**, night background (black → deep blue), bronze woodwork. You are at the helm.
2. **FORWARD view = your heading.** Ahead: the glowing goal-star, the main mast with its large sails (**90% — The Fortress**), the spinning Flettner rotor (the watching eye), the weather of the great global wind.
3. **AFT view = your wake.** Behind: the foam trail and your results curve (the past, the distance run). The mizzen with its small sails (**10% — The Active Play**).

### How to steer
- **“Come about ↻”** or **swipe** the screen (mobile): spin a full 360° between forward and aft.
- **“Next month ⚓”**: advance one **month** (your monthly deposit is added to capital, split by your allocation). The market wind shifts, sails fill or luff, your curve grows, a fresh heading-of-the-day appears.
- **The four winches** (bronze sliders, within reach, **all 0–100%** for the percentage ones):
  - **Allocation** — Fortress / Active split (default **90/10**, range **0–100%**).
  - **Profit reallocation** — how much of the day's gains you pour back into the Fortress (default 50%).
  - **Sail trim of the day** — **0–100%** slider (cautious → balanced → aggressive).
  - **Monthly deposit** — how much you pay in each month (default **€100**, range 0–1,000), split by your allocation.
- **Everything is live**: move a winch and the numbers recompute instantly (Fortress, Active Play, total, 1-year projection).
- **FR / EN** top-right: switch language.

### The contrast to remember
The **NAVLYS weather** (left) shows the great market wind turning endlessly. **Your heading** (right) stays held, due north. That is the whole idea: *the wind changes, your heading does not.*

---

## ⚙️ Notes techniques

- **100 % autonome** : HTML + CSS + JS dans un seul fichier. Aucune dépendance, aucun CDN requis pour fonctionner.
- **Palette stricte** : BRONZE `#B87333` · ICE BLUE `#7DD3FC` · NOIR `#000` · cuivre `#D49B5B`.
- **Données de démonstration** : capital de départ 1 000 €, gains simulés et bornés. **Aucune connexion à un marché réel, aucun chiffre d'algorithme exposé.**
- **Navigateurs** : Chrome, Edge, Safari, Firefox récents. La rotation 360° utilise `transform: rotateY` (3D CSS standard).
- **Compatibilité hors-ligne** : fonctionne sans internet une fois le fichier sur ta machine.

## ⚠️ Disclaimer

NAVLYS partage des informations générales et pédagogiques. Ce n'est pas un conseil financier personnalisé. Tu décides tout, tu gères tout. Pour une décision importante, parle à un professionnel certifié.

*Prototype de démonstration — l'idée, pas le produit final.*

---

## 🆕 Nouveautés v2 / What's new in v2

- **Logo final retenu intégré** — la **pièce bronze NAVLYS** (Brand Bible v2 : pièce cuivre/bronze · étoile polaire à 8 branches · horizon stylisé · halo ICE BLUE · NAVLYS gravé en serif) sert de marque en haut (3D `rotateY` 9 s) et d'instrument central. Alignement direct avec la médaille bronze stable servie en production sur `brunopartouche-teaser.vercel.app`. *The final retained NAVLYS logo (Brand Bible v2: bronze/copper coin · 8-point polar star · stylised horizon · ICE BLUE halo · engraved NAVLYS) is now the topbar mark (3D rotateY 9 s) and the central instrument. Aligned with the stable bronze medal in production on `brunopartouche-teaser.vercel.app`.*
- **Plus vivant** — gîte du bateau, étoile-cap qui pulse, mer qui scintille, vent renforcé, médaillon animé. *More alive: boat heel, pulsing heading-star, shimmering sea, stronger wind, animated medallion.*
- **Textes agrandis** partout. *Larger text throughout.*
- **Tous les winchs jouent de 0 à 100 %** : Allocation (0/100 → 100/0), Réaffectation (0 → 100 %), Voilure (0 → 100 %). *Every % winch now runs 0–100.*
- **Versement mensuel** (nouveau winch, défaut **100 €/mois**) : réparti selon ton allocation, cumulé dans « dont versé à bord », intégré à la projection 1 an. *New monthly-deposit winch (default €100/month), split by allocation, shown in "paid in", folded into the 1-year projection.*
- **Le pas du temps est mensuel** : bouton **« Mois suivant ⚓ »**. *Time now advances by month: "Next month".*
