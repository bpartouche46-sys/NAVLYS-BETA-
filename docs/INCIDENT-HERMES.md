# 🚨 INCIDENT DE SÉCURITÉ — Hermès retiré (hack / risque majeur)

> **Date** : 2026-06-24 · **Décision Bruno** : Hermès supprimé, **sorti du projet**, **tous
> ses accès révoqués**. · **Réf. journal** : `ERR-005`.
>
> Hermès = ancien « opérateur ops » (LLM via **OpenRouter** + **accès SSH Hetzner** + a touché
> GitHub/Vercel/cockpit/clouds). Considéré désormais comme **non fiable / compromis**.
> Hypothèse de travail prudente : **il a pu connaître ou détenir des accès** → on **révoque
> et on rotationne tout** ce qu'il a pu approcher. On ne se demande pas « est-ce sûr ? » → on coupe.

---

## ⚠️ Ce que Claude a fait (côté dépôt) vs ce que TOI seul peux faire

- ✅ **Côté GitHub (fait par Claude)** : toutes les références à Hermès retirées du dépôt,
  ordre de mission supprimé, clé OpenRouter retirée de la config, incident journalisé.
  → **Dans le dépôt, Hermès n'a plus aucun rôle ni aucune présence.**
- 🔴 **Côté accès réels (TOI seul, Claude n'y a pas accès)** : révoquer/rotationner les clés
  et accès sur Hetzner, OpenRouter, **Anthropic**, GitHub, Vercel, clouds. **La liste ci-dessous.**

---

## 📍 Surface d'accès RÉELLE d'Hermès (d'après `docs/PASSATION-HERMES.md`)

> Source : la passation archivée d'Hermès lui-même. C'est **la liste exacte** à révoquer.

- **Cerveau** : **OpenRouter** (PAS une clé Anthropic directe — voir encadré « clé API » plus bas).
- **Serveur Hetzner** : accès complet (a tout installé) — **SSH**, **cockpit** `/var/www/cockpit/`
  (`bruno / [mot de passe exposé]`, en **HTTP non sécurisé**).
- **GitHub** : **`GITHUB_TOKEN`** + **7 repos clonés** sur le serveur (NOVA-HUB, NAVLYS-BETA-,
  Ai-Suite-PRO, gdp-dashboard ×3, NOVA-HUB-1) → **le token est l'accès le plus dangereux** (push de code).
- **Secrets dans `/root/navlys/config/.env`** : `ELEVENLABS_KEY`, `WHATSAPP_360DIALOG_KEY`,
  `GITHUB_TOKEN`, **clés brokers affiliés**, possiblement `VERCEL_TOKEN`, `SUPABASE_KEY`.
- ✅ **Bonne nouvelle (réduit le risque de casse)** : Hermès avait **ZÉRO cron / zéro
  automatisation** → le retirer **ne casse rien d'automatique**. Source de vérité = **GitHub**.

> 🤖 **« Sa clé API pour t'appeler (toi, Claude) »** — précision honnête : Hermès tournait sur
> **OpenRouter**, pas sur une clé Anthropic directe. Donc **révoquer la clé OpenRouter coupe son
> accès aux modèles** (y compris si Claude était routé via OpenRouter). S'il existait **en plus**
> une clé Anthropic dédiée à Hermès, révoque-la aussi (§A). **Le `GITHUB_TOKEN` reste le plus
> urgent** (il pouvait pousser du code).

---

## 🔑 CHECKLIST DE RÉVOCATION — coche chaque ligne (le cœur de l'incident)

### A. 🤖 Accès d'Hermès à **Claude / Anthropic** (ta demande explicite)
- [ ] **Anthropic Console** (console.anthropic.com → *API Keys*) : **révoquer** toute clé
      `sk-ant-…` qu'Hermès a pu détenir/utiliser (celle qui lui permettait de m'appeler).
- [ ] Vérifier la **consommation / facturation** Anthropic (usage anormal ?) → si oui, signe d'abus.
- [ ] **Créer une NOUVELLE clé dédiée au core uniquement** (S4) — différente de toute clé
      qu'Hermès a connue. C'est cette clé que mettra le moteur (`core/.env`).
- [ ] Vérifier qu'**aucune autre intégration** (OpenRouter, proxy) ne route vers Claude avec
      une clé partagée par Hermès.

### B. 🧠 OpenRouter (le « cerveau » d'Hermès)
- [ ] **Révoquer** la clé OpenRouter d'Hermès (dashboard OpenRouter → Keys).
- [ ] Vérifier l'usage/facturation OpenRouter (abus ?). Couper tout crédit/limite.

