# ⚓ POLITIQUE DE CONFIDENTIALITÉ NAVBIO LIFE (v1.0)
_Privacy Policy NAVBIO LIFE · Bilingue FR / EN · 29 mai 2026 · conforme RGPD UE 2016/679, LIL FR, UK-GDPR, CCPA US, APPI JP, PIPL CN_

---

## 1. Identité du responsable de traitement / Data controller

**FR.** Le responsable de traitement est **NAVLYS**, marque exploitée par M. **Bruno Mark Partouche**, opérant depuis la France. Contact DPO : **dpo@navlys.com**. Le DPO est joignable pour toute question relative aux données personnelles, demande d'exercice de droits ou réclamation.

**EN.** The data controller is **NAVLYS**, a trade name operated by Mr. **Bruno Mark Partouche**, based in France. DPO contact: **dpo@navlys.com**.

---

## 2. Données collectées / Data collected

### 2.1 Données de compte / Account data
| Donnée | Finalité | Base légale | Durée |
|---|---|---|---|
| Email | Authentification, contact | Exécution du contrat (art. 6.1.b RGPD) | Compte actif + 30 jours |
| Mot de passe (hash Argon2id) | Authentification | Exécution contrat | Idem |
| Nom / prénom (optionnel) | Personnalisation, transmission successorale | Consentement (art. 6.1.a) | Idem |
| Langue, fuseau horaire | Confort d'usage | Intérêt légitime | Idem |

### 2.2 Données de paiement / Payment data
- Traitées exclusivement par **Stripe Inc.** (sous-traitant certifié PCI-DSS niveau 1).
- NAVLYS reçoit uniquement l'**identifiant de transaction** et le statut de paiement.
- NAVLYS ne stocke **jamais** numéro de carte, CVV ou IBAN.
- Conservation : 10 ans (obligation comptable Code de commerce FR art. L123-22).

### 2.3 Métadonnées techniques / Technical metadata
- Adresse IP, user-agent, logs de connexion : conservation **12 mois** (art. R10-13 CPCE).
- Cookies techniques (session) : durée de session, exempts de consentement (art. 82 LIL).
- Aucun cookie de mesure d'audience non anonymisé sans consentement (recommandations CNIL 2020).

### 2.4 Données NON collectées / Data NOT collected
NAVLYS **ne collecte pas, ne lit pas, ne stocke pas en clair** :
- les contenus uploadés (photos, vidéos, sons, textes biographiques),
- la clé de chiffrement de l'Utilisateur,
- le contenu des transcriptions vocales (traitées localement),
- les données de géolocalisation (sauf consentement explicite séparé).

**Tous les contenus sont chiffrés E2E AES-256-GCM côté client.** NAVLYS héberge uniquement des **blobs cryptés inintelligibles** sans la clé de l'Utilisateur.

---

## 3. Finalités et bases légales / Purposes and legal bases

| Finalité | Base légale (art. 6 RGPD) |
|---|---|
| Création et gestion du compte | Exécution du contrat (6.1.b) |
| Traitement des paiements et facturation | Exécution du contrat (6.1.b) + obligation légale comptable (6.1.c) |
| Support client | Intérêt légitime (6.1.f) |
| Statistiques agrégées anonymisées | Intérêt légitime (6.1.f) |
| Newsletter et marketing | Consentement opt-in (6.1.a) — révocable à tout moment |
| Lutte contre la fraude | Intérêt légitime (6.1.f) |
| Coopération judiciaire | Obligation légale (6.1.c) |

---

## 4. Destinataires et sous-traitants / Recipients and processors

| Sous-traitant | Rôle | Localisation | Garanties |
|---|---|---|---|
| **Cloudflare R2** | Hébergement objets chiffrés | UE/US | DPA signé, SCC EU 2021/914, ISO 27001 |
| **Stripe Inc.** | Paiement | US (FR via Stripe Payments Europe) | PCI-DSS L1, SCC EU |
| **Resend** | Email transactionnel | US | DPA, SCC EU |
| **Vercel Inc.** | Hébergement frontend | US (régions EU disponibles) | DPA, SCC EU |
| **Google Workspace** | Email pro `*@navlys.com` | UE/US | DPA EU Model Clauses |
| **Anthropic** *(optionnel)* | IA assistance biographique | US/UE | DPA, traitement éphémère sans entraînement |

