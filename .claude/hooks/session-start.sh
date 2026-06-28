#!/bin/bash
# NAVLYS — hook SessionStart : prépare l'environnement pour les sessions
# Claude Code on the web (installe les dépendances du sous-projet core/
# afin que `npm test` fonctionne). Idempotent et non interactif.
set -euo pipefail

# N'agir qu'en environnement distant (Claude Code on the web).
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Racine du dépôt : variable fournie par le harness, sinon déduite du chemin du script.
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
CORE_DIR="$PROJECT_DIR/core"

if [ -f "$CORE_DIR/package.json" ]; then
  if ( cd "$CORE_DIR" && npm install --no-audit --no-fund ) >/tmp/navlys-core-npm.log 2>&1; then
    echo "✅ NAVLYS core : dépendances installées (npm install)."
  else
    echo "‼️ NAVLYS core : échec npm install — voir /tmp/navlys-core-npm.log."
  fi
fi
