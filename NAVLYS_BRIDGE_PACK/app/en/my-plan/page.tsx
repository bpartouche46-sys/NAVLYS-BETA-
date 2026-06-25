/**
 * NAVLYS — /en/my-plan (EN)
 *
 * Hosts the full 7-port journey in English locale.
 */

import { NavlysParcours } from "../../../components/NavlysParcours";

export const metadata = {
  title: "NAVLYS — Your 7-port plan",
  description:
    "Unified NAVLYS journey: set your heading, reveal your fees, apply the 90/10 method, receive your plan.",
};

export default function MyPlanPage(): JSX.Element {
  return <NavlysParcours locale="en" />;
}
