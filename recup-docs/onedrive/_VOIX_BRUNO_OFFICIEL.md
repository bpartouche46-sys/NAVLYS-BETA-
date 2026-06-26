# 🎙️ VOIX BRUNO — Carte d'identité officielle

**Statut : EN ATTENTE DE CLONAGE** — à compléter après procédure `06_VOIX_BRUNO_CLONAGE_GUIDE.md`.

---

## Identité

| Champ | Valeur |
|-------|--------|
| **Nom officiel modèle** | Bruno Mark Partouche — Officiel NAVLYS |
| **Propriétaire** | Bruno Mark Partouche · `bruno@navlys.com` |
| **Plateforme** | ElevenLabs (Plan Creator 22 €/mois) |
| **Modèle** | `eleven_multilingual_v2` |
| **Type de clone** | Professional Voice Cloning (PVC) |
| **Langues supportées** | 28 (Multilingual v2) |
| **Empreinte sonore** | serein · calme · posé · grave · imagé · maritime |

---

## VOICE_ID (à compléter après clonage)

```
ELEVENLABS_VOICE_ID_BRUNO = ________________________________________
```

À ajouter en variable d'env Vercel sur les 4 projets NAVLYS :
- `navlys-app` (team `team_nBtY5FOQMPIT4J8Bmf7wvBSC`)
- `navbio-app`
- `navlys-io`
- `brunopartouche-com` (post-migration Netlify → Vercel)

Backup chiffré : **1Password / Bitwarden** sous l'entrée `NAVLYS — ElevenLabs VOICE_ID Bruno`.

---

## Settings figés (à ne pas modifier sans test A/B documenté)

```ts
export const VOICE_SETTINGS_BRUNO = {
  stability:        0.55,
  similarity_boost: 0.85,
  style:            0.30,
  use_speaker_boost: true,
};
```

---

## Historique

| Date | Évènement | Auteur |
|------|-----------|--------|
| 2026-05-29 | Pack `_VOIX_BRUNO_v1/` livré (8 docs) | Claude |
| _en attente_ | Enregistrement échantillon 5-10 min | Bruno |
| _en attente_ | Compte ElevenLabs Creator 22 €/mois créé | Bruno |
| _en attente_ | PVC submitted (Voice Lab) | Bruno |
| _en attente_ | VOICE_ID reçu + collé ici | Bruno → Claude |
| _en attente_ | Vercel env var publiée (4 projets) | Claude |
| _en attente_ | Validation A/B 5 phrases | Bruno + Claude |
| _en attente_ | Phase 1 prod (NAVLYS NAV IA, FR/EN) | Claude |

---

## Consentement

- Document signé : `_VOIX_BRUNO_v1/_CONSENTEMENT/CONSENTEMENT_VOICE_CLONING_2026.pdf` (modèle dans doc 08, §2).
- Signature numérique horodatée : Yousign / DocuSign (à faire au moment de l'upload Voice Lab).
- Révocation possible à tout moment, préavis 30 j → suppression PVC + invalidation env var.

---

## Sécurité

- VOICE_ID : **jamais côté client**, jamais dans Git public, jamais dans logs publics.
- API Key ElevenLabs : rotation tous les 90 jours.
- Charte d'usage : cf. doc 08 §3, R1-R7.
- Anti-deepfake : barrière côté NAV IA G1 + filtre côté `/api/voice/synthesize`.

---

## Contact incident

- Sécurité : `bruno@navlys.com`
- Abus voix : `abuse@navlys.com` (à créer en alias Google Workspace)
- Délai réponse : 48 h · suppression sous 7 j sur abus avéré
