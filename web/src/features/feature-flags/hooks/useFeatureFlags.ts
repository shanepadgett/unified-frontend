import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getFeatureFlags, 
  getFeatureFlagsByEnvironment, 
  getFeatureFlag, 
  toggleFeatureFlag,
  createFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag
} from '../api/featureFlags';
import { FeatureFlag, CreateFeatureFlag, UpdateFeatureFlag } from '../types';

export function useFeatureFlags() {
  const queryClient = useQueryClient();

  // Get all feature flags
  const useAllFeatureFlags = () => {
    return useQuery({
      queryKey: ['featureFlags'],
      queryFn: () => getFeatureFlags()
    });
  };

  // Get feature flags by environment
  const useFeatureFlagsByEnvironment = (environment: string) => {
    return useQuery({
      queryKey: ['featureFlags', 'environment', environment],
      queryFn: () => getFeatureFlagsByEnvironment(environment),
      enabled: !!environment
    });
  };

  // Get a specific feature flag
  const useFeatureFlag = (id: string) => {
    return useQuery({
      queryKey: ['featureFlag', id],
      queryFn: () => getFeatureFlag(id),
      enabled: !!id
    });
  };

  // Toggle a feature flag
  const useToggleFeatureFlag = () => {
    return useMutation({
      mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) => toggleFeatureFlag({ id, enabled }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      }
    });
  };

  // Create a feature flag
  const useCreateFeatureFlag = () => {
    return useMutation({
      mutationFn: (data: CreateFeatureFlag) => createFeatureFlag(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      }
    });
  };

  // Update a feature flag
  const useUpdateFeatureFlag = () => {
    return useMutation({
      mutationFn: ({ id, flag }: { id: string; flag: UpdateFeatureFlag }) => updateFeatureFlag({ id, flag }),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
        queryClient.invalidateQueries({ queryKey: ['featureFlag', variables.id] });
      }
    });
  };

  // Delete a feature flag
  const useDeleteFeatureFlag = () => {
    return useMutation({
      mutationFn: (id: string) => deleteFeatureFlag(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['featureFlags'] });
      }
    });
  };

  return {
    useAllFeatureFlags,
    useFeatureFlagsByEnvironment,
    useFeatureFlag,
    useToggleFeatureFlag,
    useCreateFeatureFlag,
    useUpdateFeatureFlag,
    useDeleteFeatureFlag
  };
}
