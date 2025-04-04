# Feature-Based Architecture

This application follows a feature-based architecture to optimize for maintainability, clear domain boundaries, and AI assistance.

## Directory Structure

```
src/
├── features/               # Feature-specific code
│   ├── feature-flags/      # Feature flags feature
│   │   ├── components/     # Feature-specific React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API integration and data fetching
│   │   ├── stores/         # State management (Zustand stores)
│   │   ├── types/          # TypeScript definitions
│   │   ├── utils/          # Feature-specific utilities
│   │   └── tests/          # Component and integration tests
│   ├── environments/       # Environments feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── utils/
│   │   └── tests/
│   └── shared/             # Shared components and utilities
│       ├── components/     # Shared UI components
│       └── utils/          # Shared utilities
├── core/                   # Application core setup
│   ├── api/                # Base API configuration
│   ├── router/             # Router configuration
│   ├── styles/             # Global styles
│   └── providers/          # Global providers
└── types/                  # Global type definitions
```

## Import Aliases

The application uses the following import aliases:

- `@features/*` - Feature-specific code
- `@core/*` - Core application code
- `@types/*` - Global type definitions
- `~/*` - Legacy imports (maintained for backward compatibility)

## Features

### Feature Flags

The feature flags feature provides functionality for managing feature flags across different environments.

```typescript
// Import from feature
import { FeatureFlagCard, useFeatureFlags, FeatureFlag } from '@features/feature-flags';
```

### Environments

The environments feature provides functionality for managing environments.

```typescript
// Import from feature
import { EnvironmentCard, useEnvironments, Environment } from '@features/environments';
```

### Shared Components

Shared components are used across features.

```typescript
// Import shared components
import { Button, Card, TextField } from '@features/shared/components';
```

## Best Practices

1. **Feature Independence**
   - Features should be self-contained
   - Minimize cross-feature dependencies
   - Use shared components for common UI elements

2. **State Management**
   - Keep state close to where it's used
   - Use feature-specific stores
   - Use React Query for server state

3. **Testing**
   - Co-locate tests with features
   - Test components in isolation
   - Use integration tests for feature workflows

4. **Code Organization**
   - Clear file naming conventions
   - Consistent directory structure
   - Document feature dependencies
