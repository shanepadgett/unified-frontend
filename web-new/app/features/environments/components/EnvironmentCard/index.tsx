import { useState } from "react";
import { Card, CardBody, Button, Input } from "~/core/ui";
import { Environment } from "../../types";
import { updateEnvironment, deleteEnvironment } from "../../services/environments";

interface EnvironmentCardProps {
  environment: Environment;
  onUpdate: () => void;
}

export function EnvironmentCard({ environment, onUpdate }: EnvironmentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(environment.name);
  const [description, setDescription] = useState(environment.description);
  const [isDefault, setIsDefault] = useState(environment.isDefault);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    try {
      await updateEnvironment(environment.id, {
        name,
        description,
        isDefault,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update environment:', error);
      alert('Failed to update environment. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (environment.isDefault) {
      alert('Cannot delete the default environment.');
      return;
    }

    try {
      setIsDeleting(true);
      await deleteEnvironment(environment.id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete environment:', error);
      alert('Failed to delete environment. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setName(environment.name);
    setDescription(environment.description);
    setIsDefault(environment.isDefault);
    setIsEditing(false);
  };

  // Format dates
  const formattedCreatedDate = new Date(environment.createdAt).toLocaleDateString() + ' ' +
    new Date(environment.createdAt).toLocaleTimeString();
  const formattedUpdatedDate = new Date(environment.updatedAt).toLocaleDateString() + ' ' +
    new Date(environment.updatedAt).toLocaleTimeString();

  return (
    <Card hoverable className="mb-4 group">
      <CardBody>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Input
                id={`name-${environment.id}`}
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div>
              <Input
                id={`description-${environment.id}`}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                as="textarea"
                rows={3}
              />
            </div>
            <div className="flex items-center">
              <input
                id={`default-${environment.id}`}
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.currentTarget.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 dark:border-gray-600"
              />
              <label htmlFor={`default-${environment.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Set as default environment
              </label>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:justify-end">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="md"
                fullWidth={true}
                className="sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                variant="primary"
                size="md"
                fullWidth={true}
                className="sm:w-auto"
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
                aria-label={`Edit ${environment.name} environment`}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-600 transition-colors">
                  {environment.name}
                </h3>
              </div>
              <div className="sm:flex space-x-2 hidden">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="secondary"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={environment.isDefault || isDeleting}
                  variant="danger"
                  size="sm"
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">{environment.description}</p>

            <div className="flex flex-wrap gap-2">
              {environment.isDefault && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                  Default
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Created: {formattedCreatedDate}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last Updated: {formattedUpdatedDate}
              </p>
            </div>

            {/* Mobile buttons - stacked and full width at the bottom */}
            <div className="sm:hidden flex flex-col space-y-2 mt-4">
              <Button
                onClick={() => setIsEditing(true)}
                variant="secondary"
                fullWidth
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                disabled={environment.isDefault || isDeleting}
                variant="danger"
                fullWidth
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
