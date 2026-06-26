# 06 — MONTAGE DESCRIPT
> Pipeline montage / post-production unifié, 12 langues, 4 formats.
> Descript = éditeur vidéo basé texte + IA (Studio Sound, transcription auto, overdub, sous-titres).

---

## 🎯 PRÉ-REQUIS DESCRIPT

| Item | État souhaité |
|---|---|
| Plan Descript | **Creator** (24 $/mois) minimum — donne Studio Sound illimité + 4K export + transcription multilingue |
| Pack assets prêts | BRUNO COIN v2 MP4 alpha, logo NAVLYS animé MP4, ouvrage musical Epidemic Sound (cf. fichier 07) |
| Voix ElevenLabs | Tous les WAV 12 langues prêts (cf. fichier 05) |
| Vidéo source | Master tournage Bruno OU master HeyGen avatar |

---

## 📥 IMPORT DES SOURCES

### Étape 1 — Créer le projet
Descript → New Project → name : `NAVLYS_manifeste_v1_master_FR`.
Workspace : 16:9 1920×1080. Frame rate : 24 fps.

### Étape 2 — Importer la vidéo Bruno
- Glisser le fichier MP4 master (issue iPhone ProRes ou Sony A7 IV) dans la timeline.
- Descript transcrit automatiquement (sélectionner FR).
- Vérifier la transcription mot à mot (corrections manuelles si besoin).

### Étape 3 — Importer la voix ElevenLabs
- Glisser `NAVLYS_voix_FR_versionA_master.wav` dans la timeline audio (track 2).
- Si l'idée est de **doubler la voix Bruno réelle par la voix ElevenLabs nettoyée**, désactiver le track 1 audio source.

---

## 🧼 ÉTAPE 1 — STUDIO SOUND (nettoyage audio IA)

### Qu'est-ce que Studio Sound ?
Outil IA Descript qui **élimine bruit de fond, écho, reverb, plosives**, et **rétablit la voix comme si enregistrée en studio pro**. C'est magique. Coche obligatoire.

### Comment l'activer
1. Sélectionner le clip audio (track Bruno).
2. Bouton **Studio Sound** dans la barre supérieure.
3. Slider à **70 %** (au-delà, la voix devient irréelle).
4. Apply.
5. Réécouter en isolant track audio (key M sur la track vidéo).

**Temps de calcul** : ~3 min pour un clip de 25 s sur GPU cloud Descript.

---

## ✂️ ÉTAPE 2 — SUPPRESSION AUTO DES « EUH », SILENCES, RESPIRATIONS

### Outil **Remove Filler Words**
- Edit menu → Remove Filler Words.
- Cocher : "euh", "uh", "um", "hmm", "donc en fait".
- Apply.
- Descript supprime les segments et **recolle** la vidéo.

### Outil **Shorten Word Gaps**
- Edit menu → Shorten Word Gaps.
- Min silence to detect : 300 ms.
- Reduce silences to : 150 ms.
- Apply.

**Effet** : la version A passe de 26 s à 25 s exactement, sans perdre une syllabe utile.

---

## 🌐 ÉTAPE 3 — AUTO-TITRAGE MULTILINGUE (sous-titres burned-in)

### Workflow Descript natif
1. Sidebar → **Captions** → Generate.
2. Langue source : FR. Langue de sortie : FR (étape 1).
3. **Translate captions** : passer à EN, RU, ES, DE, IT, NL, PT-BR, AR, HE, ZH, JA un par un.
4. Pour chaque langue, exporter un set de sous-titres `.srt` séparé.

### Style des sous-titres
- **Font** : Cinzel (titres NAVLYS) pour les phrases-clés, Cormorant Garamond pour le reste.
- **Color** : `#F2F4F7` (pearl NAVLYS) sur ombre `#02040a 70%`.
- **Position** : 80 % depuis le haut (bas-centre cadre 16:9), 85 % en 9:16 vertical.
- **Taille** : 64 px en 16:9 / 48 px en 9:16 (charte : minimum 44 px).
- **Stagger animation** : apparition mot à mot 80 ms (Descript supporte).

### Bonus : sous-titres « burned-in » VS « overlay »
- **Burned-in** : gravés dans la vidéo (TikTok, Reel, Story).
- **Overlay** : SRT séparé (YouTube, LinkedIn natif — meilleur SEO).
- → **Exporter les deux**.

---

## ✨ ÉTAPE 4 — SYNCHRONISATION OVERLAYS GRAPHIQUES

### BRUNO COIN v2 en bas droite

À **22 s pile** (juste avant le « Le secret tient là »), faire apparaître BRUNO COIN v2 en bas-droite du cadre, qui termine de tourner sur lui-même au moment du mot « là ».

**Procédure** :
1. Importer `BRUNO_COIN_v2_3s.mp4` (transparent alpha, exporté depuis `_BRUNO_COIN_3D_v2.html` via OBS écran transparent).
2. Glisser sur la timeline à 22 s.
3. Position : x=85 % / y=80 % (bas-droite).
4. Scale : 12 % du cadre.
5. Opacity : fade-in 22.0 → 22.4 s (0 → 100 %).
6. Persiste jusqu'à 25 s, puis le coin grandit à 100 % et se centre au passage outro (25 → 26 s).

### Logo NAVLYS animé en outro

À **26 s**, le coin disparaît, le logo NAVLYS animé apparaît plein cadre (`navlys-logo.mp4`).
- Durée affichage : 26 → 28 s.
- Fade-out final 28 → 30 s vers texte tagline.

### Tagline texte incrustée

