import { apiGet, apiPost } from '../lib/api';

const normalizeError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Unexpected error occurred';
  const normalized = new Error(message);
  normalized.code = error?.response?.status || error?.code || 'unknown';
  return normalized;
};

export const loadCurrentUser = async () => {
  try {
    return await apiGet('/api/users/me');
  } catch (error) {
    throw normalizeError(error);
  }
};

export const updateProfile = async (payload) => {
  try {
    return await apiPost('/api/users/me', payload);
  } catch (error) {
    throw normalizeError(error);
  }
};
