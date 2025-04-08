import { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Input label
   */
  label?: string;
  
  /**
   * Input size
   * @default "md"
   */
  size?: InputSize;
  
  /**
   * Input variant
   * @default "outline"
   */
  variant?: InputVariant;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Icon to display at the start of the input
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the input takes the full width of its container
   * @default true
   */
  fullWidth?: boolean;
}
