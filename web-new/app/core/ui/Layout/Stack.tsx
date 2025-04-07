import { forwardRef } from "react";
import { StackProps } from "./types";
import { twMerge } from "tailwind-merge";

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      direction = "column",
      spacing = "md",
      align = "stretch",
      justify = "start",
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "flex";
    
    // Direction styles
    const directionStyles = {
      row: "flex-row",
      column: "flex-col",
    };
    
    // Spacing styles
    const spacingStyles = {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };
    
    // Alignment styles
    const alignStyles = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };
    
    // Justify styles
    const justifyStyles = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };
    
    // Combine all styles
    const stackStyles = twMerge(
      baseStyles,
      directionStyles[direction],
      spacingStyles[spacing],
      alignStyles[align],
      justifyStyles[justify],
      className
    );
    
    return (
      <div ref={ref} className={stackStyles} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export default Stack;
