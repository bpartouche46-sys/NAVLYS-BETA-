# Diagnostic serveur NAVLYS CORE — 2026-06-22

> Serveur « core central » NAVLYS chez **Hetzner Cloud** (datacenter **Nuremberg**).
> Diagnostic réalisé en guidant Bruno dans la **console web Hetzner** (Claude n'a pas
> d'accès réseau direct au serveur).
> 🔐 Règle d'or : aucune IP, aucun mot de passe, aucune clé n'est écrit ici.

## Tableau de santé 🟢🟠🔴

| Domaine | Élément | Constat | Statut |
|---------|---------|---------|--------|
| Système | Charge CPU | 0.02 / 0.05 / 0.01 (quasi nulle) | 🟢 |
| Système | RAM | 7,6 Go — **0,6 Go utilisé**, ~7 Go libres | 🟢 |
| Système | Swap | **0** (aucune mémoire de secours) | 🟠 |
| Système | Disque `/` | 150 Go — **2,8 Go utilisés (2 %)**, 141 Go libres | 🟢 |
| Système | Uptime | 14 jours, stable | 🟢 |
| Services | nginx (web) | **actif**, écoute port 80 | 🟢 |
| Services | Docker (moteur) | **actif** | 🟢 |
| Services | fail2ban (sécurité) | **actif** | 🟢 |
| Services | Conteneurs Docker | **0 conteneur lancé** (`docker ps` vide) | 🟠 |
| Réseau | SSH (port 22) | ouvert | 🟢 |
| Réseau | HTTP (port 80) | servi par nginx | 🟢 |
| Réseau | **HTTPS (port 443 / SSL)** | **absent** — pas de certificat Let's Encrypt | 🟠 |
| Sécurité | fail2ban | **13 IP bannies** (255 au total) — protège activement | 🟢 |
| Sécurité | Mot de passe root | **réinitialisé le 22/06** (l'ancien avait été exposé en clair) | 🟢 |
| Sécurité | Connexion SSH par mot de passe | encore active → **passer en clés SSH** recommandé | 🟠 |
| Contenu | `/root/navlys/` | **~9 sous-dossiers, contenu présent**, maj 22/06 | 🟢 |
| Sauvegardes | crontab / backups auto | **non confirmés** (commande à relancer : `crontab -l`) | ⚪ |

## Lecture d'ensemble

- ✅ Le serveur est **sain, stable, protégé** (fail2ban actif et efficace, très peu de
  charge, énormément de place libre).
- 🟠 Mais il fait tourner **presque rien** en ce moment : **0 conteneur Docker**, pas de
  HTTPS, RAM/disque à peine entamés. (À relier au travail de **Hermès**, l'agent qui a
  équipé ce serveur — voir `docs/ETAT-DES-LIEUX.md` session (f) : Docker/nginx/fail2ban/
  certbot/PM2 installés, 4 sites récupérés, dépôt NOVA-HUB cloné.)
- 🟢 **Découverte importante** : `/root/navlys/` **contient du code/des fichiers** (plusieurs
  dossiers récents). C'est probablement **la source** liée au travail Hermès / NOVA-HUB.
  **À sauvegarder en priorité.**

## 3 priorités serveur

1. **💾 Sauvegarder `/root/navlys/`** — code/contenu présent.
   → Snapshot Hetzner (console) + export du dossier vers GitHub (sans secrets).
   (Cf. volume Hetzner 10 Go déjà prévu, ETAT (f).)
2. **🔐 Finir la sécurisation SSH** — passer en **clés SSH** et désactiver le login par mot
   de passe (le mot de passe root a été exposé aujourd'hui ; il est réinitialisé, mais les
   clés sont bien plus sûres). Ne pas oublier le mot de passe du **cockpit** (ETAT (f)).
3. **❓ Clarifier le rôle réel du serveur** — Docker tourne mais 0 conteneur, pas de HTTPS,
   usage quasi nul. Décider : héberge-t-il vraiment le « core » (API/back-office via Hermès)
   ou bien tout vit-il sur **Vercel** (sites) + **Supabase** (base de données) ?

## Reste à vérifier (1 commande, ce soir)

```
crontab -l
```
→ confirme s'il existe des **sauvegardes automatiques** (sinon, à mettre en place).
Rappel pratique : la **console web Hetzner « mange » le caractère `>`** au collage — éviter
les redirections `>` / `2>/dev/null` dans les commandes collées, ou les **taper** à la main.
