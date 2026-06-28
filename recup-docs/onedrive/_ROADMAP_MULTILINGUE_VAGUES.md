# 🌊 ROADMAP MULTILINGUE NAVLYS — Déploiement par vagues

> **Version 1.0 — 28 mai 2026** · Vague 1 = FR/EN dès le 1er juin. Cible : 12 langues sur 18 mois.
> Doctrine : *mieux vaut tarder qu'humilier la marque*. Chaque langue passe la checklist 9 étapes 0-erreur AVANT prod.
> Ce document s'aligne sur `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` (terminologie) et `_I18N_INFRA_NEXTJS_SPEC.md` (technique).

---

## 🗺️ VUE D'ENSEMBLE — 5 VAGUES, 12 LANGUES, 18 MOIS

| Vague | Date cible | Langues | Marchés conquis | Effort | Coût one-shot estimé | Coût récurrent/an |
|---|---|---|---|---|---|---|
| **V0** | **1er juin 2026** | 🇫🇷 FR (source) | France · Belgique FR · Suisse FR · Québec · Maghreb francophone | Bruno autonome (déjà écrit) | 0 € | 0 € |
| **V1** | **1er juin 2026** | 🇬🇧 EN | UK · US · Canada · Australie · Inde anglo · Singapour · Émirats expats | Claude pass 1 + relecture native EN | 800 € (relecture) | 500 € (maint) |
| **V2** | **15 juin 2026** | 🇷🇺 RU | Russie · Israël russophone · ex-URSS · diaspora UE | Lera/Rivka/Serjio + Claude | 600 € (mémoire native gratuite) | 300 € |
| **V3** | **15 juillet 2026** | 🇪🇸 ES + 🇮🇹 IT | Espagne · LATAM · Italie · Suisse IT | Traducteur ProZ finance certifié | 1 800 € (2 langues) | 1 000 € |
| **V4** | **1er septembre 2026** | 🇩🇪 DE + 🇳🇱 NL + 🇧🇷 PT-BR | DACH (DE/AT/CH) · Pays-Bas · Brésil | BDÜ allemand + freelance DK/BR | 2 700 € | 1 500 € |
| **V5** | **1er décembre 2026** | 🇸🇦 AR + 🇮🇱 HE | Émirats · Arabie · Israël · diaspora MENA | Traducteur MSA + ITA Israel + adapt RTL | 3 200 € (RTL coûte plus) | 1 800 € |
| **V6** | **1er mars 2027** | 🇨🇳 ZH + 🇯🇵 JA | Chine continentale · Hong Kong · Taïwan · Japon | ATA ou Tomedes (rare et cher) | 4 500 € | 2 500 € |
| **TOTAL** | 18 mois | **12 langues** | ~3,2 milliards de locuteurs natifs | — | **~13 600 €** | **~7 600 €/an** |

---

## 📋 CHECKLIST 9 ÉTAPES 0-ERREUR (par langue, sans exception)

Chaque langue doit cocher ces 9 étapes **dans l'ordre** avant la mise en prod :

1. **Pass 1 IA** — Claude génère traduction initiale depuis `_GLOSSAIRE_MULTILINGUE_NAVLYS.md` (terminologie verrouillée).
2. **Relecture native** — traducteur natif finance corrige nuance, registre, faux amis, conjugaisons.
3. **Validation finance** — vérification des termes spécialisés (rendement, allocation, drawdown) par natif expert finance.
4. **Conformité régulateur local** — checklist juridique du marché (AMF/FCA/SEC/BaFin/CONSOB/CNMV/AFM/CVM/SCA/ISA/CSRC/FSA) :
   - Mentions G1 sont-elles dans le format exact attendu ?
   - Mentions cookies/RGPD/équivalent local ?
   - Mention « pas de conseil personnalisé » est-elle visible AVANT toute discussion produit ?
