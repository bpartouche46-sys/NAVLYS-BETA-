# 🧭 RENFORCEMENT — 01. STRATÉGIE & GOUVERNANCE

> Consolidé 2026-06-25 à partir du « cerveau » récupéré (`recup-docs/onedrive/`) et de
> `docs/SYNTHESE-NAVLYS.md`. **Rien de public, rien de payant déclenché.** Décisions = Bruno.
> Sources principales citées en fin de chaque section.

---

## 📍 ÉTAT ACTUEL

- **Positionnement** : NAVLYS = **marque produit dépersonnalisée**, média **éditeur pédagogique**
  finance. Bruno **invisible** sur NAVLYS, présent uniquement sur **brunopartouche.com**.
  Modèle économique = **publisher CPA** (affiliation éditoriale légale, comme un YouTubeur finance) +
  **abonnement** (NAVLYS NEXT GEN INVEST) + **one-shot** (NAVBIO). **PAS CIF / ORIAS / IOBSP.**
- **Statut réel** : **LANCÉ, phase BETA** (gate ouvert d'après docs, 31 mai → 1ᵉʳ juin 2026).
- **Organisation** : QG (MasterNav / Direction) + 6 départements (Site & Produit, Marque & Studio,
  Marketing & Réseaux, Monétisation, Infra & Veille, R&D App) + personas (Le Cartographe = R&D/Labo,
  Le Veilleur de Coffre = Infra/sécurité).
- **Méthode produit** : **90/10** (90 % Forteresse ETF/DCA + 10 % Capital Plaisir / Labo NEXT GEN).
- **Cible business 2026 H2** : ~770 k€ cash-in ; mix recommandé **C 90/10** (ultra-abo, 816 k€ projeté)
  juin→sept, puis bascule **A 80/20** (footer partenaires actif) oct→déc.

_Sources : `00_ORGANIGRAMME.md`, `_MASTER_NAVLYS_NOW.md`, `01_MATRICE_PRICING_OFFICIELLE.md`,
`_007_STRATEGIE_PRICING_OPTIMAL_NAVLYS.md`._

---

## 💪 FORCES

- **Positionnement légal clair et défendable** : éditeur pédagogique, pas conseiller → réduit
  fortement le risque réglementaire (vs un finfluenceur qui « recommande »).
- **Méthode 90/10 lisible** et différenciante (« 90 % qui dort, 10 % qui joue »).
- **Honnêteté radicale** comme actif marketing : le Labo **publie ses invalidations** (anti-arnaque).
- **Écosystème cohérent** : NAVLYS (finance) + NAVBIO (biographie/bien-être) + NAVLYS.IO (studio) +
  brunopartouche.com (réputation source) → plusieurs portes d'entrée, une seule marque-mère.
- **Gouvernance documentée** (8 règles gravées, organigramme, source unique de vérité).

---

## ⚠️ FAIBLESSES / GAPS

- **Incohérences non tranchées** (cf. § Contradictions) : dates, prix, slogan, couleur.
- **Dépendance à une seule personne** (Bruno) : charge mentale énorme ; la deperso aide mais le
  capitaine reste le goulot pour toute décision (argent, public, légal).
- **Fragmentation mémoire** : ~270 docs récupérés, plusieurs versions concurrentes (FORMULES v1→v6,
  pricing mensuel vs one-shot) → risque de repartir sur une version périmée.
- **Stack mémoire désynchronisée** : `CLAUDE.md` parlait encore d'un « core Hetzner » absent des
  docs récents (corrigé 2026-06-25, à confirmer Bruno).
- **Entité juridique non figée** → bloque Stripe, factures, contrats partenaires.

---

## 🔧 RENFORCEMENTS CONCRETS (propositions)

1. **Figer une « SOURCE UNIQUE DE VÉRITÉ » vivante** dans ce dépôt (rôle de `_NAVLYS_MASTER_INDEX.md`
   côté cerveau) : 1 page « décisions figées » que chaque session relit. → proposé : `docs/SYNTHESE-NAVLYS.md`
   + ce dossier `RENFORCEMENT/`.
2. **Trancher les 4 incohérences bloquantes d'abord** (date, prix, slogan, couleur) : ce sont des
   pré-requis à toute communication publique. Voir § Décisions Bruno.
3. **Verrouiller le mix de monétisation** : confirmer trajectoire C (juin-sept) → A (oct-déc).
4. **Cartographier explicitement « legacy vs actif »** : marquer Hetzner et les versions FORMULES/pricing
   anciennes comme archives, pour ne plus jamais repartir dessus (sans rien supprimer — règle gravée 8).
5. **Checklist pré-lancement public** dérivée des 8 règles gravées (deperso + disclaimer + zéro promesse
   + couleur + date unique) → à passer au gardien avant toute URL publique.

---

## ❓ CONTRADICTIONS À RÉSOUDRE (remontées, non tranchées)

| Sujet | Variantes vues | Sources | Reco de cadrage |
|---|---|---|---|
| **Date de lancement** | 31 mai (gate) · 1ᵉʳ juin (BETA) · 15 juin (BETA stable+ALCAPA) · 1ᵉʳ juillet (countdown live actuel) | `_MASTER_NAVLYS_NOW.md`, `00_ORGANIGRAMME.md`, ETAT-DES-LIEUX 2026-06-22(c) | **Choisir UNE date publique** et la mettre partout. Garder les autres en interne (jalons). |
| **Prix abo** | 39 € early-bird verrouillé · 49 €/mois standard · 490 €/an · (« 39 € à vie » côté mémoire) | `01_MATRICE_PRICING_OFFICIELLE.md`, `_NAV_IA_KNOWLEDGE_BASE_INITIALE.md`, `STRATEGIE-NAVLYS.md` | **Officiel = 49 €/mois ou 490 €/an**, early-bird 39 € verrouillé avant échéance. « 39 € à vie » = à confirmer/retirer. |
| **Fuseau** | « minuit Asia/Jerusalem » dans textes | `00_ORGANIGRAMME.md`, `launch-offer.js` (ERR-005) | **Garder le fuseau en interne uniquement** ; jamais « Jérusalem » dans le public (ERR-003). |
| **Couleur** | `#5fe0ff` résiduel vs `#7DD3FC` officiel | `_AUDIT_CHARTE_COULEURS.md` | **`#7DD3FC` partout.** |

---

## ⚖️ DÉCISIONS BRUNO (ce domaine)

- [ ] **Date publique unique** de lancement/BETA → à figer.
- [ ] **Prix officiel** abonnement + sort de l'offre « 39 € à vie ».
- [ ] **Entité juridique** (FR auto-entrepreneur vs société IL) → débloque Stripe/contrats.
- [ ] **Hetzner** : abandonné (legacy) ou conservé pour un usage précis ?
- [ ] **Mix monétisation** : valider trajectoire C → A.
- [ ] **Statut produit « LÉGENDE »** (biographies IA luxe, R&D) : autonome / sous NAVLYS Studio / parking.
