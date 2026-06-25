// =============================================================================
// NAVLYS — Email bienvenue
// =============================================================================
export interface WelcomeInput {
  email: string;
  plan: string;
  locale: "fr" | "en";
}

export async function sendWelcomeEmail(input: WelcomeInput): Promise<void> {
  const subject =
    input.locale === "fr"
      ? "Bienvenue à bord de NAVLYS — l'équipage t'attend"
      : "Welcome aboard NAVLYS — the crew is waiting";

  const bodyFr = `Salut,

Tu viens d'embarquer sur NAVLYS NEXT GEN INVEST.
Plan : ${input.plan}.

Ce que tu as à bord dès maintenant :
 • Accès complet à l'algorithme local NAVLYS.
 • Signaux quotidiens, langage simple et imagé.
 • Communauté membre privée.

${input.plan === "annual" ? `Ta pièce de bronze NAVLYS est en route. Tu la recevras dans environ 3 semaines.
C'est ta première ancre. Garde-la précieusement.` : ""}

À très vite sur la passerelle,
— L'équipage NAVLYS

« On ne navigue pas contre le vent, on ajuste les voiles. »
`;

  const bodyEn = `Hi,

You just boarded NAVLYS NEXT GEN INVEST.
Plan: ${input.plan}.

What's on board right now:
 • Full access to the local NAVLYS algorithm.
 • Daily signals in plain, image-rich language.
 • Private members' community.

${input.plan === "annual" ? `Your NAVLYS bronze coin is on its way. ETA around 3 weeks.
It's your first anchor. Keep it close.` : ""}

See you on the bridge,
— The NAVLYS crew

"You don't sail against the wind. You trim the sails."
`;

  // Placeholder : log structuré. Branche Resend/SendGrid en prod.
  // eslint-disable-next-line no-console
  console.log("[NAVLYS welcome email]", JSON.stringify({
    to: input.email,
    subject,
    body: input.locale === "fr" ? bodyFr : bodyEn,
  }));
}
