import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag,
  type FeatureFlag,
  type UpdateFeatureFlag
} from '../../api/featureFlags.ts';
import { FeatureFlagForm } from '../../components/feature-flags/index.ts';

export const Route = createFileRoute('/feature-flags/$id')({
  component: EditFeatureFlagPage,
});

function EditFeatureFlagPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasFormChanges, setHasFormChanges] = useState(false);

  // Fetch the feature flag
  const { data: flag, isLoading, isError } = useQuery<FeatureFlag>({
    queryKey: ['featureFlag', id],
    queryFn: () => getFeatureFlag({ data: id }),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateFeatureFlag) => {
      return updateFeatureFlag({ data: { id, flag: data } }) as Promise<unknown>;
    },
    onSuccess: () => {
      // Invalidate and refetch feature flags
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      queryClient.invalidateQueries({ queryKey: ['featureFlag', id] });
      // Navigate back to the feature flags list
      navigate({ to: '/' });
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to update feature flag');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteFeatureFlag({ data: id }) as Promise<unknown>;
    },
    onSuccess: () => {
      // Invalidate and refetch feature flags
      queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      // Navigate back to the feature flags list
      navigate({ to: '/' });
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to delete feature flag');
    },
  });

  const handleSubmit = async (data: UpdateFeatureFlag): Promise<void> => {
    setError(null);
    await new Promise<void>((resolve) => {
      updateMutation.mutate(data, {
        onSettled: () => resolve()
      });
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading feature flag...</p>
        </div>
      </div>
    );
  }

  if (isError || !flag) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 my-4">
          <p className="text-red-700 dark:text-red-400">Error loading feature flag</p>
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: '/' })}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Feature Flags
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
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
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Flag
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete the feature flag "{flag.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <FeatureFlagForm
        flag={flag}
        mode="edit"
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        error={error}
        onFormChange={setHasFormChanges}
      />
    </div>
  );
}
