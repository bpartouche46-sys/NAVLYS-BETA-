# Contrats de données — le langage commun des 3 modules

> Pour que les trois bateaux naviguent ensemble, ils doivent parler la même langue.

---

## Pourquoi ce document

Chaque module (Objectif, Marge Révélée, Martingale Scientifique) a son propre vocabulaire interne. Le dashboard unifié a besoin d'un dictionnaire commun. Ce dictionnaire est défini en TypeScript strict dans `lib/navlysBridge.ts`.

---

## Les trois objets clés

### NavlysObjectif

Ce que le visiteur veut atteindre.

| Champ | Type | Sens en image |
|---|---|---|
| `type` | enum (8 valeurs + custom) | Quel phare il vise |
| `montantCible` | number (€) | La hauteur du phare |
| `duree` | number (mois) | La vitesse du navire |
| `rendementPctAnnuel` | number (1-8 %) | La force du vent attendu |

### NavlysFraisActuels

L'état de la coque du visiteur aujourd'hui.

| Champ | Type | Sens en image |
|---|---|---|
| `broker` | string (slug) | Le port de départ actuel |
| `banque` | string (slug) | Le quai où il amarre |
| `tradesParMois` | number | Combien de sorties en mer |
| `ticketMoyen` | number (€) | Taille moyenne du chargement |
| `fraisBanqueMensuels` | number (€) | Coût du quai chaque mois |

### NavlysPlan

Le plan final, composé à partir des deux précédents.

| Champ | Type | Sens en image |
|---|---|---|
| `objectif` | NavlysObjectif | Le cap fixé |
| `fraisActuels` | NavlysFraisActuels | La coque actuelle |
| `economiesAnnuelles` | number (€) | Coquillages retirés par an |
| `acceleration` | { moisGagnes, pctPlusVite } | Mois économisés sur la route |
| `partitionForcter90Actif10` | { forteresse, jeuActif } | Forteresse + voilier |
| `margeProtectionMax` | number (€) | Filet de sécurité du voilier |
| `stratRecommandee` | enum (5 stratégies) | Voile recommandée par défaut |
| `disclaimer` | string | Le rappel pédagogique |

---

## Règles d'or

- **Aucun `any`** : tout est typé.
- **Tout est nommé** : exports nommés, pas d'export default sur les types.
- **Tout est en €** : pas de devises mixtes.
- **Le plan est immuable une fois composé** : si le visiteur change un paramètre, on appelle `composerPlan()` à nouveau, on ne mute pas.

---

## Flux

```
Escale 1 + 2  →  objet NavlysObjectif
Escale 3      →  objet NavlysFraisActuels
                       ↓
                composerPlan()
                       ↓
                 NavlysPlan
                       ↓
             Dashboard + Email + WhatsApp
```
