/* NAVLYS — Moteur d'animations de logo (une par page d'application).
 * Vocabulaire de marque unique : un ANNEAU-PIÈCE ice blue qui se DESSINE puis
 * RESPIRE, un balayage OR champagne, et un MOTIF propre à chaque app au centre.
 * Charte stricte : ice #7DD3FC + or #e9d3a0 sur fond sombre uniquement.
 * Respecte prefers-reduced-motion (l'anneau reste dessiné, sans mouvement).
 *
 * API :
 *   NavlysLogo.svg(key, size)   -> chaîne SVG animée (self-contained)
 *   NavlysLogo.render(key, el, size) -> injecte dans un élément
 *   NavlysLogo.brand(el)        -> logo de la PAGE COURANTE (depuis l'URL) dans el
 *   NavlysLogo.keys()           -> liste des clés connues
 *   NavlysLogo.meta(key)        -> {nom, accent, motif} pour la galerie
 */
(function (root) {
  'use strict';

  // Motif central par app : chemins SVG dans un viewBox 0 0 100 100, centrés ~50,50.
  // `d` = un ou plusieurs <path>/<g> (ice, dessinés) ; `spin`/`pulse` = anim douce optionnelle.
  var REG = {
    // page d'accueil : la vague maîtresse ≋
    'index':    { nom: 'NAVLYS',       tag: 'accueil',       motif: 'wave' },
    'next-gen': { nom: 'Genesis',      tag: 'ta vie',        motif: 'spark' },
    'next-gen-beta': { nom: 'Next Gen', tag: 'beta',         motif: 'spark' },
    'finance':  { nom: 'NAVFIN',       tag: 'apprendre',     motif: 'growth' },
    'navlex':   { nom: 'NAVLEX',       tag: 'le droit',      motif: 'balance' },
    'mer':      { nom: 'La Mer',       tag: 'le large',      motif: 'wave' },
    'flotte':   { nom: 'La Flotte',    tag: 'les bateaux',   motif: 'anchor' },
    'bateau-test': { nom: 'Test Bateaux', tag: 'expertise',  motif: 'anchor' },
    'ecris-ta-vie': { nom: 'Écris ta vie', tag: 'mémoire',   motif: 'quill' },
    'radio':    { nom: 'Radio',        tag: 'ambiance',      motif: 'sound' },
    'assistance': { nom: 'Assistance', tag: 'à la voix',     motif: 'chat' },
    'cockpit':  { nom: 'Cockpit',      tag: 'pilotage',      motif: 'radar' },
    'ambassadeur': { nom: 'Ambassadeur', tag: 'parrainage',  motif: 'gift' },
    'booster':  { nom: 'Booster',      tag: 'croissance',    motif: 'boost' },
    'equipage': { nom: "L'Équipage",   tag: 'communauté',    motif: 'crew' },
    'club':     { nom: 'Le Club',      tag: 'communauté',    motif: 'crew' },
    'partenaires': { nom: 'Partenaires', tag: 'confiance',   motif: 'rings' },
    'choix-voix': { nom: 'La Voix',    tag: 'écouter',       motif: 'voice' },
    'adhesion': { nom: 'Adhésion',     tag: 'rejoindre',     motif: 'gift' },
    'lancement': { nom: 'Lancement',   tag: '1er août',      motif: 'boost' },
    'cinema':   { nom: 'Cinéma',       tag: 'vivant',        motif: 'sound' },
    'bibles':   { nom: 'La Bible',     tag: 'le savoir',     motif: 'quill' },
    'creations': { nom: 'Créations',   tag: 'la galerie',    motif: 'rings' }
  };

  // Chemins des motifs (ice, se dessinent). Chacun ~ dans 30..70.
  function motifPaths(m) {
    switch (m) {
      case 'wave':   return '<path class="nl-draw" d="M30 52 Q37 44 44 52 T58 52 T72 52" />';
      case 'spark':  return '<g class="nl-spin"><path class="nl-draw" d="M50 32 L50 68 M32 50 L68 50 M38 38 L62 62 M62 38 L38 62"/></g><circle class="nl-dot" cx="50" cy="50" r="3"/>';
      case 'growth': return '<path class="nl-draw" d="M32 62 L44 52 L52 57 L68 40"/><path class="nl-draw" d="M60 40 L68 40 L68 48"/>';
      case 'balance':return '<path class="nl-draw" d="M50 34 L50 62 M36 62 L64 62 M34 44 L66 44 M34 44 L28 56 M34 44 L40 56 M66 44 L60 56 M66 44 L72 56"/>';
      case 'anchor': return '<path class="nl-draw" d="M50 36 L50 66 M40 60 Q50 70 60 60 M40 46 L60 46"/><circle class="nl-draw" cx="50" cy="40" r="4"/>';
      case 'quill':  return '<path class="nl-draw" d="M36 66 Q52 60 66 36 Q54 40 44 52 Q40 58 36 66 Z M42 60 L34 68"/>';
      case 'sound':  return '<path class="nl-draw" d="M40 50 Q50 38 60 50 M35 50 Q50 32 65 50 M45 50 Q50 44 55 50"/>';
      case 'chat':   return '<path class="nl-draw" d="M34 42 Q34 38 40 38 L60 38 Q66 38 66 44 L66 54 Q66 60 60 60 L46 60 L38 66 L40 60 Q34 60 34 54 Z"/>';
      case 'radar':  return '<circle class="nl-draw" cx="50" cy="50" r="14"/><g class="nl-spin"><path class="nl-draw" d="M50 50 L64 44"/></g><circle class="nl-dot" cx="50" cy="50" r="2.5"/>';
      case 'gift':   return '<path class="nl-draw" d="M36 48 H64 V66 H36 Z M50 48 V66 M36 48 Q42 36 50 48 Q58 36 64 48"/>';
      case 'boost':  return '<path class="nl-draw" d="M44 66 L50 34 L56 66 M44 58 L56 58"/><path class="nl-up" d="M42 40 L50 30 L58 40"/>';
      case 'crew':   return '<circle class="nl-draw" cx="40" cy="46" r="5"/><circle class="nl-draw" cx="60" cy="46" r="5"/><circle class="nl-draw" cx="50" cy="60" r="5"/><path class="nl-draw" d="M44 48 L56 48 M42 50 L48 58 M58 50 L52 58"/>';
      case 'rings':  return '<circle class="nl-draw" cx="43" cy="50" r="11"/><circle class="nl-draw" cx="57" cy="50" r="11"/>';
      case 'voice':  return '<path class="nl-draw" d="M34 50 L40 50 L44 40 L50 62 L56 44 L60 50 L66 50"/>';
      default:       return '<path class="nl-draw" d="M30 52 Q37 44 44 52 T58 52 T72 52" />';
    }
  }

  function keyFromPath() {
    var p = (root.location && root.location.pathname || '/').replace(/\/+$/, '');
    if (p === '' || p === '/index') return 'index';
    var seg = p.split('/').filter(Boolean)[0] || 'index';
    return REG[seg] ? seg : 'index';
  }

  var CSS_ID = 'navlys-logos-css';
  function ensureCss() {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement('style'); st.id = CSS_ID;
    st.textContent =
      '.nl-logo{display:inline-block;line-height:0}' +
      '.nl-logo svg{overflow:visible}' +
      '.nl-ring{fill:none;stroke:#7DD3FC;stroke-width:3;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:283;animation:nlRing 1.6s ease-out forwards, nlBreathe 5s ease-in-out 1.6s infinite}' +
      '.nl-glow{fill:none;stroke:#7DD3FC;stroke-width:6;opacity:.16;filter:blur(1px)}' +
      '.nl-draw{fill:none;stroke:#a8e3ff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:120;stroke-dashoffset:120;animation:nlDraw 1.3s ease-out .5s forwards}' +
      '.nl-dot{fill:#e9d3a0;opacity:0;animation:nlFade .6s ease-out 1.5s forwards}' +
      '.nl-sweep{fill:none;stroke:#f3e4c4;stroke-width:3;stroke-linecap:round;stroke-dasharray:34 249;stroke-dashoffset:0;opacity:.85;animation:nlSweep 4.4s linear 1.7s infinite}' +
      '.nl-spin{transform-origin:50px 50px;animation:nlSpin 9s linear 1.6s infinite}' +
      '.nl-up{fill:none;stroke:#e9d3a0;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;opacity:0;animation:nlUp 2.6s ease-in-out 1.6s infinite}' +
      '@keyframes nlRing{to{stroke-dashoffset:0}}' +
      '@keyframes nlDraw{to{stroke-dashoffset:0}}' +
      '@keyframes nlFade{to{opacity:1}}' +
      '@keyframes nlBreathe{0%,100%{opacity:1}50%{opacity:.72}}' +
      '@keyframes nlSweep{to{stroke-dashoffset:-283}}' +
      '@keyframes nlSpin{to{transform:rotate(360deg)}}' +
      '@keyframes nlUp{0%{opacity:0;transform:translateY(4px)}40%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}' +
      '@media(prefers-reduced-motion:reduce){.nl-ring,.nl-draw,.nl-dot,.nl-sweep,.nl-spin,.nl-up{animation:none!important;stroke-dashoffset:0!important;opacity:1!important}}';
    document.head.appendChild(st);
  }

  function svg(key, size) {
    var k = REG[key] ? key : 'index';
    var s = size || 40;
    return '<svg class="nl-svg" width="' + s + '" height="' + s + '" viewBox="0 0 100 100" role="img" aria-label="NAVLYS ' +
      (REG[k].nom || '') + '">' +
      '<circle class="nl-glow" cx="50" cy="50" r="45"/>' +
      '<circle class="nl-ring" cx="50" cy="50" r="45"/>' +
      '<circle class="nl-sweep" cx="50" cy="50" r="45"/>' +
      motifPaths(REG[k].motif) +
      '</svg>';
  }

  var NavlysLogo = {
    keys: function () { return Object.keys(REG); },
    meta: function (key) { return REG[key] || null; },
    svg: function (key, size) { ensureCss(); return svg(key, size); },
    render: function (key, el, size) {
      if (!el) return; ensureCss();
      el.classList.add('nl-logo'); el.innerHTML = svg(key, size);
    },
    brand: function (el, size) {
      if (!el) return; ensureCss();
      var k = keyFromPath();
      el.classList.add('nl-logo'); el.innerHTML = svg(k, size || 34);
      el.setAttribute('data-nl-key', k);
    }
  };

  root.NavlysLogo = NavlysLogo;
})(typeof window !== 'undefined' ? window : this);
