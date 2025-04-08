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
      md: "w-11 h-6",
      lg: "w-14 h-7",
    };

    // Size styles for the toggle handle
    const handleSizeStyles = {
      sm: { width: "0.75rem", height: "0.75rem", translateOff: "0.125rem", translateOn: "1rem" },
      md: { width: "1rem", height: "1rem", translateOff: "0.25rem", translateOn: "1.5rem" },
      lg: { width: "1.25rem", height: "1.25rem", translateOff: "0.25rem", translateOn: "2.25rem" },
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
                "relative inline-flex items-center rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
                toggleSizeStyles[size],
                checked
                  ? "bg-primary-600"
                  : "bg-gray-200 dark:bg-gray-700",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span
                className="inline-block rounded-full bg-white transform transition-transform shadow"
                style={{
                  width: handleSizeStyles[size].width,
                  height: handleSizeStyles[size].height,
                  transform: `translateX(${checked ? handleSizeStyles[size].translateOn : handleSizeStyles[size].translateOff})`
                }}
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
