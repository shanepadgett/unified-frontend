import React from 'react';
import { twMerge } from 'tailwind-merge';

export type TextFieldVariant = 'default' | 'error' | 'success';
export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input variant that determines the visual style
   * @default 'default'
   */
  variant?: TextFieldVariant;
  
  /**
   * Input size
   * @default 'md'
   */
  size?: TextFieldSize;
  
  /**
   * Label for the input
   */
  label?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Error message to display below the input
   */
  errorText?: string;
  
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Full width input
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * Text input component for forms
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      helperText,
      errorText,
      startIcon,
      endIcon,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // Base styles for the input
    const baseInputStyles = "rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm";
    
    // Variant styles
    const variantStyles = {
      default: "border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      error: "border-red-300 dark:border-red-700 dark:bg-gray-700 dark:text-white",
      success: "border-green-300 dark:border-green-700 dark:bg-gray-700 dark:text-white"
    };
    
    // Size styles
    const sizeStyles = {
      sm: "py-1 text-sm",
      md: "py-2 text-sm",
      lg: "py-3 text-base"
    };
    
    // Icon padding
    const paddingLeft = startIcon ? "pl-10" : "pl-3";
    const paddingRight = endIcon ? "pr-10" : "pr-3";
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    // Disabled styles
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : "";
    
    // Combine all styles
    const inputStyles = twMerge(
      baseInputStyles,
      variantStyles[variant],
      sizeStyles[size],
      paddingLeft,
      paddingRight,
      widthStyles,
      disabledStyles,
      className
    );
    
    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            disabled={disabled}
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {endIcon}
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

TextField.displayName = 'TextField';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Textarea variant that determines the visual style
   * @default 'default'
   */
  variant?: TextFieldVariant;
  
  /**
   * Label for the textarea
   */
  label?: string;
  
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  
  /**
   * Error message to display below the textarea
   */
  errorText?: string;
  
  /**
   * Full width textarea
   * @default true
   */
  fullWidth?: boolean;
}

/**
 * Textarea component for forms
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = 'default',
      label,
      helperText,
      errorText,
      fullWidth = true,
      className,
      id,
      disabled,
      rows = 3,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if none is provided
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    
    // Base styles for the textarea
    const baseTextareaStyles = "block rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
    
    // Variant styles
    const variantStyles = {
      default: "border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      error: "border-red-300 dark:border-red-700 dark:bg-gray-700 dark:text-white",
      success: "border-green-300 dark:border-green-700 dark:bg-gray-700 dark:text-white"
    };
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    // Disabled styles
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : "";
    
    // Combine all styles
    const textareaStyles = twMerge(
      baseTextareaStyles,
      variantStyles[variant],
      widthStyles,
      disabledStyles,
      className
    );
    
    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaStyles}
          disabled={disabled}
          rows={rows}
          {...props}
        />
        {(helperText || errorText) && (
          <p className={`mt-1 text-sm ${errorText ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
