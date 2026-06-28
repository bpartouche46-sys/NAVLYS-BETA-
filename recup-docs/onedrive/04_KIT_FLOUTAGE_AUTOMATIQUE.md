# ⚓ KIT FLOUTAGE AUTOMATIQUE NAVBIO — Spec technique v1.0
_AI Face Auto-Blur Spec · 29 mai 2026 · Implementation guide for `_APP_NAVBIO_v1/`_

---

## 1. Objectif / Objective

**FR.** Détecter automatiquement les visages présents sur chaque photo ou frame vidéo uploadée par l'Utilisateur, estimer l'âge apparent, et **flouter par défaut** les visages à risque (mineurs, personnes en arrière-plan, personnes sous droit à l'oubli), en laissant à l'Utilisateur la possibilité de **désactiver le floutage par personne consentante**.

**EN.** Auto-detect faces on uploaded photos/video frames, estimate apparent age, **default-blur** at-risk faces, allow per-face opt-out for consenting individuals.

---

## 2. Stack technique recommandée / Recommended stack

| Composant | Choix | Justification |
|---|---|---|
| Détection visages | **MediaPipe Face Detection** (Google, Apache 2.0) | Léger, WASM client-side possible, ~95% précision |
| Estimation âge | **InsightFace age model** (open source, MIT) ou **DeepFace** wrapper | Précision ±5 ans, suffisant pour seuil mineur |
| Floutage | **OpenCV.js** Gaussian blur (kernel 51×51, sigma 30) | Standard industrie, irréversible |
| Strip EXIF | **piexifjs** + `Sharp` côté serveur | Supprime GPS, fabricant, datetime exact |
| Persistance des choix | Base SQLite chiffrée locale `face_decisions.db` | Zero-knowledge respecté |

Toute la chaîne tourne **côté client** (browser/PWA) sauf l'EXIF strip serveur (optionnel post-déchiffrement local).

---

## 3. Pipeline étape par étape / Step-by-step pipeline

```
Upload image (User device)
        ↓
[1] Detect faces            → MediaPipe Face Detection
        ↓
[2] Bounding boxes + landmarks (6 points par visage)
        ↓
[3] Crop face thumbs → InsightFace age estimation
        ↓
[4] Decision tree:
    ├─ age < 18 → BLUR (forced, can't override without parental consent flag)
    ├─ face area < 5% image → BLUR (background bystander)
    ├─ face in erasure-right registry → BLUR (forced, no override)
    └─ otherwise → SHOW preview, ask User per face
        ↓
[5] Per-face UI: "Consentement de cette personne ? ☐"
        ↓
[6] Apply blur to flagged faces (OpenCV.js Gaussian 51×51)
        ↓
[7] Strip EXIF (piexifjs)
        ↓
[8] Encrypt AES-256-GCM client-side
        ↓
[9] Upload encrypted blob to Cloudflare R2
```

---

## 4. Cas limites / Edge cases

| Cas | Comportement |
|---|---|
| Visage partiellement masqué (mains, lunettes de soleil) | Détecté si confidence > 0.5, traité comme visage normal |
| Profil pur (oreille seule) | Non détecté (limite MediaPipe) → l'Utilisateur peut flouter manuellement |
| Photo ancienne basse résolution | Modèle moins précis → seuil de confiance abaissé à 0.4 + warning visible |
| Visage en mouvement (vidéo) | Détection frame-par-frame avec **tracking IoU** pour cohérence (ByteTrack-like) |
| Visage généré par IA (deepfake) | Détecté comme visage normal (limitation v1) — roadmap v2 : détecteur deepfake |
| Photos artistiques / peintures | Détecté ; l'Utilisateur peut signaler "œuvre d'art" pour désactiver le floutage |
| Caméra à 360° / panorama | Découpage en tuiles, traitement parallèle |
| Mineur de l'Utilisateur lui-même (selfie d'enfance) | Détecté comme mineur ; cas spécial "self-portrait" → l'Utilisateur peut cocher "c'est moi enfant" |

---

## 5. Performance attendue / Expected performance

| Métrique | Cible v1 |
|---|---|
| Détection 1 photo 4K | < 800 ms sur iPhone 13+ ou laptop M1+ |
| Batch 10 photos parallèle | < 3 secondes total |
| Estimation âge | < 200 ms par visage |
| Floutage Gaussian | < 100 ms par visage |
| Strip EXIF | < 50 ms par photo |
| Vidéo 1080p 60s (échantillon 1 frame/sec) | < 30 secondes total |

