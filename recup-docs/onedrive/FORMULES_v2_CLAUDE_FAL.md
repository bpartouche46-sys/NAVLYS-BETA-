# 💼 NAVBIO LIVE — v2 · Architecture finale + alarme 50 % + styles pré-mâchés

> Dépt 07 R&D · 25 mai 2026 · **Supersède** `FORMULES_LIMITES_COUTS.md` v1 (qui reste pour mémoire/alternative).
> Décisions Bruno intégrées : alarme **50 % max**, **Claude** pour le récit (remplace OpenAI texte), **fal.ai** pour les médias, **prompts pré-mâchés** au choix client ou NAVBIO.

---

## 1. Architecture finale (3 briques, 1 chef d'orchestre)

| Brique | Partenaire | Rôle dans NAVBIO |
|---|---|---|
| 🥇 **Chef d'orchestre + récit** | **Anthropic Claude API** (Sonnet/Opus) | Reformule, raconte, change de personne (1ʳᵉ/2ᵉ/3ᵉ), tutoie/vouvoie, choisit la photo à mettre en avant, **écrit aussi le prompt parfait pour fal**. Contexte 200 k tokens = il garde toute la vie du client en tête. |
| 🥈 **Orchestre média** | **fal.ai** (1 API ↔ FLUX, Nano-Banana, Kling, Runway, Luma, Veo, Suno) | Exécute l'image animée, la vidéo, la musique. Reçoit du Claude un prompt déjà optimisé. |
| 🥉 **Voix → texte (optionnel)** | **OpenAI Whisper** (ou Deepgram) | Quand le client préfère parler, NAVBIO transcrit. ~$0,006/min, marginal. |

**Pas besoin d'OpenAI GPT-4o pour le récit** — Claude le fait mieux en FR, et garantit la cohérence de ton (chaleur + clarté maritime) que tu vois ici.

