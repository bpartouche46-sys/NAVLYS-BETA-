import requests

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def _build_system(model: str, system_core: str, system_role: str):
    """Compose le message système.

    Pour les modèles Anthropic via OpenRouter, on pose un point de cache
    (`cache_control`) à la fin de la partie STABLE (REGLES_CORE), identique
    pour tous les agents : à partir du 2e appel, ce préfixe est servi depuis
    le cache (jusqu'à ~90 % moins cher sur cette portion). La partie variable
    (le rôle de l'agent) vient après et n'est pas mise en cache.

    Pour les autres modèles (ex. Hermès), on retombe sur une chaîne simple.
    """
    if model.startswith("anthropic/"):
        return [
            {"type": "text", "text": system_core,
             "cache_control": {"type": "ephemeral"}},
            {"type": "text", "text": system_role},
        ]
    return f"{system_core}\n\n{system_role}"


def chat(api_key: str, model: str, system_core: str, system_role: str, user: str,
         max_tokens: int = 1500, temperature: float = 0.3):
    """Appel chat via OpenRouter (passerelle Claude / Hermès / autres).

    `system_core` = consignes stables (mises en cache), `system_role` = rôle
    propre à l'agent. Retourne (contenu, total_tokens).
    """
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
