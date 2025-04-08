import { ReactNode } from "react";

export interface SelectOption {
  /**
   * Unique identifier for the option
   */
  id: string;

  /**
   * Display name for the option
   */
  name: string;

  /**
   * Optional icon to display with the option
   */
  icon?: ReactNode;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * Array of options to display in the select
   */
  options: SelectOption[];

  /**
   * Currently selected option
   */
  value: SelectOption;

  /**
   * Callback function when the selection changes
   */
  onChange: (option: SelectOption) => void;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Helper text to display below the select
   */
  helperText?: string;

  /**
   * Error message to display below the select
   */
  errorText?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;

  /**
   * Additional CSS classes to apply to the select
   */
  className?: string;
}

export interface NativeSelectProps {
  /**
   * Array of options to display in the select
   */
  options: SelectOption[];

  /**
   * Currently selected option ID
   */
  value: string;

  /**
   * Callback function when the selection changes
   */
  onChange: (value: string) => void;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Helper text to display below the select
   */
  helperText?: string;

  /**
   * Error message to display below the select
   */
  errorText?: string;

  /**
   * Whether the select has an error
   * @default false
   */
  hasError?: boolean;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes to apply to the select
   */
  className?: string;
}
