# 🧭 CARTOGRAPHE — Mission #3 · Spec UI/UX app NAVLYS
**🧭 Le Cartographe — Directeur de Recherche · Laboratoire NEXT GEN NAVLYS**
*Verrouillé le 28 mai 2026 — spec pour l'équipe dev NAVLYS (Next.js 14, `Downloads/navlys/`).*

---

## Principe directeur

**Une étape = un écran = une décision claire.** Pas de scroll infini, pas de funnel marketing. Un parcours **7 étapes**, **5 minutes** maximum jusqu'à la routine activée.

Charte : Bronze `#B87333` / Or `#C9A961` / **Ice Blue `#7DD3FC`** / nuit `#02040a` / pearl `#F2F4F7`. Cinzel (titres), Cormorant Garamond (corps), JetBrains Mono (chiffres).

Disclaimer **permanent** en bas d'écran :
> ⚖️ NAVLYS = éducation à la décision. Pas de conseil personnalisé. Tu es seul décisionnaire.

---

## Parcours utilisateur (7 étapes)

### Étape 1 — Accueil « Mon Cap Rêvé »
**Objectif** : capter l'intention sans poser de question financière.

```
┌──────────────────────────────────────────────────┐
│  🧭 NAVLYS — Mon Cap Rêvé                        │
│                                                  │
│  « Quel est ton rêve à 5 ans ? »                 │
│                                                  │
│  ○ Sécuriser ce que j'ai bâti                    │
│  ○ Faire grandir mon capital                     │
│  ○ Acheter un projet précis                      │
│  ○ Préparer ma retraite                          │
│  ○ Apprendre, comprendre                         │
│                                                  │
│  [ Continuer → ]                                 │
└──────────────────────────────────────────────────┘
```

Composant : `<DreamPicker />` (5 cartes radio, illustrations maritimes).

---

### Étape 2 — Questionnaire 12 questions
**Objectif** : déterminer le profil + degré interne.

Affichage **une question par écran**, barre de progression top, bouton retour.

```
┌──────────────────────────────────────────────────┐
│  [████████░░░░░░░░░░] 4 / 12                     │
│                                                  │
│  Quel est ton capital disponible aujourd'hui ?   │
│                                                  │
│  [   100 € ─────●──────────── 1 000 000 € + ]    │
│              25 000 €                            │
│                                                  │
│  [ ← retour ]                  [ continuer → ]   │
└──────────────────────────────────────────────────┘
```

Composant : `<QuestionnaireStep step={n} />`, 12 sous-composants typés (slider, choix unique, choix multiple, switch).

---

### Étape 3 — Profil attribué
**Objectif** : révéler le profil + degré + métaphore.

```
┌──────────────────────────────────────────────────┐
│  🧭 Ton profil NAVLYS                            │
│                                                  │
│  👨‍👩‍👧                                            │
│  ─────────────                                   │
│  LE CAPITAINE DE FAMILLE                         │
│  Degré : balanced                                │
│                                                  │
│  « Voilier familial, cap long et stable »        │
│                                                  │
│  [ → Découvrir ma routine ]                      │
│  [ Refaire le questionnaire ]                    │
└──────────────────────────────────────────────────┘
```

Composant : `<ProfileCard profileId={2} degree="balanced" />`.

---

### Étape 4 — Routine personnalisée
**Objectif** : afficher la routine complète, condensée.

```
┌──────────────────────────────────────────────────┐
│  🧭 Ta routine NAVLYS                            │
│                                                  │
│  Quotidienne : 0 min ✓                           │
│  Hebdo : 10 min — lire Carte du Cartographe      │
│  Mensuelle : 30 min — DCA + rééquilibrage        │
│  Trimestrielle : 1 h — audit complet             │
│  Annuelle : 1 jour — bilan fiscal                │
│                                                  │
│  Allocation cible :                              │
│  ▓▓▓▓▓▓░░░░░░░░░░░░░░░ Prudent     30 %          │
│  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░ Balanced    60 %          │
│  ▓▓░░░░░░░░░░░░░░░░░░░ Tactique    10 %          │
│                                                  │
│  Univers : ETF MSCI World, PEA value, fonds €    │
│                                                  │
│  [ → Voir mes chiffres honnêtes ]                │
└──────────────────────────────────────────────────┘
```

