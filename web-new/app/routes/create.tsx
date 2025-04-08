import { FeatureFlagCreate } from "~/features/feature-flags/screens";
import { action } from "./feature-flags-create-action.server";

export { action };

export default function FeatureFlagCreateRoute() {
  return <FeatureFlagCreate />;
}
