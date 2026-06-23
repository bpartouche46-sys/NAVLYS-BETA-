/**
 * Configuration du core — charge l'environnement, valide, n'expose JAMAIS de secret en dur.
 * Les valeurs viennent de `.env` (ignoré par Git). Voir docs/SECRETS-ET-CLES.md.
 */

export interface CoreConfig {
  anthropicApiKey: string;
  permissionMode: "default" | "acceptEdits" | "plan";
  requireBrunoApproval: boolean;
  redisUrl?: string;
  auditLogPath: string;
}

function bool(v: string | undefined, def: boolean): boolean {
  if (v == null) return def;
  return /^(1|true|yes|oui)$/i.test(v.trim());
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): CoreConfig {
  const anthropicApiKey = env.ANTHROPIC_API_KEY ?? "";
  if (!anthropicApiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY manquante. Copier core/.env.example en core/.env et la renseigner (jamais dans Git).",
    );
  }

  // Sécurité : on REFUSE explicitement bypassPermissions.
  const requested = (env.PERMISSION_MODE ?? "acceptEdits").trim();
  if (requested === "bypassPermissions") {
    throw new Error("PERMISSION_MODE=bypassPermissions est INTERDIT par la gouvernance NAVLYS.");
  }
  const permissionMode =
    requested === "default" || requested === "plan" ? requested : "acceptEdits";

  return {
    anthropicApiKey,
    permissionMode: permissionMode as CoreConfig["permissionMode"],
    requireBrunoApproval: bool(env.REQUIRE_BRUNO_APPROVAL, true),
    redisUrl: env.REDIS_URL || undefined,
    auditLogPath: env.AUDIT_LOG_PATH || "./logs/audit.log",
  };
}
