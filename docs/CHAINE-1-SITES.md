# 🔗 CHAÎNE N°1 — SITES / DÉPLOIEMENT (premier test du directeur)

> **Décision Bruno (2026-06-23)** : la première chaîne complète câblée pour tester
> l'Agent Directeur est **Sites / déploiement**.
> Objectif : prouver le modèle « **le directeur PROPOSE & EXÉCUTE · le gardien CONTRÔLE ·
> Bruno VALIDE le sensible** » sur un cas réel, **sans jamais** déployer en prod sans feu vert.
> Rattachement : `ARCHITECTURE-AGENT-DIRECTEUR.md` (Brique 2) + `CORE-CENTRAL-TECHNIQUE.md`.

---

## 0. Pré-requis BLOQUANT (étape en cours)

🚧 **La source des sites doit être dans GitHub** (versionnée, propre, sans secrets).
- En cours : installation de Claude Code sur le **PC du bureau** → rapatriement de la source
  (avec `.gitignore` qui bloque `.env`/clés/mots de passe **avant** tout push).
- Sans ce pré-requis, l'agent Sites ne peut pas travailler de façon fiable (cf. ERR-002/004).

> Tant que la source n'est pas dans Git, on **prépare** la chaîne mais on ne l'**exécute** pas.

---

## 1. Le flux de la chaîne (avec les feux)

```
1. SOURCE dans Git ............... (pré-requis, en cours)
2. Agent Sites LIT + PROPOSE ..... corrections (dont conformité) sur une branche
3. 🚦 GARDIEN CONTRÔLE ........... lignes rouges (ERR-003), disclaimer, 404, promesses
        │   ❌ si problème → renvoi à l'étape 2 (corrige), rien ne passe
        │   ✅ si conforme → feu vert CONFORMITÉ
4. BUILD / PREVIEW ............... déploiement preview (jamais prod direct)
5. 🔴 BRUNO VALIDE ............... feu vert PROD explicite (ou refus)
6. DÉPLOIEMENT PROD .............. opérateur serveur (à redéfinir) / Vercel CLI applique
7. VÉRIF POST-PROD + MÉMOIRE ..... re-contrôle en ligne, MAJ ETAT-DES-LIEUX
```

**Règle gravée** : aucune action de l'étape 6 sans le feu vert de l'étape 5.
Aucun déploiement qui n'a pas passé l'étape 3 (gardien).

---

## 2. Qui fait quoi

| Étape | Acteur | Garde-fou |
|------|--------|-----------|
| 2. Propose les corrections | **Agent Sites** (Claude) | Travaille sur **branche**, jamais sur prod |
| 3. Contrôle conformité | **Gardien** (`.claude/agents/gardien.md`) | **Bloque** avant publication (ERR-003) |
| 4. Preview | Agent Sites / CI | URL de preview, pas la prod |
| 5. Feu vert prod | **Bruno** | Décision humaine, non délégable |
| 6. Déploiement | **Opérateur serveur** (à redéfinir — ex-Hermès retiré) ou Vercel CLI | Seulement après étape 5 |
| 7. Vérif + mémoire | Agent Sites + Gardien | Re-grep des lignes rouges en prod |

---

## 3. Premier cas concret à passer dans la chaîne

Dès que la source est dans Git, le **tout premier passage** = la **Vague 1 déjà validée** :
- `brunopartouche.com/bio.html` (C-03 + C-04)
- `navbiolife.com/index.html` (C-01 + C-02 + compteur)
→ Ces fichiers ont **déjà** le feu vert conformité (contrôle gardien 2026-06-22), donc la
chaîne démarre directement à l'étape 4/5. C'est le test idéal : court, déjà sûr, démontrable.
(Les pages légales `/cgu` `/privacy` attendent les mentions d'éditeur → restent bloquées étape 5.)

---

## 4. Ce qu'on prépare MAINTENANT (sans attendre la source)

- [ ] Définir l'**agent Sites** (`.claude/agents/` ou `AgentDefinition`) : rôle, outils
      autorisés (Read/Edit/Grep + MCP Vercel/GitHub), **interdits** (pas de prod auto).
- [ ] Définir le **hook `PreToolUse`** « feu rouge » : bloque tout déploiement prod / dépense
      → exige une validation Bruno. (cf. `CORE-CENTRAL-TECHNIQUE.md §2`)
- [ ] Réutiliser le **gardien** existant comme étape 3 (déjà opérationnel).

---

## 5. Décisions encore ouvertes (Bruno)

- [ ] Nom/compte exact du dépôt GitHub des sites (**NOVA-HUB** ?) — à confirmer.
- [ ] Qui exécute le déploiement prod (étape 6) ? **À redéfinir** (Hermès retiré — ERR-005).
- [ ] Langage du moteur quand on industrialisera (reco : TypeScript).
