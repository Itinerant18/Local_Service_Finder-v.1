# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Product Context

**Local Service Finder** is a hyperlocal marketplace connecting customers with nearby service providers (plumbers, electricians, carpenters, teachers, drivers, cooks, etc.) in urban/semi-urban India.

**Business Model:** 15-20% commission per completed booking

**Target Metrics:**
- 80%+ booking completion rate
- Average rating above 4.2/5.0
- 85%+ service completion rate

**Service Categories (11 predefined):**
Plumbing, Electrical, Carpentry, Teaching, Driving, Cooking, Cleaning, Painting, AC Repair, Mobile Repair, Home Appliance Repair

## Development Commands

```bash
# Start development server (web/mobile)
npm run dev

# Type checking (REQUIRED before commits)
npm run typecheck

# Linting
npm run lint

# Build for web deployment
npm run build:web

# Install dependencies
npm install
```

### Running Single Tests
This project does not currently have automated tests configured. Manual testing is required using the checklists in SETUP.md and QUICKSTART.md.

### Performance Targets (PRD Requirements)
- API Response Time: < 200ms average, < 500ms p95
- Page Load Time: < 2 seconds
- Search Response: < 500ms
- System should support 10,000+ concurrent users

## Project Architecture

### Tech Stack
- **Frontend**: Expo React Native + TypeScript (strict mode)
- **Backend**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth with JWT tokens
- **Navigation**: Expo Router with file-based routing
- **Icons**: lucide-react-native

### Expo Router File-Based Routing

This project uses Expo Router for navigation. Understanding the routing structure is critical:

- `app/index.tsx` - Root entry point that checks auth state and redirects
- `app/(auth)/` - Auth stack (welcome, signup, signin, profile-setup)
- `app/(tabs)/` - Main app tabs with role-based navigation
- Files like `provider-details.tsx` and `booking-create.tsx` are modal/stack screens

