#!/usr/bin/env python3
"""Point d'entrée du worker NAVLYS CORE.

Usage :
    python run.py            # boucle continue (24/7 sur serveur)
    python run.py --once     # un seul cycle (test rapide)
"""
import argparse

from navlys_core.worker import main

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="NAVLYS CORE worker")
    parser.add_argument("--once", action="store_true",
                        help="Exécute un seul cycle puis sort (test).")
    args = parser.parse_args()
    main(once=args.once)
