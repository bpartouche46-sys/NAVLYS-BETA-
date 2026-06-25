# ✅ CHECKLIST E-RÉPUTATION — Bruno × NAVLYS

_28 mai 2026 · Cas par cas, case à cocher, temps estimé, validation explicite Bruno._

> **Comment lire ce doc** : chaque ligne = une action atomique. Bruno coche au fur et à mesure. Les actions « Claude autonome » sont menées par Claude après ton OK. Les actions « Bruno opère » nécessitent que Bruno se connecte/clique lui-même (Anthropic ne permet pas à Claude de créer ni gérer ses comptes).

---

## Légende

| Icône | Sens |
|---|---|
| 🤖 | Action autonome Claude (après ton OK initial) |
| 👤 | Action Bruno (Claude fournit le texte, Bruno colle / clique) |
| 🔴 | Urgence J-3 → J+3 |
| 🟡 | Urgence J+3 → J+14 |
| 🟢 | Urgence J+14 → J+90 |
| ⚪ | Optionnel ou future |
| ✅ | Validation Bruno requise OUI |
| — | Validation Bruno requise NON (Claude fait sans demander) |

---

## 🌊 VAGUE 1 — Quick wins (J-3 → J+7)

### A. Validations préalables (Bruno répond avant que Claude touche aux fichiers)

| # | Action | Type | Validation | Temps | Texte fourni |
|---|---|---|---|---|---|
| 1.1 | Confirmer la persona du département : **« Le Sémaphore »** (reco Claude) vs Le Phare vs Le Hérault | ✅ | OUI | 30 sec | `_DEPARTEMENT_E_REPUTATION_charte.md` § 1 |
| 1.2 | Confirmer la liste `sameAs` finale du JSON-LD Person (8 URL — voir KG § 3) | ✅ | OUI | 2 min | `_E_REPUTATION_KNOWLEDGE_GRAPH_BRUNO.md` § 3 |
| 1.3 | Décision @amarock52 : (a) purge + rebrand, OU (b) suppression + nouveau compte | ✅ | OUI | 1 min | Recommandation Claude : option (b) |
| 1.4 | Confirmer création handles : `@NavlysCo` (X), `@navlys.official` (Insta), `@navlys` (YouTube) | ✅ | OUI | 2 min | `_E_REPUTATION_TEXTES_REMPLACEMENT.md` § 3, 4, 5 |
| 1.5 | Choisir LA photo officielle (1 fichier dans Downloads) | ✅ | OUI | 5 min | Recommandations dans `_E_REPUTATION_TEXTES_REMPLACEMENT.md` § 1 |
| 1.6 | Confirmer slogan officiel : « Ma méthode, votre argent, votre tempo. — BM » sur tous les sites | ✅ | OUI | 30 sec | — |
| 1.7 | Confirmer email pro pour comptes officiels : `bruno@navlys.com` | ✅ | OUI | 30 sec | (extrait CLAUDE.md confirmé) |

---

### B. Actions Claude autonome (sur fichiers locaux)

| # | Action | Type | Validation | Temps |
|---|---|---|---|---|
| 1.10 | Backup `.bak.20260528` des 4 HTML brunopartouche.com avant modif | 🤖 — | NON | 1 min |
| 1.11 | Injection JSON-LD `Person` Bruno dans `<head>` des 4 HTML brunopartouche.com | 🤖 ✅ | OUI (cf. 1.2) | 5 min |
| 1.12 | Backup `.bak.20260528` du `navlys/public/teaser.html` | 🤖 — | NON | 1 min |
| 1.13 | Injection JSON-LD `Organization` NAVLYS dans `<head>` teaser.html | 🤖 ✅ | OUI | 5 min |
| 1.14 | Vérification meta description + og:image cohérents sur les 4 sites | 🤖 — | NON | 10 min |
| 1.15 | Audit récursif `grep` dans Downloads pour résidus « NOVA Finance » / « DFENSER » | 🤖 — | NON | 5 min |
| 1.16 | Remplacement NOVA → NAVLYS / DFENSER → NAVLYS dans fichiers internes (Bruno valide cas par cas si trouvé) | 🤖 ✅ | OUI cas par cas | variable |
| 1.17 | Test Rich Results Google (URL : search.google.com/test/rich-results) sur brunopartouche.com après injection | 🤖 ✅ | NON (Claude rapporte le résultat) | 5 min |
| 1.18 | Génération `sitemap.xml` + `robots.txt` cohérents sur navlys.com et brunopartouche.com | 🤖 — | NON | 5 min |
| 1.19 | Ajout `<link rel="canonical">` sur toutes pages | 🤖 — | NON | 5 min |
| 1.20 | Journaliser toutes les actions Vague 1 dans `_NAVLYS_PILOTAGE/journal_e_reputation.md` | 🤖 — | NON | continu |

