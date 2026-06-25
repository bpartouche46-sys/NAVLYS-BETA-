# 🔬 07 — TESTS AUTOMATISÉS SÉCURITÉ (hebdo + à la demande)

**Mission Le Veilleur de Coffre · 29 mai 2026 · Cron lundi 8h après `veille-infra-navlys`**

> Tous les vendredis matin, on demande à 7 outils externes de juger nos sites. Chaque note < A+ déclenche une alerte au QG. Surveillance continue, pas ponctuelle.

---

## 🎯 OBJECTIFS DE NOTE

| Outil | Score visé | Sévérité si < cible |
|---|---|---|
| SSL Labs | **A+** | P1 (jaune) |
| Mozilla Observatory | **A+ (≥100)** | P2 (vert) |
| Hardenize | **≥95/100** | P2 |
| SecurityHeaders.com | **A+** | P2 |
| mxtoolbox SuperTool | 0 warnings | P1 |
| dnsviz DNSSEC | tout vert | P1 |
| HIBP (data breach) | 0 fuite | P0 (rouge si fuite) |

---

## 1️⃣ Outils & URLs de test

### Site SSL/TLS
- **SSL Labs** : https://www.ssllabs.com/ssltest/analyze.html?d=navlys.com
- **CryptCheck** : https://cryptcheck.fr/https/navlys.com
- **TestSSL.sh** (CLI) : `docker run --rm drwetter/testssl.sh navlys.com`

### Headers HTTP
- **Mozilla Observatory** : https://observatory.mozilla.org/analyze/navlys.com
- **SecurityHeaders.com** : https://securityheaders.com/?q=navlys.com
- **Internet.nl** : https://internet.nl/site/navlys.com/

### DNS / Email
- **mxtoolbox** : https://mxtoolbox.com/SuperTool.aspx?action=mx%3anavlys.com
- **dnsviz** : https://dnsviz.net/d/navlys.com/dnssec/
- **dmarcian** : https://dmarcian.com/dmarc-inspector/?domain=navlys.com
- **MTA-STS validator** : https://aykevl.nl/apps/mta-sts/

### Multi-test agrégé
- **Hardenize** : https://www.hardenize.com/report/navlys.com (le plus complet, le mètre étalon)

### Data breach monitoring
- **Have I Been Pwned** : https://haveibeenpwned.com/DomainSearch (Domain Search gratuit après vérif propriété)
- **DeHashed** : https://www.dehashed.com (alertes payantes, optionnel)

### Certificate Transparency (alertes)
- **Cert Spotter (SSLMate)** : https://sslmate.com/certspotter/
- **crt.sh** : https://crt.sh/?q=navlys.com

---

## 2️⃣ Cron job hebdo — script `bunker-audit.sh`

À placer dans `_SITES_MASTER/_SECURITE_BUNKER/scripts/bunker-audit.sh` (à créer par 06 Infra & Veille) :

```bash
#!/bin/bash
# bunker-audit.sh — hebdo lundi 8h après veille-infra-navlys
# Génère rapport markdown + envoie au QG si dégradation

set -e
DOMAINS=("navlys.com" "navbiolife.com" "navlys.io" "brunopartouche.com")
DATE=$(date +%Y-%m-%d)
OUT="/Users/.../Downloads/_SITES_MASTER/_SECURITE_BUNKER/rapports/${DATE}_bunker_audit.md"
mkdir -p "$(dirname "$OUT")"

echo "# 🔬 Bunker Audit — ${DATE}" > "$OUT"
echo "" >> "$OUT"

for D in "${DOMAINS[@]}"; do
  echo "## ${D}" >> "$OUT"
  echo "" >> "$OUT"

  # SSL Labs (API non officielle, parsing JSON)
  SSL_GRADE=$(curl -s "https://api.ssllabs.com/api/v3/analyze?host=${D}&publish=off&fromCache=on" \
    | jq -r '.endpoints[0].grade // "N/A"')
  echo "- SSL Labs grade : **${SSL_GRADE}** (cible A+)" >> "$OUT"

  # Mozilla Observatory
  MOZ_SCORE=$(curl -s -X POST "https://http-observatory.security.mozilla.org/api/v1/analyze?host=${D}" \
    | jq -r '.score // "N/A"')
  echo "- Mozilla Observatory : **${MOZ_SCORE}** (cible ≥100)" >> "$OUT"

  # SecurityHeaders.com (HTML scraping ou API payante)
  SH=$(curl -sI "https://securityheaders.com/?q=${D}&followRedirects=on" \
    | grep -i "X-Score" | awk '{print $2}' | tr -d '\r')
  echo "- SecurityHeaders : **${SH:-N/A}**" >> "$OUT"

  # DNS / DMARC
  DMARC=$(dig TXT "_dmarc.${D}" +short | grep -oE "p=[a-z]+" | head -1)
  echo "- DMARC policy : **${DMARC}** (cible p=reject)" >> "$OUT"

  # Certificat expiry
  EXPIRY=$(echo | openssl s_client -servername "${D}" -connect "${D}:443" 2>/dev/null \
    | openssl x509 -noout -enddate | cut -d= -f2)
  echo "- Certif expire : **${EXPIRY}**" >> "$OUT"

  # CT monitoring (nouveau certif émis < 7 jours ?)
  RECENT_CERTS=$(curl -s "https://crt.sh/?q=${D}&output=json" \
    | jq -r --arg D "$(date -v-7d +%Y-%m-%d)" 'map(select(.not_before > $D)) | length')
  echo "- Nouveaux certificats CT (7j) : **${RECENT_CERTS}** (alerter si > attendu)" >> "$OUT"

  echo "" >> "$OUT"
done

echo "Rapport généré : $OUT"
```

### Cron Mac (launchd)

