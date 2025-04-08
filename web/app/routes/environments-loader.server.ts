import { json } from "@remix-run/node";
import { getEnvironments } from "~/features/environments/services/environments.server";
import { Environment } from "~/features/environments/types";

export interface LoaderData {
  environments: Environment[];
}

export async function loader() {
  try {
    const environments = await getEnvironments();
    return json<LoaderData>({ environments });
  } catch (error) {
    console.error("Error loading environments:", error);
    return json<LoaderData>({ environments: [] });
  }
}
