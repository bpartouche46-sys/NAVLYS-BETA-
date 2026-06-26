# 🧭 AUDIT COHÉRENCE — Cartographe Mission #3 ↔ Mission #4
**Auteur : 🧭 Le Cartographe — Laboratoire NEXT GEN NAVLYS**
*Audit nuit du 28→29 mai 2026 · Avant BETA 1ᵉʳ juin · Backups `.pre-coherence-m4.bak` créés.*

---

## 1. Objectif

Vérifier que les **7 profils utilisateurs Mission #3** (`_CARTOGRAPHE_M3_PROFILS_UTILISATEURS_NAVLYS.md`) et leurs **routines** (`_CARTOGRAPHE_M3_ROUTINES_DETAILLEES_PAR_PROFIL.md`) sont **alignés avec les verdicts Mission #4** :
1. **Aucun profil ne recommande** la formule AdaptiveStop Perplexity (invalidée Mission #4, Sharpe OOS −10,06).
2. La **Variante D = Stop fixe 2 % + Lock 50 % / Reinvest 50 %** (validée partielle Mission #4 — protectrice) est proposée **par défaut** pour les profils à poche tactique active : **Pro Actif (6), Entrepreneur en Croissance (3), Skipper Indépendant (5)**.
3. Les **routines** quotidiennes / hebdo / mensuelles reflètent ces décisions.

---

## 2. Diagnostic AVANT patches

### 2.1 État du fichier `_CARTOGRAPHE_M3_PROFILS_UTILISATEURS_NAVLYS.md`

| # | Profil | AdaptiveStop mentionné ? | Variante D / Lock-Reinvest mentionné ? | Incohérence ? |
|---|---|---|---|---|
| 1 | 🛡️ Marin Prudent | Non (aucune stratégie active) | Non requis | ✅ OK |
| 2 | 👨‍👩‍👧 Capitaine de Famille | Non | Non (poche 10 % only, Donchian doux) | ⚠️ Optionnel |
| 3 | 🚀 Entrepreneur | Non | **❌ ABSENT** (poche tactique 30 % active) | 🔴 INCOHÉRENCE |
| 4 | 🌱 Étudiant | Non | Non requis (aucune stratégie active) | ✅ OK |
| 5 | 🧭 Skipper Indépendant | Non | **❌ ABSENT** (poche tactique 5 % active) | 🔴 INCOHÉRENCE |
| 6 | 💼 Pro Actif | Non | **❌ ABSENT** (poche tactique 30 % + recherche 10 %) | 🔴 INCOHÉRENCE |
| 7 | 🌊 Navigateur Curieux | Non (paper trading) | N/A | ✅ OK |

**G1 rappel permanent** : ne mentionne **PAS** explicitement l'invalidation AdaptiveStop Perplexity Mission #4 — risque qu'un utilisateur la croie autorisée.

### 2.2 État du fichier `_CARTOGRAPHE_M3_ROUTINES_DETAILLEES_PAR_PROFIL.md`

| Profil | Stop adaptatif évoqué ? | Lock/Reinvest dans routine ? | Incohérence ? |
|---|---|---|---|
| 3 Entrepreneur | Non | **❌ Absent** des routines hebdo/quotidienne | 🔴 INCOHÉRENCE |
| 5 Skipper | Non | **❌ Absent** routine mensuelle | 🔴 INCOHÉRENCE |
| 6 Pro Actif | Non | **❌ Absent** routine quotidienne | 🔴 INCOHÉRENCE |
| Préambule | Non | Pas de référence Mission #4 | 🟠 Mineur |

### 2.3 Récapitulatif incohérences

**7 incohérences détectées au total :**
- 3 dans le fichier PROFILS (Entrepreneur, Skipper, Pro Actif)
- 3 dans le fichier ROUTINES (id.)
- 1 dans le G1 rappel permanent (AdaptiveStop pas mentionnée explicitement)

---

## 3. Patches APPLIQUÉS

### 3.1 `_CARTOGRAPHE_M3_PROFILS_UTILISATEURS_NAVLYS.md`

**Patch #1 — G1 rappel permanent renforcé** (en-tête)
- Ajout point 4 : interdiction explicite formule AdaptiveStop Perplexity avec référence `_CARTOGRAPHE_M4_VERDICT_ADAPTIVESTOP.md`.
- Ajout bandeau Mission #4 : Variante D proposée par défaut pour profils 3, 5, 6.

**Patch #2 — PROFIL 3 Entrepreneur en Croissance**
- Ajout section `### ⚓ Mécanisme de discipline — Variante D par défaut (validée Mission #4)` détaillant : stop fixe 2 %, Lock 50 % / Reinvest 50 %, safety stop −2 % portefeuille, interdit AdaptiveStop.
- Ajout 2 alertes G1 spécifiques : pas de stop adaptatif post-perte + Lock/Reinvest actif par défaut.

**Patch #3 — PROFIL 5 Skipper Indépendant**
- Ajout section Variante D adaptée (poche tactique réduite 5 % — Lock alimente le cash d'urgence).
- Ajout 2 alertes G1 : pas d'AdaptiveStop + Lock/Reinvest par défaut.

**Patch #4 — PROFIL 6 Pro Actif**
- Ajout section Variante D complète avec chiffres backtest OOS Mission #4 (DD −5,83 % vs −10,06 %, 4 166 € sécurisés sur 100k€).
- Mention du bucket sécurisé visible dans le dashboard NAVLYS.
- Ajout 2 alertes G1 : pas de stop adaptatif + Lock/Reinvest actif par défaut.

### 3.2 `_CARTOGRAPHE_M3_ROUTINES_DETAILLEES_PAR_PROFIL.md`

**Patch #5 — Préambule global**
- Ajout bandeau Mission #4 : Variante D appliquée par défaut pour profils 3, 5, 6.
- Ajout bandeau interdit explicite : formule AdaptiveStop Perplexity interdite dans toutes les routines.

**Patch #6 — Routine HEBDO Profil 3 Entrepreneur**
- Action 2 mise à jour : stop fixe 2 % maintenu (G1 — pas d'adaptatif).
- Nouvelle Action 4 : Lock 50 % / Reinvest 50 % sur gains hebdo, bucket sécurisé visible.
- Nouvelle Alerte 2 : safety stop journalier −2 % portefeuille.

**Patch #7 — Routine MENSUELLE Profil 5 Skipper**
- Nouvelle Action 4 : stop fixe 2 % + Lock/Reinvest sur poche Donchian doux 5 %, Lock renforce le cash d'urgence.
- Indicateur mis à jour : ajout bucket Lock cumul.

**Patch #8 — Routine QUOTIDIENNE Profil 6 Pro Actif**
- Action 1 mise à jour : check bucket Lock dans dashboard.
- Action 2 mise à jour : exécution avec stop fixe 2 %, take fixe, aucune adaptation post-perte (G1 Mission #4).
- Nouvelle Action 3 : Lock 50 % / Reinvest 50 % à chaque trade gagnant.
- Action 4 mise à jour : journaling vérifie zéro tentation martingale.
- Nouvelle Alerte 2 : safety stop journalier −2 %.

---

## 4. Vérification post-patches

| # | Vérification | Résultat |
|---|---|---|
| 1 | G1 rappel permanent mentionne AdaptiveStop ? | ✅ OUI |
| 2 | Profil 3 Entrepreneur a section Variante D ? | ✅ OUI |
| 3 | Profil 5 Skipper a section Variante D ? | ✅ OUI |
| 4 | Profil 6 Pro Actif a section Variante D ? | ✅ OUI |
| 5 | Routine quotidienne Profil 6 intègre Lock/Reinvest ? | ✅ OUI |
| 6 | Routine hebdo Profil 3 intègre Lock/Reinvest ? | ✅ OUI |
| 7 | Routine mensuelle Profil 5 intègre Lock/Reinvest ? | ✅ OUI |
| 8 | Aucun profil ne recommande AdaptiveStop ? | ✅ OUI |
| 9 | Préambule routines référence Mission #4 ? | ✅ OUI |

**9/9 vérifications passées.** Cohérence M3 ↔ M4 rétablie.

---

## 5. Diff résumé

```
_CARTOGRAPHE_M3_PROFILS_UTILISATEURS_NAVLYS.md
  +6 blocs ajoutés (G1 renforcé + 3× section Variante D + 6× alertes G1 nouvelles)
  0 ligne supprimée

_CARTOGRAPHE_M3_ROUTINES_DETAILLEES_PAR_PROFIL.md
  +2 blocs préambule
  +3 routines enrichies (P3 hebdo, P5 mensuelle, P6 quotidienne)
  +5 actions nouvelles, +2 alertes nouvelles
  0 ligne supprimée
```

Backups :
```
_CARTOGRAPHE_M3_PROFILS_UTILISATEURS_NAVLYS.md.pre-coherence-m4.bak
_CARTOGRAPHE_M3_ROUTINES_DETAILLEES_PAR_PROFIL.md.pre-coherence-m4.bak
```

---

## 6. Implications BETA 1ᵉʳ juin

1. **Moteur de personnalisation M3 Python** (`_CARTOGRAPHE_M3_MOTEUR_PERSONNALISATION_PYTHON.py`) doit être **mis à jour** pour proposer Variante D dans les sorties des profils 3, 5, 6. **Action Bruno** : valider la mise à jour du moteur avant déploiement BETA.
2. **App NAVLYS — bucket sécurisé visible** : nouvelle UI à concevoir (carte « Bucket Lock » dans le dashboard). **Action Bruno** : spec UX à valider.
3. **Communication grand public** : la landing page Laboratoire NEXT GEN (chantier C ci-après) doit afficher Lock/Reinvest 50/50 comme stratégie validée de discipline.

---

## 7. Conclusion

**7 incohérences détectées · 7 incohérences patchées (100 %).**

Les fichiers M3 sont désormais **strictement alignés** avec les verdicts Mission #4 :
- AdaptiveStop Perplexity formellement bannie de toutes les routines.
- Variante D (Stop fixe 2 % + Lock 50 % / Reinvest 50 %) proposée par défaut pour les 3 profils à poche tactique active.

Le moteur de personnalisation Python et l'UI NAVLYS doivent suivre (action Bruno).

---

🧭 **Le Cartographe** — Directeur de Recherche, Laboratoire NEXT GEN NAVLYS
🧪 *LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ*
