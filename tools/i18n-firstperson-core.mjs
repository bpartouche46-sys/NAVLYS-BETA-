// Passe les 4 clés « brand-voice » du CŒUR (accueil) en première personne, dans
// les 10 sources JSON (es/pt/it/de/nl/wa/zh/hi/bn/ur). Renomme la clé FR et ajuste
// le pronom dans la valeur. he/ar et DICT/RU (navlys-i18n.js) sont traités à part.
import { readFileSync, writeFileSync, existsSync } from 'fs';
const DIR = new URL('..', import.meta.url).pathname + 'tools/i18n-src/';

const K1o = "Nos partenaires testés (brokers, crypto, néo-banques, outils), en toute transparence sur l'affiliation.";
const K1n = "Mes partenaires testés (brokers, crypto, néo-banques, outils), en toute transparence sur l'affiliation.";
const K4o = "Mettre l'IA à la portée de tous, en un clic et à la voix — pour égaliser l'accès au savoir, au bien-être et à la transmission. L'humain reste la pièce centrale. NAVLYS, c'est aussi 100 % dématérialisé, dans le respect de la Méditerranée qui nous porte.";
const K4n = "Mettre l'IA à la portée de tous, en un clic et à la voix — pour égaliser l'accès au savoir, au bien-être et à la transmission. L'humain reste la pièce centrale. NAVLYS, c'est aussi 100 % dématérialisé, dans le respect de la Méditerranée qui me porte.";

// par langue : valeurs neuves pour "Nos"(K2) et "Notre"(K3) ; substitutions pour K1 (préfixe) et K4 (suffixe)
const M = {
  es: { nos:'Mis', notre:'Mi', k1:['Nuestros','Mis'], k4:['que nos sostiene','que me sostiene'] },
  pt: { nos:'Os meus', notre:'A minha', k1:['Os nossos','Os meus'], k4:['que nos sustém','que me sustém'] },
  it: { nos:'I miei', notre:'La mia', k1:['I nostri','I miei'], k4:['che ci sostiene','che mi sostiene'] },
  de: { nos:'Meine', notre:'Meine', k1:['Unsere','Meine'], k4:['das uns trägt','das mich trägt'] },
  nl: { nos:'Mijn', notre:'Mijn', k1:['Onze','Mijn'], k4:['die ons draagt','die mij draagt'] },
  wa: { nos:'Mes', notre:'Mi' },
  zh: { nos:'我的', notre:'我的', k1:['我们测试过的','我测试过的'], k4:['承载我们的地中海','承载我的地中海'] },
  hi: { nos:'मेरे', notre:'मेरा', k1:['हमारे परखे','मेरे परखे'], k4:['जो हमें थामे हुए है','जो मुझे थामे हुए है'] },
  bn: { nos:'আমার', notre:'আমার', k1:['আমাদের যাচাই','আমার যাচাই'], k4:['আমাদের বহনকারী','আমাকে বহনকারী'] },
  ur: { nos:'میرے', notre:'میرا', k1:['ہمارے آزمائے','میرے آزمائے'], k4:['جو ہمیں تھامے','جو مجھے تھامے'] },
};

function ren(o, oldK, newK, val) {
  if (!(oldK in o)) return false;
  const v = val != null ? val : o[oldK];
  delete o[oldK];
  o[newK] = v;
  return true;
}

for (const [lang, m] of Object.entries(M)) {
  const p = DIR + lang + '.json';
  if (!existsSync(p)) continue;
  const o = JSON.parse(readFileSync(p, 'utf8'));
  const done = [];
  if (ren(o, 'Nos', 'Mes', m.nos)) done.push('Nos→Mes');
  if (ren(o, 'Notre', 'Ma', m.notre)) done.push('Notre→Ma');
  if (m.k1 && o[K1o] != null) { o[K1n] = o[K1o].replace(m.k1[0], m.k1[1]); delete o[K1o]; done.push('K1'); }
  if (m.k4 && o[K4o] != null) { o[K4n] = o[K4o].replace(m.k4[0], m.k4[1]); delete o[K4o]; done.push('K4'); }
  // ré-ordonner selon la nouvelle liste maître se fait au build ; ici on garde l'ordre d'insertion JSON
  writeFileSync(p, JSON.stringify(o, null, 2) + '\n');
  console.log(`✓ ${lang}: ${done.join(', ') || '(rien)'}`);
}
console.log('OK sources JSON mises à jour.');
