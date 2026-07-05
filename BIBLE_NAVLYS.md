# 📖 BIBLE NAVLYS — Référence unique

> Document de vérité du projet NAVLYS. En cas de contradiction avec un ancien
> document, **c'est ce fichier qui fait foi**. Mis à jour le 2026-06-23.

---

## 1. Identité & cadre légal

- **Porteur** : Bruno Mark Partouche (basé en Israël).
- **Statut** : **simple citoyen**. Aucune affiliation ORIAS / CIF / conseiller
  en investissement. Contenu **éducatif et informatif uniquement** : jamais de
  conseil personnalisé, jamais de promesse de rendement, disclaimer d'office
  sur tout contenu financier.
- **Domaine canonique** : `navlys.com`.

## 2. Charte visuelle

- **Couleurs** : ice blue respirant **partout** + champagne or réservé aux
  animations, au logo et aux textes d'accent. Fond sombre.
- **Interdit** : tout pourpre / mauve / fuchsia.

## 3. Politique de cotisations (HT) — gravée le 2026-07-05 par Bruno

> Principe : chaque tranche de 9,99 fait monter d'une formule. Chaque formule
> **contrôle ses volumes** (photos, vidéos, créations vidéo/mois, stockage) pour
> rester rentable — source de vérité technique : table `formules` (Supabase),
> les applications la lisent et bloquent au quota. 9,99 = **découverte, non
> complète**. **Abonnement À L'ANNÉE uniquement — aucun abonnement au mois**
> (cotisation affichée en HT/mois, réglée ×12 à l'année, `recurrence=an`).
> **Offre de lancement : −50 % à vie sur tout passage de formule supérieure.**
> **Coffrets cadeaux** tout pré-fournis, 1 an offert en package : −20 % (1 produit,
> 95,99) · −30 % (2 produits, 167,99) · −40 % (3 produits, 215,99). Offres non
> cumulables. L'ancien coffret fêtes 99,99 est supprimé (incohérent avec
> Univers 599,88/an).

| Code | Formule | Cotisation | Contenu |
|------|---------|-----------|---------|
| `essai` | Essai libre | 0 € | découverte standard installée mobile+PC · 10 photos · 1 vidéo · 200 Mo |
| `n1` | Entrée | 9,99/mois | 1 app · 100 photos · 5 vidéos · 1 création/mois · 2 Go |
| `n2` | Duo | 19,99/mois | 2 apps · 300 photos · 15 vidéos · 3 créations/mois · 5 Go |
| `n3` | Trio | 29,99/mois | 3 apps · 600 photos · 30 vidéos · 6 créations/mois · 10 Go |
| `n4` | Grand large | 39,99/mois | 4 apps · 1 200 photos · 60 vidéos · 10 créations/mois · 20 Go |
| `univers` | Univers NAVLYS | 49,99/mois | toutes les apps · 2 500 photos · 120 vidéos · 20 créations/mois · 50 Go |
| `universplus` | Univers Plus | 99,99/mois | toutes les apps · volumes ×3 · 150 Go |
| `integral` | Univers Intégral | 149,99/mois | **100 % du site, apps existantes ET futures, à vie** · volumes libres (usage personnel) |
| `cadeau1` | Coffret Cadeau (1 an) | 95,99 une fois | 1 produit · volumes Entrée · −20 % |
| `cadeau2` | Package Double (1 an) | 167,99 une fois | 2 produits · volumes Duo · −30 % |
| `cadeau3` | Package Triple (1 an) | 215,99 une fois | 3 produits · volumes Trio · −40 % |

> Anciens Stripe price IDs (échelle 2026-06, conservés pour référence) :
> `price_1TkpVd…` 9,99 · `price_1TkpVt…` 19,99 · `price_1TkpVv…` 29,99 ·
> `price_1TkpVx…` 49,99 · `price_1TkpVy…` 79,99 · `price_1TkpW0…` 99,99 ·
> `price_1TkpW1…` coffret. La caisse actuelle crée les abonnements en
> `price_data` dynamique — ces IDs ne sont plus nécessaires.

