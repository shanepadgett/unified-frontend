import { Environment, CreateEnvironment, UpdateEnvironment } from "./environment.model.ts";

class EnvironmentsService {
  private environments: Map<string, Environment> = new Map();

  constructor() {
    // Initialize with seed data
    this.seedData();
  }

  private seedData() {
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

  findAll(): Environment[] {
    return Array.from(this.environments.values());
  }

  findOne(id: string): Environment | null {
    return this.environments.get(id) || null;
  }

  findByName(name: string): Environment | null {
    return this.findAll().find((env) => env.name.toLowerCase() === name.toLowerCase()) || null;
  }

  findDefault(): Environment | null {
    return this.findAll().find((env) => env.isDefault) || null;
  }

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

  update(id: string, updateEnvDto: UpdateEnvironment): Environment | null {
    const existingEnv = this.findOne(id);
    if (!existingEnv) return null;
    
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

  remove(id: string): boolean {
    const env = this.findOne(id);
    
    // Don't allow removing the default environment
    if (env && env.isDefault) {
      return false;
    }
    
    return this.environments.delete(id);
  }

  private unsetDefaultEnvironment(): void {
    const defaultEnv = this.findDefault();
    if (defaultEnv) {
      const updated = { ...defaultEnv, isDefault: false, updatedAt: new Date() };
      this.environments.set(defaultEnv.id, updated);
    }
  }
}

// Create a singleton instance
export const environmentsService = new EnvironmentsService();
