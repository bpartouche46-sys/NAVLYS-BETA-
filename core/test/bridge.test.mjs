/**
 * Tests du pont Kimi ↔ Core (logique pure) — rejouable sans SDK ni réseau.
 * Lancer : node --experimental-strip-types core/test/bridge.test.mjs
 */
import assert from "node:assert";
import { isCoreTaskIssue, issueNeedsApproval, issuePriority, issueToNewTask } from "../src/bridge/githubTasks.ts";
import { rowToTask, newTaskRow, taskInstruction } from "../src/bridge/bus.ts";
import { healthPayload } from "../src/http/health.ts";

let pass = 0, fail = 0;
function t(name, fn) {
  try { fn(); pass++; console.log("✅", name); }
  catch (e) { fail++; console.log("❌", name, "→", e.message); }
}

// --- Détection des issues core-task ---
t("label core-task détecté", () =>
  assert.equal(isCoreTaskIssue({ number: 1, title: "x", labels: [{ name: "core-task" }] }), true));
t("marqueur [CORE-TASK] détecté dans le titre", () =>
  assert.equal(isCoreTaskIssue({ number: 2, title: "[CORE-TASK] Tester la liaison", labels: [] }), true));
t("issue ordinaire ignorée", () =>
  assert.equal(isCoreTaskIssue({ number: 3, title: "Bug affichage", labels: [{ name: "bug" }] }), false));
t("pull request ignorée même avec label", () =>
  assert.equal(isCoreTaskIssue({ number: 4, title: "x", labels: ["core-task"], pull_request: {} }), false));

// --- Feu vert / priorité ---
t("feu vert via label", () =>
  assert.equal(issueNeedsApproval({ number: 1, title: "x", labels: ["feu-vert-requis"] }), true));
t("feu vert via marqueur corps", () =>
  assert.equal(issueNeedsApproval({ number: 1, title: "x", body: "Action [FEU-VERT-REQUIS] ici" }), true));
t("pas de feu vert par défaut", () =>
  assert.equal(issueNeedsApproval({ number: 1, title: "x", body: "rien" }), false));
t("priorité p1/p3/défaut", () => {
  assert.equal(issuePriority({ number: 1, title: "x", labels: ["p1"] }), 1);
  assert.equal(issuePriority({ number: 1, title: "x", labels: ["p3"] }), 3);
  assert.equal(issuePriority({ number: 1, title: "x", labels: [] }), 2);
});

// --- Conversion issue → tâche ---
t("issueToNewTask forme la tâche bus", () => {
  const task = issueToNewTask({ number: 7, title: "[CORE-TASK] Ping", body: "Dis bonjour", html_url: "u", labels: [] });
  assert.equal(task.source, "github");
  assert.equal(task.type, "github_issue");
  assert.equal(task.titre, "Ping");
  assert.equal(task.contenu.issue_number, 7);
  assert.equal(task.contenu.instruction, "Dis bonjour");
  assert.equal(task.feu_vert_requis, false);
});

// --- Bus : mapping lignes ---
t("rowToTask applique les défauts du schéma", () => {
  const task = rowToTask({ id: "5" });
  assert.equal(task.id, 5);
  assert.equal(task.source, "kimi");
  assert.equal(task.cible, "core");
  assert.equal(task.statut, "a_faire");
  assert.equal(task.priorite, 2);
  assert.equal(task.feu_vert_requis, false);
});
t("newTaskRow prêt pour insertion", () => {
  const row = newTaskRow({ titre: "Test", contenu: { instruction: "faire X" } });
  assert.equal(row.statut, "a_faire");
  assert.equal(row.source, "kimi");
  assert.equal(row.cible, "core");
});
t("taskInstruction préfère contenu.instruction", () => {
  const task = rowToTask({ id: 1, titre: "T", contenu: { instruction: "  fais ceci  " } });
  assert.equal(taskInstruction(task), "fais ceci");
});
t("taskInstruction replie sur le titre", () => {
  const task = rowToTask({ id: 1, titre: "Juste le titre" });
  assert.equal(taskInstruction(task), "Juste le titre");
});

// --- Health ---
t("healthPayload calcule l'uptime", () => {
  const p = healthPayload({ service: "navlys-core", version: "0.2.0", startedAt: 1000, now: 61_000 });
  assert.equal(p.ok, true);
  assert.equal(p.uptime_s, 60);
  assert.equal(p.service, "navlys-core");
});

console.log(`\n${pass} OK / ${fail} échec(s)`);
process.exit(fail ? 1 : 0);
