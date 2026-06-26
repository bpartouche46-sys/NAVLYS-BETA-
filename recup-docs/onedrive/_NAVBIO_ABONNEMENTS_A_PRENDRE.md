# 💳 NAVBIO — Abonnements à prendre POUR FINALISER
*Liste 27 mai 2026 · Pour Bruno · À activer cette semaine*

---

## 🔴 CRITIQUE — À prendre cette nuit (gratuit ou bas coût)

### 1. **Cloudflare R2** — Stockage photos/vidéos/voix
- 🆓 **10 Go gratuit** pour démarrer + zéro frais de bande passante (vs S3 qui facture)
- Tarif au-delà : **0,015 USD/Go/mois**
- 👉 https://dash.cloudflare.com → R2
- Pourquoi : NAVBIO va ingurgiter des photos HD, vidéos, audios → besoin de stockage massif pas cher

### 2. **Resend** — Emails transactionnels
- 🆓 **3000 mails/mois gratuits** (largement assez pour démarrer)
- Pro : 20 USD/mois pour 50k
- 👉 https://resend.com
- Pourquoi : Confirmations inscription, magic links auth, notifications souvenirs

### 3. **Supabase Pro** — DB + Auth (déjà installé en free)
- 🆓 Free tier 50k MAU suffit pour BETA
- Pro : **25 USD/mois** quand on dépasse (8 Go DB, 100 Go bandwidth)
- 👉 Déjà branché ✅ — passe en Pro UNIQUEMENT après 1000+ users

### 4. **Vercel Pro** — Hébergement
- Actuellement free tier
- Pro : **20 USD/mois** (1 To bandwidth, plus de fonctions serverless)
- 👉 Passe en Pro UNIQUEMENT si free tier sature

---

## 🟠 STRONGLY RECOMMENDED — Cette semaine

### 5. **mux.com** ou **Cloudflare Stream** — Vidéo (encoding + streaming)
- mux : pay-per-use ~0.005 USD/min encodée
- Cloudflare Stream : **5 USD/mois** pour 1000 min stockées + bande passante incluse
- 👉 **Recommandation : Cloudflare Stream** (cohérent avec R2, prix fixe prévisible)
- Pourquoi : Les vidéos NAVBIO doivent être encodées HLS pour lecture mobile fluide

### 6. **OpenAI / Anthropic API** — IA pour transcription + analyse
- **Whisper** (transcription audio→texte) : 0.006 USD/min audio
- **Claude API** (analyse + génération bio) : déjà notre stack
- Budget mensuel à prévoir : **30-100 USD/mois** pour 100 utilisateurs actifs
- 👉 Tu m'as confirmé que tu vas signer Claude API → indispensable pour NAVBIO

### 7. **Cloudinary** — Images (compression + transformations)
- 🆓 25 GB stockage + 25 Go bandwidth/mois
- 👉 https://cloudinary.com
- Pourquoi : Les photos NAVBIO doivent être servies en différentes tailles (mobile, desktop, miniature) avec optimisation auto

---

## 🟡 NICE TO HAVE — Quand on a 100+ utilisateurs

### 8. **Plausible Analytics** — Stats sans cookies (RGPD-friendly)
- **9 USD/mois** pour 10k pageviews
- 👉 https://plausible.io
- Alternative gratuite : Vercel Analytics (déjà inclus)

### 9. **Crisp Chat** — Support client
- 🆓 Free tier (2 agents)
- Pro : 25 USD/mois
- 👉 https://crisp.chat
- Alternative : WhatsApp Business direct (déjà ton canal)

### 10. **Sentry** — Error monitoring
- 🆓 Free tier suffisant pour BETA
- Pro : 26 USD/mois
- 👉 https://sentry.io

---

## 🟢 OPTIONAL — Plus tard si on grossit

- **Algolia** (recherche full-text dans les biographies) : free → 50 USD/mois
- **Twilio** (SMS notifications) : pay-per-message
- **DocuSign / Yousign** (signature CGU déposit numérique) : 10-25 USD/mois
- **Backblaze B2** (backup R2) : 0.005 USD/Go/mois

---

## 💰 BUDGET MENSUEL ESTIMÉ NAVBIO BETA (100 premiers users)

| Service | Coût mensuel |
|---|---|
| Cloudflare R2 (50 Go data) | ~1 USD |
| Resend | 0 (free tier) |
| Supabase | 0 (free tier) |
| Vercel | 0 (free tier) |
| Cloudflare Stream | 5 USD |
| Claude API (transcription + génération) | 30-50 USD |
| Whisper (transcription) | ~10 USD |
| Cloudinary | 0 (free tier) |
| **TOTAL** | **~50 USD/mois** |

→ Coût par user à 100 actifs : **0,50 USD/mois/user**
→ Avec NAVBIO Solo 19 € one-shot, **rentable dès le 3ᵉ paiement**

---

## ⚡ ORDRE D'ACTION (par toi, Bruno)

1. **Maintenant (15 min)** : Crée compte Cloudflare → active R2 (gratuit)
2. **Maintenant (5 min)** : Crée compte Resend → vérifie domaine navlys.com (DKIM)
3. **Demain matin** : Crée compte Cloudinary (gratuit)
4. **Quand t'auras 30 min** : Crée compte Cloudflare Stream (besoin carte CB pour la facturation 5 USD/mois)
5. **À ton rythme** : Signe contrat API Claude (Anthropic) — Bruno tu m'as dit "aujourd'hui" → c'est critique pour NAVBIO et NAVWEBIA

**Toutes les clés API publiques que tu génères → tu m'envoies ici** (les secrets gardent-les pour Vercel env vars).

---

## 🎯 Bonus — DOMAINES À PRENDRE EN COMPLÉMENT

Pour solidifier l'écosystème NAVBIO :
- `navbio.app` (~15 USD/an) — pour l'app mobile
- `navbiolife.fr` (~10 USD/an) — version FR explicite
- `navbio.eu` (~10 USD/an) — extension UE
- `mavie.bio` (~25 USD/an) — alternative branding

Domaines à éviter : `.io` (cher, ~50 USD), `.com` déjà pris souvent.

---

*Plan validé par l'équipe technique. À toi de cliquer les boutons d'abonnement quand tu peux. Je code en parallèle.*
