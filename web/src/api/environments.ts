import { createServerFn } from '@tanstack/react-start';
import { API_BASE_URL } from './config.ts';

// Environment interface matching the server model
export interface Environment {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create Environment DTO
export interface CreateEnvironment {
  name: string;
  description: string;
  isDefault?: boolean;
}

// Update Environment DTO
export interface UpdateEnvironment {
  name?: string;
  description?: string;
  isDefault?: boolean;
}

// Get all environments
export const getEnvironments = createServerFn({
  method: 'GET'
}).handler(async () => {
  const response = await fetch(`${API_BASE_URL}/environments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch environments: ${response.statusText}`);
  }
  return await response.json();
});

// Get a specific environment
export const getEnvironment = createServerFn({
  method: 'GET'
})
.validator((id: string) => id)
.handler(async (ctx) => {
  const id = ctx.data;
  const response = await fetch(`${API_BASE_URL}/environments/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch environment ${id}: ${response.statusText}`);
  }
  return await response.json();
});

// Get environment by name
export const getEnvironmentByName = createServerFn({
  method: 'GET'
})
.validator((name: string) => name)
.handler(async (ctx) => {
  const name = ctx.data;
  const response = await fetch(`${API_BASE_URL}/environments/name/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch environment with name ${name}: ${response.statusText}`);
  }
  return await response.json();
});

// Get default environment
export const getDefaultEnvironment = createServerFn({
  method: 'GET'
}).handler(async () => {
  const response = await fetch(`${API_BASE_URL}/environments/default/get`);
  if (!response.ok) {
    throw new Error(`Failed to fetch default environment: ${response.statusText}`);
  }
  return await response.json();
});

// Create a new environment
export const createEnvironment = createServerFn({
  method: 'POST'
})
.validator((data: CreateEnvironment) => {
  if (!data) {
    throw new Error('Missing data for create environment');
  }
  return data;
})
.handler(async (ctx) => {
  const data = ctx.data;
  const response = await fetch(`${API_BASE_URL}/environments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to create environment: ${response.statusText}`);
  }

  return await response.json();
});

// Update an environment
export const updateEnvironment = createServerFn({
  method: 'POST'
})
.validator((data: { id: string; env: UpdateEnvironment }) => {
  if (!data || !data.id) {
    throw new Error('Missing ID for update environment');
  }
  return data;
})
.handler(async (ctx) => {
  const { id, env } = ctx.data;

  const response = await fetch(`${API_BASE_URL}/environments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(env)
  });

  if (!response.ok) {
    throw new Error(`Failed to update environment ${id}: ${response.statusText}`);
  }

  return await response.json();
});

// Delete an environment
export const deleteEnvironment = createServerFn({
  method: 'POST'
})
.validator((id: string) => {
  if (!id) {
    throw new Error('Missing ID for delete environment');
  }
  return id;
})
.handler(async (ctx) => {
  const id = ctx.data;
  const response = await fetch(`${API_BASE_URL}/environments/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete environment ${id}: ${response.statusText}`);
  }

  return true;
});
