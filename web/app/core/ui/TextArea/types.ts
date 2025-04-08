import { TextareaHTMLAttributes } from "react";

export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaVariant = "outline" | "filled";

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * TextArea label
   */
  label?: string;
  
  /**
   * TextArea size
   * @default "md"
   */
  size?: TextAreaSize;
  
  /**
   * TextArea variant
   * @default "outline"
   */
  variant?: TextAreaVariant;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  
  /**
   * Whether the textarea takes the full width of its container
   * @default true
   */
  fullWidth?: boolean;
}
