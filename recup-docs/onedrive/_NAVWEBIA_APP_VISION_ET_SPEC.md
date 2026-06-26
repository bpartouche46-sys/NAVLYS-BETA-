# 🌐 NAVWEBIA — App BETA "Ingurgite & Livre"
*Conçu 27 mai 2026 nuit · Mandat de Bruno · Bruno = client #1 quand prête*

---

## 🎯 LA VISION DE BRUNO

> *« Lancer la nouvelle app BETA pour, comme NAVBIO ingurgite les souvenirs d'une vie, ingurgiter tous les documents d'une personne — photos, vidéos — et en sortir un projet clair de vente et de commercialisation. Monter pièce en main le site, l'application, le backoffice en un clic. C'est le plus ambitieux. Je serai le tout premier client. »*

**Nom de code projet** : NAVWEBIA App "Brief-to-Business"
**Tagline** : *Ton idée dans une appli. Ton entreprise dans une boîte.*

---

## 🌊 LE FLOW UTILISATEUR — En 3 étapes simples

### 1. INGURGITER (5 min côté utilisateur)
- L'utilisateur télécharge l'app NAVWEBIA
- Il **déverse tout en vrac** : photos produits, vidéos pitch, documents Word, slides PowerPoint, fichiers Excel, schémas griffonnés, notes vocales, captures d'écran, factures de fournisseurs, contrats, etc.
- L'app accepte TOUS les formats (drag & drop)
- Pas besoin d'organiser. L'IA s'en charge derrière.

### 2. SYNTHÉTISER (24-48h — l'IA + Bruno + l'équipe travaillent)
- L'IA NAVLYS analyse l'ensemble :
  - Catégorise (produits / services / marque / cible / preuve sociale / pricing / contacts)
  - Identifie la **vraie offre** vendable
  - Extrait l'identité visuelle (palette, typo, ton)
  - Note les manques (ex: "Tu n'as pas de photos professionnelles", "Il manque ton positionnement prix")
- Bruno + équipe valident et ajustent avec le client

### 3. LIVRER EN 1 CLIC (auto)
Le client reçoit un **package complet** :

🌐 **Site web** déployé sur son domaine perso :
- Hero + pitch + offre + témoignages + form contact + CGU + RGPD
- Responsive mobile parfait
- SEO de base + Open Graph + favicons
- Charte cohérente avec ses visuels

📱 **App PWA installable** :
- Logo + onboarding
- Catalogue produits/services
- Système de prise de RDV ou de commande
- Notifications push
- Mode hors-ligne

💼 **Backoffice clés en main** :
- Dashboard simple (visiteurs, conversions, commandes)
- Gestion catalogue / contenu
- CRM clients basique
- Connecteur Stripe pour paiements
- Connecteur calendrier pour RDV
- Connecteur email pour communications

---

## 💰 MODÈLE ÉCONOMIQUE NAVWEBIA App

Cohérent avec le brief NAVWEBIA initial (cf. `project_navwebia.md` mémoire) — **2 offres** :

### Offre A — Propriétaire + Revenue-Share (volume passif)
- **Gratuit** à l'entrée
- Client devient **propriétaire** de son site + app + backoffice
- CGU = revenue-share perpétuelle sur ses **nouveaux clients** (% à définir : 5-10%)
- Profil : entrepreneur autonome

### Offre B — Partenaire AI-Assisted (premium actif)
- **Abonnement mensuel minimum obligatoire** pour couvrir coûts IA (Claude + autres) :
  - Suggéré : **49 €/mois** (à valider avec coûts réels)
- + revenue-share sur clients du partenaire
- Inclut : maintenance, mises à jour, support, ajustements graphiques mensuels
- Profil : porteur d'idée avec brief riche mais peu de temps technique

### Phase 0 — Lancement lean (Bruno mantra : *"Tout est bon à prendre"*)
- Prix d'entrée symbolique **9 € ou 19 €** (Bruno tranche)
- Filtrage curieux vs vrais porteurs d'idée
- Engagement Bruno : analyse chaque idée, retient les meilleures, les autres remboursées
- Permet de collecter de la data sur ce qui marche → ajuster pricing Phase 1

---

## 🏗 STACK TECHNIQUE PRÉVUE

### Frontend
- **App mobile** : PWA en React/Next.js (cross-platform iOS+Android sans store)
- **Web admin** : même base Next.js
- **Hébergement** : Vercel (déjà notre stack)

### Backend
- **Ingestion** : upload S3 (Cloudflare R2 pour low cost) + déduplication SHA
- **Catégorisation IA** : Claude Sonnet 4.6 via API
  - Coût estimé : ~0.50 € à 2 € par client selon volume documents
