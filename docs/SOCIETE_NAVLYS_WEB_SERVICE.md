# 🏛️ DOSSIER DE CRÉATION — NAVLYS WEB SERVICE (société israélienne)

> Créé le 2026-07-05 sur ordre de Bruno. Objectif : créer la société israélienne
> qui encaisse tout (règle n°22 : NAVLYS WEB SERVICE, gestionnaire de tout) et
> remplace à terme le rail français. Ce dossier est prêt à emmener chez un
> רואה חשבון (comptable) / עו"ד (avocat) — les signatures et le KYC sont les
> SEULS gestes que Bruno doit faire lui-même.
> ⚠️ Informations générales, à confirmer avec le comptable — pas de conseil
> fiscal personnalisé (statut simple citoyen).

## 1. Les deux chemins possibles (à trancher avec le comptable)

| | A — עוסק מורשה (indépendant TVA) | B — חברה בע"מ (société Ltd) |
|---|---|---|
| C'est quoi | Bruno en nom propre, assujetti TVA | Vraie société « NAVLYS WEB SERVICE LTD » |
| Délai | quelques jours | ~1-2 semaines |
| Coût de création | quasi nul | ~830 ₪ (frais רשם החברות) + honoraires |
| Encaisser CB (סליקה) | oui | oui |
| Responsabilité | personnelle | limitée à la société ✅ |
| Le modèle partenaires (licences à vie) | possible mais fragile | **recommandé** ✅ |
| Passage de A vers B plus tard | possible | — |

**Recommandation NAVLYS** : viser **B (Ltd)** — c'est elle qui doit détenir les
domaines, les CORE partenaires et signer les licences d'exploitation à vie.
Si le comptable conseille de démarrer en A pour aller vite : A d'abord, B ensuite.

## 2. La fiche d'identité pré-remplie (chemin B — Ltd)

| Champ | Valeur préparée |
|---|---|
| Nom (anglais) | NAVLYS WEB SERVICE LTD |
| Nom (hébreu) | נבליס ווב סרוויס בע"מ (translittération à valider) |
| Objet social | Développement, exploitation et gestion de services et d'applications numériques ; hébergement et gestion technique pour le compte de tiers ; concession de licences d'exploitation ; services d'abonnement en ligne. |
| Actionnaire unique | Bruno Mark Partouche (100 %) |
| Administrateur (dirigeant) | Bruno Mark Partouche |
| Adresse du siège | adresse de Bruno en Israël (à compléter) |
| Capital | standard minimal (ex. 1 000 actions de 0,01 ₪ — le comptable tranche) |
| Banque | Mizrahi-Tefahot, agence Ashkelon (comptes existants) |
| Activité מע"מ | services numériques / logiciels (le comptable code) |

## 3. Les étapes concrètes (dans l'ordre)

1. **Choisir le comptable (רואה חשבון)** — c'est LUI qui pilote tout ; un cabinet
   habitué au numérique/high-tech à Ashkelon ou en ligne suffit.
2. **Enregistrement au רשם החברות** (registre des sociétés, en ligne sur Gov.il) :
   statuts (תקנון), déclaration des administrateurs, ~830 ₪ — signature de Bruno
   vérifiée par un avocat israélien (עו"ד), souvent inclus au forfait du cabinet.
3. **Ouverture des dossiers fiscaux** (le comptable fait tout) :
   מע"מ (TVA israélienne) · מס הכנסה (impôt) · ביטוח לאומי (sécurité sociale) +
   ניכויים si salaires un jour.
4. **Compte bancaire société** chez Mizrahi Ashkelon (RDV agence, KYC Bruno).
5. **Accord de סליקה (acquisition CB)** : via Mizrahi ou directement PayPlus /
   Grow / Cardcom → les identifiants API vont dans la caisse `paiement`
   (bascule en une ligne, déjà prête côté code).
6. **Migration douce des rails** : Stripe France (EURL) reste le rail actif tant
   que la société n'encaisse pas ; puis bascule progressive vers le rail israélien.
   Domaines et comptes prestataires transférés au nom de la LTD (Grand Nettoyage).

## 4. Ce que Bruno doit apporter au comptable (checklist)

- [ ] Pièce d'identité israélienne (תעודת זהות) + passeport
- [ ] Adresse du siège (bail ou attestation)
- [ ] Ce dossier (fiche §2 = les réponses à toutes ses questions)
- [ ] RIB Mizrahi existant (pour référence)
- [ ] Budget : ~830 ₪ de frais d'État + honoraires cabinet (demander le forfait création+première année)

## 5. En attendant la société (aucun blocage — doctrine anti-blocage)

- **Le rail actuel reste la France** : marchand = EURL bpartouche46 (règlement BM).
  Le Stripe FRANCE est donc le bon Stripe aujourd'hui — rien d'anormal.
- **N° TVA intracommunautaire de l'EURL** (demandé par Stripe) : format
  `FR + 2 chiffres clé + SIREN`. Il se retrouve en 1 minute sur
  **annuaire-entreprises.data.gouv.fr** (chercher « bpartouche46 » ou le SIREN)
  ou dans l'espace pro **impots.gouv.fr** (Messagerie → attestations).
- PayPal Israël existe déjà (compte au nom de Bruno) = rail de secours possible.
- La vente peut donc OUVRIR EN RÉEL dès aujourd'hui avec la clé Stripe live EURL,
  sans attendre la société israélienne.

## 6. Suivi CORE

- Mission **NAVLEX** : préparer statuts (תקנון) bilingues + licence d'exploitation
  partenaire (modèle règle n°22) pour le rendez-vous comptable.
- Ce dossier vit ici (`docs/`) + visible en ligne ; chaque avancée = mise à jour + journal.
