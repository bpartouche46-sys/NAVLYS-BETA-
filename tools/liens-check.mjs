// NAVLYS — audit des liens (objectif « zéro erreur » : aucun lien mort).
// Analyse statique de live-source/ avec la sémantique de PRODUCTION (Vercel :
// cleanUrls=true, trailingSlash=false → /foo sert foo.html). Détecte :
//   · liens internes morts (/foo sans foo.html ni asset foo)
//   · ancres cassées (#id ou /page#id dont l'id n'existe pas sur la cible)
//   · tel:/mailto: malformés
// Les liens externes (http[s]) sont comptés, pas récupérés (pas de réseau ici).
//
//   node tools/liens-check.mjs            # audit complet (exit 1 si lien mort)
//   node tools/liens-check.mjs --ext      # liste aussi les liens externes
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIR = 'live-source';
const showExt = process.argv.includes('--ext');

const htmlFiles = readdirSync(DIR).filter((f) => f.endsWith('.html'));

// --- index des id par page (pour vérifier les ancres) ---
const idsByPage = new Map();
function idsOf(file) {
  if (idsByPage.has(file)) return idsByPage.get(file);
  let set = new Set();
  const p = join(DIR, file);
  if (existsSync(p)) {
    const s = readFileSync(p, 'utf8');
    for (const m of s.matchAll(/\bid="([^"]+)"/g)) set.add(m[1]);
    for (const m of s.matchAll(/\bname="([^"]+)"/g)) set.add(m[1]); // ancres <a name>
  }
  idsByPage.set(file, set);
  return set;
}

// --- résolution d'un chemin interne à la Vercel cleanUrls ---
function resolveInternal(path) {
  let p = path.split('?')[0];
  if (p === '' || p === '/') return 'index.html';
  if (p.startsWith('/')) p = p.slice(1);
  if (existsSync(join(DIR, p)) && statSync(join(DIR, p)).isFile()) return p; // fichier exact (asset ou .html)
  if (existsSync(join(DIR, p + '.html'))) return p + '.html';               // cleanUrls
  if (existsSync(join(DIR, p, 'index.html'))) return join(p, 'index.html');
  return null; // introuvable
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dead = [];       // liens internes morts
const badAnchor = [];  // ancres cassées
const badContact = []; // tel:/mailto: malformés
const external = new Set();

for (const file of htmlFiles) {
  const src = readFileSync(join(DIR, file), 'utf8');
  const links = new Set();
  for (const m of src.matchAll(/(?:href|src)="([^"]*)"/g)) links.add(m[1]);

  for (const raw of links) {
    const href = raw.trim();
    if (!href) continue;
    // dynamiques / non-navigables : on ignore
    if (/[`$]|'\s*\+|"\s*\+|\+\s*'|\{\{/.test(href)) continue;
    if (/^(javascript:|data:|blob:|#$)/i.test(href)) continue;
    if (href === '#') continue;

    if (/^mailto:/i.test(href)) {
      const addr = href.slice(7).split('?')[0];
      if (!EMAIL.test(addr)) badContact.push({ file, href, why: 'e-mail malformé' });
      continue;
    }
    if (/^tel:/i.test(href)) {
      const digits = href.slice(4).replace(/[^\d]/g, '');
      if (digits.length < 6) badContact.push({ file, href, why: 'numéro trop court/malformé' });
      continue;
    }
    if (/^(https?:)?\/\//i.test(href)) { external.add(href.split('#')[0]); continue; }

    // même-page : #id
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      if (id && !idsOf(file).has(id)) badAnchor.push({ file, href, why: `#${id} absent de la page` });
      continue;
    }

    // interne (/foo, /foo#bar, foo.html, foo#bar)
    const [pathPart, hash] = href.split('#');
    const target = resolveInternal(pathPart);
    if (!target) { dead.push({ file, href }); continue; }
    if (hash && target.endsWith('.html')) {
      if (!idsOf(target).has(decodeURIComponent(hash))) badAnchor.push({ file, href, why: `#${hash} absent de ${target}` });
    }
  }
}

// --- rapport ---
console.log(`\n🔗 Audit des liens — ${htmlFiles.length} pages (sémantique Vercel cleanUrls)\n`);
const problems = dead.length + badAnchor.length + badContact.length;
if (dead.length) {
  console.log(`❌ ${dead.length} lien(s) interne(s) MORT(S) :`);
  for (const d of dead) console.log(`   ${d.file}  →  ${d.href}`);
  console.log('');
}
if (badAnchor.length) {
  console.log(`❌ ${badAnchor.length} ancre(s) cassée(s) :`);
  for (const a of badAnchor) console.log(`   ${a.file}  →  ${a.href}   (${a.why})`);
  console.log('');
}
if (badContact.length) {
  console.log(`❌ ${badContact.length} lien(s) tel:/mailto: malformé(s) :`);
  for (const c of badContact) console.log(`   ${c.file}  →  ${c.href}   (${c.why})`);
  console.log('');
}
console.log(`🌐 ${external.size} lien(s) externe(s) distinct(s) (non récupérés — pas de réseau).`);
if (showExt) [...external].sort().forEach((e) => console.log(`   ${e}`));

if (!problems) { console.log('\n✅ Aucun lien interne mort, aucune ancre cassée, aucun tel/mailto malformé.'); process.exit(0); }
console.log(`\n${problems} problème(s) de lien à corriger.`);
process.exit(1);
