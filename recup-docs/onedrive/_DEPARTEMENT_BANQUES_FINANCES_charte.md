# ⚓💎 Département BANQUES & FINANCES NAVLYS — Charte
_Création officielle · 28 mai 2026 (J-3 du lancement BETA)_

> Septième département de l'organigramme NAVLYS — pendant éditorial des 6 départements existants (Direction, Site & Produit, Marque & Studio, Marketing & Réseaux, Monétisation, Infra & Veille, R&D App).
>
> Lien de mémoire : ce département est intégré au routeur `_NAVLYS_DEPARTEMENTS/` et indexé dans `_NAVLYS_MASTER_INDEX.md` et `_NAVLYS_DISPATCH.md`.

---

## 1. Identité

- **Nom officiel** : **Département Banques & Finances NAVLYS**
- **Code court** : `08_BANQUES_FINANCES`
- **Persona / responsable** : **Le Trésorier** (registre maritime, "celui qui tient le coffre du navire", chargé de la cale aux pièces d'or)
- **Devise** : « Chaque pièce qui entre, chaque pièce qui sort. Le coffre se tient seul. »
- **Couleurs** : bronze `#B87333` + or `#C9A961` (cohérent charte NAVLYS)

---

## 2. Mission

Cartographier, sécuriser et optimiser **tous les flux financiers** du groupe NAVLYS et de son fondateur Bruno Mark Partouche, à savoir :
1. **Comptes opérationnels** (banques EU + IL, wallets multi-devises)
2. **Comptes commerçants** (Stripe + alternatives)
3. **Comptes affiliés** (publisher CPA brokers, banques, crypto, outils)
4. **Comptes brokers** (test API + live trading)
5. **Conformité publisher** (rappel statut PAS IOBSP/CIF/ORIAS)

---

## 3. Composition

| Rôle | Persona | Missions |
|------|---------|----------|
| **Chef du département** | Le Trésorier | Décisions opérationnelles, audit mensuel des comptes, escalation auprès de Bruno |
| **Cartographe associé** | Le Cartographe (déjà existant) | Recherches techniques, comparatifs brokers, veille réglementaire CPA |
| **Décideur final** | **Bruno Mark Partouche** | Validation tous mouvements money, ouverture compte, signature contrats partenaires |
| **Coordination cross-département** | Le QG (`_NAVLYS_QG_COORDINATION.md`) | Synchronisation avec 02_SITE_PRODUIT, 05_MONETISATION, 07_RND_APP |

---

## 4. Périmètre — ce que le département FAIT et NE FAIT PAS

### ✅ Le département FAIT
- Recensement et tableau exhaustif des comptes Bruno + NAVLYS
- Audit des canaux d'encaissement et délais réels
- Recherche et négociation des programmes d'affiliation (mode publisher CPA)
- Tests API brokers en mode Paper/Sandbox
- Production de scripts Python pour connexion API
- Veille SSL et statut des comptes commerçants (Stripe, Wise, etc.)
- Alertes immédiates si latence anormale, KYC bloqué, ou commission absente
- Reporting mensuel des revenus affiliations par source
- Préparation des KYC et listes de pièces pour chaque ouverture de compte

### ❌ Le département NE FAIT PAS
- Aucune ouverture de compte automatisée — **Bruno ouvre LUI-MÊME les comptes** (règle Anthropic standard)
- Aucun mouvement d'argent réel sans validation Bruno explicite
- Aucun trading live tant que Bruno n'a pas validé le scénario explicitement
- Aucun scraping de site bancaire avec ses identifiants — Bruno se connecte LUI-MÊME, fournit les outputs API au format JSON
- Aucun stockage de clés API en clair (toujours via `.env` local + Vercel Environment Variables)
- Aucun conseil personnalisé en investissement (statut PAS CIF de Bruno)
- Aucun apport d'affaires IOBSP (statut PAS IOBSP de Bruno) — affiliations publisher CPA UNIQUEMENT
- Aucune action sur produits réglementés (assurance vie, crédit) sans agrément approprié

---

## 5. Cadence

| Cadence | Tâche | Livrable |
|---------|-------|----------|
| **Quotidienne** | Vérif état Stripe + ping API brokers | Log dans `_API_TESTS_LOGS/` |
| **Hebdomadaire** (vendredi 17h) | Revue des affiliations actives + commissions reçues | Rapport `_AFFILIATIONS_HEBDO_SXX.md` |
| **Mensuelle** (1er du mois) | Audit complet des comptes + reporting revenus | Rapport `_BANQUES_AUDIT_MENSUEL_MMM-YYYY.md` |
| **Immédiate** | Alerte latence anormale, KYC bloqué, charge-back, payout gelé | Slack/email Bruno + entrée `_INCIDENTS.md` |
| **Trimestrielle** | Revue stratégique : ouvrir/fermer programmes selon ROI | Rapport `_STRATEGIE_AFFILIATIONS_QX.md` |

---

## 6. Livrables canoniques (4 docs déjà produits J-3)

1. **`_BANQUES_ETAT_DES_COMPTES_BRUNO.md`** — état des lieux exhaustif (24 comptes recensés)
2. **`_BANQUES_FLUX_ENCAISSEMENT.md`** — par qui Bruno encaisse, délais, frais, limites
3. **`_BANQUES_LIENS_PARTENAIRES_CPA.md`** — top 10 partenaires affiliés + plateformes mutualisatrices
4. **`_BROKERS_ALTERNATIVES_ALPACA_API.md`** — comparatif 11 brokers + scripts Python prêts
5. **`_DEPARTEMENT_BANQUES_FINANCES_charte.md`** — ce document

---

## 7. Pyramide à 7 étages — structure interne

```
ÉTAGE 7 — STRATÉGIE GLOBALE FINANCES NAVLYS (groupe + perso Bruno)
   ↓
ÉTAGE 6 — CONFORMITÉ & RAPPEL STATUTS (Publisher CPA, PAS IOBSP/CIF/ORIAS)
   ↓
ÉTAGE 5 — REPORTING & DASHBOARD (chiffres mensuels, KPI affiliations)
   ↓
ÉTAGE 4 — FLUX D'ENCAISSEMENT (Stripe, Wise, Mizrahi, SWIFT vs SEPA)
   ↓
ÉTAGE 3 — COMPTES BROKERS (API tests, paper, live, latence funding)
   ↓
ÉTAGE 2 — AFFILIATIONS PUBLISHER (10 prioritaires + 15 long tail)
   ↓
ÉTAGE 1 — COMPTES OPÉRATIONNELS (banques + wallets + KYC)
```

---

## 8. Interfaces avec les autres départements

| Département cible | Interaction | Direction |
|-------------------|-------------|-----------|
| **01_DIRECTION** | Reporting mensuel cash + ROI | Banques → Direction |
| **02_SITE_PRODUIT** | URLs affiliés à intégrer dans pages | Banques → Site |
| **04_MARKETING_RESEAUX** | Codes parrainage à utiliser en contenu | Banques → Marketing |
| **05_MONETISATION** | Tarification Stripe + paliers payout | Bidirectionnel |
| **06_INFRA_VEILLE** | Veille SSL des plateformes affiliés + alerte downtime | Infra → Banques |
| **07_RND_APP** | Intégration API brokers (Alpaca + alternatives) dans NAVLYS Phase 1 | Banques → R&D |

---

## 9. Outils et infrastructure

- **Variables d'env Vercel** : `NEXT_PUBLIC_AFFILIATE_*` (publics côté front) + `STRIPE_*`, `*_API_KEY` (privés)
- **Local Bruno** : fichier `.env` (gitignored) + 1Password ou Bitwarden pour rotation
- **Dossier mémoire** : `Downloads/_SITES_MASTER/` (docs maîtres) + `Downloads/_API_TESTS_LOGS/` (logs API JSON)
- **Outils tiers** : aucun outil tiers de gestion de banque automatisée (sécurité maximale)
- **Liens externes utiles** :
  - [Stripe Dashboard](https://dashboard.stripe.com/)
  - [Wise Business](https://wise.com/business)
  - [Awin Publisher](https://www.awin.com/)
  - [Effiliation](https://www.effiliation.com)
  - [Impact](https://impact.com/)

---

## 10. Premières actions du département (28 mai 2026 — J-3)

### J-3 (29 mai) — DÉMARRAGE
1. ✅ Charte département créée (ce doc)
2. ✅ État des lieux comptes produit (`_BANQUES_ETAT_DES_COMPTES_BRUNO.md`)
3. ✅ Flux d'encaissement cartographiés (`_BANQUES_FLUX_ENCAISSEMENT.md`)
4. ✅ Plan affiliations publié (`_BANQUES_LIENS_PARTENAIRES_CPA.md`)
5. ✅ Comparatif brokers API publié (`_BROKERS_ALTERNATIVES_ALPACA_API.md`)
6. [ ] Mise à jour `_NAVLYS_PYRAMIDES_J-3_LIVE.md` avec ce 8ᵉ département + ses 7 étages
7. [ ] Mise à jour `_NAVLYS_MASTER_INDEX.md` + `_NAVLYS_DISPATCH.md` avec ce département

### J-2 → J0
- Bruno exécute sa checklist (voir tête de chaque livrable)
- Le Trésorier compile les retours et prépare les scripts API

### J+1 → J+14
- Tests API en mode Paper/Sandbox sur les 5 brokers prioritaires
- Premières commissions affiliées à constater
- Premier rapport hebdo `_AFFILIATIONS_HEBDO_S01.md`

---

## 11. Approbation

- **Création département validée** : à confirmer par Bruno (réponse OUI/NON ce message)
- **Persona "Le Trésorier" validée** : à confirmer (ou proposer alternative — Le Quartier-Maître / Le Comptable du Navire / Le Garde-Coffre)
- **Cadence proposée** : à confirmer

---

⚓ _« Le Trésorier veille. Aucune pièce ne quitte le navire sans son aval. »_
_Compilé par Le Trésorier · Département Banques & Finances NAVLYS · 28 mai 2026._
