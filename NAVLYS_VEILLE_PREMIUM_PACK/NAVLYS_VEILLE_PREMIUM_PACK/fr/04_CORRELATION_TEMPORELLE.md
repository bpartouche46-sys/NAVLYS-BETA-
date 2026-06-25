# Corrélation temporelle — mesurer l'effet réel sur les marchés

> Une déclaration n'a de poids que si le marché bouge derrière. Voici comment NAVLYS le mesure, sans interprétation.

---

## Les quatre fenêtres temporelles

NAVLYS observe chaque oracle sur quatre fenêtres précises après une publication ou une déclaration :

| Fenêtre | Durée après publication | Ce qu'on regarde |
|---|---|---|
| **T+0 → T+15 min** | choc immédiat | mouvement des indices et devises majeures |
| **T+0 → T+1 h** | absorption | confirmation du choc ou retour |
| **T+0 → T+4 h** | propagation | extension aux autres places de marché |
| **T+0 → T+24 h** | digestion | clôture de séance, effet du lendemain |

---

## Indices de référence pour mesurer l'effet

| Zone | Indice principal | Devise |
|---|---|---|
| États-Unis | S&P 500, Nasdaq, Dow Jones | USD (DXY) |
| Europe | Stoxx 600, DAX, CAC 40, FTSE 100 | EUR, GBP |
| Asie | Nikkei 225, Hang Seng, Shanghai Composite | JPY, CNY, HKD |
| Émergents | MSCI EM | divers |
| Matières premières | Brent, WTI, or, cuivre | USD |
| Crypto (marché 24/7) | BTC, ETH | USD |

---

## La formule de corrélation

Pour chaque oracle, sur ses dix dernières prises de parole majeures :

```
score_corrélation = Σ (mouvement_indice / volatilité_moyenne)
                    pondéré par fenêtre temporelle
```

- Si le score est > 0,8 → oracle de **classe A** (effet quasi systématique)
- Entre 0,5 et 0,8 → **classe B** (effet fréquent)
- Entre 0,3 et 0,5 → **classe C** (effet occasionnel)
- < 0,3 → l'oracle sort de la liste (il ne pèse plus)

---

## La règle d'anticipation

Certains oracles ne réagissent pas à l'événement, ils l'**anticipent**. Leur parole précède le mouvement de plusieurs heures ou jours. Pour les détecter :

1. Repérer la déclaration.
2. Mesurer le mouvement de l'indice **dans les 24 à 72 heures** qui suivent.
3. Si le mouvement va dans le sens annoncé par la déclaration **plus de 7 fois sur 10**, l'oracle est marqué **« anticipateur »**.

Ces oracles-là sont les plus précieux. Ils donnent une fenêtre d'action avant le grand public.

---

## La méthode du re-test permanent

NAVLYS re-mesure chaque oracle **tous les trimestres**. Un oracle qui pesait il y a deux ans peut avoir perdu son influence. Un nouveau peut être apparu (changement de poste, prise de fonction). La liste vit.

### Le cycle de re-test

1. **Collecte** : sur les 90 derniers jours, lister toutes les déclarations publiques majeures de chaque oracle.
2. **Mesure** : pour chacune, appliquer la formule de corrélation sur les 4 fenêtres temporelles.
3. **Classement** : recalculer la classe A/B/C.
4. **Mise à jour** : ajouter les nouveaux entrants, retirer les sortants.

### Ce qu'on retient à chaque cycle

- Les 20 oracles les plus puissants (toutes catégories confondues).
- Les 10 anticipateurs les plus fiables.
- Les 5 cas atypiques (oracle dont l'effet a changé brusquement, à comprendre).

---

## L'irréfutabilité du procédé

Tout est public, tout est horodaté, tout est mesurable a posteriori. La méthode est reproductible : un tiers prenant les mêmes sources, les mêmes horodatages, les mêmes indices, doit retrouver exactement les mêmes scores.

C'est la base de la confiance dans la Veille Premium NAVLYS.

---

## Disclaimer permanent

> Information pédagogique. Tu restes seul décideur. Teste en simulation avant tout engagement réel.
