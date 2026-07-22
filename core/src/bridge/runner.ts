/**
 * Runner — LA BOUCLE auto-récursive de la liaison Kimi ↔ Core.
 *
 * Chaque cycle (toutes les POLL_INTERVAL_MS, défaut 60 s) :
 *   1. GitHub : les nouvelles issues [CORE-TASK] / label "core-task" → navlys_tasks (dédup)
 *   2. Bus    : prend la prochaine tâche 'a_faire' (cible=core)
 *        - feu_vert_requis  → statut 'attente_feu_vert' + audit, JAMAIS exécutée
 *        - sinon            → runOrchestrator(instruction) → 'done' | 'erreur' + audit
 *   3. Dors, puis recommence — à l'infini (systemd redémarre si crash).
 *
 * Sécurité : les garde-fous de l'orchestrateur (conformité/argent/prod/destructif)
 * restent actifs PENDANT l'exécution de chaque tâche. La boucle ne les contourne jamais.
 *
 * Lancement : npm run bridge   (après npm run build)
 */

import { loadConfig } from "../config.js";
import { runOrchestrator } from "../index.js";
import { createBus, taskInstruction, type CoreTask } from "./bus.js";
import { fetchCoreTaskIssues, issueToNewTask, postGithubComment } from "./githubTasks.js";
import { startHealthServer } from "../http/health.js";

const MAX_TASKS_PER_CYCLE = 3;

export interface BridgeDeps {
  bus: ReturnType<typeof createBus>;
  github?: { repo: string; token: string; fetchImpl?: typeof fetch };
  runTask: (instruction: string) => Promise<void>;
  log?: (msg: string) => void;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 1 cycle : synchro GitHub puis exécution des tâches en attente (max MAX_TASKS_PER_CYCLE). */
export async function runCycle(deps: BridgeDeps): Promise<number> {
  const { bus, github, runTask } = deps;
  const log = deps.log ?? console.log;
  let done = 0;

  // 1) GitHub → bus (dédup par numéro d'issue)
  if (github) {
    try {
      const issues = await fetchCoreTaskIssues(github);
      for (const issue of issues) {
        if (!(await bus.hasGithubIssueTask(issue.number))) {
          const t = await bus.postTask(issueToNewTask(issue));
          await bus.postAudit({ type: "github_sync", message: `Issue #${issue.number} → tâche #${t.id}`, task_id: t.id, data: { issue_url: issue.html_url } });
          log(`[bridge] issue #${issue.number} → tâche #${t.id}`);
        }
      }
    } catch (e: any) {
      await bus.postAudit({ type: "github_sync_error", message: e?.message ?? String(e) }).catch(() => {});
    }
  }

  // 2) Exécution des tâches
  while (done < MAX_TASKS_PER_CYCLE) {
    const task: CoreTask | null = await bus.claimNextTask();
    if (!task) break;

    if (task.feu_vert_requis) {
      await bus.finishTask(task.id, "attente_feu_vert", "Tâche mise en attente : feu vert Bruno requis (GOUVERNANCE §3).");
      await bus.postAudit({ type: "task_waiting_approval", task_id: task.id, message: `Tâche #${task.id} en attente de feu vert : ${task.titre}` });
      log(`[bridge] tâche #${task.id} → attente feu vert`);
      continue;
    }

    await bus.postAudit({ type: "task_start", task_id: task.id, message: `Début tâche #${task.id} : ${task.titre}` });
    log(`[bridge] tâche #${task.id} démarrée`);

    // Tâche native test_liaison : pas de LLM — écriture directe de l'audit + commentaire GitHub
    if (task.type === "test_liaison") {
      try {
        await bus.postAudit({
          type: "liaison_ok",
          task_id: task.id,
          message: `Liaison Kimi\u21d4Core opérationnelle — ${new Date().toISOString()}`,
        });
        const issueNumber = (task.contenu as { issue_number?: number }).issue_number;
        if (github && typeof issueNumber === "number") {
          await postGithubComment(
            github,
            issueNumber,
            `\u2705 Liaison Kimi\u21d4Core opérationnelle.\nTâche bus : \`navlys_tasks.id = ${task.id}\``,
          );
        }
        await bus.finishTask(task.id, "done", "Test liaison OK.");
        await bus.postAudit({ type: "task_done", task_id: task.id, message: `Tâche #${task.id} terminée (liaison OK).` });
        log(`[bridge] tâche #${task.id} → liaison_ok`);
      } catch (e: any) {
        const msg = e?.message ?? String(e);
        await bus.finishTask(task.id, "erreur", msg.slice(0, 2000));
        await bus.postAudit({ type: "task_error", task_id: task.id, message: `Tâche #${task.id} en erreur (test_liaison) : ${msg.slice(0, 500)}` });
        log(`[bridge] tâche #${task.id} erreur test_liaison: ${msg}`);
      }
      done++;
      continue;
    }

    try {
      await runTask(taskInstruction(task));
      await bus.finishTask(task.id, "done", "Tâche terminée (voir logs du core pour le détail).");
      await bus.postAudit({ type: "task_done", task_id: task.id, message: `Tâche #${task.id} terminée.` });
      log(`[bridge] tâche #${task.id} terminée`);
    } catch (e: any) {
      const msg = e?.message ?? String(e);
      await bus.finishTask(task.id, "erreur", msg.slice(0, 2000));
      await bus.postAudit({ type: "task_error", task_id: task.id, message: `Tâche #${task.id} en erreur : ${msg.slice(0, 500)}` });
      log(`[bridge] tâche #${task.id} erreur: ${msg}`);
    }
    done++;
  }
  return done;
}

/** Boucle infinie (récursive par intervalle) avec backoff sur erreur. */
export async function runBridgeLoop(): Promise<void> {
  const cfg = loadConfig(); // valide ANTHROPIC_API_KEY + permissionMode (jamais bypass)
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!url || !key) throw new Error("SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis (bus Kimi↔Core).");

  const bus = createBus({ url, key });
  const github = process.env.GITHUB_TOKEN && process.env.GITHUB_REPO
    ? { repo: process.env.GITHUB_REPO, token: process.env.GITHUB_TOKEN }
    : undefined;
  const pollMs = Math.max(10_000, Number(process.env.POLL_INTERVAL_MS ?? 60_000));

  startHealthServer({
    port: Number(process.env.HEALTH_PORT ?? 8788),
    version: process.env.npm_package_version ?? "0.2.0",
    getStatus: async () => ({ tasks: await bus.taskCounts(), dernier_audit: await bus.recentAudit(5) }),
  });

  await bus.postAudit({ type: "bridge_start", message: `Boucle Kimi↔Core démarrée (poll ${pollMs / 1000}s, github=${github ? "on" : "off"})` });
  console.log(`[bridge] boucle démarrée — cycle toutes les ${pollMs / 1000}s`);

  let failures = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await runCycle({ bus, github, runTask: (i) => runOrchestrator(i) });
      failures = 0;
      await sleep(pollMs);
    } catch (e: any) {
      failures++;
      const backoff = Math.min(pollMs * failures, 10 * 60_000); // max 10 min
      console.error(`[bridge] erreur cycle (${failures}) :`, e?.message ?? e);
      await bus.postAudit({ type: "cycle_error", message: (e?.message ?? String(e)).slice(0, 500), data: { failures } }).catch(() => {});
      await sleep(backoff);
    }
  }
}

// Lancement direct : node dist/bridge/runner.js
const isMain = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  runBridgeLoop().catch((e) => {
    console.error("[bridge] crash fatal:", e?.message ?? e);
    process.exitCode = 1;
  });
}
