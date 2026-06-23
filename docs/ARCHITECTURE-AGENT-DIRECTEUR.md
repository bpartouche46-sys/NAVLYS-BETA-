# 🎛️ ARCHITECTURE — L'AGENT DIRECTEUR NAVLYS

> Vision de Bruno : un **agent directeur** (chef d'orchestre) capable de puiser dans
> le **core** (Hetzner) et sur le **web**, de gérer chaque **service** et **sous-agent**
> virtuel, et d'orchestrer **SAV + back-office** via les **API** correspondantes —
> jusqu'à la finalisation et le lancement en ligne des applications.
>
> Ce document met cette vision noir sur blanc (règle d'or : rien ne reste « dans la tête »).
> 🔐 Aucun secret ici (clés, mots de passe, IP) — uniquement l'architecture et les rôles.

---

## 1. Le principe : orchestrateur + sous-agents

Un seul gros agent qui « fait tout » devient vite ingérable. Le bon modèle, c'est
**1 directeur qui coordonne des sous-agents spécialisés**, chacun expert d'un domaine.

```
              AGENT DIRECTEUR (le chef d'orchestre)
              pioche : core Hetzner + web + mémoire partagée
                              │
       ┌────────────┬─────────┴────────┬──────────────┐
   Agent Sites    Agent SAV       Agent Back-office   Agent Veille
  (code/deploy)  (Gmail/tickets)  (Stripe/API métier) (web/marché)
                              │
                  🚦 GARDIEN (conformité) — bloque avant toute publication
                              │
        🔴 FEU VERT DE BRUNO requis pour : déploiement live · argent · contenu public
```

---

## 2. État réel aujourd'hui (point de départ)

| Acteur | Ce qu'il EST | Ce qu'il PEUT | Ce qu'il ne peut PAS |
|--------|--------------|---------------|----------------------|
| **Bruno** | Le chef / décideur | Tout valider, donner les accès | — |
| **Hermès** | LLM via **OpenRouter** + **accès Hetzner** | Exécuter sur le serveur (installs, config, clone) | Pas encore d'orchestration ni de garde-fous structurés |
| **Claude (moi)** | Cerveau code + conformité, en **conteneur isolé** | Lire/corriger le code **via GitHub**, écrire la doc | **Aucun accès direct** au serveur Hetzner ni aux secrets |

**Traduction simple :** Hermès = un cerveau (OpenRouter) + des mains (Hetzner) = la
**graine** de l'agent directeur. Mais c'est aujourd'hui **un agent**, pas encore **un
orchestrateur**.

### Déjà en place sur le serveur (fait par Hermès)
- fail2ban, Docker, PM2, certbot, Nginx (cockpit + previews des sites)
- `/root/navlys/` (structure dossiers) · 4 sites récupérés · GitHub cloné (**NOVA-HUB** — à confirmer)
- Cockpit web dans `/var/www/cockpit/` (login `bruno` — ⚠️ mot de passe exposé en clair dans un chat, **à changer**)
- Volume Hetzner **10 Go** (id `106103603`) destiné aux sauvegardes → à monter sur `/mnt/navlys-backup`

---

## 3. Ce qui manque pour atteindre la vision

Le saut vers « agent directeur » n'est **pas** une question de puissance brute, mais de
**structure, branchements et garde-fous** :

- ❌ **Structure d'orchestration** : des sous-agents par métier, pilotés par le directeur.
- ❌ **Mémoire persistante partagée** : qui se souvient entre les sessions (sinon on
  refait les mêmes erreurs — cf. ERR-001).
- ❌ **Branchements API** : Stripe (paiements), Gmail (SAV), Vercel (déploiement), etc.
- ❌ **Garde-fous + feux verts** : le **gardien** (conformité) obligatoire avant publication,
  et la validation humaine de Bruno sur les actions sensibles.

---

## 4. Les garde-fous NON négociables

⚠️ Un LLM avec accès **root** au serveur et **sans garde-fou** est puissant **mais
dangereux** : il peut casser un site en live, exposer un secret, ou republier un contenu
interdit. Pour NAVLYS, deux zones rouges :

1. **Lancement en ligne (production)** → jamais d'auto-déploiement sans **feu vert de Bruno**.
2. **Conformité finance** (risque n°1) → statut **finfluenceur déclaré, ZÉRO ORIAS/CIF**.
   Le **gardien** (`.claude/agents/gardien.md`) doit **bloquer** avant publication tout :
   - vocabulaire interdit / conseil personnalisé,
   - **promesse de rendement** (cf. ERR-003 : « +8 à 12% »),
   - mention sensible (cf. ERR-003 : « Jérusalem »),
   - page liée en 404, disclaimer manquant.

> Règle d'or du système : **le directeur PROPOSE et EXÉCUTE, le gardien CONTRÔLE,
> Bruno VALIDE les actions sensibles.** L'autonomie totale n'est pas fiable aujourd'hui.

---

## 5. Feuille de route — brique par brique (ne PAS tout faire d'un coup)

L'erreur classique = vouloir tout construire d'un coup → usine à gaz + confusion
« qui fait quoi » (déjà vécue). On valide **une brique** avant la suivante.

- [ ] **Brique 0 — Clarifier les rôles** : ce document + qui a accès à quoi (anti-frayeur).
- [ ] **Brique 1 — Une chaîne complète, avec point de contrôle.** Ex. SAV :
      l'agent lit les mails support → **propose** une réponse → Bruno valide → envoi.
- [ ] **Brique 2 — Sites sous Git propre** : NOVA-HUB relié, Claude corrige (conformité),
      Bruno/Hermès déploient. Aucun déploiement prod sans feu vert.
- [ ] **Brique 3 — Back-office / paiements** : brancher Stripe en lecture d'abord
      (voir les transactions), écriture seulement après validation.
- [ ] **Brique 4 — Veille web** : agent qui surveille le marché et alimente la mémoire.
- [ ] **Brique 5 — Orchestration** : le directeur coordonne les sous-agents validés.

> Principe : on n'ajoute **aucun nouvel outil** (ex. Google Antigravity) tant que la
> base n'est pas stable. Un acteur de plus = un « qui a fait quoi » de plus.

---

## 6. Décisions à confirmer par Bruno

- [ ] Nom/compte exact du dépôt GitHub des sites (**NOVA-HUB** ?).
- [ ] Quelle **première brique** lancer (SAV ? sites ? paiements ?).
- [ ] Où tourne le **directeur** (sur Hetzner, via OpenRouter, à la Hermès) — confirmé.
- [ ] Changer le mot de passe du **cockpit** (exposé en clair).
