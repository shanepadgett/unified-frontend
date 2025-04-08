import { useState, useEffect } from "react";
import { Button, Input, TextArea, Toggle } from "~/core/ui";
import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from "../../types";
import { getEnvironments } from "~/features/environments/services/environments";

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
  
  // Track form changes
  const [hasFormChanges, setHasFormChanges] = useState(mode === 'create');
  
  // Environment options
  const [environments, setEnvironments] = useState<{ id: string; name: string }[]>([
    { id: 'development', name: 'Development' },
    { id: 'staging', name: 'Staging' },
    { id: 'production', name: 'Production' }
  ]);
  
  // Load environments
  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const envData = await getEnvironments();
        if (envData && envData.length > 0) {
          const mappedEnvs = envData.map(env => ({
            id: env.name.toLowerCase(),
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
  
  // Store initial values for comparison
  const initialValues = {
    name: flag?.name || '',
    description: flag?.description || '',
    enabled: flag?.enabled || false,
    environment: flag?.environment || 'development',
    owner: flag?.owner || 'System',
    rolloutPercentage: flag?.rolloutPercentage,
    dependencies: flag?.dependencies || [],
    expiresAt: flag?.expiresAt ? new Date(flag.expiresAt).toISOString().split('T')[0] : undefined
  };
  
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
    const formData: CreateFeatureFlag | UpdateFeatureFlag = mode === 'create'
      ? {
          name: name.trim(),
          description: description.trim(),
          enabled: enabled,
          environment: environment,
          owner: owner.trim() || 'System', // Ensure owner is never empty
          ...(rolloutPercentage !== undefined && { rolloutPercentage }),
          ...(dependencies.length > 0 && { dependencies }),
          ...(expiresAt && { expiresAt })
        }
      : {
          name: name.trim(),
          description: description.trim(),
          enabled: enabled,
          environment: environment,
          owner: owner.trim() || 'System',
          ...(rolloutPercentage !== undefined && { rolloutPercentage }),
          ...(dependencies.length > 0 && { dependencies }),
          ...(expiresAt && { expiresAt })
        };
    
    await onSubmit(formData);
  };
  
  // Handle dependencies input
  const handleDependenciesChange = (value: string) => {
    const deps = value.split(',').map(dep => dep.trim()).filter(Boolean);
    setDependencies(deps);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Feature name"
          required
        />
        
        <div className="sm:col-span-2">
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Feature description"
            rows={3}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Environment
          </label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 dark:border-dark-600 dark:bg-dark-800 dark:text-white"
          >
            {environments.map((env) => (
              <option key={env.id} value={env.id}>
                {env.name}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Team or person responsible"
        />
        
        <Input
          label="Rollout Percentage"
          type="number"
          min="0"
          max="100"
          value={rolloutPercentage !== undefined ? rolloutPercentage.toString() : ''}
          onChange={(e) => setRolloutPercentage(e.target.value ? parseInt(e.target.value, 10) : undefined)}
          placeholder="Percentage of users (0-100)"
        />
        
        <Input
          label="Dependencies"
          value={dependencies.join(', ')}
          onChange={(e) => handleDependenciesChange(e.target.value)}
          placeholder="Comma-separated list of dependencies"
          helperText="Separate multiple dependencies with commas"
        />
        
        <Input
          label="Expires At"
          type="date"
          value={expiresAt || ''}
          onChange={(e) => setExpiresAt(e.target.value || undefined)}
          helperText="Optional expiration date"
        />
        
        <div className="flex items-center">
          <Toggle
            label="Enabled"
            checked={enabled}
            onChange={setEnabled}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-dark-600">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || (mode === 'edit' && !hasFormChanges)}
          isLoading={isSubmitting}
        >
          {mode === 'create' ? 'Create Feature Flag' : 'Update Feature Flag'}
        </Button>
      </div>
    </form>
  );
}