---

### C. Actions Bruno opère (textes fournis, Bruno colle)

| # | Action | Type | Validation | Temps | Texte |
|---|---|---|---|---|---|
| 1.30 | 🔴 Refondre headline LinkedIn `il.linkedin.com/in/bpartouche` | 👤 | — | 2 min | `_E_REPUTATION_TEXTES_REMPLACEMENT.md` § 2.A.1 |
| 1.31 | 🔴 Refondre About LinkedIn (texte long ou court) | 👤 | — | 5 min | § 2.A.2 |
| 1.32 | 🔴 Retirer localisation Ashkelon + tél +972 du profil LinkedIn | 👤 | — | 3 min | § 2.A.5 |
| 1.33 | 🔴 Mettre la photo officielle (1.5) en photo de profil LinkedIn | 👤 | — | 2 min | — |
| 1.34 | 🔴 Activer Google Search Console pour brunopartouche.com | 👤 | — | 15 min | Tuto : search.google.com/search-console — Bruno suit, Claude guide en chat si besoin |
| 1.35 | 🔴 Activer Google Search Console pour navlys.com | 👤 | — | 15 min | Idem |
| 1.36 | 🔴 Activer Google Alerts sur 4 mots-clés | 👤 | — | 5 min | google.com/alerts → « Bruno Mark Partouche », « Bruno Partouche NAVLYS », « NAVLYS finance », « NAVBIO LIFE » |
| 1.37 | 🟡 Décider du sort de `@amarock52` (1.3) et exécuter | 👤 | — | 5-30 min | Si purge : supprimer tweets politiques 1 à 1. Si suppression : help.x.com/en/managing-your-account/how-to-deactivate-x-account |
| 1.38 | 🟡 Lancer audit historique commentaires Facebook bruno.partouche.1 | 👤 | — | 30 min | Cibler tous les commentaires : Israël/Palestine/Zemmour/politique → suppression |
| 1.39 | ⚪ Sauvegarder export complet de tous les profils (LinkedIn « Get a copy of your data », Facebook idem) AVANT modifications | 👤 | — | 10 min | Bonne pratique au cas où |

---

## 🌊 VAGUE 2 — Cas par cas (J+7 → J+30)

### D. Demandes externes (Bruno envoie depuis bruno@navlys.com)

| # | Action | Type | Validation | Temps | Texte |
|---|---|---|---|---|---|
| 2.1 | 🟡 Envoyer demande RGPD à Charente Libre (article vote Zemmour) | 👤 ✅ | OUI | 5 min | `_E_REPUTATION_TEXTES_REMPLACEMENT.md` § 9.A |
| 2.2 | 🟡 Envoyer demande suppression profil Copains d'avant | 👤 ✅ | OUI | 5 min | § 9.B + formulaire RGPD linternaute.com |
| 2.3 | 🟡 Demande Google Refresh Outdated Content pour Charente Libre (après modif source) | 👤 ✅ | OUI | 5 min | search.google.com/search-console/remove-outdated-content |
| 2.4 | 🟡 Demande Google « Results About You » pour toute fuite donnée perso | 👤 ✅ | OUI | 10 min | support.google.com/websearch/answer/12719076 |
| 2.5 | 🟢 Demande Google Right to be Forgotten (UE) si Charente Libre refuse | 👤 ✅ | OUI | 15 min | support.google.com/legal/contact/lr_eudpa |

