// =============================================================================
// NAVLYS — Badge Vibez (escalier promo S1/S2/S3)
// =============================================================================
interface VibezBadgeProps {
  locale: "fr" | "en";
  code: string;
  percentOff: number;
  endsAt: string;
}

export function VibezBadge({ locale, code, percentOff, endsAt }: VibezBadgeProps): JSX.Element {
  const fr = locale === "fr";
  return (
    <div className="navlys-vibez-badge" role="status">
      <span className="navlys-vibez-badge__pulse" aria-hidden="true" />
      <span className="navlys-vibez-badge__label">
        {fr ? "VIBEZ" : "VIBEZ"} —{" "}
        <strong>-{percentOff}%</strong>{" "}
        {fr ? "avec le code" : "with code"} <code>{code}</code>{" "}
        ·{" "}
        {fr ? `jusqu'au ${endsAt}` : `until ${endsAt}`}
      </span>
    </div>
  );
}
