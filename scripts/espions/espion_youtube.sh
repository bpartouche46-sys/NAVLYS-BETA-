#!/usr/bin/env bash
# =============================================================================
# NAVLYS — ESPION YOUTUBE (veille horaire, ZÉRO TOKEN)
# -----------------------------------------------------------------------------
# Lit scripts/espions/chaines.txt (channel_id YouTube), récupère le RSS PUBLIC
# de chaque chaîne (aucune clé API, aucun token), détecte les NOUVELLES vidéos
# depuis le dernier passage, et les empile dans une file (queue.jsonl) pour la
# transcription + l'extraction de techniques virales.
#
# Conçu pour tourner en CRON sur Hetzner, indépendamment de Claude Code.
# Respect des CGU : lecture du flux RSS public officiel uniquement (1 requête
# par chaîne, cadence horaire) — pas de scraping massif, pas de contournement.
#
# Cron (exemple) :  5 * * * *  /root/navlys/scripts/espions/espion_youtube.sh
# =============================================================================
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHAINES="${HERE}/chaines.txt"
DATA_DIR="${ESPIONS_DATA_DIR:-${HERE}/../../data/espions}"
QUEUE="${DATA_DIR}/queue.jsonl"
SEEN="${DATA_DIR}/vus.txt"
LOG="${DATA_DIR}/espion_youtube.log"

mkdir -p "${DATA_DIR}"
touch "${QUEUE}" "${SEEN}" "${LOG}"

log() { printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" >> "${LOG}"; }

if [[ ! -s "${CHAINES}" ]]; then
  log "Aucune chaîne configurée dans ${CHAINES} — rien à faire."
  exit 0
fi

json_escape() { # échappe pour une valeur JSON (guillemets, backslash, retours ligne)
  local s=${1//\\/\\\\}; s=${s//\"/\\\"}; s=${s//$'\n'/ }; s=${s//$'\r'/}; printf '%s' "$s"
}

nouveaux=0
while IFS= read -r ligne || [[ -n "${ligne}" ]]; do
  # ignore commentaires et lignes vides ; garde le 1er champ (channel_id)
  cid="$(printf '%s' "${ligne}" | sed 's/#.*//' | tr -d '[:space:]')"
  [[ -z "${cid}" ]] && continue

  url="https://www.youtube.com/feeds/videos.xml?channel_id=${cid}"
  rss="$(curl -fsSL --max-time 25 -A 'NAVLYS-veille/1.0 (+https://navlys.com)' "${url}" 2>>"${LOG}")" || {
    log "ERREUR fetch RSS ${cid}"; continue; }

  # Extraction robuste : chaque <entry> porte un <yt:videoId>, un <title> et un <published>.
  # On lit les videoId dans l'ordre ; on récupère titre/date en parallèle.
  mapfile -t vids < <(printf '%s' "${rss}" | grep -oE '<yt:videoId>[^<]+' | sed 's/<yt:videoId>//')
  mapfile -t titres < <(printf '%s' "${rss}" | grep -oE '<title>[^<]*</title>' | sed -e 's/<title>//' -e 's#</title>##' | tail -n +2)
  mapfile -t dates < <(printf '%s' "${rss}" | grep -oE '<published>[^<]+' | sed 's/<published>//')

  i=0
  for vid in "${vids[@]}"; do
    if ! grep -qxF "${vid}" "${SEEN}"; then
      titre="${titres[$i]:-}"
      date_pub="${dates[$i]:-}"
      printf '{"video":"%s","chaine":"%s","titre":"%s","publie":"%s","url":"https://www.youtube.com/watch?v=%s","transcrit":false}\n' \
        "$(json_escape "${vid}")" "$(json_escape "${cid}")" "$(json_escape "${titre}")" "$(json_escape "${date_pub}")" "${vid}" >> "${QUEUE}"
      echo "${vid}" >> "${SEEN}"
      nouveaux=$((nouveaux+1))
    fi
    i=$((i+1))
  done
  sleep 1  # courtoisie : on n'enchaîne pas les requêtes
done < "${CHAINES}"

log "Terminé — ${nouveaux} nouvelle(s) vidéo(s) mise(s) en file."
exit 0
