#!/usr/bin/env bash
# =============================================================================
# NAVLYS — TRANSCRIPTION LOCALE (ZÉRO TOKEN)
# -----------------------------------------------------------------------------
# Pour chaque vidéo en file (queue.jsonl) pas encore transcrite : télécharge
# l'AUDIO (yt-dlp) puis le transcrit en texte avec Whisper EN LOCAL (openai
# whisper OU whisper.cpp). Aucune API, aucun token, aucune donnée envoyée à
# l'extérieur — tout se passe sur la machine (Hetzner ou PC de Bruno).
#
# ⚠️ CGU / éthique : le téléchargement d'audio doit respecter les conditions de
# chaque plateforme. Ici, usage strictement PRIVÉ et INTERNE (analyse des
# techniques de communication), aucune rediffusion, aucun stockage public.
# Si un doute juridique : se limiter aux titres + descriptions du RSS (espion_youtube.sh).
#
# Dépendances (installées UNE fois sur Hetzner) :
#   pip install -U yt-dlp openai-whisper   # ou whisper.cpp compilé
# Cron (exemple) :  20 * * * *  /root/navlys/scripts/espions/transcribe.sh
# =============================================================================
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="${ESPIONS_DATA_DIR:-${HERE}/../../data/espions}"
QUEUE="${DATA_DIR}/queue.jsonl"
TR_DIR="${DATA_DIR}/transcriptions"
TMP_DIR="${DATA_DIR}/tmp_audio"
LOG="${DATA_DIR}/transcribe.log"
WHISPER_MODEL="${WHISPER_MODEL:-small}"
MAX_PAR_PASSE="${MAX_PAR_PASSE:-3}"   # borne la conso : N vidéos max par exécution

mkdir -p "${TR_DIR}" "${TMP_DIR}"
touch "${LOG}"
log() { printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" >> "${LOG}"; }

command -v yt-dlp >/dev/null 2>&1 || { log "yt-dlp absent — installe: pip install -U yt-dlp"; exit 0; }
if command -v whisper >/dev/null 2>&1; then WH="whisper"; elif command -v whisper.cpp >/dev/null 2>&1; then WH="whisper.cpp"; else
  log "Whisper absent — installe: pip install -U openai-whisper (ou compile whisper.cpp)"; exit 0; fi
[[ -s "${QUEUE}" ]] || { log "File vide."; exit 0; }

fait=0
# On lit les vidéos non transcrites (transcrit:false), bornées à MAX_PAR_PASSE.
while IFS= read -r line; do
  [[ "${fait}" -ge "${MAX_PAR_PASSE}" ]] && break
  echo "${line}" | grep -q '"transcrit":false' || continue
  vid="$(printf '%s' "${line}" | sed -n 's/.*"video":"\([^"]*\)".*/\1/p')"
  [[ -z "${vid}" ]] && continue
  [[ -f "${TR_DIR}/${vid}.txt" ]] && continue

  log "Transcription ${vid}…"
  audio="${TMP_DIR}/${vid}.mp3"
  if ! yt-dlp -q --no-warnings -x --audio-format mp3 -o "${TMP_DIR}/${vid}.%(ext)s" \
        "https://www.youtube.com/watch?v=${vid}" >>"${LOG}" 2>&1; then
    log "ERREUR téléchargement audio ${vid}"; continue
  fi
  if [[ "${WH}" == "whisper" ]]; then
    whisper "${audio}" --model "${WHISPER_MODEL}" --output_format txt --output_dir "${TR_DIR}" \
      --fp16 False >>"${LOG}" 2>&1 || { log "ERREUR whisper ${vid}"; rm -f "${audio}"; continue; }
  else
    whisper.cpp -m "${WHISPER_MODEL}" -f "${audio}" -otxt -of "${TR_DIR}/${vid}" >>"${LOG}" 2>&1 \
      || { log "ERREUR whisper.cpp ${vid}"; rm -f "${audio}"; continue; }
  fi
  rm -f "${audio}"
  fait=$((fait+1))
done < "${QUEUE}"

log "Terminé — ${fait} transcription(s)."
exit 0
