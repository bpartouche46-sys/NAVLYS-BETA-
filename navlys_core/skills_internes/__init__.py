"""
NAVLYS — Skills internes.

Doctrine (gravée par Bruno, 2026-07-09) : les capacités utiles des skills Claude
(revue de sécurité, bonnes pratiques, veille...) doivent être répliquées en
Python, EN INTERNE, sur notre propre serveur — pour que le CORE les ait
nativement, sans dépendre d'une session Claude Code. Chaque skill copié ici
suit le même schéma que `navlys_core/veille_resilience.py` : pur Python,
`requests` pour Supabase, journalisé, exécutable en cron sur Hetzner.

Premier skill copié : `securite` (port de skill-scanner / security-review /
find-bugs — détection de secrets, code dangereux, injection de prompt).
"""