Tests cibles : iPhone 13, Pixel 7, MacBook Air M1, Galaxy S22. Browsers : Safari 17+, Chrome 120+, Firefox 122+.

---

## 6. Override manuel / Manual override

L'Utilisateur visualise le **preview floutage** dans une modale dédiée. Pour chaque visage détecté :

```
[Photo thumbnail with overlay rectangles]
Face #1 (estimated age 34): ☐ Désactiver le floutage (je dispose du consentement)
Face #2 (estimated age 12): ⚠️ MINEUR DÉTECTÉ — flouté par défaut
                            ☐ J'ai l'autorisation parentale écrite (uploader le PDF)
Face #3 (background, age 45): ☐ Désactiver le floutage
```

**Trace d'audit :** chaque décision de l'Utilisateur (override OUI/NON) est journalisée dans le ledger local chiffré avec horodatage. En cas de litige, l'Utilisateur peut prouver son consentement éclairé.

---

## 7. Registre droit à l'oubli / Erasure-right registry

**FR.** Une personne (qui n'est pas Utilisateur NAVBIO) peut signaler à NAVLYS qu'elle souhaite que son visage soit **systématiquement flouté** dans toutes les uploads ultérieures. Procédure :
1. Demande à `dpo@navlys.com` avec justificatif d'identité + 3 photos d'elle.
2. NAVLYS génère un **embedding biométrique de référence** chiffré.
3. Cet embedding est intégré à l'index `erasure_registry.encrypted.json` propagé à tous les clients.
4. Le matching se fait **côté client** sans envoi de visages au serveur.

⚠️ Cette fonctionnalité doit faire l'objet d'une **AIPD (analyse d'impact RGPD article 35)** dédiée avant production.

**EN.** Non-User can request systematic blurring. Process: DPO request → reference embedding → client-side matching. **Requires DPIA (GDPR art. 35) before production.**

---

## 8. Limites de v1 et roadmap v2 / v1 limits and v2 roadmap

**v1 (BETA juin 2026) :**
- ✅ Détection visages humains réels
- ✅ Estimation âge ± 5 ans
- ✅ Floutage Gaussian irréversible
- ✅ Strip EXIF
- ❌ Détection deepfakes (non disponible)
- ❌ Détection plaques d'immatriculation, panneaux nominatifs (roadmap v2)
- ❌ Reconnaissance voix dans audio (roadmap v3)

**v2 (T4 2026) :** détecteur deepfake, floutage plaques + noms manuscrits, OCR sensible.
**v3 (2027) :** redaction audio (bleeps automatiques sur noms tiers).

---

## 9. Conformité réglementaire / Regulatory compliance

- **RGPD art. 25** Privacy by Design : floutage activé par défaut.
- **RGPD art. 35** AIPD : obligatoire pour le registre droit à l'oubli (traitement biométrique).
- **AI Act UE (entrée 2026)** : risque limité pour détection visages non-identifiante ; éviter de basculer dans la reconnaissance biométrique d'identification.
- **CNIL fiche pratique IA (2024)** : conformité aux 7 principes (minimisation, traçabilité, explicabilité).
- **DSA art. 28** Protection des mineurs en ligne : le floutage par défaut des visages estimés mineurs est un mécanisme de mise en conformité.

---

## 10. Composant React proposé / Suggested React component

```tsx
// _APP_NAVBIO_v1/components/FaceBlurPreview.tsx
import { useFaceBlur } from "@/lib/faceBlur";

export function FaceBlurPreview({ file, onValidate }: Props) {
  const { faces, blurred, toggleFaceConsent, applyEXIFStrip } = useFaceBlur(file);

  return (
    <div className="face-blur-preview">
      <Canvas image={blurred} faceBoxes={faces} />
      {faces.map(f => (
        <FaceRow key={f.id}
                 face={f}
                 isMinor={f.estimatedAge < 18}
                 onToggle={(consent) => toggleFaceConsent(f.id, consent)} />
      ))}
      <button onClick={() => { applyEXIFStrip(); onValidate(); }}>
        Valider et chiffrer
      </button>
    </div>
  );
}
```

---

*Document interne — spec technique — à raffiner avec l'équipe dev NAVBIO. — Le Notaire de Bord NAVLYS.*
