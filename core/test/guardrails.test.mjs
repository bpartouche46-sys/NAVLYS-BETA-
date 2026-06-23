/**
 * Tests des garde-fous (logique pure) — rejouable sans le SDK ni réseau.
 * Lancer : node --experimental-strip-types core/test/guardrails.test.mjs
 * (Node 18+ avec strip-types ; Node 22.18+ l'a par défaut.)
 *
 * ✅ Vérifié 2026-06-23 : 18/18 OK.
 */
import assert from "node:assert";
import {
  checkContent, checkMoney, checkProdDeploy, checkDestructive, evaluateToolUse,
} from "../src/guardrails/forbidden.ts";

let pass = 0, fail = 0;
function t(name, fn) {
  try { fn(); pass++; console.log("✅", name); }
  catch (e) { fail++; console.log("❌", name, "→", e.message); }
}

// CONFORMITÉ (ERR-003)
t("bloque 'Jérusalem'", () => assert.equal(checkContent("Vue sur Jérusalem").blocked, true));
t("bloque 'Israël'", () => assert.equal(checkContent("basé en Israël").blocked, true));
t("bloque '+8 à 12%'", () => assert.equal(checkContent("rendement de +8 à 12% espéré").blocked, true));
t("bloque '8% par an'", () => assert.equal(checkContent("gagnez 8% par an").blocked, true));
t("bloque 'rendement garanti'", () => assert.equal(checkContent("rendement garanti").blocked, true));
t("bloque conseil perso", () => assert.equal(checkContent("je vous conseille d'acheter cet ETF").blocked, true));
t("laisse passer texte conforme", () => assert.equal(checkContent("Méthode 90/10 : éducation financière.").blocked, false));

// ARGENT
t("bloque stripe write", () => assert.equal(checkMoney("mcp__stripe__stripe_api_write").blocked, true));
t("bloque create_refund", () => assert.equal(checkMoney("mcp__stripe__create_refund").blocked, true));
t("laisse passer stripe read", () => assert.equal(checkMoney("mcp__stripe__fetch_stripe_resources").blocked, false));

// PROD
t("bloque vercel --prod", () => assert.equal(checkProdDeploy("vercel deploy --prod").blocked, true));
t("bloque git push main", () => assert.equal(checkProdDeploy("git push origin main").blocked, true));

// DESTRUCTIF
t("bloque rm -rf", () => assert.equal(checkDestructive("rm -rf /var/www").blocked, true));
t("bloque DROP TABLE", () => assert.equal(checkDestructive("DROP TABLE inscriptions").blocked, true));

// AGRÉGATEUR
t("destructif bloqué même avec feu vert", () => assert.equal(evaluateToolUse("Bash", { command: "rm -rf /" }, false).blocked, true));
t("argent bloqué si approval requis", () => assert.equal(evaluateToolUse("mcp__stripe__create_refund", {}, true).blocked, true));
t("argent passe si feu vert donné", () => assert.equal(evaluateToolUse("mcp__stripe__create_refund", {}, false).blocked, false));
t("lecture github OK", () => assert.equal(evaluateToolUse("mcp__github__get_file_contents", { path: "x" }, true).blocked, false));

console.log(`\n${pass} OK / ${fail} échec(s)`);
process.exit(fail ? 1 : 0);
