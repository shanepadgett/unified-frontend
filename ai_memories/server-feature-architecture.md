# Feature-Based Architecture for Node.js Server Applications

## Overview
This document outlines a feature-based architectural approach for Node.js server applications, optimizing for AI assistance, maintainability, and clear domain boundaries.

## Directory Structure
```
src/
├── features/
│   ├── [FeatureName]/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── repositories/   # Data access layer
│   │   ├── middleware/     # Feature-specific middleware
│   │   ├── validation/     # Request validation
│   │   ├── types/          # TypeScript definitions
│   │   └── tests/          # Feature tests
│   └── shared/             # Cross-feature utilities
├── core/                   # Application core setup
│   ├── database/           # Database configuration
│   ├── middleware/         # Global middleware
│   ├── logger/             # Logging setup
│   └── errors/             # Error handling
└── types/                  # Global type definitions
```

## Key Benefits

### 1. AI Integration Optimization
- Clear context boundaries for AI understanding
- Consistent patterns for code generation
- Simplified dependency tracking
- Better code suggestions

### 2. Development Benefits
- Clear service boundaries
- Consistent patterns across features
- Simplified testing
- Better error handling
- Clear dependency management

### 3. Maintenance Benefits
- Reduced complexity
- Clear impact assessment
- Better code organization
- Simplified debugging
- Easy feature isolation

## Implementation Guidelines

### 1. Feature Organization
```typescript
// features/auth/controllers/authController.ts
export class AuthController {
  constructor(private authService: AuthService) {}
  
  async login(req: Request, res: Response) {
    // Controller implementation
  }
}

// features/auth/services/authService.ts
export class AuthService {
  constructor(private userRepository: UserRepository) {}
  
  async validateUser(credentials: LoginCredentials) {
    // Service implementation
  }
}
```

### 2. Validation
```typescript
// features/auth/validation/authValidation.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
```

### 3. Error Handling
```typescript
// features/auth/errors/authErrors.ts
export class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Invalid credentials', 401);
  }
}
```

## Configuration Requirements

### 1. TypeScript Configuration
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

### 2. Dependency Injection Setup
```typescript
// core/container.ts
container.register('AuthService', {
  useClass: AuthService
});
```

## Best Practices

1. Service Layer
   - Keep business logic in services
   - Use dependency injection
   - Handle errors appropriately

2. Data Access
   - Use repository pattern
   - Abstract database operations
   - Handle transactions properly

3. Testing Strategy
   - Unit test services
   - Integration test APIs
   - Mock external dependencies

4. Error Handling
   - Use custom error classes
   - Consistent error responses
   - Proper error logging

## Example Feature: User Management

```
features/users/
├── controllers/
│   └── userController.ts
├── services/
│   └── userService.ts
├── repositories/
│   └── userRepository.ts
├── models/
│   └── user.ts
├── validation/
│   └── userValidation.ts
├── types/
│   └── index.ts
└── tests/
    ├── userService.test.ts
    └── userController.test.ts
```

## Migration Strategy

1. Create feature directory structure
2. Identify service boundaries
3. Move related code to features
4. Update dependencies
5. Implement new patterns
6. Update tests
7. Validate feature isolation

## AI Collaboration Tips

1. Clear Service Context
   - Document service responsibilities
   - Use consistent patterns
   - Clear error handling

2. Type Safety
   - Define clear interfaces
   - Use strict TypeScript
   - Document type relationships

3. Code Generation
   - Consistent file structure
   - Clear naming conventions
   - Document expected behavior

This structure enables clear separation of concerns while maintaining feature cohesion and making the codebase more maintainable and AI-friendly.