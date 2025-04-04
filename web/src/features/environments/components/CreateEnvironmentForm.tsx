import React, { useState } from 'react';
import { TextField, TextArea, Button } from '@features/shared/components';
import { createEnvironment } from '../api/environments';

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
        data: {
          name,
          description,
          isDefault
        }
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
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Create New Environment</h2>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Name"
          id="environment-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Production, Staging, Development"
          required
          disabled={isSubmitting}
        />
        
        <TextArea
          label="Description"
          id="environment-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the purpose of this environment"
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
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
            disabled={isSubmitting}
          />
          <label htmlFor="is-default" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Set as default environment
          </label>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Environment
          </Button>
        </div>
      </form>
    </div>
  );
}
