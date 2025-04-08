import { forwardRef } from "react";
import { TextAreaProps } from "./types";
import { twMerge } from "tailwind-merge";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      size = "md",
      variant = "outline",
      error,
      helperText,
      fullWidth = true,
      className,
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const textAreaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    
    // Base styles
    const baseStyles = "rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600";
    
    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };
    
    // Variant styles
    const variantStyles = {
      outline: "border border-gray-300 bg-white dark:border-dark-600 dark:bg-dark-800 dark:text-white",
      filled: "border border-gray-200 bg-gray-100 dark:border-dark-700 dark:bg-dark-700 dark:text-white",
    };
    
    // Error styles
    const errorStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "";
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    // Combine all styles
    const textAreaStyles = twMerge(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      errorStyles,
      widthStyles,
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
            htmlFor={textAreaId}
            className={`block font-medium text-gray-700 dark:text-gray-300 ${labelSizeStyles[size]}`}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textAreaId}
          className={textAreaStyles}
          rows={rows}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${textAreaId}-error`
              : helperText
              ? `${textAreaId}-helper-text`
              : undefined
          }
          {...props}
        />
        
        {error && (
          <p
            id={`${textAreaId}-error`}
            className="mt-1 text-sm text-red-600 dark:text-red-500"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${textAreaId}-helper-text`}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
