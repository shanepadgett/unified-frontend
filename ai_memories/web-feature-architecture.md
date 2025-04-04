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