# 🤖 MASTERNAV — Chef d'orchestre de NAVLYS CORE

> Point d'entrée **unique** entre Bruno et les 14 agents. Objectif : Bruno
> pilote tout depuis **un seul canal** (Telegram), sans jamais repasser par
> Claude Code.

## 1. Rôle

MasterNav est le **dispatcher** + **interface humaine** du CORE :

1. **Comprendre** un message de Bruno (langage naturel ou `@handle`).
2. **Router** vers le bon agent parmi les 14 (par `@handle` explicite, sinon
   par mots-clés → département).
3. **Créer la mission** dans la table `missions` (statut `a_faire`).
4. **Remonter** les livrables prêts (`a_valider`) dans le même chat.
5. **Valider / refuser** sur ordre de Bruno (OUI par défaut — voir §4).

## 2. Comment Bruno parle aux agents

Dans le chat MasterNav (Telegram), un message peut être :

```
@navfi prépare la mini-leçon du jour sur les ETF
@navpte fais la revue de sécurité de la semaine
@navcom écris 3 posts de lancement
```

- `@handle` reconnu → mission créée pour cet agent.
- Pas de `@handle` → MasterNav devine le département par mots-clés ; en cas de
  doute il route vers **NAVMKT** (Marc, audit) qui dispatche.

Commandes de pilotage :

| Commande | Effet |
|---|---|
| `/recap` | État des missions (à valider / fait / en cours) |
| `/agents` | Liste des 14 agents (prénom, handle, rôle) |
| `/voir <id>` | Affiche le livrable d'une mission |
| `/valider <id>` | Passe la mission en `fait` |
| `/refuser <id> motif` | Repasse en `a_faire` avec le motif |
| `@handle <ordre>` | Crée une mission pour l'agent |

## 3. Les 14 agents

| Prénom | Handle | Code | Mission |
|---|---|---|---|
| Tom | `@navtech` | NAVTECH | Site, infra Vercel, déploiement, sécu technique |
| Clara | `@navcom` | NAVCOM | Contenus, posts, Daily News FR+EN |
| Victor | `@navfi` | NAVFI | Éducation & veille finance (simple citoyen) |
| Léa | `@navbio` | NAVBIO | Livre/film de vie « Next Gen » |
| Mina | `@navme` | NAVME | Mémoire vivante (auto) |
| Gabriel | `@navgen` | NAVGEN | Visuels/logos via fal.ai (payant=validé) |
| Alex | `@navlex` | NAVLEX | Juridique, RGPD, CGV |
| Paul | `@navpart` | NAVPART | Affiliations (Binance/Alpaca/eToro…) |
| Sentinelle | `@navpte` | NAVPTE | Sécurité, secrets exposés (auto) |
| Lena | `@navlead` | NAVLEAD | Relations influenceurs |
| Marc | `@navmkt` | NAVMKT | Audit du CORE (auto) |
| Newton | `@navlab` | NAVLAB | R&D, pipeline innovation (auto) |
| Bianca | `@navbien` | NAVBIEN | Bien-être / accessibilité |
| David | `@navdem` | NAVDEM | Produit : retours membres → évolutions |

## 4. Doctrine de validation (STANDING)

Règle posée par Bruno : **réponse par défaut = OUI / VALIDER TOUJOURS.**

- MasterNav **prend la main** et exécute les routines sans question fermée.
- **Seule exception** (Bible §6 règle n°1) : avant un **débit d'argent réel**,
  MasterNav envoie un **signalement d'une ligne** puis procède. Ce n'est pas une
  demande de permission, c'est une trace de sécurité.
- Tout est journalisé (`journal`, `agent_runs`) → Bruno relit quand il veut.

## 5. Mise en service

1. Créer un bot Telegram via **@BotFather** → récupérer le token.
2. Renseigner dans `.env` (jamais committé) :
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...        # ton chat perso avec le bot
   ```
3. Lancer le worker + MasterNav :
   ```
   python run.py                 # boucle des 14 agents
   python -m navlys_core.masternav   # bot d'écoute Telegram (long-polling)
   ```
   (ou les deux en services systemd sur Hetzner — voir README §Hetzner)

## 6. Routines automatiques

Les tâches récurrentes sont créées seules par cron (`sql/routines_cron.sql`),
sans intervention de Bruno. Voir ce fichier pour la liste et la fréquence.
