import { InputHTMLAttributes } from "react";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Toggle label
   */
  label?: string;
  
  /**
   * Toggle size
   * @default "md"
   */
  size?: ToggleSize;
  
  /**
   * Whether the toggle is checked
   */
  checked?: boolean;
  
  /**
   * Callback when the toggle state changes
   */
  onChange?: (checked: boolean) => void;
  
  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Helper text to display below the toggle
   */
  helperText?: string;
}
