import { forwardRef } from "react";
import { GridProps } from "./types";
import { twMerge } from "tailwind-merge";

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      cols = 1,
      colsMd,
      colsLg,
      colsXl,
      gap = "md",
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "grid";
    
    // Columns styles
    const getColsClass = (cols: number) => {
      return `grid-cols-${cols}`;
    };
    
    // Responsive columns
    const colsStyles = getColsClass(cols);
    const colsMdStyles = colsMd ? `md:${getColsClass(colsMd)}` : "";
    const colsLgStyles = colsLg ? `lg:${getColsClass(colsLg)}` : "";
    const colsXlStyles = colsXl ? `xl:${getColsClass(colsXl)}` : "";
    
    // Gap styles
    const gapStyles = {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };
    
    // Combine all styles
    const gridStyles = twMerge(
      baseStyles,
      colsStyles,
      colsMdStyles,
      colsLgStyles,
      colsXlStyles,
      gapStyles[gap],
      className
    );
    
    return (
      <div ref={ref} className={gridStyles} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export default Grid;
