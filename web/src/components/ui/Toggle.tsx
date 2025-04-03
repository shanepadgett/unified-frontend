import React from 'react';
import { Switch } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

export interface ToggleProps {
  /**
   * Whether the toggle is checked/enabled
   */
  checked: boolean;

  /**
   * Callback function when the toggle state changes
   */
  onChange: (checked: boolean) => void;

  /**
   * Whether the toggle is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Label to display next to the toggle
   */
  label?: string;

  /**
   * Screen reader label for accessibility
   * @default 'Toggle'
   */
  srLabel?: string;

  /**
   * Position of the label relative to the toggle
   * @default 'left'
   */
  labelPosition?: 'left' | 'right';

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes to apply to the toggle
   */
  className?: string;
}

/**
 * Toggle/Switch component for boolean inputs
 */
export function Toggle({
  checked,
  onChange,
  isLoading = false,
  label,
  srLabel = 'Toggle',
  labelPosition = 'left',
  disabled = false,
  className,
}: ToggleProps) {
  const isDisabled = disabled || isLoading;

  const toggleBaseStyles = "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2";
  const toggleEnabledStyles = checked ? "bg-primary-600" : "bg-gray-200 dark:bg-gray-700";
  const toggleDisabledStyles = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  const toggleStyles = twMerge(
    toggleBaseStyles,
    toggleEnabledStyles,
    toggleDisabledStyles,
    className
  );

  const knobBaseStyles = "inline-block h-4 w-4 transform rounded-full bg-white transition-transform";
  const knobPositionStyles = checked ? "translate-x-6" : "translate-x-1";
  const knobLoadingStyles = isLoading ? "animate-pulse" : "";

  const knobStyles = twMerge(
    knobBaseStyles,
    knobPositionStyles,
    knobLoadingStyles
  );

  return (
    <Switch.Group>
      <div className="flex items-center">
        {label && labelPosition === 'left' && (
          <Switch.Label className="mr-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
          className={toggleStyles}
        >
          <span className="sr-only">{srLabel}</span>
          <span className={knobStyles} />
        </Switch>
        {label && labelPosition === 'right' && (
          <Switch.Label className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </Switch.Label>
        )}
      </div>
    </Switch.Group>
  );
}

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;

  /**
   * Callback function when the checkbox state changes
   */
  onChange: (checked: boolean) => void;

  /**
   * Label to display next to the checkbox
   */
  label?: string;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * ID for the checkbox input
   */
  id?: string;

  /**
   * Additional CSS classes to apply to the checkbox
   */
  className?: string;

  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
}

/**
 * Checkbox component for boolean inputs
 */
export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className,
  helperText,
}: CheckboxProps) {
  // Generate a unique ID if none is provided
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  const checkboxBaseStyles = "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600";
  const checkboxDisabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const checkboxStyles = twMerge(
    checkboxBaseStyles,
    checkboxDisabledStyles,
    className
  );

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={checkboxStyles}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label htmlFor={checkboxId} className="font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        {helperText && (
          <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    </div>
  );
}
