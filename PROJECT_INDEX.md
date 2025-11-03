# Local Service Finder - Project Index

## 📁 File Structure

### Application Entry Point
- `app/index.tsx` - Root router that checks authentication state

### Authentication System
**Location**: `app/(auth)/`
- `_layout.tsx` - Auth stack navigation
- `welcome.tsx` - Landing page with sign-up/sign-in options
- `signup.tsx` - User registration with role selection
- `signin.tsx` - User login
- `profile-setup.tsx` - Profile completion during onboarding

### Main App Navigation
**Location**: `app/(tabs)/`
- `_layout.tsx` - Tab navigation setup (different for customer/provider)

### Customer Screens
**Location**: `app/(tabs)/`
- `home.tsx` - Homepage with categories and featured providers
- `search.tsx` - Search with advanced filters (category, price, rating)
- `bookings.tsx` - View and manage bookings
- `profile.tsx` - User profile management
- `provider-home.tsx` - Provider dashboard (for provider role)

### Booking & Booking Details
**Location**: `app/`
- `provider-details.tsx` - View provider profile, reviews, and book service
- `booking-create.tsx` - Create new booking with date/time/address

### Context & State Management
**Location**: `context/`
- `AuthContext.tsx` - Authentication state, session management, user data

### Library & Utilities
**Location**: `lib/`
- `supabase.ts` - Supabase client, type definitions for all models
- `utils.ts` - Helper functions (distance calc, formatting, validation)

### Hooks
**Location**: `hooks/`
- `useFrameworkReady.ts` - Framework initialization (required - do not modify)

### Assets
**Location**: `assets/`
- `images/favicon.png` - App favicon
- `images/icon.png` - App icon

### Configuration
- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (Supabase credentials)
- `package.json` - Dependencies and scripts
- `expo-env.d.ts` - Expo environment types

### Documentation
- `SETUP.md` - Complete setup guide and architecture docs
- `QUICKSTART.md` - Quick reference for using the app
- `PROJECT_INDEX.md` - This file

---

## 📊 Database Schema

### Tables Overview

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | User accounts | id, email, role (customer/provider), phone |
| `service_providers` | Provider profiles | id, category_id, hourly_rate, verification_status |
| `service_categories` | Service types | id, name, description |
| `bookings` | Service bookings | customer_id, provider_id, status, booking_date |
| `reviews` | Ratings & feedback | provider_id, rating, review_text |
| `notifications` | User notifications | user_id, title, message, is_read |
| `provider_availability` | Work schedules | provider_id, day_of_week, start_time, end_time |

All tables have Row Level Security enabled.

---

## 🔐 Authentication Flow

```
User → Sign Up/Sign In → Supabase Auth → JWT Token
                              ↓
                        Create/Update User Profile
                              ↓
                        AuthContext Stores Session
                              ↓
                        Redirect to Main App
```

---

## 🎯 Key Components

### AuthContext (context/AuthContext.tsx)
Provides authentication state and functions:
- `session` - Current session object
- `user` - Current user data
- `loading` - Auth loading state
- `signUp()` - Register new user
- `signIn()` - Login user
- `signOut()` - Logout user
- `updateProfile()` - Update user details

Usage: `const { user, signIn, signOut } = useAuth();`

### Supabase Client (lib/supabase.ts)
Initialized Supabase client with types for all models:
- `User` - User type
- `ServiceProvider` - Provider type
- `Booking` - Booking type
- `Review` - Review type
- `ServiceCategory` - Category type

Usage: `const { data } = await supabase.from('users').select('*');`

---

## 🚀 API Integration Points

### Ready for Integration (Phase 2)

**Payment Gateway**
- Integration point: After booking confirmation
- Files to modify: `app/booking-create.tsx`
- Providers: Razorpay, Stripe

**Messaging/Chat**
- Integration point: New screens in main app
- Real-time via Supabase Realtime
- Add to: `app/(tabs)/` or create `app/(tabs)/messages/`

