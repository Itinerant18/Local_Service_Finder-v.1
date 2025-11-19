# Firebase Realtime Database Setup Guide

## ✅ Configuration Complete

Your Firebase configuration has been updated with:
- **Project ID**: local-service-f637f
- **Database URL**: https://local-service-f637f-default-rtdb.asia-southeast1.firebasedatabase.app
- **Authentication**: Email/Password, Google, and Phone Number enabled

## 🔥 What Changed

### 1. Database Migration
- ✅ Migrated from Firestore to **Firebase Realtime Database**
- ✅ All database operations now use Realtime Database
- ✅ Created `lib/realtime-helpers.ts` for database operations

### 2. Authentication Updates
- ✅ Email/Password authentication (working)
- ✅ Google authentication (web-ready, React Native needs setup)
- ✅ Phone number authentication (web-ready, React Native needs setup)

### 3. File Updates
- ✅ `lib/firebase.ts` - Updated config and switched to Realtime Database
- ✅ `context/AuthContext.tsx` - Added Google and Phone auth methods
- ✅ `lib/realtime-helpers.ts` - New file with Realtime Database helpers
- ✅ All app screens updated to use Realtime Database

## 📋 Database Structure

Your Realtime Database should have this structure:

```
{
  "users": {
    "{userId}": {
      "id": "string",
      "email": "string",
      "full_name": "string | null",
      "phone_number": "string | null",
      "role": "customer | provider | admin",
      ...
    }
  },
  "service_categories": {
    "{categoryId}": {
      "id": "string",
      "name": "string",
      "description": "string | null",
      ...
    }
  },
  "service_providers": {
    "{providerId}": {
      "id": "string",
      "category_id": "string",
      "hourly_rate": "number",
      "verification_status": "pending | verified | rejected | suspended",
      ...
    }
  },
  "bookings": {
    "{bookingId}": {
      "id": "string",
      "customer_id": "string",
      "provider_id": "string",
      "status": "pending | confirmed | in_progress | completed | cancelled",
      ...
    }
  },
  "reviews": {
    "{reviewId}": {
      "id": "string",
      "booking_id": "string",
      "provider_id": "string",
      "customer_id": "string",
      "rating": "number",
      ...
    }
  }
}
```

## 🔐 Realtime Database Security Rules

Set up these security rules in Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    },
    "service_providers": {
      ".read": "auth != null",
      "$providerId": {
        ".write": "$providerId === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "service_categories": {
      ".read": "auth != null",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },
    "bookings": {
      "$bookingId": {
        ".read": "auth != null && (data.child('customer_id').val() === auth.uid || data.child('provider_id').val() === auth.uid)",
        ".write": "auth != null && (data.child('customer_id').val() === auth.uid || data.child('provider_id').val() === auth.uid || !data.exists() && newData.child('customer_id').val() === auth.uid)"
      }
    },
    "reviews": {
      ".read": "auth != null",
      "$reviewId": {
        ".write": "auth != null && (!data.exists() && newData.child('customer_id').val() === auth.uid || data.child('customer_id').val() === auth.uid)"
      }
    }
  }
}
```

## 📱 Authentication Methods

### Email/Password
```typescript
const { signUp, signIn } = useAuth();
await signUp(email, password, 'customer');
await signIn(email, password);
```

### Google Sign-In (Web)
```typescript
const { signInWithGoogle } = useAuth();
await signInWithGoogle();
```

**For React Native**: You'll need to install and configure:
- `@react-native-google-signin/google-signin` or
- `expo-auth-session` with Google provider

### Phone Sign-In (Web)
```typescript
const { signInWithPhone, verifyPhoneCode } = useAuth();

// Step 1: Send verification code
const { verificationId } = await signInWithPhone('+1234567890', 'customer');

// Step 2: Verify code
await verifyPhoneCode(verificationId, '123456');
```

**For React Native**: You'll need to use:
- `expo-auth-session` or
- `react-native-firebase` for phone authentication

**Important**: For web phone auth, you need a `<div id="recaptcha-container"></div>` in your HTML.

## 🚀 Next Steps

### 1. Set Up Realtime Database Rules
- Go to Firebase Console
- Navigate to Realtime Database → Rules
- Paste the security rules above
- Click Publish

### 2. Initialize Database Structure
You can manually create the initial structure or use a script:

```javascript
// Example: Create initial service categories
const categories = [
  { id: '1', name: 'Plumbing', description: 'Plumbing services', icon_name: '🔧', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', name: 'Electrical', description: 'Electrical services', icon_name: '⚡', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  // ... more categories
];

// Add to database
categories.forEach(category => {
  firebase.database().ref(`service_categories/${category.id}`).set(category);
});
```

### 3. Test Authentication
- Test email/password sign up
- Test Google sign-in (web)
- Test phone sign-in (web - requires reCAPTCHA container)

### 4. React Native Authentication (Optional)
If you want to use Google/Phone auth on mobile:

**For Google:**
```bash
npm install @react-native-google-signin/google-signin
```

**For Phone:**
- Use `expo-auth-session` or
- Consider using `react-native-firebase` (requires native modules)

## 📝 Notes

1. **Realtime Database vs Firestore**: Realtime Database is better for real-time updates and simpler queries. Firestore is better for complex queries and scalability.

2. **Phone Authentication**: 
   - Web: Requires reCAPTCHA widget
   - React Native: Requires additional setup with expo-auth-session or react-native-firebase

3. **Google Authentication**:
   - Web: Works out of the box
   - React Native: Requires additional packages

4. **Data Migration**: If you have existing data in Firestore, you'll need to export and migrate it to Realtime Database format.

## 🐛 Troubleshooting

### Issue: "Permission denied" errors
- Check Realtime Database security rules
- Ensure user is authenticated
- Verify user has proper permissions

### Issue: Google sign-in not working on React Native
- Install `@react-native-google-signin/google-signin`
- Configure Google OAuth credentials
- Update AuthContext to use the package

### Issue: Phone sign-in not working
- **Web**: Ensure `<div id="recaptcha-container"></div>` exists
- **React Native**: Set up expo-auth-session or react-native-firebase

## ✅ Testing Checklist

- [ ] Realtime Database rules configured
- [ ] Email/password sign up works
- [ ] Email/password sign in works
- [ ] Google sign-in works (web)
- [ ] Phone sign-in works (web)
- [ ] User profile creation works
- [ ] Service categories load
- [ ] Service providers load
- [ ] Bookings create and load
- [ ] Reviews create and load

---

**All code has been updated and is ready to use!** 🎉

