import { useState } from "react";
import { useNavigate, useLoaderData } from "@remix-run/react";
import { Button, Container } from "~/core/ui";
import { FeatureFlagForm } from "../../components";
import { getFeatureFlag, updateFeatureFlag, deleteFeatureFlag } from "../../services/feature-flags";
import { FeatureFlag, UpdateFeatureFlag } from "../../types";

// Define the loader data type for type safety
export interface FeatureFlagDetailLoaderData {
  featureFlag: FeatureFlag;
}

export function FeatureFlagDetail() {
  const { featureFlag } = useLoaderData<FeatureFlagDetailLoaderData>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasFormChanges, setHasFormChanges] = useState(false);

  // Handle form submission
  const handleSubmit = async (data: UpdateFeatureFlag) => {
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Updating feature flag with ID:', featureFlag.id, 'and data:', data);
      const updatedFlag = await updateFeatureFlag(featureFlag.id, data);
      console.log('Server response for update:', updatedFlag);
      navigate("/feature-flags");
    } catch (err) {
      console.error('Error updating feature flag:', err);
      setError(err instanceof Error ? err.message : "Failed to update feature flag");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await deleteFeatureFlag(featureFlag.id);
      navigate("/feature-flags");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete feature flag");
      setShowDeleteConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <Container>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => navigate("/feature-flags")}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
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
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            Delete Flag
          </Button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Feature Flag
        </h1>

        {showDeleteConfirm ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-6 mb-6">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-red-700 dark:text-red-400 mb-4">
              Are you sure you want to delete the feature flag "{featureFlag.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="danger"
                onClick={confirmDelete}
                isLoading={isSubmitting}
              >
                Yes, Delete
              </Button>
              <Button
                variant="secondary"
                onClick={cancelDelete}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <FeatureFlagForm
            flag={featureFlag}
            mode="edit"
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
            onFormChange={setHasFormChanges}
          />
        )}
      </div>
    </Container>
  );
}
