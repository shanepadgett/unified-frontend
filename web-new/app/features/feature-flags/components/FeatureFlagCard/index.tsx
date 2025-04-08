import { useState } from "react";
import { Link } from "@remix-run/react";
import { Card, Toggle } from "~/core/ui";
import { FeatureFlag } from "../../types";

interface FeatureFlagCardProps {
  flag: FeatureFlag;
  onToggle: (id: string, enabled: boolean) => void;
  isLoading?: boolean;
}

export function FeatureFlagCard({ flag, onToggle, isLoading = false }: FeatureFlagCardProps) {
  const { id, name, description, enabled, environment, owner, lastModified, rolloutPercentage } = flag;

  // Format date if available
  const formattedDate = lastModified
    ? new Date(lastModified).toLocaleDateString() + ' ' + new Date(lastModified).toLocaleTimeString()
    : null;

  // Handle toggle
  const handleToggle = (checked: boolean) => {
    onToggle(id, checked);
  };

  return (
    <Card className="relative group border border-gray-200 dark:border-dark-600 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <Link
            to={`/feature-flags/${id}`}
            className="cursor-pointer"
            aria-label={`Edit ${name} feature flag`}
          >
            <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-600 transition-colors text-xl font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
          </Link>
          <div onClick={(e) => e.stopPropagation()} className="relative z-30">
            <Toggle
              checked={enabled}
              onChange={handleToggle}
              disabled={isLoading}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-dev text-white shadow-sm">
            {environment}
          </span>
          {owner && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-team text-white shadow-sm">
              {owner}
            </span>
          )}
          {rolloutPercentage !== undefined && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-rollout text-white shadow-sm">
              {rolloutPercentage}% rollout
            </span>
          )}
        </div>

        {formattedDate && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last modified: {formattedDate}
          </p>
        )}
      </div>
    </Card>
  );
}
