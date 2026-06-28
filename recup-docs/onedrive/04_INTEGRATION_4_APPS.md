# 04 — Intégration `<VoiceBrunoPlayer />` dans les 4 apps NAVLYS

**Principe** : un composant **partagé** sous `/components/voice/` réutilisé dans chacune des 4 apps, branché sur l'API `/api/voice/*` (cf. doc 03). Préférence audio persistée dans Supabase (table `voice_preferences`).

---

## 0. Composant partagé — 3 options selon stack

| Option | Quand l'utiliser |
|--------|------------------|
| **Monorepo** (`packages/voice-player`) | Si NAVLYS migre en monorepo Turborepo |
| **Symlink** | Solution temporaire (`ln -s ../../_VOIX_BRUNO_v1/components/voice ./components/voice`) |
| **NPM privé** (`@navlys/voice-player`) | Idéal long terme — publier sur registre Vercel ou GitHub Packages |

Pour démarrer **vite** : copie simple dans chaque app (`components/voice/`) et synchroniser via script `scripts/sync-voice.sh`.

---

## 1. NAVLYS app (`_APP_NAVLYS_v1/`)

### Cibles d'intégration

| Emplacement | Composant cible | Texte injecté |
|-------------|-----------------|---------------|
| **NAV IA Chat** (`app/(app)/chat/page.tsx`) | sous chaque message assistant | `message.content` |
| **Carte du Jour — Cartographe** (`app/(app)/cartographe/page.tsx`) | en-tête de carte | `card.synthesis` |
| **Onboarding 7 écrans** (`components/onboarding/*`) | chaque écran clé (1, 3, 5, 7) | `screen.voiceScript` (texte court 2 phrases) |

### Code (extrait NAV IA Chat)

```tsx
import VoiceBrunoPlayer from '@/components/voice/VoiceBrunoPlayer';
import { useLocale } from '@/hooks/useLocale';

export function ChatMessage({ role, content }: { role: 'user'|'assistant'; content: string }) {
  const lang = useLocale();
  return (
    <div className={`msg msg--${role}`}>
      <p>{content}</p>
      {role === 'assistant' && (
        <VoiceBrunoPlayer
          text={content}
          lang={lang}
          trackingApp="navlys"
        />
      )}
    </div>
  );
}
```

### Onboarding 7 écrans

```tsx
// components/onboarding/Screen1Welcome.tsx
const SCRIPT_FR = "Bienvenue à bord. Ici, on ne te promet rien — on t'apprend à lire la mer.";
<VoiceBrunoPlayer text={SCRIPT_FR} lang="fr" trackingApp="navlys" autoPlay={prefs.autoPlay} />
```

---

## 2. NAVBIO app (`_APP_NAVBIO_v1/`)

### Cibles d'intégration

| Emplacement | Composant cible | Texte injecté |
|-------------|-----------------|---------------|
| **Synthèse bio générée** (`app/(app)/bio/[slug]/page.tsx`) | sous le titre | `bio.summary_voice` (≤ 600 caractères, narration accrocheuse) |
| **Assistant onboarding 5Q** (`components/onboarding/QuestionStep.tsx`) | sur chaque question | `question.voicePrompt` |
| **Aperçu PDF bio** | bouton "Écouter la bio en entier" | `bio.fullText` (limite 3 000 caractères / chunk) |

### Code (synthèse bio)

```tsx
import VoiceBrunoPlayer from '@/components/voice/VoiceBrunoPlayer';

export default function BioPage({ bio, locale }: { bio: Bio; locale: VoiceLang }) {
  return (
    <article>
      <h1>{bio.title}</h1>
      <VoiceBrunoPlayer
        text={bio.summary_voice}
        lang={locale}
        trackingApp="navbio"
      />
      <BioBody body={bio.body} />
    </article>
  );
}
```

### Découpage long texte (bio complète > 600 caractères)

```ts
// lib/voice/chunk.ts
export function chunkForVoice(text: string, maxChars = 600): string[] {
  const sentences = text.split(/(?<=[\.\!\?])\s+/);
  const chunks: string[] = []; let cur = '';
  for (const s of sentences) {
    if ((cur + ' ' + s).length > maxChars) { if (cur) chunks.push(cur.trim()); cur = s; }
    else cur += (cur ? ' ' : '') + s;
  }
  if (cur) chunks.push(cur.trim());
  return chunks;
}
```

→ enchaînement des `Audio()` séquentiels dans un wrapper `<VoiceBrunoPlayerLong>`.

---

## 3. NAVLYS.IO (site builder IA)

### Cibles d'intégration

