'use client';

import { useEffect, useState } from 'react';

/**
 * NAVLYS — Cockpit immersif · composant Next.js autonome (TS strict)
 * ------------------------------------------------------------------
 * Version composant du prototype : le cockpit complet (mer animée,
 * vue 360 drag/gyroscope, HUD à bulles, boussole de cap) est embarqué
 * dans un iframe `srcDoc`. Aucune dépendance externe, aucun conflit de
 * style avec l'app hôte, fidélité parfaite au prototype validé.
 *
 * Usage :  import CockpitImmersif from './cockpit_immersif';
 *          <CockpitImmersif />            // cadre 86vh
 *          <CockpitImmersif fill />       // plein écran
 *
 * Palette : BRONZE #B87333 · ICE BLUE #7DD3FC · NUIT #02040a.
 * Données de DÉMONSTRATION uniquement (aucun marché réel, aucun conseil).
 */

const COCKPIT_HTML = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" />
<meta name="theme-color" content="#02040a" />
<title>NAVLYS — Cockpit immersif</title>
<style>
/* ============================================================
   NAVLYS — COCKPIT IMMERSIF (prototype autonome, hors-ligne)
   Palette stricte : BRONZE #B87333 · ICE BLUE #7DD3FC · NUIT #02040a
   Données de DÉMONSTRATION uniquement. Aucun marché réel.
   ============================================================ */
:root{
  --bronze:#B87333; --cuivre:#D49B5B; --or:#f4e4b0;
  --ice:#7DD3FC; --ice-dim:#0E4F66;
  --noir:#02040a; --nuit:#0B1220; --nuit2:#06101e;
  --perle:#E5E7EB; --dim:#9aa6b6; --corail:#e07a5f;
  --good:#86EFAC;
  --rfont:"Cormorant Garamond","Georgia",serif;
  --ufont:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  --hud-h:128px;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0;height:100%;background:var(--noir);color:var(--perle);
  font-family:var(--ufont);overflow:hidden;overscroll-behavior:none}
#cockpit{position:fixed;inset:0;overflow:hidden;touch-action:none;user-select:none}

/* ---- Mer animée (canvas) ---- */
#sea{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0}

/* ---- Bois du cockpit (premier plan, cadre) ---- */
.frame{position:absolute;left:0;right:0;bottom:0;height:46%;z-index:2;pointer-events:none;
  background:
    radial-gradient(120% 90% at 50% 140%, rgba(58,37,21,.95), rgba(28,15,6,.55) 55%, transparent 75%);
  -webkit-mask-image:linear-gradient(180deg,transparent,#000 60%);
          mask-image:linear-gradient(180deg,transparent,#000 60%);}
.gunwale{position:absolute;left:-4%;right:-4%;bottom:18%;height:14px;z-index:2;pointer-events:none;
  border-radius:50%;
  background:linear-gradient(180deg,#caa46a,#7a4e23 45%,#3a2515);
  box-shadow:0 -2px 8px rgba(244,228,176,.25), 0 8px 30px rgba(0,0,0,.6);
  transform:perspective(420px) rotateX(46deg)}

/* ---- Monde 360 (éléments positionnés par cap) ---- */
.world{position:absolute;inset:0;z-index:1;pointer-events:none}
.bearing{position:absolute;left:50%;top:0;transform:translate(-50%,-50%);
  will-change:transform,opacity;text-align:center;filter:drop-shadow(0 10px 24px rgba(0,0,0,.6))}
.bearing .cap{font-family:var(--rfont);letter-spacing:2px;text-transform:uppercase;font-size:12px;color:var(--ice)}
.bearing .lab{font-family:var(--rfont);font-size:15px;color:var(--perle)}
.bearing .sub{font-size:11px;color:var(--dim)}

/* étoile-objectif */
#b-star{top:25%}
.starhalo{width:170px;height:170px;border-radius:50%;
  background:radial-gradient(circle,rgba(125,211,252,.42),rgba(125,211,252,0) 68%);
  display:grid;place-items:center;animation:breathe 6s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.08);opacity:1}}

/* ---- Médaillon central : la pièce bronze = boussole de cap ---- */
#helm{position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);z-index:5;
  width:min(58vw,236px);aspect-ratio:1;touch-action:none;cursor:grab}
#helm:active{cursor:grabbing}
#helm svg{width:100%;height:100%;display:block}
.helm-cap{position:absolute;left:50%;bottom:-30px;transform:translateX(-50%);
  white-space:nowrap;font-family:var(--rfont);font-size:13px;color:var(--ice);letter-spacing:1px;z-index:5}
.helm-cap b{color:var(--or)}
.helm-hint{position:absolute;left:50%;top:-22px;transform:translateX(-50%);
  font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);z-index:5;opacity:.8;white-space:nowrap}

/* ---- Barre supérieure ---- */
.topbar{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;
  justify-content:space-between;gap:8px;padding:max(10px,env(safe-area-inset-top)) 14px 8px;
  pointer-events:none}
.brand{pointer-events:auto;display:flex;align-items:center;gap:9px}
.brand .coin{width:30px;height:30px;border-radius:50%;
  background:radial-gradient(circle at 36% 30%,#f6d6ad,#D49B5B 42%,#B87333 72%,#5c3514);
  box-shadow:0 0 0 1px #3a2207, 0 0 16px rgba(184,115,51,.5)}
.brand .nm{font-family:var(--rfont);letter-spacing:5px;font-size:18px;color:var(--perle)}
.brand .nm small{display:block;letter-spacing:1px;font-size:9px;color:var(--ice);margin-top:-3px}
.viewtag{pointer-events:none;font-family:var(--rfont);font-size:12px;letter-spacing:2px;
  text-transform:uppercase;color:var(--ice);text-align:center;flex:1}
.viewtag b{display:block;color:var(--perle);font-size:13px}
.tools{pointer-events:auto;display:flex;align-items:center;gap:6px}
.pill{pointer-events:auto;border:1px solid rgba(125,211,252,.4);background:rgba(6,16,30,.6);
  color:var(--ice);border-radius:999px;padding:7px 11px;font-size:11px;letter-spacing:.5px;cursor:pointer;
  font-family:var(--ufont);backdrop-filter:blur(6px)}
.pill:active{background:rgba(125,211,252,.16)}
.pill.gyro-on{border-color:var(--good);color:var(--good)}

/* allure (vitesse de la mer) */
.allure{position:absolute;left:14px;top:64px;z-index:6;display:flex;align-items:center;gap:8px;
  background:rgba(6,16,30,.55);border:1px solid rgba(125,211,252,.22);border-radius:999px;
  padding:6px 12px 6px 12px;backdrop-filter:blur(6px)}
.allure label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--dim)}
.allure input{width:96px}

