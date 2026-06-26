# 🎬 DÉMO NAVBIO — Récit exemple concret pour stupéfaction utilisateur
*Le scénario type à montrer à Bruno demain matin pour valider le moment "wow"*

---

## 👤 PERSONA DE DÉMO — Marie, 62 ans, retraitée

Marie est notre **figure d'égalisation** (Bible NAVLYS Humanité) :
- Elle n'a jamais touché à l'IA
- Elle utilise WhatsApp tous les jours pour ses petits-enfants
- Elle a un iPhone SE et un compte Google Photos rempli depuis 10 ans
- Elle veut **laisser une trace** à ses petits-enfants avant qu'il soit "trop tard"

**Marie = la mère de Bruno + ta mère + chaque grand-parent du monde.**

---

## ⏱ CHRONOMÈTRE — 4 MINUTES 47 SECONDES POUR LA STUPÉFACTION

### `00:00` — Marie arrive sur navbiolife.com (lien envoyé par sa fille via WhatsApp)
**Écran mobile** : médaille bronze NAVBIO qui tourne lentement (rythme calme 13s breathing) + slogan « *Et si vous écriviez le scénario du film de votre propre vie ?* » + 1 bouton bronze : **« 🎬 COMMENCER MON FILM »**

### `00:08` — Marie touche le bouton
Écran : *« Connecte-toi avec ton Google ou ton Apple. Aucune carte bancaire. »* → 2 cartes au choix. Elle tape Google. OAuth, biométrie Face ID, retour app.

### `00:23` — Bienvenue Marie
Voix neutre douce dans le téléphone : *« Bonjour Marie. Pour commencer, choisis comment tu veux me confier tes souvenirs. »*
3 cartes :
- 📱 **WhatsApp** *(envoie-moi sur WhatsApp)*
- 📸 **Galerie** *(sélectionne dans ton téléphone)*
- 🎤 **Voix** *(parle-moi maintenant)*

Marie touche **Galerie**.

### `00:35` — Picker iOS s'ouvre
Marie sélectionne :
- 5 photos : son mariage (1985), son fils bébé (1988), un Noël avec sa mère (1992), la naissance de sa première petite-fille (2010), un voyage à Venise (2018)
- 3 vidéos courtes : sa fille qui joue du piano (2005), un anniversaire de mariage (2015), son chat dormant (2024)
- 2 docs : un poème qu'elle a écrit à 20 ans (PDF scanné), une recette de gâteau de sa grand-mère (photo)

Elle valide. Upload R2 chiffré E2E.

### `01:18` — IA tri automatique
Écran : *« Je classe tes 10 souvenirs par date. C'est bon ? »*
L'IA a lu les EXIF + reconnu les visages + détecté les lieux. Affiche une frise chronologique 1985→2024. Marie touche **« Oui c'est bon »**.

### `01:35` — Question contextuelle (la magie)
Le bot affiche la photo du mariage 1985 et demande **par voix douce** :
*« Marie, raconte-moi cette journée. Qui était là ? Qu'est-ce qui t'a marquée ? »*

Marie appuie sur le micro et parle 30 secondes :
*« C'était le 12 juin 1985, à la mairie de Nice. Mes parents pleuraient. Pierre tremblait. Il a oublié les alliances dans la voiture, mon frère a dû courir... »*

### `02:10` — L'IA enchaîne (5 fois)
Pour chaque photo importante, une question vocale → réponse 20-30 secondes → transcription Whisper en temps réel. Marie n'écrit RIEN.

### `04:00` — Génération
Écran : *« Je crée ton film, ton livre et ta narration. Donne-moi 30 secondes. »*
Animation : médaille bronze qui tourne, particules dorées.

### `04:30` — LE MOMENT "WOW" 🌟

**3 livrables apparaissent simultanément** :

#### 🎬 1. Le film (3 minutes 47)
- Diaporama des 10 médias triés chronologiquement
- Transitions Ken Burns douces
- Musique Pachelbel CC0 en fond
- **Narration audio** : voix neutre douce qui lit le récit biographique généré par Claude à partir des réponses vocales de Marie
- Filigrane "BETA" discret coin bas

#### 📖 2. Le livre (12 pages PDF)
- Couverture bronze NAVBIO : « *La vie de Marie — Tome 1* »
- Chaque souvenir = une double page : photo + récit éditorialisé en français littéraire
- Police Cormorant Garamond pour le récit, Cinzel pour les titres
- Dernière page : « *À mes petits-enfants — pour qu'ils sachent.* »
- Watermark BETA discret en footer

#### 🎙 3. La narration audio seule (MP3, 4 min)
- Pour écouter en voiture ou au lit
- Sera relue par la voix clonée Bruno après J0 (en BETA = voix neutre douce)

