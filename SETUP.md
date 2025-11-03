# Local Service Finder - Setup & Documentation

## Overview

Local Service Finder is a hyperlocal marketplace platform that connects customers with nearby service providers. This is the MVP (Phase 1) implementation built with Expo React Native and Supabase.

## Architecture

### Tech Stack
- **Frontend**: React Native (Expo) with TypeScript
- **Backend**: Supabase (PostgreSQL database with Auth)
- **Authentication**: Supabase Auth (Email/Password)
- **Real-time**: Supabase Realtime (for future enhancements)
- **Deployment**: Expo (Web/Mobile)

### Project Structure

```
/app
  /(auth)           - Authentication screens
    welcome.tsx     - Landing page
    signup.tsx      - User registration
    signin.tsx      - User login
    profile-setup.tsx - Profile initialization
  /(tabs)           - Main app navigation
    home.tsx        - Customer home screen
    search.tsx      - Service provider search
    bookings.tsx    - Booking management
    provider-home.tsx - Provider dashboard
    profile.tsx     - User profile
  provider-details.tsx  - Provider profile view
  booking-create.tsx    - Booking creation
  index.tsx         - Root router (auth check)

/context
  AuthContext.tsx   - Authentication context & hooks

/lib
  supabase.ts       - Supabase client & types

/hooks
  useFrameworkReady.ts - Framework initialization
```

## Database Schema

### Core Tables

**users** - User accounts and profiles
- id (UUID, primary key)
- email, full_name, phone_number
- role (customer/provider/admin)
- profile_picture_url, address, city, state, pincode
- latitude, longitude, is_active, is_verified

**service_categories** - Service types
- id, name, description, icon_name

**service_providers** - Extended provider profiles
- id, category_id, experience_years, hourly_rate
- service_description, service_area_radius_km
- verification_status (pending/verified/rejected/suspended)
- id_proof_url, address_proof_url, certifications, portfolio_images
- average_rating, total_reviews, total_bookings, completed_bookings

**provider_availability** - Weekly availability schedule
- id, provider_id, day_of_week
- start_time, end_time, break_start, break_end

**bookings** - Service bookings
- id, customer_id, provider_id
- booking_date, booking_time, duration_minutes
- service_description, service_address
- estimated_price, final_price
- status (pending/confirmed/in_progress/completed/cancelled)
- payment_status

**reviews** - Ratings and feedback
- id, booking_id, customer_id, provider_id
- rating (1-5), review_text, review_images
- helpful_votes, provider_response

**notifications** - User notifications
- id, user_id, notification_type, title, message
- is_read, action_url

### Security (Row Level Security)

All tables have RLS enabled with strict policies:
- Users can only see their own data
- Service providers are visible only when verified
- Admins have full access
- Booking data is accessible to involved parties

## Key Features (MVP)

### Authentication
- Email/password registration and login
- Role selection (customer/provider)
- Profile setup during onboarding
- Secure session management with JWT tokens

### Customer Features
- Home screen with featured providers
- Search and filter service providers by:
  - Category
  - Distance
  - Price range
  - Rating
  - Availability
- View provider profiles with reviews
- Create bookings with date/time selection
- Manage bookings (view, cancel)
- Leave ratings and reviews

### Provider Features
- Profile creation with:
  - Service category
  - Experience level
  - Hourly rate
  - Service description
  - Documents upload (for future verification)
  - Portfolio images
- Dashboard with:
  - Booking stats
  - Upcoming bookings
  - Ratings overview
  - Earnings tracking
- Booking management

### Common Features
- User authentication and profile management
- Real-time booking updates
- Review and rating system
- Push notifications (ready for integration)

## Environment Setup

### Prerequisites
- Node.js 16+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Supabase account

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables** (already configured in `.env`)
   ```
   EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Type checking**
   ```bash
   npm run typecheck
   ```

5. **Build for web**
   ```bash
   npm run build:web
   ```

## Database Migrations

All database tables are created via migrations in Supabase:
- `001_create_core_tables` - Main tables with RLS policies
- `002_insert_service_categories` - Default service categories

Run migrations via Supabase dashboard or CLI.

## API Integration Points (For Phase 2)

### Payment Gateway
- Razorpay (primary), Stripe (secondary)
- Integration point: Booking confirmation

### Maps & Geolocation
- Google Maps API for distance calculation
- Location autocomplete for address selection

### Notifications
- Firebase Cloud Messaging (FCM)
- SMS via Twilio/MSG91

### Chat/Messaging
- Real-time messaging between customers and providers
- Supabase Realtime for live updates

## Testing

### Manual Testing Checklist

**Authentication**
- [ ] Sign up as customer
- [ ] Sign up as provider
- [ ] Sign in with email/password
- [ ] Profile setup completes correctly

**Customer Flow**
- [ ] Home page displays featured providers
- [ ] Search filters work correctly
- [ ] Provider details page loads correctly
- [ ] Can create a booking
- [ ] Booking appears in bookings list

**Provider Flow**
- [ ] Provider home shows stats
- [ ] Upcoming bookings display correctly
- [ ] Can view bookings list

**General**
- [ ] Navigation between tabs works
- [ ] Sign out clears session
- [ ] Redirects to login when logged out

## Performance Optimization

Current optimizations:
- Lazy loading of data with pagination
- Filtered queries for specific data
- Proper index usage in database
- React Native performance best practices

## Security Best Practices

- All passwords hashed with bcrypt (Supabase Auth handles this)
- JWT tokens with expiration
- Row Level Security on all tables
- No sensitive data in local storage
- HTTPS only (production)

## Known Limitations & Future Work

### Phase 2 Features
- Payment integration (Razorpay/Stripe)
- In-app messaging/chat
- Provider document verification workflow
- Advanced analytics dashboard
- Email/SMS notifications

### Phase 3 Features
- AI-based provider recommendations
- Subscription plans for providers
- Loyalty/rewards program
- Video consultations
- Multi-language support
- Corporate accounts

## Deployment

### Web Deployment
```bash
npm run build:web
# Export to /dist directory
# Deploy to Vercel/Netlify/AWS
```

### Mobile Deployment
- iOS: Use Xcode with Expo build
- Android: Use Android Studio with Expo build

## Support & Troubleshooting

### Common Issues

**"Cannot find module" errors**
```bash
npm install
npm run typecheck
```

**Database connection issues**
- Verify Supabase URL and keys in `.env`
- Check network connectivity
- Ensure database is running in Supabase

**Build errors**
```bash
rm -rf node_modules
npm install
npm run build:web
```

## Contact & Support

For issues or questions:
- Review the PRD document for requirements
- Check Supabase documentation
- Refer to React Native/Expo documentation

---

**Version**: 1.0.0 (MVP)
**Last Updated**: November 2024
