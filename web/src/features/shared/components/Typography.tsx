import React from 'react';
import { twMerge } from 'tailwind-merge';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextVariant = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level (h1, h2, h3, etc.)
   * @default 'h2'
   */
  as?: HeadingLevel;
  
  /**
   * Text variant that determines the color
   * @default 'default'
   */
  variant?: TextVariant;
}

/**
 * Heading component for titles and section headers
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      as = 'h2',
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const Component = as;
    
    const baseStyles = "font-medium";
    
    const sizeStyles = {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      h5: "text-base",
      h6: "text-sm"
    };
    
    const variantStyles = {
      default: "text-gray-900 dark:text-white",
      muted: "text-gray-600 dark:text-gray-400",
      primary: "text-indigo-600 dark:text-indigo-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      danger: "text-red-600 dark:text-red-400"
    };
    
    const headingStyles = twMerge(
      baseStyles,
      sizeStyles[as],
      variantStyles[variant],
      className
    );
    
    return (
      <Component
        ref={ref}
        className={headingStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Text variant that determines the color
   * @default 'default'
   */
  variant?: TextVariant;
  
  /**
   * Text size
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether the text is bold
   * @default false
   */
  bold?: boolean;
  
  /**
   * Whether the text is italic
   * @default false
   */
  italic?: boolean;
  
  /**
   * Whether to truncate the text with an ellipsis
   * @default false
   */
  truncate?: boolean;
}

/**
 * Text component for paragraphs and general text content
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      bold = false,
      italic = false,
      truncate = false,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "text-gray-900 dark:text-gray-100",
      muted: "text-gray-500 dark:text-gray-400",
      primary: "text-indigo-600 dark:text-indigo-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      danger: "text-red-600 dark:text-red-400"
    };
    
    const sizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    };
    
    const fontStyles = [
      bold ? "font-semibold" : "",
      italic ? "italic" : "",
      truncate ? "truncate" : ""
    ].filter(Boolean).join(" ");
    
    const textStyles = twMerge(
      variantStyles[variant],
      sizeStyles[size],
      fontStyles,
      className
    );
    
    return (
      <p
        ref={ref}
        className={textStyles}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Text variant that determines the color
   * @default 'default'
   */
  variant?: TextVariant;
  
  /**
   * Whether the label is required
   * @default false
   */
  required?: boolean;
}

/**
 * Label component for form fields
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      variant = 'default',
      required = false,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "text-gray-700 dark:text-gray-300",
      muted: "text-gray-500 dark:text-gray-400",
      primary: "text-indigo-600 dark:text-indigo-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      danger: "text-red-600 dark:text-red-400"
    };
    
    const labelStyles = twMerge(
      "block text-sm font-medium",
      variantStyles[variant],
      className
    );
    
    return (
      <label
        ref={ref}
        className={labelStyles}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';
