# 📲 WhatsApp — ton canal de commandement NAVLYS

> But : depuis **WhatsApp**, tu pilotes le corps central à la voix ou au texte,
> comme avec MasterNav (Telegram) — mais sur l'appli que tu utilises déjà.

## 1. Deux modes automatiques (un seul webhook)

Le webhook `api/whatsapp-webhook.js` regarde **qui** écrit :

| Qui écrit | Mode | Ce qui se passe |
|---|---|---|
| **Toi** (numéro = `BRUNO_WHATSAPP`) | 🧭 **PILOTE** | Tu drives les 14 agents : créer des missions, `/recap`, `/voir`, `/valider`, `/refuser`, `/rapport`. |
| Un client / inconnu | 💬 **SAV** | Réponse d'aide chaleureuse (inchangée). |

Tu ne casses rien pour tes clients : ils gardent le SAV. Toi seul passes en mode pilote.

## 2. Ce que tu peux écrire (mode pilote)

```
@navfi prépare la mini-leçon du jour sur les ETF   → mission créée pour Victor
écris 3 posts de lancement                          → routé tout seul vers Clara
/recap                                              → état de toutes les missions
/agents                                             → la liste des agents
/voir 12                                            → lire le livrable de la mission 12
/valider 12                                         → valider
/refuser 12 reformule plus court                    → renvoyer à l'agent avec un motif
/rapport                                            → le point du jour (chaleureux)
/aide                                               → rappel des commandes
```

> 🎙️ **À la voix** : WhatsApp transcrit tes notes vocales. Dicte ton ordre,
> WhatsApp le transforme en texte, NAVLYS l'exécute.

## 3. Mise en service

### a) Le numéro WhatsApp Business (360dialog)
Il faut un numéro WhatsApp Business connecté via **360dialog** (ou Meta Cloud API).
Tu récupères une **D360-API-KEY** et tu définis un **verify token**.

### b) Variables à coller dans Vercel (Settings → Environment Variables)

| Variable | Valeur | Déjà là ? |
|---|---|---|
| `D360_API_KEY` | clé 360dialog | (selon ton SAV actuel) |
| `WHATSAPP_VERIFY_TOKEN` | un mot que tu choisis (pour la vérif Meta) | (idem) |
| `ANTHROPIC_API_KEY` | clé Anthropic | ✅ déjà |
| `BRUNO_WHATSAPP` | **ton** numéro, format international sans `+` (ex. `9725XXXXXXXX`) | ➕ à ajouter |
| `SUPABASE_URL` | `https://hhrlgyvtqluxpywjiwkd.supabase.co` | ➕ (déjà pour le cockpit) |
| `SUPABASE_SERVICE_ROLE_KEY` | clé service_role (secret serveur) | ➕ (déjà pour le cockpit) |

Puis **Redeploy**.

### c) Brancher le webhook
Dans la console 360dialog/Meta, mets l'URL du webhook :
`https://navlys.com/api/whatsapp-webhook` (verify token = `WHATSAPP_VERIFY_TOKEN`).

## 4. Sécurité (garde-fou G1)

- La clé `service_role` reste **côté serveur** (jamais dans un message).
- Seul **ton** numéro passe en mode pilote ; tout le reste = SAV public.
- Le mode pilote **prépare / met en file / valide** — il ne dépense rien, ne publie
  rien, ne déploie rien tout seul (même doctrine que le worker et le cockpit).

## 5. Le CORE « toujours allumé »

WhatsApp et le cockpit sont **déjà** permanents (serverless Vercel). Mais les agents
ne *réfléchissent* que quand le **worker** tourne. Pour qu'ils travaillent 24/7,
lance `python run.py` en service sur **Hetzner** (voir `README.md` §Hetzner). Les
routines automatiques (`sql/routines_cron.sql`) enfilent alors seules les missions
du matin → tu reçois le `/rapport` sans rien demander.
