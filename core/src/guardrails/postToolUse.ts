/**
 * Hook PostToolUse — journal d'audit (qui / quoi / quand) → traçabilité.
 * Permet la surveillance mutuelle (GOUVERNANCE §2) : l'un relit ce que l'autre a fait.
 */

import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { HookCallback, PostToolUseHookInput } from "@anthropic-ai/claude-agent-sdk";

let AUDIT_PATH = "./logs/audit.log";

export function setAuditPath(p: string): void {
  AUDIT_PATH = p;
}

export interface AuditEntry {
  phase: "PreToolUse" | "PostToolUse";
  decision?: "allow" | "deny";
  tool?: string;
  category?: string;
  reason?: string;
}

/** Écrit une ligne JSON horodatée dans le journal d'audit (best-effort). */
export function appendAudit(entry: AuditEntry): void {
  const line = JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
  try {
    mkdirSync(dirname(AUDIT_PATH), { recursive: true });
    appendFileSync(AUDIT_PATH, line);
  } catch {
    // Ne jamais faire planter le moteur pour un échec de log.
    console.error("[audit] écriture impossible:", line.trim());
  }
}

export function makePostToolUseHook(): HookCallback {
  const hook: HookCallback = async (input) => {
    if (input.hook_event_name !== "PostToolUse") return {};
    const post = input as PostToolUseHookInput;
    appendAudit({ phase: "PostToolUse", decision: "allow", tool: post.tool_name });
    return {};
  };
  return hook;
}
