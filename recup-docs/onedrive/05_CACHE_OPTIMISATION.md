# 05 — Cache & optimisation des coûts ElevenLabs

**Objectif** : viser **> 70 % de cache hit rate** dès J+7 pour passer de ~300 €/mois (sans cache) à **~30 €/mois pour 1 000 utilisateurs actifs**.

---

## 1. Stratégie multi-niveaux

```
                  ┌────────────────────────────┐
clic 🔊   ───►    │ L1 navigateur (Audio cache)│  ◄─── instant
                  └─────────────┬──────────────┘
                                │ miss
                                ▼
                  ┌────────────────────────────┐
                  │ L2 CDN R2 (7 j edge cache) │  ◄─── < 30 ms
                  └─────────────┬──────────────┘
                                │ miss
                                ▼
                  ┌────────────────────────────┐
                  │ L3 R2 bucket (30 j TTL)    │  ◄─── < 80 ms
                  └─────────────┬──────────────┘
                                │ miss
                                ▼
                  ┌────────────────────────────┐
                  │ L4 ElevenLabs API streaming│  ◄─── 300-600 ms + €
                  └────────────────────────────┘
```

---

## 2. Clé de cache stable

```
key = sha256( voiceId + '|' + lang + '|' + normalize(text) )
```

`normalize(text)` :
1. `trim()`
2. collapse whitespace runs → un espace.
3. NFC unicode normalization.
4. retire les variables (timestamp, prénom utilisateur) — voir §3.

⚠️ **Ne pas inclure** : `style/stability/similarity_boost` dans le hash (settings figés). Sinon tout changement de réglage invalide le cache.

---

## 3. Pré-cache des 100 réponses fréquentes par app

**Source** : top-N réponses NAV IA par fréquence, FAQ, onboarding, tutorials, welcome messages.

### Liste cible (extrait)

| App | # phrases pré-cachées | Exemples |
|-----|------------------------|----------|
| NAVLYS | 40 | « Bienvenue à bord… », « Je ne suis pas conseiller financier… », réponses G1 |
| NAVBIO | 30 | « Première question : raconte-moi… », onboarding 5Q, intros bio types |
| NAVLYS.IO | 15 | « Décris-moi ton projet… », hints studio, tooltips |
| brunopartouche.com | 15 | manifesto FR/EN, leads journal génériques, FAQ |

→ **100 phrases × 28 langues = 2 800 fichiers MP3 pré-générés.**

Coût initial one-shot : ~6 € (≈ 200 000 caractères × 28 langues × tarif 0.30 €/1k caractères).

---

## 4. Script `scripts/precache-voice.ts`

```ts
// scripts/precache-voice.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import { synthesizeBlocking, VOICE_BRUNO } from '../lib/voice/elevenlabs';
import { cacheKey } from '../lib/voice/hash';
import { keyFor, r2Put, r2Exists } from '../lib/voice/r2';

type Entry = { app: string; id: string; text: string };

const LANGS = ['fr','en','es','pt','it','de','ar','he','ja','zh'];

async function main() {
  const entries: Entry[] = JSON.parse(
    await fs.readFile(path.join(__dirname, 'precache-list.json'), 'utf8')
  );

  let synthesized = 0, skipped = 0, errors = 0;
  for (const e of entries) {
    for (const lang of LANGS) {
      const hash = cacheKey(e.text, lang, VOICE_BRUNO);
      const key = keyFor(VOICE_BRUNO, lang, hash);
      if (await r2Exists(key)) { skipped++; continue; }
      try {
        const audio = await synthesizeBlocking(e.text, lang);
        await r2Put(key, audio);
        synthesized++;
        console.log(`✓ ${e.app}/${e.id}/${lang}`);
        await new Promise(r => setTimeout(r, 200)); // throttle 5 req/s
      } catch (err) {
        errors++; console.error(`✗ ${e.app}/${e.id}/${lang}`, err);
      }
    }
  }
  console.log(`Done: synthesized=${synthesized} skipped=${skipped} errors=${errors}`);
}
main();
```

