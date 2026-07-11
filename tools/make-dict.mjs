// NAVLYS — générateur de dictionnaires i18n (aligné, vérifié, jamais édité à la main).
// Doctrine règle n°33 : « Jamais d'édition manuelle des dictionnaires — script aligné
// + vérif runtime. » Ce script lit la liste MAÎTRE des clés françaises (extraite de
// DICT dans navlys-i18n.js) et une source de traductions partielle
// tools/i18n-src/<lang>.json (map cléFR -> traduction), puis écrit
// live-source/navlys-i18n-<lang>.js exposant window.NAVLYS_DICT_<UPPER>.
//
//   node tools/make-dict.mjs es it de pt nl        # génère ces langues
//   node tools/make-dict.mjs --all                 # toutes les sources présentes
//
// Garanties :
//  - toute clé de la source DOIT exister dans la liste maître (sinon ERREUR : une clé
//    fantôme/typo ne matcherait jamais et resterait invisible) ;
//  - les clés sont écrites dans l'ORDRE maître (couverture lisible d'un coup d'œil) ;
//  - les clés non traduites sont simplement OMISES → le moteur retombe sur le FR
//    (couverture progressive, « jamais de trou visible ») ;
//  - une valeur vide ou identique au FR est ignorée (inutile).
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC_DIR = ROOT + 'tools/i18n-src/';
const OUT_DIR = ROOT + 'live-source/';

// ---- liste maître des clés (ordre d'insertion de DICT) ----
function masterKeys() {
  const p = SRC_DIR + '_keys.json';
  if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8'));
  // repli : ré-extraire depuis navlys-i18n.js
  const s = readFileSync(OUT_DIR + 'navlys-i18n.js', 'utf8');
  const block = s.slice(s.indexOf('var DICT = {'), s.indexOf('/* ---------- Dictionnaire FR -> RU'));
  const re = /^\s*"((?:[^"\\]|\\.)*)"\s*:/gm;
  const keys = [];
  let m;
  while ((m = re.exec(block))) keys.push(JSON.parse('"' + m[1] + '"'));
  return keys;
}

const KEYS = masterKeys();
const KEYSET = new Set(KEYS);

const args = process.argv.slice(2);
let langs = args.filter((a) => !a.startsWith('--'));
if (args.includes('--all') || langs.length === 0) {
  langs = readdirSync(SRC_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => f.replace(/\.json$/, ''));
}

let fail = 0;
for (const lang of langs) {
  const srcPath = SRC_DIR + lang + '.json';
  if (!existsSync(srcPath)) {
    console.error(`✗ ${lang}: source introuvable (${srcPath})`);
    fail++;
    continue;
  }
  const map = JSON.parse(readFileSync(srcPath, 'utf8'));
  // clés méta (documentation) ignorées : commencent par '_'
  for (const k of Object.keys(map)) if (k.startsWith('_')) delete map[k];

  // vérif : toute clé source doit exister dans la liste maître
  const ghosts = Object.keys(map).filter((k) => !KEYSET.has(k));
  if (ghosts.length) {
    console.error(`✗ ${lang}: ${ghosts.length} clé(s) fantôme(s) absente(s) du DICT maître :`);
    ghosts.slice(0, 8).forEach((g) => console.error(`     « ${g.slice(0, 70)} »`));
    fail++;
    continue;
  }

  // construction dans l'ordre maître, on omet le vide / identique
  const lines = [];
  let covered = 0;
  for (const k of KEYS) {
    let v = map[k];
    if (v == null || v === '' || v === k) continue;
    covered++;
    lines.push('  ' + JSON.stringify(k) + ': ' + JSON.stringify(v) + ',');
  }
  // retirer la dernière virgule proprement
  if (lines.length) lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');

  const NAME = 'NAVLYS_DICT_' + lang.toUpperCase();
  const pct = ((covered / KEYS.length) * 100).toFixed(1);
  const header =
    `/* ${NAME} — généré par tools/make-dict.mjs (ne pas éditer à la main).\n` +
    `   Couverture : ${covered}/${KEYS.length} clés (${pct} %). Le reste retombe sur le FR. */\n`;
  const body = `window.${NAME} = {\n${lines.join('\n')}\n};\n`;
  writeFileSync(OUT_DIR + 'navlys-i18n-' + lang + '.js', header + body);
  console.log(`✓ ${lang}: ${covered}/${KEYS.length} (${pct} %) → live-source/navlys-i18n-${lang}.js`);
}

if (fail) {
  console.error(`\n${fail} langue(s) en échec.`);
  process.exit(1);
}
console.log('\nOK — dictionnaires générés.');
