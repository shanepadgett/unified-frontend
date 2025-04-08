/**
 * Base error handling
 * 
 * This file contains base error classes and utilities for error handling.
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  code: string;
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string,
    code = 'INTERNAL_ERROR',
    statusCode = 500,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  details?: Record<string, string[]>;

  constructor(message = 'Validation failed', details?: Record<string, string[]>) {
    super(message, 'VALIDATION_ERROR', 400);
    this.details = details;
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}

/**
 * API error
 */
export class ApiError extends AppError {
  data?: any;

  constructor(
    message = 'API request failed',
    statusCode = 500,
    code = 'API_ERROR',
    data?: any
  ) {
    super(message, code, statusCode);
    this.data = data;
  }
}

/**
 * Format error for client response
 */
export function formatErrorForClient(error: Error): Record<string, any> {
  if (error instanceof AppError) {
    const response: Record<string, any> = {
      message: error.message,
      code: error.code,
      status: error.statusCode,
    };

    // Add validation details if available
    if (error instanceof ValidationError && error.details) {
      response.details = error.details;
    }

    // Add API error data if available
    if (error instanceof ApiError && error.data) {
      response.data = error.data;
    }

    return response;
  }

  // For unknown errors, return a generic error
  return {
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    status: 500,
  };
}

/**
 * Log error to console or error tracking service
 */
export function logError(error: Error): void {
  console.error('Error:', error);

  // In a real application, you would log to an error tracking service
  // like Sentry, LogRocket, etc.
}
