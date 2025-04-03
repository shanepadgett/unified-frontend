import React from 'react';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge variant that determines the visual style
   * @default 'default'
   */
  variant?: BadgeVariant;
  
  /**
   * Badge size
   * @default 'md'
   */
  size?: BadgeSize;
  
  /**
   * Whether the badge is rounded (pill shape)
   * @default true
   */
  rounded?: boolean;
  
  /**
   * Icon to display before the badge text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display after the badge text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Badge/Pill component for displaying status or categories
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      rounded = true,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles for the badge
    const baseStyles = "inline-flex items-center font-medium";
    
    // Variant styles
    const variantStyles = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      primary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      secondary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    };
    
    // Size styles
    const sizeStyles = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm"
    };
    
    // Rounded styles
    const roundedStyles = rounded ? "rounded-full" : "rounded";
    
    // Combine all styles
    const badgeStyles = twMerge(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      roundedStyles,
      className
    );
    
    return (
      <span
        ref={ref}
        className={badgeStyles}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
