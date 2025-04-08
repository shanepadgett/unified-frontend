# Environments

## Purpose
This feature provides functionality for managing environments (development, staging, production, etc.) used throughout the application. It allows users to create, view, edit, and select environments.

## Components
- **EnvironmentCard**: Displays an environment with its details
- **EnvironmentSelector**: Dropdown for selecting the current environment
- **SearchInput**: Input for searching environments
- **CreateEnvironmentForm**: Form for creating a new environment

## Screens
- **EnvironmentDashboard**: Main dashboard displaying all environments
- **EnvironmentDetail**: Detail view for editing a specific environment
- **EnvironmentCreate**: Form for creating a new environment

## Services
- **environments.ts**: Client-side services for environment operations
- **environments.server.ts**: Server-side services for environment operations

## Dependencies
- Core UI components: Button, Card, Input, etc.

## Interface
```typescript
// Feature contract
interface Environment {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Services
function getEnvironments(): Promise<Environment[]>;
function getEnvironment(id: string): Promise<Environment>;
function createEnvironment(env: CreateEnvironment): Promise<Environment>;
function updateEnvironment(id: string, env: UpdateEnvironment): Promise<Environment>;
function deleteEnvironment(id: string): Promise<void>;
```

## Usage Examples

### Importing the feature
```typescript
// Import specific components, services, or types
import { 
  EnvironmentSelector, 
  getEnvironments, 
  Environment 
} from '~/features/environments';

// Use in a component
function MyComponent() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [selectedEnv, setSelectedEnv] = useState('development');
  
  useEffect(() => {
    getEnvironments().then(setEnvironments);
  }, []);
  
  return (
    <div>
      <EnvironmentSelector
        selectedEnvironment={selectedEnv}
        onChange={setSelectedEnv}
      />
      
      {/* Rest of the component */}
    </div>
  );
}
```

## AI Markers
@feature-boundary
@components: [EnvironmentCard, EnvironmentSelector, SearchInput, CreateEnvironmentForm]
@screens: [EnvironmentDashboard, EnvironmentDetail, EnvironmentCreate]
@dependencies: [core/ui]
