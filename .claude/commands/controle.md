---
description: Lance la routine complète Sécuriser → Contrôler → Corriger → Apprendre via l'agent gardien.
---

Déroule la routine de contrôle du projet NAVLYS définie dans `docs/ROUTINE.md`.

1. Lis `docs/JOURNAL-ERREURS.md`, `docs/CHECKLIST-SECURITE.md` et `docs/ETAT-DES-LIEUX.md`.
2. Lance l'agent **gardien** pour exécuter : sécuriser → contrôler → corriger → apprendre.
3. Vérifie qu'aucune erreur déjà listée dans le journal ne se reproduit dans les
   changements en cours (`git diff` / `git status`).
4. Si une erreur nouvelle apparaît, ajoute-la au journal avec son garde-fou.
5. Mets à jour `docs/ETAT-DES-LIEUX.md`.
6. Termine par un rapport clair : ✅ validé / ⚠️ corrigé / 🛑 à décider / 📓 leçons ajoutées.

Argument éventuel de l'utilisateur : $ARGUMENTS
