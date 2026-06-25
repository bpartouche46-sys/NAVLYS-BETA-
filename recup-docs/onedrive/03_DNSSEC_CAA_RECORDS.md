# 🔏 03 — DNSSEC + CAA + CERTIFICATE TRANSPARENCY

**Mission Le Veilleur de Coffre · 29 mai 2026 · Score visé : dnsviz 100/100, ssllabs A+, certif transparency monitoring actif**

> Sans DNSSEC, n'importe qui sur le chemin DNS peut détourner navlys.com. Sans CAA, n'importe quelle AC peut émettre un certificat pour navlys.com. Sans CT monitoring, on ne sait pas qu'un faux certificat a été émis.

---

## 1️⃣ DNSSEC — DNS Security Extensions

Signature cryptographique de toutes les réponses DNS. Garantit qu'on parle bien à la zone autoritaire NAVLYS.

### Procédure Cloudflare (gratuit, 5 min)

1. https://dash.cloudflare.com → sélection domaine `navlys.com`
2. Menu **DNS** → onglet **Settings** → section **DNSSEC**
3. Bouton **Enable DNSSEC** → Cloudflare affiche un **DS Record** :
   - Key Tag
   - Algorithm: 13 (ECDSAP256SHA256)
   - Digest Type: 2 (SHA-256)
   - Digest: chaîne hex
4. **Copier le DS record** complet
5. Aller chez le registrar (Namecheap pour Bruno) :
   - Namecheap → Account → Domain List → navlys.com → Advanced DNS → **DNSSEC** section
   - Coller le DS Record (Key Tag, Algorithm, Digest Type, Digest)
6. Sauvegarder. Propagation : **24–48h**
7. Vérification : https://dnsviz.net/d/navlys.com/dnssec/

⚠️ Si Cloudflare = registrar (cas brunopartouche.com via Cloudflare Registrar) → DNSSEC se fait en 1 clic.

### Répéter pour les 4 domaines

```
navlys.com           → registrar Namecheap
navbiolife.com       → registrar Namecheap
navlys.io            → registrar Namecheap (.io = Identity Digital)
brunopartouche.com   → registrar Namecheap
```

---

## 2️⃣ CAA — Certification Authority Authorization

Spécifie au monde **quelles AC peuvent émettre des certificats SSL** pour ton domaine. Sans CAA, n'importe quelle AC compromise peut émettre.

### Enregistrements à poser dans Cloudflare DNS

**Type** : CAA · **Nom** : `@` · **TTL** : 3600

| Flag | Tag | Value | Rôle |
|---|---|---|---|
| 0 | issue | `"letsencrypt.org"` | Autorise Let's Encrypt (utilisé par Vercel) |
| 0 | issue | `"pki.goog"` | Autorise Google Trust Services (backup) |
| 0 | issue | `"digicert.com"` | Autorise DigiCert (pour VMC BIMI) |
| 0 | issuewild | `";"` | **Interdit** tout certificat wildcard sauf AC listées |
| 0 | iodef | `"mailto:security@navlys.com"` | Email pour reports de tentative non autorisée |

### Format Cloudflare (interface web)

```
Type: CAA
Name: @
Flag: 0
Tag: issue
Value: letsencrypt.org
TTL: Auto

Type: CAA
Name: @
Flag: 0
Tag: issue
Value: pki.goog
TTL: Auto

Type: CAA
Name: @
Flag: 0
Tag: issue
Value: digicert.com
TTL: Auto

Type: CAA
Name: @
Flag: 0
Tag: iodef
Value: mailto:security@navlys.com
TTL: Auto
```

### Vérification

```bash
dig CAA navlys.com +short
# doit retourner les 4 enregistrements
```

Ou en ligne : https://caatest.co.uk/navlys.com

---

## 3️⃣ DKIM Key Rotation — calendrier

Bonne pratique NIST : rotation des clés DKIM **tous les 6 mois**.

### Calendrier

| Date | Action | Responsable |
|---|---|---|
| 2026-06-01 | Pose initiale `google._domainkey` + `resend._domainkey` | Le Veilleur de Coffre |
| 2026-09-01 | Pose `google2._domainkey` (clé secondaire) | idem |
| 2026-12-01 | Rotation : bascule sur `google2`, retire `google` | idem |
| 2027-03-01 | Pose `google3` + retire `google2` 7 jours après | idem |

