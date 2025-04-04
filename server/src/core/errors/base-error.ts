/**
 * Base error class for application errors
 * Extends the built-in Error class with status code support
 */
export class BaseError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found Error
 * Used when a requested resource is not found
 */
export class NotFoundError extends BaseError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Bad Request Error
 * Used for validation errors or invalid input
 */
export class BadRequestError extends BaseError {
  errors?: string[];

  constructor(message: string = 'Bad request', errors?: string[]) {
    super(message, 400);
    this.errors = errors;
  }
}

/**
 * Unauthorized Error
 * Used when authentication is required but not provided or invalid
 */
export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Forbidden Error
 * Used when a user doesn't have permission to access a resource
 */
export class ForbiddenError extends BaseError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

/**
 * Conflict Error
 * Used when a request conflicts with the current state of the server
 */
export class ConflictError extends BaseError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}
