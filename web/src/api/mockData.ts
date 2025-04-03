import { FeatureFlag } from './featureFlags';

export const mockFeatureFlags: FeatureFlag[] = [
  {
    id: '1',
    name: 'New Dashboard',
    description: 'Enable the new dashboard experience',
    enabled: true,
    environment: 'development',
  },
  {
    id: '2',
    name: 'Advanced Analytics',
    description: 'Enable advanced analytics features',
    enabled: false,
    environment: 'development',
  },
  {
    id: '3',
    name: 'Beta Features',
    description: 'Enable beta features for testing',
    enabled: true,
    environment: 'development',
  },
  {
    id: '4',
    name: 'New Dashboard',
    description: 'Enable the new dashboard experience',
    enabled: false,
    environment: 'staging',
  },
  {
    id: '5',
    name: 'Advanced Analytics',
    description: 'Enable advanced analytics features',
    enabled: true,
    environment: 'staging',
  },
  {
    id: '6',
    name: 'Beta Features',
    description: 'Enable beta features for testing',
    enabled: false,
    environment: 'staging',
  },
  {
    id: '7',
    name: 'New Dashboard',
    description: 'Enable the new dashboard experience',
    enabled: false,
    environment: 'production',
  },
  {
    id: '8',
    name: 'Advanced Analytics',
    description: 'Enable advanced analytics features',
    enabled: false,
    environment: 'production',
  },
  {
    id: '9',
    name: 'Beta Features',
    description: 'Enable beta features for testing',
    enabled: false,
    environment: 'production',
  },
];