| Emplacement | Composant cible | Texte injecté |
|-------------|-----------------|---------------|
| **Bouton "Studio"** (`app/studio/[id]/page.tsx`) | présentation de la création générée | `creation.pitch_voice` (2-3 phrases) |
| **Onboarding "Décris ton projet"** | suggestion vocale Bruno | suggestions issues du prompt système |
| **Aide contextuelle** (📖 sidebar) | chaque tooltip | `tooltip.voiceHelp` |

### Code (Studio)

```tsx
<button className="studio-cta" onClick={openStudio}>🎬 Studio</button>
<VoiceBrunoPlayer
  text={creation.pitch_voice}
  lang={locale}
  trackingApp="navlys_io"
  autoPlay={true}  // exception : auto-play quand on entre dans le studio
  showTranscript={true}
/>
```

---

## 4. brunopartouche.com (perso, Next.js sur Vercel cible)

### Cibles d'intégration

| Emplacement | Composant cible | Texte injecté |
|-------------|-----------------|---------------|
| **Journal — chaque article** (`app/journal/[slug]/page.tsx`) | en haut de l'article | `article.intro_voice` (lead 200-400 caractères) |
| **FAQ** (`app/faq/page.tsx`) | chaque réponse | `faq.answer` |
| **Home — pitch Bruno** | "Écouter le manifesto" | `manifesto.text` (≈ 90 s audio) |
| **Pages partenaires** | présentation broker | `partner.voicePitch` |

### Code (article journal)

```tsx
export default function ArticlePage({ article, locale }: { article: Article; locale: VoiceLang }) {
  return (
    <article>
      <h1>{article.title}</h1>
      <p className="lead">{article.intro_voice}</p>
      <VoiceBrunoPlayer
        text={article.intro_voice}
        lang={locale}
        trackingApp="brunopartouche"
      />
      <Markdown>{article.body}</Markdown>
    </article>
  );
}
```

---

## 5. Persistance préférence utilisateur (Supabase)

### Schéma SQL

```sql
create table voice_preferences (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  auto_play  boolean not null default false,
  rate       numeric(3,2) not null default 1.00 check (rate in (0.75, 1.00, 1.25)),
  lang       text not null default 'fr',
  updated_at timestamptz not null default now()
);
alter table voice_preferences enable row level security;
create policy "self read"  on voice_preferences for select using (auth.uid() = user_id);
create policy "self write" on voice_preferences for all    using (auth.uid() = user_id);
```

### Server Action partagée

```ts
// app/actions/voice-preferences.ts
'use server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

const Prefs = z.object({
  auto_play: z.boolean(),
  rate: z.union([z.literal(0.75), z.literal(1), z.literal(1.25)]),
  lang: z.string().min(2).max(5),
});

export async function savePreferences(input: unknown) {
  const sb = createServerActionClient({ cookies });
  const { data: { user } } = await sb.auth.getUser();
  if (!user) throw new Error('unauthenticated');
  const parsed = Prefs.parse(input);
  await sb.from('voice_preferences').upsert({ user_id: user.id, ...parsed });
}
```

### Hook côté client

```ts
// hooks/useVoicePreferences.ts
'use client';
import { useEffect, useState } from 'react';
export function useVoicePreferences() {
  const [prefs, setPrefs] = useState({ auto_play: false, rate: 1, lang: 'fr' });
  useEffect(() => {
    fetch('/api/voice/preferences').then(r => r.json()).then(setPrefs);
  }, []);
  return prefs;
}
```

---

## 6. Tests E2E (Playwright)

```ts
// tests/voice-player.spec.ts
import { test, expect } from '@playwright/test';

test('NAV IA reply has playable voice button', async ({ page }) => {
  await page.goto('/chat');
  await page.getByRole('textbox').fill('Bonjour Bruno');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  const playBtn = page.getByRole('button', { name: /Écouter avec la voix de Bruno/i });
  await expect(playBtn).toBeVisible();
  await playBtn.click();
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible({ timeout: 5000 });
});
```

---

## 7. Checklist de mise en route par app

- [ ] Copier `components/voice/` (cf. doc 02).
- [ ] Copier `lib/voice/`, `app/api/voice/*` (cf. doc 03).
- [ ] Ajouter `.env` variables ElevenLabs + R2 (cf. doc 01).
- [ ] Migration Supabase : `voice_usage` + `voice_preferences`.
- [ ] Brancher le composant aux emplacements cibles ci-dessus.
- [ ] Test E2E ci-dessus.
- [ ] Beacon `/api/voice/analytics` visible dans le dashboard Supabase.
