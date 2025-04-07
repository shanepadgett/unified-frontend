import { HTMLAttributes, ReactNode } from "react";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: ReactNode;
  
  /**
   * Card padding
   * @default "md"
   */
  padding?: CardPadding;
  
  /**
   * Whether to add a hover effect to the card
   * @default false
   */
  hoverable?: boolean;
  
  /**
   * Whether the card has a border
   * @default true
   */
  bordered?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Header content
   */
  children: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Body content
   */
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children: ReactNode;
}
