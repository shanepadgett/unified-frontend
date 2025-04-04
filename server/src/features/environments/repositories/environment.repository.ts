import { Environment, CreateEnvironment, UpdateEnvironment } from "../models/environment.model.ts";
import { NotFoundError, ConflictError } from "../../../core/errors/base-error.ts";

/**
 * Repository for environments
 * Handles data access operations for environments
 */
export class EnvironmentRepository {
  private environments: Map<string, Environment> = new Map();

  /**
   * Initializes the repository with seed data
   */
  constructor() {
    this.seedData();
  }

  /**
   * Seeds the repository with initial data
   */
  private seedData(): void {
    const seedEnvironments: Environment[] = [
      {
        id: crypto.randomUUID(),
        name: "development",
        description: "Development environment for testing new features",
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: "staging",
        description: "Staging environment for pre-production testing",
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: "production",
        description: "Production environment for live application",
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    seedEnvironments.forEach((env) => {
      this.environments.set(env.id, env);
    });
  }

  /**
   * Finds all environments
   * @returns Array of all environments
   */
  findAll(): Environment[] {
    return Array.from(this.environments.values());
  }

  /**
   * Finds an environment by ID
   * @param id The environment ID
   * @returns The environment or null if not found
   */
  findById(id: string): Environment | null {
    return this.environments.get(id) || null;
  }

  /**
   * Finds the default environment
   * @returns The default environment or null if none is set
   */
  findDefault(): Environment | null {
    return this.findAll().find((env) => env.isDefault) || null;
  }

  /**
   * Creates a new environment
   * @param createEnvDto The environment data
   * @returns The created environment
   */
  create(createEnvDto: CreateEnvironment): Environment {
    // If this environment is set as default, unset any existing default
    if (createEnvDto.isDefault) {
      this.unsetDefaultEnvironment();
    }

    const newEnvironment: Environment = {
      id: crypto.randomUUID(),
      ...createEnvDto,
      isDefault: createEnvDto.isDefault || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.environments.set(newEnvironment.id, newEnvironment);
    return newEnvironment;
  }

  /**
   * Updates an environment
   * @param id The environment ID
   * @param updateEnvDto The update data
   * @returns The updated environment
   * @throws NotFoundError if the environment is not found
   */
  update(id: string, updateEnvDto: UpdateEnvironment): Environment {
    const existingEnv = this.findById(id);
    if (!existingEnv) {
      throw new NotFoundError(`Environment with ID ${id} not found`);
    }
    
    // If this environment is being set as default, unset any existing default
    if (updateEnvDto.isDefault && !existingEnv.isDefault) {
      this.unsetDefaultEnvironment();
    }

    const updatedEnv: Environment = {
      ...existingEnv,
      ...updateEnvDto,
      updatedAt: new Date(),
    };

    this.environments.set(id, updatedEnv);
    return updatedEnv;
  }

  /**
   * Removes an environment
   * @param id The environment ID
   * @returns true if the environment was removed
   * @throws ConflictError if trying to remove the default environment
   */
  remove(id: string): boolean {
    const env = this.findById(id);
    
    // Don't allow removing the default environment
    if (env && env.isDefault) {
      throw new ConflictError("Cannot remove the default environment");
    }
    
    return this.environments.delete(id);
  }

  /**
   * Unsets the default environment
   */
  private unsetDefaultEnvironment(): void {
    const defaultEnv = this.findDefault();
    if (defaultEnv) {
      const updated = { ...defaultEnv, isDefault: false, updatedAt: new Date() };
      this.environments.set(defaultEnv.id, updated);
    }
  }
}

// Create a singleton instance
export const environmentRepository = new EnvironmentRepository();
