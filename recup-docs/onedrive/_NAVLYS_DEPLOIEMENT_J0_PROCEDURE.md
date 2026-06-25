# 🚀⚓ NAVLYS — PROCÉDURE DÉPLOIEMENT J0 (BETA 1ᵉʳ JUIN 2026 MINUIT JÉRUSALEM)
**Verrouillée 28 mai 2026 · Bruno Mark Partouche & Claude (Cowork)**
*Procédure exacte, étape par étape, T-24h → T+24h. Ordre d'ouverture des gates, rollback inclus.*

> ⚓ **Règle d'or J0** : un seul deploy à la fois. Toujours attendre READY avant le suivant. Token Vercel `$VT` en variable d'env uniquement, **jamais en clair** dans un fichier.

---

## 0. Fuseau de référence et ordre d'ouverture

- **Fuseau J0** : **Asia/Jerusalem (UTC+3 en juin = IDT)**.
- **T0** : **1ᵉʳ juin 2026 à 00:00:00 IDT** = 31 mai 2026 23:00 Europe/Paris (CEST) = 31 mai 2026 21:00 UTC.
- **Ordre d'ouverture des gates** (validé Sprint 28/05) :
  1. **navbiolife.com** (le plus émotionnel, le plus simple — montre la « tendresse » en premier)
  2. **navlys.com** (le cœur de la mission, le plus attendu)
  3. **brunopartouche.com** (la signature personnelle, la confiance)
  4. **navlys.io** (le levier économique B2B, le moins time-critical)

Espacement entre gates : **15 minutes**. Donc :
- T0 + 00:00 → navbiolife.com unlock
- T0 + 00:15 → navlys.com unlock
- T0 + 00:30 → brunopartouche.com unlock
- T0 + 00:45 → navlys.io unlock

---

## T-24h (31 mai 2026 — 00:00 IDT = 30 mai 23:00 CEST)