/* ---- HUD bas (instruments façon Virtual Regatta) ---- */
.hud{position:absolute;left:0;right:0;bottom:0;z-index:7;height:var(--hud-h);
  display:grid;grid-template-columns:repeat(6,1fr);gap:6px;
  padding:10px 8px calc(10px + env(safe-area-inset-bottom));
  background:linear-gradient(180deg,transparent,rgba(2,4,10,.78) 36%,rgba(2,4,10,.96));
  backdrop-filter:blur(3px)}
.inst{position:relative;border:1px solid rgba(184,115,51,.35);border-radius:14px;
  background:linear-gradient(160deg,rgba(11,18,32,.92),rgba(2,6,14,.92));
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  padding:6px 4px;cursor:pointer;overflow:hidden;min-height:44px}
.inst:active{transform:translateY(1px)}
.inst .ic{height:30px;display:grid;place-items:center}
.inst .ic svg{width:34px;height:34px;display:block}
.inst .val{font-family:var(--rfont);font-size:15px;line-height:1;color:var(--perle);font-variant-numeric:tabular-nums}
.inst .nm{font-size:8.5px;letter-spacing:1px;text-transform:uppercase;color:var(--dim);text-align:center}
.inst .glow{position:absolute;inset:0;border-radius:14px;box-shadow:inset 0 0 22px rgba(125,211,252,.10);pointer-events:none}
@media (max-width:560px){
  .inst .val{font-size:13px}
  .inst .ic svg{width:28px;height:28px}
  :root{--hud-h:120px}
}

/* ---- Bulles (réglages / détails) ---- */
.bubble-mask{position:absolute;inset:0;z-index:9;display:none;align-items:flex-end;justify-content:center;
  background:rgba(2,4,10,.5);backdrop-filter:blur(2px)}
.bubble-mask.on{display:flex}
.bubble{width:min(94vw,460px);margin:0 0 calc(var(--hud-h) + 8px);
  background:linear-gradient(165deg,rgba(13,22,38,.98),rgba(4,9,18,.98));
  border:1px solid rgba(184,115,51,.5);border-radius:20px;padding:18px 18px 16px;
  box-shadow:0 24px 70px rgba(0,0,0,.7), inset 0 0 0 1px rgba(125,211,252,.08);
  transform:translateY(14px);opacity:0;transition:transform .25s cubic-bezier(.5,.05,.2,1),opacity .25s}
.bubble-mask.on .bubble{transform:translateY(0);opacity:1}
.bubble .bx{display:flex;align-items:center;gap:10px;margin-bottom:6px}
.bubble .bx .bi{width:34px;height:34px;flex:0 0 34px}
.bubble h3{margin:0;font-family:var(--rfont);font-size:21px;font-weight:600;color:var(--perle)}
.bubble .tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ice)}
.bubble p{margin:8px 0;font-size:13.5px;line-height:1.6;color:var(--dim)}
.bubble p b{color:var(--perle)}
.bubble .big{font-family:var(--rfont);font-size:30px;color:var(--ice);font-variant-numeric:tabular-nums;margin:4px 0}
.bubble .close{position:absolute;top:10px;right:14px;color:var(--dim);font-size:22px;cursor:pointer;
  background:none;border:none;line-height:1}
.bubble{position:relative}

