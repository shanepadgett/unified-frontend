import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';

export interface SelectOption {
  /**
   * Unique identifier for the option
   */
  id: string;

  /**
   * Display name for the option
   */
  name: string;

  /**
   * Optional icon to display with the option
   */
  icon?: React.ReactNode;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * Array of options to display in the select
   */
  options: SelectOption[];

  /**
   * Currently selected option
   */
  value: SelectOption;

  /**
   * Callback function when the selection changes
   */
  onChange: (option: SelectOption) => void;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Helper text to display below the select
   */
  helperText?: string;

  /**
   * Error message to display below the select
   */
  errorText?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;

  /**
   * Additional CSS classes to apply to the select
   */
  className?: string;
}

/**
 * Select/Dropdown component for selecting from a list of options
 */
export function Select({
  options,
  value,
  onChange,
  label,
  helperText,
  errorText,
  disabled = false,
  isLoading = false,
  placeholder = 'Select an option',
  className,
}: SelectProps) {
  const isDisabled = disabled || isLoading;

  // Find the selected option in the options array
  const selectedOption = value || (options.length > 0 ? options[0] : null);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <Listbox value={selectedOption} onChange={onChange} disabled={isDisabled}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-dark-800 px-4 py-2 text-left shadow-sm border border-gray-300 dark:border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-sm min-w-[180px] flex items-center">
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-gray-500"
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
                <span className="text-gray-500">Loading...</span>
              </div>
            ) : selectedOption ? (
              <span className="block truncate font-medium">
                {selectedOption.icon && (
                  <span className="inline-block mr-2">{selectedOption.icon}</span>
                )}
                {selectedOption.name}
              </span>
            ) : (
              <span className="block truncate text-gray-500">{placeholder}</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  disabled={option.disabled}
                  className={({ active, disabled }) =>
                    twMerge(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active
                        ? "bg-primary-600/10 dark:bg-primary-600/20 text-primary-700 dark:text-primary-600"
                        : "text-gray-900 dark:text-gray-100",
                      disabled && "opacity-50 cursor-not-allowed"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={twMerge(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        {option.icon && (
                          <span className="inline-block mr-2">{option.icon}</span>
                        )}
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {(helperText || errorText) && (
        <p className={`mt-1 text-sm ${errorText ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {errorText || helperText}
        </p>
      )}
    </div>
  );
}

export interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  /**
   * Array of options to display in the select
   */
  options: SelectOption[];

  /**
   * Currently selected option ID
   */
  value: string;

  /**
   * Callback function when the selection changes
   */
  onChange: (value: string) => void;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Helper text to display below the select
   */
  helperText?: string;

  /**
   * Error message to display below the select
   */
  errorText?: string;

  /**
   * Whether the select has an error
   * @default false
   */
  hasError?: boolean;
}

/**
 * Native select component for simpler use cases
 */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      helperText,
      errorText,
      hasError = false,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target && typeof e.target.value === 'string') {
        onChange(e.target.value);
      }
    };

    const baseStyles = "mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white";
    const borderStyles = hasError || errorText
      ? "border-red-300 dark:border-red-700"
      : "border-gray-300 dark:border-gray-700";

    const selectStyles = twMerge(
      baseStyles,
      borderStyles,
      className
    );

    return (
      <div>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={handleChange}
          className={selectStyles}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.id}
              value={option.id}
              disabled={option.disabled}
            >
              {option.name}
            </option>
          ))}
        </select>
        {(helperText || errorText) && (
          <p className={`mt-1 text-sm ${errorText ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

NativeSelect.displayName = 'NativeSelect';