### Actions Bruno (cumul max 1 h)
- [ ] **Mizrahi Tefahot** : confirmer ajout nom anglais « BRUNO MARK PARTOUCHE » sur compte (bloque Stripe payout si absent).
- [ ] **Stripe KYC** : compléter dossier KYC complet (1-5 j ouvrés selon Stripe — si pas fait, prévoir mode « collecte d'inscriptions sans paiement immédiat » + envoi des liens de paiement après-coup).
- [ ] **Cloudflare R2** : activer le bucket NAVBIO avec CB de vérification.
- [ ] **Anthropic Claude API** : signer officiellement le contrat NAV IA (sinon utiliser le quota free tier les 3 premiers jours, plafond ≈ 50k tokens/jour).
- [ ] **Google Workspace** : créer les alias mail `presse@navlys.com`, `partenariats@navlys.com`, `support@navlys.com`, `rgpd@navlys.com` (alias vers `bruno@navlys.com`).
- [ ] **Première histoire bp.com** : envoyer titre + 4 lignes + 1 photo (Claude met en page).
- [ ] **Téléphone** : prévoir charge complète + roaming international actif si pas connecté Wi-Fi.

### Actions Claude/Cowork (toute la journée)
- [ ] **Audit complet sources** : aucune mention `NEXT_PUBLIC_LAUNCH_UNLOCKED=true` côté navlys-app, brunopartouche-teaser, navbiolife, navlys.io (vérifié grep récursif).
- [ ] **Variables d'environnement Vercel** prêtes en interface admin :
  - `NEXT_PUBLIC_LAUNCH_UNLOCKED=false` (défaut) → à basculer **manuellement** à T0 sur chaque projet.
  - `ANTHROPIC_API_KEY` collée (via env panel, jamais en code).
  - `STRIPE_SECRET_KEY` + `STRIPE_PUBLIC_KEY` (mode `live`).
  - `SUPABASE_URL` + `SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE`.
- [ ] **Backup intégral** : `cp -r navlys/ navlys-T-24h-backup-2026-05-31/` + `cp -r brunopartouche-teaser/ brunopartouche-teaser-T-24h-backup-2026-05-31/` (idem 4 projets).
- [ ] **Tag git** sur les 4 repos : `git tag -a v1.0.0-BETA-prelaunch -m "Pre-launch backup 31 mai 2026"` + `git push origin v1.0.0-BETA-prelaunch`.
- [ ] **Test ouverture/fermeture gate** sur preview deployments Vercel (NEXT_PUBLIC_LAUNCH_UNLOCKED toggle simulé).
- [ ] **NAV IA system prompt** chargé dans Crisp / orchestrateur (si Crisp Pro pas signé, fallback Magic Reply temporaire avec prompt collé manuellement).
- [ ] **Templates mail x15 + WhatsApp x10** indexés dans Crisp Helpdesk.
- [ ] **Encyclopédie 15 articles** indexée dans Crisp Helpdesk pour search visiteurs.
- [ ] **120 Q/R Knowledge Base** indexée idem.

### Communications préparées (drafts)
- [ ] Mail BETA-ready à toute la liste d'attente (drafts dans Crisp, programmé pour T+00:30).
- [ ] Post LinkedIn Bruno (visuel bannière LinkedIn 1584×396 prêt, texte court 5 lignes, programmé Buffer pour T+01:00).
- [ ] Post X Bruno (header X 1500×500 prêt, thread 5 tweets, programmé Buffer pour T+01:00).
- [ ] Post Facebook Bruno (cover 851×315, programmé pour T+01:30).

---

## T-12h (31 mai 2026 — 12:00 IDT = 31 mai 11:00 CEST)

### Derniers checks
- [ ] **Statut Vercel des 4 projets** : tous READY, aucun BUILDING/ERROR (poller API Vercel ou check dashboard manuel).
- [ ] **SSL des 4 domaines** vert (Let's Encrypt renouvelé, expiry > 30 j sur chaque).
  - Commande : `for d in navlys.com www.navlys.com navbiolife.com www.navbiolife.com brunopartouche.com www.brunopartouche.com navlys.io; do echo "=== $d ==="; echo | openssl s_client -connect $d:443 -servername $d 2>/dev/null | openssl x509 -noout -dates; done`
- [ ] **DNS résolution OK** :
  - `dig +short navlys.com` → IP Vercel
  - `dig +short navbiolife.com` → IP Vercel
  - `dig +short brunopartouche.com` → IP Vercel (`216.198.79.1`) ou Netlify (selon état migration)
  - `dig +short navlys.io` → IP Vercel
  - **MX `navlys.com`** → Google Workspace (préserver, vérifier `dig +short MX navlys.com`)
- [ ] **NAV IA chat web** : test envoi/réponse latence < 3s en moyenne.
- [ ] **Stripe Checkout test** : effectuer 1 vraie transaction 1 € (avec carte CB Bruno), vérifier webhook → Supabase → activation compte → mail confirmation.
- [ ] **Supabase auth Google** : test login depuis device propre (incognito), vérifier callback + JWT.
- [ ] **Cloudflare R2 NAVBIO** : test upload 10 MB MP4, vérifier checksum + download.
- [ ] **Backup veille planifiée** : `veille-infra-navlys` confirmé actif pour le lundi suivant.
- [ ] **Mode maintenance** : page `/maintenance.html` prête sur les 4 sites au cas où.

### Communications
- [ ] Envoi **mail T-12h** à la liste BETA inscrite : *« Demain minuit Jérusalem, on lève l'ancre. Prépare-toi. Lien d'activation sera dans ce mail T+30 min après ouverture. »*
- [ ] Post Instagram Story Bruno : compte à rebours animé.
- [ ] WhatsApp BETA opt-in : message « rappel J-12h » (template 5 condensé).

---

## T-6h (31 mai 2026 — 18:00 IDT = 31 mai 17:00 CEST)

### Préparation finale deploy
- [ ] **CLI Vercel locale opérationnelle** :
  ```bash
  export VT="<token-via-1password-jamais-en-clair>"
  cd /home/bruno/Downloads/navlys
  /tmp/vdir/node_modules/.bin/vercel --version
  ```
- [ ] **Vérification token scope** : `vercel teams ls --token=$VT` → confirmer team `navlys` accessible.
- [ ] **Aucun build pending** sur les 4 projets (sinon attendre).
- [ ] **Toggle launch unlocked en attente** sur dashboard Vercel des 4 projets (mais variable encore `false`).
- [ ] **Bruno proche du clavier** : minimum 30 min avant T0, prêt à valider chaque étape.
- [ ] **Slack / Discord équipage NAVLYS** : canal `#launch-j0` ouvert pour coordination temps réel (même si équipage = Bruno + Claude).

---

## T-1h (31 mai 2026 — 23:00 IDT = 31 mai 22:00 CEST)

### Équipage prêt

- [ ] Café/thé prêt côté Bruno ☕.
- [ ] Vidéo intro vérifiée jouable (`navlys-logo.mp4` charge en < 2s sur les 4 sites).
- [ ] **Crisp NAV IA** en standby, chat web visible mais badge « NAV IA arrive le 2 juin » encore actif (sera retiré J+1).
- [ ] **Templates de réponse premier contact** chargés dans Crisp (Template 1, 4, 7 + bilingue FR/EN).
- [ ] **Bruno fait un dernier passage manuel** sur les 4 sites pour vérifier visuel mobile.
- [ ] **Test de 5 vraies signatures email** envoyées depuis Bruno (vérifie rendu Gmail + Outlook + Apple Mail).

---

## T0 (1ᵉʳ juin 2026 — 00:00:00 IDT) — OUVERTURE DES GATES

> ⚡ **Une seule personne pilote le toggle** : Bruno depuis le dashboard Vercel. Claude commente et surveille les logs.

### T0 + 00:00 → navbiolife.com
1. Dashboard Vercel → projet `navbiolife` → Settings → Environment Variables.
2. `NEXT_PUBLIC_LAUNCH_UNLOCKED` : `false` → **`true`**.
3. Save → trigger redeploy auto.
4. Attendre **READY** (typiquement 60-90s).
5. Test live : `curl -I https://navbiolife.com` → 200 OK.
6. Test navigateur incognito : page d'accueil sans countdown, contenu BETA visible.

### T0 + 00:15 → navlys.com
1. Idem projet `navlys-app`.
2. Toggle `NEXT_PUBLIC_LAUNCH_UNLOCKED` → `true`.
3. Save → trigger redeploy.
4. Attendre READY.
5. Test live + incognito.

### T0 + 00:30 → brunopartouche.com
1. Idem projet `brunopartouche-teaser` (ou `brunopartouche-com` selon état migration Netlify → Vercel).
2. Toggle → `true` → deploy → READY → test.

### T0 + 00:45 → navlys.io
1. Idem projet `navlys-io`.
2. Toggle → `true` → deploy → READY → test.

### T0 + 01:00 → Communications de lancement
- [ ] **Envoi mail** à toute la liste BETA (Crisp Campaigns ou ConvertKit) : template 4 personnalisé avec lien d'activation unique.
- [ ] **Post LinkedIn programmé** publié (Buffer auto).
- [ ] **Thread X programmé** publié.
- [ ] **Post Facebook + Instagram** publiés.
- [ ] **WhatsApp BETA** : template 4 envoyé en bulk (respecter 360dialog rate limits).
- [ ] **Slack équipage** : annonce officielle « gates ouverts ».

---

## T+1h (1ᵉʳ juin 2026 — 01:00 IDT)

### Monitoring
- [ ] **Dashboard Vercel Analytics** sur les 4 sites : flux visiteurs en temps réel.
- [ ] **Supabase Dashboard** : créations de comptes par minute (cible : 5-15 inscriptions/min pendant la 1ʳᵉ heure).
- [ ] **Stripe Dashboard** : 1ʳᵉs transactions arrivantes (cible : 2-5 dans la 1ʳᵉ heure).
- [ ] **Crisp Inbox** : queue de messages NAV IA. Si > 20 messages en attente humain → renfort manuel Bruno + escalade à templates 1/3/4 plus rapide.
- [ ] **Twitter mentions** : surveiller mentions `@brunopartouche` / `#NAVLYS` (Buffer notifications + IFTTT push).
- [ ] **Erreurs Vercel** : zero 500/502 erreur sur la 1ʳᵉ heure. Si > 5 occurrences → trigger rollback (voir plus bas).
- [ ] **Statut SSL** continu : si soudain `ERR_CONNECTION_CLOSED` apparaît, renew Let's Encrypt manuel via Vercel SSL settings.

### Communications
- [ ] **Premier post de remerciement** : *« Première heure. {{N}} inscrits. Merci. »* (à 02:00 IDT typiquement).

---

## T+24h (2 juin 2026 — 00:00 IDT) — PREMIER BILAN

### Bilan chiffré
- [ ] Total visiteurs uniques 4 sites (Vercel Analytics).
- [ ] Total inscriptions Supabase auth.
- [ ] Total souscriptions Stripe (49 € mensuel + 490 € annuel + 39 € early bird).
- [ ] Total revenus J0+24h (cible honnête : 500-2000 €).
- [ ] Taux conversion visiteur → inscription (cible 3-8 %).
- [ ] Taux conversion inscription → souscription (cible 5-15 %).
- [ ] NPS spontané dans Crisp (messages positifs vs critiques).
- [ ] Top 5 questions NAV IA traitées (alimente la KB v1.0.1).

### Activation NAV IA Chat Universel (J+1 = 2 juin)
- [ ] Badge `NAV IA · CHAT UNIVERSEL · arrive 2 JUIN` est **retiré** automatiquement (auto-cache 24h après le 2 juin coté code).
- [ ] Le chat NAV IA est désormais **promu** comme fonctionnalité live (post LinkedIn dédié).

### Communications J+1
- [ ] Mail BETA-J+1 : *« 24h. {{N}} d'entre vous. Merci. Voici les 3 questions que vous avez posé. »*
- [ ] Post LinkedIn Bruno : retour d'expérience honnête (incluant bugs si bugs).
- [ ] Newsletter Le Cartographe (signée 🧭) : *« Cartographie n°2 — Premier port d'escale »* (mise à jour pyramides).

---

## 🆘 PROCÉDURE ROLLBACK (si problème grave)

### Triggers rollback
- Erreur 500/502 > 5 occurrences en 10 minutes sur un même site.
- SSL `ERR_CONNECTION_CLOSED` persistant > 5 minutes.
- Stripe webhook qui boucle (charge clients sans activer comptes).
- Compte utilisateur créé sans email d'activation reçu (> 20 cas en 1h).
- Faille de sécurité signalée (XSS, SSRF, exposition env vars).

### Étapes rollback (par site, dans l'ordre inverse du déploiement)
1. Dashboard Vercel → projet → Deployments.
2. Trouver le **dernier deployment READY pré-T0** (tag git `v1.0.0-BETA-prelaunch`).
3. Cliquer **« Promote to Production »** sur ce deployment ancien.
4. Attendre 60s → vérifier site retour à l'état T-1h.
5. Toggle `NEXT_PUBLIC_LAUNCH_UNLOCKED` → `false` (revient au gate verrouillé avec countdown).
6. Page status `/maintenance.html` activée temporairement si besoin.
7. **Mail urgence à la liste** : *« Petit grain technique. On stabilise. Retour < 1h. Aucun paiement n'a été débité abusivement (vérifié). »*
8. Investigation root cause : logs Vercel + logs Supabase + logs Stripe webhook.
9. Fix → redeploy → test → réouverture.

### Communications rollback
- [ ] Slack équipage : alerte IMMÉDIATE avec timestamp + symptômes.
- [ ] Status page `status.navlys.com` (à créer J+30) : mise à jour temps réel.
- [ ] Twitter Bruno : tweet honnête *« Petit souci technique, on regarde. Lien direct vers status. »* sous 10 min.
- [ ] **PAS de mail panique massive** : seulement à ceux qui ont créé un compte (segment Crisp ciblé).

---

## ⚖️ Disclaimer procédure

Cette procédure est un **template opérationnel**, pas une promesse de zero incident. Le 1ᵉʳ juin restera la plus grosse surface d'incident pour NAVLYS de toute son histoire (effet « big bang » volontaire). Bruno doit accepter qu'**au moins une chose** ne se passera pas comme prévu — c'est normal, c'est gérable, et la procédure rollback est là pour ça.

**Principe maritime** : *on lève l'ancre avec un plan. On arrive en port avec une histoire.* La différence entre les deux, c'est tout l'apprentissage du jour.

— Bruno Mark Partouche & 🧭 Le Cartographe & Claude (Cowork), 28 mai 2026
*Version 1.0.0. Toute modification J-1 ou J0 doit être validée par Bruno + backup `_NAVLYS_DEPLOIEMENT_J0_PROCEDURE.v{X.Y.Z}.bak.md`.*
