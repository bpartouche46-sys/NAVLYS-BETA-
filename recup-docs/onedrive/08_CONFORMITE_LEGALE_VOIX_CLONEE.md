# 08 — Conformité légale, sécurité et anti-deepfake

**Cadre** : IA Act européen (entré en vigueur 2024) · RGPD · Loi Informatique et Libertés · droit à l'image et à la voix (Code civil art. 9) · CGU ElevenLabs.

---

## 1. Mention obligatoire visible

À afficher **en permanence sous chaque lecteur audio** (déjà intégré dans `<VoiceBrunoPlayer />`, section `.disclaimer`) :

> *« Voix générée par IA — modèle officiel de Bruno Mark Partouche. »*

Conformité IA Act : article 50 (« obligations de transparence pour les contenus générés par IA ») — toute synthèse vocale doit être identifiée comme telle.

Pour les contenus longs (bio NAVBIO, manifesto) : ajouter une **mention écrite** dans le pied de page de la page :

> *« Cette page contient un narrateur audio synthétisé. La voix utilisée est un clone IA officiel de Bruno Mark Partouche, créé avec son consentement explicite via ElevenLabs. »*

---

## 2. Consentement Bruno — signature horodatée

Document à conserver dans `_VOIX_BRUNO_v1/_CONSENTEMENT/CONSENTEMENT_VOICE_CLONING_2026.pdf`.

### Modèle (à signer numériquement par Bruno via Yousign / DocuSign)

```
CONSENTEMENT À LA CRÉATION ET À L'UTILISATION D'UN CLONE VOCAL IA

Je soussigné, Bruno Mark Partouche, né [date], demeurant [adresse],
agissant en mon nom personnel et en qualité de dirigeant de NAVLYS,

DÉCLARE :

1. Avoir fourni volontairement des échantillons de ma voix à ElevenLabs Inc.
   dans le but de créer un modèle de clonage vocal "Professional Voice Cloning".

2. Autoriser l'écosystème NAVLYS (navlys.com, navbiolife.com, navlys.io,
   brunopartouche.com et toutes futures déclinaisons) à utiliser cette voix clonée
   pour :
   - la lecture audio des réponses de l'assistant NAV IA ;
   - la narration de contenus pédagogiques, biographies, FAQ ;
   - les communications officielles NAVLYS (newsletters, présentations).

3. EXIGER que cette voix ne soit JAMAIS utilisée pour :
   - prononcer des phrases qui n'auraient pas été pré-validées ou générées
     par NAV IA dans son cadre system-prompt G1 ;
   - imiter ma voix dans un cadre frauduleux, politique, religieux,
     diffamatoire, sexuel, ou contraire à mes valeurs ;
   - signer ou contracter à ma place ;
   - reproduire ma voix dans un autre écosystème que NAVLYS sans consentement
     écrit additionnel.

4. EXIGER que tout VOICE_ID associé à ce modèle soit :
   - stocké côté serveur uniquement, jamais exposé au navigateur ;
   - supprimé sous 30 jours sur simple demande écrite de ma part.

5. CONSERVER le droit de révoquer ce consentement à tout moment,
   moyennant un préavis de 30 jours, déclenchant la suppression de la voix
   chez ElevenLabs et l'invalidation immédiate du VOICE_ID dans toutes les apps.

Fait à [lieu], le [date].
Signature numérique horodatée :
```

---

## 3. Charte d'usage interne (à respecter par tout opérateur — Claude inclus)

| Règle | Justification |
|-------|---------------|
| **R1** : la voix ne lit que du texte généré par NAV IA dans son cadre G1, OU pré-rédigé par Bruno. | Anti-deepfake : impossible de mettre dans sa bouche du texte arbitraire. |
| **R2** : aucun texte issu d'input utilisateur ne peut être renvoyé en voix. | Empêche un user de faire dire à Bruno ce qu'il veut. |
| **R3** : refus systématique de synthétiser : insultes, propos politiques, religieux, sexuels, diffamatoires, fiscaux/médicaux/juridiques personnalisés. | Cohérence G1 + protection image. |
| **R4** : aucun fichier audio téléchargeable n'est watermarké de fausse identité. Le nom de fichier inclut `bruno-voice-{hash8}.mp3`. | Traçabilité. |
| **R5** : journalisation `voice_usage` de toute synthèse (user, app, lang, hash) pendant 365 jours. | Investigation a posteriori. |
| **R6** : VOICE_ID ne quitte jamais le périmètre serveur. Tout accès au VOICE_ID en clair côté client = incident sécurité majeur. | Pré-requis ElevenLabs. |
| **R7** : NAV IA doit, sur demande explicite ("c'est vraiment ta voix Bruno ?"), répondre transparente­ment : *"Non, je suis NAV IA. La voix que tu entends est un clone IA officiel de Bruno Mark Partouche, créé avec son consentement."* | Transparence IA Act. |

---

## 4. Sécurité technique du VOICE_ID

### Périmètre interdit (jamais d'exposition)

- ❌ Pas dans le code source côté client (`components/`, `hooks/`).
- ❌ Pas dans les réponses `fetch()` au navigateur.
- ❌ Pas dans les logs publics (Vercel logs publics, Sentry breadcrumbs publics).
- ❌ Pas dans le repository Git en clair.

