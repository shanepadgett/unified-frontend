// Feature Flag model
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: string; // dev/staging/prod
  lastModified: Date;
  owner: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: Date;
}

// Create Feature Flag DTO
export interface CreateFeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  environment: string;
  owner: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: string;
}

// Update Feature Flag DTO
export interface UpdateFeatureFlag {
  name?: string;
  description?: string;
  enabled?: boolean;
  environment?: string;
  owner?: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: string;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validation function for CreateFeatureFlag
export function validateCreateFeatureFlag(data: unknown): ValidationResult {
  const errors: string[] = [];

  // Type guard to check if data is a record
  if (!data || typeof data !== 'object') {
    errors.push("Data must be an object");
    return { isValid: false, errors };
  }

  // Cast data to a record with string keys
  const record = data as Record<string, unknown>;

  // Required fields
  if (!record.name) errors.push("Name is required");
  if (!record.description) errors.push("Description is required");
  if (record.enabled === undefined) errors.push("Enabled status is required");
  if (!record.environment) errors.push("Environment is required");
  if (!record.owner) errors.push("Owner is required");

  // Type validation
  if (record.name && typeof record.name !== "string") errors.push("Name must be a string");
  if (record.description && typeof record.description !== "string") errors.push("Description must be a string");
  if (record.enabled !== undefined && typeof record.enabled !== "boolean") errors.push("Enabled must be a boolean");
  if (record.environment && typeof record.environment !== "string") errors.push("Environment must be a string");
  if (record.owner && typeof record.owner !== "string") errors.push("Owner must be a string");

  // Optional fields validation
  if (record.rolloutPercentage !== undefined) {
    if (typeof record.rolloutPercentage !== "number") {
      errors.push("Rollout percentage must be a number");
    } else if (record.rolloutPercentage < 0 || record.rolloutPercentage > 100) {
      errors.push("Rollout percentage must be between 0 and 100");
    }
  }

  if (record.dependencies !== undefined) {
    if (!Array.isArray(record.dependencies)) {
      errors.push("Dependencies must be an array");
    } else {
      // Check if all items in the array are strings
      const allStrings = (record.dependencies as unknown[]).every(item => typeof item === 'string');
      if (!allStrings) {
        errors.push("All dependencies must be strings");
      }
    }
  }

  if (record.expiresAt !== undefined) {
    if (typeof record.expiresAt !== 'string') {
      errors.push("Expires at must be a string");
    } else {
      try {
        new Date(record.expiresAt);
      } catch (_e) {
        errors.push("Expires at must be a valid date string");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validation function for UpdateFeatureFlag
export function validateUpdateFeatureFlag(data: unknown): ValidationResult {
  const errors: string[] = [];

  // Type guard to check if data is a record
  if (!data || typeof data !== 'object') {
    errors.push("Data must be an object");
    return { isValid: false, errors };
  }

  // Cast data to a record with string keys
  const record = data as Record<string, unknown>;

  // Type validation for optional fields
  if (record.name !== undefined && typeof record.name !== "string") errors.push("Name must be a string");
  if (record.description !== undefined && typeof record.description !== "string") errors.push("Description must be a string");
  if (record.enabled !== undefined && typeof record.enabled !== "boolean") errors.push("Enabled must be a boolean");
  if (record.environment !== undefined && typeof record.environment !== "string") errors.push("Environment must be a string");
  if (record.owner !== undefined && typeof record.owner !== "string") errors.push("Owner must be a string");

  if (record.rolloutPercentage !== undefined) {
    if (typeof record.rolloutPercentage !== "number") {
      errors.push("Rollout percentage must be a number");
    } else if (record.rolloutPercentage < 0 || record.rolloutPercentage > 100) {
      errors.push("Rollout percentage must be between 0 and 100");
    }
  }

  if (record.dependencies !== undefined) {
    if (!Array.isArray(record.dependencies)) {
      errors.push("Dependencies must be an array");
    } else {
      // Check if all items in the array are strings
      const allStrings = (record.dependencies as unknown[]).every(item => typeof item === 'string');
      if (!allStrings) {
        errors.push("All dependencies must be strings");
      }
    }
  }

  if (record.expiresAt !== undefined) {
    if (typeof record.expiresAt !== 'string') {
      errors.push("Expires at must be a string");
    } else {
      try {
        new Date(record.expiresAt);
      } catch (_e) {
        errors.push("Expires at must be a valid date string");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
