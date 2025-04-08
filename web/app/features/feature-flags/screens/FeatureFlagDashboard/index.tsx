import { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card, CardBody, Container } from "~/core/ui";
import {
  FeatureFlagCard,
  EnvironmentSelector,
  SearchInput
} from "../../components";
import { getFeatureFlags, getFeatureFlagsByEnvironment, toggleFeatureFlag } from "../../services/feature-flags";
import { FeatureFlag } from "../../types";

// Define the loader data type for type safety
export interface FeatureFlagDashboardLoaderData {
  featureFlags: FeatureFlag[];
  selectedEnvironment: string;
}

export function FeatureFlagDashboard() {
  const { featureFlags: initialFeatureFlags, selectedEnvironment: initialEnvironment } =
    useLoaderData<FeatureFlagDashboardLoaderData>();

  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(initialFeatureFlags);
  const [selectedEnvironment, setSelectedEnvironment] = useState(initialEnvironment || 'development');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  // Function to refresh feature flags when environment changes
  const refreshFeatureFlags = async (environment: string) => {
    setIsLoading(true);
    try {
      const flags = await getFeatureFlagsByEnvironment(environment);
      setFeatureFlags(flags);
    } catch (error) {
      console.error("Error fetching feature flags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle environment change
  const handleEnvironmentChange = (environment: string) => {
    setSelectedEnvironment(environment);
    refreshFeatureFlags(environment);
  };

  // Handle toggle
  const handleToggle = async (id: string, newEnabledState: boolean) => {
    setToggleLoading(id);
    try {
      // Call the API to toggle the feature flag
      const updatedFlag = await toggleFeatureFlag(id);
      console.log('Server response for toggle:', updatedFlag);

      // Update the local state with the updated flag from the server
      setFeatureFlags(prevFlags =>
        prevFlags.map(flag =>
          flag.id === id ? { ...flag, ...updatedFlag, lastModified: new Date(updatedFlag.lastModified) } : flag
        )
      );

      console.log(`Feature flag ${id} toggled to ${updatedFlag.enabled}`);
    } catch (error) {
      console.error("Error toggling feature flag:", error);
    } finally {
      setToggleLoading(null);
    }
  };

  // Filter feature flags by search term
  const filteredFlags = featureFlags
    .filter((flag: FeatureFlag) =>
      flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (flag.owner && flag.owner.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <Container>
      <div className="py-8">
        {/* Mobile Layout */}
        <div className="sm:hidden flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feature Flags</h1>

          <EnvironmentSelector
            selectedEnvironment={selectedEnvironment}
            onChange={handleEnvironmentChange}
            className="w-full h-[38px]"
          />

          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search feature flags..." />

          <Link
            to="/create"
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
                onChange={handleEnvironmentChange}
                className="w-[180px] h-[38px]"
              />
              <Link to="/create">
                <Button variant="primary">Create Flag</Button>
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
          ) : featureFlags.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No feature flags found in {selectedEnvironment} environment. Create one to get started.
                </p>
              </CardBody>
            </Card>
          ) : filteredFlags.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No feature flags found matching "{searchTerm}"
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredFlags.map((flag: FeatureFlag) => (
                <FeatureFlagCard
                  key={flag.id}
                  flag={flag}
                  onToggle={handleToggle}
                  isLoading={toggleLoading === flag.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
