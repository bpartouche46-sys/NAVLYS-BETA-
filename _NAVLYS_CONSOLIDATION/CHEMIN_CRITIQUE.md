# 🚀 NAVLYS — CHEMIN CRITIQUE · La to-do unique et ordonnée

> 21 mai 2026 · J-10 · Lancement : **31 mai 2026, minuit Asia/Jerusalem**
> Une seule liste. Tu fais 1, puis 2, puis 3. Le reste du navire est déjà construit.

---

## 🇫🇷 LES 5 MANŒUVRES, DANS L'ORDRE

### 1. ⛵ Hisser le teaser (≈ 15 min) — peut se faire tout de suite
- Va sur Vercel → New Project → glisse le dossier `navlys-teaser-deploy/`.
- Le compte à rebours tourne, la capture email commence à remplir la cale.
- Guide : `NAVLYS_TEASER_LAUNCH_PACK/fr/DEPLOY_DEMAIN.md`.
- ✔️ Fini quand : l'URL Vercel affiche le compte à rebours et accepte un email test.

### 2. 🧭 Finaliser le DNS de navlys.com (≈ 30 min)
- Suis pas à pas `NAVLYS_DNS_BASCULE_PACK/fr/` (01 → 08).
- Chemin : Namecheap → zone Cloudflare → bascule des nameservers → pointage Vercel.
- ⚠️ **Garde le MX Google** (`bruno@navlys.com` ne doit jamais tomber).
- Filet de secours : `08_ROLLBACK_PROCEDURE.md`.
- ✔️ Fini quand : `navlys.com` répond et l'email pro fonctionne toujours.

### 3. 🚢 Déployer le site complet + /admin/cap (≈ 30 min)
- Déploie le site : `NAVLYS_PORTAL_APP/MISE_EN_LIGNE_MAINTENANT.md` **ou** le projet `navlys/`.
- Ajoute les **7 ENV vars** : `NAVLYS_ADMIN_CAP_PACK/fr/GUIDE_INSTALLATION.md`.
- Teste le login 2FA `/admin/cap` depuis ton téléphone (secret TOTP déjà en mémoire).
- ✔️ Fini quand : tu publies un « cap test » depuis ton téléphone.

### 4. 💰📣 Ouvrir la caisse + le porte-voix (≈ 45 min)
- **Stripe en réel** : `NAVLYS_STRIPE_COMPLETE_PACK/setup/` + 4 ENV vars Stripe sur Vercel.
  Produits : 49 €/mois · 490 €/an (+ pièce bronze) · 39 € bio live.
- **Comptes réseaux** : ouvre `NAVLYS_BRAND_KIT/one_click/open_all_signups.html` (les 13).
  Puis 5 quick-wins manuels : Reddit, Substack, Stacker News, Discord, Nostr.
- ✔️ Fini quand : un paiement test passe et les comptes affichent la bio NAVLYS.

### 5. 🌊 Programmer la première vague (≈ 30 min)
- Importe dans Publer : `NAVLYS_FIRST_WAVE_PACK/fr/publer_import.csv`.
- Charge le calendrier complet : `NAVLYS_MASTER_CALENDAR_PACK/csv/publer_import_fr.csv`.
- Cale le post J0 sur **31 mai, minuit Asia/Jerusalem**.
- ✔️ Fini quand : la file Publer est pleine jusqu'à J+7.

---

## 🧯 Si quelque chose casse le jour J
Tout est pré-écrit dans `NAVLYS_MASTER_CALENDAR_PACK/fr/CRISIS_PLAYBOOK.md` (10 scénarios : bug Vercel, Stripe en panne, compte suspendu, etc.).

---

## 🇬🇧 THE 5 MANEUVERS, IN ORDER

### 1. ⛵ Raise the teaser (≈ 15 min) — can be done right now
- Vercel → New Project → drop the `navlys-teaser-deploy/` folder.
- Countdown runs, email capture starts filling the hold.
- Guide: `NAVLYS_TEASER_LAUNCH_PACK/en/DEPLOY_TOMORROW.md`.
- ✔️ Done when: the Vercel URL shows the countdown and accepts a test email.

### 2. 🧭 Finalize navlys.com DNS (≈ 30 min)
- Follow `NAVLYS_DNS_BASCULE_PACK/en/` step by step (01 → 08).
- Path: Namecheap → Cloudflare zone → nameserver switch → point to Vercel.
- ⚠️ **Keep the Google MX** (`bruno@navlys.com` must never drop).
- Safety net: `08_ROLLBACK_PROCEDURE.md`.
- ✔️ Done when: `navlys.com` answers and pro email still works.

### 3. 🚢 Deploy the full site + /admin/cap (≈ 30 min)
- Deploy the site: `NAVLYS_PORTAL_APP/MISE_EN_LIGNE_MAINTENANT.md` **or** the `navlys/` project.
- Add the **7 ENV vars**: `NAVLYS_ADMIN_CAP_PACK/en/GUIDE_INSTALLATION.md`.
- Test `/admin/cap` 2FA login from your phone (TOTP secret already in memory).
- ✔️ Done when: you publish a "test cap" from your phone.

### 4. 💰📣 Open the till + megaphone (≈ 45 min)
- **Stripe live**: `NAVLYS_STRIPE_COMPLETE_PACK/setup/` + 4 Stripe ENV vars on Vercel.
  Products: €49/mo · €490/yr (+ bronze coin) · €39 bio live.
- **Social accounts**: open `NAVLYS_BRAND_KIT/one_click/open_all_signups.html` (the 13).
  Then 5 manual quick-wins: Reddit, Substack, Stacker News, Discord, Nostr.
- ✔️ Done when: a test payment clears and accounts show the NAVLYS bio.

### 5. 🌊 Schedule the first wave (≈ 30 min)
- Import into Publer: `NAVLYS_FIRST_WAVE_PACK/en/publer_import.csv`.
- Load the full calendar: `NAVLYS_MASTER_CALENDAR_PACK/csv/publer_import_en.csv`.
- Set the J0 post to **May 31, midnight Asia/Jerusalem**.
- ✔️ Done when: the Publer queue is full through J+7.

---

> *« Un cap, une main, un jour. » · "One course, one hand, one day."*
> ⚠️ NAVLYS partage des informations pédagogiques, pas un conseil personnalisé. · Educational information only, not personalized advice.
