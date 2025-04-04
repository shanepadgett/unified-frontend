import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type FeatureFlag
} from '@features/feature-flags/api/featureFlags'
import {
  getFeatureFlagsByEnvironmentDirect,
  toggleFeatureFlagDirect
} from '@features/feature-flags/api/directApi'

// Import components from feature
import {
  FeatureFlagCard,
  EnvironmentSelector,
  SearchInput
} from '@features/feature-flags/components'
import type { Environment } from '@features/feature-flags/components/EnvironmentSelector'

export const Route = createFileRoute('/')({
  component: FeatureFlagsPage,
})

function FeatureFlagsPage() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>('development')

  // Fetch feature flags by environment
  const { data: featureFlags = [], isLoading, error } = useQuery<FeatureFlag[]>({
    queryKey: ['featureFlags', selectedEnvironment],
    queryFn: async () => {
      console.log('Fetching feature flags for environment:', selectedEnvironment);
      try {
        // Use the direct API function instead of the server function
        const result = await getFeatureFlagsByEnvironmentDirect(selectedEnvironment);
        console.log('Feature flags result:', result);
        return result;
      } catch (error) {
        console.error('Error fetching feature flags:', error);
        throw error;
      }
    },
  })

  // Toggle feature flag mutation
  const toggleMutation = useMutation({
    mutationFn: async (params: { id: string; enabled: boolean }) => {
      console.log('Toggling feature flag with ID:', params.id);
      try {
        // Use the direct API function instead of the server function
        const result = await toggleFeatureFlagDirect(params.id);
        console.log('Toggle result:', result);
        return result;
      } catch (error) {
        console.error('Error toggling feature flag:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Feature flag toggled successfully');
      // Invalidate and refetch feature flags after toggling
      queryClient.invalidateQueries({ queryKey: ['featureFlags', selectedEnvironment] })
    },
    onError: (error) => {
      console.error('Toggle mutation error:', error);
    },
  })

  // Filter feature flags by search term only (environment filtering is done server-side)
  const filteredFlags = featureFlags
    .filter((flag: FeatureFlag) =>
      flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  // Handle toggle
  const handleToggle = (id: string, enabled: boolean) => {
    toggleMutation.mutate({ id, enabled })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feature Flags</h1>

        <EnvironmentSelector
          selectedEnvironment={selectedEnvironment}
          onChange={setSelectedEnvironment}
          className="w-full h-[38px]"
        />

        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search feature flags..." />

        <Link
          to="/feature-flags/create"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-dark-600 text-sm font-medium rounded-md bg-white dark:bg-dark-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-700"
        >
          Create Flag
        </Link>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="flex flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feature Flags</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage feature flags across different environments
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <EnvironmentSelector
              selectedEnvironment={selectedEnvironment}
              onChange={setSelectedEnvironment}
              className="w-[180px] h-[38px]"
            />
            <Link
              to="/feature-flags/create"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
            >
              Create Flag
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search feature flags..." />
        </div>
      </div>

      {/* Content area - same for both mobile and desktop */}
      <div className="mt-4 sm:mt-0">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading feature flags...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <p className="text-red-700 dark:text-red-400">Error loading feature flags</p>
          </div>
        ) : filteredFlags.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? `No feature flags found matching "${searchTerm}"`
                : `No feature flags found in ${selectedEnvironment} environment`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredFlags.map((flag: FeatureFlag) => (
              <FeatureFlagCard
                key={flag.id}
                id={flag.id}
                name={flag.name}
                description={flag.description}
                enabled={flag.enabled}
                environment={flag.environment}
                owner={flag.owner}
                lastModified={flag.lastModified}
                rolloutPercentage={flag.rolloutPercentage}
                onToggle={handleToggle}
                isLoading={toggleMutation.isPending && toggleMutation.variables?.id === flag.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
