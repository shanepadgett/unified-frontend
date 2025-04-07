# Feature-Based Architecture for React Web Applications

## Overview
This document outlines a feature-based architectural approach for React web applications, emphasizing component-driven development with minimal abstractions. The architecture optimizes for AI assistance, maintainability, and clear domain boundaries while following the unified cross-platform patterns.

## Directory Structure
```
src/
├── features/
│   ├── [FeatureName]/
│   │   ├── components/     # Feature-specific React components
│   │   ├── screens/        # Main feature screens/views
│   │   ├── environment.ts  # Feature-level environment values
│   │   ├── types/         # TypeScript definitions
│   │   ├── utils/         # Feature-specific utilities
│   │   ├── tests/         # Component and integration tests
│   │   └── README.md      # Feature documentation
│   └── shared/
│       ├── ui/            # Shared UI components
│       └── utils/         # Shared utilities
├── core/
│   ├── environment/       # Global environment values
│   ├── services/         # Global services (analytics, networking)
│   └── config/           # App configuration
└── types/                # Global type definitions
```

## Core Principles

1. **Component-First Development**
   - Soft limit of 100 lines per component
   - Local state management within components
   - Clear section organization
   - Minimal external dependencies

2. **State Management**
   - Prefer component-local state
   - Use environment values for shared state
   - Avoid global state stores
   - Clear data flow patterns

3. **Component Patterns**

### Standard Component Template
```typescript
/**
 * @component ComponentName
 * @description Brief description of component purpose
 * @environment [List of environment values used]
 */

// == Types ==
interface ComponentNameProps {
  // Direct props only - no deep prop drilling
}

// == Component ==
export const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // == Environment ==
  const environmentValue = useContext(FeatureEnvironmentKey)

  // == State ==
  const [localState, setLocalState] = useState(initialValue)

  // == Computed ==
  const computedValue = useMemo(() => {
    // Derived state calculations
  }, [dependencies])

  // == Handlers ==
  const handleAction = () => {
    // Event handling logic
  }

  // == Effects ==
  useEffect(() => {
    // Side effects
  }, [dependencies])

  // == View ==
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

### Environment Values Pattern
```typescript
// features/[FeatureName]/environment.ts
export const FeatureEnvironment = {
  SomeValue: createContext<Type>(defaultValue),
  AnotherValue: createContext<Type>(defaultValue),
}

// features/[FeatureName]/FeatureProvider.tsx
export const FeatureProvider: React.FC = ({ children }) => {
  return (
    <FeatureEnvironment.SomeValue.Provider value={someValue}>
      {children}
    </FeatureEnvironment.SomeValue.Provider>
  )
}
```

## Pattern Breaking Guidelines

### When to Use Global State
1. Authentication state
2. Feature flags
3. App-wide theme settings
4. Real-time notifications
5. Network status

### When to Allow Component API Calls
1. Form submissions
2. Real-time data updates
3. Websocket connections
4. File uploads
5. Complex data transformations

### When to Exceed Line Limit
1. Complex form validation
2. Rich text editors
3. Data visualization components
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
```typescript
/**
 * @component UserAvatar
 * @description Displays user avatar with optional status indicator
 */

interface UserAvatarProps {
  imageUrl: string
  size?: 'sm' | 'md' | 'lg'
  showStatus?: boolean
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  size = 'md',
  showStatus = false
}) => {
  // == Computed ==
  const dimensions = useMemo(() => ({
    sm: 24,
    md: 32,
    lg: 48
  }[size]), [size])

  // == View ==
  return (
    <div className={`avatar-${size}`}>
      <img
        src={imageUrl}
        width={dimensions}
        height={dimensions}
        alt="User avatar"
      />
      {showStatus && <StatusIndicator />}
    </div>
  )
}
```

### Component with Environment Values
```typescript
/**
 * @component UserSettings
 * @description User settings form with theme support
 * @environment ThemeContext, UserPreferencesContext
 */

