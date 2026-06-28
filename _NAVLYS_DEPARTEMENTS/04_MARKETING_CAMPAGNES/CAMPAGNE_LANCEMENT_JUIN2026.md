# 🚀 NAVLYS & NAVBIO Life — Campagne LANCEMENT JUIN 2026

> Dépt 04 Marketing & Réseaux · ordre QG du 26 mai 2026 · inspiration : **vibez.co.il** (remise dégressive hebdo).
> **Principe** : remise **À VIE** sur tout enregistrement effectué pendant le mois de lancement. Plus tu signes tôt, plus tu paies peu — pour toujours.

---

## 1. Le calendrier-couteau (heure Asia/Jerusalem)

Tout est calé sur **le fuseau de Jérusalem** (cohérent avec le compte à rebours du gate `navlys.com`).
Pour les visiteurs FR : Jérusalem = Paris **+1 h** en été (CEST). Donc minuit Jérusalem = **23:00 Paris**.

| Vague | Fenêtre (Jérusalem) | Fenêtre (Paris) | Remise À VIE | Code Stripe |
|---|---|---|---|---|
| **🌊 Vague 1 — Premiers à bord** | **lun. 1 juin 00:00 → dim. 7 juin 23:59** | dim. 31 mai 23:00 → dim. 7 juin 22:59 | **−50 %** | `CAP50` |
| **🌊 Vague 2 — Largue les amarres** | **lun. 8 juin 00:00 → dim. 14 juin 23:59** | dim. 7 juin 23:00 → dim. 14 juin 22:59 | **−40 %** | `CAP40` |
| **🌊 Vague 3 — Vent dans le dos** | **lun. 15 juin 00:00 → dim. 21 juin 23:59** | dim. 14 juin 23:00 → dim. 21 juin 22:59 | **−30 %** | `CAP30` |
| **🌊 Vague 4 — Dernière lame** | **lun. 22 juin 00:00 → mar. 30 juin 23:59** | dim. 21 juin 23:00 → mar. 30 juin 22:59 | **−20 %** | `CAP20` |
| 🔒 **Fermeture définitive** | **1 juillet 00:00 Jérusalem** | mar. 30 juin 23:00 Paris | — | — |

**Bascule automatique** : à 00:00 Jérusalem chaque lundi, les codes de la vague précédente sont **désactivés** dans Stripe et les nouveaux activés. Aucune action manuelle après la pose initiale.

---

## 2. La mécanique « À VIE » — clarté absolue

### NAVBIO Life (one-shot)
- La remise s'applique **au prix d'achat unique** du tier (Solo 19 € · Couple 29 € · Premium 39 € · Cinéma 149 € · Pro 199 €).
- **Bonus permanent** : le client conserve la même remise sur **tous ses add-ons futurs** (photos, vidéos, musiques, livre relié, +1 personnage…). Lien fait via `customer.metadata.lifetime_discount = "50|40|30|20"` dans Stripe.
- Exemple Vague 1 : Cinéma 149 € → **74,50 €** au lancement, puis chaque add-on de 5 € → **2,50 €** à vie.

### NAVLYS NEXT GEN INVEST (mensuel/annuel)
- Coupon Stripe **`forever` duration** = la remise reste sur **toute la durée de l'abonnement**, même après ré-augmentation tarifaire future.
- Mensuel 49 €/mo → Vague 1 = **24,50 €/mo à vie**. Annuel 490 €/an → Vague 1 = **245 €/an à vie**.
- Si le client résilie puis se réabonne plus tard : la remise est **perdue** (règle CGU). Il faut rester actif pour la garder.

### Cas couplé
- Un client qui prend NAVLYS NEXT GEN INVEST + NAVBIO Life dans la même fenêtre → la même remise s'applique aux deux. Stripe lie via `customer_id`.

---

## 3. Pourquoi ça marche (psychologie vibez.co.il)

