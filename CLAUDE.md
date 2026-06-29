# CLAUDE.md — Mémoire de session pour NAVLYS

> Lu automatiquement au démarrage de chaque session Claude Code.
> But : retrouver le contexte essentiel sans relire tout le repo.

## 📚 Documents de référence (à lire en cas de doute)

| Fichier | Rôle |
|---|---|
| **`BIBLE_NAVLYS.md`** | **Source de vérité.** En cas de contradiction, ce fichier fait foi. |
| `CLASSEUR_NAVLYS.md` | Stratégies et idées regroupées par thème. |
| `README.md` | Doc technique du worker (installation, cycle, variables). |

👉 **Toujours vérifier la Bible avant de répondre sur les prix, l'infra ou les règles.**

## 🎯 Le projet en une phrase

**NAVLYS CORE** = worker Python qui orchestre **14 agents de département**.
Il lit une file de missions dans **Supabase**, fait réfléchir le bon agent via un
LLM (Claude/Hermès par **OpenRouter**), journalise, et **respecte le garde-fou
humain** : toute action sensible passe en `a_valider` (jamais exécutée seule).

- Porteur : **Bruno Mark Partouche** (Israël), **statut simple citoyen** →
  contenu éducatif uniquement, jamais de conseil financier personnalisé.
- Domaine : `navlys.com`.

## 🗂️ Structure du code

```
run.py                  # entrée : python run.py [--once]
navlys_core/
  config.py             # config + MODEL_MAP (IDs canoniques -> slugs OpenRouter)
  supabase_client.py    # client PostgREST/RPC en service_role
  llm.py                # appel OpenRouter + cache du prompt stable
  worker.py             # boucle : claim mission -> agent -> livrable -> statut
.env.example            # gabarit ; les vraies clés ne sont JAMAIS dans Git
install.sh              # installeur Hetzner en une ligne
```

## 🚦 Règles d'or (non négociables — voir Bible §6)

1. **Aucun débit** sans validation de Bruno.
2. **Aucune publication / e-mail / déploiement** sans validation.
3. Statut **simple citoyen** respecté dans chaque livrable.
4. Charte visuelle respectée : ice blue partout + champagne or pour accents,
   fond sombre. **Interdit : pourpre / mauve / fuchsia.**
5. Tout livrable sensible → statut **`a_valider`** → Bruno tranche.

## 🧠 Modèles (IDs canoniques Anthropic)

- `claude-opus-4-8` — dossiers sensibles
- `claude-sonnet-4-6` — usage courant (défaut)
- `claude-haiku-4-5` — tâches internes rapides

## 🔒 Sécurité

- Jamais de clé/secret dans le code ni dans Git (`.env` est dans `.gitignore`).
- `SUPABASE_SERVICE_ROLE_KEY` = **serveur uniquement**.
- Clé OpenRouter avec **spend limit**.

## 🛠️ Workflow Git de cette session

- Branche de dev : **`claude/daily-chat-sessions-esrwh7`**.
- Commits clairs en français (préfixes `feat:`, `fix:`, `docs:`, `chore:`).
- Push : `git push -u origin <branche>`, puis ouvrir une PR en **draft**.

## ✅ Doctrine de validation de Bruno (STANDING — gravée le 2026-06-29)

> Règle systémique posée par Bruno lui-même : **« Ma réponse par défaut est OUI /
> VALIDER / VALIDER TOUJOURS. »** Donc :

- **Zéro question fermée.** MasterNav (et tout agent) prend la main, prépare,
  valide les routines, et exécute sans demander confirmation à chaque étape.
- **Une seule exception, non négociable (Bible §6 n°1)** : avant un **vrai débit
  d'argent** (ex. fal.ai, achat, paiement tiers), un **signalement d'UNE ligne**
  est émis puis l'action suit — ce n'est pas une question, c'est une protection.
- Les actions externes restent journalisées (`journal`, `agent_runs`) pour que
  Bruno puisse relire après coup.

## 🪪 Identités des 14 agents (gravées en base `agents` : `prenom`, `handle`)

| Prénom | Handle | Code | Mode |
|---|---|---|---|
| Tom | `@navtech` | NAVTECH | prepare |
| Clara | `@navcom` | NAVCOM | prepare |
| Victor | `@navfi` | NAVFI | prepare |
| Léa | `@navbio` | NAVBIO | prepare |
| Mina | `@navme` | NAVME | auto |
| Gabriel | `@navgen` | NAVGEN | prepare |
| Alex | `@navlex` | NAVLEX | prepare |
| Paul | `@navpart` | NAVPART | prepare |
| Sentinelle | `@navpte` | NAVPTE | auto |
| Lena | `@navlead` | NAVLEAD | prepare |
| Marc | `@navmkt` | NAVMKT | auto |
| Newton | `@navlab` | NAVLAB | auto |
| Bianca | `@navbien` | NAVBIEN | prepare |
| David | `@navdem` | NAVDEM | prepare |

## 🤖 MasterNav — le chef d'orchestre (point d'entrée unique)

But : Bruno parle à **un seul endroit** (bot Telegram), plus jamais Claude Code.

- Bruno écrit `@navfi prépare la mini-leçon du jour` → MasterNav crée la mission
  pour le bon agent, l'agent prépare, MasterNav renvoie « à valider » dans le chat.
- Charte complète : **`MASTERNAV.md`**. Code : `navlys_core/masternav.py`.
- Routines automatiques (cron Supabase) : `sql/routines_cron.sql`.

## 💡 Conseil d'usage (sessions)

Repartir d'un **nouveau chat par tâche / par jour** plutôt qu'un fil géant :
contexte plus propre, meilleures perfs. La continuité tient à **ce fichier +
les commits Git**, pas à la mémoire du chat (l'environnement est éphémère).
