# Feature-Based Architecture for iOS Applications

## Overview
This document outlines a feature-based architectural approach for iOS applications using SwiftUI, emphasizing component-driven development with minimal abstractions. The architecture optimizes for AI assistance, maintainability, and clear domain boundaries while following the unified cross-platform patterns.

## Directory Structure
```
Sources/
├── Features/
│   ├── [FeatureName]/
│   │   ├── Components/     # Feature-specific SwiftUI views
│   │   ├── Screens/        # Main feature screens
│   │   ├── Environment/    # Feature-level environment objects
│   │   ├── Models/         # Data models and state
│   │   ├── Services/       # Feature-specific services
│   │   ├── Utils/         # Feature-specific utilities
│   │   ├── Tests/         # Feature tests
│   │   └── README.md      # Feature documentation
│   └── Shared/
│       ├── UI/            # Shared UI components
│       └── Utils/         # Shared utilities
├── Core/
│   ├── Environment/       # Global environment objects
│   ├── Services/         # Global services (analytics, networking)
│   └── Config/           # App configuration
└── Common/               # Global type definitions
```

## Core Principles

1. **Component-First Development**
   - Soft limit of 100 lines per view
   - Local state management within views
   - Clear section organization
   - Minimal external dependencies

2. **State Management**
   - Prefer `@State` for view-local state
   - Use environment objects for shared state
   - Avoid global singletons
   - Clear data flow patterns

3. **Component Patterns**

### Standard View Template
```swift
/**
 * @component ComponentName
 * @description Brief description of component purpose
 * @environment [List of environment objects used]
 */

// == Types ==
struct ComponentNameProps {
    let prop1: String
    let prop2: Int
}

// == View ==
struct ComponentName: View {
    // == Environment ==
    @EnvironmentObject private var environment: FeatureEnvironment
    
    // == Properties ==
    let props: ComponentNameProps
    
    // == State ==
    @State private var localState: String = ""
    
    // == Computed ==
    private var computedValue: String {
        // Derived state calculations
        "\(props.prop1): \(localState)"
    }
    
    // == Body ==
    var body: some View {
        VStack {
            // View content
        }
    }
    
    // == Actions ==
    private func handleAction() {
        // Event handling logic
    }
}

// == Preview ==
#Preview {
    ComponentName(props: .init(
        prop1: "Test",
        prop2: 42
    ))
    .environmentObject(FeatureEnvironment())
}
```

### Environment Pattern
```swift
// Features/[FeatureName]/Environment/FeatureEnvironment.swift
final class FeatureEnvironment: ObservableObject {
    @Published var someValue: String = ""
    @Published var anotherValue: Int = 0
}

// Features/[FeatureName]/FeatureView.swift
struct FeatureView: View {
    @StateObject private var environment = FeatureEnvironment()
    
    var body: some View {
        ContentView()
            .environmentObject(environment)
    }
}
```

## Pattern Breaking Guidelines

### When to Use Global State
1. Authentication state
2. Feature flags
3. App-wide theme settings
4. Real-time notifications
5. Network status

### When to Allow Direct API Calls
1. Form submissions
2. Real-time data updates
3. WebSocket connections
4. File uploads
5. Complex data transformations

### When to Exceed Line Limit
1. Complex form validation
2. Rich text editors
3. Data visualization views
4. Interactive maps
5. Complex animations

### When to Use External State Management
1. Complex multi-step forms
2. Shopping carts
3. Document editors
4. Real-time collaboration features
5. Complex undo/redo functionality

## Implementation Examples

### Basic Component
```swift
/**
 * @component UserAvatar
 * @description Displays user avatar with optional status indicator
 */

struct UserAvatarProps {
    let imageUrl: URL
    let size: AvatarSize
    let showStatus: Bool
    
    enum AvatarSize {
        case small, medium, large
        
        var dimensions: CGFloat {
            switch self {
            case .small: return 24
            case .medium: return 32
            case .large: return 48
            }
        }
    }
}

struct UserAvatar: View {
    let props: UserAvatarProps
    
    var body: some View {
        AsyncImage(url: props.imageUrl) { image in
            image
                .resizable()
                .frame(
                    width: props.size.dimensions,
                    height: props.size.dimensions
                )
                .clipShape(Circle())
        } placeholder: {
            ProgressView()
        }
        .overlay {
            if props.showStatus {
                StatusIndicator()
            }
        }
    }
}
```

### Component with Environment
```swift
/**
 * @component UserSettings
 * @description User settings form with theme support
 * @environment ThemeEnvironment, UserPreferencesEnvironment
 */

struct UserSettings: View {
    // == Environment ==
    @EnvironmentObject private var theme: ThemeEnvironment
    @EnvironmentObject private var preferences: UserPreferencesEnvironment
    
    // == State ==
    @State private var localPreferences: UserPreferences
    
    // == Init ==
    init() {
        _localPreferences = State(initialValue: preferences.current)
    }
    
    // == Body ==
    var body: some View {
        Form {
            // Form fields
        }
    }
    
    // == Actions ==
    private func handleSubmit() {
        // Handle form submission
    }
}
```

## Testing Strategy

1. **View Tests**
   - Test view rendering
   - Test user interactions
   - Test state changes
   - Mock environment objects

2. **Integration Tests**
   - Test view composition
   - Test feature workflows
   - Test environment integration

3. **Test Location**
```
Features/
└── [FeatureName]/
    └── Tests/
        ├── Views/        # View-specific tests
        ├── Integration/  # Feature integration tests
        └── Utils/        # Utility function tests
```

## Best Practices

1. **View Design**
   - Keep views focused
   - Use clear section comments
   - Document environment dependencies
   - Follow naming conventions

2. **State Management**
   - Prefer local state
   - Use environment objects for sharing
   - Document state dependencies
   - Clear update patterns

3. **Testing**
   - Test view behavior
   - Mock environment objects
   - Test edge cases
   - Validate accessibility

4. **Documentation**
   - Clear view descriptions
   - Document environment usage
   - Example usage
   - Props documentation

## AI Collaboration Tips

1. Clear View Context
   - Keep related code close together
   - Use consistent naming patterns
   - Document complex logic

2. Type Safety
   - Define clear protocols
   - Use strong typing
   - Document type relationships

3. Code Generation
   - Maintain consistent patterns
   - Use clear naming conventions
   - Document expected behavior