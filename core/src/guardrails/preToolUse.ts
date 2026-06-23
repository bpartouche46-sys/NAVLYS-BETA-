/**
 * Hook PreToolUse — LE point de contrôle conformité + argent/prod.
 * Intercepte AVANT exécution et DÉCIDE allow/deny via la logique pure de `forbidden.ts`.
 *
 * API SDK vérifiée (code.claude.com/docs/en/agent-sdk/hooks, 2026-06) :
 * retour d'un deny = { hookSpecificOutput: { hookEventName, permissionDecision:"deny",
 * permissionDecisionReason } }.
 *
 * ⚠️ Scaffold non testé depuis GitHub — à valider sur le serveur (Hermès).
 */

import type { HookCallback, PreToolUseHookInput } from "@anthropic-ai/claude-agent-sdk";
import { evaluateToolUse } from "./forbidden.js";
import { appendAudit } from "./postToolUse.js";

/** `requireApproval` reflète REQUIRE_BRUNO_APPROVAL (env). */
export function makePreToolUseHook(requireApproval: boolean): HookCallback {
  const hook: HookCallback = async (input) => {
    if (input.hook_event_name !== "PreToolUse") return {};
    const pre = input as PreToolUseHookInput;
    const toolName = pre.tool_name;
    const toolInput = pre.tool_input;

    const verdict = evaluateToolUse(toolName, toolInput, requireApproval);

    if (verdict.blocked) {
      appendAudit({
        phase: "PreToolUse",
        decision: "deny",
        tool: toolName,
        category: verdict.category,
        reason: verdict.reason,
      });
      return {
        systemMessage: `⛔ NAVLYS — action bloquée : ${verdict.reason}`,
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason:
            verdict.reason ?? "Bloqué par les garde-fous NAVLYS (conformité / argent / prod).",
        },
      };
    }

    // Laisse passer (l'allow final reste soumis à allowedTools/permissionMode).
    return {};
  };
  return hook;
}
