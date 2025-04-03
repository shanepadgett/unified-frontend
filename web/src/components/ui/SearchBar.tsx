import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Current search value
   */
  value: string;

  /**
   * Callback function when the search value changes
   */
  onChange: (value: string) => void;

  /**
   * Placeholder text
   * @default 'Search...'
   */
  placeholder?: string;

  /**
   * Whether to show the clear button when there is a value
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Whether the search bar is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes for the search bar
   */
  className?: string;
}

/**
 * Search bar component with search icon and clear button
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  showClearButton = true,
  isLoading = false,
  className,
  disabled,
  ...props
}: SearchBarProps) {
  const handleClear = () => {
    onChange('');
  };

  const baseStyles = "block w-full rounded-md border border-gray-300 dark:border-gray-700 h-10 px-3 py-2 pl-10 pr-10 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const searchBarStyles = twMerge(
    baseStyles,
    disabledStyles,
    className
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={searchBarStyles}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        {...props}
      />
      {showClearButton && value && !disabled && !isLoading && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
}
