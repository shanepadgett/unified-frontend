/**
 * Environment services
 *
 * This file contains services for interacting with the environments API.
 */

import { apiGet, apiPost, apiPatch, apiDelete } from "~/core/services/api-client";
import { Environment, CreateEnvironment, UpdateEnvironment } from "../types";
import { mockEnvironments } from "./mock-data";

// Flag to use mock data instead of API calls
const USE_MOCK_DATA = false;

/**
 * Get all environments
 */
export async function getEnvironments(): Promise<Environment[]> {
  if (USE_MOCK_DATA) {
    return Promise.resolve([...mockEnvironments]);
  }
  return apiGet<Environment[]>("/environments");
}

/**
 * Get a specific environment by ID
 */
export async function getEnvironment(id: string): Promise<Environment> {
  if (USE_MOCK_DATA) {
    const environment = mockEnvironments.find(env => env.id === id);
    if (!environment) {
      throw new Error(`Environment with ID ${id} not found`);
    }
    return Promise.resolve({...environment});
  }
  return apiGet<Environment>(`/environments/${id}`);
}

/**
 * Get environment by name
 */
export async function getEnvironmentByName(name: string): Promise<Environment> {
  if (USE_MOCK_DATA) {
    const environment = mockEnvironments.find(env => env.name.toLowerCase() === name.toLowerCase());
    if (!environment) {
      throw new Error(`Environment with name ${name} not found`);
    }
    return Promise.resolve({...environment});
  }
  return apiGet<Environment>(`/environments/name/${name}`);
}

/**
 * Get default environment
 */
export async function getDefaultEnvironment(): Promise<Environment> {
  if (USE_MOCK_DATA) {
    const environment = mockEnvironments.find(env => env.isDefault);
    if (!environment) {
      throw new Error(`Default environment not found`);
    }
    return Promise.resolve({...environment});
  }
  return apiGet<Environment>("/environments/default");
}

/**
 * Create a new environment
 */
export async function createEnvironment(data: CreateEnvironment): Promise<Environment> {
  if (USE_MOCK_DATA) {
    // Generate a new ID
    const id = `${mockEnvironments.length + 1}`;

    // If this is set as default, update other environments
    if (data.isDefault) {
      mockEnvironments.forEach(env => {
        if (env.isDefault) {
          env.isDefault = false;
        }
      });
    }

    // Create the new environment
    const newEnvironment: Environment = {
      id,
      name: data.name,
      description: data.description,
      isDefault: data.isDefault || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock data
    mockEnvironments.push(newEnvironment);

    return Promise.resolve({...newEnvironment});
  }
  return apiPost<Environment>("/environments", data);
}

/**
 * Update an environment
 */
export async function updateEnvironment(id: string, data: UpdateEnvironment): Promise<Environment> {
  if (USE_MOCK_DATA) {
    const index = mockEnvironments.findIndex(env => env.id === id);
    if (index === -1) {
      throw new Error(`Environment with ID ${id} not found`);
    }

    // If this is set as default, update other environments
    if (data.isDefault) {
      mockEnvironments.forEach(env => {
        if (env.id !== id && env.isDefault) {
          env.isDefault = false;
        }
      });
    }

    // Update the environment
    const updatedEnvironment = {
      ...mockEnvironments[index],
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.isDefault !== undefined && { isDefault: data.isDefault }),
      updatedAt: new Date(),
    };

    // Update in mock data
    mockEnvironments[index] = updatedEnvironment;

    return Promise.resolve({...updatedEnvironment});
  }
  return apiPatch<Environment>(`/environments/${id}`, data);
}

/**
 * Delete an environment
 */
export async function deleteEnvironment(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockEnvironments.findIndex(env => env.id === id);
    if (index === -1) {
      throw new Error(`Environment with ID ${id} not found`);
    }

    // Check if it's the default environment
    if (mockEnvironments[index].isDefault) {
      throw new Error(`Cannot delete the default environment`);
    }

    // Remove from mock data
    mockEnvironments.splice(index, 1);

    return Promise.resolve(true);
  }
  return apiDelete<boolean>(`/environments/${id}`);
}
