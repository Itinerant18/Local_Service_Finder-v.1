import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvUVkQB5A0b5Jfc1sXfrNFY5LR1b547dI",
  authDomain: "local-service-f637f.firebaseapp.com",
  databaseURL: "https://local-service-f637f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "local-service-f637f",
  storageBucket: "local-service-f637f.firebasestorage.app",
  messagingSenderId: "799714364977",
  appId: "1:799714364977:web:3628a1aec51180b9e70f10",
  measurementId: "G-LVSWCKT54B"
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Phone Auth Provider
export const phoneProvider = new PhoneAuthProvider(auth);

// Initialize Realtime Database
export const db: Database = getDatabase(app);

// Initialize Storage
export const storage: FirebaseStorage = getStorage(app);

export default app;

// Type definitions (same as Supabase for compatibility)
export type User = {
  id: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  profile_picture_url: string | null;
  role: 'customer' | 'provider' | 'admin';
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceProvider = {
  id: string;
  category_id: string;
  experience_years: number;
  hourly_rate: number;
  service_description: string | null;
  services_offered?: string[]; // e.g., ["AC repair", "Wiring fix"]
  service_area_radius_km: number;
  verification_status: 'pending' | 'verified' | 'rejected' | 'suspended';
  verification_documents: any;
  id_proof_url: string | null;
  address_proof_url: string | null;
  certifications: any;
  portfolio_images: string[];
  average_rating: number;
  total_reviews: number;
  total_bookings: number;
  completed_bookings: number;
  response_time_minutes: number | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  customer_id: string;
  provider_id: string;
  booking_date: string;
  booking_time: string;
  duration_minutes: number;
  service_description: string | null;
  service_address: string;
  latitude: number | null;
  longitude: number | null;
  special_instructions: string | null;
  estimated_price: number;
  final_price: number | null;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  cancellation_reason: string | null;
  cancelled_by: 'customer' | 'provider' | null;
  cancelled_at: string | null;
  completed_at: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  booking_id: string;
  customer_id: string;
  provider_id: string;
  rating: number;
  review_text: string | null;
  review_images: string[];
  helpful_votes: number;
  unhelpful_votes: number;
  provider_response: string | null;
  provider_response_at: string | null;
  created_at: string;
  updated_at: string;
};

