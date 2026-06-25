# NAVLYS — Protocole opérationnel pièce de bronze

> Document interne. À ne pas publier.

## Objectif

Garantir qu'un abonné annuel NAVLYS reçoit **par voie postale** une vraie pièce de bronze NAVLYS, frappée à la main, sous 3 à 5 semaines après son paiement, avec suivi UPS.

## Cycle complet (j+0 → j+45)

| Jour | Étape | Acteur | Système |
|------|-------|--------|---------|
| j+0  | Paiement annuel encaissé | Stripe | webhook `invoice.paid` |
| j+0  | Génération bon de commande pièce | NAVLYS (auto) | `coinOrderFulfillment.ts` |
| j+0  | Email membre « ta pièce est commandée » | NAVLYS (auto) | `coinShipped.ts` stage=scheduled |
| j+1  | Bruno valide la commande dans le back-office | Bruno | dashboard interne |
| j+2  | Envoi du bon de commande à l'atelier de frappe | NAVLYS | email `fulfillment@navlys.com` |
| j+3 à j+18 | Frappe en série numérotée | Atelier | hors NAVLYS |
| j+19 | Réception NAVLYS + contrôle qualité (visuel, poids 12 g ±0,2) | Bruno | hors NAVLYS |
| j+20 | Mise en boîte velours + carte signée | Bruno | hors NAVLYS |
| j+21 | Dépôt UPS (suivi obligatoire, valeur déclarée 50 €) | Bruno | UPS |
| j+22 | Email membre « ta pièce part » + numéro suivi | NAVLYS (auto) | `coinShipped.ts` stage=shipped |
| j+25 à j+45 | Livraison effective | UPS | hors NAVLYS |
| j+45 | Vérification livraison + relance photo unboxing | NAVLYS (auto) | mailing follow-up |

## Fournisseurs candidats (à arbitrer par Bruno)

### Option A — Atelier français
- **Atelier de la Frappe (Paris)** — petite série custom 50-500 pièces, ~9 € HT/pièce en CuSn8, délai 3 semaines.
- Avantage : made in France, narratif fort.
- Inconvénient : délai serré si commande > 30 pièces/semaine.

### Option B — Atelier belge
- **Royal Belgian Mint Custom** — accepte commandes < 1000, ~7,50 € HT/pièce.
- Avantage : excellent rapport qualité/prix.
- Inconvénient : narratif moins fort.

### Option C — Atelier italien (Milan)
- ~8,50 € HT/pièce, série numérotée gravée laser au verso.
- Avantage : finition haut de gamme, gravure laser parfaite.
- Inconvénient : transit logistique vers FR.

**Recommandation NAVLYS** : commencer Option A pour les 100 premières pièces (cohérence brand), basculer Option B au-delà.

## Packaging

- **Boîte** : velours bleu marine 50×50×15 mm, fermeture aimantée. Fournisseur Packhelp ou Tetra Custom Boxes. Coût ~7-8 € HT.
- **Carte signée** : carton 350 g/m², format 80×120 mm, recto NAVLYS gold foil, verso vierge avec numéro de série calligraphié à la main par Bruno.
- **Étui d'expédition** : carton ondulé renforcé, format 130×130×40 mm, étiquette UPS.

## Coût unitaire cible

| Poste | Coût HT |
|-------|---------|
| Frappe pièce (Option A) | 9,00 € |
| Boîte velours | 7,50 € |
| Carte + impression | 1,20 € |
| Étui carton | 0,80 € |
| Port UPS suivi EU | 9,50 € |
| Port UPS suivi US/CA | 18,00 € |
| **Total moyen EU** | **~28 €** |
| **Total moyen US** | **~37 €** |

Sur un abonnement annuel à 490 € (net Stripe ~483 €), le coût pièce reste **< 8 % du revenu annuel**.

## Adresses de stockage

- **Stock pièces frappées** : coffre fort domicile Bruno, inventaire mensuel tenu dans `inventaire_pieces_bronze.csv`.
- **Stock packaging** : carton scellé étiqueté « NAVLYS-BRONZE-PACK ».

## Risques & mitigations

| Risque | Mitigation |
|--------|------------|
| Adresse invalide / incomplète | Champ adresse rendu obligatoire dans Checkout Stripe (`shipping_address_collection`). |
| Pièce perdue par UPS | Valeur déclarée 50 €, indemnisation UPS, re-frappe gratuite. |
| Membre rembourse sous 14 j (CGV) après réception pièce | Pièce non récupérable, intégrer dans coût d'acquisition. |
| Atelier en rupture | Stock minimum 30 pièces vierges en avance. |
| Volume soudain (> 50 commandes/semaine) | Basculer Option B en relai, prévenir membres « livraison étendue à 5 semaines ». |

## Contact atelier (à mettre à jour)

```
fulfillment@navlys.com  → boîte mail dédiée
Bruno (responsable) : bpartouche46@gmail.com
```

---

*« La pièce de bronze NAVLYS est ta première ancre. Petite, lourde, indéplaçable. »*
