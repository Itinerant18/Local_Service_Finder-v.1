# Local Service Finder - Quick Start Guide

## Getting Started

### 1. Start Development Server
```bash
npm run dev
```
The app will start and you can open it in a browser or mobile simulator.

### 2. First Time Setup

**As a Customer:**
1. Tap "Get Started" → "I need services"
2. Enter email and password (8+ characters)
3. Add your name and phone number
4. Start browsing services!

**As a Service Provider:**
1. Tap "Get Started" → "I provide services"
2. Enter email and password
3. Fill in your details:
   - Name & phone
   - Service category
   - Years of experience
   - Hourly rate
4. Profile pending verification
5. Start receiving bookings!

## Main Features

### For Customers

#### Home Screen
- See featured service providers
- Browse categories
- Quick access to search

#### Search & Filter
- Search by provider name
- Filter by category
- Filter by price range (₹0 - ₹5000)
- Filter by rating (1★ to 5★)
- Sort by distance, rating, price

#### Booking a Service
1. Select a provider → View profile
2. Tap "Book Now"
3. Choose date & time
4. Select duration (30m, 60m, 90m, 120m)
5. Enter service address
6. Add service description (optional)
7. Review estimated price
8. Confirm booking

#### My Bookings
- View all bookings (active/past)
- Filter by status: Pending, Confirmed, Completed
- View booking details
- See estimated price

#### Reviews
- Rate completed services (1-5 stars)
- Write review (optional)
- See reviews from other customers

### For Providers

#### Provider Home
- Dashboard with key metrics:
  - Total bookings
  - Completed services
  - Average rating
  - Total earnings
- Upcoming bookings list
- Quick profile status

#### Booking Management
- See incoming booking requests
- Accept or decline bookings
- View booking details
- Track completed services

#### Profile
- View your profile information
- Update availability (coming soon)
- Manage documents (coming soon)
- View your ratings and reviews

## Screen Navigation

```
Welcome Screen
├── Sign In → Main App
└── Sign Up
    └── Role Selection (Customer/Provider)
        └── Profile Setup
            └── Main App

Main App (Tabs)
├── Home/Provider Home
├── Search (Customers only)
├── Bookings
└── Profile
```

## Test Data

You can create test accounts to explore:
- **Customer**: Phone ordering services
- **Provider**: Electrician or plumber offering services

The database has 11 predefined service categories:
1. Plumbing
2. Electrical
3. Carpentry
4. Teaching
5. Driving
6. Cooking
7. Cleaning
8. Painting
9. AC Repair
10. Mobile Repair
11. Home Appliance Repair

## Tips

### For Best Experience
- Use realistic dates and times when booking
- Add clear service descriptions
- Set competitive pricing for providers
- Keep profile information up to date

### Common Actions
- **Change profile**: Tap Profile → Settings
- **View past bookings**: Bookings tab → Filter "Completed"
- **Find nearby providers**: Search tab → Sort by distance
- **Check availability**: Look for green "Available" indicator

## Troubleshooting

### Can't log in?
- Check email and password
- Make sure you've completed profile setup
- Try signing up if account doesn't exist

### Booking not showing?
- Refresh by going to another tab and coming back
- Check booking date (must be today or future)

### Provider profile not visible?
- Only verified providers appear in search
- Your profile needs admin approval

## Next Steps

### Explore Further
1. Create customer account and search for providers
2. Create provider account and set up profile
3. Create a test booking
4. View booking details and statistics

### Coming Soon (Phase 2)
- Payment integration
- In-app messaging
- Provider verification workflow
- Advanced analytics

---

Need help? Check SETUP.md for technical details.
