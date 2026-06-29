# 🧭 NAVLYS — Point complet (synthèse tous départements) — 2026-06-29

> Ultra-review **LECTURE SEULE** demandée par Bruno. Aucune écriture/déploiement/publication/dépense
> n'a été déclenchée — seul ce fichier de rapport a été créé.
> Méthode : lecture des 4 fichiers d'or (`GOUVERNANCE.md`, `JOURNAL-ERREURS.md`, `CHECKLIST-SECURITE.md`,
> `ETAT-DES-LIEUX.md`) + revue par département (docs + code du dépôt). Sources citées en chemins exacts.
>
> ⚠️ **Limite honnête** : la policy d'egress bloque le live (navlys.com, api.vercel.com, api.supabase.com)
> et aucun connecteur MCP Vercel/Supabase n'est exposé cette session. Donc **rien n'a pu être testé en
> production** : ce point est **statique** (code du dépôt + mémoire). Le code du dépôt ≠ garantie de ce
> qui est réellement servi en prod (cf. ERR-006). Les statuts « live » s'appuient sur les captures et
> décisions déjà documentées, à reconfirmer par Bruno sur le site réel.

---

## ⚡ TL;DR (5 puces)

- **Le projet est solide et bien gouverné** : NAVLYS est en **phase BETA**, la refonte de `navlys.com`
  est **prête en source** (`live-source/`, conformité VERTE : 0 terme interdit, 0 promesse, `#7DD3FC`,
  disclaimer partout). 8 règles gravées + journal d'erreurs (ERR-001→007) actifs.
- **Le frein n°1 reste la chaîne de décisions** : une poignée d'arbitrages **Bruno-only** bloquent le
  lancement propre — **date publique unique**, **prix** (3 grilles coexistent), **slogan** (2 sources
  se contredisent), **entité juridique** (FR/IL → débloque Stripe).
- **2 non-conformités connues persistent en prod (présumé)** : « Jérusalem » sur navbiolife (meta +
  `launch-offer.js`) et « +8 à 12 % » sur brunopartouche.com/bio. **Corrections prêtes mais NON
  déployées** (`corrections-pretes/`) → attendent le feu vert.
- **Sécurité du dépôt = VERTE** (0 secret en clair, `.gitignore` solide, RLS OK, clés serveur-only),
  mais des **actions sensibles Bruno restent ouvertes** : révoquer le **token Vercel exposé**, finir la
  **révocation Hermès**, sécuriser le **cockpit Hetzner**.
- **Technique cohérente** (Vercel + Supabase + Resend + Sentry + ElevenLabs + Cloudflare + 360dialog),
  **Hetzner = legacy/abandonné**, **4 endpoints** en source (`navlex`, `sav`, `voice`,
  `whatsapp-webhook`), mais **lien GitHub↔Vercel incomplet** (push = aperçu, prod = promotion manuelle).

---

## 🚦 Tableau de bord par département

| Département | État | Point clé | Action n°1 |
|---|:---:|---|---|
| 1. **Stratégie & Produit** | 🟠 | Méthode 90/10 claire, mais **3 grilles de prix** et **dates** non figées | Bruno : figer **1 date publique** + **1 grille de prix** |
| 2. **Conformité & Juridique** | 🔴 | Cadre solide, mais **Jérusalem + « +8 à 12 % »** présumés encore en prod | Bruno : **feu vert déploiement** des corrections prêtes |
| 3. **Technique & Sites** | 🟠 | Refonte prête ; **Hetzner legacy** ; **GitHub↔Vercel** incomplet | Bruno : régler **Root Directory=`live-source`** + Production Branch |
| 4. **Design & Charte** | 🟢 | `#7DD3FC` **propre dans la source déployable** (résidus seulement en archives) | Claude : aligner le **slogan** « ton rythme » sur sites/ après arbitrage |
| 5. **Sécurité** | 🟠 | Dépôt VERT ; actions sensibles ouvertes côté Bruno | Bruno : **révoquer token Vercel** + finir Hermès + cockpit Hetzner |
| 6. **Communication & Contenu** | 🟠 | Kits riches ; **slogan en conflit** + **deperso vs voix Bruno** | Bruno : trancher **slogan + cadre voix/avatar** |
| 7. **Finance & Paiements** | 🟠 | Règle financière tenue ; **entité non figée** ; MoR (Lemon Squeezy) proposé | Bruno : **figer l'entité** + valider 2 lignes du registre (A1/A2) |
| 8. **Gouvernance & Récupération** | 🟢 | Mémoire intacte ; **~270 docs** récupérés exploitables ; packs documentés | Claude : continuer à marquer **legacy vs actif** (sans rien supprimer) |

