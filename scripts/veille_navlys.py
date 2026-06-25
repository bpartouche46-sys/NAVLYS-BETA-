#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Veille NAVLYS — routine QUOTIDIENNE autonome, HORS token Claude.
------------------------------------------------------------------
Tourne sur le core (Hetzner) via un "cron" (minuteur). Aucune dépendance
externe (Python standard uniquement). Aucun appel à Claude → 0 token.

Ce que ça fait chaque jour :
  1. Va voir les pages prix des concurrents NavFin.
  2. Repère les prix affichés (best-effort) et détecte si la page a CHANGÉ
     depuis la veille (🔔).
  3. Écrit un résumé du jour dans Supabase (table `daily_brief`).

Secrets : JAMAIS en dur ici. Lus dans les variables d'environnement
  SUPABASE_URL et SUPABASE_SERVICE_KEY (posées sur le serveur, hors Git).
"""

import os, re, json, hashlib, urllib.request, datetime

# --- Concurrents suivis (réf. = prix connu lors de l'étude du 2026-06-24) ---
SOURCES = [
    {"nom": "Snowball+",      "url": "https://media.snowball.xyz/",   "ref": "9 €/mois"},
    {"nom": "Finary Plus",    "url": "https://finary.com/fr/pricing", "ref": "24,99 €/mois"},
    {"nom": "Finimize",       "url": "https://finimize.com/",         "ref": "~9 €/mois"},
    {"nom": "Seeking Alpha",  "url": "https://about.seekingalpha.com/premium-subscription-price-update", "ref": "~25 €/mois"},
]

STATE_FILE = os.environ.get("VEILLE_STATE", "veille_state.json")
PRICE_RE = re.compile(r"(\d{1,4}[.,]\d{2})\s*€|€\s*(\d{1,4}[.,]\d{2})")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "NAVLYS-Veille/1.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", "ignore")


def load_state():
    try:
        with open(STATE_FILE) as f:
            return json.load(f)
    except Exception:
        return {}


def save_state(s):
    try:
        d = os.path.dirname(STATE_FILE)
        if d:
            os.makedirs(d, exist_ok=True)
        with open(STATE_FILE, "w") as f:
            json.dump(s, f)
    except Exception as e:
        print("warn: sauvegarde état impossible:", e)


def post_supabase(titre, contenu, sources):
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")
    if not url or not key:
        print("(Supabase non configuré — rapport affiché seulement, rien enregistré)")
        return
    body = json.dumps({"titre": titre, "contenu": contenu, "sources": sources}).encode("utf-8")
    req = urllib.request.Request(
        url.rstrip("/") + "/rest/v1/daily_brief", data=body, method="POST",
        headers={"Content-Type": "application/json", "apikey": key,
                 "Authorization": "Bearer " + key, "Prefer": "return=minimal"})
    try:
        urllib.request.urlopen(req, timeout=20)
        print("✓ Résumé écrit dans Supabase (daily_brief)")
    except Exception as e:
        print("warn: écriture Supabase impossible:", e)


def main():
    state = load_state()
    today = datetime.date.today().isoformat()
    lignes, changements = [], []

    for s in SOURCES:
        try:
            html = fetch(s["url"])
        except Exception as e:
            lignes.append(f"⚠️ {s['nom']} : page injoignable ({e})")
            continue
        h = hashlib.sha256(html.encode("utf-8", "ignore")).hexdigest()[:16]
        prix = sorted({(m[0] or m[1]) for m in PRICE_RE.findall(html)})[:6]
        prev = state.get(s["url"], {})
        change = bool(prev.get("hash")) and prev["hash"] != h
        if change:
            changements.append(s["nom"])
        marqueur = "🔔" if change else "•"
        prix_txt = ", ".join(p + " €" for p in prix) if prix else "non détecté (page en JS ?)"
        lignes.append(f"{marqueur} {s['nom']} (réf {s['ref']}) — prix repérés : {prix_txt}")
        state[s["url"]] = {"hash": h, "prix": prix, "date": today}

    save_state(state)
    titre = f"Veille concurrence NavFin — {today}"
    if changements:
        titre += f" · {len(changements)} changement(s) : " + ", ".join(changements)
    contenu = "\n".join(lignes)
    print(titre)
    print(contenu)
    post_supabase(titre, contenu, [s["url"] for s in SOURCES])


if __name__ == "__main__":
    main()
