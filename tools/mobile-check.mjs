// NAVLYS — audit mobile réel : rend chaque page de live-source/ dans Chromium à
// une largeur de téléphone et détecte l'OVERFLOW HORIZONTAL (le bug mobile n°1 :
// une page qui « déborde » à droite et se scrolle latéralement). Pour chaque page
// en défaut, remonte les éléments coupables (ceux qui dépassent le viewport).
//
//   node tools/mobile-check.mjs                 # toutes les pages
//   PAGES=index,adhesion node tools/mobile-check.mjs
//   WIDTH=390 node tools/mobile-check.mjs
//
// Playwright est résolu depuis l'install globale ; Chromium est pré-installé.
import { createRequire } from 'module';
import { createServer } from 'http';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';

const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const DIR = 'live-source';
const PORT = 8137;
const WIDTH = parseInt(process.env.WIDTH || '390', 10);   // iPhone 12/13/14 largeur CSS
const HEIGHT = parseInt(process.env.HEIGHT || '844', 10);
const TOL = 2; // px de tolérance (arrondis)

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.mp3':'audio/mpeg',
  '.mp4':'video/mp4', '.json':'application/json', '.webmanifest':'application/manifest+json', '.ico':'image/x-icon' };

// --- serveur statique avec URLs propres (/page -> page.html) ---
function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  let f = join(DIR, p);
  if (existsSync(f) && statSync(f).isFile()) return f;
  if (existsSync(f + '.html')) return f + '.html';
  return null;
}
const server = createServer((req, res) => {
  const f = resolveFile(req.url);
  if (!f) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(PORT, r));

const pages = (process.env.PAGES
  ? process.env.PAGES.split(',').map((s) => s.trim() + '.html')
  : readdirSync(DIR).filter((f) => f.endsWith('.html'))
).sort();

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
const results = [];
for (const file of pages) {
  const name = file.replace(/\.html$/, '');
  const page = await ctx.newPage();
  try {
    // domcontentloaded (pas networkidle) : les pages animées (bandeau live, audio,
    // fonts externes) gardent le réseau actif en permanence → networkidle ne tombe jamais.
    await page.goto(`http://127.0.0.1:${PORT}/${name}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(1200); // laisse navlys-alive.js injecter (bandeau, menu…) + layout
    const data = await page.evaluate((tol) => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const overflow = Math.max(de.scrollWidth, document.body ? document.body.scrollWidth : 0) - vw;
      const bad = [];
      if (overflow > tol) {
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > vw + tol && r.left < vw) {
            const sel = el.tagName.toLowerCase()
              + (el.id ? '#' + el.id : '')
              + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
            bad.push({ sel, right: Math.round(r.right), width: Math.round(r.width) });
          }
        });
      }
      // garde les pires, dédupliqués par sélecteur
      const seen = new Map();
      for (const b of bad) { const cur = seen.get(b.sel); if (!cur || b.right > cur.right) seen.set(b.sel, b); }
      const worst = [...seen.values()].sort((a, b) => b.right - a.right).slice(0, 6);
      return { vw, overflow, worst };
    }, TOL);
    results.push({ name, ...data });
  } catch (e) {
    results.push({ name, error: String(e.message || e).split('\n')[0] });
  }
  await page.close();
}
await browser.close();
server.close();

// --- rapport ---
const bad = results.filter((r) => r.overflow > TOL);
const errs = results.filter((r) => r.error);
console.log(`\n📱 Audit mobile (${WIDTH}px) — ${results.length} pages\n`);
if (!bad.length && !errs.length) {
  console.log('✅ Aucun débordement horizontal. Toutes les pages tiennent dans le viewport mobile.');
} else {
  for (const r of bad.sort((a, b) => b.overflow - a.overflow)) {
    console.log(`❌ ${r.name}  — déborde de ${r.overflow}px (viewport ${r.vw}px)`);
    for (const w of r.worst) console.log(`      · ${w.sel}  (droite ${w.right}px, largeur ${w.width}px)`);
  }
  for (const r of errs) console.log(`⚠️  ${r.name} — non testé : ${r.error}`);
  console.log(`\n${bad.length} page(s) en débordement · ${errs.length} non testée(s).`);
}
process.exit(bad.length ? 1 : 0);
