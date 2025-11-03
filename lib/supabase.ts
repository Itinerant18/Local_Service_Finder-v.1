import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
