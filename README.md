# NAVLYS CORE — Worker d'orchestration des agents

Connecteur qui fait vivre les **14 agents de département** de NAVLYS : il lit la
file de missions dans Supabase, fait réfléchir le bon agent via un LLM
(Claude ou Hermès, par OpenRouter), journalise, et **respecte le garde-fou
humain** (les actions sensibles passent en `a_valider`, jamais exécutées seules).

Conçu pour tourner **à l'identique** :
- sur ton téléphone via **Hermès Agent (Android)** — terminal bash/python/git — pour **tester** ;
- sur un **serveur Hetzner** (Hermès officiel open-source / cron) — pour le vrai **24/7**.

---

## 🧠 Le cerveau (déjà en place dans Supabase `navlys-core`)

| Table / fonction | Rôle |
|---|---|
| `departements` (14) | Les 14 départements/agents |
| `agents` | Registre : rôle, outils, **modèle**, SLA, **autonomie** (`auto` / `prepare`) |
| `missions` | File de tâches (`a_faire → en_cours → a_valider / fait / erreur`) |
| `agent_runs` | Logs d'exécution (output, tokens, coût) |
| `journal` | Journal d'activité |
| `navlys_memoire` + `core_knowledge` | Mémoire + connaissances (embeddings = apprentissage) |
| `claim_next_mission(dept)` | RPC : un agent réclame sa tâche suivante (verrouillée service_role) |

## 🔁 Ce que fait le worker (par cycle)

```
pour chaque agent actif :
  claim_next_mission(département)
  → charge le contexte (mémoire vive + dossiers du département)
  → appelle le LLM (modèle de l'agent) avec son rôle + les règles CORE
  → AUTO + interne   : exécute, log, mission = "fait"
  → PREPARE / coûteux : mission = "a_valider" + alerte → Bruno valide
```

> ⚠️ **Le worker ne publie rien, n'envoie aucun email, ne dépense rien chez un
> tiers (fal.ai…), ne déploie pas.** Il *réfléchit* et *met en file*. Toute
> action externe reste à la validation manuelle de Bruno (doctrine G1).

## ⚙️ Installation

```bash
git clone <ce-repo> navlys-core && cd navlys-core
pip install -r requirements.txt
cp .env.example .env      # puis renseigne tes clés DANS .env (jamais committé)
python run.py --once      # test : un seul cycle
python run.py             # production : boucle continue
```

### Sur Hermès Agent (Android)
Onglet **Terminal** → `git clone` ce repo → `pip install -r requirements.txt` →
renseigne les variables → `python run.py`. (Le tel ≠ 24/7 fiable : pour test.)

### Sur Hetzner (24/7)
Installe le **Hermès officiel** (`github.com/nousresearch/hermes-agent`) **ou**
lance simplement ce worker en service systemd / cron. Exemple cron toutes les
minutes :
```
* * * * * cd /opt/navlys-core && /usr/bin/python3 run.py --once >> worker.log 2>&1
```

## 🔑 Variables d'environnement (voir `.env.example`)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | URL du projet navlys-core |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service_role (**secret serveur**, jamais côté client) |
| `OPENROUTER_API_KEY` | Clé OpenRouter (**mets une spend limit**) |
| `NAVLYS_DEFAULT_MODEL` | Modèle par défaut (ex. `anthropic/claude-sonnet-4.6`) |
| `NAVLYS_POLL_SECONDS` | Intervalle entre cycles |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Alertes « à valider » (optionnel) |

## 🔒 Sécurité
- Aucune clé dans le code ni dans Git (`.env` est ignoré).
- `service_role` = serveur uniquement. Clé OpenRouter dédiée + spend limit.
- Le garde-fou `a_valider` protège contre toute action externe non validée.

## 🧩 Ajouter une mission
Insère une ligne dans `missions` avec `departement`, `titre`, `consigne`,
`priorite` (1 = urgent), `statut = 'a_faire'`. Le bon agent la prendra au cycle suivant.

## 🛣️ À venir (v2)
- RAG vectoriel (embeddings via `match_navlys_memoire`) au lieu du contexte récent.
- Dispatcher MasterNav (route automatiquement les missions sans département).
- Exécution des actions externes APRÈS validation (publication, fal.ai, déploiement).
- Connexion des gateways Hermès (Telegram/Slack/Discord) au canal de validation.