5. **Test 3 utilisateurs natifs** — lecture à voix haute, captation de leurs réactions ("ça sonne juste ? c'est crédible ?").
6. **Relecture finale Bruno** — relecture esprit/ton/cohérence avec la marque NAVLYS.
7. **QA technique** — caractères spéciaux affichés (ñ, ü, ß, ё, ا, ש, 中), encodage UTF-8 partout, pas de mojibake.
8. **Sandbox 48h** — déploiement preview Vercel sur sous-domaine `xx.navlys.com` (ex : `de.navlys.com`), test à froid.
9. **Prod** — bascule officielle, monitoring renforcé 72h (erreurs 404, taux de rebond, durée session).

⚠️ **Si une étape échoue → on retire la langue de prod et on retravaille.** Pas de demi-mesure.

---

## 🇫🇷 VAGUE 0 — FRANÇAIS (SOURCE)
- **Marché** : France métropolitaine 67M · Belgique francophone 4,5M · Suisse FR 2M · Québec 8M · Maghreb francophone (instruits FR) ~30M. **Total ~110M locuteurs natifs**, dont ~30M acheteurs potentiels.
- **Régulateur** : AMF (Autorité des Marchés Financiers). Mentions G1 conformes au RG AMF Livre III.
- **Owner** : Bruno (texte source écrit nativement, pas de coût traduction)
- **Statut** : ✅ Prêt 1er juin

---

## 🇬🇧 VAGUE 1 — ANGLAIS

### Marché cible
- **Total** : ~1,5 milliard de locuteurs (natifs + L2 fluent). **Marché premium** : US 330M · UK 67M · Canada 38M · Australie 25M · Singapour 5M · Émirats expats 9M · Inde anglo 130M.
- **Acheteurs NAVLYS potentiels** : ~80M (CSP+ anglo lecteurs finance).

### Régulateur(s)
- **US (SEC)** : règle 10b-5 Anti-fraud · Reg FD · Investment Advisers Act 1940 (rester non-adviser). **FTC** pour disclosure affiliate.
- **UK (FCA)** : Financial Promotion Order — toute communication marketing finance doit être *clear, fair, not misleading*. Non-régulé ok si éducation pure.
- Guidelines : https://www.sec.gov/divisions/investment/iaregulation/memoia.htm · https://www.fca.org.uk/publication/finalised-guidance/fg19-05.pdf

### Ressource recrutement
- **Profil idéal** : traducteur natif EN-US ou EN-UK, **5+ ans finance**, idéalement ex-trader/analyste reconverti. Connaissance jargon retail + institutionnel.
- **Plateforme** : ProZ.com (filtre : Finance ≥ 5 yrs, native EN, FR source). Alternative : TextMaster, Smartcat.
- **Fourchette tarifaire** : 0,12-0,18 €/mot pour finance native + relecture finance = ~0,20 €/mot tout compris.
- **Volume V1** : ~4 000 mots site + 800 mots emails + 600 mots G1/légal = ~5 400 mots → **~1 080 € one-shot**.
- **Budget conservateur** : 800 € (Claude livre pass 1, relecture native uniquement).

### Owner
- Pass 1 : Claude autonome (28-29 mai)
- Relecture native : freelance ProZ (30 mai-1er juin)
- Validation G1 : Bruno + Claude (1er juin matin)

### Statut : 🟡 En cours — livraison 1er juin

---

## 🇷🇺 VAGUE 2 — RUSSE

### Marché cible
- **Total** : 258M locuteurs (RU 145M · ex-URSS Kazakhstan/Bélarus/Ukraine ~50M · diaspora UE/Israël 8M · Israël 1,3M russophones).
- **Acheteurs NAVLYS potentiels** : ~15-25M (CSP+ russophone curieux finance internationale, segment Israël et expatriés UE particulièrement intéressant).

### Régulateur
- **Russie (CBR — Банк России)** : loi N°39-ФЗ sur le marché des valeurs mobilières. Communication finance encadrée.
- **Israël (ISA — רשות ניירות ערך)** : pour les russophones d'Israël, double conformité.
- Précaution : ne pas cibler activement la Russie via paid ads en 2026 (sanctions UE/US sur paiements). Privilégier audience russophone hors-RF.

### Ressource
- **Cercle Bruno** : Lera, Rivka, Serjio peuvent relire (gratuit, contre-don symbolique : abonnement NAVLYS offert à vie).
- **Pass 1** : Claude (déjà excellent sur RU pour finance).
- **Backup pro** : ProZ russe finance ~0,10 €/mot si besoin de tiers indépendant.

