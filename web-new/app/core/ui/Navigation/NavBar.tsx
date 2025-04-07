import { forwardRef } from "react";
import { NavBarProps } from "./types";
import { twMerge } from "tailwind-merge";

const NavBar = forwardRef<HTMLElement, NavBarProps>(
  (
    {
      children,
      fixed = false,
      brand,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "bg-white border-b border-gray-200 dark:bg-dark-800 dark:border-dark-600";
    
    // Position styles
    const positionStyles = fixed
      ? "fixed top-0 left-0 right-0 z-10"
      : "relative";
    
    // Combine all styles
    const navBarStyles = twMerge(
      baseStyles,
      positionStyles,
      className
    );
    
    return (
      <nav ref={ref} className={navBarStyles} {...props}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {brand && (
              <div className="flex-shrink-0">
                {brand}
              </div>
            )}
            <div className="flex items-center justify-between w-full">
              {children}
            </div>
          </div>
        </div>
      </nav>
    );
  }
);

NavBar.displayName = "NavBar";

export default NavBar;