- **OCR** : Tesseract pour images textes, Whisper pour audios/vidéos
- **Génération** : Claude Opus 4.6 pour le contenu + design system
  - Coût estimé : 5-15 € par projet complet

### Database
- **Supabase** (déjà installé) : auth, storage, postgres
- **Auth** : Google + Facebook (déjà configurés)

### Génération auto site + app
- Template Next.js paramétrable (variables Tailwind/CSS injectées)
- Build & deploy via Vercel API → ~3 min de génération bout-en-bout
- Domaine custom du client : DNS chez son registrar, on lui guide

---

## 📐 ARCHITECTURE — 4 modules

### Module 1 : Upload & Ingestion
- App mobile : drag & drop + photo direct + capture vidéo + scan docs
- Web admin : drop zone géante
- Storage Cloudflare R2 (low cost, S3-compatible)
- Limite v1 : 500 fichiers / 5 Go par client

### Module 2 : Analyse & Synthèse
- Pipeline asynchrone (background jobs)
- Claude API extrait : produits, prix, USPs, témoignages, contacts, visuels exploitables
- Bruno + équipe reçoivent un dashboard "brief synthétisé" à valider/ajuster

### Module 3 : Génération
- Template de site adaptatif (mono-produit, multi-produits, service, RDV-only)
- IA génère : copy, hierarchies, CTAs, sections de preuve sociale
- Designer humain (Bruno ou équipe) valide la maquette
- Build Next.js + deploy Vercel programmatique

### Module 4 : Backoffice
- Dashboard React (template réutilisable par client)
- Liaison Stripe Connect (client encaisse, on prélève notre commission)
- Modules : catalogue, commandes, clients, contenus, analytics

---

## 🚦 ROADMAP DE BUILD (réaliste, 6-8 semaines)

### S1-S2 : Foundation
- Schéma DB Supabase (clients, projets, fichiers, briefs, déploiements)
- Auth Supabase Google déjà OK ✅
- Storage R2 setup
- Module 1 : upload (web + mobile PWA)

### S3-S4 : Pipeline IA
- Module 2 : Claude API ingestion + synthèse
- Dashboard brief humain
- Premiers tests avec Bruno comme client #1 (ses propres docs)

### S5-S6 : Template + Génération
- Template Next.js paramétrable
- Module 3 : IA génère copy + design + deploy auto
- Test bout-en-bout avec Bruno

### S7-S8 : Backoffice + Polish
- Module 4 : dashboard client
- Connecteurs Stripe + email + calendrier
- Premier déploiement public Phase 0
- Onboarding 10 premiers clients

---

## 🎯 SUCCESS METRICS

### Phase 0 (lancement)
- 10-50 clients Phase 0 (paiement symbolique 9-19 €)
- 100% des fichiers ingérés et catégorisés
- 70% reçoivent un dashboard brief en moins de 48h
- 50% acceptent de passer en Phase 1 (Offre A ou B)

### Phase 1 (6 mois)
- 100-200 sites NAVWEBIA en ligne
- Coût IA moyen par client : sous le palier abonnement B
- Revenue-share commençant à rentrer mensuellement
- Effet réseau : clients invitent d'autres clients

---

## ⚠️ POINTS À VALIDER AVEC BRUNO (au réveil)

1. **Nom de l'app finale** : `NAVWEBIA App`, `WebGenie`, `OneClickBusiness`, ou autre ?
2. **Domaine** : `navwebia.com` confirmé dépôt ? (Bruno doit déposer)
3. **Prix Phase 0** : 9 € ou 19 € ?
4. **% revenue-share Offre A** : 5 % / 8 % / 10 % ?
5. **Abonnement minimum Offre B** : 49 € / 79 € / 99 € ?
6. **Stack iOS+Android** : PWA seulement ou apps natives à terme ?
7. **Signature IA partenaires** : Anthropic (Claude) + OpenAI + autres déjà signés ?

---

## 🛤 ÉTAPES AUTONOMES JE DÉMARRE CETTE NUIT (sans réveiller Bruno)

1. ✅ Document de vision (ce fichier)
2. ⏳ Schéma DB NAVWEBIA (SQL Supabase) 
3. ⏳ Wireframe Module 1 — Upload
4. ⏳ Test Claude API pour ingestion d'un dossier exemple
5. ⏳ Premier prototype HTML drag-drop avec preview
6. ⏳ Brief design : palette + typo NAVWEBIA (inspirée de NAVLYS/NAVBIO)

---

*Le projet le plus ambitieux. On prend le temps. Bruno = client #1.*
*Bonne chance, bon travail, bonne route — BM.*