- **Paiement** : Stripe = rail principal (compte `acct_1TYn17LtUVKEi3Ck`).
  PayPal / Wise / Lemon Squeezy = rails secondaires à étudier plus tard.

## 4. Infrastructure réelle

| Brique | Réalité |
|--------|---------|
| Base de données | Supabase `navlys-core`, ref **`hhrlgyvtqluxpywjiwkd`**, eu-west-3, Postgres 17 |
| Hébergement web | Vercel (fonctions serverless, déploiement CLI) |
| Serveur du cerveau 24/7 | Hetzner Cloud (IPv6 `2a01:4f8:1c19:f6b4::/64`) |
| Passerelle IA | OpenRouter (clé Hermès/Nous) → Claude + Hermès |

> ⚠️ Les anciens documents mentionnant « NOVA-HUB », Next.js, ou d'autres refs
> Supabase sont **périmés**. Seul le tableau ci-dessus est exact.

## 5. NAVLYS CORE — le cerveau agentique

- **14 agents**, 1 par département, stockés dans la table `agents`.
- Chaque agent a : `departement`, `role`, `modele`, `autonomie`
  (`prepare` = prépare puis attend Bruno / `auto` = exécute seul).
- **Modèles** (IDs canoniques Anthropic) :
  - `claude-opus-4-8` — dossiers sensibles
  - `claude-sonnet-4-6` — usage courant (défaut)
  - `claude-haiku-4-5` — tâches internes rapides (agents auto)
- **File de missions** : table `missions` ; un agent récupère sa tâche via la
  fonction `claim_next_mission(p_departement)` (réservée au `service_role`).
- **Mémoire** : `navlys_memoire` (mémoire vive) + recherche vectorielle.
- **Journalisation** : `agent_runs` + `journal`.

### Codes des 14 agents
NAVTECH · NAVCOM · NAVFI · NAVBIO · NAVME · NAVGEN · NAVLEX · NAVPART ·
NAVPTE · NAVLEAD · NAVMKT · NAVLAB · NAVBIEN · NAVDEM.

## 6. Règles d'or des agents (non négociables, codées en dur)

1. **Aucun débit** sans validation de Bruno.
2. **Aucune publication / envoi d'e-mail / déploiement** sans validation.
3. Statut simple citoyen (cf. §1) respecté dans chaque livrable.
4. Charte visuelle (cf. §2) respectée.
5. Tout livrable sensible passe au statut **`a_valider`** → Bruno tranche.

## 7. Le code (repo)

```
run.py                  # point d'entrée : python run.py [--once]
navlys_core/
  config.py             # config + MODEL_MAP (IDs canoniques -> slugs OpenRouter)
  supabase_client.py    # client PostgREST/RPC en service_role
  llm.py                # appel OpenRouter + cache du prompt stable (Anthropic)
  worker.py             # boucle : claim mission -> agent -> livrable -> statut
requirements.txt
.env.example            # gabarit (les vraies clés ne sont JAMAIS dans Git)
```

## 8. Sécurité — état & rappels

- ✅ Base verrouillée (tables internes fermées au public, `claim_next_mission`
  réservée au serveur, bucket privé `souvenirs` par utilisateur).
- 🔴 **Secrets exposés à régénérer par Bruno** : mots de passe Google
  (~40 identifiants), code TOTP. À faire côté comptes personnels.
- Règles : la clé `service_role` reste **serveur uniquement** ; `.env` hors Git ;
  clé OpenRouter avec plafond de dépense.

## 9. Ce qui reste pour allumer le 24/7

1. Bruno : rotation Google (mot de passe + 2 étapes).
2. Bruno : confirmer un **serveur** Hetzner « Running » → coller le bloc d'install.
3. Bruno : confirmer l'e-mail Stripe.
4. Lancer `python run.py` sur le serveur → les agents tournent en continu.
