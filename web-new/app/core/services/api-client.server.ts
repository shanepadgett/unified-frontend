/**
 * Server-side API client utilities
 *
 * This file contains utilities for making API requests from the server.
 * It should not be imported directly in client-side code.
 */

import { getEnvironmentConfig } from '../environment/config.server';
import {
  apiGet as clientApiGet,
  apiPost as clientApiPost,
  apiPut as clientApiPut,
  apiDelete as clientApiDelete,
  RequestOptions,
  createHeaders,
  fetchWithTimeout
} from './api-client';

/**
 * Create a base URL for API requests from the server
 */
export function createServerApiUrl(path: string): string {
  const config = getEnvironmentConfig();
  const baseUrl = config.apiUrl.endsWith('/')
    ? config.apiUrl.slice(0, -1)
    : config.apiUrl;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

/**
 * Make a GET request to the API from the server
 */
export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = createServerApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'GET',
    headers,
  });
}

/**
 * Make a POST request to the API from the server
 */
export async function apiPost<T>(
  path: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> {
  const url = createServerApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * Make a PUT request to the API from the server
 */
export async function apiPut<T>(
  path: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> {
  const url = createServerApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * Make a PATCH request to the API from the server
 */
export async function apiPatch<T>(
  path: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> {
  const url = createServerApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  });
}

/**
 * Make a DELETE request to the API from the server
 */
export async function apiDelete<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = createServerApiUrl(path);
  const headers = createHeaders(options.headers);

  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'DELETE',
    headers,
  });
}
