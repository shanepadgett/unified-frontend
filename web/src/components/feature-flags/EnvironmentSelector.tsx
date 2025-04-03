import React, { useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { getEnvironments, Environment as EnvironmentType } from '../../api/environments.ts';

export type Environment = string;

interface EnvironmentSelectorProps {
  selectedEnvironment: Environment;
  onChange: (environment: Environment) => void;
}

// Fallback environments in case API call fails
const fallbackEnvironments: { id: Environment; name: string }[] = [
  { id: 'development', name: 'Development' },
  { id: 'staging', name: 'Staging' },
  { id: 'production', name: 'Production' },
];

export function EnvironmentSelector({ selectedEnvironment, onChange }: EnvironmentSelectorProps) {
  const [environments, setEnvironments] = useState<{ id: Environment; name: string }[]>(fallbackEnvironments);
  const [_isLoading, setIsLoading] = useState(true);

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
          if (!mappedEnvs.some((env: { id: string; name: string }) => env.id === selectedEnvironment)) {
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

  const selected = environments.find((env) => env.id === selectedEnvironment) || environments[0];

  return (
    <Listbox value={selected} onChange={(env) => onChange(env.id)}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {environments.map((environment) => (
              <Listbox.Option
                key={environment.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
                value={environment}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {environment.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
