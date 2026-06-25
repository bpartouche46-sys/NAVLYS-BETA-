# 💼 NAVBIO LIVE — v3 · Quotas verrouillés (Claude + fal.ai uniquement)

> Dépt 07 R&D · 25 mai 2026 · **Supersède v1 et v2.** Décisions Bruno : Whisper OUT (voix navigateur), alarme 50 %, formule 3 = cible.
> Hypothèse marge : Bruno assujetti à la TVA française 20 %. Si auto-entrepreneur sans TVA → ajouter +20 % à toutes les marges.

---

## 1. Architecture FINALE (2 partenaires, point.)

| Brique | Partenaire | Rôle |
|---|---|---|
| 🥇 **Récit + orchestration** | **Anthropic Claude API** (Sonnet) | Reformule, raconte, change ton/personne, pilote fal automatiquement. |
| 🥈 **Médias (image/vidéo/musique)** | **fal.ai** (FLUX, Kling, Luma, Suno…) | Anime photos, crée vidéos, génère musique. |
| 🎤 **Voix** | **Navigateur natif** (Web Speech API) | Le client parle, le navigateur transcrit, **il valide chaque ligne avant envoi**. Zéro coût API, zéro fuite. |

**Whisper / OpenAI = supprimé.** Économie : ~5 €/mois/abonné actif + simplicité. ⚓

---

## 2. Les 3 formules — quotas FIN, durées précises

### 🥉 Formule 1 — Découverte · 39 €/mois TTC

**Net Bruno après TVA + Stripe ≈ 31,20 €**

| Quota mensuel | Précis |
|---|---|
| Récit Claude (texte, style, voix narrative) | **illimité raisonnable** (300 k tokens/mois) |
| **Photos animées** (Ken Burns, lumière, particules) | **15 / mois** · durée fixe **3 s** chacune · 720p |
| **Vidéos courtes IA** (image-to-video) | **3 / mois** · durée **3 s max** chacune · 720p |
| Musique générée (Suno via fal) | 2 / mois (max 30 s chacune) |
| **Limite d'entrée client** | 200 photos · 10 vidéos perso · 50 documents (PDF/scans) |
| Stockage | 5 Go |
| Export | basse déf. + watermark NAVBIO |

**Coût API estimé** : **~9,50 €** · **Marge nette : ~21,70 € = 69,5 %** ✅

---

### 🥈 Formule 2 — Mémoire · 149 €/mois TTC

**Net Bruno après TVA + Stripe ≈ 120 €**

| Quota mensuel | Précis |
|---|---|
| Récit Claude | **illimité** |
| **Photos animées** | **25 / mois** · durée **3 s** · HD 1080p |
| **Vidéos courtes IA** | **10 / mois** · durée **5 s max** · HD 1080p |
| **Vidéos longues IA** | **5 / mois** · durée **8 s max** chacune · HD 1080p |
| Musique générée | 4 / mois (max 60 s) |
| **Limite d'entrée client** | 1 000 photos · 50 vidéos perso · 500 documents |
| Stockage | 20 Go |
| Export | HD sans watermark |

**Coût API estimé** : **~53,20 €** · **Marge nette : ~66,80 € = 55,7 %** ✅

---

### 🥇 Formule 3 — Héritage · 299 €/mois TTC ★ **TA FORMULE**

**Net Bruno après TVA + Stripe ≈ 240 €**

| Quota mensuel | Précis |
|---|---|
| Récit Claude | **illimité** |
| **Photos animées** | **30 / mois** · durée **5 s** · HD 1080p |
| **Vidéos courtes IA** | **12 / mois** · durée **5 s max** · HD 1080p |
| **Vidéos longues IA** | **6 / mois** · durée **10 s max** · HD 1080p |
| **Vidéos premium Veo** (qualité cinéma) | **2 / mois** · durée **8 s** · 1080p ou 4K |
| Musique générée | 8 / mois (max 90 s) |
| **Limite d'entrée client** | 5 000 photos · 500 vidéos perso · 5 000 documents (illimité raisonnable) |
| Stockage | 100 Go |
| Export | HD/4K sans watermark + bonus livre annuel imprimé (option hors API) |

