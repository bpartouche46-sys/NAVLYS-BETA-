# 🔍 AUDIT placeholders `?ref=BP001` — 28/05/2026
_Recensement exhaustif des liens partenaires placeholders à remplacer après inscription affilié._

## Total détecté
- **35 fichiers** contiennent au moins une occurrence de `?ref=BP001`.
- Décomposition : **8 fichiers prod actifs**, **27 fichiers `.bak`** (sauvegardes — ne pas toucher).
- Plus les 2 fichiers `.md` documentaires (`_PARTENAIRES_LIENS_AUDIT.md`, `_RAPPORT_NUIT_28-29_MAI.md`) qui mentionnent le pattern (normal).

## ✅ FICHIERS PROD À TRAITER (8 fichiers HTML actifs)

| Fichier | Action |
|---|---|
| `navlys-io-vitrine-v6.html` | Remplacer URLs après inscription Impact + eToro + Binance |
| `bp-mobile-zen.html` | idem |
| `_BRUNOPARTOUCHE_TEASER_v2_compact.html` | idem |
| `_BRUNOPARTOUCHE_TEASER_avec_anim.html` | idem |
| `_BRUNOPARTOUCHE_HUB_PIVOT.html` | idem |
| `_BRUNOPARTOUCHE_AVEC_PARTENAIRES.html` | idem (page principale BP avec stack partenaires) |
| `_NAVLYS_IO_landing_v1.html` | idem |
| `test-client-001.html` | idem (page démo client 001) |

Plus indirect :
- `_BRUNO_BIO_demo_NAVBIO.html` — vérifier si placeholders présents (probable lien Stripe Bio Live)
- `_NAVLYS_PAPER_TRADING_demo.html` — vérifier placeholders Alpaca

## ❌ FICHIERS BACKUPS — NE PAS TOUCHER (27 fichiers `.bak`)
Ne PAS modifier les `.bak.*` sous peine de perdre l'historique de revert. Les laisser tels quels.

## Mapping de remplacement (à compléter au fil des inscriptions)

| Placeholder actuel | URL CPA réelle (à coller post-inscription) |
|---|---|
| `traderepublic.com/?ref=BP001` | Impact → `app.impact.com/.../Trade-Republic-Bank.brand` puis URL générée |
| `binance.com/?ref=BP001` | `binance.com/join?ref=[code Bruno]` |
| `etoro.com/?ref=BP001` | `etoro.com/B/[code eToro Partners]` |
| `kraken.com/?ref=BP001` | Impact → URL trackée Kraken |
| `coinbase.com/?ref=BP001` | Impact → URL trackée Coinbase |
| `bitpanda.com/?ref=BP001` | Impact → URL trackée Bitpanda |
| `boursobank.com/?ref=BP001` | Awin merchant 6992 → URL trackée |
| `boursedirect.fr/?ref=BP001` | Effiliation/Awin → URL trackée (post adhésion) |
| `alpaca.markets/?ref=BP001` | Refersion → URL Alpaca |
| `webull.com/?ref=BP001` | Impact → URL Webull |
| `tradingview.com/?ref=BP001` | Impact → URL TradingView |
| `notion.so/?ref=BP001` | Notion direct/Impact → URL Notion |
| `revolut.com/?ref=BP001` | App parrainage → `revolut.com/referral/[code]` |
| `wise.com/?ref=BP001` | `wise.com/invite/[code]` |
| `bybit.com/?ref=BP001` | `partner.bybit.com/b/[code]` |
| `okx.com/?ref=BP001` | `okx.com/join/[code]` |
| `cloudflare.com/?ref=BP001` | Impact → URL CF |
| `vercel.com/?ref=BP001` | Pas de CPA — retirer `?ref` ou laisser éditorial |

## 🛠 Procédure de remplacement recommandée

### Option 1 — Manuel ciblé (sûr)
Pour chaque fichier prod, ouvrir, faire find-and-replace ciblé sur le placeholder précis, puis sauvegarder. À répéter au fur et à mesure que chaque code affilié arrive.

### Option 2 — Script bash automatique (rapide mais à exécuter par Bruno)
Le script `_PARTENAIRES_LIENS_AUDIT.md` Annexe B existe déjà : `replace-affiliate-placeholders.sh`. Mettre à jour la map au fur et à mesure, puis lancer.

⚠️ Ne pas exécuter à la chaîne : un partenaire activé à la fois.

## État zéro (snapshot 28/05 00h)
- **0 lien CPA réel** en prod actuellement.
- **35 fichiers** touchent au pattern (dont 8 actifs).
- **18 mappings** à effectuer une fois les comptes affiliés ouverts.
- ETA réaliste 100 % activé : J+14 après lancement (mi-juin 2026) si rythme inscription 1-2 affilié/jour tenu.
