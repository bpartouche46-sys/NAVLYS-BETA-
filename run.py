#!/usr/bin/env python3
"""Point d'entrée du worker NAVLYS CORE.

Usage :
    python run.py            # boucle continue (24/7 sur serveur) — autopilote inclus
    python run.py --once     # un seul cycle de traitement puis sort (test rapide)
    python run.py --plan     # génère UNE feuille de route autopilote puis sort (test)
"""
import argparse

from navlys_core.worker import main


def _plan_once() -> None:
    """Déclenche une seule passe de planification autonome (test/manuel)."""
    from navlys_core.config import Config
    from navlys_core.supabase_client import Supabase
    from navlys_core import autopilote
    cfg = Config()
    sb = Supabase(cfg.supabase_url, cfg.service_key)
    agents = sb.select("agents", "select=*&order=id")
    n = autopilote.plan(sb, cfg, agents)
    print(f"Autopilote : {n} mission(s) créée(s).")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="NAVLYS CORE worker")
    parser.add_argument("--once", action="store_true",
                        help="Exécute un seul cycle puis sort (test).")
    parser.add_argument("--plan", action="store_true",
                        help="Génère une feuille de route autopilote puis sort (test).")
    args = parser.parse_args()
    if args.plan:
        _plan_once()
    else:
        main(once=args.once)
