// =============================================================================
// NAVLYS — Email paiement échoué
// =============================================================================
export interface PaymentFailedInput {
  email: string;
  amountDue: number; // en cents
  locale: "fr" | "en";
}

export async function sendPaymentFailedEmail(input: PaymentFailedInput): Promise<void> {
  const amount = (input.amountDue / 100).toLocaleString(
    input.locale === "fr" ? "fr-FR" : "en-GB",
    { style: "currency", currency: "EUR" },
  );

  const subjectFr = "[NAVLYS] Ton paiement n'est pas passé — on attend ton signal";
  const subjectEn = "[NAVLYS] Your payment didn't go through — waiting for your signal";

  const bodyFr = `Salut,

Ton paiement de ${amount} n'a pas pu être prélevé.
Pas de panique : ton accès reste actif quelques jours.

Pour régler ça en 2 minutes :
 → Connecte-toi à ton espace NAVLYS
 → Ouvre "Facturation"
 → Mets à jour le moyen de paiement

Si tu as un doute, réponds à ce mail, on ajuste les voiles avec toi.

— L'équipage NAVLYS
`;

  const bodyEn = `Hi,

Your payment of ${amount} couldn't be processed.
No worries: your access stays active for a few days.

To fix it in 2 minutes:
 → Sign in to your NAVLYS account
 → Open "Billing"
 → Update the payment method

If you have any doubt, reply to this email and we'll trim the sails together.

— The NAVLYS crew
`;

  // eslint-disable-next-line no-console
  console.log("[NAVLYS payment failed email]", JSON.stringify({
    to: input.email,
    subject: input.locale === "fr" ? subjectFr : subjectEn,
    body: input.locale === "fr" ? bodyFr : bodyEn,
  }));
}
