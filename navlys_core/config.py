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
# Clés = identifiants canoniques Anthropic (confirmés via la skill claude-api) ;
# valeurs = slugs OpenRouter. Ajuste les valeurs si OpenRouter renomme un slug.
MODEL_MAP = {
    "claude-opus-4-8": "anthropic/claude-opus-4.8",
    "claude-sonnet-4-6": "anthropic/claude-sonnet-4.6",
    "claude-haiku-4-5": "anthropic/claude-haiku-4.5",
    # alias historique : l'ancien ID daté pointe vers le même modèle Haiku
    "claude-haiku-4-5-20251001": "anthropic/claude-haiku-4.5",
    "hermes-4": "nousresearch/hermes-4-405b",
}


def resolve_model(modele: str | None, default: str) -> str:
    """Convertit le 'modele' stocké en base vers un slug OpenRouter.

    Robustesse : si l'ID porte un suffixe daté inconnu (ex. -20251001),
    on retente sur l'ID sans la date avant de retomber sur le défaut.
    """
    if not modele:
        return default
    if "/" in modele:  # déjà un slug OpenRouter
        return modele
    if modele in MODEL_MAP:
        return MODEL_MAP[modele]
    # fallback : retire un éventuel suffixe daté "-YYYYMMDD"
    base = modele.rsplit("-", 1)[0]
    if base != modele and base in MODEL_MAP:
        return MODEL_MAP[base]
    return default
