# 💰 CHIFFRAGE PARTENAIRE — coûts réels & participation aux frais (gravé le 2026-07-05)

> Ordre de Bruno : chiffrer le coût réel d'abonnements/prestataires par CORE
> partenaire pour offrir un **forfait par palier** (nombre d'abonnés du
> partenaire), avec **participation aux frais à vie** croissante par palier —
> **le CORE reste la propriété de NAVLYS WEB SERVICE** (règle n°22).

## 1. Coûts réels mensuels d'UN CORE partenaire (estimation 2026, à vérifier par NAVFI)

| Poste | Prestataire | Coût mensuel estimé (€ HT) | Note |
|---|---|---|---|
| Base + cerveau (BDD, Edge Functions, cron) | Supabase Pro (projet dédié) | ~23 € (25 $) | 1 projet isolé par partenaire (principe d'isolation) |
| Affichage web | Vercel | 0 → 18 € | mutualisable au début, Pro si trafic |
| Domaine | registrar | ~1,50 € | ~15-18 €/an, détenu par NAVLYS WEB SERVICE |
| Intelligence (agents, SAV, missions) | Anthropic / OpenRouter | 10 → 60 € | proportionnel à l'activité ; spend limit posé |
| Voix (clone + TTS) | ElevenLabs | 5 → 90 € | Starter→Pro selon volume d'écoute |
| Encaissement | Stripe (ou rail bancaire) | ~1,5–2,9 % + 0,25 €/transaction | proportionnel, pas un fixe |
| Ponts & automatisations | Zapier | 0 → 20 € | mutualisé sur notre plan |
| Sauvegardes, monitoring, maintenance | NAVLYS (interne) | temps CORE | notre travail 24/7, inclus |

**Total fixe réel : ~40 → 90 € HT/mois** par CORE au lancement, montant qui **croît
avec le volume** (IA + voix + trafic suivent le nombre d'abonnés du partenaire).

## 2. La grille de participation aux frais (forfait par palier — affichée sur /idee)

| Palier | Abonnés du partenaire | Participation aux frais (€ HT/mois) | Marge de couverture |
|---|---|---|---|
| Lancement | 0 → 100 | **99** | couvre les fixes + le temps de gestion |
| Croissance | 101 → 500 | **199** | IA/voix en hausse, capacité renforcée |
| Grand large | 501 → 2 000 | **399** | volume, langues supplémentaires |
| Univers | 2 000 + | **799** | pleine puissance + accompagnement rapproché |

Principes gravés :
- **À vie** : le partenaire garde ce modèle tant qu'il exploite — pas de rachat du CORE possible, il reste **notre propriété** (c'est la garantie d'entretien et de sécurité pour lui).
- **Transparent** : la grille est publique sur `/idee` ; ajustable avant signature dans la licence d'exploitation (mission NAVLEX).
- **Tout le reste de son encaissement est à lui** : la participation couvre le moteur, sa marge lui appartient.
- Les frais **proportionnels** d'encaissement (Stripe ~2 % ou rail bancaire ~1–2,5 %) restent à la charge du flux encaissé, comme pour tout marchand.

## 3. Ce que ça garantit à NAVLYS

- Palier Lancement : ~10 à 60 € de marge brute/mois par partenaire (couvre gestion + risque).
- La marge croît par palier pendant que les coûts unitaires baissent (mutualisation).
- Zéro partenaire à perte : si un poste explose (IA/voix), le palier suivant absorbe — et une
  alerte `navlys_incident` se déclenche avant (spend limits partout).

## 4. Vérification permanente

- Mission récurrente **NAVFI** : re-vérifier les prix courants des prestataires
  (Supabase, Vercel, Anthropic/OpenRouter, ElevenLabs, Stripe) et signaler tout écart
  qui menacerait une marge de palier.
- Toute évolution de la grille = mise à jour de ce fichier + de `/idee` + `navlys_regle`.
