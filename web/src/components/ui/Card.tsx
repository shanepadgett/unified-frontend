import React from 'react';
import { twMerge } from 'tailwind-merge';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant that determines the visual style
   * @default 'default'
   */
  variant?: CardVariant;
  
  /**
   * Whether to add padding inside the card
   * @default true
   */
  withPadding?: boolean;
  
  /**
   * Card header content
   */
  header?: React.ReactNode;
  
  /**
   * Card footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Whether the card is clickable/interactive
   * @default false
   */
  isClickable?: boolean;
  
  /**
   * URL to navigate to when the card is clicked
   * Only applicable when isClickable is true
   */
  to?: string;
  
  /**
   * Function to call when the card is clicked
   * Only applicable when isClickable is true
   */
  onClick?: () => void;
}

/**
 * Card component for containing content
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      withPadding = true,
      header,
      footer,
      isClickable = false,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles for the card
    const baseStyles = "rounded-lg";
    
    // Variant styles
    const variantStyles = {
      default: "bg-white dark:bg-gray-800 shadow",
      elevated: "bg-white dark:bg-gray-800 shadow-md",
      outlined: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      interactive: "bg-white dark:bg-gray-800 shadow group hover:shadow-md transition-shadow"
    };
    
    // Padding styles
    const paddingStyles = withPadding ? "p-4" : "";
    
    // Interactive styles
    const interactiveStyles = isClickable 
      ? "cursor-pointer relative" 
      : "";
    
    // Combine all styles
    const cardStyles = twMerge(
      baseStyles,
      variantStyles[variant],
      paddingStyles,
      interactiveStyles,
      className
    );
    
    return (
      <div
        ref={ref}
        className={cardStyles}
        {...props}
      >
        {header && (
          <div className={`${withPadding ? '-mx-4 -mt-4 mb-4 px-4 py-3' : ''} border-b border-gray-200 dark:border-gray-700`}>
            {header}
          </div>
        )}
        {children}
        {footer && (
          <div className={`${withPadding ? '-mx-4 -mb-4 mt-4 px-4 py-3' : ''} border-t border-gray-200 dark:border-gray-700`}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title level (h1, h2, h3, etc.)
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Card title component
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  (
    {
      children,
      as = 'h3',
      className,
      ...props
    },
    ref
  ) => {
    const Component = as;
    
    const baseStyles = "font-medium text-gray-900 dark:text-white";
    const sizeStyles = {
      h1: "text-2xl",
      h2: "text-xl",
      h3: "text-lg",
      h4: "text-base",
      h5: "text-sm",
      h6: "text-xs"
    };
    
    const titleStyles = twMerge(
      baseStyles,
      sizeStyles[as],
      className
    );
    
    return (
      <Component
        ref={ref}
        className={titleStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card description component
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    const descriptionStyles = twMerge(
      "mt-1 text-sm text-gray-500 dark:text-gray-400",
      className
    );
    
    return (
      <p
        ref={ref}
        className={descriptionStyles}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card content component
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    const contentStyles = twMerge(
      "mt-2",
      className
    );
    
    return (
      <div
        ref={ref}
        className={contentStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment of the actions
   * @default 'right'
   */
  align?: 'left' | 'center' | 'right' | 'between';
}

/**
 * Card actions component for buttons and controls
 */
export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  (
    {
      children,
      align = 'right',
      className,
      ...props
    },
    ref
  ) => {
    const alignStyles = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between"
    };
    
    const actionsStyles = twMerge(
      "flex items-center mt-4 space-x-2",
      alignStyles[align],
      className
    );
    
    return (
      <div
        ref={ref}
        className={actionsStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'CardActions';
