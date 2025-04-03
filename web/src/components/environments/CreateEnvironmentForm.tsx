import React, { useState } from 'react';
import { createEnvironment } from '../../api/environments';

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
        name: name.trim(),
        description: description.trim(),
        isDefault,
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Environment</h2>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g., development, staging, production"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Describe the purpose of this environment"
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="isDefault"
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Set as default environment
          </label>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Environment'}
          </button>
        </div>
      </form>
    </div>
  );
}
