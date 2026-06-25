/* NAVLYS / BRUNO PARTOUCHE — composant logo animé universel (drop-in, zéro dépendance)
   Politique d'animation UNIQUE pour tous les sites & apps (NAVLYS, NAVBIO, brunopartouche.com).
   Usage :
     <div data-navlys-coin data-src="assets/navlys_coin_cut.png"></div>
     <script src="navlys-coin.js" defer></script>
   Options (attributs data-) :
     data-src       (requis)  image PNG transparente de la pièce (déjà détourée)
     data-mode      bank|spin (défaut bank)   bank = incline cinématique, spin = tour 360°
     data-size      px largeur (défaut 220)
     data-ratio     hauteur/largeur (défaut 1 ; pièce NAVLYS = 1.065)
     data-thickness px épaisseur tranche (défaut 14)
     data-reeds     nb de stries de tranche (défaut 72)
     data-halo      true|false (défaut true)  halo ICE BLUE pulsant 60 BPM
     data-sweep     true|false (défaut true)  balayage doré + reflet
     data-speed     secondes/cycle (défaut bank 9 / spin 12)
   Respecte prefers-reduced-motion (fige sur la face, garde le halo doux).
*/
(function () {
  var ICE = "rgba(125,211,252,";
  var CSS =
  ".nvc{display:inline-block;position:relative;perspective:1200px;perspective-origin:50% 45%;line-height:0}" +
  ".nvc *{box-sizing:border-box}" +
  ".nvc .nv-halo{position:absolute;left:50%;top:50%;width:150%;aspect-ratio:1;transform:translate(-50%,-50%);" +
    "border-radius:50%;filter:blur(8px);z-index:0;pointer-events:none;" +
    "background:radial-gradient(circle," + ICE + ".50) 0%," + ICE + ".18) 38%," + ICE + "0) 66%);animation:nv-halo 1s ease-in-out infinite}" +
  ".nvc .nv-rot{position:relative;transform-style:preserve-3d;z-index:1}" +
  ".nvc .nv-rot.bank{animation:nv-bank var(--sp,9s) ease-in-out infinite}" +
  ".nvc .nv-rot.spin{animation:nv-spin var(--sp,12s) linear infinite}" +
  ".nvc .nv-3d{position:relative;transform-style:preserve-3d}" +
  ".nvc .nv-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}" +
  ".nvc .nv-face img{width:100%;height:100%;object-fit:contain;display:block;" +
    "filter:drop-shadow(0 10px 22px rgba(0,0,0,.55)) drop-shadow(0 0 12px " + ICE + ".30))}" +
  ".nvc .nv-front{transform:translateZ(var(--t))}.nvc .nv-back{transform:rotateY(180deg) translateZ(var(--t))}" +
  ".nvc .nv-edge{position:absolute;inset:0;transform-style:preserve-3d}" +
  ".nvc .nv-edge i{position:absolute;left:50%;top:50%;display:block;border-radius:1.5px;backface-visibility:hidden;" +
    "background:linear-gradient(90deg,rgba(0,0,0,.66) 0%,rgba(0,0,0,.28) 20%,rgba(255,242,214,.5) 49%,rgba(0,0,0,.28) 80%,rgba(0,0,0,.66) 100%)," +
    "linear-gradient(180deg,#5a3719 0%,#cda062 33%,#a06c38 60%,#36210e 100%)}" +
  ".nvc .nv-core{position:absolute;inset:6%;border-radius:50%;transform:translateZ(0);background:radial-gradient(circle at 40% 34%,#b07b3f,#6b4623 60%,#3a2410)}" +
  ".nvc .nv-sweep,.nvc .nv-reflect{position:absolute;inset:0;pointer-events:none;-webkit-mask:var(--m) center/contain no-repeat;mask:var(--m) center/contain no-repeat}" +
  ".nvc .nv-sweep{mix-blend-mode:screen;background-size:280% 280%;background-image:linear-gradient(112deg,rgba(255,236,195,0) 43%,rgba(255,243,212,.55) 50%,rgba(255,236,195,0) 57%);animation:nv-sweep 5s ease-in-out infinite}" +
  ".nvc .nv-reflect{mix-blend-mode:overlay;background-size:320% 320%;background-image:linear-gradient(78deg,rgba(255,255,255,0) 45%,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 55%);animation:nv-reflect 7s linear infinite}" +
  "@keyframes nv-halo{0%,100%{opacity:.72;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.05)}}" +
  "@keyframes nv-spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}" +
  "@keyframes nv-bank{0%{transform:rotateY(-22deg) rotateX(4deg)}50%{transform:rotateY(22deg) rotateX(-3deg)}100%{transform:rotateY(-22deg) rotateX(4deg)}}" +
  "@keyframes nv-sweep{0%{background-position:150% -50%}48%{background-position:-50% 150%}100%{background-position:-50% 150%}}" +
  "@keyframes nv-reflect{0%{background-position:130% 0}100%{background-position:-70% 100%}}" +
  "@media(prefers-reduced-motion:reduce){.nvc .nv-rot{animation:none!important}.nvc .nv-sweep,.nvc .nv-reflect{animation:none!important;opacity:.25}}";

  function injectCSS() {
    if (document.getElementById("nvc-css")) return;
    var s = document.createElement("style"); s.id = "nvc-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }
  function segs(FW, FH, T, N) {
    var a = FW / 2, b = FH / 2, html = "", i, deg, rad, r, w, br;
    for (i = 0; i < N; i++) {
      deg = i * 360 / N; rad = deg * Math.PI / 180;
      r = (a * b) / Math.sqrt(Math.pow(b * Math.sin(rad), 2) + Math.pow(a * Math.cos(rad), 2));
      w = (2 * Math.PI * ((a + b) / 2) / N) * 1.25 + 1.4;
      br = 0.46 + 0.62 * (0.5 + 0.5 * Math.cos(rad));
      html += '<i style="width:' + w.toFixed(1) + 'px;height:' + T + 'px;transform:translate(-50%,-50%) rotateZ(' +
        deg.toFixed(2) + 'deg) rotateX(90deg) translateZ(' + r.toFixed(1) + 'px);filter:brightness(' + br.toFixed(3) + ')"></i>';
    }
    return html;
  }
  function build(el) {
    var src = el.getAttribute("data-src"); if (!src) return;
    var mode = el.getAttribute("data-mode") || "bank";
    var size = parseFloat(el.getAttribute("data-size") || 220);
    var ratio = parseFloat(el.getAttribute("data-ratio") || 1);
    var T = parseFloat(el.getAttribute("data-thickness") || 14);
    var N = parseInt(el.getAttribute("data-reeds") || 72, 10);
    var halo = el.getAttribute("data-halo") !== "false";
    var sweep = el.getAttribute("data-sweep") !== "false";
    var speed = el.getAttribute("data-speed");
    var FW = size, FH = Math.round(size * ratio);
    el.classList.add("nvc");
    el.style.width = FW + "px"; el.style.height = FH + "px";
    el.style.setProperty("--m", "url('" + src + "')");
    if (speed) el.style.setProperty("--sp", speed + "s");
    var sweepHTML = sweep ? '<span class="nv-sweep"></span><span class="nv-reflect"></span>' : "";
    el.innerHTML =
      (halo ? '<span class="nv-halo"></span>' : "") +
      '<div class="nv-rot ' + mode + '"><div class="nv-3d" style="width:' + FW + 'px;height:' + FH + 'px;--t:' + (T / 2) + 'px">' +
      '<b class="nv-core"></b><div class="nv-edge">' + segs(FW, FH, T, N) + "</div>" +
      '<div class="nv-face nv-front"><img src="' + src + '" alt="">' + sweepHTML + "</div>" +
      '<div class="nv-face nv-back"><img src="' + src + '" alt=""></div>' +
      "</div></div>";
  }
  function init() { injectCSS(); var n = document.querySelectorAll("[data-navlys-coin]"); for (var i = 0; i < n.length; i++) build(n[i]); }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
  window.NavlysCoin = { init: init, build: build };
})();
