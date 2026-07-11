// Test d'intégration du moteur i18n SANS navigateur : shim DOM minimal suffisant
// pour exécuter navlys-i18n.js tel quel, simuler le chargement « lazy » des dicos
// (script src -> lecture réelle du fichier), basculer chaque langue et vérifier
// qu'un vrai nœud texte FR est bien traduit + que lang/dir sont corrects.
import { readFileSync } from 'fs';
import vm from 'vm';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = ROOT + 'live-source/';

// --- échantillon de clés FR à vérifier (présentes dans le cœur des 100) ---
const SAMPLE = ['Accueil', 'Voix', 'Partager', 'Langue', 'GRATUIT', 'applications'];
const LANGS = ['en', 'ru', 'es', 'pt', 'it', 'de', 'nl', 'wa', 'zh', 'hi', 'bn', 'he', 'ar', 'ur'];
const RTL = new Set(['he', 'ar', 'ur']);

// --- nœuds texte factices (un par clé de l'échantillon) ---
function textNode(v) { return { nodeType: 3, nodeValue: v, parentNode: { nodeName: 'DIV' } }; }
const nodes = SAMPLE.map((k) => textNode(k));

// --- shim document ---
const docEl = { lang: 'fr', dir: 'ltr', appendChild() {} };
const listeners = {};
const doc = {
  documentElement: docEl,
  head: { appendChild: loadScript },
  body: { nodeType: 1, nodeName: 'BODY', querySelectorAll() { return []; } },
  readyState: 'complete',
  createElement(tag) {
    const el = { tagName: tag, _src: '', set src(v) { this._src = v; }, get src() { return this._src; }, onload: null, onerror: null };
    return el;
  },
  createTreeWalker() { let i = -1; return { nextNode() { i++; return nodes[i] || null; } }; },
  addEventListener(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); },
  dispatchEvent() { return true; },
  querySelectorAll() { return []; },
};

// simulate <script src="/navlys-i18n-XX.js"> : lit le fichier et l'exécute dans le contexte
function loadScript(el) {
  const src = el.src || el._src;
  const m = /\/navlys-i18n-([a-z]+)\.js$/.exec(src);
  if (m) {
    const code = readFileSync(SRC + `navlys-i18n-${m[1]}.js`, 'utf8');
    vm.runInContext(code, ctx);
  }
  if (el.onload) el.onload();
}

const sandbox = {
  window: {},
  document: doc,
  navigator: { language: 'fr' },
  localStorage: { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); } },
  MutationObserver: class { observe() {} },
  NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 },
  CustomEvent: class { constructor(t, o) { this.type = t; this.detail = o && o.detail; } },
  setTimeout, clearTimeout, console,
};
sandbox.window.navigator = sandbox.navigator;
sandbox.window.localStorage = sandbox.localStorage;
sandbox.window.document = doc;
const ctx = vm.createContext(sandbox);

// exécuter le moteur
vm.runInContext(readFileSync(SRC + 'navlys-i18n.js', 'utf8'), ctx);
const I = sandbox.window.NAVLYS_I18N;
if (!I) { console.error('✗ NAVLYS_I18N non exposé'); process.exit(1); }

// registre : les 15 langues doivent être présentes
const langs = I.langs();
console.log(`Langues enregistrées (${langs.length}) : ${langs.join(', ')}`);
let fail = 0;
for (const l of ['fr', ...LANGS]) {
  if (langs.indexOf(l) < 0) { console.error(`✗ ${l} absente du registre`); fail++; }
}

// bascule + vérif traduction sur chaque langue
for (const l of LANGS) {
  // remet les nœuds à la source FR avant chaque test
  nodes.forEach((n, i) => { n.nodeValue = SAMPLE[i]; delete n.__nvOrig; delete n.__nvLang; });
  I.set(l);
  // dir/lang
  const dirOK = docEl.dir === (RTL.has(l) ? 'rtl' : 'ltr');
  const langOK = docEl.lang === l;
  // combien de clés de l'échantillon ont changé (= traduites)
  let translated = 0;
  nodes.forEach((n, i) => { if (n.nodeValue !== SAMPLE[i]) translated++; });
  const ok = dirOK && langOK && translated > 0;
  if (!ok) fail++;
  console.log(`${ok ? '✓' : '✗'} ${l}  dir=${docEl.dir} lang=${docEl.lang}  traduits ${translated}/${SAMPLE.length}` +
    (ok ? '' : `  [dir ${dirOK ? 'ok' : 'KO'} · lang ${langOK ? 'ok' : 'KO'}]`));
}

// réversibilité vers le FR
nodes.forEach((n, i) => { n.nodeValue = SAMPLE[i]; delete n.__nvOrig; delete n.__nvLang; });
I.set('es'); I.set('fr');
const backOK = nodes.every((n, i) => n.nodeValue === SAMPLE[i]) && docEl.dir === 'ltr';
console.log(`${backOK ? '✓' : '✗'} retour FR : source restaurée + dir=ltr`);
if (!backOK) fail++;

console.log(fail ? `\n❌ ${fail} échec(s).` : '\n✅ Moteur i18n : registre, bascule, RTL et réversibilité OK.');
process.exit(fail ? 1 : 0);
