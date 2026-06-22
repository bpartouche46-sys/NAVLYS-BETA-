# 🧠 MÉMOIRE CENTRALE — consolider les conversations sur le core

> But : Bruno n'a **pas** à rouvrir / relancer chaque ancienne conversation Claude.
> Chaque conversation est **synthétisée une fois** dans ce dépôt, puis devient **jetable**.
> Le « cerveau » de NAVLYS, c'est ce dépôt Git — pas les fenêtres de chat.

---

## Le principe (anti-ERR-001)

Une conversation contient parfois des **décisions / faits** qui ne sont écrits nulle part.
Tant qu'ils restent dans le chat, ils sont **perdus à la prochaine saturation**. La parade :
on les recopie dans `docs/`, on commite, et la conversation peut être supprimée sans risque.

## Le flux de consolidation

```
Une conversation  →  Bruno la donne (copier-coller ou « résume cette conv »)
       ↓
Claude SYNTHÉTISE l'essentiel dans les bons fichiers de docs/
       ↓
Commit + push (gravé sur GitHub)
       ↓
Hermès fait `git pull` sur Hetzner → la mémoire est sur le CORE
       ↓
✅ Bruno SUPPRIME la conversation (son essence est sauvegardée)
```

## ⚠️ Règle d'or de suppression
**On supprime une conversation UNIQUEMENT après que sa synthèse est commitée.**
Jamais avant. En cas de doute → on garde.

## Où va quoi (pour ne pas tout mélanger)
- Décision stratégique / produit → `docs/STRATEGIE-NAVLYS.md`
- Erreur + garde-fou → `docs/JOURNAL-ERREURS.md`
- Avancement / état → `docs/ETAT-DES-LIEUX.md`
- Design / charte → `docs/DESIGN-NAVLYS.md`
- Architecture agents → `docs/ARCHITECTURE-AGENT-DIRECTEUR.md`
- Accès / intervenants (sans secret) → `docs/ACCES-SERVEUR.md` / ce dossier
- Sinon, fait nouveau sans maison → on crée le bon fichier.

## Mettre la mémoire sur le core (Hetzner) — pour Hermès
Une seule commande à faire tourner régulièrement sur le serveur (dossier choisi) :
```bash
# 1re fois :
git clone https://github.com/bpartouche46-sys/NAVLYS-BETA-.git /root/navlys/memoire
# ensuite, pour mettre à jour :
cd /root/navlys/memoire && git pull
```
> 🔐 Aucun secret n'est dans ce dépôt → il peut être cloné sans risque sur le core.

---

## 📋 Registre des conversations à synthétiser

> Statut : ⬜ à synthétiser · 🟡 en cours · ✅ synthétisé (supprimable) · 🗑️ supprimée

| # | Conversation (sujet / date) | Statut | Synthèse rangée dans | Supprimable ? |
|---|------------------------------|--------|----------------------|---------------|
| 1 | _(à remplir par Bruno)_ | ⬜ | — | ❌ pas encore |

> Bruno : ajoute une ligne par conversation à traiter. On les prend une par une.
