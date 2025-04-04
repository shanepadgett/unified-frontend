import { create } from 'zustand';
import { Environment } from '../types';

interface EnvironmentState {
  environments: Environment[];
  defaultEnvironment: Environment | null;
  setEnvironments: (environments: Environment[]) => void;
  setDefaultEnvironment: (environment: Environment) => void;
  getEnvironmentByName: (name: string) => Environment | undefined;
}

export const useEnvironmentStore = create<EnvironmentState>((set, get) => ({
  environments: [],
  defaultEnvironment: null,
  
  setEnvironments: (environments) => {
    set({ environments });
    
    // Update default environment if it exists
    const defaultEnv = environments.find(env => env.isDefault);
    if (defaultEnv) {
      set({ defaultEnvironment: defaultEnv });
    }
  },
  
  setDefaultEnvironment: (environment) => set({ defaultEnvironment: environment }),
  
  getEnvironmentByName: (name) => {
    const { environments } = get();
    return environments.find(env => env.name === name);
  }
}));
