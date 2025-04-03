import { createServerFn } from '@tanstack/react-start';
import { API_BASE_URL } from './config.ts';

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

// Get all feature flags
export const getFeatureFlags = createServerFn({
  method: 'GET'
}).handler(async () => {
  const response = await fetch(`${API_BASE_URL}/feature-flags`);
  if (!response.ok) {
    throw new Error(`Failed to fetch feature flags: ${response.statusText}`);
  }
  return await response.json();
});

// Get feature flags by environment
export const getFeatureFlagsByEnvironment = createServerFn({
  method: 'GET'
})
.validator((env: string) => env)
.handler(async (ctx) => {
  const environment = ctx.data;
  const response = await fetch(`${API_BASE_URL}/feature-flags/env/${environment}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch feature flags for environment ${environment}: ${response.statusText}`);
  }
  return await response.json();
});

// Get a specific feature flag
export const getFeatureFlag = createServerFn({
  method: 'GET'
})
.validator((id: string) => id)
.handler(async (ctx) => {
  const id = ctx.data;
  const response = await fetch(`${API_BASE_URL}/feature-flags/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch feature flag ${id}: ${response.statusText}`);
  }
  return await response.json();
});

// Toggle a feature flag
export const toggleFeatureFlag = createServerFn({
  method: 'POST'
})
.validator((data: { id: string; enabled: boolean }) => {
  if (!data || !data.id) {
    throw new Error('Missing ID for toggle feature flag');
  }
  return data;
})
.handler(async (ctx) => {
  const { id } = ctx.data;

  const response = await fetch(`${API_BASE_URL}/feature-flags/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle feature flag ${id}: ${response.statusText}`);
  }

  return await response.json();
});

// Create a new feature flag
export const createFeatureFlag = createServerFn({
  method: 'POST'
})
.validator((data: CreateFeatureFlag) => {
  if (!data) {
    throw new Error('Missing data for create feature flag');
  }
  return data;
})
.handler(async (ctx) => {
  const data = ctx.data;
  const response = await fetch(`${API_BASE_URL}/feature-flags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to create feature flag: ${response.statusText}`);
  }

  return await response.json();
});

// Update a feature flag
export const updateFeatureFlag = createServerFn({
  method: 'POST'
})
.validator((data: { id: string; flag: UpdateFeatureFlag }) => {
  if (!data || !data.id) {
    throw new Error('Missing ID for update feature flag');
  }
  return data;
})
.handler(async (ctx) => {
  const { id, flag } = ctx.data;

  const response = await fetch(`${API_BASE_URL}/feature-flags/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(flag)
  });

  if (!response.ok) {
    throw new Error(`Failed to update feature flag ${id}: ${response.statusText}`);
  }

  return await response.json();
});

// Delete a feature flag
export const deleteFeatureFlag = createServerFn({
  method: 'POST'
})
.validator((id: string) => {
  if (!id) {
    throw new Error('Missing ID for delete feature flag');
  }
  return id;
})
.handler(async (ctx) => {
  const id = ctx.data;
  const response = await fetch(`${API_BASE_URL}/feature-flags/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete feature flag ${id}: ${response.statusText}`);
  }

  return true;
});