Composants : `<RoutineCalendar />`, `<AllocationBars />`, `<UniversList />`.

---

### Étape 5 — Espérance honnête + max drawdown
**Objectif** : montrer ce qu'on peut attendre **et craindre**.

```
┌──────────────────────────────────────────────────┐
│  🧭 Ce que dit le Laboratoire                    │
│                                                  │
│  Rendement annuel médian      :  5,5 %           │
│  Scénario pessimiste (5 %)    : −1,7 %           │
│  Scénario optimiste (95 %)    : +13,2 %          │
│                                                  │
│  Pire chute plausible 5 ans   : −27,7 %          │
│                                                  │
│  4 années sur 5 positives                        │
│  Sharpe ratio médian          : 0,60             │
│                                                  │
│  ⚠️ Source : Monte Carlo 2 000 chemins,           │
│  calibration Mission #2 + Shiller. Le passé      │
│  n'est pas le futur. Tu peux faire mieux.        │
│  Tu peux faire pire.                             │
│                                                  │
│  [ → Activer ma routine ]                        │
└──────────────────────────────────────────────────┘
```

Composant : `<ExpectationGauge cagr={5.5} dd={-27.7} sharpe={0.60} />`.

---

### Étape 6 — Activation routine
**Objectif** : confirmer + déclencher (gratuit en démo, payant pour version premium NAVLYS NEXT GEN INVEST).

```
┌──────────────────────────────────────────────────┐
│  🧭 Activer ma routine                           │
│                                                  │
│  □ J'ai compris : NAVLYS m'éduque, je décide.    │
│  □ J'ai lu les G1 et je m'y engage.              │
│  □ J'accepte le disclaimer permanent.            │
│                                                  │
│  Mode :                                          │
│  ● Démo gratuite (15 jours, toutes fonctions)    │
│  ○ NAVLYS NEXT GEN INVEST — 49 €/mois            │
│  ○ NAVLYS NEXT GEN INVEST — 490 €/an             │
│                                                  │
│  [ → Activer ]                                   │
└──────────────────────────────────────────────────┘
```

Composant : `<ActivationForm />`.

---

### Étape 7 — Dashboard quotidien
**Objectif** : un écran zen, **UNE action**, UN indicateur.

```
┌──────────────────────────────────────────────────┐
│  🧭 Bonjour Capitaine — Lundi 1 juin             │
│                                                  │
│  Ton action du jour :                            │
│  ► Aucune. Le voilier tient sa route.            │
│                                                  │
│  Indicateur :                                    │
│  ► Drift d'allocation : 2,8 % ✅ (< 5 %)          │
│                                                  │
│  Alerte active : aucune.                         │
│                                                  │
│  💡 Carte du jour du Cartographe :               │
│  « Les marchés tendent à respirer entre 9h45     │
│   et 10h15 NY. La patience paie. »               │
│                                                  │
│  [ Lire la Carte complète ]                      │
│  [ Voir mes positions ]                          │
│  [ Re-questionnaire ]                            │
└──────────────────────────────────────────────────┘
```

Composant : `<DailyAction />`, `<DriftIndicator />`, `<CartographeCard />`.

---

## Bibliothèque de composants à créer

### `<ProfileCard profileId, degree />`
- Props : `profileId` (1-7), `degree` ('defensive'|'balanced'|'aggressive').
- Affiche emoji + nom + métaphore + couleur bronze/ice blue selon degré.
- Animation : flip carte au survol pour voir interdits G1.

### `<RoutineCalendar profileId />`
- Props : `profileId`.
- Affiche 5 lignes (quotidienne / hebdo / mensuelle / trim / annuelle).
- Icône horloge + durée + verbe d'action principale.

