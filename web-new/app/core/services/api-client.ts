/**
 * Base API client utilities
 *
 * This file contains utilities for making API requests.
 */

import { getClientEnvironmentConfig } from '../environment/config.client';
import { EnvironmentConfig } from '../environment/config';

// Default API URL as fallback
const DEFAULT_API_URL = 'http://localhost:3001';

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

export interface RequestOptions extends RequestInit {
  timeout?: number;
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data?: any;

  constructor(status: number, statusText: string, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Create default headers for API requests
 */
export function createHeaders(additionalHeaders: HeadersInit = {}): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...additionalHeaders,
  });

  return headers;
}

/**
 * Fetch wrapper with timeout and error handling
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Handle non-2xx responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use text
        errorData = await response.text();
      }

      throw new ApiError(
        response.status,
        response.statusText,
        errorData?.message || `API request failed with status ${response.status}`,
        errorData
      );
    }

    // Parse response
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return await response.json();
    }

    return await response.text() as unknown as T;
  } catch (error) {
    // Clear timeout
    clearTimeout(timeoutId);

    // Handle abort error (timeout)
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(408, 'Request Timeout', `Request timed out after ${timeout}ms`);
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * Get the environment configuration
 */
function getConfig(): EnvironmentConfig {
  // Use client-side config
  try {
    return getClientEnvironmentConfig();
  } catch (error) {
    // Fallback to default config if client config fails
    return {
      apiUrl: DEFAULT_API_URL,
      environment: 'development' as any,
    };
  }
}

/**
 * Create a base URL for API requests
 */
export function createApiUrl(path: string): string {
  const config = getConfig();
  const baseUrl = config.apiUrl.endsWith('/')
    ? config.apiUrl.slice(0, -1)
    : config.apiUrl;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

/**
 * Make a GET request to the API
 */
export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = createApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'GET',
    headers,
  });
}

/**
 * Make a POST request to the API
 */
export async function apiPost<T>(
  path: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> {
  const url = createApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * Make a PUT request to the API
 */
export async function apiPut<T>(
  path: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> {
  const url = createApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * Make a DELETE request to the API
 */
export async function apiDelete<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = createApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'DELETE',
    headers,
  });
}
