// =============================================================================
// NAVLYS — Email confirmation envoi pièce bronze
// 2 étapes : scheduled (J+0) puis shipped (J+21 environ).
// =============================================================================
export interface CoinShippedInput {
  email: string;
  orderRef: string;
  serialNumber: string;
  estimatedShipDate: string;
  trackingNumber?: string;
  locale: "fr" | "en";
  stage: "scheduled" | "shipped";
}

export async function sendCoinShippedEmail(input: CoinShippedInput): Promise<void> {
  const isShipped = input.stage === "shipped";
  const subjectFr = isShipped
    ? `[NAVLYS] Ta pièce de bronze ${input.serialNumber} est partie`
    : `[NAVLYS] Ta pièce de bronze ${input.serialNumber} est en préparation`;
  const subjectEn = isShipped
    ? `[NAVLYS] Your bronze coin ${input.serialNumber} has shipped`
    : `[NAVLYS] Your bronze coin ${input.serialNumber} is being prepared`;

  const bodyFr = isShipped
    ? `Salut,

Ta pièce de bronze NAVLYS ${input.serialNumber} vient de partir.
Référence commande : ${input.orderRef}
Suivi UPS : ${input.trackingNumber ?? "à venir d'ici 48 h"}

Quand tu l'ouvres, prends une photo. Si elle te plaît, partage-la dans la communauté.

— L'équipage NAVLYS

« Ta première ancre. »
`
    : `Salut,

Bonne nouvelle : ta pièce de bronze NAVLYS ${input.serialNumber} a été commandée à l'atelier de frappe.
Référence commande : ${input.orderRef}
Date d'envoi estimée : ${input.estimatedShipDate} (environ 3 semaines).

Ce que tu vas recevoir :
 • Une pièce 32 mm, 12 g, bronze CuSn8.
 • Recto : NAVLYS gravé.
 • Verso : étoile polaire, série numérotée.
 • Boîte velours bleu marine + carte signée.

— L'équipage NAVLYS

« Ta première ancre. »
`;

  const bodyEn = isShipped
    ? `Hi,

Your NAVLYS bronze coin ${input.serialNumber} just left.
Order ref: ${input.orderRef}
UPS tracking: ${input.trackingNumber ?? "incoming within 48h"}

When you open it, take a photo. If you like it, share it in the community.

— The NAVLYS crew

"Your first anchor."
`
    : `Hi,

Good news: your NAVLYS bronze coin ${input.serialNumber} has been ordered from the workshop.
Order ref: ${input.orderRef}
Estimated ship date: ${input.estimatedShipDate} (~3 weeks).

What you'll receive:
 • 32 mm coin, 12 g, CuSn8 bronze.
 • Obverse: NAVLYS engraved.
 • Reverse: polar star, numbered series.
 • Navy velvet box + signed card.

— The NAVLYS crew

"Your first anchor."
`;

  // eslint-disable-next-line no-console
  console.log("[NAVLYS coin shipped email]", JSON.stringify({
    to: input.email,
    subject: input.locale === "fr" ? subjectFr : subjectEn,
    body: input.locale === "fr" ? bodyFr : bodyEn,
  }));
}