### Owner
- Pass 1 : Claude (4-5 juin)
- Relecture : Lera + Rivka + Serjio (5-10 juin)
- Validation conformité : juriste russe optionnel (200-400 € si Bruno veut blindage)

### Statut : 🟡 Planifié — livraison 15 juin

---

## 🇪🇸🇮🇹 VAGUE 3 — ESPAGNOL + ITALIEN (15 juillet)

### Marché ES
- **Total ES** : ~500M (Espagne 47M · LATAM 460M : Mexique 130M, Colombie 50M, Argentine 45M, Pérou 33M, Chili 19M).
- **Acheteurs prioritaires** : Espagne (€), Chili (CLP stable), Mexique (MXN classes moyennes). Prudence avec Argentine (inflation extrême — pricing tricky).
- **Régulateur** : CNMV (Espagne). Pour LATAM : CONSAR/CNBV (MX), SMV (PE), SVS (CL). Au démarrage : focus Espagne.

### Marché IT
- **Total IT** : 65M locuteurs (Italie 60M + Suisse IT 350K + Saint-Marin/Malte).
- **Régulateur** : CONSOB. Mentions G1 spécifiques (cf. glossaire §4).

### Ressource
- **ES** : ProZ — natif Espagne, finance 5+ ans, certifié CNMV-friendly. ~0,14 €/mot.
- **IT** : ProZ — natif IT, ex-banking ou Wealth Management. ~0,15 €/mot.
- **Volume V3** : ~6 000 mots × 2 langues × 0,15 €/mot = **~1 800 €**.

### Owner
- Pass 1 : Claude (juillet semaine 1)
- Relecture : freelance ProZ ES + freelance ProZ IT
- Validation : juriste local ES (~300 €) + IT (~300 €) — recommandé pour V3 car forte exposition régulateur.

### Statut : 🟢 Planifié

---

## 🇩🇪🇳🇱🇧🇷 VAGUE 4 — ALLEMAND + NÉERLANDAIS + PORTUGAIS-BR (1er septembre)

### Marché DE
- **Total DE** : 100M (DE 83M · AT 9M · CH alémanique 5M · Luxembourg/Liechtenstein).
- **Régulateur** : **BaFin** — un des plus stricts d'Europe. Mentions G1 obligatoires + Impressum (§5 TMG) + DSGVO renforcé. **Ne JAMAIS lancer DE sans juriste local.**
- Coût juriste BaFin-compliant : 800-1 200 € en one-shot pour audit complet.

### Marché NL
- **Total NL** : ~25M (Pays-Bas 17M + Belgique flamande 6,5M + Suriname/Antilles).
- **Régulateur** : AFM (Pays-Bas). Plus souple que BaFin mais sérieux.

### Marché PT-BR
- **Total** : 215M Brésiliens (énorme, jeune, friand crypto/finance). Portugal 10M parle aussi mais variante PT-PT différente.
- **Régulateur** : CVM (Brésil). Communication finance encadrée mais marché très digital-friendly.
- **Stratégie** : viser uniquement PT-BR au démarrage (95% du marché potentiel lusophone). PT-PT en V7 optionnel.

### Ressource
- **DE** : BDÜ annuaire (Bundesverband der Dolmetscher) — natif DE finance ~0,18 €/mot + juriste BaFin 1 000 €.
- **NL** : ProZ + filtre Pays-Bas finance ~0,16 €/mot.
- **PT-BR** : ProZ + Brésil finance ~0,12 €/mot (marché plus compétitif).
- **Volume V4** : ~6 000 mots × 3 langues = 18 000 mots × moyenne 0,15 €/mot + juriste BaFin = **~2 700-3 000 €**.

### Statut : 🟢 Planifié

---

## 🇸🇦🇮🇱 VAGUE 5 — ARABE + HÉBREU (1er décembre — vague RTL)

