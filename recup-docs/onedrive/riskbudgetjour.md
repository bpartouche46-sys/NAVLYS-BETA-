# 🌅 Risk Budget du jour (la plage à risque autorisée)

## Définition
Le **montant maximal** que NAVLYS autorise à mettre en jeu **aujourd'hui**, après lecture des baromètres du matin.

## Formule
```
RiskBudget_j = StartingCapital × RiskPct_base
  × f_volatilité(VIX)
  × f_geo(score_actualite)
  × f_breadth(NYSE_up_down)
  × f_calendrier(events_du_jour)
```
**Chaque facteur ∈ [0,3 ; 1,2]** — peut couper jusqu'à 70 %, jamais doubler plus de 20 %.

## Exemples chiffrés (capital 2 000 €, RiskPct_base = 5 %)
- Marché calme (VIX 12, breadth +, pas d'event) → `RiskBudget = 2000 × 5 % × 1,1 × 1,0 × 1,1 × 1,0 = 121 €`.
- Veille de FOMC (VIX 18, tensions géo, calendrier chargé) → `RiskBudget = 2000 × 5 % × 0,8 × 0,7 × 1,0 × 0,5 = 28 €`.

## Cadence
- **Recalcul chaque matin** avant l'ouverture US (14 h Paris) ET de la bourse européenne (9 h Paris).
- **Recalcul à la demande** pour chaque nouveau client (premier login du jour).

## Lien moteur
Alimente la répartition multi-actifs (`top-3-reglages.md`, à venir) et l'objectif journalier (`daily-target.md`, à venir).

---
⚠️ Information générale — **pas un conseil personnalisé**. Le RiskBudget est **un plafond**, jamais une obligation de miser.
