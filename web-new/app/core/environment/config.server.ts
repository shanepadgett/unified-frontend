/**
 * Environment configuration
 * 
 * This file contains environment-specific configuration that is only available on the server.
 * It should not be imported directly in client-side code.
 */

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

interface EnvironmentConfig {
  apiUrl: string;
  environment: Environment;
  isProduction: boolean;
  isDevelopment: boolean;
}

// Default configuration values
const defaultConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3001',
  environment: Environment.Development,
  isProduction: false,
  isDevelopment: true,
};

// Environment-specific configuration
const environmentConfigs: Record<Environment, Partial<EnvironmentConfig>> = {
  [Environment.Development]: {
    apiUrl: 'http://localhost:3001',
  },
  [Environment.Staging]: {
    apiUrl: 'https://api-staging.example.com',
    isProduction: false,
    isDevelopment: false,
  },
  [Environment.Production]: {
    apiUrl: 'https://api.example.com',
    isProduction: true,
    isDevelopment: false,
  },
};

/**
 * Get the current environment configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const environment = nodeEnv as Environment;
  
  // Merge default config with environment-specific config
  return {
    ...defaultConfig,
    ...environmentConfigs[environment],
    environment,
  };
}

/**
 * Get a specific environment variable
 */
export function getEnv(key: string): string | undefined {
  return process.env[key];
}
