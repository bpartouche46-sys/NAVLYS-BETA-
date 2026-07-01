"""
NAVLYS CORE PORTABLE — le cerveau central, indépendant et transportable.

Vision de départ (Bruno) : un CORE en Python que l'on peut embarquer dans
N'IMPORTE QUEL support — serveur, mobile, Raspberry Pi, robot (ROS) — et qui
tourne SEUL, même hors ligne, en portant les 14 agents, la mémoire, les
doctrines et le RÈGLEMENT NAVLYS CORE BM.

Pourquoi Python : il tourne partout (Linux/mobile via Termux, embarqué, ROS,
edge), sans navigateur, sans cloud obligatoire. Le même cerveau se transplante.

Principe : « cloud si disponible, sinon local ». En ligne, il se synchronise
avec Supabase ; hors ligne, il vit sur une base locale SQLite. Aucune dépendance
dure : sqlite3 (stdlib) suffit ; requests seulement pour la synchro cloud.

Lancement : python -m navlys_core.portable   (démo interactive)
Import :    from navlys_core.portable import Core ; c = Core(); c.penser("...")
"""
from __future__ import annotations
import os
import sqlite3
import json
import time

# ── Les 14 équipes (routage par mots-clés) ──
AGENTS = {
    "NAVFI":  ["bourse", "finance", "etf", "crypto", "épargne", "marché", "90/10", "martingale"],
    "NAVLEX": ["juridique", "droit", "rgpd", "cgv", "mentions", "légal"],
    "NAVME":  ["mémoire", "souvenir", "apprentissage", "next gen", "biographie", "récit"],
    "NAVTECH":["site", "bug", "technique", "déploiement", "code", "vercel", "supabase"],
    "NAVMKT": ["marketing", "vues", "réseau", "campagne", "offre", "prix", "commercial"],
    "NAVCOM": ["post", "communication", "news", "article", "presse", "faq"],
    "NAVLAB": ["recherche", "innovation", "alternative", "prototype", "résilience"],
    "NAVLEAD":["influenceur", "ambassadeur", "communauté", "leadership"],
    "NAVPART":["partenaire", "affiliation", "alpaca", "broker"],
    "NAVPTE": ["sécurité", "secret", "faille", "incident", "protection"],
    "NAVGEN": ["visuel", "logo", "image", "design", "coloriage"],
    "NAVBIEN":["bien-être", "accessibilité", "reiki", "réflexo"],
    "NAVDEM": ["produit", "appli", "feedback", "sav", "client"],
    "NAVBIO": ["photo", "vidéo", "montage", "voix", "vie", "chapitre"],
}

# ── Doctrines embarquées (le cerveau connaît ses règles, même hors ligne) ──
REGLEMENT = {
    "validation_defaut": "OUI — avancer sans demander, sauf vrai débit d'argent (signalement 1 ligne).",
    "publication": "LIVE direct ; nouvelle fonctionnalité = page isolée testée mobile + PC.",
    "charte": "ice blue + or, fond sombre ; jamais pourpre/fuchsia.",
    "posture": "français, statut simple citoyen, Bruno invisible.",
    "finance": "90/10, éducatif, jamais de conseil personnalisé.",
    "independance": "toute dépendance instable -> brique interne ; objectif 100% autonome.",
    "objectif": "avancer jusqu'au 100% opérationnel, commercialisable, testé mobile + PC.",
}

DB_PATH = os.environ.get("NAVLYS_LOCAL_DB", os.path.join(os.path.dirname(__file__), "navlys_core.db"))
SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_SERVICE_ROLE", "")


def router(texte: str) -> str:
    """Choisit l'équipe la plus pertinente pour une demande."""
    t = (texte or "").lower()
    best, score = "NAVDEM", 0
    for code, kws in AGENTS.items():
        s = sum(1 for k in kws if k in t)
        if s > score:
            best, score = code, s
    return best


class Core:
    """Le cerveau portable. Fonctionne hors ligne (SQLite) ou en ligne (Supabase)."""

    def __init__(self, db_path: str = DB_PATH):
        self.online = bool(SUPABASE_URL and SERVICE_KEY)
        self.db = sqlite3.connect(db_path)
        self._init_local()

    def _init_local(self):
        c = self.db.cursor()
        c.execute("create table if not exists missions(id integer primary key, ts real, agent text, texte text, statut text, decision text)")
        c.execute("create table if not exists memoire(id integer primary key, ts real, type text, contenu text)")
        c.execute("create table if not exists journal(id integer primary key, ts real, type text, message text)")
        self.db.commit()

    def _journal(self, typ: str, msg: str):
        self.db.execute("insert into journal(ts,type,message) values(?,?,?)", (time.time(), typ, msg))
        self.db.commit()

    def penser(self, demande: str) -> dict:
        """Reçoit une demande, la route, applique le RÈGLEMENT, décide, journalise.

        Respecte la règle d'or : réponse par défaut = OUI (avancer), sauf un vrai
        débit d'argent -> il le signale au lieu d'exécuter.
        """
        agent = router(demande)
        debit = any(w in demande.lower() for w in ("payer", "débit", "achat", "acheter", "paiement réel", "carte réelle"))
        if debit:
            decision = "⚠️ Débit d'argent détecté : signalement AVANT action (Bible §6). En attente d'un feu explicite."
            statut = "a_signaler"
        else:
            decision = f"OUI — {agent} prépare et avance (règlement : {REGLEMENT['validation_defaut']})."
            statut = "en_cours"
        self.db.execute(
            "insert into missions(ts,agent,texte,statut,decision) values(?,?,?,?,?)",
            (time.time(), agent, demande, statut, decision),
        )
        self.db.commit()
        self._journal("penser", f"[{agent}] {demande[:80]} -> {statut}")
        if self.online:
            self._sync_cloud(agent, demande, statut)
        return {"agent": agent, "statut": statut, "decision": decision, "online": self.online}

    def _sync_cloud(self, agent: str, demande: str, statut: str):
        """Pousse la mission vers Supabase quand le réseau est là (best effort)."""
        try:
            import requests  # importé seulement si en ligne
            requests.post(
                f"{SUPABASE_URL}/rest/v1/missions",
                headers={"apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}",
                         "Content-Type": "application/json", "Prefer": "return=minimal"},
                data=json.dumps({"departement": agent, "titre": demande[:120], "consigne": demande,
                                 "statut": "a_faire", "priorite": 3}),
                timeout=10,
            )
        except Exception:
            pass  # hors ligne = on garde en local, on synchronisera plus tard

    def etat(self) -> dict:
        c = self.db.cursor()
        m = c.execute("select count(*) from missions").fetchone()[0]
        return {"mode": "en ligne (cloud+local)" if self.online else "hors ligne (local seul)",
                "missions_locales": m, "equipes": len(AGENTS), "reglement": REGLEMENT["objectif"]}


def main():
    core = Core()
    print("🧭 NAVLYS CORE PORTABLE —", core.etat()["mode"])
    print("   Le cerveau transportable est prêt (robot / mobile / serveur).")
    print("   Tape une demande (ou 'q' pour quitter).")
    while True:
        try:
            d = input("\n> ").strip()
        except (EOFError, KeyboardInterrupt):
            break
        if not d or d.lower() == "q":
            break
        r = core.penser(d)
        print(f"  → équipe {r['agent']} · {r['statut']}\n    {r['decision']}")


if __name__ == "__main__":
    main()