### E. Création comptes NAVLYS officiels (Bruno crée, Claude prépare)

| # | Action | Type | Validation | Temps | Notes |
|---|---|---|---|---|---|
| 2.10 | 🟡 Vérifier disponibilité handles : `@NavlysCo` X, `@navlys.official` Insta, `@navlys` YouTube | 👤 | NON | 5 min | Si pris, fallback : voir reco doc TEXTES_REMPLACEMENT |
| 2.11 | 🟡 Créer Page LinkedIn Company NAVLYS | 👤 ✅ | OUI | 15 min | Texte : § 2.B |
| 2.12 | 🟡 Créer compte X officiel NAVLYS | 👤 ✅ | OUI | 10 min | Texte : § 3.B |
| 2.13 | 🟡 Créer compte Instagram NAVLYS | 👤 ✅ | OUI | 10 min | Texte : § 4.B |
| 2.14 | 🟡 Créer chaîne YouTube NAVLYS | 👤 ✅ | OUI | 15 min | Texte : § 5 |
| 2.15 | 🟡 Tester JSON-LD Person Rich Results après ajout des `sameAs` réels | 🤖 — | NON | 5 min | search.google.com/test/rich-results |

### F. Wikidata (Bruno crée le compte gratuit, Claude fournit le contenu)

| # | Action | Type | Validation | Temps | Notes |
|---|---|---|---|---|---|
| 2.20 | 🟡 Créer compte Wikidata avec email bruno@navlys.com | 👤 | NON | 5 min | wikidata.org/wiki/Special:CreateAccount |
| 2.21 | 🟡 Créer item « Bruno Partouche » sur Wikidata | 👤 ✅ | OUI | 15 min | Déclarations : `_E_REPUTATION_KNOWLEDGE_GRAPH_BRUNO.md` § 6.B |
| 2.22 | 🟡 Créer item « NAVLYS » sur Wikidata | 👤 ✅ | OUI | 15 min | § 6.C |
| 2.23 | 🟡 Transmettre les 2 IDs Wikidata (Q-numbers) à Claude | 👤 | NON | 1 min | Pour mise à jour JSON-LD |
| 2.24 | 🟡 Claude met à jour les `sameAs` JSON-LD avec les Q-numbers Wikidata | 🤖 — | NON | 5 min | — |

### G. Photos profil cohérentes

| # | Action | Type | Validation | Temps |
|---|---|---|---|---|
| 2.30 | 🟡 Photo officielle → LinkedIn personnel | 👤 | — | 2 min |
| 2.31 | 🟡 Photo officielle → LinkedIn Company NAVLYS | 👤 | — | 2 min |
| 2.32 | 🟡 Photo officielle → X officiel NAVLYS | 👤 | — | 2 min |
| 2.33 | 🟡 Photo officielle → Instagram NAVLYS | 👤 | — | 2 min |
| 2.34 | 🟡 Photo officielle → YouTube NAVLYS (avatar) | 👤 | — | 2 min |
| 2.35 | 🟡 Header / banner cohérent (brand visuel) sur tous les profils | 👤 | — | 10 min |
| 2.36 | 🟡 Photo officielle → brunopartouche.com (`/bruno-officiel.jpg`) | 🤖 — | NON | 1 min |

---

## 🌊 VAGUE 3 — Renforcement long terme (J+30 → J+90)

### H. Production de contenu SEO