Aucune **vente** de données à des tiers. Aucun **transfert publicitaire** vers des courtiers de données.

---

## 5. Transferts hors UE / Cross-border transfers

Lorsque des sous-traitants opèrent depuis les USA, NAVLYS s'appuie sur :
- les **Clauses Contractuelles Types (SCC) 2021/914** de la Commission européenne,
- le cas échéant le **EU-US Data Privacy Framework** (DPF, décision d'adéquation du 10 juillet 2023),
- des mesures techniques supplémentaires (chiffrement E2E pour les contenus).

---

## 6. Durées de conservation / Retention periods

| Catégorie | Durée |
|---|---|
| Compte actif | Tant que le compte existe |
| Compte supprimé | Effacement définitif **30 jours** après demande |
| Factures | 10 ans (obligation comptable) |
| Logs techniques | 12 mois (CPCE FR R10-13) |
| Données post-mortem (sans légataire) | 5 ans en archive chiffrée, puis suppression |

---

## 7. Droits de l'Utilisateur / User rights

**FR.** Conformément aux articles 15 à 22 du RGPD, l'Utilisateur dispose des droits suivants :
- **Accès** (art. 15) — obtenir copie de ses données ;
- **Rectification** (art. 16) — corriger une donnée inexacte ;
- **Effacement** (art. 17) — droit à l'oubli ;
- **Limitation** (art. 18) ;
- **Portabilité** (art. 20) — export JSON+blobs chiffrés ;
- **Opposition** (art. 21) ;
- **Non-soumission au profilage automatisé** (art. 22) ;
- **Directives post-mortem** (art. 85 LIL FR).

**Exercice :** par email à **dpo@navlys.com** avec justificatif d'identité. Réponse sous **1 mois maximum** (extension de 2 mois si demande complexe).

**EN.** Per GDPR art. 15–22: access, rectification, erasure, restriction, portability, objection, no automated profiling, post-mortem directives. Contact: **dpo@navlys.com**. Reply within **1 month** (extendable to 3 if complex).

---

## 8. Réclamation auprès des autorités / Complaint to authorities

| Pays | Autorité | Lien |
|---|---|---|
| 🇫🇷 France | **CNIL** | https://www.cnil.fr/fr/plaintes |
| 🇮🇪 Irlande (chef de file UE possible) | **DPC** | https://www.dataprotection.ie/en/contact/make-complaint |
| 🇪🇺 UE générique | Liste autorités EDPB | https://edpb.europa.eu/about-edpb/about-edpb/members_en |
| 🇬🇧 UK | **ICO** | https://ico.org.uk/make-a-complaint |
| 🇺🇸 USA | FTC + State AG (CA: CPPA) | https://reportfraud.ftc.gov |
| 🇮🇱 Israël | **PPA** | https://www.gov.il/en/departments/the_privacy_protection_authority |

---

## 9. Sécurité / Security measures

- Chiffrement **E2E AES-256-GCM** côté client,
- Dérivation de clé **Argon2id** (paramètres OWASP 2024),
- TLS 1.3 obligatoire pour tout transit,
- **Pas d'accès admin aux contenus** (zero-knowledge architecture),
- Hébergement R2 chiffré au repos AES-256,
- Audit de sécurité indépendant prévu T3 2026,
- Bug bounty privé à partir BETA.

---

## 10. Mineurs / Minors

NAVBIO n'est pas conçu pour les utilisateurs de **moins de 16 ans** (art. 8 RGPD UE) ou **moins de 13 ans** (COPPA USA). Tout compte détecté en violation est suspendu puis supprimé.

---

## 11. Cookies

NAVBIO utilise **uniquement des cookies techniques de session** exempts de consentement (art. 82 LIL FR / ePrivacy Directive UE). Pas de tracker tiers, pas de pixel publicitaire, pas de Google Analytics par défaut.

---

## 12. Modifications / Updates

Toute modification substantielle de la présente Politique est notifiée par email aux Utilisateurs **30 jours avant** entrée en vigueur. L'historique des versions est consultable à `https://navlys.com/legal/privacy/versions`.

---

*Document interne — projet — à valider par DPO certifié et avocat NTIC avant production. — Le Notaire de Bord NAVLYS.*
