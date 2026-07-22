# 🚀 LANCEMENT 14 JUILLET 2026 — vente + téléchargement (gravé le 2026-07-05)

> Ordre de Bruno : le 14 juillet, on démarre la VENTE et le TÉLÉCHARGEMENT.
> D'ici là : TOUT testé en ligne, actif, validé et prêt — front ET back office.
> Gravé en base : `core_config.launch_date=2026-07-14` + règle `core_reglement`.
> Doctrine : chaque case se coche par un TEST RÉEL (pg_net/diag), jamais une affirmation.

## FRONT OFFICE (ce que voit le client)

| Élément | Test | État au 05/07 |
|---|---|---|
| Pages clés (/, /adhesion, /profil, /idee, /finance, /next-gen) | HTTP 200 via pg_net | ✅ 12/12 vérifié |
| Téléchargement = installation PWA (manifest + sw) | manifest 200 + sw 200 + install mobile/PC | ✅ en ligne (test réel mobile à refaire J-2) |
| Adhésion bout en bout (inscription → base → mission NAVDEM) | fait en réel | ✅ testé puis nettoyé |
| Paiement RÉEL (cotisation annuelle, coffrets) | checkout `cs_live_…` | 🔴 **attend STRIPE_SECRET (sk_live)** |
| Voix NAVLYS (clone de Bruno) | audio avec `6hUoby…` | 🟡 clé complète du bon compte à poser |
| Encadrés vivants + vidéos produit | animations ✅ / vidéos studio | 🟡 mission NAVGEN en cours |
| Langues FR/EN/RU | back-translation (doctrine langues) | 🟡 re-passe avant J |
| Mobile + PC (définition de « fait ») | parcours réel sur les 2 | 🟡 revue NAVDEM quotidienne |

## BACK OFFICE (ce qui fait tourner)

| Élément | Test | État au 05/07 |
|---|---|---|
| Agents + missions (core-tick 5 min) | journal du jour | ✅ actifs |
| Santé site + santé CORE | crons `sante`, VERTE | ✅ (faux positif corrigé, règle n°23) |
| Quotas de volumes par formule | blocage réel dans Next Gen | 🟡 mission NAVTECH |
| CGV / mentions (annuel, coffrets, « à vie ») | livrable NAVLEX validé | 🟡 mission NAVLEX |
| Incidents + auto-cicatrisation | `navlys_incident` actif | ✅ |
| Sauvegarde complète | brique `sauvegarde` exécutée J-1 | 🟡 à déclencher le 13/07 |
| Spend limits (Anthropic, OpenRouter, ElevenLabs, fal) | vérif comptes | 🟡 Bruno confirme |
| Pack communication de masse | NAVCOM aligné (annuel + coffrets + partenaire) | 🟡 corrections en file |

## LES 3 CLÉS DU JOUR J (gestes de Bruno uniquement)

1. **`STRIPE_SECRET` (sk_live)** → la vente encaisse en réel. SANS ELLE, PAS DE VENTE LE 14.
2. **Clé ElevenLabs COMPLÈTE du compte au clone** → la voix de Bruno partout.
3. Spend limits confirmés partout.

## RITUEL QUOTIDIEN JUSQU'AU 14 (automatique)

- Chaque matin : crons santé + autotest (déjà en place) ; NAVMKT audit ; NAVDEM
  parcours mobile+PC ; toute anomalie → `navlys_incident` → règle gravée.
- **J-1 (13/07)** : sauvegarde complète + répétition générale (achat test réel
  1 € remboursé, installation PWA neuve sur mobile ET PC, voix, langues).
- **Jour J (14/07)** : bascule comm de masse (pack NAVCOM), surveillance en continu,
  boucle 💡 prioritaire.
