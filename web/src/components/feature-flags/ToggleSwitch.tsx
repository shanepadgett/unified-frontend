import React from 'react';
import { Toggle } from '../../components/ui/Toggle.tsx';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  loading?: boolean;
  label?: string;
  srLabel?: string;
}

export function ToggleSwitch({
  enabled,
  onChange,
  loading = false,
  label,
  srLabel = 'Toggle',
}: ToggleSwitchProps) {
  return (
    <Toggle
      checked={enabled}
      onChange={onChange}
      isLoading={loading}
      label={label}
      srLabel={srLabel}
      labelPosition="left"
    />
  );
}
