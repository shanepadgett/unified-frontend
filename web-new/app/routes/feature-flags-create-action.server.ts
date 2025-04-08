import { json, redirect } from "@remix-run/node";
import { createFeatureFlag } from "~/features/feature-flags/services/feature-flags.server";
import { CreateFeatureFlag } from "~/features/feature-flags/types";

export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as unknown as CreateFeatureFlag;
    
    // Convert enabled to boolean
    if (data.enabled !== undefined) {
      data.enabled = data.enabled === "true";
    }
    
    // Convert rolloutPercentage to number if present
    if (data.rolloutPercentage !== undefined && data.rolloutPercentage !== "") {
      data.rolloutPercentage = Number(data.rolloutPercentage);
    }
    
    // Convert dependencies to array if present
    if (data.dependencies !== undefined && typeof data.dependencies === "string") {
      data.dependencies = data.dependencies.split(",").map(dep => dep.trim()).filter(Boolean);
    }
    
    await createFeatureFlag(data);
    return redirect("/feature-flags");
  } catch (error) {
    console.error("Error creating feature flag:", error);
    return json(
      { error: error instanceof Error ? error.message : "Failed to create feature flag" },
      { status: 500 }
    );
  }
}
