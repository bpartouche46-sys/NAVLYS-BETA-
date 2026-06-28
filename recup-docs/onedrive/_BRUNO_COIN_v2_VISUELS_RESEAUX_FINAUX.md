# 🥉 BRUNO COIN v2 — VISUELS RÉSEAUX FINAUX (bannières + signatures + print)
**Verrouillé 28 mai 2026 · complément au kit `_KIT_RESEAUX_V2/`**
*5 nouveaux formats bannière/header/cover + SVG print vectoriel + mode d'emploi capture pour chaque support.*

> **Charte rappel.** Bronze patiné `#B87333` + reflets or `#C9A961`. Étoile rose des vents 8 branches. Monogramme BMP. Halo ice-blue `#7DD3FC`. Fond espace nuit `#02040a`. Polices : Cinzel (titres), Cormorant Garamond (corps), JetBrains Mono (chiffres).

---

## Sommaire

| # | Support | Dimensions | Fichier HTML | Capture |
|---|---|---|---|---|
| 1 | Bannière LinkedIn profil | 1584 × 396 | `_KIT_RESEAUX_V2/coin_v2_linkedin_banner_1584x396.html` | mode A |
| 2 | Header X/Twitter | 1500 × 500 | `_KIT_RESEAUX_V2/coin_v2_x_header_1500x500.html` | mode A |
| 3 | Couverture Facebook | 851 × 315 | `_KIT_RESEAUX_V2/coin_v2_fb_cover_851x315.html` | mode A |
| 4 | Bannière YouTube | 2560 × 1440 | `_KIT_RESEAUX_V2/coin_v2_yt_channel_2560x1440.html` | mode A |
| 5 | Logo signature email | 600 × 200 | `_KIT_RESEAUX_V2/coin_v2_email_sig_600x200.html` | mode B |
| 6 | SVG print (cartes visite, papier en-tête) | vectoriel | `_KIT_RESEAUX_V2/coin_v2_print_vector.svg` | usage Adobe / Affinity |

---

## Mode d'emploi capture A (bannières 1584/1500/851/2560)

1. **Ouvre le fichier HTML dans Chrome**
   `file:///.../_KIT_RESEAUX_V2/coin_v2_xxx.html`
2. **F12 → DevTools → Toolbar Device (icône téléphone en haut à gauche)**
3. **Mode "Responsive"** — règle aux **dimensions exactes** indiquées dans le tableau (largeur × hauteur).
4. **Zoom DevTools 100 %**
5. **Clic droit dans la page → « Capture d'écran »** (Chrome propose "Capturer la zone visible" — c'est ça)
6. **Enregistre le PNG** dans `Downloads/_KIT_RESEAUX_V2/exports/` (à créer)
7. **Upload sur le réseau social cible** :
   - LinkedIn : Paramètres profil → image de couverture → 1584×396
   - X : Profil → Modifier → bannière → 1500×500
   - Facebook : Photo de couverture → 851×315
   - YouTube : Personnaliser la chaîne → Branding → Bannière → 2560×1440

## Mode d'emploi capture B (signature email 600×200)