| Levier | Effet attendu |
|---|---|
| **Urgence dégressive hebdo** | Chaque lundi qui passe = la facture grimpe **pour toute ta vie**. Pas un FOMO 24 h, un FOMO 4 semaines. |
| **« À VIE » verrouillé** | Plus puissant qu'une promo classique : le client achète **un avantage permanent**, pas juste un rabais. |
| **Date butoir nette** | 30 juin 23:59 Jérusalem = fin du film. Pas de prolongation, pas de « last chance ». La parole tient la valeur. |
| **Inspiration maritime** | « Premiers à bord », « Largue les amarres », « Vent dans le dos », « Dernière lame » → la cohérence de marque renforce la promesse. |
| **Compatible ambassadeurs** | Un ambassadeur peut combiner sa remise à vie 50/40/30/20 avec son **droit à 50 %/30 % de commission** sur ses filleuls — la commission est calculée sur le **prix payé par le filleul** (donc déjà remisé). C'est sain pour la marge. |

---

## 4. Communication — la grille des 30 jours

> Voir aussi le pack `NAVLYS_MASTER_CALENDAR_PACK/` (J-13 → J+30). Cette campagne **vient en surcouche** du calendrier existant.

### Posts pré-lancement (J-5 à J-1, 27-31 mai)
- **J-5** (FR/EN) — Teaser : *« Mardi soir, le sablier se brise. »* + visuel sablier + countdown.
- **J-3** — Réveil de l'offre : *« −50 % à VIE. Pendant 7 jours. Pas de bluff. »* + capture de la grille.
- **J-1** (31 mai matin) — Rappel : *« Ce soir, 23 h Paris / minuit Jérusalem. Tu signes tôt, tu paies peu pour toujours. »*

### Posts vague par vague (1 par vague + relances)
Chaque vague : **3 posts** sur les 7 jours.
- **Lundi 00:00** — ouverture officielle, code visible (`CAP50` puis `CAP40`…).
- **Mercredi 18:00 Jérusalem** — témoignage / cas d'usage (Bruno = client n°1 NAVBIO Life → vitrine vivante depuis `brunopartouche.com`).
- **Dimanche 20:00 Jérusalem** — *« Plus que 4 heures à −50 %. Lundi minuit, ça monte à −40. »*

### Mailings (depuis `bruno@navlys.com` send-as)
- **31 mai 19:00 Paris** : « Demain à 23 h » (FR) — segmentation : visiteurs gate, inscrits curieux, contacts perso opt-in.
- **Chaque dimanche 18:00 Paris** : « Dernière soirée à −X % à vie. »
- **30 juin 18:00 Paris** : « Ce soir 23 h, le rideau tombe. »

### Réseaux sociaux (Publer)
Voir CSV à pousser dans Dépt 04 (généré section §7).