### Périmètre autorisé

- ✅ Variable d'environnement Vercel `ELEVENLABS_VOICE_ID_BRUNO`.
- ✅ Lu uniquement par `app/api/voice/*` (côté Node, `runtime = 'nodejs'`).
- ✅ Backup chiffré 1Password / Bitwarden.

### Rotation

- VOICE_ID lui-même : **non rotatable** (ElevenLabs ne ré-émet pas). En cas de compromission, supprimer la voix dans Voice Lab et re-cloner → nouveau VOICE_ID.
- `ELEVENLABS_API_KEY` : **rotation tous les 90 jours**, monitorée par tâche planifiée (cf. `veille-infra-navlys` étendue).

---

## 5. Anti-deepfake — barrières applicatives

### Côté system prompt NAV IA (renvoi vers `_NAV_IA_SYSTEM_PROMPT_CLAUDE.md`)

- G1 actif → refus systématique des sujets interdits.
- La synthèse vocale s'applique **uniquement** au texte de la réponse de NAV IA, pas à l'input utilisateur.

### Côté API `synthesize`

```ts
// Garde-fou supplémentaire dans /api/voice/synthesize/route.ts
const FORBIDDEN = [
  /\b(je suis (?:CIF|ORIAS|conseiller financier))\b/i,
  /\b(je vous promets|je garantis) (?:un rendement|un gain|de doubler)/i,
  /\b(achetez|vendez|investissez dans)\b.{0,40}\b(action|crypto|fonds)\b/i,
];
if (FORBIDDEN.some(rx => rx.test(text))) {
  return NextResponse.json({ error: 'forbidden_speech' }, { status: 422 });
}
```

→ blocage défense en profondeur même si NAV IA a un bug de prompt.

### Détection de manipulation côté analytics

Alerte si un même `user_id` génère > 50 synthèses avec textes très différents en 1 h → potentielle tentative de scraping pour entraîner un clone tiers. Action : freeze user + investigation.

---

## 6. RGPD — données personnelles

| Donnée | Base légale | Durée |
|--------|-------------|-------|
| Échantillon voix Bruno | Consentement explicite (art. 9 RGPD — donnée biométrique) | jusqu'à révocation |
| `voice_usage` (user_id, texte hash, langue) | Intérêt légitime (analyse usage) | 365 j puis anonymisation |
| `voice_preferences` (auto-play, vitesse, langue) | Exécution du service | jusqu'à suppression compte |
| Audio cached R2 | Intérêt légitime (réduction coût) | 30 j (TTL) |

### Droits utilisateurs

- Export : `GET /api/account/export` inclut `voice_usage` et `voice_preferences`.
- Effacement : `DELETE /api/account` purge `voice_usage` + `voice_preferences`. R2 cached audio = anonyme (pas de donnée personnelle).
- Information : registre RGPD NAVLYS mis à jour.

---

## 7. ElevenLabs — engagements contractuels à vérifier

| Vérification | Statut | Lien |
|--------------|--------|------|
| ElevenLabs traite les données en UE ou via SCC | ✅ (DPA disponible) | https://elevenlabs.io/dpa |
| Échantillons non utilisés pour entraîner modèles génériques | ✅ (engagement contractuel PVC) | CGU §X |
| Watermarking inaudible présent sur audio généré | ✅ | https://elevenlabs.io/blog/ai-speech-classifier |
| Right to delete sous 30 j | ✅ | DPA |
| SOC 2 Type II | ✅ | trust portal |

---

## 8. Mention à ajouter dans les CGU NAVLYS

> *Section « Technologies utilisées » :*
>
> *NAVLYS utilise un assistant IA (NAV IA) basé sur l'API Anthropic Claude. Les réponses de NAV IA peuvent être restituées vocalement via un modèle de clone vocal "Professional Voice Cloning" ElevenLabs, créé avec le consentement explicite et révocable de Bruno Mark Partouche. La voix est identifiée comme générée par IA, conformément à l'article 50 du Règlement européen sur l'IA. Aucune voix n'est utilisée pour des contenus non validés par le cadre G1 de NAV IA. Voir politique anti-deepfake : navlys.com/legal/ai-voice.*

---

## 9. Page publique `navlys.com/legal/ai-voice` (à créer)

Contenu minimal :

```
TITRE — Notre politique de voix IA

NAVLYS utilise la voix clonée de Bruno Mark Partouche pour rendre les réponses
de l'assistant NAV IA plus humaines.

Ce que la voix fait :
- elle lit les réponses pédagogiques de NAV IA.
- elle narre les biographies, articles, FAQ, manifestos officiels NAVLYS.

Ce que la voix NE FAIT JAMAIS :
- elle ne lit pas du texte arbitraire d'un utilisateur ;
- elle ne donne pas de conseil financier personnalisé ;
- elle n'est utilisée dans aucun cadre frauduleux, politique, religieux ;
- elle n'est pas exportée hors écosystème NAVLYS.

Si vous pensez que cette voix est utilisée hors de ce cadre, contactez-nous :
abuse@navlys.com — réponse sous 48 h, suppression sous 7 j.
```