À **28 s**, texte Cinzel ice blue `#7DD3FC` apparaît plein cadre :
*Ma méthode, Votre argent, Votre tempo !* — BM

- Taille : 72 px.
- Position : centre vertical, 50 % horizontal.
- Animation : stagger word-by-word 80 ms.

### Disclaimer G1 en pied

À **28 s**, en bas de cadre, texte Cormorant Garamond 22 px `#F2F4F7` :
*NAVLYS éducation, pas conseil. Bruno non CIF/ORIAS.*

Persiste jusqu'à 30 s (fin vidéo).

---

## 🎨 ÉTAPE 5 — COLOR GRADE (LUT cinéma chaud bronze)

### LUT à appliquer
Téléchargement gratuit : **Lutify.me "Vintage Gold"** ou **FilterGrade "Cinematic Bronze"**.

Si tournage Sony S-Log3, utiliser d'abord LUT de conversion S-Log3 → Rec.709 (fournie par Sony) AVANT la LUT créative.

### Application Descript
- Timeline → sélectionner clip vidéo.
- Effects → LUT → Upload `.cube`.
- Intensity : 70 %.
- Apply.

### Ajustements manuels post-LUT
| Paramètre | Valeur cible |
|---|---|
| Exposure | +0.15 |
| Contrast | +12 |
| Highlights | −10 |
| Shadows | +5 |
| Saturation | −5 (désature légèrement) |
| Vibrance | +10 (boost les bronzes) |
| Temperature | +200K (réchauffe l'image) |
| Tint | +5 vers magenta (peau Bruno plus vivante) |

---

## 🔁 ÉTAPE 6 — TRANSITIONS

Pour le manifeste 6 plans (cf. fichier 02), pas de transitions criardes :
- **Plans 1 → 6** : coupe franche (J-cut sur l'audio si phrase commence avant le plan suivant).
- **Plan 6 → outro (25 s)** : **fade to black 200 ms**.
- **Outro → BRUNO COIN** : crossfade 300 ms.
- **BRUNO COIN → logo NAVLYS** : morph cut (BRUNO COIN se transforme en logo).

---

## 🧩 ÉTAPE 7 — RÉ-USAGE POUR LES 12 LANGUES

### Méthode rapide (replace audio uniquement)
1. Dupliquer le projet master FR.
2. Renommer `NAVLYS_manifeste_v1_master_EN`.
3. Remplacer track audio track 2 : `NAVLYS_voix_EN_versionA.wav`.
4. Re-générer captions EN.
5. Re-export.

**Astuce** : si l'avatar HeyGen est utilisé (option B), recréer la vidéo HeyGen avec audio EN avant d'importer dans Descript. Sinon le lip-sync est cassé.

### Méthode pour AR / HE (RTL = Right to Left)
- Sous-titres alignement : `text-align: right`.
- Burned-in : décaler position x de droite à gauche.
- Animation : stagger word-by-word inversée (commence à droite).

### Méthode pour ZH / JA (caractères)
- Font : **Noto Sans CJK** (gratuit Google Fonts).
- Pas de stagger word-by-word (pas adapté aux idéogrammes), préférer fade-in bloc 250 ms.

---

## 🎵 ÉTAPE 8 — INTÉGRATION MUSIQUE (cf. fichier 07)

- Importer track Epidemic Sound `Quiet_Horizon.mp3` (recommandé).
- Niveau : −18 dB en présence de voix, −12 dB en outro instrumentale (28-30 s).
- Ducking auto : Descript → Audio → Auto-Duck.
- Fade-in 0 → 2 s (montée douce).
- Fade-out 29 → 30 s.

---

## 📤 ÉTAPE 9 — EXPORT (cf. fichier 08 pour formats détaillés)

Pour chaque langue :
- Master 4K H.264 30 Mbps.
- 1080p 16:9 YouTube (10 Mbps).
- 1080×1080 carré (10 Mbps).
- 1080×1920 vertical 9:16 (12 Mbps).
- WebM 1080p VP9 (5 Mbps) pour intégration site NAVLYS.

---

## ⏱️ TEMPS DE MONTAGE TOTAL

| Étape | Temps |
|---|---|
| Setup projet + import sources | 15 min |
| Studio Sound + nettoyage | 10 min |
| Captions FR + style | 20 min |
| Overlays graphiques + sync | 30 min |
| Color grade + ajustements | 20 min |
| Validation finale FR | 20 min |
| **Master FR terminé** | **~2 h** |
| Duplication & ré-audio pour 11 autres langues | 11 × 25 min = ~4.5 h |
| Exports formats multiples (cf. fichier 08) | ~3 h |
| **TOTAL projet** | **~9 h 30** |

Réaliste sur 2 jours de travail concentré.

---

## ✅ CHECKLIST QUALITÉ MONTAGE

- [ ] Audio Studio Sound appliqué, peaks à −3 dB.
- [ ] Lip-sync correct (si avatar HeyGen, vérifier 5 frames clés).
- [ ] Sous-titres lisibles à 100 % zoom mobile.
- [ ] BRUNO COIN v2 apparaît bien à 22 s, disparaît à 26 s.
- [ ] Logo NAVLYS lisible en outro.
- [ ] Tagline + disclaimer visibles sans coupure.
- [ ] Color grade cohérent (peau Bruno chaude, fond bronze).
- [ ] Aucune saute (frame drop) entre les plans.
- [ ] Durée totale exacte : 30 s pile (25 s discours + 5 s outro).

---

*Fin du fichier 06 — Descript · v1.0.0-BETA*
