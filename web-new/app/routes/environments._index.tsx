import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Card, CardBody, Button, Container } from "~/core/ui";
import {
  EnvironmentCard,
  CreateEnvironmentForm,
  SearchInput
} from "~/features/environments/components";
import { getEnvironments as getEnvironmentsClient } from "~/features/environments/services/environments";
import { Environment } from "~/features/environments/types";
import { LoaderData, loader } from "../routes/environments-loader.server";

export { loader };

export default function EnvironmentsIndexRoute() {
  const { environments: initialEnvironments } = useLoaderData<LoaderData>();
  const [environments, setEnvironments] = useState<Environment[]>(initialEnvironments);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const refreshEnvironments = async () => {
    try {
      const updatedEnvironments = await getEnvironmentsClient();
      setEnvironments(updatedEnvironments);
    } catch (error) {
      console.error("Error refreshing environments:", error);
    }
  };

  const handleCreateSuccess = async () => {
    await refreshEnvironments();
    setShowCreateForm(false);
  };

  // Filter environments by search term
  const filteredEnvironments = environments
    .filter((env: Environment) =>
      env.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      env.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Container>
      <div className="py-8">
        {/* Mobile Layout */}
        <div className="sm:hidden flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Environments</h1>

          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search environments..." />

          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant="primary"
            fullWidth
          >
            {showCreateForm ? 'Cancel' : 'Create Environment'}
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Environments</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage environments for your feature flags
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                variant="primary"
              >
                {showCreateForm ? 'Cancel' : 'Create Environment'}
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search environments..." />
          </div>
        </div>

        {/* Create Form - shown for both mobile and desktop */}
        {showCreateForm && <CreateEnvironmentForm onSuccess={handleCreateSuccess} />}

        {/* Content area - same for both mobile and desktop */}
        <div className="mt-4 sm:mt-0">
          {environments.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No environments found. Create one to get started.</p>
              </CardBody>
            </Card>
          ) : filteredEnvironments.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No environments found matching "{searchTerm}"
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEnvironments.map((environment: Environment) => (
                <EnvironmentCard
                  key={environment.id}
                  environment={environment}
                  onUpdate={refreshEnvironments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}