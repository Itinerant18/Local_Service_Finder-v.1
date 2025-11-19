import { sendPasswordResetEmail } from 'firebase/auth';
import {
  auth,
  getIdToken,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
} from '../lib/firebase';
import { apiGet, apiPost } from '../lib/api';

const normalizeError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.';

  const normalizedError = new Error(message);
  normalizedError.code = error?.code || error?.response?.status || 'unknown';
  return normalizedError;
};

const mapFirebaseUser = (firebaseUser) => ({
  id: firebaseUser?.uid,
  uid: firebaseUser?.uid,
  email: firebaseUser?.email,
  displayName: firebaseUser?.displayName,
  photoURL: firebaseUser?.photoURL,
  phone: firebaseUser?.phoneNumber,
  role: 'customer',
});

export const sessionSync = async (idToken) => {
  if (!idToken) return null;
  try {
    return await apiPost('/api/auth/session', { idToken });
  } catch (error) {
    console.warn('Session sync failed', error?.response?.data || error?.message);
    return null;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const data = await apiGet('/api/users/me');
    return data?.user || data;
  } catch (error) {
    console.warn('Unable to fetch current user profile', error?.response?.data || error?.message);
    return null;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const firebaseUser = await signInWithEmail(email, password);
    const idToken = await getIdToken(true);
    await sessionSync(idToken);
    const profile = (await fetchCurrentUser()) || mapFirebaseUser(firebaseUser);
    return { user: profile, idToken };
  } catch (error) {
    throw normalizeError(error);
  }
};

export const registerWithEmail = async ({ name, email, password, role, phone }) => {
  try {
    await signUpWithEmail(email, password);
    const idToken = await getIdToken(true);
    await sessionSync(idToken);
    const profile = (await fetchCurrentUser()) || {
      id: auth.currentUser?.uid,
      uid: auth.currentUser?.uid,
      email,
      displayName: name,
      phone,
      role: role || 'customer',
    };
    return { user: profile, idToken };
  } catch (error) {
    throw normalizeError(error);
  }
};

export const requestPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const signOutCurrentUser = async () => {
  await signOutUser();
};
