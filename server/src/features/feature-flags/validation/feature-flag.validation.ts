import { CreateFeatureFlag, UpdateFeatureFlag } from "../models/feature-flag.model.ts";
import { BadRequestError } from "../../../core/errors/base-error.ts";

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates a CreateFeatureFlag DTO
 * @param data The data to validate
 * @returns Validation result
 */
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

/**
 * Validates an UpdateFeatureFlag DTO
 * @param data The data to validate
 * @returns Validation result
 */
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

/**
 * Validates a CreateFeatureFlag DTO and throws a BadRequestError if invalid
 * @param data The data to validate
 * @returns The validated data as CreateFeatureFlag
 * @throws BadRequestError if validation fails
 */
export function validateAndParseCreateFeatureFlag(data: unknown): CreateFeatureFlag {
  const validation = validateCreateFeatureFlag(data);
  if (!validation.isValid) {
    throw new BadRequestError("Validation failed", validation.errors);
  }
  return data as CreateFeatureFlag;
}

/**
 * Validates an UpdateFeatureFlag DTO and throws a BadRequestError if invalid
 * @param data The data to validate
 * @returns The validated data as UpdateFeatureFlag
 * @throws BadRequestError if validation fails
 */
export function validateAndParseUpdateFeatureFlag(data: unknown): UpdateFeatureFlag {
  const validation = validateUpdateFeatureFlag(data);
  if (!validation.isValid) {
    throw new BadRequestError("Validation failed", validation.errors);
  }
  return data as UpdateFeatureFlag;
}
