# NAVLYS — Point complet du projet (état au 16 juillet 2026)
> Document de continuité. Il permet de reprendre le projet avec Kimi en 2 minutes, même après archivage de la conversation.

---

## 1. Le projet en une phrase
NAVLYS : une IA **100 % voix, par téléphone**, qui pilote toutes tes apps — lancement public **1er août 2026** sur navlys.com. Marché : **Europe uniquement** (décision du 16/07 — Inde et Chine mis en sommeil).

## 2. Roadmap validée
1. **France/Europe** — lancement 1er août (priorité absolue)
2. **Site dédié hébreu (RTL)** — SEULEMENT quand le site FR est 100 % stable : design final + voix bien réglées. Site séparé, pas un simple toggle de langue.
3. Inde (T3+ ?) et Chine (2027 ?) — en sommeil, decks déjà rédigés et archivés dans le repo (`sites/international/`)

## 3. Ce qui est FAIT ✅
| Quoi | Où | Référence |
|---|---|---|
| Audit complet du site (11 problèmes trouvés) | navlys.com | 4 corrigés depuis : og:image, favicon, liens légaux, mention 18+ |
| Pont Kimi↔Core (4 canaux + boucle 60 s) | GitHub | **PR #208** (branche `feat/kimi-core-bridge`) — 32/32 tests OK, build OK |
| Issue de test du canal GitHub | GitHub | **Issue #209** `[CORE-TASK]` |
| Bus de tâches | Supabase projet `navlys-core` (id `hhrlgyvtqluxpywjiwkd`) | `navlys_tasks` #1 (test) + `navlys_audit` #1 (activation) |
| Tunnel Cloudflare `navlys-core` | Cloudflare (compte Bruno@navlys.com) | id `d2a945c2-c4d4-4ef2-8109-eef9a3354ee9` — **token dans `navlys_secrets`** (clé `CLOUDFLARE_TUNNEL_TOKEN`) |
| Pack déploiement serveur | GitHub (PR #208) | `core/deploy/` : service systemd + install.sh + crontab.snippet |
| Decks Inde + Chine | GitHub | **PR #210** (branche `feat/i18n-india-china`) — en attente, pas urgente |
| Naming international | — | Monde/Inde : NAVLYS · Chine : 声航 Shēngháng (domaines `shenghang.ai`, `navlys.cn`, `navlys.ai` libres au 16/07) |

## 4. Ce qui RESTE à faire 🔴 (ordre de priorité)
1. **Numéro WhatsApp réel** — tous les boutons du site pointent vers un faux numéro (wa.me/15559913239, 7 occurrences). Bloque tous les clients.
2. **Prix TTC** — affichés HT actuellement (7×) ; obligatoire TTC pour consommateurs EU. Cible : 0 / 11,99 / 35,99 / 59,99 € TTC.
3. **Compteur MEGA POT aléatoire** — le chiffre monte tout seul (5× `Math.random`) ; remplacer par un chiffre d'exemple fixe, clairement étiqueté.
4. **Merger PR #208** + déployer le core sur le VPS Hetzner :
   ```bash
   cd /opt/navlys && git pull && cd core && cp .env.example .env  # remplir les clés SUR LE SERVEUR
   sudo bash deploy/install.sh
   crontab -e   # coller deploy/crontab.snippet
   sudo cloudflared service install <CLOUDFLARE_TUNNEL_TOKEN depuis navlys_secrets>
   ```
5. Ajouter la zone **navlys.com dans Cloudflare** → ensuite Kimi crée la route `https://core.navlys.com/health`.
6. Réserver les domaines `navlys.ai` / `navlys.cn` / `shenghang.ai` (~30 €/an, anti-squat) + dépôt marque Chine le jour où la Chine redevient d'actualité.
7. **Site hébreu** (phase 2) : design RTL complet, voix hébreu à tester, paiement/taxe locaux — à ouvrir uniquement quand FR = 100 %.

## 5. Règles gravées du projet
- **Oui par défaut** : Kimi exécute sans redemander, puis rend compte (décision Bruno 16/07).
- **Exception unique** : argent + mise en prod = feu vert de Bruno à chaque fois (GOUVERNANCE §3).
- Conformité : jamais de conseil en investissement, jamais de promesse de gains, 18+, disclaimers visibles.

## 6. Reprendre avec Kimi après archivage (2 minutes)
Ouvre un nouveau chat et colle simplement ce message :
> « On reprend NAVLYS. Lis le fichier docs/ETAT-PROJET-KIMI.md du repo NAVLYS-BETA- et redis-moi où on en est. Focus Europe, hébreu en phase 2. Oui par défaut, sauf argent et prod = mon feu vert. »

Ce qui survit à l'archivage du chat : **GitHub (PRs, issues, code), Supabase (bus, secrets), Cloudflare (tunnel), ce document.**
Ce qui ne survit pas : le cron quotidien du chat (à recréer en une phrase : « recrée le point quotidien NAVLYS à 8 h »).
