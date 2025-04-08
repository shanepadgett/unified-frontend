import { FeatureFlagDetail } from "~/features/feature-flags/screens";
import { LoaderData, loader } from "./feature-flags-$id-loader.server";
import { action } from "./feature-flags-$id-action.server";

export { loader, action };

export default function FeatureFlagDetailRoute() {
  return <FeatureFlagDetail />;
}
