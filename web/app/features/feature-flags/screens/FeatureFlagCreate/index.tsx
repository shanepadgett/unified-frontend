import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Button, Container } from "~/core/ui";
import { FeatureFlagForm } from "../../components";
import { createFeatureFlag } from "../../services/feature-flags";
import { CreateFeatureFlag } from "../../types";

export function FeatureFlagCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (data: CreateFeatureFlag) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await createFeatureFlag(data);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create feature flag");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 w-full sm:w-auto"
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
            <span className="sm:inline">Back to Feature Flags</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Create Feature Flag
        </h1>

        <FeatureFlagForm
          mode="create"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </Container>
  );
}
