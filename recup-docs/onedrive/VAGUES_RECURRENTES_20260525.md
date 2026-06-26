# AGENT 007 — Vagues recurrentes du panier (analyse du 2026-05-25)

> PAPER / VIRTUEL. On mesure des **probabilites passees**, pas une prophetie. Performance passee != performance future. Les effets marques `*`/`**`/`***` sont indicatifs (~90/95/99%) ; avec beaucoup de tests, du hasard peut se deguiser en signal. A confirmer avant tout usage.

**Actifs (7) :** AAPL, AMD, BTC, ETH, MSFT, NVDA, TSLA  ·  **Donnees :** journalier reel, ~2021-05-27 -> 2026-05-22

## 1) Effet jour de la semaine (la vague hebdomadaire)

_Rendement moyen d'une seance selon le jour (close-a-close ; le lundi inclut le week-end). `*`=90% `**`=95% `***`=99%._

### AAPL

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi | +0.134% | 55% | +1.2 | 232 |
| mardi | +0.128% | 56% | +1.3 | 259 |
| mercredi 🟢 | +0.162% | 55% | +1.4 | 257 |
| jeudi 🔴 | -0.106% | 48% | -0.9 | 251 |
| vendredi | +0.112% | 52% | +1.0 | 254 |

- Meilleur jour : **mercredi** (+0.162%/seance) · Pire jour : **jeudi** (-0.106%/seance).

### AMD

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi 🟢 | +0.496% | 52% | +2.3** | 232 |
| mardi | +0.101% | 49% | +0.6 | 259 |
| mercredi | +0.393% | 53% | +1.5 | 257 |
| jeudi 🔴 | -0.052% | 49% | -0.2 | 251 |
| vendredi | +0.095% | 50% | +0.5 | 254 |

- Meilleur jour : **lundi** (+0.496%/seance) · Pire jour : **jeudi** (-0.052%/seance).

### BTC

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi | +0.223% | 52% | +1.0 | 261 |
| mardi | -0.010% | 48% | -0.1 | 260 |
| mercredi 🟢 | +0.446% | 51% | +2.3** | 260 |
| jeudi 🔴 | -0.319% | 44% | -1.8* | 261 |
| vendredi | +0.014% | 50% | +0.1 | 261 |
| samedi | -0.023% | 51% | -0.2 | 261 |
| dimanche | +0.212% | 52% | +1.5 | 261 |

- Meilleur jour : **mercredi** (+0.446%/seance) · Pire jour : **jeudi** (-0.319%/seance).

### ETH

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi | +0.131% | 53% | +0.5 | 261 |
| mardi | -0.195% | 47% | -0.9 | 260 |
| mercredi 🟢 | +0.651% | 51% | +2.5** | 260 |
| jeudi 🔴 | -0.373% | 44% | -1.4 | 261 |
| vendredi | -0.091% | 51% | -0.4 | 261 |
| samedi | +0.143% | 56% | +1.0 | 261 |
| dimanche | +0.113% | 51% | +0.6 | 261 |

- Meilleur jour : **mercredi** (+0.651%/seance) · Pire jour : **jeudi** (-0.373%/seance).

### MSFT

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi | +0.041% | 51% | +0.4 | 232 |
| mardi | +0.008% | 50% | +0.1 | 259 |
| mercredi 🟢 | +0.224% | 54% | +1.9* | 257 |
| jeudi 🔴 | -0.040% | 52% | -0.3 | 251 |
| vendredi | +0.037% | 50% | +0.4 | 254 |

- Meilleur jour : **mercredi** (+0.224%/seance) · Pire jour : **jeudi** (-0.040%/seance).

### NVDA

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi | +0.376% | 60% | +1.8* | 232 |
| mardi | +0.214% | 51% | +1.2 | 259 |
| mercredi 🟢 | +0.415% | 54% | +2.1** | 257 |
| jeudi | +0.396% | 57% | +1.6 | 251 |
| vendredi 🔴 | -0.082% | 46% | -0.4 | 254 |

