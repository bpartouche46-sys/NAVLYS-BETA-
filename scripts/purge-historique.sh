#!/usr/bin/env bash
# =====================================================================
# NAVLYS — Purge d'historique (git-filter-repo)
# Efface des chaînes sensibles + fichiers privés de TOUT l'historique,
# sur TOUTES les branches, puis force-push (branche par branche).
#
# ⚠️ OPÉRATION IRRÉVERSIBLE + DESTRUCTRICE POUR LES BRANCHES EN COURS.
# Ne lancer QUE lorsque :
#   1. le dépôt est PRIVÉ (Settings → Danger Zone) ;
#   2. AUCUNE autre session Claude n'écrit (sinon ça casse leurs PR) ;
#   3. tu as un backup (le snapshot GitHub ou un clone --mirror local).
#
# Les chaînes sensibles ne sont PAS écrites dans ce script (sinon elles
# reviendraient dans le dépôt). Crée à côté un fichier NON VERSIONNÉ
# `replacements.local.txt` au format git-filter-repo, ex. :
#     regex:\+CODE\s*NN\s*...==>[téléphone — hors dépôt]
#     NOM_ENTITE==>[entité — hors dépôt]
#
# Usage (depuis un dossier VIDE, pas le dépôt de travail) :
#   NAVLYS_PURGE_CONFIRM=OUI REPL=/chemin/replacements.local.txt bash purge-historique.sh
# =====================================================================
set -euo pipefail

if [ "${NAVLYS_PURGE_CONFIRM:-}" != "OUI" ]; then
  echo "🛑 Refus : relance avec NAVLYS_PURGE_CONFIRM=OUI une fois le dépôt PRIVÉ + sessions arrêtées."
  exit 1
fi
REPL="${REPL:-replacements.local.txt}"
[ -f "$REPL" ] || { echo "❌ Fichier de remplacements introuvable : $REPL (voir l'en-tête de ce script)."; exit 1; }

REPO_URL="${REPO_URL:-https://github.com/bpartouche46-sys/NAVLYS-BETA-.git}"
WORK="navlys-purge-mirror"
command -v git-filter-repo >/dev/null || { echo "Installe d'abord : pip install git-filter-repo"; exit 1; }

echo "→ 1. Backup mirror + clone mirror de travail"
git clone --mirror "$REPO_URL" "${WORK}.backup"
git clone --mirror "$REPO_URL" "$WORK"
cp "$REPL" "${WORK}/_repl.txt"
cd "$WORK"

echo "→ 2. Redaction des chaînes (tout l'historique)"
git filter-repo --replace-text _repl.txt --force

echo "→ 3. Suppression des fichiers privés (tout l'historique)"
git filter-repo --force --invert-paths \
  --path-glob 'recup-docs/onedrive/_E_REPUTATION_*' \
  --path 'recup-docs/onedrive/_DEPARTEMENT_E_REPUTATION_charte.md' \
  --path 'recup-docs/onedrive/_SECURITE_PROCEDURE_OFFICIELLE_KEYS.md' \
  --path 'recup-docs/NAVLYS_Prospection_JCVD.md' \
  --path-glob 'Audit approfondi*' \
  --path-glob '*Méditerranée_files*'

echo "→ 4. Re-pousser TOUTES les branches (force, une par une)"
git remote add clean "$REPO_URL"
for ref in $(git for-each-ref --format='%(refname:short)' refs/heads); do
  git push --force clean "$ref:$ref" && echo "✅ $ref" || echo "❌ $ref"
done
echo "✅ Purge terminée. Backup brut dans ${WORK}.backup (supprimer une fois vérifié)."
