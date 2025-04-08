import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { AppError, formatErrorForClient } from './base-error';

interface ErrorDisplayProps {
  title: string;
  message: string;
  statusCode?: number;
  error?: Error;
}

/**
 * Error display component
 */
export function ErrorDisplay({ title, message, statusCode, error }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      {statusCode && (
        <div className="text-6xl font-bold text-red-500 mb-4">{statusCode}</div>
      )}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {process.env.NODE_ENV !== 'production' && error && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left w-full max-w-2xl overflow-auto">
          <p className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {error.stack || error.message}
          </p>
        </div>
      )}
      
      <div className="mt-8">
        <a
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

/**
 * Default error boundary component
 */
export function DefaultErrorBoundary() {
  const error = useRouteError();
  
  // Handle route errors (404, etc.)
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorDisplay
        title={`${error.status} ${error.statusText}`}
        message={error.data.message || 'An unexpected error occurred'}
        statusCode={error.status}
        error={new Error(`${error.status} ${error.statusText}`)}
      />
    );
  }
  
  // Handle app errors
  if (error instanceof AppError) {
    return (
      <ErrorDisplay
        title={error.code}
        message={error.message}
        statusCode={error.statusCode}
        error={error}
      />
    );
  }
  
  // Handle other errors
  let errorInstance = error;
  if (!(error instanceof Error)) {
    errorInstance = new Error(
      error && typeof error === 'object'
        ? JSON.stringify(error)
        : String(error)
    );
  }
  
  return (
    <ErrorDisplay
      title="Unexpected Error"
      message="An unexpected error occurred. Please try again later."
      error={errorInstance as Error}
    />
  );
}

/**
 * Not found error boundary
 */
export function NotFoundBoundary() {
  return (
    <ErrorDisplay
      title="Page Not Found"
      message="The page you are looking for does not exist or has been moved."
      statusCode={404}
    />
  );
}

/**
 * Format error for client response
 */
export function formatError(error: unknown): Record<string, any> {
  if (error instanceof AppError) {
    return formatErrorForClient(error);
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'INTERNAL_ERROR',
      status: 500,
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    status: 500,
  };
}
