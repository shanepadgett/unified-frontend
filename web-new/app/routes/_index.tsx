import type { MetaFunction } from "@remix-run/node";
import { Card, CardBody, Container } from "~/core/ui";

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
              Welcome to the Feature Flag Management Platform. Phase 3 components have been implemented.
            </p>
            <div className="rounded-md bg-primary-600 bg-opacity-10 p-4 text-primary-600 dark:bg-opacity-20">
              <p className="text-sm font-medium">
                Core UI components are now available in the updated folder structure (~/core/ui).
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
