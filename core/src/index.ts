/**
 * NAVLYS CORE — point d'entrée de l'orchestrateur (Claude Agent SDK, headless).
 *
 * Implémente docs/CORE-CENTRAL-TECHNIQUE.md §3 (archi minimale viable) :
 *   orchestrateur + sous-agents (.claude/agents) + garde-fous câblés (hooks) + MCP.
 *
 * Garde-fous NON négociables (GOUVERNANCE §3) câblés ici :
 *   - permissionMode bridé (jamais bypassPermissions — refusé dans config.ts)
 *   - hook PreToolUse = conformité ERR-003 + STOP argent/prod → feu vert Bruno
 *   - hook PostToolUse = journal d'audit
 *
 * ⚠️ Scaffold non testé depuis GitHub (pas d'install réseau). Valider sur le serveur :
 *   npm install && npm run build && npm run start
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { loadConfig } from "./config.js";
import { makePreToolUseHook } from "./guardrails/preToolUse.js";
import { makePostToolUseHook, setAuditPath, appendAudit } from "./guardrails/postToolUse.js";

/** Outils autorisés par défaut (liste blanche stricte — on élargit chaîne par chaîne). */
const ALLOWED_TOOLS = [
  "Read",
  "Glob",
  "Grep",
  // MCP en lecture d'abord ; on ajoute les écritures au cas par cas, avec garde-fous.
  "mcp__github__get_file_contents",
  "mcp__github__list_issues",
];

/** Outils explicitement bannis (en plus du blocage dynamique des hooks). */
const DISALLOWED_TOOLS = [
  "Bash(rm *)",
  "Bash(sudo *)",
  "mcp__stripe__stripe_api_write",
  "mcp__stripe__create_refund",
];

export async function runOrchestrator(task: string): Promise<void> {
  const cfg = loadConfig();
  setAuditPath(cfg.auditLogPath);
  appendAudit({ phase: "PreToolUse", tool: "__start__", reason: `tâche: ${task}` });

  const preHook = makePreToolUseHook(cfg.requireBrunoApproval);
  const postHook = makePostToolUseHook();

  for await (const message of query({
    prompt: task,
    options: {
      permissionMode: cfg.permissionMode, // jamais bypassPermissions (validé dans config)
      allowedTools: ALLOWED_TOOLS,
      disallowedTools: DISALLOWED_TOOLS,
      // Charge les sous-agents déclarés dans .claude/agents/*.md (gardien, directeur…).
      settingSources: ["project"],
      hooks: {
        PreToolUse: [{ hooks: [preHook] }],
        PostToolUse: [{ hooks: [postHook] }],
      },
      model: "claude-opus",
    },
  })) {
    if (message.type === "result") {
      console.log("✓ Terminé.");
    } else if (message.type === "assistant") {
      const text = (message as any).message?.content?.[0]?.text;
      if (text) console.log("…", String(text).slice(0, 200));
    }
  }
}

/** Lancement direct : `npm run start "ma tâche"` (sinon tâche de démonstration sûre). */
const taskFromArgs = process.argv.slice(2).join(" ").trim();
const task =
  taskFromArgs ||
  "Lis docs/OPERATIONNEL-100.md et résume en 5 lignes ce qui reste à faire pour atteindre 100%.";

runOrchestrator(task).catch((err) => {
  console.error("Erreur orchestrateur:", err?.message ?? err);
  process.exitCode = 1;
});
