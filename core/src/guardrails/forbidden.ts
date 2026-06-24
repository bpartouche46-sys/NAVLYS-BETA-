/**
 * Garde-fous NAVLYS — LOGIQUE PURE (testable sans le SDK).
 *
 * Source des règles : docs/GOUVERNANCE.md (§3 argent = Bruno) + JOURNAL-ERREURS.md
 * (ERR-003 mentions/promesses interdites). Ces fonctions n'exécutent rien : elles
 * DÉCIDENT (allow/deny) et expliquent pourquoi. Le hook PreToolUse les appelle.
 */

export interface GuardResult {
  /** true = on bloque l'action ; false = on laisse passer */
  blocked: boolean;
  /** raison lisible (affichée dans l'audit + au refus) */
  reason?: string;
  /** catégorie pour le tri des logs */
  category?: "conformite" | "argent" | "prod" | "destructif";
}

const ALLOW: GuardResult = { blocked: false };

/* ------------------------------------------------------------------ */
/* 1. CONFORMITÉ — mentions interdites (ERR-003)                        */
/* ------------------------------------------------------------------ */

/** Lieux interdits dans tout contenu destiné au public (narratif méditerranéen sans Israël). */
const FORBIDDEN_PLACES = [/isra[eë]l/i, /j[eé]rusalem/i, /ashkelon/i, /ashqelon/i];

/** Promesses de rendement / chiffres de performance (interdits : éducation, zéro promesse). */
const YIELD_PROMISES = [
  /[+\-]?\s*\d+(?:[.,]\d+)?\s*%\s*(?:par|\/)\s*an/i, // "8% par an", "8 %/an"
  /\d+\s*(?:à|-|–)\s*\d+\s*%/i, // "+8 à 12%"
  /rendement\s+(?:garanti|assur[eé]|certain)/i,
  /(?:gain|profit|b[eé]n[eé]fice)s?\s+garanti/i,
];

/** Marqueurs de conseil personnalisé (interdit : ZÉRO ORIAS/CIF, éducation seulement). */
const PERSONAL_ADVICE = [
  /je\s+vous\s+(?:conseille|recommande)\s+d['e]\s*(?:acheter|investir|vendre)/i,
  /vous\s+devriez\s+(?:acheter|investir|vendre|placer)/i,
];

/** Contrôle un texte (contenu public/proposé). Retourne le 1er problème trouvé. */
export function checkContent(text: string): GuardResult {
  if (!text) return ALLOW;
  for (const re of FORBIDDEN_PLACES)
    if (re.test(text))
      return { blocked: true, category: "conformite", reason: `Mention de lieu interdite (ERR-003) : ${re}` };
  for (const re of YIELD_PROMISES)
    if (re.test(text))
      return { blocked: true, category: "conformite", reason: `Promesse de rendement interdite (ERR-003) : ${re}` };
  for (const re of PERSONAL_ADVICE)
    if (re.test(text))
      return { blocked: true, category: "conformite", reason: `Conseil personnalisé interdit (ZÉRO CIF) : ${re}` };
  return ALLOW;
}

/* ------------------------------------------------------------------ */
/* 2. ARGENT — tout débit/paiement = STOP → feu vert Bruno (§3)         */
/* ------------------------------------------------------------------ */

/** Outils MCP qui peuvent déclencher un mouvement d'argent (écriture). */
const MONEY_TOOLS = [
  /stripe.*(create|refund|charge|payout|capture|write)/i,
  /paypal.*(create|send|invoice|payout)/i,
  /create_refund|create_invoice|send_bulk_invoices|stripe_api_write/i,
];

/** Détecte une action « argent » qui exige le feu vert de Bruno. */
export function checkMoney(toolName: string): GuardResult {
  for (const re of MONEY_TOOLS)
    if (re.test(toolName))
      return {
        blocked: true,
        category: "argent",
        reason: `Action financière (${toolName}) — STOP : feu vert explicite de Bruno requis (GOUVERNANCE §3).`,
      };
  return ALLOW;
}

/* ------------------------------------------------------------------ */
/* 3. PROD — mise en ligne publique = STOP → feu vert Bruno            */
/* ------------------------------------------------------------------ */

const PROD_DEPLOY = [
  /vercel\s+(?:deploy|--prod|promote)/i,
  /deploy_to_vercel|merge_pull_request|enable_pr_auto_merge/i,
  /\bgit\s+push\b.*\b(main|master|production|prod)\b/i,
];

export function checkProdDeploy(commandOrTool: string): GuardResult {
  for (const re of PROD_DEPLOY)
    if (re.test(commandOrTool))
      return {
        blocked: true,
        category: "prod",
        reason: `Déploiement / mise en ligne prod (${commandOrTool}) — STOP : feu vert Bruno requis.`,
      };
  return ALLOW;
}

/* ------------------------------------------------------------------ */
/* 4. DESTRUCTIF — commandes bannies                                   */
/* ------------------------------------------------------------------ */

const DESTRUCTIVE = [
  /rm\s+-rf\s+[\/~*]/i,
  /\bmkfs\b|\bdd\s+if=/i,
  /git\s+push\s+.*--force\b/i,
  /DROP\s+(?:DATABASE|TABLE)/i,
  /:\s*>\s*\/dev\/sd/i,
];

export function checkDestructive(command: string): GuardResult {
  for (const re of DESTRUCTIVE)
    if (re.test(command))
      return { blocked: true, category: "destructif", reason: `Commande destructrice bloquée : ${re}` };
  return ALLOW;
}

/* ------------------------------------------------------------------ */
/* Agrégateur : un seul point d'entrée pour le hook PreToolUse         */
/* ------------------------------------------------------------------ */

/**
 * Évalue une action d'outil. `requireApproval` = REQUIRE_BRUNO_APPROVAL (env).
 * Quand un humain a déjà donné le feu vert (mécanisme côté appelant), passer
 * requireApproval=false pour cette action précise.
 */
export function evaluateToolUse(
  toolName: string,
  input: unknown,
  requireApproval = true,
): GuardResult {
  const text = extractText(input);
  const command = typeof (input as any)?.command === "string" ? (input as any).command : text;

  // 1) destructif : toujours bloqué, même avec feu vert
  const destr = checkDestructive(command);
  if (destr.blocked) return destr;

  // 2) conformité : toujours contrôlée
  const content = checkContent(text);
  if (content.blocked) return content;

  // 3/4) argent + prod : bloqués SAUF feu vert Bruno explicite
  if (requireApproval) {
    const money = checkMoney(toolName);
    if (money.blocked) return money;
    const prod = checkProdDeploy(`${toolName} ${command}`);
    if (prod.blocked) return prod;
  }

  return ALLOW;
}

/** Aplati n'importe quel input d'outil en texte cherchable. */
function extractText(input: unknown): string {
  if (input == null) return "";
  if (typeof input === "string") return input;
  try {
    return JSON.stringify(input);
  } catch {
    return String(input);
  }
}
