# 🎙️ VOIX + WHATSAPP — « me parler avec ma voix sur WhatsApp »

> Demande de Bruno (2026-06-24) : cloner sa voix, avoir l'agent NAVLYS « en ligne », et
> recevoir des réponses **en voix (la sienne) sur WhatsApp**.
> ⚠️ Projet réel, à faire par étapes — pas un drop-in de quelques jours. Argent = règle §3.

## Briques nécessaires
| Brique | Rôle | Choix | Statut |
|--------|------|-------|--------|
| **Clone vocal + TTS** | Générer l'audio dans la voix de Bruno | **ElevenLabs** (réf. clonage + API basse latence) ou **HeyGen** (déjà payé) | à choisir |
| **WhatsApp** | Envoyer/recevoir messages + **notes vocales** (.ogg/opus) | **360dialog** (WhatsApp Business API — déjà payé, 58,31 €) | présent |
| **Cerveau** | Comprendre & rédiger la réponse | **Claude** (API) | dispo |
| **Mémoire** | Contexte & savoir NAVLYS | Supabase `navlys_memoire`, `core_knowledge` (déjà peuplées) | présent |
| **Orchestration / hébergement** | Webhook qui relie WhatsApp ↔ Claude ↔ TTS | **core Hetzner** (tables `agents`/`missions` = framework déjà amorcé « MasterNav ») | à brancher |

## Flux cible
1. Message WhatsApp reçu → **webhook 360dialog** sur le core Hetzner.
2. Core → **Claude** (réponse texte, avec mémoire Supabase).
3. Texte → **ElevenLabs/HeyGen** (TTS voix Bruno) → fichier audio.
4. Core → **360dialog** renvoie une **note vocale** dans la voix de Bruno.

## Plan par étapes (réaliste)
- **Étape 1** — Clone vocal : fournir 2–5 min d'échantillons → créer la voix → tester un TTS. *(toi + moi)*
- **Étape 2** — WhatsApp echo : webhook 360dialog reçoit/renvoie un message texte. *(core)*
- **Étape 3** — Voix sortante : brancher le TTS → renvoyer une note vocale. *(core)*
- **Étape 4** — Cerveau + mémoire : Claude + Supabase pour des réponses utiles.
- **Étape 5** — Garde-fous : périmètre éducatif (pas de conseil perso), pas d'action argent sans toi (§3).

## Ce qu'il me faut de toi
1. **Fournisseur de voix** : ElevenLabs (recommandé) **ou** HeyGen ? + un **échantillon** de ta voix.
2. **Accès** : clés 360dialog (API WhatsApp) + accès au **core Hetzner** (pour poser le webhook) —
   via toi (tu exécutes) puisque je n'ai pas d'accès serveur direct.
