import { HTMLAttributes, ReactNode } from "react";

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  /**
   * NavBar content
   */
  children: ReactNode;
  
  /**
   * Whether the navbar is fixed to the top
   * @default false
   */
  fixed?: boolean;
  
  /**
   * Brand/logo element
   */
  brand?: ReactNode;
}

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  /**
   * SideNav content
   */
  children: ReactNode;
  
  /**
   * Whether the sidenav is collapsed
   * @default false
   */
  collapsed?: boolean;
  
  /**
   * Width of the expanded sidenav
   * @default "64"
   */
  width?: string;
  
  /**
   * Width of the collapsed sidenav
   * @default "16"
   */
  collapsedWidth?: string;
}

export interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * NavItem content
   */
  children: ReactNode;
  
  /**
   * Whether the item is active
   * @default false
   */
  active?: boolean;
  
  /**
   * Icon to display
   */
  icon?: ReactNode;
  
  /**
   * Link href
   */
  href: string;
  
  /**
   * Whether to open the link in a new tab
   * @default false
   */
  external?: boolean;
}