- Meilleur jour : **mercredi** (+0.415%/seance) · Pire jour : **vendredi** (-0.082%/seance).

### TSLA

| Jour | Rdt moy. | % seances + | t | n |
| --- | --- | --- | --- | --- |
| lundi 🟢 | +0.553% | 57% | +2.0** | 232 |
| mardi | -0.019% | 50% | -0.1 | 259 |
| mercredi | +0.373% | 55% | +1.6 | 257 |
| jeudi 🔴 | -0.458% | 46% | -1.8* | 251 |
| vendredi | +0.213% | 52% | +1.0 | 254 |

- Meilleur jour : **lundi** (+0.553%/seance) · Pire jour : **jeudi** (-0.458%/seance).

## 2) Effet "tour du mois" (turn-of-month)

_Fenetre TOM = dernier jour de bourse du mois + les 3 premiers du mois suivant, vs le reste._

| Actif | TOM (rdt moy.) | % + | t | n TOM | Hors-TOM (rdt moy.) | Ecart |
| --- | --- | --- | --- | --- | --- | --- |
| AAPL | +0.023% | 52% | +0.2 | 242 | +0.101% | -0.078% |
| AMD | +0.144% | 52% | +0.6 | 242 | +0.216% | -0.072% |
| BTC | -0.062% | 49% | -0.4 | 244 | +0.099% | -0.161% |
| ETH | +0.016% | 52% | +0.1 | 244 | +0.060% | -0.043% |
| MSFT | -0.038% | 47% | -0.3 | 242 | +0.076% | -0.114% |
| NVDA | +0.151% | 54% | +0.8 | 242 | +0.288% | -0.137% |
| TSLA | -0.041% | 48% | -0.2 | 242 | +0.166% | -0.208% |

## 3) Debut / milieu / fin de mois

| Actif | debut (j1-7) | milieu (j8-15) | fin (j16+) |
| --- | --- | --- | --- |
| AAPL | +0.016% | +0.097% | +0.156%* |
| AMD | +0.279% | +0.047% | +0.322%* |
| BTC | +0.023% | +0.245%* | +0.015% |
| ETH | -0.002% | +0.187% | +0.010% |
| MSFT | +0.043% | +0.061% | +0.060% |
| NVDA | +0.294%* | +0.211% | +0.292% |
| TSLA | -0.077% | +0.031% | +0.501%** |

## 4) Saisonnalite mensuelle (quel mois porte / pese)

_Rendement moyen d'une seance selon le mois calendaire (x100 ; sur ~5 ans, n par mois est limite => fragile)._

| Actif | janv. | fevr. | mars | avril | mai | juin | juil. | aout | sept. | oct. | nov. | dec. |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AAPL | -0.04 | -0.00 | +0.00 | -0.02 | +0.18 | +0.22 | +0.31 | +0.11 | -0.16 | +0.18 | +0.26 | -0.01 |
| AMD | +0.16 | +0.03 | +0.13 | +0.12 | +0.99 | +0.10 | +0.46 | -0.13 | -0.26 | +0.43 | +0.58 | -0.17 |
| BTC | +0.13 | +0.14 | +0.32 | -0.02 | -0.01 | -0.25 | +0.28 | -0.16 | +0.07 | +0.48 | +0.02 | -0.10 |
| ETH | -0.09 | -0.02 | +0.20 | -0.14 | +0.15 | -0.47 | +0.62 | +0.10 | -0.14 | +0.37 | +0.19 | -0.16 |
| MSFT | -0.10 | -0.12 | +0.09 | +0.05 | +0.28 | +0.22 | +0.14 | -0.08 | -0.16 | +0.17 | +0.21 | -0.06 |
| NVDA | +0.30 | +0.48 | +0.30 | -0.21 | +0.93 | +0.42 | +0.35 | +0.05 | -0.29 | +0.42 | +0.56 | -0.12 |
| TSLA | -0.01 | -0.17 | -0.04 | -0.18 | +0.42 | +0.29 | +0.49 | -0.00 | +0.50 | +0.05 | +0.39 | -0.22 |

