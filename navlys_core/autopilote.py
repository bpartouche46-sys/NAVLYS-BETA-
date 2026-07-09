"""Autopilote NAVLYS CORE — le CORE se dirige SEUL, de A à Z.

Objectif (ordre de Bruno, 2026-07-09) : que le NAVLYS CORE dirige l'ensemble
de l'opération à partir de ses propres agents, sur son serveur, SANS attendre
la voix de Bruno. À intervalle régulier, le cerveau (Claude via clé Anthropic
directe, OpenRouter en repli) établit lui-même la feuille de route du jour et
enfile des missions vers les 14 départements.

Garde-fous NON négociables (Bible §6) :
- L'autopilote ne crée QUE des missions de PRÉPARATION. Les agents préparent ;
  ils ne publient rien, n'envoient aucun email, ne dépensent rien, ne déploient
  rien. Tout livrable sensible reste en « a_valider » (géré par worker.py).
- Aucun vrai débit d'argent n'est déclenché par l'autopilote.
- Il ne pile pas les missions : si la file « à faire » est déjà pleine
  (>= autopilot_max), il passe son tour.
"""
import json
import re
from datetime import datetime, timezone

from . import llm
from .config import resolve_anthropic


PLAN_SYSTEM = """Tu es MasterNav, le chef d'orchestre autonome du NAVLYS CORE.

Tu diriges 14 agents de département. Ton rôle ici : établir la FEUILLE DE ROUTE
du moment — décider, pour les départements qui en ont le plus besoin, UNE
prochaine tâche concrète qui fait avancer NAVLYS « un cran de mieux qu'hier ».

Cadre (non négociable) :
- Positionnement : NAVLYS = la première IA qui orchestre d'autres IA depuis un
  téléphone (Next Gen / concierge en tête ; la finance n'est qu'un détail).
- Chaque tâche est de la PRÉPARATION seulement : rien de publié, envoyé, déployé
  ou payé. Statut simple citoyen, charte ice blue + or, tutoiement.
- Priorise le fil rouge : zéro erreur sur navlys.com, funnel d'inscription,
  parrainage/ambassadeurs, accessibilité (karaoké), contenu et cohérence.

Réponds UNIQUEMENT par un tableau JSON strict, sans texte autour :
[{"departement":"CODE","consigne":"tâche concrète et actionnable"}]
- "departement" = un des codes fournis dans le contexte.
- 1 tâche par département au maximum, seulement pour ceux qui en ont besoin.
- Au plus le nombre maximum indiqué. Consignes courtes, précises, utiles."""


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _pending_count(sb) -> int:
    """Nombre de missions non terminées (file de travail en attente)."""
    try:
        rows = sb.select("missions", "select=id,statut&statut=in.(a_faire,en_cours)")
        return len(rows or [])
    except Exception:
        return 0


def _state_context(sb, agents: list) -> str:
    parts = []
    codes = [a["id"] for a in agents if a.get("actif", True)]
    parts.append("# Départements disponibles (codes)\n" + ", ".join(codes))

    # Répartition des missions par statut (vue d'ensemble).
    try:
        rows = sb.select("missions", "select=statut") or []
        by = {}
        for r in rows:
            by[r["statut"]] = by.get(r["statut"], 0) + 1
        if by:
            parts.append("# Missions par statut\n" + ", ".join(
                f"{k}={v}" for k, v in sorted(by.items())))
    except Exception:
        pass

    # Point faible du dernier autotest (pour cibler).
    try:
        cfgrows = sb.select("core_config", "select=cle,valeur&cle=in.(last_autotest_weak,last_autotest_score,recursive_growth_level)")
        if cfgrows:
            parts.append("# Signaux d'auto-évaluation\n" + "\n".join(
                f"- {c.get('cle')}: {c.get('valeur')}" for c in cfgrows))
    except Exception:
        pass

    # Mémoire vive (doctrine + priorités).
    try:
        mem = sb.select("navlys_memoire",
                        "select=titre,contenu&order=importance.desc&limit=6") or []
        if mem:
            parts.append("# Mémoire vive (priorités)\n" + "\n".join(
                f"- {m.get('titre')}: {(m.get('contenu') or '')[:160]}" for m in mem))
    except Exception:
        pass

    return "\n\n".join(parts)


def _parse_plan(text: str) -> list:
    """Extrait un tableau JSON [{departement, consigne}] même si le modèle
    a ajouté du texte autour."""
    if not text:
        return []
    # Retire d'éventuels fences ```json ... ```
    text = text.strip()
    m = re.search(r"\[.*\]", text, re.S)
    raw = m.group(0) if m else text
    try:
        data = json.loads(raw)
    except Exception:
        return []
    out = []
    if isinstance(data, list):
        for item in data:
            if not isinstance(item, dict):
                continue
            dept = (item.get("departement") or item.get("dept") or "").strip().upper()
            consigne = (item.get("consigne") or item.get("tache") or "").strip()
            if dept and consigne:
                out.append({"departement": dept, "consigne": consigne})
    return out


def plan(sb, cfg, agents: list) -> int:
    """Génère et enfile la feuille de route du CORE. Retourne le nombre de
    missions créées (0 s'il a passé son tour)."""
    valid = {a["id"] for a in agents if a.get("actif", True)}

    pending = _pending_count(sb)
    if pending >= cfg.autopilot_max:
        # La file est déjà pleine : on laisse les agents avancer, pas de pile.
        return 0

    budget = max(1, cfg.autopilot_max - pending)
    context = _state_context(sb, agents)
    user = (
        f"# Contexte NAVLYS\n{context}\n\n"
        f"Établis la feuille de route : au plus {budget} tâche(s) de PRÉPARATION, "
        "pour les départements qui en ont le plus besoin maintenant. JSON strict."
    )

    amodel = resolve_anthropic(cfg.default_model, cfg.default_anthropic_model)
    try:
        output, _tokens = llm.chat(
            PLAN_SYSTEM, "# Mode : planification autonome", user,
            model=cfg.default_model, anthropic_key=cfg.anthropic_key,
            anthropic_model=amodel, openrouter_key=cfg.openrouter_key,
            provider=cfg.llm_provider, max_tokens=900, temperature=0.5)
    except Exception as e:
        sb.insert("journal", {"type": "autopilote",
                  "message": f"Autopilote : cerveau indisponible ({str(e)[:160]})"})
        return 0

    items = _parse_plan(output)[:budget]
    created = 0
    for it in items:
        dept = it["departement"]
        if dept not in valid:
            continue
        consigne = it["consigne"][:600]
        try:
            row = sb.insert("missions", {
                "departement": dept,
                "titre": consigne[:120],
                "consigne": consigne,
                "priorite": 3,
                "statut": "a_faire",
                "assigned_agent": "Autopilote",
            })
            mid = row[0]["id"] if isinstance(row, list) else row["id"]
            created += 1
            sb.insert("journal", {"type": "autopilote",
                      "message": f"Autopilote -> {dept} mission #{mid} : {consigne[:120]}"})
        except Exception:
            continue

    if created:
        print(f"[autopilote] feuille de route : {created} mission(s) créée(s).")
    return created
