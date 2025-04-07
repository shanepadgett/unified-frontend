import { HTMLAttributes, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
export type SpacingSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type Direction = "row" | "column";
export type Alignment = "start" | "center" | "end" | "stretch";
export type Distribution = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Container content
   */
  children: ReactNode;
  
  /**
   * Container size
   * @default "lg"
   */
  size?: ContainerSize;
  
  /**
   * Whether to add padding to the container
   * @default true
   */
  padding?: boolean;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Stack content
   */
  children: ReactNode;
  
  /**
   * Direction of the stack
   * @default "column"
   */
  direction?: Direction;
  
  /**
   * Spacing between items
   * @default "md"
   */
  spacing?: SpacingSize;
  
  /**
   * Alignment of items along the cross axis
   * @default "stretch"
   */
  align?: Alignment;
  
  /**
   * Distribution of items along the main axis
   * @default "start"
   */
  justify?: Distribution;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Grid content
   */
  children: ReactNode;
  
  /**
   * Number of columns on mobile
   * @default 1
   */
  cols?: number;
  
  /**
   * Number of columns on tablet (md)
   */
  colsMd?: number;
  
  /**
   * Number of columns on desktop (lg)
   */
  colsLg?: number;
  
  /**
   * Number of columns on large desktop (xl)
   */
  colsXl?: number;
  
  /**
   * Gap between grid items
   * @default "md"
   */
  gap?: SpacingSize;
}
