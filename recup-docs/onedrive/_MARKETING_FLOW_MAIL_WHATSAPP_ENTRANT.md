# ⚓📨 FLUX MAIL + WHATSAPP ENTRANT — Cartographie ACTUELLE
_28 mai 2026 · J-3 du lancement BETA · État réel à l'instant T_

> Mandat Bruno : « si je poste sur le site un mail ou un WhatsApp, est-ce effectif et fonctionnel à 100 % ? qui prendra la main dessus en clair, quel prestataire AI partenaire ? »
>
> **Réponse exécutive** : **NON, ce n'est PAS effectif à 100 %.** Les sites n'affichent aujourd'hui aucun WhatsApp, aucun chat web, aucun formulaire contact. Le seul canal entrant existant = `bpartouche46@gmail.com` (boîte personnelle Bruno), affiché sur bp.com/faq. C'est Bruno lui-même qui répond, sans accusé de réception, sans template, sans escalade. **AUCUN prestataire / aucune IA en place aujourd'hui.** Cartographie ci-dessous + flux cible recommandé.

---

## 1. État actuel — qui prend la main si un visiteur écrit ce soir ?

### 1.1 Mail entrant

**Adresses présentes sur les sites publics**

| Adresse | Affichée sur | Statut |
|---------|--------------|--------|
| `bpartouche46@gmail.com` | brunopartouche.com/faq.html | ⚠️ Boîte **perso** Gmail — mauvais signal de marque |
| `bruno@navlys.com` | nulle part publiquement | ✅ existe (MX Google Workspace) mais pas affichée |
| `contact@navlys.com` | nulle part | 🔴 **N'existe pas** comme alias |
| `hello@navlys.com` | nulle part | 🔴 **N'existe pas** comme alias |
| `support@navlys.com` | nulle part | 🔴 **N'existe pas** comme alias |

**Client mail de Bruno** : Gmail web (perso) + Gmail Workspace (`bruno@navlys.com`).

**Délai de réponse réel observé** :
- Plage active : 8 h-22 h Israël (UTC+3)
- Réponse manuelle directe Bruno
- **Pas de SLA**. Variable de 5 minutes à 3 jours selon disponibilité.
- **Pas d'auto-reply** « j'ai bien reçu, je réponds sous 24 h ».

**Filtres / labels / dossiers** : aucune règle Gmail configurée pour trier `NAVLYS`, `BETA`, `partenaires`, `presse`.

**Qui répond ?** Bruno, **lui seul**. Aucune délégation, aucune équipe support.

### 1.2 WhatsApp entrant

**Numéros présents sur les sites publics** : 🔴 **AUCUN**.

**Compte WhatsApp Business activé** : 🔴 **NON** (Bruno utilise WhatsApp perso).

**Automatisation existante** : 🔴 aucune (pas de Quick Reply, pas de catalogue, pas de bot).

**Conclusion WhatsApp** : **le canal n'existe tout simplement pas** côté entrant pour les visiteurs des sites NAVLYS. Le badge « NAV IA · CHAT UNIVERSEL · arrive 2 JUIN » annonce une chose qui n'a pas de tuyau derrière.

### 1.3 Chat web sur les 4 sites

**Composant présent sur navlys.com / .io / navbiolife.com / brunopartouche.com** : 🔴 **AUCUN**.

Vérifications :
- ❌ Pas de tag Crisp
- ❌ Pas de tag Tidio
- ❌ Pas de tag Intercom
- ❌ Pas de tag Tawk.to
- ❌ Pas de widget custom Next.js
- ✅ Badge HTML « NAV IA · CHAT UNIVERSEL · arrive 2 JUIN » présent, **purement décoratif** (aucun handler clic, aucun endpoint)

### 1.4 Formulaire de contact

**Page `/contact` sur les 4 sites** : 🔴 **AUCUNE**.

**Endpoint API** : aucun endpoint Next.js / Vercel pour traiter une soumission.
**Backend storage** : aucun. Pas de Supabase, pas de Sheets, pas de Notion, pas de webhook.

---

## 2. État actuel chiffré — la vérité crue

| Canal | Fonctionnel | Affiché | Délai moyen | Qui répond |
|-------|-------------|---------|-------------|------------|
| Mail `bpartouche46@gmail.com` | ✅ tuyau OK | ⚠️ oui (perso) | 5 min - 72 h | Bruno seul |
| Mail `bruno@navlys.com` | ✅ tuyau OK | 🔴 non affiché | — | Bruno seul |
| Mail `contact@navlys.com` | 🔴 inexistant | — | — | — |
| WhatsApp | 🔴 inexistant | — | — | — |
| Chat web | 🔴 inexistant | — | — | — |
| Formulaire | 🔴 inexistant | — | — | — |

