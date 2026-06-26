# 🧪 LABORATOIRE NEXT GEN — Spec UI pour Mon Cap Rêvé
*Verrouillé le 28 mai 2026. À transmettre au sprint NAVLYS UI.*

> 🧪 Cap Tactique est un **module du Laboratoire NEXT GEN de recherche NAVLYS**. Cette spec décrit son intégration dans Mon Cap Rêvé sur les 4 sites (navlys.com / navlys.io / brunopartouche.com / pas navbiolife).

---

## 1. Onglet et navigation

### Mon Cap Rêvé — nouveaux onglets
| Onglet | État | Label |
|---|---|---|
| Allure de croisière | existant | Configuration ETF World, livret, obligations |
| **🧪 Laboratoire NEXT GEN** | **NOUVEAU** | Module Cap Tactique (10 %) |
| Mon itinéraire | existant | Synthèse + Monte Carlo |

### Header du nouvel onglet
```
🧪 Laboratoire NEXT GEN de recherche NAVLYS
Nous testons. Nous documentons. Nous partageons les résultats — bons ou mauvais.
```

Sous-titre fixe :
```
6 hypothèses validées · 4 hypothèses invalidées · Code Python ouvert · Reproductible chez toi
```

---

## 2. Banner persistent en haut du module

Affiché en haut de toute page contenant le Laboratoire :

```
🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ
```

- Hauteur 32 px
- Fond `#02040a` (nuit NAVLYS)
- Texte Ice Blue `#7DD3FC`
- Police Cinzel 11 px majuscules, letter-spacing +0.15em
- Sticky (reste visible au scroll)

---

## 3. Section A — Les 6 hypothèses validées (cartes)

Grille 3×2 (desktop), 1 colonne (mobile).

### Anatomie d'une carte « Hypothèse validée »
```
┌──────────────────────────────────────────────┐
│  ✅ Validée par le Laboratoire               │
│                                              │
│  Hypothèse #4 — Momentum breakouts           │
│  ──────────────────────────────────          │
│                                              │
│  [mini-graph capital curve 2020-2025]        │
│                                              │
│  CAGR observé        +18,2 %                 │
│  Max drawdown        -22,5 %                 │
│  Sharpe              0,71                    │
│                                              │
│  ⚙️⚙️⚙️ complexité                            │
│                                              │
│  [Voir le protocole →]                       │
└──────────────────────────────────────────────┘
```

**Styles** :
- Cadre 1 px bronze `#B87333`
- Coin badge ✅ Ice Blue
- Halo Ice Blue breathing au survol
- Mini-graph SVG inline, courbe Ice Blue sur fond nuit
- Police métriques : JetBrains Mono 14 px
- Bouton « Voir le protocole » Ice Blue souligné

---

## 4. Section B — Les 4 hypothèses invalidées (cartes)

Même grille mais cadre rouge sombre `#5a1f1f` au lieu de bronze, badge ⚠️.

### Anatomie d'une carte « Hypothèse invalidée »
```
┌──────────────────────────────────────────────┐
│  ⚠️ Invalidée par le Laboratoire             │
│                                              │
│  Hypothèse A — Doublage de mise sur perte    │
│  ──────────────────────────────────          │
│                                              │
│  [mini-graph capital courbe qui plonge]      │
│                                              │
│  Capital médian       -78 %                  │
│  Proba ruine >80 %    91 %                   │
│  Plus longue perte    19 trades              │
│                                              │
│  📊 Verdict scientifique du Laboratoire :    │
│  Probabilité de ruine asymptotique = 100 %   │
│                                              │
│  [Pourquoi ça échoue →]                      │
└──────────────────────────────────────────────┘
```

**Important** : ne pas écrire « martingale » en gros. Toujours préférer **« Hypothèse de doublage de mise sur perte »**. Le mot martingale n'apparaît qu'au sein du protocole technique détaillé.

---

## 5. Section C — Calculateur Kelly du Laboratoire

Encart séparé sous les cartes :

```
🧪 Calculateur Kelly du Laboratoire NEXT GEN

  Win rate observé        [____] %    (de tes 100+ derniers trades)
  Gain moyen              [____] €
  Perte moyenne           [____] €
  Nombre de trades        [____]
  Capital actuel          [____] €

  Slider de prudence :  ●─────○─────○─────○
                       Kelly  Kelly  Kelly  Kelly
                       quart  demi   3/4   plein
                       (debu  (reco  (avancé) (DÉCONSEILLÉ)
                        tant) standard)

  → Fraction recommandée  : __,__ %
  → Taille position       : ____ €
  → Verdict Laboratoire   : ____________________
```

**Slider** :
- Position par défaut : « Kelly demi »
- Position « Kelly plein » est désactivée par défaut, message tooltip :
  *« Le Laboratoire déconseille Kelly plein. Cocher 'mode laboratoire avancé' pour activer. »*