**Coût API estimé** : **~97,80 €** · **Marge nette : ~142,20 € = 59,3 %** ✅

---

## 3. Récap pourcentage de coût par client (la vraie marge)

| Formule | Prix TTC | Net Bruno | Coût API | **Coût en %** | **Marge nette** |
|---|---|---|---|---|---|
| 🥉 Découverte 39 € | 39,00 | 31,20 | 9,50 | **30,4 %** | **69,5 %** |
| 🥈 Mémoire 149 € | 149,00 | 120,00 | 53,20 | **44,3 %** | **55,7 %** |
| 🥇 **Héritage 299 €** ★ | 299,00 | 240,00 | 97,80 | **40,8 %** | **59,3 %** |

**Toutes les formules sous le plafond 50 % API** (ton alarme se déclenchera avant l'épuisement). Marges saines.

---

## 4. Les durées en clair (pour le client, page de vente)

- **« Vidéo courte »** = 3 secondes (F1) ou 5 secondes (F2/F3). Idéal pour animer un souvenir, une photo, un visage.
- **« Vidéo longue »** = 8 secondes (F2) ou 10 secondes (F3). Idéal pour raconter un moment, un événement.
- **« Vidéo premium »** (F3 uniquement) = 8 secondes en qualité cinéma Veo. Réservé aux pièces maîtresses (mariage, naissance, voyage marquant).

Au-delà = upgrade gentil au tier supérieur, ou pack de crédits à la carte (post-MVP).

---

## 5. Limites d'entrée client (combien il peut uploader)

| | F1 | F2 | **F3** |
|---|---|---|---|
| Photos sources | 200 | 1 000 | **5 000** |
| Vidéos perso | 10 | 50 | **500** |
| Documents (PDF/scans/diplômes/cartes…) | 50 | 500 | **5 000** |
| Stockage total | 5 Go | 20 Go | **100 Go** |

Ces limites évitent l'abus et l'explosion serveur, jamais le client de bonne foi ne les atteint avant des années.

---

## 6. La voie F3 + scaling

**F3 est la formule cible.** À mesure que le succès vient :
- **Crédits startup** Anthropic + fal.ai (~150 k$ Azure si Microsoft for Startups) → tes coûts effectifs baissent.
- **Volume tier discount** chez fal au-delà de $1 k/mois → -10 à -25 %.
- À 100 abonnés F3 → MRR ≈ 24 000 €/mois ≈ 288 000 €/an. Marge brute ≈ 170 000 €/an.
- Évolutions produit : F4 « Saga » (599 €) avec vidéos > 15 s, sortie livre premium relié.

**Plan progressif** (ton roadmap implicite) :
1. **Mois 1-3** : Bruno teste F1 → F2 → F3 successivement, on calibre.
2. **Mois 3** : ouverture F3 grand public, F1/F2 en backup acquisition.
3. **Mois 6** : candidature crédits startup, négociation volume.
4. **Mois 12** : F4 premium si la demande émerge.

---

## 7. Cockpit admin — alarmes et garde-fous (rappel)
- 🟢 0-49 % budget = vert · 🟠 50-79 % = alarme orange (ping Bruno) · 🔴 80 %+ = coupure douce médias (récit reste actif).
- Détail par partenaire (Claude / fal) et par abonné.
- Bouton « stop médias » d'urgence.

---

## 8. Confirmation décisions
- ✅ Architecture : Claude + fal.ai (Whisper out, voix navigateur).
- ✅ Alarme 50 % gravée.
- ✅ Quotas + durées + limites entrée définis (§ 2 et 5).
- ⏳ Bruno valide F3 = cible (réponse attendue : "OK F3").
- ⏳ Bruno fournit clés Anthropic + fal.ai → Dépt 06 met en ENV.

---
> *« Un cap, une main, un jour — un récit chaud, un clic propre. »*
> ⚠️ NAVBIO partage des informations de bien-être et accompagne ton récit de vie. Pas un avis médical. Prix API = ordres de grandeur mai 2026, à revalider avant signature.
