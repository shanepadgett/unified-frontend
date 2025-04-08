/**
 * Environment configuration for client-side code
 *
 * This file contains environment-specific configuration that is safe to use in client-side code.
 */

import { Environment, EnvironmentConfig } from './config';

// Default configuration values for client
const clientConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3002/api',
  environment: Environment.Development,
};

/**
 * Get the current environment configuration for client-side code
 */
export function getClientEnvironmentConfig(): EnvironmentConfig {
  return clientConfig;
}
