"""MasterNav — chef d'orchestre & interface humaine de NAVLYS CORE.

Point d'entrée UNIQUE entre Bruno et les 14 agents, via Telegram.
Bruno écrit `@navfi <ordre>` ou une commande `/...` ; MasterNav crée la mission,
route vers le bon agent, et permet de valider/refuser les livrables.

Lancement :
    python -m navlys_core.masternav        # bot d'écoute (long-polling)

Doctrine (voir MASTERNAV.md §4) : réponse par défaut de Bruno = OUI/VALIDER.
MasterNav prend la main ; seul un débit d'argent réel déclenche un signalement.
"""
import time
import requests

from .config import Config
from .supabase_client import Supabase


# Mots-clés -> département, pour router un message sans @handle explicite.
KEYWORDS = {
    "NAVFI": ["bourse", "finance", "etf", "crypto", "épargne", "leçon", "marché"],
    "NAVCOM": ["post", "réseau", "communication", "news", "article", "presse", "faq"],
    "NAVTECH": ["site", "infra", "vercel", "déploiement", "bug", "technique", "migration"],
    "NAVLEX": ["juridique", "rgpd", "cgv", "mentions", "conformité", "légal"],
    "NAVPART": ["partenaire", "affiliation", "binance", "alpaca", "etoro", "bybit"],
    "NAVPTE": ["sécurité", "secret", "faille", "protection", "audit sécu"],
    "NAVGEN": ["visuel", "logo", "image", "génome", "design"],
    "NAVBIO": ["souvenir", "biographie", "livre de vie", "next gen", "héritage"],
    "NAVLAB": ["recherche", "prototype", "innovation", "r&d"],
    "NAVLEAD": ["influenceur", "ambassadeur", "créateur"],
    "NAVBIEN": ["bien-être", "reiki", "réflexo", "accessibilité"],
    "NAVDEM": ["produit", "appli", "feedback", "retour membre", "évolution"],
    "NAVME": ["mémoire", "souvenir interne", "apprentissage"],
    "NAVMKT": ["cohérence", "uniformise", "rapport", "synthèse"],
}


class Telegram:
    def __init__(self, token: str):
        self.base = f"https://api.telegram.org/bot{token}"

    def get_updates(self, offset: int, timeout: int = 50):
        r = requests.get(f"{self.base}/getUpdates",
                         params={"offset": offset, "timeout": timeout},
                         timeout=timeout + 10)
        r.raise_for_status()
        return r.json().get("result", [])

    def send(self, chat_id, text: str):
        # Telegram limite à ~4096 caractères : on tronque proprement.
        if len(text) > 3900:
            text = text[:3900] + "\n…(tronqué)"
        requests.post(f"{self.base}/sendMessage",
                      json={"chat_id": chat_id, "text": text}, timeout=15)


def load_handles(sb: Supabase) -> dict:
    """handle (sans @) -> id de département."""
    agents = sb.select("agents", "select=id,handle,prenom,role")
    out = {}
    for a in agents:
        h = (a.get("handle") or "").lstrip("@").lower()
        if h:
            out[h] = a
    return out


def route(text: str, handles: dict) -> dict | None:
    """Détermine l'agent cible d'un message libre."""
    low = text.lower()
    for h, agent in handles.items():
        if f"@{h}" in low:
            return agent
    for dept, words in KEYWORDS.items():
        if any(w in low for w in words):
            return next((a for a in handles.values() if a["id"] == dept), None)
    # Par défaut : Marc (NAVMKT) dispatche.
    return next((a for a in handles.values() if a["id"] == "NAVMKT"), None)


def strip_handle(text: str) -> str:
    return " ".join(w for w in text.split() if not w.startswith("@")).strip()


def cmd_recap(sb: Supabase) -> str:
    rows = sb.select("missions", "select=id,titre,statut,departement&order=statut,id")
    by = {}
    for m in rows:
        by.setdefault(m["statut"], []).append(m)
    parts = ["📊 RÉCAP MISSIONS"]
    for statut in ("a_valider", "a_faire", "en_cours", "fait", "erreur"):
        items = by.get(statut, [])
        if items:
            parts.append(f"\n— {statut} ({len(items)}) —")
            parts += [f"#{m['id']} [{m['departement']}] {m['titre']}" for m in items]
    return "\n".join(parts)


def cmd_agents(handles: dict) -> str:
    lines = ["👥 LES 14 AGENTS"]
    for a in sorted(handles.values(), key=lambda x: x["id"]):
        lines.append(f"{a.get('prenom','?')} {a.get('handle','')} — {a['id']}")
    return "\n".join(lines)


