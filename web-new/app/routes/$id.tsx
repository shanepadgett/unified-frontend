import { FeatureFlagDetail } from "~/features/feature-flags/screens";
import { LoaderData, loader as originalLoader } from "./feature-flags-$id-loader.server";
import { action } from "./feature-flags-$id-action.server";

// Reuse the original loader and action
export { action };

// Export the loader function
export async function loader(args: any) {
  return originalLoader(args);
}

export default function FeatureFlagDetailRoute() {
  return <FeatureFlagDetail />;
}
