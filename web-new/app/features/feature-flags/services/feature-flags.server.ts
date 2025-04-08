/**
 * Feature Flag services for server-side use
 *
 * This file contains services for interacting with the feature flags API from the server.
 */

import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "~/core/services/api-client.server";
import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from "../types";
import { mockFeatureFlags } from "./mock-data";

// Flag to use mock data instead of API calls
const USE_MOCK_DATA = false;

/**
 * Get all feature flags
 */
export async function getFeatureFlags(): Promise<FeatureFlag[]> {
  if (USE_MOCK_DATA) {
    return Promise.resolve([...mockFeatureFlags]);
  }
  return apiGet<FeatureFlag[]>("/feature-flags");
}

/**
 * Get feature flags by environment
 */
export async function getFeatureFlagsByEnvironment(environment: string): Promise<FeatureFlag[]> {
  if (USE_MOCK_DATA) {
    return Promise.resolve(
      mockFeatureFlags.filter(flag => flag.environment === environment)
    );
  }
  return apiGet<FeatureFlag[]>(`/feature-flags/env/${environment}`);
}

/**
 * Get a specific feature flag by ID
 */
export async function getFeatureFlag(id: string): Promise<FeatureFlag> {
  if (USE_MOCK_DATA) {
    const flag = mockFeatureFlags.find(flag => flag.id === id);
    if (!flag) {
      throw new Error(`Feature flag with ID ${id} not found`);
    }
    return Promise.resolve({...flag});
  }
  return apiGet<FeatureFlag>(`/feature-flags/${id}`);
}

/**
 * Toggle a feature flag
 */
export async function toggleFeatureFlag(id: string): Promise<FeatureFlag> {
  if (USE_MOCK_DATA) {
    const flagIndex = mockFeatureFlags.findIndex(flag => flag.id === id);
    if (flagIndex === -1) {
      throw new Error(`Feature flag with ID ${id} not found`);
    }

    // Toggle the enabled status
    const updatedFlag = {
      ...mockFeatureFlags[flagIndex],
      enabled: !mockFeatureFlags[flagIndex].enabled,
      lastModified: new Date()
    };

    // Update the mock data
    mockFeatureFlags[flagIndex] = updatedFlag;

    return Promise.resolve({...updatedFlag});
  }
  return apiPatch<FeatureFlag>(`/feature-flags/${id}/toggle`, {});
}

/**
 * Create a new feature flag
 */
export async function createFeatureFlag(data: CreateFeatureFlag): Promise<FeatureFlag> {
  if (USE_MOCK_DATA) {
    // Generate a new ID
    const id = `${mockFeatureFlags.length + 1}`;

    // Create the new feature flag
    const newFlag: FeatureFlag = {
      id,
      name: data.name,
      description: data.description,
      enabled: data.enabled,
      environment: data.environment,
      owner: data.owner,
      lastModified: new Date(),
      ...(data.rolloutPercentage !== undefined && { rolloutPercentage: data.rolloutPercentage }),
      ...(data.dependencies && { dependencies: data.dependencies }),
      ...(data.expiresAt && { expiresAt: new Date(data.expiresAt) })
    };

    // Add to mock data
    mockFeatureFlags.push(newFlag);

    return Promise.resolve({...newFlag});
  }
  return apiPost<FeatureFlag>("/feature-flags", data);
}

/**
 * Update a feature flag
 */
export async function updateFeatureFlag(id: string, data: UpdateFeatureFlag): Promise<FeatureFlag> {
  if (USE_MOCK_DATA) {
    const flagIndex = mockFeatureFlags.findIndex(flag => flag.id === id);
    if (flagIndex === -1) {
      throw new Error(`Feature flag with ID ${id} not found`);
    }

    // Update the flag
    const updatedFlag: FeatureFlag = {
      ...mockFeatureFlags[flagIndex],
      ...data,
      lastModified: new Date(),
      ...(data.expiresAt && { expiresAt: new Date(data.expiresAt) })
    };

    // Update the mock data
    mockFeatureFlags[flagIndex] = updatedFlag;

    return Promise.resolve({...updatedFlag});
  }
  return apiPatch<FeatureFlag>(`/feature-flags/${id}`, data);
}

/**
 * Delete a feature flag
 */
export async function deleteFeatureFlag(id: string): Promise<void> {
  if (USE_MOCK_DATA) {
    const flagIndex = mockFeatureFlags.findIndex(flag => flag.id === id);
    if (flagIndex === -1) {
      throw new Error(`Feature flag with ID ${id} not found`);
    }

    // Remove from mock data
    mockFeatureFlags.splice(flagIndex, 1);

    return Promise.resolve();
  }
  return apiDelete<void>(`/feature-flags/${id}`);
}
