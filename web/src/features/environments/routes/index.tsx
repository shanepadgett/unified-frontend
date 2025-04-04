import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getEnvironments } from '@features/environments/api/environments';
import { Environment } from '@features/environments/types/index';
import { EnvironmentCard, CreateEnvironmentForm, SearchInput } from '@features/environments/components';
import { Button, Heading, Text } from '@features/shared/components';

export const Route = createFileRoute('/environments')({
  component: EnvironmentsPage,
  loader: async () => {
    return {
      environments: await getEnvironments(),
    };
  },
});

function EnvironmentsPage() {
  const { environments: initialEnvironments } = Route.useLoaderData();
  const [environments, setEnvironments] = useState(initialEnvironments);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const refreshEnvironments = async () => {
    const updatedEnvironments = await getEnvironments();
    setEnvironments(updatedEnvironments);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col gap-4">
        <Heading as="h1" className="text-2xl font-bold text-gray-900 dark:text-white">Environments</Heading>

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
            <Heading as="h1" className="text-3xl font-bold text-gray-900 dark:text-white">Environments</Heading>
            <Text variant="muted" size="sm" className="mt-1">
              Manage environments for your feature flags
            </Text>
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
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No environments found. Create one to get started.</p>
          </div>
        ) : filteredEnvironments.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              No environments found matching "{searchTerm}"
            </p>
          </div>
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
  );
}
