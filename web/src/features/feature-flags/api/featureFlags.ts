import { createServerFn } from '@tanstack/react-start';
import { API_BASE_URL } from '@core/api/config';
import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from '../types';

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
.validator((env: string) => {
  console.log('Validating environment:', env);
  return env;
})
.handler(async (ctx) => {
  const environment = ctx.data;
  console.log('Fetching feature flags for environment in handler:', environment);
  console.log('API URL:', `${API_BASE_URL}/feature-flags/env/${environment}`);

  try {
    const response = await fetch(`${API_BASE_URL}/feature-flags/env/${environment}`);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch feature flags for environment ${environment}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    throw error;
  }
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

// Create a new feature flag - direct fetch implementation
export const createFeatureFlag = async (data: CreateFeatureFlag): Promise<any> => {
  console.log('Direct createFeatureFlag called with data:', data);

  // Validate required fields
  if (!data) {
    console.error('Data is null or undefined');
    throw new Error('Missing data for create feature flag');
  }

  if (!data.name) {
    throw new Error('Name is required for feature flag');
  }
  if (!data.description) {
    throw new Error('Description is required for feature flag');
  }
  if (data.enabled === undefined) {
    throw new Error('Enabled status is required for feature flag');
  }
  if (!data.environment) {
    throw new Error('Environment is required for feature flag');
  }
  if (!data.owner) {
    throw new Error('Owner is required for feature flag');
  }

  // Create a new object with all the required fields
  const featureFlag: CreateFeatureFlag = {
    name: data.name,
    description: data.description,
    enabled: data.enabled,
    environment: data.environment,
    owner: data.owner || 'System',
    ...(data.rolloutPercentage !== undefined && { rolloutPercentage: data.rolloutPercentage }),
    ...(data.dependencies && { dependencies: data.dependencies }),
    ...(data.expiresAt && { expiresAt: data.expiresAt })
  };

  console.log('Sending feature flag to API:', featureFlag);

  const response = await fetch(`${API_BASE_URL}/feature-flags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(featureFlag)
  });

  if (!response.ok) {
    throw new Error(`Failed to create feature flag: ${response.statusText}`);
  }

  return await response.json();
};

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
