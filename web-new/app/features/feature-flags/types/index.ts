// Feature Flag interface matching the server model
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: 'development' | 'staging' | 'production' | string;
  lastModified?: Date;
  owner?: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: Date;
}

// Create Feature Flag DTO
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

// Update Feature Flag DTO
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
