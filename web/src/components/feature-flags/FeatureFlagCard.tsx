import React from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardTitle, CardDescription, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Toggle } from '../../components/ui/Toggle.tsx';
import { Text } from '../../components/ui/Typography.tsx';

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
    <Card variant="interactive" className="relative group border border-gray-200 dark:border-gray-700">
      <Link
        to={`/feature-flags/${id}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`Edit ${name} feature flag`}
      >
        <span className="sr-only">Edit</span>
      </Link>
      <div className="flex justify-between items-start relative z-20">
        <div>
          <CardTitle className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardContent className="mt-2 flex flex-wrap gap-2">
            <Badge variant="info">{environment}</Badge>
            {owner && (
              <Badge variant="secondary">{owner}</Badge>
            )}
            {rolloutPercentage !== undefined && (
              <Badge variant="success">{rolloutPercentage}% rollout</Badge>
            )}
          </CardContent>
          {formattedDate && (
            <Text size="xs" variant="muted" className="mt-2">
              Last modified: {formattedDate}
            </Text>
          )}
        </div>
        <div onClick={(e) => e.stopPropagation()} className="relative z-30">
          <Toggle
            checked={enabled}
            onChange={(checked: boolean) => onToggle(id, checked)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Card>
  );
}
