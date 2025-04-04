import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getEnvironments, 
  getEnvironment, 
  getEnvironmentByName,
  getDefaultEnvironment,
  createEnvironment,
  updateEnvironment,
  deleteEnvironment
} from '../api/environments';
import { CreateEnvironment, UpdateEnvironment } from '../types';

export function useEnvironments() {
  const queryClient = useQueryClient();

  // Get all environments
  const useAllEnvironments = () => {
    return useQuery({
      queryKey: ['environments'],
      queryFn: () => getEnvironments()
    });
  };

  // Get a specific environment by ID
  const useEnvironment = (id: string) => {
    return useQuery({
      queryKey: ['environment', id],
      queryFn: () => getEnvironment(id),
      enabled: !!id
    });
  };

  // Get environment by name
  const useEnvironmentByName = (name: string) => {
    return useQuery({
      queryKey: ['environment', 'name', name],
      queryFn: () => getEnvironmentByName(name),
      enabled: !!name
    });
  };

  // Get default environment
  const useDefaultEnvironment = () => {
    return useQuery({
      queryKey: ['environment', 'default'],
      queryFn: () => getDefaultEnvironment()
    });
  };

  // Create an environment
  const useCreateEnvironment = () => {
    return useMutation({
      mutationFn: (data: { data: CreateEnvironment }) => createEnvironment(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['environments'] });
      }
    });
  };

  // Update an environment
  const useUpdateEnvironment = () => {
    return useMutation({
      mutationFn: ({ id, env }: { id: string; env: UpdateEnvironment }) => updateEnvironment({ id, env }),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['environments'] });
        queryClient.invalidateQueries({ queryKey: ['environment', variables.id] });
      }
    });
  };

  // Delete an environment
  const useDeleteEnvironment = () => {
    return useMutation({
      mutationFn: (id: string) => deleteEnvironment(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['environments'] });
      }
    });
  };

  return {
    useAllEnvironments,
    useEnvironment,
    useEnvironmentByName,
    useDefaultEnvironment,
    useCreateEnvironment,
    useUpdateEnvironment,
    useDeleteEnvironment
  };
}
