# ☕ MÉMO BRUNO — Réveil 29 mai 2026 (J-3 lancement)

> Ouvre celui-ci en premier. Tout est ordonné par ordre d'exécution. ETA cumulé en bas.

---

## 🎯 TON TODO ORDONNÉ (chronologique J-3)

### ⏰ Matin 29 mai (avant 12h) — 1h35
| # | Action | Outil | Temps | Lien direct |
|---|---|---|---|---|
| 1 | **Lire `_MASTER_NAVLYS_NOW.md`** | n'importe quel device | 2 min | Downloads racine |
| 2 | **GitHub Passkey + 2FA** sur `bpartouche46-sys` | github.com/settings/security | 10 min | déverrouille Vercel CI/CD |
| 3 | **Coller clé SSH publique** du poste perso | github.com/settings/keys | 5 min | déverrouille push depuis terminal |
| 4 | **Compte Stripe** sur `bruno@navlys.com` | dashboard.stripe.com | 20 min | texte prêt : `_SITES_MASTER/_TEXTES_ONBOARDING/stripe_activite_fr.md` |
| 5 | **Compte Awin publisher** | awin.com → "join as publisher" | 30 min | bio prête : `_SITES_MASTER/_TEXTES_ONBOARDING/bio_publisher.md` |
| 6 | **Adhésion BoursoBank** (Awin merchant 6992) | ui.awin.com/merchant-profile/6992 | 3 min | post acceptation Awin |
| 7 | **Compte Impact.com publisher** | impact.com → "create publisher account" | 30 min | bio prête |

**ETA matinée = ~1h40.**

### 🌞 Après-midi 29 mai
| # | Action | Temps |
|---|---|---|
| 8 | **Adhésion Trade Republic Partners** via Impact dashboard | 10 min |
| 9 | **Adhésion Bitpanda + Coinbase + Kraken + TradingView + Notion** via Impact | 30 min total |
| 10 | **Compte eToro Partners** direct sur `etoropartners.com` | 15 min |
| 11 | **Binance Affiliates** depuis dashboard Binance (KYC déjà fait) | 10 min |
| 12 | **Envoyer 6 emails B2B** (Yomoni, Nalo, Linxea, Saxo, Bourse Direct, Vercel) depuis `bruno@navlys.com` | 30 min |
| 13 | **IBKR Refer-A-Friend** depuis Client Portal | 5 min |

**ETA après-midi = ~1h40.**

### 🌅 30 mai (J-1)
| # | Action | Temps |
|---|---|---|
| 14 | **Réception clés Stripe TEST** dashboard (sk_test_, pk_test_) | dès KYC validé |
| 15 | **Coller clés dans Vercel env vars** projet `navlys-app` scope `navlys` | 10 min |
| 16 | **Exécuter seed Stripe** : `STRIPE_SECRET_KEY=sk_test_xxx node navlys/scripts/seed-stripe-test.mjs` | 5 min |
| 17 | **Créer 9 Payment Links no-code** dans dashboard Stripe | 30 min |
| 18 | **Coller les 9 URLs `buy.stripe.com/...`** dans les CTA du teaser + page `/rejoindre-equipage` | 20 min |
| 19 | **Test paiement carte 4242 4242 4242 4242** en TEST | 5 min |
| 20 | **Récupérer codes affilié arrivés** (Trade Republic, eToro, Binance probables) | variable |
| 21 | **Mettre à jour `_SITES_MASTER/_CODE_READY/data/partenaires.json`** avec URLs CPA réelles | 10 min |
| 22 | **Lancer `replace-affiliate-placeholders.sh`** sur les 8 HTML actifs | 5 min |

**ETA J-1 = ~1h45.**

### 🚀 31 mai minuit Jérusalem (J0)
| # | Action |
|---|---|
| 23 | **Déverrouiller le gate** : Vercel env var `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` |
| 24 | **Re-déployer navlys-app** : `vercel deploy --prod --yes` (UN SEUL) |
| 25 | **Vérifier teaser BP countdown** termine à 0 et bascule sur landing |
| 26 | **Push premier post LinkedIn + X** depuis Publer |

---

## 🛠 CE QUE JE FAIS PENDANT QUE TU DORS / EXÉCUTES

