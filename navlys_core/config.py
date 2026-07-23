import os


def _req(name: str) -> str:
    v = os.environ.get(name)
    if not v:
        raise RuntimeError(f"Variable d'environnement manquante: {name}")
    return v


def _first(*names: str) -> str | None:
    """Lecture TOLÉRANTE d'un secret : renvoie la première variable non vide
    parmi plusieurs noms possibles (règle n°4 : ne jamais faire recommencer
    Bruno pour un nom de secret différent — on s'adapte au code)."""
    for n in names:
        v = os.environ.get(n)
        if v:
            return v
    return None


class Config:
    """Lit la configuration depuis l'environnement (jamais de secret en dur)."""

    def __init__(self) -> None:
        self.supabase_url = _req("SUPABASE_URL").rstrip("/")
        self.service_key = _req("SUPABASE_SERVICE_ROLE_KEY")

        # ── Cerveau LLM ────────────────────────────────────────────────
        # Clé Anthropic DIRECTE (payante) — priorité au CORE indépendant.
        # Lecture tolérante : plusieurs noms de secret acceptés (règle n°4).
        self.anthropic_key = _first(
            "ANTHROPIC_API_KEY", "CLAUDE_API_KEY",
            "CLAUDE_CODE_API_KEY", "ANTHROPIC_KEY", "NAVLYS_ANTHROPIC_KEY",
        )
        # Passerelle OpenRouter — désormais OPTIONNELLE : filet de secours
        # anti-coupure (résilience) si Anthropic est indisponible.
        # Lecture tolérante des noms maison (règle n°4 + doctrine « on crée
        # nos propres noms de clés » : nom custom = couche anti-hacker).
        self.openrouter_key = _first("OPENROUTER_API_KEY", "OPENROUTER_KEY",
                                     "OPEN_ROUTER_API_KEY", "OPEN_API_ROUTER",
                                     "OPEN_API_ROUTER_KEY")
        if not self.anthropic_key and not self.openrouter_key:
            raise RuntimeError(
                "Aucune clé LLM : renseigne ANTHROPIC_API_KEY (recommandé, direct) "
                "ou OPENROUTER_API_KEY dans .env.")

        # Préférence de fournisseur : auto | anthropic | openrouter.
        # 'auto' = Anthropic direct d'abord, OpenRouter en repli (résilience).
        self.llm_provider = (os.environ.get("NAVLYS_LLM_PROVIDER", "auto") or "auto").lower()

        # Modèle par défaut : slug OpenRouter (compat) ; le CORE en déduit
        # l'ID Anthropic direct quand la clé Anthropic est présente.
        self.default_model = os.environ.get("NAVLYS_DEFAULT_MODEL",
                                            "anthropic/claude-sonnet-4.6")
        self.default_anthropic_model = os.environ.get(
            "NAVLYS_ANTHROPIC_MODEL") or resolve_anthropic(self.default_model,
                                                           "claude-sonnet-4-6")

        # ── Réglages worker ────────────────────────────────────────────
        self.poll_seconds = int(os.environ.get("NAVLYS_POLL_SECONDS", "30"))
        self.max_tokens = int(os.environ.get("NAVLYS_MAX_TOKENS", "1500"))
        self.memory_limit = int(os.environ.get("NAVLYS_MEMORY_LIMIT", "8"))

        # ── Autopilote (le CORE se dirige seul, de A à Z) ──────────────
        self.autopilot = (os.environ.get("NAVLYS_AUTOPILOT", "1") not in ("0", "false", "off"))
        self.autopilot_hours = float(os.environ.get("NAVLYS_AUTOPILOT_HOURS", "6"))
        self.autopilot_max = int(os.environ.get("NAVLYS_AUTOPILOT_MAX", "6"))

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


def resolve_anthropic(modele: str | None, default: str) -> str | None:
    """Convertit le 'modele' stocké vers un ID de modèle Anthropic DIRECT.

    Renvoie None si le modèle n'existe pas chez Anthropic (ex. Hermès) —
    dans ce cas le CORE passera par OpenRouter pour cette mission.
    """
    if not modele:
        return default
    m = modele
    # slug OpenRouter -> ID canonique : "anthropic/claude-sonnet-4.6" -> "claude-sonnet-4-6"
    if "/" in m:
        prefix, suffix = m.split("/", 1)
        if prefix != "anthropic":
            return None  # autre fournisseur : pas d'équivalent Anthropic direct
        m = suffix.replace(".", "-")
    if m.startswith("claude-"):
        return m
    return default
