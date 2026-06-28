# 04 — SCRIPT HEYGEN · GÉNÉRATION AVATAR IA
> Plan B (ou plan A express) — production complète sans tournage réel.
> Délai de génération : ~5 minutes par version × 3 versions = **~15 min**.

---

## 🎯 PRÉ-REQUIS HEYGEN

| Item | État souhaité | Comment vérifier |
|---|---|---|
| Plan HeyGen actif | **Creator** ou supérieur | dashboard.heygen.com/billing |
| Avatar clone Bruno actif | Validé | dashboard → Avatars → mes avatars instant |
| Voix clone Bruno HeyGen | Validée | (alternative : on connectera ElevenLabs en API, cf. fichier 05) |
| Crédits restants | ≥ 10 min vidéo | dashboard upper-right counter |

⚠️ **Si l'avatar n'est pas encore cloné** : il faut **3 minutes de Bruno filmé en webcam frontale, fond uni clair, regard caméra, lecture neutre**. Le clone est créé en 30 min côté HeyGen.

---

## 🎙️ CONFIGURATION VOIX

### Option recommandée : voix ElevenLabs externe importée
- HeyGen permet d'importer un audio externe et de **lip-syncer** dessus.
- On génère les 12 langues sur ElevenLabs (cf. fichier 05), on les importe une par une dans HeyGen.
- Avantage : qualité voix ElevenLabs > voix HeyGen native.

### Option alternative : voix HeyGen Bruno cloné
- Si voix HeyGen jugée suffisante après test FR/EN.
- Inconvénient : pas de support 12 langues fluides (HeyGen voix natives moins propres en RU/AR/HE).

---

## 📺 BACKGROUND VIRTUEL

### Configuration scène HeyGen

```
Scene background type : Custom image
Image source         : background_office_NAVLYS_neutral.png  (1920×1080)
Composition          : Bruno avatar 60% écran, position centre-droite
Phone overlay        : png transparent posé sur table virtuelle (fichier b-roll)
Color grading        : Cinematic warm (preset HeyGen)
```

### Image background personnalisée à fournir
Spec à générer (Midjourney / Firefly / Stable Diffusion) :
```
Prompt: "minimalist dark wood desk, deep black background #02040a,
single warm golden light source upper right corner, professional
cinematic mood, no people, no logos, soft bokeh, 4K detailed,
shot on Sony A7 IV with 50mm lens, photorealistic"

Output: 1920 × 1080 PNG, max 2 MB
```

Sauvegarder dans `_VIDEO_MANIFESTE_v1/assets/background_HG.png`.

---

## 📝 SCRIPT SSML POUR HEYGEN — VERSION A (25s)

### Qu'est-ce que SSML ?
SSML = **Speech Synthesis Markup Language**. C'est un format texte qui **contrôle l'intonation** d'une voix synthétique : pauses, vitesse, emphase, intonation montante/descendante. Indispensable pour rendre l'avatar naturel.

### Tags clés
- `<break time="500ms"/>` = pause de 500 millisecondes
- `<prosody rate="slow">…</prosody>` = lecture ralentie
- `<emphasis level="strong">…</emphasis>` = mot souligné
- `<prosody pitch="+5%">…</prosody>` = intonation +5% (légèrement montante)

### Script SSML FR (Version A — 25 s)

```xml
<speak>
  <break time="2000ms"/>
  <prosody rate="medium" pitch="0%">
    NAVLYS point IO,
    <break time="300ms"/>
    <prosody pitch="+8%">c'est quoi</prosody>
    <prosody pitch="-5%">?</prosody>
  </prosody>
  <break time="800ms"/>

  <prosody rate="slow">
    Aujourd'hui,
    <break time="200ms"/>
    votre <emphasis level="moderate">téléphone</emphasis>
    <break time="150ms"/>
    gère votre <emphasis level="strong">argent</emphasis>.
  </prosody>
  <break time="500ms"/>

  <prosody rate="medium">
    Il <emphasis level="moderate">écrit</emphasis> votre avenir.
  </prosody>
  <break time="400ms"/>

  <prosody rate="medium">
    Il vous fait <emphasis level="moderate">remonter</emphasis> le temps.
    <break time="300ms"/>
    Il <emphasis level="strong">construit</emphasis> votre rêve.
  </prosody>
  <break time="500ms"/>

  <prosody rate="slow" pitch="-3%">
    Sans bouger de chez vous.
    <break time="250ms"/>
    Avec votre <emphasis level="moderate">voix</emphasis>.
    <break time="250ms"/>
    Avec des mots <emphasis level="moderate">simples</emphasis>.
  </prosody>
  <break time="600ms"/>

  <prosody rate="slow" pitch="-5%">
    Votre vie :
    <break time="300ms"/>
    <emphasis level="strong">un havre</emphasis>.
    <break time="500ms"/>
    Le secret tient là.
  </prosody>
  <break time="800ms"/>
</speak>
```

### Script SSML EN (Version A — 25 s)

