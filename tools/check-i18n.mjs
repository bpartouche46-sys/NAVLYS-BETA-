// NAVLYS — banc de test i18n : charge chaque page dans Chromium, bascule la
// langue, et compte les textes français restants. Un texte encore égal à une
// clé FR n'est un échec QUE si la langue cible a une traduction différente.
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'fs';

const ROOT = 'http://127.0.0.1:8123';
const PAGES = (process.env.PAGES || 'index,adhesion,idee,profil,finance,next-gen,assistance,navlex,mer,partenaires,radio,tech,influenceurs,club,promo,cinema,equipage,bientot,ecris-ta-vie,next-gen-beta,bibles,tv,copilote,io,navjeu').split(',');
const LANGS = (process.env.LANGS || 'en,ru,es,pt,it,de,nl,wa,zh,hi,bn,he,ar,ur').split(',');

const src = readFileSync('/home/user/NAVLYS-BETA-/live-source/navlys-i18n.js', 'utf8');
const dictSrc = src.slice(src.indexOf('var DICT = {'), src.indexOf('};', src.indexOf('var DICT = {')) + 2);
const ruSrc = src.slice(src.indexOf('var RU_VALUES = ['), src.indexOf('\n];', src.indexOf('var RU_VALUES = [')) + 3);
const sandbox = {};
new Function(dictSrc + ruSrc + ';this.DICT=DICT;this.RU_VALUES=RU_VALUES;').call(sandbox);
const EN = sandbox.DICT;
const RU = {}; Object.keys(EN).forEach((k, i) => { RU[k] = sandbox.RU_VALUES[i]; });
function loadWinDict(file, name) {
  const p = '/home/user/NAVLYS-BETA-/live-source/' + file;
  if (!existsSync(p)) return {};
  const s = readFileSync(p, 'utf8');
  const sb = { window: {} };
  new Function('window', s)(sb.window);
  return sb.window[name] || {};
}
// EN et RU sont intégrés ; toute autre langue est un fichier lazy navlys-i18n-<lang>.js.
const MAPS = { en: EN, ru: RU };
for (const l of LANGS) {
  if (l === 'en' || l === 'ru' || l === 'fr') continue;
  MAPS[l] = loadWinDict(`navlys-i18n-${l}.js`, `NAVLYS_DICT_${l.toUpperCase()}`);
}

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const BRANDS = /Univers Intégral|Univers Plus|Univers NAVLYS|NAVLYS|NAVLEX|NAVBIO|Next Gen|Bruno Partouche|Méditerranée|©/g;
const isFrenchLooking = (raw) => {
  const t = raw.replace(BRANDS, ' ');
  return /[àâçéèêëîïôùûü]/i.test(t) || /\b(le|la|les|ton|ta|tes|pour|avec|dans|chaque|toute?|jamais|gratuit|choisis|réglé|toi|nous|vie)\b/i.test(t);
};

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const results = [];
for (const page of PAGES) {
  for (const lang of LANGS) {
    const map = MAPS[lang] || {};
    const ctx = await browser.newContext();
    await ctx.addInitScript((l) => { try { localStorage.setItem('nv-lang', l); } catch (e) {} }, lang);
    const p = await ctx.newPage();
    try {
      await p.goto(`${ROOT}/${page === 'index' ? '' : page + '.html'}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await p.waitForTimeout(2500);
      const texts = await p.evaluate(() => {
        const out = [];
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = w.nextNode())) {
          const pn = n.parentNode && n.parentNode.nodeName;
          if (pn === 'SCRIPT' || pn === 'STYLE' || pn === 'NOSCRIPT') continue;
          const t = n.nodeValue.replace(/\s+/g, ' ').trim();
          if (t.length > 1) out.push(t);
        }
        return out;
      });
      const uniq = [...new Set(texts.map(norm))];
      // échec réel : le texte est resté la clé FR alors qu'une traduction différente existe
      const restants = uniq.filter((t) => {
        const v = map[t];
        return v != null && v !== '' && v !== t;
      });
      const horsDict = uniq.filter((t) => map[t] == null && t.length > 8 && isFrenchLooking(t));
      results.push({ page, lang, total: uniq.length, restants, horsDict });
    } catch (e) {
      results.push({ page, lang, error: String(e).slice(0, 120) });
    }
    await ctx.close();
  }
}
await browser.close();

let bad = 0;
for (const r of results) {
  if (r.error) { console.log(`⚠️  ${r.page} [${r.lang}] ERREUR: ${r.error}`); bad++; continue; }
  const nD = r.restants.length, nH = r.horsDict.length;
  const flag = nD > 0 ? '❌' : (nH > 0 ? '🟡' : '✅');
  if (nD > 0 || nH > 0) bad++;
  console.log(`${flag} ${r.page} [${r.lang}] — non traduits (clé connue): ${nD} · français hors dico: ${nH}`);
  if (process.env.DETAIL) {
    r.restants.slice(0, 8).forEach((t) => console.log(`     RESTE: ${t.slice(0, 90)}`));
    r.horsDict.slice(0, 8).forEach((t) => console.log(`     HORS:  ${t.slice(0, 90)}`));
  }
}
console.log(`\n== ${results.length - bad}/${results.length} combinaisons propres ==`);
