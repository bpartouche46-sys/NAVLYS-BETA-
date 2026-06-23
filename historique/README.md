# historique/ — Archive de l'expérience passée NAVLYS

**À quoi sert ce dossier :** *expérience passée NAVLYS — tout le contenu des anciens sites,
conservé pour mémoire.* On y archive le **source complet (verbatim)** de chaque ancien site
public NAVLYS et un relevé exhaustif de tous les slogans / références / récit. Rien n'est
résumé ni reformulé dans les sources : c'est le HTML brut tel que servi par les sites live.

> Ce dossier est **autonome** et n'affecte **aucun** autre répertoire du dépôt
> (en particulier `sites/`, qui contient des maquettes en cours à NE PAS toucher).

**Date de l'archive :** 23 juin 2026
**Méthode de capture :** récupération HTTP via `mcp__Vercel__web_fetch_vercel_url` (déploiements Vercel).

---

## Contenu

```
historique/
├── README.md                      ← ce fichier (index)
├── SLOGANS-ET-REFERENCES.md       ← relevé exhaustif verbatim : slogans, taglines,
│                                     adages, clins d'œil, récit/passé de Bruno,
│                                     + section RECHERCHE CIBLÉE (1+1 / Van Damme / célébrités)
└── sources/                       ← HTML complet, verbatim, de chaque page
    ├── navlys.com/
    │   ├── index.html
    │   ├── finance.html
    │   ├── next-gen.html
    │   ├── navlex.html
    │   ├── radio.html
    │   ├── influenceurs.html
    │   ├── tech.html              (= /tech, « Journal de l'IA »)
    │   └── finance-journal.html   (= /finance-journal, « Journal Financier »)
    ├── brunopartouche.com/
    │   ├── index.html             (voir note de troncature ci-dessous)
    │   └── bio.html               (biographie vivante de Bruno — la plus riche en récit)
    ├── navbiolife.com/
    │   └── index.html
    ├── navlys.io/
    │   └── index.html
    └── navlys-teaser/
        └── index.html             (navlys-teaser.vercel.app)
```

---

## Notes de capture

- **`brunopartouche.com/index.html`** : le HTML est complet jusqu'au dernier `<script>` inline,
  où l'outil de récupération **tronque** la réponse (au milieu de l'appel `NV_HERO_BG`). Deux
  récupérations successives coupent au même endroit. Une note d'archive (commentaire HTML) le
  signale en fin de fichier. **Aucune perte de contenu éditorial/textuel** : seuls manquent les
  derniers paramètres JS du diaporama d'arrière-plan.
- **`navlys.com/tech.html`** : la 1ʳᵉ récupération a échoué (« 409 / Unable to create shareable URL ») ;
  réussie à la 2ᵉ tentative. Contenu complet.
- **404 / pages non créées :** aucune. Toutes les pages listées dans la mission ont répondu **200 OK**.

## Sécurité (secrets)

- Aucun **secret privé** (token, clé privée, mot de passe) n'a été trouvé dans les HTML.
- `navlys.com/index.html` contient une **clé Supabase `anon` publique** (rôle `anon`, conçue pour
  être exposée côté navigateur). Conformément à la consigne, elle est **conservée telle quelle**
  (les clés `anon` publiques peuvent rester). Endpoint associé : table `inscriptions` (RLS insert anon).
- Aucune valeur n'a donc été remplacée par `[SECRET-RETIRE]`.

## Résultat de la recherche ciblée (résumé)

- « **un plus un** » / « **1+1** » : **NON TROUVÉ** sur les sites live.
- « **Van Damme** » / « **aware** » : **NON TROUVÉ** sur les sites live.
- **Personnes connues / célébrités / Membre d'Honneur / visage connu** : **AUCUNE** nommée
  (seule personne réelle citée = **Bruno Mark Partouche**, le fondateur). Un emplacement
  « créateur/partenaire à l'honneur » existe mais est **vide** (placeholder à valider par Bruno).
- Détail complet : voir `SLOGANS-ET-REFERENCES.md`, section « RECHERCHE CIBLÉE ».
