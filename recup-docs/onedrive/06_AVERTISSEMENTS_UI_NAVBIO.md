# ⚓ BIBLIOTHÈQUE DES AVERTISSEMENTS UI NAVBIO (v1.0)
_UI Warning Library · Bilingue FR / EN · à intégrer dans `_APP_NAVBIO_v1/components/legal/`_

> **Principe.** Toute action sensible doit afficher un **rappel court, clair, bilingue** + lien vers les CGU complètes. L'Utilisateur ne peut pas dire « je ne savais pas ».

---

## 1. Modal pré-upload — Checklist droits / Pre-upload rights checklist

**Trigger :** clic sur « Ajouter une photo » ou drag&drop.

**FR.**
```
🛟 AVANT D'UPLOADER — 4 questions

☐ Je détiens les droits sur cette photo (ou j'ai l'autorisation)
☐ Les personnes visibles ont donné leur accord
☐ Aucun mineur sans autorisation parentale écrite
☐ Aucune photo trouvée en ligne d'une célébrité

[Je confirme et j'uploade]   [Annuler]

📖 Lire les règles complètes →
```

**EN.**
```
🛟 BEFORE YOU UPLOAD — 4 questions

☐ I hold rights to this photo (or have permission)
☐ Visible persons consented
☐ No minor without written parental authorization
☐ No celebrity photo found online

[I confirm and upload]   [Cancel]

📖 Read the full rules →
```

---

## 2. Modal post-détection — Floutage automatique / Auto-blur preview

**Trigger :** détection de visages après upload.

**FR.**
```
🤖 ANALYSE AUTOMATIQUE TERMINÉE

Cette photo contient 4 visage(s) détecté(s).
2 ont été automatiquement floutés :
  • Face #2 — détecté comme potentiellement mineur (< 18 ans)
  • Face #4 — en arrière-plan, non identifié comme sujet principal

Souhaitez-vous démasquer certaines personnes ?
⚠️ Désactiver le floutage = vous certifiez disposer du consentement.

[Voir le détail par visage]   [Accepter le floutage par défaut]
```

**EN.**
```
🤖 AUTO-ANALYSIS COMPLETE

This photo contains 4 detected face(s).
2 were automatically blurred:
  • Face #2 — detected as potentially under 18
  • Face #4 — background, not main subject

Wish to unmask?
⚠️ Disabling blur = you certify holding consent.

[View per-face details]   [Accept default blur]
```

---

## 3. Bannière footer permanente / Persistent footer banner

**FR.**
```
⚓ Vous restez seul(e) responsable de la légalité de vos contenus.
   NAVLYS est hébergeur technique, ne lit pas vos photos chiffrées.
   📖 CGU · Confidentialité · Bonne Conduite · DPO
```

**EN.**
```
⚓ You remain solely responsible for the legality of your content.
   NAVLYS is a technical host; we do not read your encrypted photos.
   📖 Terms · Privacy · Code of Conduct · DPO
```

---

## 4. Modal pré-publication / Pre-share modal

**Trigger :** activation du partage (envoi à un proche, génération lien).

**FR.**
```
🔗 PARTAGE AVEC UN TIERS

Vous allez partager 12 contenus avec [destinataire].
Cela inclut 8 photos contenant 14 visages, dont 3 floutés (mineurs ou arrière-plan).

⚠️ En partageant, vous engagez votre responsabilité :
  • Les destinataires recevront une clé temporaire (durée 7 jours par défaut)
  • Vous certifiez disposer du droit de partager ces contenus

[Partager]   [Annuler]
```

**EN.**
```
🔗 SHARE WITH SOMEONE

You're about to share 12 items with [recipient].
This includes 8 photos with 14 faces, 3 blurred (minors or background).

⚠️ By sharing, you take responsibility:
  • Recipients receive a temporary key (7-day default)
  • You certify the right to share

[Share]   [Cancel]
```

---

## 5. Bannière signalement reçu / Content-reported banner

**Trigger :** un tiers a notifié un contenu via la procédure DSA.

**FR.**
```
📩 SIGNALEMENT REÇU

Un tiers a signalé qu'un de vos contenus pourrait porter atteinte à ses droits.
Notification reçue le [date]. Référence : NAV-RPT-2026-001234.

Vous disposez de 48h pour répondre :
  [Voir le contenu signalé]   [Contester]   [Retirer volontairement]

Sans réponse, NAVLYS examinera la notification et pourra retirer le contenu
conformément à l'article 16 du DSA.
```

**EN.**
```
📩 NOTICE RECEIVED

A third party reported one of your contents.
Received on [date]. Ref: NAV-RPT-2026-001234.

You have 48h to respond:
  [View reported content]   [Contest]   [Voluntarily remove]

Without response, NAVLYS will review per DSA art. 16 and may remove.
```

---

## 6. Modal suppression compte / Account deletion modal

