# 07 — Plan de déploiement progressif (J0 → J+30)

**Principe** : on déploie par vagues, on mesure, on corrige. Pas de big-bang.

---

## Vue d'ensemble

| Phase | Période | Périmètre | Langues | Objectif |
|-------|---------|-----------|---------|----------|
| **Phase 1** | J0 — J+7 | NAVLYS app — NAV IA Chat uniquement | FR + EN | Valider qualité + cache + observer ratio activation |
| **Phase 2** | J+7 — J+14 | + NAVBIO app (synthèse bio + onboarding 5Q) | FR + EN | Tester voix sur narration longue (bios) |
| **Phase 3** | J+14 — J+21 | + NAVLYS.IO (Studio) + brunopartouche.com (journal/FAQ) | FR + EN | Atteindre les 4 apps |
| **Phase 4** | J+21 — J+30 | Extension multilingue **12 langues** | FR EN ES PT IT DE AR HE JA ZH NL TR | Multilingue grand public |
| **Phase 5** | J+30 + | 28 langues complètes | toutes Multilingual v2 | Coverage maxi |

---

## Phase 1 — J0 → J+7 (NAVLYS NAV IA, FR + EN)

### Prérequis (J-3 → J0)

- [x] Doc 01–08 livrées (ce pack).
- [ ] Bruno : enregistrer 5 min de voix (cf. doc 06).
- [ ] Bruno : compte Creator 22 €/mois actif, PVC en cours d'entraînement.
- [ ] Bruno : `VOICE_ID` reçu, copié dans `_VOIX_BRUNO_OFFICIEL.md`.
- [ ] Claude : créer bucket R2 `navlys-voice-cache` + custom domain `voice.navlys.com`.
- [ ] Claude : migrations Supabase (`voice_usage`, `voice_preferences`).

### Mise en prod (J0)

1. Vercel env vars (scope `navlys-app`) :
   ```
   ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID_BRUNO, ELEVENLABS_MODEL_ID
   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
   R2_BUCKET, R2_PUBLIC_HOST
   ```
2. Déploiement : `cd navlys && vercel deploy --prod --yes --token=$VT --scope navlys` (un seul, attendre READY — cf. CLAUDE.md).
3. Run `npx tsx scripts/precache-voice.ts` (FR + EN, 40 réponses navlys).
4. Activation feature flag `voice_enabled = true` pour 10 % des users (canary).

### KPIs visés Phase 1

| Métrique | Cible J+7 |
|----------|-----------|
| Voice activation rate | > 25 % |
| Cache hit rate | > 60 % |
| Latence p95 | < 500 ms |
| Coût total semaine | < 8 € |
| 0 incident sécurité | 100 % |
| Lighthouse accessibilité | ≥ 95 |

---

## Phase 2 — J+7 → J+14 (+NAVBIO)

- Copier `components/voice/` + `lib/voice/` + `app/api/voice/*` dans `_APP_NAVBIO_v1/`.
- Vercel env vars (scope `navbio-app`).
- Brancher dans `BioPage` + onboarding 5Q.
- Pré-cache 30 réponses NAVBIO.
- Bascule 100 % NAVLYS app (sortie canary) si KPIs Phase 1 OK.

**Test particulier** : `<VoiceBrunoPlayerLong />` sur bios > 600 caractères (chunking + enchaînement séquentiel).

---

## Phase 3 — J+14 → J+21 (+NAVLYS.IO et brunopartouche.com)

- NAVLYS.IO : bouton Studio + tooltips.
- brunopartouche.com : journal articles + FAQ + manifesto.
- Pré-cache 30 réponses cumulées.
- Bilan inter-app : comparer activation rate par app + langue.

**Décision Go/No-Go Phase 4** : si cache hit < 50 %, retarder le multilingue de 7 j (raison : surcoût).

---

## Phase 4 — J+21 → J+30 (12 langues)

- Ajout LANGS = `[fr,en,es,pt,it,de,ar,he,ja,zh,nl,tr]`.
- Re-run `precache-voice.ts` pour les 10 nouvelles langues (10 × 100 = 1 000 nouveaux MP3 ≈ 4 €).
- Détection auto navigateur (`navigator.language`) → lang par défaut player.
- Toggle langue manuel disponible (override).

**KPIs visés J+30** :

| Métrique | Cible J+30 |
|----------|-----------|
| Voice activation rate | > 35 % users |
| Cache hit rate | > 70 % |
| Latence p95 | < 400 ms |
| Coût mensuel | < 35 € (1 000 actifs) |
| Avg listen duration | > 25 s |
| NPS feature voix | ≥ +30 |
| % users qui activent > 3× | ≥ 50 % |
| Incidents critiques | 0 |

---

## Phase 5 — J+30 et après (28 langues)

- Activation 16 langues restantes (par paliers de 4 langues / semaine).
- Mise en place A/B test : « activer par défaut voix » vs « clic explicite ».
- Étude opt-in « voix dans emails NAVLYS » (lien audio dans newsletter).

---

## Métriques de succès — mesure & instrumentation

### Dashboard hebdomadaire (livré chaque lundi)

| Bloc | Source | Visualisation |
|------|--------|---------------|
| Vue exec : activation, cache hit, coût | `voice_usage` | 3 KPI cards + trend 7 j |
| Top 20 textes joués (par hash) | `voice_usage` | table |
| Repartition par langue | `voice_usage` | pie chart |
| Répartition par app | `voice_usage` | bar chart |
| Latence p50/p95/p99 | `voice_usage` | line chart |
| NPS feature (sondage in-app) | `voice_nps` | gauge |

### NPS feature voix — sondage in-app

Déclenchement : après 3 lectures complètes par user.

```
Question : "Sur 10, recommanderais-tu la voix de Bruno à un ami ?"
Suivi    : "Une phrase pour expliquer ?"
```

---

## Communications

| Audience | Moment | Canal | Message |
|----------|--------|-------|---------|
| Bruno | J0, J+7, J+14, J+21, J+30 | rapport markdown | KPIs + décisions |
| Users canary | J0 | bannière in-app | « Nouveauté : écoute NAV IA avec la voix de Bruno » |
| Mailing list NAVLYS | J+14 | email | annonce officielle (FR/EN) |
| Réseaux (LinkedIn Bruno) | J+30 | post | démo audio + témoignages |

---

## Rollback plan (au cas où)

- **Feature flag** `voice_enabled` côté Supabase, lu côté serveur. Bascule instantanée OFF.
- En cas d'incident sécurité (fuite VOICE_ID, deepfake détecté) :
  1. Rotation immédiate API Key ElevenLabs.
  2. Désactivation feature flag.
  3. Communication transparente Bruno.
  4. Audit logs `voice_usage` sur 30 j.
  5. Si VOICE_ID compromis → suppression et re-clonage (nouveau ID).