---

## 🔴 Risques & alertes prioritaires (dédupliqués)

### 🔴 ROUGE

1. **Non-conformités présumées en prod (juridique).** « Jérusalem » sur `navbiolife.com` (meta +
   `launch-offer.js`, cf. ERR-003/ERR-005) et promesse « +8 à 12 % » sur `brunopartouche.com/bio`
   (ligne rouge). Corrections **prêtes et non déployées** :
   `corrections-pretes/navbiolife.com/index.html`, `corrections-pretes/brunopartouche.com/bio.html`,
   `corrections-pretes/PATCH-comptes-a-rebours.md` (P-04), procédure `corrections-pretes/MEMO-DEPLOIEMENT.md`.
   → **Qui agit : Bruno** (feu vert prod), puis **Claude** (déploie + re-grep HTML+JS+CSS, ERR-005).
   ⚠️ À reconfirmer sur le **site live** (egress bloqué cette session).
2. **Token Vercel exposé à révoquer (sécurité).** Tracé `docs/SECRETS-ET-CLES.md` (S7),
   `docs/SYNTHESE-NAVLYS.md` (décision n°1). → **Qui agit : Bruno** (rotation de secret = sensible).
3. **Révocation Hermès incomplète (sécurité).** Dépôt nettoyé, mais la checklist d'accès réels n'est
   pas finie : GitHub token, SSH Hetzner, OAuth rclone, Supabase `service_role`.
   Source : `docs/INCIDENT-HERMES.md`. → **Qui agit : Bruno**.
4. **Cockpit Hetzner non sécurisé (sécurité).** Mot de passe exposé en clair + HTTP sur IP publique +
   `/root/navlys/` non sauvegardé. Source : `docs/DIAGNOSTIC-SERVEUR-2026-06-22.md`,
   `docs/ETAT-DES-LIEUX.md`. → **Qui agit : Bruno** (changer mdp, SSL/SSH clés, snapshot).

### 🟠 ORANGE

5. **Date de lancement incohérente (stratégie).** Docs internes = BETA ouverte (31 mai / 1ᵉʳ juin) ;
   countdown code refonte = **1ᵉʳ juillet 2026** (`live-source/navlys-alive.js` l.386 ;
   `docs/ETAT-DES-LIEUX.md` 2026-06-29). → **Qui agit : Bruno** (figer 1 date publique).
6. **Prix non figés — 3 grilles coexistent (stratégie/finance).** F1/F2/F3 = 29,99/39,99/49,99
   (`docs/STRATEGIE-NAVLYS.md`) vs 8,99/14,99/24,99 (`docs/ETUDE-PRIX.md`, `sites/navfin/`,
   `live-source/api/sav.js`) vs 49 €/490 €/39 € early-bird (`docs/RENFORCEMENT/01-strategie.md`).
   → **Qui agit : Bruno**.
7. **Slogan en conflit (communication).** Officiel figé (CLAUDE.md, 2026-06-25) =
   *« Ma méthode, ton argent, ton rythme. »* MAIS deux sources « verrouillées » se contredisent
   (tu/vous, tempo/rythme, signature — BM, police Fraunces vs Cinzel) — `docs/RENFORCEMENT/02-communication.md`.
   Et plusieurs fichiers utilisent encore « ton contrôle » (`docs/STRATEGIE-NAVLYS.md`,
   `sites/navfin/index.html`, `designs/navlys-teaser-card.html`). → **Qui agit : Bruno** (trancher),
   puis **Claude** (harmoniser partout).