### Bannière site
Bandeau en haut de `navbiolife.com` et `navlys.com` (dès gate ouvert le 1ᵉʳ juin) :
> **🌊 VAGUE EN COURS : −50 % À VIE — termine dans 6 j 14 h 22 min.** [J'embarque]

Couleur : ice blue `#7DD3FC` sur fond nuit `#02040a`, accent bronze `#C9A961`. Le compteur lit l'heure Jérusalem côté client.

---

## 5. Stripe — pose technique (à transmettre Dépt 05 Monétisation)

### 5.1 Création des 4 coupons (4 produits = 2 × NAVLYS + 2 × NAVBIO)

```bash
# NAVBIO Life — one-shot : "once" sur le paiement initial, et metadata pour les add-ons futurs
stripe coupons create --id=CAP50  --percent_off=50  --duration=once --metadata[lifetime]=true --metadata[wave]=1
stripe coupons create --id=CAP40  --percent_off=40  --duration=once --metadata[lifetime]=true --metadata[wave]=2
stripe coupons create --id=CAP30  --percent_off=30  --duration=once --metadata[lifetime]=true --metadata[wave]=3
stripe coupons create --id=CAP20  --percent_off=20  --duration=once --metadata[lifetime]=true --metadata[wave]=4

# NAVLYS NEXT GEN INVEST — récurrent : "forever" pour verrouiller à vie
stripe coupons create --id=CAP50F --percent_off=50  --duration=forever --metadata[wave]=1
stripe coupons create --id=CAP40F --percent_off=40  --duration=forever --metadata[wave]=2
stripe coupons create --id=CAP30F --percent_off=30  --duration=forever --metadata[wave]=3
stripe coupons create --id=CAP20F --percent_off=20  --duration=forever --metadata[wave]=4
```

### 5.2 Promotion codes (ce que le client tape)

Un seul code par vague, valable pour les **deux familles de produits** via lookup côté serveur :

```bash
stripe promotion_codes create --code=CAP50 --coupon=CAP50  --expires_at=1717804740  # 7 juin 23:59 Jérusalem
stripe promotion_codes create --code=CAP40 --coupon=CAP40  --expires_at=1718409540  # 14 juin 23:59
stripe promotion_codes create --code=CAP30 --coupon=CAP30  --expires_at=1719014340  # 21 juin 23:59
stripe promotion_codes create --code=CAP20 --coupon=CAP20  --expires_at=1719791940  # 30 juin 23:59
```
*(timestamps Unix UTC à recalculer précisément le jour J — la commande ci-dessus est indicative.)*

Côté code paiement : si produit récurrent → swap auto `CAP50` → `CAP50F`. Le client ne voit qu'un seul code.

### 5.3 Webhook `customer.created` / `checkout.session.completed`
Pose `customer.metadata.lifetime_discount = "{50|40|30|20}"` selon le code utilisé. Tous les futurs paiements (add-ons NAVBIO) appliqueront automatiquement le coupon correspondant.

### 5.4 Test
- Mode test Stripe : tirer 1 transaction par vague le **29 mai au plus tard**.
- Vérifier : montant remisé + persistance du metadata + désactivation auto du code à la bascule.

---

## 6. Garde-fous (à graver)

- ❌ **Aucune prolongation** après le 30 juin 23:59 Jérusalem. Si tu prolonges, la promesse « à vie » perd sa valeur pour les acheteurs de la vague 1.
- ❌ **Aucune remise > 50 %** créée hors campagne pour ne pas dévaloriser ceux de la Vague 1. Plus jamais cette remise. Plus jamais.
- ✅ **Trace publique** du compteur : le post J0 et la page d'archive `/lancement` mentionnent les 4 vagues. Pas de version cachée.
- ✅ Mention CGU sur la landing : *« Remise à vie sur ce produit, conditionnée au maintien d'un compte actif. Non rétroactive. Non cessible. »*
- ⚠️ **Posture éditeur** : la campagne porte sur l'abonnement éducatif NAVLYS et le produit récit NAVBIO uniquement. **Aucun produit financier réglementé n'est commercialisé** par NAVLYS (Bruno n'est pas CIF, pas ORIAS, pas IOBSP). Le mot « investissement personnalisé » n'apparaît jamais dans la com de la campagne.
- ⚠️ NAVLYS reste dépersonnalisé. Bruno est visible **uniquement** côté NAVBIO Life comme client n°1 (vitrine vivante `brunopartouche.com`).

---

## 7. Après le 30 juin — les biais de relais

Quand l'offre se ferme, on bascule sur des leviers **non-remise** pour continuer à recruter ambassadeurs & apporteurs d'affaires :

| Levier | Mécanique | Cible |
|---|---|---|
| **Programme Ambassadeur 50 % à vie** | déjà en place : 50 % sur Cinéma/Pro/add-ons + 30 % sur les autres tiers, sous 2 conditions (preuve de diffusion + 1 filleul payant actif). | influenceurs, biographes, conseillers indé. |
| **Affiliation publisher brokers** | lien CPA classique (eToro / Alpaca / Trade Republic…) — comme tout site édito qui pose un lien affilié. Mention « lien affilié » obligatoire. **Pas d'apport d'affaires IOBSP** (Bruno non agréé). | curieux finance, lecteurs réguliers. |
| **Pack Saga (NAVBIO Life × 5)** | lot de 5 biographies à offrir (famille, équipe) → remise pack 30 %, sans contrainte vague. | entreprises, familles élargies. |
| **Code parrainage simple** | parrain gagne 10 € de crédit add-ons, filleul démarre avec −10 €. Cumulable indéfiniment. | tout abonné actif. |
| **Partenariat fonderie SEO** | les noms cités (brokers, banques) restent le carburant naturel. Pas de remise associée. | SEO mondial. |

Aucun n'est aussi puissant que la fenêtre de juin, c'est volontaire — la rareté de la fenêtre construit sa valeur.

---

## 8. KPI à suivre (tableau Dépt 05 + Dépt 04)

| Métrique | Cible Vague 1 | Cible Vague 4 | Total mois |
|---|---|---|---|
| Conversions NAVBIO Life | 40 | 15 | 100 |
| Abonnements NAVLYS récurrent | 10 | 4 | 25 |
| CA brut (avant remise) | ~3 500 € | — | ~10 000 € |
| CA net encaissé | ~1 750 € | ~600 € | ~6 500 € |
| Coût acquisition (média payé) | < 200 € | < 200 € | < 800 € |

**Bascule décision** : si Vague 1 < 50 % de l'objectif, on déclenche le plan B (boost média Vague 2-3 sur les segments les plus chauds — voir `NAVLYS_GROWTH_STACK_PACK/`).

---

## 9. Checklist d'exécution

**À faire d'ici J-5 (27 mai) — Dépt 04 + 05 :**
- [ ] Créer les 8 coupons Stripe (4 once + 4 forever) en **mode TEST**.
- [ ] Câbler le webhook `lifetime_discount` sur `customer.metadata`.
- [ ] Coder la bascule auto-swap once↔forever selon le type de produit (NAVBIO vs NAVLYS).
- [ ] Préparer la bannière compteur Jérusalem (composant React + fallback HTML).
- [ ] Pose page `/lancement` sur `navbiolife.com` + `navlys.com` (gate ouvert le 1ᵉʳ juin).

**J-1 (31 mai) — Dépt 04 :**
- [ ] Bascule Stripe **mode LIVE**.
- [ ] Mailing pré-lancement 19:00 Paris.
- [ ] Test final 1 transaction live à 5 € sur produit test (puis remboursement).

**J0 (1 juin 00:00 Jérusalem) — automatique :**
- [ ] Gate `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` (Dépt 02 / 06).
- [ ] `CAP50` actif. Bannière visible. Post Publer J0 part.

**Chaque dimanche 23:59 Jérusalem — automatique :**
- [ ] Désactivation du code de la vague + activation du suivant.

**Le 30 juin 23:59 Jérusalem — automatique :**
- [ ] Désactivation `CAP20`. Bannière → message de clôture chaleureux.
- [ ] Mailing « merci à bord » + bascule vers les leviers §7.

---

## 10. Compte-rendu attendu @QG

Tous les **dimanches 21:00 Jérusalem** pendant la campagne :
- Conversions Vague en cours (NAVBIO + NAVLYS).
- CA net encaissé semaine.
- Top 3 canaux d'acquisition.
- Alerte si KPI < 50 % de la cible.

À envoyer dans `_NAVLYS_INBOX/` avec le pavillon `@QG`.

---

> *« Un cap, une main, un jour — premiers à bord, premiers servis. »*
> ⚠️ NAVLYS = éditeur de contenu pédagogique (PAS CIF, PAS ORIAS, PAS IOBSP). Aucun conseil personnalisé. Remise à vie sur produits NAVLYS / NAVBIO uniquement. NAVLYS ne commercialise aucun produit financier réglementé.
