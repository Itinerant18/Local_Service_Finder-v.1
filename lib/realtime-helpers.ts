import { ref, get, set, push, update, remove, query, orderByChild, equalTo, limitToFirst, onValue, off } from 'firebase/database';
import { db } from './firebase';
import { ServiceCategory, ServiceProvider, User, Booking, Review } from './firebase';

// Helper function to convert Realtime Database snapshot to typed object
export const convertSnapshot = (snapshot: any, includeId: boolean = true): any => {
  if (!snapshot.exists()) return null;
  
  const data = snapshot.val();
  if (!data) return null;
  
  if (includeId && snapshot.key) {
    return { ...data, id: snapshot.key };
  }
  
  return data;
};

// Helper function to convert array of snapshots
export const convertSnapshotArray = (snapshot: any): any[] => {
  if (!snapshot.exists()) return [];
  
  const data = snapshot.val();
  if (!data) return [];
  
  return Object.keys(data).map((key) => ({
    ...data[key],
    id: key,
  }));
};

// Get all service categories
export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    const categoriesRef = ref(db, 'service_categories');
    const snapshot = await get(categoriesRef);
    if (!snapshot.exists()) {
      console.log('No service categories found. Please initialize the database.');
      return [];
    }
    return convertSnapshotArray(snapshot) as ServiceCategory[];
  } catch (error) {
    console.error('Error fetching service categories:', error);
    return [];
  }
};

// Get service providers with user data
export const getServiceProviders = async (filters?: {
  verificationStatus?: string;
  categoryId?: string;
  limitCount?: number;
  orderByRating?: boolean;
}): Promise<any[]> => {
  try {
    const providersRef = ref(db, 'service_providers');
    let providersQuery = providersRef;
    
    // Apply filters - Note: Realtime Database requires indexes for orderByChild queries
    // If no providers exist or index is missing, we'll get all and filter in memory
    try {
      if (filters?.verificationStatus) {
        providersQuery = query(
          providersRef,
          orderByChild('verification_status'),
          equalTo(filters.verificationStatus)
        );
      }
    } catch (queryError: any) {
      // If query fails (likely due to missing index), fall back to getting all
      console.warn('Query failed, fetching all providers:', queryError.message);
      providersQuery = providersRef;
    }
    
    const snapshot = await get(providersQuery);
    if (!snapshot.exists()) {
      return [];
    }
    
    let providers = convertSnapshotArray(snapshot) as ServiceProvider[];
    
    // Apply additional filters in memory
    if (filters?.verificationStatus && !snapshot.exists()) {
      providers = providers.filter((p) => p.verification_status === filters.verificationStatus);
    }
    
    if (filters?.categoryId) {
      providers = providers.filter((p) => p.category_id === filters.categoryId);
    }
    
    // Sort by rating if requested
    if (filters?.orderByRating) {
      providers.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    }
    
    // Apply limit
    if (filters?.limitCount) {
      providers = providers.slice(0, filters.limitCount);
    }
    
    // Fetch user data for each provider
    const providersWithUsers = await Promise.all(
      providers.map(async (provider) => {
        try {
          const userSnapshot = await get(ref(db, `users/${provider.id}`));
          const userData = userSnapshot.exists() ? convertSnapshot(userSnapshot, false) as User : null;
          return {
            ...provider,
            users: userData ? {
              full_name: userData.full_name,
              profile_picture_url: userData.profile_picture_url,
              city: userData.city,
              phone_number: userData.phone_number,
            } : null,
          };
        } catch (error) {
          console.error(`Error fetching user data for provider ${provider.id}:`, error);
          return {
            ...provider,
            users: null,
          };
        }
      })
    );
    
    return providersWithUsers;
  } catch (error) {
    console.error('Error fetching service providers:', error);
    return [];
  }
};

// Get a single provider by ID
export const getProviderById = async (providerId: string): Promise<any> => {
  const providerSnapshot = await get(ref(db, `service_providers/${providerId}`));
  if (!providerSnapshot.exists()) return null;
  
  const provider = convertSnapshot(providerSnapshot) as ServiceProvider;
  const userSnapshot = await get(ref(db, `users/${providerId}`));
  const userData = userSnapshot.exists() ? convertSnapshot(userSnapshot, false) as User : null;
  
  return {
    ...provider,
    users: userData ? {
      id: userData.id,
      full_name: userData.full_name,
      profile_picture_url: userData.profile_picture_url,
      city: userData.city,
      phone_number: userData.phone_number,
    } : null,
  };
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  const userSnapshot = await get(ref(db, `users/${userId}`));
  if (!userSnapshot.exists()) return null;
  return convertSnapshot(userSnapshot) as User;
};

