import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardTitle, CardDescription, Badge, Toggle, Text } from '@features/shared/components';

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
    <Card variant="interactive" className="relative group border border-gray-200 dark:border-dark-600 p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <Link
            to={`/feature-flags/${id}`}
            className="cursor-pointer"
            aria-label={`Edit ${name} feature flag`}
          >
            <CardTitle className="group-hover:text-primary-600 dark:group-hover:text-primary-600 transition-colors text-xl">
              {name}
            </CardTitle>
          </Link>
          <div onClick={(e) => e.stopPropagation()} className="relative z-30">
            <Toggle
              checked={enabled}
              onChange={(checked: boolean) => onToggle(id, checked)}
              isLoading={isLoading}
            />
          </div>
        </div>

        <CardDescription className="text-sm">{description}</CardDescription>

        <div className="flex flex-wrap gap-2">
          <Badge variant="info">{environment}</Badge>
          {owner && (
            <Badge variant="secondary">{owner}</Badge>
          )}
          {rolloutPercentage !== undefined && (
            <Badge variant="success">{rolloutPercentage}% rollout</Badge>
          )}
        </div>

        {formattedDate && (
          <Text size="xs" variant="muted">
            Last modified: {formattedDate}
          </Text>
        )}
      </div>
    </Card>
  );
}
