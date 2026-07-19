/**
 * Pont GitHub → bus — les issues du repo deviennent des tâches pour le core.
 *
 * Règle simple (canal n°1 de la liaison Kimi ↔ Core) :
 *   - une issue avec le label "core-task" OU le préfixe "[CORE-TASK]" dans le titre
 *     = une tâche à faire exécuter par le core
 *   - label "feu-vert-requis" (ou marqueur [FEU-VERT-REQUIS] dans le corps)
 *     = la tâche est mise en attente, JAMAIS exécutée sans accord de Bruno
 *   - labels p1/p2/p3 règlent la priorité (défaut 2)
 *
 * Logique de tri = PURE (testable) ; la récupération passe par l'API REST GitHub
 * avec le GITHUB_TOKEN du serveur (scope repo minimal).
 */

import type { NewTask } from "./bus.js";

export const CORE_TASK_LABEL = "core-task";
export const CORE_TASK_MARKER = "[CORE-TASK]";
export const APPROVAL_MARKER = "[FEU-VERT-REQUIS]";

export interface GhLabel { name?: string }
export interface GhIssue {
  number: number;
  title: string;
  body?: string | null;
  html_url?: string;
  labels?: Array<string | GhLabel>;
  pull_request?: unknown; // les PR remontent aussi dans /issues : on les ignore
}

function labelNames(issue: GhIssue): string[] {
  return (issue.labels ?? []).map((l) => (typeof l === "string" ? l : l?.name ?? "")).filter(Boolean);
}

/** Une issue est-elle une tâche pour le core ? (label dédié OU marqueur titre) */
export function isCoreTaskIssue(issue: GhIssue, label = CORE_TASK_LABEL): boolean {
  if (issue.pull_request) return false;
  if (labelNames(issue).includes(label)) return true;
  return (issue.title ?? "").toUpperCase().includes(CORE_TASK_MARKER);
}

/** La tâche exige-t-elle le feu vert de Bruno avant exécution ? */
export function issueNeedsApproval(issue: GhIssue): boolean {
  if (labelNames(issue).includes("feu-vert-requis")) return true;
  return (issue.body ?? "").toUpperCase().includes(APPROVAL_MARKER);
}

/** Priorité 1 (urgent) → 3 (peut attendre). Défaut 2. */
export function issuePriority(issue: GhIssue): number {
  const names = labelNames(issue);
  if (names.includes("p1")) return 1;
  if (names.includes("p3")) return 3;
  return 2;
}

/** Transforme une issue en ligne de tâche pour navlys_tasks (pure). */
export function issueToNewTask(issue: GhIssue): NewTask {
  return {
    source: "github",
    cible: "core",
    type: "github_issue",
    titre: issue.title?.replace(CORE_TASK_MARKER, "").trim() || `Issue #${issue.number}`,
    contenu: {
      instruction: (issue.body ?? "").replace(APPROVAL_MARKER, "").trim() || issue.title,
      issue_number: issue.number,
      issue_url: issue.html_url ?? "",
    },
    priorite: issuePriority(issue),
    feu_vert_requis: issueNeedsApproval(issue),
  };
}

/* ------------------------------------------------------------------ */
/* Récupération (impure — fetch injectable pour les tests)              */
/* ------------------------------------------------------------------ */

export interface GhConfig {
  repo: string;   // "owner/repo"
  token: string;  // GITHUB_TOKEN (scope repo minimal)
  fetchImpl?: typeof fetch;
}

/** Liste les issues ouvertes qui sont des tâches core (label OU marqueur titre). */
export async function fetchCoreTaskIssues(cfg: GhConfig): Promise<GhIssue[]> {
  const f = cfg.fetchImpl ?? fetch;
  const res = await f(
    `https://api.github.com/repos/${cfg.repo}/issues?state=open&per_page=50`,
    { headers: { Authorization: `Bearer ${cfg.token}`, Accept: "application/vnd.github+json", "User-Agent": "navlys-core" } },
  );
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  const issues = (await res.json()) as GhIssue[];
  return issues.filter((i) => isCoreTaskIssue(i));
}
