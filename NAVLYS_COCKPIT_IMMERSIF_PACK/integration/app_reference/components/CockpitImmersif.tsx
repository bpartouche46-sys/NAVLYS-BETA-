'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * NAVLYS — Cockpit immersif (intégration app)
 * ------------------------------------------------------------------
 * Le cockpit est un prototype 100 % autonome (canvas + 360 + bulles)
 * servi depuis /public/cockpit-immersif.html. On l'embarque dans un
 * iframe plein-cadre : isolation totale du CSS/JS de l'app, fidélité
 * parfaite au prototype validé, build sans risque.
 *
 * Palette cockpit : BRONZE #B87333 · ICE BLUE #7DD3FC · NUIT #02040a.
 * Données de DÉMONSTRATION uniquement (aucun marché réel, aucun conseil).
 */
export default function CockpitImmersif({ src = '/cockpit-immersif.html' }: { src?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);

  // Échap pour quitter le plein écran logiciel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFull(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={
        full
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
              background: '#02040a'
            }
      }
    >
      <iframe
        src={src}
        title="NAVLYS — Cockpit immersif"
        allow="gyroscope; accelerometer; magnetometer"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />

      <button
        onClick={() => setFull((v) => !v)}
        aria-label={full ? 'Quitter le plein écran' : 'Plein écran'}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          padding: '8px 14px',
          borderRadius: 999,
          cursor: 'pointer',
          fontSize: 12,
          letterSpacing: 0.5,
          color: '#7DD3FC',
          background: 'rgba(6,16,30,0.7)',
          border: '1px solid rgba(125,211,252,0.4)',
          backdropFilter: 'blur(6px)'
        }}
      >
        {full ? '× Fermer' : '⤢ Plein écran'}
      </button>
    </div>
  );
}
