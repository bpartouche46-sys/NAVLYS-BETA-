# ⚓ BIBLE NAVLYS — Source de vérité unique (v2)

> Document canonique. En cas de conflit avec un ancien fichier, **c'est CE document qui fait foi**.
> Toute autre grille de prix / charte / doctrine antérieure est considérée obsolète (doctrine « G2 » : un seul prototype par sujet).
> Dernière consolidation : 2026-06-24 · © [entité — hors dépôt] — SIREN 482 511 292

---

## 1. Identité & statut juridique

- **NAVLYS™** = éditeur de **logiciel éducatif** et d'**espace de veille informative**. Rien d'autre.
- Statut **simple citoyen** : **AUCUN** agrément CIF, ORIAS, ni statut financier réglementé. NAVLYS ne fait **ni conseil en investissement, ni gestion, ni courtage**.
- NAVLYS ne gère **aucun fonds**, ni réel ni virtuel.
- Éditeur : **[entité — hors dépôt] — SIREN 482 511 292**.
- Conformité influence commerciale : **loi française du 9 juin 2023** (déclaration des liens affiliés).

---

## 2. Marque & domaines

- Marque unique : **NAVLYS** (purger tout reste « NOVA », « NOVA Finance Club », « NOVA-HUB », `nova_bot.py`, et l'ancien branding perso « Bruno Partouche » sur les pages produit).
- **QG : `navlys.com`** + sous-sections (méthode, tarifs, partenaires, ambassadeurs, membre, FAQ, SAV…).
- `navlys.io` → **rediriger** vers `navlys.com`.
- Repo worker/cerveau : **NAVLYS-BETA-** (réel) — ne pas le confondre avec l'ancien nom « NOVA-HUB » des docs.

---

## 3. Charte visuelle (verrouillée)

- Couleurs : **noir `#05060a`** + **ice blue `#5fe0ff` / `#7DD3FC`** + **champagne/or `#e9d3a0`**.
- **ZÉRO pourpre / vin / bordeaux.** (Le site en ligne en contient encore → re-skin requis.)
- Polices : **Cormorant Garamond** (titres), **Fraunces italic** (accents), **Lora** (corps), **JetBrains Mono** (data/labels).
- Ambiance : constellation, LED qui respire, glassmorphism sobre.

---

## 4. Méthode pédagogique

- **Principe 90/10** (popularisé par R. Kiyosaki, *Père riche père pauvre*) : 90 % travaillent pour l'argent, 10 % font travailler l'argent. Distinction revenu actif / passif, notion d'actif, levier du temps.
- **Strictement éducatif** : jamais de conseil, de reco d'achat/vente, ni de promesse de rendement. Disclaimer AMF/MIF II + risque de perte en capital systématique.
- Déclinaison par formule : 90/10 verrouillée → déblocable 80/20, 70/30 → libre (voir §5).

---

## 5. Formules & prix NAVLYS (gamme trading-éducation)

> ⚠️ **Note de réconciliation** : 3 grilles divergentes existaient (page v4 Alpaca F1–F4 ; cerveau `03_prix` ; audit NAVMKT 6 paliers).
> **Canon retenu = la page tarifs `v4 ALPACA`** (la plus récente, customer-ready, alignée sur la stratégie Alpaca verrouillée). Bruno peut surcharger en éditant ce tableau.

| Formule | Prix/mois | Contenu | Affiliation |
|---|---|---|---|
| **F1** | **29,99 €** | 90/10 verrouillée stricte | 25 % à vie |
| **F2** ⭐ recommandée | **39,99 €** | 90/10 + 3 modes de recyclage | 25 % à vie |
| **F3** | **49,99 €** | déblocable 80/20 ou 70/30 + coaching 1-to-1 | 25 % à vie |
| **F4 PRO** | **99,99 €** | méthode libre · pros · Membre d'Honneur auto | **40 % à vie** |

- Toutes formules : app PWA NAVLYS, **compte démo Alpaca gratuit par défaut**, affiliation 25 % à vie automatique.
- Format prix toujours en `,99`.
- Encaissement : **Stripe** (actif).

---

## 6. Alpaca — stratégie verrouillée (mai 2026)

- **Alpaca = broker affilié PRINCIPAL.** Paper trading natif gratuit illimité, compte réel quand le membre est prêt.
- Atouts : FINRA + SIPC, 0 frais actions US, actions fractionnées, API moderne (compatible bot R1), **clés API gardées chez le client** (NAVLYS n'y accède jamais).
- **Cadeau parrainage Alpaca** (cumulable avec l'affiliation cash) :
  - **1** client Alpaca confirmé → **F3 à vie offerte**
  - **3** → **F4 PRO à vie + statut Honor**
  - **10+ / 6 mois** → **Ambassadeur Élite (50 % commission)**
- Validation « confirmé » = filleul nouveau client + KYC validé + 1er dépôt réel + pas de fermeture sous 30 j + parrain membre actif.
- Paliers affiliation : **25 %** standard · **40 %** Honor (F4 PRO ou 3 parrainages) · **50 %** Élite.
- Tables à implémenter : `navlys_alpaca_referrals` + trigger d'upgrade auto (spéc dans la note de rectification Drive).
- Hors zone Alpaca : brokers alternatifs (eToro…).

---

## 7. Paiement & encaissement

- **NAVLYS (abonnements F1–F4)** → **Stripe** (actif) + **PayPal** + **Wise**.
- **Gamme héritage « One Life / Ma vie en images »** → **Lemon Squeezy** (Merchant of Record, TVA + payout).
- Aucun surcoût client sur les commissions affiliées.

---

## 8. Gammes de produits (2 lignes distinctes)

1. **NAVLYS** — trading-éducation : formules F1–F4, méthode 90/10, Alpaca. (Stripe)
2. **One Life / héritage** — livre-film, « Ma vie en images » (abo 9,99/mois), coffrets mémoire. (Lemon Squeezy)

→ Les deux échelles de prix coexistent ; ne pas les fusionner.

---

## 9. Infrastructure (réel, vérifié)

- **Base unique : Supabase `hhrlgyvtqluxpywjiwkd`** (site + cerveau des agents). Toute nouvelle brique se branche dessus.
- **Cerveau autonome** : worker Python sur **Hetzner**, **14 agents** actifs 24/7 (NAVFI, NAVCOM, NAVMKT, NAVTECH, NAVPTE, NAVBIO, NAVLAB, NAVME…), table `missions` + `journal` + `core_knowledge`.
- **Front** : navlys.com sur **Vercel** (serverless, **pas** Next.js), SAV branché sur `core_knowledge`.
- **Vue live** : `index.html` (tableau de bord CORE, lecture seule, flux public `core_live_feed`).
- Voix : clone ElevenLabs.

---

## 10. Garde-fous (règles d'or)

- **Ne rien supprimer** sans validation ; on ajoute, on archive, on ne détruit pas.
- Liens affiliés : réf `BP001`, toujours `#partenaire` + `rel="sponsored nofollow"`.
- Jamais de mention « certifié », « garanti », « agréé » : interdit (simple citoyen).
- Marges plancher produits 57–67 %, jamais < 28 %.
- WhatsApp réel : **972537082746** (ne plus utiliser le placeholder `33612345678`).

---

## 11. État du chantier (au 2026-06-24)

**✅ Fait**
- Cerveau 24/7 en ligne (14 agents) + bug de production corrigé.
- Accès base sécurisé (RLS sur tables internes).
- Vue live CORE construite + re-skinnée charte (zéro pourpre).
- Canon consolidé (ce document) + fiche `11_formules_navlys` gravée dans le cerveau.

**⏳ À faire (priorisé)**
1. 🔒 **Sécurité critique** : ~40 mots de passe exportés en clair (`Google_Passwords.csv`) → tout changer + 2FA (Google → finance → reste). *Action Bruno.*
2. 🎨 Re-skin du site live (retirer le pourpre restant) + nettoyer le vieux `cockpit.html` (habillage NOVA).
3. 🌐 Brancher le repo sur Vercel (déploiement auto de la vue live).
4. 📄 Produire FAQ SAV, bio Groupe Partouche, offre Van Damme (missions agents).
5. 🦙 Implémenter `navlys_alpaca_referrals` + trigger quand le module membre sera prêt.

---

⚓ *« L'IA est le vent, c'est toi qui tiens la barre. »*
