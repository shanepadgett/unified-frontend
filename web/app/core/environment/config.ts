/**
 * Common environment configuration types
 */

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export interface EnvironmentConfig {
  apiUrl: string;
  environment: Environment;
}
