import { Environment, CreateEnvironment, UpdateEnvironment } from "../models/environment.model.ts";
import { environmentRepository, EnvironmentRepository } from "../repositories/environment.repository.ts";
import { NotFoundError } from "../../../core/errors/base-error.ts";

/**
 * Service for environments
 * Handles business logic for environments
 */
export class EnvironmentService {
  constructor(private repository: EnvironmentRepository) {}

  /**
   * Gets all environments
   * @returns Array of all environments
   */
  findAll(): Environment[] {
    return this.repository.findAll();
  }

  /**
   * Gets an environment by ID
   * @param id The environment ID
   * @returns The environment
   * @throws NotFoundError if the environment is not found
   */
  findOne(id: string): Environment {
    const environment = this.repository.findById(id);
    if (!environment) {
      throw new NotFoundError(`Environment with ID ${id} not found`);
    }
    return environment;
  }

  /**
   * Gets the default environment
   * @returns The default environment
   * @throws NotFoundError if no default environment is set
   */
  findDefault(): Environment {
    const defaultEnv = this.repository.findDefault();
    if (!defaultEnv) {
      throw new NotFoundError("No default environment found");
    }
    return defaultEnv;
  }

  /**
   * Creates a new environment
   * @param createEnvDto The environment data
   * @returns The created environment
   */
  create(createEnvDto: CreateEnvironment): Environment {
    return this.repository.create(createEnvDto);
  }

  /**
   * Updates an environment
   * @param id The environment ID
   * @param updateEnvDto The update data
   * @returns The updated environment
   * @throws NotFoundError if the environment is not found
   */
  update(id: string, updateEnvDto: UpdateEnvironment): Environment {
    return this.repository.update(id, updateEnvDto);
  }

  /**
   * Removes an environment
   * @param id The environment ID
   * @returns true if the environment was removed
   * @throws NotFoundError if the environment is not found
   */
  remove(id: string): boolean {
    const environment = this.repository.findById(id);
    if (!environment) {
      throw new NotFoundError(`Environment with ID ${id} not found`);
    }
    return this.repository.remove(id);
  }
}

// Create a singleton instance
export const environmentService = new EnvironmentService(environmentRepository);