### `scripts/precache-list.json` (extrait)

```json
[
  { "app": "navlys",  "id": "g1-disclaimer-001",
    "text": "Je suis NAV IA, l'assistant officiel NAVLYS. Je ne suis pas un humain et je ne suis pas conseiller financier. Tu gardes ta décision." },
  { "app": "navlys",  "id": "welcome-chat-001",
    "text": "Bienvenue à bord. Ici, on ne te promet rien — on t'apprend à lire la mer." },
  { "app": "navbio",  "id": "onb-q1-001",
    "text": "Première question : raconte-moi en une phrase ce qui te rend unique." }
]
```

### Commande

```bash
npm i tsx -D
ELEVENLABS_API_KEY=$KEY R2_ACCESS_KEY_ID=$AK ... \
  npx tsx scripts/precache-voice.ts
```

---

## 5. Coûts estimés

| Hypothèse | Sans cache | Avec cache (70 % hit) |
|-----------|------------|-----------------------|
| 1 000 utilisateurs actifs / mois | | |
| 8 lectures voice / user / mois | 8 000 synthèses | 2 400 synthèses (30 %) |
| Caractères moyens / synthèse | 250 | 250 |
| Total caractères / mois | 2 000 000 | 600 000 |
| Coût ElevenLabs (Creator 0.30 €/1k) | ~280 € (over-quota) | **~10 €** + 22 € plan = **32 €** |
| Coût R2 stockage (10 GB) | 0.15 € | 0.15 € |
| **TOTAL mensuel** | **≈ 280 €** | **≈ 32 €** |

Hypothèses :
- Plan Creator = 100 000 caractères inclus, surcoût 0.30 €/1k.
- 70 % hit rate atteint via pré-cache + queries répétitives (FAQ, welcome).

---

## 6. Monitoring — dashboard Grafana / PostHog

Vue minimale (refresh 1 min) :

| Tile | Source | Formule |
|------|--------|---------|
| Cache hit rate (7 j) | `voice_usage` | `sum(cache_hit) / count(*)` |
| Coût total mois | `voice_usage` | `sum(cost_credits) × 0.0003 €` |
| Coût / user actif | idem | `(coût total) / nb users distincts` |
| Latence p95 | idem | `percentile_cont(0.95) within group (order by latency_ms)` |
| Top 20 hashes les plus joués | idem | groupé par `text_hash` |
| Coût par app | idem | groupé par `app` |
| % users qui ont activé la voix au moins 1× | idem + `users` | `distinct user_id / total users` |

**Alertes** :
- `cache_hit_rate < 50 %` pendant 24 h → trigger pré-cache complémentaire.
- `cost / user > 0.10 €` → audit consommation.
- `latency_p95 > 800 ms` → vérifier statut ElevenLabs + R2.

---

## 7. Stratégies complémentaires d'économie

1. **Déduplication agressive** : si deux NAV IA génèrent la même phrase à 95 % de similarité (cosine embeddings), proposer la version cached.
2. **Limitation longueur** : couper à 600 caractères pour les chats (player long pour bios).
3. **Quota visiteur anonyme** : 5 lectures/jour sans login → pousse à créer compte.
4. **Bouton "Désactiver auto-play"** dans préférences → moins de synthèses inutiles.
5. **Auto-pause si onglet inactif** → libère le stream WebSocket.
6. **Refus de synthèse si `text.length < 8` ou texte = whitespace pur** (anti-abus).

---

## 8. Lifecycle rule R2 (cleanup auto)

```json
{
  "Rules": [
    {
      "ID": "voice-cache-30d",
      "Status": "Enabled",
      "Filter": { "Prefix": "voice/" },
      "Expiration": { "Days": 30 }
    }
  ]
}
```

→ Évite l'accumulation infinie (déjà payée). Pré-cache régénéré chaque mois via cron.
