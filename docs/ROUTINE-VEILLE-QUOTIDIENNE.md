# 🔁 ROUTINE DE VEILLE QUOTIDIENNE — autonome, HORS token Claude

> Demande de Bruno (2026-06-24) : la veille (ex. prix concurrents) doit tourner **chaque
> jour, toute seule, comme un programme** sur le serveur — **sans consommer de tokens Claude**.

## L'idée en 1 phrase
Un petit **programme** (`scripts/veille_navlys.py`) tourne **chaque matin sur ton core Hetzner**
grâce à un **minuteur (cron)**. Il vérifie les concurrents et écrit le résumé dans ta base
(`daily_brief`). **Claude n'est pas appelé → 0 token, 0 dépendance à moi.**

## Pourquoi c'est « hors token Claude »
Le programme est du **Python pur** (aucune IA dedans). Il lit des pages web et enregistre un
résumé. Donc il ne te coûte **rien en tokens**. *(Si un jour tu veux un résumé « intelligent »,
on pourra brancher un petit modèle pas cher via **OpenRouter** — toujours hors tokens Claude.)*

## Ce que fait le programme chaque jour
1. Visite les pages prix de : Snowball+, Finary, Finimize, Seeking Alpha (liste extensible).
2. Repère les prix affichés (best-effort) et **détecte si une page a changé** depuis la veille (🔔).
3. Écrit un résumé daté dans **Supabase `daily_brief`** (et l'affiche dans les logs).

## Mettre en place (sur le core, par Bruno — Claude n'a pas l'accès serveur)
1. **Copier** `scripts/veille_navlys.py` sur le serveur, ex. `/opt/navlys/veille_navlys.py`.
2. **Secrets en variables d'environnement** (jamais dans Git) :
   - `SUPABASE_URL` = l'URL du projet (https://hhrlgyvtqluxpywjiwkd.supabase.co)
   - `SUPABASE_SERVICE_KEY` = la **clé service** Supabase (secrète, côté serveur uniquement)
   - `VEILLE_STATE` (optionnel) = chemin du fichier mémoire, ex. `/opt/navlys/veille_state.json`
3. **Tester** une fois à la main :
   ```bash
   SUPABASE_URL="..." SUPABASE_SERVICE_KEY="..." python3 /opt/navlys/veille_navlys.py
   ```
4. **Planifier chaque jour à 6h30** (cron) :
   ```cron
   30 6 * * * SUPABASE_URL="..." SUPABASE_SERVICE_KEY="..." /usr/bin/python3 /opt/navlys/veille_navlys.py >> /var/log/navlys-veille.log 2>&1
   ```
   *(Astuce console Hetzner : elle peut manger le `>` au collage — taper les redirections à la main.)*

## Limites honnêtes (pour ne pas se mentir)
- L'extraction de prix est **best-effort** : certains sites chargent le prix en JavaScript →
  le programme affichera « non détecté » mais **détectera quand même un changement de page** (🔔).
- C'est une **veille / alerte de mouvement**, pas une étude parfaite. Pour une **vraie étude
  comparative** (analyse fine), on relance une étude ponctuelle (ça, oui, ça peut passer par moi).

## Étendre à d'autres routines (même principe, 0 token)
Même schéma pour : brief finance du jour (flux RSS), veille réglementaire (NavLex), suivi des
mentions NAVLYS, etc. → un script + un cron + écriture dans `daily_brief`/tables dédiées.
Tout reste **sur le core**, autonome.
