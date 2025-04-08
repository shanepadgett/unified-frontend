import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Card, CardBody, Container } from "~/core/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "Unified Frontend" },
    { name: "description", content: "Feature Flag Management Platform" },
  ];
};

export default function Index() {
  return (
    <Container>
      <div className="py-12">
        <Card>
          <CardBody>
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Unified Frontend Platform
            </h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Welcome to the Feature Flag Management Platform. Phase 5 implementation is now complete with the Feature Flags Dashboard.
            </p>
            <div className="rounded-md bg-primary-600 bg-opacity-10 p-4 text-primary-600 dark:bg-opacity-20 mb-6">
              <p className="text-sm font-medium">
                Core UI components are now available in the updated folder structure (~/core/ui).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/feature-flags">
                <Button variant="primary">Feature Flags Dashboard</Button>
              </Link>
              <Link to="/environments">
                <Button variant="secondary">Manage Environments</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
