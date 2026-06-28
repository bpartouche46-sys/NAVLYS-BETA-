# Tableau verdict — résultats Monte Carlo NAVLYS
## FR — synthèse chiffrée

> Information pédagogique. Performance passée ≠ future. Simulations Monte Carlo, 10 000 itérations, horizon 250 jours.

---

## 1. Vue d'ensemble en une image

| Stratégie | Gain moyen | Risque de naufrage | Image maritime |
|---|---|---|---|
| **Kelly plein** | **+17,02 %** | **0 %** | Voile bien réglée. Tu captes le vent sans chavirer. |
| Martingale | +9,71 % | 37,1 % | Plus rapide quand ça marche. 1 voyage sur 3 finit au port le matelot épuisé. |
| Mise fixe | +3,63 % | 0 % | Navigation lente et sûre. Sans relief. |
| Signal aléatoire | −1,07 % | élevé | Sans cap, le voilier dérive. |

**Verdict : Kelly gagne.** Plus de gain, zéro casse. C'est le moteur retenu pour NAVLYS.

---

## 2. Détail des trois campagnes

### Campagne v5 — Validation de la Martingale pure

- Mise unitaire : 20 % du compartiment actif
- Taux de réussite du signal : 55 %
- **Jours profitables : 70,5 %**
- Verdict initial : FORMULE VIABLE

Lecture imagée : 7 marées sur 10 sont portantes. Une majorité de bons jours.

### Campagne v6 — Le signal seul fait la différence

- Stratégie : Martingale
- Taux de réussite du signal : 50 % (aléatoire pur)
- **ROI moyen : −1,07 %**
- Verdict : NON VIABLE sans signal

Lecture imagée : sans cap, le voilier dérive. La méthode de mise ne crée pas de richesse. Le cap, oui.

### Campagne v7 — Comparaison des trois moteurs

| Moteur | ROI moyen | Atteinte palier zéro |
|---|---|---|
| Kelly plein | **+17,02 %** | **0 %** |
| Martingale | +9,71 % | 37,1 % |
| Mise fixe | +3,63 % | 0 % |

Lecture imagée :
- Kelly : la voilure parfaitement réglée selon le vent. Tu avances vite, tu ne chavires jamais.
- Martingale : tu doubles après chaque échec. Tu peux gagner beaucoup, mais 1 fois sur 3 tu vides ton voilier.
- Mise fixe : tu sors toujours la même surface de toile. Tu avances doucement, sans danger.

---

## 3. La formule de Kelly expliquée simplement

`f* = (b × p − q) / b`

- `f*` : quelle voile sortir (entre 0 % et 100 % du voilier)
- `p` : ta probabilité de réussite estimée
- `q = 1 − p` : ta probabilité d'échec
- `b` : le rapport gain / perte

Lecture imagée : plus ton cap est sûr (p haut), plus tu peux mettre toutes voiles dehors. Plus la mer est dure (p bas), plus tu réduis la voilure.

Kelly te calcule exactement quelle voile sortir, à chaque sortie, sans émotion.

---

## 4. Pourquoi 90/10 et pas 100/0 ou 50/50 ?

- **100/0** : tout à l'abri. Tu dors bien. Mais ton argent ne grossit pas.
- **50/50** : la moitié en jeu. Si la mer se déchaîne, tu perds la moitié.
- **90/10** : juste assez en jeu pour faire la différence. Le risque global reste limité à 10 %.

Le 90/10 est le ratio qui maximise le rendement par unité de risque pour un investisseur prudent.

---

## 5. Disclaimer

Document pédagogique. Les chiffres sont issus de simulations Monte Carlo. Les marchés réels peuvent se comporter différemment. Performance passée ≠ future. Teste en simulation avant le réel.
