# LA ROUTINE — Sécuriser → Contrôler → Corriger → Apprendre

> La routine à dérouler à chaque intervention. Lançable d'un mot avec `/controle`.

## Étape 1 — SÉCURISER
1. Lire `docs/JOURNAL-ERREURS.md` et `docs/CHECKLIST-SECURITE.md`.
2. Vérifier que l'arbre git est propre (`git status`) — sinon faire un point de sauvegarde.
3. Se placer sur une **branche dédiée**.

## Étape 2 — CONTRÔLER
1. Comparer le travail prévu/réalisé avec le **journal des erreurs** : rien ne se répète ?
2. Passer la **checklist de sécurité** ligne par ligne.
3. Vérifier les points sensibles : secrets, suppression de fichiers, branche principale.

## Étape 3 — CORRIGER
1. Pour chaque problème trouvé : appliquer la correction la plus simple et sûre.
2. Tester. Si on ne peut pas tester, le **dire clairement**.
3. Commiter la correction avec un message explicite.

## Étape 4 — APPRENDRE (le plus important)
1. Toute erreur nouvelle → entrée dans `docs/JOURNAL-ERREURS.md` (ERR-XXX).
2. Définir le **garde-fou** : la règle qui empêche la récidive, et l'inscrire
   (dans `CLAUDE.md`, la checklist, ou un test).
3. Mettre à jour `docs/ETAT-DES-LIEUX.md`.

## Résultat attendu
- Le travail est sécurisé, contrôlé, corrigé.
- **Chaque erreur ne peut survenir qu'une seule fois** : la suivante est bloquée par un garde-fou écrit.
