# 💼 NAVBIO LIVE — 3 formules, limites contractuelles, coûts & rentabilité

> Dépt 07 R&D · 25 mai 2026 · Réponse à la question Bruno : quoi inclure dans chaque tier, combien ça coûte, quelles limites graver dans les CGV.
> Hypothèse retenue : **abonnement mensuel** (rentabilité durable). Une variante one-shot annuelle est possible — voir §6.
> ⚠️ Prix prestataires = **ordres de grandeur** (mai 2026, à revérifier juste avant la mise en prod).

## 1. Architecture des partenaires (rappel)
| Brique | Partenaire | Ce qu'il fait dans NAVBIO |
|---|---|---|
| **Récit / assistant** | **OpenAI API** (GPT-4o/4.1) | Reformuler, interpréter, varier le style du récit ; coacher le client ; transcrire la voix (Whisper). |
| **Image / vidéo / musique** | **fal.ai** (1 API ↔ FLUX, Nano-Banana, Kling, Runway, Luma, Veo, Suno…) | Animer photo, créer vidéo depuis image, monter, ajouter musique. |
| **Stockage chiffré** | Vercel KV / Supabase Storage | Bibliothèque photos/vidéos/docs du client. |

Tous **côté serveur**, clés en variable d'env, **white-label** : l'abonné ne voit que NAVBIO.

## 2. Les 3 formules (mensuelles) — quotas & marge

> Règle d'or NAVBIO : **récit illimité** (cents par génération), **médias quotaisés** (centimes à euros par rendu).

| | 🥉 **Découverte 39 €/mo** | 🥈 **Mémoire 149 €/mo** | 🥇 **Héritage 299 €/mo** |
|---|---|---|---|
| Récit (texte, voix, style) | **illimité raisonnable** (200 k mots/mois) | **illimité** | **illimité** |
| Photos animées (3 s) | 20 / mois | 100 / mois | 300 / mois |
| Vidéos courtes (≤ 5 s) | 5 / mois | 30 / mois | 60 / mois (HD) |
| Vidéos longues (≤ 8 s) | — | 10 / mois | 30 / mois |
| Musique générée | 2 / mois | 10 / mois | 25 / mois |
| Documents OCR/import | 50 / mois | 500 / mois | illimité |
| Stockage | 5 Go | 20 Go | 100 Go |
| Export livre/vidéo finale | basse déf. (watermark) | HD | HD + bonus livre annuel optionnel (hors API) |
| **Coût API estimé / mois** | ~5 € | ~25 € | ~55 € |
| **Net après Stripe (~5 %)** | ~37 € | ~141 € | ~284 € |
| **Marge brute** | **~32 € (82 %)** | **~116 € (78 %)** | **~229 € (77 %)** |

> Hypothèses tarifaires utilisées (à vérifier au moment T) : récit GPT-4o ≈ $0,01 par récit de 5 000 mots · animation photo ≈ $0,05 · vidéo 5 s ≈ $0,30–0,50 · vidéo 8 s HD ≈ $0,60–1 · musique 30 s ≈ $0,10–0,20. Conversion ≈ 0,93 €/$.

