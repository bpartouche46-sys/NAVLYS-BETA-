# 🎯 Critère de Kelly (taille de mise optimale)

## Définition
Formule qui dit **quelle fraction du capital miser** pour maximiser la croissance logarithmique du capital sur le long terme, sans le ruiner.

## Formule
Pour un pari à deux issues :
```
f* = p / a − q / b
```
où `p` = probabilité de gain, `q = 1 − p` = probabilité de perte, `b` = ratio gain (multiple), `a` = ratio perte.

Sur les marchés (binarisation simplifiée) :
```
f* = ( edge ) / ( odds )      avec edge = espérance, odds = ratio gain/perte
```

## La version prudente : Kelly fractionnel
**Kelly entier = trop nerveux** (gros drawdowns). On utilise **¼ ou ½ Kelly** :
```
f_appliqué = 0,25 × f*    (très prudent)
f_appliqué = 0,50 × f*    (équilibré)
```

## Exemple chiffré
Edge estimé +1 %, odds 1 → f* = 1 %. ¼ Kelly → mise = 0,25 % du capital exposable. Sur 200 € de voilier → **0,50 € par opération**. Petit ? Oui — la magie est dans la **répétition** et l'absence de ruine.

## Garde-fous NAVLYS
- Edge estimé conservativement (jamais sur dires).
- Cap dur : `f_appliqué ≤ 5 %` du capital exposable.
- Recalcul à chaque session.

---
⚠️ Information générale — **pas un conseil personnalisé**. Risque de perte en capital.