```xml
<speak>
  <break time="2000ms"/>
  <prosody rate="medium">
    NAVLYS point I O,
    <break time="300ms"/>
    <prosody pitch="+8%">what is it</prosody>?
  </prosody>
  <break time="800ms"/>

  <prosody rate="slow">
    Today,
    <break time="200ms"/>
    your <emphasis level="moderate">phone</emphasis>
    <break time="150ms"/>
    runs your <emphasis level="strong">money</emphasis>.
  </prosody>
  <break time="500ms"/>

  <prosody rate="medium">
    It <emphasis level="moderate">writes</emphasis> your future.
  </prosody>
  <break time="400ms"/>

  <prosody rate="medium">
    It <emphasis level="moderate">rewinds</emphasis> your past.
    <break time="300ms"/>
    It <emphasis level="strong">builds</emphasis> your dream.
  </prosody>
  <break time="500ms"/>

  <prosody rate="slow" pitch="-3%">
    Without leaving home.
    <break time="250ms"/>
    With your <emphasis level="moderate">voice</emphasis>.
    <break time="250ms"/>
    With <emphasis level="moderate">simple words</emphasis>.
  </prosody>
  <break time="600ms"/>

  <prosody rate="slow" pitch="-5%">
    Your life:
    <break time="300ms"/>
    <emphasis level="strong">a haven</emphasis>.
    <break time="500ms"/>
    The secret is right there.
  </prosody>
  <break time="800ms"/>
</speak>
```

---

## 🎬 PARAMÈTRES DE GÉNÉRATION HEYGEN

### Setup vidéo
| Paramètre | Valeur |
|---|---|
| Avatar | Bruno_clone_v1 |
| Voice | (importée ElevenLabs WAV) ou Bruno_voice_HG |
| Format | 1080p (Pro plan : 4K disponible) |
| Aspect ratio master | 16:9 → re-export 9:16 et 1:1 via Descript après |
| Background | background_HG.png custom |
| Avatar position | Center-right, 55% screen |
| Outfit | Suit shirt navy (proposé par HeyGen) |
| Gestures | Subtle hand movements ON, Head tilt ON |
| Eye contact | Strong (regard caméra majoritaire) |
| Captions burned-in | OFF (on les ajoute via Descript pour multilingue) |

### Étapes dans le dashboard HeyGen

1. New Video → Avatar Video.
2. Avatar : sélectionner Bruno clone.
3. Voice : upload audio externe (fichier ElevenLabs FR_A.wav).
4. Background : upload background_HG.png.
5. Adjustments : sélectionner *« Match avatar lip-sync to imported audio »*.
6. Submit → wait ~5 min.
7. Download MP4 1080p.

---

## ✅ CHECKLIST DE QUALITÉ AVATAR (avant validation)

- [ ] Lip-sync visible sur les mots-clés (téléphone, argent, havre).
- [ ] Pas de glitch sur les transitions de prosody (zone à risque).
- [ ] Yeux fixent la caméra (pas de regard vide).
- [ ] Aucun « blink » disgracieux (HeyGen peut sur-cligner).
- [ ] Aucune main qui apparaît/disparaît bizarrement.
- [ ] Le téléphone superposé (overlay) reste cohérent avec la « main » de l'avatar.
- [ ] Lighting cohérent avatar ↔ background (chaud sur les deux).

---

## 🔄 GÉNÉRATIONS MULTILANGUES (workflow)

Pour chaque langue ∈ {FR, EN, RU, ES, DE, IT, NL, PT-BR, AR, HE, ZH, JA} :

1. Générer audio via ElevenLabs (cf. fichier 05) → `audio_<lang>_A.wav`
2. Adapter SSML aux spécificités (RU = pas de pitch +8% trop fort, AR = vitesse −15%, JA = pauses +200ms, etc.).
3. Soumettre à HeyGen avec l'avatar Bruno + audio importé.
4. Récupérer MP4 1080p.
5. Renommer `NAVLYS_manifeste_A_<LANG>_master.mp4`.

**Temps total batch 12 langues** : 12 × 5 min = 60 min de génération HeyGen, en parallèle si plan Pro (jusqu'à 4 vidéos en queue).

---

## ⚠️ LIMITATIONS HEYGEN À CONNAÎTRE

1. **Plan gratuit** : 1 min/mois max → suffisant pour 1 version, pas 12.
2. **Watermark** : plan gratuit a un watermark HeyGen. Plan Creator (29 €/mois) le retire.
3. **Movements non-naturels** : si la voix dépasse 30 s à pleine vitesse, l'avatar peut paraître mécanique. → Sticker aux 25 s.
4. **Pas de gestion d'objet** : le téléphone que Bruno tient à la main DOIT être ajouté en overlay PNG en post-production Descript (HeyGen ne le générera pas naturellement).

---

## 🆘 PLAN DE SECOURS SI HEYGEN PLANTE

- **Synthesia** : équivalent direct, qualité similaire, plan Starter 30 $/mois.
- **D-ID** : meilleur pour photo statique animée, qualité inférieure.
- **Captions.ai** : pour mobile uniquement.

---

*Fin du fichier 04 — HeyGen avatar · v1.0.0-BETA*
