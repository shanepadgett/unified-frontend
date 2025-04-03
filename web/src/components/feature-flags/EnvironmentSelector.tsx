import React, { useEffect, useState } from 'react';
import { Select, type SelectOption } from '../../components/ui/Select.tsx';
import { getEnvironments, Environment as EnvironmentType } from '../../api/environments.ts';

export type Environment = string;

interface EnvironmentSelectorProps {
  selectedEnvironment: Environment;
  onChange: (environment: Environment) => void;
}

// Fallback environments in case API call fails
const fallbackEnvironments: SelectOption[] = [
  { id: 'development', name: 'Development' },
  { id: 'staging', name: 'Staging' },
  { id: 'production', name: 'Production' },
];

export function EnvironmentSelector({ selectedEnvironment, onChange }: EnvironmentSelectorProps) {
  const [environments, setEnvironments] = useState<SelectOption[]>(fallbackEnvironments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const envData = await getEnvironments();
        if (envData && envData.length > 0) {
          const mappedEnvs = envData.map((env: EnvironmentType) => ({
            id: env.name,
            name: env.name.charAt(0).toUpperCase() + env.name.slice(1)
          }));
          setEnvironments(mappedEnvs);

          // If the currently selected environment is not in the list, select the default one
          if (!mappedEnvs.some((env: SelectOption) => env.id === selectedEnvironment)) {
            const defaultEnv = envData.find((env: EnvironmentType) => env.isDefault);
            if (defaultEnv) {
              onChange(defaultEnv.name);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch environments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnvironments();
  }, [selectedEnvironment, onChange]);

  // Find the selected option
  const selectedOption = environments.find((env) => env.id === selectedEnvironment) || environments[0];

  // Handle change
  const handleChange = (option: SelectOption) => {
    onChange(option.id);
  };

  return (
    <Select
      options={environments}
      value={selectedOption}
      onChange={handleChange}
      isLoading={isLoading}
    />
  );
}