### C. 🖥️ Serveur Hetzner (Hermès avait l'accès SSH — priorité haute)
- [ ] **Retirer sa clé SSH** de `~/.ssh/authorized_keys` (tous les users : root + autres).
- [ ] **Lister les utilisateurs** du système (`cat /etc/passwd`) → supprimer tout compte
      inconnu/ajouté par Hermès.
- [ ] **Chercher des portes dérobées** : `crontab -l` (tous users) + `/etc/cron.*` +
      `systemctl list-units --type=service` → supprimer tâches/services non reconnus.
- [ ] Vérifier les **clés SSH ajoutées**, les **ports ouverts** (`ss -tulpn`), `fail2ban`,
      les **dernières connexions** (`last`, `/var/log/auth.log`) → traces d'accès suspect.
- [ ] **Changer le mot de passe root** + **mot de passe du cockpit** (déjà signalé exposé).
- [ ] Si doute sérieux : **rebuild propre depuis un snapshot sain** > tenter de « nettoyer ».
- [ ] **Rotationner TOUS les secrets stockés sur le serveur** (fichiers `.env`, tokens) —
      Hermès a pu les lire. Voir `docs/SECRETS-ET-CLES.md`.

### D. 🐙 GitHub (Hermès avait un `GITHUB_TOKEN` + 7 repos clonés — ACCÈS LE PLUS DANGEREUX)
- [ ] 🔴 **Révoquer le `GITHUB_TOKEN` d'Hermès** (Settings → Developer settings → Tokens) — il
      pouvait **pousser du code** sur tes 7 repos (NOVA-HUB, NAVLYS-BETA-, etc.).
- [ ] ✅ **Vérifié par Claude** : sur `navlys-beta-`, **seul Bruno est collaborateur (admin)** —
      aucun compte tiers. À re-vérifier de même sur **NOVA-HUB** et les autres repos.
- [ ] **Personal Access Tokens / OAuth apps / Deploy keys** → révoquer ceux liés à Hermès.
- [ ] **SSH keys** du compte GitHub utilisé → retirer celles de l'ancien PC / d'Hermès.
- [ ] Activer/contrôler le **secret scanning** ; vérifier qu'aucun secret n'a été poussé.

### E. ▲ Vercel (Hermès utilisait le CLI)
- [ ] **Tokens** Vercel (Account → Tokens) → révoquer ceux d'Hermès.
- [ ] **Membres de l'équipe NAVLYS** → retirer tout accès tiers non voulu.
- [ ] Vérifier les **déploiements récents** (rien de non autorisé mis en prod ?).

### F. ☁️ Clouds & autres (Hermès configurait rclone : gdrive / dropbox / onedrive)
- [ ] **Révoquer les autorisations rclone/OAuth** côté Google / Dropbox / OneDrive (apps connectées).
- [ ] **Supabase** : si Hermès a connu la clé `service_role` → **la régénérer** (Project → API).
- [ ] **Stripe / PayPal** : par prudence, vérifier qu'aucune clé n'a fuité ; sinon rotationner.
- [ ] **2FA partout** (Hetzner, Anthropic, GitHub, Vercel, Google, Stripe) → activer/vérifier.

---

## ✅ Vérification finale (quand tout est coché)
- [ ] Plus **aucune** clé/accès actif rattaché à Hermès (Anthropic, OpenRouter, SSH, GitHub, Vercel, clouds).
- [ ] **Nouvelles clés** créées (dédiées, moindre privilège) là où c'était nécessaire.
- [ ] Logs serveur **propres** (pas d'accès suspect en cours).
- [ ] Cocher dans `docs/ETAT-DES-LIEUX.md` : « Révocation Hermès faite le JJ/MM » (le **fait**, pas les valeurs).

> 📌 **Ne colle aucune valeur de clé ici.** Ce fichier ne contient que des **actions à faire**.
> Réutilisable comme **procédure de sortie** de tout intervenant à l'avenir.

---

## 🧱 Garde-fou permanent (pour ne pas revivre ça — ERR-005)
- 🔴 **Aucun intervenant externe ne cumule** « cerveau IA + accès serveur + clé API Claude ».
- 🔑 **Tout accès tiers = révocable en 1 geste**, scope **minimal**, **rotation immédiate** au moindre doute.
- 🤖 Le futur opérateur du core sera **bridé par le moteur** (liste blanche d'outils, hooks
  PreToolUse, `bypassPermissions` interdit), **jamais « de confiance par défaut »**.
