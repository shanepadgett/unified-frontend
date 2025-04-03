import React from 'react';
import { Switch } from '@headlessui/react';
import { Link } from '@tanstack/react-router';

interface FeatureFlagCardProps {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: string;
  onToggle: (id: string, enabled: boolean) => void;
  isLoading?: boolean;
  owner?: string;
  lastModified?: Date;
  rolloutPercentage?: number;
}

export function FeatureFlagCard({
  id,
  name,
  description,
  enabled,
  environment,
  onToggle,
  isLoading = false,
  owner,
  lastModified,
  rolloutPercentage,
}: FeatureFlagCardProps) {
  // Format date if available
  const formattedDate = lastModified
    ? new Date(lastModified).toLocaleDateString() + ' ' + new Date(lastModified).toLocaleTimeString()
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 relative group">
      <Link
        to={`/feature-flags/${id}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`Edit ${name} feature flag`}
      >
        <span className="sr-only">Edit</span>
      </Link>
      <div className="flex justify-between items-start relative z-20">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {environment}
            </span>
            {owner && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {owner}
              </span>
            )}
            {rolloutPercentage !== undefined && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {rolloutPercentage}% rollout
              </span>
            )}
          </div>
          {formattedDate && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Last modified: {formattedDate}
            </p>
          )}
        </div>
        <div onClick={(e) => e.stopPropagation()} className="relative z-30">
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
    </div>
  );
}
