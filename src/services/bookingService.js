import { apiGet, apiPost } from '../lib/api';

const normalizeError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Unable to complete request';
  const normalized = new Error(message);
  normalized.status = error?.response?.status || 500;
  normalized.code = error?.response?.data?.code || 'unknown_error';
  return normalized;
};

export const createBooking = async (payload) => {
  try {
    const data = await apiPost('/api/bookings', payload);
    return data?.booking || data;
  } catch (error) {
    throw normalizeError(error);
  }
};

export const fetchBookings = async (params = {}) => {
  try {
    return await apiGet('/api/bookings', params);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const fetchBookingById = async (bookingId) => {
  try {
    return await apiGet(`/api/bookings/${bookingId}`);
  } catch (error) {
    throw normalizeError(error);
  }
};
