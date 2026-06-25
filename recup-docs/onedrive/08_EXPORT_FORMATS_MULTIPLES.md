# 08 — EXPORTS FORMATS MULTIPLES
> 12 langues × 4 formats = **48 fichiers vidéo finaux** + 12 WebM optimisés = **60 livrables**.

---

## 📐 MATRICE FORMATS × LANGUES

| Format | Résolution | Codec | Bitrate | Usage principal | Audio |
|---|---|---|---|---|---|
| **Master 4K** | 3840 × 2160 | H.264 high | 30 Mbps | Archive perpétuelle | AAC 320 kbps stereo |
| **1080p 16:9** | 1920 × 1080 | H.264 | 10 Mbps | YouTube, LinkedIn natif, X (Twitter), Facebook, site web | AAC 256 kbps stereo |
| **1080×1080 carré** | 1080 × 1080 | H.264 | 10 Mbps | Instagram feed, LinkedIn carrousel post, Facebook feed | AAC 256 kbps stereo |
| **1080×1920 vertical 9:16** | 1080 × 1920 | H.264 | 12 Mbps | TikTok, Insta Reel, YouTube Shorts, Insta Story, FB Story | AAC 256 kbps stereo |
| **WebM optimisé site** | 1920 × 1080 | VP9 | 5 Mbps | Hero des sites navlys.com, brunopartouche.com | Opus 192 kbps stereo |

---

## 🗂️ STRUCTURE DE DOSSIERS

```
_VIDEO_MANIFESTE_v1/
└── exports/
    ├── 4K_master/
    │   ├── NAVLYS_manifeste_A_FR_4K.mp4
    │   ├── NAVLYS_manifeste_A_EN_4K.mp4
    │   ├── ... (12 fichiers)
    ├── 1080p_16x9/
    │   ├── NAVLYS_manifeste_A_FR_1080p.mp4
    │   ├── ... (12)
    ├── 1080x1080_square/
    │   ├── NAVLYS_manifeste_A_FR_square.mp4
    │   ├── ... (12)
    ├── 1080x1920_vertical/
    │   ├── NAVLYS_manifeste_A_FR_vertical.mp4
    │   ├── ... (12)
    ├── webm_site/
    │   ├── NAVLYS_manifeste_A_FR.webm
    │   ├── ... (12)
    └── subtitles_srt/
        ├── NAVLYS_manifeste_A_FR.srt
        ├── ... (12 langues)
```

---

## ⚙️ COMMANDES FFMPEG (si export manuel hors Descript)

### 4K Master
```bash
ffmpeg -i source.mov -c:v libx264 -preset slow -crf 18 -profile:v high \
  -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 320k -ar 48000 \
  -s 3840x2160 -r 24 \
  NAVLYS_manifeste_A_FR_4K.mp4
```

### 1080p 16:9
```bash
ffmpeg -i source.mov -c:v libx264 -preset medium -crf 21 \
  -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 256k \
  -s 1920x1080 -r 24 -b:v 10M \
  NAVLYS_manifeste_A_FR_1080p.mp4
```

### Carré 1080×1080
```bash
ffmpeg -i source.mov -vf "crop=ih:ih,scale=1080:1080" \
  -c:v libx264 -preset medium -crf 21 \
  -c:a aac -b:a 256k -b:v 10M -r 24 \
  NAVLYS_manifeste_A_FR_square.mp4
```

### Vertical 9:16
```bash
ffmpeg -i source.mov -vf "scale=-2:1920,crop=1080:1920" \
  -c:v libx264 -preset medium -crf 21 \
  -c:a aac -b:a 256k -b:v 12M -r 24 \
  NAVLYS_manifeste_A_FR_vertical.mp4
```

### WebM site (VP9 + Opus, le mieux pour le web)
```bash
ffmpeg -i source.mov -c:v libvpx-vp9 -b:v 5M -pix_fmt yuv420p \
  -c:a libopus -b:a 192k \
  -s 1920x1080 -r 24 -row-mt 1 \
  NAVLYS_manifeste_A_FR.webm
```

---

## 🎯 SPÉCIFICATIONS PAR PLATEFORME

### YouTube (1080p 16:9)
- Bitrate vidéo max recommandé : 12 Mbps.
- Audio : AAC-LC 384 kbps possible (mais 256 kbps suffit).
- Sous-titres : uploader `.srt` séparé (meilleur SEO que burned-in).
- Thumbnail à fournir : 1920×1080 JPG (cf. fichier 10 plan B).

### YouTube Shorts (vertical 1080×1920)
- Durée ≤ 60 s (notre vidéo 25 s OK).
- Sous-titres : burned-in recommandés (utilisateurs scrollent en mute).

### LinkedIn (1080p natif + carré + vertical)
- Upload natif **3 versions** : 16:9, 1:1, 9:16.
- Algorithme LinkedIn préfère carré 1:1 pour le feed.
- Sous-titres burned-in obligatoires (85 % de la consultation est mute).

### Instagram Feed (1080×1080)
- Format carré strictement.
- Durée max feed : 60 s (notre 25 s OK).
- Cover image obligatoire (frame de la vidéo à 22 s).

### Instagram Reel (1080×1920)
- Durée max : 90 s.
- Music : ne pas mixer avec audio Insta natif (utilisateur peut le faire).
- Cover : 1080×1920.

