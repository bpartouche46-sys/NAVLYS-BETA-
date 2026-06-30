# 🧭 COCKPIT NAVLYS — ton tableau de bord visuel sur internet

> Pour Bruno, qui n'est pas programmeur et travaille seul.
> Objectif : **voir** le corps central fonctionner, **comprendre** ce que fait
> chaque agent, **recevoir des rapports** (écrits + à voix haute) et **intervenir**
> (valider, refuser, donner un ordre) — depuis ton téléphone ou ton ordinateur,
> sans jamais ouvrir Claude Code.

## 1. Ce que tu vois dans le cockpit

| Zone | À quoi ça sert |
|---|---|
| **Compteurs** (en haut) | Combien de missions à valider / à faire / en cours / faites / en erreur. |
| **Les 14 agents** | Une carte par agent : prénom, `@handle`, ce qu'il fait, s'il est `auto` (⚡) ou `prépare` (✋), s'il est actif, et combien de missions il a en main. |
| **Missions** | Le travail rangé en colonnes par statut. Bouton **👁 Voir** (lire le livrable), **✓ Valider**, **↩ Refuser** (avec un motif). |
| **Donner un ordre** | Tu écris en français (ou `@navfi …`) → la mission part au bon agent. Tu peux aussi choisir l'agent dans la liste, sinon **MasterNav choisit**. |
| **Journal vivant** | Le fil de tout ce qui se passe, en direct (rafraîchi toutes les 8 s). |
| **🔊 Rapport vocal** | Le **Rapporteur** te fait un point clair et te le **lit à voix haute**. |

## 2. Adresse

Une fois déployé sur Vercel, le cockpit est à : **`https://<ton-domaine>/cockpit`**
(ex. `https://navlys.com/cockpit`). Ajoute-le en favori sur l'écran d'accueil de ton tél.

> 🔒 La page est privée : elle demande un **mot de passe cockpit** à l'entrée.
> Elle est aussi marquée `noindex` (invisible des moteurs de recherche).

## 3. Mise en service (3 variables à coller dans Vercel — une seule fois)

Dans **Vercel → ton projet → Settings → Environment Variables**, ajoute :

| Variable | Valeur | Note |
|---|---|---|
| `SUPABASE_URL` | `https://hhrlgyvtqluxpywjiwkd.supabase.co` | URL du projet navlys-core |
| `SUPABASE_SERVICE_ROLE_KEY` | *(ta clé service_role)* | **SECRET serveur** — jamais ailleurs |
| `COCKPIT_TOKEN` | *(un mot de passe que TU choisis)* | c'est lui que tu taperas pour entrer |
| `ANTHROPIC_API_KEY` | *(déjà présent)* | sert au Rapport vocal (sinon rapport simple sans IA) |

Puis **Redeploy** (Vercel → Deployments → … → Redeploy). C'est tout.

> ⚠️ **Garde-fou G1** : la clé `service_role` reste **uniquement côté serveur**
> (dans la fonction `api/cockpit.js`). Elle n'est **jamais** envoyée à ton navigateur.
> Le cockpit ne fait que **préparer / mettre en file / valider** — il ne dépense rien,
> ne publie rien, ne déploie rien tout seul (même doctrine que le worker).

## 4. Comment ça marche (le schéma)

```
Toi (navigateur)  ──①── api/cockpit.js (serveur Vercel, mot de passe vérifié)
                          │
                          ②  clé service_role (secrète)
                          ▼
                       Supabase  ◀── le worker (run.py) fait travailler les 14 agents
                       (agents, missions, journal)
```

- Le **worker** (`python run.py`, sur Hetzner) fait réfléchir les agents et écrit
  les livrables dans `missions` (statut `a_valider`).
- Le **cockpit** lit ces mêmes tables et te laisse valider/refuser/ordonner.
- **MasterNav** (Telegram) et le **cockpit** sont deux fenêtres sur le **même** corps
  central : utilise celle que tu préfères, elles voient la même chose.

## 5. Fichiers

| Fichier | Rôle |
|---|---|
| `live-source/cockpit.html` | La page visuelle (tu n'as rien à modifier). |
| `live-source/api/cockpit.js` | La fonction serveur sécurisée (lecture + pilotage). |

## 6. En cas de souci

- **« mot de passe cockpit invalide »** → `COCKPIT_TOKEN` n'est pas (encore) défini dans Vercel, ou tu n'as pas refait un *Redeploy*.
- **« server not configured »** → il manque `SUPABASE_URL` ou `SUPABASE_SERVICE_ROLE_KEY` dans Vercel.
- **Rapport vocal muet** → certains navigateurs exigent un clic avant de parler ; reclique sur 🔊. Le texte reste affiché de toute façon.
- **Les agents semblent inactifs** → vérifie que le worker `run.py` tourne bien (sur Hetzner). Le cockpit montre l'état ; c'est le worker qui fait travailler les agents.
