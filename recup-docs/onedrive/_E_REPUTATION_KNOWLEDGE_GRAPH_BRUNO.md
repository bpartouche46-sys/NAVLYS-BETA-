# 🧠 STRATÉGIE KNOWLEDGE GRAPH GOOGLE — Bruno × NAVLYS

_28 mai 2026 · Comment faire apparaître un panel à droite des résultats Google quand on cherche « Bruno Mark Partouche »._

---

## 0. C'est quoi le Knowledge Graph (KG) et pourquoi ça compte ?

Quand tu tapes « Elon Musk » sur Google, tu vois un cadre à droite avec sa photo, son métier, sa date de naissance, ses entreprises, ses comptes sociaux. Ce cadre s'appelle un **Knowledge Panel**. Il est généré par le **Knowledge Graph** de Google.

**Pourquoi tu en veux un :**
- Il **squatte le tiers droit** de la page de résultats (~30% de la surface visuelle).
- Il **affiche TES liens officiels** (donc tu contrôles la navigation des curieux).
- Il **dégage les homonymes** de l'attention.
- Il **fixe ton identité officielle** auprès des autres IA (ChatGPT, Perplexity, Bing).

**Pourquoi tu n'en as pas encore un :**
- Google n'a pas assez de signaux cohérents pour conclure « ce Bruno-là est notable ».

---

## 1. Les 7 conditions Google pour déclencher un KG

| # | Condition | Statut Bruno (28/05/2026) | Action |
|---|---|---|---|
| 1 | **Entité claire** : un nom + un métier + une organisation identifiables | ⚠️ Partiel — NAVLYS pas encore en ligne pour Google | OK après ouverture gate 31/05 |
| 2 | **`sameAs` cohérents** : tous les profils sociaux pointent vers la même entité | 🔴 Non — `@amarock52` pas relié, profil LinkedIn IL exposé | À refondre Vague 1+2 |
| 3 | **Données structurées Schema.org** (JSON-LD `Person`) sur ton site officiel | 🔴 Absent | **Claude livre dans la section 3 de ce doc** |
| 4 | **Sources tierces fiables** : 3+ mentions sur sites à forte autorité (presse, Wikipédia, Wikidata) | 🔴 0 | À construire Vague 3 (press kit + RP) |
| 5 | **Wikidata item** créé et qualifié | 🔴 Non | À créer Vague 2 (Bruno crée le compte) |
| 6 | **Photo officielle unique** présente sur tous les profils | 🔴 Disparate | Bruno choisit 1 photo (cf. `_E_REPUTATION_TEXTES_REMPLACEMENT.md` § 1) |
| 7 | **Recherche du nom** doit générer ≥ 50 requêtes/jour pour que Google « se réveille » | ❓ Inconnu | Action SEO + lancement public 31/05 |

**Verdict** : sur 7 conditions, **5 sont à activer** dans les 30 jours. Aucune n'est techniquement difficile. C'est une question de discipline.

---

## 2. Roadmap déclenchement KG en 90 jours

```
J0   ━━┓ Claude injecte JSON-LD Person sur brunopartouche.com (autonome)
        ┃ Claude injecte JSON-LD Organization sur navlys.com
J+7  ━━┫ Bruno refait ses bios (textes section 2 du doc TEXTES_REMPLACEMENT)
        ┃ Bruno fait le ménage @amarock52 / Facebook (rapport Manus)
J+14 ━━┫ Bruno crée Wikidata item "Bruno Partouche" + item "NAVLYS"
        ┃ Bruno relie tous les profils via `sameAs`
J+21 ━━┫ Lancement public NAVLYS (31/05) — volume de recherche augmente
J+30 ━━┫ Bruno publie article fondateur LinkedIn
        ┃ Press kit envoyé à 18 contacts médias
J+60 ━━┫ Premiers backlinks médias retombent
        ┃ Bruno publie 1er épisode vidéo Cartographe
J+90 ━━┫ Audit : KG apparu ? Si non, renforcer Wikidata + presse
```

---

## 3. JSON-LD Person — Bruno (à injecter sur brunopartouche.com)

