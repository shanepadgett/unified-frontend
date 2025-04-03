import React, { useState } from 'react';
import { Environment, updateEnvironment, deleteEnvironment } from '../../api/environments';
import { useRouter } from '@tanstack/react-router';

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
  const router = useRouter();

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor={`name-${environment.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id={`name-${environment.id}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor={`description-${environment.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id={`description-${environment.id}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex items-center">
            <input
              id={`default-${environment.id}`}
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
            />
            <label htmlFor={`default-${environment.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Set as default environment
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{environment.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{environment.description}</p>
              {environment.isDefault && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 mt-2">
                  Default
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={environment.isDefault || isDeleting}
                className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  environment.isDefault
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>Created: {new Date(environment.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(environment.updatedAt).toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
}
