# 08 — ROADMAP FONCTIONNALITÉS & DATES (source réelle du code)

> Extrait de `_NAVLYS_ROADMAP_DATES.js` (Drive `navlys juin vrac md`, v1.0 · 29 mai 2026) —
> **source unique de vérité des dates/statuts** des composants `<NavlysCard>`.
> Statuts : **alive** (en ligne, `date:null`) · **building** (en construction, date prévue) · **coming** (à venir).

## 🔑 Ce que ça résout
- **Il n'y a PAS « une » date de lancement unique** : NAVLYS est **lancé/BETA**, et les fonctionnalités
  sortent sur une **feuille de route par brique**. Le compte à rebours « 1ᵉʳ juillet » du live = une
  **échéance offre/early-bird**, distincte de cette roadmap produit.
- Confirme l'état **BETA + déploiement progressif** (cohérent avec `_MASTER_NAVLYS_NOW.md`).

## navlys.com
| Brique | Statut | Date |
|---|---|---|
| cap-reve · laboratoire-nextgen · paper-trading · simulation-patrimoine | 🟢 alive | en ligne |
| nav-ia-chat | 🔨 building | 2026-06-02 |
| strategies-actives | 🔨 building | 2026-06-15 |
| trading-live | 🔜 coming | 2026-07-15 |
| api-publique | 🔜 coming | 2026-08-01 |

## navbiolife.com
| Brique | Statut | Date |
|---|---|---|
| depot-photos · synthese-ia-bio · timeline-interactive | 🟢 alive | en ligne |
| cinema-video | 🔨 building | 2026-06-20 |
| transmission-heritiers | 🔨 building | 2026-07-05 |
| livre-papier | 🔜 coming | 2026-09-15 |
| audio-voix | 🔜 coming | 2026-10-10 |

## brunopartouche.com
| Brique | Statut | Date |
|---|---|---|
| journal-bruno · faq-bruno · bruno-coin · partenaires-affilies | 🟢 alive | en ligne |
| atelier-mediterranee | 🔨 building | 2026-06-30 |
| podcast-bruno | 🔜 coming | 2026-07-10 |
| videos-youtube | 🔜 coming | 2026-08-01 |
| newsletter-bruno | 🔜 coming | 2026-09-01 |

## navlys.io
| Brique | Statut | Date |
|---|---|---|
| profils-createurs · creations-live · partenariats · demos-sectorielles | 🟢 alive | en ligne |
| studio-ia | 🔨 building | 2026-06-25 |
| marketplace-templates | 🔨 building | 2026-07-10 |
| pipeline-generation · affilies-partenaires | 🔜 coming | 07-20 / 10-01 |

## App NAVLYS / NAVBIO (intra) — extraits
- NAVLYS : sentiment-marché (06-12), comparateur-strat (06-18), replays (06-22), coach-ia-chat (06-02) = building ; alertes-push (07-05), cloud-backtests (08-15), synthèse-vocal (07-15) = coming.
- NAVBIO : vie6-héritage (07-05), video-90s (06-20) = building ; multilingue (09-15), audio-narré (10-10), coffre-notarial (11-01) = coming.

---

## 📦 Code/Config NOUVEAU repéré dans le Drive (source déployable — à rapatrier à l'étape déploiement)
Non présent côté chat, **utile pour le déploiement** (pas pour la stratégie) :
- `globals.css` + `globals (1).css` · `tailwind.config.js` · `next.config.js` · `_NAVLYS_ROADMAP_DATES.js`
- `_APP_CLIENT_SUPABASE_SCHEMA.sql` (schéma DB, 21 Ko)
- **HTML brunopartouche** : `_BRUNOPARTOUCHE_TEASER_v2_compact.html`, `_BRUNOPARTOUCHE_AVEC_PARTENAIRES.html`,
  `_BRUNOPARTOUCHE_TEASER_avec_anim.html` (≈ 500 Ko chacun)
- 🔴 `_VOIX_BRUNO_OFFICIEL.md` → contient le **VOICE_ID** → **NE PAS committer** (quarantaine).

> Recommandation : rapatrier ces fichiers **à l'étape déploiement** (Vercel↔GitHub), pas maintenant —
> ils ne changent pas la stratégie, et les gros HTML alourdiraient le dépôt inutilement à ce stade.