`~/Library/LaunchAgents/com.navlys.bunker-audit.plist` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>             <string>com.navlys.bunker-audit</string>
  <key>ProgramArguments</key>  <array>
    <string>/bin/bash</string>
    <string>/Users/.../Downloads/_SITES_MASTER/_SECURITE_BUNKER/scripts/bunker-audit.sh</string>
  </array>
  <key>StartCalendarInterval</key> <dict>
    <key>Weekday</key>  <integer>1</integer>  <!-- lundi -->
    <key>Hour</key>     <integer>8</integer>
    <key>Minute</key>   <integer>15</integer>
  </dict>
  <key>StandardOutPath</key>  <string>/tmp/bunker-audit.out</string>
  <key>StandardErrorPath</key> <string>/tmp/bunker-audit.err</string>
</dict>
</plist>
```

`launchctl load ~/Library/LaunchAgents/com.navlys.bunker-audit.plist`

### Alternative cloud : GitHub Actions

Workflow `.github/workflows/bunker-audit.yml` :

```yaml
name: Bunker Security Audit
on:
  schedule:
    - cron: '15 8 * * 1' # lundi 8h15 UTC
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install jq
        run: sudo apt-get install -y jq
      - name: Run audit
        run: bash _SECURITE_BUNKER/scripts/bunker-audit.sh
      - name: Commit rapport
        run: |
          git config user.name "Le Veilleur de Coffre"
          git config user.email "veilleur@navlys.com"
          git add _SECURITE_BUNKER/rapports/
          git commit -m "bunker-audit ${GITHUB_RUN_ID}"
          git push
      - name: Notify Slack si dégradation
        if: failure()
        run: |
          curl -X POST -H 'Content-Type: application/json' \
            --data '{"text":"⚠️ Bunker audit P1 — dégradation détectée"}' \
            ${{ secrets.SLACK_WEBHOOK_BUNKER }}
```

---

## 3️⃣ Tests manuels rapides (à la demande)

Petit script bash à garder sous le coude :

```bash
# bunker-quick-test.sh
DOMAIN="${1:-navlys.com}"

echo "🔬 Test rapide ${DOMAIN}"
echo "===================="

# 1. SSL Labs (lance le test)
echo "→ SSL Labs : https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"

# 2. Mozilla Observatory
curl -s -X POST "https://http-observatory.security.mozilla.org/api/v1/analyze?host=${DOMAIN}" \
  | jq '{grade, score, tests_failed, tests_passed}'

# 3. Headers de réponse
echo ""
echo "→ Headers HTTP"
curl -sI "https://${DOMAIN}" | grep -E "^(strict|content-security|x-frame|referrer|permissions|cross-origin)" -i

# 4. DNS / Email
echo ""
echo "→ SPF"
dig TXT "${DOMAIN}" +short | grep spf

echo ""
echo "→ DMARC"
dig TXT "_dmarc.${DOMAIN}" +short

echo ""
echo "→ DKIM Google"
dig TXT "google._domainkey.${DOMAIN}" +short | head -c 80

echo ""
echo "→ CAA"
dig CAA "${DOMAIN}" +short

echo ""
echo "→ DNSSEC"
dig +dnssec "${DOMAIN}" SOA | grep -E "(RRSIG|DNSKEY)"

# 5. Certificat
echo ""
echo "→ Certificat"
echo | openssl s_client -servername "${DOMAIN}" -connect "${DOMAIN}:443" 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

Usage : `./bunker-quick-test.sh navlys.com`

---

## 4️⃣ Have I Been Pwned monitoring

### Setup

1. Aller sur https://haveibeenpwned.com/DomainSearch
2. Demander la vérification du domaine `navlys.com` (HIBP envoie un email à `security@`)
3. Confirmer
4. HIBP envoie un email **dès qu'une nouvelle fuite contient un email @navlys.com**
5. Répéter pour les 4 domaines

### Réaction si alerte

- P0 incident → fichier 08 procédure
- Forcer rotation mot de passe / révocation session sur tous les comptes concernés
- Notifier les utilisateurs concernés sous 72h (obligation RGPD)

---

## 5️⃣ Alertes seuil — règles de déclenchement

| Métrique | Seuil normal | Alerte P2 | Alerte P1 | Alerte P0 |
|---|---|---|---|---|
| SSL Labs grade | A+ | A | B | C ou pire |
| Mozilla Observatory | ≥100 | 80–99 | 50–79 | <50 |
| DMARC policy | reject | quarantine | none | absent |
| Cert expiry | >30 j | 15–30 j | 7–15 j | <7 j |
| HIBP fuite | 0 | — | — | ≥1 |
| Nouveau certif CT non attendu | 0 | — | — | ≥1 |

---

## 6️⃣ Tableau de bord

Idéalement : Notion / Cloudflare Analytics / dashboard custom (Vercel + Recharts).

V1 simple : un fichier markdown généré par le cron, archivé dans `_SECURITE_BUNKER/rapports/YYYY-MM-DD_bunker_audit.md`. Lecture manuelle hebdo par Le Veilleur.

V2 : dashboard Next.js sur `https://bunker.navlys.com` (admin only via Cloudflare Access).

---

## ✅ CHECKLIST PREMIÈRE EXÉCUTION

- [ ] `bunker-audit.sh` créé et testé manuellement
- [ ] launchd ou GitHub Actions configuré
- [ ] HIBP Domain Search activé pour les 4 domaines
- [ ] Cert Spotter SSLMate configuré
- [ ] Premier rapport archivé dans `rapports/`
- [ ] Seuils d'alerte testés (forcer une fausse alerte pour valider)

---

> *« On ne se contente pas de bâtir les murs. On fait passer un inspecteur indépendant chaque lundi matin. »*
> — Le Veilleur de Coffre
