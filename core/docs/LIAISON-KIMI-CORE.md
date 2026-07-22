# Liaison Kimi ↔ NAVLYS CORE — mode d'emploi

> Mise en place le 2026-07-16. Canaux : **1 GitHub · 2 HTTP /health · 3 Tunnel Cloudflare · 4 Bus Supabase**.
> Règle d'or inchangée : **argent + prod = feu vert de Bruno, toujours.**

## Architecture

```
   (1) GitHub   issue [CORE-TASK] / label "core-task"  ──────────────┐
                                                                    ▼
   (4) Supabase  navlys_tasks  ◄──── sync (dédup) ────  VPS Hetzner : boucle runner.ts (60 s)
                      │                                                │
                      └────────── exécute (garde-fous actifs) ──► navlys_audit ──► lu par Kimi
                 (2)(3) GET /health /status  ◄── tunnel Cloudflare (HTTPS, sans ouvrir le firewall)
```

## Canal 1 — GitHub (tâches par issues)
- Créer une issue dont le **titre commence par `[CORE-TASK]`** ou avec le **label `core-task`**.
- Le corps de l'issue = l'instruction exécutée par le core.
- Labels optionnels : `p1`/`p3` (priorité), `feu-vert-requis` (mise en attente, jamais exécutée).
- Le résultat arrive dans `navlys_audit` ; la tâche passe à `done` / `erreur` / `attente_feu_vert`.

## Canal 2/3 — Sonde HTTP via tunnel Cloudflare
- Le core expose `GET /health` et `GET /status` sur `127.0.0.1:8788` (jamais sur le firewall).
- Le tunnel Cloudflare publie ces deux routes en HTTPS (ex. `https://core.navlys.com/health`).
- Le **token du tunnel est stocké dans `navlys_secrets`** (clé `CLOUDFLARE_TUNNEL_TOKEN`), jamais dans Git.
- Activer sur le VPS : `sudo cloudflared service install <token>` (une seule commande).
- Pré-requis DNS : ajouter la zone navlys.com au compte Cloudflare pour router le hostname.

## Canal 4 — Bus Supabase (navlys_tasks / navlys_audit)
Tables déjà créées dans le projet `navlys-core` — rien à migrer.
- **Déposer une tâche** (Kimi ou tout outil avec la clé service) :
  `INSERT INTO navlys_tasks (titre, contenu) VALUES ('Ma tâche', '{"instruction":"..."}');`
- **Lire les résultats** : `SELECT * FROM navlys_audit ORDER BY created_at DESC LIMIT 20;`
- `feu_vert_requis = true` ⇒ le core met la tâche en `attente_feu_vert` et n'exécute rien.

## La boucle auto-récursive (runner.ts)
Toutes les 60 s (`POLL_INTERVAL_MS`) :
1. Sync GitHub → nouvelles tâches (dédup par n° d'issue)
2. Exécute jusqu'à 3 tâches `a_faire` (priorité puis ancienneté)
3. Erreur de cycle → audit + backoff (jusqu'à 10 min), jamais de crash définitif

## Installation serveur (une fois)
```bash
cd /opt/navlys && git clone <repo> .        # ou git pull si déjà cloné
cd core && cp .env.example .env              # remplir les VRAIES valeurs ici
sudo bash deploy/install.sh                  # deps → build → tests → systemd
crontab -e                                   # coller deploy/crontab.snippet (supervision)
```

## Sécurité (rappel)
- Les garde-fous (`forbidden.ts`) contrôlent CHAQUE tâche : conformité, argent, prod, destructif.
- `bypassPermissions` est refusé au niveau config, quoi qu'il arrive.
- Aucun secret dans Git ; `.env` reste sur le serveur ; token tunnel dans `navlys_secrets`.
