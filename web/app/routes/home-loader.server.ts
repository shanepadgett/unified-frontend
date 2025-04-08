import { json } from "@remix-run/node";
import { getFeatureFlagsByEnvironment } from "~/features/feature-flags/services/feature-flags.server";
import { FeatureFlag } from "~/features/feature-flags/types";

export interface LoaderData {
  featureFlags: FeatureFlag[];
  selectedEnvironment: string;
}

export async function loader({ request }: { request: Request }) {
  // Get the selected environment from the URL search params or use default
  const url = new URL(request.url);
  const selectedEnvironment = url.searchParams.get("environment") || "development";

  try {
    const featureFlags = await getFeatureFlagsByEnvironment(selectedEnvironment);
    return json<LoaderData>({ featureFlags, selectedEnvironment });
  } catch (error) {
    console.error("Error loading feature flags:", error);
    return json<LoaderData>({ featureFlags: [], selectedEnvironment });
  }
}
