# 🧩 CARTE DES PRODUITS / APPLICATIONS NAVLYS

> ⚠️ À LIRE avant de coder ou tarifer une « app NAVLYS » (évite ERR-005).
> Vision complète posée par Bruno le 2026-06-24. Tout est **propulsé par le core NAVLYS**.

## L'écosystème (5 applications + le core)
| Produit | C'est quoi | Cœur / techno | Backend (Supabase) | Statut |
|---|---|---|---|---|
| **NAVLYS Next Gen** | **Transmission biographique** — mémoire & héritage de vie | Chapitres + souvenirs (photos/textes/audio) | `chapitres`, `souvenirs` | 🟠 code dans **NOVA-HUB** (à reprendre) |
| **NavLex** (NAVLYS Lex) | **Aide juridique** — tous les métiers du droit + **toutes les lois France & Europe** ; à **apprendre & développer sur le core** | Base de connaissances + IA juridique | `core_knowledge` (embeddings) | 🔵 à développer sur core |
| **NAVLYS Finance** (NavFin) | **Apprendre à fructifier son argent « en bon père de famille »** — éducation + outils, **API + IA**, méthode 90/10 | App finance + API marché (FMP) + IA | `inscriptions`, `daily_brief`, `navlys_memoire` | 🟢 landing/membre + prix faits (`sites/navfin/`) |
| **NAVLYS Concierge** | **La 1ʳᵉ aide à tous, pour tout, au quotidien** + **services spéciaux luxe** en option | Conciergerie assistée IA + réseau de prestataires | à définir | 🔵 à concevoir |
| **NAVLYS.IO** | **La consécration** : un **vrai « employé en ligne » 24/7** — SAV, prospection, réponses réseaux & **FAQ en live**, propulsé par toute la puissance du core | Agent IA omnicanal (SAV/prospection/FAQ live) | `agents`, `missions`, `agent_runs`, `departements` | 🟠 à **finir & finaliser** |

> 🧠 **Le core NAVLYS** (Hetzner + Supabase `navlys-core` : tables `agents`, `missions`,
> `departements`, `core_knowledge`…) = le moteur commun qui alimente **toutes** ces apps.

## Décision de nommage (SEO) — 2026-06-24
- **Nom public retenu : « NAVLYS Finance »** (et non « NavFin »). Raison : contient la **marque
  NAVLYS** + le **mot-clé « finance »** (fort en recherche) → meilleur référencement et cohérence.
  « NavFin » reste un **surnom court** (interne / handle d'appli).
- 👉 **Cohérence de la gamme** (reco) : pattern **« NAVLYS [Mot] »** partout →
  NAVLYS Next Gen · NAVLYS **Lex** · NAVLYS **Finance** · NAVLYS **Concierge** · NAVLYS **IO**.

## Études de prix — statut
| Produit | Étude prix faite ? |
|---|---|
| NAVLYS Finance | ✅ faite → `docs/ETUDE-PRIX.md` (prix d'attaque 8,99/14,99/24,99) |
| NavLex | ⬜ à faire (marché : LexisNexis, Doctrine, Predictice, legaltech) |
| NAVLYS Next Gen (biographie) | ⬜ à faire (marché : livres de vie, Storyworth, biographes) |
| NAVLYS Concierge | ⬜ à faire (marché : John Paul, conciergeries, services lux) |
| NAVLYS.IO (employé IA) | ⬜ à faire (marché : chatbots SAV, agents IA SaaS, Intercom/Crisp) |

## Règle
Avant tout dev ou tarif : relire cette carte. Next Gen = biographie · Lex = juridique ·
Finance = argent · Concierge = quotidien/luxe · .IO = employé IA 24/7. Ne jamais confondre.
