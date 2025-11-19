import { useQuery } from '@tanstack/react-query';
import { fetchProviders } from '../services/providerService';

const sanitizeParams = (params = {}) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
};

export const useProviders = (params = {}) => {
  const normalized = sanitizeParams(params);

  return useQuery({
    queryKey: ['providers', normalized],
    queryFn: () => fetchProviders(normalized),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
};
