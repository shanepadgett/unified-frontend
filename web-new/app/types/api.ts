/**
 * Base API types
 * 
 * This file contains common types used for API requests and responses.
 */

/**
 * Pagination parameters for API requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Sorting parameters for API requests
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter parameters for API requests
 */
export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Common query parameters for API requests
 */
export interface QueryParams extends PaginationParams, SortParams, FilterParams {}

/**
 * Paginated response from the API
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Standard API response
 */
export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

/**
 * Error response from the API
 */
export interface ApiErrorResponse {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
  data?: any;
}

/**
 * Resource identifier
 */
export interface ResourceId {
  id: string | number;
}

/**
 * Timestamp fields for resources
 */
export interface TimestampFields {
  createdAt: string;
  updatedAt: string;
}

/**
 * Base resource interface
 */
export interface BaseResource extends ResourceId, Partial<TimestampFields> {}

/**
 * API request methods
 */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API request headers
 */
export interface ApiHeaders {
  [key: string]: string;
}
