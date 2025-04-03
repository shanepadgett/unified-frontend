import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getFeatureFlagsByEnvironment,
  toggleFeatureFlag,
  type FeatureFlag
} from '../api/featureFlags.ts'

// Import components individually
import { FeatureFlagCard } from '../components/feature-flags/FeatureFlagCard.tsx'
import { EnvironmentSelector, type Environment } from '../components/feature-flags/EnvironmentSelector.tsx'
import { SearchInput } from '../components/feature-flags/SearchInput.tsx'

export const Route = createFileRoute('/')({
  component: FeatureFlagsPage,
})

function FeatureFlagsPage() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>('dev')

  // Fetch feature flags by environment
  const { data: featureFlags = [], isLoading, error } = useQuery<FeatureFlag[]>({
    queryKey: ['featureFlags', selectedEnvironment],
    queryFn: () => getFeatureFlagsByEnvironment({ data: selectedEnvironment }),
  })

  // Toggle feature flag mutation
  const toggleMutation = useMutation({
    mutationFn: (params: { id: string; enabled: boolean }) => {
      return toggleFeatureFlag({ data: params }) as Promise<FeatureFlag>
    },
    onSuccess: () => {
      // Invalidate and refetch feature flags after toggling
      queryClient.invalidateQueries({ queryKey: ['featureFlags', selectedEnvironment] })
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feature Flags</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage feature flags across different environments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <EnvironmentSelector
            selectedEnvironment={selectedEnvironment}
            onChange={setSelectedEnvironment}
            className="w-[180px] h-[38px]"
          />
          <Link
            to="/feature-flags/create"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Flag
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search feature flags..." />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading feature flags...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 my-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}
