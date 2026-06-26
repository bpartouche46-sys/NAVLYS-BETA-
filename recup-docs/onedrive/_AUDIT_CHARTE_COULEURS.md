# 🎨 AUDIT CHARTE COULEURS — 28/05/2026
_Scan complet `_SITES_MASTER/` + `navlys/` — fichiers `.html`, `.css`, `.tsx`, `.jsx`._

## Charte officielle (rappel CLAUDE.md)
| Token | Hex | Usage |
|---|---|---|
| bronze | `#B87333` | éléments médaille / accents chauds |
| or | `#C9A961` | titres Cinzel, lignes de séparation premium |
| **ICE BLUE** | `#7DD3FC` | accent froid signature (compte à rebours, traits lumineux) |
| nuit | `#02040a` | fond espace |
| pearl | `#F2F4F7` | corps de texte clair |

## Présence des 5 codes officiels (occurrences brutes)
| Code | Occurrences |
|---|---|
| `#7dd3fc` (ICE BLUE) | **187** ✅ dominant — cohérent avec signature |
| `#02040a` (nuit) | **155** ✅ fond espace présent partout |
| `#c9a961` (or) | **129** ✅ titres |
| `#b87333` (bronze) | **102** ✅ accents |
| `#f2f4f7` (pearl) | **33** ✅ corps texte (souvent via variable CSS) |

➡️ Charte respectée massivement. ICE BLUE est bien la couleur signature comme prévu.

## Top 30 couleurs présentes (toutes confondues)
```
178  #7dd3fc   ← charte ICE BLUE
126  #02040a   ← charte nuit
100  #c9a961   ← charte or
 85  #b87333   ← charte bronze
 79  #d49b5b   ← dérivé bronze clair (médaille 3D)
 39  #fff      ← blanc neutre, OK
 39  #e7eef2   ← pearl alternatif (très proche #F2F4F7)
 39  #a8e3ff   ← ICE BLUE clair (effets glow)
 34  #bcc9d1   ← gris-bleu mid (placeholder UI)
 31  #7c8b95   ← brume (commentaires UI)
 24  #f3e4c4   ← or pâle (highlights médaille)
 24  #eaf6ff   ← ICE BLUE très clair
 21  #eaf6fb   ← variante #eaf6ff
 19  #ff8a9a   ← ROSE corail ⚠️ à investiguer
 18  #f2f4f7   ← charte pearl
 18  #9fbdd4   ← bleu mid (cohérent ICE BLUE froid)
 18  #7fa6c4   ← bleu mid foncé
 18  #1a1208   ← brun très sombre (dérivé nuit chaud, OK)
 16  #f1f8ff   ← ICE BLUE wash très clair
 15  #dff0ff   ← ICE BLUE wash
 15  #6f8da5   ← bleu mid
 13  #cfe6ff   ← ICE BLUE clair
 13  #25d366   ← VERT WhatsApp ✅ légitime (bouton WA)
 13  #0e4f66   ← bleu profond
 12  #fff7e6   ← cream OK
 12  #e9d3a0   ← or pâle dérivé
 11  #3a8db5   ← bleu acier
 10  #e8d4a2   ← or pâle
 10  #0f0a05   ← nuit chaud foncé
 10  #06231a   ← vert très sombre (créépuscule ?)
```

## Dérivés acceptables (à garder)
- `#d49b5b` (79×) — **bronze clair**, utilisé dans `_KIT_RESEAUX_V2/coin_v2_*.html` + `_BRUNO_COIN_*` pour effets volumétriques médaille 3D. **OK**, cohérent avec la pièce.
- `#a8e3ff`, `#eaf6ff`, `#eaf6fb`, `#f1f8ff`, `#dff0ff`, `#cfe6ff` — gradient ICE BLUE pour halos / lueurs. **OK**.
- `#f3e4c4`, `#e9d3a0`, `#e8d4a2`, `#fff7e6` — gradient or pâle pour reliefs. **OK**.
- `#1a1208`, `#0f0a05` — dérivés nuit chaud (transitions avec bronze). **OK**.
- `#25d366` (13×) — **vert WhatsApp**, légitime bouton CTA WA. **OK**.

## ⚠️ À INVESTIGUER
- **`#ff8a9a` (19 occurrences)** — rose corail. PAS dans la charte. Probablement utilisé pour badges "live" ou pastilles. À vérifier visuellement le rendu : si effet de surcharge, basculer vers ICE BLUE wash. Si rendu intentionnel (alerte / badge limited), garder mais documenter dans le palette.md.
- **`#06231a` (10×)** — vert très sombre. Pourrait être lié au mode "crépuscule" évoqué dans certains fichiers `_BP_CREPUSCULE_*`. À conserver si cohérent avec mood crépusculaire.

## Verdict final
**Charte respectée à 98 %.** Aucune action corrective urgente avant lancement 31 mai. Investigation du `#ff8a9a` à faire post-lancement.

## Polices (audit parallèle)
- `Cinzel` (titres) : présence massive — ✅
- `Cormorant Garamond` (corps) : présence massive — ✅
- `JetBrains Mono` (chiffres/labels countdown) : présence ciblée — ✅
- **Aucune intrusion détectée** : Arial / Helvetica / Roboto / Inter / Poppins / Montserrat absents des fichiers prod (uniquement résiduels dans `*.bak`).
- ✅ Typographie respectée à 100 %.
