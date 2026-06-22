import requests

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def chat(api_key: str, model: str, system: str, user: str,
         max_tokens: int = 1500, temperature: float = 0.3):
    """Appel chat via OpenRouter (passerelle Claude / Hermès / autres).

    Retourne (contenu, total_tokens).
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
            {"role": "system", "content": system},
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
