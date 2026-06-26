# 🌐 06 — VÉRIFICATIONS GRANDES PLATEFORMES (10 majeurs)

**Mission Le Sémaphore + Le Veilleur de Coffre · 29 mai 2026 · Présence vérifiée sur Google, Microsoft, Apple, Facebook, LinkedIn, X, TikTok, Pinterest, Bing, Yahoo**

> Une marque reconnue = une marque vérifiée. Chaque plateforme a son sceau officiel. On les ramasse tous, dans l'ordre. **Temps total Bruno : ~2h cumulé, étalé sur 1 semaine.**

---

## 🎯 TABLEAU MAÎTRE

| # | Plateforme | Type | Temps Bruno | Coût | Priorité |
|---|---|---|---|---|---|
| 1 | Google Search Console | Domain | 10 min × 4 | 0 € | P0 |
| 2 | Google Postmaster Tools | Email | 5 min × 4 | 0 € | P0 |
| 3 | Microsoft SNDS + JMRP | Email | 15 min × 4 | 0 € | P1 |
| 4 | Facebook Business Domain | Domain | 10 min × 4 | 0 € | P0 |
| 5 | Apple Business Connect | Brand | 30 min | 0 € | P1 |
| 6 | LinkedIn Page verification | Brand | 15 min | 0 € | P0 |
| 7 | X / Twitter Verified Business | Brand | 5 min | **1000 $/mois** | P3 (optionnel) |
| 8 | TikTok Business Verified | Brand | 20 min | 0 € | P2 |
| 9 | Pinterest Claimed Domain | Domain | 5 min × 4 | 0 € | P2 |
| 10 | Bing Webmaster Tools | Domain | 5 min × 4 | 0 € | P1 |
| 11 | Yahoo Mail Sender Hub | Email | 10 min | 0 € | P2 |

**Total Bruno** : ~2h cumulé pour P0/P1/P2 · **Coût récurrent** : 0 € (sauf X = 1000 $/mois si on en veut le badge).

---

## 1️⃣ Google Search Console

**URL** : https://search.google.com/search-console
**Méthode recommandée** : **Domain property** (couvre www + sous-domaines)

### Pour chaque domaine

1. Ajouter une propriété → **Domain** (pas URL prefix)
2. Coller `navlys.com`
3. Google fournit un TXT à poser dans DNS Cloudflare :
   - Type : TXT
   - Nom : `@`
   - Valeur : `google-site-verification=<chaîne>`
4. Cliquer **Verify**
5. Soumettre le sitemap : `https://navlys.com/sitemap.xml`

### Répéter pour les 4 domaines

```
navlys.com           → property domain
navbiolife.com       → property domain
navlys.io            → property domain
brunopartouche.com   → property domain
```

### Bénéfices

- Visibilité sur les requêtes Google qui ramènent du trafic
- Détection des pages indexées / non indexées
- Alertes Search Console si Google détecte un piratage
- Soumission directe des sitemaps

---

## 2️⃣ Google Postmaster Tools

**URL** : https://postmaster.google.com

### Setup

1. Ajouter le domaine `navlys.com`
2. Google fournit un TXT (différent de Search Console)
3. Poser dans Cloudflare DNS
4. Verify

### Bénéfices

- Reputation domaine (Low / Medium / High)
- Taux de spam déclaré par les utilisateurs Gmail
- Authentification SPF / DKIM / DMARC stats
- Encryption stats (TLS)
- Alertes IP delivery

**À surveiller hebdo** : Domain reputation = **High**. Si chute → audit immédiat des envois récents.

---

## 3️⃣ Microsoft SNDS + JMRP

**SNDS** = Smart Network Data Services (réputation IP côté Outlook/Hotmail/Live)
**JMRP** = Junk Mail Reporting Program (rapports de spam Outlook)

### SNDS

URL : https://sendersupport.olc.protection.outlook.com
1. Créer un compte Microsoft (avec `bruno@navlys.com`)
2. Soumettre les IPs d'envoi (celles de Resend + Google Workspace egress)
3. Validation par email à un alias officiel du domaine (`postmaster@navlys.com`)

### JMRP

Même portail → Junk Mail Reporting Program → souscrire pour recevoir les rapports.

### Bénéfices

- Reputation IPs auprès de Outlook (40 % du marché email mondial)
- Détection précoce de blacklist
- Rapports de spam déclarés par les utilisateurs Outlook

---

## 4️⃣ Facebook Business Domain Verification

**URL** : https://business.facebook.com → Brand Safety → Domains

### Setup

1. Créer le **Business Manager** : `NAVLYS SAS` (à terme : société légale)
2. Ajouter les 4 domaines un par un
3. Méthode : **DNS verification** (recommandée plutôt que meta tag)
4. Facebook fournit un TXT :
   - Type : TXT
   - Nom : `@`
   - Valeur : `facebook-domain-verification=<chaîne>`
5. Verify

### Bénéfices