/* winch (curseur bronze) */
.winch{margin:12px 0 4px}
.winch .wl{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.winch .wl span{font-size:12px;color:var(--dim);letter-spacing:.5px}
.winch .wl b{font-family:var(--rfont);font-size:18px;color:var(--cuivre)}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:999px;
  background:linear-gradient(90deg,var(--bronze),var(--cuivre));outline:none;margin:0}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;
  background:radial-gradient(circle at 36% 30%,#f6d6ad,#D49B5B 45%,#B87333 75%,#5c3514);
  border:2px solid #2a1808;box-shadow:0 2px 8px rgba(0,0,0,.6);cursor:pointer}
input[type=range]::-moz-range-thumb{width:26px;height:26px;border-radius:50%;border:2px solid #2a1808;
  background:radial-gradient(circle at 36% 30%,#f6d6ad,#D49B5B 45%,#B87333 75%);cursor:pointer}
.seg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}
.seg button{border:1px solid rgba(184,115,51,.4);background:rgba(6,16,30,.6);color:var(--dim);
  border-radius:12px;padding:10px 6px;font-family:var(--ufont);font-size:12px;cursor:pointer}
.seg button.on{border-color:var(--ice);color:var(--noir);background:linear-gradient(135deg,var(--ice),#bfeaff);font-weight:700}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
.kv{border:1px solid rgba(125,211,252,.18);border-radius:12px;padding:9px 11px;background:rgba(6,16,30,.5)}
.kv .k{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--dim)}
.kv .v{font-family:var(--rfont);font-size:20px;color:var(--perle);font-variant-numeric:tabular-nums}
.kv .v.ice{color:var(--ice)} .kv .v.bz{color:var(--cuivre)}
.advance{display:block;width:100%;margin-top:12px;border:none;border-radius:14px;cursor:pointer;
  padding:13px;font-family:var(--rfont);font-size:17px;letter-spacing:1px;color:var(--noir);
  background:linear-gradient(135deg,var(--cuivre),var(--bronze));box-shadow:0 8px 24px rgba(184,115,51,.35)}
.advance:active{transform:translateY(1px)}

/* mini courbe equity (sillage) */
.equity{width:220px;height:64px}

/* disclaimer permanent */
.disc{position:absolute;left:0;right:0;bottom:calc(var(--hud-h) - 2px);z-index:6;pointer-events:none;
  text-align:center;font-size:9.5px;color:var(--dim);opacity:.0;transition:opacity .3s}
/* (le disclaimer principal est dans la bulle Objectif + le pied ci-dessous) */
.footer-disc{position:absolute;left:0;right:0;top:0;display:none}

/* signature flottante */
.signature{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);z-index:1;
  font-family:var(--rfont);font-style:italic;font-size:12px;color:rgba(229,231,235,.55);
  text-align:center;pointer-events:none;width:min(80vw,420px)}

/* toast disclaimer bas permanent */
.legalbar{position:absolute;left:0;right:0;bottom:calc(var(--hud-h));z-index:8;pointer-events:none;
  display:flex;justify-content:center}
.legalbar span{pointer-events:none;font-size:9.5px;color:rgba(154,166,182,.85);
  background:rgba(2,4,10,.55);padding:3px 12px;border-radius:999px;margin-bottom:4px;
  backdrop-filter:blur(4px);border:1px solid rgba(125,211,252,.12)}

@media (prefers-reduced-motion: reduce){
  .starhalo{animation:none}
}
</style>
</head>
<body>
<div id="cockpit">

  <!-- 1 · La mer qui avance -->
  <canvas id="sea"></canvas>

  <!-- signature de fond -->
  <div class="signature">« Le vent du marché tourne sans cesse. Ton cap, lui, ne bouge pas. »</div>

  <!-- 2 · Monde 360 (positionné par le cap) -->
  <div class="world" id="world">
    <!-- AVANT (0°) : étoile-objectif -->
    <div class="bearing" id="b-star" data-bearing="0">
      <div class="starhalo">
        <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true">
          <g transform="translate(46,46)" fill="#bfeaff">
            <path d="M0,-40 L8,-9 L40,0 L8,9 L0,40 L-8,9 L-40,0 L-8,-9 Z"/>
          </g>
          <circle cx="46" cy="46" r="6" fill="#fff" opacity=".9"/>
        </svg>
      </div>
      <div class="cap">Étoile-objectif</div>
      <div class="lab" id="star-goal">Objectif — 20 000 €</div>
      <div class="sub" id="star-prog">cap tenu · projection à 1 an</div>
    </div>

    <!-- AVANT-bâbord (-20°) : grand mât = Forteresse 90% -->
    <div class="bearing" id="b-fort" data-bearing="-20" style="top:50%">
      <svg width="120" height="200" viewBox="0 0 120 200" aria-hidden="true">
        <rect x="56" y="14" width="8" height="172" rx="3" fill="#B87333"/>
        <path id="sail-fort" d="M60 22 C 26 60, 22 120, 30 176 L60 176 Z" fill="rgba(125,211,252,.16)" stroke="#7DD3FC" stroke-width="1.4"/>
        <path d="M60 26 C 92 64, 96 120, 88 172 L60 172 Z" fill="rgba(184,115,51,.16)" stroke="#D49B5B" stroke-width="1.2"/>
      </svg>
      <div class="cap">Grand mât</div>
      <div class="lab">La Forteresse · <b id="fort-pct">90</b>%</div>
      <div class="sub" id="fort-eur">— € · ~5 %/an, stable</div>
    </div>

    <!-- AVANT-tribord (+24°) : rotor Flettner = la curation -->
    <div class="bearing" id="b-flettner" data-bearing="24" style="top:52%">
      <svg width="64" height="150" viewBox="0 0 64 150" aria-hidden="true">
        <defs><clipPath id="cyl"><rect x="20" y="18" width="24" height="120" rx="12"/></clipPath></defs>
        <rect x="20" y="18" width="24" height="120" rx="12" fill="#1c0f06" stroke="#B87333" stroke-width="1.5"/>
        <g clip-path="url(#cyl)"><g id="flettner-stripes">
          <rect x="20" y="0" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="16" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="32" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="48" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="64" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="80" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="96" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="112" width="24" height="8" fill="#D49B5B" opacity=".7"/>
          <rect x="20" y="128" width="24" height="8" fill="#D49B5B" opacity=".7"/>
        </g></g>
      </svg>
      <div class="cap">Rotor Flettner</div>
      <div class="lab">La curation</div>
      <div class="sub">un seul cap par matin</div>
    </div>

    <!-- ARRIÈRE (180°) : sillage + courbe de résultats -->
    <div class="bearing" id="b-wake" data-bearing="180" style="top:50%">
      <svg class="equity" id="equity-svg" viewBox="0 0 220 64" preserveAspectRatio="none" aria-hidden="true">
        <polyline id="equity-line" fill="none" stroke="#7DD3FC" stroke-width="2.2"
          points="0,52 40,48 80,40 120,34 160,24 220,14"/>
      </svg>
      <div class="cap">Sillage</div>
      <div class="lab">Tes résultats <span class="sub">(démo)</span></div>
      <div class="sub" id="wake-total">à bord — €</div>
    </div>

    <!-- ARRIÈRE-bâbord (162°) : artimon = Jeu Actif 10% -->
    <div class="bearing" id="b-actif" data-bearing="162" style="top:52%">
      <svg width="86" height="150" viewBox="0 0 86 150" aria-hidden="true">
        <rect x="40" y="20" width="6" height="120" rx="3" fill="#B87333"/>
        <path id="sail-actif" d="M43 26 C 22 54, 20 96, 26 132 L43 132 Z" fill="rgba(224,122,95,.18)" stroke="#e07a5f" stroke-width="1.2"/>
      </svg>
      <div class="cap">Artimon</div>
      <div class="lab">Le Jeu Actif · <b id="actif-pct">10</b>%</div>
      <div class="sub" id="actif-eur">— € · réactif, borné</div>
    </div>
  </div>

  <!-- bois / fargue -->
  <div class="frame"></div>
  <div class="gunwale"></div>

  <!-- 3 · Médaillon central = boussole de cap (la pièce NAVLYS) -->
  <div id="helm" role="slider" aria-label="Boussole de cap — réglage de l'allocation Forteresse / Jeu Actif" tabindex="0">
    <span class="helm-hint">tourne le cap ↺</span>
    <svg viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#7DD3FC" stop-opacity=".30"/><stop offset="1" stop-color="#7DD3FC" stop-opacity="0"/></radialGradient>
        <radialGradient id="coin" cx="38%" cy="32%" r="72%">
          <stop offset="0" stop-color="#f6d6ad"/><stop offset=".4" stop-color="#D49B5B"/><stop offset=".75" stop-color="#B87333"/><stop offset="1" stop-color="#5c3514"/>
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D49B5B"/><stop offset="1" stop-color="#6e3f17"/></linearGradient>
      </defs>
      <circle cx="150" cy="150" r="140" fill="url(#halo)"/>
      <circle cx="150" cy="150" r="120" fill="#06101e" stroke="url(#ring)" stroke-width="6"/>
      <circle cx="150" cy="150" r="106" fill="none" stroke="rgba(184,115,51,.4)" stroke-width="1.5"/>
      <g stroke="#7DD3FC" stroke-width="2">
        <line x1="150" y1="34" x2="150" y2="52"/><line x1="150" y1="248" x2="150" y2="266"/>
        <line x1="34" y1="150" x2="52" y2="150"/><line x1="248" y1="150" x2="266" y2="150"/>
      </g>
      <text x="150" y="30" text-anchor="middle" fill="#7DD3FC" font-family="Georgia,serif" font-size="15">N</text>
      <text x="150" y="286" text-anchor="middle" fill="#9aa6b6" font-family="Georgia,serif" font-size="13">S</text>
      <text x="20" y="156" text-anchor="middle" fill="#9aa6b6" font-family="Georgia,serif" font-size="13">O</text>
      <text x="280" y="156" text-anchor="middle" fill="#9aa6b6" font-family="Georgia,serif" font-size="13">E</text>
      <!-- aiguille de cap (pivote avec l'allocation) -->
      <g id="needle" style="transform-box:fill-box;transform-origin:150px 150px">
        <polygon points="150,64 161,150 139,150" fill="#7DD3FC"/>
        <polygon points="150,236 161,150 139,150" fill="#6e3f17"/>
      </g>
      <!-- pièce bronze NAVLYS -->
      <g>
        <circle cx="150" cy="150" r="46" fill="url(#coin)" stroke="#3a2207" stroke-width="3"/>
        <circle cx="150" cy="150" r="46" fill="none" stroke="#f0c79a" stroke-width="1.4" opacity=".55"/>
        <g transform="translate(150,150)" fill="#3a2207" opacity=".88">
          <path d="M0,-30 L6,-7 L30,0 L6,7 L0,30 L-6,7 L-30,0 L-6,-7 Z"/>
        </g>
        <text x="150" y="156" text-anchor="middle" fill="#2a1808" font-family="Georgia,serif" font-size="13" font-weight="700" letter-spacing="1">N</text>
      </g>
    </svg>
    <div class="helm-cap">Cap : <b id="helm-fort">90 %</b> Forteresse · <span id="helm-act">10 %</span> Jeu actif</div>
  </div>

  <!-- 4 · Barre supérieure -->
  <div class="topbar">
    <div class="brand">
      <div class="coin"></div>
      <div class="nm">NAVLYS<small>cockpit</small></div>
    </div>
    <div class="viewtag"><span id="view-name">VUE AVANT</span><b id="view-sub">le cap</b></div>
    <div class="tools">
      <button class="pill" id="gyroBtn" title="Gyroscope">⌖ Gyro</button>
    </div>
  </div>

  <!-- allure de la mer -->
  <div class="allure">
    <label for="allure">Allure</label>
    <input id="allure" type="range" min="0" max="100" value="42" aria-label="Allure (vitesse de la mer)"/>
  </div>

  <!-- légale permanente -->
  <div class="legalbar"><span>Démo pédagogique · aucun marché réel · aucun conseil financier</span></div>

  <!-- 5 · HUD bas : instruments -->
  <div class="hud" id="hud">
    <div class="inst" data-inst="marche">
      <div class="ic"><svg viewBox="0 0 40 40"><path d="M6 28 A14 14 0 0 1 34 28" fill="none" stroke="#1c2c3a" stroke-width="3"/><path d="M6 28 A14 14 0 0 1 20 14" fill="none" stroke="#e07a5f" stroke-width="3"/><path d="M20 14 A14 14 0 0 1 34 28" fill="none" stroke="#7DD3FC" stroke-width="3"/><g id="mk-needle" style="transform-box:fill-box;transform-origin:20px 28px"><line x1="20" y1="28" x2="20" y2="15" stroke="#D49B5B" stroke-width="2.2"/></g><circle cx="20" cy="28" r="2.4" fill="#B87333"/></svg></div>
      <div class="val" id="v-marche">+0.4</div><div class="nm">Marché mondial</div><div class="glow"></div>
    </div>
    <div class="inst" data-inst="tendance">
      <div class="ic"><svg viewBox="0 0 40 40"><g id="tr-arrow" style="transform-box:fill-box;transform-origin:20px 20px"><path d="M10 26 L20 12 L30 26" fill="none" stroke="#7DD3FC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>
      <div class="val" id="v-tendance">Porteur</div><div class="nm">Tendance</div><div class="glow"></div>
    </div>
    <div class="inst" data-inst="amplitude">
      <div class="ic"><svg viewBox="0 0 40 40"><path id="amp-wave" d="M4 24 Q10 14 16 24 T28 24 T40 24" fill="none" stroke="#D49B5B" stroke-width="3" stroke-linecap="round"/></svg></div>
      <div class="val" id="v-amplitude">Équilibré</div><div class="nm">Amplitude du jour</div><div class="glow"></div>
    </div>
    <div class="inst" data-inst="cap">
      <div class="ic"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="none" stroke="#1c2c3a" stroke-width="2.4"/><g id="cap-needle" style="transform-box:fill-box;transform-origin:20px 20px"><polygon points="20,9 23,20 17,20" fill="#7DD3FC"/><polygon points="20,31 23,20 17,20" fill="#6e3f17"/></g></svg></div>
      <div class="val" id="v-cap">90/10</div><div class="nm">Cap · allocation</div><div class="glow"></div>
    </div>
    <div class="inst" data-inst="objectif">
      <div class="ic"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="none" stroke="#1c2c3a" stroke-width="2.4"/><circle cx="20" cy="20" r="13" fill="none" stroke="#7DD3FC" stroke-width="2.8" stroke-linecap="round" id="obj-ring" stroke-dasharray="20 200" transform="rotate(-90 20 20)"/><circle cx="20" cy="20" r="3.2" fill="#D49B5B"/></svg></div>
      <div class="val" id="v-objectif">—%</div><div class="nm">Objectif</div><div class="glow"></div>
    </div>
    <div class="inst" data-inst="marge">
      <div class="ic"><svg viewBox="0 0 40 40"><path d="M20 6 L32 11 V21 C32 29 26 33 20 35 C14 33 8 29 8 21 V11 Z" fill="rgba(125,211,252,.12)" stroke="#7DD3FC" stroke-width="2.2"/><path d="M15 20 l4 4 l7 -8" fill="none" stroke="#86EFAC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="val" id="v-marge">—</div><div class="nm">Marge protection</div><div class="glow"></div>
    </div>
  </div>

  <!-- 6 · Bulles -->
  <div class="bubble-mask" id="mask">
    <div class="bubble" id="bubble">
      <button class="close" id="bclose" aria-label="Fermer">×</button>
      <div id="bcontent"></div>
    </div>
  </div>

</div>

<script>
"use strict";
/* ====== Constantes simulation (DÉMO) — alignées sur le pack cockpit ====== */
var VOILURE_FACTOR=[0.6,1.0,1.7];
var ACTIVE_BOUNDS={min:-0.06,max:0.08};
var TICKERS=["MISTRAL-7","ZÉPHYR-3","TRAMONTANE-9","ALIZÉ-5","BORÉE-2","SIROCCO-6","NORDET-4","GRÉGALE-8"];
var VOIL_LAB=["Prudent","Équilibré","Agressif"];

function rnd(a,b){return a+Math.random()*(b-a);}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function eur(n){return (isFinite(n)?Math.round(n).toLocaleString("fr-FR"):"—")+" €";}

/* ====== État ====== */
var S={
  capital:1000, fortShare:0.90, realloc:0.50, voilure:1, market:0.40,
  monthly:100, goal:20000, fort:900, actif:100, month:0,
  history:[1000], heading:{label:"MISTRAL-7",entry:128.4,exit:2.5}
};

function makeHeading(){
  return {label:TICKERS[(Math.random()*TICKERS.length)|0]||"MISTRAL-7",
          entry:rnd(40,220), exit:rnd(1.5,3.5)};
}

/* projection 1 an déterministe (démo) */
function projection(){
  var wind=(S.market+1)/2;
  var annual=[0.04,0.10,0.20][S.voilure]*(0.6+0.4*wind);
  return S.fort*1.05 + S.actif*(1+annual) + S.monthly*12;
}

/* avance d'un mois (simulation bornée) */
function nextMonth(){
  S.market=clamp(S.market+rnd(-0.45,0.45),-1,1);
  var wind=(S.market+1)/2;
  var vf=VOILURE_FACTOR[S.voilure];
  // dépôt mensuel réparti selon l'allocation
  S.fort += S.monthly*S.fortShare;
  S.actif += S.monthly*(1-S.fortShare);
  // Forteresse : ~5%/an lissé
  S.fort *= Math.pow(1.05,1/12);
  // Jeu Actif : rendement mensuel borné, modulé par voilure × marché
  var mean=S.market*0.012*vf, vol=0.02*vf;
  var ret=clamp(mean+rnd(-vol,vol),ACTIVE_BOUNDS.min,ACTIVE_BOUNDS.max);
  var before=S.actif;
  S.actif*=(1+ret);
  var gain=S.actif-before;
  if(gain>0){ var moved=gain*S.realloc; S.actif-=moved; S.fort+=moved; }
  S.capital=S.fort+S.actif;
  S.history.push(S.capital); if(S.history.length>60)S.history.shift();
  S.month++; S.heading=makeHeading();
  render();
}

function setAlloc(fs){ S.fortShare=clamp(fs,0.70,0.98);
  S.fort=S.capital*S.fortShare; S.actif=S.capital*(1-S.fortShare); render(); }

/* ====== Rendu des lectures ====== */
var $=function(id){return document.getElementById(id);};
function render(){
  var fp=Math.round(S.fortShare*100), ap=100-fp;
  $("v-marche").textContent=(S.market>=0?"+":"")+S.market.toFixed(2);
  $("v-cap").textContent=fp+"/"+ap;
  $("v-amplitude").textContent=VOIL_LAB[S.voilure];
  $("v-tendance").textContent=S.market>0.15?"Porteur":(S.market<-0.15?"Mou":"Calme");
  var prog=clamp(S.capital/S.goal,0,1);
  $("v-objectif").textContent=Math.round(prog*100)+"%";
  $("v-marge").textContent=eur(S.fort);
  // météo aiguille -1..1 -> -80..80°
  $("mk-needle").style.transform="rotate("+(S.market*80)+"deg)";
  $("cap-needle").style.transform="rotate("+capAngle()+"deg)";
  $("tr-arrow").style.transform="rotate("+clamp(-S.market*40,-40,40)+"deg)";
  // objectif ring (circonférence r=13 -> ~81.7)
  var C=2*Math.PI*13; $("obj-ring").setAttribute("stroke-dasharray",(prog*C).toFixed(1)+" "+C.toFixed(1));
  // amplitude wave
  $("amp-wave").setAttribute("stroke", S.voilure===2?"#e07a5f":(S.voilure===0?"#7DD3FC":"#D49B5B"));
  // monde 360
  $("star-goal").textContent="Objectif — "+eur(S.goal);
  $("star-prog").textContent="projection 1 an ≈ "+eur(projection());
  $("fort-pct").textContent=fp; $("actif-pct").textContent=ap;
  $("fort-eur").textContent=eur(S.fort)+" · ~5 %/an, stable";
  $("actif-eur").textContent=eur(S.actif)+" · réactif, borné";
  $("wake-total").textContent="à bord — "+eur(S.capital);
  // helm
  $("helm-fort").textContent=fp+" %"; $("helm-act").textContent=ap+" %";
  $("needle").style.transform="rotate("+capAngle()+"deg)";
  // voiles : gonflement selon vent × voilure
  var wind=(S.market+1)/2, k=0.62+wind*0.5*VOILURE_FACTOR[S.voilure]/1.7;
  var sf=$("sail-fort"), sa=$("sail-actif");
  if(sf){sf.style.transformBox="fill-box";sf.style.transformOrigin="right center";sf.style.transform="scaleX("+clamp(k,0.55,1.08)+")";sf.style.transition="transform .7s cubic-bezier(.5,.05,.2,1)";}
  if(sa){sa.style.transformBox="fill-box";sa.style.transformOrigin="right center";sa.style.transform="scaleX("+clamp(0.6+wind*0.4,0.5,1.05)+")";sa.style.transition="transform .7s cubic-bezier(.5,.05,.2,1)";}
  // equity polyline (sillage)
  var h=S.history, n=h.length, mn=Math.min.apply(null,h), mx=Math.max.apply(null,h), rg=(mx-mn)||1;
  var pts=h.map(function(v,i){var x=(i/(n-1||1))*220; var y=58-((v-mn)/rg)*50; return x.toFixed(1)+","+y.toFixed(1);}).join(" ");
  $("equity-line").setAttribute("points",pts);
  // si une bulle est ouverte, rafraîchir ses valeurs live
  if(maskOn && currentInst) liveRefresh(currentInst);
}

/* cap (allocation) -> angle aiguille : 70%→+70° (Est, plus actif), 98%→-70° (Ouest, plus sûr) */
function capAngle(){ var t=(S.fortShare-0.70)/(0.98-0.70); return (0.5-t)*140; }
function angleToFort(deg){ var t=0.5-(clamp(deg,-70,70)/140); return 0.70+t*0.28; }

/* ====== Boussole de cap : drag ====== */
(function(){
  var helm=$("helm");
  var dragging=false;
  function center(){var r=helm.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};}
  function toFort(e){
    var c=center();
    var px=(e.touches?e.touches[0].clientX:e.clientX)-c.x;
    var py=(e.touches?e.touches[0].clientY:e.clientY)-c.y;
    var deg=Math.atan2(px,-py)*180/Math.PI; // 0 = haut (Nord)
    setAlloc(angleToFort(deg));
  }
  function down(e){dragging=true;helm.style.cursor="grabbing";toFort(e);e.preventDefault();}
  function move(e){if(dragging){toFort(e);e.preventDefault();}}
  function up(){dragging=false;helm.style.cursor="grab";}
  helm.addEventListener("mousedown",down); window.addEventListener("mousemove",move); window.addEventListener("mouseup",up);
  helm.addEventListener("touchstart",down,{passive:false}); helm.addEventListener("touchmove",move,{passive:false}); window.addEventListener("touchend",up);
  helm.addEventListener("keydown",function(e){
    if(e.key==="ArrowLeft"||e.key==="ArrowDown"){setAlloc(S.fortShare+0.01);e.preventDefault();}
    if(e.key==="ArrowRight"||e.key==="ArrowUp"){setAlloc(S.fortShare-0.01);e.preventDefault();}
  });
})();

/* ====== Vue 360 : drag horizontal + gyroscope ====== */
var viewAngle=0;            // 0 = avant
var dragSceneActive=false, dragStartX=0, dragStartAngle=0;
var cockpit=$("cockpit");
function onSceneDown(e){
  var t=e.target;
  if(t.closest && (t.closest("#helm")||t.closest(".hud")||t.closest(".bubble")||t.closest(".allure")||t.closest(".pill"))) return;
  dragSceneActive=true; dragStartX=(e.touches?e.touches[0].clientX:e.clientX); dragStartAngle=viewAngle;
}
function onSceneMove(e){
  if(!dragSceneActive)return;
  var x=(e.touches?e.touches[0].clientX:e.clientX);
  viewAngle=dragStartAngle - (x-dragStartX)*0.42;   // glisser droite = tourner la tête à droite
  viewAngle=((viewAngle%360)+360)%360;
}
function onSceneUp(){dragSceneActive=false;}
cockpit.addEventListener("mousedown",onSceneDown); window.addEventListener("mousemove",onSceneMove); window.addEventListener("mouseup",onSceneUp);
cockpit.addEventListener("touchstart",onSceneDown,{passive:true}); cockpit.addEventListener("touchmove",onSceneMove,{passive:true}); window.addEventListener("touchend",onSceneUp);

/* gyroscope */
var gyroOn=false, gyroBase=null;
function handleOrient(e){
  if(e.alpha==null)return;
  if(gyroBase==null)gyroBase=e.alpha;
  var rel=gyroBase-e.alpha;            // rotation relative
  viewAngle=((rel%360)+360)%360;
}
$("gyroBtn").addEventListener("click",function(){
  if(gyroOn){ window.removeEventListener("deviceorientation",handleOrient); gyroOn=false; gyroBase=null;
    this.classList.remove("gyro-on"); this.textContent="⌖ Gyro"; return; }
  var start=function(){ window.addEventListener("deviceorientation",handleOrient,true); gyroOn=true;
    $("gyroBtn").classList.add("gyro-on"); $("gyroBtn").textContent="⌖ Gyro ✓"; };
  if(typeof DeviceOrientationEvent!=="undefined" && typeof DeviceOrientationEvent.requestPermission==="function"){
    DeviceOrientationEvent.requestPermission().then(function(p){ if(p==="granted")start(); else alert("Gyroscope refusé — utilise le glisser du doigt pour tourner la tête."); })
      .catch(function(){ alert("Gyroscope indisponible — utilise le glisser du doigt."); });
  } else if(typeof DeviceOrientationEvent!=="undefined"){ start(); }
  else { alert("Gyroscope non disponible sur cet appareil — utilise le glisser du doigt pour la vue 360."); }
});

/* mise à jour des éléments du monde 360 selon viewAngle */
var worldEls=[].slice.call(document.querySelectorAll(".bearing"));
function angDiff(a,b){var d=((a-b+540)%360)-180;return d;}
function updateWorld(){
  for(var i=0;i<worldEls.length;i++){
    var el=worldEls[i], B=+el.dataset.bearing, d=angDiff(B,viewAngle), ad=Math.abs(d);
    if(ad>78){ if(el.style.display!=="none")el.style.display="none"; continue; }
    if(el.style.display==="none")el.style.display="";
    var topPct=el.style.top||"50%";
    var x=d*6.4, op=Math.max(0,1-ad/72), sc=0.84+0.16*op;
    el.style.transform="translate(-50%,-50%) translateX("+x.toFixed(1)+"px) scale("+sc.toFixed(3)+")";
    el.style.opacity=op.toFixed(3);
  }
  // étiquette de vue
  var a=viewAngle, name,sub;
  if(a<35||a>325){name="VUE AVANT";sub="le cap";}
  else if(a>=35&&a<145){name="TRIBORD";sub="la mer";}
  else if(a>=145&&a<215){name="VUE ARRIÈRE";sub="le sillage";}
  else {name="BÂBORD";sub="la mer";}
  var vn=$("view-name"), vs=$("view-sub");
  if(vn.textContent!==name){vn.textContent=name;vs.textContent=sub;}
}

/* ====== Mer animée (canvas) ====== */
var cv=$("sea"), ctx=cv.getContext("2d"), W=0,H=0,DPR=1;
function resize(){ DPR=Math.min(2,window.devicePixelRatio||1);
  W=cv.clientWidth=window.innerWidth; H=cv.clientHeight=window.innerHeight;
  cv.width=Math.floor(W*DPR); cv.height=Math.floor(H*DPR);
  ctx.setTransform(DPR,0,0,DPR,0,0); }
window.addEventListener("resize",resize); resize();

var phase=0;
function lerp(a,b,t){return a+(b-a)*t;}
function drawSea(){
  var horizon=H*0.40;
  var wind=(S.market+1)/2;
  // ciel
  var sky=ctx.createLinearGradient(0,0,0,horizon);
  sky.addColorStop(0,"#02040a"); sky.addColorStop(0.7,"#04101c");
  // teinte d'horizon selon marché (corail si baisse, ice si hausse)
  var hr=Math.round(lerp(60,40,wind)), hg=Math.round(lerp(40,90,wind)), hb=Math.round(lerp(50,120,wind));
  sky.addColorStop(1,"rgb("+hr+","+hg+","+hb+")");
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,horizon);
  // halo soleil/objectif quand on regarde devant
  var dStar=Math.abs(angDiff(0,viewAngle));
  if(dStar<60){
    var hx=W/2 + angDiff(0,viewAngle)*6.4;
    var g=ctx.createRadialGradient(hx,horizon,2,hx,horizon,160);
    g.addColorStop(0,"rgba(125,211,252,"+(0.22*(1-dStar/60)).toFixed(3)+")");
    g.addColorStop(1,"rgba(125,211,252,0)");
    ctx.fillStyle=g; ctx.fillRect(0,horizon-160,W,260);
  }
  // mer (fond)
  var sea=ctx.createLinearGradient(0,horizon,0,H);
  sea.addColorStop(0,"rgb("+Math.round(lerp(20,14,wind))+","+Math.round(lerp(30,46,wind))+","+Math.round(lerp(42,66,wind))+")");
  sea.addColorStop(1,"#01060d");
  ctx.fillStyle=sea; ctx.fillRect(0,horizon,W,H-horizon);
  // reflet de l'objectif sur l'eau
  if(dStar<55){
    var rx=W/2 + angDiff(0,viewAngle)*6.4;
    var rg=ctx.createLinearGradient(0,horizon,0,H*0.8);
    rg.addColorStop(0,"rgba(125,211,252,"+(0.16*(1-dStar/55)).toFixed(3)+")");
    rg.addColorStop(1,"rgba(125,211,252,0)");
    ctx.fillStyle=rg; ctx.fillRect(rx-22,horizon,44,H*0.4);
  }
  // vagues qui avancent vers le barreur
  var rows=24, ampF=VOILURE_FACTOR[S.voilure], xoff=viewAngle*1.6;
  for(var i=0;i<rows;i++){
    var tt=((i+phase)%rows)/rows;     // 0..1 : défile de l'horizon vers le barreur
    var y=horizon+(H-horizon)*Math.pow(tt,1.9);
    var amp=0.6+tt*tt*16*(0.7+ampF*0.5);
    var a=0.06+tt*0.46;
    var rr=Math.round(lerp(125,224,1-wind)), gg=Math.round(lerp(211,122,1-wind)), bb=Math.round(lerp(252,95,1-wind));
    // mélange ice/corail selon marché : si marché négatif, un peu de corail
    var col= wind>0.5 ? "rgba(125,211,252," : "rgba("+rr+","+gg+","+bb+",";
    ctx.strokeStyle=col+(a*0.7).toFixed(3)+")";
    ctx.lineWidth=0.8+tt*1.8;
    ctx.beginPath();
    var step=tt<0.4?20:12;
    for(var x=-20;x<=W+20;x+=step){
      var yy=y+Math.sin((x*0.016)+tt*7+phase*0.5+xoff*0.01)*amp
              +Math.sin((x*0.045)-phase*0.8)*amp*0.25*tt;
      if(x<=-20)ctx.moveTo(x,yy); else ctx.lineTo(x,yy);
    }
    ctx.stroke();
  }
  // écume rapide près du barreur (sensation de vitesse)
  var foam=6;
  for(var f=0;f<foam;f++){
    var ft=((f/foam)+(phase*0.16))%1;
    var fy=horizon+(H-horizon)*Math.pow(0.6+ft*0.4,1.6);
    var fx=((f*131.7+phase*60)% (W+80))-40 + Math.sin(phase*0.4+f)*8;
    ctx.fillStyle="rgba(229,231,235,"+(0.10+ft*0.18).toFixed(3)+")";
    ctx.fillRect(fx,fy,2+ft*4,1.4+ft*2);
  }
  // vitesse selon l'allure
  phase += seaSpeed;
}

/* boucle principale */
var seaSpeed=0.06;
$("allure").addEventListener("input",function(){ seaSpeed=0.012+(this.value/100)*0.14; });
seaSpeed=0.012+(42/100)*0.14;

var spin=0;
function loop(){
  drawSea();
  updateWorld();
  // pièce qui scintille très légèrement (rotor flettner défile)
  spin=(spin+0.6)%16;
  var fs=$("flettner-stripes"); if(fs)fs.setAttribute("transform","translate(0,"+(spin-16)+")");
  requestAnimationFrame(loop);
}

/* ====== Bulles ====== */
var mask=$("mask"), bcontent=$("bcontent"), maskOn=false, currentInst=null;
function openBubble(kind){ currentInst=kind; bcontent.innerHTML=bubbleHTML(kind); wireBubble(kind);
  mask.classList.add("on"); maskOn=true; }
function closeBubble(){ mask.classList.remove("on"); maskOn=false; currentInst=null; }
$("bclose").addEventListener("click",closeBubble);
mask.addEventListener("click",function(e){ if(e.target===mask)closeBubble(); });
[].slice.call(document.querySelectorAll(".inst")).forEach(function(el){
  el.addEventListener("click",function(){ openBubble(el.dataset.inst); });
});

function bubbleHTML(k){
  var fp=Math.round(S.fortShare*100), ap=100-fp;
  if(k==="marche") return ''+
    '<div class="bx"><svg class="bi" viewBox="0 0 40 40"><path d="M6 28 A14 14 0 0 1 34 28" fill="none" stroke="#1c2c3a" stroke-width="3"/><path d="M6 28 A14 14 0 0 1 20 14" fill="none" stroke="#e07a5f" stroke-width="3"/><path d="M20 14 A14 14 0 0 1 34 28" fill="none" stroke="#7DD3FC" stroke-width="3"/></svg>'+
      '<div><div class="tag">Le grand vent</div><h3>Marché mondial</h3></div></div>'+
    '<div class="big" id="lr-marche">'+(S.market>=0?"+":"")+S.market.toFixed(2)+'</div>'+
    '<p>C\\'est <b>le vent du large</b> : l\\'humeur générale des marchés, de baisse (–1) à hausse (+1). Tu ne le commandes pas — tu l\\'observes et tu règles ta voilure en conséquence.</p>'+
    '<p class="tag">Donnée de démonstration · marche aléatoire bornée</p>';
  if(k==="tendance") return ''+
    '<div class="bx"><svg class="bi" viewBox="0 0 40 40"><path d="M10 26 L20 12 L30 26" fill="none" stroke="#7DD3FC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
      '<div><div class="tag">Le sens du vent</div><h3>Tendance</h3></div></div>'+
    '<div class="big" id="lr-tendance">'+(S.market>0.15?"Porteur":(S.market<-0.15?"Mou":"Calme"))+'</div>'+
    '<p>La flèche dit si le vent <b>porte</b> (tendance haussière) ou <b>mollit</b>. Quand le vent porte, les voiles se gonflent ; quand il mollit, elles faseyent.</p>';
  if(k==="amplitude") return ''+
    '<div class="bx"><svg class="bi" viewBox="0 0 40 40"><path d="M4 24 Q10 14 16 24 T28 24 T40 24" fill="none" stroke="#D49B5B" stroke-width="3"/></svg>'+
      '<div><div class="tag">Winch · voilure du jour</div><h3>Amplitude du jour</h3></div></div>'+
    '<p>Combien de toile tu envoies aujourd\\'hui. Plus de toile = plus de vitesse… et plus de gîte. <b>Le Jeu Actif</b> (10 %) suit ce réglage ; la Forteresse, jamais.</p>'+
    '<div class="seg" id="seg-voil">'+
      '<button data-v="0"'+(S.voilure===0?' class="on"':'')+'>Prudent</button>'+
      '<button data-v="1"'+(S.voilure===1?' class="on"':'')+'>Équilibré</button>'+
      '<button data-v="2"'+(S.voilure===2?' class="on"':'')+'>Agressif</button>'+
    '</div>'+
    '<div class="winch"><div class="wl"><span>Allure de la mer</span><b id="lr-allure">'+Math.round((seaSpeed-0.012)/0.14*100)+' %</b></div>'+
      '<input type="range" id="w-allure" min="0" max="100" value="'+Math.round((seaSpeed-0.012)/0.14*100)+'"></div>';
  if(k==="cap") return ''+
    '<div class="bx"><svg class="bi" viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="none" stroke="#1c2c3a" stroke-width="2.4"/><polygon points="20,9 23,20 17,20" fill="#7DD3FC"/></svg>'+
      '<div><div class="tag">Winch · allocation & réaffectation</div><h3>Ton cap</h3></div></div>'+
    '<p>Le partage entre <b>la Forteresse</b> (coffre stable) et <b>le Jeu Actif</b> (vifs). Tu peux aussi le régler à la boussole centrale.</p>'+
    '<div class="winch"><div class="wl"><span>Forteresse / Jeu actif</span><b id="lr-alloc">'+fp+' / '+ap+'</b></div>'+
      '<input type="range" id="w-alloc" min="70" max="98" value="'+fp+'"></div>'+
    '<div class="winch"><div class="wl"><span>Réaffectation des gains → coffre</span><b id="lr-realloc">'+Math.round(S.realloc*100)+' %</b></div>'+
      '<input type="range" id="w-realloc" min="0" max="100" value="'+Math.round(S.realloc*100)+'"></div>'+
    '<p class="tag">Reverser une part des gains au coffre = le moteur de la croissance composée.</p>';
  if(k==="objectif") return ''+
    '<div class="bx"><svg class="bi" viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="none" stroke="#1c2c3a" stroke-width="2.4"/><circle cx="20" cy="20" r="3.2" fill="#D49B5B"/></svg>'+
      '<div><div class="tag">L\\'étoile-objectif</div><h3>Ton objectif</h3></div></div>'+
    '<div class="row2"><div class="kv"><div class="k">À bord</div><div class="v ice" id="lr-cap">'+eur(S.capital)+'</div></div>'+
      '<div class="kv"><div class="k">Projection 1 an</div><div class="v" id="lr-proj">'+eur(projection())+'</div></div></div>'+
    '<div class="winch"><div class="wl"><span>Objectif visé</span><b id="lr-goal">'+eur(S.goal)+'</b></div>'+
      '<input type="range" id="w-goal" min="3000" max="100000" step="1000" value="'+S.goal+'"></div>'+
    '<div class="winch"><div class="wl"><span>Versement mensuel</span><b id="lr-monthly">'+eur(S.monthly)+'</b></div>'+
      '<input type="range" id="w-monthly" min="0" max="500" step="10" value="'+S.monthly+'"></div>'+
    '<button class="advance" id="b-next">Mois suivant ⚓</button>'+
    '<p style="margin-top:10px;font-size:11px">NAVLYS partage des informations générales et pédagogiques. Ce n\\'est pas un conseil financier personnalisé. Tu décides tout, tu gères tout. Données de démonstration.</p>';
  if(k==="marge") return ''+
    '<div class="bx"><svg class="bi" viewBox="0 0 40 40"><path d="M20 6 L32 11 V21 C32 29 26 33 20 35 C14 33 8 29 8 21 V11 Z" fill="rgba(125,211,252,.12)" stroke="#7DD3FC" stroke-width="2.2"/></svg>'+
      '<div><div class="tag">La coque solide</div><h3>Marge de protection</h3></div></div>'+
    '<div class="row2"><div class="kv"><div class="k">Forteresse</div><div class="v ice" id="lr-fort">'+eur(S.fort)+'</div></div>'+
      '<div class="kv"><div class="k">Jeu Actif</div><div class="v bz" id="lr-actif">'+eur(S.actif)+'</div></div></div>'+
    '<p>La part <b>protégée</b> de ton capital — la coque qui ne prend pas l\\'eau quand la mer forcit. Elle avance doucement (~5 %/an) et grossit à chaque gain reversé.</p>'+
    '<div class="row2"><div class="kv"><div class="k">Cap du jour (démo)</div><div class="v" style="font-size:16px">'+S.heading.label+'</div></div>'+
      '<div class="kv"><div class="k">Sortie visée</div><div class="v" style="font-size:16px">+'+S.heading.exit.toFixed(1)+' %</div></div></div>';
  return "";
}

function wireBubble(k){
  if(k==="amplitude"){
    [].slice.call(document.querySelectorAll("#seg-voil button")).forEach(function(b){
      b.addEventListener("click",function(){ S.voilure=+b.dataset.v; render();
        [].slice.call(document.querySelectorAll("#seg-voil button")).forEach(function(x){x.classList.remove("on");});
        b.classList.add("on"); });
    });
    var wa=$("w-allure"); if(wa)wa.addEventListener("input",function(){ seaSpeed=0.012+(this.value/100)*0.14; $("allure").value=this.value; $("lr-allure").textContent=this.value+" %"; });
  }
  if(k==="cap"){
    $("w-alloc").addEventListener("input",function(){ setAlloc((+this.value)/100); $("lr-alloc").textContent=Math.round(S.fortShare*100)+" / "+(100-Math.round(S.fortShare*100)); });
    $("w-realloc").addEventListener("input",function(){ S.realloc=(+this.value)/100; $("lr-realloc").textContent=this.value+" %"; });
  }
  if(k==="objectif"){
    $("w-goal").addEventListener("input",function(){ S.goal=+this.value; $("lr-goal").textContent=eur(S.goal); render(); });
    $("w-monthly").addEventListener("input",function(){ S.monthly=+this.value; $("lr-monthly").textContent=eur(S.monthly); $("lr-proj").textContent=eur(projection()); });
    $("b-next").addEventListener("click",function(){ nextMonth(); });
  }
}

/* rafraîchit les valeurs live dans la bulle ouverte (après nextMonth/helm) */
function liveRefresh(k){
  var set=function(id,v){var e=$(id);if(e)e.textContent=v;};
  if(k==="marche")set("lr-marche",(S.market>=0?"+":"")+S.market.toFixed(2));
  if(k==="cap"){set("lr-alloc",Math.round(S.fortShare*100)+" / "+(100-Math.round(S.fortShare*100)));}
  if(k==="objectif"){set("lr-cap",eur(S.capital));set("lr-proj",eur(projection()));}
  if(k==="marge"){set("lr-fort",eur(S.fort));set("lr-actif",eur(S.actif));}
}

/* ====== Go ====== */
setAlloc(0.90);
render();
loop();
</script>
</body>
</html>
                    `;

export default function CockpitImmersif({ fill = false }: { fill?: boolean }): JSX.Element {
  const [full, setFull] = useState<boolean>(fill);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setFull(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const wrap: React.CSSProperties = full
    ? { position: 'fixed', inset: 0, zIndex: 9998, background: '#02040a' }
    : {
        position: 'relative',
        width: '100%',
        height: 'min(86vh, 920px)',
        minHeight: 540,
        borderRadius: 22,
        overflow: 'hidden',
        border: '1px solid rgba(184,115,51,0.45)',
        boxShadow: '0 30px 90px -25px rgba(125,211,252,0.30), 0 8px 40px -12px rgba(0,0,0,0.7)',
        background: '#02040a',
      };

  return (
    <div style={wrap}>
      <iframe
        title="NAVLYS — Cockpit immersif"
        srcDoc={COCKPIT_HTML}
        allow="gyroscope; accelerometer; magnetometer"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
      <button
        onClick={() => setFull((v) => !v)}
        aria-label={full ? 'Quitter le plein écran' : 'Plein écran'}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
          fontSize: 12, letterSpacing: 0.5, color: '#7DD3FC',
          background: 'rgba(6,16,30,0.7)', border: '1px solid rgba(125,211,252,0.4)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {full ? '× Fermer' : '⤢ Plein écran'}
      </button>
    </div>
  );
}
