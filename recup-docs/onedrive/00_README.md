# 🎙️ _VOIX_BRUNO_v1 — Pack intégration IA voix Bruno (ElevenLabs Multilingual v2)

**Verrouillé le 29 mai 2026 · Bruno Mark Partouche · Laboratoire NEXT GEN NAVLYS**

> Ce pack regroupe l'architecture complète pour intégrer la **voix clonée de Bruno** (ton serein, calme, posé) dans les 4 applications NAVLYS via **ElevenLabs Multilingual v2**.
>
> Chaque réponse de **NAV IA** pourra être écoutée d'un clic, avec qualité humaine, en 28 langues, en streaming < 400 ms, et avec cache R2 pour maîtriser le coût.

---

## 📚 Index du pack

| # | Fichier | Objet |
|---|---------|-------|
| 01 | `01_ARCHITECTURE_VOIX_BRUNO.md` | Architecture technique de bout en bout (front, back, cache, streaming, analytics) |
| 02 | `02_COMPOSANT_REACT_VOICE_PLAYER.md` | Code TS complet du `<VoiceBrunoPlayer />` (charte NAVLYS or/breathing) |
| 03 | `03_API_BACKEND_NEXTJS.md` | Routes Next.js `/api/voice/*` + helpers ElevenLabs |
| 04 | `04_INTEGRATION_4_APPS.md` | Procédure d'intégration NAVLYS app · NAVBIO app · NAVLYS.IO · brunopartouche.com |
| 05 | `05_CACHE_OPTIMISATION.md` | Stratégie cache R2 SHA-256 + script `precache-voice.ts` (cible > 70 % hit rate) |
| 06 | `06_VOIX_BRUNO_CLONAGE_GUIDE.md` | Procédure clonage Pro Voice Cloning (échantillon 5 min, A/B, settings) |
| 07 | `07_PLAN_DEPLOIEMENT.md` | Phases J0 → J+30, métriques de succès, NPS |
| 08 | `08_CONFORMITE_LEGALE_VOIX_CLONEE.md` | Mentions, consentement, anti-deepfake, sécurité VOICE_ID |
| — | `_VOIX_BRUNO_OFFICIEL.md` | Carte d'identité voix + backup `VOICE_ID` (à compléter après clonage) |

---

## ⚡ TL;DR (250 mots maxi)

- **Partenaire désigné** : ElevenLabs Multilingual v2 — Plan **Creator 22 €/mois** (100 000 caractères, 28 langues, qualité 24 kHz).
- **Composant** : `<VoiceBrunoPlayer text="..." lang="fr" />` plug-and-play en React/Next.js 14, charte NAVLYS or sur fond nuit, breathing animation, accessibilité WCAG AA, `prefers-reduced-motion` respecté.
- **Cache** : Cloudflare R2, clé `sha256(text+lang+voiceId)`, TTL 30 jours, cible **70 % hit rate** sous 1 semaine.
- **Coût estimé** : **~30 €/mois pour 1 000 utilisateurs actifs** (vs ~300 € sans cache).
- **Streaming** : WebSocket ElevenLabs (latence p95 < 400 ms) pour réponses nouvelles, `Audio()` natif pour cached.
- **Sécurité** : `VOICE_ID` + `ELEVENLABS_API_KEY` en `.env` serveur uniquement, jamais côté client.

## 🎯 3 actions Bruno

1. **Enregistrer 5 min de voix** : micro condensateur, pièce calme, lecture neutre du manifesto FR/EN (cf. `06_VOIX_BRUNO_CLONAGE_GUIDE.md`).
2. **Créer compte ElevenLabs Creator 22 €/mois** → Voice Lab → Professional Voice Cloning → uploader échantillon.
3. **Copier VOICE_ID** dans `_VOIX_BRUNO_OFFICIEL.md` + ajouter en variable d'env Vercel `ELEVENLABS_VOICE_ID_BRUNO`.

## 🛠️ 3 chantiers Claude prochains

1. **Brancher le composant** dans NAVLYS app (NAV IA Chat) après réception VOICE_ID — Phase 1 FR/EN.
2. **Script `precache-voice.ts`** : générer + uploader 100 réponses fréquentes par app sur R2.
3. **Dashboard analytics** : cache hit rate, coût/user, latence p95, % users qui activent la voix.