**Pourcentage de flux entrant traité aujourd'hui : ≈ 30 %**
- 100 % des mails arrivant sur les 2 adresses existantes sont reçus
- 0 % des prospects préférant WhatsApp / chat / formulaire sont captés
- 0 % bénéficient d'un accusé de réception immédiat
- 0 % bénéficient d'une FAQ contextuelle avant d'écrire

**Quel prestataire / IA partenaire actuel ?** 🔴 **AUCUN. Strictement aucun.** Le badge « NAV IA Chat Universel » est une **promesse marketing sans support technique branché à J-3.**

---

## 3. Risque opérationnel à partir du 1er juin 0 h

Le site annonce :
- Lancement BETA
- Badge NAV IA Chat « 2 juin »
- 4 sites simultanés visibles
- Première vague Publer

Hypothèse trafic conservatrice 1 er juin : **500 visiteurs / 24 h**.
- Conversion typique « mail/WhatsApp » : 2 à 4 % → **10 à 20 messages entrants jour 1**
- Bruno absorbe ≈ 5 messages/jour soigneusement traités
- → **Engorgement = J0 + 24 h**
- → Risque réputation : « ils annoncent IA Chat, personne ne répond » = mauvais signal SEO/réseaux

**Coût d'inaction sur ce front à J-3 : élevé.**

---

## 4. Flux CIBLE recommandé (à brancher J-3 → J+7)

```
┌──────────────────────────────────────────────────────────┐
│                  4 SITES NAVLYS                          │
│  brunopartouche.com · navlys.com · navlys.io · navbio    │
└──────────────┬───────────────┬───────────────┬───────────┘
               │               │               │
               ▼               ▼               ▼
        ┌─────────┐     ┌──────────┐     ┌──────────┐
        │  Mail   │     │ WhatsApp │     │  Chat    │
        │ contact@│     │  Business│     │  widget  │
        │navlys.com     │ +33...   │     │  Crisp   │
        └────┬────┘     └─────┬────┘     └─────┬────┘
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                  ┌────────────────────────┐
                  │   INBOX UNIFIÉE CRISP  │
                  │  (web · mail · WA)     │
                  └───────────┬────────────┘
                              ▼
                  ┌────────────────────────┐
                  │   AUTO-REPLY immédiat  │
                  │  « Reçu. Sous 24 h. »  │
                  └───────────┬────────────┘
                              ▼
                  ┌────────────────────────┐
                  │   NAV IA (Claude)      │
                  │  Haiku 4.5 → réponse   │
                  │  Si sensible → Sonnet  │
                  │  Si juridique → Bruno  │
                  └───────────┬────────────┘
                              ▼
                  ┌────────────────────────┐
                  │  Handover humain Bruno │
                  │  + macros préparées    │
                  └────────────────────────┘
```

**Stack recommandée pour ce flux** (détail dans `_MARKETING_NAV_IA_CHAT_PRESTATAIRES.md`) :
- Boîte unifiée : **Crisp Pro €95/mois**
- WhatsApp BSP officiel : **360dialog** (intégré via Crisp)
- IA conversationnelle : **Anthropic Claude Haiku 4.5** (80 %) + **Sonnet 4.6** (20 % sensibles)
- Automatisation : **Make.com Pro €29/mois** pour relier Crisp ↔ Sheets/Notion ↔ alerting Bruno

**Coût total stack : ≈ 200 €/mois** (infra + API Claude estimés sur 1000 conversations).

---

## 5. Adresses mail à créer **dans Google Workspace** (`bruno@navlys.com` est le domaine)

Alias à pousser côté admin Workspace (Bruno admin) :
1. `contact@navlys.com` → forward → Crisp inbox
2. `hello@navlys.com` → forward → Crisp inbox
3. `support@navlys.com` → forward → Crisp inbox
4. `presse@navlys.com` → forward → Crisp inbox + label « presse »
5. `partenaires@navlys.com` → forward → Crisp inbox + label « partenaires »
6. `legal@navlys.com` → forward → Bruno direct (aucune IA, sensible)
7. `rgpd@navlys.com` → forward → Bruno direct (DPO de fait)

**Coût** : 0 €. Alias inclus dans Workspace Business Starter (6,80 €/mois utilisateur).

---

## 6. Numéro WhatsApp Business à provisionner

**Options** :