- Permet le tracking Facebook Pixel (si on l'utilise)
- Permet d'exécuter des Ads avec le domaine
- Empêche un tiers de revendiquer le domaine sur Facebook (squatting)
- Badge « verified » sur les liens partagés vers navlys.com

---

## 5️⃣ Apple Business Connect

**URL** : https://businessconnect.apple.com

### Setup

1. Créer un compte Apple Business Connect avec `bruno@navlys.com`
2. Réclamer la fiche **NAVLYS** sur :
   - Apple Maps (lieu : Mer Méditerranée si pas d'adresse physique → adresse postale entreprise)
   - Apple Wallet (pour cartes futures éventuelles)
   - Siri / Spotlight
3. Méthode de vérification : appel téléphonique ou DNS TXT

### Bénéfices

- Présence officielle dans Apple Maps
- Mentions Siri/Spotlight
- Cartes Apple Wallet possibles (pour NAVBIO premium, programme fidélité)

**Temps Bruno** : 30 min (un coup d'effort initial, ensuite c'est posé).

---

## 6️⃣ LinkedIn Page Verification

**URL** : https://www.linkedin.com/help/linkedin/answer/a526612

### Setup

1. Créer la **Company Page NAVLYS** (si pas encore fait)
2. Ajouter le site web `https://navlys.com`
3. Demander la vérification → LinkedIn envoie un email à `bruno@navlys.com`
4. Confirmer = badge **page officielle**
5. (Optionnel premium) Verified Page Identity via Microsoft Entra : prouver propriété juridique → badge bleu pro

### Bénéfices

- Crédibilité B2B
- Possibilité de poster en tant que NAVLYS officiel
- Backlink LinkedIn → navlys.com (SEO juice)

---

## 7️⃣ X / Twitter Verified Business (optionnel)

**URL** : https://verified.x.com / Verified Organizations

### Conditions

- Compte X officiel `@navlys` créé
- Société légalement enregistrée (NAVLYS SAS, en cours)
- Abonnement Verified Organizations : **1000 $/mois** (ou 200 $/mois si abo annuel non négocié)

### Décision recommandée

**P3 — Différer post-lancement.** Le badge X n'est pas indispensable pour la crédibilité de NAVLYS. À reconsidérer si X devient un canal d'acquisition majeur.

---

## 8️⃣ TikTok Business Verified

**URL** : https://www.tiktok.com/business → Verified Business Account

### Setup

1. Créer un compte TikTok Business `@navlys`
2. Lier au site `https://navlys.com`
3. Demande de vérification → upload documents légaux (KBIS NAVLYS SAS)
4. Délai : 2 semaines

### Bénéfices

- Badge bleu sur le compte TikTok
- Crédibilité auprès de la cible jeune
- Accès à TikTok Shop (V2 si on vend des produits physiques)

---

## 9️⃣ Pinterest Claimed Domain

**URL** : https://www.pinterest.com/business/claim/

### Setup

1. Compte Pinterest Business `navlys`
2. Claim domain `navlys.com`
3. Méthode : HTML tag (poser dans `<head>` du site) OU DNS TXT
4. Choisir DNS TXT pour cohérence
5. Verify

### Bénéfices

- Permet le rich pins (cartes enrichies)
- Analytics Pinterest → trafic vers navlys.com
- Empêche un tiers de claim le domaine

---

## 🔟 Bing Webmaster Tools

**URL** : https://www.bing.com/webmasters

### Setup

1. Se connecter avec compte Microsoft (le même que SNDS)
2. **Import from Google Search Console** (un clic, importe tout)
3. Vérifier propriété par TXT DNS (Bing fournit la chaîne)
4. Soumettre sitemap

### Bénéfices

- Visibilité Bing (Microsoft Edge, ChatGPT search, Copilot)
- Plus important qu'on ne pense en 2026 grâce à l'IA Microsoft

---

## 1️⃣1️⃣ Yahoo Mail Sender Hub

**URL** : https://senders.yahooinc.com

### Setup

1. Créer compte avec `bruno@navlys.com`
2. Ajouter les domaines
3. Vérification par TXT DNS
4. Souscrire au feedback loop (rapports de spam Yahoo)

### Bénéfices

- Reputation Yahoo (4% du marché email FR mais 15% US)
- Important si on cible aussi marché US

---

## 📊 RÉCAP DNS — TXT supplémentaires par domaine

| # | TXT name | Plateforme |
|---|---|---|
| 1 | `@` `google-site-verification=...` | Google Search Console |
| 2 | `@` `google-postmaster-verification=...` | Google Postmaster |
| 3 | `@` `facebook-domain-verification=...` | Facebook Business |
| 4 | `@` `linkedin-domain-verification=...` | LinkedIn |
| 5 | `@` `pinterest-site-verification=...` | Pinterest |
| 6 | `@` `MS=ms<chaîne>` | Bing Webmaster |
| 7 | `@` `apple-domain-verification=...` (si méthode DNS) | Apple Business Connect |

**Multiplié par 4 domaines = jusqu'à 28 TXT.** Cloudflare gère sans souci (limite 1000 records par zone).

---

## ✅ ORDRE D'EXÉCUTION RECOMMANDÉ (Bruno)

```
J0    : Google Search Console × 4 + Google Postmaster × 4  (45 min)
J1    : Bing Webmaster × 4 + LinkedIn Page                  (45 min)
J3    : Facebook Business × 4                                (40 min)
J5    : Apple Business Connect                               (30 min)
J7    : Pinterest × 4                                        (20 min)
J10   : Microsoft SNDS + JMRP                                (15 min)
J14   : TikTok Business                                      (20 min) — peut attendre
J30   : Yahoo Sender Hub                                     (10 min)
Différé : X Verified Business (1000 $/mois)                 — si ROI prouvé
```

---

## 🔎 MONITORING POST-VÉRIFICATION

Hebdo (lundis 9h, après le rapport `veille-infra-navlys`) :

```bash
# Vérifier que chaque TXT est toujours présent (anti-tamper)
for d in navlys.com navbiolife.com navlys.io brunopartouche.com; do
  echo "=== $d ==="
  dig TXT $d +short | grep -E "(google-site|facebook-domain|linkedin-domain|pinterest)"
done
```

Si un TXT a disparu → alerte P1 → réinjection immédiate.

---

> *« Sur chaque carte du monde, NAVLYS porte son sceau. On ne se fait pas confondre avec une coquille vide. »*
> — Le Sémaphore
