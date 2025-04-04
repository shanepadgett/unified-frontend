import { API_BASE_URL } from '@core/api/config';
import { CreateFeatureFlag, FeatureFlag, UpdateFeatureFlag } from '../types';

/**
 * Direct API function to update a feature flag
 * This bypasses the server function mechanism
 */
export const updateFeatureFlagDirect = async (id: string, data: UpdateFeatureFlag): Promise<FeatureFlag> => {
  console.log('Direct API updateFeatureFlag called with id:', id, 'and data:', data);

  // Make sure id is not undefined
  if (!id) {
    console.error('Feature flag ID is undefined or empty');
    throw new Error('Feature flag ID is required');
  }

  const url = `${API_BASE_URL}/feature-flags/${id}`;
  console.log('Updating feature flag at URL:', url);

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to update feature flag ${id}: ${response.statusText}`);
    }

    const updatedFlag = await response.json();
    console.log('Updated feature flag:', updatedFlag);
    return updatedFlag;
  } catch (error) {
    console.error('Error updating feature flag:', error);
    throw error;
  }
};

/**
 * Direct API function to delete a feature flag
 * This bypasses the server function mechanism
 */
export const deleteFeatureFlagDirect = async (id: string): Promise<boolean> => {
  console.log('Direct API deleteFeatureFlag called with id:', id);

  // Make sure id is not undefined
  if (!id) {
    console.error('Feature flag ID is undefined or empty');
    throw new Error('Feature flag ID is required');
  }

  const url = `${API_BASE_URL}/feature-flags/${id}`;
  console.log('Deleting feature flag at URL:', url);

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete feature flag ${id}: ${response.statusText}`);
    }

    console.log('Feature flag deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting feature flag:', error);
    throw error;
  }
};

/**
 * Direct API function to toggle a feature flag
 * This bypasses the server function mechanism
 */
export const toggleFeatureFlagDirect = async (id: string): Promise<FeatureFlag> => {
  console.log('Direct API toggleFeatureFlag called with id:', id);

  // Make sure id is not undefined
  if (!id) {
    console.error('Feature flag ID is undefined or empty');
    throw new Error('Feature flag ID is required');
  }

  const url = `${API_BASE_URL}/feature-flags/${id}/toggle`;
  console.log('Toggling feature flag at URL:', url);

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle feature flag ${id}: ${response.statusText}`);
    }

    const updatedFlag = await response.json();
    console.log('Toggled feature flag:', updatedFlag);
    return updatedFlag;
  } catch (error) {
    console.error('Error toggling feature flag:', error);
    throw error;
  }
};

/**
 * Direct API function to get a specific feature flag by ID
 * This bypasses the server function mechanism
 */
export const getFeatureFlagDirect = async (id: string): Promise<FeatureFlag> => {
  console.log('Direct API getFeatureFlag called with id:', id);
  console.log('API_BASE_URL:', API_BASE_URL);

  // Make sure id is not undefined
  if (!id) {
    console.error('Feature flag ID is undefined or empty');
    throw new Error('Feature flag ID is required');
  }

  const url = `${API_BASE_URL}/feature-flags/${id}`;
  console.log('Fetching from URL:', url);

  try {
    const response = await fetch(url);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch feature flag ${id}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Feature flag data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching feature flag:', error);
    throw error;
  }
};

/**
 * Direct API function to get feature flags by environment
 * This bypasses the server function mechanism
 */
export const getFeatureFlagsByEnvironmentDirect = async (environment: string): Promise<FeatureFlag[]> => {
  console.log('Direct API getFeatureFlagsByEnvironment called with environment:', environment);
  console.log('API_BASE_URL:', API_BASE_URL);

  // Make sure environment is not undefined
  if (!environment) {
    console.error('Environment is undefined or empty');
    environment = 'development'; // Use default environment
  }

  const url = `${API_BASE_URL}/feature-flags/env/${environment}`;
  console.log('Fetching from URL:', url);

  try {
    const response = await fetch(url);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`Failed to fetch feature flags for environment ${environment}: ${response.statusText}`);
    }

    const text = await response.text();
    console.log('Response text:', text);

    try {
      const data = JSON.parse(text);
      console.log('Parsed data:', data);
      return data;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error(`Failed to parse response: ${error instanceof Error ? error.message : String(error)}`);
    }
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    throw error;
  }
};

/**
 * Direct API function to create a feature flag
 * This bypasses the server function mechanism
 */
export const createFeatureFlagDirect = async (data: CreateFeatureFlag): Promise<FeatureFlag> => {
  console.log('Direct API createFeatureFlag called with data:', data);

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