- Couleur du slider : Ice Blue avec graduation bronze

---

## 6. Section D — Tester ma propre hypothèse dans le Laboratoire

Bouton CTA pleine largeur :
```
[🧪  Tester ma propre hypothèse dans le Laboratoire  →]
```

Au clic, ouvre un mini-éditeur :
- Champ « Énoncé de l'hypothèse » (textarea 3 lignes)
- Sélecteur « Univers » (SPY / QQQ / BTC / ETH / panier perso)
- Champ « Fenêtre » (date début → date fin)
- Sélecteur « Stress tests » (cases à cocher : 2008, 2020 COVID, 2022 crypto winter)
- Bouton « Lancer le test »
- Sortie : rapport identique à `backtest_engine.py` (CAGR, drawdown, Sharpe, etc.) + disclaimer

---

## 7. Lock visuel 90/10

En haut du module, un **gauge 90/10** non-cliquable :
```
Allure de croisière (cap prudent) ████████████████░░  90 %
Cap Tactique (Laboratoire)        ░░░░░░░░░░░░░░░░██  10 %
```

Texte sous gauge :
```
Le Laboratoire NEXT GEN ne concerne que les 10 % tactiques de ton allocation.
Tes 90 % restent en cap prudent (ETF monde, livret, obligations courtes).
```

Si l'utilisateur essaie de monter au-delà de 10 % via les calculateurs internes, **avertissement modal** :
```
🧪 Avertissement du Laboratoire NEXT GEN

Tu dépasses la limite des 10 % de poche tactique recommandée par la méthode 90/10.
Le Laboratoire ne recommande pas cette répartition. Souhaites-tu continuer ?

[Annuler]  [Continuer en mode laboratoire avancé]
```

---

## 8. Disclaimer permanent en pied de module

Affiché en pied de chaque page du module (FR + EN bilingue side-by-side) :

```
🧪 Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.
Les résultats affichés sont issus de simulations sur données historiques.
Performances passées ≠ performances futures.
NAVLYS n'est pas un conseiller en investissement.
Bruno Mark Partouche n'est pas CIF/ORIAS.
Toute décision d'investissement reste personnelle.

🧪 NAVLYS NEXT GEN Research Lab — educational space.
Results shown come from simulations on historical data.
Past performance ≠ future performance.
NAVLYS is not an investment advisor (Bruno Mark Partouche is not licensed CIF/ORIAS).
All investment decisions remain personal.
```

---

## 9. Couleurs et typographie (rappel charte)

- Bronze `#B87333` (cadres validées, accent titre)
- Or `#C9A961` (highlights)
- Ice Blue `#7DD3FC` (CTA, courbes, breathing halo)
- Nuit `#02040a` (fond)
- Rouge sombre `#5a1f1f` (cadres invalidées)
- Pearl `#F2F4F7` (texte standard)
- Titres : Cinzel
- Corps : Cormorant Garamond
- Métriques : JetBrains Mono

---

## 10. Inter-sites — où le Laboratoire apparaît

| Site | Présence du Laboratoire |
|---|---|
| **navlys.com** | Section hero après tagline BM. Carte « Entrer au Laboratoire ». 6 hypothèses validées + 4 invalidées. |
| **navlys.io** | Bandeau « Créations live » → entrée Laboratoire avec dernières publications. |
| **brunopartouche.com** | Section *« Mes recherches au Laboratoire NEXT GEN »* avec liens vers les derniers tests publiés. |
| **navbiolife.com** | Pas concerné. |

---

## 11. Brief dev sprint

### Routes Next.js (`navlys-app/`)
```
/laboratoire                       (landing module)
/laboratoire/hypothese/[slug]      (détail protocole + backtest)
/laboratoire/kelly                 (calculateur)
/laboratoire/test-libre            (mini-éditeur hypothèse perso)
```

### Composants à créer
- `<LabBanner />` (sticky top, 32 px)
- `<HypothesisCard validated|invalidated />` (carte)
- `<KellyCalculator />` (formulaire + slider)
- `<FreeBacktestEditor />` (mini-éditeur)
- `<Allocation9010Gauge />` (gauge visuel)
- `<LabDisclaimer locale="fr|en" />` (footer bilingue)

### API
- `POST /api/lab/run-backtest`  → wrap `backtest_engine.py`
- `POST /api/lab/kelly`          → wrap `kelly_optimizer.py`

### Stockage local
- Préférences slider Kelly : `localStorage.lab_kelly_pref`
- Historique des tests perso : `localStorage.lab_tests_history` (10 derniers)

---

*Spec verrouillée. Toute modification passe par commit explicite avec mention `[lab-nextgen-ui]`.*
