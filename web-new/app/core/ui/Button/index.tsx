import { forwardRef } from "react";
import { ButtonProps } from "./types";
import { twMerge } from "tailwind-merge";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled = false,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    // Size styles
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    
    // Variant styles
    const variantStyles = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600 disabled:bg-primary-600/50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-200/50 dark:bg-dark-700 dark:text-gray-200 dark:hover:bg-dark-600",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:text-gray-300 dark:border-dark-600 dark:text-gray-300 dark:hover:bg-dark-700",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-300 dark:text-gray-300 dark:hover:bg-dark-700",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 disabled:bg-red-600/50",
    };
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    // Loading and disabled styles
    const loadingStyles = isLoading ? "opacity-80 cursor-not-allowed" : "";
    const disabledStyles = disabled ? "opacity-60 cursor-not-allowed" : "";
    
    // Combine all styles
    const buttonStyles = twMerge(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      widthStyles,
      loadingStyles,
      disabledStyles,
      className
    );
    
    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
