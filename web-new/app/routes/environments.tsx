import { Outlet } from "@remix-run/react";

export default function EnvironmentsLayout() {
  return (
    <div className="environments-layout">
      <Outlet />
    </div>
  );
}
