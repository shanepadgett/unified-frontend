import { forwardRef, useId } from "react";
import { ToggleProps } from "./types";
import { twMerge } from "tailwind-merge";

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      size = "md",
      checked = false,
      onChange,
      disabled = false,
      helperText,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const toggleId = id || useId();

    // Size styles for the toggle
    const toggleSizeStyles = {
      sm: "w-8 h-4",
      md: "w-10 h-5",
      lg: "w-12 h-6",
    };

    // Size styles for the toggle handle
    const handleSizeStyles = {
      sm: "w-3 h-3 translate-x-0.5 checked:translate-x-4",
      md: "w-4 h-4 translate-x-0.5 checked:translate-x-5",
      lg: "w-5 h-5 translate-x-0.5 checked:translate-x-6",
    };

    // Label size styles
    const labelSizeStyles = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    // Handle the change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked);
      }
    };

    return (
      <div className={twMerge("flex flex-col", className)}>
        <div className="flex items-center">
          <div className="relative inline-block">
            <input
              ref={ref}
              type="checkbox"
              id={toggleId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className={twMerge(
                "sr-only",
                disabled && "cursor-not-allowed"
              )}
              {...props}
            />
            <label
              htmlFor={toggleId}
              className={twMerge(
                "block rounded-full cursor-pointer transition-colors",
                toggleSizeStyles[size],
                checked
                  ? "bg-primary-600"
                  : "bg-gray-200 dark:bg-gray-700",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span
                className={twMerge(
                  "block rounded-full bg-white transform transition-transform shadow",
                  handleSizeStyles[size]
                )}
              />
            </label>
          </div>

          {label && (
            <label
              htmlFor={toggleId}
              className={twMerge(
                "ml-2 font-medium text-gray-700 dark:text-gray-300 cursor-pointer",
                labelSizeStyles[size],
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
        </div>

        {helperText && (
          <p
            className={twMerge(
              "mt-1 text-gray-500 dark:text-gray-400",
              labelSizeStyles[size]
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
