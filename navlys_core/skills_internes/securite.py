"""
NAVLYS — Skill interne « securite » (copie Python de skill-scanner / security-review /
find-bugs, gravée par ordre de Bruno le 2026-07-09 : « tous les skills Claude doivent
être copycat sur navlys core et développer en interne sur notre serveur sécurisé »).

Scan statique déterministe, sans dépendance à Claude Code ni à aucun LLM :
  - secrets en dur (clés API, AWS, mots de passe, tokens privés)
  - patterns d'injection de prompt (instruction override, jailbreak, zero-width)
  - code dangereux (eval/exec, shell=True, reverse shell, hooks git)

Sert directement la règle n°111 (sécurité de tout dépôt/lien/skill tiers avant
usage) et l'objectif permanent « zéro erreur sur navlys.com ». Faux positifs
attendus sur les fichiers qui DOCUMENTENT ces patterns (ex. ce fichier
lui-même, ou une doc de sécurité) — c'est à un humain ou à un agent de
trancher intention vs documentation, ce module ne fait que remonter les
correspondances brutes, il ne juge pas.

Lancement : `python -m navlys_core.skills_internes.securite <chemin>`
Cron conseillé (Hetzner) : après chaque `git pull` / avant chaque déploiement.
"""
from __future__ import annotations
import os
import re
import json
import sys
from pathlib import Path
from typing import Any

import requests

SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_ROLE", "")
TIMEOUT = 20

# Extensions ignorées (binaires, dépendances tierces déjà auditées ailleurs).
IGNORER_DOSSIERS = {".git", "node_modules", ".venv", "venv", "__pycache__", ".agents"}
EXTENSIONS_TEXTE = {".py", ".js", ".ts", ".md", ".html", ".yml", ".yaml", ".json", ".sh", ".sql"}

# --- Patterns : secrets en dur -------------------------------------------------
SECRETS = [
    ("AWS Access Key ID", re.compile(r"AKIA[0-9A-Z]{16}")),
    ("Clé API générique", re.compile(r"(?i)(api[_-]?key|secret[_-]?key|access[_-]?token)\s*[:=]\s*['\"][A-Za-z0-9_\-]{16,}['\"]")),
    ("Mot de passe en dur", re.compile(r"(?i)password\s*[:=]\s*['\"][^'\"]{4,}['\"]")),
    ("Clé privée", re.compile(r"-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----")),
    ("Token Stripe live", re.compile(r"sk_live_[A-Za-z0-9]{16,}")),
]

# --- Patterns : injection de prompt / obfuscation ------------------------------
INJECTION = [
    ("Instruction override", re.compile(r"(?i)ignore (all |any )?previous instructions")),
    ("Jailbreak DAN", re.compile(r"(?i)\bDAN\b.{0,20}(mode|jailbreak)")),
    ("Réassignation de rôle", re.compile(r"(?i)you are now (a|an|no longer)")),
    ("Caractères zero-width", re.compile(r"[​‌‍⁠﻿]")),
    ("Homoglyphe cyrillique dans texte latin", re.compile(r"[a-zA-Z][а-я][a-zA-Z]")),
]

# --- Patterns : code dangereux --------------------------------------------------
CODE_DANGEREUX = [
    ("eval() dynamique", re.compile(r"\beval\s*\(")),
    ("exec() dynamique", re.compile(r"\bexec\s*\(")),
    ("shell=True", re.compile(r"shell\s*=\s*True")),
    ("Reverse shell (netcat)", re.compile(r"\bnc\s+-e\b|\bnetcat\b.{0,20}-e\b")),
    ("Hook git modifié", re.compile(r"\.git/hooks/(pre|post)-\w+")),
    ("Accès répertoire sensible", re.compile(r"~/\.ssh|~/\.aws/credentials|/etc/shadow")),
]

CATEGORIES = {"secret": SECRETS, "injection": INJECTION, "code_dangereux": CODE_DANGEREUX}


def scanner_texte(contenu: str, chemin: str = "") -> list[dict[str, Any]]:
    """Scanne un texte et retourne les correspondances brutes (pas de jugement d'intention)."""
    trouvailles: list[dict[str, Any]] = []
    for categorie, patterns in CATEGORIES.items():
        for nom, regex in patterns:
            for m in regex.finditer(contenu):
                ligne = contenu.count("\n", 0, m.start()) + 1
                trouvailles.append({
                    "categorie": categorie,
                    "type": nom,
                    "fichier": chemin,
                    "ligne": ligne,
                    "extrait": contenu[max(0, m.start() - 20):m.end() + 20].replace("\n", " ").strip()[:120],
                })
    return trouvailles


def scanner_repertoire(chemin: str) -> dict[str, Any]:
    """Scanne récursivement un répertoire (skill tiers, dépôt cloné, code applicatif)."""
    racine = Path(chemin)
    if not racine.exists():
        return {"ok": False, "erreur": f"chemin introuvable : {chemin}"}
    toutes: list[dict[str, Any]] = []
    fichiers_lus = 0
    for p in racine.rglob("*"):
        if not p.is_file():
            continue
        rel_path = p.relative_to(racine)
        if any(part in IGNORER_DOSSIERS for part in rel_path.parts[:-1]):
            continue
        if p.suffix.lower() not in EXTENSIONS_TEXTE:
            continue
        try:
            contenu = p.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        fichiers_lus += 1
        rel = str(rel_path)
        toutes.extend(scanner_texte(contenu, rel))
    par_categorie: dict[str, int] = {}
    for t in toutes:
        par_categorie[t["categorie"]] = par_categorie.get(t["categorie"], 0) + 1
    return {
        "ok": True,
        "chemin": str(racine),
        "fichiers_lus": fichiers_lus,
        "total_trouvailles": len(toutes),
        "par_categorie": par_categorie,
        "trouvailles": toutes,
    }


def _headers() -> dict[str, str]:
    return {"apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}", "Content-Type": "application/json"}


def _journal(msg: str) -> None:
    if not SUPABASE_URL or not SERVICE_KEY:
        return
    try:
        requests.post(
            f"{SUPABASE_URL}/rest/v1/journal",
            headers={**_headers(), "Prefer": "return=minimal"},
            data=json.dumps({"type": "securite_interne", "message": msg[:500]}),
            timeout=TIMEOUT,
        )
    except Exception:
        pass


def main() -> None:
    cible = sys.argv[1] if len(sys.argv) > 1 else "."
    resultat = scanner_repertoire(cible)
    print(json.dumps(resultat, ensure_ascii=False, indent=2))
    if resultat.get("ok"):
        _journal(
            f"Scan sécurité interne « {cible} » : {resultat['fichiers_lus']} fichier(s) lus, "
            f"{resultat['total_trouvailles']} correspondance(s) brute(s) ({resultat['par_categorie']}) — "
            f"à trancher : documentation d'attaque vs code réellement exécuté."
        )


if __name__ == "__main__":
    main()