export const UserSettings: React.FC = () => {
  // == Environment ==
  const { theme, setTheme } = useContext(ThemeContext)
  const { preferences } = useContext(UserPreferencesContext)

  // == State ==
  const [localPreferences, setLocalPreferences] = useState(preferences)

  // == Handlers ==
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  // == View ==
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

## Testing Strategy

1. **Component Tests**
   - Test component rendering
   - Test user interactions
   - Test state changes
   - Mock environment values

2. **Integration Tests**
   - Test component composition
   - Test feature workflows
   - Test environment integration

3. **Test Location**
```
features/
└── [FeatureName]/
    └── tests/
        ├── components/     # Component-specific tests
        ├── integration/    # Feature integration tests
        └── utils/          # Utility function tests
```

## Best Practices

1. **Component Design**
   - Keep components focused
   - Use clear section comments
   - Document environment dependencies
   - Follow naming conventions

2. **State Management**
   - Prefer local state
   - Use environment values for sharing
   - Document state dependencies
   - Clear update patterns

3. **Testing**
   - Test component behavior
   - Mock environment values
   - Test edge cases
   - Validate accessibility

4. **Documentation**
   - Clear component descriptions
   - Document environment usage
   - Example usage
   - Props documentation

## Example Feature: User Management

```typescript
// features/users/environment.ts
export const UserEnvironment = {
  CurrentUser: createContext<User | null>(null),
  UserPreferences: createContext<UserPreferences>(defaultPreferences),
  UserActions: createContext<UserActions>(defaultActions)
}

// Structure
features/users/
├── components/
│   ├── atomic/
│   │   ├── UserAvatar.tsx        # Simple avatar display
│   │   ├── UserBadge.tsx         # User status/role badge
│   │   └── UserName.tsx          # Formatted user name
│   ├── composite/
│   │   ├── UserCard.tsx          # Combines atomic components
│   │   ├── UserDetails.tsx       # User information panel
│   │   └── UserActions.tsx       # User-related actions
│   └── containers/
│       └── UserList.tsx          # Manages list of UserCards
├── screens/
│   ├── UserProfileScreen.tsx     # Full user profile view
│   └── UserSettingsScreen.tsx    # User settings management
├── environment.ts                 # Feature-level environment values
├── types/
│   └── index.ts                  # User-related type definitions
└── tests/
    ├── components/
    │   ├── atomic/
    │   │   └── UserAvatar.test.tsx
    │   └── composite/
    │       └── UserCard.test.tsx
    └── screens/
        └── UserProfileScreen.test.tsx

// Example Atomic Component
/**
 * @component UserAvatar
 * @description Simple user avatar display component
 */
interface UserAvatarProps {
  imageUrl: string
  size?: 'sm' | 'md' | 'lg'
  alt: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  size = 'md',
  alt
}) => {
  // == Computed ==
  const dimensions = useMemo(() => ({
    sm: 24,
    md: 32,
    lg: 48
  }[size]), [size])

  // == View ==
  return (
    <img
      src={imageUrl}
      width={dimensions}
      height={dimensions}
      alt={alt}
      className={`avatar-${size}`}
    />
  )
}

// Example Composite Component
/**
 * @component UserCard
 * @description User card combining avatar and basic info
 */
interface UserCardProps {
  userId: string
}

export const UserCard: React.FC<UserCardProps> = ({ userId }) => {
  // == Environment ==
  const { currentUser } = useContext(UserEnvironment.CurrentUser)

  // == State ==
  const [isExpanded, setIsExpanded] = useState(false)

  // == Handlers ==
  const handleToggleExpand = () => setIsExpanded(prev => !prev)

  // == View ==
  return (
    <div className="user-card">
      <UserAvatar
        imageUrl={user.avatarUrl}
        alt={`${user.name}'s avatar`}
      />
      <UserName name={user.name} />
      <UserBadge role={user.role} />
      {isExpanded && <UserDetails userId={userId} />}
    </div>
  )
}

// Example Screen Component
/**
 * @component UserProfileScreen
 * @description Main user profile screen
 * @environment CurrentUser, UserPreferences
 */
export const UserProfileScreen: React.FC = () => {
  // == Environment ==
  const { currentUser } = useContext(UserEnvironment.CurrentUser)
  const { preferences } = useContext(UserEnvironment.UserPreferences)

  // == State ==
  const [activeTab, setActiveTab] = useState('info')

  // == Computed ==
  const isOwnProfile = useMemo(() => (
    currentUser?.id === params.userId
  ), [currentUser, params.userId])

  // == View ==
  return (
    <div className="profile-screen">
      <UserCard userId={params.userId} />
      <UserDetails userId={params.userId} />
      {isOwnProfile && <UserActions />}
    </div>
  )
}
```

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