// Environment interface matching the server model
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
