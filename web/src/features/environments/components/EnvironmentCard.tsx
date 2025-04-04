import React, { useState } from 'react';
import {
  TextField,
  TextArea,
  Card,
  CardTitle,
  CardDescription,
  Badge,
  Text,
  Button
} from '@features/shared/components';
import { Environment } from '../types/index';
import { updateEnvironment, deleteEnvironment } from '../api/environments';

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
      await updateEnvironment({
        id: environment.id,
        env: {
          name,
          description,
          isDefault,
        },
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
    <Card variant="interactive" className="relative group border border-gray-200 dark:border-dark-600 p-4 mb-4">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <TextField
              id={`name-${environment.id}`}
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div>
            <TextArea
              id={`description-${environment.id}`}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              rows={3}
            />
          </div>
          <div className="flex items-center">
            <input
              id={`default-${environment.id}`}
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.currentTarget.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
            />
            <label htmlFor={`default-${environment.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Set as default environment
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleCancel}
              variant="secondary"
              size="md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="primary"
              size="md"
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
              <CardTitle className="group-hover:text-primary-600 dark:group-hover:text-primary-600 transition-colors text-xl">
                {environment.name}
              </CardTitle>
            </div>
            <div className="flex space-x-2">
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

          <CardDescription className="text-sm">{environment.description}</CardDescription>

          <div className="flex flex-wrap gap-2">
            {environment.isDefault && (
              <Badge variant="success">Default</Badge>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <Text size="xs" variant="muted">
              Created: {formattedCreatedDate}
            </Text>
            <Text size="xs" variant="muted">
              Last Updated: {formattedUpdatedDate}
            </Text>
          </div>
        </div>
      )}
    </Card>
  );
}