**À copier dans la `<head>` de TOUS les fichiers HTML de brunopartouche.com** (Claude fera l'injection en V1, avec backup `.bak.20260528` avant).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bruno Mark Partouche",
  "alternateName": ["Bruno Partouche", "BM"],
  "givenName": "Bruno Mark",
  "familyName": "Partouche",
  "gender": "Male",
  "nationality": "French",
  "url": "https://brunopartouche.com",
  "image": "https://brunopartouche.com/bruno-officiel.jpg",
  "description": "Entrepreneur français, fondateur de NAVLYS, écosystème pédagogique en finance personnelle. Skipper méditerranéen, narrateur de la méthode NAVLYS.",
  "jobTitle": "Fondateur de NAVLYS",
  "worksFor": {
    "@type": "Organization",
    "name": "NAVLYS",
    "url": "https://navlys.com"
  },
  "knowsAbout": [
    "Finance personnelle",
    "Marchés financiers",
    "Éducation financière",
    "Méditerranée",
    "Voile / Skipper",
    "Reiki",
    "Acupressure",
    "Bols tibétains"
  ],
  "sameAs": [
    "https://navlys.com",
    "https://navbiolife.com",
    "https://navlys.io",
    "https://il.linkedin.com/in/bpartouche",
    "https://www.linkedin.com/company/navlys",
    "https://x.com/NavlysCo",
    "https://www.instagram.com/navlys.official",
    "https://www.youtube.com/@navlys",
    "https://www.wikidata.org/wiki/[ID_À_REMPLIR_APRÈS_CRÉATION_WIKIDATA]"
  ]
}
</script>
```

**⚠️ Note** : les URL `sameAs` doivent ÊTRE CRÉÉES avant injection. Sinon Google les marque « broken » et déconsidère tout le bloc. Donc séquence :
1. Bruno crée les comptes NAVLYS (Vague 2.3).
2. Bruno valide la liste finale `sameAs`.
3. Claude met à jour ce JSON-LD avec les URL réelles et l'injecte.

---

## 4. JSON-LD Organization — NAVLYS (à injecter sur navlys.com)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NAVLYS",
  "alternateName": "NAVLYS — Écosystème pédagogique en finance personnelle",
  "url": "https://navlys.com",
  "logo": "https://navlys.com/NAVLYS-logo-profil-1080.png",
  "image": "https://navlys.com/NAVLYS-logo-profil-1080.png",
  "description": "NAVLYS est un écosystème pédagogique en finance personnelle. Recherche reproductible (Le Cartographe), interface avec les banques (Le Trésorier), narration humaine (Bruno Partouche). Pas de conseil personnalisé, pas d'encaissement de fonds clients.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Bruno Mark Partouche",
    "url": "https://brunopartouche.com"
  },
  "slogan": "Ma méthode, votre argent, votre tempo. — BM",
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Finance personnelle",
    "Éducation financière",
    "Recherche en marchés financiers",
    "Event studies",
    "Facteurs intraday"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/navlys",
    "https://x.com/NavlysCo",
    "https://www.instagram.com/navlys.official",
    "https://www.youtube.com/@navlys",
    "https://brunopartouche.com",
    "https://navbiolife.com",
    "https://navlys.io",
    "https://www.wikidata.org/wiki/[ID_NAVLYS_WIKIDATA]"
  ]
}
</script>
```

---

## 5. JSON-LD WebSite + BreadcrumbList (bonus SEO)

