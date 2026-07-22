/**
 * Bus Kimi ↔ CORE via Supabase (tables navlys_tasks / navlys_audit).
 *
 * Contrat (tables déjà créées dans le projet navlys-core) :
 *   navlys_tasks(id, source='kimi', cible='core', type, titre, contenu jsonb,
 *                statut='a_faire', priorite=2, feu_vert_requis=false, created_at, updated_at)
 *   navlys_audit(id, source='core', task_id, type, message, data jsonb, created_at)
 *
 * Cycle de vie d'une tâche :
 *   a_faire → en_cours → done | erreur
 *   a_faire → attente_feu_vert (si feu_vert_requis — JAMAIS exécutée sans accord Bruno)
 *
 * Accès = PostgREST avec la SERVICE_ROLE_KEY (serveur uniquement, jamais côté client).
 * Aucune dépendance npm : fetch natif (Node 18+).
 */

export type TaskStatus = "a_faire" | "en_cours" | "done" | "erreur" | "attente_feu_vert";

export interface CoreTask {
  id: number;
  source: string;
  cible: string;
  type: string | null;
  titre: string | null;
  contenu: Record<string, unknown>;
  statut: TaskStatus;
  priorite: number;
  feu_vert_requis: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface NewTask {
  source?: string;
  cible?: string;
  type?: string;
  titre?: string;
  contenu?: Record<string, unknown>;
  priorite?: number;
  feu_vert_requis?: boolean;
}

export interface AuditEntry {
  source?: string;
  task_id?: number | null;
  type: string;
  message: string;
  data?: Record<string, unknown>;
}

/** Mappe une ligne PostgREST brute vers une CoreTask typée (logique pure, testable). */
export function rowToTask(row: any): CoreTask {
  return {
    id: Number(row.id),
    source: String(row.source ?? "kimi"),
    cible: String(row.cible ?? "core"),
    type: row.type ?? null,
    titre: row.titre ?? null,
    contenu: (row.contenu ?? {}) as Record<string, unknown>,
    statut: (row.statut ?? "a_faire") as TaskStatus,
    priorite: Number(row.priorite ?? 2),
    feu_vert_requis: Boolean(row.feu_vert_requis),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/** Prépare la ligne d'insertion d'une nouvelle tâche (défauts alignés sur le schéma). */
export function newTaskRow(t: NewTask): Record<string, unknown> {
  return {
    source: t.source ?? "kimi",
    cible: t.cible ?? "core",
    type: t.type ?? "generique",
    titre: t.titre ?? "(sans titre)",
    contenu: t.contenu ?? {},
    statut: "a_faire",
    priorite: t.priorite ?? 2,
    feu_vert_requis: t.feu_vert_requis ?? false,
  };
}

/** Instruction textuelle d'une tâche (ce que l'orchestrateur doit faire). */
export function taskInstruction(task: CoreTask): string {
  const c = task.contenu as any;
  const base = typeof c?.instruction === "string" && c.instruction.trim()
    ? c.instruction.trim()
    : (task.titre ?? "").trim();
  return base || "(tâche vide — ne rien faire, le signaler dans l'audit)";
}

/* ------------------------------------------------------------------ */
/* Client REST (partie impure, fetch injectable pour les tests)         */
/* ------------------------------------------------------------------ */

export interface BusConfig {
  url: string; // SUPABASE_URL, ex. https://xxx.supabase.co
  key: string; // SUPABASE_SERVICE_ROLE_KEY
  fetchImpl?: typeof fetch;
}

function headers(key: string, extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export function createBus(cfg: BusConfig) {
  const f = cfg.fetchImpl ?? fetch;
  const base = cfg.url.replace(/\/+$/, "");

  async function req(path: string, init: RequestInit = {}, prefer = "return=representation") {
    const res = await f(`${base}/rest/v1${path}`, {
      ...init,
      headers: headers(cfg.key, { Prefer: prefer, ...(init.headers as any) }),
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  return {
    /** Insère une tâche sur le bus. Retourne la tâche créée. */
    async postTask(t: NewTask): Promise<CoreTask> {
      const rows = await req("/navlys_tasks", { method: "POST", body: JSON.stringify(newTaskRow(t)) });
      return rowToTask(rows[0]);
    },

    /** Prend la prochaine tâche 'a_faire' pour le core (atomique : ne réclame que si encore 'a_faire'). */
    async claimNextTask(): Promise<CoreTask | null> {
      const rows = await req(
        "/navlys_tasks?cible=eq.core&statut=eq.a_faire&order=priorite.asc,created_at.asc&limit=1",
      );
      if (!rows?.length) return null;
      const task = rowToTask(rows[0]);
      const claimed = await req(
        `/navlys_tasks?id=eq.${task.id}&statut=eq.a_faire`,
        { method: "PATCH", body: JSON.stringify({ statut: "en_cours", updated_at: new Date().toISOString() }) },
      );
      return claimed?.length ? { ...task, statut: "en_cours" } : null;
    },

    /** Termine une tâche en stockant le résumé dans contenu.resultat (merge côté lecture). */
    async finishTask(id: number, statut: "done" | "erreur" | "attente_feu_vert", resultat: string): Promise<void> {
      // PostgREST ne merge pas le jsonb : on relit puis on réécrit contenu+resultat.
      const rows = await req(`/navlys_tasks?id=eq.${id}&select=contenu`);
      const contenu = { ...(rows?.[0]?.contenu ?? {}), resultat };
      await req(`/navlys_tasks?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify({ statut, contenu, updated_at: new Date().toISOString() }),
      }, "return=minimal");
    },

    /** Écrit une ligne d'audit (visible par Kimi côté lecture). */
    async postAudit(entry: AuditEntry): Promise<void> {
      await req("/navlys_audit", {
        method: "POST",
        body: JSON.stringify({ source: entry.source ?? "core", task_id: entry.task_id ?? null, type: entry.type, message: entry.message, data: entry.data ?? {} }),
      }, "return=minimal");
    },

    /** Dernières lignes d'audit (pour /status et la supervision). */
    async recentAudit(limit = 10): Promise<any[]> {
      return req(`/navlys_audit?order=created_at.desc&limit=${limit}`);
    },

    /** Nombre de tâches par statut (pour /status). */
    async taskCounts(): Promise<Record<string, number>> {
      const rows = await req("/navlys_tasks?select=statut");
      const counts: Record<string, number> = {};
      for (const r of rows ?? []) counts[r.statut] = (counts[r.statut] ?? 0) + 1;
      return counts;
    },

    /** Vrai si une tâche github_issue existe déjà pour ce numéro d'issue (dédup). */
    async hasGithubIssueTask(issueNumber: number): Promise<boolean> {
      const rows = await req(
        `/navlys_tasks?type=eq.github_issue&contenu->>issue_number=eq.${issueNumber}&select=id&limit=1`,
      );
      return Boolean(rows?.length);
    },
  };
}

export type Bus = ReturnType<typeof createBus>;
