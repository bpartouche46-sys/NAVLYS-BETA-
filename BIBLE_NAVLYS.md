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

## 3. Politique de prix (HT)

| Palier | Prix | Stripe price ID |
|--------|------|-----------------|
| 1 | 9,99  | `price_1TkpVdLtUVKEi3CkVOqeWCkO` |
| 2 | 19,99 | `price_1TkpVtLtUVKEi3Ck3kWL2jQo` |
| 3 | 29,99 | `price_1TkpVvLtUVKEi3CkJ7D9YyRr` |
| 4 | 49,99 | `price_1TkpVxLtUVKEi3Ck3Q9RFxIH` |
| 5 | 79,99 | `price_1TkpVyLtUVKEi3CkIXhca0wq` |
| 6 | 99,99 | `price_1TkpW0LtUVKEi3Cko1mo2wl1` |
| Coffret fêtes (1 an + biographie) | 99,99 | `price_1TkpW1LtUVKEi3CkGFfLTq4u` |

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
