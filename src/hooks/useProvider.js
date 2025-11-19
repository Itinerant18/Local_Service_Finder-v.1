import { useQuery } from '@tanstack/react-query';
import { fetchProviderById } from '../services/providerService';

export const useProvider = (providerId, options = {}) => {
  return useQuery({
    queryKey: ['provider', providerId],
    queryFn: () => fetchProviderById(providerId),
    enabled: Boolean(providerId),
    staleTime: 1000 * 60,
    ...options,
  });
};
