import React, { useState, useEffect } from 'react';
import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from '../../api/featureFlags';
import { getEnvironments } from '../../api/environments';
import { TextField, TextArea } from '../../components/ui/TextField';

interface FeatureFlagFormProps {
  flag?: FeatureFlag;
  onSubmit: (data: CreateFeatureFlag | UpdateFeatureFlag) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  mode: 'create' | 'edit';
  onFormChange?: (hasChanges: boolean) => void;
}

export function FeatureFlagForm({
  flag,
  onSubmit,
  isSubmitting,
  error,
  mode,
  onFormChange
}: FeatureFlagFormProps) {
  const [name, setName] = useState(flag?.name || '');
  const [description, setDescription] = useState(flag?.description || '');
  const [enabled, setEnabled] = useState(flag?.enabled || false);
  const [environment, setEnvironment] = useState(flag?.environment || 'development');
  const [owner, setOwner] = useState(flag?.owner || '');
  const [rolloutPercentage, setRolloutPercentage] = useState<number | undefined>(flag?.rolloutPercentage);
  const [dependencies, setDependencies] = useState<string[]>(flag?.dependencies || []);
  const [expiresAt, setExpiresAt] = useState<string | undefined>(
    flag?.expiresAt ? new Date(flag.expiresAt).toISOString().split('T')[0] : undefined
  );
  const [environments, setEnvironments] = useState<{ id: string; name: string }[]>([]);
  const [newDependency, setNewDependency] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch environments
  // Effect to check for form changes when in edit mode
  useEffect(() => {
    if (mode === 'edit' && flag) {
      const isNameChanged = name !== flag.name;
      const isDescriptionChanged = description !== flag.description;
      const isEnabledChanged = enabled !== flag.enabled;
      const isEnvironmentChanged = environment !== flag.environment;
      const isOwnerChanged = owner !== flag.owner;
      const isRolloutChanged = rolloutPercentage !== flag.rolloutPercentage;

      // Check dependencies
      const isDependenciesChanged =
        (dependencies.length !== (flag.dependencies?.length || 0)) ||
        dependencies.some((dep, i) => flag.dependencies?.[i] !== dep);

      // Check expiration date
      const currentExpiresAt = flag.expiresAt ? new Date(flag.expiresAt).toISOString().split('T')[0] : undefined;
      const isExpiresAtChanged = expiresAt !== currentExpiresAt;

      const formHasChanges = isNameChanged || isDescriptionChanged || isEnabledChanged ||
                            isEnvironmentChanged || isOwnerChanged || isRolloutChanged ||
                            isDependenciesChanged || isExpiresAtChanged;

      setHasChanges(formHasChanges);

      // Notify parent component if callback is provided
      if (onFormChange) {
        onFormChange(formHasChanges);
      }
    }
  }, [mode, flag, name, description, enabled, environment, owner, rolloutPercentage, dependencies, expiresAt, onFormChange]);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const envs = await getEnvironments();
        setEnvironments(envs);

        // Set default environment if creating a new flag and environments are available
        if (mode === 'create' && envs.length > 0 && !flag) {
          const defaultEnv = envs.find(env => env.isDefault);
          if (defaultEnv) {
            setEnvironment(defaultEnv.name);
          }
        }
      } catch (error) {
        console.error('Failed to fetch environments:', error);
      }
    };

    fetchEnvironments();
  }, [mode, flag]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Name is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!environment) errors.environment = 'Environment is required';
    if (!owner.trim()) errors.owner = 'Owner is required';

    if (rolloutPercentage !== undefined) {
      if (rolloutPercentage < 0 || rolloutPercentage > 100) {
        errors.rolloutPercentage = 'Rollout percentage must be between 0 and 100';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData: CreateFeatureFlag | UpdateFeatureFlag = {
      name: name.trim(),
      description: description.trim(),
      enabled,
      environment,
      owner: owner.trim(),
    };

    if (rolloutPercentage !== undefined) {
      formData.rolloutPercentage = rolloutPercentage;
    }

    if (dependencies.length > 0) {
      formData.dependencies = dependencies;
    }

    if (expiresAt) {
      formData.expiresAt = expiresAt;
    }

    await onSubmit(formData);
  };

  const addDependency = () => {
    if (newDependency.trim() && !dependencies.includes(newDependency.trim())) {
      setDependencies([...dependencies, newDependency.trim()]);
      setNewDependency('');
    }
  };

  const removeDependency = (index: number) => {
    setDependencies(dependencies.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {mode === 'create' ? 'Create New Feature Flag' : 'Edit Feature Flag'}
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextField
            id="name"
            type="text"
            label="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant={formErrors.name ? 'error' : 'default'}
            errorText={formErrors.name}
            placeholder="e.g., new-feature, dark-mode"
          />
        </div>

        <div>
          <TextArea
            id="description"
            label="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            variant={formErrors.description ? 'error' : 'default'}
            errorText={formErrors.description}
            placeholder="Describe the purpose of this feature flag"
          />
        </div>

        <div className="flex items-center">
          <input
            id="enabled"
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
          />
          <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Enabled
          </label>
        </div>

        <div>
          <label htmlFor="environment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Environment *
          </label>
          <select
            id="environment"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className={`mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 dark:text-white sm:text-sm h-10 px-3 py-2 ${
              formErrors.environment ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            {environments.length > 0 ? (
              environments.map((env) => (
                <option key={env.id} value={env.name}>
                  {env.name}
                </option>
              ))
            ) : (
              <>
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </>
            )}
          </select>
          {formErrors.environment && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.environment}</p>
          )}
        </div>

        <div>
          <TextField
            id="owner"
            type="text"
            label="Owner *"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            variant={formErrors.owner ? 'error' : 'default'}
            errorText={formErrors.owner}
            placeholder="e.g., Team Name or Person"
          />
        </div>

        <div>
          <TextField
            id="rolloutPercentage"
            type="number"
            label="Rollout Percentage (0-100)"
            min="0"
            max="100"
            value={rolloutPercentage === undefined ? '' : rolloutPercentage}
            onChange={(e) => setRolloutPercentage(e.target.value === '' ? undefined : Number(e.target.value))}
            variant={formErrors.rolloutPercentage ? 'error' : 'default'}
            errorText={formErrors.rolloutPercentage}
            placeholder="e.g., 50"
          />
        </div>

        <div>
          <label htmlFor="dependencies" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Dependencies
          </label>
          <div className="mt-1 flex">
            <input
              id="dependencies"
              type="text"
              value={newDependency}
              onChange={(e) => setNewDependency(e.target.value)}
              className="block w-full rounded-l-md border border-gray-300 dark:border-gray-700 h-10 px-3 py-2 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Add dependency"
            />
            <button
              type="button"
              onClick={addDependency}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
          {dependencies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {dependencies.map((dep, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {dep}
                  <button
                    type="button"
                    onClick={() => removeDependency(index)}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-100"
                  >
                    <span className="sr-only">Remove</span>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <TextField
            id="expiresAt"
            type="date"
            label="Expires At"
            value={expiresAt || ''}
            onChange={(e) => setExpiresAt(e.target.value || undefined)}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || (mode === 'edit' && !hasChanges)}
            className={`w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${mode === 'edit' && !hasChanges ? 'border-gray-300 text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 cursor-not-allowed' : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'} disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isSubmitting
              ? mode === 'create'
                ? 'Creating...'
                : 'Updating...'
              : mode === 'create'
                ? 'Create Feature Flag'
                : hasChanges
                  ? 'Update Feature Flag'
                  : 'No Changes to Save'
            }
          </button>
        </div>
      </form>
    </div>
  );
}
