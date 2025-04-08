# Web Application (@web/)

## Overview

This is the web application component of the unified frontend platform, built with [Remix](https://remix.run/docs) and following the unified feature architecture pattern. The application provides a feature flag management interface and environment configuration capabilities.

## Architecture

This application follows the unified feature architecture pattern, which emphasizes:

- **Component-First Development**: Small, focused components with local state management
- **Feature Independence**: Self-contained features with clear interfaces
- **AI-Friendly Structure**: Consistent naming and explicit feature contracts

### Directory Structure

```
app/
├── core/                  # Core application components
│   ├── errors/            # Error handling components
│   ├── services/          # Global services (API client, etc.)
│   └── ui/                # Shared UI components
├── features/              # Feature modules
│   ├── feature-flags/     # Feature flag management
│   │   ├── components/    # Feature-specific components
│   │   ├── screens/       # Main feature screens
│   │   ├── services/      # Feature-specific services
│   │   ├── types/         # TypeScript definitions
│   │   └── index.ts       # Feature interface exports
│   └── environments/      # Environment management
│       ├── components/    # Feature-specific components
│       ├── screens/       # Main feature screens
│       ├── services/      # Feature-specific services
│       ├── types/         # TypeScript definitions
│       └── index.ts       # Feature interface exports
├── routes/                # Remix route definitions
└── root.tsx              # Root application component
```

## Feature Interfaces

Each feature module exposes its public interface through an `index.ts` file, which exports:

- Components: UI components that can be used by other features
- Services: Functions for data fetching and manipulation
- Types: TypeScript interfaces and types
- Screens: Main feature screens/views

Example feature interface (feature-flags):

```typescript
// Export components
export * from './components';

// Export services
export * from './services/feature-flags';

// Export screens
export * from './screens';

// Export types
export * from './types';
```

This pattern ensures that other features can easily import and use functionality from a feature without needing to know its internal structure.

## Core UI Components

The application provides a set of reusable UI components in the `core/ui` directory. These components are designed to be used across all features and provide a consistent look and feel.

See the [Core UI README](app/core/ui/README.md) for detailed documentation on available components.

## Feature-to-Feature Communication

Features should communicate with each other through their public interfaces. Direct imports from one feature to another should only use the exports defined in the feature's `index.ts` file.

Example of proper feature-to-feature communication:

```typescript
// Good: Import from feature interface
import { getEnvironments } from '~/features/environments';

// Bad: Import directly from internal module
import { getEnvironments } from '~/features/environments/services/environments';
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Make sure to deploy the output of `npm run build`:

- `build/server`
- `build/client`

## Styling

This application uses [Tailwind CSS](https://tailwindcss.com/) for styling. See the [Vite docs on CSS](https://vitejs.dev/guide/features.html#css) for more information.
