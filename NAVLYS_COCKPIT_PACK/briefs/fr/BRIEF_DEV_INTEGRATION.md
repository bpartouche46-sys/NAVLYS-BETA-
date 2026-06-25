# Brief — Intégrer le cockpit comme écran d'accueil de l'app NAVLYS (PWA)

> Objectif : faire du cockpit la **home de l'app membre NAVLYS**, écran d'accueil vivant que l'utilisateur retrouve chaque matin.

---

## 1. Place dans l'app

Le cockpit devient l'écran `/` (ou `/app`) après connexion. C'est le **point d'entrée quotidien** : on arrive, on lit son cap du jour, on règle ses winchs, on repart. Le reste de l'app (veille, éducation, partenaires, réglages) s'ouvre depuis des accès discrets en marge — le cockpit reste le cœur.

Stack cible (cohérente avec le dépôt `navlys/` existant) : **Next.js (App Router) + React + TypeScript strict + Tailwind**, PWA installable (manifest + service worker).

---

## 2. Découpage en composants

Réutiliser les composants React fournis dans `components/` :

| Composant | Rôle |
|---|---|
| `Cockpit.tsx` | conteneur, état d'allocation, orchestration de la scène 360 |
| `MastControl.tsx` | un mât + ses voiles (exposition, gonflement) |
| `WinchSlider.tsx` | un winch (allocation, réaffectation, voilure) |
| `MeteoNavlys.tsx` | cadran météo marché + route tenue |
| `CapDuJourInstrument.tsx` | instrument central, cap du jour |

`Cockpit.tsx` détient l'état (`CockpitState`) et le descend en props. Les types partagés vivent dans `components/types.ts` (fourni). **TS strict** partout : pas de `any`, props typées, retours typés.

---

## 3. Données : démo → réel (progressif)

Le prototype tourne sur données simulées. Pour l'app :

1. **Phase 1 (lancement)** : garder la simulation locale pour la démo et l'onboarding (aucune donnée sensible).
2. **Phase 2** : brancher un endpoint `GET /api/cockpit/today` renvoyant un objet **générique et non personnalisé** :
   ```ts
   type CockpitToday = {
     heading: { label: string; entry: number; targetExitPct: number };
     marketWind: number;            // -1..1, tendance générale (pédagogique)
     date: string;                  // ISO
   };
   ```
3. L'allocation, la réaffectation et la voilure restent des **réglages utilisateur** (stockés côté profil), jamais des ordres exécutés.

> ⚠️ Positionnement NAVLYS : **pas de conseil, pas de placement, pas d'encaissement de fonds.** Le cockpit illustre une méthode ; il **n'exécute aucune transaction** et n'affiche **aucun chiffre d'algorithme propriétaire**.

---

## 4. État & persistance

```ts
type CockpitState = {
  capital: number;        // démo: 1000
  fortShare: number;      // 0.80..0.95 (winch allocation)
  realloc: number;        // 0..1 (winch réaffectation)
  voilure: 0 | 1 | 2;     // prudent / équilibré / agressif
  market: number;         // -1..1
  facing: "avant" | "arriere";
  history: number[];
};
```

- Persister `fortShare`, `realloc`, `voilure`, langue dans le profil (Supabase, déjà présent dans le dépôt) ou `localStorage` pour les invités.
- Ne **jamais** persister de données financières réelles côté client sans chiffrement et consentement.

---

## 5. PWA & performance

- **Manifest** : nom « NAVLYS », icône = pièce bronze, `theme_color #000000`, `background_color #000000`, `display: standalone`, orientation `portrait` priorisée sur mobile.
- **Service worker** : mettre en cache le shell du cockpit pour un **lancement instantané** et un usage hors-ligne (l'écran s'affiche même sans réseau, données du jour rafraîchies à la connexion).
- **Performance** : animations en CSS `transform`/`opacity` (GPU). Respecter `prefers-reduced-motion` (couper rotor, stries, virement animé). Lazy-load des écrans secondaires.
- **A11y** : navigation clavier des winchs (`input[type=range]` natif), `aria-label` sur la scène, contrastes WCAG AA déjà validés par la palette.

---

## 6. Internationalisation

- FR / EN dès le lancement (le prototype embarque déjà le dictionnaire).
- Utiliser `next-intl` ou un contexte i18n simple ; clés identiques à celles du prototype pour réutiliser les traductions.
- Le **disclaimer** et la **signature** sont présents sur l'écran d'accueil, traduits, non masquables.

---

## 7. Pied obligatoire

- **Disclaimer permanent**, visible sans scroll excessif.
- **Signature** NAVLYS en clôture.
- Mention « données de démonstration » tant que l'app n'affiche pas de données réelles non personnalisées.

---

## 8. Definition of Done

- [ ] Le cockpit est l'écran d'accueil après login, instantané (cache PWA).
- [ ] Les 5 composants React intégrés, TS strict, sans `any`.
- [ ] Winchs persistés au profil ; FR/EN fonctionnel.
- [ ] `prefers-reduced-motion` respecté.
- [ ] Disclaimer + signature présents et traduits.
- [ ] Aucun ordre exécuté, aucun chiffre d'algorithme exposé, aucun fonds encaissé.
- [ ] Repli 2D = ce prototype ; cohérence palette + métaphore vérifiée.

## Disclaimer & signature

> NAVLYS partage des informations générales et pédagogiques. Ce n'est pas un conseil financier personnalisé.
>
> *« Un cap, une main, un jour. NAVLYS te guide d'un seul geste vers ton objectif. »*
