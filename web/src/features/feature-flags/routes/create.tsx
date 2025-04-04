import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type CreateFeatureFlag } from '@features/feature-flags/api/featureFlags';
import { createFeatureFlagDirect } from '@features/feature-flags/api/directApi';
import { FeatureFlagForm } from '@features/feature-flags/components';

export const Route = createFileRoute('/feature-flags/create')({
  component: CreateFeatureFlagPage,
});

function CreateFeatureFlagPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: async (data: CreateFeatureFlag) => {
      console.log('Mutation function called with data:', data);
      try {
        const result = await createFeatureFlagDirect(data);
        console.log('Create feature flag result:', result);
        return result;
      } catch (error) {
        console.error('Error in createFeatureFlag:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Mutation succeeded');
      // Invalidate and refetch feature flags
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      // Navigate back to the feature flags list
      navigate({ to: '/' });
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      setError(error.message || 'Failed to create feature flag');
    },
  });

  const handleSubmit = async (data: CreateFeatureFlag) => {
    setError(null);
    console.log('Submitting feature flag data from create route:', data);

    // Ensure all required fields are present
    const flagData: CreateFeatureFlag = {
      name: data.name,
      description: data.description,
      enabled: data.enabled,
      environment: data.environment,
      owner: data.owner || 'System',
      ...(data.rolloutPercentage !== undefined && { rolloutPercentage: data.rolloutPercentage }),
      ...(data.dependencies && data.dependencies.length > 0 && { dependencies: data.dependencies }),
      ...(data.expiresAt && { expiresAt: data.expiresAt })
    };

    console.log('Processed flag data:', flagData);

    try {
      // Call the direct API function with the processed data
      const result = await createFeatureFlagDirect(flagData);
      console.log('Create feature flag result:', result);

      // Invalidate and refetch feature flags
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      // Navigate back to the feature flags list
      navigate({ to: '/' });
    } catch (error) {
      console.error('Error creating feature flag:', error);
      setError(error instanceof Error ? error.message : 'Failed to create feature flag');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          type="button"
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