À ajouter sur la page d'accueil de brunopartouche.com :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bruno Partouche",
  "url": "https://brunopartouche.com",
  "publisher": {
    "@type": "Person",
    "name": "Bruno Mark Partouche"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://brunopartouche.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 6. Création Wikidata — Bruno Partouche (Bruno opère)

### 6.A — Procédure (10 minutes)

1. Bruno se crée un compte sur https://www.wikidata.org (gratuit, ouvert, anglo-saxon — utiliser email `bruno@navlys.com`).
2. Bruno clique « Create a new item ».
3. Bruno remplit le formulaire avec les valeurs du tableau ci-dessous.
4. Bruno copie l'**ID Wikidata** retourné (format `Q123456789`).
5. Bruno transmet l'ID à Claude → Claude met à jour les JSON-LD sections 3 et 4.

### 6.B — Déclarations Wikidata pour `Bruno Partouche`

| Property | Valeur |
|---|---|
| **Label FR** | Bruno Partouche |
| **Label EN** | Bruno Partouche |
| **Description FR** | Entrepreneur français, fondateur de NAVLYS |
| **Description EN** | French entrepreneur, founder of NAVLYS |
| **Aliases FR** | Bruno Mark Partouche, BM |
| `P31` instance of | `Q5` (human) |
| `P21` sex or gender | `Q6581097` (male) |
| `P27` country of citizenship | `Q142` (France) |
| `P106` occupation | `Q131524` (entrepreneur) |
| `P856` official website | `https://brunopartouche.com` |
| `P2013` LinkedIn personal ID | `bpartouche` |
| `P2002` X username | _à fixer après création_ |
| `P2003` Instagram username | _à fixer après création_ |
| `P2397` YouTube channel ID | _à fixer après création_ |
| `P800` notable work | (lier à l'item NAVLYS) |

### 6.C — Déclarations Wikidata pour `NAVLYS`

| Property | Valeur |
|---|---|
| **Label FR** | NAVLYS |
| **Label EN** | NAVLYS |
| **Description FR** | Écosystème pédagogique en finance personnelle |
| **Description EN** | Personal finance educational platform |
| `P31` instance of | `Q4830453` (business) ou `Q1110684` (online platform) |
| `P112` founded by | _(lier à l'item Bruno Partouche)_ |
| `P571` inception | 2026 |
| `P856` official website | `https://navlys.com` |
| `P17` country | `Q142` (France) |
| `P452` industry | `Q2329740` (financial services) |

---

## 7. Soumettre au Knowledge Panel Google (après tout le reste)

Google a un formulaire pour réclamer la « ownership » d'un Knowledge Panel **dès qu'il apparaît**. Tant qu'il n'est pas apparu, on attend.

**Procédure** (à exécuter ~J+45 quand le KG sera potentiellement créé) :

1. Bruno cherche son nom sur Google.
2. Si un panel apparaît à droite, Bruno clique en bas du panel sur « Claim this knowledge panel ».
3. Bruno passe la vérification d'identité (lien LinkedIn officiel + ID gov).
4. Une fois validé, Bruno peut **suggérer des modifications** au panel (photo, description courte, etc.).

**Si pas de KG à J+90** : renforcer les signaux faibles. Probables manques : sources tierces. Action : forcer 2-3 articles presse + 1 podcast.

---

## 8. Risques & contre-mesures

| Risque | Mitigation |
|---|---|
| KG créé avec mauvaise photo (ex : photo de @amarock52 politique) | Avant tout cela, BRUNO doit nettoyer @amarock52 ou supprimer. Sinon Google peut piocher la photo de ce compte. |
| KG créé en mélangeant Bruno × Groupe Partouche (casinos) | Forcer la cohérence via `disambiguatingDescription` dans JSON-LD + Wikidata description claire. |
| KG créé avec mauvaise « notable work » (NOVA, DFENSER ressortis d'archives) | Wikidata déclare explicitement NAVLYS = notable work. Aucune mention NOVA/DFENSER nulle part. |
| KG attribué à un homonyme (Tourcoing assurance) | Disambiguation via géographie (Méditerranée), métier (entrepreneur — pas assureur), réseau (NAVLYS — pas Tourcoing). |

---

## 9. Mesure du succès (KPIs à 90 jours)

| KPI | Cible J+30 | Cible J+60 | Cible J+90 |
|---|---|---|---|
| JSON-LD Person validé (Google Rich Results Test) | ✅ | ✅ | ✅ |
| Wikidata item Bruno actif | — | ✅ | ✅ |
| Wikidata item NAVLYS actif | — | ✅ | ✅ |
| # de profils sociaux avec photo officielle | 4 | 6 | 8 |
| # de sources tierces (presse / podcast / blog) | 0 | 1-2 | 3-5 |
| Knowledge Panel apparu | — | possible | probable |
| Position de brunopartouche.com sur « Bruno Mark Partouche » | top 10 | top 5 | **top 1** |

---

⚓ **Fin doc.** → Lire ensuite : `_DEPARTEMENT_E_REPUTATION_charte.md`.
