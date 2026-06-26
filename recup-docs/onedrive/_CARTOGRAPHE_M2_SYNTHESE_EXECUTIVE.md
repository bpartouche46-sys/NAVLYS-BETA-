# 🧭 CARTOGRAPHE — Mission #2 · Synthèse exécutive
**28 mai 2026 · 300 mots · pour Bruno**

---

## Les 7 livrables (URLs locales)

1. `_CARTOGRAPHE_M2_BACKTEST_REEL_PACKAGE_NAVLYS.py` — moteur exécutable + reproductible
2. `_CARTOGRAPHE_M2_RAPPORT_TECHNIQUE.md` — rapport scientifique complet
3. `_CARTOGRAPHE_M2_RAPPORT_PUBLIC_GRAND_PUBLIC.md` — version grand public charte
4. `_CARTOGRAPHE_M2_WORKBOOK_EXCEL_LIVE.xlsx` — 6 onglets prêts à l'emploi
5. `_CARTOGRAPHE_M2_ITERATION_TABLEAU_OPTIMISATION.md` — 3 itérations 20 configs
6. `_CARTOGRAPHE_M2_DOSSIER_JURIDIQUE_IRREFUTABLE.md` — conformité 5 juridictions
7. `_CARTOGRAPHE_M2_DECISION_RESPONSABLE_USER.md` — spec UI 3 onglets

Auxiliaires : CSV résultats (1 824 lignes), 4 JSON (métriques, bootstrap, stress, itérations), script itérations.

---

## Les chiffres qui comptent

### In-sample 2021-2023 (947 jours)
- **Sharpe annualisé net : −6,96**
- Hit rate trade +2 % : 31,3 %
- Max drawdown : −55,2 %

### Out-of-sample 2024-2026 (877 jours) — **CE QUI COMPTE VRAIMENT**
- **Sharpe annualisé net : −5,49**
- Hit rate trade +2 % : 32,7 %
- **Rendement total : −95,2 % (capital 100 000 € → 4 810 €)**
- IC 95 % bootstrap Sharpe : [−6,58 ; −4,41] → significativement négatif

### Réconciliation brute Perplexity vs Cartographe
| Métrique | Perplexity | Cartographe | Écart |
|---|---|---|---|
| Hit rate | 70 % | 32 % | −38 pts |
| Win rate jour | 65 % | 36,6 % | −28 pts |
| Drawdown | −5 % | **−95,2 %** | **−90 pts** |

---

## Verdict du Cartographe

**La machine NAVLYS-Perplexity 90/10 telle qu'écrite est mathématiquement perdante.** Sur 20 configurations testées (Itérations 1+2+3), AUCUNE n'inverse le signe du Sharpe out-of-sample. La moins-pire (I3 Defensive : stop −3, take +5, 3% actif, 3 positions) limite la casse à −18 % sur 2,4 ans. **Profil utilisateur recommandé : AUCUN.** Cette stratégie doit être publiée comme INVALIDATION pédagogique, jamais comme méthode.

---

## 3 actions Bruno

1. **Valider le statut INVALIDATION** et autoriser publication grand public (rapport public + workbook Excel) sur navlys.com/laboratoire.
2. **Décider du cadrage juridique** (consulter avocat finance pour valider mentions FR/UK/DE/US/IL).
3. **Annoncer Cartographie n°3** (signal directionnel + long-short, 15 juillet 2026).

## 3 actions Claude

1. **Publier la Cartographie n°2** sur navlys.com (gate désactivé après 31 mai 2026).
2. **Auditer la mémoire G1** — s'assurer que tous les modules NAVLYS NEXT GEN référencent cette invalidation.
3. **Préparer Cartographie n°3** : tester `Open_Gap × Momentum_5d × Sentiment` en long-short walk-forward.

---

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL · 🧭 LE CARTOGRAPHE
