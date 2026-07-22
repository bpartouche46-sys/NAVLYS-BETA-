#!/usr/bin/env node
/**
 * NAVLYS — Contrôle de conformité REPO-WIDE (porte CI).
 *
 * Encode les règles gravées (dépersonnalisation, charte, nommage) et les
 * applique sur tout `live-source/`. Contrairement au hook par-fichier
 * (tools/hook-verif.mjs), ce contrôle balaie l'ensemble à chaque PR.
 *
 * Mécanisme « baseline ratchet » : la dette déjà présente est enregistrée dans
 * tools/conformite-baseline.json ; le job passe au VERT dessus mais BLOQUE toute
 * NOUVELLE violation. On ne régresse jamais, et on résorbe la dette au fil de l'eau.
 *
 * Usage :
 *   node tools/conformite-check.mjs                 → contrôle (exit 1 si nouvelle violation)
 *   node tools/conformite-check.mjs --update-baseline → fige l'état courant comme dette acceptée
 *   node tools/conformite-check.mjs --list          → liste TOUTES les violations (dette incluse)
 *
 * Sources des règles : docs/GOUVERNANCE.md, docs/JOURNAL-ERREURS.md, CLAUDE.md.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'live-source';
const BASELINE_PATH = 'tools/conformite-baseline.json';
const SCAN_EXT = /\.(html?|js|css|json)$/i;
// Fichiers générés par la machine (tampons de déploiement), jamais du contenu
// affiché : on ne les scanne pas. version.json est réécrit à CHAQUE publication
// (son `ts` opérationnel déclenchait un faux positif « date-lancement »), sans
// rien afficher au public. Le garde-fou reste 100 % actif sur toutes les vraies pages.
const SCAN_SKIP = /^version\.json$/i;

/* ------------------------------------------------------------------ règles */
// sev:'error' = bloque la CI (hors baseline) · 'warn' = signale sans bloquer.
const RULES = [
  { id: 'charte-cyan',    re: /#5fe0ff/gi,                         sev: 'error', msg: "couleur hors charte « #5fe0ff » — utiliser l'ice blue #7DD3FC" },
  { id: 'charte-violet',  re: /#4b1a80|#c026d3|#e81889/gi,          sev: 'error', msg: 'couleur violette/fuchsia interdite (charte ice blue + or)' },
  { id: 'geo-jerusalem',  re: /j[ée]rusalem/gi,                     sev: 'error', msg: 'référence géo interdite « Jérusalem » (dépersonnalisation)' },
  { id: 'geo-israel',     re: /isra[eë]l/gi,                        sev: 'error', msg: 'référence géo/entité « Israël » interdite en public' },
  { id: 'geo-ashkelon',   re: /ashkelon/gi,                         sev: 'error', msg: 'ville « Ashkelon » interdite en public (PII/entité)' },
  { id: 'banque-mizrahi', re: /mizrahi/gi,                          sev: 'error', msg: 'banque « Mizrahi » nommée en public (PII/entité)' },
  { id: 'nova-residuel',  re: /\bNOVA\b/g,                          sev: 'error', msg: 'nommage résiduel « NOVA » — la marque est NAVLYS' },
  // Date de lancement : cap unique = 1er août 2026. On ne vise QUE les vraies dates
  // de lancement/countdown, pas les dates d'annotation (« gravé 2026-07-09 ») dans les
  // commentaires : soit une cible datetime `2026-07-JJThh` (compte à rebours), soit la
  // formulation d'ouverture « 1er juillet » / « juillet 2026 » hors provenance.
  { id: 'date-lancement', re: /2026-0[67]-\d{2}T\d|\b1er\s+juillet\b|july\s+1st|(?<!\d)1\s+juillet\s+2026/gi, sev: 'error', msg: 'date de lancement ≠ canonique — cap unique : 1er août 2026 / 2026-08-01' },
];

/* --------------------------------------------------------------- utilitaires */
// Neutralise les données base64 (images inline) : sinon « israel », « violet »…
// apparaissent aléatoirement dans le flux base64 → faux positifs.
function stripBase64(text) {
  return text.replace(/data:[^;"')\s]*;base64,[A-Za-z0-9+/=\s]+/g, 'data:base64,[STRIPPED]');
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (SCAN_EXT.test(name) && !SCAN_SKIP.test(name)) acc.push(p);
  }
  return acc;
}

// Clé stable indépendante du n° de ligne : règle + fichier + ligne normalisée.
function keyOf(f) {
  return `${f.rule}|${f.file}|${f.line}`;
}

/* ------------------------------------------------------------------ scan */
function scan() {
  if (!existsSync(ROOT)) {
    console.error(`✗ dossier ${ROOT}/ introuvable`);
    process.exit(1);
  }
  const findings = [];
  for (const file of walk(ROOT)) {
    let raw;
    try { raw = readFileSync(file, 'utf8'); } catch { continue; }
    const clean = stripBase64(raw);
    const lines = clean.split('\n');
    for (const rule of RULES) {
      for (let i = 0; i < lines.length; i++) {
        rule.re.lastIndex = 0;
        if (rule.re.test(lines[i])) {
          findings.push({
            rule: rule.id,
            sev: rule.sev,
            msg: rule.msg,
            file: relative('.', file),
            lineNo: i + 1,
            line: lines[i].trim().slice(0, 200),
          });
        }
      }
    }
  }
  return findings;
}

/* ------------------------------------------------------------------ main */
const arg = process.argv[2] || '';
const findings = scan();

if (arg === '--update-baseline') {
  const keys = findings.map(keyOf).sort();
  writeFileSync(BASELINE_PATH, JSON.stringify({
    _comment: 'Dette de conformité connue et acceptée (à résorber). Régénérer : node tools/conformite-check.mjs --update-baseline',
    generated: 'manuel',
    count: keys.length,
    keys,
  }, null, 2) + '\n');
  console.log(`✓ baseline écrite : ${keys.length} violation(s) connue(s) enregistrée(s) dans ${BASELINE_PATH}`);
  process.exit(0);
}

if (arg === '--list') {
  for (const f of findings) console.log(`  [${f.sev}] ${f.rule}  ${f.file}:${f.lineNo}  ${f.msg}\n        › ${f.line}`);
  console.log(`\nTotal : ${findings.length} violation(s) (dette + nouvelles).`);
  process.exit(0);
}

// Mode CI : comparer à la baseline.
let baselineKeys = new Set();
if (existsSync(BASELINE_PATH)) {
  try { baselineKeys = new Set(JSON.parse(readFileSync(BASELINE_PATH, 'utf8')).keys || []); } catch {}
}

const fresh = findings.filter((f) => !baselineKeys.has(keyOf(f)));
const freshErrors = fresh.filter((f) => f.sev === 'error');
const freshWarns = fresh.filter((f) => f.sev === 'warn');
const knownCount = findings.length - fresh.length;

if (freshWarns.length) {
  console.log('⚠️  Nouveaux avertissements de conformité :');
  for (const f of freshWarns) console.log(`   ${f.rule}  ${f.file}:${f.lineNo} — ${f.msg}\n     › ${f.line}`);
}

if (freshErrors.length) {
  console.error(`\n❌ ${freshErrors.length} NOUVELLE(S) violation(s) de conformité (bloquant) :`);
  for (const f of freshErrors) console.error(`   ${f.rule}  ${f.file}:${f.lineNo} — ${f.msg}\n     › ${f.line}`);
  console.error(`\n(${knownCount} violation(s) connue(s) tolérée(s) via ${BASELINE_PATH}.)`);
  console.error('→ Corriger, ou si légitime : node tools/conformite-check.mjs --update-baseline');
  process.exit(1);
}

console.log(`✓ Conformité : aucune nouvelle violation. (${knownCount} dette(s) connue(s) à résorber.)`);
process.exit(0);
