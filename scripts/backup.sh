#!/usr/bin/env bash
#
# ============================================================================
#  NAVLYS — Script de SAUVEGARDE du core central (serveur Hetzner)
# ============================================================================
#  Ce script NE SUPPRIME RIEN et NE MODIFIE RIEN.
#  Il se contente de COPIER les données et les fichiers dans une archive
#  horodatée, que vous pourrez ensuite télécharger.
#
#  Usage :
#     chmod +x backup.sh
#     ./backup.sh
#
#  Il vous posera quelques questions (chemins à sauvegarder, bases de données).
#  Rien n'est envoyé sur Internet : tout reste sur le serveur jusqu'à ce que
#  VOUS téléchargiez l'archive.
# ============================================================================

set -euo pipefail

# --- Couleurs pour la lisibilité ---
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}➤ $*${NC}"; }
warn()  { echo -e "${YELLOW}⚠ $*${NC}"; }
err()   { echo -e "${RED}✖ $*${NC}" >&2; }

# --- Dossier de sortie horodaté ---
STAMP="$(date +%Y-%m-%d_%Hh%M)"
OUTDIR="navlys-backup-${STAMP}"
mkdir -p "${OUTDIR}"
info "Dossier de sauvegarde : ${OUTDIR}"

INFO_FILE="${OUTDIR}/INFOS.txt"
{
  echo "Sauvegarde NAVLYS — core central"
  echo "Date    : $(date)"
  echo "Serveur : $(hostname)"
  echo "Système : $(uname -a)"
  echo "----------------------------------------"
} > "${INFO_FILE}"

# ----------------------------------------------------------------------------
# 1) BASES DE DONNÉES
# ----------------------------------------------------------------------------

# --- PostgreSQL ---
if command -v pg_dumpall >/dev/null 2>&1 || command -v pg_dump >/dev/null 2>&1; then
  read -r -p "Sauvegarder PostgreSQL ? [o/N] " ans
  if [[ "${ans,,}" == "o" ]]; then
    read -r -p "  Utilisateur PostgreSQL (defaut: postgres) : " PGUSER
    PGUSER="${PGUSER:-postgres}"
    info "Dump PostgreSQL (toutes les bases)…"
    if sudo -u "${PGUSER}" pg_dumpall > "${OUTDIR}/postgres_all.sql" 2>>"${OUTDIR}/erreurs.log"; then
      info "  → ${OUTDIR}/postgres_all.sql"
      echo "PostgreSQL : OK (postgres_all.sql)" >> "${INFO_FILE}"
    else
      warn "  Dump PostgreSQL en échec — voir ${OUTDIR}/erreurs.log"
      echo "PostgreSQL : ECHEC" >> "${INFO_FILE}"
    fi
  fi
else
  echo "PostgreSQL : non détecté" >> "${INFO_FILE}"
fi

# --- MySQL / MariaDB ---
if command -v mysqldump >/dev/null 2>&1; then
  read -r -p "Sauvegarder MySQL/MariaDB ? [o/N] " ans
  if [[ "${ans,,}" == "o" ]]; then
    read -r -p "  Utilisateur MySQL (defaut: root) : " MYUSER
    MYUSER="${MYUSER:-root}"
    info "Dump MySQL/MariaDB (toutes les bases) — le mot de passe sera demandé…"
    if mysqldump -u "${MYUSER}" -p --all-databases --single-transaction \
        > "${OUTDIR}/mysql_all.sql" 2>>"${OUTDIR}/erreurs.log"; then
      info "  → ${OUTDIR}/mysql_all.sql"
      echo "MySQL/MariaDB : OK (mysql_all.sql)" >> "${INFO_FILE}"
    else
      warn "  Dump MySQL en échec — voir ${OUTDIR}/erreurs.log"
      echo "MySQL/MariaDB : ECHEC" >> "${INFO_FILE}"
    fi
  fi
else
  echo "MySQL/MariaDB : non détecté" >> "${INFO_FILE}"
fi

# --- Docker (info seulement) ---
if command -v docker >/dev/null 2>&1; then
  info "Docker détecté — inventaire des conteneurs et volumes…"
  docker ps -a > "${OUTDIR}/docker_conteneurs.txt" 2>/dev/null || true
  docker volume ls > "${OUTDIR}/docker_volumes.txt" 2>/dev/null || true
  echo "Docker : inventaire sauvegardé (conteneurs + volumes listés)" >> "${INFO_FILE}"
  warn "Note : les VOLUMES Docker (données) ne sont pas archivés automatiquement ici."
  warn "       Si vos données sont dans des volumes, prévenez-moi pour adapter le script."
fi

# ----------------------------------------------------------------------------
# 2) FICHIERS / SITES / CONFIGS
# ----------------------------------------------------------------------------
info "Quels dossiers de fichiers faut-il sauvegarder ?"
echo "   Exemples courants : /var/www  /etc/nginx  /opt  /srv  /home"
read -r -p "Chemins à sauvegarder (séparés par un espace) : " -a PATHS

if [[ "${#PATHS[@]}" -gt 0 ]]; then
  info "Archivage des fichiers…"
  echo "Dossiers archivés :" >> "${INFO_FILE}"
  printf '  - %s\n' "${PATHS[@]}" >> "${INFO_FILE}"
  # --exclude des gros dossiers inutiles et des secrets
  tar --ignore-failed-read \
      --exclude='node_modules' --exclude='.cache' --exclude='*.log' \
      -czf "${OUTDIR}/fichiers.tar.gz" "${PATHS[@]}" 2>>"${OUTDIR}/erreurs.log" || \
      warn "Certains fichiers n'ont pas pu être lus (voir erreurs.log) — l'archive est quand même créée."
  info "  → ${OUTDIR}/fichiers.tar.gz"
else
  warn "Aucun chemin indiqué : pas d'archive de fichiers créée."
fi

# ----------------------------------------------------------------------------
# 3) ARCHIVE FINALE
# ----------------------------------------------------------------------------
info "Création de l'archive finale…"
FINAL="${OUTDIR}.tar.gz"
tar -czf "${FINAL}" "${OUTDIR}"
SIZE="$(du -h "${FINAL}" | cut -f1)"

echo
info "✅ Sauvegarde terminée : ${FINAL} (${SIZE})"
echo
echo "  Pour la télécharger sur VOTRE ordinateur, lancez (depuis votre PC) :"
echo "    scp $(whoami)@$(hostname -I 2>/dev/null | awk '{print $1}'):$(pwd)/${FINAL} ."
echo
warn "Vérifiez le contenu de INFOS.txt et erreurs.log dans l'archive avant de continuer."
warn "RAPPEL : ne supprimez RIEN sur le serveur tant que la sauvegarde n'est pas téléchargée ET vérifiée."
