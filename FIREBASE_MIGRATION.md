# Firebase Migration Guide

## Overview
This project has been migrated from Supabase to Firebase (Firestore + Firebase Auth).

## Changes Made

### 1. Firebase Configuration
- Created `lib/firebase.ts` - Firebase initialization and configuration
- Replaced `lib/supabase.ts` (kept for reference, but all imports now use Firebase)

### 2. Authentication
- Updated `context/AuthContext.tsx` to use Firebase Auth instead of Supabase Auth
- Authentication methods: `signUp`, `signIn`, `signOut`, `updateProfile` now use Firebase

### 3. Database Operations
- Created `lib/firestore-helpers.ts` - Helper functions for Firestore operations
- All database queries now use Firestore instead of Supabase PostgreSQL
- Updated all screens to use Firestore:
  - `app/(tabs)/home.tsx`
  - `app/(tabs)/search.tsx`
  - `app/(tabs)/bookings.tsx`
  - `app/(tabs)/provider-home.tsx`
  - `app/booking-create.tsx`
  - `app/provider-details.tsx`
  - `app/review-create.tsx`
  - `app/(auth)/profile-setup.tsx`

### 4. Dependencies
- Added: `firebase`, `@react-native-async-storage/async-storage`
- Removed: `@supabase/supabase-js`

## Setup Instructions

### 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your Firebase config from Project Settings

### 2. Environment Variables
Create a `.env` file in the project root with:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Database Structure

Create the following collections in Firestore:

#### Collections:
- `users` - User profiles
- `service_categories` - Service types
- `service_providers` - Provider profiles
- `bookings` - Service bookings
- `reviews` - Reviews and ratings

#### Firestore Security Rules

Set up Firestore security rules (replace with your requirements):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Service providers - readable by all, writable by owner
    match /service_providers/{providerId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == providerId;
    }
    
    // Bookings - readable/writable by customer or provider
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && (
        resource.data.customer_id == request.auth.uid ||
        resource.data.provider_id == request.auth.uid
      );
    }
    
    // Reviews - readable by all, writable by customer
    match /reviews/{reviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.customer_id == request.auth.uid;
    }
    
    // Service categories - readable by all
    match /service_categories/{categoryId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write
    }
  }
}
```

### 4. Firestore Indexes

You may need to create composite indexes for certain queries. Firebase will prompt you in the console when needed.

Common indexes needed:
- `bookings` collection: `customer_id` (ASC) + `booking_date` (DESC)
- `bookings` collection: `provider_id` (ASC) + `booking_date` (DESC)
- `reviews` collection: `provider_id` (ASC) + `created_at` (DESC)

### 5. Data Migration

If you have existing data in Supabase, you'll need to:
1. Export data from Supabase
2. Transform to Firestore format
3. Import to Firestore

You can use the Firebase Console or write a migration script.

## Key Differences from Supabase

### Query Syntax
- Supabase: `supabase.from('table').select('*').eq('id', 'value')`
- Firestore: `getDocs(query(collection(db, 'collection'), where('id', '==', 'value')))`

### Authentication
- Supabase: `supabase.auth.signUp()`, `supabase.auth.signInWithPassword()`
- Firebase: `createUserWithEmailAndPassword()`, `signInWithEmailAndPassword()`

### Real-time Updates
- Supabase: Built-in real-time subscriptions
- Firestore: Use `onSnapshot()` for real-time listeners (not implemented yet)

## Testing Checklist

- [ ] Firebase configuration loads correctly
- [ ] User signup works
- [ ] User signin works
- [ ] User profile creation works
- [ ] Service categories load
- [ ] Provider profiles load
- [ ] Booking creation works
- [ ] Booking listing works
- [ ] Review creation works
- [ ] Provider dashboard loads

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check environment variables are set correctly
2. **Permission denied**: Check Firestore security rules
3. **Index required**: Create composite indexes as prompted in Firebase Console
4. **Query errors**: Firestore requires indexes for queries with multiple where clauses + orderBy

## Next Steps

1. Set up Firebase project
2. Configure environment variables
3. Set up Firestore security rules
4. Create necessary indexes
5. Test all features
6. Migrate existing data (if applicable)

## Notes

- The old `lib/supabase.ts` file is kept for reference but is no longer used
- All type definitions remain the same for compatibility
- Helper functions in `lib/firestore-helpers.ts` abstract Firestore operations

