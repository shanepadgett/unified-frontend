import { CreateEnvironment, UpdateEnvironment } from "../models/environment.model.ts";
import { BadRequestError } from "../../../core/errors/base-error.ts";

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates a CreateEnvironment DTO
 * @param data The data to validate
 * @returns Validation result
 */
export function validateCreateEnvironment(data: unknown): ValidationResult {
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

  // Type validation
  if (record.name && typeof record.name !== "string") errors.push("Name must be a string");
  if (record.description && typeof record.description !== "string") errors.push("Description must be a string");
  if (record.isDefault !== undefined && typeof record.isDefault !== "boolean") errors.push("isDefault must be a boolean");

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates an UpdateEnvironment DTO
 * @param data The data to validate
 * @returns Validation result
 */
export function validateUpdateEnvironment(data: unknown): ValidationResult {
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
  if (record.isDefault !== undefined && typeof record.isDefault !== "boolean") errors.push("isDefault must be a boolean");

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a CreateEnvironment DTO and throws a BadRequestError if invalid
 * @param data The data to validate
 * @returns The validated data as CreateEnvironment
 * @throws BadRequestError if validation fails
 */
export function validateAndParseCreateEnvironment(data: unknown): CreateEnvironment {
  const validation = validateCreateEnvironment(data);
  if (!validation.isValid) {
    throw new BadRequestError("Validation failed", validation.errors);
  }
  return data as CreateEnvironment;
}

/**
 * Validates an UpdateEnvironment DTO and throws a BadRequestError if invalid
 * @param data The data to validate
 * @returns The validated data as UpdateEnvironment
 * @throws BadRequestError if validation fails
 */
export function validateAndParseUpdateEnvironment(data: unknown): UpdateEnvironment {
  const validation = validateUpdateEnvironment(data);
  if (!validation.isValid) {
    throw new BadRequestError("Validation failed", validation.errors);
  }
  return data as UpdateEnvironment;
}
