# ⚓🤖 NAV IA CHAT UNIVERSEL — Recommandation prestataires
_28 mai 2026 · J-3 du lancement BETA · Annonce active : « CHAT UNIVERSEL · arrive 2 JUIN »_

> Mandat Bruno : « qui prendra la main dessus en clair, quel prestataire AI partenaire ? »
>
> **Réponse exécutive en une ligne** : **Stack recommandée = Crisp Pro (front) + 360dialog (WhatsApp BSP, intégré Crisp) + Anthropic Claude (IA conversationnelle, Haiku 4.5 + Sonnet 4.6) + Make.com (automatisation). Total ≈ 200 €/mois.**

---

## A. Couche IA conversationnelle (le « cerveau »)

Comparatif des 4 candidats sérieux à J-3 :

| Modèle | Coût input (1 M tokens) | Coût output (1 M tokens) | Latence | Conformité G1 (refus promesses rendement) | RGPD / souveraineté | Verdict NAVLYS |
|--------|-------------------------|--------------------------|---------|-------------------------------------------|--------------------|-----------------|
| **Anthropic Claude 4.6 Sonnet** | ≈ 3 $ | ≈ 15 $ | 1-2 s | ✅✅✅ **Le plus aligné** (refuse spontanément la promesse de rendement, parle « éducation » par défaut) | DPA EU OK · données non utilisées pour entraînement par défaut | 🟢 **Pour sujets sensibles G1** (juridique, conformité, méthode, RGPD) |
| **Anthropic Claude 4.5 Haiku** | ≈ 0,8-1 $ | ≈ 4-5 $ | < 1 s | ✅✅ très bon | idem | 🟢 **Pour 80 % du volume** (questions FAQ, info pratique) |
| **OpenAI GPT-4o** | 2,5 $ | 10 $ | < 1 s | ⚠️ moins aligné, peut tourner en « conseil » sans prompt fort | DPA EU OK, US-host | 🟡 Solide mais 2ᵉ choix |
| **OpenAI GPT-4o-mini** | 0,15 $ | 0,60 $ | < 1 s | ⚠️ idem | idem | 🟡 Économique mais Haiku préféré pour image de marque |
| **Mistral Large 2** | 2 $ | 6 $ | 1-2 s | ⚠️ aligné mais moins de « tact » G1 par défaut | ✅✅ **EU sovereign (FR)** | 🟢 **Option éthique FR** si Bruno veut souveraineté EU stricte |
| **Cohere Command R+** | 2,5 $ | 10 $ | 1-2 s | ⚠️ moyen | EU host dispo | 🟡 RAG natif fort mais image moins forte |

### Reco couche IA

**Hybride Anthropic Claude** :
- **Haiku 4.5** pour les 80 % de questions communes (« c'est quoi NAVLYS, comment je résilie, c'est quoi 90/10 »)
- **Sonnet 4.6** pour les 15 % sujets sensibles G1 (« est-ce que tu es CIF / ORIAS ? quel est mon risque ? rends-moi mon argent »)
- **Handover humain Bruno** pour les 5 % juridique réel (mise en demeure, plainte, presse)

**Volume estimé** : 1000 conversations/mois × 8000 tokens/conversation moyen ≈ 8 M tokens.
- Haiku : 80 % × 8 M × (1 $ + 5 $) / 2 → ≈ **24 $/mois**
- Sonnet : 15 % × 8 M × (3 $ + 15 $) / 2 → ≈ **11 $/mois**
- **Coût API total estimé : ≈ 35-50 $/mois** (env. **45 €/mois**)

**Alternative souveraineté EU stricte** : Mistral Large 2. Mais l'alignement G1 (refus de promesse) est moins natif. Tu paies en effort de prompt-engineering ce que tu gagnes en hébergement EU.

---

## B. Couche infrastructure chat (le « tuyau » + boîte unifiée)

Comparatif des 6 candidats :

| Plateforme | Tarif | Multi-canal natif | IA intégrée | RAG / KB | Origine | Verdict NAVLYS |
|------------|-------|-------------------|-------------|----------|---------|----------------|
| **Crisp** | €25 Mini · €95 Pro · €295 Unlimited | ✅ web + mail + WhatsApp + FB + Insta + Telegram | ✅ Magic Reply (OpenAI/Claude branchables) | ✅ Helpdesk + indexation auto | 🇫🇷 Nantes | 🟢 **#1 NAVLYS taille startup** |
| **Intercom** | $39+/seat · Fin AI Agent $0.99/résolution | ✅ premium | ✅ Fin AI (excellent) | ✅ Articles + workflows | 🇺🇸 SF | 🔴 Surdimensionné. Cher en seats. Cas Bruno : pas adapté. |
| **Tidio** | €19 Starter · €329 Premium | ✅ web + mail + WhatsApp | ✅ Lyro AI | ✅ KB | 🇵🇱 Szczecin | 🟡 Plus simple que Crisp mais moins fin |
| **Front** | $19-99/seat | ⚠️ inbox collaborative, pas chat | 🟡 AI basique | ⚠️ | 🇺🇸 | 🔴 Pas adapté (centré inbox équipe, pas chat visiteur) |
| **HelpScout** | €20-65/seat | ⚠️ mail + chat | 🟡 AI assist | ✅ Docs | 🇺🇸 Boston | 🟡 Élégant mais cher en seats |
| **ChatBase / ChatPilot** | $19-399 | ⚠️ chat web seul | ✅ wrappers IA | ⚠️ basique | 🇺🇸/🇮🇱 | 🔴 Pas multi-canal, pas suffisant |
| **Tawk.to** | gratuit (avec branding) | ✅ web | ⚠️ | ⚠️ | 🇺🇸 | 🟡 Quick fix gratuit MAIS branding obligatoire |

