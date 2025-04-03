import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFeatureFlag, type CreateFeatureFlag } from '../../api/featureFlags';
import { FeatureFlagForm } from '../../components/feature-flags';

export const Route = createFileRoute('/feature-flags/create')({
  component: CreateFeatureFlagPage,
});

function CreateFeatureFlagPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: (data: CreateFeatureFlag) => {
      return createFeatureFlag({ data }) as Promise<any>;
    },
    onSuccess: () => {
      // Invalidate and refetch feature flags
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      // Navigate back to the feature flags list
      navigate({ to: '/' });
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to create feature flag');
    },
  });

  const handleSubmit = async (data: CreateFeatureFlag) => {
    setError(null);
    createMutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate({ to: '/' })}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <svg
            className="mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          Back to Feature Flags
        </button>
      </div>

      <FeatureFlagForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        error={error}
      />
    </div>
  );
}
