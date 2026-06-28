# NAVLYS — Spécification du Cockpit (UI / UX)

> Source de vérité visuelle et fonctionnelle du cockpit NAVLYS.
> Version 1.0 · prototype `cockpit.html` / `cockpit_mobile.html`.

---

## 1. L'intention

Le cockpit NAVLYS n'est pas un tableau de bord financier de plus. C'est **le poste de barre d'un ketch deux mâts**, vu à la première personne, à 360°. L'utilisateur ne « consulte pas des données » : **il tient une barre**. Devant lui, son cap. Derrière lui, son sillage. À portée de main, les winchs. Au-dessus, le vent.

Tout part d'une conviction simple : *le vent du marché change sans cesse ; ton cap, lui, ne bouge pas.*

Trois lois de conception :

1. **Métaphore d'abord.** Aucune notion abstraite n'apparaît sans son équivalent marin. On ne dit pas « volatilité », on montre des voiles qui faseyent.
2. **Un seul geste.** À tout moment, l'utilisateur peut agir d'un doigt : tourner, virer, régler un winch. Jamais plus de trois commandes visibles à la fois.
3. **Le calme avant le chiffre.** Le fond est nuit, le mouvement est lent, la lumière est rare. Le chiffre arrive après l'image, jamais avant.

---

## 2. La scène 360°

La pièce centrale est une **scène pivotante** à deux faces, reliées par une rotation de 180° (`rotateY`), donnant l'impression de se retourner dans le cockpit.

### Vue AVANT — *le cap*
On regarde vers la proue : le futur, l'objectif.

