/**
 * Serveur /health + /status — canal n°2 de la liaison (sonde HTTP).
 *
 * À exposer UNIQUEMENT via le tunnel Cloudflare (canal n°3) ou en local.
 * Ne jamais ouvrir le port sur le firewall Hetzner.
 *
 *   GET /health → { ok, service, version, uptime_s, now }         (sonde basique)
 *   GET /status → health + { tasks: {a_faire, en_cours, ...}, dernier_audit }  (supervision)
 */

import { createServer, type Server } from "node:http";

export interface HealthInput {
  service: string;
  version: string;
  startedAt: number; // Date.now() au démarrage
  now?: number;      // injectable pour les tests
}

/** Charge utile /health (pure, testable). */
export function healthPayload(i: HealthInput): Record<string, unknown> {
  const now = i.now ?? Date.now();
  return {
    ok: true,
    service: i.service,
    version: i.version,
    uptime_s: Math.max(0, Math.floor((now - i.startedAt) / 1000)),
    now: new Date(now).toISOString(),
  };
}

export interface HealthServerOpts {
  port: number;
  version: string;
  /** Fournit les compteurs du bus pour /status (optionnel, best-effort). */
  getStatus?: () => Promise<Record<string, unknown>>;
}

/** Démarre le serveur de sonde. Retourne le Server (pour fermeture propre). */
export function startHealthServer(opts: HealthServerOpts): Server {
  const startedAt = Date.now();
  const server = createServer(async (req, res) => {
    const send = (code: number, body: unknown) => {
      res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(body));
    };
    try {
      if (req.url === "/health") return send(200, healthPayload({ service: "navlys-core", version: opts.version, startedAt }));
      if (req.url === "/status") {
        const payload: Record<string, unknown> = healthPayload({ service: "navlys-core", version: opts.version, startedAt });
        if (opts.getStatus) {
          try { Object.assign(payload, await opts.getStatus()); }
          catch { payload.status_error = "status_unavailable"; }
        }
        return send(200, payload);
      }
      return send(404, { ok: false, error: "not_found" });
    } catch {
      return send(500, { ok: false, error: "internal_error" });
    }
  });
  server.listen(opts.port, "127.0.0.1", () => {
    console.log(`[health] écoute sur 127.0.0.1:${opts.port} (/health, /status)`);
  });
  return server;
}
