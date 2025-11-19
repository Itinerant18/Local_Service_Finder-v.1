import { apiGet, apiPost } from '../lib/api';

const normalizeError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Unable to complete provider request';
  const normalized = new Error(message);
  normalized.status = error?.response?.status || 500;
  normalized.code = error?.response?.data?.code || 'unknown_error';
  return normalized;
};

export const fetchProviders = async (params = {}) => {
  try {
    return await apiGet('/api/providers', params);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const fetchProviderById = async (providerId) => {
  try {
    return await apiGet(`/api/providers/${providerId}`);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const onboardProvider = async (payload) => {
  try {
    return await apiPost('/api/providers/onboard', payload, {
      headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    });
  } catch (error) {
    throw normalizeError(error);
  }
};

export const updateProvider = async (providerId, payload) => {
  try {
    return await apiPost(`/api/providers/${providerId}`, payload);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const fetchFeaturedProviders = async (params = {}) => {
  try {
    return await apiGet('/api/providers/featured', params);
  } catch (error) {
    throw normalizeError(error);
  }
};
