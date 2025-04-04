import { create } from 'zustand';
import { FeatureFlag } from '../types';

interface FeatureFlagState {
  flags: FeatureFlag[];
  selectedEnvironment: string;
  searchTerm: string;
  setFlags: (flags: FeatureFlag[]) => void;
  setSelectedEnvironment: (environment: string) => void;
  setSearchTerm: (term: string) => void;
  getFilteredFlags: () => FeatureFlag[];
}

export const useFeatureFlagStore = create<FeatureFlagState>((set, get) => ({
  flags: [],
  selectedEnvironment: 'development',
  searchTerm: '',
  
  setFlags: (flags) => set({ flags }),
  setSelectedEnvironment: (environment) => set({ selectedEnvironment: environment }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  getFilteredFlags: () => {
    const { flags, selectedEnvironment, searchTerm } = get();
    
    return flags
      .filter(flag => flag.environment === selectedEnvironment)
      .filter(flag => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          flag.name.toLowerCase().includes(term) ||
          flag.description.toLowerCase().includes(term) ||
          (flag.owner && flag.owner.toLowerCase().includes(term))
        );
      });
  }
}));
