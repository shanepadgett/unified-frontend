import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/feature-flags/')({
  component: FeatureFlagsLayout,
});

function FeatureFlagsLayout() {
  return <Outlet />;
}
