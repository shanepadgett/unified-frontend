import React from 'react';
import { Switch } from '@headlessui/react';

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
    <Switch.Group>
      <div className="flex items-center">
        {label && (
          <Switch.Label className="mr-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={onChange}
          disabled={loading}
          className={`${
            enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="sr-only">{srLabel}</span>
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              loading ? 'animate-pulse' : ''
            }`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
