import { useEffect, useState } from "react";
import { getEnvironments } from "~/features/environments/services/environments";
import { Environment } from "~/features/environments/types";

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
    <div className={className}>
      <select
        value={selectedEnvironment}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring-primary-600 dark:border-dark-600 dark:bg-dark-800 dark:text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <option>Loading...</option>
        ) : (
          environments.map((env) => (
            <option key={env.id} value={env.id}>
              {env.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
