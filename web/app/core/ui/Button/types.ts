import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Button variant
   * @default "primary"
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default "md"
   */
  size?: ButtonSize;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the button takes the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}
