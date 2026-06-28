# 05 — SCRIPT ELEVENLABS · VOIX BRUNO EN 12 LANGUES
> Génération studio voice clone, qualité broadcast.
> Plan recommandé : **ElevenLabs Creator** (22 $/mois) — donne accès au voice cloning + multilingual v2.

---

## 🎙️ PRÉ-REQUIS ELEVENLABS

| Item | État | Comment vérifier |
|---|---|---|
| Plan actif | Creator ou supérieur | elevenlabs.io/subscription |
| Voice clone Bruno | Validé | Voice Library → Cloned voices |
| Crédits caractères | ≥ 15 000 | top-right counter |
| Multilingual v2 activé | OK par défaut sur Creator | Settings → Models |

### Comment cloner la voix de Bruno (si pas encore fait)

1. Aller sur elevenlabs.io → Voice Lab → Add Voice → **Instant Voice Cloning**.
2. Uploader **3 fichiers WAV de Bruno** : 30 s à 1 min chacun. Qualité broadcast (micro Rode), pas d'écho, pas de musique de fond.
3. Nommer la voix `Bruno_FR_NAVLYS_v1`.
4. Cocher *« Use for multilingual generation »*.
5. Le clone est immédiat (< 1 min).

### Fichiers source recommandés
- Bruno lisant un texte neutre (5 paragraphes du Press Kit, ton posé).
- Bruno racontant un souvenir maritime (registre familier).
- Bruno expliquant la méthode 90/10 (registre pédagogique).

---

## ⚙️ RÉGLAGES VOIX (à appliquer à chaque génération)

| Paramètre | Valeur | Raison |
|---|---|---|
| **Stability** | **0.50** | Équilibre expressif/cohérent. Plus bas = trop variable, plus haut = monotone. |
| **Similarity Boost** | **0.80** | Très proche du clone Bruno. |
| **Style Exaggeration** | **0.30** | Légère emphase sans surcharge. |
| **Speaker Boost** | **ON** | Renforce les caractéristiques distinctives de Bruno. |
| **Model** | **Eleven Multilingual v2** | Le seul à supporter les 12 langues avec lip-sync correct. |
| **Sample Rate** | **44.1 kHz** | Standard broadcast. |
| **Output Format** | **MP3 192 kbps + WAV 24-bit** | MP3 pour upload web, WAV pour montage. |

---

## 🌍 LES 12 LANGUES — TEXTE À COLLER DANS ELEVENLABS

> ⚠️ **Avant chaque génération** : vérifier que la voix clone Bruno est sélectionnée ET le model `Eleven Multilingual v2`.
> Tous les textes ci-dessous correspondent à la **Version A 25 s** (cf. fichier 01). Pour générer B (32 s) et C (18 s), reprendre les textes du fichier 01 et appliquer le même process.

### 🇫🇷 FR — Master, naturel posé

```
NAVLYS point IO, c'est quoi ?

Aujourd'hui, votre téléphone gère votre argent.
Il écrit votre avenir.
Il vous fait remonter le temps. Il construit votre rêve.

Sans bouger de chez vous. Avec votre voix. Avec des mots simples.

Votre vie : un havre. Le secret tient là.
```

**Settings** : Stability 0.50 / Similarity 0.80 / Style 0.30.
**Nom fichier export** : `NAVLYS_voix_FR_versionA_master.wav` + `.mp3`.

---

### 🇬🇧 EN — International, légèrement énergique

```
NAVLYS dot I O — what is it?

Today, your phone runs your money.
It writes your future.
It rewinds your past. It builds your dream.

Without leaving home. With your voice. With simple words.

Your life: a haven. The secret is right there.
```

**Settings** : Stability 0.45 / Similarity 0.80 / Style 0.40 (légèrement plus expressif que FR).
**Nom fichier** : `NAVLYS_voix_EN_versionA.wav` + `.mp3`.

---

### 🇷🇺 RU — Chaleureux pour Lera / Rivka / Serjio

```
NAVLYS точка IO — что это?

Сегодня ваш телефон управляет вашими деньгами.
Он пишет ваше будущее.
Он возвращает вас в прошлое. Он строит вашу мечту.

Не выходя из дома. Вашим голосом. Простыми словами.

Ваша жизнь — это гавань. Секрет здесь.
```