**Push Notifications**
- Integration point: Booking updates, messages
- Firebase Cloud Messaging (FCM)
- Add notification handlers in `context/AuthContext.tsx`

**Map & Geolocation**
- Integration point: Provider search, booking location
- Google Maps API
- Enhance: `app/(tabs)/search.tsx`, `lib/utils.ts`

---

## 📱 User Roles & Permissions

### Customer
- ✅ Browse services
- ✅ Search with filters
- ✅ View provider profiles
- ✅ Create bookings
- ✅ View booking history
- ✅ Rate and review
- ❌ Cannot list services

### Service Provider
- ✅ Create profile
- ✅ Set pricing & availability
- ✅ View incoming bookings
- ✅ Accept/decline bookings
- ✅ View earnings
- ✅ View ratings
- ❌ Cannot browse other providers
- ❌ Cannot create bookings

### Admin (Future Phase)
- ✅ Verify providers
- ✅ View all data
- ✅ Manage disputes
- ✅ View analytics

---

## 🔄 Data Flow Examples

### Booking Creation Flow
```
Customer selects provider
        ↓
Opens provider details page
        ↓
Taps "Book Now"
        ↓
Fills booking form (date, time, address, duration)
        ↓
Reviews estimated price (hourly_rate × duration / 60)
        ↓
Confirms booking
        ↓
Inserts record in `bookings` table (status: pending)
        ↓
Booking appears in both customer and provider bookings lists
```

### Provider Search Flow
```
Customer opens Search screen
        ↓
Types name or views all providers
        ↓
Applies filters:
  - Category
  - Price range
  - Minimum rating
        ↓
Results filtered in real-time
        ↓
Taps provider → Opens provider-details screen
        ↓
Views profile, reviews, availability
        ↓
Can book or message provider
```

---

## 🧪 Testing Checklist

### Authentication
- [ ] Sign up as customer works
- [ ] Sign up as provider works
- [ ] Sign in works
- [ ] Profile setup saves data
- [ ] Sign out clears session

### Customer Features
- [ ] Home page loads
- [ ] Search filters work
- [ ] Provider details display
- [ ] Can create booking
- [ ] Bookings list shows created booking
- [ ] Can view past bookings

### Provider Features
- [ ] Provider home shows stats
- [ ] Dashboard displays correctly
- [ ] Can view bookings
- [ ] Profile is editable

### Data Persistence
- [ ] Data persists after refresh
- [ ] Bookings sync across screens
- [ ] User info loads correctly

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Type checking
npm run typecheck

# Build for web
npm run build:web

# Run linter
npm run lint

# Start dev server
npm run dev
```

---

## 📋 Coding Standards

- **Language**: TypeScript (strict mode)
- **Components**: Functional components with hooks
- **Styling**: StyleSheet from React Native
- **Icons**: lucide-react-native
- **Naming**: camelCase for functions, PascalCase for components
- **File Structure**: One component per file
- **Imports**: Absolute paths using `@/` prefix

---

## 🔒 Security Features

- ✅ Row Level Security on all tables
- ✅ JWT token authentication
- ✅ Password hashing via Supabase Auth
- ✅ User data isolation
- ✅ Verified provider display only
- ✅ No sensitive data in frontend code

---

## 📈 Performance Optimizations

- Lazy loading of data
- Query pagination
- Proper indexing in database
- Component optimization
- Efficient re-renders

---

## 🚧 Known Limitations

- Provider document verification not automated
- No payment processing yet
- No real-time chat
- Limited analytics
- No multi-language support (Phase 3)

---

## 📚 External Documentation

- [Supabase Docs](https://supabase.com/docs)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## 💡 Next Steps

1. **Test the MVP** - Create accounts and test features
2. **Integrate Payments** (Phase 2) - Add Razorpay/Stripe
3. **Add Messaging** (Phase 2) - Real-time provider-customer chat
4. **Provider Verification** - Automated document checking
5. **Analytics Dashboard** - Admin panel for metrics

---

**Last Updated**: November 2024
**Version**: 1.0.0 (MVP)
