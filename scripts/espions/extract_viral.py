#!/usr/bin/env python3
# =============================================================================
# NAVLYS — EXTRACTION DES TECHNIQUES VIRALES (ZÉRO TOKEN EXTERNE)
# -----------------------------------------------------------------------------
# Lit les transcriptions locales (data/espions/transcriptions/*.txt) + la file
# (queue.jsonl), et pour chaque vidéo pas encore analysée, extrait des
# « techniques virales » à réutiliser pour NAVLYS.
#
# Deux modes, du plus léger au plus riche :
#   1) HEURISTIQUE (par défaut, zéro dépendance) : repère hooks d'ouverture,
#      appels à l'action, formats de titre, mots déclencheurs.
#   2) LLM LOCAL (si `ollama` est installé) : résume en « 3 techniques + 1
#      application NAVLYS ». Aucune clé, aucun token externe — 100% local.
#
# Sortie : data/espions/viral-insights.jsonl (une ligne par vidéo analysée),
# prête à être ingérée par le CORE (core_knowledge / mémoire NAVMKT).
#
# Cron (exemple) :  35 * * * *  python3 /root/navlys/scripts/espions/extract_viral.py
# =============================================================================
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.environ.get("ESPIONS_DATA_DIR", os.path.join(HERE, "..", "..", "data", "espions"))
QUEUE = os.path.join(DATA_DIR, "queue.jsonl")
TR_DIR = os.path.join(DATA_DIR, "transcriptions")
OUT = os.path.join(DATA_DIR, "viral-insights.jsonl")
DONE = os.path.join(DATA_DIR, "analyses.txt")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.2")

HOOKS = [
    r"\bregarde\b", r"\bstop\b", r"\battends\b", r"\bavant de\b", r"\bpersonne ne\b",
    r"\ble secret\b", r"\bvoici pourquoi\b", r"\ben \d+ (secondes|minutes|jours)\b",
    r"\b3 (choses|raisons|erreurs)\b", r"\btu ne vas pas croire\b", r"\bla plupart des gens\b",
]
CTA = [r"\babonne-toi\b", r"\bpartage\b", r"\bcommente\b", r"\blien en (bio|description)\b",
       r"\bclique\b", r"\binscris-toi\b"]


def charge_faits():
    faits = set()
    if os.path.exists(DONE):
        with open(DONE, encoding="utf-8") as f:
            faits = {l.strip() for l in f if l.strip()}
    return faits


def lire_queue():
    items = []
    if not os.path.exists(QUEUE):
        return items
    with open(QUEUE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                items.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return items


def texte_source(vid, item):
    p = os.path.join(TR_DIR, vid + ".txt")
    if os.path.exists(p):
        with open(p, encoding="utf-8", errors="ignore") as f:
            return f.read()
    # repli : titre (le RSS ne donne pas la description ici, mais le titre est déjà un signal)
    return item.get("titre", "")


def heuristique(txt):
    bas = txt.lower()
    hooks = sorted({re.search(p, bas).group(0) for p in HOOKS if re.search(p, bas)})
    ctas = sorted({re.search(p, bas).group(0) for p in CTA if re.search(p, bas)})
    techniques = []
    if hooks:
        techniques.append("Hook d'ouverture : « " + " / ".join(hooks) + " »")
    if ctas:
        techniques.append("Appel à l'action : « " + " / ".join(ctas) + " »")
    if not techniques:
        techniques.append("Aucune technique évidente détectée (analyser manuellement).")
    return techniques


def via_ollama(txt):
    if not txt.strip():
        return None
    prompt = (
        "Tu es un expert en communication virale. À partir de cette transcription/titre, "
        "donne EXACTEMENT : 3 techniques virales concrètes utilisées, puis 1 application "
        "immédiate pour NAVLYS (IA mobile). Réponds bref, en français.\n\n" + txt[:6000]
    )
    try:
        r = subprocess.run(
            ["ollama", "run", OLLAMA_MODEL],
            input=prompt.encode("utf-8"),
            capture_output=True, timeout=120,
        )
        out = r.stdout.decode("utf-8", "ignore").strip()
        return out or None
    except (FileNotFoundError, subprocess.TimeoutExpired, OSError):
        return None


def main():
    os.makedirs(DATA_DIR, exist_ok=True)
    faits = charge_faits()
    a_ollama = subprocess.run(["sh", "-c", "command -v ollama"], capture_output=True).returncode == 0
    n = 0
    with open(OUT, "a", encoding="utf-8") as out, open(DONE, "a", encoding="utf-8") as done:
        for item in lire_queue():
            vid = item.get("video")
            if not vid or vid in faits:
                continue
            txt = texte_source(vid, item)
            insight = {
                "video": vid,
                "chaine": item.get("chaine", ""),
                "titre": item.get("titre", ""),
                "analyse_le": datetime.now(timezone.utc).isoformat(),
                "techniques": heuristique(txt),
                "source": "transcription" if os.path.exists(os.path.join(TR_DIR, vid + ".txt")) else "titre",
            }
            if a_ollama:
                llm = via_ollama(txt)
                if llm:
                    insight["synthese_llm_local"] = llm
            out.write(json.dumps(insight, ensure_ascii=False) + "\n")
            done.write(vid + "\n")
            n += 1
    print(f"{n} vidéo(s) analysée(s) -> {OUT}")


if __name__ == "__main__":
    sys.exit(main())
