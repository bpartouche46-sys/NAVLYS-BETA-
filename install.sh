#!/usr/bin/env bash
# Installeur NAVLYS CORE — à lancer sur le serveur Hetzner.
# Usage :
#   curl -fsSL https://raw.githubusercontent.com/bpartouche46-sys/NAVLYS-BETA-/claude/project-inventory-audit-j0k39p/install.sh | bash
set -e

BRANCH="claude/project-inventory-audit-j0k39p"
REPO="https://github.com/bpartouche46-sys/NAVLYS-BETA-.git"
DIR="/opt/navlys-core"

echo "[NAVLYS] 1/4 Installation des outils..."
apt-get update -y
apt-get install -y python3 python3-requests git nano

echo "[NAVLYS] 2/4 Recuperation du code..."
# On preserve le .env (les cles) si une install existe deja.
[ -f "$DIR/.env" ] && cp "$DIR/.env" /tmp/navlys.env.bak
rm -rf "$DIR"
git clone -b "$BRANCH" --single-branch "$REPO" "$DIR"
cd "$DIR"

echo "[NAVLYS] 3/4 Fichier des cles (.env)..."
if [ -f /tmp/navlys.env.bak ]; then
  cp /tmp/navlys.env.bak "$DIR/.env"
  echo "  -> .env existant restaure (tes cles sont conservees)."
else
  cat > "$DIR/.env" <<'ENVEOF'
SUPABASE_URL=https://hhrlgyvtqluxpywjiwkd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=REMPLACER
OPENROUTER_API_KEY=REMPLACER
NAVLYS_DEFAULT_MODEL=anthropic/claude-sonnet-4.6
NAVLYS_POLL_SECONDS=30
ENVEOF
  echo "  -> .env cree (a remplir)."
fi
chmod 600 "$DIR/.env"

echo "[NAVLYS] 4/4 Service 24/7..."
cat > /etc/systemd/system/navlys-core.service <<'SVCEOF'
[Unit]
Description=NAVLYS CORE worker
After=network-online.target

[Service]
WorkingDirectory=/opt/navlys-core
EnvironmentFile=/opt/navlys-core/.env
ExecStart=/usr/bin/python3 /opt/navlys-core/run.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SVCEOF
systemctl daemon-reload

echo ""
echo "===================================================="
echo " INSTALLATION OK."
echo " Etape suivante (2 commandes) :"
echo "   1) nano /opt/navlys-core/.env     <- mets tes 2 cles"
echo "   2) systemctl enable --now navlys-core"
echo "===================================================="
