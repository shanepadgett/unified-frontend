import { useState } from "react";
import { Card, CardBody, Input, Button } from "~/core/ui";
import { createEnvironment } from "../../services/environments";

interface CreateEnvironmentFormProps {
  onSuccess: () => void;
}

export function CreateEnvironmentForm({ onSuccess }: CreateEnvironmentFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createEnvironment({
        name,
        description,
        isDefault
      });

      // Reset form
      setName('');
      setDescription('');
      setIsDefault(false);

      // Notify parent component
      onSuccess();
    } catch (err) {
      console.error('Failed to create environment:', err);
      setError('Failed to create environment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardBody>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Create New Environment
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            id="environment-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Production, Staging, Development"
            required
            disabled={isSubmitting}
          />

          <Input
            label="Description"
            id="environment-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the purpose of this environment"
            as="textarea"
            rows={3}
            required
            disabled={isSubmitting}
          />

          <div className="flex items-center">
            <input
              id="is-default"
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 dark:border-dark-600"
              disabled={isSubmitting}
            />
            <label htmlFor="is-default" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Set as default environment
            </label>
          </div>

          <div className="sm:flex sm:justify-end">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              fullWidth={true}
              className="sm:w-auto"
            >
              Create Environment
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
