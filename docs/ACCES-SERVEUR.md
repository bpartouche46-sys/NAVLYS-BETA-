# 🔑 ACCÈS AU SERVEUR CENTRAL (SSH) — connecter un nouvel ordinateur

> Situation : le serveur Hetzner (« core central ») ne répond pas depuis le **nouvel
> ordinateur**, mais l'**ancien** sait encore se connecter.
> Cause la plus probable : la **clé SSH** (fichier secret d'accès) est sur l'ancien PC
> et pas sur le neuf.
>
> 🔐 Aucun secret (clé privée, IP, mot de passe) ne doit être écrit dans ce dépôt.
> Ce document explique la marche à suivre ; les vraies valeurs restent chez vous.

---

## Idée générale (en clair)
Une connexion SSH par clé fonctionne avec **2 fichiers** :
- une **clé privée** (secrète, reste sur VOTRE ordinateur) ;
- une **clé publique** (à déposer sur le serveur, dans `~/.ssh/authorized_keys`).

Le serveur autorise tout ordinateur dont la **clé publique** est dans sa liste.
Donc, pour connecter le nouvel ordinateur, on lui crée **sa propre clé** et on ajoute
sa **clé publique** sur le serveur. (Méthode propre et sûre : chaque PC a sa clé.)

---

## ✅ Méthode recommandée : donner au NOUVEAU PC sa propre clé

### Étape 0 — Vérifier que le serveur va bien (depuis l'ANCIEN PC)
Ouvrez un terminal sur l'ancien ordinateur et connectez-vous comme d'habitude :
```bash
ssh UTILISATEUR@IP_DU_SERVEUR
```
- Si ça marche → le serveur tourne, le problème est bien l'accès du nouveau PC.
- Notez bien la commande exacte (UTILISATEUR + IP) : on en aura besoin.
- Tapez `exit` pour ressortir.

### Étape 1 — Créer une clé sur le NOUVEL ordinateur
Sur le nouvel ordinateur, ouvrez le terminal :
- **Windows** : application « Terminal » ou « PowerShell ».
- **Mac** : application « Terminal ».

Puis :
```bash
ssh-keygen -t ed25519 -C "nouveau-pc-navlys"
```
Appuyez sur **Entrée** à chaque question (emplacement par défaut, sans phrase de passe
pour commencer). Cela crée deux fichiers dans le dossier `.ssh`.

### Étape 2 — Afficher et copier la clé PUBLIQUE du nouveau PC
```bash
# Mac / Linux :
cat ~/.ssh/id_ed25519.pub
# Windows (PowerShell) :
type $env:USERPROFILE\.ssh\id_ed25519.pub
```
Cela affiche une ligne qui commence par `ssh-ed25519 ...`. **Sélectionnez-la et copiez-la.**
Envoyez-la-vous (par e-mail à vous-même, par exemple) pour l'avoir sur l'ancien PC.

### Étape 3 — Autoriser cette clé sur le serveur (depuis l'ANCIEN PC)
Sur l'ancien ordinateur, connectez-vous au serveur :
```bash
ssh UTILISATEUR@IP_DU_SERVEUR
```
Puis, une fois sur le serveur, ajoutez la clé publique du nouveau PC (collez la ligne
copiée à l'étape 2 à la place de `COLLER_ICI`) :
```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "COLLER_ICI_LA_CLE_PUBLIQUE_DU_NOUVEAU_PC" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```
Tapez `exit` pour ressortir.

### Étape 4 — Tester depuis le NOUVEL ordinateur
```bash
ssh UTILISATEUR@IP_DU_SERVEUR
```
✅ Si vous entrez sur le serveur, c'est gagné : le nouvel ordinateur est connecté.

---

## 🆘 Si le serveur ne répond MÊME PAS depuis l'ancien PC
Alors le souci n'est pas la clé. Vérifier dans l'ordre :
1. **Statut du serveur** sur https://console.hetzner.cloud (Running 🟢 ou éteint 🔴 ?).
   S'il est éteint → bouton **Power** pour le rallumer.
2. **L'IP du serveur a-t-elle changé ?** (visible dans la console Hetzner).
3. **Pare-feu / Firewall** Hetzner : le port SSH (22) est-il autorisé ?
4. Me prévenir avec ce que vous voyez → on diagnostique ensemble.

---

## 🔁 Méthode de secours (plus simple mais moins propre)
Si créer une clé est trop compliqué : copier le **dossier `.ssh` entier** de l'ancien PC
vers le nouveau (clé USB). Ça transporte la clé privée existante.
⚠️ Moins recommandé (on déplace un fichier secret), mais ça fonctionne. À n'utiliser
que si la méthode propre bloque, et à supprimer la copie sur la clé USB ensuite.