**Trigger :** clic sur « Supprimer mon compte ».

**FR.**
```
🗑️ SUPPRIMER MON COMPTE NAVBIO

Cette action est IRRÉVERSIBLE.
Vos données chiffrées seront effacées sous 30 jours maximum.
Vos factures (obligation légale) sont conservées 10 ans.

📦 Avant de supprimer, voulez-vous exporter vos données ?
[Exporter mon dossier biographique]

Tapez "SUPPRIMER" pour confirmer : [___________]

[Confirmer la suppression]   [Annuler]
```

**EN.**
```
🗑️ DELETE MY NAVBIO ACCOUNT

This is IRREVERSIBLE.
Encrypted data wiped within 30 days max.
Invoices kept 10 years (legal duty).

📦 Export your biographical archive first?
[Export my dossier]

Type "DELETE" to confirm: [___________]

[Confirm deletion]   [Cancel]
```

---

## 7. Modal transmission successorale / Estate transmission modal

**Trigger :** configuration de la fonction « Légataire ».

**FR.**
```
⚱️ TRANSMISSION SUCCESSORALE NAVBIO

Vous pouvez désigner jusqu'à 3 légataires qui recevront l'accès à votre dossier en cas de décès.

⚖️ Cadre légal :
  • France : directives post-mortem (art. 85 Loi Informatique et Libertés)
  • UE : article 17 RGPD (limitation aux personnes physiques)
  • US : Revised Uniform Fiduciary Access to Digital Assets Act (état par état)

Les légataires devront fournir :
  • Acte de décès original
  • Justificatif d'identité
  • Clé partielle (Shamir Secret Sharing 2/3) — à remettre vous-même au légataire

[Configurer]   [Plus tard]
```

**EN.**
```
⚱️ ESTATE TRANSMISSION

Designate up to 3 legatees for posthumous access.

⚖️ Legal framework: FR LIL art. 85 · GDPR art. 17 · US RUFADAA.

Legatees must provide: death certificate + ID + partial key (Shamir 2/3, you give yourself).

[Configure]   [Later]
```

---

## 8. Avertissement uploads de masse / Bulk upload warning

**Trigger :** upload de plus de 50 photos en une fois.

**FR.**
```
📚 UPLOAD MASSIF — 247 photos détectées

L'analyse automatique va prendre environ 4 minutes.
Pendant ce temps, restez sur la page (ne fermez pas l'onglet).

Si vous uploadez un fonds photographique ancien :
  ✓ Vérifiez que vous détenez les droits familiaux
  ✓ Pour les personnes décédées : accord des ayants droit recommandé
  ✓ Le floutage automatique sera appliqué par défaut

[Lancer l'analyse]   [Annuler]
```

**EN.**
```
📚 BULK UPLOAD — 247 photos detected

Auto-analysis takes ~4 minutes. Stay on page.

For old photo archive:
  ✓ Confirm family rights
  ✓ Heirs' consent recommended for deceased
  ✓ Auto-blur applied by default

[Start analysis]   [Cancel]
```

---

## 9. Toast « rappel doux » / Soft reminder toasts

À afficher 1 fois par session (rotation) :

**FR.**
- 🛟 *« Vos contenus sont chiffrés. Même nous, on ne peut pas les lire. »*
- 📜 *« Rappel : vous restez responsable de la légalité de ce que vous déposez. »*
- 🔑 *« Notez bien votre phrase de récupération — on ne peut pas la régénérer. »*
- 🤖 *« Le floutage automatique vous protège — vous pouvez le désactiver si vous avez le consentement. »*

**EN.**
- 🛟 *"Your content is encrypted. Even we can't read it."*
- 📜 *"Reminder: you remain responsible for content legality."*
- 🔑 *"Save your recovery phrase — we cannot regenerate it."*
- 🤖 *"Auto-blur protects you — you can disable with consent."*

---

## 10. Composant `<RuleReminder />` réutilisable

```tsx
// _APP_NAVBIO_v1/components/legal/RuleReminder.tsx
type Variant = "upload" | "share" | "delete" | "legacy" | "bulk";

export function RuleReminder({ variant, locale = "fr" }: { variant: Variant; locale: "fr" | "en" }) {
  const content = REMINDERS[variant][locale];
  return (
    <Alert className="ruleReminder" data-variant={variant}>
      <AlertIcon />
      <AlertTitle>{content.title}</AlertTitle>
      <AlertDescription>{content.body}</AlertDescription>
      {content.checklist && <Checklist items={content.checklist} />}
      <Footer>
        <a href={`/${locale}/legal/cgu`}>{content.linkLabel}</a>
      </Footer>
    </Alert>
  );
}
```

---

*Document interne — bibliothèque UX juridique — intégration dans `_APP_NAVBIO_v1/components/legal/`. — Le Notaire de Bord NAVLYS.*