// Create a booking
export const createBooking = async (bookingData: Partial<Booking>): Promise<string> => {
  const bookingsRef = ref(db, 'bookings');
  const newBookingRef = push(bookingsRef);
  
  const bookingWithTimestamps = {
    ...bookingData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  await set(newBookingRef, bookingWithTimestamps);
  return newBookingRef.key!;
};

// Get bookings for a user (customer or provider)
export const getUserBookings = async (
  userId: string,
  role: 'customer' | 'provider',
  statusFilter?: string
): Promise<Booking[]> => {
  const fieldName = role === 'customer' ? 'customer_id' : 'provider_id';
  const bookingsRef = ref(db, 'bookings');
  
  let bookingsQuery = query(
    bookingsRef,
    orderByChild(fieldName),
    equalTo(userId)
  );
  
  const snapshot = await get(bookingsQuery);
  let bookings = convertSnapshotArray(snapshot) as Booking[];
  
  // Filter by status in memory if needed
  if (statusFilter && statusFilter !== 'all') {
    bookings = bookings.filter((b) => b.status === statusFilter);
  }
  
  // Sort by date descending
  bookings.sort((a, b) => b.booking_date.localeCompare(a.booking_date));
  
  return bookings;
};

// Get provider reviews
export const getProviderReviews = async (providerId: string, limitCount?: number): Promise<Review[]> => {
  const reviewsRef = ref(db, 'reviews');
  const reviewsQuery = query(
    reviewsRef,
    orderByChild('provider_id'),
    equalTo(providerId)
  );
  
  const snapshot = await get(reviewsQuery);
  let reviews = convertSnapshotArray(snapshot) as Review[];
  
  // Sort by created_at descending
  reviews.sort((a, b) => b.created_at.localeCompare(a.created_at));
  
  if (limitCount) {
    reviews = reviews.slice(0, limitCount);
  }
  
  return reviews;
};

// Get provider by user ID (for provider home)
export const getProviderByUserId = async (userId: string): Promise<ServiceProvider | null> => {
  const providerSnapshot = await get(ref(db, `service_providers/${userId}`));
  if (!providerSnapshot.exists()) return null;
  return convertSnapshot(providerSnapshot) as ServiceProvider;
};

// Create service provider profile
export const createServiceProvider = async (providerData: Partial<ServiceProvider>): Promise<void> => {
  if (!providerData.id) throw new Error('Provider ID is required');
  
  const providerWithTimestamps = {
    ...providerData,
    average_rating: 0,
    total_reviews: 0,
    total_bookings: 0,
    completed_bookings: 0,
    is_available: true,
    portfolio_images: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  await set(ref(db, `service_providers/${providerData.id}`), providerWithTimestamps);
};

// Create a review
export const createReview = async (reviewData: Partial<Review>): Promise<string> => {
  const reviewsRef = ref(db, 'reviews');
  const newReviewRef = push(reviewsRef);
  
  const reviewWithTimestamps = {
    ...reviewData,
    review_images: reviewData.review_images || [],
    helpful_votes: 0,
    unhelpful_votes: 0,
    provider_response: null,
    provider_response_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  await set(newReviewRef, reviewWithTimestamps);
  return newReviewRef.key!;
};

// Check if review exists for a booking
export const getReviewByBookingId = async (bookingId: string): Promise<Review | null> => {
  const reviewsRef = ref(db, 'reviews');
  const reviewsQuery = query(
    reviewsRef,
    orderByChild('booking_id'),
    equalTo(bookingId)
  );
  
  const snapshot = await get(reviewsQuery);
  if (!snapshot.exists()) return null;
  
  const reviews = convertSnapshotArray(snapshot) as Review[];
  return reviews[0] || null;
};

// Get booking by ID
export const getBookingById = async (bookingId: string): Promise<Booking | null> => {
  const bookingSnapshot = await get(ref(db, `bookings/${bookingId}`));
  if (!bookingSnapshot.exists()) return null;
  return convertSnapshot(bookingSnapshot) as Booking;
};

// Update provider rating based on all reviews
export const updateProviderRating = async (providerId: string): Promise<void> => {
  const reviews = await getProviderReviews(providerId);
  if (reviews.length === 0) return;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  await update(ref(db, `service_providers/${providerId}`), {
    average_rating: averageRating,
    total_reviews: reviews.length,
    updated_at: new Date().toISOString(),
  });
};

// Update user profile
export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<void> => {
  await update(ref(db, `users/${userId}`), {
    ...data,
    updated_at: new Date().toISOString(),
  });
};

// Create or update user
export const setUserProfile = async (userId: string, userData: User): Promise<void> => {
  await set(ref(db, `users/${userId}`), userData);
};

