import { FeatureFlagDashboard } from "~/features/feature-flags/screens";
import { LoaderData, loader } from "./feature-flags-loader.server";

export { loader };

export default function FeatureFlagsIndexRoute() {
  return <FeatureFlagDashboard />;
}
