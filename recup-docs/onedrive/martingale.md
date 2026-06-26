# 🪙 Martingale (méthode NAVLYS)

> Référence vivante. Voir aussi `MARTINGALE_SCIENTIFIQUE_PACK/` (4 référentiels).

## Définition
La martingale classique double la mise après chaque perte pour effacer les pertes au premier gain. **Mathématiquement, l'espérance reste négative** : on confond *probabilité* (de finir gagnant un jour) et *espérance* (en moyenne). Une seule série noire ruine.

## La version NAVLYS — « martingale scientifique 90/10 »
- **90 %** du capital reste en **forteresse** (placement défensif, faible volatilité).
- **10 %** = **voilier** (capital de jeu) — c'est lui qui prend le risque.
- Sur le voilier seul : règles strictes — taille de mise plafonnée (Kelly fractionnel, voir `kelly.md`), stop net (`stop-loss.md`), cible journalière (`risk-budget-jour.md`), réinvestissement choisi (0/50/100 %).

## Formule de la mise du jour (voilier)
```
mise_j = min( voilier_actuel × f_kelly , voilier_actuel × cap_pct )
cap_pct ≤ 5 %  par opération, valeur défaut 2 %
```

## Exemple chiffré (2 000 € de départ)
- Forteresse 1 800 € · Voilier 200 €.
- Mise par opération ≤ 4 €. Perte max d'une journée plafonnée par le RiskBudget.

## Lien partenaire
Tests réels en paper-trading via **Alpaca Paper API** (`alpaca-api.md`).

---
⚠️ Information générale et pédagogique — **pas un conseil personnalisé**. Le trading comporte un risque de perte en capital. Tu testes en paper avant tout réel.
