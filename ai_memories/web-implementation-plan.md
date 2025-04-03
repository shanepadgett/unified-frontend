# Web Implementation Plan - Feature Flag Demo

## Project Setup

1. Initialize project
```bash
npm create vite@latest web -- --template react-ts
cd web
npm install
```

2. Essential Dependencies
```bash
npm install @tanstack/react-query
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
```

## Project Structure

```
web/
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── FeatureFlagCard.tsx
│   │   ├── EnvironmentSelector.tsx
│   │   ├── SearchInput.tsx
│   │   └── ToggleSwitch.tsx
│   ├── hooks/
│   │   └── useFeatureFlags.ts
│   ├── App.tsx
│   └── main.tsx
└── tailwind.config.js
```

## Core Components

1. `FeatureFlagCard`
   - Display name, description, status
   - Toggle switch
   - Environment badge

2. `EnvironmentSelector`
   - Simple dropdown
   - Dev/Staging/Prod options

3. `SearchInput`
   - Basic search input
   - Clear button

4. `ToggleSwitch`
   - Toggle state
   - Loading indicator

## Data Fetching

```typescript
// Simple query hook
const useFeatureFlags = (environment?: string) => {
  return useQuery({
    queryKey: ['flags', environment],
    queryFn: () => api.getFeatureFlags(environment),
  });
};

// Toggle mutation
const useToggleFlag = () => {
  return useMutation({
    mutationFn: (id: string) => api.toggleFlag(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['flags']);
    },
  });
};
```

## Implementation Steps

1. Project Setup (30 min)
   - Initialize project
   - Configure TailwindCSS
   - Set up React Query

2. Core Components (2 hours)
   - Build essential components
   - Style with TailwindCSS
   - Add basic interactions

3. Data Integration (1 hour)
   - Connect to Deno backend
   - Implement queries/mutations
   - Add loading states

4. Polish & Demo Prep (30 min)
   - Test all features
   - Add error handling
   - Prepare for presentation

## Demo Considerations

1. Keep the implementation simple and focused
2. Ensure smooth local development
3. Prepare fallback options
4. Have code snippets ready for live demo