| Option | Coût | Délai KYC | Avantage |
|--------|------|-----------|----------|
| Numéro français (06/07) virtuel Twilio | ≈ 1 €/mois + usage | 24-48 h | propre, séparé du perso |
| Numéro israélien (054) virtuel | similaire | 48-72 h | cohérent avec présence Bruno |
| WhatsApp Business standard (non API) sur numéro perso | gratuit | immédiat | quick fix, mais pas scalable, pas multi-agent |
| **Recommandé** : numéro FR neuf via 360dialog | inclus Crisp Pro | 24 h | API officielle, multi-agent, archivage |

**Numéro à afficher publiquement** : à choisir par Bruno entre FR et IL.

---

## 7. Plan de bascule en 5 jours

| Jour | Action | Owner |
|------|--------|-------|
| J-3 (29/05) | Décider Crisp + 360dialog. Réserver compte. | Bruno + Le Porte-Parole |
| J-2 (30/05) | Provisionner numéro WhatsApp Business + alias mails Workspace | Bruno |
| J-1 (31/05) | Coller widget Crisp sur les 4 sites (1 ligne JS) + auto-reply mail + auto-reply WhatsApp | Le Porte-Parole + Bruno valide |
| J0 (01/06) | Inbox ouverte. Bruno + Crisp Magic Reply (sans Claude) actifs. | Bruno |
| J+2 (03/06) | Brancher Claude Haiku via Crisp Magic Reply Custom AI ou via Make.com | Le Porte-Parole |

**À J+2** : promesse « NAV IA Chat Universel » tenue avec un vrai modèle d'IA derrière, pas seulement un badge décoratif.

---

## 8. Templates auto-reply prêts à coller (Vague 1, livrables Claude)

### 8.1 Auto-reply mail (FR)

```
Objet : Reçu — Bruno te répond sous 24 h.

Salut,

Ton message est arrivé à bon port. ⚓

Bruno répond à la main, en moins de 24 h (hors week-end et chabbat).
En attendant, tu as peut-être ta réponse ici :
→ FAQ : https://navlys.com/faq
→ Méthode : https://navlys.com/methode
→ Encyclopédie : https://navlys.com/encyclopedie

Si urgent : WhatsApp +XXX XXX XX XX.

NAVLYS · Information pédagogique. Pas un conseil personnalisé.
```

### 8.2 Auto-reply mail (EN)

```
Subject: Received — Bruno will reply within 24 h.

Hi,

Your message landed safely. ⚓

Bruno answers by hand, within 24 h (excluding weekends and Shabbat).
You might find your answer here:
→ FAQ: https://navlys.com/en/faq
→ Method: https://navlys.com/en/method
→ Encyclopedia: https://navlys.com/en/encyclopedia

If urgent: WhatsApp +XXX XXX XX XX.

NAVLYS · Educational information. Not personalized advice.
```

### 8.3 Auto-reply WhatsApp (court, FR)

```
⚓ NAVLYS — message reçu.
Bruno répond dans 24 h.
FAQ : navlys.com/faq
Information éducative, pas un conseil.
```

### 8.4 Auto-reply WhatsApp (court, EN)

```
⚓ NAVLYS — message received.
Bruno replies within 24 h.
FAQ: navlys.com/faq
Educational only, not advice.
```

---

## 9. Qui « prend la main » — décision claire pour Bruno

### Sans changement (statu quo J-3)
- **Mail** : Bruno seul, depuis Gmail perso + Gmail Workspace, sans template, sans SLA.
- **WhatsApp** : personne — le canal n'existe pas.
- **Chat web** : personne — le widget n'existe pas.
- **IA partenaire** : **AUCUN**.

### Avec stack recommandée (J+2 actif)
- **Mail** : Crisp inbox unifie tous les alias. Auto-reply immédiat. Bruno répond en 5 min ou Claude Haiku répond et Bruno valide.
- **WhatsApp** : 360dialog officiel via Crisp. Réponses templatisées + auto-reply + Claude Haiku.
- **Chat web** : Crisp widget collé en 1 ligne sur les 4 sites. Magic Reply ON.
- **IA partenaire principale** : **Anthropic Claude** (Haiku 4.5 + Sonnet 4.6). Justification : Anthropic + Bruno sont déjà alignés sur le ton, et Claude refuse spontanément les promesses de rendement (conformité G1).
- **Prestataire de chat front** : **Crisp** (Nantes, FR, RGPD-native).
- **WhatsApp BSP** : **360dialog** (Berlin, EU, officiel Meta).

---

⚓ *« On promet un Chat Universel. À J-3, on n'a même pas de boîte. Branchons le tuyau avant l'inauguration. »*
_Compilé par Le Porte-Parole · Département Marketing & Communications NAVLYS · 28 mai 2026._