8. **Dépersonnalisation vs voix « de Bruno » (conformité/com).** Scripts vidéo/voix incarnent Bruno
   en « je »/skipper, ce qui frotte avec la règle gravée n°1. Cadre proposé (voix IA + disclaimer,
   rattachée brunopartouche.com) non encore validé. Source : `docs/RENFORCEMENT/02-communication.md`.
   → **Qui agit : Bruno** (valider le cadre).
9. **Entité juridique non figée (finance/légal).** Bloque Stripe/MoR, factures, contrats partenaires,
   CGU. L'architecture retenue = « société israélienne encaisse tout » via **MoR (Lemon Squeezy/Paddle)
   + PayPal** (`docs/PAIEMENTS-READINESS.md`). → **Qui agit : Bruno** (+ avocat NTIC).
10. **Lien GitHub↔Vercel incomplet (technique).** Push = **aperçu** ; la prod reste promue à la main.
    À régler : **Root Directory = `live-source`** + **Production Branch**. Source :
    `docs/PROCEDURE-VERCEL-GITHUB.md`, `docs/ETAT-DES-LIEUX.md` (2026-06-28 c/d).
    → **Qui agit : Bruno** (dashboard Vercel).
11. **Pages légales incomplètes (juridique).** CGU/confidentialité créées mais avec placeholders
    `[ÉDITEUR]/[EMAIL]/[HÉBERGEUR]` (`corrections-pretes/navbiolife.com/cgu.html` + `privacy.html`) ;
    `/mentions /cgu /confidentialite` à créer sur navlys.com. → **Qui agit : Bruno** (identité éditeur,
    hors Git) puis **Claude** (rédige).
12. **DPA / consentement voix non signés (juridique).** ElevenLabs/HeyGen DPA + consentement voix de
    Bruno requis avant LIVE. Source : `docs/RENFORCEMENT/06-legal-conformite.md`. → **Qui agit : Bruno**.
13. **Hetzner à confirmer abandonné (technique).** 0 conteneur actif, mais `docs/VOIX-WHATSAPP.md` et
    `docs/CARTE-PRESTATAIRES.md` font encore reposer voix/WhatsApp/cron veille dessus → à replanifier
    sur Vercel/Supabase. → **Qui agit : Bruno** (décision) + **Claude** (replanifier).

---

## ✅ Plan d'action recommandé

### (a) 🟢 Sûr, tout de suite, par Claude (lecture / code / conformité — aucun feu vert requis)

- **Harmoniser le slogan** dès que Bruno l'a tranché : remplacer les « ton contrôle » résiduels par la
  version figée dans `sites/`, `designs/`, `docs/STRATEGIE-NAVLYS.md` (cohérence visuelle).
- **Re-grep conformité** systématique (HTML + JS + CSS) sur `live-source/` et `sites/` avant tout
  déploiement (garde-fou ERR-005). Note : `live-source/` et `sites/` sont **déjà propres** (0 `#5fe0ff`,
  0 terme interdit) ; les résidus sont **uniquement** dans les archives (`NAVLYS_CENTRAL_20260614/`,
  `NAVLYS_Teaser_Preview/`, `brunopartouche_DEPLOY/`) — non déployables.
- **Marquer clairement « legacy vs actif »** (sans rien supprimer — règle gravée 8) : archives,
  versions de pricing/FORMULES périmées, assets `sauvegarde-sites/` à patcher avant réemploi.
- **Préparer** (sans publier) : pages `/mentions /cgu /confidentialite` pour navlys.com, redirections
  navlys.io / teasers → navlys.com, replanification du flux voix/WhatsApp hors Hetzner.