### Marché AR
- **Total** : 420M arabophones. **Cible solvable** : Émirats 10M (expats CSP+ très solvables), Arabie 35M (CSP+ croissante), Qatar/Bahreïn/Koweït ~10M, Égypte CSP+ ~15M.
- **Régulateur** : SCA (Émirats) · CMA (Arabie). Communication finance encadrée par règles charia-compatibles pour produits financiers — NAVLYS étant éducatif, plus souple, mais éviter terminologie ribā/riba (intérêt usuraire).
- ⚠️ **Adaptation culturelle indispensable** : ton plus formel, vocabulaire respectueux, éviter les images animales (chien/porc) ou alcool dans visuels.

### Marché HE
- **Total** : 9M (Israël). Marché concentré, digital très avancé, finance sophistiquée.
- **Régulateur** : ISA (Rashut Niyarot Erech).

### Spécificité RTL
- **Surcoût technique** : ~30% sur le développement (CSS logical properties, miroir d'icônes, tests dédiés).
- Voir `_I18N_INFRA_NEXTJS_SPEC.md` §RTL pour la spec complète.

### Ressource
- **AR** : Aljazeera Translation Network ou Asfar — **MSA (arabe standard moderne)** uniquement, pas dialectal. ~0,18 €/mot. Juriste Émirats ~600 €.
- **HE** : Israel Translators Association (ITA) — natif HE finance ~0,16 €/mot. Juriste ISA ~500 €.
- **Volume V5** : 6 000 mots × 2 langues × 0,17 €/mot + juristes = **~3 200 €**.

### Statut : 🔵 À planifier (Q4 2026)

---

## 🇨🇳🇯🇵 VAGUE 6 — CHINOIS + JAPONAIS (1er mars 2027)

### Marché ZH
- **Total** : 1,1 milliard. **Cible solvable** : Hong Kong 7,5M (finance ouverte), Taïwan 23M (très solvables), Singapour 4M chinois, diaspora 60M (Canada/US/Australie).
- **Chine continentale** : marché fermé techniquement (Great Firewall) + régulation finance très stricte (CSRC). **Recommandation** : ne PAS cibler la Chine continentale en V6. Cibler HK + Taïwan + diaspora.
- **Régulateur** : SFC (Hong Kong) — plus souple. FSC (Taïwan).
- **Caractères** : Chinois simplifié (zh-CN) pour Chine continentale, **Chinois traditionnel (zh-HK / zh-TW)** pour HK/Taïwan. ⚠️ Recommandation : démarrer en **zh-TW** (traditionnel) → couvre HK + Taïwan + diaspora éduquée. Simplifié plus tard si chine continentale possible.

### Marché JA
- **Total** : 125M. Marché ultra-mature finance, exigeant, formel.
- **Régulateur** : **FSA Japan** (Kinyū-chō). Communication encadrée — mentions obligatoires en japonais (les versions EN ne suffisent pas légalement).

### Ressource
- **ZH-TW** : ATA ou Tomedes ~0,20 €/mot (rare et exigeant). Juriste HK 800 €.
- **JA** : Tomedes ou agence Tokyo ~0,22 €/mot. Juriste FSA 1 000 €.
- **Volume V6** : 6 000 mots × 2 langues × 0,21 €/mot + juristes = **~4 500 €**.

### Statut : 🔵 À planifier (Q1 2027)

---

## 📊 RÉSUMÉ COÛT GLOBAL

### One-shot (sur 18 mois)
| Vague | Langues | Coût one-shot |
|---|---|---|
| V0 | FR | 0 € |
| V1 | EN | 800 € |
| V2 | RU | 600 € |
| V3 | ES + IT | 1 800 € |
| V4 | DE + NL + PT-BR | 3 000 € |
| V5 | AR + HE | 3 200 € |
| V6 | ZH-TW + JA | 4 500 € |
| **TOTAL** | **12 langues** | **~13 900 €** |

### Récurrent annuel (à partir de la prod)
- Maintenance contenu (ajouts, corrections, nouveaux articles) : ~600-800 €/langue/an pour langues actives
- Total annuel à plein régime : **~7 500 €/an**
- Logiciel TMS (Crowdin Pro si on dépasse 60 000 mots) : ~480 €/an

---

## 💰 PLAN FINANCIER MULTILINGUE — AMORTISSEMENT PAR REVENU MARCHÉ

### Hypothèses pricing NAVLYS NEXT GEN INVEST
- Mensuel : 49 €/mois = **588 €/an par abonné**
- Annuel : 490 €/an par abonné (réduction 16%)
- Mix 60% mensuel / 40% annuel = ~530 €/an moyen par abonné

### Combien d'abonnés pour amortir chaque langue ?

| Langue | Coût one-shot | Récurrent/an | Total an 1 | Abonnés nécessaires pour amortir an 1 |
|---|---|---|---|---|
| EN | 800 € | 500 € | 1 300 € | **~3 abonnés** |
| RU | 600 € | 300 € | 900 € | **~2 abonnés** |
| ES | 900 € | 500 € | 1 400 € | **~3 abonnés** |
| IT | 900 € | 500 € | 1 400 € | **~3 abonnés** |
| DE | 1 800 € | 800 € | 2 600 € | **~5 abonnés** |
| NL | 700 € | 400 € | 1 100 € | **~3 abonnés** |
| PT-BR | 500 € | 400 € | 900 € | **~2 abonnés** |
| AR | 1 800 € | 1 000 € | 2 800 € | **~6 abonnés** |
| HE | 1 400 € | 800 € | 2 200 € | **~5 abonnés** |
| ZH-TW | 2 200 € | 1 200 € | 3 400 € | **~7 abonnés** |
| JA | 2 300 € | 1 300 € | 3 600 € | **~7 abonnés** |

**Lecture** : Chaque langue s'amortit avec **2 à 7 abonnés annuels**. Sur 12 langues, **~46 abonnés répartis** suffisent à couvrir l'investissement total (~14 000 € one-shot + ~7 500 €/an).

### Arbitrage — faut-il vraiment 12 langues ?

**Option A (recommandée Phase 1)** : 5 langues stratégiques sur 12 mois
- FR, EN, RU, ES, DE
- Coût : ~5 000 € one-shot + 3 000 €/an = **8 000 € an 1**
- Couverture : ~70% du potentiel client NAVLYS Europe + Méditerranée + diaspora russe
- Amortissement : **~15 abonnés annuels** → atteignable facilement

**Option B (croissance Phase 2)** : ajouter IT + NL + PT-BR + AR + HE
- Coût additionnel : ~5 500 €
- Couverture : +20% (LATAM + DACH étendu + MENA)

**Option C (premium Phase 3)** : ajouter ZH-TW + JA
- Coût additionnel : ~4 500 €
- Couverture : +10% (Asie premium)
- **Recommandation** : NE PAS faire ZH-TW + JA avant d'avoir 200+ abonnés payants — ROI incertain sans présence physique Asie.

### Décision recommandée à Bruno
**Phase 1 (juin-décembre 2026)** : FR + EN + RU + ES + DE. Coût ~8 000 €. Couvre 1,3 milliard de locuteurs et tous les marchés premium NAVLYS.
**Phase 2 (2027)** : étendre selon traction. Si NAVLYS franchit 100 abonnés payants, débloquer V4.
**Phase 3 (2028)** : Asie uniquement si présence physique ou partenaire local.

---

## 🎯 OWNER MATRIX

| Phase | Bruno autonome | Contractuel externe | Claude support tech |
|---|---|---|---|
| Pass 1 IA | — | — | ✅ (génère draft depuis glossaire) |
| Relecture native | — | ✅ (ProZ/BDÜ/ATA) | — |
| Validation finance | — | ✅ (natif expert finance) | — |
| Conformité régulateur | — | ✅ (juriste local) | ⚠️ (référence checklist) |
| Test utilisateurs | ✅ (cercle Bruno) | — | — |
| Relecture finale esprit | ✅ | — | — |
| QA technique | — | — | ✅ |
| Sandbox 48h | — | — | ✅ |
| Prod | ✅ (validation finale) | — | ✅ (déploiement Vercel) |

---

**Fin du roadmap v1.0 — Bruno Partouche & Claude QG · _NAVLYS_DISPATCH compatible**
