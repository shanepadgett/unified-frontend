import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

/**
 * Loading indicator component
 */
export function LoadingIndicator({
  size = 'medium',
  fullScreen = false,
  message = 'Loading...',
}: LoadingIndicatorProps) {
  // Determine spinner size
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  // Container classes
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
    : 'flex items-center justify-center py-4';

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="flex flex-col items-center">
        <div
          className={`${sizeClasses[size]} rounded-full border-gray-300 border-t-blue-500 animate-spin`}
        />
        {message && (
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Page loading indicator
 */
export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingIndicator size="large" message="Loading page..." />
    </div>
  );
}

/**
 * Content loading indicator
 */
export function ContentLoading() {
  return <LoadingIndicator size="medium" />;
}

/**
 * Button loading indicator
 */
export function ButtonLoading() {
  return (
    <div className="flex items-center space-x-2">
      <LoadingIndicator size="small" message={null} />
      <span>Loading...</span>
    </div>
  );
}