- **Tenir la mémoire à jour** (`ETAT-DES-LIEUX.md`, journal) à chaque étape.

### (b) 🔴 Attend le feu vert de Bruno (argent / juridique / prod / suppression / secrets)

- **Déployer les corrections conformité** (Jérusalem + « +8 à 12 % ») sur navbio & brunopartouche.
- **Figer** : la **date publique unique**, la **grille de prix**, le **slogan** (tu/vous, tempo/rythme,
  — BM, police), le **cadre deperso ↔ voix Bruno**.
- **Entité juridique** (FR/IL) + **avocat NTIC** + **DPA ElevenLabs/HeyGen** + **consentement voix**.
- **Sécurité sensible** : révoquer le **token Vercel**, finir la **révocation Hermès**, sécuriser le
  **cockpit Hetzner** (mdp, SSL, SSH clés, snapshot `/root/navlys/`), décider de **garder/arrêter Hetzner**.
- **Vercel** : régler **Root Directory = `live-source`** + **Production Branch** (ou Promote to Production)
  pour rendre le déploiement automatique au push.
- **Registre financier** : trancher **A1** (Google Workspace, changement de tarif au 27/06) et **A2**
  (Qonto, fin d'essai) — `docs/REGISTRE-VALIDATIONS-FINANCIERES.md`.

---

## 📦 Récupération / inventaire (exploitable vs périmé)

| Source | Volume | État | Verdict |
|---|---|---|---|
| `recup-docs/` (cerveau OneDrive) | ~3,3 Mo, ~270–319 docs | À jour (mai-juin 2026), secrets = placeholders | ✅ **Exploitable** — source stratégie. Conserver. |
| `recup-docs/onedrive/_MASTER_NAVLYS_NOW.md`, `00_ORGANIGRAMME.md`, `_AUDIT_CHARTE_COULEURS.md` | — | Sources officielles des 8 règles + charte `#7DD3FC` | ✅ **Exploitable** (références gravées). |
| `live-source/` | refonte navlys.com complète + 4 API | Conformité VERTE, charte OK, slogan « ton rythme » | ✅ **Exploitable** — **source déployable de référence**. |
| `sites/` | maquettes v2 par domaine, souvent 1 page | Incomplètes (piège ERR-006) | 🟠 **Partiel** — ne JAMAIS pousser par-dessus le live. |
| `corrections-pretes/` | ~92 Ko, C-01→C-04 + P-01→P-05 | Prêts, testés, **NON déployés** | 🟠 **Exploitable en attente** — feu vert prod + mentions éditeur hors Git. |
| `sauvegarde-sites/_assets-moteur/` | 5 fichiers JS/CSS (~40 Ko) | `launch-offer.js` **périmé + « Jérusalem »** (ERR-005) | 🟠 **Partiel** — patcher avant tout réemploi ; HTML/médias/DB non capturés. |
| Packs racine (`NAVLYS_*_PACK`, `CHEVAL_TROIE_PACK`, `MARTINGALE_*`, press kit, brand kit…) | ~quelques Mo chacun | Documentés, codes prêts, **placeholders** côté secrets | ✅ **Exploitable progressif** — déployer selon roadmap (certains comptent des dates périmées à réancrer). |
| `_ARCHIVE_20260525/`, `_NAVLYS_BACKUPS_transpo_2026-05-25/`, `_NAVLYS_*_EXTRACT/` | ~quelques centaines de Ko | Antérieurs (mai 2026) | 🟡 **Périmé/archive** — garder (règle gravée 8), ne pas réutiliser tel quel. |
| Archives HTML legacy (`NAVLYS_CENTRAL_20260614/`, `NAVLYS_Teaser_Preview/`, `brunopartouche_DEPLOY/`) | — | Contiennent **52 résidus `#5fe0ff`** | 🟡 **Périmé** — non déployables ; ne pas confondre avec la source live. |

> ⚠️ **Vérifier avant arrêt Hetzner** : `/root/navlys/` peut contenir `config/.env` avec
> `ELEVENLABS_KEY` / backend voix (`docs/PASSATION-HERMES.md`) → snapshot **avant** toute décision.

---

## 📓 Décisions déjà figées (ne pas rouvrir)

- 📅 **Date publique de référence (code)** : **1ᵉʳ juillet 2026, 00:00 (Paris)** = `2026-06-30T22:00:00Z`
  (`live-source/navlys-alive.js`, `corrections-pretes/PATCH-comptes-a-rebours.md`).
  *(NB : reste à réconcilier avec « BETA déjà ouverte » des docs internes — voir question 1.)*
- 🪙 **Slogan officiel figé** : *« Ma méthode, ton argent, ton rythme. »* (tutoiement) — CLAUDE.md §1
  (2026-06-25). *(NB : 2 sources « verrouillées » se contredisent encore — voir question 3.)*
- 🎨 **Charte Ice Blue `#7DD3FC`** (officiel, `_AUDIT_CHARTE_COULEURS.md`). Source déployable déjà
  alignée (106 couleurs corrigées le 2026-06-25). Fond noir `#000000`, champagne `#e9d3a0`.
- 🧭 **Méthode 90/10** : 90 % Forteresse (ETF/DCA) + 10 % Capital Plaisir (`docs/STRATEGIE-NAVLYS.md`).
- 🪪 **Dépersonnalisation** : NAVLYS sans Bruno ; Bruno vit sur brunopartouche.com (règle gravée n°1).
- ⚖️ **Statut** : finfluenceur déclaré, **ZÉRO ORIAS / ZÉRO CIF** — éditeur pédagogique, jamais de
  conseil perso ni promesse de rendement.
- 💰 **Règle financière** : Bruno seul valide tout débit/paiement/investissement (sauf abonnements en
  cours). 🤖 **Autonomie** : Claude déploie en prod seul après contrôle gardien ; **argent + juridique
  + gate + suppressions = Bruno** (`docs/AUTONOMIE-CLAUDE.md`).
- 🖥️ **Architecture** : Vercel + Supabase (Hetzner abandonné/legacy).

---

## ❓ Questions ouvertes pour Bruno (max 6)

1. **Date publique unique** : on garde le countdown **1ᵉʳ juillet 2026** affiché, ou on bascule le
   discours sur « **BETA déjà ouverte** » ? (les deux coexistent aujourd'hui). Quel cap unique partout ?
2. **Prix** : quelle grille officielle on verrouille — **8,99/14,99/24,99** (étude prix, déjà dans la
   source) , **29,99/39,99/49,99** (ancienne), ou **49 €/490 €/39 € early-bird** ? Et « 39 € à vie » :
   on garde ou on retire ?
3. **Slogan** : **tu** ou **vous** ? **rythme**, **tempo** ou **contrôle** ? signature **« — BM »**
   oui/non ? police **Cinzel/Cormorant** ou **Fraunces** ? (1 seule version ensuite partout).
4. **Feu vert déploiement conformité** : je peux déployer les corrections **Jérusalem** (navbio) et
   **« +8 à 12 % »** (brunopartouche/bio) ? (corrections déjà prêtes et testées).
5. **Entité juridique** (FR / société IL / les deux) : c'est le verrou qui débloque Stripe/MoR,
   factures, contrats partenaires et les CGU. Quelle est la structure officielle qui **facture** ?
6. **Sécurité sensible** : OK pour que tu prennes en charge maintenant — **révoquer le token Vercel**,
   **finir la révocation Hermès**, et **sécuriser/décider Hetzner** (mdp cockpit, SSL, snapshot, garder
   ou arrêter) ?

---

*Rapport généré le 2026-06-29 — lecture seule. Aucune action sensible déclenchée (zéro déploiement,
zéro publication, zéro écriture base, zéro dépense). Prochaine étape : arbitrages de Bruno ci-dessus.*
