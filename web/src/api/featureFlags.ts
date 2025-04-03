import { mockFeatureFlags } from './mockData.ts';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: 'development' | 'staging' | 'production';
}

// In-memory store for mock data
let featureFlags = [...mockFeatureFlags];

// Mock API functions without using createServerFn for simplicity
export const getFeatureFlags = () => {
  return Promise.resolve(featureFlags);
};

export const toggleFeatureFlag = ({ data }: { data: { id: string; enabled: boolean } }) => {
  if (!data) {
    throw new Error('Missing data for toggle feature flag');
  }

  // Find and update the flag in our mock data
  const flagIndex = featureFlags.findIndex(flag => flag.id === data.id);
  if (flagIndex === -1) {
    throw new Error(`Feature flag with id ${data.id} not found`);
  }

  // Update the flag
  const updatedFlag = {
    ...featureFlags[flagIndex],
    enabled: data.enabled
  };

  // Update the in-memory store
  featureFlags = [
    ...featureFlags.slice(0, flagIndex),
    updatedFlag,
    ...featureFlags.slice(flagIndex + 1)
  ];

  return Promise.resolve(updatedFlag);
};