## 2. Pourquoi Claude pour le récit (avantages concrets)
- **Qualité FR littéraire** — phrases nuancées, métaphores qui tiennent, voix authentique (c'est ce que tu lis ici).
- **Contexte 200 k tokens** = NAVBIO charge **toute la vie du client** d'un coup. Quand il ajoute un souvenir, Claude se souvient déjà du chapitre précédent. Cohérence sur 600 pages possible.
- **Instructions fines** (vouvoiement/tutoiement, 1ʳᵉ/2ᵉ/3ᵉ personne, ton chaleureux/sobre/épique) — Claude les applique avec précision dès le système prompt.
- **Pilote parfaitement fal.ai** : lit le souvenir, comprend l'émotion, génère le prompt média optimal automatiquement. C'est ce qui rend le one-clic vraiment magique.
- **Prix similaire à OpenAI** (~$3/M in, ~$15/M out pour Sonnet — ordre de grandeur).
- **CGU API permettent l'usage commercial et la revente d'output** (à revérifier au moment T).

## 3. Limite honnête à connaître
Claude **ne génère ni pixel, ni note** — c'est volontaire chez Anthropic. Pour les médias, il **faut** fal.ai (ou équivalent). C'est gravé dans la nature du produit. Voilà pourquoi le duo Claude + fal est le meilleur compromis.

## 4. Garde-fous budget — alarme à 50 % (Bruno) 🚦

Le cockpit admin affiche en permanence :
- **€ dépensés du mois** par partenaire (Claude / fal / Whisper).
- **% du budget mensuel** consommé.
- **🟢 0-49 %** = vert · **🟠 50-79 %** = alarme orange (notification à Bruno) · **🔴 80 %+** = coupure douce des médias (récit reste actif).

À **50 %** : la machine te ping. Tu décides : (a) on laisse rouler · (b) on resserre les quotas du mois pour les nouveaux abonnés · (c) on coupe seulement le top tier momentanément.

## 5. Styles pré-mâchés — guidé OU expert

Côté client (en 1 clic dans NAVBIO), choix d'un **style de récit** parmi 7 ambiances NAVBIO :
- 🪶 **Intime** (1ʳᵉ personne, douceur, confidence).
- 🌅 **Méditerranéen** (lumière, mer, soleil, chaleur).
- ⛵ **Maritime épique** (souffle d'aventure, métaphores du large).
- 🎬 **Cinématique** (présent narratif, plans visuels).
- 📜 **Mémoires classiques** (3ᵉ personne, biographe).
- 🌿 **Bien-être** (calme, respiration, présence).
- ✒️ **À ma façon** (mode expert : le client tape son ton, Claude l'imite).

Et un **style média** parmi 7 ambiances visuelles (Claude transforme en prompt fal) :
- ☀️ **Doré nostalgique** · 🌊 **Mer & lumière naturelle** · 🎞️ **Pellicule vintage** · ✨ **Galaxie/onirique** · 🖤 **Noir & blanc cinéma** · 🌸 **Aquarelle douce** · 🚀 **Énergique moderne**.

**Choix client OU choix NAVBIO** : si le client n'a pas d'idée → bouton « **Surprends-moi** » → Claude analyse les souvenirs/photos déjà déposés et **propose** le style le plus juste. Si client expert → il pioche lui-même.

**Les prompts pré-mâchés vivent côté serveur** (jamais exposés, jamais éditables par le client), garantissant la qualité même chez le novice absolu.

## 6. Économie révisée (3 formules mensuelles, marge sécurité 50 %)

Mêmes prix (39 / 149 / 299 €), quotas légèrement resserrés pour viser **50 % de marge de sécurité** (le budget réel = 50 % du net après Stripe, pas 80 %).

| | 🥉 **Découverte 39 €/mo** | 🥈 **Mémoire 149 €/mo** | 🥇 **Héritage 299 €/mo** |
|---|---|---|---|
| Récit Claude (style/voix/personne) | **illimité raisonnable** | **illimité** | **illimité** |
| Photos animées (3 s) | 15 / mois | 80 / mois | 250 / mois |
| Vidéos courtes (≤ 5 s) | 4 / mois | 25 / mois | 50 / mois HD |
| Vidéos longues (≤ 8 s HD) | — | 8 / mois | 25 / mois |
| Musique générée | 2 / mois | 8 / mois | 20 / mois |
| Voix → texte (Whisper) | 30 min / mois | 180 min / mois | illimité |
| Stockage | 5 Go | 20 Go | 100 Go |
| **Plafond budget API (50 %)** | ~18 € | ~70 € | ~140 € |
| **Coût réel estimé** | ~4 € | ~22 € | ~50 € |
| **Marge brute** | **~33 € (85 %)** | **~119 € (80 %)** | **~234 € (78 %)** |

Marges renforcées par rapport à v1 (plus de coussin si dérapage prix prestataires ou usage intensif).

## 7. Code côté serveur — ce qui change
- `app/api/claude/route.ts` — appelle Anthropic, applique le template prompt système, retourne le récit.
- `app/api/fal/route.ts` — Claude pré-génère le prompt fal, on appelle fal, on retourne le média.
- `app/api/whisper/route.ts` — (optionnel) transcription voix.
- **Quota meter** : table `usage_mois(user_id, partner, kind, units)` ; chaque appel incrémente ; alarme côté admin à 50 %.
- **Secrets** : `ANTHROPIC_API_KEY`, `FAL_KEY`, `OPENAI_API_KEY` (pour Whisper si utilisé) — tous en ENV Vercel.

## 8. Décisions actualisées (Bruno)
1. **Architecture confirmée : Anthropic Claude + fal.ai** (+ Whisper optionnel) ? *Reco du dept : oui.*
2. **Mensuel** confirmé (vs one-shot) ?
3. **Quotas §6** OK ou tu ajustes ?
4. **Catalogue de styles §5** : 7 + 7 te va, ou tu veux plus/moins/autres ambiances ?
5. **Crédits startup** : Anthropic a aussi un programme — à candidater dès le MRR > 0.

---
> *« Un cap, une main, un jour — un récit chaud, un clic propre. »*
> ⚠️ NAVBIO partage des informations de bien-être et accompagne ton récit. Pas un avis médical.
