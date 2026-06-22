import time
import traceback
from datetime import datetime, timezone

import requests

from .config import Config, resolve_model
from .supabase_client import Supabase
from . import llm


# Règles cadre injectées dans CHAQUE agent (garde-fous non négociables).
REGLES_CORE = """Tu es un agent du NAVLYS CORE, coordonné par MasterNav pour Bruno.

Règles non négociables :
- Statut SIMPLE CITOYEN : aucune mention CIF / ORIAS / conseiller en investissement.
  Éducation et information générale uniquement. Jamais de conseil personnalisé,
  jamais de promesse de rendement. Disclaimers d'office sur tout contenu financier.
- Charte : fond noir, ice blue respirant + champagne or ; ZÉRO pourpre/mauve/fuchsia.
- Tu PRÉPARES le travail. Tu ne publies pas, n'envoies aucun email, ne dépenses
  rien, ne déploies pas, ne signes rien de toi-même.
- Toute action externe ou coûteuse est laissée à la VALIDATION de Bruno
  (la mission passe au statut « a_valider »).

Produis un livrable clair, actionnable, en français, prêt à être validé.
"""


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def build_context(sb: Supabase, dept: str, cfg: Config) -> str:
    """Construit le contexte RAG léger : mémoire vive + dossiers du département."""
    parts = []
    try:
        mem = sb.select(
            "navlys_memoire",
            f"select=titre,contenu,importance&order=importance.desc&limit={cfg.memory_limit}",
        )
        if mem:
            parts.append("# Mémoire vive\n" + "\n".join(
                f"- {m.get('titre')}: {m.get('contenu')}" for m in mem))
    except Exception:
        pass
    try:
        dos = sb.select("dossiers", f"departement=eq.{dept}&select=titre,statut,contenu&limit=10")
        if dos:
            parts.append("# Dossiers du département\n" + "\n".join(
                f"- [{d.get('statut')}] {d.get('titre')}: {(d.get('contenu') or '')[:200]}"
                for d in dos))
    except Exception:
        pass
    return "\n\n".join(parts) or "(aucun contexte)"


def notify(cfg: Config, text: str) -> None:
    """Alerte « à valider » via Telegram si configuré (sinon no-op)."""
    if cfg.telegram_token and cfg.telegram_chat_id:
        try:
            requests.post(
                f"https://api.telegram.org/bot{cfg.telegram_token}/sendMessage",
                json={"chat_id": cfg.telegram_chat_id, "text": text}, timeout=15)
        except Exception:
            pass


def _run_id(run) -> int:
    return run[0]["id"] if isinstance(run, list) else run["id"]


def process_mission(sb: Supabase, cfg: Config, agent: dict, mission: dict) -> str:
    mid = mission["id"]
    dept = agent["id"]
    model = resolve_model(agent.get("modele"), cfg.default_model)

    run = sb.insert("agent_runs", {
        "agent_id": dept, "mission_id": mid, "statut": "running",
        "input": {"titre": mission.get("titre"), "consigne": mission.get("consigne")},
    })
    run_id = _run_id(run)

    try:
        system = REGLES_CORE + f"\n\n# Ton rôle ({agent['nom']})\n{agent['role']}"
        context = build_context(sb, dept, cfg)
        user = (
            f"# Mission\nTitre : {mission.get('titre')}\n"
            f"Consigne : {mission.get('consigne')}\n\n# Contexte\n{context}\n\n"
            "Réalise la mission et rends un livrable prêt à valider."
        )
        output, tokens = llm.chat(cfg.openrouter_key, model, system, user, cfg.max_tokens)

        auto = agent.get("autonomie") == "auto"
        new_statut = "fait" if auto else "a_valider"
        sb.update("missions", f"id=eq.{mid}", {
            "statut": new_statut, "resultat": output,
            "assigned_agent": dept, "finished_at": now_iso(),
        })
        sb.update("agent_runs", f"id=eq.{run_id}", {
            "statut": "done", "output": output, "tokens": tokens, "finished_at": now_iso(),
        })
        sb.insert("journal", {
            "type": "agent",
            "message": f"{dept} a traité la mission #{mid} ({mission.get('titre')}) -> {new_statut}",
        })
        if not auto:
            notify(cfg, f"NAVLYS — {dept} a préparé la mission #{mid} : "
                        f"{mission.get('titre')}. A valider.")
        return new_statut
    except Exception as e:
        detail = f"{e}\n{traceback.format_exc()[:600]}"
        sb.update("missions", f"id=eq.{mid}",
                  {"statut": "erreur", "erreur": str(e)[:500], "finished_at": now_iso()})
        sb.update("agent_runs", f"id=eq.{run_id}",
                  {"statut": "error", "erreur": detail, "finished_at": now_iso()})
        sb.insert("journal", {"type": "erreur",
                  "message": f"{dept} erreur mission #{mid}: {str(e)[:200]}"})
        return "erreur"


def claim(sb: Supabase, dept: str):
    res = sb.rpc("claim_next_mission", {"p_departement": dept})
    if not res:
        return None
    if isinstance(res, list):
        return res[0] if res else None
    return res


def run_cycle(sb: Supabase, cfg: Config, agents: list) -> int:
    worked = 0
    for agent in agents:
        if not agent.get("actif", True):
            continue
        mission = claim(sb, agent["id"])
        if mission:
            statut = process_mission(sb, cfg, agent, mission)
            print(f"[{agent['id']}] mission #{mission['id']} -> {statut}")
            worked += 1
    return worked


def main(once: bool = False) -> None:
    cfg = Config()
    sb = Supabase(cfg.supabase_url, cfg.service_key)
    agents = sb.select("agents", "select=*&order=id")
    print(f"NAVLYS CORE worker — {len(agents)} agents chargés. "
          f"(poll={cfg.poll_seconds}s, once={once})")
    while True:
        try:
            n = run_cycle(sb, cfg, agents)
            if once:
                if n == 0:
                    print("Aucune mission à traiter.")
                break
            if n == 0:
                time.sleep(cfg.poll_seconds)
        except Exception as e:
            print("Erreur cycle:", e)
            if once:
                break
            time.sleep(cfg.poll_seconds)
