import React from 'react';
import { Toggle } from '@features/shared/components';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  isLoading = false,
  disabled = false,
  label,
  className
}: ToggleSwitchProps) {
  return (
    <Toggle
      checked={checked}
      onChange={onChange}
      isLoading={isLoading}
      disabled={disabled}
      label={label}
      className={className}
    />
  );
}
