# 💾 SAUVEGARDE DU CORE CENTRAL (serveur Hetzner) — Mode d'emploi

> Objectif n°1 : **mettre l'existant en sécurité AVANT toute modification.**
> Le « core central » contient **tout** (base de données, API/back-end, sites, back-office).
> On le protège en **3 niveaux**, du plus simple au plus complet.
>
> 🔒 Règle absolue : **aucun de ces scripts ne supprime ni ne modifie quoi que ce soit.**
> Ils ne font que **copier** vers des archives. Et aucun mot de passe / IP / clé n'est
> écrit dans ce dépôt Git.

---

## 🥇 Niveau 1 — Le filet de sécurité IMMÉDIAT : un snapshot Hetzner (5 min, zéro risque)

C'est **le plus important** et le plus simple. Un « snapshot » est une photo complète
du serveur entier (système + données + sites) à un instant T. Si quelque chose casse
plus tard, on remet ce snapshot et tout revient comme avant.

1. Connectez-vous à la **console Hetzner Cloud** : https://console.hetzner.cloud
2. Ouvrez votre serveur (le projet → le serveur du « core central »).
3. Onglet **« Snapshots »** → bouton **« Take snapshot »**.
4. Nommez-le clairement, par ex. : `navlys-core-AVANT-modifs-2026-06-19`.
5. Attendez que le statut passe à « disponible ».

✅ À partir de là, vous avez un point de retour complet. **Faites ça avant toute autre chose.**

> 💡 Activez aussi les **Backups automatiques** Hetzner (onglet « Backups » du serveur,
> quelques € / mois) : sauvegardes quotidiennes automatiques. Fortement recommandé.

---

## 🥈 Niveau 2 — Sauvegarder les données + le code dans des archives (script fourni)

Ce niveau crée des fichiers de sauvegarde **téléchargeables** (base de données + fichiers).
Utile pour garder une copie hors du serveur et pour pouvoir restaurer finement.

### Étapes
1. Connectez-vous au serveur en SSH (comme d'habitude) :
   ```bash
   ssh votre_utilisateur@IP_DU_SERVEUR
   ```
2. Copiez le script `scripts/backup.sh` de ce dépôt sur le serveur (ou collez son contenu
   dans un fichier `backup.sh`).
3. Rendez-le exécutable et lancez-le :
   ```bash
   chmod +x backup.sh
   ./backup.sh
   ```
4. Le script crée un dossier horodaté `navlys-backup-AAAA-MM-JJ_HHhMM/` contenant :
   - les **dumps de base de données** (PostgreSQL et/ou MySQL détectés),
   - une **archive des fichiers/sites/configs**,
   - un fichier `INFOS.txt` décrivant le contenu.
5. **Téléchargez** l'archive sur votre ordinateur (depuis votre PC, pas depuis le serveur) :
   ```bash
   scp votre_utilisateur@IP_DU_SERVEUR:~/navlys-backup-*.tar.gz .
   ```

> Le script vous **pose des questions** et **ne touche à rien** : il lit et copie, c'est tout.

---

## 🥉 Niveau 3 — Mettre le CODE sous Git (versionné, pour pouvoir le modifier proprement)

Pour qu'on puisse modifier vos sites **sans jamais reperdre le fil**, le code doit vivre
dans ce dépôt. Une fois la sauvegarde faite, on rapatrie le code (pas les données ni les
secrets) ici.

Depuis **votre ordinateur** (qui a accès SSH au serveur) :
```bash
# Exemple : récupérer le dossier des sites depuis le serveur vers une copie locale
rsync -avz --exclude '.env' --exclude 'node_modules' \
  votre_utilisateur@IP_DU_SERVEUR:/chemin/vers/le/code/ ./code-importe/
```
Puis on range ce code dans le dépôt, on vérifie qu'aucun secret n'est dedans, et on commite.

> ⚠️ **Ne jamais** committer : `.env`, mots de passe, clés SSH, certificats. Le `.gitignore`
> les bloque déjà, mais on revérifie avec l'agent **gardien** (`/controle`) avant chaque push.

---

## ✅ Récapitulatif de l'ordre à suivre
1. **Snapshot Hetzner** (Niveau 1) — tout de suite, c'est le filet.
2. **Script de sauvegarde** (Niveau 2) — archives données + fichiers, téléchargées.
3. **Code sous Git** (Niveau 3) — pour pouvoir modifier proprement ensuite.
4. Seulement **après**, on commence à modifier — toujours via `/controle`.
