import React from 'react';
import { Switch } from '@headlessui/react';

interface FeatureFlagCardProps {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: string;
  onToggle: (id: string, enabled: boolean) => void;
  isLoading?: boolean;
}

export function FeatureFlagCard({
  id,
  name,
  description,
  enabled,
  environment,
  onToggle,
  isLoading = false,
}: FeatureFlagCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {environment}
          </span>
        </div>
        <Switch
          checked={enabled}
          onChange={(checked) => onToggle(id, checked)}
          disabled={isLoading}
          className={`${
            enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
}
