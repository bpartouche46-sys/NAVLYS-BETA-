# 02 — Composant React `<VoiceBrunoPlayer />` (TypeScript, Next.js 14)

**Charte NAVLYS · or `#C9A961` sur nuit `#02040a` · breathing 4 s · WCAG AA**

---

## 1. Arborescence cible (monorepo ou copie par app)

```
components/
└── voice/
    ├── VoiceBrunoPlayer.tsx          ← composant principal (export default)
    ├── VoiceBrunoPlayer.module.css   ← styles charte NAVLYS
    ├── WaveformCanvas.tsx            ← onde sonore animée (canvas 2D)
    ├── hooks/
    │   ├── useVoiceHash.ts           ← SHA-256 isomorphe
    │   ├── useVoiceCache.ts          ← check cached/[hash]
    │   └── useVoiceStream.ts         ← WebSocket streaming
    └── types.ts                      ← types partagés
```

---

## 2. `types.ts`

```ts
export type VoiceLang =
  | 'fr' | 'en' | 'es' | 'pt' | 'it' | 'de'
  | 'nl' | 'pl' | 'ro' | 'cs' | 'tr' | 'ru'
  | 'ar' | 'he' | 'fa' | 'hi' | 'bn' | 'ur'
  | 'ja' | 'ko' | 'zh' | 'vi' | 'th' | 'id'
  | 'ms' | 'tl' | 'sw' | 'el';

export type VoiceApp = 'navlys' | 'navbio' | 'navlys_io' | 'brunopartouche';

export interface VoicePlayerProps {
  text: string;
  lang?: VoiceLang;            // défaut 'fr'
  trackingApp: VoiceApp;
  autoPlay?: boolean;          // défaut false (consentement)
  showTranscript?: boolean;    // défaut true (WCAG AA)
  className?: string;
}

export type VoiceState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'playing'; rate: number }
  | { kind: 'paused';  rate: number }
  | { kind: 'error'; message: string };
```

---

## 3. `useVoiceHash.ts`

```ts
export async function sha256(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function useVoiceHash(text: string, lang: string) {
  const [hash, setHash] = React.useState<string | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    sha256(`${lang}|${text}`).then(h => { if (!cancelled) setHash(h); });
    return () => { cancelled = true; };
  }, [text, lang]);
  return hash;
}
```

---

## 4. `VoiceBrunoPlayer.tsx` (extrait clé — code complet 220 lignes)

```tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './VoiceBrunoPlayer.module.css';
import WaveformCanvas from './WaveformCanvas';
import { useVoiceHash } from './hooks/useVoiceHash';
import type { VoicePlayerProps, VoiceState } from './types';

const FLAGS: Record<string, string> = {
  fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', it: '🇮🇹', de: '🇩🇪',
  ar: '🇸🇦', he: '🇮🇱', ja: '🇯🇵', zh: '🇨🇳', /* ... 28 langues */
};

export default function VoiceBrunoPlayer({
  text, lang = 'fr', trackingApp,
  autoPlay = false, showTranscript = true, className,
}: VoicePlayerProps) {
  const hash = useVoiceHash(text, lang);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<VoiceState>({ kind: 'idle' });
  const reducedMotion = useReducedMotion();

  // 1) Cache check + play
  const play = async () => {
    if (!hash) return;
    setState({ kind: 'loading' });
    const t0 = performance.now();

    // Try cache first
    let url = `/api/voice/cached/${hash}`;
    const cacheRes = await fetch(url, { method: 'HEAD' });
    let cacheHit = cacheRes.ok;

    if (!cacheHit) {
      // Fallback streaming synthesis
      url = `/api/voice/synthesize?lang=${lang}&hash=${hash}`;
      const synthRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
      });
      if (!synthRes.ok) {
        setState({ kind: 'error', message: 'voice_unavailable' });
        return;
      }
      url = synthRes.headers.get('x-audio-url') ?? url;
    }

    const audio = new Audio(url);
    audio.preload = 'auto';
    audioRef.current = audio;
    audio.onplay  = () => setState({ kind: 'playing', rate: audio.playbackRate });
    audio.onpause = () => setState({ kind: 'paused',  rate: audio.playbackRate });
    audio.onended = () => setState({ kind: 'idle' });
    audio.onerror = () => setState({ kind: 'error', message: 'audio_error' });
    await audio.play();

    // beacon analytics
    navigator.sendBeacon('/api/voice/analytics', JSON.stringify({
      app: trackingApp, lang, text_hash: hash,
      cache_hit: cacheHit, latency_ms: Math.round(performance.now() - t0),
    }));
  };

  const pause = () => audioRef.current?.pause();
  const resume = () => audioRef.current?.play();
  const setRate = (r: number) => {
    if (audioRef.current) audioRef.current.playbackRate = r;
    setState(s => (s.kind === 'playing' || s.kind === 'paused')
      ? { ...s, rate: r } : s);
  };
  const download = () => {
    const url = audioRef.current?.src;
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `bruno-voice-${hash?.slice(0, 8)}.mp3`;
    a.click();
  };

  useEffect(() => { if (autoPlay && hash) void play(); }, [hash, autoPlay]);

  return (
    <div className={`${styles.player} ${className ?? ''}`} role="region"
         aria-label="Lecteur voix Bruno">

      {state.kind === 'idle' && (
        <button
          type="button"
          className={`${styles.btnPrimary} ${reducedMotion ? '' : styles.breathing}`}
          onClick={play}
          aria-label={`Écouter avec la voix de Bruno en ${lang.toUpperCase()}`}>
          <span className={styles.icon}>🔊</span>
          <span>Écouter avec la voix de Bruno</span>
          <span className={styles.flag} aria-hidden="true">{FLAGS[lang]}</span>
        </button>
      )}

      {state.kind === 'loading' && (
        <div className={styles.loading} aria-live="polite">
          <span className={styles.spinner} /> Préparation de la voix…
        </div>
      )}

      {(state.kind === 'playing' || state.kind === 'paused') && (
        <div className={styles.miniPlayer}>
          <button onClick={state.kind === 'playing' ? pause : resume}
                  aria-label={state.kind === 'playing' ? 'Pause' : 'Reprendre'}>
            {state.kind === 'playing' ? '⏸' : '▶︎'}
          </button>
          <WaveformCanvas active={state.kind === 'playing'} reduced={reducedMotion} />
          <div className={styles.rateGroup} role="group" aria-label="Vitesse de lecture">
            {[0.75, 1, 1.25].map(r => (
              <button key={r}
                      className={state.rate === r ? styles.rateActive : styles.rate}
                      onClick={() => setRate(r)}>{r}×</button>
            ))}
          </div>
          <button onClick={download} aria-label="Télécharger en MP3">⬇︎</button>
        </div>
      )}

      {state.kind === 'error' && (
        <p className={styles.error} role="alert">
          La voix est momentanément indisponible — le texte reste lisible ci-dessous.
        </p>
      )}

      {showTranscript && (
        <p className={styles.transcript}>{text}</p>
      )}

      <p className={styles.disclaimer}>
        Voix IA clonée — modèle officiel <strong>Bruno Mark Partouche</strong>.
      </p>
    </div>
  );
}

function useReducedMotion(): boolean {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const fn = () => setR(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return r;
}
```

