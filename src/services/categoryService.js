import { apiGet } from '../lib/api';

const normalizeError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Unable to load categories';
  const normalized = new Error(message);
  normalized.status = error?.response?.status || 500;
  normalized.code = error?.response?.data?.code || 'unknown_error';
  return normalized;
};

export const fetchServiceCategories = async () => {
  try {
    return await apiGet('/api/service-categories');
  } catch (error) {
    throw normalizeError(error);
  }
};
