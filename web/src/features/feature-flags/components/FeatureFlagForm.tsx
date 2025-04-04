import React, { useState, useEffect } from 'react';
import { TextField, TextArea, Button, Select, Checkbox } from '@features/shared/components';
import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from '../types';
import { getEnvironments } from '@features/environments/api/environments';

interface FeatureFlagFormProps {
  flag?: FeatureFlag;
  mode: 'create' | 'edit';
  onSubmit: (data: CreateFeatureFlag | UpdateFeatureFlag) => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
  onFormChange?: (hasChanges: boolean) => void;
}

export function FeatureFlagForm({
  flag,
  mode,
  onSubmit,
  isSubmitting = false,
  error = null,
  onFormChange
}: FeatureFlagFormProps) {
  // Form state
  const [name, setName] = useState(flag?.name || '');
  const [description, setDescription] = useState(flag?.description || '');
  const [enabled, setEnabled] = useState(flag?.enabled || false);
  const [environment, setEnvironment] = useState(flag?.environment || 'development');
  const [owner, setOwner] = useState(flag?.owner || 'System');
  const [rolloutPercentage, setRolloutPercentage] = useState<number | undefined>(flag?.rolloutPercentage);
  const [dependencies, setDependencies] = useState<string[]>(flag?.dependencies || []);
  const [expiresAt, setExpiresAt] = useState<string | undefined>(
    flag?.expiresAt ? new Date(flag.expiresAt).toISOString().split('T')[0] : undefined
  );
  // Track if form has changes
  const [hasFormChanges, setHasFormChanges] = useState(mode === 'create');

  // Environment options
  const [environments, setEnvironments] = useState<{ id: string; name: string }[]>([
    { id: 'development', name: 'Development' },
    { id: 'staging', name: 'Staging' },
    { id: 'production', name: 'Production' }
  ]);

  // Track form changes for edit mode
  const [initialValues, _setInitialValues] = useState({
    name: flag?.name || '',
    description: flag?.description || '',
    enabled: flag?.enabled || false,
    environment: flag?.environment || 'development',
    owner: flag?.owner || '',
    rolloutPercentage: flag?.rolloutPercentage,
    dependencies: flag?.dependencies || [],
    expiresAt: flag?.expiresAt ? new Date(flag.expiresAt).toISOString().split('T')[0] : undefined
  });

  // Fetch environments
  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const envData = await getEnvironments();
        if (envData && envData.length > 0) {
          const mappedEnvs = envData.map(env => ({
            id: env.name,
            name: env.name.charAt(0).toUpperCase() + env.name.slice(1)
          }));
          setEnvironments(mappedEnvs);
        }
      } catch (error) {
        console.error('Failed to fetch environments:', error);
      }
    };

    fetchEnvironments();
  }, []);

  // Check for form changes in edit mode
  useEffect(() => {
    const hasChanges =
      name !== initialValues.name ||
      description !== initialValues.description ||
      enabled !== initialValues.enabled ||
      environment !== initialValues.environment ||
      owner !== initialValues.owner ||
      rolloutPercentage !== initialValues.rolloutPercentage ||
      JSON.stringify(dependencies) !== JSON.stringify(initialValues.dependencies) ||
      expiresAt !== initialValues.expiresAt;

    // Update local state for button disabled prop
    setHasFormChanges(mode === 'create' || hasChanges);

    // Call the callback if provided
    if (onFormChange) {
      onFormChange(hasChanges);
    }
  }, [
    mode, onFormChange, name, description, enabled, environment, owner,
    rolloutPercentage, dependencies, expiresAt, initialValues
  ]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim()) {
      return;
    }

    if (!description.trim()) {
      return;
    }

    // Create a properly structured form data object with all required fields
    const formData: CreateFeatureFlag = {
      name: name.trim(),
      description: description.trim(),
      enabled: enabled,
      environment: environment,
      owner: owner.trim() || 'System', // Ensure owner is never empty
      ...(rolloutPercentage !== undefined && { rolloutPercentage }),
      ...(dependencies.length > 0 && { dependencies }),
      ...(expiresAt && { expiresAt })
    };

    // Log the form data for debugging
    console.log('Form data in FeatureFlagForm:', JSON.stringify(formData));

    console.log('Submitting form data from FeatureFlagForm:', formData);
    try {
      await onSubmit(formData);
      console.log('Form submission successful');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle dependency input
  const [dependencyInput, setDependencyInput] = useState('');

  const addDependency = () => {
    if (dependencyInput.trim() && !dependencies.includes(dependencyInput.trim())) {
      setDependencies([...dependencies, dependencyInput.trim()]);
      setDependencyInput('');
    }
  };

  const removeDependency = (dependency: string) => {
    setDependencies(dependencies.filter(dep => dep !== dependency));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {mode === 'create' ? 'Create Feature Flag' : 'Edit Feature Flag'}
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField
            label="Name"
            id="flag-name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., new-user-onboarding"
            required
            disabled={isSubmitting}
          />

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Environment
            </label>
            <Select
              options={environments}
              value={environments.find(env => env.id === environment) || environments[0]}
              onChange={option => setEnvironment(option.id)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <TextArea
          label="Description"
          id="flag-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe the purpose of this feature flag"
          rows={3}
          required
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField
            label="Owner"
            id="flag-owner"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            placeholder="e.g., Product Team"
            required
            disabled={isSubmitting}
          />

          <TextField
            label="Rollout Percentage (0-100)"
            id="flag-rollout"
            type="number"
            min={0}
            max={100}
            value={rolloutPercentage === undefined ? '' : rolloutPercentage.toString()}
            onChange={e => {
              const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
              setRolloutPercentage(value);
            }}
            placeholder="100"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Dependencies
          </label>
          <div className="flex space-x-2">
            <TextField
              id="flag-dependency"
              value={dependencyInput}
              onChange={e => setDependencyInput(e.target.value)}
              placeholder="Add dependency flag name"
              disabled={isSubmitting}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addDependency}
              disabled={!dependencyInput.trim() || isSubmitting}
              variant="secondary"
            >
              Add
            </Button>
          </div>
          {dependencies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {dependencies.map(dep => (
                <div
                  key={dep}
                  className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm"
                >
                  {dep}
                  <button
                    type="button"
                    onClick={() => removeDependency(dep)}
                    disabled={isSubmitting}
                    className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <TextField
            label="Expiration Date"
            id="flag-expires"
            type="date"
            value={expiresAt || ''}
            onChange={e => setExpiresAt(e.target.value || undefined)}
            disabled={isSubmitting}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Optional: Set a date when this flag should be reviewed or removed
          </p>
        </div>

        <div className="pt-2">
          <Checkbox
            checked={enabled}
            onChange={setEnabled}
            label="Enable this feature flag"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting || !hasFormChanges}
            className="w-full"
          >
            {mode === 'create' ? 'Create Feature Flag' : 'Update Feature Flag'}
          </Button>
        </div>
      </form>
    </div>
  );
}
