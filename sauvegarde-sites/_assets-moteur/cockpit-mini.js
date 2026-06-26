/* NAVLYS mini-cockpit — rends UNE scène fixe dans un canvas donné (pour teaser intégré). */
(function(global){
  function start(canvas, scene){
    var x=canvas.getContext('2d');
    var DPR=window.devicePixelRatio||1;
    var ST=[];for(var i=0;i<160;i++)ST.push({x:Math.random()*2-1,y:Math.random()*2-1,z:Math.random()});
    var SPEED=[];for(var i=0;i<70;i++)SPEED.push({x:Math.random(),y:Math.random(),z:Math.random(),life:Math.random()});
    var WAVES=[];for(var i=0;i<28;i++)WAVES.push({x:Math.random(),y:0.5+Math.random()*0.5,sp:0.3+Math.random()*0.5,w:30+Math.random()*70});
    var RAIN=[];for(var i=0;i<40;i++)RAIN.push({x:Math.random(),y:Math.random(),s:0.5+Math.random()*0.8});
    var W=0,H=0;
    function resize(){var r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=W*DPR;canvas.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);}
    resize();window.addEventListener('resize',resize);
    function lc(a,b,p){return [a[0]+(b[0]-a[0])*p|0,a[1]+(b[1]-a[1])*p|0,a[2]+(b[2]-a[2])*p|0];}
    function rgb(c){return 'rgb('+c[0]+','+c[1]+','+c[2]+')';}

    function drawSpaceship(t){
      x.fillStyle='#02040a';x.fillRect(0,0,W,H);
      var nx=W*0.3+Math.sin(t*0.02)*15,ny=H*0.6+Math.cos(t*0.015)*10;
      var ng=x.createRadialGradient(nx,ny,3,nx,ny,80);ng.addColorStop(0,'rgba(168,140,200,0.22)');ng.addColorStop(0.5,'rgba(80,40,120,0.1)');ng.addColorStop(1,'rgba(40,20,80,0)');
      x.fillStyle=ng;x.fillRect(nx-80,ny-80,160,160);
      var px=W*0.78,py=H*0.28,pr=Math.min(40,W*0.1);
      var hue=(t*8)%360;
      var pg=x.createRadialGradient(px-12,py-12,2,px,py,pr);pg.addColorStop(0,'hsla('+hue+',60%,70%,0.5)');pg.addColorStop(0.65,'hsla('+((hue+30)%360)+',55%,40%,0.15)');pg.addColorStop(1,'rgba(60,140,200,0)');
      x.fillStyle=pg;x.beginPath();x.arc(px,py,pr,0,Math.PI*2);x.fill();
      var cx=W/2,cy=H/2;
      ST.forEach(function(s){s.z-=0.005;if(s.z<=0){s.x=Math.random()*2-1;s.y=Math.random()*2-1;s.z=1;}
        var sx=(s.x/s.z)*cx+cx,sy=(s.y/s.z)*cy+cy;
        if(sx<0||sx>W||sy<0||sy>H){s.x=Math.random()*2-1;s.y=Math.random()*2-1;s.z=1;return;}
        var sz=(1-s.z)*2.5,al=Math.min(1,(1-s.z)*1.3);
        x.fillStyle='rgba(168,227,255,'+al+')';x.fillRect(sx,sy,sz,sz);
        if(s.z<0.3){var pxv=(s.x/(s.z+0.05))*cx+cx,pyv=(s.y/(s.z+0.05))*cy+cy;x.strokeStyle='rgba(168,227,255,'+(al*0.55)+')';x.lineWidth=1;x.beginPath();x.moveTo(pxv,pyv);x.lineTo(sx,sy);x.stroke();}
      });
    }

    function drawVoiture(t){
      var skg=x.createLinearGradient(0,0,0,H*0.55);skg.addColorStop(0,'#020208');skg.addColorStop(1,'#1a0830');x.fillStyle=skg;x.fillRect(0,0,W,H*0.55);
      for(var i=0;i<30;i++){var sx=(i*53)%W,sy=(i*29)%(H*0.42);x.fillStyle='rgba(200,210,255,'+(.15+.35*Math.sin(t*1.5+i*0.7))+')';x.fillRect(sx,sy,1.3,1.3);}
      var rg=x.createLinearGradient(0,H*0.55,0,H);rg.addColorStop(0,'#04050a');rg.addColorStop(1,'#0a0c18');x.fillStyle=rg;x.fillRect(0,H*0.55,W,H*0.45);
      var vp=W/2,hz=H*0.55;
      for(var i=0;i<15;i++){var p=((t*0.8+i*0.066)%1);var y=hz+(H*0.45)*p*p;var lH=2+p*22,lW=2+p*12;
        x.fillStyle='rgba(255,240,140,'+(.3+p*.7)+')';x.fillRect(vp-lW/2,y,lW,lH);
      }
      for(var side=-1;side<=1;side+=2){for(var i=0;i<25;i++){var p=((t*0.8+i*0.04)%1);var y=hz+(H*0.45)*p*p;var hx=vp+side*(W*0.04+W*0.46*p);var r=1+p*3;
        x.fillStyle='rgba(125,211,252,'+(.4+p*.6)+')';x.fillRect(hx-r/2,y,r,2+p*6);}}
      SPEED.forEach(function(s){s.life+=0.03;if(s.life>1){s.x=0.45+Math.random()*0.1;s.y=0.5+Math.random()*0.15;s.z=Math.random();s.life=0;}
        var dx=(s.x-0.5)*W*2*s.life,dy=(s.y-0.5)*H*1.4*s.life;
        var fx=W/2+dx,fy=H*0.55+dy;
        var al=(1-s.life)*0.6,len=6+s.life*30;
        x.strokeStyle='rgba(168,227,255,'+al+')';x.lineWidth=0.8+s.life*1.5;
        x.beginPath();x.moveTo(fx,fy);x.lineTo(fx+dx*0.12,fy+dy*0.12);x.stroke();
      });
      x.strokeStyle='rgba(168,200,255,0.13)';x.lineWidth=1;
      RAIN.forEach(function(r){r.y=(r.y+r.s*0.014)%1;var rx=r.x*W,ry=r.y*H*0.9;x.beginPath();x.moveTo(rx,ry);x.lineTo(rx-4,ry+10);x.stroke();});
    }

    function drawBateau(t){
      var c=(t%60)/60;
      var top,mid,bot;
      if(c<0.34){var p=c/0.34;top=lc([28,42,84],[12,18,42],p);mid=lc([210,115,55],[80,40,72],p);bot=lc([250,170,90],[60,30,55],p);}
      else if(c<0.5){var p=(c-0.34)/0.16;top=lc([12,18,42],[4,7,16],p);mid=lc([80,40,72],[12,15,35],p);bot=lc([60,30,55],[15,20,40],p);}
      else{top=[4,7,16];mid=[12,15,35];bot=[18,25,48];}
      var sk=x.createLinearGradient(0,0,0,H*0.66);sk.addColorStop(0,rgb(top));sk.addColorStop(0.55,rgb(mid));sk.addColorStop(1,rgb(bot));x.fillStyle=sk;x.fillRect(0,0,W,H*0.66);
      if(c<0.36){var p=Math.min(1,c/0.34),sy=H*0.4+p*H*0.28,sxc=W*0.5,al=1-p*0.6;
        var sg=x.createRadialGradient(sxc,sy,3,sxc,sy,60);sg.addColorStop(0,'rgba(255,225,160,'+al+')');sg.addColorStop(0.45,'rgba(255,180,100,'+al*0.5+')');sg.addColorStop(1,'rgba(255,180,100,0)');x.fillStyle=sg;x.beginPath();x.arc(sxc,sy,60,0,Math.PI*2);x.fill();}
      if(c>0.42){var sa=Math.min(1,(c-0.42)/0.18);
        for(var i=0;i<80;i++){var px=(i*47)%W,py=(i*31)%(H*0.6);var tw=0.4+0.6*Math.sin(t*1.8+i*0.7);x.fillStyle='rgba(210,220,255,'+(sa*tw*0.85)+')';x.fillRect(px,py,1.5,1.5);}}
      if(c>0.55){var mp=Math.min(1,(c-0.55)/0.3),mxm=W*0.78,mym=H*0.62-mp*H*0.36;
        var mg=x.createRadialGradient(mxm-4,mym-4,3,mxm,mym,28);mg.addColorStop(0,'rgba(240,240,255,0.96)');mg.addColorStop(0.7,'rgba(200,215,245,0.7)');mg.addColorStop(1,'rgba(200,215,245,0)');x.fillStyle=mg;x.beginPath();x.arc(mxm,mym,28,0,Math.PI*2);x.fill();}
      var sea=x.createLinearGradient(0,H*0.66,0,H);sea.addColorStop(0,'rgba(12,22,50,0.96)');sea.addColorStop(1,'rgba(2,6,16,1)');x.fillStyle=sea;x.fillRect(0,H*0.66,W,H*0.34);
      WAVES.forEach(function(w){w.x-=w.sp*0.003;if(w.x<-0.15){w.x=1.1;w.y=0.66+Math.random()*0.34;w.w=30+Math.random()*70;}
        var wy=w.y*H,depth=(w.y-0.66)/0.34;
        x.strokeStyle='rgba(125,211,252,'+(0.15+depth*0.25)+')';x.lineWidth=0.8+depth*1.2;
        x.beginPath();x.moveTo(w.x*W,wy);x.lineTo(w.x*W+w.w*(1+depth*1.5),wy+Math.sin(t*1.5+w.x*10)*2);x.stroke();
      });
      x.strokeStyle='rgba(125,211,252,0.2)';x.lineWidth=1;
      for(var y=H*0.66;y<H;y+=8){x.beginPath();for(var px=0;px<=W;px+=12){var wv=Math.sin(t*0.9+px*0.012+y*0.04)*2;if(px===0)x.moveTo(px,y+wv);else x.lineTo(px,y+wv);}x.stroke();}
    }

    var t0=performance.now();
    function loop(){var t=(performance.now()-t0)/1000;
      if(scene==='spaceship')drawSpaceship(t);
      else if(scene==='voiture')drawVoiture(t);
      else if(scene==='bateau')drawBateau(t);
      requestAnimationFrame(loop);
    }loop();
  }
  global.NV_MINI=start;
})(window);
