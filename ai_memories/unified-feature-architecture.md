# Unified Feature Architecture
## Cross-Platform Component-Driven Development

## Overview
This document defines a unified feature architecture pattern for React (Web), SwiftUI (iOS), and Jetpack Compose (Android) applications. The architecture emphasizes simple, component-driven development with consistent patterns across platforms to optimize for both developer productivity and AI assistance.

## Core Principles

1. **Component-First Development**
   - Small, focused components (80-100 lines maximum)
   - Local state management
   - Minimal abstraction layers
   - Declarative UI patterns

2. **Feature Independence**
   - Self-contained features
   - Clear interfaces between features
   - Shared UI components for consistency
   - Platform-specific optimizations when needed

3. **AI-Friendly Structure**
   - Consistent naming across platforms
   - Clear documentation patterns
   - Metadata for AI tools
   - Explicit feature contracts

## Directory Structure

### Common Pattern (All Platforms)
```
src/
├── features/
│   ├── [FeatureName]/
│   │   ├── components/     # Feature-specific UI components
│   │   ├── screens/        # Main feature screens/views
│   │   ├── models/         # Data models and state
│   │   ├── services/       # Feature-specific services
│   │   ├── utils/          # Feature-specific utilities
│   │   ├── tests/          # Feature tests
│   │   └── README.md       # Feature documentation
│   └── shared/
│       ├── ui/             # Shared UI components
│       └── utils/          # Shared utilities
└── core/
    ├── services/           # Global services (analytics, networking)
    └── config/             # App configuration
```

### Platform-Specific Additions
Currently, there are no required platform-specific additions to the base structure. If needed in the future, platform-specific folders (like `hooks/` for React) can be added based on specific requirements.

## Component Guidelines

### Size and Responsibility
- Maximum 80-100 lines per component
- Single responsibility principle
- Break down complex components into smaller pieces
- Keep business logic minimal within components

### State Management
```typescript
// React Example
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Local state preferred over global state
}

// SwiftUI Example
struct TodoItem: View {
  @State private var isEditing = false
  // State contained within the view
}

// Compose Example
@Composable
fun TodoItem(todo: Todo) {
  var isEditing by remember { mutableStateOf(false) }
  // State scoped to the composable
}
```

## Feature Documentation

### README.md Template
```markdown
# Feature Name

## Purpose
Brief description of the feature's purpose

## Components
- ComponentA: Purpose and usage
- ComponentB: Purpose and usage

## Dependencies
- Required shared components
- External dependencies

## Interface
```typescript
// Feature contract
interface FeatureInterface {
  // Public methods and types
}
```

## AI Markers
@feature-boundary
@components: [ComponentA, ComponentB]
@dependencies: [SharedComponent1, SharedComponent2]
```

### Component Documentation
```typescript
/**
 * @component ButtonPrimary
 * @platform web,ios,android
 * @description Primary button component with consistent styling
 * 
 * @example
 * // Web (React)
 * <ButtonPrimary onClick={handleClick}>Click Me</ButtonPrimary>
 * 
 * // iOS (SwiftUI)
 * ButtonPrimary("Click Me", action: handleClick)
 * 
 * // Android (Compose)
 * ButtonPrimary(onClick = handleClick) { Text("Click Me") }
 */
```

## Testing Strategy

### Component Tests
- Unit tests for component logic
- Snapshot tests for UI consistency
- Integration tests for feature workflows

### Test Location
```
features/
└── [FeatureName]/
    └── tests/
        ├── components/     # Component-specific tests
        ├── integration/    # Feature integration tests
        └── utils/          # Utility function tests
```

## Shared UI Components

### Common Components Library
- Basic input elements (Button, Input, Select)
- Layout components (Card, Container, Grid)
- Feedback components (Toast, Alert, Modal)

### Naming Convention
```
Component Type    Web (React)    iOS (SwiftUI)    Android (Compose)
─────────────────────────────────────────────────────────────────────
Primary Button    ButtonPrimary  ButtonPrimary    ButtonPrimary
Input Field      TextField      TextField        TextField
Modal Dialog     ModalView      ModalView        ModalView
```

## Feature-to-Feature Communication

### Direct Dependencies
- Use explicit imports
- Document dependencies in feature README
- Keep cross-feature dependencies minimal

### Event-Based Communication
- Use platform-specific event systems sparingly
- Prefer prop/parameter passing
- Document event contracts in feature interface

## AI Collaboration

### Metadata Markers
- `@feature-boundary`: Marks feature entry points
- `@component`: Component documentation
- `@dependencies`: Feature dependencies
- `@platform`: Platform-specific considerations

### Directory Markers
```
.
├── features/
│   └── auth/
│       ├── .aiignore              # AI processing exclusions
│       ├── .aiconfig              # AI processing configuration
│       └── ai-interface.json      # Feature interface for AI
```

## Implementation Example

### Feature Structure
```
features/
└── todo/
    ├── components/
    │   ├── TodoList.tsx          # Main list component
    │   ├── TodoItem.tsx          # Individual todo item
    │   └── TodoInput.tsx         # New todo input
    ├── screens/
    │   └── TodoScreen.tsx        # Main todo screen
    ├── utils/
    │   └── todoUtils.ts          # Todo-specific utilities
    ├── types/
    │   └── index.ts              # Todo type definitions
    ├── tests/
    │   └── TodoList.test.tsx     # Component tests
    └── README.md                 # Feature documentation
```

## Migration Strategy

1. Start with shared components
2. Convert features one at a time
3. Update documentation and AI markers
4. Validate cross-platform consistency
5. Update testing suite

## Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use consistent naming across platforms
   - Document component interfaces

2. **State Management**
   - Prefer local component state
   - Use global state only for app-wide concerns
   - Document state dependencies

3. **Testing**
   - Write tests alongside components
   - Focus on component behavior
   - Test cross-feature integration

4. **Documentation**
   - Keep README.md up to date
   - Include AI markers
   - Document feature interfaces

5. **AI Optimization**
   - Use consistent file structure
   - Include relevant metadata
   - Document platform differences
