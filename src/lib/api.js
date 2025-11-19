/**
 * Axios API client configured for Local Service Finder.
 *
 * Responsibilities:
 * - Set the API base URL from env (Vite or CRA style variables).
 * - Inject Firebase ID tokens on every request using the helper from lib/firebase.
 * - Handle 401 responses by forcing a token refresh and retrying once, otherwise
 *   trigger a global sign-out event so the UI can redirect to the login page.
 */
import axios from 'axios';
import { getIdToken, signOutUser } from './firebase';

const getEnvValue = (key, fallback) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteValue = import.meta.env[`VITE_${key}`];
    if (viteValue) return viteValue;
  }

  if (typeof process !== 'undefined' && process.env) {
    const craValue = process.env[`REACT_APP_${key}`];
    if (craValue) return craValue;
  }

  return fallback;
};

const baseURL = getEnvValue('API_BASE_URL', '/');

if (!baseURL || baseURL === '/') {
  console.warn('API base URL is not configured. Set VITE_API_BASE_URL in your env file.');
}

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const isUnauthorized = response?.status === 401;

    if (isUnauthorized && !config.__isRetryRequest) {
      config.__isRetryRequest = true;
      try {
        const refreshedToken = await getIdToken(true);
        if (refreshedToken) {
          config.headers.Authorization = `Bearer ${refreshedToken}`;
          return api(config);
        }
      } catch (refreshError) {
        console.error('Unable to refresh Firebase token after 401', refreshError);
      }
    }

    if (isUnauthorized) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:signout'));
      }
      await signOutUser();
    }

    return Promise.reject(error);
  },
);

export const apiGet = async (url, params = {}, config = {}) => {
  const response = await api.get(url, { params, ...config });
  return response.data;
};

export const apiPost = async (url, data = {}, config = {}) => {
  const response = await api.post(url, data, config);
  return response.data;
};
