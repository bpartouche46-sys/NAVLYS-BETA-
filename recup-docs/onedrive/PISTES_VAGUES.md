# AGENT 007 — Pistes « vagues récurrentes » (cap de recherche)

> PAPER / VIRTUEL. Ce sont des **tendances passées** mesurées sur ~5 ans de données journalières réelles (2021→2026), pas une prophétie. Performance passée ≠ future. On cherche des vagues qui *reviennent* ; tant qu'un effet n'est pas stable dans le temps, on le traite comme une hypothèse, pas une vérité.

**Panier analysé (7 actifs) :** NVDA, AMD, TSLA, AAPL, MSFT + BTC, ETH. *(MU à ajouter au prochain run — source de données momentanément saturée.)*

---

## 🌊 Ce que les vagues disent déjà (les 3 signaux les plus nets)

**1) La vague hebdomadaire « mercredi fort / jeudi faible ».**
C'est le motif le plus reproductible du panier — il revient sur presque tous les actifs :

- **Mercredi = meilleur jour** : ETH +0,65 %/séance (t=2,5), BTC +0,45 % (t=2,3), NVDA +0,42 % (t=2,1), MSFT +0,22 % (t=1,9), AAPL +0,16 %.
- **Jeudi = pire jour** quasi partout : ETH −0,37 %, TSLA −0,46 %, BTC −0,32 %, et négatif aussi sur AMD/AAPL/MSFT.

Quand un même rythme apparaît sur 6 actifs sur 7 *et* sur deux marchés différents (actions + crypto), ce n'est probablement pas un pur hasard. **C'est la piste n°1 à traquer.**

**2) L'effet « lundi » des chevaux nerveux (high-beta).**
Sur les deux actifs les plus volatils, le lundi est le grand jour :

- **TSLA** lundi +0,55 %/séance (t=2,0) · **AMD** lundi +0,50 % (t=2,3).
- Sur les mégacaps plus calmes (NVDA, MSFT, AAPL), l'effet lundi disparaît au profit du mercredi.

→ Hypothèse : le lundi porte surtout le **risque/rebond** ; à creuser séparément.

**3) Deux grappes qui ondulent ensemble.**
Les actifs ne bougent pas chacun dans leur coin — ils forment des bancs :

- **Grappe IA / mégacaps :** NVDA + MSFT + AMD (montent/descendent ensemble).
- **Grappe crypto :** BTC + ETH — le duo le plus synchrone du panier (corrélation 0,84).
- **AAPL et TSLA** nagent plus en solo (AAPL est même le plus indépendant de la crypto : 0,26).

→ Conséquence pratique : prendre NVDA *et* AMD *et* MSFT le même jour, ce n'est pas 3 paris, c'est **presque le même pari** (concentration de risque). Idem BTC+ETH.

**Ce qui ne ressort PAS (honnêteté) :** l'effet « tour du mois » n'est pas net sur ce panier (aucun t significatif), et la persistance jour-à-jour est faible (la crypto serait même légèrement « rebond » : une grosse hausse appelle souvent une respiration). Donc : pas de vague mensuelle exploitable ici pour l'instant.

---

## 🧭 Où concentrer la recherche (pour resserrer de plus en plus)

1. **Verrouiller la vague « mercredi/jeudi ».** La re-mesurer chaque semaine et exiger qu'elle *tienne*. Garde-fou statistique : on teste 5 jours × 7 actifs = 35 effets, donc le hasard produit forcément quelques « t≈2 ». Pour être sérieux, viser **|t| ≥ 2,7** et surtout la **stabilité dans le temps** (le fichier `journal_vagues.jsonl` accumule chaque run pour ça).

2. **Tester l'effet lundi par régime.** Séparer marché haussier vs baissier : l'effet lundi de TSLA/AMD est peut-être un héritage du rally 2023-2024 et pourrait s'éteindre en marché lourd.

3. **Mesurer le lead-lag entre grappes.** Est-ce que la grappe IA-mégacaps *précède* la crypto d'un jour (ou l'inverse) ? C'est la piste qui transformerait une corrélation en **signal avancé**. (À ajouter : corrélation décalée de 1 à 3 jours.)

4. **Débloquer l'intraday.** Tes intuitions « dernière heure du vendredi » et « ouverture du lundi » sont **intestables aujourd'hui** : la source actuelle ne donne que du journalier (clôtures). Pour les heures, il faut un flux intraday (plan de données supérieur, ou flux courtier type Alpaca). C'est l'investissement n°1 si tu veux descendre à l'heure.

5. **Élargir le banc de poissons.** Ajouter MU + d'autres noms (et secteurs hors-tech) fera émerger de nouvelles grappes et confirmera si « mercredi/jeudi » est un effet de marché global ou propre à la tech.

6. **Ne garder que ce qui revient.** Règle NAVLYS de discipline : un effet n'entre dans le jeu que s'il est **réapparu plusieurs fois** dans le journal. On ne pêche pas un signal, on attend qu'il remonte trois fois au même endroit.

---

## ⚙️ Le programme tourne en boucle

- **Collecte :** `data/real/<SYM>.csv` (journalier réel, ~5 ans).
- **Moteur :** `moteur/agent_007_vagues.py` → écrit `agent_007/VAGUES_RECURRENTES_<date>.md` + `.json` et **empile** `agent_007/journal_vagues.jsonl` (mémoire de la stabilité des vagues).
- **Relance :** `python3 moteur/agent_007_vagues.py`. À programmer en veille hebdomadaire pour suivre la persistance.

*Agent 007 NAVLYS — pistes vagues — 2026-05-25. La discipline tient le cap, pas la prophétie.*
