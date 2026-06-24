# 💾 SAUVEGARDE CLOUDS → CORE (Hetzner) — runbook rclone

> But : rapatrier **tout ce qui concerne le projet** depuis **Google Drive**, **Dropbox**
> et **OneDrive** (compte `bpartouche46@gmail.com`) vers le **volume 10 Go** du serveur
> Hetzner (`/mnt/navlys-backup`). Méthode cloud → core, **PC peut être éteint**.
>
> 🔐 Aucun secret ici. Les jetons d'accès rclone restent **sur le serveur**, hors Git.
> ⚙️ À exécuter **sur le serveur** (par Bruno en SSH, ou un opérateur de confiance à
> redéfinir — ex-Hermès retiré, ERR-005). Claude n'a pas cet accès.

---

## ⚠️ Avant de commencer — 2 vérifs
1. **Le volume est monté** : `df -h /mnt/navlys-backup` doit afficher ~9,8 Go.
2. **Ça doit tenir dans 10 Go.** Si Drive + Dropbox + OneDrive (partie projet) dépasse
   10 Go, il faudra **agrandir le volume** ou **trier**. Voir l'estimation à l'étape 4.

---

## 1. Installer rclone (une fois)
```bash
sudo -v ; curl https://rclone.org/install.sh | sudo bash
rclone version   # vérifie l'installation
```

## 2. Connecter chaque cloud (login web — une fois par cloud)
Sur un **serveur sans navigateur**, rclone utilise le mode « headless » : il affiche une
**commande à lancer sur un PC qui a un navigateur** (ton ancien PC), tu autorises, et tu
**recolles le jeton** sur le serveur.

```bash
rclone config
```
Pour CHAQUE cloud, répondre :
- `n` (new remote) → **nom** du remote : `gdrive`, puis `dropbox`, puis `onedrive`
- **type** : Google Drive / Dropbox / OneDrive (Microsoft) selon le cas
- client_id / secret : laisser **vide** (défaut)
- scope Google Drive : `1` (accès complet) ou `2` (lecture seule, suffisant pour sauvegarder)
- **« Use auto config? »** → **`n`** (serveur sans navigateur)
- rclone affiche une commande `rclone authorize "..."` → la lancer **sur le PC** (avec rclone
  installé) → se connecter au bon compte → **copier le jeton** affiché → le **coller** sur le serveur
- OneDrive : choisir le type de compte **Personal**
- confirmer `y`, puis `q` pour quitter

Vérifier que les 3 remotes répondent :
```bash
rclone lsd gdrive:    ;  rclone lsd dropbox:    ;  rclone lsd onedrive:
```

## 3. (Recommandé) Repérer ce qui concerne le projet
On ne sauvegarde que le **projet**, pas toute la vie privée. Repérer les dossiers utiles :
```bash
rclone lsd gdrive:     # liste les dossiers racine de Google Drive
rclone lsd dropbox:
rclone lsd onedrive:
```
Noter les dossiers à prendre (ex. `NAVLYS`, `navlys-central`, `sites`, etc.).

## 4. Estimer la taille AVANT de copier (éviter de saturer les 10 Go)
```bash
rclone size gdrive:NAVLYS
rclone size dropbox:NAVLYS
rclone size "onedrive:Documents/NAVLYS"
```
Additionner. Si > ~9 Go → agrandir le volume Hetzner ou réduire la sélection.

## 5. Copier vers le volume (chaque cloud dans son sous-dossier)
`copy` n'écrase rien d'inutile et ne supprime rien à la source. `-P` montre la progression.
```bash
rclone copy gdrive:NAVLYS            /mnt/navlys-backup/gdrive   -P
rclone copy dropbox:NAVLYS           /mnt/navlys-backup/dropbox  -P
rclone copy "onedrive:Documents/NAVLYS" /mnt/navlys-backup/onedrive -P
```
> Pour tout prendre d'un cloud (à n'utiliser que si la taille tient) : remplacer le dossier
> par la racine, ex. `rclone copy gdrive: /mnt/navlys-backup/gdrive -P`.

## 6. Vérifier
```bash
du -sh /mnt/navlys-backup/*       # taille par cloud
ls -R /mnt/navlys-backup | head   # aperçu du contenu
```

---

## Instruction courte à passer à l'opérateur serveur (à redéfinir)
> « Installe rclone sur navlys-core. Configure 3 remotes (gdrive, dropbox, onedrive,
> compte bpartouche46@gmail.com, mode headless). Estime la taille des dossiers projet
> (`rclone size`). Si ça tient dans le volume 10 Go monté sur /mnt/navlys-backup, copie
> chaque cloud dans son sous-dossier (`/mnt/navlys-backup/gdrive|dropbox|onedrive`) avec
> `rclone copy -P`. Ne supprime rien à la source. Rends un compte-rendu des tailles + du
> contenu copié. Les jetons restent sur le serveur, jamais dans Git. »

## Après coup
- [ ] Mettre à jour `docs/ETAT-DES-LIEUX.md` (ce qui est sauvegardé + tailles).
- [ ] Penser à inclure aussi les dossiers du **Bureau** (Desktop) → via WinSCP/rsync depuis le PC
      (le Bureau n'est pas dans un cloud, donc rclone ne le voit pas).
