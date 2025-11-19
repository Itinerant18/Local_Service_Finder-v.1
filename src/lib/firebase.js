/**
 * Firebase client helper for the Local Service Finder web app.
 *
 * The backend validates Firebase ID tokens on every API request, so this module
 * is responsible for initializing the Firebase SDK, exposing lightweight auth
 * helpers, and keeping an up-to-date ID token cache for the axios client.
 */
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

const getEnvValue = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteValue = import.meta.env[`VITE_${key}`];
    if (viteValue) return viteValue;
  }

  if (typeof process !== 'undefined' && process.env) {
    const craValue = process.env[`REACT_APP_${key}`];
    if (craValue) return craValue;
  }

  return undefined;
};

const firebaseConfig = {
  apiKey: getEnvValue('FIREBASE_API_KEY'),
  authDomain: getEnvValue('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvValue('FIREBASE_PROJECT_ID'),
  appId: getEnvValue('FIREBASE_APP_ID'),
  storageBucket: getEnvValue('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvValue('FIREBASE_MESSAGING_SENDER_ID'),
  measurementId: getEnvValue('FIREBASE_MEASUREMENT_ID'),
};

// Fail fast if required Firebase config is missing so developers notice early.
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value && key !== 'measurementId') {
    console.warn(
      `Firebase configuration for ${key} is missing. Check your environment variables.`,
    );
  }
});

const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

let cachedIdToken = null;
let inflightTokenPromise = null;

const requestIdToken = async (forceRefresh = false) => {
  const user = auth.currentUser;
  if (!user) {
    cachedIdToken = null;
    return null;
  }

  if (!inflightTokenPromise) {
    inflightTokenPromise = user
      .getIdToken(forceRefresh)
      .then((token) => {
        cachedIdToken = token;
        return token;
      })
      .catch((error) => {
        console.error('Failed to fetch Firebase ID token', error);
        cachedIdToken = null;
        throw error;
      })
      .finally(() => {
        inflightTokenPromise = null;
      });
  }

  return inflightTokenPromise;
};

/**
 * Returns the cached Firebase ID token if available, or fetches a new one.
 * @param {boolean} forceRefresh - When true forces Firebase to mint a new token.
 * @returns {Promise<string|null>} The ID token string or null if no user session exists.
 */
export const getIdToken = async (forceRefresh = false) => {
  if (forceRefresh) {
    return requestIdToken(true);
  }

  if (cachedIdToken) {
    return cachedIdToken;
  }

  return requestIdToken(false);
};

onIdTokenChanged(auth, async (user) => {
  if (!user) {
    cachedIdToken = null;
    return;
  }

  try {
    cachedIdToken = await user.getIdToken();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('auth:token', {
          detail: { token: cachedIdToken, uid: user.uid },
        }),
      );
    }
  } catch (error) {
    console.error('Failed to refresh ID token inside onIdTokenChanged', error);
  }
});

/**
 * Wraps Firebase's onAuthStateChanged so pages can subscribe and unsubscribe easily.
 */
export const onAuthStateChanged = (callback) => firebaseOnAuthStateChanged(auth, callback);

/**
 * Signs a user in with email/password credentials.
 * Backend services should receive the refreshed ID token immediately after.
 */
export const signInWithEmail = async (email, password) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  await getIdToken(true);
  return credentials.user;
};

/**
 * Signs a user up with email/password credentials.
 */
export const signUpWithEmail = async (email, password) => {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  await getIdToken(true);
  return credentials.user;
};

/**
 * Signs the current user out and clears cached tokens.
 */
export const signOutUser = async () => {
  cachedIdToken = null;
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Firebase sign-out failed', error);
  }
};

export default firebaseApp;
