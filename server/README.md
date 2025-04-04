# Feature Flag Server (Deno)

This is a Deno-based server for managing feature flags across different environments. It uses the Oak framework to provide a RESTful API.

## Description

The server provides a RESTful API for creating, reading, updating, and deleting feature flags. It uses an in-memory storage solution for simplicity.

## Architecture

The server follows a feature-based architecture, which organizes code by domain features rather than technical layers. This approach provides several benefits:

- Clear service boundaries
- Consistent patterns across features
- Simplified testing
- Better error handling
- Clear dependency management

### Directory Structure

```
src/
├── features/                  # All features
│   ├── feature-flags/         # Feature flags feature
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Data models
│   │   ├── repositories/      # Data access layer
│   │   ├── middleware/        # Feature-specific middleware
│   │   ├── validation/        # Request validation
│   │   ├── types/             # TypeScript definitions
│   │   └── tests/             # Feature tests
│   ├── environments/          # Environments feature
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Data models
│   │   ├── repositories/      # Data access layer
│   │   ├── middleware/        # Feature-specific middleware
│   │   ├── validation/        # Request validation
│   │   ├── types/             # TypeScript definitions
│   │   └── tests/             # Feature tests
│   └── shared/                # Cross-feature utilities
├── core/                      # Application core setup
│   ├── database/              # Database configuration
│   ├── middleware/            # Global middleware
│   ├── logger/                # Logging setup
│   └── errors/                # Error handling
├── types/                     # Global type definitions
└── main.ts                    # Main entry point
```

## Prerequisites

- [Deno](https://deno.land/) installed on your machine

## Running the app

```bash
# Start the server
deno task start

# Start the server in development mode with watch
deno task dev
```

## API Endpoints

### Feature Flags

| Method | Endpoint                          | Description                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /api/feature-flags                | Get all feature flags                 |
| GET    | /api/feature-flags/:id            | Get a specific feature flag           |
| GET    | /api/feature-flags/env/:environment | Get flags for a specific environment |
| POST   | /api/feature-flags                | Create a new feature flag             |
| PATCH  | /api/feature-flags/:id            | Update a feature flag                 |
| DELETE | /api/feature-flags/:id            | Delete a feature flag                 |
| PATCH  | /api/feature-flags/:id/toggle     | Toggle a feature flag's state         |

### Environments

| Method | Endpoint                          | Description                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | /api/environments                 | Get all environments                  |
| GET    | /api/environments/:id             | Get a specific environment            |
| GET    | /api/environments/default         | Get the default environment           |
| POST   | /api/environments                 | Create a new environment              |
| PATCH  | /api/environments/:id             | Update an environment                 |
| DELETE | /api/environments/:id             | Delete an environment                 |

## Feature Flag Model

```typescript
{
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: string; // dev/staging/prod
  lastModified: Date;
  owner: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: Date;
}
```

## Example Usage

### Create a Feature Flag

```bash
curl -X POST http://localhost:3000/api/feature-flags \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Feature",
    "description": "A new feature to test",
    "enabled": false,
    "environment": "dev",
    "owner": "Test Team",
    "rolloutPercentage": 0
  }'
```

### Get All Feature Flags

```bash
curl http://localhost:3000/api/feature-flags
```

### Toggle a Feature Flag

```bash
curl -X PATCH http://localhost:3000/api/feature-flags/{id}/toggle
```
