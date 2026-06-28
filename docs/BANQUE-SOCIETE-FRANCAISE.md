# 🏦 Banque en ligne pour la SOCIÉTÉ FRANÇAISE (dirigeant résident Israël)

> Besoin de Bruno (2026-06-24) : une **banque en ligne** qui accepte sa **société française**,
> alors qu'il **réside en Israël** (dirigeant non-résident UE) et n'a **aucun compte en France**.
> Contexte : société **israélienne** centralise tout (fiscalité via convention France-Israël) ;
> l'**entité française** existe mais sans banque.
> ⚠️ Recherche web à jour (juin 2026). L'éligibilité finale se tranche au **KYC** du prestataire.

## 🔑 Le critère qui décide : la RÉSIDENCE du dirigeant (pas la nationalité)
La plupart des néobanques FR exigent que le **représentant légal / bénéficiaire effectif réside
dans l'UE/EEE**. Bruno réside en **Israël** → ça élimine Finom, Qonto (seul), etc.
**Sauf** les acteurs qui acceptent explicitement une **résidence hors UE**.

## ✅ Recommandation : REVOLUT BUSINESS
- **Israël est un pays de résidence accepté** pour la personne qui ouvre le compte Business,
  et la **société peut être enregistrée en France/EEE**. → correspond exactement à ton cas.
- **IBAN français (FR)** désormais standard sur les comptes Business France (déployé 2026)
  → pas de déclaration de compte étranger, compatible URSSAF/impôts FR.
- 100 % **en ligne**, plans dès ~10 €/mois.
- ⚠️ Revolut demande des **preuves d'activité réelle** (site web, contrats/factures, LinkedIn) —
  un dirigeant non-résident est traité « profil à vérifier ». Prépare : KBIS < 3 mois, statuts,
  SIREN/SIRET, pièce d'identité, site navlys.com + un ou deux justificatifs d'activité.

## ❌ Pourquoi les autres ne collent PAS à ton cas
- **Finom** : exige un **titre de séjour UE/EEE** du représentant + bénéficiaires → recalé (tu es en IL). (IBAN FR sinon.)
- **Qonto** : exige **≥ 1 dirigeant/bénéficiaire résident en France ou UE éligible**. Seul, depuis Israël → **bloqué**.
  👉 Possible **seulement** si tu ajoutes un **co-gérant/bénéficiaire résident UE**.
  ⚠️ Tu as un **essai Qonto en cours** (registre financier A2) → vérifie s'il concerne la société FR
  et si le KYC est passé ; sinon il risque de bloquer pour cette raison.
- **Memo Bank** : plutôt PME établies (critères de fond) ; **Shine** : restrictif sur non-résidents.

## 🟡 Plan B (si Revolut refuse)
- **Wise Business** (multi-devises, souvent ouvert aux non-résidents) — à vérifier pour société FR.
- **Qonto avec un co-gérant/bénéficiaire résident UE** (si tu as un associé en France).
- Banque FR « classique » à distance pour non-résident (plus lourd : justificatifs, parfois dépôt).

## ✅ Prochaines étapes (toi — aucun agent n'ouvre de compte ; règle §3)
1. **Revolut Business** : tenter l'ouverture en ligne pour la **société française** (résidence : Israël).
2. Réunir : **KBIS < 3 mois, statuts, SIREN/SIRET, pièce d'identité**, site web + preuve d'activité.
3. Viser un **IBAN FR** (le confirmer pendant l'onboarding).
4. **Vérifier l'essai Qonto** existant (société concernée ? KYC ? résidence bloquante ?).
5. Une fois le compte FR ouvert → le **relier comme banque de versement** du Stripe FR
   (voir `docs/PAIEMENTS-READINESS.md` : règle entité ↔ banque).

## Sources (juin 2026)
- Revolut — pays de résidence éligibles (Israël supporté) : help.revolut.com/business … /what-country-of-residence-is-eligible
- Revolut — IBAN français pour les entreprises (2026) : planet-fintech.com / revolut.com/fr-FR/blog … obtenir-iban-francais-revolut
- Qonto — qui peut ouvrir (résident FR/UE requis) : support-fr.qonto.com … Can-any-organization-open-a-Qonto-account
- Finom — IBAN FR mais titre de séjour UE/EEE requis : finom.co/fr-fr/business-account + entrepreneur-expat.fr/blog/compte-pro-non-resident
