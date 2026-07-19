#!/usr/bin/env bash
# NAVLYS CORE — installation/mise à jour du pont sur le VPS (Hetzner).
# Idempotent : peut être relancé sans casse. Prévu pour Ubuntu 24.04 + Node 20+.
#
#   sudo bash core/deploy/install.sh
#
set -euo pipefail

APP_DIR=/opt/navlys/core
SERVICE=navlys-core
LOG_DIR=/var/log/navlys

echo "== 1/6 Vérifications =="
command -v node >/dev/null || { echo "Node.js requis (>=20). Installe NodeSource d'abord."; exit 1; }
NODE_V=$(node -v | cut -d. -f1 | tr -d v)
[ "$NODE_V" -ge 20 ] || { echo "Node >= 20 requis (trouvé: $(node -v))"; exit 1; }
[ -f "$APP_DIR/.env" ] || { echo "Manque $APP_DIR/.env (copie .env.example et remplis SUR LE SERVEUR)"; exit 1; }

echo "== 2/6 Utilisateur + dossiers =="
id -u navlys >/dev/null 2>&1 || sudo useradd --system --home /opt/navlys --shell /usr/sbin/nologin navlys
sudo mkdir -p "$LOG_DIR"
sudo chown -R navlys:navlys "$APP_DIR" "$LOG_DIR"

echo "== 3/6 Dépendances + build =="
cd "$APP_DIR"
sudo -u navlys npm ci --omit=dev || sudo -u navlys npm install
sudo -u navlys npm run build

echo "== 4/6 Tests garde-fous (bloquant si échec) =="
sudo -u navlys node --experimental-strip-types test/guardrails.test.mjs
sudo -u navlys node --experimental-strip-types test/bridge.test.mjs

echo "== 5/6 Service systemd =="
sudo cp deploy/navlys-core.service /etc/systemd/system/$SERVICE.service
sudo systemctl daemon-reload
sudo systemctl enable --now $SERVICE
sleep 2
systemctl is-active --quiet $SERVICE && echo "OK $SERVICE actif" || { echo "ERREUR $SERVICE — journalctl -u $SERVICE -n 50"; exit 1; }

echo "== 6/6 Sonde /health =="
curl -fsS http://127.0.0.1:${HEALTH_PORT:-8788}/health && echo "" || echo "(la sonde montera dès le 1er cycle)"

echo ""
echo "Installation terminée."
echo "  - logs : journalctl -u $SERVICE -f   ou   tail -f $LOG_DIR/core-bridge.log"
echo "  - tunnel Cloudflare (canal 3) : sudo cloudflared service install \$(cat /opt/navlys/core/.tunnel_token 2>/dev/null || echo '<TOKEN depuis navlys_secrets>')"
echo "  - cron de supervision : crontab -e   puis coller deploy/crontab.snippet"
