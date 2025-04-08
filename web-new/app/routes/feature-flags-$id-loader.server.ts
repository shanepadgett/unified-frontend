import { json, redirect } from "@remix-run/node";
import { getFeatureFlag } from "~/features/feature-flags/services/feature-flags.server";
import { FeatureFlag } from "~/features/feature-flags/types";

export interface LoaderData {
  featureFlag: FeatureFlag;
}

export async function loader({ params }: { params: { id: string } }) {
  const id = params.id;
  
  if (!id) {
    return redirect("/feature-flags");
  }
  
  try {
    const featureFlag = await getFeatureFlag(id);
    return json<LoaderData>({ featureFlag });
  } catch (error) {
    console.error("Error loading feature flag:", error);
    throw new Response("Feature flag not found", { status: 404 });
  }
}
