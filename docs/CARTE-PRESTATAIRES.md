# 🕸️ CARTE DES PRESTATAIRES — « la toile » NAVLYS (ex-NOVA)

> But : savoir **le rôle de chaque prestataire** et **qui est branché à quoi**
> (au **core** Hetzner et/ou à **Claude** via connecteurs). Demandé par Bruno le 2026-06-24.
> ⚠️ Les rôles marqués « à confirmer » sont des **hypothèses** déduites des mails/connecteurs —
> Bruno corrige si faux (principe : on n'invente pas).

## Légende connexion
- **→ Claude** : un connecteur MCP relie déjà ce service à moi (je peux lire/agir selon les droits).
- **→ Core** : branché au serveur central Hetzner. ⚠️ Aujourd'hui le core est quasi vide
  (0 conteneur au dernier diagnostic) → la plupart ne sont **PAS encore** câblés au core.
  Les brancher au core = la cible « agent directeur » (`docs/ARCHITECTURE-AGENT-DIRECTEUR.md`).

---

## 🧠 Cerveau / IA
| Prestataire | Rôle dans la toile | → Claude | → Core | Confiance |
|---|---|---|---|---|
| **Anthropic (Claude)** | L'**orchestrateur IA** (moi) : code, conformité, mémoire, pilotage | ✅ (je suis Claude) | ❌ pas encore | confirmé |
| **Voyage AI** | **Embeddings** (recherche sémantique / RAG) — base de connaissances, NavLex ? | ❌ | ❌ | à confirmer |
| **OpenRouter** | Passerelle multi-LLM utilisée par **Hermès** (retiré) | ❌ | 🟠 historique | confirmé (doc) |

## 🏗️ Infrastructure / hébergement
| Prestataire | Rôle | → Claude | → Core | Confiance |
|---|---|---|---|---|
| **Hetzner** | Le **core central** (serveur, Allemagne) | ❌ (accès via Bruno) | ✅ = le core | confirmé |
| **Vercel** | Héberge les **sites publics** (navlys.com, brunopartouche.com, navbiolife.com, navlys.io) | ✅ | ❌ | confirmé |
| **Supabase** | **Base de données** navlys-core (table `inscriptions`, RLS) | ✅ | 🟠 appelée en API par les sites | confirmé |
| **GitHub** | **Code** (NOVA-HUB) + **mémoire** (NAVLYS-BETA-) | ✅ | 🟠 cloné sur le core | confirmé |

## 💬 Communication / contenu / design
| Prestataire | Rôle | → Claude | → Core | Confiance |
|---|---|---|---|---|
| **Google Workspace** | **E-mail** (bruno@navlys.com) + domaine navlys.com | ✅ (Gmail/Drive/Agenda) | ❌ | confirmé |
| **360dialog** | API **WhatsApp Business** — canal WhatsApp (n° navbio +33 7 56 83 34 69 ?) | ❌ | ❌ | à confirmer |
| **HeyGen** | **Vidéos IA** (avatars / présentations) — les vidéos des sites | ✅ (HyperFrames) | ❌ | à confirmer |
| **Adobe / Canva** | **Design** (visuels marketing, cartes, Express) | ✅ | ❌ | confirmé (Adobe testé 24/06) |

## 💰 Argent / paiement (⚠️ règle financière §3 — Bruno seul décide)
| Prestataire | Rôle | → Claude | → Core | Confiance |
|---|---|---|---|---|
| **Qonto** | **Banque pro** (compte courant entreprise) — essai en cours ? | ❌ | ❌ | à confirmer |
| **BNP Paribas** | **Banque** (ouverture de compte initiée) | ❌ | ❌ | confirmé (mail) |
| **Stripe** | **Encaissement** des paiements clients (Équipage Navlys) | ✅ | ❌ | confirmé |
| **PayPal** | **Encaissement** alternatif | ✅ | ❌ | à confirmer |

## 📈 Produit finance / veille
| Prestataire | Rôle | → Claude | → Core | Confiance |
|---|---|---|---|---|
| **Alpaca** | API de **courtage / trading** — brique « App Trading » (produits F1/F2/F3) | ❌ | ❌ | à confirmer |
| **FMP** (Financial Modeling Prep) | **Données de marché** (cours, indices) — contenu finance / veille | ✅ | ❌ | à confirmer |
| **Semrush** | **SEO / veille** concurrentielle | ✅ | ❌ | à confirmer |
| **Descrybe Legal** | Recherche juridique **US** — usage NAVLYS ? (NavLex est FR) | ✅ | ❌ | douteux / à confirmer |

## 🗂️ Organisation
| Prestataire | Rôle | → Claude | → Core | Confiance |
|---|---|---|---|---|
| **Notion** | **Connaissance / docs** (label `[Notion]` présent) | ✅ | ❌ | confirmé |

---

## ❓ À confirmer par Bruno (pour ne rien inventer)
1. **360dialog** sert bien le **WhatsApp navbio** (+33 7 56…) ? Pour quel usage exact ?
2. **HeyGen** = les **vidéos de présentation** des sites ? (rappel : il manquait de vraies vidéos)
3. **Alpaca** = le moteur de la future **App Trading** ? En mode test ou réel ?
4. **Qonto** : tu gardes ? (essai gratuit terminé — voir registre financier A2)
5. **Voyage AI / FMP / Semrush / Descrybe** : lesquels sont **réellement utilisés** vs juste testés ?
6. Y a-t-il des prestataires **pris mais absents de mes mails** (donc invisibles pour moi) ?

> Une fois confirmés, on décide **lesquels brancher au core** (cible agent directeur) et
> **lesquels me relier** si pas déjà fait. Aucun branchement « argent » sans ton feu vert (§3).
</content>
