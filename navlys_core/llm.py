"""Cerveau LLM du NAVLYS CORE.

Deux fournisseurs, choisis automatiquement pour la RÉSILIENCE (indépendance du
CORE, doctrine « survie à une coupure Claude/Anthropic ») :

  1. Anthropic DIRECT (clé payante ANTHROPIC_API_KEY) — priorité par défaut,
     c'est le canal indépendant que Bruno pilote.
  2. OpenRouter — filet de secours : si Anthropic est indisponible (panne,
     quota, réseau), le CORE bascule SEUL sans s'arrêter.

C'est le même pattern `callBrain` que `api/whatsapp-webhook.js`, propagé ici
au worker Python (chantier NAVTECH « propager le repli à toutes les briques »).
"""
import requests

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_VERSION = "2023-06-01"


# ── Fournisseur 1 : Anthropic DIRECT ──────────────────────────────────────
def chat_anthropic(api_key: str, model: str, system_core: str, system_role: str,
                   user: str, max_tokens: int = 1500, temperature: float = 0.3):
    """Appel natif à l'API Messages d'Anthropic.

    Le `system` est envoyé en deux blocs : REGLES_CORE (stable, mis en cache
    via cache_control) puis le rôle de l'agent (variable). Retourne
    (contenu, total_tokens)."""
    headers = {
        "x-api-key": api_key,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json",
    }
    body = {
        "model": model,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "system": [
            {"type": "text", "text": system_core,
             "cache_control": {"type": "ephemeral"}},
            {"type": "text", "text": system_role},
        ],
        "messages": [{"role": "user", "content": user}],
    }
    r = requests.post(ANTHROPIC_URL, json=body, headers=headers, timeout=120)
    r.raise_for_status()
    data = r.json()
    # Concatène les blocs texte de la réponse.
    parts = [b.get("text", "") for b in data.get("content", []) if b.get("type") == "text"]
    content = "".join(parts).strip()
    usage = data.get("usage") or {}
    tokens = (usage.get("input_tokens") or 0) + (usage.get("output_tokens") or 0)
    return content, (tokens or None)


# ── Fournisseur 2 : OpenRouter (repli) ────────────────────────────────────
def _build_system(model: str, system_core: str, system_role: str):
    """Système pour OpenRouter : bloc caché pour les modèles Anthropic,
    sinon simple chaîne (ex. Hermès)."""
    if model.startswith("anthropic/"):
        return [
            {"type": "text", "text": system_core,
             "cache_control": {"type": "ephemeral"}},
            {"type": "text", "text": system_role},
        ]
    return f"{system_core}\n\n{system_role}"


def chat_openrouter(api_key: str, model: str, system_core: str, system_role: str,
                    user: str, max_tokens: int = 1500, temperature: float = 0.3):
    """Appel chat via OpenRouter (passerelle Claude / Hermès / autres)."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://navlys.com",
        "X-Title": "NAVLYS CORE",
    }
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": _build_system(model, system_core, system_role)},
            {"role": "user", "content": user},
        ],
        "max_tokens": max_tokens,
        "temperature": temperature,
    }
    r = requests.post(OPENROUTER_URL, json=body, headers=headers, timeout=120)
    r.raise_for_status()
    data = r.json()
    content = data["choices"][0]["message"]["content"]
    tokens = (data.get("usage") or {}).get("total_tokens")
    return content, tokens


# ── Dispatcher résilient (callBrain) ──────────────────────────────────────
def chat(system_core: str, system_role: str, user: str, *,
         model: str = "anthropic/claude-sonnet-4.6",
         anthropic_key: str | None = None,
         anthropic_model: str | None = None,
         openrouter_key: str | None = None,
         provider: str = "auto",
         max_tokens: int = 1500, temperature: float = 0.3):
    """Choisit le fournisseur et bascule SEUL en cas d'échec.

    - provider='auto' (défaut) : Anthropic direct d'abord (si clé + modèle
      compatible), OpenRouter en repli.
    - provider='anthropic' : Anthropic direct uniquement (OpenRouter en repli
      seulement si la clé OpenRouter existe).
    - provider='openrouter' : OpenRouter uniquement.

    Retourne (contenu, total_tokens). Lève si AUCUN fournisseur n'aboutit.
    """
    want_anthropic = provider in ("auto", "anthropic")
    anth_ok = bool(want_anthropic and anthropic_key and anthropic_model)
    errors = []

    # 1) Anthropic DIRECT (priorité si demandé et exploitable)
    if anth_ok:
        try:
            return chat_anthropic(anthropic_key, anthropic_model, system_core,
                                  system_role, user, max_tokens, temperature)
        except Exception as e:
            errors.append(f"anthropic: {e}")
            # on ne s'arrête pas : bascule vers le repli OpenRouter si possible

    # 2) OpenRouter (repli résilient, ou choix explicite 'openrouter').
    #    Toujours tenté si une clé existe et qu'Anthropic n'a pas abouti.
    if openrouter_key:
        try:
            return chat_openrouter(openrouter_key, model, system_core,
                                   system_role, user, max_tokens, temperature)
        except Exception as e:
            errors.append(f"openrouter: {e}")

    if errors:
        raise RuntimeError("LLM indisponible — " + " | ".join(errors))
    raise RuntimeError("Aucun fournisseur LLM disponible "
                       "(ni ANTHROPIC_API_KEY ni OPENROUTER_API_KEY exploitable).")
