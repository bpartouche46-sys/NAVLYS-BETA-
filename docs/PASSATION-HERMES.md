# Passation Hermès → NAVLYS (archivage) — 2026-06-23

> Reçu de **Hermès** (agent séparé, LLM via OpenRouter, qui avait l'accès Hetzner) via Bruno,
> avant retrait d'Hermès. Consolidé ici par Claude (agent IA unique désormais).
> 🔐 Règle d'or : **aucune valeur de secret ni IP** n'est écrite ici. Mots de passe / clés /
> IP remplacés par des repères. Le serveur Hetzner est noté `<SERVEUR>`.

## 1. Installé par Hermès sur le serveur Hetzner

fail2ban · Docker · PM2 (process Node) · certbot (SSL installé, **aucun certificat actif**) ·
Nginx (sert le cockpit + previews) · structure `/root/navlys/` · **7 repos GitHub clonés** ·
18 fichiers « skills » · cockpit web `/var/www/cockpit/` · passe compliance (CIF/ORIAS/Ashkelon
retirés des fichiers) · rebranding **NOVA → NAVLYS** · palette `#7DD3FC`.

## 2. Doit rester allumé
- **Nginx** → cockpit + previews.
- **fail2ban** → protège le SSH (7 IP bannies à sa dernière vérif).
- **PM2** → si des process Node tournent (à vérifier).
- **Docker** → installé, **aucun conteneur actif confirmé** (cohérent avec le diagnostic du 22/06).

## 3. Sauvegardes / cron — 🔴 RISQUE
- Hermès : **ZÉRO cron, aucune sauvegarde planifiée.**
- **AUCUN backup automatique** → si le serveur plante, on perd le **cockpit + fichiers locaux**
  (les repos sont sauvés sur **GitHub**, eux). **Priorité : mettre en place des backups.**

## 4. Cockpit
- Quoi : tableau de bord web de suivi NAVLYS.
- Chemin : `/var/www/cockpit/` · URL : `http://<SERVEUR>/cockpit/` (**HTTP = non sécurisé**).
- Login : `bruno / [MOT DE PASSE — À CHANGER, exposé en clair]`.
- Pages : `/cockpit/` (dashboard 6 onglets) · `/cockpit/prompts-claude.html` (10 prompts) ·
  `/cockpit/guide-bruno.html` (rôles) · `/cockpit/securite-gardefous.html` (sécurité financière).
- ⚠️ Server-local → **non sauvegardé** ; à rapatrier dans GitHub si on veut le garder.

## 5. Mémoire
- **Hermès** : mémoire dans l'app Hermès (15 skills + mémoire persistante), **rien sur le serveur**
  → si Hermès part, **cette mémoire disparaît** sauf ce présent archivage. ✅ archivé ici.
- **Claude** : clone du repo `NAVLYS-BETA-` sur le serveur (`/root/navlys/NAVLYS-BETA-/…`),
  **source de vérité = GitHub** (CLAUDE.md + docs + sessions). 🟢 sûr.

## 6. Code source / déploiement
- 7 repos clonés sur le serveur : **NOVA-HUB**, **NAVLYS-BETA-**, Ai-Suite-PRO, gdp-dashboard (×3), NOVA-HUB-1.
- **Vercel** : 6 projets (sites publics). Méthode : **push GitHub → déploiement auto Vercel**.
- Previews aussi servies localement : `http://<SERVEUR>/navlys/`, `http://<SERVEUR>/bruno/`.

## 7. Médias
- Pas d'info précise. **À vérifier** sous `/root/navlys/` (les vidéos/images sources ?).

## 8. Secrets (LISTE seulement — valeurs détenues par Bruno, hors dépôt)
- Emplacement prévu : `/root/navlys/config/.env`.
- Clés citées : `ELEVENLABS_KEY`, `WHATSAPP_360DIALOG_KEY`, `GITHUB_TOKEN`, clés brokers affiliés,
  (possiblement `VERCEL_TOKEN`, `SUPABASE_KEY`). **Valeurs = Bruno uniquement.**

## 9. En cours (commencé, pas fini)
- Système 5 agents départementaux (planifié, non déployé).
- Pipeline auto-réponse mail/WhatsApp/SMS (planifié, non déployé).
- **NOVA ONE** (app Windows) — en cours côté Claude.
- SSL/HTTPS sur le cockpit (certbot installé, **certificat non généré**).
- Connexions ElevenLabs + 360dialog + Telegram (non faites).
- Supabase (en pause).
- Pages manquantes : tarifs, journal, espace membre.

## 10. Si Hermès disparaît — ce qui continue / ce qui casse
- **Continue seul** : sites Vercel (déploiement auto via GitHub) ; cockpit (tant que le serveur tourne).
- **Casse / non surveillé** (deviennent la responsabilité de **Bruno**, guidé par Claude) :
  espace disque, certificats SSL, mises à jour sécurité, état de fail2ban, **et surtout AUCUN backup**.
- **À surveiller** : facture Hetzner (mensuelle), facture Vercel, état serveur (Hetzner console),
  cockpit qui répond (sinon = problème).

## Conclusion — retrait d'Hermès : faisable proprement
- ✅ **Zéro cron / zéro automatisation Hermès** → le retirer **ne casse rien d'automatique**.
- ✅ **Source de vérité = GitHub** (repos + cette mémoire) → l'essentiel est déjà sauvé.
- 🔴 **Avant de souffler** : (1) **backups** du serveur, (2) **changer le mot de passe cockpit**
  + **SSL** (ou fermer l'accès public), (3) reprendre la **surveillance** (disque/SSL/maj/factures).
- 🟡 À rapatrier dans GitHub si on veut les garder : **cockpit** + **18 skills** + vérifier **médias**.
