import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getEnvironments } from '@features/environments/api/environments';
import { EnvironmentCard, CreateEnvironmentForm } from '@features/environments/components';

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

  const refreshEnvironments = async () => {
    const updatedEnvironments = await getEnvironments();
    setEnvironments(updatedEnvironments);
  };

  const handleCreateSuccess = async () => {
    await refreshEnvironments();
    setShowCreateForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Environments</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showCreateForm ? 'Cancel' : 'Create Environment'}
        </button>
      </div>

      {showCreateForm && <CreateEnvironmentForm onSuccess={handleCreateSuccess} />}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Manage Environments</h2>
          
          {environments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No environments found. Create one to get started.</p>
          ) : (
            <div className="space-y-4">
              {environments.map((environment) => (
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
    </div>
  );
}
