# RUNBOOK BRUNO — la route vers 100 % (tes actions, courtes)

> Claude a fait **tout ce qui est faisable sans accès** (design, conformité, vérifs sécurité,
> mémoire). Il reste **5 actions que SEUL TOI peux faire** (tu as les accès / la 2FA).
> Chacune est courte. Claude te guide en direct si besoin.

## ① Voir tout EN LIGNE (preview) — ~2 min, zéro risque
1. **vercel.com** (équipe NAVLYS) → **Add New… → Project**.
2. **Import Git Repository** → `bpartouche46-sys/NAVLYS-BETA-` → **Import**.
3. **Framework = Other** → **Deploy**.
→ Tu obtiens une URL `…vercel.app` (le hub ouvre les 4 maquettes). **Tes domaines ne bougent pas.**
→ **Colle-moi l'URL** : je vérifie tout en direct.

## ② Sécuriser le serveur (URGENT) — guidé, ~15 min
Dans la **console web Hetzner** (tu tapes, je dicte) :
1. **Changer le mot de passe du cockpit** (il a été exposé en clair).
2. **Mettre le cockpit en HTTPS** (certbot) ou le fermer au public.
3. **Lancer une sauvegarde** (`scripts/backup.sh`) + snapshot Hetzner.
*(Aucune automatisation n'est en place → rien ne casse, mais rien n'est sauvegardé non plus.)*

## ③ Rotation des secrets — AVANT le lancement
- Passer le **SSH en clés** (désactiver mot de passe).
- **Révoquer/regénérer** les tokens API qui ont pu traîner dans des chats.
- Vérifier qu'aucun secret n'est en dur dans le code (repos NOVA-HUB / navlys.com).
- ✅ Déjà vérifié par Claude : clé Supabase anon = **sans danger** (INSERT-only, RLS OK).

## ④ Vidéos des présentations — quand tu veux
- M'envoyer les **URLs** des vidéos (ou les déposer sur le site `/media/…`).
- Je les branche dans la **playlist du cinéma** (l'écran enchaîne les présentations).

## ⑤ Mise en ligne RÉELLE (vrais domaines) — après ta validation
Ordre conseillé :
1. Tu **valides la maquette** (preview de l'étape ①).
2. On **applique les corrections conformité** (`corrections-pretes/`) + le design v2 à la **source** (NOVA-HUB / dépôt navlys.com).
3. Tu **déploies** (depuis ton poste / Git→Vercel) — **feu vert prod = toi**.
4. Vérif post-déploiement (Claude relit le live).

---
### Ce que Claude a bouclé cette nuit (rien en prod)
- Design cinéma v2 sur les 4 sites + menu haut fixe + rideaux bleu/champagne + charte `#7DD3FC` + conformité **verte**.
- Sécurité : **e-mails d'inscription protégés** (RLS vérifié). Audit live brunopartouche **propre**.
- Mémoire & docs à jour. Tout fusionné dans la branche principale.
