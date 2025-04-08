import { forwardRef } from "react";
import { InputProps } from "./types";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      size = "md",
      variant = "outline",
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Base styles
    const baseStyles = "rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600";

    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    };

    // Variant styles
    const variantStyles = {
      outline: "border border-gray-300 bg-white dark:border-dark-600 dark:bg-dark-800 dark:text-gray-100",
      filled: "border border-gray-200 bg-gray-100 dark:border-dark-700 dark:bg-dark-700 dark:text-white",
    };

    // Error styles
    const errorStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "";

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    // Icon padding styles
    const leftIconPadding = leftIcon ? "pl-10" : "";
    const rightIconPadding = rightIcon ? "pr-10" : "";

    // Combine all styles
    const inputStyles = twMerge(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      errorStyles,
      widthStyles,
      leftIconPadding,
      rightIconPadding,
      className
    );

    // Label size styles
    const labelSizeStyles = {
      sm: "text-xs mb-1",
      md: "text-sm mb-1.5",
      lg: "text-base mb-2",
    };

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block font-medium text-gray-700 dark:text-gray-300 ${labelSizeStyles[size]}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper-text`
                : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600 dark:text-red-500"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper-text`}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