**Key Routing Patterns:**
- `(auth)` and `(tabs)` folders create route groups (parentheses don't appear in URLs)
- `_layout.tsx` files define navigation structure for their directory
- Navigation uses `<Link>` or `router.push()` from `expo-router`
- Each `_layout.tsx` can conditionally render different tabs based on user role

### State Management Architecture

**AuthContext Pattern:**
- Single source of truth for authentication state
- Located at `context/AuthContext.tsx`
- Provides: `session`, `user`, `loading`, `signUp()`, `signIn()`, `signOut()`, `updateProfile()`
- Auto-syncs with Supabase auth state changes
- Fetches and maintains user profile data from `users` table

**Data Fetching Pattern:**
- Direct Supabase queries in components (no Redux/Zustand)
- Use `useEffect` for initial data loading
- Real-time subscriptions available via Supabase Realtime (not yet implemented)

### Role-Based Access Control

The app has TWO distinct user experiences based on `user.role`:

**Customer Role:**
- Tab navigation: Home, Search, Bookings, Profile
- Can browse providers, create bookings, leave reviews
- Cannot view provider dashboard or manage service offerings

**Provider Role:**
- Tab navigation: Provider Home (dashboard), Bookings, Profile
- No Search tab (providers don't browse other providers)
- Dashboard shows stats: bookings, rating, earnings
- Can manage incoming bookings

**Implementation:** Check `app/(tabs)/_layout.tsx` to see how tabs conditionally render based on `user.role`.

### Database Schema Key Relationships

```
users (base profile)
  ├─> service_providers (if role='provider')
  │     ├─> service_categories (FK: category_id)
  │     └─> provider_availability
  │
  └─> bookings (as customer_id or provider_id)
        ├─> reviews (after completion)
        └─> notifications
```

**Critical Tables:**
- `users` - All user accounts (customer and provider)
- `service_providers` - Extended profile for providers only (verification_status: pending/verified/rejected/suspended)
- `bookings` - Links customers to providers with status workflow
- `reviews` - Only created after booking completion (1-5 stars, one per booking)
- `provider_availability` - Weekly schedule (day_of_week, start_time, end_time, breaks)

**Booking Status Flow:**
```
Pending → Confirmed → In Progress → Completed
    ↓
Cancelled
```

**Cancellation Policy (Important for Booking Logic):**
- Free cancellation: Up to 4 hours before service
- 50% charge: 2-4 hours before service
- 100% charge: Less than 2 hours before service

**Row Level Security:**
All tables use RLS policies. When querying:
- Users see their own data automatically
- Providers only visible when `verification_status = 'verified'`
- Booking data accessible to both customer and provider involved

### Type System

All database types defined in `lib/supabase.ts`:
- `User` - User profile type
- `ServiceProvider` - Provider profile type
- `ServiceCategory` - Service categories
- `Booking` - Booking details
- `Review` - Review/rating data

**Always use these types** when working with database queries to ensure type safety.

### Data Validation Rules

**User Registration:**
- Password: Minimum 8 characters
- Phone: OTP verification required
- Age restriction: 18+ years only

**Service Provider Profile:**
- Experience: 0-50 years
- Hourly rate: ₹0-₹10,000
- Service description: Max 1000 characters
- Documents: Max 5MB per file (JPG, PNG, PDF)
- Portfolio: Max 10 images

**Booking:**
- Service description: Max 500 characters
- Special instructions: Optional
- Duration: Common options 30m, 60m, 90m, 120m
- Estimated price calculation: `hourly_rate × duration / 60`

**Reviews:**
- Rating: 1-5 stars (required)
- Review text: Optional, max 500 characters
- Photos: Optional, max 3 images
- One review per booking
- Can edit within 48 hours (limit: 1 edit)

**Search & Filters:**
- Search radius: 1-50km
- Price range filter: ₹0-₹5000/hour
- Minimum rating filter: 1-5 stars
- Distance calculation: Haversine formula
- Pagination: 20 results per page

## Coding Standards

- **TypeScript**: Strict mode enabled - no implicit `any`
- **Components**: Functional components with hooks only
- **Styling**: React Native `StyleSheet` (no Tailwind/NativeWind despite dependencies)
- **Naming**: 
  - Functions/variables: `camelCase`
  - Components: `PascalCase`
  - Files: `kebab-case.tsx`
- **Imports**: Use absolute paths with `@/` prefix (configured in tsconfig.json)
- **File Structure**: One component per file

## Common Development Patterns

### Fetching User Data
```typescript
const { user } = useAuth();
const { data: providers } = await supabase
  .from('service_providers')
  .select('*, users(*), service_categories(*)')
  .eq('verification_status', 'verified');
```

### Creating a Booking
```typescript
const { data, error } = await supabase.from('bookings').insert({
  customer_id: user.id,
  provider_id: selectedProviderId,
  booking_date: date,
  booking_time: time,
  duration_minutes: duration,
  service_address: address,
  estimated_price: calculatePrice(hourlyRate, duration),
  status: 'pending'
});
```

### Joining Tables
Use Supabase's PostgREST syntax for foreign key expansions:
```typescript
.select('*, users(*), service_categories(*)')
```

## Important Files & Their Purpose

- `app/index.tsx` - Auth gate, DO NOT modify routing logic without understanding flow
- `context/AuthContext.tsx` - Central auth state, handles Supabase session management
- `lib/supabase.ts` - Supabase client initialization and all type definitions
- `hooks/useFrameworkReady.ts` - Framework initialization hook (DO NOT MODIFY)
- `app/(tabs)/_layout.tsx` - Role-based tab navigation logic

## Environment Configuration

Required environment variables (create `.env` file):
```
EXPO_PUBLIC_SUPABASE_URL=<your-project-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

These are accessed via `process.env.EXPO_PUBLIC_*` in the code.

## Known Limitations & Future Work

**MVP Scope (Phase 1 - Current):**
- ✅ User registration & authentication (email/password)
- ✅ Service provider profile creation
- ✅ Location-based search
- ✅ Booking creation & management
- ✅ Review & rating system
- ✅ Admin approval workflow
- ✅ Basic dashboards (customer & provider)
- ✅ Email/SMS notifications
- 🚧 Mobile app (React Native)
- ❌ Payment processing (not yet integrated)
- ❌ In-app chat
- ❌ Real-time notifications
- ❌ Advanced maps integration

**Phase 2 (Month 4-6):**
- In-app chat (customer ↔ provider) - add to `app/(tabs)/messages/`
- Payment integration (Razorpay primary, Stripe secondary) - integration point: `booking-create.tsx`
- Advanced search filters
- Provider portfolio showcase
- Wallet & cashback system
- Referral program
- Push notifications via FCM - handlers in `AuthContext.tsx`
- Analytics dashboard
- Google Maps API - enhance `search.tsx` and `utils.ts`

**Phase 3 (Month 7-12):**
- Subscription plans for providers
- AI-based provider recommendations
- Dynamic pricing
- Service packages & combos
- Video consultation
- Multi-language support (Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati)
- Loyalty program
- Corporate accounts
- API for third-party integrations
- Advanced analytics & reporting
- Automated quality scoring

## Security Considerations

**Authentication & Authorization:**
- All passwords handled by Supabase Auth (bcrypt hashing with 12 rounds)
- JWT tokens: Access (7 days) + Refresh (30 days) with automatic expiration
- Rate limiting: 5 login attempts per 15 minutes, 100 requests per 15 minutes per IP
- Row Level Security (RLS) enforced on all tables
- Role-based access control (RBAC): customer/provider/admin roles

**Data Protection:**
- HTTPS/TLS 1.3 for all traffic
- Never store sensitive data in AsyncStorage or local state
- PII encryption at rest
- Environment variables prefixed with `EXPO_PUBLIC_` are exposed to client (only use for public keys)

**Input Validation:**
- SQL injection prevention via parameterized queries (Supabase handles this)
- XSS protection through input sanitization and output encoding
- CSRF tokens for state-changing operations
- All user inputs must be validated both client-side and server-side

**Compliance:**
- GDPR compliant, DPDPA (India) compliant
- PCI DSS compliance for payment processing (Phase 2)
- Users must be 18+ years
- Clear Terms of Service and Privacy Policy acceptance required

## Debugging Tips

**Auth Issues:**
- Check if user exists in both `auth.users` (Supabase) and `public.users` tables
- Verify session state in `AuthContext`
- Check RLS policies in Supabase dashboard

**Navigation Issues:**
- Verify file is in correct folder (`(auth)`, `(tabs)`, or root `app/`)
- Check `_layout.tsx` files for navigation stack setup
- Use `expo-router` debugger: enable in Expo DevTools

**Data Not Showing:**
- Verify RLS policies allow the query
- Check if provider has `verification_status = 'verified'`
- Look for missing foreign key relationships in queries

## Testing Approach

Since no automated tests exist:
1. Create test accounts for both roles (customer and provider)
2. Follow checklists in `SETUP.md` sections "Testing Checklist"
3. Test complete user flows (signup → profile setup → booking creation)
4. Verify data persistence across sessions

**Key User Flows to Test:**

**Customer Booking Flow:**
1. Open app → Auto-detect location
2. Browse categories or search
3. View nearby providers
4. Select provider → View profile
5. Check availability → Select date/time
6. Fill booking details (duration, address, description)
7. Review estimated price
8. Confirm booking
9. Provider accepts/declines
10. Service completion
11. Leave review (1-5 stars + optional text)

**Provider Onboarding Flow:**
1. Register as service provider
2. Fill personal details (name, phone, email)
3. Select service category
4. Set pricing (hourly rate) & availability
5. Upload documents (ID proof, address proof, certifications)
6. Submit for verification
7. Admin reviews and approves
8. Profile goes live (verification_status = 'verified')
9. Start receiving bookings

**Admin Verification Flow:**
1. Login to admin panel
2. View pending provider applications
3. Check submitted documents
4. Verify information
5. Approve or Reject (with reason)
6. Provider receives notification

**ALWAYS run `npm run typecheck` before committing changes.**

## Success Metrics (PRD KPIs)

**Product Metrics to Monitor:**
- Booking Conversion Rate: Target 15% (Bookings / Profile Views)
- Search-to-Booking Rate: Target 25%
- Booking Completion Rate: Target 85%
- Repeat Booking Rate: Target 40% (users with 2+ bookings)
- Customer Satisfaction (CSAT): Target > 4.5/5
- Net Promoter Score (NPS): Target > 50
- Provider Response Time: Target < 2 hours

**Business Targets (Month 6 / Month 12):**
- Total Registered Users: 10,000 / 50,000
- Active Users (MAU): 5,000 / 25,000
- Total Service Providers: 1,000 / 5,000
- Monthly Bookings: 3,000 / 20,000

## Admin Capabilities

The admin role (future implementation) should be able to:
- Verify/approve/reject service providers
- Suspend or ban problematic providers
- View all users and bookings
- Access platform analytics dashboard
- Manage service categories
- Handle dispute resolution
- View audit logs of all actions
- Provider approval time target: < 24 hours
- Complaint resolution time target: < 48 hours

