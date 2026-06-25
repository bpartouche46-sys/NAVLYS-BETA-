# 🧭 CARTOGRAPHE — Mission #3 · Routines détaillées par profil
**🧭 Le Cartographe — Directeur de Recherche · Laboratoire NEXT GEN NAVLYS**
*Verrouillé le 28 mai 2026.*

---

## Préambule

Une routine NAVLYS = un **enchaînement de gestes simples**, daté, mesuré, traçable. Pas un signal trading. Pas une recommandation personnalisée. Un **rythme** que l'utilisateur peut **suivre, ignorer ou ajuster**.

Chaque routine respecte la **règle des 3** :
1. **Une action principale** (verbe d'action clair).
2. **Un seul indicateur à regarder**.
3. **Une alerte à déclencher en cas de quoi**.

Métaphores maritimes. Langage condensé. Aucune promesse de rendement.

> ⚓ **Mise à jour Mission #4 (28 mai 2026).** Tous les profils ayant une **poche tactique active** (3 Entrepreneur, 5 Skipper, 6 Pro Actif) intègrent désormais le mécanisme **Variante D = Stop fixe 2 % + Lock 50 % / Reinvest 50 %** par défaut. Validé Mission #4 comme **protecteur** (DD réduit −42 % vs baseline A). Ajouts visibles dans les actions et alertes des routines correspondantes ci-dessous.

> ❌ **Interdit explicite (G1 renforcé Mission #4).** La formule AdaptiveStop Perplexity = MAX(0,001 ; (Cible−ΣPnL)/N_restants) est **interdite dans toutes les routines** (Sharpe OOS −10,06, martingale déguisée). Réf. `_CARTOGRAPHE_M4_VERDICT_ADAPTIVESTOP.md`.

---

# 🛡️ PROFIL 1 — Le Marin Prudent

## Routine QUOTIDIENNE
**Durée** : 0 minute. **On ne regarde pas son portefeuille tous les jours.**

> 🧭 *« Le yacht est au mouillage. Pas besoin de vérifier l'ancre chaque heure. »*

## Routine HEBDOMADAIRE
**Durée** : 0 minute. Sauf alerte automatique poussée par NAVLYS.

## Routine MENSUELLE
**Durée** : 10 min.
- **Action** : virement du DCA mensuel (épargne automatique sur fonds €/Livret A).
- **Indicateur** : solde du compte courant — assez de cash pour les charges ?
- **Alerte** : si la solde courant < 3 mois de dépenses, **suspendre le DCA** ce mois.

## Routine TRIMESTRIELLE — La routine principale
**Durée** : 30 min, 4× par an (mars, juin, septembre, décembre).
- **Action 1** : connecter à NAVLYS, lire la **Carte du Trimestre** du Cartographe.
- **Action 2** : vérifier que l'allocation 90/10 est intacte (drift > 5 % → rééquilibrer).
- **Action 3** : encaisser les coupons obligataires + dividendes ETF, les réinvestir.
- **Indicateur** : drift d'allocation %.
- **Alerte** : si drift > 5 % depuis dernier rééquilibrage, **rééquilibrer**.

## Routine ANNUELLE
**Durée** : 1 jour (en janvier).
- Bilan fiscal (déclaration revenus mobiliers).
- Bilan psychologique : « Suis-je à l'aise avec mes résultats ? »
- Vérifier si la vie a changé (perte conjoint, héritage, déménagement) → re-questionnaire si besoin.
- Lire le **Rapport NEXT GEN annuel** publié par le Cartographe.

> 🧭 *« Une fois par an, on remonte à bord, on vérifie la coque, on remet du gaz dans la lampe et on repart pour un tour. »*

---

# 👨‍👩‍👧 PROFIL 2 — Le Capitaine de Famille

## Routine QUOTIDIENNE
**Durée** : 0 minute. Vie de famille d'abord.

## Routine HEBDOMADAIRE
**Durée** : 10 min, 1× par semaine (dimanche soir par défaut).
- **Action** : lire la **Carte de la Semaine** du Cartographe.
- **Indicateur** : drift d'allocation (affiché par NAVLYS).
- **Alerte** : drift > 5 % → noter pour rééquilibrage mensuel.

## Routine MENSUELLE — La routine principale
**Durée** : 30 min, 1× par mois.
- **Action 1** : virement DCA sur ETF World (montant défini Q4).
- **Action 2** : si drift > 5 %, **rééquilibrer** (vendre l'excédent / acheter le manque).
- **Action 3** : check poche tactique 10 % (Donchian doux) — stop-loss respectés ?
- **Indicateur** : drift d'allocation + état des stops sur poche tactique.
- **Alerte** : si poche tactique perd > 15 % cumulé sur 3 mois, **désactiver** la stratégie active jusqu'au prochain trimestre + écrire 3 lignes dans le journal NAVLYS pour analyser.

## Routine TRIMESTRIELLE
**Durée** : 1h.
- Audit complet allocation 30/60/10.
- Lecture **Carte du Trimestre** Cartographe.
- Vérification frais (PEA, AV, courtier) — sont-ils dans la norme < 0,5 %/an ?

## Routine ANNUELLE
**Durée** : 1 jour.
- Bilan fiscal.
- Re-questionnaire complet (vie change : enfant naît, déménagement, promotion).
- Bilan psychologique.

---

# 🚀 PROFIL 3 — L'Entrepreneur en Croissance

## Routine QUOTIDIENNE
**Durée** : 5 min max.
- **Action** : check NAVLYS Dashboard — y a-t-il une alerte stop-loss touchée hier ?
- **Indicateur** : indicateur du jour défini par le Cartographe (ex : Donchian channel position).
- **Alerte** : si une position individuelle a touché son stop −15 %, **clôturer** sans hésiter (G1).

## Routine HEBDOMADAIRE — La routine principale
**Durée** : 1h, 1× par semaine (dimanche soir).
- **Action 1** : lire la **Carte de la Semaine** du Cartographe.
- **Action 2** : revue des 5–10 positions tactiques (Donchian + Stat-arb paires) — **stop fixe 2 %** maintenu sur chaque trade (G1 — pas d'adaptatif).
- **Action 3** : ajustement des stops si gains > 10 % (trailing stop possible — fixe, jamais adaptatif post-perte).
- **Action 4** : **Lock 50 % / Reinvest 50 %** sur les gains hebdo de la poche tactique → moitié verrouillée dans bucket sécurisé visible (Variante D Mission #4), moitié réinjectée.
- **Action 5** : DCA hebdomadaire sur ETF si défini.
- **Indicateur** : drawdown courant poche tactique + montant cumulé bucket sécurisé.
- **Alerte 1** : si DD poche tactique > 20 %, **freeze tactique** 1 mois + analyse.
- **Alerte 2** : si **safety stop journalier −2 %** sur portefeuille déclenche → session coupée, journal obligatoire.

## Routine MENSUELLE
**Durée** : 1h30.
- Bilan performance vs benchmark personnel (ex : 60 % MSCI World + 30 % Nasdaq + 10 % BTC).
- Rééquilibrage 20/50/30 si drift > 5 %.
- Analyse PnL stratégies actives — Sharpe rolling 30j positif ?

## Routine TRIMESTRIELLE
**Durée** : 2-3h.
- Audit complet : performance, frais, fiscalité PFU/IS.
- Lecture **Carte du Trimestre** Cartographe.
- Décision : ajuster univers actifs (entrée/sortie de tickers).

## Routine ANNUELLE
**Durée** : 1 jour.
- Bilan fiscal complet (PEA, CTO, crypto, PFU).
- Re-questionnaire (changement statut entreprise ?).
- Audit psychologique : suis-je en train de courir après les pertes ? (G1).

---

# 🌱 PROFIL 4 — L'Étudiant Découvreur

## Routine QUOTIDIENNE
**Durée** : 0 minute. **Étudier, vivre, sortir, lire.**

> 🧭 *« L'Optimist n'a pas besoin d'aller en mer tous les jours. Apprendre à border le foc à terre vaut déjà beaucoup. »*

## Routine HEBDOMADAIRE
**Durée** : 15 min.
- **Action** : lire **une** publication NAVLYS (Carte du Cartographe ou rapport Labo).
- **Indicateur** : nombre de publications lues ce mois (badge éducatif).
- **Alerte** : aucune — c'est une routine d'apprentissage.

## Routine MENSUELLE — La routine principale
**Durée** : 10 min.
- **Action 1** : virement DCA petit montant (10–100 €) sur ETF World.
- **Action 2** : check du solde Livret A — atteint-il 3 mois de dépenses ?
- **Indicateur** : solde Livret A.
- **Alerte** : si Livret A < 1 mois de dépenses, **suspendre DCA ETF** et reconstituer Livret A.

## Routine TRIMESTRIELLE
**Durée** : 30 min.
- Quiz NAVLYS-EDU (gamification d'apprentissage).
- Lecture **Carte du Trimestre**.

## Routine ANNUELLE
**Durée** : 2h.
- Bilan : combien j'ai épargné cette année ? Combien lu ?
- Vérification statut (toujours étudiant ? premier emploi ?).
- Si premier emploi → re-questionnaire (passage probable Profil 2 ou 5).

---

# 🧭 PROFIL 5 — Le Skipper Indépendant

## Routine QUOTIDIENNE
**Durée** : 0 minute.

## Routine HEBDOMADAIRE
**Durée** : 10 min, 1× par semaine.
- **Action** : check trésorerie pro + perso. Reste du cash d'urgence (6 mois) ?
- **Indicateur** : ratio cash d'urgence / dépenses mensuelles.
- **Alerte** : si ratio < 6, **freezer tout DCA** et reconstituer.

## Routine MENSUELLE — La routine principale
**Durée** : 20 min.
- **Action 1** : virement DCA (montant variable selon mois — revenus variables).
- **Action 2** : check allocation 60/20/20 — drift ?
- **Action 3** : lecture **Carte du Mois** Cartographe.
- **Action 4** : sur poche Donchian doux 5 % capital — **stop fixe 2 %** maintenu (jamais adaptatif). **Lock 50 % / Reinvest 50 %** sur les gains mensuels de cette poche → moitié verrouillée renforce le cash d'urgence (cumul du bucket sécurisé visible).
- **Indicateur** : ratio cash d'urgence + drift d'allocation + montant bucket Lock.
- **Alerte** : drift > 5 % → rééquilibrer **uniquement** si cash d'urgence intact.

## Routine TRIMESTRIELLE
**Durée** : 1h.
- Audit allocation.
- Lecture **Carte du Trimestre**.
- Vérification stratégie active (Donchian doux) — Sharpe rolling positif ?

## Routine ANNUELLE
**Durée** : 1 jour.
- Bilan fiscal (BNC, BIC, IS selon statut).
- Re-questionnaire (statut a-t-il changé ? expat rentre ?).
- Audit psychologique.

---

# 💼 PROFIL 6 — Le Pro Actif

## Routine QUOTIDIENNE — La routine principale
**Durée** : 15 min max (avant ou après bourse).
- **Action 1** : check NAVLYS Dashboard — alertes stops, breakouts Donchian, écarts paires Stat-arb, état **bucket Lock** sécurisé.
- **Action 2** : si signal validé Mission #1 déclenche → exécuter selon plan figé (**taille position fixe, stop fixe 2 %, take fixe**). **Aucune adaptation post-perte** (G1 Mission #4 — AdaptiveStop Perplexity invalidée Sharpe −10,06).
- **Action 3** : **Lock 50 % / Reinvest 50 %** à la clôture de chaque trade gagnant : 50 % verrouillé bucket sécurisé visible, 50 % réinjecté. Variante D validée Mission #4 (DD réduit −42 %).
- **Action 4** : journaling rapide (1 ligne sur ce que j'ai fait + pourquoi) — vérifier zéro tentation martingale.
- **Indicateur** : drawdown courant + Sharpe rolling 20j + bucket Lock cumul.
- **Alerte 1** : si Sharpe rolling 20j < 0 ET DD > −10 %, **freeze** stratégie active 1 semaine + retour au Laboratoire.
- **Alerte 2** : si **safety stop journalier −2 %** sur portefeuille déclenche → session coupée, post-mortem obligatoire au prochain jour.

## Routine HEBDOMADAIRE
**Durée** : 1h, 1× par semaine.
- Bilan PnL semaine.
- Lecture **Carte de la Semaine** Cartographe.
- Backtest rapide d'une variation paramétrique (recherche perso).

## Routine MENSUELLE
**Durée** : 2h.
- Audit performance vs benchmark (60 % World + 30 % Nasdaq + 10 % BTC).
- Décision rééquilibrage 30/30/30/10.
- Audit frais courtier + fiscalité.

## Routine TRIMESTRIELLE
**Durée** : 3-4h.
- Audit complet du portefeuille.
- Lecture **Carte du Trimestre**.
- Soumission d'une hypothèse perso au Laboratoire NEXT GEN pour validation.

## Routine ANNUELLE
**Durée** : 2 jours.
- Bilan fiscal complet (IS, PFU, crypto, dérivés).
- Re-questionnaire.
- Audit psychologique : G1 respectés sans exception ?

---

# 🌊 PROFIL 7 — Le Navigateur Curieux

## Routine QUOTIDIENNE — La routine principale
**Durée** : libre (10 min – 2h).
- **Action 1** : ouvrir le **simulateur Laboratoire NEXT GEN**.
- **Action 2** : tester une stratégie (validée OU invalidée à fin pédagogique).
- **Action 3** : noter dans le **Journal de Bord NAVLYS** ce qui a été appris.
- **Indicateur** : score de discernement (quiz NAVLYS-EDU) + nombre de stratégies testées.
- **Alerte** : si tentation de passer en réel → **STOP**, re-questionnaire obligatoire.

## Routine HEBDOMADAIRE
**Durée** : 30 min.
- Lecture **Carte de la Semaine** Cartographe.
- Quiz NAVLYS-EDU.
- Partage d'une observation dans le forum Laboratoire (si activé).

## Routine MENSUELLE
**Durée** : 1h.
- Bilan : combien de stratégies testées ? Quelles leçons ?
- Lecture **Carte du Mois**.

## Routine TRIMESTRIELLE
**Durée** : 2h.
- Score de discernement + badge.
- Décision : continuer en Profil 7 ou tenter passage à un Profil 1-6 (re-questionnaire).

## Routine ANNUELLE
**Durée** : 1 jour.
- Bilan complet apprentissage.
- Rapport NEXT GEN annuel du Cartographe.

---

## Synthèse temps par profil et par cycle

| Profil | /jour | /sem | /mois | /trim | /an |
|---|---|---|---|---|---|
| 🛡️ 1 — Prudent | 0 | 0 | 10 min | 30 min | 1 j |
| 👨‍👩‍👧 2 — Famille | 0 | 10 min | 30 min | 1 h | 1 j |
| 🚀 3 — Entrepreneur | 5 min | 1 h | 1 h 30 | 2-3 h | 1 j |
| 🌱 4 — Étudiant | 0 | 15 min | 10 min | 30 min | 2 h |
| 🧭 5 — Skipper | 0 | 10 min | 20 min | 1 h | 1 j |
| 💼 6 — Pro | 15 min | 1 h | 2 h | 3-4 h | 2 j |
| 🌊 7 — Navigateur | libre | 30 min | 1 h | 2 h | 1 j |

---

## Format d'affichage dans l'app NAVLYS

Pour chaque routine, l'app affiche :

```
┌─────────────────────────────────────────┐
│ 🧭 Ta routine du jour                   │
│                                         │
│ Action : Lire la Carte du Cartographe   │
│ Indicateur : Drift d'allocation         │
│ État : 3.2 % ✅ (< 5 %, RAS)            │
│                                         │
│ Alerte active : aucune                  │
│                                         │
│ [ Marquer comme fait ]                  │
│ [ Reporter à demain ]                   │
└─────────────────────────────────────────┘
```

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
