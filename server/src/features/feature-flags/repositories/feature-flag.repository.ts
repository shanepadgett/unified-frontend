import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from "../models/feature-flag.model.ts";
import { NotFoundError } from "../../../core/errors/base-error.ts";

/**
 * Repository for feature flags
 * Handles data access operations for feature flags
 */
export class FeatureFlagRepository {
  private featureFlags: Map<string, FeatureFlag> = new Map();

  /**
   * Initializes the repository with seed data
   * @param defaultEnvName The default environment name
   */
  constructor(defaultEnvName: string = "development") {
    this.seedData(defaultEnvName);
  }

  /**
   * Seeds the repository with initial data
   * @param defaultEnvName The default environment name
   */
  private seedData(defaultEnvName: string): void {
    const seedFlags: FeatureFlag[] = [
      {
        id: crypto.randomUUID(),
        name: "Dark Mode",
        description: "Enable dark mode across the application",
        enabled: true,
        environment: defaultEnvName,
        lastModified: new Date(),
        owner: "UI Team",
        rolloutPercentage: 100,
      },
      {
        id: crypto.randomUUID(),
        name: "New Dashboard",
        description: "Enable the new dashboard experience",
        enabled: false,
        environment: defaultEnvName,
        lastModified: new Date(),
        owner: "Product Team",
        rolloutPercentage: 0,
      },
      {
        id: crypto.randomUUID(),
        name: "Analytics",
        description: "Enable analytics tracking",
        enabled: true,
        environment: defaultEnvName,
        lastModified: new Date(),
        owner: "Data Team",
        rolloutPercentage: 100,
      },
    ];

    seedFlags.forEach((flag) => {
      this.featureFlags.set(flag.id, flag);
    });
  }

  /**
   * Finds all feature flags
   * @returns Array of all feature flags
   */
  findAll(): FeatureFlag[] {
    return Array.from(this.featureFlags.values());
  }

  /**
   * Finds a feature flag by ID
   * @param id The feature flag ID
   * @returns The feature flag or null if not found
   */
  findById(id: string): FeatureFlag | null {
    return this.featureFlags.get(id) || null;
  }

  /**
   * Finds feature flags by environment
   * @param environment The environment name
   * @returns Array of feature flags for the specified environment
   */
  findByEnvironment(environment: string): FeatureFlag[] {
    return this.findAll().filter((flag) => flag.environment === environment);
  }

  /**
   * Creates a new feature flag
   * @param createFlagDto The feature flag data
   * @returns The created feature flag
   */
  create(createFlagDto: CreateFeatureFlag): FeatureFlag {
    const newFlag: FeatureFlag = {
      id: crypto.randomUUID(),
      ...createFlagDto,
      lastModified: new Date(),
      // Convert string date to Date object if provided
      expiresAt: createFlagDto.expiresAt ? new Date(createFlagDto.expiresAt) : undefined,
    };

    this.featureFlags.set(newFlag.id, newFlag);
    return newFlag;
  }

  /**
   * Updates a feature flag
   * @param id The feature flag ID
   * @param updateFlagDto The update data
   * @returns The updated feature flag
   * @throws NotFoundError if the feature flag is not found
   */
  update(id: string, updateFlagDto: UpdateFeatureFlag): FeatureFlag {
    const existingFlag = this.findById(id);
    if (!existingFlag) {
      throw new NotFoundError(`Feature flag with ID ${id} not found`);
    }
    
    const updatedFlag: FeatureFlag = {
      ...existingFlag,
      ...updateFlagDto,
      lastModified: new Date(),
      // Convert string date to Date object if provided
      expiresAt: updateFlagDto.expiresAt ? new Date(updateFlagDto.expiresAt) : existingFlag.expiresAt,
    };

    this.featureFlags.set(id, updatedFlag);
    return updatedFlag;
  }

  /**
   * Toggles a feature flag's enabled status
   * @param id The feature flag ID
   * @returns The updated feature flag
   * @throws NotFoundError if the feature flag is not found
   */
  toggle(id: string): FeatureFlag {
    const flag = this.findById(id);
    if (!flag) {
      throw new NotFoundError(`Feature flag with ID ${id} not found`);
    }
    
    const updatedFlag: FeatureFlag = {
      ...flag,
      enabled: !flag.enabled,
      lastModified: new Date(),
    };

    this.featureFlags.set(id, updatedFlag);
    return updatedFlag;
  }

  /**
   * Removes a feature flag
   * @param id The feature flag ID
   * @returns true if the flag was removed, false otherwise
   */
  remove(id: string): boolean {
    return this.featureFlags.delete(id);
  }
}

// Create a singleton instance
export const featureFlagRepository = new FeatureFlagRepository();