- **L'étoile-objectif** : un halo ICE BLUE pulsé en haut au centre, avec une étoile polaire à 8 branches. C'est le but visé.
- **Le grand mât** (mât principal, à l'avant) porte **grande voile + génois** = **90 % — La Forteresse**. Voiles larges, calmes, pleines.
- **Le rotor Flettner**, au vent, tourne en continu : la curation, l'œil qui veille.
- **La météo du grand vent global** est lisible vers l'avant (cadran).
- **Boiseries bronze** du cockpit en premier plan, avec les embases de winchs.

### Vue ARRIÈRE — *le sillage*
On regarde vers la poupe : le passé, les résultats.

- **Le sillage** : une traîne d'écume en V qui s'élargit vers l'utilisateur.
- **La courbe de résultats** (equity curve) tracée sur le sillage, alimentée par l'historique.
- **L'artimon** (mât arrière) porte des **petites voiles** = **10 % — Le Jeu Actif**.

### Règles de transition
- Durée 1,0 à 1,2 s, easing `cubic-bezier(.6,.02,.2,1)`.
- `backface-visibility: hidden` sur chaque face.
- Déclencheurs : bouton **« Virer de bord ↻ »** + **glisser horizontal** (mobile, seuil ~55 px).
- L'étiquette de vue (AVANT / ARRIÈRE) se met à jour à chaque virement.

---

## 3. Les deux mâts et leurs voiles

| Élément | Métaphore | Donnée pilotée |
|---|---|---|
| Grand mât · grandes voiles | La Forteresse · 90 % sécurisés | part Forteresse, capital sécurisé |
| Artimon · petites voiles | Le Jeu Actif · 10 % réactifs | part Active, performance du jour |

**Gonflement des voiles** : chaque voile est un groupe SVG avec `transform-box: fill-box` et un `transform-origin` au point d'amure (côté mât). Le JS applique `scaleX(k)`, où `k` dépend du **vent simulé** (état du marché) et de la **voilure** choisie. Voile pleine → `k ≈ 1,05`. Voile qui faseye → `k ≈ 0,6`, accompagnée d'une animation `luff` (légère variation de luminosité).

---

## 4. Les winchs (commandes)

Trois winchs, jamais plus, présentés comme des **curseurs bronze** avec une petite molette crantée. « À portée de main ».

1. **Winch Allocation** — partage Forteresse / Actif.
   - Défaut **90 / 10**. Plage **95/5 → 80/20**.
   - Effet immédiat : rééquilibre le capital courant selon le nouveau ratio.
2. **Winch Réaffectation des plus-values** — part des gains du jour reversée à la Forteresse.
   - Défaut **50 %**. Plage 0 → 100 %.
   - Effet : à chaque « nouveau jour », la part choisie des gains positifs migre du Jeu Actif vers la Forteresse (croissance par capitalisation du coffre).
3. **Winch Voilure du jour** — exposition.
   - Trois crans : **Prudent · Équilibré · Agressif**.
   - Effet : amplitude (volatilité) et biais directionnel du Jeu Actif.

**Réactivité** : tout mouvement de winch recalcule en direct Forteresse €, Jeu Actif €, total €, projection 1 an.

---

## 5. Le cadran météo + ta route

Deux instruments côte à côte, pour rendre **le contraste visible** :

- **Météo NAVLYS** : un cadran en arc (rouge baisse → gris neutre → ICE BLUE hausse). L'aiguille bronze oscille selon l'état du marché mondial simulé.
- **Ta route** : un compas rond dont l'aiguille reste **fixe, plein nord**. Elle ne bouge pas, quoi qu'il vente.

Sous les deux, une phrase-clé : *« Le vent du marché tourne sans cesse. Ton cap, lui, ne bouge pas. »*

---

## 6. L'instrument central — le cap du jour

Au centre bas de la scène, une carte sombre surmontée du **compas à médaillon bronze** (la pièce NAVLYS qui tourne, 8 s / tour). Elle affiche :

> **Cap du jour : [ticker] · Entrée [prix] · Sortie visée +X %**

Le ticker est **fictif** (noms de vents : MISTRAL-7, ZÉPHYR-3, TRAMONTANE-9…). Aucun symbole boursier réel, aucun chiffre d'algorithme. C'est une démonstration de forme, pas un signal.

---

## 7. Le rotor Flettner

Cylindre vertical à rayures bronze/nuit, en rotation continue (illusion par défilement vertical sous masque `clipPath`). Il symbolise **la curation** : l'œil aiguisé qui lit le vent du monde et n'en sort **qu'un seul** signal clair par matin. Pas de bruit, juste le cap.

---

## 8. Mouvement & ambiance

- **Pièce bronze** : rotation `rotateY` 8 s linéaire.
- **Rotor Flettner** : défilement bouclé sans couture (période = 2 bandes).
- **Stries de vent** : fines lignes ICE BLUE qui dérivent par intermittence sur la vue avant (le grand vent global), en contraste avec la route tenue.
- **Voiles** : transition douce `scaleX` (0,8 s) à chaque changement de donnée + `luff` permanent léger.
- Règle d'or : **rien ne clignote, rien ne crie**. Le mouvement est marin, lent, respirant.

---

## 9. Réactivité & plateformes

- **Desktop / tablette** : `cockpit.html`. Scène large, cluster d'instruments en grille 2×2.
- **Mobile portrait** : `cockpit_mobile.html`. Scène en haut, capital compact, winchs empilés en bas **accessibles au pouce**, geste de glissement pour virer.
- Cibles tactiles ≥ 44 px. Curseurs à poignée de 26–30 px.
- Bascule **FR / EN** en haut à droite, sans rechargement.

---

## 10. Données (démo)

- Capital de départ : **1 000 €**.
- Forteresse : croissance lissée ~5 %/an.
- Jeu Actif : rendement journalier simulé, **borné** (−6 % / +8 %), modulé par voilure × marché.
- Marché mondial : marche aléatoire bornée (−1 … +1).
- Projection 1 an : déterministe, à titre illustratif.
- **Aucune connexion réelle. Aucun conseil. Données génériques.**

---

## 11. Disclaimer permanent (obligatoire, en pied)

> NAVLYS partage des informations générales et pédagogiques. Ce n'est pas un conseil financier personnalisé. Tu décides tout, tu gères tout. Pour une décision importante, parle à un professionnel certifié.

## 12. Signature (clôt toujours l'écran)

> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
