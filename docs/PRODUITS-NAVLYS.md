# 🧩 CARTE DES PRODUITS / APPLICATIONS NAVLYS

> ⚠️ À LIRE avant de coder une « app NAVLYS » (évite ERR-005). Corrigé par Bruno le 2026-06-24.

## Les applications
| Nom | C'est quoi | Cœur | Backend (Supabase navlys-core) | Statut |
|-----|-----------|------|--------------------------------|--------|
| **NAVLYS Next Gen** | **Application de BIOGRAPHIE** — mémoire & transmission (« biographie vivante ») | Chapitres + souvenirs (photos/textes/audio) | tables **`chapitres`**, **`souvenirs`** (RLS par `user_id` → auth.users) | 🟠 « beaucoup travaillé » — produit fini attendu |
| **NavFin** (NAVLYS Finance) | **Application FINANCE** — éducation & veille | **Méthode 90/10** (Forteresse/Capital Plaisir), App Trading F1/F2/F3 | `inscriptions`, `daily_brief`, `core_knowledge`, `navlys_memoire` | 🟢 landing/membre construit (`sites/navfin/`) |
| **NAVBIO / navbiolife.com** | Vitrine publique de la biographie | renvoie vers Next Gen | — | 🟢 site v2 |

## Pilier transverse demandé par Bruno (2026-06-24)
- **🎙️ Voix + WhatsApp** : cloner la voix de Bruno et **lui parler avec sa propre voix sur WhatsApp**,
  + « t'avoir en ligne » (agent NAVLYS joignable). Briques : clone vocal (à confirmer le fournisseur :
  ElevenLabs / HeyGen) + **360dialog** (WhatsApp Business, déjà payé) + **core Hetzner** (orchestration).
  → Projet à part entière, voir `docs/VOIX-WHATSAPP.md` (à créer). Pas trivial en qq jours — plan par étapes.

## Règle
Avant tout dev : **Next Gen = biographie**, **NavFin = finance**. Ne jamais réétiqueter l'un en l'autre.