- **AAPL** — mois porteurs : juil. (+0.31%), nov. (+0.26%) · mois lourds : sept. (-0.16%), janv. (-0.04%)
- **AMD** — mois porteurs : mai (+0.99%), nov. (+0.58%) · mois lourds : sept. (-0.26%), dec. (-0.17%)
- **BTC** — mois porteurs : oct. (+0.48%), mars (+0.32%) · mois lourds : juin (-0.25%), aout (-0.16%)
- **ETH** — mois porteurs : juil. (+0.62%), oct. (+0.37%) · mois lourds : juin (-0.47%), dec. (-0.16%)
- **MSFT** — mois porteurs : mai (+0.28%), juin (+0.22%) · mois lourds : sept. (-0.16%), fevr. (-0.12%)
- **NVDA** — mois porteurs : mai (+0.93%), nov. (+0.56%) · mois lourds : sept. (-0.29%), avril (-0.21%)
- **TSLA** — mois porteurs : sept. (+0.50%), juil. (+0.49%) · mois lourds : dec. (-0.22%), avril (-0.18%)

## 5) Persistance vs retournement (la vague tient-elle ?)

_Autocorr lag-1 > 0 => les mouvements ont tendance a se prolonger (momentum) ; < 0 => rebond/retournement le lendemain (mean-reversion)._

| Actif | autocorr j/j | P(hausse | veille hausse) | P(hausse | veille baisse) | serie moy. |
| --- | --- | --- | --- | --- |
| AAPL | +0.018 | 55% | 52% | 2.06 j |
| AMD | -0.015 | 51% | 50% | 2.02 j |
| BTC | -0.029 | 48% | 52% | 1.92 j |
| ETH | -0.025 | 48% | 54% | 1.89 j |
| MSFT | +0.001 | 52% | 51% | 2.01 j |
| NVDA | -0.036 | 55% | 52% | 2.06 j |
| TSLA | -0.012 | 53% | 51% | 2.04 j |

## 6) Groupes qui ondulent ensemble (co-mouvements)

_Correlation des rendements journaliers sur 1253 seances communes._

| corr | AAPL | AMD | BTC | ETH | MSFT | NVDA | TSLA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AAPL | 1.00 | 0.46 | 0.26 | 0.29 | 0.58 | 0.50 | 0.48 |
| AMD | 0.46 | 1.00 | 0.31 | 0.34 | 0.50 | 0.67 | 0.44 |
| BTC | 0.26 | 0.31 | 1.00 | 0.84 | 0.33 | 0.32 | 0.30 |
| ETH | 0.29 | 0.34 | 0.84 | 1.00 | 0.34 | 0.35 | 0.32 |
| MSFT | 0.58 | 0.50 | 0.33 | 0.34 | 1.00 | 0.60 | 0.41 |
| NVDA | 0.50 | 0.67 | 0.32 | 0.35 | 0.60 | 1.00 | 0.46 |
| TSLA | 0.48 | 0.44 | 0.30 | 0.32 | 0.41 | 0.46 | 1.00 |

**Grappes detectees (correlation >= 0.60) :**
- Grappe 1 : **NVDA, MSFT, AMD**
- Grappe 2 : **AAPL**
- Grappe 3 : **ETH, BTC**
- Grappe 4 : **TSLA**

- Duo le plus synchrone : **BTC–ETH** (0.84).
- Duo le plus independant : **AAPL–BTC** (0.26).

## 7) Lecture de marin (synthese honnete)

- Ces chiffres sont des **tendances passees**, utiles pour ORIENTER l'attention, pas pour predire une seance precise. Un effet faible (|t|<2) est du bruit probable.
- La vraie valeur : repeter cette mesure dans le temps et **ne garder que les effets qui reviennent** mois apres mois (cf. fichier journal_vagues.jsonl).
- Intraday (heure par heure, derniere heure du vendredi, ouverture du lundi) : **non disponible** avec la source de donnees actuelle (plan EOD). A brancher sur un flux intraday.

*Agent 007 NAVLYS — moteur Vagues — 2026-05-25. La discipline tient le cap, pas la prophetie.*