/**
 * Environment model
 * Represents an environment in the system
 */
export interface Environment {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create Environment DTO
 * Data Transfer Object for creating a new environment
 */
export interface CreateEnvironment {
  name: string;
  description: string;
  isDefault?: boolean;
}

/**
 * Update Environment DTO
 * Data Transfer Object for updating an existing environment
 */
export interface UpdateEnvironment {
  name?: string;
  description?: string;
  isDefault?: boolean;
}
