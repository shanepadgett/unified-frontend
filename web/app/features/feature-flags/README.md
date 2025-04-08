# Feature Flags

## Purpose
This feature provides a comprehensive interface for managing feature flags across different environments. It allows users to create, view, edit, and toggle feature flags.

## Components
- **FeatureFlagCard**: Displays a feature flag with toggle functionality
- **FeatureFlagForm**: Form for creating and editing feature flags
- **EnvironmentSelector**: Dropdown for selecting the current environment
- **SearchInput**: Input for searching feature flags

## Screens
- **FeatureFlagDashboard**: Main dashboard displaying all feature flags
- **FeatureFlagDetail**: Detail view for editing a specific feature flag
- **FeatureFlagCreate**: Form for creating a new feature flag

## Services
- **feature-flags.ts**: Client-side services for feature flag operations
- **feature-flags.server.ts**: Server-side services for feature flag operations

## Dependencies
- Environments feature: For environment selection
- Core UI components: Button, Card, Toggle, Input, etc.

## Interface
```typescript
// Feature contract
interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: string;
  lastModified?: Date;
  owner?: string;
  rolloutPercentage?: number;
  dependencies?: string[];
  expiresAt?: Date;
}

// Services
function getFeatureFlags(): Promise<FeatureFlag[]>;
function getFeatureFlagsByEnvironment(environment: string): Promise<FeatureFlag[]>;
function getFeatureFlag(id: string): Promise<FeatureFlag>;
function createFeatureFlag(flag: CreateFeatureFlag): Promise<FeatureFlag>;
function updateFeatureFlag(id: string, flag: UpdateFeatureFlag): Promise<FeatureFlag>;
function toggleFeatureFlag(id: string, enabled: boolean): Promise<FeatureFlag>;
function deleteFeatureFlag(id: string): Promise<void>;
```

## Usage Examples

### Importing the feature
```typescript
// Import specific components, services, or types
import { 
  FeatureFlagCard, 
  getFeatureFlags, 
  FeatureFlag 
} from '~/features/feature-flags';

// Use in a component
function MyComponent() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  
  useEffect(() => {
    getFeatureFlags().then(setFlags);
  }, []);
  
  return (
    <div>
      {flags.map(flag => (
        <FeatureFlagCard 
          key={flag.id} 
          flag={flag} 
          onToggle={handleToggle} 
        />
      ))}
    </div>
  );
}
```

## AI Markers
@feature-boundary
@components: [FeatureFlagCard, FeatureFlagForm, EnvironmentSelector, SearchInput]
@screens: [FeatureFlagDashboard, FeatureFlagDetail, FeatureFlagCreate]
@dependencies: [environments, core/ui]
