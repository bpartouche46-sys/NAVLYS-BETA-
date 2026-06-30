# 🖥️ Allumer le CORE 24/7 sur Hetzner — clé en main

> Objectif : le worker des 14 agents tourne **en permanence** et **redémarre tout
> seul** (même après un reboot du serveur). À faire **une seule fois**.
> Tu copies-colles les blocs dans l'ordre. ~15 minutes.

## 0. Avant de commencer
- Un serveur Hetzner **CX22** (~5 €/mois) sous **Ubuntu 24.04** suffit largement.
- Connecte-toi en SSH : `ssh root@TON_IP_SERVEUR`.

## 1. Préparer le serveur (copie tout le bloc)

```bash
apt update && apt -y install python3 python3-venv python3-pip git
adduser --disabled-password --gecos "" navlys
install -d -o navlys -g navlys /opt/navlys-core
```

## 2. Récupérer le code

```bash
sudo -u navlys git clone https://github.com/bpartouche46-sys/NAVLYS-BETA-.git /opt/navlys-core
cd /opt/navlys-core
sudo -u navlys python3 -m venv venv
sudo -u navlys /opt/navlys-core/venv/bin/pip install -r requirements.txt
```

## 3. Créer le fichier secret `.env` (JAMAIS commité)

```bash
sudo -u navlys nano /opt/navlys-core/.env
```

Colle ceci, en remplaçant les valeurs `__...__` par tes vraies clés :

```
SUPABASE_URL=https://hhrlgyvtqluxpywjiwkd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=__ta_cle_service_role__
OPENROUTER_API_KEY=__ta_cle_openrouter_avec_spend_limit__
NAVLYS_DEFAULT_MODEL=anthropic/claude-sonnet-4.6
NAVLYS_POLL_SECONDS=30

# Optionnel — seulement si tu veux AUSSI le bot Telegram MasterNav :
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Enregistre dans nano : **Ctrl+O**, **Entrée**, puis **Ctrl+X**.
Protège le fichier : `chmod 600 /opt/navlys-core/.env && chown navlys:navlys /opt/navlys-core/.env`

## 4. Tester une fois avant de lancer le 24/7

```bash
sudo -u navlys /opt/navlys-core/venv/bin/python run.py --once
```
Tu dois voir « NAVLYS CORE worker — 14 agents chargés ». Si oui, c'est bon. ✅

## 5. Installer le service 24/7 (worker)

```bash
cp /opt/navlys-core/deploy/navlys-worker.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now navlys-worker
systemctl status navlys-worker --no-pager
```
`active (running)` = ton corps central est **vivant en permanence**. 🎉

Voir les logs en direct : `journalctl -u navlys-worker -f`

## 6. (Optionnel) Le bot Telegram MasterNav
Si tu as rempli `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` au point 3 :
```bash
cp /opt/navlys-core/deploy/navlys-masternav.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now navlys-masternav
```
(Tu peux t'en passer : WhatsApp pilote fait déjà le même travail.)

## 7. Mettre à jour plus tard (quand le code change)
```bash
cd /opt/navlys-core && sudo -u navlys git pull
sudo -u navlys /opt/navlys-core/venv/bin/pip install -r requirements.txt
systemctl restart navlys-worker
```

## 8. Les routines automatiques (le matin sans rien demander)
Dans **Supabase → SQL Editor**, colle et exécute le contenu de `sql/routines_cron.sql`.
À partir de là, les missions du matin s'enfilent seules → tu reçois ton `/rapport`
sur WhatsApp / le cockpit sans lever le petit doigt.

---

### Garde-fou (rappel)
Le worker **prépare et met en file** ; il ne dépense rien, ne publie rien, ne déploie
rien tout seul. Toute action externe reste à **ta** validation (statut `a_valider`).
