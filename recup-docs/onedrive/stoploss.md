# 🛑 Stop-loss

## Définition
Ordre automatique qui ferme la position quand le prix baisse d'un certain seuil — protection contre les pertes qui dérapent.

## Trois variantes
- **Stop fixe** : seuil absolu (ex. −1 %). Simple, mais aveugle à la volatilité.
- **Stop trailing (suiveur)** : monte avec le prix, ne redescend jamais. Protège les gains acquis.
- **Stop ATR-pondéré** : seuil = `k × ATR(14)`, s'élargit en marché volatil, se resserre en marché calme.

## Choix NAVLYS par défaut
**Stop trailing ATR-pondéré (k = 1,5)** sur les profils Équilibré et Énergique ; **stop fixe −0,5 %** sur Prudent.

## Le piège (à connaître)
Un stop programmé à −0,1 % **ne s'exécute pas à −0,1 %** : il **déclenche** à −0,1 %, mais le marché peut sauter à −1, −2, −3 % avant qu'on trouve un acheteur. Voir `slippage.md`.

## Règle d'or
Le stop, c'est l'**ancre de sécurité**, pas la stratégie. La stratégie, c'est de **ne pas avoir besoin** du stop. Mais l'ancre reste à bord, toujours.

---
⚠️ Information générale — **pas un conseil personnalisé**. Risque de perte en capital.