### `04:47` — Stupéfaction
Marie regarde son écran. Sa main tremble. Elle appelle sa fille par WhatsApp :
*« Sarah... viens voir... il a fait un film de ma vie en quelques minutes. C'est magnifique. »*

**Mission Bible NAVLYS Humanité accomplie.**

---

## 🎯 CE QUE BRUNO DOIT VOIR ET RESSENTIR DEMAIN MATIN

Quand Bruno teste ce scénario avec **ses propres** photos demain matin :
- Il doit avoir **les larmes aux yeux** (test ultime du moment "wow")
- Il doit ressentir l'**urgence** de partager à sa mère, sa fille, ses amis
- Il doit comprendre que **NAVBIO = mission de vie**, pas un produit SaaS

Si Bruno **ne ressent pas ça**, on retravaille avant J0.

---

## 🔧 ÉLÉMENTS TECHNIQUES À VÉRIFIER

### Backend (Supabase + R2 + Claude + Whisper + ElevenLabs)
- ✅ Upload R2 chiffré client-side (PBKDF2 + AES-256-GCM)
- ✅ Métadonnées EXIF extraites côté client (jamais envoyées en clair au serveur)
- ✅ Reconnaissance faciale en local (TensorFlow.js MobileNetV2)
- ✅ Whisper API pour transcription voix (clé OpenAI ou ElevenLabs STT)
- ✅ Claude Sonnet 4.6 pour génération du récit littéraire (prompt G1 respecté)
- ✅ ElevenLabs Multilingual v2 pour narration audio (voix neutre par défaut, Bruno après J0)
- ✅ FFmpeg WASM pour génération vidéo côté client (ou Cloudflare Workers)
- ✅ PDF généré via Puppeteer Cloud (ou jsPDF côté client)

### Frontend (Next.js 14 + Tailwind + i18n)
- ✅ Mobile-first absolu : test sur iPhone SE (375px) + Samsung A12 (360px)
- ✅ Aucune saisie texte forcée
- ✅ Boutons minimum 56×56px (zone tactile accessible aînés)
- ✅ Police Cormorant Garamond pour les récits, lecture confortable
- ✅ Contraste WCAG AAA respecté
- ✅ Rétro-éclairage Ice Blue `#7DD3FC` sur les CTAs
- ✅ Animations respiration 13s cycle (rythme calme universel NAVLYS)

### G1 garde-fous NAVBIO
- ✅ Pas de promesse "votre histoire vaudra de l'argent"
- ✅ Pas de revendication "thérapeutique" (pas remplaçant un psy)
- ✅ Disclaimer : « *NAVBIO ne remplace pas une biographie professionnelle. C'est une œuvre personnelle.* »
- ✅ Consentement clair pour le partage public (case opt-in décochée par défaut)
- ✅ Droit à l'oubli : bouton "Supprimer tout" qui efface R2 + Supabase en 1 clic

---

## 📤 BOUTON PARTAGE — Effet viral

Après le moment "wow", Marie voit 4 boutons :

```
┌──────────────────────────────────────┐
│  📤 PARTAGER MON FILM                │
├──────────────────────────────────────┤
│  💬 WhatsApp (à mes proches)         │
│  📱 Instagram Stories                │
│  🎵 TikTok                            │
│  🔗 Lien public (avec mot de passe)  │
└──────────────────────────────────────┘
```

Quand Marie partage par WhatsApp à sa fille Sarah, le message pré-rempli est :
> *« Sarah, regarde ce film de ma vie que j'ai fait avec NAVBIO en 5 minutes. C'est un cadeau pour vous. https://nav.bio/m/abc123 »*

**→ Sarah clique le lien → arrive sur navbiolife.com → veut faire le sien → cycle viral.**

---

## 🎁 OFFRE BETA AFFICHÉE À MARIE APRÈS LE WOW

```
┌─────────────────────────────────────────────┐
│  🎁 Tu as utilisé 10/10 souvenirs gratuits  │
│                                             │
│  💎 Réserve ta place pour le lancement      │
│     officiel le 1ᵉʳ juin (notification)     │
│     [Réserver gratuit]                      │
│                                             │
│  ⭐ Ou passe Premium maintenant :            │
│     • 1000 souvenirs                        │
│     • Livre HD sans filigrane               │
│     • Voix Bruno officielle                 │
│     39 € à vie                              │
│     [Passer Premium]                        │
└─────────────────────────────────────────────┘
```

Pas de pression. Pas de pop-up agressive. Choix libre.

---

🎬 *Scénario démo officiel NAVBIO · Le Notaire de Bord · 29 mai 2026 nuit*
