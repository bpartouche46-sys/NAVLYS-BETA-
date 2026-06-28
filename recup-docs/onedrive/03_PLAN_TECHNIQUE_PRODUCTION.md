# 03 — PLAN TECHNIQUE DE PRODUCTION
> Configuration matérielle complète, prête à l'exécution, validée pour rendu cinéma 4K.

---

## 🎥 CAMÉRA

### Option A — Recommandée à coût zéro
**iPhone 15 Pro / 16 Pro** (Bruno l'a déjà)
- Mode : **ProRes Log 4K 24 fps** (réglage natif iOS Caméra → Format → ProRes Log).
- Stockage : SSD externe SanDisk Pro G40 1 TB connecté USB-C (obligatoire en ProRes — ne s'enregistre pas en interne).
- App : Blackmagic Camera (gratuite) pour contrôle ISO/shutter manuel et false color.
- ISO base : 100 · Shutter : 1/50 (24 fps × 2.08).

### Option B — Si tournage pro
**Sony A7 IV** ou **Canon R6 Mark II**
- 4K 24p, profil **S-Log3** (Sony) ou **C-Log 3** (Canon).
- Pré-réglage LUT bronze chaud disponible en post.

### Option C — Si avatar HeyGen (cf. fichier 04)
Aucune caméra. Skip cette section.

---

## 🔍 OBJECTIF

| Choix | Équivalence 35mm | Pourquoi |
|---|---|---|
| **iPhone 15 Pro caméra 2× (48 mm équiv.)** | 48 mm | Le mieux pour close-up sans déformation. **Recommandé pour Bruno.** |
| Sony 35mm f/1.8 | 35 mm | Plan large + portrait équilibré. |
| Sony 55mm f/1.8 Zeiss | 55 mm | Close-up bokeh propre, signature cinéma. |
| Canon RF 50mm f/1.8 | 50 mm | Économique, propre, parfait portrait. |

**Ouverture cible** : f/2.8 à f/4 (pour garder Bruno + téléphone tous deux nets).

---

## 🎙️ AUDIO (priorité absolue — voix Bruno = produit)

### Setup recommandé (≈ 200 €)
- **Micro cravate** : Rode Wireless GO II (kit complet, deux émetteurs + récepteur) **OU** Rode SmartLav+ filaire (50 €) si budget zéro.
- **Enregistreur backup** : Zoom H5 ou H6 (si dispo) en sécurité doublure.
- **Position lavalier** : caché sous le col de chemise, capsule à 20 cm de la bouche.
- **Surveillance** : casque fermé Sony MDR-7506 sur la sortie casque du récepteur pendant le tournage.

### Réglages micro
- **Gain** : −12 dB peaks, jamais clipping. Test « 1-2-3, NAVLYS » avant prise 1.
- **Format enregistrement** : WAV 48 kHz 24-bit.
- **Bonus** : enregistrer 30 s de **room tone** (silence ambiant) en début et fin de séance pour rebouchage montage.

### Setup ultra-budget (0 €)
- Micro intégré iPhone si **personne ne respire à moins de 3 m**. Sinon, échec garanti.
- Toujours faire un test de 10 s relu casque avant la première vraie prise.

---

## 💡 ÉCLAIRAGE (3 sources)

### Schéma à 45°

```
                  ╔═══╗
                  ║ K ║   ← Key light 45° gauche, 3200 K, soft
                  ╚═══╝
                     ↓
         ┌─────────────────────┐
         │       BRUNO         │
         │     (face caméra)   │
         │   Table + phone     │
         └─────────────────────┘
                     ↑
                  ╔═══╗
                  ║ R ║   ← Rim light contre-jour 300 W tungstène
                  ╚═══╝   bronze chaud, derrière + au-dessus

       (fenêtre nord en fill latéral droit, soft naturel)
```

### Matériel
| Rôle | Modèle | Watts / output | Distance Bruno |
|---|---|---|---|
| **Key light** | Aputure Amaran 100D + softbox 80×80 cm | 100 W LED, 3200 K | 1.5 m |
| **Alternative key** | Falcon Eyes RX-18T flexible | 50 W LED bicolore | 1.2 m |
| **Fill (naturel)** | Fenêtre nord, voilage blanc | lumière diffuse jour | 2 m |
| **Rim (contre-jour)** | Ampoule tungstène 300 W ou Aputure F7 | 300 W tungstène ou 9 W LED 3000 K | 2 m derrière, 1.8 m hauteur |
| **Point halo bronze** | Petite ampoule Edison nue ou Govee bulb 100lm | ambiant 2200 K | hors champ haut-droite |

### Réglages
- Ratio key/fill = 3:1 (contraste cinéma doux).
- Rim light visible comme **trait doré** sur l'épaule et l'arrière du crâne de Bruno.
- **Mesure white balance** : carte grise présentée 5 s à la caméra avant prise 1.

---

## 🎢 DOLLY / MOUVEMENT CAMÉRA

### Option A — Smartphone (recommandée)
**DJI Osmo Mobile 6** ou **Insta360 Flow** (~150 €)
- Mode : **ActiveTrack 6.0** désactivé. Mouvement manuel uniquement.
- Trajectoire : avancer en marche arrière régulière de 1.20 m à 0.60 m sur 25 s.
- Stabilisation : gimbal niveau 3.
- **Astuce** : tracer 4 marques au sol (gaffer tape) aux points 0/8/16/25 s pour repère.

### Option B — Slider motorisé
**Edelkrone SliderPLUS Compact** ou **Zhiyun Slider** (~400 €)
- Course : 60 cm.
- Vitesse programmée : 60 cm en 25 s = 2.4 cm/s constant.
- Avantage : régularité parfaite ; le dolly se reproduit prise après prise.

### Option C — Trépied + cameraman (DIY)
Simplement marcher en arrière avec le trépied dans les mains. Acceptable si gimbal indispo. Demande 5 prises pour en avoir 1 bonne.

---

## 🪑 DÉCOR

| Élément | Spec | Source |
|---|---|---|
| **Table** | Rectangulaire, 80 × 140 cm minimum, surface mate, bois clair (chêne, hêtre) OU laminé noir mat | meuble existant ou location 30 € |
| **Fond** | Toile noire ou mur peint noir profond `#02040a` | toile photo 3×3 m chez Amazon 50 € ou simple mur |
| **Téléphone** | iPhone visible (cohérence vendeur du futur) ou modèle neutre | celui de Bruno |
| **Point de lumière dorée** | Ampoule chaude 25 W, ou Govee Bulb 2200 K mode statique | déjà cité supra |
| **Aucun objet parasite** | Pas de verre, pas de carnet, pas de cendrier, pas de bibelot |

### Mise en scène
- Bruno assis sur **chaise neutre** (dossier bas, pas visible dans le cadre).
- Téléphone posé à **22 cm devant Bruno** centré (mesuré).
- Distance Bruno ↔ fond : **1.20 m** minimum (évite l'ombre portée).

---

## 👔 STYLING BRUNO

| Élément | Choix | Raison |
|---|---|---|
| Chemise | Unie, bleu nuit ou anthracite, col italien | aucun motif qui moire à la caméra |
| Pas de cravate | — | reste informel, registre maritime décontracté |
| Pas de bijoux visibles | enlever chevalière, montre, bracelet | aucun reflet parasite |
| Cheveux | Coiffés sobrement | pas de mouvement qui distrait |
| Maquillage | Anti-brillance front + nez (poudre mat HD) | éviter reflets sous key light |
| Manucure | Ongles propres et courts | mains très visibles plans 3-5 |

**Coût total styling** : 0 € (Bruno possède déjà tout, sauf éventuellement poudre mat 8 €).

---

## 📋 FICHE DE TOURNAGE (à imprimer pour le set)

```
☐ Carte SD/SSD formatée
☐ Batterie caméra 100 % + 1 batterie spare chargée
☐ Batterie micro 100 % + piles AA spare
☐ Casque audio branché et testé
☐ White balance carte grise faite
☐ False color OK (peaux dans 60-70 IRE)
☐ Audio test : -12 dB peaks
☐ Repères dolly au sol marqués
☐ Téléphone Bruno chargé, écran NAVLYS pré-affiché
☐ Room tone 30 s enregistré (silence)
☐ Numéro de prise annoncé verbalement par le clap
☐ Backup audio Zoom déclenché (si dispo)
```

---

## 💰 COÛT TOTAL DE PRODUCTION (vue d'ensemble)

### Scénario A — Bruno tourne en autonomie avec iPhone (recommandé)
| Poste | Prix |
|---|---|
| iPhone 15 Pro (déjà possédé) | 0 € |
| Gimbal DJI Osmo Mobile 6 | 150 € (location 30 €/jour si pas envie d'acheter) |
| Micro Rode Wireless GO II | 290 € (location 40 €/jour) |
| Key light Aputure Amaran 100D + softbox | 250 € (ou location 35 €/jour) |
| Ampoule rim warm + douille | 25 € |
| Toile fond noir 3×3 m | 50 € |
| Poudre mat anti-brillance HD | 8 € |
| **Total location 1 journée** | **~150 €** |
| **Total achat permanent kit** | **~770 €** |

### Scénario B — Studio loué (Tel Aviv, Paris ou Cassis)
| Poste | Prix |
|---|---|
| Studio 4h avec opérateur | 400–800 € |
| Maquilleur/sound recordist | inclus |
| **Total** | **~600 €** |

### Scénario C — 100% HeyGen + ElevenLabs (cf. fichiers 04 & 05)
| Poste | Prix |
|---|---|
| HeyGen Creator plan (avatar clone) | 29 €/mois |
| ElevenLabs Creator (voice clone) | 22 €/mois |
| **Total** | **~50 €/mois** (déjà payé si abonnements actifs) |

---

## ⚖️ DÉCISION RECOMMANDÉE

**Si Bruno peut filmer en autonomie demain** → Scénario A à 150 € de location, qualité 95 % cinéma.
**Si Bruno ne peut PAS filmer (déplacement, agenda)** → Scénario C avatar HeyGen, qualité 92 % indiscernable, livrable J+1.

Les deux scénarios sont **compatibles avec le lancement BETA 1ᵉʳ juin minuit Jérusalem**.

---

*Fin du fichier 03 — Plan technique · v1.0.0-BETA*
