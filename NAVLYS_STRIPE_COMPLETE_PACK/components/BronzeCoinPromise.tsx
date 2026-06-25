// =============================================================================
// NAVLYS — Bandeau "pièce de bronze incluse" pour abonnés annuels
// =============================================================================
interface BronzeCoinPromiseProps {
  locale: "fr" | "en";
}

export function BronzeCoinPromise({ locale }: BronzeCoinPromiseProps): JSX.Element {
  if (locale === "fr") {
    return (
      <section className="navlys-coin-promise" aria-label="Pièce de bronze NAVLYS">
        <div className="navlys-coin-promise__icon" aria-hidden="true">🟫</div>
        <div className="navlys-coin-promise__text">
          <h3>Ta première ancre — la pièce de bronze NAVLYS</h3>
          <p>
            Abonne-toi à l'année et reçois <strong>par voie postale</strong> une
            vraie pièce de bronze NAVLYS, frappée à la main, série numérotée.
          </p>
          <ul>
            <li>32 mm, 12 g, bronze CuSn8.</li>
            <li>Recto NAVLYS gravé, verso étoile polaire.</li>
            <li>Boîte velours bleu marine, carte signée.</li>
            <li>Livraison ~3 semaines, suivi UPS.</li>
          </ul>
        </div>
      </section>
    );
  }
  return (
    <section className="navlys-coin-promise" aria-label="NAVLYS bronze coin">
      <div className="navlys-coin-promise__icon" aria-hidden="true">🟫</div>
      <div className="navlys-coin-promise__text">
        <h3>Your first anchor — the NAVLYS bronze coin</h3>
        <p>
          Subscribe yearly and receive a <strong>real bronze NAVLYS coin</strong>{" "}
          shipped to your door, hand-struck, numbered series.
        </p>
        <ul>
          <li>32 mm, 12 g, CuSn8 bronze.</li>
          <li>NAVLYS engraved obverse, polar star reverse.</li>
          <li>Navy velvet box, signed card.</li>
          <li>~3 weeks delivery, UPS tracking.</li>
        </ul>
      </div>
    </section>
  );
}
