#!/usr/bin/env bash
# Veille locale NAVLYS — rafraîchit la liste des dossiers/fichiers de Downloads
cd "$(dirname "$0")/.." || exit 1
OUT="_ETAT_DES_LIEUX_NAVLYS/snapshot_local_$(date +%Y%m%d).txt"
{
  echo "# Snapshot local — $(date)"
  echo "## Dossiers (top-level)"; find . -maxdepth 1 -type d -printf '%f\n' | sort
  echo ""; echo "## Compteurs"
  echo "dirs=$(find . -maxdepth 1 -type d|wc -l) files=$(find . -maxdepth 1 -type f|wc -l) zips=$(ls -1 *.zip 2>/dev/null|wc -l)"
  echo ""; echo "## Doublons (motifs (1)/(2)/_1)"; ls -1 | grep -E '\((1|2|3)\)|_1\.| copy' | sort
  echo ""; echo "## Parasites .exe"; ls -1 *.exe 2>/dev/null
} > "$OUT"
echo "Snapshot écrit: $OUT"
