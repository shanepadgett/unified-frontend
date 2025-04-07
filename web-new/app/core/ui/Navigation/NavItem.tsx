import { forwardRef } from "react";
import { NavItemProps } from "./types";
import { twMerge } from "tailwind-merge";
import { Link } from "@remix-run/react";

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    {
      children,
      active = false,
      icon,
      href,
      external = false,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "flex items-center px-4 py-2 text-sm font-medium transition-colors";
    
    // Active styles
    const activeStyles = active
      ? "text-primary-600 bg-primary-600/10 dark:bg-primary-600/20"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700";
    
    // Combine all styles
    const navItemStyles = twMerge(
      baseStyles,
      activeStyles,
      className
    );
    
    // External link
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={navItemStyles}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {icon && <span className="mr-3">{icon}</span>}
          {children}
        </a>
      );
    }
    
    // Internal link (using Remix Link)
    return (
      <Link
        ref={ref}
        to={href}
        className={navItemStyles}
        {...props}
      >
        {icon && <span className="mr-3">{icon}</span>}
        {children}
      </Link>
    );
  }
);

NavItem.displayName = "NavItem";

export default NavItem;
