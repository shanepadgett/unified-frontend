import { json, redirect } from "@remix-run/node";
import { updateFeatureFlag, deleteFeatureFlag } from "~/features/feature-flags/services/feature-flags.server";
import { UpdateFeatureFlag } from "~/features/feature-flags";

export async function action({ request, params }: { request: Request; params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return json({ error: "Feature flag ID is required" }, { status: 400 });
  }

  const formData = await request.formData();
  const method = formData.get("_method")?.toString() || request.method;

  try {
    // Handle DELETE
    if (method === "DELETE") {
      await deleteFeatureFlag(id);
      return redirect("/feature-flags");
    }

    // Handle UPDATE
    if (method === "PATCH" || method === "PUT") {
      const data = Object.fromEntries(formData) as unknown as UpdateFeatureFlag;

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

      await updateFeatureFlag(id, data);
      return redirect("/feature-flags");
    }

    return json({ error: "Invalid method" }, { status: 400 });
  } catch (error) {
    console.error("Error processing feature flag action:", error);
    return json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}