### TikTok (1080×1920)
- Durée max : 10 min depuis 2024 (mais sweet spot 21-34 s).
- Watermark TikTok ajouté auto.

### X / Twitter (1080p ou carré)
- Durée max : 2 min 20 s.
- Bitrate max : 25 Mbps.
- Upload H.264 + AAC obligatoire.

### Facebook
- Format paysage 1080p ou carré 1:1.
- Recommandation : upload **square** pour mobile-first.

### Site NAVLYS (WebM)
- Embarqué via `<video>` tag autoplay muted loop.
- Poids cible : < 5 MB pour le WebM (à 5 Mbps × 8 s = 5 MB ✓).
- Fallback MP4 pour Safari < 14.

---

## ⏱️ TEMPS D'EXPORT (estimation par fichier)

Sur MacBook Pro M1 (CPU) :

| Format | Temps export |
|---|---|
| 4K master | ~3 min |
| 1080p 16:9 | ~1 min |
| Carré | ~1 min |
| Vertical | ~1 min |
| WebM | ~5 min (VP9 est lent) |

**Par langue** : ~11 min × 12 langues = ~2 h 15 min d'export pur.

---

## ✅ CHECKLIST QUALITÉ EXPORT (par fichier)

- [ ] Vérifier durée exacte (25 s, +5 s outro = 30 s pile).
- [ ] Pas de drop frame.
- [ ] Audio peak à -3 dB (vérification : amplitude graph).
- [ ] Sous-titres burned-in lisibles à 200 % zoom.
- [ ] Logo NAVLYS visible.
- [ ] BRUNO COIN v2 présent à 22 s.
- [ ] Disclaimer G1 lisible.
- [ ] Bitrate respecté (vérifier avec MediaInfo).
- [ ] Test lecture sur mobile (iOS + Android).
- [ ] Test lecture Safari + Chrome + Firefox.

---

## 🚀 BATCH EXPORT (script bash automatisé)

Si plusieurs sources à traiter, créer le script `batch_export.sh` :

```bash
#!/bin/bash
LANGUAGES=(FR EN RU ES DE IT NL PTBR AR HE ZH JA)

for lang in "${LANGUAGES[@]}"; do
  SOURCE="masters/NAVLYS_manifeste_A_${lang}_master.mov"
  OUTDIR="exports"

  echo "[$lang] 4K..."
  ffmpeg -i "$SOURCE" -c:v libx264 -crf 18 -s 3840x2160 -r 24 -c:a aac -b:a 320k \
    "${OUTDIR}/4K_master/NAVLYS_manifeste_A_${lang}_4K.mp4"

  echo "[$lang] 1080p 16:9..."
  ffmpeg -i "$SOURCE" -c:v libx264 -crf 21 -s 1920x1080 -r 24 -c:a aac -b:a 256k \
    "${OUTDIR}/1080p_16x9/NAVLYS_manifeste_A_${lang}_1080p.mp4"

  echo "[$lang] Square..."
  ffmpeg -i "$SOURCE" -vf "crop=ih:ih,scale=1080:1080" -c:v libx264 -crf 21 -r 24 -c:a aac -b:a 256k \
    "${OUTDIR}/1080x1080_square/NAVLYS_manifeste_A_${lang}_square.mp4"

  echo "[$lang] Vertical 9:16..."
  ffmpeg -i "$SOURCE" -vf "scale=-2:1920,crop=1080:1920" -c:v libx264 -crf 21 -r 24 -c:a aac -b:a 256k \
    "${OUTDIR}/1080x1920_vertical/NAVLYS_manifeste_A_${lang}_vertical.mp4"

  echo "[$lang] WebM..."
  ffmpeg -i "$SOURCE" -c:v libvpx-vp9 -b:v 5M -c:a libopus -b:a 192k -s 1920x1080 -r 24 \
    "${OUTDIR}/webm_site/NAVLYS_manifeste_A_${lang}.webm"

  echo "[$lang] DONE ✓"
done
```

Lancer : `bash batch_export.sh`. Ce script tourne en boucle sur les 12 langues. Temps total : ~2 h 15 min.

---

## 📊 TAILLE TOTALE ESTIMÉE DES EXPORTS

| Format | Taille/fichier × 12 langues |
|---|---|
| 4K master | 85 MB × 12 = **1 020 MB** |
| 1080p 16:9 | 35 MB × 12 = **420 MB** |
| Carré | 35 MB × 12 = **420 MB** |
| Vertical | 42 MB × 12 = **504 MB** |
| WebM | 18 MB × 12 = **216 MB** |
| **TOTAL** | **~2.6 GB** |

Stockage cible : Google Drive ou Vercel Blob ou Cloudflare R2 (selon politique NAVLYS).

---

## ✅ VALIDATION FINALE AVANT DIFFUSION

Avant J0 (1ᵉʳ juin 2026 minuit Jérusalem) :
- [ ] 60 fichiers exportés et vérifiés un par un.
- [ ] 60 fichiers uploadés dans dossier Google Drive partagé.
- [ ] Liens publics créés pour la presse (cf. fichier 09 plan diffusion).
- [ ] Thumbnails YouTube créés (1 par langue, 12 thumbnails).
- [ ] Métadonnées renseignées pour chaque plateforme (title, description, tags).

---

*Fin du fichier 08 — Exports multiformats · v1.0.0-BETA*
