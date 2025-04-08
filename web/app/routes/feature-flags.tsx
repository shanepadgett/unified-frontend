import { Outlet } from "@remix-run/react";

export default function FeatureFlagsLayout() {
  return (
    <div className="feature-flags-layout">
      <Outlet />
    </div>
  );
}
