import { apiGet } from '../lib/api';

const normalizeError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Unable to load dashboard data';
  const normalized = new Error(message);
  normalized.status = error?.response?.status || 500;
  normalized.code = error?.response?.data?.code || 'unknown_error';
  return normalized;
};

export const fetchCustomerDashboard = async () => {
  try {
    return await apiGet('/api/dashboard/customer');
  } catch (error) {
    throw normalizeError(error);
  }
};