| # | Action | Type | Validation | Temps | Notes |
|---|---|---|---|---|---|
| 3.1 | 🟢 Article fondateur Bruno LinkedIn (« Pourquoi j'ai créé NAVLYS ») | 👤 ✅ | OUI | 20 min publi | Texte : `_E_REPUTATION_TEXTES_REMPLACEMENT.md` § 8 |
| 3.2 | 🟢 4 articles Cartographe sur brunopartouche.com/blog | 🤖+👤 ✅ | OUI cas par cas | 8h Claude / 30 min validation | Articles sourcés depuis `_CARTOGRAPHE_*.md` existants |
| 3.3 | 🟢 Page « À propos » longue sur brunopartouche.com | 🤖 ✅ | OUI | 1h | Reprend About LinkedIn long |
| 3.4 | 🟢 Page « Méthode NAVLYS » sur navlys.com | 🤖 ✅ | OUI | 1h | Reprend About Company LinkedIn |
| 3.5 | 🟢 1ère vidéo Cartographe YouTube (script + voix-off Bruno) | 👤 ✅ | OUI | 2h | Script à produire séparément |

### I. Press kit & RP

| # | Action | Type | Validation | Temps | Notes |
|---|---|---|---|---|---|
| 3.10 | 🟢 Press kit envoyé à 10 journalistes finance/tech FR | 👤 ✅ | OUI | 1h | Liste à constituer ; mail § 9.D |
| 3.11 | 🟢 Press kit envoyé à 5 médias israéliens (TOI, Globes, Calcalist) | 👤 ✅ | OUI | 30 min | — |
| 3.12 | 🟢 Démarchage 3 podcasts finance francophones | 👤 ✅ | OUI | 1h | La Martingale, Money Pickle, Yomoni Cast |
| 3.13 | 🟢 Lancement ProductHunt NAVLYS | 👤 ✅ | OUI | 2h | À planifier mois 1 post-lancement |
| 3.14 | 🟢 Tribune LinkedIn Bruno (1 par mois) | 👤 ✅ | OUI | 30 min/mois | — |

### J. Suivi & mesure

| # | Action | Type | Validation | Temps |
|---|---|---|---|---|
| 3.20 | 🟢 Audit Google mensuel (Sémaphore — Claude) | 🤖 — | NON | 30 min/mois |
| 3.21 | 🟢 Rapport mensuel Sémaphore dans `_NAVLYS_PILOTAGE/e_reputation/` | 🤖 — | NON | 15 min/mois |
| 3.22 | 🟢 Vérification Knowledge Panel apparu | 👤 ou 🤖 | — | 2 min/mois |
| 3.23 | 🟢 Si KG apparu : Bruno réclame ownership Google | 👤 ✅ | OUI | 15 min one-shot |

---

## 📋 Récapitulatif Top-Priorités Bruno

### Top 5 actions Bruno IMMÉDIATES (J-3 → J+3 — chacune ≤ 30 min)

1. ⏱️ **Choisir la photo officielle** (5 min) — bloque tout le reste de Vague 1.
2. ⏱️ **Valider liste `sameAs`** pour JSON-LD (2 min) — bloque action Claude 1.11.
3. ⏱️ **Activer Google Search Console** sur brunopartouche.com + navlys.com (30 min total).
4. ⏱️ **Activer Google Alerts** sur 4 mots-clés (5 min) — radar permanent.
5. ⏱️ **Décider sort `@amarock52`** : purge ou suppression (1 min décision + 5-30 min exécution).

### Top 5 actions Claude AUTONOMES (lancées dès ton OK)

1. 🤖 **Injection JSON-LD `Person`** sur brunopartouche.com (4 HTML) — fait dès OK 1.2.
2. 🤖 **Injection JSON-LD `Organization`** sur navlys.com.
3. 🤖 **Backup + grep résidus NOVA/DFENSER** dans tout Downloads (rapport pour validation).
4. 🤖 **Génération sitemap.xml + robots.txt** sur les 2 domaines.
5. 🤖 **Test Rich Results Google** après injection JSON-LD (rapport ramené).

---

## 🚦 Statut global au 28/05/2026

```
VAGUE 1   ░░░░░░░░░░  0% (en attente validation Bruno 1.1 → 1.7)
VAGUE 2   ░░░░░░░░░░  0%
VAGUE 3   ░░░░░░░░░░  0%

SCORE     ██░░░░░░░░  1.6 / 10 (baseline)
```

---

⚓ **Quand tu valides les 7 points de la section A, Claude démarre Vague 1.B immédiatement.**
