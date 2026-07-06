# 🛡️⚡ Hetzner — Sécurité & Performance de `navlys-core` (expert, clé en main)

> Cible : le serveur **navlys-core** (CPX32 · 4 vCPU · 8 Go · Ubuntu · Nuremberg).
> Objectif : **blindé** (sécurisé) et **rapide** (performant), sans rien casser.
> Tu copies-colles les blocs dans l'ordre, dans la **Console web** Hetzner
> (bouton « Console » du serveur) ou en SSH depuis ton PC. ~20 min, une fois.
>
> ⚠️ Depuis mon environnement, le port SSH (22) est bloqué par le proxy — je ne
> peux pas me connecter au serveur. Je te livre donc tout ici ; l'API Hetzner
> (HTTPS) me reste accessible si tu me donnes un **jeton API** (voir §9).

---

## 🥇 Les 3 gestes qui protègent 90 % — à faire EN PREMIER

### 1. Le Pare-feu Hetzner Cloud (gratuit, niveau réseau — LE plus important)
Dans la console : **Firewalls → Create Firewall**, puis attache-le à `navlys-core`.
Règles **Inbound** (entrée) — n'autorise QUE le strict nécessaire :

| Port | Source autorisée | Pourquoi |
|---|---|---|
| **22 (SSH)** | **TON IP perso uniquement** (ex. `x.x.x.x/32`) | personne d'autre ne peut tenter d'entrer |
| 80, 443 | `0.0.0.0/0` + `::/0` | seulement si le serveur sert un site (sinon **ne l'ouvre pas**) |
| ICMP | `0.0.0.0/0` | ping (optionnel) |

**Outbound** : laisse tout ouvert (le worker doit appeler Supabase/OpenRouter).
👉 Résultat : le serveur devient **invisible** sauf pour toi. C'est 90 % de la sécurité.
> Astuce : ton IP perso change ? Mets ta plage FAI, ou ouvre 22 le temps d'une
> intervention puis referme. On peut aussi piloter ça par l'**API** (§9).

### 2. SSH par CLÉ uniquement (jamais de mot de passe)
```bash
# Sur le serveur : durcir la config SSH
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh
```
> Avant de couper le mot de passe, assure-toi d'avoir **déjà une clé SSH** qui
> marche (`ssh-copy-id` depuis ton PC). Sinon tu te fermes dehors.

### 3. Mises à jour de sécurité automatiques
```bash
apt update && apt -y install unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades
# reboots automatiques la nuit si une MAJ noyau l'exige :
sed -i 's#//\s*Unattended-Upgrade::Automatic-Reboot "false";#Unattended-Upgrade::Automatic-Reboot "true";#' /etc/apt/apt.conf.d/50unattended-upgrades
sed -i 's#//\s*Unattended-Upgrade::Automatic-Reboot-Time.*#Unattended-Upgrade::Automatic-Reboot-Time "04:00";#' /etc/apt/apt.conf.d/50unattended-upgrades
```

---

## 🔒 Sécurité — le reste du blindage

### 4. Pare-feu HÔTE (UFW) — 2ᵉ rideau derrière celui de Hetzner
```bash
apt -y install ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
# ufw allow 80,443/tcp   # seulement si le serveur sert un site
ufw --force enable
```

### 5. fail2ban — bannit les robots qui tentent des mots de passe
```bash
apt -y install fail2ban
cat >/etc/fail2ban/jail.local <<'EOF'
[sshd]
enabled = true
maxretry = 4
bantime = 1h
findtime = 10m
EOF
systemctl enable --now fail2ban
```

### 6. Utilisateur non-root + secrets verrouillés (déjà en place, on vérifie)
```bash
id navlys || adduser --disabled-password --gecos "" navlys
chmod 600 /opt/navlys-core/.env && chown navlys:navlys /opt/navlys-core/.env
```
Le worker tourne en `navlys`, jamais en root. Le `.env` (clés) n'est lisible que par lui.

### 7. Sauvegardes — filet de sécurité
- **Backups automatiques Hetzner** : onglet Backups du serveur → **Enable** (~20 % du prix, ex. ~2,80 €/mois). 7 sauvegardes glissantes, restauration en 1 clic.
- **Snapshot** avant chaque grosse intervention : Actions → *Take snapshot* (payé au Go, à supprimer après).
- La base NAVLYS (Supabase) a déjà sa propre sauvegarde quotidienne (`navlys_sauvegarde`).

### 8. Protection anti-suppression + DDoS
- Actions → **Enable protection** : empêche une suppression accidentelle du serveur.
- **DDoS** : Hetzner protège **automatiquement et gratuitement** au niveau réseau. Rien à faire.

---

## 🔑 9. Pilotage par l'API Hetzner (ce que JE peux faire à distance en HTTPS)
Le SSH m'est fermé, mais l'**API Hetzner Cloud** est en HTTPS → accessible.
Si tu me donnes un **jeton** (console : *Security → API Tokens → Generate*, droits
Read&Write), je peux, à distance et sans toucher au clavier :
- créer/attacher le **pare-feu** et ses règles,
- prendre des **snapshots**, activer les **backups**, la **protection**,
- **rescaler** le serveur (monter en puissance) en une commande,
- lire les **métriques** (CPU, RAM, trafic) pour surveiller la santé.
> ⚠️ Un jeton API = un secret sensible. Ne le colle jamais en clair ici ; pose-le
> dans les **secrets Supabase** (`HETZNER_API_TOKEN`) et je l'utiliserai côté serveur.

---

## ⚡ Performance — rendre `navlys-core` rapide

### 10. Ajouter du SWAP (sécurité mémoire, 8 Go de RAM)
```bash
fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
sysctl -w vm.swappiness=10   # n'utilise le swap qu'en dernier recours
echo 'vm.swappiness=10' >> /etc/sysctl.conf
```

### 11. Comprendre ton CPX (vCPU PARTAGÉ)
- **CPX = vCPU partagé** (AMD EPYC) : parfait pour un worker qui travaille par
  à-coups (poll, requêtes, orchestration). Excellent rapport puissance/prix.
- Pour du calcul **lourd et soutenu** (batch massif, maître-dossier à plein régime),
  la gamme **CCX** = vCPU **dédié** (jamais partagé) → plus régulier. Rescale possible
  à tout moment (onglet **Rescale**), sans perdre les données.
- **Monter en puissance** quand il faut : CPX32 → **CPX41** (8 vCPU/16 Go) ou **CPX51**
  (16 vCPU/32 Go). Un clic, quelques minutes, réversible.

### 12. Le worker en service systemd « musclé »
```bash
# fichiers déjà fournis : deploy/navlys-worker.service (+ masternav)
# limites de ressources propres + redémarrage auto :
mkdir -p /etc/systemd/system/navlys-worker.service.d
cat >/etc/systemd/system/navlys-worker.service.d/limits.conf <<'EOF'
[Service]
Restart=always
RestartSec=5
CPUWeight=200
MemoryHigh=6G
MemoryMax=7G
Nice=-5
EOF
systemctl daemon-reload && systemctl restart navlys-worker
```

### 13. Stockage : le bon disque au bon endroit
- Disque local **NVMe** (160 Go) = ultra-rapide → code, cache, traitements.
- **Volume** (10 Go, extensible) = données durables → fichiers clients, dossiers.
- **Hetzner Object Storage** (S3-compatible, peu cher) = idéal pour les MÉDIAS en
  masse (photos/vidéos/documents des clients) plutôt que gonfler le disque serveur.
  On peut y router l'« espace NAVLYS » quand les volumes explosent.

### 14. Surveillance rapide (voir la santé en 1 commande)
```bash
apt -y install btop
btop            # CPU/RAM/réseau en direct, joli et lisible
# état du worker :
systemctl status navlys-worker --no-pager
journalctl -u navlys-worker -n 50 --no-pager
```

### 15. Réseau & localisation (pour le mondial plus tard)
- `eu-central` (Nuremberg) = parfait pour l'Europe + proche Israël/Moyen-Orient.
- Pour l'Amérique/Asie à grande échelle : ajouter un serveur **Ashburn (US)** ou
  **Singapour** + un **Load Balancer** Hetzner. Pas nécessaire au lancement.

---

## ✅ Ordre de bataille (résumé)
1. **Pare-feu Hetzner** (SSH = ton IP only) — §1  ← le plus important
2. **SSH par clé** + **MAJ auto** — §2, §3
3. **UFW + fail2ban** — §4, §5
4. **Backups + protection** — §7, §8
5. **Swap + service musclé** — §10, §12
6. **Rescale** seulement quand le besoin arrive — §11

> Gravé le 2026-07-06. Doctrine NAVLYS : autonome, notre propre CORE, sécurisé et
> rapide. Le worker des 14 agents tourne 24/7 (voir `INSTALL_HETZNER.md`).
