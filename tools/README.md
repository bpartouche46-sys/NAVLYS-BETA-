# tools/check-i18n.mjs — banc de test des 5 langues (gravé 2026-07-05)

Vérifie en NAVIGATEUR RÉEL (Chromium/Playwright) que chaque page publique est
bien traduite dans chaque langue (en, ru, he, ar) : zéro clé restée en français,
zéro texte français hors dictionnaire.

```bash
cd live-source && python3 -m http.server 8123 &          # servir le site
npm i playwright                                          # une fois (browser déjà dans /opt/pw-browsers)
node tools/check-i18n.mjs                                 # tout · PAGES=x,y LANGS=en,he DETAIL=1 pour cibler
```

Règles gravées (core_reglement n°33-34) : jamais d'édition manuelle des
dictionnaires (script aligné + vérif runtime), tout nouveau texte visible entre
dans les 5 langues dans le même commit, et ce banc passe AVANT tout push.