### Reco couche infrastructure

**Crisp Pro €95/mois** — le seul qui combine :
- multi-canal natif (web + mail + WhatsApp via 360dialog + FB/Insta)
- IA intégrée « Magic Reply » sur laquelle on peut brancher **Claude API directement**
- Helpdesk + Articles publiques (notre encyclopédie + FAQ s'y indexent automatiquement → search visitors)
- Origine **française**, RGPD-native, datacenters EU
- Forfait **multi-agents inclus** (Bruno + futurs collaborateurs sans surcoût)
- API et webhooks ouverts pour Make.com

**Plan tarifaire Crisp** :
- Mini €25 : 2 agents, sans Magic Reply IA, suffisant J0 pour tester
- **Pro €95 : 4 agents + Magic Reply (IA) + WhatsApp BSP + Helpdesk illimité** ← **recommandé**
- Unlimited €295 : pour > 50 agents (overkill 2026)

---

## C. WhatsApp Business API officielle (BSP — Business Solution Provider)

| Provider | Coût | Origine | Avantage | Intégration Crisp |
|----------|------|---------|----------|-------------------|
| **Twilio** | pay-as-you-go ≈ 0,05 $/conv | 🇺🇸 | API très solide, multi-canal | ⚠️ intégration via webhook custom |
| **MessageBird (Bird.com)** | équivalent | 🇳🇱 EU | EU-host, fort en Europe | ⚠️ via webhook |
| **360dialog** | €0,005-0,05/conv selon catégorie | 🇩🇪 Berlin | **EU sovereign**, focus WhatsApp BSP officiel Meta | ✅✅ **intégration native Crisp** |
| **Wati** | $39-159/mois | 🇮🇳 Bangalore | Surcouche prête à l'emploi, CRM léger | ⚠️ pas natif Crisp |
| **WhatsApp Business standard (numéro perso)** | gratuit | — | Quick fix | 🔴 pas multi-agent, pas API |

### Reco couche WhatsApp

**360dialog**, intégré nativement dans Crisp Pro.
- KYC Meta : 24-72 h (Bruno fournit pièce d'identité + justif domicile + nom commercial NAVLYS)
- Coût conversation : ≈ 0,005-0,05 €/conversation entrante selon catégorie (utility / marketing / authentication / service). Pour 1000 conversations/mois : **≤ 50 €/mois**, souvent < 20 €.
- Pas de coût d'abonnement BSP supplémentaire si passé via Crisp.

---

## D. Automatisation workflow (le « câblage » entre Crisp ↔ Claude ↔ Notion/Sheets/Bruno)

| Outil | Tarif | Force | Verdict |
|-------|-------|-------|---------|
| **Make.com** (ex-Integromat) | €9 Core · €16 Pro · €29 Teams | No-code, 1500+ apps, scénarios visuels, EU-friendly | 🟢 **#1 NAVLYS** |
| **n8n** | gratuit self-host · €20 Cloud | Self-host EU possible, total control, technique | 🟡 plus puissant mais plus de friction |
| **Zapier** | $19.99-103 | Mainstream | 🟡 plus cher pour volume équivalent |

### Reco couche automatisation

**Make.com Pro €29/mois**.
- Scénarios cibles dès J+5 :
  1. Mail/WhatsApp entrant → Crisp → Claude Haiku → réponse → Sheets log conversation
  2. Si mots-clés « plainte / mise en demeure / AMF / ORIAS » → escalade Bruno mobile via SMS
  3. Si mots-clés « partenaire / presse » → label Crisp + ping Bruno
  4. Reporting hebdo automatique → Slack/email résumé conversations

---

## E. Stack recommandée NAVLYS — synthèse opérationnelle

| Couche | Outil | Coût mensuel | Pourquoi |
|--------|-------|--------------|----------|
| Front chat + boîte unifiée + helpdesk | **Crisp Pro** | €95 | seul multi-canal natif + Magic Reply + FR/EU |
| WhatsApp Business API | **360dialog** (via Crisp) | ≤ €30 estimé (1000 conv) | officiel Meta + EU + intégré Crisp |
| IA conversationnelle | **Anthropic Claude Haiku 4.5 + Sonnet 4.6** | ≈ €45 estimé | meilleur alignement G1, refuse les promesses de rendement |
| Automatisation | **Make.com Pro** | €29 | no-code, reliage rapide |
| **TOTAL Marketing Comms infra** | | **≈ 200 €/mois** | |

**Couverture obtenue** :
- 4 sites équipés d'un chat universel
- mails entrants vers `contact@navlys.com`, `hello@navlys.com`, `presse@navlys.com`, `partenaires@navlys.com`, `support@navlys.com` → tous unifiés dans Crisp
- WhatsApp Business officiel avec numéro propre
- réponses IA Claude en < 5 s, 24/7
- handover humain Bruno en 1 clic
- archivage RGPD + RGPD DPA EU
- reporting hebdo automatique

---

## F. Comparaison ALTERNATIVE — stack « zéro abonnement extra » (BAS COÛT)

Si Bruno veut commencer plus light (J0-J+30 puis upgrade) :

| Couche | Outil | Coût |
|--------|-------|------|
| Front chat | **Crisp Mini** (sans IA) | €25 |
| WhatsApp | WhatsApp Business standard (numéro perso) | 0 € |
| IA | Aucune J0, ajouter Claude API plus tard | 0 € |
| Automatisation | Crisp triggers natifs | 0 € |
| **TOTAL** | | **€25/mois** |

**Avantage** : démarrage en 4 h, coût marginal.
**Limite** : pas d'IA NAV (badge décoratif jusqu'au upgrade), pas de multi-agents, pas de KB indexée, pas de scaling.

**Verdict** : démarrer en `Mini` (J0) puis upgrade à `Pro` après J+15 si volume confirme. Make.com et Claude API ajoutés à J+15.

---

## G. Hors-stack — pourquoi PAS d'autres options

- **Custom React + Next.js + Claude API en propre** : faisable techniquement, coût 0 abonnement, mais zéro inbox unifiée, zéro RGPD-archivage, zéro multi-canal (mail ne tombe pas dedans). Coût caché en dev + maintenance >> €95/mois Crisp. ❌
- **Botpress / Voiceflow** : excellents pour bots d'arbres décisionnels, pas pour conversation libre IA. ❌
- **Chatbase / SiteGPT / wrappers** : OK pour FAQ unique sur 1 site. Pas multi-canal. Pas adapté à 4 sites + mail + WhatsApp. ❌
- **Intercom Fin AI** : meilleure IA agentique du marché, mais $0,99/résolution et seats $39+ : > €1000/mois pour le volume NAVLYS attendu. ❌

---

## H. Conformité G1 (le « refus de la promesse de rendement »)

Quel que soit le LLM choisi, le **prompt système** est ce qui garantit la conformité. Brief proposé pour NAV IA :

```
Tu es NAV IA, le porte-parole pédagogique de NAVLYS.
NAVLYS est un éditeur de contenu pédagogique financier, comme un média.

Statut : Bruno Mark Partouche n'est PAS enregistré CIF, IOBSP ni ORIAS.
NAVLYS ne donne donc JAMAIS de conseil personnalisé en investissement.
Nous expliquons des méthodes, nous ne disons pas « achète », « vends », « investis dans X ».

Si on te demande un conseil personnalisé, redirige vers un Conseiller
en Investissement Financier inscrit ORIAS (https://www.orias.fr).

Si on te demande une promesse de rendement, refuse, et rappelle que
les performances passées ne préjugent pas des performances futures.

Ton : maritime, simple, tutoiement, phrases ≤ 20 mots, charte du 28/05/2026.
Toujours terminer par : « Information éducative · Pas un conseil personnalisé. »
```

Claude (Haiku ou Sonnet) **obéit nativement** à ce type de cadre — c'est son alignement constitutif. C'est la raison technique principale du choix Anthropic.

---

## I. Variables d'environnement à provisionner (Vercel + .env Bruno)

```
CRISP_WEBSITE_ID=...
CRISP_API_IDENTIFIER=...
CRISP_API_KEY=...
ANTHROPIC_API_KEY=sk-ant-...
DIALOG360_API_KEY=...
MAKE_WEBHOOK_NAVLYS_INBOUND=https://hook.eu1.make.com/...
```

**Toutes en variables d'env. Aucune en clair. Rotation 90 jours.** Cohérent règle 7 du Dispatch.

---

## J. Synthèse en 3 lignes pour Bruno

1. **Front + boîte unifiée** : **Crisp Pro €95/mois**. Origine française. Multi-canal natif.
2. **IA partenaire principale** : **Anthropic Claude (Haiku 4.5 + Sonnet 4.6)**. Refuse spontanément les promesses de rendement = conformité G1 native.
3. **WhatsApp Business officiel** : **360dialog**, intégré Crisp. KYC 24-72 h. Numéro propre.

Total stack : **≈ 200 €/mois**. Branchable en 5 jours. Annonce du badge « NAV IA Chat Universel · 2 juin » devient une promesse tenue.

---

⚓ *« Le tuyau d'abord. La voix ensuite. La voix de NAVLYS, c'est Claude. »*
_Compilé par Le Porte-Parole · Département Marketing & Communications NAVLYS · 28 mai 2026._