✅ **Déjà fait cette nuit :**
- `_MASTER_NAVLYS_NOW.md` créé (point d'entrée unique mobile+desktop)
- DISPATCH mis à jour avec nouvelle chaîne de lecture
- Annexes D-H ajoutées à `_PARTENAIRES_LIENS_AUDIT.md` (sensibilité mix, roadmap mois par mois)
- Annexes S.1-S.4 ajoutées à `_STRIPE_CONNEXION_PLAN.md`
- Pack code `_SITES_MASTER/_CODE_READY/` (6 fichiers)
- Textes onboarding `_SITES_MASTER/_TEXTES_ONBOARDING/` (3 fichiers)
- 32 fichiers archivés dans `_SITES_MASTER/_ARCHIVE_NUIT_28-29_MAI/`
- **🔧 Bug countdown teaser BP patché** dans `brunopartouche-DEPLOY-v13-seo-polish_1/brunopartouche.com/index.html` (.bak préservé)
- _SITES_MASTER passé de **104 → 73 fichiers .md** (-30 %)

🔧 **Ce que tu fais valider/pousser au réveil :**
- Le patch countdown BP (voir section ci-dessous)
- L'archivage 32 fichiers (récupérable par `mv`)
- Le pack `_CODE_READY/` à copier vers `navlys/`
- `npm install stripe @stripe/stripe-js` dans navlys/

---

## 🔧 BUG COUNTDOWN TEASER BP — Diagnostic + Fix

### Diagnostic
Le countdown live `brunopartouche-teaser.vercel.app` utilise `requestAnimationFrame` brut sans throttle. Conséquence : les millisecondes scintillent à 60-120 Hz → impression de défaut visuel. Le timezone `+03:00` (IDT Israel été) est correct.

### Fix appliqué (local, pas encore déployé) ✅ JS validé
Fichier : `brunopartouche-DEPLOY-v13-seo-polish_1/brunopartouche.com/index.html`
Backup : `index.html.pre-countdown-fix-28-29mai.bak`

Méthode : patch via `awk` + `sed` (chirurgical, ne touche QUE les 7 lignes du countdown). Le fichier complet est validé : 106 lignes, 3 closing tags (`</script></body></html>`), syntaxe JS parsable par Node.

Changements :
1. **Tick d/h/m/s synchronisé sur changement de seconde** (`__lastSec`) → plus de re-render inutile.
2. **Tick ms throttlé à ~60 ms (≈16 fps)** → précision visible sans flash.
3. **Fallback robuste** si parsing ISO échoue : `Date.UTC(2026,4,30,21,0,0)` = 31 mai 00:00 IDT.
4. **Guards `if(el)`** pour ne pas crash si élément absent.
5. **Constante `LAUNCH_ISO`** exposée pour debug facile.

**Note technique** : première tentative via outil Edit a tronqué le fichier (caractères français + apostrophes mixés). Restauré depuis bak, patché via awk/sed Unix. Solution propre.

### Action Bruno
1. Au réveil, ouvrir `brunopartouche-DEPLOY-v13-seo-polish_1/brunopartouche.com/index.html` en local navigateur.
2. Vérifier visuellement : ms doivent défiler fluidement, pas chaotiques.
3. Si OK : déployer sur Vercel projet `brunopartouche-teaser` (un seul deploy, attendre READY).
4. Si pas OK : restaurer backup `cp index.html.pre-countdown-fix-28-29mai.bak index.html` puis me prévenir.

---

## 📂 ÉTAT FICHIERS — 73 dans _SITES_MASTER

**Pivots à GARDER absolument** (top 10) :
1. `_MASTER_NAVLYS_NOW.md` (racine Downloads) — point d'entrée
2. `_NAVLYS_DISPATCH.md` (racine) — routeur
3. `_NAVLYS_MASTER_INDEX.md` (racine) — référence détaillée
4. `_SITES_MASTER/_RAPPORT_NUIT_28-29_MAI.md` — récap nuit
5. `_SITES_MASTER/_RD_SYNTHESE_28_MAI.md` — chiffres web validés
6. `_SITES_MASTER/_PARTENAIRES_LIENS_AUDIT.md` — audit + annexes D-H
7. `_SITES_MASTER/_STRIPE_CONNEXION_PLAN.md` — plan Stripe + annexes S
8. `_SITES_MASTER/_TODO_BRUNO_FINAL.md` — TODO existant Bruno
9. `_SITES_MASTER/_007_RAPPORT_EXECUTIF.md` — benchmarks consolidés
10. `_SITES_MASTER/_NAVLYS_ORGANIGRAMME_MAITRE.md` — orga équipe

**Dossiers à inspecter au réveil :**
- `_SITES_MASTER/_CODE_READY/` (6 fichiers prêts à pousser)
- `_SITES_MASTER/_TEXTES_ONBOARDING/` (3 textes prêts à coller)
- `_SITES_MASTER/_ARCHIVE_NUIT_28-29_MAI/` (32 fichiers récupérables)

---

## 🚨 INTERDITS RESPECTÉS CETTE NUIT
- ✅ Gate `NEXT_PUBLIC_LAUNCH_UNLOCKED` non touché
- ✅ Aucun `vercel deploy` lancé
- ✅ Aucun token/secret en clair
- ✅ MX Google `navlys.com` intacts (5 enregistrements vérifiés)
- ✅ Aucune suppression sans backup `.bak`
- ✅ Pas de bascule Stripe LIVE
- ✅ Pas de modif DNS Namecheap

---

## 💰 RAPPEL OBJECTIF 2026 H2 (208k visiteurs cumulés)

| Mix | Total H2 |
|---|---|
| C 90/10 ultra-abo (juin-sept) | **816 k€** 🏆 |
| A 80/20 push abo (oct-déc) | 717 k€ |
| Trajectoire mixte recommandée | **~773 k€** |

Si Top 7 actions matinées exécutées avant 30/05 23h → trajectoire 770 k€ atteignable.

---

## 🇬🇧 ENGLISH ONE-LINER
J-3 launch May 31, 00:00 Jerusalem. Your 7-action morning (1h40): GitHub 2FA → Stripe account → Awin + Impact + Trade Republic + Bitpanda + Coinbase + Kraken affiliate accounts. Then J-1: Stripe TEST keys → 9 Payment Links → CTA URLs replaced → test card 4242. J0: unlock gate, deploy, push social. Countdown teaser BP bug patched locally (await your visual check before push). Target H2 2026 = 770 k€ cash-in.

---

> *« Un cap, une main, un jour. »* — ⚓ Bon réveil Bruno.