### `<DailyAction profileId, todayData />`
- Props : profil + données du jour (drift, alertes, positions).
- Affiche **UNE seule action**. Pas plus.
- État : `pending`, `done`, `skipped`.

### `<ExpectationGauge cagr, dd, sharpe />`
- Props : 3 chiffres clés.
- Jauge visuelle bronze/ice blue.
- Watermark benchmark (60/40, SP500).

### `<RebalanceTrigger drift, threshold />`
- Props : drift courant, seuil (5 % par défaut).
- Bouton orange si seuil dépassé, vert sinon.
- Lien vers écran de rééquilibrage guidé.

### `<DisclaimerBanner />`
- **Toujours visible** en bas d'écran (sticky footer).
- Texte court : « NAVLYS = éducation. Pas de conseil. Tu décides. ».
- Click → modal disclaimer complet.

### `<QuestionnaireStep step />`
- Props : numéro de step (1-12).
- Composant générique qui dispatch vers le bon type d'input.

### `<CartographeCard topic />`
- Props : sujet du jour.
- Affiche carte Cartographe condensée (3 phrases max).
- Lien vers la publication complète.

---

## Routes Next.js (`navlys/app/`)

```
/onboarding/dream            → Étape 1
/onboarding/questionnaire/1  → Étape 2 (1/12)
...
/onboarding/questionnaire/12
/onboarding/profile          → Étape 3
/onboarding/routine          → Étape 4
/onboarding/expectations     → Étape 5
/onboarding/activate         → Étape 6
/dashboard                   → Étape 7 (et home après onboarding)
/laboratoire/cartes          → Bibliothèque cartes Cartographe
/laboratoire/hypotheses      → Catalogue hypothèses validées/invalidées
/profil                      → Réglages utilisateur + re-questionnaire
```

---

## API (Next.js Route Handlers)

```
POST /api/onboarding/answers     → reçoit les 12 réponses, retourne profil + routine JSON
POST /api/dashboard/today        → reçoit profilId, retourne action du jour + indicateur
GET  /api/cartographe/cards      → liste des publications Cartographe
POST /api/profile/reset          → force re-questionnaire
```

Le **moteur de personnalisation** (`_CARTOGRAPHE_M3_MOTEUR_PERSONNALISATION_PYTHON.py`) est porté en TypeScript dans `navlys/lib/personalization-engine.ts` — même algorithme, même sortie JSON, validé par les tests des 4 personas.

---

## Accessibilité

- WCAG 2.1 AA minimum.
- Contraste : ice blue `#7DD3FC` sur nuit `#02040a` = ratio 9,8:1 ✅.
- Tous les boutons : `aria-label` + `role`.
- Questionnaire : navigation clavier obligatoire (tab/enter/escape).
- Sliders : keys `←` `→` `±10` `±100`.

---

## Performance

- LCP < 2,5 s (cible Vercel edge).
- Pas d'animations qui bloquent le rendu.
- Le composant **`<CartographeCard />`** est lazy-loaded.

---

## Données stockées

- Réponses questionnaire : chiffrées côté serveur, jamais en localStorage non-chiffré.
- Profil attribué : seul ID stocké côté client (cookie sécurisé httpOnly).
- Routine + interdits : régénérés à chaque session via API (single source of truth = moteur Python/TS).

---

## Multilingue (FR/EN)

- Tous les textes via `navlys/i18n/fr.json` + `en.json`.
- 7 profils + 12 questions + routines = ~120 clés.
- Référence canonique : `_GLOSSAIRE_MULTILINGUE_NAVLYS.md`.

---

## Tests utilisateur recommandés avant lancement

1. **5 utilisateurs BETA × 7 profils** = 35 parcours testés.
2. **Mesure de temps** : viser onboarding complet < 5 min médiane.
3. **Comprehension test** : après l'écran 5 (espérance), demander « combien tu peux perdre la pire année ? » — vérifier que la réponse est cohérente.
4. **Test de refus** : forcer Q12 = non, vérifier le blocage propre.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