**Settings** : Stability 0.55 / Similarity 0.80 / Style 0.25 (ton plus posé pour le russe).
**Nom fichier** : `NAVLYS_voix_RU_versionA.wav` + `.mp3`.

---

### 🇪🇸 ES — LATAM neutre (utilisable Espagne + Amérique latine)

```
NAVLYS punto IO — ¿qué es?

Hoy, tu teléfono gestiona tu dinero.
Escribe tu futuro.
Te hace retroceder en el tiempo. Construye tu sueño.

Sin salir de casa. Con tu voz. Con palabras simples.

Tu vida: un refugio. El secreto está ahí.
```

**Settings** : Stability 0.50 / Similarity 0.80 / Style 0.35.
**Nom fichier** : `NAVLYS_voix_ES_versionA.wav` + `.mp3`.

---

### 🇩🇪 DE — Clair professionnel

```
NAVLYS Punkt IO — was ist das?

Heute verwaltet Ihr Telefon Ihr Geld.
Es schreibt Ihre Zukunft.
Es lässt Sie in die Vergangenheit zurückkehren. Es baut Ihren Traum.

Ohne das Haus zu verlassen. Mit Ihrer Stimme. Mit einfachen Worten.

Ihr Leben: ein Hafen. Das Geheimnis liegt darin.
```

**Settings** : Stability 0.55 / Similarity 0.80 / Style 0.25 (Allemand = moins de variation, plus structuré).
**Nom fichier** : `NAVLYS_voix_DE_versionA.wav` + `.mp3`.

---

### 🇮🇹 IT — Méditerranéen chaleureux

```
NAVLYS punto IO — cos'è?

Oggi, il tuo telefono gestisce il tuo denaro.
Scrive il tuo futuro.
Ti fa tornare indietro nel tempo. Costruisce il tuo sogno.

Senza muoverti da casa. Con la tua voce. Con parole semplici.

La tua vita: un porto sicuro. Il segreto è proprio lì.
```

**Settings** : Stability 0.45 / Similarity 0.80 / Style 0.40 (méditerranéen = plus expressif).
**Nom fichier** : `NAVLYS_voix_IT_versionA.wav` + `.mp3`.

---

### 🇳🇱 NL — Calme

```
NAVLYS punt IO — wat is dat?

Vandaag beheert uw telefoon uw geld.
Het schrijft uw toekomst.
Het brengt u terug in de tijd. Het bouwt uw droom.

Zonder uw huis te verlaten. Met uw stem. Met eenvoudige woorden.

Uw leven: een veilige haven. Het geheim ligt daar.
```

**Settings** : Stability 0.55 / Similarity 0.80 / Style 0.25.
**Nom fichier** : `NAVLYS_voix_NL_versionA.wav` + `.mp3`.

---

### 🇧🇷 PT-BR — Vivant

```
NAVLYS ponto IO — o que é?

Hoje, seu telefone administra seu dinheiro.
Ele escreve seu futuro.
Ele te leva de volta ao passado. Ele constrói seu sonho.

Sem sair de casa. Com sua voz. Com palavras simples.

Sua vida: um refúgio. O segredo está aí.
```

**Settings** : Stability 0.45 / Similarity 0.80 / Style 0.40.
**Nom fichier** : `NAVLYS_voix_PTBR_versionA.wav` + `.mp3`.

---

### 🇸🇦 AR — Formel (arabe standard moderne MSA)

```
NAVLYS نقطة IO — ما هو؟

اليوم، هاتفك يدير أموالك.
يكتب مستقبلك.
يعيدك إلى الماضي. يبني حلمك.

دون مغادرة منزلك. بصوتك. بكلمات بسيطة.

حياتك: ملاذ. السر هنا.
```

