# 06 — Guide clonage voix Bruno (ElevenLabs Professional Voice Cloning)

**Pour Bruno (toi).** Procédure pas-à-pas, ~45 min de ton temps, à faire une seule fois. Résultat : ta voix réplique fidèle, exploitable en 28 langues avec la même empreinte vocale (timbre, débit, calme).

---

## 1. Pourquoi Professional Voice Cloning (PVC) plutôt qu'Instant ?

| Critère | Instant (IVC) | **Professional (PVC)** ✅ |
|---------|---------------|---------------------------|
| Échantillon requis | 1 à 3 min | 30 min — 3 h (idéal 5-10 min minimum exploitable) |
| Qualité timbre | Bon | **Excellent — quasi indiscernable** |
| Stabilité long texte | Moyenne | **Élevée** |
| Multilingue | OK | **Optimal — même empreinte sur 28 langues** |
| Délai création | < 1 min | 4 — 24 h (entraînement) |
| Prix | Inclus Creator | Inclus Creator (1 voix PVC autorisée) |

**Verdict** : PVC, parce que la voix sert dans 4 apps, 28 langues, des centaines de milliers de minutes potentielles.

---

## 2. Matériel recommandé

| Élément | Recommandation | Alternative low-cost |
|---------|----------------|----------------------|
| **Micro** | Condensateur USB type Audio-Technica AT2020USB+ (~140 €) ou Rode NT-USB Mini (~110 €) | iPhone récent + bonnet anti-pop maison (qualité honorable) |
| **Pièce** | Petite, meublée (canapé, livres, rideaux), pas de carrelage | Placard avec vêtements (très bonne absorption) |
| **Distance bouche-micro** | 15-20 cm, légèrement décalé | idem |
| **Filtre anti-pop** | Mousse + bonnet | bas en nylon tendu sur cintre |
| **Logiciel** | Audacity (gratuit) ou GarageBand | Voice Memos iPhone (en WAV uncompressed si possible) |

---

## 3. Préparation de l'échantillon — script à lire (5-10 min, lecture posée)

> **Consigne de ton** : sérénité, calme, posé. Ne pas sur-jouer. Comme tu parles à un ami pendant un café face à la mer. Respirer entre les phrases.

### Bloc FR (≈ 4 min lecture posée)

```
Je suis Bruno Mark Partouche. J'ai grandi entre la mer et les marchés.
Ma voix porte deux héritages : la patience d'un skipper qui attend la bonne vague,
et la rigueur d'un homme qui lit les chiffres comme d'autres lisent les nuages.

Ici, à NAVLYS, on ne te promet rien.
On t'apprend à lire la mer.
Personne ne peut backtester l'avenir, mais on peut éclairer le passé,
et te donner les bons outils pour décider.

Je ne suis pas conseiller financier. Je ne suis pas CIF, je ne suis pas ORIAS.
NAVLYS est un média pédagogique, comme un blog sérieux ou une chaîne YouTube spécialisée.
La décision reste la tienne. Toujours.

Quand je parle, j'aime les images simples.
Un portefeuille, c'est un voilier.
Le marché, c'est la mer.
Toi, tu es le skipper. NAV IA, c'est juste la boussole.

La méthode NEXT GEN, c'est neuf parts de socle solide pour une part d'audace.
Quatre-vingt-dix-dix. Tu protèges, et tu explores.
Cinq cents euros bien gérés valent mieux que cinq mille perdus dans le bruit.

Si tu veux, on continue ensemble. Doucement. Sans précipitation.
Le bon cap, c'est celui qu'on choisit lucidement.
```

### Bloc EN (≈ 3 min)

```
My name is Bruno Mark Partouche. I grew up between the sea and the markets.
My voice carries two legacies — the patience of a sailor who waits for the right wave,
and the discipline of a man who reads numbers the way others read clouds.

At NAVLYS, we promise nothing.
We teach you to read the sea.
Nobody can backtest the future — but we can illuminate the past
and give you the tools to decide.

I am not a financial advisor. I am not CIF, I am not ORIAS.
NAVLYS is a learning media — like a serious blog or a specialized YouTube channel.
The decision stays yours. Always.
```

### Échantillons multilingues (1 min — optionnel mais recommandé)

Lire à voix neutre, ton posé :
- **Espagnol** : « Soy Bruno. Aquí, no te prometemos nada — te enseñamos a leer el mar. »
- **Italien** : « Sono Bruno. Qui non ti promettiamo nulla — ti insegniamo a leggere il mare. »
- **Allemand** : « Ich bin Bruno. Hier versprechen wir dir nichts — wir bringen dir bei, das Meer zu lesen. »
- **Arabe** : « أنا برونو. هنا لا نَعِدُك بشيء — نُعلِّمُك كيف تقرأ البحر. »
- **Hébreu** : « אני ברונו. כאן אנחנו לא מבטיחים לך כלום — אנחנו מלמדים אותך לקרוא את הים. »

> Objectif : ces 28 lignes courtes en différentes langues donnent à ElevenLabs des marqueurs phonétiques pour préserver ton timbre à travers les langues.

