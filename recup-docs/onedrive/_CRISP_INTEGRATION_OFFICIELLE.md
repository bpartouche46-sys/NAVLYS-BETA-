# 📣 CRISP NAV IA — Intégration Officielle
*Compte créé par Bruno Mark Partouche · 29 mai 2026*

---

## 🔑 IDENTIFIANT OFFICIEL

```
CRISP_WEBSITE_ID = 6f0c9027-5dbf-4d0a-aab1-c12b5c2d65bb
```

Email du compte : `bruno@navlys.com`
Plan : **Crisp Pro** (95€/mois)

---

## 📥 SNIPPET HTML PRÊT À COLLER

À insérer juste avant `</head>` sur les 4 sites :

```html
<!-- 📣 Crisp NAV IA Chat — NAVLYS Officiel -->
<script type="text/javascript">
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "6f0c9027-5dbf-4d0a-aab1-c12b5c2d65bb";
  (function () {
    var d = document;
    var s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
</script>
```

---

## 🎯 CONFIGURATION RECOMMANDÉE CRISP

À faire dans le dashboard Crisp (Settings → Website Settings) :

### Branding NAVLYS
- **Color** : Or `#C9A961` (charte officielle NAVLYS)
- **Welcome message FR** : « ⚓ Bonjour ! Je suis NAV IA. Pose-moi ta question, je suis là pour t'éclairer. »
- **Welcome message EN** : « ⚓ Hello! I'm NAV IA. Ask me anything, I'm here to guide you. »
- **Avatar** : BRUNO COIN v2 (uploader le SVG 400×400 de `_KIT_RESEAUX_V2/coin_v2_profile_400x400.svg`)
- **Position** : bottom-right desktop / bottom-center mobile
- **Animation** : breathing or
- **Wait message** : « Un instant — NAV IA cherche la bonne réponse. »

### Routing
- **Operating hours** : 24/7 (NAV IA toujours dispo)
- **Auto-escalation humain** : si question contient "CIF", "ORIAS", "conseil personnalisé", "investir maintenant" → escalade Bruno
- **Bot intégré** : Claude API (à brancher après Anthropic API key fournie)

### Disclaimer obligatoire dans le footer de chaque conversation
```
🧪 Laboratoire NEXT GEN NAVLYS — éducation seule.
Bruno Mark Partouche n'est pas CIF/ORIAS. Pas de conseil personnalisé.
```

---

## 🌐 SITES À PATCHER

| Site | Fichier source | Statut |
|---|---|---|
| navlys.com | `navlys/public/teaser.html` + `app/layout.tsx` | À PATCHER |
| navbiolife.com | `_NAVBIO_TEASER_v4_compact.html` | À PATCHER |
| navlys.io | `navlys-io-vitrine-v6.html` | À PATCHER |
| brunopartouche.com | `bp-mobile-zen.html` + `brunopartouche.com/index.html` | À PATCHER |

Backup `.pre-crisp.bak` à poser avant chaque édit.

---

## 🔗 INTÉGRATION CLAUDE API (Phase 2, après Anthropic key fournie)

Le bot Crisp se connecte à Claude via Make.com :
1. Crisp → Webhook → Make.com (trigger sur nouveau message utilisateur)
2. Make.com → Anthropic API (envoie message + system prompt G1)
3. Make.com → Crisp API (envoie réponse Claude en streaming)
4. Voix Bruno ElevenLabs (Phase 3) → bouton 🔊 dans chaque réponse

System prompt G1 NAV IA = `_NAV_IA_SYSTEM_PROMPT_CLAUDE.md` (déjà livré).

---

## 🛠 ACTIONS CLAUDE IMMÉDIATES

1. ✅ Sauvegarder le WEBSITE_ID dans la mémoire NAVLYS
2. ✅ Créer le snippet HTML standard
3. ⏳ Injecter le snippet dans les 4 sites *(en cours)*
4. ⏳ Configurer le bot Crisp Magic Reply avec le system prompt
5. ⏳ Tester l'expérience utilisateur sur mobile

---

🪶 *Officialisé par Le Notaire de Bord et le Maître d'Œuvre · 29 mai 2026*
