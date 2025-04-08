import { forwardRef } from "react";
import { ContainerProps } from "./types";
import { twMerge } from "tailwind-merge";

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = "lg",
      padding = true,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "mx-auto";
    
    // Size styles
    const sizeStyles = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "w-full",
    };
    
    // Padding styles
    const paddingStyles = padding ? "px-4 sm:px-6 lg:px-8" : "";
    
    // Combine all styles
    const containerStyles = twMerge(
      baseStyles,
      sizeStyles[size],
      paddingStyles,
      className
    );
    
    return (
      <div ref={ref} className={containerStyles} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