def cmd_voir(sb: Supabase, mid: str) -> str:
    rows = sb.select("missions", f"id=eq.{mid}&select=id,titre,statut,resultat")
    if not rows:
        return f"Mission #{mid} introuvable."
    m = rows[0]
    return f"#{m['id']} {m['titre']} [{m['statut']}]\n\n{m.get('resultat') or '(pas de livrable)'}"


def cmd_valider(sb: Supabase, mid: str) -> str:
    sb.update("missions", f"id=eq.{mid}", {"statut": "fait"})
    sb.insert("journal", {"type": "validation", "message": f"Bruno a validé la mission #{mid}"})
    return f"✅ Mission #{mid} validée (fait)."


def cmd_refuser(sb: Supabase, mid: str, motif: str) -> str:
    sb.update("missions", f"id=eq.{mid}", {"statut": "a_faire", "erreur": motif[:500]})
    sb.insert("journal", {"type": "refus", "message": f"Bruno a refusé #{mid}: {motif[:200]}"})
    return f"↩️ Mission #{mid} refusée et remise à faire. Motif noté."


def new_mission(sb: Supabase, agent: dict, consigne: str) -> str:
    row = sb.insert("missions", {
        "departement": agent["id"], "titre": consigne[:120],
        "consigne": consigne, "priorite": 2, "statut": "a_faire",
    })
    mid = row[0]["id"] if isinstance(row, list) else row["id"]
    sb.insert("journal", {"type": "ordre",
              "message": f"Bruno -> {agent.get('prenom')} ({agent['id']}) mission #{mid}"})
    return (f"📥 Mission #{mid} confiée à {agent.get('prenom')} ({agent.get('handle')}).\n"
            f"Il prépare ; tu recevras le livrable à valider.")


def handle_message(sb: Supabase, tg: Telegram, handles: dict, chat_id, text: str):
    text = text.strip()
    low = text.lower()
    if low.startswith("/recap"):
        tg.send(chat_id, cmd_recap(sb)); return
    if low.startswith("/agents"):
        tg.send(chat_id, cmd_agents(handles)); return
    if low.startswith("/voir"):
        parts = text.split()
        tg.send(chat_id, cmd_voir(sb, parts[1]) if len(parts) > 1 else "Usage: /voir <id>"); return
    if low.startswith("/valider"):
        parts = text.split()
        tg.send(chat_id, cmd_valider(sb, parts[1]) if len(parts) > 1 else "Usage: /valider <id>"); return
    if low.startswith("/refuser"):
        parts = text.split(maxsplit=2)
        if len(parts) >= 2:
            tg.send(chat_id, cmd_refuser(sb, parts[1], parts[2] if len(parts) > 2 else "non précisé"))
        else:
            tg.send(chat_id, "Usage: /refuser <id> <motif>")
        return
    # Sinon : message libre -> création de mission routée.
    agent = route(text, handles)
    if not agent:
        tg.send(chat_id, "Je n'ai pas su router ce message. Essaie un @handle (ex. @navfi …)."); return
    consigne = strip_handle(text) or text
    tg.send(chat_id, new_mission(sb, agent, consigne))


def main():
    cfg = Config()
    if not cfg.telegram_token:
        raise SystemExit("TELEGRAM_BOT_TOKEN manquant : renseigne-le dans .env "
                         "(voir MASTERNAV.md §5).")
    sb = Supabase(cfg.supabase_url, cfg.service_key)
    tg = Telegram(cfg.telegram_token)
    handles = load_handles(sb)
    print(f"MasterNav en écoute — {len(handles)} agents. Ctrl+C pour arrêter.")
    offset = 0
    while True:
        try:
            for upd in tg.get_updates(offset):
                offset = upd["update_id"] + 1
                msg = upd.get("message") or upd.get("edited_message")
                if not msg or "text" not in msg:
                    continue
                # Filtre : ne répond qu'au chat autorisé si TELEGRAM_CHAT_ID est défini.
                chat_id = msg["chat"]["id"]
                if cfg.telegram_chat_id and str(chat_id) != str(cfg.telegram_chat_id):
                    continue
                handle_message(sb, tg, handles, chat_id, msg["text"])
        except KeyboardInterrupt:
            print("Arrêt MasterNav."); break
        except Exception as e:
            print("MasterNav erreur:", e)
            time.sleep(5)


if __name__ == "__main__":
    main()
