// components/legal/G1Footer.tsx
// Disclaimer G1 réutilisable en pied de chaque page légale (règle gravée n°6 + Bible juridique §Bloc 2).
// Marque dépersonnalisée : NAVLYS = éditeur pédagogique, PAS CIF / PAS ORIAS / PAS IOBSP.
export function G1Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Disclaimer G1 NAVLYS"
      className="mt-4 border-t border-[var(--color-bronze)]/25 pt-6 text-xs
                 font-[var(--font-ui)] text-[var(--color-ice)]/80 leading-relaxed"
    >
      ⚖️ <strong>NAVLYS = éducation, pas conseil.</strong> NAVLYS est un éditeur de contenu
      pédagogique financier (média). NAVLYS n&apos;est pas Conseiller en Investissements
      Financiers (CIF), n&apos;est pas enregistré ORIAS, n&apos;est pas IOBSP. Les contenus ont
      une vocation purement pédagogique : ni conseil personnalisé, ni recommandation d&apos;achat
      ou de vente, ni garantie de rendement. Les performances passées ne préjugent pas des
      performances futures. Tout investissement comporte un risque, y compris de perte en capital.
      Avant toute décision, consulte un professionnel agréé. Tu restes seul décisionnaire.
    </footer>
  );
}
