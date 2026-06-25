# Référentiel scientifique — Système 90/10 NAVLYS
## Version brunopartouche.com — FR

**Auteur** : Bruno Mark Partouche — CIF (en cours d'enregistrement ORIAS), accompagnement DFENSER.
**Statut** : document de référence pédagogique, base scientifique du moteur NAVLYS.
**Version** : 1.0 — mai 2026.

---

## 0. Avertissement CIF

Ce document est un support pédagogique. Il n'a pas valeur de conseil en investissement personnalisé au sens du Code monétaire et financier français. Toute personne souhaitant appliquer une stratégie de gestion de capital doit au préalable évaluer sa situation patrimoniale, son horizon, sa tolérance au risque, et le cas échéant solliciter un Conseiller en Investissements Financiers enregistré ORIAS. Les performances passées et les simulations Monte Carlo présentées ici ne préjugent pas des performances futures. Le capital investi est susceptible de pertes, y compris totales, sur le compartiment actif (10 %).

---

## 1. Architecture du système 90/10

Le système NAVLYS repose sur une séparation comptable et opérationnelle stricte du capital total `K` en deux compartiments :

- **Compartiment Forteresse (90 %)** : `K_F = 0,90 × K`
  - Allocation défensive : monétaire, fonds euros, ETF agrégat investment grade, ou cash sécurisé selon profil.
  - Aucune position spéculative. Aucun effet de levier. Aucune corrélation directe avec le compartiment actif.
  - Rôle : préserver le capital nominal et conserver la capacité de redémarrage du compartiment actif en cas de drawdown total.

- **Compartiment Actif (10 %)** : `K_A = 0,10 × K`
  - Allocation tactique exécutée par le moteur NAVLYS selon signaux + dimensionnement Kelly.
  - Tolérance de perte maximale = 100 % de `K_A`, soit 10 % de `K` total.
  - Reconstitution éventuelle depuis la Forteresse sur décision discrétionnaire de l'utilisateur, jamais automatique.

Cette séparation est la pierre angulaire du dispositif. Elle garantit qu'aucun scénario de marché extrême, aussi adverse soit-il, ne peut compromettre 90 % du patrimoine.

---

## 2. Justification quantitative du ratio 90/10

Le choix du ratio 90/10 n'est pas arbitraire. Il découle de trois contraintes simultanées :

1. **Contrainte de préservation** : le drawdown maximum acceptable sur le patrimoine global est fixé à 10 % (seuil psychologique et patrimonial standard pour un investisseur prudent).
2. **Contrainte de matérialité** : le compartiment actif doit représenter une fraction suffisante pour générer un rendement perceptible à l'échelle du patrimoine. Sous 5 %, l'effort opérationnel n'est pas justifié. Au-dessus de 15 %, le drawdown global devient inacceptable.
3. **Contrainte de Kelly fractionnel** : la littérature (Thorp 1969, MacLean & Ziemba 2010) recommande d'appliquer Kelly sur une fraction « bet sizing » du capital total, pas sur la totalité, pour absorber l'incertitude d'estimation des paramètres `p` et `b`.

Le ratio 90/10 satisfait les trois contraintes en simultané.

---

## 3. Formalisation mathématique du dimensionnement Kelly

La fraction optimale de Kelly pour un pari binaire à mise variable est :

```
f* = (b × p − q) / b
```

Avec :
- `p` : probabilité de gain estimée par le signal.
- `q = 1 − p` : probabilité de perte.
- `b` : ratio gain/perte par unité misée (odds nettes).

**Implémentation NAVLYS** :
- `f*` calculé en temps réel à chaque opportunité.
- Application d'un facteur de prudence `λ ∈ [0,25 ; 1,0]` selon profil utilisateur (Half-Kelly, Quarter-Kelly).
- Mise effective = `f* × λ × K_A`.
- Plafond strict : aucune mise > 100 % de `K_A`.

**Démonstration intuitive** : `f*` maximise l'espérance du logarithme du capital `E[log(K_{t+1})]`, ce qui équivaut à maximiser le taux de croissance géométrique à long terme. Toute mise supérieure à `f*` entraîne mécaniquement une dégradation du taux de croissance, même si l'espérance arithmétique reste positive.

---

## 4. Résultats des simulations Monte Carlo

Trois campagnes de simulation ont été conduites (v5, v6, v7), chacune à 10 000 itérations, avec horizon 250 jours de trading et capital initial normalisé à 1,00.

### 4.1. v5 — Validation Martingale pure

| Paramètre | Valeur |
|---|---|
| Mise unitaire | 20 % de `K_A` |
| Taux de réussite signal | 55 % |
| Jours profitables | **70,5 %** |
| Verdict | FORMULE VIABLE |

### 4.2. v6 — Test signal aléatoire

| Paramètre | Valeur |
|---|---|
| Stratégie | Martingale |
| Taux de réussite signal | 50 % (aléatoire) |
| ROI moyen | **−1,07 %** |
| Verdict | NON VIABLE sans signal |

Démonstration empirique : le moteur de dimensionnement seul ne crée pas d'edge. La rentabilité dépend entièrement de la qualité du signal.

### 4.3. v7 — Comparaison Kelly vs Martingale vs Mise fixe

| Stratégie | ROI moyen | Atteinte palier zéro |
|---|---|---|
| **Kelly plein** | **+17,02 %** | **0 %** |
| Martingale | +9,71 % | 37,1 % |
| Mise fixe | +3,63 % | 0 % |

**Conclusion** : Kelly domine sur le couple rendement/risque. Martingale offre un rendement plus élevé qu'une mise fixe mais expose à un risque de ruine inacceptable (37 % de probabilité de perdre 100 % de `K_A` sur l'horizon testé).

