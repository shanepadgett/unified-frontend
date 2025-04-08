import { forwardRef, Fragment } from "react";
import { NativeSelectProps, SelectOption, SelectProps } from "./types";
import { twMerge } from "tailwind-merge";

// Import necessary icons
const ChevronUpDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

// Dropdown component
const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
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
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Find the selected option in the options array
    const selectedOption = value || (options.length > 0 ? options[0] : null);

    // State for dropdown open/close
    const [isOpen, setIsOpen] = useState(false);

    // Handle option selection
    const handleSelect = (option: SelectOption) => {
      onChange(option);
      setIsOpen(false);
    };

    return (
      <div ref={ref} className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            type="button"
            onClick={() => !isDisabled && setIsOpen(!isOpen)}
            className="relative w-full h-[38px] cursor-default rounded-md bg-white dark:bg-dark-800 px-4 py-2 text-left shadow-sm border border-gray-300 dark:border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-sm flex items-center justify-between"
            disabled={isDisabled}
          >
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
              <ChevronUpDownIcon />
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/95 dark:bg-dark-800/95 py-1 text-base shadow-xl border-2 border-gray-200 dark:border-dark-500 focus:outline-none sm:text-sm backdrop-blur-sm">
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => !option.disabled && handleSelect(option)}
                  className={twMerge(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    selectedOption && selectedOption.id === option.id
                      ? "bg-primary-600/15 dark:bg-primary-600/30 text-primary-700 dark:text-primary-600 shadow-sm"
                      : "text-gray-900 dark:text-gray-100 hover:bg-primary-600/10 dark:hover:bg-primary-600/20",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span
                    className={twMerge(
                      "block truncate",
                      selectedOption && selectedOption.id === option.id ? "font-medium" : "font-normal"
                    )}
                  >
                    {option.icon && (
                      <span className="inline-block mr-2">{option.icon}</span>
                    )}
                    {option.name}
                  </span>
                  {selectedOption && selectedOption.id === option.id && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-600">
                      <CheckIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p className={`mt-1 text-sm ${errorText ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

// Native select component for simpler use cases
const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
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
      disabled = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID
    const selectId = useId();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target && typeof e.target.value === 'string') {
        onChange(e.target.value);
      }
    };

    const baseStyles = "block w-full h-[38px] px-3 pr-10 py-2 rounded-md shadow-sm focus:border-primary-600 focus:ring-primary-600 dark:bg-dark-800 dark:text-white appearance-none";
    const borderStyles = hasError || errorText
      ? "border-red-300 dark:border-red-700"
      : "border-gray-300 dark:border-dark-600";

    const selectStyles = twMerge(
      baseStyles,
      borderStyles,
      className
    );

    return (
      <div>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            value={value}
            onChange={handleChange}
            className={selectStyles}
            disabled={disabled || isLoading}
            {...props}
          >
            {isLoading ? (
              <option>Loading...</option>
            ) : (
              options.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  disabled={option.disabled}
                >
                  {option.name}
                </option>
              ))
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
            <ChevronUpDownIcon />
          </div>
        </div>
        {(helperText || errorText) && (
          <p className={`mt-1 text-sm ${errorText ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

// Add display names
Select.displayName = "Select";
NativeSelect.displayName = "NativeSelect";

// Import React hooks
import { useState, useId } from "react";

export { Select, NativeSelect };
export default Select;
