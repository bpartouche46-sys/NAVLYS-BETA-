"""
NAVLYS — Veille de RÉSILIENCE & INDÉPENDANCE (worker Python).

Doctrine (gravée) : dès qu'une dépendance externe (MCP, provider, API) flappe,
bloque ou coûte, NAVLYS cherche RÉELLEMENT sur le net + les forums spécialisés
des alternatives, puis construit une BRIQUE INTERNE stable pour s'en passer.
Objectif : 100 % autonome sur notre propre CORE.

Ce module :
  1. lit les incidents ouverts de catégorie 'dependance' dans Supabase,
  2. fait de vraies recherches web (DuckDuckGo HTML, sans clé) en ciblant les
     forums techniques (Stack Overflow, Reddit, GitHub issues),
  3. bancarise les solutions/alternatives trouvées dans core_knowledge,
  4. journalise, pour que MasterNav/NAVLAB tranchent et implémentent.

Lancement : `python -m navlys_core.veille_resilience`
Cron conseillé (Hetzner) : toutes les 30 min, ou après chaque incident.
Dépendances : requests (déjà utilisé par le worker).
"""
from __future__ import annotations
import os
import re
import html
import json
import time
import urllib.parse
from typing import Any

import requests

SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_ROLE", "")
TIMEOUT = 20

# Dépendances critiques à surveiller en continu (audit proactif).
CRITIQUES = [
    "Supabase Edge Functions", "Vercel deploy", "Stripe API", "PayPal API",
    "Meta WhatsApp Cloud API", "Alpaca API", "OpenRouter", "MCP server",
]

FORUMS = "site:stackoverflow.com OR site:reddit.com OR site:github.com OR site:news.ycombinator.com"


def _headers() -> dict[str, str]:
    return {"apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}", "Content-Type": "application/json"}


def _rest(method: str, path: str, **kw) -> Any:
    """Appel PostgREST/REST Supabase en service_role."""
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    r = requests.request(method, url, headers={**_headers(), "Prefer": "return=representation"}, timeout=TIMEOUT, **kw)
    if not r.ok:
        return None
    try:
        return r.json()
    except Exception:
        return None


def recherche_web(query: str, n: int = 6) -> list[dict[str, str]]:
    """Vraie recherche web via DuckDuckGo HTML (aucune clé requise)."""
    try:
        r = requests.post(
            "https://html.duckduckgo.com/html/",
            data={"q": query},
            headers={"User-Agent": "Mozilla/5.0 (NAVLYS-veille)"},
            timeout=TIMEOUT,
        )
        if not r.ok:
            return []
        # Extraction simple des résultats (titre + lien).
        out: list[dict[str, str]] = []
        for m in re.finditer(r'<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', r.text, re.S):
            href = html.unescape(m.group(1))
            # DDG encapsule parfois l'URL réelle dans uddg=
            q = urllib.parse.urlparse(href).query
            real = urllib.parse.parse_qs(q).get("uddg", [href])[0]
            titre = re.sub("<[^>]+>", "", m.group(2))
            out.append({"titre": html.unescape(titre).strip(), "url": real})
            if len(out) >= n:
                break
        return out
    except Exception:
        return []


def _bancariser(kid: str, titre: str, contenu: str) -> None:
    _rest("POST", "core_knowledge", data=json.dumps({
        "id": kid, "section": "technique", "titre": titre[:200], "contenu": contenu[:8000],
    }), params={"on_conflict": "id"})


def _journal(msg: str) -> None:
    _rest("POST", "journal", data=json.dumps({"type": "resilience", "message": msg[:500]}))


def traiter_incidents_dependance() -> int:
    """Recherche des alternatives pour chaque dépendance fragile signalée."""
    incidents = _rest(
        "GET",
        "core_incidents?categorie=eq.dependance&statut=in.(nouveau,en_cours)&select=id,source,sujet,contenu&limit=10",
    ) or []
    n = 0
    for it in incidents:
        source = it.get("source") or "?"
        sujet = it.get("sujet") or ""
        query = f'{source} {sujet} alternative OR fix OR workaround OR self-hosted ({FORUMS})'
        res = recherche_web(query)
        if not res:
            continue
        lignes = "\n".join(f"- {x['titre']} : {x['url']}" for x in res)
        _bancariser(
            f"resil-{it['id']}",
            f"Résilience « {source} » — alternatives trouvées",
            f"Dépendance : {source}\nSujet : {sujet}\n\nPistes (net + forums) :\n{lignes}\n\n"
            f"À trancher par NAVLAB : choisir une alternative OU développer une brique interne stable.",
        )
        _journal(f"Résilience « {source} » #{it['id']} : {len(res)} pistes bancarisées (core_knowledge).")
        n += 1
        time.sleep(1)
    return n


def audit_proactif() -> int:
    """Cherche en continu des briques internes pour nos dépendances critiques."""
    n = 0
    for dep in CRITIQUES:
        res = recherche_web(f'{dep} open source self-hosted alternative OR outage workaround ({FORUMS})', n=4)
        if not res:
            continue
        lignes = "\n".join(f"- {x['titre']} : {x['url']}" for x in res)
        _bancariser(
            f"resil-audit-{re.sub('[^a-z0-9]+', '-', dep.lower())}",
            f"Indépendance — pistes pour se passer de « {dep} »",
            f"Dépendance critique : {dep}\n\nAlternatives / self-hosted / contournements :\n{lignes}",
        )
        n += 1
        time.sleep(1)
    return n


def main() -> None:
    if not SUPABASE_URL or not SERVICE_KEY:
        print("[veille_resilience] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants — abandon.")
        return
    a = traiter_incidents_dependance()
    b = audit_proactif()
    _journal(f"Veille résilience : {a} incident(s) traité(s), {b} dépendance(s) critique(s) auditée(s).")
    print(f"[veille_resilience] incidents={a} audits={b} — vers 100 % autonome.")


if __name__ == "__main__":
    main()
