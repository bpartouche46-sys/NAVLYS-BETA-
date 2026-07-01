# 📜 RÈGLEMENT NAVLYS CORE BM

> **Règle d'or de Bruno (gravée le 2026-07-01)** : chaque fois que je m'apprêterais
> à m'interrompre pour demander une validation, je grave d'abord **une règle** qui
> supprime le besoin de redemander — puis **j'avance**. Objectif : aller jusqu'au
> **100 % opérationnel, commercialisable, testé et validé sur mobile ET PC**, sans
> m'arrêter.
>
> **Seule exception non négociable (Bible §6 n°1)** : un **vrai débit d'argent** →
> **signalement d'UNE ligne**, puis l'action suit. Ce n'est pas une question, c'est
> une protection.

## Comment ça marche

- Face à un choix, je consulte ce règlement (et la table `core_reglement`), j'applique, j'avance.
- Si un cas nouveau surgirait qui, avant, m'aurait fait demander : **j'appelle
  `navlys_regle(situation, decision)`** (grave la règle), puis je continue. Plus jamais à redemander.
- Gravé en base : table **`core_reglement`**, fonction **`navlys_regle()`**,
  `core_config.reglement_bm = actif`, doctrine `navlys_memoire`.

## Les règles (prescriptions de Bruno)

| Situation | Décision automatique |
|---|---|
| **Validation par défaut** | Réponse = **OUI**. Avancer sans demander (sauf débit réel). |
| **Publication** | **LIVE direct sur `main`** : chaque push = mise en ligne immédiate. |
| **Nouvelle fonctionnalité** | Page/route **isolée**, testée (`node --check` + rendu), puis live. |
| **Définition de « fait »** | Rien n'est « fait » tant que ce n'est pas **testé et OK sur mobile ET PC** (responsive). |
| **Charte visuelle** | Ice blue partout + or/champagne en accents, fond sombre. **Jamais** pourpre/mauve/fuchsia. |
| **Langue & posture** | Français. **Statut simple citoyen** (éducation, jamais de conseil perso). Bruno **invisible** derrière NAVLYS. |
| **Paiement — identité** | Marchand = **EURL bpartouche46** (Bruno seul). Ne rien réorganiser, tout est référencé. |
| **Paiement — rails** | Stripe + PayPal + Lemon Squeezy (MoR/TVA). **Anti-blocage** (bascule config). Test d'abord. |
| **Marque biographie/vie** | Nom unique = **NAVLYS Next Gen**. NAVBIO & navbiolife.com = alias → navlys.com/next-gen. |
| **Finance** | Méthode **90/10**, martingale idéale (fait inhabituel récurrent), **éducatif uniquement**. |
| **Dépendance externe instable** | Chercher alternatives (net/forums) + **brique interne stable**. Objectif 100 % autonome. |
| **Incident** (bug/erreur/plainte/débit/alerte) | Classer, router, régler (`navlys_incident`), **graver une règle** permanente. |
| **IA payante** (coloriage, vidéo, musique, voix ElevenLabs) | **Signalement d'UNE ligne** avant le débit, puis exécuter. |
| **Une question de validation reviendrait** | La **graver** (`navlys_regle`) au lieu de demander, puis avancer. |
| **Objectif** | Avancer sans s'arrêter jusqu'au **100 % opérationnel, commercialisable, testé mobile + PC**. |

## Faire évoluer le règlement

- Bruno peut ajouter/changer une règle à tout moment (« grave la règle : … »).
- Chaque nouvelle prescription = une ligne `core_reglement` (via `navlys_regle`) + une ligne ici.
- Le règlement est **vivant** : il grossit à chaque fois qu'une friction est supprimée.
