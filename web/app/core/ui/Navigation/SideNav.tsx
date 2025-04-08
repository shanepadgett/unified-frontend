import { forwardRef } from "react";
import { SideNavProps } from "./types";
import { twMerge } from "tailwind-merge";

const SideNav = forwardRef<HTMLElement, SideNavProps>(
  (
    {
      children,
      collapsed = false,
      width = "64",
      collapsedWidth = "16",
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out dark:bg-dark-800 dark:border-dark-600";
    
    // Width styles
    const widthStyles = collapsed
      ? `w-${collapsedWidth}`
      : `w-${width}`;
    
    // Combine all styles
    const sideNavStyles = twMerge(
      baseStyles,
      widthStyles,
      className
    );
    
    return (
      <aside ref={ref} className={sideNavStyles} {...props}>
        <div className="h-full overflow-y-auto py-4">
          {children}
        </div>
      </aside>
    );
  }
);

SideNav.displayName = "SideNav";

export default SideNav;