---

## 4. Réglages d'enregistrement

| Paramètre | Valeur |
|-----------|--------|
| Format | **WAV 24-bit PCM** (pas MP3) |
| Sample rate | **44.1 kHz** (ou 48 kHz) |
| Mono / Stéréo | **Mono** (1 canal) |
| Niveau cible | -12 dBFS à -6 dBFS (jamais > -3 dBFS) |
| Bruit de fond | < -50 dB (silence audible mais discret) |
| Pré-écouter avec casque | OUI — détecter clics/pops |

**Routine** :
1. Faire un *room tone* (silence 10 s) au début.
2. Lire chaque bloc d'une traite ; en cas de bafouillage, reprendre la phrase entière.
3. Couper les hésitations longues à la fin dans Audacity (Effect → Truncate Silence).
4. Exporter en **un seul fichier WAV** par bloc (FR, EN, multilingue) ou tout concaténé.

---

## 5. Procédure ElevenLabs (étape par étape)

1. **Créer le compte Creator (22 €/mois)** sur https://elevenlabs.io/pricing
   - S'inscrire avec `bruno@navlys.com`.
   - Activer 2FA immédiatement.
2. **Voice Lab** → bouton *Add Voice* → **Professional Voice Cloning**.
3. **Consentement** : accepter le `Voice Cloning Agreement` (cf. doc 08).
4. **Upload** des fichiers WAV (3 fichiers maximum sur Creator).
5. **Nom de voix** : `Bruno Mark Partouche — Officiel NAVLYS`.
6. **Description** : `Voix officielle Bruno Partouche, ton serein/calme/posé, usage exclusif écosystème NAVLYS.`
7. **Labels** : `serene`, `calm`, `mature`, `confident`, `narrator`.
8. **Submit** → entraînement 4 — 24 h. Email de confirmation à la fin.
9. **Récupérer le `VOICE_ID`** dans `Voice Lab > Bruno Mark Partouche > Voice ID` (format `xxxxxxxxxxxxxxxxxxxx`).
10. **Backup** : copier dans `_VOIX_BRUNO_OFFICIEL.md` + Vercel env var `ELEVENLABS_VOICE_ID_BRUNO`.

---

## 6. Validation A/B (à faire une fois la voix prête)

Générer ces 5 phrases via API et comparer à ton vrai timbre :

```ts
// scripts/voice-ab-test.ts
import { synthesizeBlocking } from '../lib/voice/elevenlabs';
import fs from 'node:fs/promises';

const PHRASES = [
  { id: 'fr-1', lang: 'fr', text: "Bienvenue à bord. Ici on ne te promet rien." },
  { id: 'fr-2', lang: 'fr', text: "La méthode 90/10 : neuf parts de socle, une part d'audace." },
  { id: 'en-1', lang: 'en', text: "Welcome aboard. We don't promise anything." },
  { id: 'es-1', lang: 'es', text: "Bienvenido a bordo. Aquí no te prometemos nada." },
  { id: 'ar-1', lang: 'ar', text: "أهلًا بك على متن السفينة. هنا لا نَعِدُك بشيء." },
];

for (const p of PHRASES) {
  const buf = await synthesizeBlocking(p.text, p.lang);
  await fs.writeFile(`ab/${p.id}.mp3`, buf);
  console.log(`✓ ${p.id}`);
}
```

**Critères d'acceptation** :
- Timbre reconnaissable à l'écoute aveugle (> 8/10).
- Pas d'accent étranger sur les langues testées.
- Calme et posé (pas de tension).
- Pas d'artefacts (clics, métallique, robotique).

Si KO → ajuster réglages §7 et regénérer, ou ajouter 5-10 min de samples supplémentaires.

---

## 7. Settings recommandés finaux (figés)

| Paramètre | Valeur | Effet |
|-----------|--------|-------|
| `stability` | **0.55** | équilibre entre variation expressive et constance |
| `similarity_boost` | **0.85** | proximité maximale au timbre original |
| `style` | **0.30** | tonalité posée, peu d'emphase théâtrale |
| `use_speaker_boost` | **true** | amélioration clarté |
| `model_id` | `eleven_multilingual_v2` | 28 langues, qualité 24 kHz |
| `output_format` | `mp3_44100_128` | qualité radio, taille raisonnable |

Ces valeurs sont **figées dans `lib/voice/elevenlabs.ts`** — toute modification doit passer par une revue A/B.

---

## 8. Sauvegarde & sécurité

- **WAV originaux** : zipper et déposer dans `_SITES_MASTER/_VOIX_BRUNO_v1/_SAMPLES_ORIGINAUX/` (à conserver hors Git public — placer en `.gitignore`).
- **VOICE_ID** : noter dans `_VOIX_BRUNO_OFFICIEL.md` + sauvegarde 1Password / Bitwarden.
- **API Key ElevenLabs** : Vercel env var **uniquement**. Rotation tous les 90 jours.
- **Consentement signé numériquement** : conserver le PDF (cf. doc 08).
