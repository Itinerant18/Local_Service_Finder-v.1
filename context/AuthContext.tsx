import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { Platform } from 'react-native';
import { auth, googleProvider, User } from '@/lib/firebase';
import { setUserProfile, getUserById } from '@/lib/realtime-helpers';

// For web: use signInWithPopup
// For React Native: use @react-native-google-signin/google-signin or expo-auth-session

interface AuthContextType {
  session: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'customer' | 'provider') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string, role: 'customer' | 'provider') => Promise<{ verificationId: string }>;
  verifyPhoneCode: (verificationId: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Recaptcha verifier instance (for phone auth - web only)
let recaptchaVerifier: any = null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setSession(firebaseUser);

      if (firebaseUser) {
        // Get user data from Realtime Database
        try {
          const userData = await getUserById(firebaseUser.uid);

          if (userData) {
            setUser({ ...userData, id: firebaseUser.uid });
          } else {
            // User document doesn't exist, create it
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              full_name: firebaseUser.displayName || null,
              phone_number: firebaseUser.phoneNumber || null,
              profile_picture_url: firebaseUser.photoURL || null,
              role: 'customer',
              date_of_birth: null,
              address: null,
              city: null,
              state: null,
              pincode: null,
              latitude: null,
              longitude: null,
              is_active: true,
              is_verified: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            await setUserProfile(firebaseUser.uid, newUser);
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, role: 'customer' | 'provider') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Realtime Database
      const userData: User = {
        id: firebaseUser.uid,
        email: email,
        full_name: null,
        phone_number: null,
        profile_picture_url: null,
        role: role,
        date_of_birth: null,
        address: null,
        city: null,
        state: null,
        pincode: null,
        latitude: null,
        longitude: null,
        is_active: true,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await setUserProfile(firebaseUser.uid, userData);
    } catch (error: any) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      let firebaseUser: FirebaseUser;

      if (Platform.OS === 'web') {
        // For web: use signInWithPopup
        const { signInWithPopup } = await import('firebase/auth');
        const result = await signInWithPopup(auth, googleProvider);
        firebaseUser = result.user;
      } else {
        // For React Native: Use @react-native-google-signin/google-signin
        // Or expo-auth-session with Google
        // For now, throw error - implement based on your needs
        throw new Error('Google sign-in for React Native requires additional setup. Please use @react-native-google-signin/google-signin or expo-auth-session.');
      }

      // Check if user exists, if not create profile
      const userData = await getUserById(firebaseUser.uid);
      if (!userData) {
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || null,
          phone_number: firebaseUser.phoneNumber || null,
          profile_picture_url: firebaseUser.photoURL || null,
          role: 'customer',
          date_of_birth: null,
          address: null,
          city: null,
          state: null,
          pincode: null,
          latitude: null,
          longitude: null,
          is_active: true,
          is_verified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await setUserProfile(firebaseUser.uid, newUser);
      }
    } catch (error: any) {
      throw error;
    }
  };

  const signInWithPhone = async (phoneNumber: string, role: 'customer' | 'provider') => {
    try {
      // Phone authentication setup
      // For web: requires RecaptchaVerifier
      // For React Native: use expo-auth-session or react-native-firebase
      
      if (Platform.OS === 'web') {
        const { RecaptchaVerifier, signInWithPhoneNumber } = await import('firebase/auth');
        
        // Initialize recaptcha verifier
        if (!recaptchaVerifier) {
          recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              // reCAPTCHA solved
            },
          });
        }

        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        return {
          verificationId: confirmationResult.verificationId,
        };
      } else {
        // For React Native, use expo-auth-session or react-native-firebase
        throw new Error('Phone sign-in for React Native requires additional setup. Please use expo-auth-session or react-native-firebase.');
      }
    } catch (error: any) {
      throw error;
    }
  };

  const verifyPhoneCode = async (verificationId: string, code: string) => {
    try {
      const { PhoneAuthProvider } = await import('firebase/auth');
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);
      const firebaseUser = result.user;

      // Check if user exists, if not create profile
      const userData = await getUserById(firebaseUser.uid);
      if (!userData) {
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || null,
          phone_number: firebaseUser.phoneNumber || null,
          profile_picture_url: firebaseUser.photoURL || null,
          role: 'customer',
          date_of_birth: null,
          address: null,
          city: null,
          state: null,
          pincode: null,
          latitude: null,
          longitude: null,
          is_active: true,
          is_verified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await setUserProfile(firebaseUser.uid, newUser);
      }
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setSession(null);
      setUser(null);
      recaptchaVerifier = null;
    } catch (error: any) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!session?.uid) throw new Error('No user logged in');

      const currentUser = await getUserById(session.uid);
      if (!currentUser) throw new Error('User not found');
      
      const updateData = {
        ...currentUser,
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      await setUserProfile(session.uid, updateData as User);
      setUser((prev) => (prev ? { ...prev, ...updateData } : null));
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithPhone,
        verifyPhoneCode,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