1. **Ouvre `coin_v2_email_sig_600x200.html` dans Chrome**
2. **Fais une capture de la zone du coin** (clic droit → Capture d'écran)
3. **Sauvegarde en PNG transparent** (utilise `remove.bg` si fond noir)
4. **Importe dans Gmail / Outlook / Apple Mail** :
   - Gmail → Paramètres → Signature → insère image
   - Outlook → Fichier → Options → Mail → Signatures → insère image
   - Apple Mail → Préférences → Signatures → glisse le PNG

---

# 1. Bannière LinkedIn 1584 × 396

**HTML complet** (à coller dans `_KIT_RESEAUX_V2/coin_v2_linkedin_banner_1584x396.html`) :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>BRUNO COIN v2 — LinkedIn banner 1584x396</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1584px;height:396px;background:#02040a;overflow:hidden;font-family:'Cinzel',serif;color:#F2F4F7}
.bg{position:absolute;inset:0;background:radial-gradient(ellipse at 75% 50%,#1a2034 0%,#02040a 60%);}
.stars{position:absolute;inset:0;background-image:radial-gradient(1px 1px at 20% 30%,#7DD3FC 0,transparent 1px),radial-gradient(1px 1px at 60% 70%,#C9A961 0,transparent 1px),radial-gradient(1px 1px at 80% 20%,#fff 0,transparent 1px),radial-gradient(1px 1px at 40% 80%,#B87333 0,transparent 1px);background-size:240px 240px,180px 180px,300px 300px,160px 160px;animation:twinkle 4s ease-in-out infinite alternate;}
@keyframes twinkle{from{opacity:.4}to{opacity:.9}}
.content{position:relative;display:flex;align-items:center;height:100%;padding:0 80px;gap:60px}
.coin{width:280px;height:280px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A961 0%,#B87333 50%,#5d3a1c 100%);box-shadow:0 0 60px rgba(125,211,252,.35),inset -8px -12px 24px rgba(0,0,0,.5),inset 6px 8px 18px rgba(255,220,160,.35);display:flex;align-items:center;justify-content:center;animation:breathe 5s ease-in-out infinite;}
@keyframes breathe{0%,100%{transform:scale(1);box-shadow:0 0 60px rgba(125,211,252,.35),inset -8px -12px 24px rgba(0,0,0,.5),inset 6px 8px 18px rgba(255,220,160,.35)}50%{transform:scale(1.02);box-shadow:0 0 80px rgba(125,211,252,.55),inset -10px -14px 26px rgba(0,0,0,.5),inset 7px 9px 20px rgba(255,220,160,.4)}}
.coin .star{width:170px;height:170px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 56,42 95,50 56,58 50,95 44,58 5,50 44,42' fill='%23C9A961' opacity='.85'/><polygon points='50,15 53,45 85,50 53,55 50,85 47,55 15,50 47,45' fill='%23F2F4F7' opacity='.55'/></svg>") center/contain no-repeat;display:flex;align-items:center;justify-content:center;}
.coin .star .bmp{font-family:'Cinzel',serif;font-weight:600;font-size:36px;color:#02040a;text-shadow:0 1px 0 #C9A961}
.text{flex:1;display:flex;flex-direction:column;gap:8px}
.text h1{font-family:'Cinzel',serif;font-weight:600;font-size:56px;color:#F2F4F7;letter-spacing:.04em;line-height:1}
.text h2{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:36px;color:#C9A961;letter-spacing:.02em;line-height:1.2;margin-top:6px}
.text .tag{font-family:'JetBrains Mono',monospace;font-size:18px;color:#7DD3FC;letter-spacing:.18em;text-transform:uppercase;margin-top:14px}
.text .url{font-family:'JetBrains Mono',monospace;font-size:20px;color:#F2F4F7;opacity:.75;margin-top:18px}
</style>
</head>
<body>
<div class="bg"></div>
<div class="stars"></div>
<div class="content">
  <div class="coin"><div class="star"><div class="bmp">BMP</div></div></div>
  <div class="text">
    <h1>BRUNO MARK PARTOUCHE</h1>
    <h2>Ma méthode. Votre argent. Votre tempo.</h2>
    <div class="tag">⚓ NAVLYS · LABORATOIRE NEXT GEN</div>
    <div class="url">navlys.com · brunopartouche.com</div>
  </div>
</div>
</body>
</html>
```

---

# 2. Header X/Twitter 1500 × 500

**HTML complet** (`coin_v2_x_header_1500x500.html`) :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>BRUNO COIN v2 — X header 1500x500</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1500px;height:500px;background:#02040a;overflow:hidden;font-family:'Cinzel',serif;color:#F2F4F7}
.bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#1a2034 0%,#02040a 70%);}
.wave{position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(125,211,252,.06) 70%,transparent 80%);animation:wave 8s linear infinite;}
@keyframes wave{from{background-position:0 0}to{background-position:1500px 0}}
.stars{position:absolute;inset:0;background-image:radial-gradient(1.5px 1.5px at 15% 25%,#7DD3FC 0,transparent 2px),radial-gradient(1px 1px at 65% 55%,#C9A961 0,transparent 1px),radial-gradient(2px 2px at 85% 35%,#fff 0,transparent 2px),radial-gradient(1px 1px at 35% 75%,#B87333 0,transparent 1px),radial-gradient(1.5px 1.5px at 50% 15%,#7DD3FC 0,transparent 2px);background-size:280px 280px,220px 220px,340px 340px,180px 180px,260px 260px;}
.content{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:0 60px;gap:24px;text-align:center}
.coin{width:200px;height:200px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A961 0%,#B87333 50%,#5d3a1c 100%);box-shadow:0 0 50px rgba(125,211,252,.4),inset -6px -10px 20px rgba(0,0,0,.5),inset 5px 7px 15px rgba(255,220,160,.35);display:flex;align-items:center;justify-content:center;animation:breathe 5s ease-in-out infinite;}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
.coin .star{width:120px;height:120px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 56,42 95,50 56,58 50,95 44,58 5,50 44,42' fill='%23C9A961' opacity='.85'/></svg>") center/contain no-repeat;display:flex;align-items:center;justify-content:center;}
.coin .star .bmp{font-family:'Cinzel',serif;font-weight:600;font-size:28px;color:#02040a}
.title{font-family:'Cinzel',serif;font-weight:600;font-size:54px;letter-spacing:.05em;color:#F2F4F7;line-height:1}
.sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:34px;color:#C9A961;letter-spacing:.01em}
.tag{font-family:'JetBrains Mono',monospace;font-size:16px;color:#7DD3FC;letter-spacing:.22em;text-transform:uppercase;margin-top:6px}
</style>
</head>
<body>
<div class="bg"></div>
<div class="wave"></div>
<div class="stars"></div>
<div class="content">
  <div class="coin"><div class="star"><div class="bmp">BMP</div></div></div>
  <div class="title">BRUNO MARK PARTOUCHE</div>
  <div class="sub">Ma méthode. Votre argent. Votre tempo.</div>
  <div class="tag">⚓ NAVLYS · NEXT GEN RESEARCH LAB</div>
</div>
</body>
</html>
```

---

# 3. Couverture Facebook 851 × 315

**HTML complet** (`coin_v2_fb_cover_851x315.html`) :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>BRUNO COIN v2 — FB cover 851x315</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:851px;height:315px;background:#02040a;overflow:hidden;font-family:'Cinzel',serif;color:#F2F4F7}
.bg{position:absolute;inset:0;background:radial-gradient(ellipse at 70% 50%,#1a2034 0%,#02040a 65%);}
.stars{position:absolute;inset:0;background-image:radial-gradient(1px 1px at 20% 30%,#7DD3FC 0,transparent 1px),radial-gradient(1px 1px at 65% 70%,#C9A961 0,transparent 1px),radial-gradient(1.5px 1.5px at 85% 20%,#fff 0,transparent 2px);background-size:160px 160px,120px 120px,200px 200px;}
.content{position:relative;display:flex;align-items:center;height:100%;padding:0 40px;gap:36px}
.coin{width:180px;height:180px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A961 0%,#B87333 50%,#5d3a1c 100%);box-shadow:0 0 40px rgba(125,211,252,.35),inset -5px -8px 16px rgba(0,0,0,.5),inset 4px 6px 12px rgba(255,220,160,.35);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.coin .star{width:110px;height:110px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 56,42 95,50 56,58 50,95 44,58 5,50 44,42' fill='%23C9A961' opacity='.85'/></svg>") center/contain no-repeat;display:flex;align-items:center;justify-content:center;}
.coin .star .bmp{font-family:'Cinzel',serif;font-weight:600;font-size:26px;color:#02040a}
.text h1{font-family:'Cinzel',serif;font-weight:600;font-size:38px;letter-spacing:.04em;line-height:1;color:#F2F4F7}
.text h2{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:24px;color:#C9A961;margin-top:10px;line-height:1.2}
.text .tag{font-family:'JetBrains Mono',monospace;font-size:14px;color:#7DD3FC;letter-spacing:.18em;text-transform:uppercase;margin-top:14px}
</style>
</head>
<body>
<div class="bg"></div>
<div class="stars"></div>
<div class="content">
  <div class="coin"><div class="star"><div class="bmp">BMP</div></div></div>
  <div class="text">
    <h1>BRUNO MARK PARTOUCHE</h1>
    <h2>Ma méthode. Votre argent. Votre tempo.</h2>
    <div class="tag">⚓ NAVLYS · brunopartouche.com</div>
  </div>
</div>
</body>
</html>
```

---

# 4. Bannière YouTube 2560 × 1440 (zone sûre 1546 × 423 centrée)

**HTML complet** (`coin_v2_yt_channel_2560x1440.html`) :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>BRUNO COIN v2 — YouTube channel 2560x1440</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:2560px;height:1440px;background:#02040a;overflow:hidden;font-family:'Cinzel',serif;color:#F2F4F7}
.bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#1a2034 0%,#02040a 70%);}
.stars{position:absolute;inset:0;background-image:radial-gradient(2px 2px at 12% 18%,#7DD3FC 0,transparent 2px),radial-gradient(1.5px 1.5px at 28% 62%,#C9A961 0,transparent 2px),radial-gradient(2px 2px at 72% 22%,#fff 0,transparent 2px),radial-gradient(1.5px 1.5px at 85% 70%,#B87333 0,transparent 2px),radial-gradient(1.5px 1.5px at 55% 88%,#7DD3FC 0,transparent 2px),radial-gradient(2px 2px at 92% 45%,#fff 0,transparent 2px);background-size:380px 380px,300px 300px,420px 420px,260px 260px,340px 340px,400px 400px;}
.safe{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1546px;height:423px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;text-align:center}
.coin{width:260px;height:260px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A961 0%,#B87333 50%,#5d3a1c 100%);box-shadow:0 0 80px rgba(125,211,252,.45),inset -8px -12px 24px rgba(0,0,0,.5),inset 6px 8px 18px rgba(255,220,160,.35);display:flex;align-items:center;justify-content:center;animation:breathe 5s ease-in-out infinite;}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
.coin .star{width:160px;height:160px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 56,42 95,50 56,58 50,95 44,58 5,50 44,42' fill='%23C9A961' opacity='.85'/></svg>") center/contain no-repeat;display:flex;align-items:center;justify-content:center;}
.coin .star .bmp{font-family:'Cinzel',serif;font-weight:600;font-size:38px;color:#02040a}
.title{font-family:'Cinzel',serif;font-weight:600;font-size:72px;letter-spacing:.05em;color:#F2F4F7;line-height:1}
.sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:42px;color:#C9A961;letter-spacing:.01em}
.tag{font-family:'JetBrains Mono',monospace;font-size:22px;color:#7DD3FC;letter-spacing:.22em;text-transform:uppercase}
.url{font-family:'JetBrains Mono',monospace;font-size:24px;color:#F2F4F7;opacity:.75;margin-top:8px}
</style>
</head>
<body>
<div class="bg"></div>
<div class="stars"></div>
<div class="safe">
  <div class="coin"><div class="star"><div class="bmp">BMP</div></div></div>
  <div class="title">BRUNO MARK PARTOUCHE</div>
  <div class="sub">Ma méthode. Votre argent. Votre tempo.</div>
  <div class="tag">⚓ NAVLYS · NEXT GEN RESEARCH LAB</div>
  <div class="url">navlys.com · brunopartouche.com</div>
</div>
</body>
</html>
```

> 📐 **Zone sûre YouTube** : seule la zone centrale 1546 × 423 est visible sur **TV + mobile + tablette + desktop simultanément**. Tout texte hors zone safe sera rogné sur certains appareils.

---

# 5. Logo signature email 600 × 200

**HTML complet** (`coin_v2_email_sig_600x200.html`) :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>BRUNO COIN v2 — Email signature 600x200</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:600px;height:200px;background:transparent;font-family:'Cinzel',serif;color:#02040a}
.sig{display:flex;align-items:center;gap:24px;padding:20px;height:100%;background:linear-gradient(90deg,rgba(2,4,10,.04) 0%,transparent 50%);}
.coin{width:140px;height:140px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A961 0%,#B87333 50%,#5d3a1c 100%);box-shadow:0 0 20px rgba(125,211,252,.25),inset -4px -6px 12px rgba(0,0,0,.45),inset 3px 5px 10px rgba(255,220,160,.35);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.coin .star{width:90px;height:90px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,5 56,42 95,50 56,58 50,95 44,58 5,50 44,42' fill='%23C9A961' opacity='.9'/></svg>") center/contain no-repeat;display:flex;align-items:center;justify-content:center;}
.coin .star .bmp{font-family:'Cinzel',serif;font-weight:600;font-size:22px;color:#02040a}
.txt{display:flex;flex-direction:column;gap:4px}
.name{font-family:'Cinzel',serif;font-weight:600;font-size:22px;color:#02040a;letter-spacing:.03em}
.role{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:#B87333}
.url{font-family:'JetBrains Mono',monospace;font-size:13px;color:#02040a;opacity:.75;margin-top:6px}
.tag{font-family:'JetBrains Mono',monospace;font-size:11px;color:#7DD3FC;letter-spacing:.18em;text-transform:uppercase;background:#02040a;padding:4px 8px;border-radius:4px;align-self:flex-start;margin-top:6px}
</style>
</head>
<body>
<div class="sig">
  <div class="coin"><div class="star"><div class="bmp">BMP</div></div></div>
  <div class="txt">
    <div class="name">Bruno Mark Partouche</div>
    <div class="role">Fondateur — NAVLYS · 🧭 Le Cartographe</div>
    <div class="url">bruno@navlys.com · navlys.com</div>
    <div class="tag">⚓ NEXT GEN RESEARCH LAB</div>
  </div>
</div>
</body>
</html>
```

> 💡 **Astuce signature Gmail/Outlook** : capture le rendu en PNG **600×200** sur fond transparent. Importe dans la signature comme image **hébergée** (Imgur ou Cloudinary) pour éviter les pièces jointes lourdes à chaque envoi.

---

# 6. SVG print vectoriel (cartes visite, papier en-tête, goodies)

**SVG complet** (à enregistrer dans `_KIT_RESEAUX_V2/coin_v2_print_vector.svg`) :

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bronzeGrad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#C9A961"/>
      <stop offset="50%" stop-color="#B87333"/>
      <stop offset="100%" stop-color="#5d3a1c"/>
    </radialGradient>
    <radialGradient id="highlightGrad" cx="40%" cy="35%" r="50%">
      <stop offset="0%" stop-color="#fff6d8" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#fff6d8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="shadowGrad" cx="65%" cy="70%" r="55%">
      <stop offset="0%" stop-color="#000" stop-opacity=".45"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="haloIce" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
    </filter>
  </defs>

  <!-- Halo ice-blue -->
  <circle cx="200" cy="200" r="195" fill="#7DD3FC" opacity=".15" filter="url(#haloIce)"/>

  <!-- Disque bronze -->
  <circle cx="200" cy="200" r="180" fill="url(#bronzeGrad)"/>
  <!-- Couronne extérieure (épaisseur or) -->
  <circle cx="200" cy="200" r="180" fill="none" stroke="#C9A961" stroke-width="3"/>
  <circle cx="200" cy="200" r="172" fill="none" stroke="#5d3a1c" stroke-width="1.5"/>

  <!-- Highlight + shadow volume -->
  <circle cx="200" cy="200" r="180" fill="url(#highlightGrad)"/>
  <circle cx="200" cy="200" r="180" fill="url(#shadowGrad)"/>

  <!-- Gravure circulaire texte (courbe) -->
  <defs>
    <path id="textTop" d="M 60 200 A 140 140 0 0 1 340 200" fill="none"/>
    <path id="textBottom" d="M 60 200 A 140 140 0 0 0 340 200" fill="none"/>
  </defs>
  <text font-family="Cinzel, serif" font-weight="600" font-size="20" fill="#5d3a1c" letter-spacing="3">
    <textPath href="#textTop" startOffset="50%" text-anchor="middle">BRUNO MARK PARTOUCHE</textPath>
  </text>
  <text font-family="Cinzel, serif" font-weight="600" font-size="16" fill="#5d3a1c" letter-spacing="6">
    <textPath href="#textBottom" startOffset="50%" text-anchor="middle">⚓ NAVLYS · MED 2026 ⚓</textPath>
  </text>

  <!-- Étoile rose des vents 8 branches -->
  <g transform="translate(200 200)">
    <polygon points="0,-100 12,-12 100,0 12,12 0,100 -12,12 -100,0 -12,-12" fill="#C9A961" opacity=".88"/>
    <polygon points="0,-70 8,-8 70,0 8,8 0,70 -8,8 -70,0 -8,-8" fill="#F2F4F7" opacity=".5"/>
    <!-- Monogramme BMP -->
    <text x="0" y="12" text-anchor="middle" font-family="Cinzel, serif" font-weight="600" font-size="36" fill="#02040a" letter-spacing="2">BMP</text>
  </g>
</svg>
```

### Usages print

| Support | Recommandation |
|---|---|
| **Carte visite (85 × 55 mm)** | SVG placé centré, taille 35 × 35 mm au verso (recto blanc avec texte). Impression offset 4 couleurs + vernis sélectif sur l'or `#C9A961` pour reflets métallisés. |
| **Papier en-tête A4** | SVG en filigrane 12 × 12 cm centré haut-gauche, opacité 18 %. Texte courant en Cinzel 11 pt + Cormorant 10 pt. |
| **Pochette presse** | SVG plein format 18 × 18 cm sur couverture noire `#02040a`, finition mat soyeux. |
| **Tampon physique (sceau cire ou caoutchouc)** | Réduire SVG à 28 mm diamètre, monogramme BMP central uniquement. |
| **Goodies mug / casquette / T-shirt** | Pantone bronze équivalent **Pantone 4635 C** + reflets or **Pantone 871 C**. Halo ice-blue **Pantone 297 C**. |

---

## Captures d'écran — checklist par support

### LinkedIn (bannière + signature)
1. Capture HTML 1584×396 → `linkedin_banner.png`.
2. Va sur `linkedin.com/in/me` → Modifier profil → camera couverture.
3. Upload PNG. Recadre rien (le format est exact).
4. Signature email : Paramètres LinkedIn → Email préférences → Signature → insère 600×200 PNG.

### X / Twitter (header)
1. Capture HTML 1500×500 → `x_header.png`.
2. Va sur X → Modifier profil → Header (icône camera dans la bande).
3. Upload PNG. Confirme.

### Facebook (cover Page + Perso)
1. Capture HTML 851×315 → `fb_cover.png`.
2. Page Facebook NAVLYS → Modifier photo couverture → Upload.
3. Profil perso Bruno → Photos couverture → Upload même fichier.

### YouTube (bannière chaîne)
1. Capture HTML 2560×1440 → `yt_channel.png`.
2. youtube.com/channel/UCxxx → Personnaliser → Branding → Bannière → Upload.
3. Vérifie le rendu sur 4 devices (TV, desktop, tablette, mobile) avec le preview YouTube intégré.

### Email (signature)
1. Capture HTML 600×200 → `email_sig.png` (fond transparent recommandé).
2. **Gmail** : ⚙️ → Voir tous les paramètres → Général → Signature → Créer nouvelle → insère image.
3. **Outlook** : Fichier → Options → Mail → Signatures → Nouveau → insère image.
4. **Apple Mail** : Préférences → Signatures → glisse PNG dans la zone éditeur.

### Print (offset / sérigraphie)
1. Ouvre `coin_v2_print_vector.svg` dans **Adobe Illustrator / Affinity Designer / Inkscape**.
2. Vectoriser texte (Pathfinder → Outline text) avant export.
3. Export PDF/X-1a 300 dpi avec **Pantone séparés**.
4. Envoyer au prestataire d'impression avec **traits de coupe + fond perdu 3 mm**.

---

## ⚖️ Disclaimer kit visuels

- BRUNO COIN v2 est une **identité visuelle**, pas une certification financière.
- Toute apposition du coin sur un produit financier nominatif est **interdite** sans validation écrite de Bruno (risque de création d'illusion d'agrément CIF/ORIAS).
- Le kit est utilisable par Bruno + équipage NAVLYS + partenaires officiels (Apollo, Crisp, etc.) sous accord.
- Toute reprise tiers requiert un mail à `bruno@navlys.com` avec mention de l'usage.

— Bruno Mark Partouche & 🧭 Le Cartographe, 28 mai 2026
*Versioning kit : `v2.1.0` (ajout 5 formats bannière + SVG print). Backup obligatoire avant toute modification.*
