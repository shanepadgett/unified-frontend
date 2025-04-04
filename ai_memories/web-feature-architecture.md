# Feature-Based Architecture for React Web Applications

## Overview
This document outlines a feature-based architectural approach for React web applications, optimizing for AI assistance, maintainability, and clear domain boundaries.

## Directory Structure
```
src/
├── features/
│   ├── [FeatureName]/
│   │   ├── components/     # Feature-specific React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # API integration and data fetching
│   │   ├── stores/        # State management (e.g., Zustand stores)
│   │   ├── types/         # TypeScript definitions
│   │   ├── utils/         # Feature-specific utilities
│   │   └── tests/         # Component and integration tests
│   └── shared/            # Cross-feature components and utilities
├── core/                  # Application core setup
│   ├── api/               # Base API configuration
│   ├── router/            # Router configuration
│   ├── styles/            # Global styles
│   └── providers/         # Global providers
└── types/                 # Global type definitions
```

## Key Benefits

### 1. AI Integration Optimization
- Reduced token usage through clear feature boundaries
- Easier for AI to understand complete feature context
- Simplified code generation with consistent patterns
- Better code completion due to clear organization

### 2. Development Benefits
- Clear feature boundaries
- Consistent patterns across features
- Easy to locate related code
- Better testability with co-located tests
- Simplified state management

### 3. Maintenance Benefits
- Reduced cognitive load
- Clear impact assessment
- Simplified dependency management
- Better code discovery
- Minimized cross-feature coupling

## Implementation Guidelines

### 1. Feature Organization
```typescript
// features/auth/components/LoginForm.tsx
export const LoginForm = () => {
  const { login } = useAuth();
  // Component implementation
}

// features/auth/hooks/useAuth.ts
export const useAuth = () => {
  // Hook implementation
}

// features/auth/api/authApi.ts
export const authApi = {
  login: async (credentials) => {
    // API implementation
  }
}
```

### 2. State Management
```typescript
// features/auth/stores/authStore.ts
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

### 3. Feature Types
```typescript
// features/auth/types/index.ts
export interface User {
  id: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
```

## Configuration Requirements

### 1. Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@features': '/src/features',
      '@core': '/src/core',
      '@types': '/src/types'
    }
  }
})
```

### 2. TypeScript Configuration
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@features/*": ["src/features/*"],
      "@core/*": ["src/core/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

## Best Practices

1. Feature Independence
   - Features should be self-contained
   - Minimize cross-feature dependencies
   - Use shared components for common UI elements

2. State Management
   - Keep state close to where it's used
   - Use global state sparingly
   - Consider feature-specific stores

3. Testing Strategy
   - Co-locate tests with features
   - Test components in isolation
   - Use integration tests for feature workflows

4. Code Organization
   - Clear file naming conventions
   - Consistent directory structure
   - Document feature dependencies

## Example Feature: User Management

```
features/users/
├── components/
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   └── UserForm.tsx
├── hooks/
│   ├── useUsers.ts
│   └── useUserActions.ts
├── api/
│   └── usersApi.ts
├── stores/
│   └── usersStore.ts
├── types/
│   └── index.ts
└── tests/
    ├── UserList.test.tsx
    └── useUsers.test.ts
```

## Migration Strategy

1. Create new feature directory structure
2. Identify clear feature boundaries
3. Move related code to feature directories
4. Update imports and dependencies
5. Refactor cross-feature dependencies
6. Update tests
7. Validate feature isolation

## Detailed Implementation Plan

### Phase 1: Initial Setup (Folder Structure)

1. Create new directory structure:
```bash
mkdir -p src/features/shared
mkdir -p src/core/{api,router,styles,providers}
mkdir -p src/types
```

2. Create feature directories for existing features:
```bash
mkdir -p src/features/feature-flags/{components,hooks,api,stores,types,utils,tests}
mkdir -p src/features/environments/{components,hooks,api,stores,types,utils,tests}
```

### Phase 2: Code Migration

1. Move and reorganize feature flag related files:
   - Move `src/api/featureFlags.ts` → `src/features/feature-flags/api/featureFlags.ts`
   - Move `src/components/feature-flags/*` → `src/features/feature-flags/components/*`
   - Create `src/features/feature-flags/types/index.ts` for FeatureFlag interfaces
   - Create `src/features/feature-flags/hooks/useFeatureFlags.ts` for shared logic

2. Move environment related files:
   - Move environment components to `src/features/environments/components/`
   - Create `src/features/environments/types/index.ts` for Environment types
   - Create `src/features/environments/hooks/useEnvironment.ts`

3. Move core files:
   - Move `src/api/config.ts` → `src/core/api/config.ts`
   - Move route configuration → `src/core/router/`
   - Move global styles → `src/core/styles/`

### Phase 3: File Updates

1. Update imports in route files:
```typescript
// src/routes/feature-flags/$id.tsx
import { FeatureFlag, UpdateFeatureFlag } from '@features/feature-flags/types';
import { useFeatureFlags } from '@features/feature-flags/hooks/useFeatureFlags';
import { FeatureFlagForm } from '@features/feature-flags/components/FeatureFlagForm';
```

2. Create feature-specific stores:
```typescript
// src/features/feature-flags/stores/featureFlagStore.ts
import { create } from 'zustand';
import { FeatureFlag } from '../types';

export const useFeatureFlagStore = create((set) => ({
  flags: [] as FeatureFlag[],
  setFlags: (flags: FeatureFlag[]) => set({ flags }),
}));
```

3. Update API configuration:
```typescript
// src/core/api/config.ts
export const API_CONFIG = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost:8000',
  timeout: 5000,
};
```

### Phase 4: New Files Creation

1. Create feature barrel files:
```typescript
// src/features/feature-flags/index.ts
export * from './components';
export * from './hooks';
export * from './api/featureFlags';
export * from './types';
```

2. Create shared utilities:
```typescript
// src/features/shared/utils/error-handling.ts
export const handleApiError = (error: unknown) => {
  // Error handling implementation
};
```

3. Create core providers:
```typescript
// src/core/providers/ApiProvider.tsx
// Implementation of API context provider
```

### Phase 5: Configuration Updates

1. Update TypeScript configuration:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@features/*": ["features/*"],
      "@core/*": ["core/*"],
      "@shared/*": ["features/shared/*"],
      "@types/*": ["types/*"]
    }
  }
}
```

2. Update build configuration:
```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@features': '/src/features',
      '@core': '/src/core',
      '@shared': '/src/features/shared',
      '@types': '/src/types'
    }
  }
});
```

### Phase 6: Cleanup

1. Files to remove:
   - `src/api/` directory (after migration)
   - Old component directories
   - Unused utility files
   - Deprecated configuration files

2. Update git tracking:
```bash
git rm -r src/api/
git rm -r src/components/
```

### Phase 7: Validation

1. Testing checklist:
   - All features work as expected
   - No broken imports
   - All tests pass
   - Build succeeds
   - Development server runs

2. Documentation updates:
   - Update README.md with new structure
   - Update contribution guidelines
   - Document migration changes

## AI Collaboration Tips

1. Clear Component Context
   - Keep related code close together
   - Use consistent naming patterns
   - Document complex logic

2. Type Safety
   - Define clear interfaces
   - Use TypeScript strictly
   - Document type relationships

3. Code Generation
   - Maintain consistent patterns
   - Use clear naming conventions
   - Document expected behavior

This structure enables clear separation of concerns while maintaining feature cohesion and making the codebase more maintainable and AI-friendly.
