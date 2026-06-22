import os


def _req(name: str) -> str:
    v = os.environ.get(name)
    if not v:
        raise RuntimeError(f"Variable d'environnement manquante: {name}")
    return v


class Config:
    """Lit la configuration depuis l'environnement (jamais de secret en dur)."""

    def __init__(self) -> None:
        self.supabase_url = _req("SUPABASE_URL").rstrip("/")
        self.service_key = _req("SUPABASE_SERVICE_ROLE_KEY")
        self.openrouter_key = _req("OPENROUTER_API_KEY")
        self.default_model = os.environ.get("NAVLYS_DEFAULT_MODEL", "anthropic/claude-sonnet-4.6")
        self.poll_seconds = int(os.environ.get("NAVLYS_POLL_SECONDS", "30"))
        self.max_tokens = int(os.environ.get("NAVLYS_MAX_TOKENS", "1500"))
        self.memory_limit = int(os.environ.get("NAVLYS_MEMORY_LIMIT", "8"))
        # Canal d'alerte "à valider" (optionnel)
        self.telegram_token = os.environ.get("TELEGRAM_BOT_TOKEN")
        self.telegram_chat_id = os.environ.get("TELEGRAM_CHAT_ID")


# Map des identifiants de modèle internes -> slugs OpenRouter.
# Ajuste si les slugs OpenRouter changent.
MODEL_MAP = {
    "claude-opus-4-8": "anthropic/claude-opus-4.8",
    "claude-sonnet-4-6": "anthropic/claude-sonnet-4.6",
    "claude-haiku-4-5-20251001": "anthropic/claude-haiku-4.5",
    "hermes-4": "nousresearch/hermes-4-405b",
}


def resolve_model(modele: str | None, default: str) -> str:
    """Convertit le 'modele' stocké en base vers un slug OpenRouter."""
    if not modele:
        return default
    if "/" in modele:  # déjà un slug OpenRouter
        return modele
    return MODEL_MAP.get(modele, default)
