# AUDIT SÉCURITÉ & CONFORMITÉ — nuit du 2026-06-23 (Claude, autonome)

> Vérifications faites en lecture seule (Supabase MCP + fetch Vercel). Aucune modif prod.

## ✅ RÉSOLU — E-mails d'inscription protégés (Supabase `navlys-core`)
- Table `public.inscriptions` : **RLS activé**, **une seule policy** =
  `inscriptions_insert_anon` (cmd **INSERT**, rôle **anon**, `with_check` = longueur e-mail 3–200).
- **AUCUNE policy SELECT** → le rôle `anon` ne peut **pas lire** la table.
- **Conclusion** : les e-mails collectés ne sont **pas exposés** publiquement.
  La **clé anon** présente dans le code client est **sans danger** (écriture seule, par design Supabase).
- ➡️ La question ouverte « RLS inscriptions = INSERT-only ? » est **CLOSE : OK**.

## ✅ COMPLÉTÉ — Audit conformité live de brunopartouche.com (home)
- Récupéré en entier (le fetch précédent était tronqué). Résultat :
  - Termes interdits : **aucun** (« conseil patrimonial / cabinet / CIF / ORIAS / gestion de patrimoine / clientèle » → 0).
  - « Israël / Ashkelon / Jérusalem » : **aucun** sur cette page. ✅
  - Promesses : **aucune** — au contraire, exemplaire (« Pas de promesse. Une discipline. » ; FAQ « Tu promets combien ? Rien. »).
  - Disclaimer pied de page : présent ✅ (pas de bandeau haut — la maquette v2 l'ajoute).
  - Ice Blue déjà sur `#7DD3FC` ✅.
- ⚠️ **Seul problème** (déjà connu) : compte à rebours **« 1ᵉʳ juin 2026 » périmé** (CTA + live-card) → à recaler 1ᵉʳ juillet (voir `corrections-pretes/PATCH-comptes-a-rebours.md`).

## 🔐 Reste à faire AVANT lancement (actions Bruno, je guide) — rappel
- Rotation/suppression des secrets à risque (SSH→clés, mdp cockpit exposé, tokens API).
- Backups serveur + SSL cockpit (cf. `docs/RUNBOOK-BRUNO-100.md`).