---

## 5. Les 14 paramètres de configuration

Le moteur NAVLYS expose 14 paramètres dont 5 sont visibles dans l'interface client et 9 sont des paramètres avancés masqués.

### 5.1. Paramètres visibles client (5)
1. **Ratio Forteresse / Actif** — défaut 90/10, plage autorisée 95/5 à 80/20.
2. **Facteur prudence Kelly `λ`** — défaut 0,50 (Half-Kelly), plage 0,25 à 1,00.
3. **Seuil de confiance signal** — défaut 0,55, plage 0,52 à 0,65.
4. **Nombre maximal de sorties par jour** — défaut 1, plage 0 à 5.
5. **Mode automatique / manuel** — défaut manuel (l'utilisateur valide chaque sortie).

### 5.2. Paramètres avancés (9)
6. Plafond drawdown intraday sur `K_A` — défaut 30 %.
7. Plafond pertes consécutives avant pause — défaut 5.
8. Durée de pause après plafond — défaut 24 h.
9. Mode reconstitution `K_A` depuis `K_F` — défaut désactivé.
10. Fenêtre de lissage du signal — défaut 5 périodes.
11. Pondération signaux multi-facteurs — défaut équipondérée.
12. Tolérance slippage — défaut 0,10 %.
13. Cap exposition par actif unique — défaut 25 % de `K_A`.
14. Mode log / audit — défaut activé, traçabilité complète.

---

## 6. Architecture des 5 écrans

L'interface client suit un parcours linéaire en 5 écrans :

1. **Bienvenue** : tableau de bord patrimonial (Forteresse, Actif, performance cumulée).
2. **Idée du jour** : recommandation algorithmique (action, taille, justification signal).
3. **Mes réglages** : 5 curseurs visibles, bouton « Détails » pour les 9 avancés.
4. **Exécution** : confirmation de l'opération, ordre transmis ou simulé.
5. **Bilan** : recap journalier, journal d'apprentissage, ajustement paramètres.

---

## 7. Positionnement réglementaire

Le système NAVLYS est commercialisé sous la marque NAVLYS comme **outil pédagogique d'éducation financière** et **simulateur de stratégie**. Il n'exécute pas d'ordres réels sans broker tiers explicitement mandaté par l'utilisateur, et n'opère pas de réception-transmission d'ordres (RTO).

Bruno Mark Partouche, en qualité de CIF (enregistrement ORIAS en cours), propose un service complémentaire d'accompagnement patrimonial individualisé via brunopartouche.com, avec convention CIF formalisée. NAVLYS et brunopartouche.com sont des entités distinctes : NAVLYS = produit pédagogique grand public, brunopartouche.com = service de conseil régulé.

---

## 8. Roadmap scientifique

- **v8** : intégration d'un signal multi-facteurs (technique + macro + sentiment) avec validation walk-forward.
- **v9** : test d'un Kelly adaptatif (`λ` dynamique selon volatilité réalisée).
- **v10** : back-test sur données réelles 2010-2025 multi-classes d'actifs.

---

## 9. Disclaimer final

Document à usage pédagogique. Les chiffres sont issus de simulations Monte Carlo. Performance passée ≠ future. Tout investissement comporte un risque de perte en capital. Consultez un professionnel enregistré ORIAS avant toute décision d'allocation effective.

**Auteur** : Bruno Mark Partouche
**Site** : brunopartouche.com
**Statut CIF** : enregistrement ORIAS en cours, accompagnement DFENSER.