## 3. Limites à GRAVER dans les CGV NAVBIO (par tier)
- **Quotas mensuels** non reportables au mois suivant (anti-stockage abusif).
- **Anti-abus** : rate-limit 5 générations/heure (Découverte), 20 (Mémoire), 50 (Héritage).
- **Watermark NAVBIO** sur les exports Découverte (retiré sur Mémoire/Héritage).
- **Pas de revente** des médias générés ; usage personnel et transmission familiale autorisés (cohérent avec l'esprit « biographie vivante »).
- **Modifications du récit** = illimitées (style/ton/voix/personne) — c'est l'âme du produit, on ne la bride pas.
- **Modifications/ajouts médias** = comptés dans le quota mensuel.
- Dépassement = blocage poli avec proposition d'upgrade au tier supérieur.

## 4. Avantages réels d'OpenAI
- **Qualité GPT-4o** = haut de gamme texte multilingue, FR irréprochable.
- **Whisper** = transcription voix → texte excellente (le client parle, NAVBIO écrit).
- **Function calling / structured output** = pilote propre depuis nos prompts (cf. §5).
- **API stable, doc claire, latence basse**.
- **CGU API permettent la revente d'output** (vérifier la version au moment T) — pas de mention forcée « propulsé par OpenAI » côté abonné.
- **Crédits startup** disponibles via Microsoft for Startups / OpenAI Startups Program quand on grossit.

## 5. Oui — je sais le connecter et le driver depuis l'app
**Architecture (côté serveur du projet `navlys/` / `navbio/`)** :
- Route API : `app/api/openai/route.ts` → reçoit `{action, content}` → applique le **template de prompt** correspondant → appelle OpenAI → renvoie le résultat.
- Templates de prompts **côté serveur** (jamais exposés) — ex. `reformuler_recit_premiere_personne.txt`, `extraire_chapitres_depuis_photos.txt`, `proposer_titre_chapitre.txt`, `coach_du_jour.txt`.
- Pareil pour fal.ai : `app/api/fal/route.ts` → action `anim_image` / `image_to_video` / `music` → modèle choisi → rendu.
- **Quota enforcement** : table `usage_mois(user_id, kind, count)` ; chaque appel l'incrémente ; au-delà → 402 + message « palier suivant ? ».
- **Sécurité** : clés en `OPENAI_API_KEY` et `FAL_KEY` (env Vercel), **jamais committées**, jamais visibles client.

**Le code est prêt mentalement** — il s'écrit en 1–2 jours côté Dépt 02 dès que tu fournis les clés.

## 6. Le « bundle illimité contractuel » — la vérité honnête
- **OpenAI** : pas de « contrat revendeur illimité » au sens où tu l'entends. Le modèle = **pay-as-you-go + remises volume**. À l'échelle (>$5 k/mois) on accède à des taux **scaled-tier** et à du **Provisioned Throughput** via Azure OpenAI (forfait mensuel, capacité dédiée).
- **fal.ai** : pareil, pay-as-you-go, remises volume.
- **Ce qui existe vraiment et qui s'appelle « partenariat »** :
  1. **Crédits startup** : Microsoft for Startups Founders Hub ($150 k Azure OpenAI sur 2 ans si on est éligible) · OpenAI Startup Program · Google for Startups Cloud · NVIDIA Inception. **Action concrète** : on candidate dès que NAVBIO a son premier MRR.
  2. **Programme partenaire Affiliate** côté NOTRE app : on intègre leur lien d'inscription pour les abonnés Power Users qui veulent leur propre clé → on touche une commission. Bonus modeste.
- **« Apporter un nouvel abonné payant »** : ce mécanisme **n'existe pas** pour OpenAI/fal.ai au sens où chaque abonné NAVBIO devient client OpenAI. Notre abonné reste **client NAVBIO** ; nous payons OpenAI/fal à l'usage, tout simplement.
- **Si one-shot annuel plutôt que mensuel** : 39 / 149 / 299 € en **une fois** est possible mais limite le récurrent. Compromis raisonnable : **39 € à vie** (Découverte one-shot, marge faible mais excellente acquisition) + **149/299 €/mois** pour les paliers actifs.

## 7. Garde-fous business
- **Suivi en direct** dans le cockpit admin : € dépensés OpenAI/fal du mois, par tier, par abonné. Alarme à 80 % du budget.
- **Bouton d'urgence** : interrupteur global qui désactive temporairement les générations médias si dépassement (le récit reste actif).
- **Test bêta** : 20 abonnés en accès anticipé (gratuit/réduit) → on **mesure la consommation réelle** → on ajuste les quotas avant la mise en marché grand public. C'est l'étape #1 de Dépt 07.

## 8. Décisions qui t'attendent (Bruno)
1. **Modèle de prix** : mensuel (reco) vs one-shot vs mix.
2. **Quotas exacts** : tu valides la grille §2 ou tu ajustes les nombres ?
3. **Watermark Découverte** : on garde (incitation à upgrade) ou non ?
4. **Crédits startup** : ouvre-moi la porte (mail/site Microsoft for Startups, OpenAI Startup) → je prépare la candidature pour Dépt 07.

---
> *« Un cap, une main, un jour. »*
> ⚠️ NAVBIO partage des informations de bien-être et accompagne ton récit de vie. Pas un avis médical. Les prix API utilisés ici sont des ordres de grandeur à revalider avant signature.
