import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from "../models/feature-flag.model.ts";
import { featureFlagRepository, FeatureFlagRepository } from "../repositories/feature-flag.repository.ts";
import { NotFoundError } from "../../../core/errors/base-error.ts";

/**
 * Service for feature flags
 * Handles business logic for feature flags
 */
export class FeatureFlagService {
  constructor(private repository: FeatureFlagRepository) {}

  /**
   * Gets all feature flags
   * @returns Array of all feature flags
   */
  findAll(): FeatureFlag[] {
    return this.repository.findAll();
  }

  /**
   * Gets a feature flag by ID
   * @param id The feature flag ID
   * @returns The feature flag
   * @throws NotFoundError if the feature flag is not found
   */
  findOne(id: string): FeatureFlag {
    const flag = this.repository.findById(id);
    if (!flag) {
      throw new NotFoundError(`Feature flag with ID ${id} not found`);
    }
    return flag;
  }

  /**
   * Gets feature flags by environment
   * @param environment The environment name
   * @returns Array of feature flags for the specified environment
   */
  findByEnvironment(environment: string): FeatureFlag[] {
    return this.repository.findByEnvironment(environment);
  }

  /**
   * Creates a new feature flag
   * @param createFlagDto The feature flag data
   * @returns The created feature flag
   */
  create(createFlagDto: CreateFeatureFlag): FeatureFlag {
    return this.repository.create(createFlagDto);
  }

  /**
   * Updates a feature flag
   * @param id The feature flag ID
   * @param updateFlagDto The update data
   * @returns The updated feature flag
   * @throws NotFoundError if the feature flag is not found
   */
  update(id: string, updateFlagDto: UpdateFeatureFlag): FeatureFlag {
    return this.repository.update(id, updateFlagDto);
  }

  /**
   * Toggles a feature flag's enabled status
   * @param id The feature flag ID
   * @returns The updated feature flag
   * @throws NotFoundError if the feature flag is not found
   */
  toggle(id: string): FeatureFlag {
    return this.repository.toggle(id);
  }

  /**
   * Removes a feature flag
   * @param id The feature flag ID
   * @returns true if the flag was removed
   * @throws NotFoundError if the feature flag is not found
   */
  remove(id: string): boolean {
    const flag = this.repository.findById(id);
    if (!flag) {
      throw new NotFoundError(`Feature flag with ID ${id} not found`);
    }
    return this.repository.remove(id);
  }
}

// Create a singleton instance
export const featureFlagService = new FeatureFlagService(featureFlagRepository);
