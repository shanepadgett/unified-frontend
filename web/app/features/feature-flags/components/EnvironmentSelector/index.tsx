import { useEffect, useState } from "react";
import { getEnvironments, Environment } from "~/features/environments";
import { NativeSelect, SelectOption } from "~/core/ui";

export interface EnvironmentSelectorProps {
  selectedEnvironment: string;
  onChange: (environment: string) => void;
  /**
   * Additional CSS classes to apply to the select
   */
  className?: string;
}

// Fallback environments in case API call fails
const fallbackEnvironments = [
  { id: 'development', name: 'Development' },
  { id: 'staging', name: 'Staging' },
  { id: 'production', name: 'Production' },
];

export function EnvironmentSelector({ selectedEnvironment, onChange, className }: EnvironmentSelectorProps) {
  const [environments, setEnvironments] = useState<{ id: string; name: string }[]>(fallbackEnvironments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const envData = await getEnvironments();
        if (envData && envData.length > 0) {
          const mappedEnvs = envData.map((env: Environment) => ({
            id: env.name.toLowerCase(),
            name: env.name.charAt(0).toUpperCase() + env.name.slice(1)
          }));
          setEnvironments(mappedEnvs);

          // If the currently selected environment is not in the list, select the default one
          if (!mappedEnvs.some((env) => env.id === selectedEnvironment)) {
            const defaultEnv = envData.find((env: Environment) => env.isDefault);
            if (defaultEnv) {
              onChange(defaultEnv.name.toLowerCase());
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

  return (
    <NativeSelect
      options={environments}
      value={selectedEnvironment}
      onChange={onChange}
      isLoading={isLoading}
      className={className}
    />
  );
}
