// Environment model
export interface Environment {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create Environment DTO
export interface CreateEnvironment {
  name: string;
  description: string;
  isDefault?: boolean;
}

// Update Environment DTO
export interface UpdateEnvironment {
  name?: string;
  description?: string;
  isDefault?: boolean;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validation function for CreateEnvironment
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

// Validation function for UpdateEnvironment
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
