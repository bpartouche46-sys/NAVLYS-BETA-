/* NAVLYS cockpit engine v4 — Spaceship-quality effects on ALL 4 themes
   v4 (27 mai 2026) : voiture/avion/bateau remontés au niveau spaceship.
   Toutes les scènes ont maintenant des lignes de mouvement type Star Wars (warp).
   Voiture : light streaks Tron · Avion : wind streaks parallax · Bateau : wave streaks. */
(function(){
  // PATCH v3 fix retained: force transparent body so canvas shows through
  try{
    var st=document.createElement('style');
    st.id='nv-cockpit-bg-fix';
    st.textContent='html{background:#02040a !important;}body{background:transparent !important;}body::before{background:transparent !important;}main,.wrap,header,section{background:transparent !important;}';
    document.head.appendChild(st);
  }catch(e){}

  try{
    document.querySelectorAll('canvas').forEach(function(c){ if(!c.hasAttribute('data-cockpit')) c.style.display='none'; });
    document.querySelectorAll('div').forEach(function(el){
      var t=(el.textContent||'').trim();
      if(t.length<200 && /Choisis ton univers|Voyage stellaire|Hyperespace|Constellation|Mer · horizon|Mer\s*·\s*horizon/.test(t)) el.style.display='none';
    });
    document.querySelectorAll('[data-cockpit-picker]').forEach(function(e){e.remove();});
  }catch(e){}
  var cv=document.createElement('canvas'); cv.setAttribute('data-cockpit','1');
  cv.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;display:block';
  document.body.insertBefore(cv,document.body.firstChild);
  var x=cv.getContext('2d'),W=0,H=0,DPR=window.devicePixelRatio||1;
  function resize(){W=window.innerWidth;H=window.innerHeight;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';x.setTransform(DPR,0,0,DPR,0,0);}
  resize();window.addEventListener('resize',resize);
  var KEY='navlys-cockpit',NAMES=['voiture','spaceship','avion','bateau'];
  var cur=localStorage.getItem(KEY); if(NAMES.indexOf(cur)<0) cur='spaceship';
  var prev=cur, trans=0;
  function setCur(n){if(n===cur)return;prev=cur;cur=n;trans=0;localStorage.setItem(KEY,n);}

  // Warp stars — used in ALL themes for depth/motion
  var ST=[];for(var i=0;i<340;i++)ST.push({x:Math.random()*2-1,y:Math.random()*2-1,z:Math.random()});
  // Speed lines particles — for voiture/avion/bateau (Tron/warp style)
  var SPEED=[];for(var i=0;i<180;i++)SPEED.push({x:Math.random(),y:Math.random(),z:Math.random(),life:Math.random()});
  // Wave streaks — for bateau
  var WAVES=[];for(var i=0;i<50;i++)WAVES.push({x:Math.random(),y:0.66+Math.random()*0.34,sp:0.3+Math.random()*0.5,w:50+Math.random()*120});
  // Cloud streaks — for avion
  var CLOUDS=[];for(var i=0;i<24;i++)CLOUDS.push({x:Math.random(),y:Math.random()*0.7,sp:0.2+Math.random()*0.6,z:Math.random(),w:120+Math.random()*220});
  // Rain
  var RAIN=[];for(var i=0;i<80;i++)RAIN.push({x:Math.random(),y:Math.random(),s:0.5+Math.random()*0.8});
  var BIRDS=[];for(var i=0;i<6;i++)BIRDS.push({x:Math.random(),y:0.3+Math.random()*0.3,sp:0.0006+Math.random()*0.0008,ph:Math.random()*6});

  function lc(a,b,p){return [a[0]+(b[0]-a[0])*p|0,a[1]+(b[1]-a[1])*p|0,a[2]+(b[2]-a[2])*p|0];}
  function rgb(c){return 'rgb('+c[0]+','+c[1]+','+c[2]+')';}

  // ═══════════════════════════════════════════════════
  // VOITURE v4 — Tron light streaks + speed lines + neon road
  // ═══════════════════════════════════════════════════
  function drawVoiture(t){
    // Sky gradient nuit néon
    var skg=x.createLinearGradient(0,0,0,H*0.55);
    skg.addColorStop(0,'#020208');skg.addColorStop(0.6,'#0a0820');skg.addColorStop(1,'#1a0830');
    x.fillStyle=skg;x.fillRect(0,0,W,H*0.55);
    // Étoiles dans le ciel
    for(var i=0;i<80;i++){var sx=(i*53)%W,sy=(i*29)%(H*0.42);x.fillStyle='rgba(200,210,255,'+(.15+.35*Math.sin(t*1.5+i*0.7))+')';x.fillRect(sx,sy,1.5,1.5);}
    // Skyline néon (silhouettes immeubles avec halo)
    for(var b=0;b<12;b++){var bx=(b*W/12)+Math.sin(t*0.05+b)*8,bw=W/15,bh=H*0.15+Math.sin(b*2.3)*H*0.08;
      x.fillStyle='rgba(20,15,40,0.85)';x.fillRect(bx,H*0.55-bh,bw,bh);
      // halo rose/violet sur certains
      if(b%3===0){var bg=x.createLinearGradient(bx,H*0.55-bh,bx,H*0.55);bg.addColorStop(0,'rgba(180,80,200,0.18)');bg.addColorStop(1,'rgba(180,80,200,0)');x.fillStyle=bg;x.fillRect(bx-10,H*0.55-bh-30,bw+20,bh+30);}
    }
    // Sol
    var rg=x.createLinearGradient(0,H*0.55,0,H);rg.addColorStop(0,'#04050a');rg.addColorStop(1,'#0a0c18');x.fillStyle=rg;x.fillRect(0,H*0.55,W,H*0.45);
    var vp=W/2,hz=H*0.55;
    // ROUTE NÉON — lignes qui défilent en perspective (Tron style)
    for(var i=0;i<24;i++){
      var p=((t*0.7+i*0.042)%1);
      var y=hz+(H*0.45)*p*p;
      var lH=2+p*30,lW=2+p*16;
      // Ligne centrale jaune brillante
      x.fillStyle='rgba(255,240,140,'+(.3+p*.7)+')';
      x.fillRect(vp-lW/2,y,lW,lH);
      // Glow autour
      if(p>0.4){var gg=x.createRadialGradient(vp,y+lH/2,0,vp,y+lH/2,lW*2);gg.addColorStop(0,'rgba(255,240,140,'+(p*0.3)+')');gg.addColorStop(1,'rgba(255,240,140,0)');x.fillStyle=gg;x.beginPath();x.arc(vp,y+lH/2,lW*2.5,0,Math.PI*2);x.fill();}
    }
    // BORDS DE ROUTE NÉON CYAN — lignes continues + glow
    for(var side=-1;side<=1;side+=2){
      for(var i=0;i<40;i++){var p=((t*0.7+i*0.025)%1);var y=hz+(H*0.45)*p*p;var hx=vp+side*(W*0.04+W*0.46*p);var r=1+p*4;
        x.fillStyle='rgba(125,211,252,'+(.4+p*.6)+')';
        x.fillRect(hx-r/2,y,r,2+p*8);
      }
      // Halo de bordure
      var bg=x.createLinearGradient(0,H*0.55,0,H);bg.addColorStop(0,'rgba(125,211,252,0)');bg.addColorStop(1,'rgba(125,211,252,0.08)');x.fillStyle=bg;x.fillRect(side>0?W-80:0,H*0.55,80,H*0.45);
    }
    // SPEED LINES style Tron — traînées qui filent du centre vers les côtés
    SPEED.forEach(function(s){
      s.life+=0.025;if(s.life>1){s.x=0.45+Math.random()*0.1;s.y=0.5+Math.random()*0.15;s.z=Math.random();s.life=0;}
      var px=s.x*W,py=s.y*H;
      var dx=(s.x-0.5)*W*2*s.life,dy=(s.y-0.5)*H*1.4*s.life;
      var fx=W/2+dx,fy=H*0.55+dy;
      var al=(1-s.life)*0.7,len=8+s.life*40;
      x.strokeStyle='rgba(168,227,255,'+al+')';x.lineWidth=1+s.life*2;
      x.beginPath();x.moveTo(fx,fy);x.lineTo(fx+dx*0.12,fy+dy*0.12);x.stroke();
    });
    // Pluie diagonale (atmospheric)
    x.strokeStyle='rgba(168,200,255,0.13)';x.lineWidth=1;
    RAIN.forEach(function(r){r.y=(r.y+r.s*0.012)%1;var rx=r.x*W,ry=r.y*H*0.9;x.beginPath();x.moveTo(rx,ry);x.lineTo(rx-5,ry+13);x.stroke();});
    // GPS HUD glow + speedo
    var gp=x.createRadialGradient(W/2,H*0.96,0,W/2,H*0.96,H*0.38);gp.addColorStop(0,'rgba(125,211,252,0.3)');gp.addColorStop(1,'rgba(125,211,252,0)');x.fillStyle=gp;x.fillRect(0,H*0.65,W,H*0.35);
    x.strokeStyle='rgba(168,227,255,0.7)';x.lineWidth=2.5;x.beginPath();x.arc(W*0.16,H*0.92,32,Math.PI*0.7,Math.PI*1.3);x.stroke();
    var sp=Math.PI*0.7+((Math.sin(t*0.5)*0.5+0.5))*Math.PI*0.6;
    x.strokeStyle='rgba(255,210,150,1)';x.lineWidth=3;x.beginPath();x.moveTo(W*0.16,H*0.92);x.lineTo(W*0.16+Math.cos(sp)*26,H*0.92+Math.sin(sp)*26);x.stroke();
  }

  // ═══════════════════════════════════════════════════
  // SPACESHIP (KEEP AS REFERENCE — Bruno's favorite)
  // ═══════════════════════════════════════════════════
  function drawSpaceship(t){
    x.fillStyle='#02040a';x.fillRect(0,0,W,H);
    // Nébuleuse drift
    var nx=W*0.3+Math.sin(t*0.02)*30,ny=H*0.6+Math.cos(t*0.015)*20;
    var ng=x.createRadialGradient(nx,ny,5,nx,ny,180);ng.addColorStop(0,'rgba(168,140,200,0.18)');ng.addColorStop(0.5,'rgba(80,40,120,0.08)');ng.addColorStop(1,'rgba(40,20,80,0)');
    x.fillStyle=ng;x.fillRect(nx-180,ny-180,360,360);
    // Planète + rotation couleur
    var px=W*0.72+Math.sin(t*0.04)*22,py=H*0.32+Math.cos(t*0.03)*14,pr=85;
    var hue=(t*8)%360;var c1='hsla('+hue+',60%,70%,0.42)',c2='hsla('+((hue+30)%360)+',55%,40%,0.12)';
    var pg=x.createRadialGradient(px-28,py-28,5,px,py,pr);pg.addColorStop(0,c1);pg.addColorStop(0.65,c2);pg.addColorStop(1,'rgba(60,140,200,0)');x.fillStyle=pg;x.beginPath();x.arc(px,py,pr,0,Math.PI*2);x.fill();
    x.strokeStyle='rgba(168,227,255,0.4)';x.lineWidth=1.8;x.beginPath();x.ellipse(px,py,pr*1.7,pr*0.3,0.35,0,Math.PI*2);x.stroke();
    // Warp stars
    var cx=W/2,cy=H/2;
    ST.forEach(function(s){s.z-=0.0033;if(s.z<=0){s.x=Math.random()*2-1;s.y=Math.random()*2-1;s.z=1;}
      var sx=(s.x/s.z)*cx+cx,sy=(s.y/s.z)*cy+cy;
      if(sx<0||sx>W||sy<0||sy>H){s.x=Math.random()*2-1;s.y=Math.random()*2-1;s.z=1;return;}
      var sz=(1-s.z)*2.6,al=Math.min(1,(1-s.z)*1.3);
      x.fillStyle='rgba(168,227,255,'+al+')';x.fillRect(sx,sy,sz,sz);
      if(s.z<0.3){var pxv=(s.x/(s.z+0.05))*cx+cx,pyv=(s.y/(s.z+0.05))*cy+cy;x.strokeStyle='rgba(168,227,255,'+(al*0.55)+')';x.lineWidth=1;x.beginPath();x.moveTo(pxv,pyv);x.lineTo(sx,sy);x.stroke();}
    });
    // Comète
    var cm=(t*0.25)%12;if(cm<1.8){var cmx=W*0.05+cm*W*0.55,cmy=H*0.18+cm*H*0.06,al=1-cm/1.8;
      var ctail=x.createLinearGradient(cmx,cmy,cmx-100,cmy-30);ctail.addColorStop(0,'rgba(255,240,200,'+al+')');ctail.addColorStop(1,'rgba(255,240,200,0)');x.strokeStyle=ctail;x.lineWidth=2.5;x.beginPath();x.moveTo(cmx-100,cmy-30);x.lineTo(cmx,cmy);x.stroke();
      x.fillStyle='rgba(255,250,220,'+al+')';x.beginPath();x.arc(cmx,cmy,3,0,Math.PI*2);x.fill();}
  }

  // ═══════════════════════════════════════════════════
  // AVION v4 — Wind streaks parallax (Star Wars warp horizontal)
  // ═══════════════════════════════════════════════════
  function drawAvion(t){
    // Sky stratifié dawn (couleurs vives)
    var sk=x.createLinearGradient(0,0,0,H*0.78);
    sk.addColorStop(0,'#0a1530');sk.addColorStop(0.35,'#1a3060');sk.addColorStop(0.65,'#6a85b8');sk.addColorStop(0.85,'#e8a070');sk.addColorStop(1,'#c87048');
    x.fillStyle=sk;x.fillRect(0,0,W,H*0.78);
    // RAYONS SOLAIRES animés (warp-like)
    var sx=W*0.74,sy=H*0.52;
    x.save();x.translate(sx,sy);x.rotate(t*0.025);
    for(var r=0;r<12;r++){x.rotate(Math.PI/6);
      var rg=x.createLinearGradient(0,0,320,0);rg.addColorStop(0,'rgba(255,225,170,0.22)');rg.addColorStop(0.7,'rgba(255,225,170,0.05)');rg.addColorStop(1,'rgba(255,225,170,0)');
      x.fillStyle=rg;x.beginPath();x.moveTo(0,0);x.lineTo(320,14);x.lineTo(320,-14);x.closePath();x.fill();
    }
    x.restore();
    // Soleil + halo
    var sg=x.createRadialGradient(sx,sy,12,sx,sy,240);sg.addColorStop(0,'rgba(255,235,180,0.92)');sg.addColorStop(0.35,'rgba(255,180,110,0.5)');sg.addColorStop(1,'rgba(255,180,110,0)');x.fillStyle=sg;x.fillRect(sx-240,sy-240,480,480);
    // WIND STREAKS — nuages qui filent horizontalement avec depth (effet warp)
    CLOUDS.forEach(function(c){
      c.x-=c.sp*0.0014;if(c.x<-0.15){c.x=1.1;c.y=Math.random()*0.7;c.z=Math.random();c.w=120+Math.random()*220;}
      var depth=0.3+c.z*0.7,al=0.15+c.z*0.4;
      var cy=c.y*H,cw=c.w*depth,ch=cw*0.22;
      // Streak shape (allongée, type warp horizontale)
      var cg=x.createLinearGradient(c.x*W-cw/2,cy,c.x*W+cw/2,cy);cg.addColorStop(0,'rgba(240,225,210,0)');cg.addColorStop(0.5,'rgba(240,225,210,'+al+')');cg.addColorStop(1,'rgba(240,225,210,0)');
      x.fillStyle=cg;x.beginPath();x.ellipse(c.x*W,cy,cw,ch,0,0,Math.PI*2);x.fill();
      // Halo edge
      if(c.z>0.5){x.fillStyle='rgba(255,200,150,'+(c.z*0.1)+')';x.beginPath();x.ellipse(c.x*W+cw*0.3,cy-ch*0.1,cw*0.4,ch*0.5,0,0,Math.PI*2);x.fill();}
    });
    // SPEED STREAKS atmosphère (horizontales rapides)
    SPEED.forEach(function(s){
      s.life+=0.018;if(s.life>1){s.y=Math.random();s.life=0;s.z=Math.random();}
      var depth=0.3+s.z*0.7,al=(1-s.life)*0.4*depth,len=20+depth*80;
      var px=(1-s.life)*W+len,py=s.y*H*0.7;
      x.strokeStyle='rgba(255,225,200,'+al+')';x.lineWidth=0.8+depth*1.2;
      x.beginPath();x.moveTo(px,py);x.lineTo(px-len,py);x.stroke();
    });
    // Oiseaux silhouettes
    x.strokeStyle='rgba(30,20,15,0.5)';x.lineWidth=1.5;
    BIRDS.forEach(function(b){b.x=(b.x+b.sp*18)%1.1;if(b.x>1.05)b.x=-0.05;var bx=b.x*W,by=b.y*H,w=10+Math.sin(b.ph+t*3)*3;
      x.beginPath();x.moveTo(bx-w,by);x.quadraticCurveTo(bx-w/2,by-4,bx,by);x.moveTo(bx,by);x.quadraticCurveTo(bx+w/2,by-4,bx+w,by);x.stroke();
    });
    // Courbure terre
    x.beginPath();x.arc(W/2,H*2.3,H*1.6,Math.PI,Math.PI*2);var eg=x.createLinearGradient(0,H*0.78,0,H);eg.addColorStop(0,'rgba(50,35,30,0.6)');eg.addColorStop(1,'rgba(15,10,15,0.96)');x.fillStyle=eg;x.fill();
    // Reflet vitre shimmer
    var rg=x.createLinearGradient(0,0,W,H*0.3);rg.addColorStop(0,'rgba(255,255,255,'+(0.05+0.04*Math.sin(t*0.3))+')');rg.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=rg;x.fillRect(0,0,W,H*0.3);
  }

  // ═══════════════════════════════════════════════════
  // BATEAU v4 — Wave streaks rolling past + spray + cycle
  // ═══════════════════════════════════════════════════
  function drawBateau(t){
    var c=(t%60)/60;
    var top,mid,bot;
    if(c<0.34){var p=c/0.34;top=lc([28,42,84],[12,18,42],p);mid=lc([210,115,55],[80,40,72],p);bot=lc([250,170,90],[60,30,55],p);}
    else if(c<0.5){var p=(c-0.34)/0.16;top=lc([12,18,42],[4,7,16],p);mid=lc([80,40,72],[12,15,35],p);bot=lc([60,30,55],[15,20,40],p);}
    else{top=[4,7,16];mid=[12,15,35];bot=[18,25,48];}
    var sk=x.createLinearGradient(0,0,0,H*0.66);sk.addColorStop(0,rgb(top));sk.addColorStop(0.55,rgb(mid));sk.addColorStop(1,rgb(bot));x.fillStyle=sk;x.fillRect(0,0,W,H*0.66);
    // Soleil descend
    if(c<0.36){var p=Math.min(1,c/0.34),sy=H*0.4+p*H*0.28,sxc=W*0.5,al=1-p*0.6;
      var sg=x.createRadialGradient(sxc,sy,5,sxc,sy,120);sg.addColorStop(0,'rgba(255,225,160,'+al+')');sg.addColorStop(0.45,'rgba(255,180,100,'+al*0.5+')');sg.addColorStop(1,'rgba(255,180,100,0)');x.fillStyle=sg;x.beginPath();x.arc(sxc,sy,120,0,Math.PI*2);x.fill();
      var sr=x.createLinearGradient(sxc,H*0.66,sxc,H*0.8);sr.addColorStop(0,'rgba(255,200,140,'+(al*0.55)+')');sr.addColorStop(1,'rgba(255,200,140,0)');x.fillStyle=sr;x.fillRect(sxc-60,H*0.66,120,H*0.14);
    }
    // Mouettes
    if(c<0.42){x.strokeStyle='rgba(40,25,15,0.55)';x.lineWidth=1.8;
      BIRDS.slice(0,4).forEach(function(b){var bx=((b.x+t*b.sp*8)%1.1)*W,by=H*0.3+Math.sin(t*0.5+b.ph)*15,w=12+Math.sin(b.ph+t*4)*4;x.beginPath();x.moveTo(bx-w,by);x.quadraticCurveTo(bx-w/2,by-5,bx,by);x.moveTo(bx,by);x.quadraticCurveTo(bx+w/2,by-5,bx+w,by);x.stroke();});
    }
    // Étoiles + étoiles filantes
    if(c>0.42){var sa=Math.min(1,(c-0.42)/0.18);
      for(var i=0;i<160;i++){var px=(i*47)%W,py=(i*31)%(H*0.6);var tw=0.4+0.6*Math.sin(t*1.8+i*0.7);x.fillStyle='rgba(210,220,255,'+(sa*tw*0.95)+')';x.fillRect(px,py,1.8,1.8);}
      var ss=(t*0.35)%9;if(ss<1.4){var fx=W*0.1+ss*W*0.65,fy=H*0.15+ss*H*0.18,al=1-ss/1.4;x.strokeStyle='rgba(168,227,255,'+al+')';x.lineWidth=2.5;x.beginPath();x.moveTo(fx,fy);x.lineTo(fx-60,fy-30);x.stroke();}
    }
    // Lune
    if(c>0.55){var mp=Math.min(1,(c-0.55)/0.3),mxm=W*0.78,mym=H*0.62-mp*H*0.36;
      var hg=x.createRadialGradient(mxm,mym,30,mxm,mym,100);hg.addColorStop(0,'rgba(240,240,255,0.2)');hg.addColorStop(1,'rgba(240,240,255,0)');x.fillStyle=hg;x.beginPath();x.arc(mxm,mym,100,0,Math.PI*2);x.fill();
      var mg=x.createRadialGradient(mxm-8,mym-8,5,mxm,mym,48);mg.addColorStop(0,'rgba(240,240,255,0.96)');mg.addColorStop(0.7,'rgba(200,215,245,0.7)');mg.addColorStop(1,'rgba(200,215,245,0)');x.fillStyle=mg;x.beginPath();x.arc(mxm,mym,48,0,Math.PI*2);x.fill();
      for(var k=0;k<6;k++){var rk=k*9;x.fillStyle='rgba(225,230,255,'+(0.2*mp*(1-k/6))+')';x.fillRect(mxm-24-Math.sin(t+k)*4,H*0.66+rk,48+Math.sin(t+k)*8,3);}
    }
    // MER avec WAVE STREAKS (lignes qui défilent vers le bateau)
    var sea=x.createLinearGradient(0,H*0.66,0,H);sea.addColorStop(0,'rgba(12,22,50,0.96)');sea.addColorStop(1,'rgba(2,6,16,1)');x.fillStyle=sea;x.fillRect(0,H*0.66,W,H*0.34);
    // Lignes de vagues qui filent (warp horizontal sur l'eau)
    WAVES.forEach(function(w){
      w.x-=w.sp*0.0025;if(w.x<-0.15){w.x=1.1;w.y=0.66+Math.random()*0.34;w.w=50+Math.random()*120;}
      var wy=w.y*H,depth=(w.y-0.66)/0.34;
      x.strokeStyle='rgba(125,211,252,'+(0.15+depth*0.25)+')';x.lineWidth=0.8+depth*1.4;
      x.beginPath();x.moveTo(w.x*W,wy);x.lineTo(w.x*W+w.w*(1+depth*1.5),wy+Math.sin(t*1.5+w.x*10)*2);x.stroke();
      // Foam edge si proche
      if(depth>0.6){x.fillStyle='rgba(255,255,255,'+(0.3*depth)+')';x.fillRect(w.x*W+w.w*(1+depth*1.5)-3,wy-1,3,2);}
    });
    // Vagues onduulent
    x.strokeStyle='rgba(125,211,252,0.2)';x.lineWidth=1;
    for(var y=H*0.66;y<H;y+=12){x.beginPath();for(var px=0;px<=W;px+=15){var wv=Math.sin(t*0.9+px*0.012+y*0.04)*3;if(px===0)x.moveTo(px,y+wv);else x.lineTo(px,y+wv);}x.stroke();}
    // Crêtes d'écume
    for(var i=0;i<30;i++){var fx=(i*W/30+t*18)%W,fy=H*0.7+Math.sin(t+i)*H*0.08;x.fillStyle='rgba(255,255,255,'+(0.15+0.18*Math.sin(t*2+i))+')';x.fillRect(fx,fy,10,1.5);}
    // SPRAY particles (gouttelettes qui montent)
    SPEED.forEach(function(s){
      s.life+=0.02;if(s.life>1){s.x=Math.random();s.y=0.85+Math.random()*0.1;s.life=0;}
      var px=s.x*W,py=s.y*H-s.life*30;var al=(1-s.life)*0.5;
      x.fillStyle='rgba(200,230,255,'+al+')';x.fillRect(px,py,1.5,1.5);
    });
  }

  function chrome(s){
    x.fillStyle='rgba(8,11,16,0.88)';
    if(s==='voiture'){x.beginPath();x.moveTo(0,H*0.88);x.quadraticCurveTo(W/2,H*0.74,W,H*0.88);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
      x.strokeStyle='rgba(125,211,252,0.4)';x.lineWidth=3;x.beginPath();x.arc(W/2,H*1.06,H*0.26,Math.PI*1.18,Math.PI*1.82);x.stroke();}
    else if(s==='spaceship'){x.strokeStyle='rgba(125,211,252,0.45)';x.lineWidth=2;
      x.beginPath();x.moveTo(40,42);x.lineTo(95,42);x.moveTo(W-40,42);x.lineTo(W-95,42);x.moveTo(40,H-42);x.lineTo(95,H-42);x.moveTo(W-40,H-42);x.lineTo(W-95,H-42);x.stroke();
      x.strokeStyle='rgba(125,211,252,0.25)';x.beginPath();x.arc(W/2,H/2,72,0,Math.PI*2);x.stroke();}
    else if(s==='avion'){x.beginPath();x.moveTo(0,H*0.9);x.quadraticCurveTo(W/2,H*0.8,W,H*0.9);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
      x.strokeStyle='rgba(125,211,252,0.4)';x.lineWidth=1.5;x.beginPath();x.arc(W*0.5,H*0.94,26,0,Math.PI*2);x.moveTo(W*0.5-26,H*0.94);x.lineTo(W*0.5+26,H*0.94);x.stroke();}
    else if(s==='bateau'){x.beginPath();x.moveTo(0,H*0.91);x.lineTo(W*0.32,H*0.86);x.lineTo(W*0.5,H*0.79);x.lineTo(W*0.68,H*0.86);x.lineTo(W,H*0.91);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fill();
      x.strokeStyle='rgba(184,115,51,0.55)';x.lineWidth=1.8;x.beginPath();x.arc(W*0.5,H*0.94,22,0,Math.PI*2);x.stroke();
      x.fillStyle='rgba(184,115,51,0.7)';x.font='12px sans-serif';x.textAlign='center';x.fillText('N',W*0.5,H*0.94-8);}
  }

  var t0=performance.now();
  function loop(){var t=(performance.now()-t0)/1000;
    if(trans<1){trans=Math.min(1,trans+0.025);
      x.globalAlpha=1-trans;
      if(prev==='voiture')drawVoiture(t);else if(prev==='spaceship')drawSpaceship(t);else if(prev==='avion')drawAvion(t);else if(prev==='bateau')drawBateau(t);
      x.globalAlpha=trans;
      if(cur==='voiture')drawVoiture(t);else if(cur==='spaceship')drawSpaceship(t);else if(cur==='avion')drawAvion(t);else if(cur==='bateau')drawBateau(t);
      x.globalAlpha=1;chrome(cur);
    } else {
      if(cur==='voiture')drawVoiture(t);else if(cur==='spaceship')drawSpaceship(t);else if(cur==='avion')drawAvion(t);else if(cur==='bateau')drawBateau(t);
      chrome(cur);
    }
    requestAnimationFrame(loop);
  }loop();

  // Picker UI
  var pk=document.createElement('div');pk.setAttribute('data-cockpit-picker','1');
  pk.style.cssText='position:fixed;bottom:20px;left:20px;z-index:9999;display:flex;gap:6px;background:rgba(8,11,16,0.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(125,211,252,0.4);border-radius:30px;padding:7px;font-family:system-ui,-apple-system,Arial,sans-serif;box-shadow:0 6px 36px rgba(125,211,252,0.22)';
  var EMO={voiture:'🚗',spaceship:'🚀',avion:'✈️',bateau:'⛵'};var LAB={voiture:'Voiture confort',spaceship:'Spaceship',avion:'Avion',bateau:'Bateau'};
  NAMES.forEach(function(n){var b=document.createElement('button');b.innerHTML=EMO[n];b.title='Cockpit '+LAB[n];
    b.style.cssText='border:0;background:transparent;font-size:20px;cursor:pointer;padding:9px 12px;border-radius:22px;transition:all .25s ease;opacity:'+(n===cur?'1':'.55')+';background:'+(n===cur?'rgba(125,211,252,0.24)':'transparent');
    b.onmouseover=function(){if(n!==cur)b.style.opacity='.9'};b.onmouseout=function(){if(n!==cur)b.style.opacity='.55'};
    b.onclick=function(){setCur(n);Array.from(pk.children).forEach(function(o,i){o.style.opacity=(NAMES[i]===cur?'1':'.55');o.style.background=(NAMES[i]===cur?'rgba(125,211,252,0.24)':'transparent');});};
    pk.appendChild(b);});
  document.body.appendChild(pk);
})();
