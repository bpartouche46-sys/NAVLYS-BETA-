# 🔍 RAPPORT ULTRAREVIEW — dépôt NAVLYS-BETA- (2026-06-24)

> Audit complet du dépôt (secrets, conformité, intégrité mémoire, charte). Chaque point a été
> **vérifié manuellement** (grep + lecture). Périmètre : ce dépôt uniquement. ⚠️ Le code live
> dans **NOVA-HUB** n'a pas pu être audité ici (accès proxy refusé) → à auditer séparément.

## 🟢 Synthèse : aucun problème critique ni élevé

| Gravité | Nombre |
|---|---|
| 🔴 CRITIQUE | **0** |
| 🟠 ÉLEVÉ | **0** |
| 🟡 MOYEN | **2** |
| ⚪ FAIBLE | **2** |

## ✅ Ce qui est BON (vérifié)
- **Aucun secret committé** : zéro mot de passe / IP serveur / clé SSH / token API en clair.
  La règle d'or est tenue (les « mot de passe » trouvés sont de la doc qui *décrit* le sujet,
  valeurs masquées `[À CHANGER]`).
- **Aucun terme interdit réel** dans les sites : pas de CIF, ORIAS, Ashkelon, [entité — hors dépôt], ni résidu « NOVA ».
- **Aucune promesse de rendement** : « +8 à 12% par an » a bien été **retiré de toutes les pages**
  (il n'apparaît plus que dans la doc qui trace la correction).
- **Disclaimer présent sur 14 pages sur 16.**
- **Aucun lien interne cassé** (tous les href .html résolvent).
- **Aucun renvoi de doc cassé** (tous les `docs/*.md` cités existent).
- Fausse alerte IP écartée : les `3.074.149.198` etc. sont des **nombres formatés**, pas des IP.

## 🟡 MOYEN (à traiter, sans urgence)

**M1 — Doublon dans le journal d'erreurs (principe « zéro répétition »)**
- Fichier : `docs/JOURNAL-ERREURS.md` → **ERR-002** (« Sites déployés sans Git ») et **ERR-004**
  (« Source des sites absente de Git ») décrivent **la même leçon**.
- Reco : **fusionner** en une seule entrée (garder un ID, faire pointer l'autre dessus pour ne pas
  casser les renvois de `corrections-pretes/README.md` et `docs/SAUVEGARDE-CODE-VERCEL.md`).

**M2 — Disclaimer absent sur 2 pages légales préparées**
- Fichiers : `corrections-pretes/navbiolife.com/cgu.html` et `…/privacy.html`.
- Nuance : ce sont des pages **légales** (pas du contenu financier) et les versions à jour
  `sites/navbiolife.com/cgu.html` / `privacy.html` **contiennent bien** le disclaimer.
- Reco : déployer les versions `sites/` (à jour) et considérer `corrections-pretes/` comme obsolète,
  ou ajouter le bandeau aux deux pages par cohérence.

## ⚪ FAIBLE (cosmétique)

**F1 — Charte couleur non alignée**
- Fichier : `sites/navlys-app/finance.html` (lignes 11 et 50) utilise l'ancien Ice Blue
  **`#5fe0ff`** (et le vin `#7a1f2b`) au lieu de la charte **`#7DD3FC`**.
- Reco : remplacer `#5fe0ff` → `#7DD3FC` (changement d'une variable CSS).

**F2 — Mot « Jérusalem » dans le hub de prévisualisation**
- Fichier : `index.html` (ligne 24) — texte « NAVBIO — **sans « Jérusalem »**, CGU/Privacy OK ».
- C'est une **description interne** (hub de preview, non public) qui dit justement que le terme
  a été retiré ; mais le mot apparaît littéralement.
- Reco : reformuler (ex. « sans référence géopolitique ») pour zéro ambiguïté.

## 📌 Hors périmètre (rappel des vrais risques connus, déjà au journal/ETAT)
- 🔴 Mot de passe **cockpit** exposé en clair (hors dépôt) → **à changer**.
- 🔴 **Aucun backup serveur** Hetzner (hors snapshot) → à mettre en place.
- 🟠 SSH par mot de passe encore actif → passer en clés.
- ❓ Code de **navbiolife.com / navlys.io / teasers** : présence dans GitHub à confirmer.

## ✅ Conclusion
Le dépôt est **propre et sûr** : rien ne bloque, aucune fuite, conformité publique respectée.
Les 4 points relevés sont **mineurs** et faciles à corriger. Les vrais risques restants sont
**côté serveur** (mot de passe cockpit + backups), pas dans le code.
