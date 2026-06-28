#!/usr/bin/env bash
# =====================================================================
# NAVLYS — Purge d'historique (git-filter-repo)
# Efface les PII (téléphones, entité) + fichiers privés de TOUT l'historique,
# sur TOUTES les branches, puis force-push.
#
# ⚠️ OPÉRATION IRRÉVERSIBLE + DESTRUCTRICE POUR LES BRANCHES EN COURS.
# Ne lancer QUE lorsque :
#   1. le dépôt est PRIVÉ (Settings → Danger Zone) ;
#   2. AUCUNE autre session Claude n'écrit (sinon ça casse leurs PR) ;
#   3. tu as un backup (le snapshot GitHub ou un clone --mirror local).
#
# Usage (depuis un dossier VIDE, pas le dépôt de travail) :
#   NAVLYS_PURGE_CONFIRM=OUI bash purge-historique.sh
# =====================================================================
set -euo pipefail

if [ "${NAVLYS_PURGE_CONFIRM:-}" != "OUI" ]; then
  echo "🛑 Refus : relance avec NAVLYS_PURGE_CONFIRM=OUI une fois le dépôt PRIVÉ + sessions arrêtées."
  exit 1
fi

REPO_URL="https://github.com/bpartouche46-sys/NAVLYS-BETA-.git"
WORK="navlys-purge-mirror"
command -v git-filter-repo >/dev/null || { echo "Installe d'abord : pip install git-filter-repo"; exit 1; }

echo "→ 1. Backup mirror (sécurité) + clone mirror de travail"
git clone --mirror "$REPO_URL" "${WORK}.backup"   # backup brut, on n'y touche pas
git clone --mirror "$REPO_URL" "$WORK"
cd "$WORK"

echo "→ 2. Fichier de remplacements (chaînes sensibles)"
cat > ../replacements.txt <<'EOF'
regex:\+972\s*53\s*708?\s*2746==>[téléphone — hors dépôt]
regex:\+33\s*7\s*56\s*83\s*34\s*69==>[téléphone — hors dépôt]
[téléphone — hors dépôt]==>[téléphone — hors dépôt]
[entité — hors dépôt]==>[entité — hors dépôt]
[entité — hors dépôt]==>[entité — hors dépôt]
EOF

echo "→ 3. Redaction des chaînes dans tout l'historique"
git filter-repo --replace-text ../replacements.txt --force

echo "→ 4. Suppression des fichiers privés de tout l'historique"
git filter-repo --force --invert-paths \
  --path-glob 'recup-docs/onedrive/_E_REPUTATION_*' \
  --path 'recup-docs/onedrive/_DEPARTEMENT_E_REPUTATION_charte.md' \
  --path 'recup-docs/onedrive/_SECURITE_PROCEDURE_OFFICIELLE_KEYS.md' \
  --path 'recup-docs/NAVLYS_Prospection_JCVD.md' \
  --path-glob 'Audit approfondi*' \
  --path-glob '*Méditerranée_files/*'

echo "→ 5. Vérification (doit être vide)"
git grep -nE '[entité — hors dépôt]|\+972|[téléphone — hors dépôt]' $(git rev-list --all) 2>/dev/null | head || echo "✅ aucune PII résiduelle dans l'historique"

echo "→ 6. Re-pousser TOUTES les branches + tags (force)"
git remote add clean "$REPO_URL"
git push --force --mirror clean

echo "✅ Purge terminée. Backup brut conservé dans ${WORK}.backup (à supprimer une fois vérifié)."
