// Passe en première personne les clés i18n « brand-voice » des pages secondaires.
// Renomme la clé FR dans DICT (navlys-i18n.js) + he.js + ar.js, et ajuste la valeur
// EN dans DICT. Le russe (RU_VALUES) est aligné par index → il suit automatiquement
// (nuance « our→my » mineure, à parfaire à la relecture). he/ar gardent leur valeur
// (clé renommée) → restent dans leur langue.
import { readFileSync, writeFileSync } from 'fs';
const SRC = new URL('..', import.meta.url).pathname + 'live-source/';

// [ oldFr, newFr, oldEn, newEn ]  (oldEn/newEn = null si EN inchangé)
const MAP = [
  ["notre philosophie", "ma philosophie", "our philosophy", "my philosophy"],
  ["Nous : tout le reste", "Moi : tout le reste", "Us: everything else", "Me: everything else"],
  ["nous versent une petite commission,", "me versent une petite commission,", "pay us a small commission,", "pay me a small commission,"],
  ["Héberge tous nos sites : SSL auto, CDN mondial.", "Héberge tous mes sites : SSL auto, CDN mondial.", "Hosts all our sites: auto SSL, global CDN.", "Hosts all my sites: auto SSL, global CDN."],
  ["Écris-nous.", "Écris-moi.", "Write to us.", "Write to me."],
  ["Nous portons tous une histoire.", "On porte tous une histoire.", null, null],
  ["Chaque personne à qui tu envoies notre recommandation (avec un petit mot) et que tu nous prouves =", "Chaque personne à qui tu envoies ma recommandation (avec un petit mot) et que tu me prouves =", "Each person you send our recommendation to (with a short note) and can show us proof of =", "Each person you send my recommendation to (with a short note) and can show me proof of ="],
  ["Tu as envoyé une de nos pubs à des amis avec un petit mot ? Dis-le-nous — on valide, on te crédite.", "Tu as envoyé une de mes pubs à des amis avec un petit mot ? Dis-le-moi — je valide, je te crédite.", "Sent one of our ads to friends with a short note? Tell us — we verify, we credit you.", "Sent one of my ads to friends with a short note? Tell me — I verify, I credit you."],
  ["Bonjour 🌊 Je suis l’assistant NAVLYS. Tu peux me parler ou m’écrire — une question sur nos applications, ton compte, ou autre chose ?", "Bonjour 🌊 Je suis l’assistant NAVLYS. Tu peux me parler ou m’écrire — une question sur mes applications, ton compte, ou autre chose ?", "a question about our apps", "a question about my apps"],
  ["Sources croisées : presse & réseaux, données marché (via notre API Alpaca en paper/test), courbes de référence.", "Sources croisées : presse & réseaux, données marché (via mon API Alpaca en paper/test), courbes de référence.", "via our Alpaca API", "via my Alpaca API"],
  [": lecture live du compte (Alpaca paper) via notre API.", ": lecture live du compte (Alpaca paper) via mon API.", ": live account reading (Alpaca paper) via our API.", ": live account reading (Alpaca paper) via my API."],
  ["Notre lecture NAVLYS : l'outil au service de la personne, jamais l'inverse. C'est la ligne de tout l'univers.", "Ma lecture NAVLYS : l'outil au service de la personne, jamais l'inverse. C'est la ligne de tout l'univers.", "Our NAVLYS reading:", "My NAVLYS reading:"],
  ["Ton idée en or. Notre machine. Une entreprise, bâtie ensemble.", "Ton idée en or. Ma machine. Une entreprise, bâtie ensemble.", "Your golden idea. Our machine.", "Your golden idea. My machine."],
  ["Une part d'intéressement sur la réussite du projet : nos objectifs sont les tiens.", "Une part d'intéressement sur la réussite du projet : mes objectifs sont les tiens.", "our goals are yours", "my goals are yours"],
];

function apply(file, opts) {
  let s = readFileSync(SRC + file, 'utf8');
  let renamed = 0, enFixed = 0, missing = [];
  for (const [oFr, nFr, oEn, nEn] of MAP) {
    const oKey = '"' + oFr + '":';
    const nKey = '"' + nFr + '":';
    if (s.includes(oKey)) { s = s.split(oKey).join(nKey); renamed++; }
    else missing.push(oFr.slice(0, 40));
    if (opts.en && oEn && nEn && s.includes(oEn)) { s = s.split(oEn).join(nEn); enFixed++; }
  }
  writeFileSync(SRC + file, s);
  console.log(`✓ ${file}: ${renamed}/${MAP.length} clés renommées${opts.en ? `, ${enFixed} valeurs EN ajustées` : ''}` + (missing.length ? ` — absentes: ${missing.length}` : ''));
}

apply('navlys-i18n.js', { en: true });
apply('navlys-i18n-he.js', { en: false });
apply('navlys-i18n-ar.js', { en: false });
console.log('OK.');
