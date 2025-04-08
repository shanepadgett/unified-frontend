import type { MetaFunction } from "@remix-run/node";
import { FeatureFlagDashboard } from "~/features/feature-flags/screens";
import { LoaderData, loader } from "./home-loader.server";

export { loader };

export const meta: MetaFunction = () => {
  return [
    { title: "Unified Frontend - Feature Flags" },
    { name: "description", content: "Feature Flag Management Platform" },
  ];
};

export default function Index() {
  return <FeatureFlagDashboard />;
}
