import { forwardRef } from "react";
import { CardBodyProps, CardFooterProps, CardHeaderProps, CardProps } from "./types";
import { twMerge } from "tailwind-merge";

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      padding = "md",
      hoverable = false,
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "bg-white rounded-lg shadow-sm dark:bg-dark-800";
    
    // Border styles
    const borderStyles = bordered ? "border border-gray-200 dark:border-dark-600" : "";
    
    // Hover styles
    const hoverStyles = hoverable
      ? "transition-shadow hover:shadow-md"
      : "";
    
    // Padding styles
    const paddingStyles = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };
    
    // Combine all styles
    const cardStyles = twMerge(
      baseStyles,
      borderStyles,
      hoverStyles,
      paddingStyles[padding],
      className
    );
    
    return (
      <div ref={ref} className={cardStyles} {...props}>
        {children}
      </div>
    );
  }
);

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const headerStyles = twMerge(
      "px-6 py-4 border-b border-gray-200 dark:border-dark-600",
      className
    );
    
    return (
      <div ref={ref} className={headerStyles} {...props}>
        {children}
      </div>
    );
  }
);

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    const bodyStyles = twMerge("p-6", className);
    
    return (
      <div ref={ref} className={bodyStyles} {...props}>
        {children}
      </div>
    );
  }
);

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    const footerStyles = twMerge(
      "px-6 py-4 border-t border-gray-200 dark:border-dark-600",
      className
    );
    
    return (
      <div ref={ref} className={footerStyles} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
