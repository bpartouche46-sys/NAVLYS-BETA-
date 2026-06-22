# ORDRE DE MISSION — HERMÈS (ops / déploiement)

> **À qui** : Hermès (opérateur technique qui a accès à la **source** des sites + Vercel CLI).
> **De la part de** : Claude (conception/conformité) pour Bruno (décision finale).
> **Date** : 2026-06-22 · Réf. fichiers : `corrections-pretes/` · Réf. procédure : `corrections-pretes/MEMO-DEPLOIEMENT.md`
>
> 🎯 **But de cette mission** : appliquer la **Vague 1** (déjà validée conformité) et
> me dire **exactement ce que tu as pu faire**. C'est aussi un **test** : si une étape
> te bloque, **ne force pas** — note-la et signale-la dans ton compte-rendu (§5).

---

## 0. RÈGLES NON NÉGOCIABLES (avant de toucher quoi que ce soit)

1. 🟢 **Tu ne déploies RIEN en prod sans le « feu vert prod » explicite de Bruno.**
   Tu peux tout préparer (copier les fichiers, faire les diffs, builder en preview),
   mais le passage **production** attend son OK écrit.
2. 💰 **Zéro argent.** Aucune dépense, aucun achat de domaine, aucun upgrade payant,
   aucune validation de paiement. Si une action coûte → **stop**, demande à Bruno.
3. ⚖️ **Tu n'inventes aucune identité juridique.** Les placeholders légaux
   (`[ÉDITEUR]`, `[EMAIL]`, `[HÉBERGEUR]`) → **Bruno te les donnera**. Tant qu'il ne
   les a pas donnés, **ne publie pas** `/cgu` et `/privacy` (ou publie-les en preview only).
4. 🧱 **Tu modifies UNIQUEMENT ce qui est listé ici.** Aucune autre page, aucun refactor.
5. 💾 **Snapshot d'abord.** Avant de remplacer un fichier, sauvegarde la version actuelle
   (copie horodatée). On doit pouvoir revenir en arrière en 1 minute.

---

## 1. PRÉREQUIS (à confirmer dans ton compte-rendu)

- [ ] Tu es bien sur la machine qui a **le code source** des sites (déploiements `source: cli`,
      utilisateur Vercel `claudenavlys`, équipe `NAVLYS`).
- [ ] Tu as récupéré les fichiers du dossier `corrections-pretes/` (je te les fournis).
- [ ] `vercel` CLI fonctionne et tu es loggé sur la bonne équipe.

> Si l'un de ces points est **faux** → arrête-toi et dis-le moi (§5). C'est une info utile, pas un échec.

---

## 2. VAGUE 1 — ce qui est validé conformité et prêt (PRIORITÉ)

### 2.A — navbiolife.com (projet Vercel `navbio`) — page d'accueil
- **Fichier à mettre en place** : `corrections-pretes/navbiolife.com/index.html`
- **Avant de remplacer** : fais un **diff** contre l'`index.html` actuellement en prod.
  → Les **seules** différences attendues sont : meta sans « Jérusalem », commentaire JS,
    et le compte à rebours recalé sur `2026-06-30T22:00:00Z` (= 1ᵉʳ juillet 00:00 Paris).
  → Si tu vois **d'autres** différences → **stop**, copie-les-moi (§5), n'écrase pas.
- [ ] Snapshot de l'actuel → remplacement par le fichier corrigé.

### 2.B — brunopartouche.com (projet Vercel `brunopartouche`) — page /bio
- **Fichier à mettre en place** : `corrections-pretes/brunopartouche.com/bio.html`
- **Avant de remplacer** : **diff** contre la `/bio` actuelle.
  → Seules différences attendues : retrait de « +8 à 12% par an », ajout du disclaimer
    conformité en pied de page, date « 1ᵉʳ juillet ».
  → Toute autre différence → **stop**, signale-moi (§5).
- [ ] Snapshot → remplacement.

> Ces 2 fichiers ont reçu le **feu vert conformité** (contrôle gardien du 2026-06-22).
> Il ne manque que le **feu vert prod de Bruno** pour les pousser en production.

---

## 3. VAGUE 1bis — compteurs périmés (simple, mais à vérifier sur source)

> ⚠️ Ces cibles n'ont **pas** pu être contrôlées sur fichier (source absente du dépôt).
> Donc : applique le patch, puis **renvoie-moi le fichier modifié** pour contrôle conformité
> avant prod. Patch détaillé : `corrections-pretes/PATCH-comptes-a-rebours.md`.

### 3.A — navlys-teaser.vercel.app (projet `navlys-teaser`) — patch **P-01**
- [ ] Compteur : `new Date('2026-06-15T00:00:00')` → `new Date('2026-07-01T00:00:00')`.
- [ ] (Optionnel charte) Ice Blue `#5fe0ff` → `#7DD3FC`.

### 3.B — brunopartouche.com (home) — patch **P-02**
- [ ] CTA héro « ✨ Lancement 1ᵉʳ juin » → « 1ᵉʳ juillet ».
- [ ] Carte lancement « 1ᵉʳ juin 2026 » → « 1ᵉʳ juillet 2026 ».
- [ ] Compteur : cible → `2026-07-01T00:00:00` (ou `2026-06-30T22:00:00Z`).

---

## 4. EN ATTENTE DE BRUNO (ne fais PAS sans ses infos) — pages légales navbio

- `corrections-pretes/navbiolife.com/cgu.html` et `privacy.html` corrigent les **404**
  `/cgu` et `/privacy`, MAIS contiennent des **placeholders légaux** à remplir.
- [ ] Mets-les en **preview** si tu veux tester le routage, mais **ne les rends pas publics**
      tant que Bruno ne t'a pas donné `[ÉDITEUR]`, `[EMAIL]`, `[HÉBERGEUR]`.

---

## 5. CE QUE TU DOIS ME RENVOYER (compte-rendu — c'est le cœur du test)

Réponds point par point, honnêtement (un « je n'ai pas pu » est une réponse valide et utile) :

1. **Prérequis §1** : OK / pas OK (lesquels ?).
2. **2.A navbio** : diff fait ? différences vues = celles attendues, ou autres ? fichier remplacé en local ? **déployé ? (oui seulement si feu vert prod)**.
3. **2.B bio** : idem.
4. **3.A / 3.B compteurs** : patch appliqué ? **fichiers modifiés renvoyés pour contrôle ?**
5. **Blocages** : tout ce qui t'a arrêté (accès, CLI, fichier introuvable, diff inattendu…).
6. **Liens preview** Vercel générés (le cas échéant) — pour que je/Bruno vérifie avant prod.
7. **Ce que tu proposes ensuite** (si quelque chose mérite une décision de Bruno).

> Après ton retour : je refais passer le **gardien** sur tout fichier nouvellement modifié
> (3.A/3.B), puis Bruno donne (ou non) le **feu vert prod**, et seulement là tu déploies.

---

### Rappel de l'ordre des feux
**Conformité (Claude/gardien)** ✅ déjà donné pour 2.A et 2.B → **Prod (Bruno)** ⏳ en attente → **Déploiement (toi)**.
Argent = Bruno, toujours. En cas de doute : **tu demandes, tu n'inventes pas.**
