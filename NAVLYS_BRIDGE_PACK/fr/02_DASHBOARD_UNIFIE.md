# Dashboard NAVLYS unifié — Spécifications

> Une seule carte marine, trois modules réunis, un plan limpide.

---

## Le rôle du dashboard

Le dashboard unifié est l'aboutissement du parcours. Il prend les trois modules et les fait parler ensemble :

1. **Simulateur d'objectif** → fournit le cap (montant cible + délai).
2. **Marge Révélée** → fournit les économies de frais (€/an récupérés).
3. **Martingale Scientifique** → fournit la partition 90/10 et la marge de protection.

Le dashboard n'invente rien. Il compose, il aligne, il rend lisible.

---

## Sections visibles

### Bandeau du haut — Ton cap

- Une icône de phare et le nom de l'objectif (« Voyage », « Voiture », etc.).
- Le montant cible en gros chiffres.
- La phrase : « Cap fixé à X € dans Y mois ».

### Carte centrale — Ta route accélérée

Deux barres horizontales superposées :

- Barre grise : route initiale sans optimisation (durée d'origine).
- Barre couleur Ice Blue : route accélérée grâce aux économies de frais + stratégie 90/10.
- Étiquette : « Tu arrives Z mois plus tôt, soit P % plus vite ».

### Carte gauche — Forteresse 90 %

- Icône : forteresse sur île.
- Montant : 90 % du capital de départ ou des apports mensuels.
- Sous-titre : « Capital qui dort en sécurité, ETF longue durée ».

### Carte droite — Voilier 10 % (Jeu Actif)

- Icône : petit voilier.
- Montant : 10 % du capital.
- Sous-titre : « Capital d'exploration, stratégie demi-Kelly recommandée ».
- Indicateur de marge de protection maximale (€ que tu acceptes de perdre sur le voilier).

### Carte basse — Stratégie recommandée

- Nom de la stratégie (par défaut : `demi-kelly`).
- Une phrase : « Meilleur compromis entre potentiel et marge ».
- Lien discret pour ajuster (mise fixe, quart-Kelly, Kelly plein).

### Pied de page — Disclaimer permanent

> Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.

---

## Comportements

- **Réactivité** : si le visiteur modifie un paramètre en amont, le dashboard se recompose en temps réel.
- **Responsive** : sur mobile, les cartes s'empilent. Sur desktop, mosaïque 2×2.
- **Couleurs** : `--ice #7DD3FC` pour les éléments actifs, `--bg #000` pour le fond, blanc cassé pour le texte.
- **Aucune saisie** sur cette vue : c'est une page de synthèse. Toutes les saisies ont déjà eu lieu aux escales 1-3.

---

## Données consommées

Le dashboard consomme un seul objet `NavlysPlan` (typé dans `lib/navlysBridge.ts`). Si l'objet est `null`, la page affiche un message simple : « Reviens à l'escale 1 pour fixer ton cap. »