**Settings** : Stability 0.60 / Similarity 0.80 / Style 0.20 (arabe formel = très posé, peu d'emphase).
**Vitesse** : −10 % en post-prod (l'arabe est dense, les syllabes longues).
**Nom fichier** : `NAVLYS_voix_AR_versionA.wav` + `.mp3`.

---

### 🇮🇱 HE — Familier Israël

```
NAVLYS נקודה IO — מה זה?

היום, הטלפון שלך מנהל את הכסף שלך.
הוא כותב את העתיד שלך.
הוא מחזיר אותך לעבר. הוא בונה את החלום שלך.

בלי לצאת מהבית. בקול שלך. במילים פשוטות.

החיים שלך: מקום מבטחים. הסוד נמצא כאן.
```

**Settings** : Stability 0.50 / Similarity 0.80 / Style 0.30.
**Nom fichier** : `NAVLYS_voix_HE_versionA.wav` + `.mp3`.

---

### 🇨🇳 ZH — Clair (mandarin standard)

```
NAVLYS 点 IO — 是什么？

今天，您的手机管理您的资金。
它书写您的未来。
它带您回到过去。它构建您的梦想。

无需离开家。用您的声音。用简单的话语。

您的生活：一个避风港。秘密就在这里。
```

**Settings** : Stability 0.55 / Similarity 0.80 / Style 0.25.
**Vitesse** : −5 % en post-prod (le mandarin clean a tendance à filer).
**Nom fichier** : `NAVLYS_voix_ZH_versionA.wav` + `.mp3`.

---

### 🇯🇵 JA — Poli

```
NAVLYS ドット I O とは何ですか？

今日、あなたの電話があなたのお金を管理します。
それはあなたの未来を書きます。
それはあなたを過去に戻します。それはあなたの夢を築きます。

家を出ることなく。あなたの声で。簡単な言葉で。

あなたの人生：港。秘密はそこにあります。
```

**Settings** : Stability 0.60 / Similarity 0.80 / Style 0.20 (japonais poli = très posé).
**Vitesse** : −8 % en post-prod (le japonais a besoin de respirations entre syllabes).
**Nom fichier** : `NAVLYS_voix_JA_versionA.wav` + `.mp3`.

---

## 🔁 WORKFLOW BATCH 12 LANGUES

### Étape par étape
1. Ouvrir elevenlabs.io → Speech Synthesis.
2. Sélectionner voix `Bruno_FR_NAVLYS_v1`.
3. Sélectionner model `Eleven Multilingual v2`.
4. Coller le texte FR.
5. Cliquer **Generate**.
6. Écouter intégralement.
7. Si OK → Download MP3 + WAV.
8. Passer à la langue suivante.
9. Répéter 11 fois.

**Temps total batch 12 langues** : ~45 minutes (génération + écoute contrôle).

---

## 💰 COÛT ELEVENLABS

| Plan | Coût/mois | Crédits | Suffit pour ce projet ? |
|---|---|---|---|
| Free | 0 $ | 10 000 char | ❌ Trop court |
| **Starter** | **5 $** | 30 000 char | ✅ OK pour 1 langue, étroit pour 12 |
| **Creator** | **22 $** | 100 000 char | ✅✅ **Recommandé**, voice cloning + multilingue |
| Pro | 99 $ | 500 000 char | overkill |

**12 langues × 60 mots × 6 caractères = ~4 320 caractères**. Le plan Starter suffit. Mais Creator donne le voice cloning natif → 22 $ est l'investissement réel.

---

## ✅ CHECKLIST QUALITÉ (par fichier généré)

- [ ] Voix reconnaissable comme Bruno (similarity > 80%).
- [ ] Aucun glitch audio (claquements, échos métalliques).
- [ ] Prononciation correcte des marques (NAVLYS, NAVLYS.IO).
- [ ] Aucune erreur G1 (jamais « conseil personnalisé », « rendement garanti »).
- [ ] Tonalité conforme au registre voulu (posée FR, expressive IT, formelle AR).
- [ ] Durée totale ~25 s (max 26 s pour la version A).

---

## 🆘 PLAN DE SECOURS SI ELEVENLABS PLANTE

- **Murf.ai** : qualité voice cloning légèrement inférieure mais fiable, 24 $/mois.
- **Play.ht** : équivalent, prix similaire.
- **Resemble.ai** : pro, plus cher mais lip-sync excellent.

---

*Fin du fichier 05 — ElevenLabs 12 langues · v1.0.0-BETA*
