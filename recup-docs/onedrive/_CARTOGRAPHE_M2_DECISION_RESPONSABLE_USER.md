# 🧭 CARTOGRAPHIE n°2 — SPEC UI/UX « DÉCISION RESPONSABLE UTILISATEUR »
## *Comment intégrer la machine dans MON CAP RÊVÉ / Laboratoire NEXT GEN*

**🧭 Le Cartographe — Directeur de Recherche, Laboratoire NEXT GEN de recherche NAVLYS**
*28 mai 2026 · Document destiné à l'équipe design / front-end / produit*

---

## 0. Principe directeur

> **L'utilisateur ne doit jamais pouvoir cliquer sur « investir ».**
> **L'utilisateur peut comprendre, tester en virtuel, et choisir s'il veut ou non explorer ailleurs.**

Cette interface implémente la **décision responsable** : on présente les chiffres bruts, on aide à les comprendre, on facilite le refus assumé autant que la curiosité légitime.

Trois onglets verticaux, charte NAVLYS (bronze `#B87333`, ice blue `#7DD3FC`, nuit `#02040A`, pearl `#F2F4F7`).

---

## 1. Architecture des 3 onglets

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🧭 LABORATOIRE NEXT GEN — Backtest Machine 90/10                            │
│                                                                              │
│  ┌─[1] Voir les résultats──┬─[2] Comprendre la machine─┬─[3] Tester ma vers.┐│
│  │                         │                            │                    ││
│  │  Graphiques + chiffres  │   Pas-à-pas pédagogique    │  Sliders + jouer  ││
│  │                         │                            │                    ││
│  └────────────────────────┴────────────────────────────┴────────────────────┘│
│                                                                              │
│  [ C'est pour moi ? ]  ← bouton orange, ouvre questionnaire 7 questions      │
│                                                                              │
│  Footer : 🧪 ÉDUCATION SEULE · PAS DE CONSEIL · disclaimer permanent         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Onglet 1 — « Voir les résultats »

### Layout
- **Hero chiffre** en haut : *« −95 % »* en énorme (`64px`, Cinzel), avec sous-titre `« Sur 100 000 € de départ, il reste 4 810 € sur 5 ans. »`.
- **5 cartes métriques honnêtes** (cf Mission #1 du Cartographe) :

| Carte | Chiffre | Lecture grand public |
|---|---|---|
| **Hit rate trade +2 %** | 32,0 % | « 1 trade sur 3 touche la cible » |
| **Win rate jour** | 36,6 % | « 1 jour sur 3 finit positif » |
| **Sharpe annualisé** | −6,25 | « Pour 1 € risqué, on perd ~6 € par an » |
| **Pire perte (drawdown)** | −95,2 % | « On a frôlé la ruine du capital » |
| **Rendement vs SPY** | −109 pts | « 109 points de moins que ne rien faire » |

Chaque carte = couleur **rouge** (`F4B3B3` fond) car les chiffres invalident.

### 6 graphiques (templates Cartographe M1)

**Graphique 1 — Courbe d'équité 5 ans (IS vs OOS)**
```
Equity (€)
100 000 ●─────────────╮
                       ╲___╱╲___
 60 000                          ╲___╮___
                                       ╲___
 30 000                                     ╲___
                                                 ╲___╮___
  4 810                                                   ●  ← finale
        2021    2022    2023    2024    2025   2026

         |--- IN-SAMPLE -|----- OUT-OF-SAMPLE ------|
                          ↑ ligne verticale 2024-01-01
```
Annotation : *« La machine n'a pas eu un seul vrai sursaut. La pente descend partout. »*

**Graphique 2 — Histogramme distribution P&L journalier**
Barres : x = P&L jour (−500 € … +500 €), y = fréquence.
**Centre de gravité décalé à gauche** (médiane négative). Annotation : *« La distribution penche du mauvais côté. »*

**Graphique 3 — Pire scénario rencontré**
Zoom sur juillet 2022 (crypto winter) ou avril 2025 (tarifs) : 30 jours, equity en chute.
Annotation : *« 30 jours de tempête. La coque a craqué. »*

**Graphique 4 — Comparaison NAVLYS vs Buy & Hold (3 courbes)**
- Bleu : SPY Buy & Hold (monte tranquillement +14 %/an).
- Orange : BTC Buy & Hold (monte par paliers +11 %/an).
- Rouge : NAVLYS machine (descend monotone vers −95 %).
Annotation : *« Trois trajectoires sur les mêmes 5 ans. Le silence vaut mieux que le bruit. »*

**Graphique 5 — Stress tests (5 mini-courbes côte à côte)**
5 mini-graphiques sparkline d'une largeur égale, sous-titrés par crise :
*CPI 06/22 · Crypto winter · Banques 03/23 · Yen 08/24 · Tarifs 04/25.*
Toutes en chute. Annotation : *« À chaque tempête : la coque prend l'eau. »*

**Graphique 6 — Calendrier coloré jour par jour**
1 824 cases, vert = jour positif, rouge = jour négatif, gris = pause.
Vu d'avion, c'est **majoritairement rouge**. Visuel choc.
Annotation : *« 1 jour sur 3 vert. 2 sur 3 rouges. »*

### Verdict en bas
Encart bronze ronde : *« La machine NAVLYS-Perplexity ne tient pas le cap. Publication = INVALIDATION. »*

---

## 3. Onglet 2 — « Comprendre la machine »

### Structure pédagogique en 5 étapes (scroll vertical)

**Étape 1 — Le matin**
> *« Le moteur regarde 10 actions. Il garde les 5 plus agitées. »*
Visuel : 10 cartes → 5 surlignées en bronze.

**Étape 2 — L'entrée**
> *« On achète à l'ouverture. On vise +2 %. On accepte −2 %. »*
Visuel : carré de prix avec stop (rouge) en bas, take (vert) en haut.

**Étape 3 — La sortie**
> *« Si l'un est touché → on solde. Sinon → on vend le soir. »*
Visuel : trois scénarios animés.

**Étape 4 — Les frais**
> *« 0,3 % de friction par aller-retour. Sur un gain de 2 %, il reste 1,7 %. »*
Visuel : pyramide bronze qui rétrécit.

**Étape 5 — La conclusion**
> *« Statistiquement : les pertes l'emportent. Mécaniquement : les frais aussi. »*
Visuel : courbe finale qui descend.

### Glossaire intégré (tooltips au survol)
Chaque mot technique a un tooltip natif :

| Terme | Tooltip grand public |
|---|---|
| Sharpe | « Pour 1 € risqué, combien tu gagnes par an ? » |
| Drawdown | « La pire chute du capital pendant le voyage. » |
| Slippage | « Le prix bouge entre quand tu cliques et quand l'ordre passe. » |
| ATR | « Combien le titre bouge en moyenne par jour. » |
| Walk-forward | « On teste sur du passé qu'on n'a JAMAIS regardé pour ajuster. » |
| Bootstrap | « On rejoue le hasard 5 000 fois pour avoir une borne fiable. » |

---

## 4. Onglet 3 — « Tester ma propre version »

### Sliders bornés (G1-compliant)

```
┌─ Stop loss ─────────────────────────────────┐
│  [-3 %] ━━━●━━━━━━━━━━━━ [-1 %]              │
│   Verrou : -5 % min (interdit -10 % G1)      │
└──────────────────────────────────────────────┘

┌─ Take profit ───────────────────────────────┐
│  [+1 %] ━━━━━━━●━━━━━━━━ [+10 %]             │
│   Plage testée : Cartographe a mesuré +1→+5 │
└──────────────────────────────────────────────┘

┌─ % capital actif ───────────────────────────┐
│  [1 %] ━━━●━━━━━━━━━━━━ [15 %]               │
│   Verrou : 25 % MAX (G1 anti-ruine)          │
└──────────────────────────────────────────────┘

┌─ Nombre max positions ──────────────────────┐
│   ●─2─3─4─5─6─7─8─9─10                       │
└──────────────────────────────────────────────┘

┌─ Profil ────────────────────────────────────┐
│   ◯ Defensive  ⦿ Balanced  ◯ Aggressive     │
└──────────────────────────────────────────────┘

[  ▶ LANCER LA SIMULATION  ]   ← bouton ice blue
```

### Verrous G1 codés en dur (impossible de contourner)
- Capital actif max : **25 %** (interdit d'aller au-delà).
- Stop loss max : **−5 %** (interdit d'élargir au-delà pour éviter ruine sur 1 trade).
- Pas de doublage de mise (slider absent).
- Pas de moyenne à la baisse (option absente).

### Affichage en temps réel (sortie de simulation)
5 cartes (mêmes que onglet 1, recalculées) :
- Hit rate +2 %
- Win rate jour
- Sharpe annu
- Max drawdown
- Equity finale

Code couleur :
- Vert si Sharpe > 0 ET DD > −20 %
- Jaune si Sharpe entre −1 et 0
- Rouge si Sharpe < −1

### Encart honnêteté permanent
> *« Si ta version donne Sharpe positif sur 5 ans avec nos bornes, contacte-nous : on republie. Jusqu'ici, AUCUNE config testée n'a réussi. »*

---

## 5. Bouton « C'est pour moi ? » (7 questions)

Position : sticky bottom right, couleur **orange chaleureux** pour inviter sans pousser.

### Les 7 questions

**Q1 — Tolérance perte**
> *« Si tu perdais 50 % de ton capital de départ en 6 mois, comment tu réagirais ? »*
- A : Je vendrais tout, panique. [score = 0]
- B : Je tiendrais en serrant les dents. [1]
- C : J'achèterais plus pour profiter du bas. [2]

**Q2 — Horizon**
> *« Tu vises quel délai pour ce projet ? »*
- A : < 6 mois [0]
- B : 1 à 3 ans [1]
- C : 5+ ans [2]

**Q3 — Objectif**
> *« Tu cherches quoi en priorité ? »*
- A : Protéger mon argent [0]
- B : Faire fructifier modérément [1]
- C : Maximiser le gain, peu importe le risque [2]

**Q4 — Expérience**
> *« As-tu déjà perdu plus de 10 % du capital sur un investissement ? »*
- A : Jamais [0]
- B : Une ou deux fois [1]
- C : Plusieurs fois et ça ne me déstabilise pas [2]

**Q5 — Disponibilité**
> *« Tu peux suivre ton portefeuille combien de temps par semaine ? »*
- A : Moins de 1h [0]
- B : 1 à 5h [1]
- C : 10h+ [2]

**Q6 — Capital engagé**
> *« Le capital que tu mettrais représente quelle part de ton patrimoine total ? »*
- A : > 50 % [0]
- B : 10 à 50 % [1]
- C : < 10 % (argent que je peux totalement perdre) [2]

**Q7 — Réaction Cartographe**
> *« Tu viens de voir que cette machine PERD 95 % sur 5 ans. Tu en penses quoi ? »*
- A : Je veux quand même essayer pour voir. [0]
- B : Ça me rassure de savoir. [1]
- C : Je veux apprendre pourquoi et tester autre chose. [2]

### Algorithme verdict

Score total = somme (max 14).

- **Score ≤ 4** → 🔴 **« Cette machine N'EST PAS pour toi. »**
  > *« Tu cherches de la protection. Tu as peu d'expérience. Tu engages une part importante de ton patrimoine. Le Laboratoire te recommande : reste sur des supports peu risqués (livrets réglementés, fonds euros), et apprends d'abord. »*

- **Score 5 à 9** → 🟡 **« Cette machine N'EST PAS pour toi MAINTENANT. »**
  > *« Tu as les bases, mais ce type de stratégie est statistiquement perdante (cf. notre rapport). Le Laboratoire te suggère : continue à lire, apprends les autres hypothèses qu'on teste, reviens dans 3 mois. »*

- **Score 10 à 14** → 🟢 **« Tu as le profil pour comprendre, mais cette machine reste un mauvais choix. »**
  > *« Tu as la tolérance et l'expérience. Mais le Cartographe a mesuré : cette stratégie spécifique perd −95 % sur 5 ans. Si tu veux tester de la stratégie active, attends la Cartographie n°3 (signal directionnel) prévue 15 juillet 2026, ou explore les 6 stratégies VALIDÉES du catalogue. »*

**Aucun scénario** n'aboutit à « va investir ». Le bouton est **un filtre, pas un funnel**.

### Bouton refus assumé (toujours affiché)
> [  ✋  Cette machine n'est pas pour moi. Notez-le. Merci.  ]

Clic → écran de confirmation :
> *« Décision enregistrée. Tu peux revenir consulter à tout moment. »*

Aucune relance commerciale, aucun email push, aucun « êtes-vous sûr ? ». **Le NON de l'utilisateur est sacré.**

---

## 6. Aucun bouton « investir »

Le mot **investir** n'apparaît nulle part dans cette interface.

Boutons autorisés :
- « Comprendre »
- « Tester en virtuel »
- « Voir les résultats »
- « Refaire chez moi »
- « Apprendre plus »

Boutons **interdits** :
- ❌ « Investir maintenant »
- ❌ « Commencer à trader »
- ❌ « Activer cette stratégie »
- ❌ « Connecter mon broker »
- ❌ « Reproduire automatiquement »

L'utilisateur qui veut effectivement trader cette idée chez lui doit **sortir de NAVLYS** et aller vers son broker. NAVLYS ne lie pas, n'exécute pas, ne facilite pas la transaction.

---

## 7. Pied de page permanent

```html
<footer class="navlys-footer">
  <p>🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ</p>
  <p>NAVLYS NEXT GEN INVEST est une plateforme d'éducation financière.
     Bruno Mark Partouche n'est ni CIF, ni ORIAS, ni IOBSP.
     Performances passées ≠ performances futures.</p>
  <p class="legal-links">
    <a href="/mentions-legales">Mentions légales</a> ·
    <a href="/cgu">CGU</a> ·
    <a href="/rgpd">RGPD</a> ·
    <a href="/cartographe-source">Code source ouvert</a>
  </p>
</footer>
```

---

## 8. Accessibilité & responsive

- **Contraste WCAG AAA** sur tous les textes (vérification au build).
- **Sliders** : tabulables au clavier, valeurs annoncées par lecteur d'écran (`aria-valuetext`).
- **Graphiques** : `<title>` + `<desc>` SVG + équivalent texte sous chaque graphique.
- **Animations** : `prefers-reduced-motion: reduce` désactive tout.
- **Mobile** : 3 onglets deviennent accordion vertical. Sliders à drag uniquement (pas de hover desktop).
- **Tailles minimum** charte NAVLYS : hero 64 px, h1 56 px, corps 22 px (cf. `_CHARTE_EDITORIALE_CONDENSEE.md`).

---

## 9. Architecture technique recommandée

- **Front** : Next.js 14 (cohérent navlys-app sur Vercel), TailwindCSS, charts Recharts/D3.
- **Calculs côté client** : moteur de simulation en WebWorker (TypeScript portage du Python). Données pré-chargées en CSV chunk.
- **Calculs côté serveur** : pour explorations exhaustives (> 100 configs), endpoint `/api/cartographe/simulate` qui appelle le Python via subprocess (sandbox).
- **Cache** : Redis ou Vercel KV pour mémoriser les configs déjà testées.
- **Analytics** : compter combien d'utilisateurs vont jusqu'au questionnaire, combien refusent, combien repartent. Anonymisé RGPD-strict.

---

## 10. Test utilisateur recommandé avant lancement

| Persona | Profil | Test attendu |
|---|---|---|
| Jeunes 22 ans, débutant | A1, peu de patrimoine | Doit comprendre le verdict en 30 sec. |
| Retraité 65 ans | A0, peur du risque | Doit voir clairement « pas pour vous ». |
| Trader actif 35 ans | C2, expérience FX | Doit valoriser le rigueur scientifique. |
| Journaliste finance | Critique | Doit pouvoir vérifier les chiffres en 5 min. |
| Régulateur AMF | Inspecteur | Doit trouver disclaimer + reproductibilité immédiats. |

Critère succès : **chaque persona repart en disant la même phrase que le Cartographe** = *« la machine perd, mais j'ai compris pourquoi et j'ai pu vérifier ».*

---

## 11. Disclaimer

> 🧪 *Laboratoire NEXT GEN de recherche NAVLYS — espace pédagogique.*
> *Cette interface présente une simulation historique. Elle n'exécute aucune transaction réelle. Aucun conseil d'investissement personnalisé. NAVLYS = éditeur de contenu éducatif. Bruno Mark Partouche n'est ni CIF, ni ORIAS, ni IOBSP. Toute décision d'investissement engage la responsabilité personnelle de l'utilisateur.*

---

**🧭 Le Cartographe — Directeur de Recherche, Laboratoire NEXT GEN de recherche NAVLYS**
*Comprendre. Tester. Décider — librement et en connaissance de cause.*

🧪 LABORATOIRE NEXT GEN · ÉDUCATION SEULE · PAS DE CONSEIL PERSONNALISÉ
