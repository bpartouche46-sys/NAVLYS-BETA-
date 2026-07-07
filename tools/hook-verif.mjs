#!/usr/bin/env node
/**
 * NAVLYS — Hook de vérification automatique (PostToolUse Edit|Write).
 * Exécute les réflexes gravés SANS y penser (recommandé par claude-code-setup) :
 *   1. .js  → node --check (syntaxe)                    [règle n°1 : preuve avant parole]
 *   2. .js/.html → grep charte (violet/mauve/fuchsia)   [règle n°6 : charte ice+or]
 *   3. .html → syntaxe des <script> inline               [leçon srÉcart]
 * Sortie code 2 = signal à Claude (message sur stderr). Sinon silencieux.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

let input = '';
try { input = readFileSync(0, 'utf8'); } catch { process.exit(0); }
let data = {};
try { data = JSON.parse(input); } catch { process.exit(0); }
const fp = data?.tool_input?.file_path || '';
if (!fp || !/live-source\/.*\.(js|html)$/.test(fp)) process.exit(0);

const problems = [];
let src = '';
try { src = readFileSync(fp, 'utf8'); } catch { process.exit(0); }

// 2. charte : zéro violet/mauve/fuchsia (Bible règle n°4)
const charte = src.match(/violet|mauve|fuchsia|75,\s*26,\s*128/i);
if (charte) problems.push(`CHARTE VIOLÉE : « ${charte[0]} » trouvé dans ${fp} — ice blue + or uniquement.`);

// 1 & 3. syntaxe
if (fp.endsWith('.js')) {
  try { execFileSync('node', ['--check', fp], { stdio: 'pipe' }); }
  catch (e) { problems.push(`SYNTAXE JS : node --check échoue sur ${fp} : ${String(e.stderr || e.message).slice(0, 300)}`); }
} else if (fp.endsWith('.html')) {
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m, i = 0;
  while ((m = re.exec(src))) {
    i++;
    try { new (await import('node:vm')).Script(m[1]); }
    catch (e) { problems.push(`SYNTAXE HTML : <script> inline n°${i} de ${fp} : ${String(e.message).slice(0, 200)}`); }
  }
  // ids accentués (leçon srÉcart : getElementById silencieusement null)
  const accId = src.match(/id="[^"]*[éèêàçÉÈÀÙûîïôö][^"]*"/);
  if (accId) problems.push(`ID ACCENTUÉ (danger getElementById) : ${accId[0]} dans ${fp} — IDs en ASCII pur.`);
}

if (problems.length) {
  console.error('⚠️ NAVLYS hook-verif :\n' + problems.join('\n'));
  process.exit(2); // signale à Claude pour correction immédiate
}
process.exit(0);
