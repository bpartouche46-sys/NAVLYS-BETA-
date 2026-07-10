# Réseaux sociaux SANS RISQUE — plateformes officielles bien notées (2026-07-09)

> Demande de Bruno : « gérer les réseaux sociaux, dialoguer, écouter, répondre via NAVLYS CORE,
> sans risque d'être noté, mal noté ou pire (bannissement). En un clic je valide tout, et l'agent
> dialogue avec ma philosophie, toujours positive, sans le moindre terme négatif. »

## ⚖️ La règle d'or (vérifiée par recherche, 09/07/2026)

| Méthode | Risque de suspension du compte |
|---|---|
| **Outils via l'API officielle Meta / partenaires certifiés Meta Business Partner** | **< 0,5 % / an** — Meta ne sanctionne pas les réponses déclenchées par une interaction de l'utilisateur via un outil approuvé |
| Bots non officiels (extensions navigateur, scrapers, partage de mot de passe, simulateurs de clics) | **15-30 % / an**, détection en quelques heures, sanctions immédiates et quasi impossibles à contester depuis 2025 |

**Ce que Meta AUTORISE explicitement** : répondre automatiquement à une action **initiée par
l'utilisateur** — un commentaire, une réponse à une Story, un message privé reçu.
**Ce que Meta INTERDIT** : la prospection à froid automatisée (DM non sollicités), l'accès API
non autorisé, le multi-compte, le contournement des limites.

👉 Doctrine NAVLYS (déjà gravée, routeur média) : offres officielles uniquement, un compte
légitime par plateforme, jamais de farming ni de contournement. Ici c'est pareil : **API
officielle ou partenaire certifié Meta, rien d'autre.** C'est ça, « ne jamais être mal noté ».

## ✅ Plateformes retenues (bien notées, gratuites d'abord)

| Plateforme | Notes (G2 / Capterra) | Gratuit ? | Rôle pour NAVLYS |
|---|---|---|---|
| **Meta Business Suite** (officiel Meta) | — (outil natif) | **100 % gratuit** | Base : boîte de réception unifiée FB+IG, réponses enregistrées, programmation. Zéro risque par définition. |
| **Metricool** | 4,5/5 G2 · 4,4/5 Capterra | **Oui** : 11 réseaux, 50 posts/mois à 0 € | Programmation + boîte de réception + analytics multi-réseaux. Meilleur rapport gratuit/complet. |
| **Buffer** | 4,3/5 G2 · 4,5/5 Capterra | **Oui** : 3 canaux, 30 posts, sans limite de durée | Programmation simple, publication multi-réseaux. |
| **ManyChat** | Partenaire Meta **certifié** (messaging) + certification technique WhatsApp | Oui (plan gratuit Messenger/IG de base) | Dialogue automatisé DM/commentaires Instagram, Messenger, WhatsApp — l'agent « écoute et répond » en conformité totale. |
| **Agorapulse** | 4,5/5 G2 (967 avis) · 4,6/5 Capterra (facilité n°1) | Oui (3 profils, 10 posts, 100 messages/mois) | Boîte de réception avancée (commentaires + DM + avis), montée en gamme possible. |

Écartés : tout outil de « growth hacking » IG/TikTok non certifié (auto-follow, auto-DM à froid,
scraping) — c'est exactement ce qui fait bannir.

## 🔌 Branchement au CORE (chantier NAVCOM/NAVCOMU)

1. **Écouter** : webhooks officiels Meta (commentaires, DM) → RPC `navlys_incident` / mission
   NAVCOM, ou boîte de réception Metricool/ManyChat.
2. **Réfléchir** : l'agent (NAVCOM Clara / NAVCOMU Sofia) prépare la réponse avec le pipeline
   habituel (LLM + `agent_bible` + `navlys_positiver()` — voir lexique ci-dessous).
3. **Répondre** : uniquement aux interactions initiées par le membre, via l'API officielle.
4. **Valider** : les réponses sensibles passent en `a_valider` ; Bruno les libère **en un clic**
   avec le bouton **« ✅ Tout valider »** du cockpit (action `valider_tout`).

## 💛 Communication 100 % positive (gravée en base, règle permanente)

- Table **`core_lexique_positif`** : chaque terme négatif interdit a son remplacement positif
  (problème→solution en cours, impossible→voici comment, erreur→amélioration, etc.).
- Fonction **`navlys_positiver(texte)`** : réécrit tout livrable de communication en supprimant
  les termes négatifs avant publication.
- Doctrine : tutoiement + prénom, chaleur, philosophie de Bruno (toujours positif, orienté
  solution, jamais un mot négatif), statut simple citoyen, cotisation jamais prix.
- SQL : `sql/communication_positive_valider_tout.sql`.

## 📌 Ce qui dépend de Bruno (pas du code)

1. Créer/relier les comptes officiels : Meta Business Suite (page FB + compte IG professionnel),
   puis Metricool et ManyChat avec **le login officiel Meta** (jamais un mot de passe partagé).
2. Rester sur les plans gratuits tant que le volume le permet (doctrine 0 €) — tout passage
   payant = signalement d'UNE ligne avant (Bible §6).

Sources : Zapier (meilleurs outils 2026), Buffer, Metricool, comparatifs G2/Capterra,
CreatorFlow (Meta API vs bots — taux de suspension), ManyChat (partenaire Meta officiel).