### Procédure de rotation (sans interruption)

```
J-7  : générer nouvelle paire dans Google Admin (ou Resend)
J-6  : poser le nouveau record DNS (ex google3._domainkey)
J-5  : vérifier propagation (dig + Google Postmaster Tools)
J    : basculer le sélecteur actif côté Google Admin (1 clic)
J+7  : supprimer l'ancien record DNS (ex google2._domainkey)
```

Inscrire au calendrier `_NAVLYS_DEPARTEMENTS/06_INFRA_VEILLE.md`.

---

## 4️⃣ Certificate Transparency Monitoring (CT)

Tout certificat SSL émis pour `*.navlys.com` est publié dans des **CT logs publics**. On peut s'abonner aux alertes pour détecter une émission non autorisée.

### Service gratuit recommandé : crt.sh + Cert Spotter

**Option A — Crt.sh (manuel mais gratuit)** :
- https://crt.sh/?q=navlys.com → afficher tous les certificats émis pour navlys.com
- Bookmark + check hebdo (auto via cron — voir fichier 07)

**Option B — Cert Spotter (SSLMate, gratuit en personal)** :
- https://sslmate.com/certspotter/
- Créer compte → ajouter `navlys.com`, `navbiolife.com`, `navlys.io`, `brunopartouche.com`
- Alerte email à `security@navlys.com` dès qu'un nouveau certificat apparaît dans CT logs

**Option C — Facebook CT Monitor** :
- https://developers.facebook.com/tools/ct/
- Alertes email gratuites pour monitoring CT logs

### Procédure si alerte « certificat non autorisé »

```
1. Identifier l'AC émettrice → vérifier dans CAA si autorisée
2. Si AC NON autorisée → reporter immédiatement à l'AC + Mozilla (ils retirent l'AC compromise)
3. Révoquer le certificat via OCSP si possible
4. Audit DNS Cloudflare : vérifier qu'aucun TXT/A n'a été modifié
5. Incident → fichier 08 procédure P0
```

---

## 5️⃣ DANE (optionnel — niveau bunker++)

DANE-TLSA = lier le certificat SSL au DNS via DNSSEC. Ultra-sécurisé mais peu déployé côté navigateurs (Chrome ne supporte pas, Firefox via extension).

**Recommandation** : **différer à 2027**, après que DNSSEC soit stable sur tous les domaines.

---

## 6️⃣ NSEC vs NSEC3

Cloudflare DNSSEC utilise **NSEC** par défaut. NSEC permet le « zone walking » (énumération des sous-domaines).

**Migration vers NSEC3 (recommandée)** :
- Cloudflare ne le supporte pas en self-service (limitation 2026)
- Workaround : héberger DNS chez **AWS Route 53** ou **Google Cloud DNS** qui supportent NSEC3
- Sinon : accepter NSEC et compenser par **discrétion sous-domaines** (pas de `internal.navlys.com`, préférer UUIDs)

---

## ✅ VALIDATION COMPLÈTE

```bash
# 1. DNSSEC chain
dig +dnssec navlys.com SOA

# 2. CAA
dig CAA navlys.com +short

# 3. Validation dnsviz
open "https://dnsviz.net/d/navlys.com/dnssec/"

# 4. Score Hardenize
open "https://www.hardenize.com/report/navlys.com"
```

**Objectif final** :
- dnsviz : tout vert, aucun warning
- Hardenize DNS section : 100/100
- ssllabs : note « DNS CAA: Yes »

---

## 📊 Récap enregistrements supplémentaires par domaine

| # | Type | Nom | Valeur résumée |
|---|---|---|---|
| 1 | DS (chez registrar) | (apex) | Fourni par Cloudflare DNSSEC |
| 2 | CAA | `@` | issue letsencrypt.org |
| 3 | CAA | `@` | issue pki.goog |
| 4 | CAA | `@` | issue digicert.com |
| 5 | CAA | `@` | iodef mailto:security@navlys.com |

**Total : 4 enregistrements CAA + 1 DS chez registrar, par domaine. × 4 domaines = 16 + 4 = 20 actions DNS.**

---

> *« Sans DNSSEC, ton château n'a pas de pont-levis. Sans CAA, n'importe qui peut faire faire les clés. »*
> — Le Veilleur de Coffre
