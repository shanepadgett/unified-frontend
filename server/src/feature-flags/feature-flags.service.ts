import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from "./feature-flag.model.ts";
import { environmentsService } from "../environments/environments.service.ts";

class FeatureFlagsService {
  private featureFlags: Map<string, FeatureFlag> = new Map();

  constructor() {
    // Initialize with seed data
    this.seedData();
  }

  private seedData() {
    // Get the default environment name
    const environments = environmentsService.findAll();
    const defaultEnv = environments.find(env => env.isDefault);
    const defaultEnvName = defaultEnv?.name || "development";

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

  findAll(): FeatureFlag[] {
    return Array.from(this.featureFlags.values());
  }

  findOne(id: string): FeatureFlag | null {
    return this.featureFlags.get(id) || null;
  }

  findByEnvironment(environment: string): FeatureFlag[] {
    return this.findAll().filter((flag) => flag.environment === environment);
  }

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

  update(id: string, updateFlagDto: UpdateFeatureFlag): FeatureFlag | null {
    const existingFlag = this.findOne(id);
    if (!existingFlag) return null;
    
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

  toggle(id: string): FeatureFlag | null {
    const flag = this.findOne(id);
    if (!flag) return null;
    
    const updatedFlag: FeatureFlag = {
      ...flag,
      enabled: !flag.enabled,
      lastModified: new Date(),
    };

    this.featureFlags.set(id, updatedFlag);
    return updatedFlag;
  }

  remove(id: string): boolean {
    return this.featureFlags.delete(id);
  }
}

// Create a singleton instance
export const featureFlagsService = new FeatureFlagsService();