---

## 5. `VoiceBrunoPlayer.module.css`

```css
.player {
  display: flex; flex-direction: column; gap: 0.75rem;
  padding: 1rem; background: #02040a;
  border: 1px solid rgba(201, 169, 97, 0.25);
  border-radius: 12px;
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.btnPrimary {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.75rem 1.25rem; cursor: pointer;
  background: linear-gradient(180deg, #C9A961 0%, #B87333 100%);
  color: #02040a;
  font-family: 'Cinzel', serif; font-weight: 600; letter-spacing: 0.04em;
  border: none; border-radius: 999px;
  box-shadow: 0 0 0 0 rgba(125, 211, 252, 0.0);
  transition: transform .2s ease, box-shadow .2s ease;
}
.btnPrimary:hover { transform: translateY(-1px); box-shadow: 0 0 24px rgba(125,211,252,0.35); }

@keyframes breathe {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 97, 0.0); }
  50%      { box-shadow: 0 0 24px 4px rgba(201, 169, 97, 0.35); }
}
.breathing { animation: breathe 4s ease-in-out infinite; }

.miniPlayer { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.miniPlayer button {
  background: transparent; color: #C9A961; border: 1px solid #C9A961;
  padding: 0.4rem 0.7rem; border-radius: 999px; cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
}
.rateGroup { display: inline-flex; gap: 0.25rem; }
.rate, .rateActive {
  background: transparent; color: #F2F4F7;
  border: 1px solid rgba(242,244,247,0.25);
  padding: 0.25rem 0.55rem; border-radius: 4px; cursor: pointer;
  font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;
}
.rateActive { background: #7DD3FC; color: #02040a; border-color: #7DD3FC; }

.transcript { color: #F2F4F7; font-size: 1rem; line-height: 1.55; margin: 0; }
.disclaimer { color: rgba(242,244,247,0.55); font-size: 0.75rem; margin: 0;
              font-family: 'JetBrains Mono', monospace; }
.spinner {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid rgba(201,169,97,0.25); border-top-color: #C9A961;
  animation: spin 0.8s linear infinite; display: inline-block; margin-right: .5rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
.error { color: #FCA5A5; font-size: 0.9rem; }
.flag { font-size: 1.1rem; }
.icon { font-size: 1.1rem; }
```

---

## 6. `WaveformCanvas.tsx` (animation onde sonore)

```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function WaveformCanvas({ active, reduced }:{active:boolean; reduced:boolean}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (reduced) return;
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let raf = 0; const bars = 24;
    const draw = (t: number) => {
      const { width: w, height: h } = c;
      ctx.clearRect(0, 0, w, h);
      const bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const phase = active ? Math.sin((t / 200) + i * 0.6) : 0.2;
        const bh = (Math.abs(phase) * 0.7 + 0.1) * h;
        ctx.fillStyle = `rgba(125,211,252,${0.4 + Math.abs(phase) * 0.5})`;
        ctx.fillRect(i * bw + 1, (h - bh) / 2, bw - 2, bh);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  if (reduced) {
    return <div style={{
      width: 120, height: 24,
      background: 'linear-gradient(90deg,#7DD3FC,#C9A961)', borderRadius: 4 }} />;
  }
  return <canvas ref={ref} width={120} height={24} aria-hidden="true" />;
}
```

---

## 7. Utilisation dans une page NAV IA

```tsx
import VoiceBrunoPlayer from '@/components/voice/VoiceBrunoPlayer';

export default function NavIAReply({ reply }: { reply: string }) {
  return (
    <article className="nav-ia-reply">
      <p>{reply}</p>
      <VoiceBrunoPlayer text={reply} lang="fr" trackingApp="navlys" />
    </article>
  );
}
```

---

## 8. Accessibilité (WCAG AA)

- Contraste or sur nuit : **9.7:1** (or `#C9A961` sur `#02040a`) → ✅ AAA.
- Transcription **toujours visible** (`showTranscript = true` par défaut).
- `aria-label` complet sur le bouton (langue annoncée).
- `aria-live="polite"` sur le statut "Préparation".
- `prefers-reduced-motion` désactive le breathing + remplace l'onde animée par une barre statique.
- Navigation clavier : bouton focalisable, espace/entrée déclenche `play`.
