/**
 * Feature Flag model
 * Represents a feature flag in the system
 */
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: string; // dev/staging/prod
  lastModified: Date;
  owner: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: Date;
}

/**
 * Create Feature Flag DTO
 * Data Transfer Object for creating a new feature flag
 */
export interface CreateFeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  environment: string;
  owner: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: string;
}

/**
 * Update Feature Flag DTO
 * Data Transfer Object for updating an existing feature flag
 */
export interface UpdateFeatureFlag {
  name?: string;
  description?: string;
  enabled?: boolean;
  environment?: string;
  owner?: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: string;
}
