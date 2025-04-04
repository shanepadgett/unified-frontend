import React from 'react';
import { Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant that determines the visual style
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    _ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
      primary: "text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-600 border border-transparent disabled:bg-gray-600 disabled:text-gray-300 disabled:border-gray-700 disabled:cursor-not-allowed",
      secondary: "text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 focus:ring-primary-600 disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-dark-800 dark:disabled:text-gray-600 disabled:cursor-not-allowed",
      danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed",
      success: "text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500 border border-transparent disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed",
      link: "text-primary-600 hover:text-primary-700 focus:ring-primary-600 border-none shadow-none disabled:text-gray-500 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const widthStyles = fullWidth ? "w-full" : "";

    const loadingStyles = isLoading ? "opacity-80 cursor-not-allowed" : "";

    const buttonStyles = twMerge(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyles,
      loadingStyles,
      className
    );

    return (
      <button
        ref={_ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface LinkButtonProps extends Omit<ButtonProps, 'as'> {
  /**
   * The URL to navigate to
   */
  to: string;

  /**
   * Whether the link is external (uses <a> instead of Link)
   * @default false
   */
  external?: boolean;
}

/**
 * Button that acts as a link/navigation element
 */
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      children,
      to,
      external = false,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    _ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
      primary: "text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-600 border border-transparent",
      secondary: "text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 focus:ring-primary-600",
      danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent",
      success: "text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500 border border-transparent",
      link: "text-primary-600 hover:text-primary-700 focus:ring-primary-600 border-none shadow-none"
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const widthStyles = fullWidth ? "w-full" : "";

    const loadingStyles = isLoading ? "opacity-80 cursor-not-allowed" : "";
    const disabledStyles = disabled ? "bg-gray-600 text-gray-300 border-gray-700 cursor-not-allowed pointer-events-none" : "";

    const linkStyles = twMerge(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyles,
      loadingStyles,
      disabledStyles,
      className
    );

    if (external) {
      return (
        <a
          href={to}
          className={linkStyles}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
          )}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <Link
        to={to}
        className={linkStyles}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Link>
    );
  }
);

LinkButton.displayName = 'LinkButton';
