# 💧 Slippage (la vérité du terrain)

## Définition
**Écart** entre le prix au moment où l'ordre se déclenche et le prix effectif d'exécution. Toujours en ta défaveur quand le marché bouge vite.

## Pourquoi ça arrive
- Volatilité (le prix saute pendant l'aller-retour à la bourse).
- Liquidité faible (peu d'acheteurs/vendeurs au seuil).
- Spread large (écart bid/ask).
- Gaps (ouverture qui saute par-dessus le seuil).

## Le modèle NAVLYS
```
ExecPrice = TriggerPrice × ( 1 − slippage )
slippage  = base(asset) + α × volatility + β × spread_relatif
```
- `base(asset)` : floor par actif (ex. 0,05 % grands titres US, 0,30 % small caps, 0,50 % crypto exotique).
- `α`, `β` : coefficients ajustés en continu par les mesures réelles (voir `alpaca-api.md`).

## Le bon réflexe NAVLYS
**Les seuils proposés à l'utilisateur intègrent toujours le slippage modélisé.** On affiche le stop honnête (ex. « stop à −0,5 %, exécution attendue −0,8 % à −1,2 % en marché tendu »). **Honnêteté = avantage**.

## Calibrage — pourquoi Alpaca paper d'abord
On envoie 10–20 ordres types par actif sur Alpaca **paper** (zéro risque), on **mesure** l'écart trigger→exec, on **ajuste** `base/α/β`. Une fois calibré, le modèle est fiable pour les projections publiques.

---
⚠️ Information générale — **pas un conseil personnalisé**. Le slippage **augmente le risque réel** au-delà du papier.
